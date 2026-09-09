import { Check, Instagram } from "lucide-react";
import { Artwork, Reveal, SectionHeading } from "../components/UI";
import { contact } from "../data";
export default function About() {
  return (
    <>
      <section id="about" className="section about-section">
        <div className="container split">
          <Reveal className="about-collage">
            <div className="collage-main">
              <Artwork
                src="/Demo.jpeg"
                alt="Children performing together on stage at All Play Productions"
              />
              <span className="image-label">ROOM FOR EVERY IMAGINATION</span>
            </div>
            <div className="collage-small">
              <Artwork
                src="/Demo.jpeg"
                alt="Children performing together on stage at All Play Productions"
              />
            </div>
          </Reveal>
          <Reveal>
            <SectionHeading eyebrow="THE ALL PLAY STORY">
              Where Creativity
              <br />
              Meets <em>Confidence</em>
            </SectionHeading>
            <p>
              All Play Productions, in association with Atharva Foundation,
              introduces children to drama and performing arts through fun and
              joy. Our workshops help children discover their individuality,
              build self-esteem and find the courage to share their unique
              voices with the world.
            </p>
            <div className="highlights">
              {[
                "Structured Training",
                "Creative Expression",
                "Live Performances",
                "Skills for Life",
              ].map((text) => (
                <span key={text}>
                  <Check size={16} />
                  {text}
                </span>
              ))}
            </div>
          </Reveal>
        </div>
      </section>
      <section
        className="section founder-section"
        aria-labelledby="founder-title"
      >
        <div className="container founder-layout">
          <Reveal className="portrait-frame">
            <Artwork
              src="/Founder.jpeg"
              alt="Mrs. Varshaa Raane, Founder and Creator of All Play Productions"
            />
          </Reveal>
          <Reveal>
            <p className="eyebrow">
              <span />
              THE HEART BEHIND ALL PLAY
            </p>
            <h2 id="founder-title">
              Meet Our <em>Founder</em>
            </h2>
            <h3 className="founder-name">Mrs. Varshaa Raane</h3>
            <p className="founder-role">
              Founder & Creator, All Play Productions · Vice Chairman, Atharva Foundation
            </p>
            <p>
              Actor, filmmaker and advocate for creative education. Mrs. Varshaa Raane created
              All Play Productions to make performing arts an empowering
              experience for young learners.
            </p>
            <div className="founder-bottom">
              <a
                href={contact.founderInstagram}
                className="text-link"
                target="_blank"
                rel="noreferrer"
              >
                <Instagram size={18} /> View on Instagram
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
