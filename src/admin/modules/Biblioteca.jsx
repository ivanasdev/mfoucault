import { useEffect, useState, useCallback, useRef } from 'react';
import ModuloBase from './ModuloBase';
import { useAuth } from '../AuthContext';
import { formStyles as s } from './formStyles';

const API = import.meta.env.VITE_API_URL ?? 'http://localhost:9696';

const TIPOS = ['Ensayo', 'Artículo', 'Conferencia', 'Video', 'Libro'];
const DISCIPLINAS = ['Psicoanálisis', 'Teoría Crítica', 'Criminología', 'Filosofía', 'Clínica'];
const EXTENSIONES_ARCHIVO = ['pdf', 'jpg', 'jpeg', 'png', 'webp', 'mp4', 'webm', 'mov'];

const COLUMNAS = [
  { key: 'tipo',       label: 'Tipo' },
  { key: 'titulo',     label: 'Título' },
  { key: 'autor',      label: 'Autor' },
  { key: 'anio',       label: 'Año' },
  { key: 'disciplina', label: 'Disciplina' },
  { key: 'extension',  label: 'Duración/Páginas', render: v => v || '—' },
  { key: 'url',        label: 'Enlace', render: v => v ? <a href={v} target="_blank" rel="noreferrer">Ver</a> : '—' },
];

