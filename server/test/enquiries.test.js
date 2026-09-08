import { test, before, after } from "node:test";
import assert from "node:assert/strict";
import { createApp } from "../app.js";
import { validateEnquiry } from "../../shared/validation.js";
let server, base;
before(async () => {
  server = createApp({ rateMax: 100 }).listen(0);
  await new Promise((resolve) => server.once("listening", resolve));
  base = `http://127.0.0.1:${server.address().port}`;
});
after(() => new Promise((resolve) => server.close(resolve)));
const valid = {
  name: "Test Parent",
  age: "12",
  mobile: "+91 (98765) 43210",
  email: "parent@example.com",
  program: "children",
  message: "A sample enquiry.",
  consent: true,
};
const post = (data, headers = {}) =>
  fetch(`${base}/api/enquiries`, {
    method: "POST",
    headers: { "Content-Type": "application/json", ...headers },
    body: JSON.stringify(data),
  });
test("accepts and sanitizes formatted Indian mobile numbers", () => {
  for (const mobile of [
    "9876543210",
    "09876543210",
    "+91 98765-43210",
    "91 9876543210",
    "0091 (98765) 43210",
  ]) {
    const result = validateEnquiry({
      ...valid,
      mobile,
      name: " <Test Parent> ",
    });
    assert.equal(result.valid, true);
    assert.equal(result.data.mobile, "+919876543210");
    assert.equal(result.data.name, "Test Parent");
  }
});
test("rejects invalid fields, types, age, program and consent", () => {
  for (const value of [
    null,
    [],
    {},
    { ...valid, age: "12.5" },
    { ...valid, age: "0" },
    { ...valid, age: "100" },
    { ...valid, mobile: "1234567890" },
    { ...valid, email: "bad@" },
    { ...valid, program: "unknown" },
    { ...valid, consent: "true" },
    { ...valid, name: { bad: true } },
    { ...valid, message: "x".repeat(2001) },
  ])
    assert.equal(validateEnquiry(value).valid, false);
});
test("successful API response honestly describes no delivery and omits personal data", async () => {
  const response = await post(valid);
  assert.equal(response.status, 200);
  const body = await response.json();
  assert.equal(body.success, true);
  assert.match(body.message, /does not store or deliver/);
  assert.equal(JSON.stringify(body).includes(valid.email), false);
  assert.ok(response.headers.get("content-security-policy"));
});
test("invalid API response includes inline errors", async () => {
  const response = await post({});
  assert.equal(response.status, 422);
  const body = await response.json();
  assert.ok(body.errors.name);
  assert.ok(body.errors.consent);
});
test("rejects unapproved CORS origins", async () => {
  assert.equal(
    (await post(valid, { Origin: "https://unapproved.example" })).status,
    403,
  );
  const response = await post(valid, { Origin: "http://localhost:5173" });
  assert.equal(
    response.headers.get("access-control-allow-origin"),
    "http://localhost:5173",
  );
});
test("handles malformed JSON and oversized payloads", async () => {
  const malformed = await fetch(`${base}/api/enquiries`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: "{",
  });
  assert.equal(malformed.status, 400);
  assert.equal((await malformed.json()).success, false);
  assert.equal(
    (await post({ ...valid, message: "x".repeat(20000) })).status,
    413,
  );
});
test("rate limits repeated submissions", async () => {
  const limited = createApp({ rateMax: 2 }).listen(0);
  await new Promise((resolve) => limited.once("listening", resolve));
  try {
    const url = `http://127.0.0.1:${limited.address().port}/api/enquiries`;
    for (let i = 0; i < 2; i++)
      await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(valid),
      });
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(valid),
    });
    assert.equal(response.status, 429);
    assert.equal((await response.json()).success, false);
  } finally {
    await new Promise((resolve) => limited.close(resolve));
  }
});
test("returns consistent JSON for unknown API routes", async () => {
  const response = await fetch(`${base}/api/missing`);
  assert.equal(response.status, 404);
  assert.equal((await response.json()).success, false);
});
