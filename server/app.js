import express from "express";
import helmet from "helmet";
import cors from "cors";
import { rateLimit } from "express-rate-limit";
import { fileURLToPath } from "node:url";
import { readFileSync, existsSync } from "node:fs";
import { createHash } from "node:crypto";
import { validateEnquiry } from "../shared/validation.js";
export function createApp({ rateMax = 10, emailTransport } = {}) {
  const app = express();
  app.disable("x-powered-by");
  app.set("trust proxy", Number(process.env.TRUST_PROXY_HOPS || 0));
  const schemaBuilt = new URL(
    "../client/dist/organization.jsonld",
    import.meta.url,
  );
  const schema = readFileSync(
    existsSync(schemaBuilt)
      ? schemaBuilt
      : new URL("../client/public/organization.jsonld", import.meta.url),
    "utf8",
  ).trim();
  const schemaHash = createHash("sha256").update(schema).digest("base64");
  app.use(
    helmet({
      contentSecurityPolicy: {
        directives: {
          "script-src": ["'self'", `'sha256-${schemaHash}'`],
          "style-src": [
            "'self'",
            "'unsafe-inline'",
            "https://fonts.googleapis.com",
          ],
          "font-src": ["'self'", "https://fonts.gstatic.com"],
          "img-src": ["'self'", "data:"],
          "upgrade-insecure-requests":
            process.env.NODE_ENV === "production" ? [] : null,
        },
      },
    }),
  );
  const origins = (
    process.env.CORS_ORIGINS ||
    "http://localhost:5173,http://localhost:3000,http://127.0.0.1:3000"
  )
    .split(",")
    .map((value) => value.trim());
  app.use(
    "/api",
    cors({
      origin(origin, callback) {
        if (!origin || origins.includes(origin)) callback(null, true);
        else
          callback(
            Object.assign(new Error("Origin not allowed."), { status: 403 }),
          );
      },
      methods: ["POST", "GET"],
      allowedHeaders: ["Content-Type"],
    }),
  );
  app.use(
    "/api/enquiries",
    rateLimit({
      windowMs: 15 * 60 * 1000,
      limit: rateMax,
      standardHeaders: "draft-8",
      legacyHeaders: false,
      handler: (_req, res) =>
        res
          .status(429)
          .json({
            success: false,
            message: "Too many enquiries. Please try again in 15 minutes.",
          }),
    }),
  );
  app.use(express.json({ limit: "16kb" }));
  app.get("/api/health", (_req, res) =>
    res.json({ success: true, message: "Healthy" }),
  );
  app.post("/api/enquiries", async (req, res) => {
    if (!req.is("application/json"))
      return res
        .status(415)
        .json({ success: false, message: "Use application/json." });
    const result = validateEnquiry(req.body);
    if (!result.valid)
      return res
        .status(422)
        .json({
          success: false,
          message: "Please check the highlighted fields.",
          errors: result.errors,
        });
    const apiKey = process.env.RESEND_API_KEY;
    const from = process.env.ENQUIRY_FROM_EMAIL;
    if (!emailTransport && (!apiKey || !from))
      return res.status(503).json({
        success: false,
        message: "Email delivery is not configured yet. Please contact us directly.",
      });

    const { name, parentName, age, mobile, email, address, program, message } = result.data;
    const programName = {
      children: "Children's Theatre Program",
      teen: "Teen Theatre Program",
      workshops: "Workshops",
      productions: "Productions",
    }[program];
    const emailText = [
      `Parent's Name: ${parentName || "Not provided"}`,
      `Participant's Name: ${name}`,
      `Participant's Age: ${age}`,
      `Mobile Number: ${mobile}`,
      `Email Address: ${email}`,
      `Address: ${address || "Not provided"}`,
      `Preferred Program: ${programName}`,
      `Message: ${message || "Not provided"}`,
    ].join("\n");
    try {
      const emailPayload = {
        from,
        to: ["allplayproductionsworkshops@gmail.com"],
        reply_to: email,
        subject: `Website enquiry - ${programName}`,
        text: emailText,
      };
      const delivery = emailTransport
        ? await emailTransport(emailPayload)
        : await fetch("https://api.resend.com/emails", {
            method: "POST",
            headers: {
              Authorization: `Bearer ${apiKey}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify(emailPayload),
            signal: AbortSignal.timeout(10000),
          });
      if (!delivery.ok)
        return res.status(502).json({
          success: false,
          message: "We could not send your enquiry right now. Please try again or contact us directly.",
        });
      return res.json({
        success: true,
        message: "Your enquiry has been sent to All Play Productions.",
      });
    } catch {
      return res.status(502).json({
        success: false,
        message: "We could not send your enquiry right now. Please try again or contact us directly.",
      });
    }
  });
  app.use("/api", (_req, res) =>
    res
      .status(404)
      .json({ success: false, message: "API endpoint not found." }),
  );
  const dist = fileURLToPath(new URL("../client/dist/", import.meta.url));
  app.use(
    "/assets",
    express.static(`${dist}/assets`, {
      setHeaders(res, file) {
        res.setHeader(
          "Cache-Control",
          /index-[\w-]+\.(js|css)$/.test(file)
            ? "public, max-age=31536000, immutable"
            : "public, max-age=3600",
        );
      },
    }),
  );
  app.use(express.static(dist, { maxAge: 0 }));
  app.get(["/", "/founder", "/about-theatre", "/programs", "/why-theatre", "/performances", "/gallery", "/contact"], (_req, res) => res.sendFile(`${dist}/index.html`));
  app.use((_req, res) =>
    res.status(404).json({ success: false, message: "Page not found." }),
  );
  app.use((error, _req, res, _next) =>
    res
      .status(error.status || 500)
      .json({
        success: false,
        message:
          error.status === 403
            ? "Origin not allowed."
            : error.type === "entity.too.large"
              ? "Request is too large."
              : error.type === "entity.parse.failed"
                ? "Invalid JSON."
                : "Unable to process your request. Please try again.",
      }),
  );
  return app;
}
