import { Box, Container, Typography, Chip, Button, Divider } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import SectionLabel from '../ui/SectionLabel';
import { useInView } from '../../hooks/useInView';

const services = [
  {
    tag: 'Análisis',
    title: 'Análisis Individual',
    description:
      'El análisis lacaniano se dirige a quien reconoce que algo en su vida no anda, que el sufrimiento ya no puede ser atribuido sólo al exterior. El analista sostiene la transferencia y orienta desde el deseo, no desde la adaptación ni la sugestión.',
    detail: 'Sesiones a convenir',
    accent: '#9b2525',
  },
  {
    tag: 'Consulta',
    title: 'Consulta Preliminar',
    description:
      'Espacio de escucha inicial en el que se delimita la demanda del consultante y se evalúa si el análisis es la vía adecuada. Pueden ser una o varias entrevistas antes de fijar una dirección de cura.',
    detail: 'Tres entrevistas',
    accent: '#1a3a4a',
  },
  {
    tag: 'Supervisión',
    title: 'Supervisión Clínica',
    description:
      'Para analistas en formación o en ejercicio que necesitan confrontar su práctica con otro. La supervisión lacaniana no es la verificación de una técnica sino el trabajo sobre los efectos de la transferencia en el clínico.',
    detail: 'Por cita previa',
    accent: '#2a3a20',
  },
  {
    tag: 'Institución',
    title: 'Clínica con Instituciones',
    description:
      'Acompañamiento clínico y asesoría a equipos de salud mental, centros educativos y organizaciones que trabajan con población en situación de vulnerabilidad. Intervención desde el marco del psicoanálisis aplicado.',
    detail: 'Previa coordinación',
    accent: '#3a2a4a',
  },
];

const principles = [
  {
    label: 'Orientación lacaniana',
    text: 'Nuestra práctica se orienta por los desarrollos de Jacques Lacan sobre la transferencia, el deseo y la estructura del sujeto. El síntoma no se suprime: se trabaja.',
  },
  {
    label: 'Ética de la cura',
    text: 'No prometemos felicidad ni adaptación. El análisis abre la posibilidad de que el sujeto se haga cargo de su posición en la vida, más allá de la queja.',
  },
  {
    label: 'Confidencialidad absoluta',
    text: 'El secreto clínico es un principio sin excepciones. Ningún caso se discute fuera de los espacios de supervisión protegidos por el mismo compromiso ético.',
  },
];

