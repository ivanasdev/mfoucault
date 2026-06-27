import { useNavigate } from 'react-router-dom';

const STATS = [
  { label: 'Noticias',       value: '0', path: '/admin/noticias',      color: '#9b2525' },
  { label: 'Programas',      value: '0', path: '/admin/programas',     color: '#1a3a4a' },
  { label: 'Docentes',       value: '0', path: '/admin/docentes',      color: '#2a3a20' },
  { label: 'Publicaciones',  value: '0', path: '/admin/publicaciones', color: '#3a2a4a' },
  { label: 'Multimedia',     value: '0', path: '/admin/multimedia',    color: '#4a2a1a' },
  { label: 'Consultas clínica', value: '0', path: '/admin/clinica',   color: '#1a4a3a' },
];

const ACCESOS = [
  { label: 'Nueva noticia',       path: '/admin/noticias' },
  { label: 'Nuevo programa',      path: '/admin/programas' },
  { label: 'Nuevo docente',       path: '/admin/docentes' },
  { label: 'Nueva publicación',   path: '/admin/publicaciones' },
  { label: 'Subir multimedia',    path: '/admin/multimedia' },
  { label: 'Ver inscripciones',   path: '/admin/inscripciones' },
];

export default function Dashboard() {
  const navigate = useNavigate();

  return (
    <div>
      <h1 style={s.title}>Panel de administración</h1>
      <p style={s.sub}>Colegio Michel Foucault · Gestión de contenidos</p>

      {/* Stats */}
      <div style={s.grid}>
        {STATS.map(st => (
          <div
            key={st.label}
            style={{ ...s.card, borderTopColor: st.color }}
            onClick={() => navigate(st.path)}
          >
            <span style={s.cardValue}>{st.value}</span>
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
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))',
    gap: '16px',
    marginBottom: '36px',
  },
  card: {
    background: '#fff',
    borderTop: '3px solid #9b2525',
    padding: '20px',
    cursor: 'pointer',
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
    transition: 'box-shadow 0.2s',
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
    border: '1px solid #e0e0e0',
    padding: '9px 16px',
    fontSize: '0.78rem',
    color: '#444',
    cursor: 'pointer',
    letterSpacing: '0.03em',
    transition: 'border-color 0.2s, color 0.2s',
  },
};
