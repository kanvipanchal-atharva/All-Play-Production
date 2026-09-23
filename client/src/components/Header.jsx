import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import Modal from "./Modal";
export const navigation = [
  ["home", "Home"],
  ["founder", "Founder"],
  ["why-theatre", "Why Theatre?"],
  ["programs", "Our Programs"],
  ["performances", "Performances"],
  ["about-theatre", "Achievements"],
  ["gallery", "Gallery"],
  ["contact", "Contact"],
];
export function navigationHref(id) {
  return id === "home" ? "/" : `/${id}`;
}
export function Logo() {
  return (
    <a href={navigationHref("home")} className="logo" aria-label="All Play Productions home">
      <img className="brand-logo" src="/logo-web.png" width="280" height="325" alt="All Play Productions logo" />
      <span>
        ALL PLAY PRODUCTIONS
      </span>
    </a>
  );
}
export function MobileMenu({ onClose }) {
  return (
    <Modal title="Explore All Play" onClose={onClose}>
      <nav className="mobile-links" aria-label="Mobile navigation">
        {navigation.map(([id, label]) => (
          <a key={id} href={navigationHref(id)} onClick={onClose}>
            {label}
          </a>
        ))}
        <a href={navigationHref("contact")} className="button" onClick={onClose}>
          Join Our Theatre Program
        </a>
      </nav>
    </Modal>
  );
}
export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 35);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => {
      window.removeEventListener("scroll", update);
    };
  }, []);
  return (
    <>
      <header className={`header ${scrolled || window.location.pathname !== "/" ? "is-scrolled" : ""}`}>
        <div className="header-inner">
          <Logo />
          <nav className="desktop-nav" aria-label="Main navigation">
            {navigation.map(([id, label]) => (
              <a
                key={id}
                href={navigationHref(id)}
                aria-current={(window.location.pathname.replace(/\/$/, "") || "/") === navigationHref(id) ? "page" : undefined}
              >
                {label}
              </a>
            ))}
          </nav>
          <a className="header-cta" href={navigationHref("contact")}>
            Join Our Theatre Program <span aria-hidden="true">↗</span>
          </a>
          <button
            className="menu-toggle icon-button"
            aria-label="Open menu"
            aria-expanded={open}
            onClick={() => setOpen(true)}
          >
            {open ? <X /> : <Menu />}
          </button>
        </div>
      </header>
      {open && <MobileMenu onClose={() => setOpen(false)} />}
    </>
  );
}
