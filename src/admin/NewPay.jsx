import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
  Typography,
  TextField,
  Button,
  MenuItem,
  Divider,
  CircularProgress,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import CloudUploadOutlinedIcon from "@mui/icons-material/CloudUploadOutlined";
import InsertDriveFileOutlinedIcon from "@mui/icons-material/InsertDriveFileOutlined";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import SectionLabel from '../components/ui/SectionLabel';
import { useState, useEffect, useRef } from "react";

const API = import.meta.env.VITE_API_URL ?? 'http://localhost:9696';

const METODOS_PAGO = [
  { value: 'transferencia', label: 'Transferencia bancaria' },
  { value: 'deposito', label: 'Depósito bancario' },
  { value: 'paypal', label: 'PayPal' },
];

const initialForm = {
  nombre: '',
  email: '',
  telefono: '',
  metodoPago: '',
  tipoPago: '',
  referenciaBancaria: '',
  monto: '',
  mensaje: '',
  esAnonimo: false,
};

function opcionesTipoPago(sem) {
  if (!sem) return [];
  const opciones = [];
  if (sem.costo_sesion != null) {
    opciones.push({ value: 'sesion', label: `Por sesión ($${Number(sem.costo_sesion).toFixed(2)} MXN)` });
  }
  if (sem.costo_curso != null) {
    opciones.push({ value: 'curso', label: `Curso completo ($${Number(sem.costo_curso).toFixed(2)} MXN)` });
  }
  return opciones;
}

function montoParaTipo(sem, tipo) {
  if (!sem) return '';
  if (tipo === 'sesion' && sem.costo_sesion != null) return String(sem.costo_sesion);
  if (tipo === 'curso' && sem.costo_curso != null) return String(sem.costo_curso);
  return '';
}

