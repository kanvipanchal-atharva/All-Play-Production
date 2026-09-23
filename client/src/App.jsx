import { useEffect, useState } from "react";
import { MotionConfig } from "framer-motion";
import Header from "./components/Header";
import Footer, { FloatingActions } from "./components/Footer";
import Modal from "./components/Modal";
import Hero from "./sections/Hero";
import About from "./sections/About";
import Programs from "./sections/Programs";
import WhyTheatre from "./sections/WhyTheatre";
import Community from "./sections/Community";
import Contact from "./sections/Contact";
import FuturePlans from "./sections/FuturePlans";
import FounderPage from "./pages/FounderPage";
import TheatrePage from "./pages/TheatrePage";
import AchievementsPage from "./pages/AchievementsPage";
import DoodleRail from "./components/Doodles";
const pageTitles = {
  "/founder": "Our Founder",
  "/about-theatre": "About the Theatre",
  "/programs": "Our Programs",
  "/why-theatre": "Why Theatre?",
  "/performances": "Performances",
  "/gallery": "Gallery",
  "/contact": "Contact",
};
function ContentPage({ title, children }) {
  return <article className="content-page">
    <div className="container content-page-intro"><h1>{title}</h1></div>
    {children}
  </article>;
}
export default function App() {
  const [selectedProgram, setSelectedProgram] = useState(new URLSearchParams(window.location.search).get("program") || "");
  const [policy, setPolicy] = useState(null);
  const page = window.location.pathname.replace(/\/$/, "");
  useEffect(() => {
    document.title = pageTitles[page] ? `${pageTitles[page]} | All Play Productions` : "All Play Productions | Theatre and Drama Training";
  }, [page]);
  return (
    <MotionConfig reducedMotion="user">
      <Header />
      <DoodleRail />
      <main id="main">
        {page === "/founder" ? <FounderPage /> : page === "/about-theatre" ? <AchievementsPage /> : page === "/why-theatre" ? <>
          <TheatrePage />
          <WhyTheatre />
        </> : pageTitles[page] ? <ContentPage title={pageTitles[page]}>
          {page === "/programs" && <Programs onSelect={setSelectedProgram} />}
          {page === "/performances" && <Community section="performances" />}
          {page === "/gallery" && <Community section="gallery" />}
          {page === "/contact" && <Contact selectedProgram={selectedProgram} onSelect={setSelectedProgram} />}
        </ContentPage> : <>
        <Hero />
        <div className="values-strip" aria-label="Our approach">
          <span>IMAGINATION</span>
          <span aria-hidden="true">✳</span>
          <span>EXPRESSION</span>
          <span aria-hidden="true">✳</span>
          <span>CONFIDENCE</span>
          <span aria-hidden="true">✳</span>
          <span>CONNECTION</span>
          <span aria-hidden="true">✳</span>
          <span>THE JOY OF THEATRE</span>
        </div>
        <About />
        <Programs onSelect={setSelectedProgram} />
        <WhyTheatre />
        <Community />
        <FuturePlans />
        <Contact
          selectedProgram={selectedProgram}
          onSelect={setSelectedProgram}
        />
        </>}
      </main>
      <Footer onPolicy={setPolicy} onSelect={setSelectedProgram} />
      <FloatingActions />
      {policy && (
        <Modal
          title={`${policy} — Placeholder`}
          onClose={() => setPolicy(null)}
        >
          <p>
            The approved {policy.toLowerCase()} is to be confirmed before
            launch.
          </p>
          <p>
            This preview validates enquiry information without storing it or
            sending it to the organisation. No account, analytics or advertising
            cookies are used. Google Fonts and Instagram links connect to
            external providers.
          </p>
          <p>
            Registration, payment, refund and cancellation terms have not been
            supplied. No admissions or places are confirmed through this site.
          </p>
        </Modal>
      )}
    </MotionConfig>
  );
}
