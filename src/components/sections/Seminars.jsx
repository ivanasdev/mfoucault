import { Box, Container, Typography, Chip, Button } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined';
import SectionLabel from '../ui/SectionLabel';
import { useInView } from '../../hooks/useInView';

const events = [
  {
    day: '15',
    month: 'Jul',
    year: '2026',
    type: 'Seminario',
    title: 'El sujeto en la clínica: entre el síntoma y el goce',
    description: 'Discusión en torno a la articulación lacaniana entre síntoma, goce y sujeto. Lectura de los Seminarios XX y XXIII de Lacan.',
    speaker: 'Dra. Elena Vásquez Reyes',
    place: 'Aula Magna — Sede Central',
    accent: '#9b2525',
  },
  {
    day: '22',
    month: 'Jul',
    year: '2026',
    type: 'Coloquio',
    title: 'Genealogía del poder disciplinario: relecturas de Vigilar y castigar',
    description: 'Coloquio sobre la actualidad del análisis foucaultiano de las instituciones disciplinarias y sus transformaciones contemporáneas.',
    speaker: 'Dr. Rodrigo Montemayor & invitados',
    place: 'Sala de Seminarios — Sede Central',
    accent: '#1a3a4a',
  },
  {
    day: '05',
    month: 'Ago',
    year: '2026',
    type: 'Jornada',
    title: 'Violencia, Estado y subjetividad en América Latina',
    description: 'Jornada académica de un día completo que reúne investigadores de criminología crítica, psicología social y teoría política para pensar las violencias estatales en el contexto latinoamericano.',
    speaker: 'Mesa redonda: investigadores invitados',
    place: 'Auditorio — Campus Norte',
    accent: '#2a3a20',
  },
  {
    day: '12',
    month: 'Ago',
    year: '2026',
    type: 'Conferencia',
    title: 'Lacan y el lenguaje: estructura, equívoco y falla',
    description: 'Conferencia inaugural del ciclo anual "Fundamentos del psicoanálisis lacaniano", dirigida a estudiantes de nuevo ingreso y público general.',
    speaker: 'Mtra. Sofía Cienfuegos',
    place: 'Aula Magna — Sede Central',
    accent: '#9b2525',
  },
  {
    day: '19',
    month: 'Ago',
    year: '2026',
    type: 'Seminario',
    title: 'Crítica de la razón punitiva: hacia un abolicionismo penal',
    description: 'Seminario intensivo sobre las bases teóricas del abolicionismo penal, con lectura de Christie, Hulsman y sus recepciones latinoamericanas.',
    speaker: 'Dr. Andrés Vallecillo',
    place: 'Sala de Seminarios — Sede Central',
    accent: '#3a2a4a',
  },
  {
    day: '03',
    month: 'Sep',
    year: '2026',
    type: 'Coloquio',
    title: 'Psicoanálisis y política: el malestar en la cultura hoy',
    description: 'Coloquio de fin de semana sobre las dimensiones políticas del psicoanálisis freudiano y lacaniano: subjetivación, deseo y resistencia.',
    speaker: 'Dr. Luis Ibáñez Torres & Dra. Carmen Delgado',
    place: 'Campus Norte — Auditorio B',
    accent: '#4a3a1a',
  },
];

const typeColors = {
  Seminario: '#9b2525',
  Coloquio: '#1a3a4a',
  Jornada: '#2a3a20',
  Conferencia: '#3a2a4a',
};

export default function Seminars() {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';
  const [ref, inView] = useInView(0.08);

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
            <SectionLabel>03 — Seminarios y Eventos</SectionLabel>
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

        {/* Events list */}
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          {events.map((event, i) => (
            <EventRow key={event.title} event={event} index={i} isDark={isDark} theme={theme} />
          ))}
        </Box>

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
      </Container>
    </Box>
  );
}

function EventRow({ event, index, isDark, theme }) {
  const accent = typeColors[event.type] || '#9b2525';

  return (
    <Box
      role="article"
      tabIndex={0}
      sx={{
        display: 'grid',
        gridTemplateColumns: { xs: '1fr', md: '88px 1fr auto' },
        gap: { xs: 2, md: 5 },
        alignItems: 'start',
        py: { xs: 4, md: 5 },
        borderBottom: `1px solid ${theme.palette.divider}`,
        cursor: 'pointer',
        transition: 'background-color 0.25s',
        px: { xs: 0, md: 1 },
        mx: { xs: 0, md: -1 },
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
          alignItems: 'flex-start',
          pt: 0.5,
          flexShrink: 0,
        }}
      >
        <Button
          endIcon={<ArrowForwardIcon sx={{ fontSize: '13px !important' }} />}
          sx={{
            color: 'text.secondary',
            fontSize: '0.75rem',
            letterSpacing: '0.06em',
            whiteSpace: 'nowrap',
            '&:hover': { color: 'secondary.main', bgcolor: 'transparent' },
          }}
        >
          Más información
        </Button>
      </Box>
    </Box>
  );
}
