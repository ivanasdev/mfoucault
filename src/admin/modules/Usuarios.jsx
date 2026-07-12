import { useEffect, useState, useCallback } from 'react';
import ModuloBase from './ModuloBase';
import { useAuth } from '../AuthContext';
import { formStyles as s } from './formStyles';

const API = import.meta.env.VITE_API_URL ?? 'http://localhost:9696';

const ROLES = [
  { id: 1, nombre: 'superadmin' },
  { id: 2, nombre: 'editor' },
  { id: 3, nombre: 'lector' },
];

const COLUMNAS = [
  { key: 'nombre',        label: 'Nombre' },
  { key: 'email',         label: 'Correo' },
  { key: 'rol',           label: 'Rol' },
  { key: 'ultimo_acceso', label: 'Último acceso', render: v => v ? new Date(v).toLocaleString('es-MX') : 'Nunca' },
  { key: 'activo',        label: 'Activo', render: v => v ? '✓' : '—' },
];

function FormNuevo({ onCancel, onCreated }) {
  const { authHeaders } = useAuth();
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rolId, setRolId] = useState(2);
  const [guardando, setGuardando] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    setError('');

    if (!nombre.trim() || !email.trim() || !password) {
      setError('Nombre, correo y contraseña son requeridos.');
      return;
    }

    if (password.length < 8) {
      setError('La contraseña debe tener al menos 8 caracteres.');
      return;
    }

    setGuardando(true);
    try {
      const res = await fetch(`${API}/api/auth/register`, {
        method: 'POST',
        headers: authHeaders(),
        body: JSON.stringify({
          nombre: nombre.trim(),
          email: email.trim(),
          password,
          rol_id: rolId,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message ?? 'No se pudo crear el usuario');
        return;
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
      <h2 style={s.formTitle}>Nuevo usuario</h2>
      <div style={s.formGrid}>
        <div style={s.field}>
          <label style={s.label}>Nombre *</label>
          <input
            className="cmf-input"
            style={s.input}
            placeholder="Nombre completo"
            value={nombre}
            onChange={e => setNombre(e.target.value)}
          />
        </div>
        <div style={s.field}>
          <label style={s.label}>Correo *</label>
          <input
            className="cmf-input"
            style={s.input}
            type="email"
            placeholder="usuario@colegio.mx"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </div>
        <div style={s.field}>
          <label style={s.label}>Contraseña *</label>
          <input
            className="cmf-input"
            style={s.input}
            type="password"
            placeholder="Mínimo 8 caracteres"
            value={password}
            onChange={e => setPassword(e.target.value)}
            autoComplete="new-password"
          />
        </div>
        <div style={s.field}>
          <label style={s.label}>Rol *</label>
          <select
            className="cmf-input"
            style={s.select}
            value={rolId}
            onChange={e => setRolId(Number(e.target.value))}
          >
            {ROLES.map(r => (
              <option key={r.id} value={r.id}>{r.nombre}</option>
            ))}
          </select>
        </div>
      </div>

      {error && <p style={s.error}>{error}</p>}

      <div style={s.actions}>
        <button className="cmf-btn-primary" style={s.btnSave} onClick={handleSubmit} disabled={guardando}>
          {guardando ? 'Guardando...' : 'Guardar usuario'}
        </button>
        <button className="cmf-btn-secondary" style={s.btnCancel} onClick={onCancel} disabled={guardando}>Cancelar</button>
      </div>
    </div>
  );
}

export default function Usuarios() {
  const { authHeaders } = useAuth();
  const [datos, setDatos] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    let ignore = false;
    (async () => {
      try {
        const res = await fetch(`${API}/api/auth/usuarios`, {
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

  // Usado tras crear un usuario: se dispara desde un evento de usuario, no un efecto.
  const cargar = useCallback(async () => {
    setCargando(true);
    try {
      const res = await fetch(`${API}/api/auth/usuarios`, {
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

  return (
    <ModuloBase
      titulo="Usuarios del Panel"
      descripcion="Cuentas con acceso al panel de administración."
      columnas={COLUMNAS}
      datos={datos}
      cargando={cargando}
      FormularioNuevo={FormNuevo}
      onCreated={cargar}
    />
  );
}
