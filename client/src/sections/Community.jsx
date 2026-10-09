import { useState } from "react";
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUp } from "lucide-react";
import { events, gallery } from "../data";
import { SectionHeading, Artwork } from "../components/UI";
import { EventCard, GalleryItem } from "../components/Cards";
import Modal from "../components/Modal";
const productionPosters = [
  {
    id: "deva-shree-ganesha",
    src: "/documents/shriGanesha.jpeg",
    backSrc: "/documents/devaShriGanesha_backside.jpeg",
    link: "/documents/devaShriGanesha_poster.pdf",
    title: "देवा श्री गणेशा",
    description: "When the elders decide not to celebrate Ganeshotsav due to conflicts between themselves, the children decide to celebrate the festival with their innocence, enthusiasm and love for Bappa.",
    credits: "Mrs. Varshaa Raane",
  },
  {
    id: "mi-nahi-janar-shalela",
    src: "/documents/school.png",
    title: "मी नाही जाणार शाळेला",
    description: "The story of a little girl's fight against the education system.",
    credits: "Vishal Sonavne",
  },
  {
    id: "kshitijachya-palikade",
    src: "/documents/kshitija.jpeg",
    backSrc: "/documents/Kshitija_backside.jpeg",
    link: "/documents/Kshitija_poster.pdf",
    title: "क्षितिजाच्या पलिकडे",
    description: "A young girl visits her father in a village during her vacation. As she gets to know the villagers and understands their struggles, she takes initiative to help them overcome their challenges and bring change.",
    credits: "Written by: Dhananjay Sardeshpande | Directed by: Mrs. Varshaa Raane",
    venue: "Prabodhankar Keshav Sitaram Thackeray Natya Mandir, Chhatrapati Shivaji Maharaj Natyamandir",
  },
  {
    id: "ghonga-basant",
    src: "/documents/ghongaBasant.jpeg",
    title: "घोंघा बसन्त",
    description: "A unique story set in a village where children live without a king or a leader. They choose a young shepherd boy as their king, but he gradually misguides the villagers through his decisions. The play explores the importance of education.",
    credits: "Written by: Jayvardhan | Directed by: Yogita Ranade",
  },
  {
    id: "bol-bol-raani",
    src: "/documents/bol-bol-raani-1.png",
    backSrc: "/documents/bolBolRani_backside.jpeg",
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
  const [kshitijEnglish, setKshitijEnglish] = useState(false);
  const [devaEnglish, setDevaEnglish] = useState(false);
  const [bolBolEnglish, setBolBolEnglish] = useState(false);
  const showProduction = (item) => {
    const nextProduction = activeProduction?.id === item.id ? null : item;
    setActiveProduction(nextProduction);
    setKshitijEnglish(false);
    setDevaEnglish(false);
    setBolBolEnglish(false);
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
              description={section ? "Community outreach, original productions and opportunities for young voices." : undefined}
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
                    {poster.backSrc ? (
                      <span className="production-poster-flip" aria-hidden="true">
                        <img className="production-poster-front" src={poster.src} alt="" loading="lazy" />
                        <img className="production-poster-back" src={poster.backSrc} alt="" loading="lazy" />
                      </span>
                    ) : (
                      <img src={poster.src} alt={`${poster.title} production poster`} loading="lazy" />
                    )}
                    <span className="production-poster-copy">
                      <strong>{poster.title}</strong>
                      <span className="text-link">Read more {isActive ? <ArrowUp size={16} /> : <ArrowDown size={16} />}</span>
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
              {activeProduction.id === "bol-bol-raani" ? (
                <>
                  <button className="text-link" type="button" onClick={() => setBolBolEnglish((current) => !current)} aria-pressed={bolBolEnglish}>
                    {bolBolEnglish ? "मराठीत वाचा" : "Read in English"}
                  </button>
                  {bolBolEnglish ? (
                    <div lang="en">
                      <p>A compelling short film written and directed by Varshaa Raane, telling the story of a woman blessed with mystical powers who struggles to live a “normal” life in a society that finds it difficult to accept her differences.</p>
                      <p>Resilient and powerful, yet vulnerable when misunderstood, she journeys towards self-discovery, learning to understand, accept and embrace her true identity. The film offers a poignant glimpse into her world, highlighting the challenges of being different and the importance of self-acceptance.</p>
                      <p>Produced by All Play Productions in association with Atharva University, Mumbai, the film also marks a step into filmmaking for the organisation, bringing the talent nurtured through theatre to the screen.</p>
                      <p><strong>Written &amp; Directed by:</strong> Varshaa Raane</p>
                    </div>
                  ) : (
                    <div lang="mr">
                      <p>वर्षा राणे लिखित आणि दिग्दर्शित ही एक हृदयस्पर्शी लघुपट निर्मिती आहे. गूढ शक्तींचे वरदान लाभलेल्या एका स्त्रीची ही कथा आहे, जिला समाजापेक्षा वेगळे असल्यामुळे सामान्य जीवन जगताना अनेक अडचणींचा सामना करावा लागतो.</p>
                      <p>खंबीर आणि सामर्थ्यवान असूनही, समाजाकडून समजून न घेतले गेल्यामुळे ती भावनिकदृष्ट्या हळवी ठरते. स्वतःला जाणून घेण्याच्या या प्रवासात ती स्वतःला समजून घेण्यास, स्वीकारण्यास आणि आपल्या खऱ्या अस्तित्वाचा सहजतेने स्वीकार करण्यास शिकते. वेगळेपणामुळे येणारी आव्हाने आणि स्वतःचा स्वीकार करण्याचे महत्त्व हा लघुपट संवेदनशीलतेने मांडतो.</p>
                      <p>अथर्व युनिव्हर्सिटी, मुंबई यांच्या सहकार्याने ऑल प्ले प्रॉडक्शन्सने साकारलेला हा लघुपट, रंगभूमीच्या माध्यमातून जोपासलेल्या कलागुणांना चित्रपटाच्या माध्यमातून प्रेक्षकांपर्यंत पोहोचवण्याच्या संस्थेच्या प्रवासातील एक महत्त्वपूर्ण पाऊल आहे.</p>
                      <p><strong>लेखन आणि दिग्दर्शन:</strong> वर्षा राणे</p>
                    </div>
                  )}
                </>
              ) : activeProduction.id === "deva-shree-ganesha" ? (
                <>
                  <button className="text-link" type="button" onClick={() => setDevaEnglish((current) => !current)} aria-pressed={devaEnglish}>
                    {devaEnglish ? "मराठीत वाचा" : "Read in English"}
                  </button>
                  {devaEnglish ? (
                    <div lang="en">
                      <p>A heartwarming theatrical production celebrating the innocence, imagination and joyful spirit of childhood. Produced by All Play Productions in association with Atharva Foundation, the play follows a group of children who decide to celebrate Ganeshotsav with their innocence, enthusiasm and love for Bappa when the elders choose not to celebrate the festival due to conflicts among themselves.</p>
                      <p>Through this touching story, the production explores the power of friendship, family bonds, unity and mutual respect, highlighting how children's pure hearts can bring people together. Varshaa Raane brings the beauty of childhood to the stage, emphasising the importance of nurturing young minds, encouraging self-expression and helping children grow into confident individuals who appreciate their unique identities.</p>
                      <p><strong>Written &amp; Directed by:</strong> Varshaa Raane</p>
                    </div>
                  ) : (
                    <div lang="mr">
                      <p>बालपणातील निरागसता, कल्पनाशक्ती आणि आनंदी वृत्तीचा उत्सव साजरा करणारी ही एक हृदयस्पर्शी नाट्यनिर्मिती आहे. अथर्व फाउंडेशनच्या सहकार्याने ऑल प्ले प्रॉडक्शन्सने सादर केलेले हे नाटक, घरातील मोठ्यांमधील मतभेदांमुळे गणेशोत्सव साजरा न करण्याचा निर्णय घेतला जातो, तेव्हा बाप्पावरील अपार प्रेम, उत्साह आणि निरागसतेच्या बळावर हा उत्सव साजरा करण्याचा निर्धार करणाऱ्या मुलांची कथा सांगते.</p>
                      <p>या भावस्पर्शी कथेतून मैत्री, कौटुंबिक नाती, एकोपा आणि परस्पर आदर यांचे महत्त्व अधोरेखित केले आहे. मुलांच्या निर्मळ मनात माणसांना एकत्र आणण्याची ताकद असते, हा सुंदर संदेश या नाट्यनिर्मितीतून मिळतो. वर्षा राणे यांनी बालपणातील सौंदर्य रंगमंचावर साकारताना, मुलांच्या मनाचा सर्वांगीण विकास घडवणे, त्यांना स्वतःला व्यक्त करण्यासाठी प्रोत्साहित करणे आणि स्वतःची वेगळी ओळख जपणाऱ्या आत्मविश्वासपूर्ण व्यक्ती म्हणून त्यांना घडवणे यांचे महत्त्व अधोरेखित केले आहे.</p>
                      <p><strong>लेखन आणि दिग्दर्शन:</strong> वर्षा राणे</p>
                    </div>
                  )}
                </>
              ) : activeProduction.id === "kshitijachya-palikade" ? (
                <>
                  <button className="text-link" type="button" onClick={() => setKshitijEnglish((current) => !current)} aria-pressed={kshitijEnglish}>
                    {kshitijEnglish ? "मराठीत वाचा" : "Read in English"}
                  </button>
                  {kshitijEnglish ? (
                    <div lang="en">
                      <p>A thought-provoking children’s one-act play produced by All Play Productions and Varshaa Raane, exploring how a forest officer’s daughter overcomes the bullying and superstitions prevalent among village children and leads them towards a new horizon of possibilities.</p>
                      <p>Through this inspiring story, the play highlights the power of courage, awareness and determination in challenging social barriers and changing mindsets. Presented under “All Play…A Carnival of Joy,” an initiative by Atharva Foundation and All Play Productions, the production celebrates the potential of young minds and the transformative power of theatre.</p>
                      <p><strong>Writer:</strong> Dhananjay Sardeshpande</p>
                      <p><strong>Director:</strong> Varshaa Raane</p>
                    </div>
                    ) : (
                    <div lang="mr">
                      <p>ऑल प्ले प्रॉडक्शन्स आणि वर्षा राणे निर्मित ही एक विचारप्रवर्तक बाल एकांकिका आहे. एका फॉरेस्ट ऑफिसरची मुलगी गावातील मुलांची दादागिरी आणि त्यांच्या मनातील अंधश्रद्धांवर मात करून त्यांना एका नव्या क्षितिजाच्या पलीकडे कशी घेऊन जाते, याची प्रेरणादायी कथा या एकांकिकेतून उलगडते.</p>
                      <p>धैर्य, जाणीव आणि दृढनिश्चय यांच्या बळावर सामाजिक अडथळ्यांना आव्हान देत विचारांमध्ये परिवर्तन घडवून आणण्याचा संदेश ही एकांकिका देते. अथर्व फाउंडेशन आणि ऑल प्ले प्रॉडक्शन्स यांच्या ‘ऑल प्ले…अ कार्निव्हल ऑफ जॉय’ या उपक्रमांतर्गत सादर होणारी ही कलाकृती बालमनातील सुप्त क्षमतांचा आणि रंगभूमीच्या परिवर्तनशील सामर्थ्याचा सुंदर आविष्कार आहे.</p>
                      <p><strong>लेखक:</strong> धनंजय सरदेशपांडे</p>
                      <p><strong>दिग्दर्शिका:</strong> वर्षा राणे</p>
                    </div>
                  )}
                </>
              ) : (
                <>
                  <p>{activeProduction.description}</p>
                  {activeProduction.credits && <dl className="production-credits">
                    <div><dt>Written &amp; Directed by</dt><dd>{activeProduction.credits}</dd></div>
                    {activeProduction.venue && <div><dt>Held at (commercial)</dt><dd>{activeProduction.venue}</dd></div>}
                  </dl>}
                </>
              )}
              {activeProduction.link && <a className="text-link" href={activeProduction.id === "bol-bol-raani" ? "/documents/Kshitija_poster.pdf" : activeProduction.link} target="_blank" rel="noreferrer">
                {activeProduction.id === "bol-bol-raani"
                  ? (bolBolEnglish ? "View the play leaflet" : "नाट्यपत्रिका पहा")
                  : activeProduction.id === "deva-shree-ganesha"
                  ? (devaEnglish ? "View the film leaflet" : "नाट्यपत्रिका पहा")
                  : activeProduction.id === "kshitijachya-palikade"
                    ? (kshitijEnglish ? "View the film leaflet" : "नाट्यपत्रिका पहा")
                    : "View the film leaflet"} &rarr;
              </a>}
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



