import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import Modal from "./Modal";
export const navigation = [
  ["home", "Home"],
  ["about-theatre", "About the Theatre"],
  ["founder", "Founder"],
  ["programs", "Our Programs"],
  ["why-theatre", "Why Theatre?"],
  ["performances", "Performances"],
  ["gallery", "Gallery"],
  ["contact", "Contact"],
];
export function navigationHref(id) {
  if (id === "founder" || id === "about-theatre") return `/${id}`;
  return `${window.location.pathname === "/" ? "" : "/"}#${id}`;
}
export function Logo() {
  return (
    <a href={navigationHref("home")} className="logo" aria-label="All Play Productions home">
      <img className="brand-logo" src="/logo-web.png" width="280" height="325" alt="All Play Productions logo" />
      <span>
        ALL PLAY<small>PRODUCTIONS</small>
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
  const [active, setActive] = useState("home");
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 35);
    update();
    window.addEventListener("scroll", update, { passive: true });
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-15% 0px -60% 0px" },
    );
    navigation.forEach(([id]) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });
    return () => {
      window.removeEventListener("scroll", update);
      observer.disconnect();
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
                aria-current={window.location.pathname === `/${id}` ? "page" : window.location.pathname === "/" && active === id ? "location" : undefined}
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
