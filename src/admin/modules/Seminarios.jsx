import { useEffect, useState, useCallback, useRef } from 'react';
import ModuloBase from './ModuloBase';
import { useAuth } from '../AuthContext';
import { formStyles as s } from './formStyles';

const API = import.meta.env.VITE_API_URL ?? 'http://localhost:9696';

const MODALIDADES = ['Presencial', 'Virtual', 'Híbrido'];
const EXTENSIONES_IMAGEN = ['jpg', 'jpeg', 'png', 'webp'];

const COLUMNAS = [
  {
    key: 'imagen',
    label: 'Foto',
    render: v => v
      ? <img src={v} alt="" style={{ width: 48, height: 48, objectFit: 'cover', border: '1px solid #e5e5e5' }} />
      : '—',
  },
  { key: 'nombre',       label: 'Nombre' },
  { key: 'fecha_inicio', label: 'Inicio', render: v => v ? new Date(v).toLocaleString('es-MX', { dateStyle: 'medium', timeStyle: 'short' }) : '—' },
  { key: 'modalidad',    label: 'Modalidad', render: v => v || '—' },
  { key: 'lugar',        label: 'Lugar', render: v => v || '—' },
  {
    key: 'costo_sesion',
    label: 'Costo',
    render: (_v, row) => {
      const partes = [];
      if (row.costo_sesion != null) partes.push(`$${Number(row.costo_sesion).toFixed(2)} / sesión`);
      if (row.costo_curso != null) partes.push(`$${Number(row.costo_curso).toFixed(2)} curso`);
      return partes.length ? partes.join(' · ') : '—';
    },
  },
  { key: 'cupo',         label: 'Cupo', render: v => v ?? 'Libre' },
  { key: 'activo',       label: 'Activo', render: v => v ? '✓' : '—' },
];

function aFechaLocal(iso) {
  return iso ? iso.slice(0, 16) : '';
}

