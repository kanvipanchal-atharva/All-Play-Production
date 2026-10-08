import { Check } from "lucide-react";
import { Artwork, Reveal, SectionHeading } from "../components/UI";
import { Doodle } from "../components/Doodles";
export default function About() {
  return (
    <>
      <section id="about" className="section about-section">
        <div className="container split">
          <Reveal className="about-collage">
            <Doodle kind="kite" className="collage-doodle" />
            <div className="collage-main">
              <Artwork
                src="/documents/founderChild.jpg"
                alt="Children raising their hands during an All Play workshop"
              />
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
              All Play Productions introduces children to drama and performing arts through fun and
              joy. Our workshops help children discover their individuality,
              build self-esteem and find the courage to share their unique
              voices with the world.
            </p>
            <a className="text-link section-read-more" href="/why-theatre">Read more about the theatre ↗</a>
            <div className="highlights">
              {[
                "Structured Training",
                "Creative Exposure",
                "Live Performances & Silhouette Performance",
                "Skills for Life",
              ].map((text) => (
                <span key={text}>
                  <Check size={16} />
                  {text}
                </span>
              ))}
            </div>
            <div className="about-impact" aria-label="All Play impact">
              <div><strong>600+</strong><span>young people trained</span></div>
              <div><strong>50+</strong><span>productions created</span></div>
            </div>
          </Reveal>
        </div>
      </section>
      <section
        className="section founder-section"
        aria-labelledby="founder-title"
      >
        <div className="founder-layout">
          <Reveal className="portrait-frame">
            <Artwork
              src="/documents/founder%20landscape.png"
              alt="Mrs. Varshaa Raane, Founder and Creator of All Play Productions"
            />
          </Reveal>
          <Reveal className="founder-copy">
            <p className="eyebrow">
              <span />
              THE HEART BEHIND ALL PLAY PRODUCTIONS
            </p>
            <h2 id="founder-title">
              Meet Our <em>Founder</em>
            </h2>
            <h3 className="founder-name">Mrs. Varshaa Raane</h3>
            <p className="founder-role">
              Trustee - Atharva University Mumbai · Founder & Creator - All Play Productions · Vice Chairman - Atharva Foundation
            </p>
            <p>
              Actor, filmmaker and advocate for creative education. Mrs. Varshaa Raane created
              All Play Productions to make performing arts an empowering
              experience for young learners.
            </p>
            <div className="founder-bottom">
              <a className="text-link" href="/founder">Read more about our founder ↗</a>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
