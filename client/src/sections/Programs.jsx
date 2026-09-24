import { useState } from "react";
import { SectionHeading, Reveal } from "../components/UI";
import { ProgramCard, LearningCard } from "../components/Cards";
import { programs, learning } from "../data";
const featuredPrograms = [
  {
    id: "school-of-drama-theatre",
    title: "School of Drama & Theatre",
    description: "A half-year drama course for young performers, with in-depth training and a final presentation at Atharva auditorium.",
  },
  {
    id: "all-play-carnival-of-joy",
    title: "All Play A Carnival of Joy",
    description: "A theatre carnival celebrating every child's chance to explore, express and perform, supported by Atharva Foundation.",
  },
  {
    id: "all-play-production",
    title: "All Play Production",
    description: "A woman blessed with mystical powers has always struggled to live a “normal” life. Different from those around her, she often finds herself misunderstood and unaccepted by society. Her deeply personal journey explores resilience, vulnerability, and the courage to embrace her true self.",
  },
];
export default function Programs({ onSelect }) {
  const [activeProgram, setActiveProgram] = useState(null);
  const showProgramDescription = (programId) => {
    setActiveProgram(programId);
  };
  return (
    <>
      <section className="programs-intro-section" aria-label="About our programs">
        <div className="container">
          <div className="profile-intro programs-intro">
            <div>
              <p className="eyebrow">FIND YOUR SPOTLIGHT</p>
              <h1>Learn, Perform <em>and Grow</em></h1>
            </div>
          </div>
        </div>
      </section>
      <section className="section featured-programs-section programs-design" aria-label="Featured programs">
        <div className="container">
          <div className="featured-programs-grid">
            {featuredPrograms.map((program) => (
              <button className="featured-program-card" key={program.id} type="button" onClick={() => showProgramDescription(program.id)} aria-controls={`${program.id}-description`} aria-expanded={activeProgram === program.id}>
                <span className="eyebrow">EXPLORE</span>
                <h2>{program.title}</h2>
                <span className="text-link">Read more ↓</span>
              </button>
            ))}
          </div>
          <div className="featured-program-descriptions">
            {featuredPrograms.filter((program) => program.id === activeProgram).map((program) => (
              <article className={`featured-program-description featured-description-${program.id}`} id={`${program.id}-description`} key={program.id}>
                <h2>{program.title}</h2>
                {program.id === "school-of-drama-theatre" ? (
                  <div className="drama-course-details">
                    <p>Thank you for your interest in All Play Productions’ School of Drama & Theatre!</p>
                    <h3>Half-Year Drama Course</h3>
                    <ul>
                      <li><strong>Age groups:</strong> 7–14 years and 15–19 years</li>
                      <li><strong>Sessions:</strong> Three times a week: two weekday sessions and one Sunday session</li>
                      <li>35 in-depth drama sessions</li>
                      <li>Final presentation at Atharva auditorium with a certificate</li>
                      <li>Limited seats in each batch</li>
                    </ul>
                    <p><strong>Venue:</strong> The Village, Art and Culture Centre, Kora Kendra Hall, Shimpoli Road, Borivali West, Mumbai</p>
                    <p><strong>Contact:</strong> <a href="tel:9082244109">9082244109</a> | <a href="tel:9930255054">9930255054</a> | <a href="tel:9167967756">9167967756</a></p>
                    <p className="drama-course-motto">Learn · Express · Perform · Grow 🎭✨</p>
                  </div>
                ) : program.id === "all-play-production" ? (
                  <div className="drama-course-details">
                    <p className="eyebrow">OUR FIRST SHORT FILM</p>
                    <h3>Bol Bol Raani, <em>Itta Itta Aani</em></h3>
                    <p>{program.description}</p>
                    <p>The film offers a glimpse into the world of a woman who exists within her own universe—resilient and powerful, yet vulnerable in moments when the world refuses to understand her. <em>Bol Bol Raani, Itta Itta Aani</em> follows her journey of self-discovery as she learns to understand, accept, and come to terms with who she truly is.</p>
                    <p>Written and directed by <strong>Varshaa Raane</strong>, the film also marks her acting debut, alongside students from her <strong>School of Drama and Theatre</strong>.</p>
                    <p><strong>All Play Productions, in association with Atharva University, Mumbai.</strong></p>
                  </div>
                ) : (
                  <p>{program.description}</p>
                )}
              </article>
            ))}
          </div>
        </div>
      </section>
      <section id="programs" className="section programs-section programs-design">
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
          <p><a className="text-link" href="/documents/all-play-leaflet.pdf" target="_blank" rel="noreferrer">Explore our theatre (PDF) &rarr;</a></p>
        </div>
      </section>
      <section className="section school-outreach-section programs-design">
        <div className="container">
          <SectionHeading eyebrow="THEATRE IN YOUR SCHOOL" description="An introduction to All Play Productions, Atharva Foundation and Atharva University through short videos and a practical demo class led by a theatre trainer.">
            A First Step <em>onto the Stage</em>
          </SectionHeading>
          <p>The school presentation lasts approximately 1 to 1.5 hours. It introduces children to drama, creative expression and the rich theatre culture of Maharashtra.</p>
          <a className="text-link" href="/contact#contact">Enquire about a school presentation &rarr;</a>
        </div>
      </section>
      <section className="section learning-section programs-design">
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
