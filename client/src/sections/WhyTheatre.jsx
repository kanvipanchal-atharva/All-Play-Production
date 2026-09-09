import { SectionHeading, Artwork, Reveal } from "../components/UI";
export default function WhyTheatre() {
  return (
    <section id="why-theatre" className="section why-section">
      <div className="container split">
        <Reveal>
          <SectionHeading eyebrow="WHY THEATRE?" light>
            More Than Acting—
            <br />
            <em>Skills for Life</em>
          </SectionHeading>
          <p>
            A supportive space to express ideas, understand emotions and work
            together. Skills that stay with you long after the curtain falls.
          </p>
          <div className="skills-list">
            {[
              "Confidence",
              "Communication",
              "Creativity",
              "Emotional awareness",
              "Teamwork",
              "Discipline",
            ].map((skill, index) => (
              <span key={skill}>
                <small>0{index + 1}</small>
                {skill}
              </span>
            ))}
          </div>
        </Reveal>
        <Reveal className="why-visual">
          <Artwork
            src="/Demo.jpeg"
            alt="Children performing together on stage at All Play Productions"
          />
          <div className="why-quote">
            “The best thing they
            <br />{" "}
            bring off the stage?
            <br />{" "}
            <em>Themselves.</em>”
          </div>
          <span className="image-label">ALL PLAY ON STAGE</span>
        </Reveal>
      </div>
    </section>
  );
}
