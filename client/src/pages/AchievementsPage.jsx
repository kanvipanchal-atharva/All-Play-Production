import { Award } from "lucide-react";

export default function AchievementsPage() {
  return (
    <article className="profile-page achievements-page">
      <div className="container">
        <div className="achievements-layout">
          <figure className="achievement-portrait">
            <span className="achievement-year">Recognition · 2026</span>
            <img
              className="achievements-photo"
              src="/documents/award.png"
              width="959"
              height="1280"
              alt="Mrs. Varsha Rane holding her award"
            />
            <figcaption>Mrs. Varsha Rane <span>Founder, All Play Productions</span></figcaption>
          </figure>
          <section className="achievement-card" aria-labelledby="award-title">
            <p className="eyebrow">LEADERSHIP · CREATIVITY · COMMUNITY</p>
            <h1 id="award-title">A journey shaped by <em>creative impact</em></h1>
            <div className="achievement-award-name">
              <Award size={25} aria-hidden="true" />
              <span>Emerging Leader Entrepreneur <strong>Award 2026</strong></span>
            </div>
            <p className="achievement-description">Mrs. Varsha Rane, Founder of All Play Productions and Trustee of Atharva University, empowers youth through theatre and creative expression. Through her social and educational initiatives, she has positively impacted young lives, inspiring confidence, creativity, and meaningful change.</p>
            <div className="achievement-impact">
              <div><strong>600+</strong><span>young lives impacted</span></div>
              <div><strong>50+</strong><span>productions created</span></div>
            </div>
          </section>
        </div>
      </div>
    </article>
  );
}
