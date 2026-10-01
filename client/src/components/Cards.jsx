import { ArrowRight, ArrowUpRight, Building2, Clapperboard, Film, Flag, Image, Map, Palette, PartyPopper, Sparkles, Star } from "lucide-react";
import { Artwork, Icon } from "./UI";

function GalleryIcon({ title }) {
  const label = title.toLowerCase();
  const IconComponent = label.includes("bol bol") ? Film
    : label.includes("journey") ? Map
    : label.includes("workshop") ? Palette
    : label.includes("carnival") ? PartyPopper
    : label.includes("independence") ? Flag
    : label.includes("auditorium") ? Building2
    : label.includes("guru") ? Sparkles
    : label.includes("celebrity") ? Star
    : label.includes("stage") ? Clapperboard
    : Image;
  return <IconComponent size={23} aria-hidden="true" />;
}
export function ProgramCard({ program, onSelect }) {
  return (
    <article className="program-card">
      <div className="card-image">
        <Artwork
          src={program.image}
          alt="Children performing together on stage at All Play Productions"
        />
        <span className="badge">{program.badge}</span>
      </div>
      <div className="card-content">
        <Icon name={program.icon} />
        <h3>{program.title}</h3>
        <p>{program.description}</p>
        <a
          className="text-link"
          href={`/contact?program=${encodeURIComponent(program.id)}#contact`}
          onClick={() => onSelect(program.id)}
        >
          Enquire Now <ArrowUpRight size={17} />
        </a>
      </div>
    </article>
  );
}
export function LearningCard({ item, index }) {
  return (
    <article className="learning-card">
      <div className="learning-top">
        <Icon name={item.icon} />
        <span>0{index + 1}</span>
      </div>
      <h3>{item.title}</h3>
      <p>{item.description}</p>
    </article>
  );
}
export function EventCard({ event, onOpen }) {
  return (
    <article
      className="event-card"
      role="button"
      tabIndex={0}
      onClick={() => onOpen(event)}
      onKeyDown={(keyboardEvent) => {
        if (keyboardEvent.key === "Enter" || keyboardEvent.key === " ") {
          keyboardEvent.preventDefault();
          onOpen(event);
        }
      }}
    >
      <div className="card-image">
        <Artwork
          src={event.image}
          alt={event.imageAlt || "Children performing together on stage at All Play Productions"}
        />
        <span className="badge">{event.category}</span>
      </div>
      <div className="card-content">
        <p className="sample-label">{event.date}</p>
        <h3>{event.title}</h3>
        <p>{event.description}</p>
        <span className="text-link">
          Read more <ArrowRight size={17} />
        </span>
      </div>
    </article>
  );
}
export function GalleryItem({ item, onOpen }) {
  return (
    <button
      className="gallery-item"
      onClick={onOpen}
      aria-label={`View ${item.title}`}
    >
      <Artwork src={item.images[0].src} alt={item.images[0].alt} />
      <span className="gallery-overlay">
        <GalleryIcon title={item.title} />
        <span>
          {item.title}
          <small>All Play on stage</small>
        </span>
        <ArrowRight size={20} />
      </span>
    </button>
  );
}
