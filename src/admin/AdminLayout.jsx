import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

const MODULES = [
  { label: 'Dashboard',         path: '/admin',             icon: '⊞' },
  { label: 'Noticias',          path: '/admin/noticias',    icon: '◈' },
  { label: 'Eventos',           path: '/admin/eventos',     icon: '◷' },
  { label: 'Programas',         path: '/admin/programas',   icon: '◎' },
  { label: 'Seminarios',        path: '/admin/seminarios',  icon: '◉' },
  { label: 'Inscripciones',     path: '/admin/inscripciones', icon: '◐' },
  { label: 'Docentes',          path: '/admin/docentes',    icon: '◑' },
  { label: 'Publicaciones',     path: '/admin/publicaciones', icon: '◧' },
  { label: 'Biblioteca',        path: '/admin/biblioteca',  icon: '◫' },
  { label: 'Multimedia',        path: '/admin/multimedia',  icon: '◭' },
  { label: 'Clínica',           path: '/admin/clinica',     icon: '◬' },
  { label: 'Comunidad',         path: '/admin/comunidad',   icon: '◒' },
  { label: 'Investigación',     path: '/admin/investigacion', icon: '◓' },
  { label: 'Usuarios',          path: '/admin/usuarios',    icon: '◔' },
  { label: 'Configuración',     path: '/admin/configuracion', icon: '◕' },
];

const SIDEBAR_W = 230;

export default function AdminLayout({ children }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  return (
    <div style={s.root}>
      {/* ── Sidebar ── */}
      <aside className={`cmf-sidebar${open ? ' cmf-sidebar-open' : ''}`} style={s.sidebar}>
        <div style={s.sideTop}>
          <span style={s.siteName}>CMF</span>
          <span style={s.siteTag}>Administración</span>
        </div>

        <nav style={s.nav}>
          {MODULES.map(m => (
            <NavLink
              key={m.path}
              to={m.path}
              end={m.path === '/admin'}
              onClick={() => setOpen(false)}
              style={({ isActive }) => ({
                ...s.navItem,
                ...(isActive ? s.navActive : {}),
              })}
            >
              <span style={s.navIcon}>{m.icon}</span>
              {m.label}
            </NavLink>
          ))}
        </nav>

        <button style={s.logoutBtn} onClick={handleLogout}>
          Cerrar sesión
        </button>
      </aside>

      {/* Overlay móvil */}
      {open && (
        <div style={s.overlay} onClick={() => setOpen(false)} />
      )}

      {/* ── Main ── */}
      <div className="cmf-main" style={s.main}>
        {/* Top bar */}
        <header style={s.topbar}>
          <button className="cmf-menu-btn" style={s.menuBtn} onClick={() => setOpen(o => !o)}>
            ☰
          </button>
          <span style={s.topbarUser}>
            {user?.nombre || 'Admin'}
          </span>
        </header>

        {/* Content */}
        <div style={s.content}>
          {children}
        </div>
      </div>
    </div>
  );
}

const s = {
  root: {
    minHeight: '100vh',
    background: '#f4f4f4',
    fontFamily: '"Inter", system-ui, sans-serif',
    display: 'flex',
  },
  sidebar: {
    width: SIDEBAR_W,
    background: '#0f0f0f',
    position: 'fixed',
    top: 0,
    bottom: 0,
    display: 'flex',
    flexDirection: 'column',
    zIndex: 100,
    transition: 'left 0.25s ease',
    overflowY: 'auto',
  },
  sideTop: {
    padding: '24px 20px 18px',
    borderBottom: '1px solid rgba(255,255,255,0.07)',
    flexShrink: 0,
  },
  siteName: {
    display: 'block',
    fontFamily: '"Playfair Display", Georgia, serif',
    fontSize: '1.1rem',
    color: '#ddd3bf',
    letterSpacing: '0.04em',
    marginBottom: '2px',
  },
  siteTag: {
    display: 'block',
    fontSize: '0.58rem',
    letterSpacing: '0.2em',
    textTransform: 'uppercase',
    color: '#6e6458',
  },
  nav: {
    flex: 1,
    padding: '10px 0',
    display: 'flex',
    flexDirection: 'column',
  },
  navItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    padding: '9px 20px',
    fontSize: '0.78rem',
    color: '#6e6458',
    textDecoration: 'none',
    letterSpacing: '0.03em',
    transition: 'color 0.15s, background 0.15s',
    borderLeft: '2px solid transparent',
  },
  navActive: {
    color: '#ddd3bf',
    background: 'rgba(155,37,37,0.12)',
    borderLeft: '2px solid #9b2525',
  },
  navIcon: {
    fontSize: '0.85rem',
    flexShrink: 0,
    width: '16px',
    textAlign: 'center',
  },
  logoutBtn: {
    margin: '12px 16px 20px',
    background: 'transparent',
    border: '1px solid rgba(255,255,255,0.1)',
    color: '#6e6458',
    padding: '9px',
    fontSize: '0.72rem',
    letterSpacing: '0.1em',
    textTransform: 'uppercase',
    cursor: 'pointer',
    transition: 'border-color 0.2s, color 0.2s',
  },
  overlay: {
    position: 'fixed',
    inset: 0,
    background: 'rgba(0,0,0,0.5)',
    zIndex: 99,
  },
  main: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
  },
  topbar: {
    height: '56px',
    background: '#fff',
    borderBottom: '1px solid #e5e5e5',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0 24px',
    position: 'sticky',
    top: 0,
    zIndex: 50,
  },
  menuBtn: {
    background: 'none',
    border: 'none',
    fontSize: '1.2rem',
    cursor: 'pointer',
    color: '#555',
  },
  topbarUser: {
    fontSize: '0.8rem',
    color: '#555',
    letterSpacing: '0.05em',
  },
  content: {
    padding: '28px 30px',
    flex: 1,
  },
};
