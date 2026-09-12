import { ArrowUpRight, Drama } from "lucide-react";
import { SectionHeading, Reveal } from "../components/UI";
import { ProgramCard, LearningCard } from "../components/Cards";
import { programs, batch, learning } from "../data";
export default function Programs({ onSelect }) {
  return (
    <>
      <section id="programs" className="section programs-section">
        <div className="container">
          <Reveal className="section-top">
            <SectionHeading
              eyebrow="FIND YOUR SPOTLIGHT"
              description="Theatre training, workshops and performance opportunities for children and young people."
            >
              Learn, Perform <em>and Grow</em>
            </SectionHeading>
          </Reveal>
          <div className="program-grid">
            {programs.map((program) => (
              <Reveal key={program.id}>
                <ProgramCard program={program} onSelect={onSelect} />
              </Reveal>
            ))}
          </div>
          <p><a className="text-link" href="/documents/all-play-leaflet.pdf" target="_blank" rel="noreferrer">Explore our theatre leaflet (PDF) &rarr;</a></p>
          <div className="batch-panel">
            <Drama size={35} strokeWidth={1.3} />
            <div>
              <h3>{batch.title}</h3>
              <p>
                {batch.duration} · {batch.sessions}
              </p>
              <p>{batch.ages}</p>
              <small>{batch.notice}</small>
            </div>
            <a href="/contact#contact" className="text-link">
              Ask About the Batch <ArrowUpRight size={18} />
            </a>
          </div>
        </div>
      </section>
      <section className="section school-outreach-section">
        <div className="container">
          <SectionHeading eyebrow="THEATRE IN YOUR SCHOOL" description="An introduction to All Play Productions, Atharva Foundation and Atharva University through short videos and a practical demo class led by a theatre trainer.">
            A First Step <em>onto the Stage</em>
          </SectionHeading>
          <p>The school presentation lasts approximately 1 to 1.5 hours. It introduces children to drama, creative expression and the rich theatre culture of Maharashtra.</p>
          <a className="text-link" href="/contact#contact">Enquire about a school presentation &rarr;</a>
        </div>
      </section>
      <section className="section learning-section">
        <div className="container">
          <SectionHeading
            eyebrow="BEYOND THE SCRIPT"
          >
            A Stage for <em>Every Skill</em>
          </SectionHeading>
          <div className="learning-grid">
            {learning.map((item, index) => (
              <Reveal key={item.title}>
                <LearningCard item={item} index={index} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
