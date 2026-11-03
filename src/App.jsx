import { About } from './components/About';
import { Atmosphere } from './components/Atmosphere';
import { CommandPalette } from './components/CommandPalette';
import { Contact } from './components/Contact';
import { Experience } from './components/Experience';
import { Footer } from './components/Footer';
import { Hero } from './components/Hero';
import { Nav } from './components/Nav';
import { Projects } from './components/Projects';
import { Skills } from './components/Skills';
import { usePageEffects } from './hooks/usePageEffects';

export default function App() {
  usePageEffects();

  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>
      <Atmosphere />
      <Nav />
      <main id="main" tabIndex={-1}>
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Skills />
        <Contact />
      </main>
      <Footer />
      <CommandPalette />
    </>
  );
}