function FormNuevo({ row, onCancel, onCreated }) {
  const editando = Boolean(row);
  const { authHeaders, user } = useAuth();
  const fileInputRef = useRef(null);
  const [nombre, setNombre] = useState(row?.nombre ?? '');
  const [descripcion, setDescripcion] = useState(row?.descripcion ?? '');
  const [costoSesion, setCostoSesion] = useState(row?.costo_sesion ?? '');
  const [costoCurso, setCostoCurso] = useState(row?.costo_curso ?? '');
  const [fechaInicio, setFechaInicio] = useState(aFechaLocal(row?.fecha_inicio));
  const [fechaFin, setFechaFin] = useState(aFechaLocal(row?.fecha_fin));
  const [cupo, setCupo] = useState(row?.cupo ?? '');
  const [modalidad, setModalidad] = useState(row?.modalidad ?? '');
  const [lugar, setLugar] = useState(row?.lugar ?? '');
  const [ponente, setPonente] = useState(row?.ponente ?? '');
  const [tipo, setTipo] = useState(row?.tipo ?? '');
  const [activo, setActivo] = useState(row?.activo ?? true);
  const [imagen, setImagen] = useState(null);
  const [guardando, setGuardando] = useState(false);
  const [error, setError] = useState('');

  const handleImagen = (file) => {
    if (!file) return;
    const extension = file.name.split('.').pop()?.toLowerCase();
    if (!EXTENSIONES_IMAGEN.includes(extension)) {
      setError('La foto debe ser JPG, PNG o WEBP.');
      return;
    }
    setError('');
    setImagen(file);
  };

  const handleSubmit = async () => {
    setError('');

    if (!nombre.trim() || !fechaInicio) {
      setError('Nombre y fecha de inicio son requeridos.');
      return;
    }
    if (costoSesion === '' && costoCurso === '') {
      setError('Indica el costo por sesión, el costo de curso completo, o ambos.');
      return;
    }

    setGuardando(true);
    try {
      const res = await fetch(`${API}/api/seminarios${editando ? `/${row.id}` : ''}`, {
        method: editando ? 'PUT' : 'POST',
        headers: authHeaders(),
        body: JSON.stringify({
          nombre: nombre.trim(),
          descripcion: descripcion.trim() || null,
          costo_sesion: costoSesion === '' ? null : Number(costoSesion),
          costo_curso: costoCurso === '' ? null : Number(costoCurso),
          fecha_inicio: fechaInicio,
          fecha_fin: fechaFin || null,
          cupo: cupo === '' ? null : Number(cupo),
          modalidad: modalidad || null,
          lugar: lugar.trim() || null,
          ponente: ponente.trim() || null,
          tipo: tipo.trim() || null,
          activo,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message ?? `No se pudo ${editando ? 'actualizar' : 'crear'} el seminario`);
        return;
      }

      const seminarioId = editando ? row.id : data.data?.id;

      if (imagen && seminarioId) {
        const body = new FormData();
        body.append('imagen', imagen);
        const resImg = await fetch(`${API}/api/seminarios/${seminarioId}/imagen`, {
          method: 'POST',
          headers: { Authorization: `Bearer ${user?.token ?? ''}` },
          body,
        });
        if (!resImg.ok) {
          const dataImg = await resImg.json().catch(() => ({}));
          setError(`El seminario se guardó, pero la foto no se pudo subir: ${dataImg.message ?? 'error desconocido'}`);
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
      <h2 style={s.formTitle}>{editando ? 'Editar seminario' : 'Nuevo seminario'}</h2>
      <div style={s.formGrid}>
        <div style={s.field}>
          <label style={s.label}>Nombre *</label>
          <input
            className="cmf-input"
            style={s.input}
            placeholder="Nombre del seminario"
            value={nombre}
            onChange={e => setNombre(e.target.value)}
          />
        </div>
        <div style={s.field}>
          <label style={s.label}>Fecha y hora de inicio *</label>
          <input
            className="cmf-input"
            style={s.input}
            type="datetime-local"
            value={fechaInicio}
            onChange={e => setFechaInicio(e.target.value)}
          />
        </div>
        <div style={s.field}>
          <label style={s.label}>Costo por sesión</label>
          <input
            className="cmf-input"
            style={s.input}
            type="number"
            min="0"
            step="0.01"
            placeholder="0.00"
            value={costoSesion}
            onChange={e => setCostoSesion(e.target.value)}
          />
        </div>
        <div style={s.field}>
          <label style={s.label}>Costo curso completo</label>
          <input
            className="cmf-input"
            style={s.input}
            type="number"
            min="0"
            step="0.01"
            placeholder="0.00"
            value={costoCurso}
            onChange={e => setCostoCurso(e.target.value)}
          />
        </div>
        <div style={s.field}>
          <label style={s.label}>Fecha y hora de fin</label>
          <input
            className="cmf-input"
            style={s.input}
            type="datetime-local"
            value={fechaFin}
            onChange={e => setFechaFin(e.target.value)}
          />
        </div>
        <div style={s.field}>
          <label style={s.label}>Modalidad</label>
          <select
            className="cmf-input"
            style={s.select}
            value={modalidad}
            onChange={e => setModalidad(e.target.value)}
          >
            <option value="">Sin especificar</option>
            {MODALIDADES.map(m => (
              <option key={m} value={m}>{m}</option>
            ))}
          </select>
        </div>
        <div style={s.field}>
          <label style={s.label}>Lugar</label>
          <input
            className="cmf-input"
            style={s.input}
            placeholder="Auditorio, liga de videollamada, etc."
            value={lugar}
            onChange={e => setLugar(e.target.value)}
          />
        </div>
        <div style={s.field}>
          <label style={s.label}>Ponente</label>
          <input
            className="cmf-input"
            style={s.input}
            placeholder="Nombre del ponente"
            value={ponente}
            onChange={e => setPonente(e.target.value)}
          />
        </div>
        <div style={s.field}>
          <label style={s.label}>Cupo</label>
          <input
            className="cmf-input"
            style={s.input}
            type="number"
            min="0"
            placeholder="Sin límite"
            value={cupo}
            onChange={e => setCupo(e.target.value)}
          />
        </div>
        <div style={s.field}>
          <label style={s.label}>Tipo</label>
          <input
            className="cmf-input"
            style={s.input}
            placeholder="Ej. Diplomado, taller, coloquio..."
            value={tipo}
            onChange={e => setTipo(e.target.value)}
          />
        </div>
        <div style={{ ...s.field, gridColumn: '1 / -1' }}>
          <label style={s.label}>Descripción</label>
          <textarea
            className="cmf-input"
            style={s.textarea}
            rows={4}
            placeholder="Descripción del seminario..."
            value={descripcion}
            onChange={e => setDescripcion(e.target.value)}
          />
        </div>

        <div style={{ ...s.field, gridColumn: '1 / -1' }}>
          <label style={s.label}>Foto del seminario</label>
          <input
            ref={fileInputRef}
            type="file"
            accept=".jpg,.jpeg,.png,.webp"
            hidden
            onChange={e => handleImagen(e.target.files?.[0])}
          />
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
            {!imagen && row?.imagen && (
              <img
                src={row.imagen}
                alt=""
                style={{ width: 56, height: 56, objectFit: 'cover', border: '1px solid #e5e5e5', flexShrink: 0 }}
              />
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
                color: imagen ? '#1a1510' : '#888',
              }}
            >
              {imagen
                ? imagen.name
                : row?.imagen
                  ? 'Haz clic para reemplazar la foto actual'
                  : 'Haz clic para elegir una foto (JPG, PNG o WEBP)'}
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
          {guardando ? 'Guardando...' : editando ? 'Guardar cambios' : 'Guardar seminario'}
        </button>
        <button className="cmf-btn-secondary" style={s.btnCancel} onClick={onCancel} disabled={guardando}>Cancelar</button>
      </div>
    </div>
  );
}

export default function Seminarios() {
  const { authHeaders } = useAuth();
  const [datos, setDatos] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    let ignore = false;
    (async () => {
      try {
        const res = await fetch(`${API}/api/seminarios`, {
          headers: authHeaders(),
        });
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

  // Usado tras crear un seminario: se dispara desde un evento de usuario, no un efecto.
  const cargar = useCallback(async () => {
    setCargando(true);
    try {
      const res = await fetch(`${API}/api/seminarios`, {
        headers: authHeaders(),
      });
      const data = await res.json();
      if (res.ok) setDatos(data.data ?? []);
    } catch {
      // Se deja la lista tal como estaba si falla la conexión
    } finally {
      setCargando(false);
    }
  }, [authHeaders]);

  const eliminar = useCallback(async (row) => {
    const res = await fetch(`${API}/api/seminarios/${row.id}`, {
      method: 'DELETE',
      headers: authHeaders(),
    });
    if (res.ok) {
      setDatos(datos => datos.filter(d => d.id !== row.id));
    }
  }, [authHeaders]);

  return (
    <ModuloBase
      titulo="Seminarios"
      descripcion="Seminarios permanentes y temporales del Colegio."
      columnas={COLUMNAS}
      datos={datos}
      cargando={cargando}
      FormularioNuevo={FormNuevo}
      onCreated={cargar}
      onEliminar={eliminar}
    />
  );
}
