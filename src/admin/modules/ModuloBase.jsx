import { useState } from 'react';

// Componente reutilizable para cualquier módulo del panel.
// Recibe: título, columnas de la tabla, datos, y un formulario opcional.

export default function ModuloBase({ titulo, descripcion, columnas, datos = [], FormularioNuevo, onCreated, onEliminar, cargando = false }) {
  const [vista, setVista]   = useState('lista');    // 'lista' | 'form'
  const [filaEditando, setFilaEditando] = useState(null);
  const [buscar, setBuscar] = useState('');
  const [eliminandoId, setEliminandoId] = useState(null);

  const handleEliminar = async (row) => {
    if (!onEliminar) return;
    if (!window.confirm('¿Seguro que quieres eliminar este registro?')) return;
    setEliminandoId(row.id);
    try {
      await onEliminar(row);
    } finally {
      setEliminandoId(null);
    }
  };

  const filtrados = datos.filter(row =>
    columnas.some(col =>
      String(row[col.key] ?? '').toLowerCase().includes(buscar.toLowerCase())
    )
  );

  return (
    <div>
      {/* Header */}
      <div style={s.header}>
        <div>
          <h1 style={s.title}>{titulo}</h1>
          {descripcion && <p style={s.desc}>{descripcion}</p>}
        </div>
        <button
          className="cmf-btn-primary"
          style={s.btnNuevo}
          onClick={() => {
            setFilaEditando(null);
            setVista(v => v === 'form' ? 'lista' : 'form');
          }}
        >
          {vista === 'form' ? '← Volver a la lista' : '+ Agregar nuevo'}
        </button>
      </div>

      {vista === 'form' && FormularioNuevo ? (
        <div style={s.formWrap}>
          <FormularioNuevo
            row={filaEditando}
            onCancel={() => { setVista('lista'); setFilaEditando(null); }}
            onCreated={() => { setVista('lista'); setFilaEditando(null); onCreated?.(); }}
          />
        </div>
      ) : (
        <>
          {/* Buscador */}
          <div style={s.toolbar}>
            <input
              className="cmf-input"
              style={s.search}
              placeholder="Buscar..."
              value={buscar}
              onChange={e => setBuscar(e.target.value)}
            />
            <span style={s.count}>{cargando ? 'Cargando...' : `${filtrados.length} registros`}</span>
          </div>

          {/* Tabla */}
          <div style={s.tableWrap}>
            {filtrados.length === 0 ? (
              <div style={s.empty}>
                <p style={s.emptyText}>{cargando ? 'Cargando registros...' : 'No hay registros aún.'}</p>
                {!cargando && <p style={s.emptyHint}>Usa el botón "Agregar nuevo" para comenzar.</p>}
              </div>
            ) : (
              <table style={s.table}>
                <thead>
                  <tr>
                    {columnas.map(col => (
                      <th key={col.key} style={s.th}>{col.label}</th>
                    ))}
                    <th style={s.th}>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {filtrados.map((row, i) => (
                    <tr key={i} className="cmf-row" style={i % 2 === 0 ? s.trEven : {}}>
                      {columnas.map(col => (
                        <td key={col.key} style={s.td}>
                          {col.render ? col.render(row[col.key], row) : (row[col.key] ?? '—')}
                        </td>
                      ))}
                      <td style={s.td}>
                        <button
                          className="cmf-edit-btn"
                          style={s.btnEdit}
                          disabled={!FormularioNuevo}
                          onClick={() => { setFilaEditando(row); setVista('form'); }}
                        >
                          Editar
                        </button>
                        <button
                          className="cmf-del-btn"
                          style={s.btnDel}
                          disabled={!onEliminar || eliminandoId === row.id}
                          onClick={() => handleEliminar(row)}
                        >
                          {eliminandoId === row.id ? 'Eliminando...' : 'Eliminar'}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </>
      )}
    </div>
  );
}

const s = {
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '24px',
    flexWrap: 'wrap',
    gap: '12px',
  },
  title: {
    fontSize: '1.4rem',
    fontFamily: '"Playfair Display", Georgia, serif',
    fontWeight: 400,
    color: '#1a1510',
    marginBottom: '2px',
  },
  desc: {
    fontSize: '0.78rem',
    color: '#888',
  },
  btnNuevo: {
    background: '#9b2525',
    color: '#fff',
    border: 'none',
    borderRadius: '2px',
    padding: '10px 20px',
    fontSize: '0.78rem',
    letterSpacing: '0.06em',
    cursor: 'pointer',
    whiteSpace: 'nowrap',
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    marginBottom: '16px',
  },
  search: {
    flex: 1,
    maxWidth: '320px',
    padding: '9px 14px',
    border: '1px solid #ddd',
    borderRadius: '2px',
    fontSize: '0.85rem',
    outline: 'none',
    fontFamily: '"Inter", system-ui, sans-serif',
  },
  count: {
    fontSize: '0.72rem',
    color: '#aaa',
    letterSpacing: '0.08em',
  },
  tableWrap: {
    background: '#fff',
    border: '1px solid #e5e5e5',
    borderRadius: '2px',
    boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
    overflowX: 'auto',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    fontSize: '0.83rem',
  },
  th: {
    padding: '12px 16px',
    textAlign: 'left',
    fontSize: '0.65rem',
    letterSpacing: '0.15em',
    textTransform: 'uppercase',
    color: '#888',
    borderBottom: '1px solid #e5e5e5',
    background: '#fafafa',
    whiteSpace: 'nowrap',
  },
  td: {
    padding: '12px 16px',
    color: '#333',
    borderBottom: '1px solid #f0f0f0',
    verticalAlign: 'middle',
  },
  trEven: {
    background: '#fdfcfb',
  },
  btnEdit: {
    background: 'none',
    border: '1px solid #ccc',
    borderRadius: '2px',
    padding: '4px 10px',
    fontSize: '0.72rem',
    cursor: 'pointer',
    marginRight: '6px',
    color: '#555',
  },
  btnDel: {
    background: 'none',
    border: '1px solid #e0c0c0',
    borderRadius: '2px',
    padding: '4px 10px',
    fontSize: '0.72rem',
    cursor: 'pointer',
    color: '#9b2525',
  },
  empty: {
    padding: '60px 20px',
    textAlign: 'center',
  },
  emptyText: {
    fontSize: '1rem',
    color: '#aaa',
    marginBottom: '6px',
    fontFamily: '"Playfair Display", Georgia, serif',
  },
  emptyHint: {
    fontSize: '0.78rem',
    color: '#ccc',
  },
  formWrap: {
    background: '#fff',
    border: '1px solid #e5e5e5',
    borderRadius: '2px',
    boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
    padding: '28px',
  },
};