export default function Clinic() {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';
  const [ref, inView] = useInView(0.06);

  return (
    <Box
      id="clinica"
      ref={ref}
      sx={{
        bgcolor: isDark ? '#0d0d0d' : '#ede8db',
        py: { xs: 10, md: 16 },
        borderTop: `1px solid ${theme.palette.divider}`,
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0)' : 'translateY(32px)',
        transition: 'opacity 0.9s ease, transform 0.9s ease',
      }}
    >
      <Container maxWidth="xl" sx={{ px: { xs: 3, md: 8 } }}>

        {/* Header */}
        <Box sx={{ mb: { xs: 8, md: 11 } }}>
          <SectionLabel>09 — Clínica </SectionLabel>
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
              Un espacio de escucha de uno a uno.
            </Typography>
            <Typography
              sx={{
                fontSize: '1.01rem',
                color: 'text.secondary',
                maxWidth: 360,
                lineHeight: 1.75,
                fontFamily: '"Inter", sans-serif',
              }}
            >
              La clínica del Colegio Michel Foucault está atendida por analistas en formación
              y en ejercicio, bajo supervisión permanente. Ofrecemos atención accesible,
              orientada por los principios del psicoanálisis lacaniano.
            </Typography>
          </Box>
        </Box>

        {/* Services grid */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' },
            gap: 0,
            border: `1px solid ${theme.palette.divider}`,
            mb: { xs: 8, md: 12 },
          }}
        >
          {services.map((s, i) => (
            <ServiceCard key={s.title} service={s} index={i} isDark={isDark} theme={theme} />
          ))}
        </Box>

        {/* Principles */}
        <Box sx={{ mb: { xs: 8, md: 12 } }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 5 }}>
            <Box sx={{ width: 28, height: '1px', bgcolor: 'secondary.main' }} />
            <Typography
              sx={{
                fontSize: '0.68rem',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: 'text.secondary',
                fontFamily: '"Inter", sans-serif',
                fontWeight: 500,
              }}
            >
              Principios de nuestra práctica
            </Typography>
          </Box>

          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', md: '1fr 1fr 1fr' },
              gap: 0,
              border: `1px solid ${theme.palette.divider}`,
            }}
          >
            {principles.map((p, i) => (
              <Box
                key={p.label}
                sx={{
                  p: { xs: 3.5, md: 4 },
                  borderRight: i < 2 ? `1px solid ${theme.palette.divider}` : 'none',
                }}
              >
                <Typography
                  sx={{
                    fontFamily: '"Inter", sans-serif',
                    fontSize: '0.65rem',
                    letterSpacing: '0.18em',
                    textTransform: 'uppercase',
                    color: 'secondary.main',
                    mb: 2,
                    fontWeight: 500,
                  }}
                >
                  {p.label}
                </Typography>
                <Typography
                  sx={{
                    fontSize: '0.85rem',
                    color: 'text.secondary',
                    lineHeight: 1.8,
                    fontFamily: '"Inter", sans-serif',
                  }}
                >
                  {p.text}
                </Typography>
              </Box>
            ))}
          </Box>
        </Box>

        {/* Contact block */}
        <Box
          sx={{
            border: `1px solid ${theme.palette.divider}`,
            p: { xs: 4, md: 6 },
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            justifyContent: 'space-between',
            alignItems: { xs: 'flex-start', md: 'center' },
            gap: 4,
            position: 'relative',
            overflow: 'hidden',
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: '2px',
              bgcolor: 'secondary.main',
              opacity: isDark ? 0.7 : 0.85,
            },
          }}
        >
          <Box sx={{ maxWidth: 560 }}>
            <Typography
              variant="h4"
              sx={{
                fontSize: { xs: '1.3rem', md: '1.7rem' },
                color: 'text.primary',
                lineHeight: 1.2,
                mb: 1.5,
              }}
            >
              Solicitar una consulta
            </Typography>
            <Typography
              sx={{
                fontSize: '0.85rem',
                color: 'text.secondary',
                lineHeight: 1.75,
                fontFamily: '"Inter", sans-serif',
              }}
            >
              Escríbenos para coordinar una entrevista preliminar sin compromiso.
              Respondemos en un plazo máximo de 48 horas. Los honorarios se acuerdan
              en función de las posibilidades de cada consultante.
            </Typography>

            <Divider sx={{ my: 3, borderColor: theme.palette.divider }} />

            <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: { xs: 1.5, sm: 4 } }}>
              <Box>
                <Typography
                  sx={{
                    fontSize: '0.62rem',
                    letterSpacing: '0.15em',
                    textTransform: 'uppercase',
                    color: 'text.secondary',
                    fontFamily: '"Inter", sans-serif',
                    mb: 0.5,
                  }}
                >
                  Correo clínico
                </Typography>
                <Typography
                  sx={{
                    fontSize: '0.88rem',
                    color: 'text.primary',
                    fontFamily: '"Inter", sans-serif',
                  }}
                >
                  clinica@colegiomichelfoucault.mx
                </Typography>
              </Box>
              <Box>
                <Typography
                  sx={{
                    fontSize: '0.62rem',
                    letterSpacing: '0.15em',
                    textTransform: 'uppercase',
                    color: 'text.secondary',
                    fontFamily: '"Inter", sans-serif',
                    mb: 0.5,
                  }}
                >
                  Atención
                </Typography>
                <Typography
                  sx={{
                    fontSize: '0.88rem',
                    color: 'text.primary',
                    fontFamily: '"Inter", sans-serif',
                  }}
                >
                  Lunes a viernes · 9:00 – 20:00h
                </Typography>
              </Box>
            </Box>
          </Box>

          <Button
            variant="outlined"
            endIcon={<ArrowForwardIcon sx={{ fontSize: 14 }} />}
            component="a"
            href="mailto:clinica@colegiomichelfoucault.mx"
            sx={{
              color: 'secondary.main',
              borderColor: 'secondary.main',
              borderWidth: '1px',
              fontSize: '0.78rem',
              letterSpacing: '0.1em',
              px: 3.5,
              py: 1.5,
              whiteSpace: 'nowrap',
              flexShrink: 0,
              '&:hover': {
                bgcolor: 'rgba(155,37,37,0.08)',
                borderColor: 'secondary.main',
              },
            }}
          >
            Escribir a la clínica
          </Button>
        </Box>
      </Container>
    </Box>
  );
}

function ServiceCard({ service, index, isDark, theme }) {
  const isLeft = index % 2 === 0;
  const isTop = index < 2;

  return (
    <Box
      role="article"
      tabIndex={0}
      sx={{
        p: { xs: 3.5, md: 4.5 },
        borderRight: isLeft ? `1px solid ${theme.palette.divider}` : 'none',
        borderBottom: isTop ? `1px solid ${theme.palette.divider}` : 'none',
        position: 'relative',
        overflow: 'hidden',
        cursor: 'default',
        transition: 'background-color 0.3s ease',
        '&:hover': {
          bgcolor: isDark ? 'rgba(255,255,255,0.025)' : 'rgba(0,0,0,0.02)',
        },
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '2px',
          bgcolor: service.accent,
          opacity: isDark ? 0.6 : 0.75,
        },
      }}
    >
      <Chip
        label={service.tag}
        size="small"
        sx={{
          bgcolor: 'transparent',
          border: `1px solid ${service.accent}`,
          color: isDark ? `${service.accent}cc` : service.accent,
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
          fontSize: { xs: '1.1rem', md: '1.25rem' },
          color: 'text.primary',
          mb: 2,
          lineHeight: 1.25,
        }}
      >
        {service.title}
      </Typography>

      <Typography
        variant="body2"
        sx={{
          color: 'text.secondary',
          fontSize: '0.83rem',
          lineHeight: 1.8,
          mb: 3.5,
        }}
      >
        {service.description}
      </Typography>

      <Box
        sx={{
          pt: 2.5,
          borderTop: `1px solid ${theme.palette.divider}`,
        }}
      >
        <Typography
          sx={{
            fontSize: '0.72rem',
            color: 'text.secondary',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            fontFamily: '"Inter", sans-serif',
          }}
        >
          {service.detail}
        </Typography>
      </Box>
    </Box>
  );
}
