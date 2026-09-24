import { MapPin, Mail, Phone, Instagram, Facebook, Youtube } from "lucide-react";
import { SectionHeading, PrimaryButton } from "../components/UI";
import EnquiryForm from "../components/EnquiryForm";
import { contact, whatsappUrl } from "../data";
import { Doodle } from "../components/Doodles";
export function ContactCallToAction() {
  return (
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
  );
}
export default function Contact({ selectedProgram, onSelect }) {
  return (
    <>
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
              ].map(([Icon, label, value, href]) => (
                <div key={label}>
                  <Icon size={21} strokeWidth={1.4} />
                  <div>
                    <h3>{label === "Phone" ? "Theatre enquiries" : label}</h3>
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
            <div className="film-contact">
              <h3>Film enquiries</h3><p>Bol Bol Raani, Itta Itta Aani</p>
              {contact.filmPhones.map(phone => <a key={phone} href={`tel:${phone.replace(/\s/g, "")}`}>{phone}</a>)}
            </div>
            <div className="contact-social-links" aria-label="Social media">
              <a className="social-link" href={contact.instagram} target="_blank" rel="noreferrer">
                <Instagram size={20} /> Instagram
              </a>
              <a className="social-link" href={contact.facebook} target="_blank" rel="noreferrer">
                <Facebook size={20} /> Facebook
              </a>
              <a className="social-link" href={contact.youtube} target="_blank" rel="noreferrer">
                <Youtube size={20} /> YouTube
              </a>
            </div>
          </div>
          <EnquiryForm selectedProgram={selectedProgram} onSelect={onSelect} />
        </div>
      </section>
    </>
  );
}
