import { useState } from "react";
import { ArrowLeft, ArrowRight, Instagram } from "lucide-react";
import { events, gallery, contact } from "../data";
import { SectionHeading, Artwork } from "../components/UI";
import { EventCard, GalleryItem } from "../components/Cards";
import Modal from "../components/Modal";
export default function Community({ section }) {
  const [event, setEvent] = useState(null);
  const [index, setIndex] = useState(null);
  const [photoIndex, setPhotoIndex] = useState(0);
  const [expanded, setExpanded] = useState(false);
  const previous = () =>
    setPhotoIndex((value) => {
      const count = gallery[index].images.length;
      return (value + count - 1) % count;
    });
  const next = () =>
    setPhotoIndex((value) => (value + 1) % gallery[index].images.length);
  return (
    <>
      {section !== "gallery" && <section id="performances" className="section">
        <div className="container">
          <div className="section-top">
            <SectionHeading
              eyebrow="ON STAGE & IN THE MAKING"
              description="Community outreach, original productions and opportunities for young voices."
            >
              Stories Beyond <em>the Script</em>
            </SectionHeading>
            <span className="small-note">
              Our journey so far
              <br />
              Theatre, outreach and film
            </span>
          </div>
          <div className="film-feature">
            <img src="/documents/bol-bol-raani-1.png" alt="Bol Bol Raani, Itta Itta Aani film poster" loading="lazy" />
            <div>
              <p className="eyebrow">OUR FIRST SHORT FILM</p>
              <h2>Bol Bol Raani, <em>Itta Itta Aani</em></h2>
              <p>A woman with mystical powers struggles to find acceptance in a world that sees her as different. Her deeply personal journey explores resilience, vulnerability and learning to embrace who she is.</p>
              <p>Written and directed by Varshaa Raane, the film also marks her acting debut alongside students of her School of Drama and Theatre.</p>
              <p>All Play Productions in association with Atharva University, Mumbai.</p>
              <a className="text-link" href="/documents/bol-bol-raani.pdf" target="_blank" rel="noreferrer">View the film leaflet (PDF) &rarr;</a>
            </div>
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
      </section>}
      {section !== "performances" && <section id="gallery" className="section gallery-section">
        <div className="container">
          <div className="section-top">
            <SectionHeading
              eyebrow="A LITTLE PLAY. A LOT OF HEART."
              description="Explore our stage work, film poster and the leaflets that tell our story."
            >
              Moments from <em>All Play</em>
            </SectionHeading>
            <a
              className="social-link"
              href={contact.instagram}
              target="_blank"
              rel="noreferrer"
            >
              <Instagram size={19} /> @allplayproductions â†—
            </a>
          </div>
          <div className="gallery-grid">
            {gallery.map((item, itemIndex) => (
              <GalleryItem
                key={item.id}
                item={item}
                onOpen={() => {
                  setPhotoIndex(0);
                  setIndex(itemIndex);
                }}
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
      </section>}
      {event && (
        <Modal title={event.title} onClose={() => setEvent(null)}>
          <p className="sample-label">{event.date}</p>
          <p>{event.highlights}</p>
          <div className="modal-images">
            {event.images.map((src, imageIndex) => (
              <Artwork
                key={src}
                src={src}
                alt={`All Play Productions stage performance, photo ${imageIndex + 1}`}
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
          <Artwork
            src={gallery[index].images[photoIndex].src}
            alt={gallery[index].images[photoIndex].alt}
            eager
          />
          <div className="lightbox-controls">
            <button
              className="icon-button"
              onClick={previous}
              aria-label="Previous image"
            >
              <ArrowLeft />
            </button>
            <span aria-live="polite">
              {photoIndex + 1} / {gallery[index].images.length} {" · "} {gallery[index].title}
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


