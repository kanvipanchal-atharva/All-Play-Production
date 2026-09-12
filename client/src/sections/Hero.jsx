import { ArrowDown } from "lucide-react";
import { PrimaryButton } from "../components/UI";
export default function Hero() {
  return (
    <section id="home" className="hero">
      <img
        className="hero-art"
        src="/hero.png"
        width="1536"
        height="1024"
        alt="Watercolor illustration of children dancing, playing theatre and flying colorful kites"
        fetchPriority="high"
      />
      <div className="hero-shade" />
      <div className="container hero-content">
        <p className="eyebrow">
          <span />
          Drama · Theatre · Performing Arts
        </p>
        <h1>
          Discover the
          <br />
          Artist <em>Within You</em>
        </h1>
        <p className="hero-copy">
          Theatre training for young imaginations. Build confidence, find your
          voice and discover the joy of performance.
        </p>
        <div className="button-row">
          <PrimaryButton href="/programs">Explore Our Programs</PrimaryButton>
          <PrimaryButton href="/contact#contact" secondary>
            Enquire Now
          </PrimaryButton>
        </div>
        <div className="hero-tagline">
          <span />
          All Play... a carnival of joy.
        </div>
      </div>
      <div className="hero-bottom container">
        <a href="#about">
          <ArrowDown size={16} /> SCROLL TO DISCOVER
        </a>
        <span>IMAGINE. EXPRESS. BECOME.</span>
      </div>
      <span className="artwork-credit">
        IMAGINATION TAKES FLIGHT
      </span>
    </section>
  );
}
