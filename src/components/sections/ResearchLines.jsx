import { useState } from 'react';
import { Box, Container, Typography, Collapse, IconButton } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import SectionLabel from '../ui/SectionLabel';
import { useInView } from '../../hooks/useInView';

const lines = [
  {
    num: '01',
    title: 'Psicoanálisis',
    lead: 'Estructura del inconsciente, clínica de las neurosis y fundamentos lacanianos.',
    description:
      'Investigación sobre la estructura del inconsciente y sus manifestaciones clínicas: el sueño, el síntoma, el acto fallido y el chiste. Lectura sistemática de los Seminarios de Lacan y su articulación con los textos freudianos fundacionales. Trabajos sobre la transferencia, el deseo y la ética del psicoanálisis como práctica clínica y discurso.',
    researchers: ['Elena Vásquez Reyes', 'Sofía Cienfuegos'],
    publications: 34,
  },
  {
    num: '02',
    title: 'Clínica de las Psicosis',
    lead: 'Abordaje psicoanalítico de la psicosis ordinaria y el paradigma del caso.',
    description:
      'Estudio del diagnóstico diferencial y las modalidades de tratamiento de la psicosis desde la perspectiva lacaniana. Análisis de la forclusión del Nombre del Padre, las suplencias y la psicosis ordinaria como categoría clínica. Supervisión de casos y elaboración de viñetas clínicas a partir de la práctica institucional.',
    researchers: ['Sofía Cienfuegos', 'Elena Vásquez Reyes'],
    publications: 18,
  },
  {
    num: '03',
    title: 'Teoría Crítica',
    lead: 'Escuela de Frankfurt, genealogía foucaultiana y pensamiento crítico contemporáneo.',
    description:
      'Investigación sobre la Escuela de Frankfurt (Adorno, Horkheimer, Marcuse, Habermas) y sus actualizaciones contemporáneas (Honneth, Fraser). Articulación con la genealogía foucaultiana del poder y del sujeto. Análisis crítico del capitalismo tardío, las industrias culturales y las formas contemporáneas de dominación ideológica.',
    researchers: ['Luis Ibáñez Torres', 'Andrés Vallecillo'],
    publications: 27,
  },
  {
    num: '04',
    title: 'Goce y Subjetividad',
    lead: 'Modos de satisfacción pulsional y su articulación con el lazo social contemporáneo.',
    description:
      'Exploración de los regímenes de goce propios del discurso capitalista: el consumo compulsivo, la adicción, la evaluación permanente y la servidumbre voluntaria. Análisis de la relación entre goce, cuerpo y subjetivación. Lectura de los últimos Seminarios de Lacan y su pertinencia para pensar los síntomas de época.',
    researchers: ['Elena Vásquez Reyes', 'Carmen Delgado'],
    publications: 21,
  },
  {
    num: '05',
    title: 'Criminología Crítica',
    lead: 'Análisis del crimen, el castigo y el control social desde perspectivas marxistas y abolicionistas.',
    description:
      'Investigación sobre la construcción social del delito y la criminalización selectiva de la pobreza. Análisis de las políticas penales y penitenciarias desde perspectivas abolicionistas (Christie, Hulsman) y psicoanalíticas. Estudio de la violencia estatal, el derecho penal del enemigo y las alternativas al castigo en el contexto latinoamericano.',
    researchers: ['Rodrigo Montemayor', 'Andrés Vallecillo'],
    publications: 23,
  },
  {
    num: '06',
    title: 'Violencia y Lazo Social',
    lead: 'Violencia simbólica, estructural y política en el contexto latinoamericano.',
    description:
      'Análisis multidisciplinar de las formas de violencia que articulan lo simbólico, lo estructural y lo político. Lectura de Bourdieu, Butler y la perspectiva psicoanalítica sobre la agresividad y la pulsión de muerte. Investigación sobre las violencias de género, la violencia estatal y las posibilidades de subjetivación política frente a la catástrofe social.',
    researchers: ['Carmen Delgado', 'Rodrigo Montemayor'],
    publications: 16,
  },
];

