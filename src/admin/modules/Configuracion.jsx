const CAMPOS = [
  { key: 'nombre_sitio',           label: 'Nombre del sitio',          tipo: 'text' },
  { key: 'tagline',                label: 'Tagline',                   tipo: 'text' },
  { key: 'email_contacto',         label: 'Correo de contacto',        tipo: 'email' },
  { key: 'email_clinica',          label: 'Correo de la clínica',      tipo: 'email' },
  { key: 'telefono',               label: 'Teléfono',                  tipo: 'text' },
  { key: 'ciudad',                 label: 'Ciudad',                    tipo: 'text' },
  { key: 'redes_instagram',        label: 'Instagram (URL)',           tipo: 'url' },
  { key: 'redes_facebook',         label: 'Facebook (URL)',            tipo: 'url' },
  { key: 'redes_youtube',          label: 'YouTube (URL)',             tipo: 'url' },
  { key: 'inscripciones_abiertas', label: 'Inscripciones abiertas',   tipo: 'check' },
];

export default function Configuracion() {
  return (
    <div>
      <h1 style={s.title}>Configuración general</h1>
      <p style={s.desc}>Datos globales del sitio. Los cambios se reflejan en todo el portal.</p>

      <div style={s.card}>
        <div style={s.grid}>
          {CAMPOS.map(c => (
            <div key={c.key} style={c.tipo === 'check' ? s.fieldFull : s.field}>
              <label style={s.label}>{c.label}</label>
              {c.tipo === 'check' ? (
                <label style={s.checkLabel}>
                  <input type="checkbox" style={{ marginRight: '8px' }} />
                  Activar
                </label>
              ) : (
                <input style={s.input} type={c.tipo} placeholder={c.label} />
              )}
            </div>
          ))}
        </div>
        <div style={s.actions}>
          <button style={s.btnSave}>Guardar configuración</button>
        </div>
      </div>
    </div>
  );
}

const s = {
  title: { fontSize: '1.4rem', fontFamily: '"Playfair Display", Georgia, serif', fontWeight: 400, color: '#1a1510', marginBottom: '4px' },
  desc:  { fontSize: '0.78rem', color: '#888', marginBottom: '24px' },
  card:  { background: '#fff', border: '1px solid #e5e5e5', padding: '28px' },
  grid:  { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '24px' },
  field: { display: 'flex', flexDirection: 'column', gap: '5px' },
  fieldFull: { display: 'flex', flexDirection: 'column', gap: '5px', gridColumn: '1 / -1' },
  label: { fontSize: '0.68rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: '#888' },
  input: { padding: '9px 12px', border: '1px solid #ddd', fontSize: '0.88rem', outline: 'none', fontFamily: '"Inter", system-ui' },
  checkLabel: { fontSize: '0.85rem', color: '#444', display: 'flex', alignItems: 'center', cursor: 'pointer' },
  actions: { borderTop: '1px solid #f0f0f0', paddingTop: '20px' },
  btnSave: { background: '#9b2525', color: '#fff', border: 'none', padding: '11px 24px', fontSize: '0.78rem', letterSpacing: '0.08em', cursor: 'pointer' },
};
