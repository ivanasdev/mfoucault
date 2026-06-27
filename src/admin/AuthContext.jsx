import { createContext, useContext, useState } from 'react';

const AuthContext = createContext(null);

const API = import.meta.env.VITE_API_URL ?? 'http://localhost:9696';
const STORAGE_KEY = 'cmf_admin';

function loadSession() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function AuthProvider({ children }) {
  const [session, setSession] = useState(loadSession);

  // Devuelve { ok: true } o { ok: false, message: '...' }
  const login = async (email, password) => {
    try {
      const res = await fetch(`${API}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        return { ok: false, message: data.message ?? 'Credenciales inválidas' };
      }

      const stored = { token: data.token, ...data.user };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(stored));
      setSession(stored);
      return { ok: true };

    } catch {
      return { ok: false, message: 'No se pudo conectar con el servidor' };
    }
  };

  const logout = () => {
    localStorage.removeItem(STORAGE_KEY);
    setSession(null);
  };

  // Helper para adjuntar el token en peticiones protegidas
  const authHeaders = () => ({
    'Content-Type': 'application/json',
    Authorization: `Bearer ${session?.token ?? ''}`,
  });

  return (
    <AuthContext.Provider value={{ user: session, login, logout, authHeaders }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
