import { ArrowUpRight, Instagram } from "lucide-react";
import { Artwork, Icon } from "./UI";
export function ProgramCard({ program, onSelect }) {
  return (
    <article className="program-card">
      <div className="card-image">
        <Artwork
          src={program.image}
          alt={`Illustrated placeholder for ${program.title}`}
        />
        <span className="badge">{program.badge}</span>
      </div>
      <div className="card-content">
        <Icon name={program.icon} />
        <h3>{program.title}</h3>
        <p>{program.description}</p>
        <a
          className="text-link"
          href="#contact"
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
    <article className="event-card">
      <div className="card-image">
        <Artwork
          src={event.image}
          alt={`Sample illustration for ${event.title}`}
        />
        <span className="badge">{event.category}</span>
      </div>
      <div className="card-content">
        <p className="sample-label">SAMPLE · {event.date}</p>
        <h3>{event.title}</h3>
        <p>{event.description}</p>
        <button className="text-link" onClick={() => onOpen(event)}>
          View Highlights <ArrowUpRight size={17} />
        </button>
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
      <Artwork src={item.src} alt={item.alt} />
      <span className="gallery-overlay">
        <Instagram size={23} />
        <span>
          {item.title}
          <small>Illustrated placeholder</small>
        </span>
        <ArrowUpRight size={20} />
      </span>
    </button>
  );
}
