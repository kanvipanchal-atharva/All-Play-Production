import { useEffect, useId, useState } from "react";
import { ArrowUp, ChevronDown, Instagram, Phone } from "lucide-react";
import { contact } from "../data";
import { Logo, navigation, navigationHref } from "./Header";
export function WhatsAppButton() {
  return (
    <a
      className="floating-whatsapp"
      href={navigationHref("contact")}
      aria-label="Go to contact page"
      title="Contact us"
    >
      <Phone size={24} />
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
      <a className="scroll-top" href="#main" aria-label="Scroll to top">
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
export default function Footer({ onPolicy }) {
  return (
    <footer id="page-footer">
      <div className="container footer-grid">
        <div>
          <Logo />
          <p className="footer-tagline">A little imagination. A little courage. A world of possibilities.</p>
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
            <a key={id} href={navigationHref(id)}>
              {label}
            </a>
          ))}
        </FooterGroup>
        <div>
          <FooterGroup title="Come Say Hello">
            <p className="footer-contact-list">
              <span>Phone</span>
              {contact.phone ? <a href={`tel:${contact.phone.replace(/[^+\d]/g, "")}`}>{contact.phone}</a> : <span>To be confirmed</span>}
              {contact.additionalPhones.map((phone) => (
                <a key={phone} href={`tel:${phone.replace(/[^+\d]/g, "")}`}>{phone}</a>
              ))}
              <span>Email</span>
              {contact.email ? <a href={`mailto:${contact.email}`}>{contact.email}</a> : <span>To be confirmed</span>}
              <span>Venue</span>
              <span>{contact.venue || "To be confirmed"}</span>
            </p>
          </FooterGroup>
        </div>
      </div>
      <div className="container footer-founder-credit">
        <span>Founded by</span>
        <strong>Mrs. Varsha Rane</strong>
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
