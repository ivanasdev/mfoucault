import { useState } from 'react';
import { Box, Container, Typography, Tabs, Tab, Button, Chip } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import SectionLabel from '../ui/SectionLabel';
import { useInView } from '../../hooks/useInView';

const tabs = ['Revista', 'Ensayos', 'Reseñas', 'Traducciones'];

const featured = {
  journal: 'Crítica y Subjetividad',
  volume: 'Vol. 3, Núm. 1',
  year: '2026',
  theme: 'Goce, exceso y resistencia en el lazo social contemporáneo',
  description:
    'Este número reúne trabajos que abordan desde perspectivas psicoanalíticas, filosóficas y sociológicas las formas contemporáneas del exceso, la compulsión y el goce como síntomas de época. Incluye artículos, ensayos clínicos, una entrevista y una sección de notas críticas.',
  articles: [
    'Goce y descomposición del lazo social — E. Vásquez Reyes',
    'Adicción, objeto a y capitalismo — S. Cienfuegos',
    'La pulsión de muerte en la era de las redes — L. Ibáñez Torres',
    'Notas sobre el goce en la psicosis ordinaria — R. Montemayor',
  ],
};

const essays = [
  {
    type: 'Ensayo',
    title: 'El sujeto supuesto saber y sus crisis: notas sobre el declive de la autoridad en la clínica',
    author: 'Sofía Cienfuegos',
    date: 'Mayo 2026',
    length: '18 pp.',
  },
  {
    type: 'Ensayo',
    title: 'Populismo punitivo y discurso del amo: una lectura desde la criminología crítica',
    author: 'Andrés Vallecillo',
    date: 'Abril 2026',
    length: '22 pp.',
  },
  {
    type: 'Ensayo',
    title: 'Cuerpo, trauma y lenguaje: el síntoma somático en la clínica freudiana',
    author: 'Elena Vásquez Reyes',
    date: 'Marzo 2026',
    length: '26 pp.',
  },
  {
    type: 'Ensayo',
    title: 'Teoría crítica y psicoanálisis: hacia una articulación posible',
    author: 'Luis Ibáñez Torres',
    date: 'Febrero 2026',
    length: '20 pp.',
  },
];

const reviews = [
  {
    type: 'Reseña',
    title: 'Sobre "Los nuevos síntomas" de Éric Laurent',
    author: 'Carmen Delgado',
    date: 'Mayo 2026',
    length: '6 pp.',
  },
  {
    type: 'Reseña',
    title: 'Reseña de "Abolicionar el sistema penal" de R. Hulsman',
    author: 'Rodrigo Montemayor',
    date: 'Abril 2026',
    length: '8 pp.',
  },
  {
    type: 'Reseña',
    title: 'Sobre la reedición de "Dialéctica negativa" de Adorno',
    author: 'Luis Ibáñez Torres',
    date: 'Marzo 2026',
    length: '7 pp.',
  },
];

const translations = [
  {
    type: 'Traducción',
    title: '"La función del escrito en el psicoanálisis" — J. Lacan (1971)',
    author: 'Trad. Elena Vásquez Reyes',
    date: 'Junio 2026',
    length: '15 pp.',
  },
  {
    type: 'Traducción',
    title: '"Delincuencia y sistema penal" — N. Christie (extracto)',
    author: 'Trad. Andrés Vallecillo',
    date: 'Abril 2026',
    length: '12 pp.',
  },
];

const contentByTab = { Revista: null, Ensayos: essays, Reseñas: reviews, Traducciones: translations };

