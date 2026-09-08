import express from "express";
import helmet from "helmet";
import cors from "cors";
import { rateLimit } from "express-rate-limit";
import { fileURLToPath } from "node:url";
import { readFileSync, existsSync } from "node:fs";
import { createHash } from "node:crypto";
import { validateEnquiry } from "../shared/validation.js";
export function createApp({ rateMax = 10 } = {}) {
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
  app.post("/api/enquiries", (req, res) => {
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
    // Integration point: send result.data via an approved email/Google Sheets adapter here.
    // Await delivery and handle failures before reporting delivery. A database can be added here later.
    // Currently nothing is stored, emailed, or logged; request data exists only in memory.
    return res.json({
      success: true,
      message:
        "Your enquiry passed validation. This preview does not store or deliver enquiries. Please use the confirmed contact details when available.",
    });
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
  app.get("/", (_req, res) => res.sendFile(`${dist}/index.html`));
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
