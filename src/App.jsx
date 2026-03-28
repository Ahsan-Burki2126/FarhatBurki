import { useState, useCallback } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { SiteProvider } from './context/SiteContext';
import { useLenis } from './hooks/useLenis';
import Preloader from './components/Loader/Preloader';
import CustomCursor from './components/Cursor/CustomCursor';
import Navigation from './components/Navigation/Navigation';
import Hero from './components/Hero/Hero';
import Portfolio from './components/Portfolio/Portfolio';
import About from './components/About/About';
import Services from './components/Services/Services';
import Contact from './components/Contact/Contact';
import SectionTransition from './components/Common/SectionTransition';
import MarqueeStrip from './components/Common/MarqueeStrip';
import GlobalBackground from './components/Common/GlobalBackground';
import AdminApp from './pages/AdminApp';
import './styles/index.css';

function MainSite() {
  const [isLoaded, setIsLoaded] = useState(false);
  useLenis();

  const handlePreloaderComplete = useCallback(() => {
    setIsLoaded(true);
  }, []);

  return (
    <>
      <Preloader onComplete={handlePreloaderComplete} />
      <CustomCursor />
      <Navigation />

      <GlobalBackground />

      <main>
        <Hero />
        <MarqueeStrip
          items={['PREMIUM MOTION GRAPHICS', 'FAST DELIVERY', 'EXCLUSIVE DESIGNS', 'TOP-NOTCH QUALITY', 'CINEMATIC EDITING', 'COLOR GRADING']}
          variant="top"
          speed={28}
          useStar
        />
        <SectionTransition direction="left" />
        <Portfolio />
        <MarqueeStrip
          items={['VIDEO EDITOR', 'STORYTELLER', 'CREATIVE DIRECTOR', 'MOTION DESIGNER', 'COLOR GRADER', 'VFX ARTIST']}
          variant="divider"
          speed={22}
          direction={-1}
        />
        <SectionTransition direction="right" />
        <About />
        <MarqueeStrip
          items={['1000+ CLIENTS', '50M+ VIEWS', '3000+ VIDEOS', '9 YEARS EXPERIENCE']}
          variant="stats"
          speed={18}
        />
        <SectionTransition direction="left" />
        <Services />
        <SectionTransition direction="right" />
        <Contact />
      </main>

      {/* Film Grain Overlay */}
      <div className="film-grain" />
    </>
  );
}

function App() {
  return (
    <SiteProvider>
      <Router>
        <Routes>
          <Route path="/admin/*" element={<AdminApp />} />
          <Route path="/*" element={<MainSite />} />
        </Routes>
      </Router>
    </SiteProvider>
  );
}

export default App;