export default function Publications() {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';
  const [ref, inView] = useInView(0.08);
  const [tab, setTab] = useState(0);
  const currentTab = tabs[tab];

  return (
    <Box
      id="publicaciones"
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
        <SectionLabel>05 — Publicaciones</SectionLabel>

        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            justifyContent: 'space-between',
            alignItems: { xs: 'flex-start', md: 'flex-end' },
            mb: { xs: 6, md: 8 },
            gap: 3,
          }}
        >
          <Typography
            variant="h2"
            sx={{ fontSize: { xs: '1.9rem', md: '2.8rem' }, color: 'text.primary', lineHeight: 1.15 }}
          >
            Producción intelectual del Colegio
          </Typography>
          <Button
            endIcon={<ArrowForwardIcon sx={{ fontSize: '13px !important' }} />}
            sx={{ color: 'secondary.main', fontSize: '0.8rem', letterSpacing: '0.08em', '&:hover': { bgcolor: 'transparent', textDecoration: 'underline' } }}
          >
            Ver todo el archivo
          </Button>
        </Box>

        {/* Tabs */}
        <Tabs
          value={tab}
          onChange={(_, v) => setTab(v)}
          sx={{
            mb: { xs: 6, md: 8 },
            borderBottom: `1px solid ${theme.palette.divider}`,
            '& .MuiTab-root': {
              color: 'text.secondary',
              fontSize: '0.82rem',
              letterSpacing: '0.07em',
              pb: 2,
              minWidth: 'auto',
              px: { xs: 1.5, md: 2.5 },
            },
            '& .Mui-selected': { color: 'text.primary' },
            '& .MuiTabs-indicator': { bgcolor: 'secondary.main', height: 1 },
          }}
        >
          {tabs.map((t) => <Tab key={t} label={t} disableRipple />)}
        </Tabs>

        {/* Featured Journal */}
        {currentTab === 'Revista' && (
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
              gap: { xs: 5, md: 8 },
              border: `1px solid ${theme.palette.divider}`,
              p: { xs: 3.5, md: 6 },
            }}
          >
            {/* Journal cover simulation */}
            <Box
              sx={{
                bgcolor: isDark ? '#0e0a0a' : '#f0e8df',
                border: `1px solid ${theme.palette.divider}`,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                p: { xs: 4, md: 5 },
                minHeight: { xs: 280, md: 380 },
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              <Box
                sx={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  height: '3px',
                  bgcolor: 'secondary.main',
                  opacity: 0.8,
                }}
              />
              <Box>
                <Typography
                  sx={{
                    fontSize: '0.6rem',
                    letterSpacing: '0.25em',
                    textTransform: 'uppercase',
                    color: 'text.secondary',
                    fontFamily: '"Inter", sans-serif',
                    mb: 1,
                  }}
                >
                  Revista semestral · ISSN 0000-0000
                </Typography>
                <Typography
                  sx={{
                    fontFamily: '"Playfair Display", serif',
                    fontSize: { xs: '1.6rem', md: '2rem' },
                    color: 'text.primary',
                    lineHeight: 1.15,
                    mb: 1,
                  }}
                >
                  {featured.journal}
                </Typography>
              </Box>
              <Box>
                <Typography
                  sx={{
                    fontFamily: '"Playfair Display", serif',
                    fontStyle: 'italic',
                    fontSize: { xs: '0.95rem', md: '1.05rem' },
                    color: 'text.primary',
                    lineHeight: 1.4,
                    mb: 2,
                  }}
                >
                  {featured.theme}
                </Typography>
                <Typography
                  sx={{
                    fontSize: '0.7rem',
                    color: 'secondary.main',
                    fontFamily: '"Inter", sans-serif',
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                  }}
                >
                  {featured.volume} · {featured.year}
                </Typography>
              </Box>
            </Box>

            {/* Journal content */}
            <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <Typography variant="body1" sx={{ color: 'text.secondary', fontSize: '0.88rem', lineHeight: 1.85, mb: 4 }}>
                {featured.description}
              </Typography>
              <Typography
                sx={{ fontSize: '0.65rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'text.secondary', mb: 2, fontFamily: '"Inter", sans-serif' }}
              >
                En este número
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5, mb: 5 }}>
                {featured.articles.map((a) => (
                  <Box key={a} sx={{ display: 'flex', gap: 2, alignItems: 'flex-start' }}>
                    <Box sx={{ width: 16, height: '1px', bgcolor: 'secondary.main', opacity: 0.5, mt: 1.2, flexShrink: 0 }} />
                    <Typography sx={{ fontSize: '0.82rem', color: 'text.primary', fontFamily: '"Inter", sans-serif', lineHeight: 1.5 }}>
                      {a}
                    </Typography>
                  </Box>
                ))}
              </Box>
              <Button
                variant="outlined"
                endIcon={<ArrowForwardIcon sx={{ fontSize: '13px !important' }} />}
                sx={{
                  alignSelf: 'flex-start',
                  color: 'secondary.main',
                  borderColor: 'secondary.main',
                  fontSize: '0.78rem',
                  letterSpacing: '0.08em',
                  px: 3,
                  '&:hover': { bgcolor: 'rgba(155,37,37,0.06)', borderColor: 'secondary.main' },
                }}
              >
                Leer número completo
              </Button>
            </Box>
          </Box>
        )}

        {/* Other tabs */}
        {currentTab !== 'Revista' && contentByTab[currentTab] && (
          <Box sx={{ display: 'flex', flexDirection: 'column', border: `1px solid ${theme.palette.divider}` }}>
            {contentByTab[currentTab].map((item, i) => (
              <Box
                key={item.title}
                tabIndex={0}
                role="article"
                sx={{
                  display: 'grid',
                  gridTemplateColumns: { xs: '1fr', md: '1fr auto' },
                  gap: { xs: 1, md: 4 },
                  alignItems: 'center',
                  p: { xs: 3, md: 4 },
                  borderBottom: i < contentByTab[currentTab].length - 1 ? `1px solid ${theme.palette.divider}` : 'none',
                  cursor: 'pointer',
                  '&:hover': { bgcolor: isDark ? 'rgba(255,255,255,0.025)' : 'rgba(0,0,0,0.02)' },
                  transition: 'background-color 0.2s',
                }}
              >
                <Box>
                  <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', mb: 1 }}>
                    <Chip label={item.type} size="small" sx={{ fontSize: '0.6rem', height: 18, bgcolor: 'transparent', border: `1px solid ${theme.palette.divider}`, borderRadius: 1, color: 'text.secondary' }} />
                    <Typography sx={{ fontSize: '0.68rem', color: 'text.secondary', fontFamily: '"Inter", sans-serif' }}>{item.date}</Typography>
                  </Box>
                  <Typography sx={{ fontFamily: '"Playfair Display", serif', fontSize: { xs: '0.95rem', md: '1.05rem' }, color: 'text.primary', lineHeight: 1.35, mb: 0.75 }}>
                    {item.title}
                  </Typography>
                  <Typography sx={{ fontSize: '0.78rem', color: 'text.secondary', fontFamily: '"Inter", sans-serif', fontStyle: 'italic' }}>
                    {item.author}
                  </Typography>
                </Box>
                <Box sx={{ display: { xs: 'none', md: 'flex' }, flexDirection: 'column', alignItems: 'flex-end', gap: 1 }}>
                  <Typography sx={{ fontSize: '0.72rem', color: 'text.secondary', fontFamily: '"Inter", sans-serif' }}>{item.length}</Typography>
                  <ArrowForwardIcon sx={{ fontSize: 14, color: 'text.secondary', opacity: 0.5 }} />
                </Box>
              </Box>
            ))}
          </Box>
        )}
      </Container>
    </Box>
  );
}