function FormNuevo({ row, onCancel, onCreated }) {
  const editando = Boolean(row);
  const { authHeaders, user } = useAuth();
  const fileInputRef = useRef(null);
  const [tipo, setTipo] = useState(row?.tipo ?? TIPOS[0]);
  const [titulo, setTitulo] = useState(row?.titulo ?? '');
  const [autor, setAutor] = useState(row?.autor ?? '');
  const [anio, setAnio] = useState(row?.anio ?? '');
  const [disciplina, setDisciplina] = useState(row?.disciplina ?? DISCIPLINAS[0]);
  const [extension, setExtension] = useState(row?.extension ?? '');
  const [url, setUrl] = useState(row?.url ?? '');
  const [activo, setActivo] = useState(row?.activo ?? true);
  const [archivo, setArchivo] = useState(null);
  const [guardando, setGuardando] = useState(false);
  const [error, setError] = useState('');

  const handleArchivo = (file) => {
    if (!file) return;
    const ext = file.name.split('.').pop()?.toLowerCase();
    if (!EXTENSIONES_ARCHIVO.includes(ext)) {
      setError(`El archivo debe ser uno de estos formatos: ${EXTENSIONES_ARCHIVO.join(', ')}.`);
      return;
    }
    setError('');
    setArchivo(file);
  };

  const handleSubmit = async () => {
    setError('');

    if (!titulo.trim() || !autor.trim() || !anio) {
      setError('Título, autor y año son requeridos.');
      return;
    }

    setGuardando(true);
    try {
      const res = await fetch(`${API}/api/biblioteca${editando ? `/${row.id}` : ''}`, {
        method: editando ? 'PUT' : 'POST',
        headers: authHeaders(),
        body: JSON.stringify({
          tipo,
          titulo: titulo.trim(),
          autor: autor.trim(),
          anio: Number(anio),
          disciplina,
          extension: extension.trim() || null,
          url: url.trim() || null,
          activo,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message ?? `No se pudo ${editando ? 'actualizar' : 'crear'} el material`);
        return;
      }

      const materialId = editando ? row.id : data.data?.id;

      if (archivo && materialId) {
        const body = new FormData();
        body.append('archivo', archivo);
        const resArchivo = await fetch(`${API}/api/biblioteca/${materialId}/archivo`, {
          method: 'POST',
          headers: { Authorization: `Bearer ${user?.token ?? ''}` },
          body,
        });
        if (!resArchivo.ok) {
          const dataArchivo = await resArchivo.json().catch(() => ({}));
          setError(`El material se guardó, pero el archivo no se pudo subir: ${dataArchivo.message ?? 'error desconocido'}`);
          onCreated();
          return;
        }
      }

      onCreated();
    } catch {
      setError('No se pudo conectar con el servidor');
    } finally {
      setGuardando(false);
    }
  };

  return (
    <div>
      <h2 style={s.formTitle}>{editando ? 'Editar material' : 'Nuevo material'}</h2>
      <div style={s.formGrid}>
        <div style={s.field}>
          <label style={s.label}>Tipo *</label>
          <select className="cmf-input" style={s.select} value={tipo} onChange={e => setTipo(e.target.value)}>
            {TIPOS.map(t => <option key={t} value={t}>{t}</option>)}
          </select>
        </div>
        <div style={s.field}>
          <label style={s.label}>Disciplina *</label>
          <select className="cmf-input" style={s.select} value={disciplina} onChange={e => setDisciplina(e.target.value)}>
            {DISCIPLINAS.map(d => <option key={d} value={d}>{d}</option>)}
          </select>
        </div>
        <div style={{ ...s.field, gridColumn: '1 / -1' }}>
          <label style={s.label}>Título *</label>
          <input
            className="cmf-input"
            style={s.input}
            placeholder="Título del material"
            value={titulo}
            onChange={e => setTitulo(e.target.value)}
          />
        </div>
        <div style={s.field}>
          <label style={s.label}>Autor *</label>
          <input
            className="cmf-input"
            style={s.input}
            placeholder="Nombre del autor"
            value={autor}
            onChange={e => setAutor(e.target.value)}
          />
        </div>
        <div style={s.field}>
          <label style={s.label}>Año *</label>
          <input
            className="cmf-input"
            style={s.input}
            type="number"
            min="1900"
            placeholder="2024"
            value={anio}
            onChange={e => setAnio(e.target.value)}
          />
        </div>
        <div style={s.field}>
          <label style={s.label}>Duración / páginas</label>
          <input
            className="cmf-input"
            style={s.input}
            placeholder="Ej. 24 pp. o 68 min."
            value={extension}
            onChange={e => setExtension(e.target.value)}
          />
        </div>
        <div style={s.field}>
          <label style={s.label}>Enlace externo (opcional si subes un archivo)</label>
          <input
            className="cmf-input"
            style={s.input}
            placeholder="https://... (ej. YouTube, sitio externo)"
            value={url}
            onChange={e => setUrl(e.target.value)}
          />
        </div>

        <div style={{ ...s.field, gridColumn: '1 / -1' }}>
          <label style={s.label}>Archivo (PDF, imagen o video)</label>
          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf,.jpg,.jpeg,.png,.webp,.mp4,.webm,.mov"
            hidden
            onChange={e => handleArchivo(e.target.files?.[0])}
          />
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
            {!archivo && row?.url && (
              <a href={row.url} target="_blank" rel="noreferrer" style={{ fontSize: '0.8rem', color: '#9b2525' }}>
                Ver actual
              </a>
            )}
            <div
              onClick={() => fileInputRef.current?.click()}
              className="cmf-btn-ghost"
              style={{
                flex: 1,
                border: '1px dashed #ccc',
                padding: '16px',
                textAlign: 'center',
                cursor: 'pointer',
                fontSize: '0.85rem',
                color: archivo ? '#1a1510' : '#888',
              }}
            >
              {archivo
                ? archivo.name
                : row?.url
                  ? 'Haz clic para reemplazar el archivo actual'
                  : 'Haz clic para subir un PDF, imagen o video'}
            </div>
          </div>
        </div>

        <div style={s.field}>
          <label style={s.label}>Opciones</label>
          <label style={s.check}>
            <input type="checkbox" checked={activo} onChange={e => setActivo(e.target.checked)} />
            Activo
          </label>
        </div>
      </div>

      {error && <p style={s.error}>{error}</p>}

      <div style={s.actions}>
        <button className="cmf-btn-primary" style={s.btnSave} onClick={handleSubmit} disabled={guardando}>
          {guardando ? 'Guardando...' : editando ? 'Guardar cambios' : 'Guardar material'}
        </button>
        <button className="cmf-btn-secondary" style={s.btnCancel} onClick={onCancel} disabled={guardando}>Cancelar</button>
      </div>
    </div>
  );
}

export default function Biblioteca() {
  const { authHeaders } = useAuth();
  const [datos, setDatos] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    let ignore = false;
    (async () => {
      try {
        const res = await fetch(`${API}/api/biblioteca`, { headers: authHeaders() });
        const data = await res.json();
        if (!ignore && res.ok) {
          setDatos(data.data ?? []);
        }
      } catch {
        // Se deja la lista vacía si falla la conexión
      } finally {
        if (!ignore) setCargando(false);
      }
    })();
    return () => { ignore = true; };
  }, [authHeaders]);

  // Usado tras crear/editar un material: se dispara desde un evento de usuario, no un efecto.
  const cargar = useCallback(async () => {
    setCargando(true);
    try {
      const res = await fetch(`${API}/api/biblioteca`, { headers: authHeaders() });
      const data = await res.json();
      if (res.ok) setDatos(data.data ?? []);
    } catch {
      // Se deja la lista tal como estaba si falla la conexión
    } finally {
      setCargando(false);
    }
  }, [authHeaders]);

  const eliminar = useCallback(async (row) => {
    const res = await fetch(`${API}/api/biblioteca/${row.id}`, {
      method: 'DELETE',
      headers: authHeaders(),
    });
    if (res.ok) {
      setDatos(datos => datos.filter(d => d.id !== row.id));
    }
  }, [authHeaders]);

  return (
    <ModuloBase
      titulo="Biblioteca y Archivo"
      descripcion="Libros, ensayos, artículos, conferencias y videos del archivo."
      columnas={COLUMNAS}
      datos={datos}
      cargando={cargando}
      FormularioNuevo={FormNuevo}
      onCreated={cargar}
      onEliminar={eliminar}
    />
  );
}
