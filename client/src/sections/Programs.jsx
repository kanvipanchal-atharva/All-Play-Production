import { useState } from "react";
import { ArrowDown, ArrowUp } from "lucide-react";
import { SectionHeading, Reveal } from "../components/UI";
import { ProgramCard, LearningCard } from "../components/Cards";
import { programs, learning } from "../data";
const featuredPrograms = [
  {
    id: "all-play-carnival-of-joy",
    title: "All Play...A Carnival of Joy !",
    description: "A theatre carnival celebrating every child’s chance to explore, express and perform, supported by Atharva Foundation.",
  },
  {
    id: "school-of-drama-theatre",
    title: "School of Drama & Theatre",
    description: "A half-year drama course for young performers, with in-depth training and a final presentation at Atharva auditorium.",
  },
  {
    id: "all-play-production",
    title: "All Play Productions",
    description: "A woman blessed with mystical powers has always struggled to live a “normal” life. Different from those around her, she often finds herself misunderstood and unaccepted by society. Her deeply personal journey explores resilience, vulnerability, and the courage to embrace her true self.",
  },
];
export default function Programs({ onSelect, hideIntroDescription = false }) {
  const [activeProgram, setActiveProgram] = useState(null);
  const [carnivalMarathi, setCarnivalMarathi] = useState(true);
  const [dramaMarathi, setDramaMarathi] = useState(true);
  const showProgramDescription = (programId) => {
    setActiveProgram((currentProgram) => currentProgram === programId ? null : programId);
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
              <button className={`featured-program-card featured-program-card-${program.id}`} key={program.id} type="button" onClick={() => showProgramDescription(program.id)} aria-controls={`${program.id}-description`} aria-expanded={activeProgram === program.id}>
                <span className="eyebrow">EXPLORE</span>
                <h2>{program.title}</h2>
                <span className="text-link">Read more {activeProgram === program.id ? <ArrowUp size={16} /> : <ArrowDown size={16} />}</span>
              </button>
            ))}
          </div>
          <div className="featured-program-descriptions">
            {featuredPrograms.filter((program) => program.id === activeProgram).map((program) => (
              <article className={`featured-program-description featured-description-${program.id}`} id={`${program.id}-description`} key={program.id}>
                <h2>{program.title}</h2>
                {program.id === "school-of-drama-theatre" ? (
                  <div className="drama-course-details">
                    <button className="text-link" type="button" onClick={() => setDramaMarathi((current) => !current)} aria-pressed={dramaMarathi}>
                      {dramaMarathi ? "Read in English" : "मराठीत वाचा"}
                    </button>
                    {dramaMarathi ? (
                      <div lang="mr">
                        <p>मुलांच्या आणि तरुणांच्या सर्जनशीलतेला, आत्मविश्वासाला आणि अभिनय कौशल्यांना वाव देणारी ही एक अनोखी नाट्यशाळा आहे. महाराष्ट्राच्या समृद्ध आणि प्राचीन नाट्यपरंपरेची ओळख करून देणे, हा या उपक्रमाचा एक महत्त्वाचा भाग आहे.</p>
                        <p>मराठी रंगभूमीची समृद्ध सांस्कृतिक परंपरा जतन करून ती नव्या पिढीपर्यंत पोहोचवणे, हे या कार्यक्रमाचे उद्दिष्ट आहे. मराठी रंगभूमीची खास ओळख असलेली बुद्धिमत्ता, चातुर्य, सर्जनशीलता आणि प्रभावी अभिव्यक्तीची परंपरा अनुभवण्याची संधी या माध्यमातून विद्यार्थ्यांना मिळते.</p>
                        <h3>अभ्यासक्रमाची ठळक वैशिष्ट्ये</h3>
                        <ul>
                          <li>वयोगट: ७–१४ वर्षे आणि १५–१९ वर्षे</li>
                          <li>सखोल नाट्य प्रशिक्षण: नाटक व अभिनयाच्या २१ विशेष प्रशिक्षण सत्रांचा समावेश</li>
                          <li>अंतिम सादरीकरण: अथर्वाच्या प्रतिष्ठित सभागृहात ४५ मिनिटांचे नाट्यसादरीकरण</li>
                          <li>प्रमाणपत्र: अभ्यासक्रम पूर्ण केल्यानंतर प्रमाणपत्र प्रदान केले जाईल.</li>
                          <li>मर्यादित प्रवेश: प्रत्येक विद्यार्थ्याकडे वैयक्तिक लक्ष देता यावे यासाठी लहान गटांमध्ये प्रशिक्षण.</li>
                          <li>सादरीकरणाच्या संधी: संस्थेच्या अंतर्गत नाट्य आणि चित्रपट निर्मितींमध्ये सहभागी होण्याची संधी.</li>
                        </ul>
                        <p>हा कार्यक्रम युवा कलाकारांना रंगभूमीचा प्रत्यक्ष अनुभव घेत शिका · व्यक्त व्हा · सादर करा · प्रगती करा या प्रवासातून पुढे जाण्याची एक अनमोल संधी देतो.</p>
                        <p>स्थळ: द व्हिलेज, आर्ट अँड कल्चर सेंटर, कोरा केंद्र हॉल, शिंपोली रोड, बोरिवली पश्चिम, मुंबई.</p>
                        <p>संपर्क: <a href="tel:9082244109">9082244109</a> | <a href="tel:9930255054">9930255054</a> | <a href="tel:9167967756">9167967756</a></p>
                      </div>
                    ) : (
                      <div lang="en">
                    <p>Thank you for your interest in All Play Productions’ School of Drama &amp; Theatre!</p>
                    <p>A unique theatre school for children and young people, dedicated to nurturing their creativity, confidence and performance skills while introducing them to Maharashtra’s rich and age-old theatrical tradition.</p>
                    <p>The programme aims to preserve and pass on this cultural heritage to the younger generation, helping them explore the intelligence, wit, creativity and expressive traditions that define Marathi theatre.</p>
                    <h3>Course Highlights</h3>
                    <ul>
                      <li><strong>Age Groups:</strong> 7–14 years and 15–19 years</li>
                      <li><strong>In-depth Drama Training:</strong> 21 focused drama sessions</li>
                      <li><strong>Final Presentation:</strong> A 45-minute performance at Atharva’s prestigious auditorium</li>
                      <li><strong>Certificate:</strong> Certificate awarded upon completion</li>
                      <li><strong>Limited Seats:</strong> Small batches for focused learning</li>
                      <li><strong>Performance Opportunities:</strong> Opportunities to participate in in-house theatre and film productions</li>
                    </ul>
                    <p>This programme offers a valuable opportunity for young performers to Learn · Express · Perform · Grow while experiencing the world of theatre firsthand.</p>
                    <p><strong>Venue:</strong> The Village, Art and Culture Centre, Kora Kendra Hall, Shimpoli Road, Borivali West, Mumbai</p>
                    <p><strong>Contact:</strong> <a href="tel:9082244109">9082244109</a> | <a href="tel:9930255054">9930255054</a> | <a href="tel:9167967756">9167967756</a></p>
                      </div>
                    )}
                  </div>
                ) : program.id === "all-play-carnival-of-joy" ? (
                  <div className="drama-course-details">
                    <button className="text-link" type="button" onClick={() => setCarnivalMarathi((current) => !current)} aria-pressed={carnivalMarathi}>
                      {carnivalMarathi ? "Read in English" : "मराठीत वाचा"}
                    </button>
                    {carnivalMarathi ? (
                      <div lang="mr">
                        <p>ऑल प्ले…आनंदाचा उत्सव या उपक्रमात आपले स्वागत आहे! ऑल प्ले प्रॉडक्शन्सचा हा एक विशेष उपक्रम असून, अथर्व फाउंडेशनच्या सहकार्याने वंचित घटकांतील मुलांपर्यंत नाट्यकलेचा आणि सर्जनशील अभिव्यक्तीचा आनंद पोहोचवण्याचे कार्य करतो.</p>
                        <p>प्रत्येक मूल महत्त्वाचे आहे, या दृढ विश्वासावर आधारित हा उपक्रम नाटक, अभिनय आणि रंगमंचीय सादरीकरणाच्या माध्यमातून मुलांमध्ये आत्मविश्वास निर्माण करतो, त्यांना स्वतःला ओळखण्यास मदत करतो आणि निर्भयपणे स्वतःच्या भावना व विचार व्यक्त करण्यासाठी प्रोत्साहित करतो. मुलांना आपल्यातील क्षमता ओळखण्याची, संकोचावर मात करण्याची आणि आपली सर्जनशीलता व्यक्त करण्याची संधी देणारे हे एक सर्वसमावेशक व्यासपीठ आहे.</p>
                        <p>या उपक्रमाची सुरुवात गोराई, मनोरी आणि बोरिवली येथील ग्रामीण व आदिवासी समुदायांतील मुलांपासून झाली. कोविड-१९ महामारीच्या काळात शाळा बंद होत्या आणि इंटरनेट तसेच मोबाईल उपकरणांची उपलब्धता मर्यादित होती. अशा परिस्थितीतही ऑल प्ले प्रॉडक्शन्सने अभिनय, नाटक, रंगभूमी आणि रंगमंचीय सादरीकरणांच्या माध्यमातून मुलांना सहभागी करून घेतले. यामुळे त्यांना स्वतःच्या व्यक्तिमत्त्वाचे विविध पैलू जाणून घेता आले आणि रंगमंचावर सादरीकरण करण्याचा आनंद अनुभवता आला.</p>
                        <h3>उपक्रमाची ठळक वैशिष्ट्ये</h3>
                        <ul>
                          <li>सर्वसमावेशक संधी: वंचित घटकांतील मुलांना नाट्यकला आणि सर्जनशील अभिव्यक्तीची संधी उपलब्ध करून देणे.</li>
                          <li>आत्मविश्वासाची जोपासना: मुलांच्या मनातील संकोच व भीती दूर करून त्यांच्यात आत्मविश्वास निर्माण करणे.</li>
                          <li>सर्जनशीलतेचा विकास: नाटक आणि रंगभूमीच्या माध्यमातून कल्पनाशक्ती, आत्मशोध आणि निर्भय अभिव्यक्तीला प्रोत्साहन देणे.</li>
                          <li>सादरीकरणाच्या संधी: मुलांना आपले कलागुण रंगमंचावर सादर करण्यासाठी व्यासपीठ उपलब्ध करून देणे.</li>
                          <li>समुदायाभिमुख उपक्रम: गोराई, मनोरी आणि बोरिवली येथील ग्रामीण व आदिवासी समुदायांतील मुलांपर्यंत पोहोचणे.</li>
                          <li>सर्वांगीण विकास: संवादकौशल्य, सांघिक कार्य, व्यक्तिमत्त्व विकास आणि भावनिक अभिव्यक्ती यांना प्रोत्साहन देणे.</li>
                        </ul>
                        <p>ऑल प्ले…आनंदाचा उत्सव हा केवळ एक उपक्रम नसून बालपण, सर्जनशीलता आणि सर्वसमावेशकतेचा आनंदोत्सव आहे. प्रत्येक मुलाला शिकण्याची, स्वतःला व्यक्त करण्याची, सहभागी होण्याची आणि स्वतःतील गुणवैशिष्ट्यांसह आत्मविश्वासाने चमकण्याची संधी मिळावी, हा या उपक्रमाचा मुख्य उद्देश आहे.</p>
                      </div>
                    ) : (
                      <div lang="en">
                        <p>Thank you for your interest in All Play…A Carnival of Joy, a special initiative by All Play Productions that brings the joy of theatre and creative expression to underprivileged children.</p>
                        <p>Rooted in the belief that every child matters, the programme uses theatre, drama and stage performances to nurture confidence, encourage self-discovery and empower children to express themselves fearlessly. It provides an inclusive platform for children to discover their potential, overcome inhibitions and showcase their creativity.</p>
                        <p>The journey began with children from rural and tribal communities in Gorai, Manori and Borivali. During the COVID-19 pandemic, when schools were closed and access to the internet and mobile devices was limited, All Play Productions continued engaging children through acting, drama, theatre and stage performances, helping them explore their personalities and discover the joy of performing.</p>
                        <h3>Programme Highlights</h3>
                        <ul>
                          <li>Inclusive Opportunities: Bringing theatre and creative expression to underprivileged children.</li>
                          <li>Confidence Building: Helping children overcome inhibitions and develop self-confidence.</li>
                          <li>Creative Exploration: Encouraging imagination, self-discovery and fearless expression through drama and theatre.</li>
                          <li>Performance Opportunities: Providing a platform for children to showcase their talents on stage.</li>
                          <li>Community Outreach: Engaging children from rural and tribal communities across Gorai, Manori and Borivali.</li>
                          <li>Holistic Development: Nurturing communication, teamwork, personality development and emotional expression.</li>
                        </ul>
                        <p>All Play…A Carnival of Joy is more than a programme; it is a celebration of childhood, creativity and inclusion, where every child gets the opportunity to learn, express, participate and shine.</p>
                      </div>
                    )}
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
              description={hideIntroDescription ? undefined : "Theatre training, workshops and performance opportunities for children and young people."}
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
          <p><a className="text-link" href="/documents/all-play-leaflet.pdf" target="_blank" rel="noreferrer">Explore our theatre &rarr;</a></p>
        </div>
      </section>
      <section className="section school-outreach-section programs-design">
        <div className="container">
          <SectionHeading eyebrow="THEATRE IN YOUR SCHOOL" description="An introduction to All Play Productions, Atharva Foundation and Atharva University through short videos and a practical demo class led by a theatre trainer.">
            A First Step <em>onto the Stage</em>
          </SectionHeading>
          <p>The school presentation lasts approximately 1 to 1.5 hours. It introduces children to drama, creative expression and the rich theatre culture of Maharashtra.</p>
          <a className="text-link" href="/contact#contact">Enquire about a school presentation ↗</a>
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
