import { useState } from 'react';
import {
  Box, Container, Typography, TextField, InputAdornment,
  Chip, Button,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined';
import VideocamOutlinedIcon from '@mui/icons-material/VideocamOutlined';
import HeadphonesOutlinedIcon from '@mui/icons-material/HeadphonesOutlined';
import MenuBookOutlinedIcon from '@mui/icons-material/MenuBookOutlined';
import SectionLabel from '../ui/SectionLabel';
import { useInView } from '../../hooks/useInView';

const disciplines = ['Todo', 'Psicoanálisis', 'Teoría Crítica', 'Criminología', 'Filosofía', 'Clínica'];
const materialTypes = ['Artículos', 'Ensayos', 'Conferencias', 'Audiovisual'];

const materials = [
  {
    type: 'Ensayo',
    icon: 'article',
    title: 'El inconsciente como discurso del Otro: una lectura de Lacan',
    author: 'Elena Vásquez Reyes',
    year: '2024',
    discipline: 'Psicoanálisis',
    pages: '24 pp.',
  },
  {
    type: 'Conferencia',
    icon: 'audio',
    title: 'Biopolítica y gubernamentalidad: Foucault en el siglo XXI',
    author: 'Rodrigo Montemayor',
    year: '2024',
    discipline: 'Teoría Crítica',
    pages: '68 min.',
  },
  {
    type: 'Artículo',
    icon: 'article',
    title: 'La criminología crítica latinoamericana: balance y perspectivas',
    author: 'Andrés Vallecillo',
    year: '2023',
    discipline: 'Criminología',
    pages: '18 pp.',
  },
  {
    type: 'Ensayo',
    icon: 'article',
    title: 'Goce y lazo social: clínica de la época',
    author: 'Sofía Cienfuegos',
    year: '2024',
    discipline: 'Psicoanálisis',
    pages: '31 pp.',
  },
  {
    type: 'Video',
    icon: 'video',
    title: 'Jornada: Psicoanálisis y feminismo. Mesa redonda completa',
    author: 'Varios autores',
    year: '2023',
    discipline: 'Clínica',
    pages: '2 h 15 min.',
  },
  {
    type: 'Artículo',
    icon: 'article',
    title: 'Dialéctica de la Ilustración: notas para una relectura crítica',
    author: 'Luis Ibáñez Torres',
    year: '2024',
    discipline: 'Filosofía',
    pages: '14 pp.',
  },
  {
    type: 'Libro',
    icon: 'book',
    title: 'Subjetividad, poder y resistencia: ensayos desde el Sur',
    author: 'AA. VV.',
    year: '2024',
    discipline: 'Teoría Crítica',
    pages: '312 pp.',
  },
  {
    type: 'Conferencia',
    icon: 'audio',
    title: 'La psicosis ordinaria: introducción a la clínica de lo no-todo',
    author: 'Sofía Cienfuegos',
    year: '2023',
    discipline: 'Clínica',
    pages: '52 min.',
  },
  {
    type: 'Artículo',
    icon: 'article',
    title: 'El nombre del padre y sus suplencias en la clínica contemporánea',
    author: 'Elena Vásquez Reyes',
    year: '2022',
    discipline: 'Psicoanálisis',
    pages: '22 pp.',
  },
];

const stats = [
  { num: '1,200+', label: 'Textos' },
  { num: '340+', label: 'Conferencias' },
  { num: '85+', label: 'Videos' },
  { num: '28', label: 'Disciplinas' },
];

const typeIcons = {
  article: <ArticleOutlinedIcon sx={{ fontSize: 15 }} />,
  audio: <HeadphonesOutlinedIcon sx={{ fontSize: 15 }} />,
  video: <VideocamOutlinedIcon sx={{ fontSize: 15 }} />,
  book: <MenuBookOutlinedIcon sx={{ fontSize: 15 }} />,
};

export default function Library() {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';
  const [ref, inView] = useInView(0.06);
  const [activeDisc, setActiveDisc] = useState('Todo');
  const [query, setQuery] = useState('');

  const filtered = materials.filter((m) => {
    const matchDisc = activeDisc === 'Todo' || m.discipline === activeDisc;
    const matchQuery = !query || m.title.toLowerCase().includes(query.toLowerCase())
      || m.author.toLowerCase().includes(query.toLowerCase());
    return matchDisc && matchQuery;
  });

  return (
    <Box
      id="biblioteca"
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
        {/* Header */}
        <Box sx={{ mb: { xs: 8, md: 10 } }}>
          <SectionLabel>04 — Biblioteca y Archivo</SectionLabel>
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
              gap: 4,
              alignItems: 'end',
              mb: 6,
            }}
          >
            <Typography
              variant="h2"
              sx={{
                fontSize: { xs: '1.9rem', md: '2.8rem' },
                color: 'text.primary',
                lineHeight: 1.15,
              }}
            >
              Archivo vivo del pensamiento crítico
            </Typography>
            <Box
              sx={{
                display: 'flex',
                gap: { xs: 3, md: 5 },
                justifyContent: { xs: 'flex-start', md: 'flex-end' },
                pb: 0.5,
              }}
            >
              {stats.map((s) => (
                <Box key={s.label} sx={{ textAlign: 'center' }}>
                  <Typography
                    sx={{
                      fontFamily: '"Playfair Display", serif',
                      fontSize: { xs: '1.5rem', md: '1.8rem' },
                      color: 'text.primary',
                      lineHeight: 1,
                      mb: 0.5,
                    }}
                  >
                    {s.num}
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: '0.62rem',
                      letterSpacing: '0.15em',
                      textTransform: 'uppercase',
                      color: 'text.secondary',
                      fontFamily: '"Inter", sans-serif',
                    }}
                  >
                    {s.label}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Box>

          {/* Search */}
          <TextField
            fullWidth
            placeholder="Buscar por título, autor, concepto, disciplina..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ color: 'text.secondary', fontSize: 20 }} />
                </InputAdornment>
              ),
            }}
            sx={{
              mb: 3,
              '& .MuiOutlinedInput-root': {
                bgcolor: isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.025)',
                fontSize: '0.9rem',
                '& fieldset': { borderColor: theme.palette.divider },
                '&:hover fieldset': { borderColor: 'text.secondary' },
                '&.Mui-focused fieldset': { borderColor: 'secondary.main', borderWidth: 1 },
              },
              '& input': { py: 1.5 },
            }}
          />

          {/* Discipline filters */}
          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
            {disciplines.map((d) => (
              <Chip
                key={d}
                label={d}
                onClick={() => setActiveDisc(d)}
                variant={activeDisc === d ? 'filled' : 'outlined'}
                size="small"
                sx={{
                  fontSize: '0.72rem',
                  letterSpacing: '0.05em',
                  cursor: 'pointer',
                  bgcolor: activeDisc === d ? 'secondary.main' : 'transparent',
                  color: activeDisc === d ? 'rgba(228,218,200,0.95)' : 'text.secondary',
                  borderColor: activeDisc === d ? 'secondary.main' : theme.palette.divider,
                  '&:hover': {
                    bgcolor: activeDisc === d ? 'secondary.dark' : 'action.hover',
                    borderColor: activeDisc === d ? 'secondary.dark' : 'text.secondary',
                  },
                }}
              />
            ))}
          </Box>
        </Box>

        {/* Results */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', lg: '1fr 1fr 1fr' },
            border: `1px solid ${theme.palette.divider}`,
          }}
        >
          {filtered.map((item, i) => (
            <MaterialCard key={item.title} item={item} index={i} isDark={isDark} theme={theme} total={filtered.length} />
          ))}
        </Box>

        <Box sx={{ mt: 5, display: 'flex', justifyContent: 'center' }}>
          <Button
            endIcon={<ArrowForwardIcon sx={{ fontSize: '14px !important' }} />}
            sx={{
              color: 'secondary.main',
              fontSize: '0.8rem',
              letterSpacing: '0.1em',
              '&:hover': { bgcolor: 'transparent', textDecoration: 'underline' },
            }}
          >
            Acceder al archivo completo
          </Button>
        </Box>
      </Container>
    </Box>
  );
}