export default function ResearchLines() {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';
  const [ref, inView] = useInView(0.06);
  const [open, setOpen] = useState(null);

  return (
    <Box
      id="investigacion"
      ref={ref}
      sx={{
        bgcolor: 'background.default',
        py: { xs: 10, md: 16 },
        borderTop: `1px solid ${theme.palette.divider}`,
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0)' : 'translateY(32px)',
        transition: 'opacity 0.9s ease, transform 0.9s ease',
      }}
    >
      <Container maxWidth="xl" sx={{ px: { xs: 3, md: 8 } }}>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', lg: '1fr 2fr' },
            gap: { xs: 7, lg: 12 },
            alignItems: 'start',
          }}
        >
          {/* Left */}
          <Box sx={{ position: { lg: 'sticky' }, top: { lg: 120 } }}>
            <SectionLabel>06 — Líneas de Investigación</SectionLabel>
            <Typography
              variant="h2"
              sx={{
                fontSize: { xs: '1.9rem', md: '2.5rem' },
                color: 'text.primary',
                lineHeight: 1.15,
                mb: 4,
              }}
            >
              Ejes del trabajo intelectual colectivo
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: 'text.secondary',
                fontSize: '0.88rem',
                lineHeight: 1.85,
                mb: 4,
              }}
            >
              Las líneas de investigación del Colegio articulan la producción teórica
              con la práctica clínica y el compromiso político. No son compartimentos
              estancos sino campos en tensión productiva.
            </Typography>
            <Box
              sx={{
                p: 3,
                border: `1px solid ${theme.palette.divider}`,
                bgcolor: isDark ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.02)',
              }}
            >
              <Typography
                sx={{
                  fontFamily: '"Playfair Display", serif',
                  fontStyle: 'italic',
                  fontSize: '0.95rem',
                  color: 'text.primary',
                  lineHeight: 1.6,
                  mb: 1.5,
                }}
              >
                "La investigación no produce objetos sino sujetos: sujetos que se han
                transformado en el proceso de pensar algo que no entendían."
              </Typography>
              <Typography sx={{ fontSize: '0.62rem', letterSpacing: '0.12em', color: 'text.secondary', textTransform: 'uppercase', fontFamily: '"Inter", sans-serif' }}>
                Principios del Colegio
              </Typography>
            </Box>
          </Box>

          {/* Right: accordion */}
          <Box>
            {lines.map((line) => (
              <ResearchItem
                key={line.num}
                line={line}
                isOpen={open === line.num}
                onToggle={() => setOpen(open === line.num ? null : line.num)}
                isDark={isDark}
                theme={theme}
              />
            ))}
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

function ResearchItem({ line, isOpen, onToggle, isDark, theme }) {
  return (
    <Box
      sx={{
        borderBottom: `1px solid ${theme.palette.divider}`,
        '&:first-of-type': { borderTop: `1px solid ${theme.palette.divider}` },
      }}
    >
      <Box
        onClick={onToggle}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') onToggle(); }}
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: { xs: 3, md: 5 },
          py: { xs: 3, md: 3.5 },
          cursor: 'pointer',
          '&:hover .line-title': {
            color: isDark ? 'rgba(221,211,191,0.95)' : 'rgba(26,21,16,0.95)',
          },
        }}
      >
        <Typography
          sx={{
            fontFamily: '"Playfair Display", serif',
            fontSize: { xs: '1.4rem', md: '2rem' },
            color: isDark ? 'rgba(221,200,170,0.15)' : 'rgba(26,21,16,0.12)',
            lineHeight: 1,
            fontWeight: 700,
            flexShrink: 0,
            width: { xs: 40, md: 56 },
          }}
        >
          {line.num}
        </Typography>

        <Box sx={{ flexGrow: 1 }}>
          <Typography
            className="line-title"
            sx={{
              fontFamily: '"Playfair Display", serif',
              fontSize: { xs: '1.05rem', md: '1.25rem' },
              color: 'text.primary',
              lineHeight: 1.25,
              mb: 0.5,
              transition: 'color 0.2s',
            }}
          >
            {line.title}
          </Typography>
          <Typography
            sx={{
              fontSize: '0.78rem',
              color: 'text.secondary',
              fontFamily: '"Inter", sans-serif',
              display: { xs: 'none', sm: 'block' },
            }}
          >
            {line.lead}
          </Typography>
        </Box>

        <IconButton
          size="small"
          sx={{
            color: isOpen ? 'secondary.main' : 'text.secondary',
            flexShrink: 0,
            transition: 'color 0.2s',
          }}
        >
          {isOpen ? <RemoveIcon fontSize="small" /> : <AddIcon fontSize="small" />}
        </IconButton>
      </Box>

      <Collapse in={isOpen}>
        <Box
          sx={{
            pb: 4,
            pl: { xs: 0, md: `calc(40px + ${theme.spacing(3)})` },
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: '1fr auto' },
            gap: { xs: 3, md: 5 },
            alignItems: 'start',
          }}
        >
          <Typography
            variant="body2"
            sx={{ color: 'text.secondary', fontSize: '0.85rem', lineHeight: 1.85 }}
          >
            {line.description}
          </Typography>
          <Box sx={{ textAlign: { xs: 'left', md: 'right' }, flexShrink: 0 }}>
            <Typography sx={{ fontFamily: '"Playfair Display", serif', fontSize: '1.5rem', color: 'text.primary', lineHeight: 1 }}>
              {line.publications}
            </Typography>
            <Typography sx={{ fontSize: '0.62rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'text.secondary', fontFamily: '"Inter", sans-serif', mb: 2 }}>
              Publicaciones
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
              {line.researchers.map((r) => (
                <Typography key={r} sx={{ fontSize: '0.75rem', color: 'text.secondary', fontFamily: '"Inter", sans-serif', fontStyle: 'italic', whiteSpace: 'nowrap' }}>
                  {r}
                </Typography>
              ))}
            </Box>
          </Box>
        </Box>
      </Collapse>
    </Box>
  );
}
