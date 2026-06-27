import { useState, useMemo, createContext, useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { darkTheme, lightTheme } from './theme/theme';

// Sitio público
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

// Panel admin
import { AuthProvider } from './admin/AuthContext';
import ProtectedRoute from './admin/ProtectedRoute';
import AdminLayout from './admin/AdminLayout';
import Login from './admin/Login';
import Dashboard from './admin/Dashboard';
import Configuracion from './admin/modules/Configuracion';
import {
  Noticias, Eventos, Programas, Seminarios, Inscripciones,
  Docentes, Publicaciones, Biblioteca, Multimedia as MultimediaAdmin,
  Clinica, Comunidad, Investigacion, Usuarios,
} from './admin/modules/index.jsx';

export const ColorModeContext = createContext({ toggleColorMode: () => {}, mode: 'dark' });

// ── Sitio público ──────────────────────────────────────────────────────────────
function PublicSite() {
  const [mode, setMode] = useState('dark');
  const [showIntro, setShowIntro] = useState(true);

  const colorMode = useMemo(() => ({
    toggleColorMode: () => setMode(prev => prev === 'dark' ? 'light' : 'dark'),
    mode,
  }), [mode]);

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

// ── Panel admin ────────────────────────────────────────────────────────────────
function AdminPanel() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="login" element={<Login />} />
        <Route path="*" element={
          <ProtectedRoute>
            <AdminLayout>
              <Routes>
                <Route index            element={<Dashboard />} />
                <Route path="noticias"      element={<Noticias />} />
                <Route path="eventos"       element={<Eventos />} />
                <Route path="programas"     element={<Programas />} />
                <Route path="seminarios"    element={<Seminarios />} />
                <Route path="inscripciones" element={<Inscripciones />} />
                <Route path="docentes"      element={<Docentes />} />
                <Route path="publicaciones" element={<Publicaciones />} />
                <Route path="biblioteca"    element={<Biblioteca />} />
                <Route path="multimedia"    element={<MultimediaAdmin />} />
                <Route path="clinica"       element={<Clinica />} />
                <Route path="comunidad"     element={<Comunidad />} />
                <Route path="investigacion" element={<Investigacion />} />
                <Route path="usuarios"      element={<Usuarios />} />
                <Route path="configuracion" element={<Configuracion />} />
                <Route path="*"            element={<Navigate to="/admin" replace />} />
              </Routes>
            </AdminLayout>
          </ProtectedRoute>
        } />
      </Routes>
    </AuthProvider>
  );
}

// ── Router raíz ────────────────────────────────────────────────────────────────
export default function App() {
  return (
    <Routes>
      <Route path="/admin/*" element={<AdminPanel />} />
      <Route path="/*"       element={<PublicSite />} />
    </Routes>
  );
}
