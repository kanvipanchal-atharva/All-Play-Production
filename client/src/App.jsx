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
import DoodleRail from "./components/Doodles";
export default function App() {
  const [selectedProgram, setSelectedProgram] = useState(new URLSearchParams(window.location.search).get("program") || "");
  const [policy, setPolicy] = useState(null);
  const page = window.location.pathname.replace(/\/$/, "");
  useEffect(() => {
    document.title = page === "/founder" ? "Our Founder | All Play Productions" : page === "/about-theatre" ? "About the Theatre | All Play Productions" : "All Play Productions | Theatre and Drama Training";
  }, [page]);
  return (
    <MotionConfig reducedMotion="user">
      <Header />
      <DoodleRail />
      <main id="main">
        {page === "/founder" ? <FounderPage /> : page === "/about-theatre" ? <TheatrePage /> : <>
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
