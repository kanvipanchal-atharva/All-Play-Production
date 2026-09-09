import { SectionHeading } from "../components/UI";

const plans = [
  ["Further Learning", "Diploma and degree courses for children and young adults."],
  ["Specialised Workshops", "Shadow theatre, puppetry and more ways to explore performance."],
  ["New Productions", "In-house short and long plays, alongside short films."],
  ["Spaces to Perform", "An in-house theatre auditorium and an intimate theatre studio."],
  ["A Cinema Club", "A space for children and young adults to discover cinema together."],
];

export default function FuturePlans() {
  return (
    <section className="section future-section" aria-labelledby="future-title">
      <div className="container">
        <SectionHeading
          eyebrow="LOOKING AHEAD"
          description="Our leaflet sets out these future plans. Contact us for updates on availability."
        >
          <span id="future-title">More Ways to <em>Create</em></span>
        </SectionHeading>
        <div className="future-grid">
          {plans.map(([title, description]) => (
            <article key={title}>
              <h3>{title}</h3>
              <p>{description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
