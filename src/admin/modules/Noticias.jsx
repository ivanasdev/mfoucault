import ModuloBase from './ModuloBase';
import { formStyles as s } from './formStyles';

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
          <input className="cmf-input" style={s.input} placeholder="Título de la noticia" />
        </div>
        <div style={s.field}>
          <label style={s.label}>Fecha de publicación</label>
          <input className="cmf-input" style={s.input} type="date" />
        </div>
        <div style={{ ...s.field, gridColumn: '1 / -1' }}>
          <label style={s.label}>Resumen</label>
          <textarea className="cmf-input" style={s.textarea} rows={3} placeholder="Breve descripción..." />
        </div>
        <div style={{ ...s.field, gridColumn: '1 / -1' }}>
          <label style={s.label}>Contenido</label>
          <textarea className="cmf-input" style={s.textarea} rows={8} placeholder="Contenido completo de la noticia..." />
        </div>
        <div style={s.field}>
          <label style={s.label}>Imagen de portada</label>
          <input className="cmf-input" style={s.input} type="file" accept="image/*" />
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
        <button className="cmf-btn-primary" style={s.btnSave}>Guardar noticia</button>
        <button className="cmf-btn-secondary" style={s.btnCancel} onClick={onCancel}>Cancelar</button>
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
