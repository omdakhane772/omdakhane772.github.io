import React, { useEffect } from 'react';
import { BackgroundEffects } from './components/BackgroundEffects';
import { CustomCursor } from './components/CustomCursor';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Skills } from './components/Skills';
import { Projects } from './components/Projects';
import { ArchitectureLab } from './components/ArchitectureLab';
import { Terminal } from './components/Terminal';
import { Experience } from './components/Experience';
import { Roadmap } from './components/Roadmap';
import { ResumeSection } from './components/ResumeSection';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { BackToTop } from './components/BackToTop';

export const App = () => {
  useEffect(() => {
    // Scroll reveal observer
    const rvElements = document.querySelectorAll('.rv');
    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('in');
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.08 }
      );
      rvElements.forEach((el) => observer.observe(el));
      return () => observer.disconnect();
    } else {
      rvElements.forEach((el) => el.classList.add('in'));
    }
  }, []);

  return (
    <>
      <a className="skip" href="#about">
        Skip to content
      </a>

      {/* Ambient Visuals */}
      <BackgroundEffects />
      <CustomCursor />

      {/* Navigation */}
      <Navbar />

      {/* Main Content Sections */}
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <ArchitectureLab />
        <Terminal />
        <Experience />
        <Roadmap />
        <ResumeSection />
        <Contact />
      </main>

      {/* Footer and Navigation Enhancements */}
      <Footer />
      <BackToTop />
    </>
  );
};

export default App;