function MaterialCard({ item, index, isDark, theme, total }) {
  const cols = 3;
  const isLastRow = index >= total - (total % cols || cols);
  const isLastCol = (index + 1) % cols === 0;

  return (
    <Box
      role="article"
      tabIndex={0}
      sx={{
        p: { xs: 3, md: 3.5 },
        borderRight: !isLastCol ? `1px solid ${theme.palette.divider}` : 'none',
        borderBottom: !isLastRow ? `1px solid ${theme.palette.divider}` : 'none',
        cursor: 'pointer',
        transition: 'background-color 0.25s',
        '&:hover': {
          bgcolor: isDark ? 'rgba(255,255,255,0.025)' : 'rgba(0,0,0,0.02)',
        },
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, color: 'secondary.main', opacity: 0.7 }}>
          {typeIcons[item.icon]}
          <Typography
            sx={{
              fontSize: '0.63rem',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: 'text.secondary',
              fontFamily: '"Inter", sans-serif',
            }}
          >
            {item.type}
          </Typography>
        </Box>
        <Typography
          sx={{
            fontSize: '0.65rem',
            color: 'text.secondary',
            fontFamily: '"Inter", sans-serif',
            letterSpacing: '0.05em',
          }}
        >
          {item.year}
        </Typography>
      </Box>

      <Typography
        sx={{
          fontFamily: '"Playfair Display", serif',
          fontSize: { xs: '0.9rem', md: '0.95rem' },
          color: 'text.primary',
          lineHeight: 1.4,
          mb: 1.5,
          display: '-webkit-box',
          WebkitLineClamp: 3,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
        }}
      >
        {item.title}
      </Typography>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography
          sx={{
            fontSize: '0.75rem',
            color: 'text.secondary',
            fontFamily: '"Inter", sans-serif',
            fontStyle: 'italic',
          }}
        >
          {item.author}
        </Typography>
        <Chip
          label={item.discipline}
          size="small"
          sx={{
            fontSize: '0.58rem',
            height: 18,
            letterSpacing: '0.06em',
            bgcolor: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.05)',
            color: 'text.secondary',
            borderRadius: 1,
          }}
        />
      </Box>

      <Typography
        sx={{
          fontSize: '0.68rem',
          color: isDark ? 'rgba(155,37,37,0.5)' : 'rgba(139,26,26,0.5)',
          fontFamily: '"Inter", sans-serif',
          mt: 1,
        }}
      >
        {item.pages}
      </Typography>
    </Box>
  );
}
