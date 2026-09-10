import { MapPin, Mail, Phone, Clock, Instagram } from "lucide-react";
import { SectionHeading, PrimaryButton } from "../components/UI";
import EnquiryForm from "../components/EnquiryForm";
import { contact, whatsappUrl } from "../data";
import { Doodle } from "../components/Doodles";
export default function Contact({ selectedProgram, onSelect }) {
  return (
    <>
      <section className="cta-section">
        <Doodle kind="masks" className="cta-doodle" />
        <div className="container">
          <p className="eyebrow">THE NEXT CHAPTER STARTS HERE</p>
          <h2>
            Your Stage <em>Is Waiting</em>
          </h2>
          <p>
            Give your child a space to create, connect and grow through theatre.
          </p>
          <div className="button-row">
            <PrimaryButton>Enquire About Admissions</PrimaryButton>
            <PrimaryButton href={whatsappUrl} secondary>
              Contact Us on WhatsApp
            </PrimaryButton>
          </div>
          {!contact.whatsapp && (
            <small>
              WhatsApp number to be confirmed · View enquiry details below
            </small>
          )}
        </div>
      </section>
      <section id="contact" className="section contact-section">
        <div className="container contact-layout">
          <div>
            <SectionHeading
              eyebrow="LET’S CONNECT"
              description="Find the right program for your young performer."
            >
              Let’s <em>Connect.</em>
            </SectionHeading>
            <div className="contact-details">
              {[
                [
                  Phone,
                  "Phone",
                  contact.phone,
                  contact.phone
                    ? `tel:${contact.phone.replace(/\s/g, "")}`
                    : null,
                ],
                [
                  Mail,
                  "Email Address",
                  contact.email,
                  contact.email ? `mailto:${contact.email}` : null,
                ],
                [MapPin, "Training Venue", contact.venue],
                [Clock, "Session Timings", contact.timings],
              ].map(([Icon, label, value, href]) => (
                <div key={label}>
                  <Icon size={21} strokeWidth={1.4} />
                  <div>
                    <h3>{label}</h3>
                    {href ? (
                      <a href={href}>{value}</a>
                    ) : (
                      <p>{value || "To be confirmed"}</p>
                    )}
                    {label === "Phone" && contact.additionalPhones.map((phone) => (
                      <a className="additional-phone" key={phone} href={`tel:${phone.replace(/\s/g, "")}`}>
                        {phone}
                      </a>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <a
              className="social-link"
              href={contact.instagram}
              target="_blank"
              rel="noreferrer"
            >
              <Instagram size={20} /> Follow our creative journey ↗
            </a>
          </div>
          <EnquiryForm selectedProgram={selectedProgram} onSelect={onSelect} />
        </div>
      </section>
    </>
  );
}
