import { Box, Container, Typography, Chip, Button, Tabs, Tab, Collapse } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined';
import PaymentOutlinedIcon from '@mui/icons-material/PaymentOutlined';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import PlaceOutlinedIcon from '@mui/icons-material/PlaceOutlined';
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined';
import SectionLabel from '../ui/SectionLabel';
import { useInView } from '../../hooks/useInView';
import { useState, useEffect } from 'react';
import RegistroPagoModal from '../../admin/NewPay';

const API = import.meta.env.VITE_API_URL ?? 'http://localhost:9696';

const typeColors = {
  Seminario: '#9b2525',
  Coloquio: '#1a3a4a',
  Jornada: '#2a3a20',
  Conferencia: '#3a2a4a',
};

function mapSeminario(sem) {
  const inicio = sem.fecha_inicio ? new Date(sem.fecha_inicio) : null;
  const fin = sem.fecha_fin ? new Date(sem.fecha_fin) : null;
  const mes = inicio
    ? inicio.toLocaleDateString('es-MX', { month: 'short' }).replace('.', '')
    : '';

  return {
    id: sem.id,
    day: inicio ? String(inicio.getDate()).padStart(2, '0') : '—',
    month: mes ? mes.charAt(0).toUpperCase() + mes.slice(1) : '',
    year: inicio ? inicio.getFullYear() : '',
    type: sem.tipo || 'Seminario',
    title: sem.nombre,
    description: sem.descripcion,
    speaker: sem.ponente,
    place: sem.lugar || sem.modalidad || 'Por confirmar',
    imagen: sem.imagen || null,
    fechaInicio: inicio,
    fechaFin: fin,
    modalidad: sem.modalidad,
    lugar: sem.lugar,
    cupo: sem.cupo,
    costoSesion: sem.costo_sesion,
    costoCurso: sem.costo_curso,
  };
}

function formatearFecha(fecha) {
  if (!fecha) return null;
  return fecha.toLocaleDateString('es-MX', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  });
}

