import { useEffect, useId, useState } from "react";
import { ArrowUp, ChevronDown, Instagram, MessageCircle } from "lucide-react";
import { contact, programs, whatsappUrl } from "../data";
import { Logo, navigation } from "./Header";
export function WhatsAppButton() {
  return (
    <a
      className="floating-whatsapp"
      href={whatsappUrl}
      aria-label={
        contact.whatsapp
          ? "Contact us on WhatsApp"
          : "WhatsApp number to be confirmed — view contact details"
      }
      title={
        contact.whatsapp
          ? "Chat on WhatsApp"
          : "WhatsApp number to be confirmed"
      }
    >
      <MessageCircle size={24} />
    </a>
  );
}
export function ScrollToTop() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const update = () => setShow(window.scrollY > 600);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);
  return (
    show && (
      <a className="scroll-top" href="#home" aria-label="Scroll to top">
        <ArrowUp size={20} />
      </a>
    )
  );
}
export function FloatingActions() {
  const [nearContact, setNearContact] = useState(false);
  useEffect(() => {
    const visible = new Set();
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) visible.add(entry.target);
        else visible.delete(entry.target);
      });
      setNearContact(visible.size > 0);
    });
    document.querySelectorAll('#contact, #page-footer').forEach(element => observer.observe(element));
    return () => observer.disconnect();
  }, []);
  return <div className={nearContact ? 'floating-actions near-contact' : 'floating-actions'}><WhatsAppButton /><ScrollToTop /></div>;
}
function FooterGroup({ title, children }) {
  const [open, setOpen] = useState(false);
  const contentId = useId();
  return (
    <div className={`footer-group${open ? " is-open" : ""}`}>
      <h3 className="footer-group-title">{title}</h3>
      <h3 className="footer-group-mobile-title">
        <button
          type="button"
          className="footer-group-toggle"
          aria-expanded={open}
          aria-controls={contentId}
          onClick={() => setOpen(!open)}
        >
          {title}<ChevronDown size={18} aria-hidden="true" />
        </button>
      </h3>
      <div id={contentId} className="footer-group-content">{children}</div>
    </div>
  );
}
export default function Footer({ onPolicy, onSelect }) {
  return (
    <footer id="page-footer">
      <div className="container footer-grid">
        <div>
          <Logo />
          <p>
            A little imagination.
            <br />A little courage.
            <br />A world of possibilities.
          </p>
          <a
            className="social-link"
            href={contact.instagram}
            target="_blank"
            rel="noreferrer"
          >
            <Instagram size={18} /> @allplayproductions
          </a>
        </div>
        <FooterGroup title="Explore">
          {navigation.slice(1).map(([id, label]) => (
            <a key={id} href={`#${id}`}>
              {label}
            </a>
          ))}
        </FooterGroup>
        <FooterGroup title="Our Programs">
          {programs.map((program) => (
            <a
              key={program.id}
              href="#contact"
              onClick={() => onSelect(program.id)}
            >
              {program.title}
            </a>
          ))}
        </FooterGroup>
        <div>
          <FooterGroup title="Come Say Hello">
            <p>
              Phone: {contact.phone || "To be confirmed"}
              <br />
              Email: {contact.email || "To be confirmed"}
              <br />
              Venue: {contact.venue || "To be confirmed"}
            </p>
          </FooterGroup>
          <p>
            Founded by
            <br />
            <span className="gold">Mrs. Varshaa Raane</span>
          </p>
        </div>
      </div>
      <div className="container footer-bottom">
        <span>
          © {new Date().getFullYear()} All Play Productions. All rights
          reserved.
        </span>
        <div>
          <button onClick={() => onPolicy("Privacy Policy")}>
            Privacy Policy
          </button>
          <button onClick={() => onPolicy("Terms and Conditions")}>
            Terms
          </button>
        </div>
        <span>Made for the love of theatre.</span>
      </div>
    </footer>
  );
}
