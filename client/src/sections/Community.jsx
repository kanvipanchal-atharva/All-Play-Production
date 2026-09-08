import { useState } from "react";
import { ArrowLeft, ArrowRight, Instagram } from "lucide-react";
import { events, gallery, contact } from "../data";
import { SectionHeading, Artwork } from "../components/UI";
import { EventCard, GalleryItem } from "../components/Cards";
import Modal from "../components/Modal";
export default function Community() {
  const [event, setEvent] = useState(null);
  const [index, setIndex] = useState(null);
  const [expanded, setExpanded] = useState(false);
  const previous = () =>
    setIndex((value) => (value + gallery.length - 1) % gallery.length);
  const next = () => setIndex((value) => (value + 1) % gallery.length);
  return (
    <>
      <section id="performances" className="section">
        <div className="container">
          <div className="section-top">
            <SectionHeading
              eyebrow="ON STAGE & IN THE MAKING"
              description="Rehearsals, workshops and moments on stage."
            >
              Stories Beyond <em>the Script</em>
            </SectionHeading>
            <span className="small-note">
              Sample collection
              <br />
              Confirmed events coming soon
            </span>
          </div>
          <div className="event-grid">
            {(expanded ? events : events.slice(0, 3)).map((item) => (
              <EventCard key={item.id} event={item} onOpen={setEvent} />
            ))}
          </div>
          <div className="center">
            <button
              className="button button-light"
              onClick={() => setExpanded((value) => !value)}
              aria-expanded={expanded}
            >
              {expanded ? "Show Fewer Activities" : "Explore All Activities"}
              <ArrowRight size={17} />
            </button>
          </div>
        </div>
      </section>
      <section id="gallery" className="section gallery-section">
        <div className="container">
          <div className="section-top">
            <SectionHeading
              eyebrow="A LITTLE PLAY. A LOT OF HEART."
              description="Illustrated previews. Approved photographs coming soon."
            >
              Moments from <em>All Play</em>
            </SectionHeading>
            <a
              className="social-link"
              href={contact.instagram}
              target="_blank"
              rel="noreferrer"
            >
              <Instagram size={19} /> @allplayproductions ↗
            </a>
          </div>
          <div className="gallery-grid">
            {gallery.map((item, itemIndex) => (
              <GalleryItem
                key={item.id}
                item={item}
                onOpen={() => setIndex(itemIndex)}
              />
            ))}
          </div>
          <div className="center">
            <a
              className="button button-light"
              href={contact.instagram}
              target="_blank"
              rel="noreferrer"
            >
              <Instagram size={18} />
              Follow @allplayproductions
            </a>
          </div>
        </div>
      </section>
      {event && (
        <Modal title={event.title} onClose={() => setEvent(null)}>
          <p className="sample-label">SAMPLE HIGHLIGHTS · {event.date}</p>
          <p>{event.highlights}</p>
          <div className="modal-images">
            {event.images.map((src, imageIndex) => (
              <Artwork
                key={src}
                src={src}
                alt={`Sample ${event.title} highlight illustration ${imageIndex + 1}`}
              />
            ))}
          </div>
        </Modal>
      )}
      {index !== null && (
        <Modal
          title={gallery[index].title}
          onClose={() => setIndex(null)}
          onPrevious={previous}
          onNext={next}
        >
          <Artwork src={gallery[index].src} alt={gallery[index].alt} eager />
          <div className="lightbox-controls">
            <button
              className="icon-button"
              onClick={previous}
              aria-label="Previous image"
            >
              <ArrowLeft />
            </button>
            <span aria-live="polite">
              {index + 1} / {gallery.length} · Illustrated placeholder
            </span>
            <button
              className="icon-button"
              onClick={next}
              aria-label="Next image"
            >
              <ArrowRight />
            </button>
          </div>
        </Modal>
      )}
    </>
  );
}