export default function Seminars() {

  
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';
  const [ref, inView] = useInView(0.08);
  const [openPago, setOpenPago] = useState(false);
  const [seminarioPreseleccionado, setSeminarioPreseleccionado] = useState(null);
  const [tab, setTab] = useState('eventos');
  const [expandedId, setExpandedId] = useState(null);
  const [events, setEvents] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    let ignore = false;
    (async () => {
      try {
        const res = await fetch(`${API}/api/seminarios/publicos`);
        const data = await res.json();
        if (!ignore && res.ok) {
          setEvents((data.data ?? []).map(mapSeminario));
        }
      } catch {
        // Se deja la lista vacía si falla la conexión
      } finally {
        if (!ignore) setCargando(false);
      }
    })();
    return () => { ignore = true; };
  }, []);

  return (
    <Box
      id="seminarios"
      ref={ref}
      sx={{
        bgcolor: 'background.paper',
        py: { xs: 10, md: 16 },
        borderTop: `1px solid ${theme.palette.divider}`,
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0)' : 'translateY(32px)',
        transition: 'opacity 0.9s ease, transform 0.9s ease',
      }}
    >
      <Container maxWidth="xl" sx={{ px: { xs: 3, md: 8 } }}>
        {/* Section header */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            justifyContent: 'space-between',
            alignItems: { xs: 'flex-start', md: 'flex-end' },
            mb: { xs: 8, md: 10 },
            gap: 3,
          }}
        >
          <Box>
            <SectionLabel>Seminarios y Eventos</SectionLabel>
            <Typography
              variant="h2"
              sx={{
                fontSize: { xs: '1.9rem', md: '2.8rem' },
                color: 'text.primary',
                lineHeight: 1.15,
              }}
            >
              Próximas actividades académicas
            </Typography>
            
          </Box>
      

          <Button
            endIcon={<CalendarTodayOutlinedIcon sx={{ fontSize: '14px !important' }} />}
            sx={{
              color: 'text.secondary',
              fontSize: '0.78rem',
              letterSpacing: '0.08em',
              '&:hover': { color: 'text.primary', bgcolor: 'action.hover' },
            }}
          >
            Ver calendario completo
          </Button>
        </Box>

        {/* Tabs */}
        <Tabs
          value={tab}
          onChange={(e, v) => setTab(v)}
          sx={{
            mb: { xs: 5, md: 7 },
            minHeight: 'auto',
            borderBottom: `1px solid ${theme.palette.divider}`,
            '& .MuiTabs-indicator': { bgcolor: 'secondary.main', height: 2 },
          }}
        >
          <Tab
            value="eventos"
            label="Próximos eventos"
            disableRipple
            sx={{
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              fontSize: '0.72rem',
              fontFamily: '"Inter", sans-serif',
              color: 'text.secondary',
              minHeight: 'auto',
              py: 2,
              px: 0,
              mr: 4,
              '&.Mui-selected': { color: 'text.primary' },
            }}
          />
          <Tab
            value="arancel"
            label="Arancel"
            disableRipple
            sx={{
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              fontSize: '0.72rem',
              fontFamily: '"Inter", sans-serif',
              color: 'text.secondary',
              minHeight: 'auto',
              py: 2,
              px: 0,
              '&.Mui-selected': { color: 'text.primary' },
            }}
          />
        </Tabs>

        {tab === 'eventos' && (
          <>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              {cargando ? (
                <Typography sx={{ color: 'text.secondary', fontSize: '0.85rem', py: 6, textAlign: 'center' }}>
                  Cargando actividades...
                </Typography>
              ) : events.length === 0 ? (
                <Typography sx={{ color: 'text.secondary', fontSize: '0.85rem', py: 6, textAlign: 'center' }}>
                  No hay seminarios próximos por el momento.
                </Typography>
              ) : (
                events.map((event) => (
                  <EventRow
                    key={event.id ?? event.title}
                    event={event}
                    isDark={isDark}
                    theme={theme}
                    onPagar={(id) => { setSeminarioPreseleccionado(id); setOpenPago(true); }}
                    expanded={expandedId === event.id}
                    onToggle={() => setExpandedId(id => id === event.id ? null : event.id)}
                  />
                ))
              )}
            </Box>

            {!cargando && events.length > 0 && (
              <Box sx={{ mt: 6, display: 'flex', justifyContent: 'center' }}>
                <Button
                  variant="outlined"
                  endIcon={<ArrowForwardIcon sx={{ fontSize: '14px !important' }} />}
                  sx={{
                    color: 'text.secondary',
                    borderColor: 'divider',
                    px: 5,
                    py: 1.4,
                    fontSize: '0.8rem',
                    letterSpacing: '0.08em',
                    '&:hover': {
                      color: 'text.primary',
                      borderColor: 'text.secondary',
                      bgcolor: 'action.hover',
                    },
                  }}
                >
                  Cargar más actividades
                </Button>
              </Box>
            )}
          </>
        )}

        {tab === 'arancel' && (
          <Box sx={{ maxWidth: 640, py: { xs: 2, md: 3 } }}>
            <Typography
              variant="h3"
              sx={{
                mb: 2,
                fontSize: { xs: '1.4rem', md: '1.7rem' },
                color: 'text.primary',
              }}
            >
              Cobertura de arancel
            </Typography>

            <Typography
              sx={{
                color: 'text.secondary',
                lineHeight: 1.85,
                fontSize: '0.92rem',
                mb: 3,
              }}
            >
              Si ya elegiste un seminario, puedes cubrir su arancel directamente
              desde su tarjeta en «Próximos eventos». Si prefieres hacerlo sin
              elegir uno todavía, también puedes registrar tu pago desde aquí.
            </Typography>

            <Button
              variant="text"
              endIcon={<ArrowForwardIcon sx={{ fontSize: '13px !important' }} />}
              onClick={() => { setSeminarioPreseleccionado(null); setOpenPago(true); }}
              sx={{
                px: 0,
                color: 'secondary.main',
                fontSize: '0.82rem',
                letterSpacing: '0.06em',
                '&:hover': { bgcolor: 'transparent', color: 'secondary.dark' },
              }}
            >
              Registrar mi pago
            </Button>
          </Box>
        )}

        <RegistroPagoModal
  open={openPago}
  onClose={() => setOpenPago(false)}
  seminarioIdInicial={seminarioPreseleccionado}