export default function RegistroPagoModal({
  open,
  onClose,
  seminarioIdInicial,
}) {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";
  const fileInputRef = useRef(null);

  const [seminarios, setSeminarios] = useState([]);
  const [cargandoSeminarios, setCargandoSeminarios] = useState(true);
  const [seminarioId, setSeminarioId] = useState('');
  const [form, setForm] = useState(initialForm);
  const [comprobante, setComprobante] = useState(null);
  const [enviando, setEnviando] = useState(false);
  const [error, setError] = useState('');
  const [exito, setExito] = useState(false);

  const seminario = seminarios.find((s) => String(s.id) === String(seminarioId));

  useEffect(() => {
    if (!open) return;
    let ignore = false;
    (async () => {
      setCargandoSeminarios(true);
      try {
        const res = await fetch(`${API}/api/seminarios/publicos`);
        const data = await res.json();
        if (!ignore && res.ok) {
          const lista = data.data ?? [];
          setSeminarios(lista);
          const preseleccionado = lista.find(s => String(s.id) === String(seminarioIdInicial));
          const elegido = preseleccionado ?? lista[0];
          setSeminarioId(elegido?.id ?? '');
          const tipo = opcionesTipoPago(elegido)[0]?.value ?? '';
          setForm(f => ({ ...f, tipoPago: tipo, monto: montoParaTipo(elegido, tipo) }));
        }
      } catch {
        // Se deja la lista vacía si falla la conexión
      } finally {
        if (!ignore) setCargandoSeminarios(false);
      }
    })();
    return () => { ignore = true; };
  }, [open, seminarioIdInicial]);

  // Al elegir otro seminario, sugiere su tipo y costo publicado como monto a pagar.
  const handleSeminarioChange = (id) => {
    setSeminarioId(id);
    const elegido = seminarios.find(s => String(s.id) === String(id));
    const tipo = opcionesTipoPago(elegido)[0]?.value ?? '';
    setForm(f => ({ ...f, tipoPago: tipo, monto: montoParaTipo(elegido, tipo) }));
  };

  const handleTipoPagoChange = (tipo) => {
    setForm(f => ({ ...f, tipoPago: tipo, monto: montoParaTipo(seminario, tipo) }));
  };

  const resetYCerrar = () => {
    setForm(initialForm);
    setComprobante(null);
    setError('');
    setExito(false);
    onClose();
  };

  const handleField = (campo) => (e) => {
    setForm(f => ({ ...f, [campo]: e.target.value }));
  };

  const handleArchivo = (file) => {
    if (!file) return;
    const extension = file.name.split('.').pop()?.toLowerCase();
    if (!['pdf', 'jpg', 'jpeg', 'png'].includes(extension)) {
      setError('El comprobante debe ser PDF, JPG o PNG.');
      return;
    }
    setError('');
    setComprobante(file);
  };

  const handleSubmit = async () => {
    setError('');

    if (!seminarioId) {
      setError('Selecciona un seminario.');
      return;
    }
    if (!form.email.trim() || !form.monto) {
      setError('Correo y monto pagado son requeridos.');
      return;
    }
    if (!comprobante) {
      setError('Adjunta tu comprobante de pago.');
      return;
    }

    setEnviando(true);
    try {
      const body = new FormData();
      body.append('nombre', form.esAnonimo ? '' : form.nombre.trim());
      body.append('email', form.email.trim());
      body.append('telefono', form.telefono.trim());
      body.append('monto', form.monto);
      body.append('metodo_pago', form.metodoPago);
      body.append('tipo_pago', form.tipoPago);
      body.append('referencia_bancaria', form.referenciaBancaria.trim());
      body.append('mensaje', form.mensaje.trim());
      body.append('es_anonimo', form.esAnonimo ? 'true' : 'false');
      body.append('comprobante', comprobante);

      const res = await fetch(`${API}/api/seminarios/${seminarioId}/registros`, {
        method: 'POST',
        body,
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message ?? 'No se pudo registrar el pago');
        return;
      }

      setExito(true);
    } catch {
      setError('No se pudo conectar con el servidor');
    } finally {
      setEnviando(false);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={resetYCerrar}
      fullWidth
      maxWidth="md"
      PaperProps={{
        sx: {
          bgcolor: "background.default",
          borderRadius: 0,
          border: `1px solid ${theme.palette.divider}`,
          overflow: "hidden",
        },
      }}
    >
      {/* Header */}

      <DialogTitle
        sx={{
          px: { xs: 3, md: 5 },
          pt: 4,
          pb: 3,
        }}
      >
        <SectionLabel>
          Registro de pagos
        </SectionLabel>

        <Typography
          sx={{
            mt: 1,
            fontFamily: '"Playfair Display", serif',
            fontSize: {
              xs: "2rem",
              md: "2.6rem",
            },
            lineHeight: 1.1,
            color: "text.primary",
          }}
        >
          Selecciona el arancel a pagar
        </Typography>

        <Typography
          sx={{
            mt: 2,
            maxWidth: 620,
            color: "text.secondary",
            lineHeight: 1.8,
            fontSize: ".9rem",
          }}
        >
          Completa la siguiente información para registrar tu pago.
          Nuestro equipo validará el comprobante y recibirás un correo
          electrónico con la confirmación de tu pago.
        </Typography>
      </DialogTitle>

      <Divider />

      {exito ? (
        <DialogContent sx={{ px: { xs: 3, md: 5 }, py: 8, textAlign: 'center' }}>
          <Typography
            sx={{
              fontFamily: '"Playfair Display", serif',
              fontSize: '1.6rem',
              color: 'text.primary',
              mb: 1.5,
            }}
          >
            Registro recibido
          </Typography>
          <Typography sx={{ color: 'text.secondary', maxWidth: 480, mx: 'auto', lineHeight: 1.8 }}>
            Tu comprobante fue enviado correctamente. Nuestro equipo lo validará
            y recibirás la confirmación de tu arancel por correo electrónico.
          </Typography>
        </DialogContent>
      ) : (
      <DialogContent
        sx={{
          px: { xs: 3, md: 5 },
          py: 4,
        }}
      >
        {/* Información del seminario */}

        <Box
          sx={{
            mb: 5,
            p: 3,
            border: `1px solid ${theme.palette.divider}`,
            bgcolor: isDark
              ? "rgba(155,37,37,.05)"
              : "rgba(139,26,26,.03)",
          }}
        >
          <Typography
            sx={{
              fontSize: ".7rem",
              letterSpacing: ".15em",
              textTransform: "uppercase",
              color: "secondary.main",
              mb: 1,
            }}
          >
            Seminario seleccionado
          </Typography>

          {cargandoSeminarios ? (
            <Typography sx={{ color: 'text.secondary', fontSize: '.9rem' }}>
              Cargando seminarios disponibles...
            </Typography>
          ) : seminarios.length === 0 ? (
            <Typography sx={{ color: 'text.secondary', fontSize: '.9rem' }}>
              No hay seminarios disponibles para pago de arancel por el momento.
            </Typography>
          ) : (
            <>
              <TextField
                select
                fullWidth
                value={seminarioId}
                onChange={(e) => handleSeminarioChange(e.target.value)}
                sx={{
                  maxWidth: 420,
                  "& .MuiInputBase-input": {
                    fontFamily: '"Playfair Display", serif',
                    fontSize: "1.15rem",
                  },
                }}
              >
                {seminarios.map((s) => (
                  <MenuItem key={s.id} value={s.id}>
                    {s.nombre}
                  </MenuItem>
                ))}
              </TextField>

              {seminario && (
                <Typography
                  sx={{
                    mt: 1.5,
                    color: "text.secondary",
                    fontSize: ".85rem",
                  }}
                >
                  {seminario.fecha_inicio
                    ? new Date(seminario.fecha_inicio).toLocaleDateString('es-MX', { day: 'numeric', month: 'long', year: 'numeric' })
                    : 'Fecha por confirmar'}
                  {opcionesTipoPago(seminario).length === 0 && ' · Costo por confirmar'}
                </Typography>
              )}

              {opcionesTipoPago(seminario).length > 1 && (
                <TextField
                  select
                  fullWidth
                  label="Tipo de pago"
                  value={form.tipoPago}
                  onChange={(e) => handleTipoPagoChange(e.target.value)}
                  sx={{ mt: 2, maxWidth: 420 }}
                >
                  {opcionesTipoPago(seminario).map(o => (
                    <MenuItem key={o.value} value={o.value}>{o.label}</MenuItem>
                  ))}
                </TextField>
              )}
              {opcionesTipoPago(seminario).length === 1 && (
                <Typography sx={{ mt: 1, color: 'text.secondary', fontSize: '.85rem' }}>
                  {opcionesTipoPago(seminario)[0].label}
                </Typography>
              )}
            </>
          )}
        </Box>

        {/* Formulario */}

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              md: "1fr 1fr",
            },
            gap: 3,
          }}
        >
          <Box>
            <TextField
              fullWidth
              label="Nombre completo"
              value={form.nombre}
              onChange={handleField('nombre')}
              disabled={form.esAnonimo}
              placeholder={form.esAnonimo ? 'Se registrará como anónimo' : ''}
            />
            <FormControlLabel
              sx={{ mt: 0.5, ml: 0 }}
              control={
                <Checkbox
                  size="small"
                  checked={form.esAnonimo}
                  onChange={(e) => setForm(f => ({ ...f, esAnonimo: e.target.checked }))}
                />
              }
              label={
                <Typography sx={{ fontSize: '.8rem', color: 'text.secondary' }}>
                  Registrarme como anónimo
                </Typography>
              }
            />
          </Box>

          <TextField
            fullWidth
            label="Correo electrónico"
            type="email"
            value={form.email}
            onChange={handleField('email')}
          />

          <TextField
            fullWidth
            label="Teléfono"
            value={form.telefono}
            onChange={handleField('telefono')}
          />

          <TextField
            select
            fullWidth
            label="Método de pago"
            value={form.metodoPago}
            onChange={handleField('metodoPago')}
          >
            {METODOS_PAGO.map(m => (
              <MenuItem key={m.value} value={m.value}>{m.label}</MenuItem>
            ))}
          </TextField>

          <TextField
            fullWidth
            label="Referencia bancaria"
            value={form.referenciaBancaria}
            onChange={handleField('referenciaBancaria')}
          />

          <TextField
            fullWidth
            label="Monto pagado"
            type="number"
            value={form.monto}
            onChange={handleField('monto')}
          />
        </Box>

        {/* Upload */}

        <Box sx={{ mt: 5 }}>
          <Typography
            sx={{
              mb: 2,
              fontWeight: 500,
            }}
          >
            Comprobante de pago
          </Typography>

          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf,.jpg,.jpeg,.png"
            hidden
            onChange={(e) => handleArchivo(e.target.files?.[0])}
          />

          <Box
            onClick={() => fileInputRef.current?.click()}
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => {
              e.preventDefault();
              handleArchivo(e.dataTransfer.files?.[0]);
            }}
            sx={{
              border: "1px dashed",
              borderColor: comprobante ? 'secondary.main' : theme.palette.divider,
              p: 5,
              textAlign: "center",
              cursor: "pointer",
              transition: ".25s",

              "&:hover": {
                borderColor: "secondary.main",
                bgcolor: isDark
                  ? "rgba(155,37,37,.05)"
                  : "rgba(139,26,26,.03)",
              },
            }}
          >
            {comprobante ? (
              <>
                <InsertDriveFileOutlinedIcon sx={{ fontSize: 42, color: "secondary.main", mb: 2 }} />
                <Typography sx={{ fontFamily: '"Playfair Display", serif', fontSize: "1.1rem" }}>
                  {comprobante.name}
                </Typography>
                <Typography sx={{ mt: 1, color: "text.secondary", fontSize: ".85rem" }}>
                  Haz clic para cambiar el archivo
                </Typography>
              </>
            ) : (
              <>
                <CloudUploadOutlinedIcon sx={{ fontSize: 42, color: "secondary.main", mb: 2 }} />
                <Typography sx={{ fontFamily: '"Playfair Display", serif', fontSize: "1.1rem" }}>
                  Arrastra aquí tu comprobante
                </Typography>
                <Typography sx={{ mt: 1, color: "text.secondary", fontSize: ".85rem" }}>
                  o haz clic para seleccionar un archivo
                </Typography>
                <Typography sx={{ mt: 2, fontSize: ".72rem", color: "text.secondary" }}>
                  PDF · JPG · PNG
                </Typography>
              </>
            )}
          </Box>
        </Box>

        <TextField
          multiline
          rows={4}
          fullWidth
          label="Observaciones (opcional)"
          value={form.mensaje}
          onChange={handleField('mensaje')}
          sx={{
            mt: 5,
          }}
        />

        {error && (
          <Typography sx={{ mt: 3, color: 'secondary.main', fontSize: '.85rem' }}>
            {error}
          </Typography>
        )}
      </DialogContent>
      )}

      <Divider />

      <DialogActions
        sx={{
          px: { xs: 3, md: 5 },
          py: 3,
          justifyContent: "space-between",
        }}
      >
        <Button
          onClick={resetYCerrar}
          sx={{
            color: "text.secondary",
            textTransform: "none",
          }}
        >
          {exito ? 'Cerrar' : 'Cancelar'}
        </Button>

        {!exito && (
          <Button
            variant="contained"
            endIcon={enviando ? undefined : <ArrowForwardIcon />}
            onClick={handleSubmit}
            disabled={enviando || cargandoSeminarios || seminarios.length === 0}
            sx={{
              px: 4,
              py: 1.2,
              borderRadius: 0,
              bgcolor: "secondary.main",
              textTransform: "uppercase",
              letterSpacing: ".08em",

              "&:hover": {
                bgcolor: "secondary.dark",
              },
            }}
          >
            {enviando ? <CircularProgress size={20} sx={{ color: 'inherit' }} /> : 'Registrar pago'}
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
}
