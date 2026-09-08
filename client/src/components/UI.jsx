import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowUpRight,
  Drama,
  Sparkles,
  Mic,
  Clapperboard,
  Accessibility,
  BookOpen,
  Users,
} from "lucide-react";
const icons = {
  Drama,
  Sparkles,
  Mic,
  Clapperboard,
  Accessibility,
  BookOpen,
  Users,
};
export function Icon({ name, ...props }) {
  const Component = icons[name] || Drama;
  return (
    <Component size={23} strokeWidth={1.5} aria-hidden="true" {...props} />
  );
}
export function PrimaryButton({
  children,
  href = "#contact",
  secondary = false,
  ...props
}) {
  return (
    <a
      className={`button ${secondary ? "button-outline" : ""}`}
      href={href}
      {...props}
    >
      {children}
      <ArrowUpRight size={17} aria-hidden="true" />
    </a>
  );
}
export function SectionHeading({
  eyebrow,
  children,
  description,
  light = false,
}) {
  return (
    <div className={`section-heading ${light ? "light" : ""}`}>
      <p className="eyebrow">
        <span />
        {eyebrow}
      </p>
      <h2>{children}</h2>
      {description && <p className="section-description">{description}</p>}
    </div>
  );
}
export function Reveal({ children, className = "" }) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduced ? false : { opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.08 }}
      transition={{ duration: reduced ? 0 : 0.5 }}
    >
      {children}
    </motion.div>
  );
}
export function Artwork({ src, alt, className = "", eager = false }) {
  return (
    <img
      src={src}
      alt={alt}
      width="1200"
      height="900"
      loading={eager ? "eager" : "lazy"}
      fetchPriority={eager ? "high" : "auto"}
      decoding="async"
      className={className}
    />
  );
}
