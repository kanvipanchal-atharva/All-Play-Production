import { useState } from "react";
import { ArrowUpRight, LoaderCircle } from "lucide-react";
import { programs } from "../data";
import { validateEnquiry } from "../../../shared/validation";
export default function EnquiryForm({ selectedProgram, onSelect }) {
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState(null);
  const [busy, setBusy] = useState(false);
  const errorProps = (key) => ({
    "aria-invalid": !!errors[key],
    "aria-describedby": errors[key] ? `${key}-error` : undefined,
  });
  const error = (key) =>
    errors[key] && (
      <span id={`${key}-error`} className="field-error">
        {errors[key]}
      </span>
    );
  async function submit(event) {
    event.preventDefault();
    if (busy) return;
    const form = event.currentTarget;
    const values = Object.fromEntries(new FormData(form));
    values.consent = values.consent === "on";
    const result = validateEnquiry(values);
    setErrors(result.errors);
    setStatus(null);
    if (!result.valid) {
      form.elements[Object.keys(result.errors)[0]]?.focus();
      return;
    }
    setBusy(true);
    try {
      const response = await fetch("/api/enquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
        signal: AbortSignal.timeout(15000),
      });
      const body = await response.json();
      if (!response.ok) {
        setErrors(body.errors || {});
        setStatus({
          error: true,
          message: body.message || "Unable to submit. Please try again.",
        });
      } else {
        setStatus({ error: false, message: body.message });
        form.reset();
        onSelect("");
      }
    } catch {
      setStatus({
        error: true,
        message:
          "Unable to reach the server. Please check your connection and try again. Your entries have been kept.",
      });
    } finally {
      setBusy(false);
    }
  }
  return (
    <form noValidate onSubmit={submit} className="enquiry-form">
      <h3>Let’s start your story.</h3>
      <p>Tell us a little about your aspiring performer.</p>
      <div className="form-grid">
        {[
          [
            "name",
            "Parent / Participant Name",
            "text",
            "Your full name",
            "name",
          ],
          ["age", "Participant’s Age", "number", "Age in years", "off"],
          ["mobile", "Mobile Number", "tel", "+91 98765 43210", "tel"],
          ["email", "Email Address", "email", "you@example.com", "email"],
        ].map(([key, label, type, placeholder, autoComplete]) => (
          <label key={key}>
            {label} <span aria-hidden="true">*</span>
            <input
              name={key}
              type={type}
              placeholder={placeholder}
              autoComplete={autoComplete}
              required
              maxLength={key === "name" ? 100 : 254}
              min={key === "age" ? 5 : undefined}
              max={key === "age" ? 99 : undefined}
              {...errorProps(key)}
            />
            {error(key)}
          </label>
        ))}
      </div>
      <label>
        Preferred Program <span aria-hidden="true">*</span>
        <select
          name="program"
          required
          value={selectedProgram}
          onChange={(event) => onSelect(event.target.value)}
          {...errorProps("program")}
        >
          <option value="">Select a program</option>
          {programs.map((program) => (
            <option key={program.id} value={program.id}>
              {program.title}
            </option>
          ))}
        </select>
        {error("program")}
      </label>
      <label>
        Message <span className="optional">(optional)</span>
        <textarea
          name="message"
          rows="3"
          maxLength={2000}
          placeholder="What would you like to know?"
          {...errorProps("message")}
        />
        {error("message")}
      </label>
      <label className="consent">
        <input
          name="consent"
          type="checkbox"
          required
          {...errorProps("consent")}
        />
        <span>
          I consent to my details being processed to validate this enquiry.
        </span>
      </label>
      {error("consent")}
      <p className="form-note">
        * Required. Preview only: enquiries are not stored or delivered.
      </p>
      <button className="button" disabled={busy} type="submit">
        {busy ? "Submitting…" : "Submit Enquiry"}
        {busy ? (
          <LoaderCircle size={18} className="loading" />
        ) : (
          <ArrowUpRight size={18} />
        )}
      </button>
      <div aria-live="polite" aria-atomic="true">
        {status && (
          <p
            className={`form-status ${status.error ? "error" : ""}`}
            role={status.error ? "alert" : "status"}
          >
            {status.message}
          </p>
        )}
      </div>
    </form>
  );
}
