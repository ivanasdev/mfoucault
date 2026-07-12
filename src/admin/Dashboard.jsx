import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

const API = import.meta.env.VITE_API_URL ?? 'http://localhost:9696';

// Módulos con conteo real disponible en el backend hoy.
const STATS_CONECTADAS = [
  { key: 'usuarios',   label: 'Usuarios',   path: '/admin/usuarios',   color: '#9b2525', endpoint: '/api/auth/usuarios' },
  { key: 'seminarios', label: 'Seminarios', path: '/admin/seminarios', color: '#1a3a4a', endpoint: '/api/seminarios' },
];

// Resto de módulos: aún sin endpoint de listado en el backend.
const STATS_PENDIENTES = [
  { label: 'Noticias',          path: '/admin/noticias',      color: '#2a3a20' },
  { label: 'Programas',         path: '/admin/programas',     color: '#3a2a4a' },
  { label: 'Docentes',          path: '/admin/docentes',      color: '#4a2a1a' },
  { label: 'Publicaciones',     path: '/admin/publicaciones', color: '#1a4a3a' },
  { label: 'Consultas clínica', path: '/admin/clinica',       color: '#4a1a3a' },
];

const ACCESOS = [
  { label: 'Nuevo usuario',       path: '/admin/usuarios' },
  { label: 'Nuevo seminario',     path: '/admin/seminarios' },
  { label: 'Nueva noticia',       path: '/admin/noticias' },
  { label: 'Nuevo programa',      path: '/admin/programas' },
  { label: 'Nuevo docente',       path: '/admin/docentes' },
  { label: 'Nueva publicación',   path: '/admin/publicaciones' },
  { label: 'Ver inscripciones',   path: '/admin/inscripciones' },
];

export default function Dashboard() {
  const navigate = useNavigate();
  const { user, authHeaders } = useAuth();
  const [conteos, setConteos] = useState({});

  useEffect(() => {
    let ignore = false;
    (async () => {
      const resultados = await Promise.all(
        STATS_CONECTADAS.map(async st => {
          try {
            const res = await fetch(`${API}${st.endpoint}`, { headers: authHeaders() });
            const data = await res.json();
            return [st.key, res.ok ? (data.data?.length ?? 0) : null];
          } catch {
            return [st.key, null];
          }
        })
      );
      if (!ignore) setConteos(Object.fromEntries(resultados));
    })();
    return () => { ignore = true; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <h1 style={s.title}>Panel de administración</h1>
      <p style={s.sub}>
        Colegio Michel Foucault · Gestión de contenidos
        {user?.nombre && <> · <span style={s.userTag}>{user.nombre}</span></>}
      </p>

      {/* Stats */}
      <div style={s.grid}>
        {STATS_CONECTADAS.map(st => (
          <div
            key={st.key}
            className="cmf-card"
            style={{ ...s.card, borderTopColor: st.color }}
            onClick={() => navigate(st.path)}
          >
            <span style={s.cardValue}>
              {conteos[st.key] == null ? '—' : conteos[st.key]}
            </span>
            <span style={s.cardLabel}>{st.label}</span>
          </div>
        ))}
        {STATS_PENDIENTES.map(st => (
          <div
            key={st.label}
            className="cmf-card"
            style={{ ...s.card, borderTopColor: st.color }}
            onClick={() => navigate(st.path)}
          >
            <span style={s.cardValue}>—</span>
            <span style={s.cardLabel}>{st.label}</span>
          </div>
        ))}
      </div>

      {/* Accesos rápidos */}
      <h2 style={s.sectionTitle}>Accesos rápidos</h2>
      <div style={s.accesos}>
        {ACCESOS.map(a => (
          <button
            key={a.label}
            className="cmf-btn-ghost"
            style={s.accesoBtn}
            onClick={() => navigate(a.path)}
          >
            + {a.label}
          </button>
        ))}
      </div>
    </div>
  );
}

const s = {
  title: {
    fontSize: '1.5rem',
    fontFamily: '"Playfair Display", Georgia, serif',
    fontWeight: 400,
    color: '#1a1510',
    marginBottom: '4px',
  },
  sub: {
    fontSize: '0.78rem',
    color: '#888',
    marginBottom: '28px',
    letterSpacing: '0.05em',
  },
  userTag: {
    color: '#9b2525',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))',
    gap: '16px',
    marginBottom: '36px',
  },
  card: {
    background: '#fff',
    borderRadius: '2px',
    borderTop: '3px solid #9b2525',
    boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
    padding: '20px',
    cursor: 'pointer',
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
  },
  cardValue: {
    fontSize: '2rem',
    fontFamily: '"Playfair Display", Georgia, serif',
    color: '#1a1510',
    lineHeight: 1,
  },
  cardLabel: {
    fontSize: '0.72rem',
    color: '#888',
    textTransform: 'uppercase',
    letterSpacing: '0.1em',
  },
  sectionTitle: {
    fontSize: '0.7rem',
    letterSpacing: '0.2em',
    textTransform: 'uppercase',
    color: '#aaa',
    fontWeight: 500,
    marginBottom: '14px',
    fontFamily: '"Inter", system-ui, sans-serif',
  },
  accesos: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '10px',
  },
  accesoBtn: {
    background: '#fff',
    borderRadius: '2px',
    border: '1px solid #e0e0e0',
    padding: '9px 16px',
    fontSize: '0.78rem',
    color: '#444',
    cursor: 'pointer',
    letterSpacing: '0.03em',
  },
};
