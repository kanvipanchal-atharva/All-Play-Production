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
              description="Four ways to find your place on stage."
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
            <a href="#contact" className="text-link">
              Ask About the Batch <ArrowUpRight size={18} />
            </a>
          </div>
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
