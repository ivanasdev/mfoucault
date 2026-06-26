import { Box, Container, Typography, Chip } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import SectionLabel from '../ui/SectionLabel';
import { useInView } from '../../hooks/useInView';

const programs = [
  {
    type: 'Licenciatura',
    title: 'Psicología Crítica',
    description:
      'Formación teórica y clínica que articula el psicoanálisis, la teoría crítica y la filosofía en una comprensión profunda de la subjetividad contemporánea y sus determinaciones políticas.',
    duration: '4 años',
    modality: 'Presencial',
    accent: '#9b2525',
  },
  {
    type: 'Maestría',
    title: 'Psicoanálisis',
    description:
      'Profundización en la clínica psicoanalítica lacaniana, lectura sistemática de los seminarios de Lacan, supervisión de casos y producción de investigación clínica original.',
    duration: '2 años',
    modality: 'Presencial',
    accent: '#1a3a4a',
  },
  {
    type: 'Posgrado',
    title: 'Criminología Crítica',
    description:
      'Abordaje del crimen, el castigo y el control social desde perspectivas marxistas, abolicionistas y psicoanalíticas. Análisis de la violencia estructural y las políticas penales.',
    duration: '18 meses',
    modality: 'Semipresencial',
    accent: '#2a3a20',
  },
  {
    type: 'Diplomado',
    title: 'Filosofía y Teoría Social',
    description:
      'Recorrido por las tradiciones de la Escuela de Frankfurt, el postestructuralismo y la teoría social contemporánea. Lectura directa de textos fundamentales.',
    duration: '8 meses',
    modality: 'Presencial',
    accent: '#3a2a4a',
  },
  {
    type: 'Diplomado',
    title: 'Clínica de las Psicosis',
    description:
      'Formación especializada en el diagnóstico y tratamiento psicoanalítico de la psicosis. Estudio del paradigma del caso y la psicosis ordinaria desde Lacan.',
    duration: '6 meses',
    modality: 'Presencial',
    accent: '#4a2a1a',
  },
  {
    type: 'Seminario',
    title: 'Seminario Permanente de Psicoanálisis',
    description:
      'Espacio de lectura colectiva y discusión de los textos fundacionales del psicoanálisis. Freud, Lacan y sus continuadores en lectura directa y confrontación clínica.',
    duration: 'Anual',
    modality: 'Presencial',
    accent: '#9b2525',
  },
];

const typeColors = {
  Licenciatura: '#9b2525',
  Maestría: '#1a3a4a',
  Posgrado: '#2a3a20',
  Diplomado: '#3a2a4a',
  Seminario: '#4a3a1a',
};

export default function AcademicOffer() {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';
  const [ref, inView] = useInView(0.08);

  return (
    <Box
      id="oferta"
      ref={ref}
      sx={{
        bgcolor: 'background.default',
        py: { xs: 10, md: 16 },
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0)' : 'translateY(32px)',
        transition: 'opacity 0.9s ease, transform 0.9s ease',
      }}
    >
      <Container maxWidth="xl" sx={{ px: { xs: 3, md: 8 } }}>
        {/* Section header */}
        <Box sx={{ mb: { xs: 8, md: 11 } }}>
          <SectionLabel>02 — Oferta Académica</SectionLabel>
          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', md: 'row' },
              justifyContent: 'space-between',
              alignItems: { xs: 'flex-start', md: 'flex-end' },
              gap: 3,
            }}
          >
            <Typography
              variant="h2"
              sx={{
                fontSize: { xs: '1.9rem', md: '2.8rem' },
                color: 'text.primary',
                maxWidth: 520,
                lineHeight: 1.15,
              }}
            >
              Programas para pensar en profundidad
            </Typography>
            <Typography
              sx={{
                fontSize: '0.85rem',
                color: 'text.secondary',
                maxWidth: 340,
                lineHeight: 1.75,
                fontFamily: '"Inter", sans-serif',
              }}
            >
              Formación rigurosa, situada y políticamente comprometida
              con la producción colectiva de pensamiento.
            </Typography>
          </Box>
        </Box>

        {/* Programs grid */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', xl: '1fr 1fr 1fr' },
            gap: 0,
            border: `1px solid ${theme.palette.divider}`,
          }}
        >
          {programs.map((program, i) => (
            <ProgramCard key={program.title} program={program} index={i} isDark={isDark} theme={theme} />
          ))}
        </Box>
      </Container>
    </Box>
  );
}

function ProgramCard({ program, index, isDark, theme }) {
  return (
    <Box
      role="article"
      tabIndex={0}
      sx={{
        p: { xs: 3.5, md: 4.5 },
        borderRight: (index % 3 !== 2) ? `1px solid ${theme.palette.divider}` : 'none',
        borderBottom: (index < 3) ? `1px solid ${theme.palette.divider}` : 'none',
        position: 'relative',
        overflow: 'hidden',
        cursor: 'pointer',
        transition: 'background-color 0.3s ease',
        '&:hover': {
          bgcolor: isDark ? 'rgba(255,255,255,0.025)' : 'rgba(0,0,0,0.02)',
        },
        '&:hover .arrow-link': {
          color: 'secondary.main',
          gap: 1.5,
        },
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '2px',
          bgcolor: program.accent,
          opacity: isDark ? 0.7 : 0.8,
        },
      }}
    >
      {/* Type badge */}
      <Chip
        label={program.type}
        size="small"
        sx={{
          bgcolor: 'transparent',
          border: `1px solid ${program.accent}`,
          color: isDark ? `${program.accent}cc` : program.accent,
          fontSize: '0.62rem',
          letterSpacing: '0.12em',
          height: 22,
          mb: 2.5,
          borderRadius: 1,
        }}
      />

      <Typography
        variant="h5"
        sx={{
          fontSize: { xs: '1.15rem', md: '1.3rem' },
          color: 'text.primary',
          mb: 2,
          lineHeight: 1.25,
        }}
      >
        {program.title}
      </Typography>

      <Typography
        variant="body2"
        sx={{
          color: 'text.secondary',
          fontSize: '0.83rem',
          lineHeight: 1.8,
          mb: 4,
          flexGrow: 1,
        }}
      >
        {program.description}
      </Typography>

      {/* Meta */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          pt: 2.5,
          borderTop: `1px solid ${theme.palette.divider}`,
        }}
      >
        <Box>
          <Typography
            sx={{
              fontSize: '0.78rem',
              color: 'text.primary',
              fontFamily: '"Inter", sans-serif',
            }}
          >
            {program.duration}
          </Typography>
          <Typography
            sx={{
              fontSize: '0.65rem',
              color: 'text.secondary',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              fontFamily: '"Inter", sans-serif',
            }}
          >
            {program.modality}
          </Typography>
        </Box>

        <Box
          className="arrow-link"
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            color: 'text.secondary',
            fontSize: '0.75rem',
            letterSpacing: '0.08em',
            fontFamily: '"Inter", sans-serif',
            transition: 'all 0.3s ease',
          }}
        >
          Ver programa
          <ArrowForwardIcon sx={{ fontSize: 13 }} />
        </Box>
      </Box>
    </Box>
  );
}
