import { useState, useMemo, createContext, useContext } from 'react';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { darkTheme, lightTheme } from './theme/theme';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Hero from './components/sections/Hero';
import Manifesto from './components/sections/Manifesto';
import AcademicOffer from './components/sections/AcademicOffer';
import Seminars from './components/sections/Seminars';
import Library from './components/sections/Library';
import Publications from './components/sections/Publications';
import ResearchLines from './components/sections/ResearchLines';
import Community from './components/sections/Community';
import Multimedia from './components/sections/Multimedia';
import Clinic from './components/sections/Clinic';
import BorromeanIntro from './components/intro/BorromeanIntro';

export const ColorModeContext = createContext({
  toggleColorMode: () => {},
  mode: 'dark',
});

export default function App() {
  const [mode, setMode] = useState('dark');
  const [showIntro, setShowIntro] = useState(true);

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => setMode((prev) => (prev === 'dark' ? 'light' : 'dark')),
      mode,
    }),
    [mode]
  );

  const theme = mode === 'dark' ? darkTheme : lightTheme;

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {showIntro && <BorromeanIntro onComplete={() => setShowIntro(false)} />}
        <Header />
        <main>
          <Hero />
          <Manifesto />
          <AcademicOffer />
          <Seminars />
          <Library />
          <Publications />
          <ResearchLines />
          <Community />
          <Clinic />
          <Multimedia />
        </main>
        <Footer />
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}
