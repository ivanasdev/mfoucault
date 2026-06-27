import ModuloBase from './ModuloBase';

const COLUMNAS = [
  { key: 'titulo',    label: 'Título' },
  { key: 'fecha',     label: 'Fecha' },
  { key: 'destacado', label: 'Destacada', render: v => v ? '✓' : '—' },
  { key: 'publicado', label: 'Estado',    render: v => (
    <span style={{ color: v ? '#2a7a2a' : '#aaa', fontSize: '0.72rem', letterSpacing: '0.1em' }}>
      {v ? 'PUBLICADA' : 'BORRADOR'}
    </span>
  )},
];

function FormNueva({ onCancel }) {
  return (
    <div>
      <h2 style={s.formTitle}>Nueva noticia</h2>
      <div style={s.formGrid}>
        <div style={s.field}>
          <label style={s.label}>Título *</label>
          <input style={s.input} placeholder="Título de la noticia" />
        </div>
        <div style={s.field}>
          <label style={s.label}>Fecha de publicación</label>
          <input style={s.input} type="date" />
        </div>
        <div style={{ ...s.field, gridColumn: '1 / -1' }}>
          <label style={s.label}>Resumen</label>
          <textarea style={s.textarea} rows={3} placeholder="Breve descripción..." />
        </div>
        <div style={{ ...s.field, gridColumn: '1 / -1' }}>
          <label style={s.label}>Contenido</label>
          <textarea style={s.textarea} rows={8} placeholder="Contenido completo de la noticia..." />
        </div>
        <div style={s.field}>
          <label style={s.label}>Imagen de portada</label>
          <input style={s.input} type="file" accept="image/*" />
        </div>
        <div style={s.field}>
          <label style={s.label}>Opciones</label>
          <div style={{ display: 'flex', gap: '16px', marginTop: '6px' }}>
            <label style={s.check}><input type="checkbox" /> Destacada</label>
            <label style={s.check}><input type="checkbox" /> Publicar ahora</label>
          </div>
        </div>
      </div>
      <div style={s.actions}>
        <button style={s.btnSave}>Guardar noticia</button>
        <button style={s.btnCancel} onClick={onCancel}>Cancelar</button>
      </div>
    </div>
  );
}

export default function Noticias() {
  return (
    <ModuloBase
      titulo="Noticias y Difusión"
      descripcion="Gestión de noticias, comunicados y contenido de difusión."
      columnas={COLUMNAS}
      datos={[]}
      FormularioNuevo={FormNueva}
    />
  );
}

const s = {
  formTitle: {
    fontFamily: '"Playfair Display", Georgia, serif',
    fontWeight: 400,
    fontSize: '1.2rem',
    color: '#1a1510',
    marginBottom: '20px',
  },
  formGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '16px',
    marginBottom: '24px',
  },
  field: { display: 'flex', flexDirection: 'column', gap: '5px' },
  label: { fontSize: '0.68rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: '#888' },
  input: { padding: '9px 12px', border: '1px solid #ddd', fontSize: '0.88rem', outline: 'none', fontFamily: '"Inter", system-ui' },
  textarea: { padding: '9px 12px', border: '1px solid #ddd', fontSize: '0.88rem', outline: 'none', fontFamily: '"Inter", system-ui', resize: 'vertical' },
  check: { fontSize: '0.82rem', color: '#555', display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' },
  actions: { display: 'flex', gap: '12px' },
  btnSave: { background: '#9b2525', color: '#fff', border: 'none', padding: '11px 24px', fontSize: '0.78rem', letterSpacing: '0.08em', cursor: 'pointer' },
  btnCancel: { background: 'none', border: '1px solid #ccc', padding: '11px 24px', fontSize: '0.78rem', cursor: 'pointer', color: '#666' },
};
