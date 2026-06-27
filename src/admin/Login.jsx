import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

export default function Login() {
  const { login } = useAuth();
  const navigate   = useNavigate();
  const [email, setEmail]       = useState('');
  const [password, setPassword] = useState('');
  const [error, setError]       = useState('');
  const [loading, setLoading]   = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const result = await login(email, password);

    if (result.ok) {
      navigate('/admin');
    } else {
      setError(result.message);
      setLoading(false);
    }
  };

  return (
    <div style={s.page}>
      <div style={s.card}>
        {/* Logo */}
        <div style={s.logo}>
          <span style={s.logoName}>Colegio Michel Foucault</span>
          <span style={s.logoTag}>Panel de administración</span>
        </div>

        <div style={s.rule} />

        <form onSubmit={handleSubmit} style={s.form}>
          <div style={s.field}>
            <label style={s.label}>Correo electrónico</label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              style={s.input}
              placeholder="admin@colegio.mx"
              required
              autoComplete="email"
            />
          </div>

          <div style={s.field}>
            <label style={s.label}>Contraseña</label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              style={s.input}
              placeholder="••••••••"
              required
              autoComplete="current-password"
            />
          </div>

          {error && <p style={s.error}>{error}</p>}

          <button type="submit" style={s.btn} disabled={loading}>
            {loading ? 'Verificando...' : 'Ingresar'}
          </button>
        </form>

        <p style={s.back}>
          <a href="/" style={s.backLink}>← Volver al sitio</a>
        </p>
      </div>
    </div>
  );
}

const s = {
  page: {
    minHeight: '100vh',
    background: '#090909',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: '"Inter", system-ui, sans-serif',
    padding: '20px',
  },
  card: {
    background: '#111',
    border: '1px solid rgba(255,255,255,0.07)',
    padding: '44px 40px',
    width: '100%',
    maxWidth: '400px',
  },
  logo: {
    marginBottom: '28px',
  },
  logoName: {
    display: 'block',
    fontFamily: '"Playfair Display", Georgia, serif',
    fontSize: '1.1rem',
    color: '#ddd3bf',
    letterSpacing: '0.02em',
    marginBottom: '4px',
  },
  logoTag: {
    display: 'block',
    fontSize: '0.62rem',
    letterSpacing: '0.22em',
    textTransform: 'uppercase',
    color: '#6e6458',
  },
  rule: {
    height: '1px',
    background: 'rgba(255,255,255,0.07)',
    marginBottom: '28px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '18px',
  },
  field: {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
  },
  label: {
    fontSize: '0.7rem',
    letterSpacing: '0.12em',
    textTransform: 'uppercase',
    color: '#6e6458',
  },
  input: {
    background: '#0d0d0d',
    border: '1px solid rgba(255,255,255,0.1)',
    color: '#ddd3bf',
    padding: '11px 14px',
    fontSize: '0.9rem',
    outline: 'none',
    fontFamily: '"Inter", system-ui, sans-serif',
    transition: 'border-color 0.2s',
  },
  error: {
    fontSize: '0.8rem',
    color: '#c04040',
    margin: 0,
  },
  btn: {
    marginTop: '6px',
    background: '#9b2525',
    color: '#f0ebe0',
    border: 'none',
    padding: '13px',
    fontSize: '0.8rem',
    letterSpacing: '0.1em',
    textTransform: 'uppercase',
    cursor: 'pointer',
    fontFamily: '"Inter", system-ui, sans-serif',
    transition: 'background 0.2s',
  },
  back: {
    marginTop: '24px',
    textAlign: 'center',
    fontSize: '0.75rem',
  },
  backLink: {
    color: '#6e6458',
    textDecoration: 'none',
  },
};
