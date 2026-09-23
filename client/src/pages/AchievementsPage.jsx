export default function AchievementsPage() {
  return (
    <article className="profile-page achievements-page">
      <div className="container">
        <div className="achievements-layout">
          <img
            className="achievements-photo"
            src="/Founder.jpeg"
            width="959"
            height="1280"
            alt="Mrs. Varsha Rane, Founder and Creator of All Play Productions"
          />
          <section className="achievement-card" aria-labelledby="award-title">
            <p className="eyebrow">AWARDS</p>
            <h1 id="award-title">Emerging Leader Entrepreneur <em>Award 2026</em></h1>
            <p>Mrs. Varsha Rane, Founder of All Play Productions and Trustee of Atharva University, empowers youth through theatre and creative expression. Through her social and educational initiatives, she has positively impacted 600+ young lives, inspiring confidence, creativity, and meaningful change.</p>
          </section>
        </div>
      </div>
    </article>
  );
}
