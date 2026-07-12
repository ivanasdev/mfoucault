import { Box, Container, Typography, Button } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import SectionLabel from '../ui/SectionLabel';
import { useInView } from '../../hooks/useInView';

export default function Manifesto() {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';
  const [ref, inView] = useInView(0.1);

  return (
    <Box
      id="manifiesto"
      ref={ref}
      sx={{
        bgcolor: 'background.paper',
        py: { xs: 10, md: 16 },
        borderTop: `1px solid ${theme.palette.divider}`,
        borderBottom: `1px solid ${theme.palette.divider}`,
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0)' : 'translateY(32px)',
        transition: 'opacity 0.9s ease, transform 0.9s ease',
      }}
    >
      <Container maxWidth="xl" sx={{ px: { xs: 3, md: 8 } }}>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', lg: '1fr 1fr' },
            gap: { xs: 7, lg: 12 },
            alignItems: 'start',
          }}
        >
          {/* Left: pull quote */}
          <Box sx={{ position: { lg: 'sticky' }, top: { lg: 120 } }}>
            <SectionLabel>  Manifiesto</SectionLabel>

            <Box
              sx={{
                borderLeft: `3px solid ${isDark ? 'rgba(155,37,37,0.7)' : 'rgba(139,26,26,0.65)'}`,
                pl: { xs: 3, md: 4 },
                mb: 6,
              }}
            >
              <Typography
                sx={{
                  fontFamily: '"Playfair Display", serif',
                  fontStyle: 'italic',
                  fontSize: { xs: '1.5rem', md: '2rem', lg: '2.3rem' },
                  color: 'text.primary',
                  lineHeight: 1.35,
                  mb: 3,
                }}
              >
                "No se trata de producir más saberes, sino de formar sujetos capaces
                de pensar de otro modo."
              </Typography>
              <Typography
                sx={{
                  fontSize: '0.72rem',
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  color: 'secondary.main',
                  fontFamily: '"Inter", sans-serif',
                }}
              >
                Colegio Michel Foucault, 2024
              </Typography>
            </Box>

            {/* Secondary quote */}
            <Box
              sx={{
                p: { xs: 3, md: 4 },
                bgcolor: isDark ? 'rgba(155,37,37,0.06)' : 'rgba(139,26,26,0.04)',
                border: `1px solid ${isDark ? 'rgba(155,37,37,0.15)' : 'rgba(139,26,26,0.12)'}`,
              }}
            >
              <Typography
                sx={{
                  fontFamily: '"Playfair Display", serif',
                  fontStyle: 'italic',
                  fontSize: { xs: '0.95rem', md: '1.05rem' },
                  color: 'text.primary',
                  lineHeight: 1.7,
                  mb: 2,
                }}
              >
                "Frente a la instrumentalización del conocimiento y la subordinación de la
                subjetividad al mercado, apostamos por la pregunta, el rigor y la lectura
                como formas irreductibles de resistencia."
              </Typography>
              <Typography
                sx={{
                  fontSize: '0.68rem',
                  letterSpacing: '0.15em',
                  color: 'text.secondary',
                  fontFamily: '"Inter", sans-serif',
                  textTransform: 'uppercase',
                }}
              >
                Del manifiesto fundacional
              </Typography>
            </Box>
          </Box>

          {/* Right: body text */}
          <Box>
            <Typography
              variant="h3"
              sx={{
                fontSize: { xs: '1.6rem', md: '2rem' },
                color: 'text.primary',
                mb: 4,
                lineHeight: 1.2,
              }}
            >
              Un espacio para el pensamiento que incomoda
            </Typography>

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              {[
                `El Colegio Michel Foucault nace de la convicción de que el pensamiento crítico no es un lujo intelectual ni un ornamento académico, sino una necesidad política y una práctica ética. En un tiempo en que el saber se subordina a la productividad y la subjetividad se reduce al consumo, apostamos por una formación que recupere la pregunta, el rigor y la lectura como formas de vida.`,
                `Nos situamos en la encrucijada del psicoanálisis lacaniano, la teoría crítica de la Escuela de Frankfurt, la genealogía foucaultiana y la criminología crítica. No como eclecticismo, sino como exigencia de un pensamiento que no renuncia a su complejidad ni a sus contradicciones productivas.`,
                `Entendemos la clínica no solo como práctica terapéutica, sino como acontecimiento político: el espacio donde la subjetividad se confronta con sus determinaciones y donde emerge la posibilidad —siempre difícil, siempre singular— de un decir propio.`,
                `La formación que ofrecemos no promete empleabilidad ni certeza. Promete, en cambio, el riesgo fecundo del encuentro con textos que no consuelan, con preguntas que no cierran, con otros que piensan diferente y que nos obligan a sostener la tensión del desacuerdo productivo.`,
              ].map((text, i) => (
                <Typography
                  key={i}
                  variant="body1"
                  sx={{
                    color: 'text.secondary',
                    fontSize: { xs: '0.9rem', md: '0.95rem' },
                    lineHeight: 1.9,
                  }}
                >
                  {text}
                </Typography>
              ))}
            </Box>

            <Box
              sx={{
                mt: 5,
                pt: 4,
                borderTop: `1px solid ${theme.palette.divider}`,
                display: 'flex',
                alignItems: 'center',
                gap: 4,
                flexWrap: 'wrap',
              }}
            >
              <Button
                endIcon={<ArrowForwardIcon sx={{ fontSize: '13px !important' }} />}
                onClick={() => {}}
                sx={{
                  color: 'secondary.main',
                  fontSize: '0.8rem',
                  letterSpacing: '0.08em',
                  p: 0,
                  '&:hover': { bgcolor: 'transparent', textDecoration: 'underline' },
                }}
              >
                Leer manifiesto completo
              </Button>

              <Box sx={{ display: 'flex', gap: 4, ml: 'auto' }}>
                {[
                  { num: '6', label: 'Programas' },
                  { num: '12+', label: 'Docentes' },
                  { num: '200+', label: 'Estudiantes' },
                ].map((stat) => (
                  <Box key={stat.label} sx={{ textAlign: 'center' }}>
                    <Typography
                      sx={{
                        fontFamily: '"Playfair Display", serif',
                        fontSize: '1.8rem',
                        color: 'text.primary',
                        lineHeight: 1,
                        mb: 0.5,
                      }}
                    >
                      {stat.num}
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: '0.65rem',
                        letterSpacing: '0.15em',
                        textTransform: 'uppercase',
                        color: 'text.secondary',
                        fontFamily: '"Inter", sans-serif',
                      }}
                    >
                      {stat.label}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
