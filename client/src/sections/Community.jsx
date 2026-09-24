import { useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { events, gallery } from "../data";
import { SectionHeading, Artwork } from "../components/UI";
import { EventCard, GalleryItem } from "../components/Cards";
import Modal from "../components/Modal";
const productionPosters = [
  {
    id: "deva-shree-ganesha",
    src: "/documents/shriGanesha.jpeg",
    title: "देवा श्री गणेशा",
    description: "A Marathi stage production written and directed by Varshaa Rane, presented by All Play Productions.",
  },
  {
    id: "mi-nahi-janar-shalela",
    src: "/documents/school.png",
    title: "मी नाही जाणार शाळेला",
    description: "A school-themed Marathi theatre production featuring young performers, presented by Atharva Foundation and All Play Productions.",
  },
  {
    id: "kshitijachya-palikade",
    src: "/documents/kshitija.jpeg",
    title: "क्षितिजाच्या पलिकडे",
    description: "An in-house stage production by All Play Productions, bringing young performers together through theatre.",
  },
  {
    id: "ghonga-basant",
    src: "/documents/ghongaBasant.jpeg",
    title: "घोंगा बसन्त",
    description: "A Marathi stage production featuring young performers from All Play Productions.",
  },
  {
    id: "bol-bol-raani",
    src: "/documents/bol-bol-raani-1.png",
    title: "बोल बोल राणी",
    category: "Our first short film",
    description: "A woman with mystical powers struggles to find acceptance in a world that sees her as different. Written and directed by Varshaa Raane, the film follows her journey of resilience, self-discovery and learning to embrace who she is. It also marks her acting debut, alongside students of her School of Drama and Theatre.",
    link: "/documents/bol-bol-raani.pdf",
  },
];
export default function Community({ section, includeGallery = true }) {
  const [event, setEvent] = useState(null);
  const [index, setIndex] = useState(null);
  const [photoIndex, setPhotoIndex] = useState(0);
  const [expanded, setExpanded] = useState(false);
  const [activeProduction, setActiveProduction] = useState(null);
  const showProduction = (item) => {
    const nextProduction = activeProduction?.id === item.id ? null : item;
    setActiveProduction(nextProduction);
    if (nextProduction) {
      requestAnimationFrame(() => {
        document.getElementById(`production-${item.id}-description`)?.scrollIntoView({ behavior: "smooth", block: "nearest" });
      });
    }
  };
  const previous = () =>
    setPhotoIndex((value) => {
      const count = gallery[index].images.length;
      return (value + count - 1) % count;
    });
  const next = () =>
    setPhotoIndex((value) => (value + 1) % gallery[index].images.length);
  return (
    <>
      {section !== "gallery" && <section id="performances" className={`section performances-section ${section ? "standalone-performances" : "home-performances"}`}>
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
          <div className="production-poster-grid">
            {productionPosters.map((poster) => {
              const isActive = activeProduction?.id === poster.id;
              return (
                <div className="production-poster-item" key={poster.id}>
                  <button
                    className="production-poster-card"
                    type="button"
                    onClick={() => showProduction(poster)}
                    aria-expanded={isActive}
                    aria-controls={isActive ? `production-${poster.id}-description` : undefined}
                  >
                    <img src={poster.src} alt={`${poster.title} production poster`} loading="lazy" />
                    <span className="production-poster-copy">
                      <strong>{poster.title}</strong>
                      <span className="text-link">{isActive ? "Hide description" : "Read description"} <ArrowRight size={16} /></span>
                    </span>
                  </button>
                </div>
              );
            })}
          </div>
          {activeProduction && (
            <article
              className="production-description featured-program-description"
              id={`production-${activeProduction.id}-description`}
              aria-labelledby={`production-${activeProduction.id}-title`}
            >
              <h2 id={`production-${activeProduction.id}-title`}>{activeProduction.title}</h2>
              <p>{activeProduction.description}</p>
              {activeProduction.link && <a className="text-link" href={activeProduction.link} target="_blank" rel="noreferrer">View the film leaflet (PDF) &rarr;</a>}
            </article>
          )}
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
      {section !== "performances" && includeGallery && <section id="gallery" className="section gallery-section">
        <div className="container">
          <div className="section-top">
            <SectionHeading
              eyebrow="A LITTLE PLAY. A LOT OF HEART."
              description="Explore our stage work, film poster and the leaflets that tell our story."
            >
              Moments from <em>All Play</em>
            </SectionHeading>
            
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
          title={gallery[index].images[photoIndex].title || gallery[index].title}
          className="gallery-modal"
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
              {photoIndex + 1} / {gallery[index].images.length} {" · "} {gallery[index].images[photoIndex].title || gallery[index].title}
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



