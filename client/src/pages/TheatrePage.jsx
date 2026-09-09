export default function TheatrePage() {
  return (
    <article className="profile-page theatre-page">
      <div className="container">
        <div className="profile-intro">
          <div>
            <p className="eyebrow">ABOUT THE THEATRE</p>
            <h1>All Play… <em>A Carnival of Joy</em></h1>
            <p className="profile-lead">Every child matters. Every voice deserves a stage.</p>
            <p>Created by Mrs. Varsha Rane and supported by Atharva Foundation, All Play Productions brings children and young people together through the transformative power of drama and theatre.</p>
          </div>
          <img src="/Demo.jpeg" width="1600" height="1068" alt="Young All Play performers sharing the stage" />
        </div>
        <div className="theatre-stats" aria-label="Our impact">
          <div><strong>600+</strong><p>School students and college youth trained</p></div>
          <div><strong>50+</strong><p>Productions created under Mrs. Rane’s guidance</p></div>
        </div>
        <div className="profile-body">
          <section>
            <h2>Where Our Story <em>Began</em></h2>
            <p>The journey began with rural and tribal children from Gorai, Manori and Borivali. Theatre and drama became tools for self-discovery, confidence and expression, opening an inclusive space for children to discover their individuality.</p>
            <p>At its heart is the belief that every child matters and that opportunities are waiting to be explored. Children are encouraged to bring their ideas, imagination and unique personalities to the stage.</p>
          </section>
          <section>
            <h2>Learning Through <em>Performance</em></h2>
            <p>Through All Play Productions and the Atharva School of Drama and Performing Arts, young people train in acting, drama, stagecraft and performance. They explore the many facets of their personalities and learn to express themselves boldly.</p>
            <p>The work reaches rural and urban school students as well as college youth. Rehearsals and productions build confidence, creative expression and the courage to share their voices with the world.</p>
          </section>
          <section>
            <h2>From Local Stages to <em>Wider Opportunities</em></h2>
            <p>Young performers have participated in state-level and international competitions. All Play’s journey includes Maharashtra Rajya Balnatya Spardha, Jhankriti, industry encounters and live set visits.</p>
            <p>In-house productions include “Kshitijachya Palikade”, “Ghonga Basant”, “Mi Nahi Janaar Shalela” and “Deva Shree Ganesha”, which Mrs. Rane wrote and directed.</p>
          </section>
          <section>
            <h2>The Next <em>Chapter</em></h2>
            <p>Plans are underway to give young performers opportunities in short films and the entertainment industry. These future opportunities build on All Play’s commitment to nurturing talent, confidence and a lasting love of the performing arts.</p>
            <p>Contact us to learn about available programs and upcoming opportunities.</p>
          </section>
          <div className="button-row">
            <a className="button" href="/#contact">Enquire About Programs &rarr;</a>
            <a className="text-link" href="/founder">Meet Our Founder &rarr;</a>
          </div>
        </div>
      </div>
    </article>
  );
}