/>
      </Container>
    </Box>
  );
}

function DetailRow({ icon, label, value }) {
  if (!value) return null;
  return (
    <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.2 }}>
      {icon && (
        <Box sx={{ color: 'secondary.main', display: 'flex', mt: '2px' }}>
          {icon}
        </Box>
      )}
      <Box>
        <Typography
          sx={{
            fontSize: '0.62rem',
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            color: 'text.secondary',
            mb: 0.3,
          }}
        >
          {label}
        </Typography>
        <Typography sx={{ fontSize: '0.85rem', color: 'text.primary', lineHeight: 1.5 }}>
          {value}
        </Typography>
      </Box>
    </Box>
  );
}

function EventRow({ event, isDark, theme, onPagar, expanded, onToggle }) {
  const accent = typeColors[event.type] || '#9b2525';
  const [imagenValida, setImagenValida] = useState(true);

  const handleToggleClick = (e) => {
    e.stopPropagation();
    onToggle();
  };

  return (
    <Box
      role="button"
      tabIndex={0}
      aria-expanded={expanded}
      onClick={onToggle}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onToggle();
        }
      }}
      sx={{
        py: { xs: 4, md: 5 },
        borderBottom: `1px solid ${theme.palette.divider}`,
        px: { xs: 0, md: 1 },
        mx: { xs: 0, md: -1 },
        borderRadius: 1,
      }}
    >
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: { xs: '1fr', md: '88px 1fr auto' },
        gap: { xs: 2, md: 5 },
        alignItems: 'start',
        cursor: 'pointer',
        transition: 'background-color 0.25s',
        borderRadius: 1,
        '&:hover': {
          bgcolor: isDark ? 'rgba(255,255,255,0.025)' : 'rgba(0,0,0,0.02)',
        },
      }}
    >
      {/* Date block */}
      <Box sx={{ display: { xs: 'flex', md: 'block' }, gap: 1.5, alignItems: 'baseline', flexShrink: 0 }}>
        <Typography
          sx={{
            fontFamily: '"Playfair Display", serif',
            fontSize: { xs: '2.5rem', md: '3rem' },
            color: isDark ? 'rgba(221,200,170,0.22)' : 'rgba(26,21,16,0.18)',
            lineHeight: 1,
            fontWeight: 700,
          }}
        >
          {event.day}
        </Typography>
        <Typography
          sx={{
            fontSize: '0.68rem',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            color: 'text.secondary',
            fontFamily: '"Inter", sans-serif',
            mt: { xs: 0, md: 0.5 },
          }}
        >
          {event.month} {event.year}
        </Typography>
      </Box>

      {/* Content */}
      <Box>
        <Box sx={{ display: 'flex', gap: 1.5, alignItems: 'center', mb: 1.5, flexWrap: 'wrap' }}>
          <Chip
            label={event.type}
            size="small"
            sx={{
              bgcolor: 'transparent',
              border: `1px solid ${accent}`,
              color: isDark ? `${accent}dd` : accent,
              fontSize: '0.6rem',
              letterSpacing: '0.12em',
              height: 20,
              borderRadius: 1,
            }}
          />
          <Typography
            sx={{
              fontSize: '0.7rem',
              color: 'text.secondary',
              fontFamily: '"Inter", sans-serif',
              letterSpacing: '0.05em',
            }}
          >
            {event.place}
          </Typography>
        </Box>

        <Typography
          variant="h5"
          sx={{
            fontSize: { xs: '1rem', md: '1.15rem' },
            color: 'text.primary',
            lineHeight: 1.3,
            mb: 1.5,
          }}
        >
          {event.title}
        </Typography>

        <Typography
          variant="body2"
          sx={{
            color: 'text.secondary',
            fontSize: '0.83rem',
            lineHeight: 1.75,
            mb: 1.5,
            display: { xs: 'none', sm: 'block' },
          }}
        >
          {event.description}
        </Typography>

        <Typography
          sx={{
            fontSize: '0.73rem',
            color: 'text.secondary',
            fontFamily: '"Inter", sans-serif',
            fontStyle: 'italic',
          }}
        >
          {event.speaker}
        </Typography>
      </Box>

      {/* CTA */}
      <Box
        sx={{
          display: { xs: 'none', md: 'flex' },
          flexDirection: 'column',
          alignItems: 'flex-start',
          gap: 0.5,
          pt: 0.5,
          flexShrink: 0,
        }}
      >
        <Button
          onClick={handleToggleClick}
          endIcon={
            <ExpandMoreIcon
              sx={{
                fontSize: '16px !important',
                transition: 'transform 0.25s ease',
                transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)',
              }}
            />
          }
          sx={{
            color: 'text.secondary',
            fontSize: '0.75rem',
            letterSpacing: '0.06em',
            whiteSpace: 'nowrap',
            '&:hover': { color: 'secondary.main', bgcolor: 'transparent' },
          }}
        >
          {expanded ? 'Ver menos' : 'Más información'}
        </Button>

        {event.id != null && (
          <Button
            onClick={(e) => { e.stopPropagation(); onPagar?.(event.id); }}
            startIcon={<PaymentOutlinedIcon sx={{ fontSize: '15px !important' }} />}
            sx={{
              color: 'secondary.main',
              fontSize: '0.75rem',
              letterSpacing: '0.06em',
              whiteSpace: 'nowrap',
              '&:hover': { bgcolor: isDark ? 'rgba(155,37,37,.1)' : 'rgba(139,26,26,.06)' },
            }}
          >
            Abono de arancel
          </Button>
        )}
      </Box>
    </Box>

      {/* Detalle expandido */}
      <Collapse in={expanded} timeout={300} unmountOnExit>
        <Box
          onClick={(e) => e.stopPropagation()}
          sx={{
            mt: 4,
            pt: 4,
            borderTop: `1px dashed ${theme.palette.divider}`,
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            gap: { xs: 3, md: 5 },
            cursor: 'default',
          }}
        >
          {event.imagen && imagenValida && (
            <Box
              component="img"
              src={event.imagen}
              alt={event.title}
              onError={() => setImagenValida(false)}
              sx={{
                width: { xs: '100%', md: '48%' },
                maxWidth: 460,
                height: { xs: 220, md: 320 },
                objectFit: 'cover',
                border: `1px solid ${theme.palette.divider}`,
                flexShrink: 0,
              }}
            />
          )}

          <Box sx={{ flex: 1, minWidth: 0 }}>
            {event.description && (
              <Typography
                sx={{
                  color: 'text.secondary',
                  fontSize: '0.9rem',
                  lineHeight: 1.85,
                  mb: 3,
                }}
              >
                {event.description}
              </Typography>
            )}

            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' },
                gap: 2.5,
              }}
            >
              <DetailRow label="Fecha de inicio" value={formatearFecha(event.fechaInicio)} />
              <DetailRow label="Fecha de cierre" value={formatearFecha(event.fechaFin)} />
              <DetailRow icon={<PlaceOutlinedIcon sx={{ fontSize: 18 }} />} label="Lugar" value={event.lugar} />
              <DetailRow label="Modalidad" value={event.modalidad} />
              <DetailRow label="Ponente" value={event.speaker} />
              <DetailRow
                icon={<GroupsOutlinedIcon sx={{ fontSize: 18 }} />}
                label="Cupo"
                value={event.cupo != null ? `${event.cupo} lugares` : 'Sin límite'}
              />
              <DetailRow
                label="Costo por sesión"
                value={event.costoSesion != null ? `$${Number(event.costoSesion).toFixed(2)} MXN` : null}
              />
              <DetailRow
                label="Costo curso completo"
                value={event.costoCurso != null ? `$${Number(event.costoCurso).toFixed(2)} MXN` : null}
              />
            </Box>
          </Box>
        </Box>
      </Collapse>
    </Box>
  );
}
