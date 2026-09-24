export const programIds = ["children", "teen", "workshops", "productions"];
// Deliberately remove control characters and angle brackets from plain-text fields.
const clean = (value) =>
  typeof value === "string"
    // eslint-disable-next-line no-control-regex
    ? value.trim().replace(/[\u0000-\u001F\u007F<>]/g, "")
    : "";
export function validateEnquiry(input) {
  const source =
    input && typeof input === "object" && !Array.isArray(input) ? input : {};
  const data = Object.fromEntries(
    ["name", "parentName", "address", "age", "mobile", "email", "program", "message"].map((key) => [
      key,
      clean(source[key]),
    ]),
  );
  data.consent = source.consent === true;
  const errors = {};
  if (data.name.length < 2 || data.name.length > 100)
    errors.name = "Enter a name between 2 and 100 characters.";
  if (data.parentName.length > 100)
    errors.parentName = "Keep the parent's name within 100 characters.";
  if (data.address.length > 300)
    errors.address = "Keep the address within 300 characters.";
  if (
    !/^\d{1,2}$/.test(data.age) ||
    Number(data.age) < 5 ||
    Number(data.age) > 99
  )
    errors.age = "Enter a whole-number age between 5 and 99.";
  const digits = data.mobile
    .replace(/[\s().-]/g, "")
    .replace(/^(\+91|0091|91)(?=[6-9]\d{9}$)/, "")
    .replace(/^0(?=[6-9]\d{9}$)/, "");
  if (!/^[6-9]\d{9}$/.test(digits))
    errors.mobile = "Enter a valid Indian mobile number, with or without +91.";
  else data.mobile = `+91${digits}`;
  if (data.email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email))
    errors.email = "Enter a valid email address.";
  if (!programIds.includes(data.program))
    errors.program = "Choose a preferred program.";
  if (data.message.length > 2000)
    errors.message = "Keep your message within 2,000 characters.";
  if (!data.consent)
    errors.consent = "Please confirm your consent to submit this enquiry.";
  return { data, errors, valid: Object.keys(errors).length === 0 };
}
