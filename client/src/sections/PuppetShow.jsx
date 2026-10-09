import { gallery } from "../data";
import { SectionHeading } from "../components/UI";

const featuredPhotos = [0, 5, 10, 17, 22].map((index) => gallery[0]?.images[index]).filter(Boolean);

export default function PuppetShow() {
  return (
    <section className="puppet-show" aria-labelledby="puppet-show-title">
      <div className="container">
        <SectionHeading eyebrow="A LITTLE THEATRE MAGIC">
          <span id="puppet-show-title">Our stories <em>come alive</em></span>
        </SectionHeading>
        <div className="puppet-stage">
        <div className="puppet-scroll-viewport">
          <div className="puppet-gallery">
            {[0, 1].map((set) => (
              <div className="puppet-gallery-set" key={set} aria-hidden={set === 1}>
                {[...featuredPhotos, ...featuredPhotos].map((photo, index) => (
                  <figure className="puppet-photo" key={`${photo.src}-${index}`} style={{ "--puppet-delay": `${(index % featuredPhotos.length) * -0.7}s` }}>
                    <span className="puppet-strings" aria-hidden="true" />
                    <span className="puppet-frame">
                      <img src={photo.src} alt={set === 0 ? photo.alt : ""} loading="lazy" />
                    </span>
                  </figure>
                ))}
              </div>
            ))}
          </div>
        </div>
          <div className="puppet-stage-lights" aria-hidden="true" />
        </div>
      </div>
    </section>
  );
}
