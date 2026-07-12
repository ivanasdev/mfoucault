import { useState, useEffect } from 'react';
import {
  Box, Container, Typography, TextField, InputAdornment,
  Chip, Button, Dialog, IconButton,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined';
import VideocamOutlinedIcon from '@mui/icons-material/VideocamOutlined';
import HeadphonesOutlinedIcon from '@mui/icons-material/HeadphonesOutlined';
import MenuBookOutlinedIcon from '@mui/icons-material/MenuBookOutlined';
import CloseIcon from '@mui/icons-material/Close';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import SectionLabel from '../ui/SectionLabel';
import { useInView } from '../../hooks/useInView';

const API = import.meta.env.VITE_API_URL ?? 'http://localhost:9696';

const disciplines = ['Todo', 'Psicoanálisis', 'Teoría Crítica', 'Criminología', 'Filosofía', 'Clínica'];

const iconoPorTipo = {
  Ensayo: 'article',
  Artículo: 'article',
  Conferencia: 'audio',
  Video: 'video',
  Libro: 'book',
};

const typeIcons = {
  article: <ArticleOutlinedIcon sx={{ fontSize: 15 }} />,
  audio: <HeadphonesOutlinedIcon sx={{ fontSize: 15 }} />,
  video: <VideocamOutlinedIcon sx={{ fontSize: 15 }} />,
  book: <MenuBookOutlinedIcon sx={{ fontSize: 15 }} />,
};

function tipoArchivo(url) {
  if (!url) return null;
  const ext = url.split('?')[0].split('.').pop()?.toLowerCase();
  if (['jpg', 'jpeg', 'png', 'webp', 'gif'].includes(ext)) return 'imagen';
  if (['mp4', 'webm', 'mov'].includes(ext)) return 'video';
  if (ext === 'pdf') return 'pdf';
  return 'externo';
}

function mapMaterial(m) {
  return {
    id: m.id,
    type: m.tipo,
    icon: iconoPorTipo[m.tipo] || 'article',
    title: m.titulo,
    author: m.autor,
    year: String(m.anio ?? ''),
    discipline: m.disciplina,
    pages: m.extension,
    url: m.url,
  };
}

export default function Library() {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';
  const [ref, inView] = useInView(0.06);
  const [activeDisc, setActiveDisc] = useState('Todo');
  const [query, setQuery] = useState('');
  const [materials, setMaterials] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [materialAbierto, setMaterialAbierto] = useState(null);

  useEffect(() => {
    let ignore = false;
    (async () => {
      try {
        const res = await fetch(`${API}/api/biblioteca/publicos`);
        const data = await res.json();
        if (!ignore && res.ok) {
          setMaterials((data.data ?? []).map(mapMaterial));
        }
      } catch {
        // Se deja la lista vacía si falla la conexión
      } finally {
        if (!ignore) setCargando(false);
      }
    })();
    return () => { ignore = true; };
  }, []);

  const filtered = materials.filter((m) => {
    const matchDisc = activeDisc === 'Todo' || m.discipline === activeDisc;
    const matchQuery = !query || m.title.toLowerCase().includes(query.toLowerCase())
      || m.author.toLowerCase().includes(query.toLowerCase());
    return matchDisc && matchQuery;
  });

  const stats = [
    { num: String(materials.length), label: 'Materiales' },
    { num: String(materials.filter(m => m.type === 'Conferencia').length), label: 'Conferencias' },
    { num: String(materials.filter(m => m.type === 'Video').length), label: 'Videos' },
    { num: String(new Set(materials.map(m => m.discipline)).size), label: 'Disciplinas' },
  ];

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
        {cargando ? (
          <Typography sx={{ color: 'text.secondary', fontSize: '0.85rem', py: 6, textAlign: 'center' }}>
            Cargando archivo...
          </Typography>
        ) : filtered.length === 0 ? (
          <Typography sx={{ color: 'text.secondary', fontSize: '0.85rem', py: 6, textAlign: 'center' }}>
            No hay materiales que coincidan con tu búsqueda.
          </Typography>
        ) : (
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', lg: '1fr 1fr 1fr' },
              border: `1px solid ${theme.palette.divider}`,
            }}
          >
            {filtered.map((item, i) => (
              <MaterialCard
                key={item.id ?? item.title}
                item={item}
                index={i}
                isDark={isDark}
                theme={theme}
                total={filtered.length}
                onAbrir={setMaterialAbierto}
              />
            ))}
          </Box>
        )}

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

      <MaterialViewerModal
        item={materialAbierto}
        onClose={() => setMaterialAbierto(null)}
        theme={theme}
      />
    </Box>
  );
}

function MaterialCard({ item, index, isDark, theme, total, onAbrir }) {
  const cols = 3;
  const isLastRow = index >= total - (total % cols || cols);
  const isLastCol = (index + 1) % cols === 0;

  return (
    <Box
      role="article"
      tabIndex={0}
      onClick={() => item.url && onAbrir(item)}
      sx={{
        p: { xs: 3, md: 3.5 },
        borderRight: !isLastCol ? `1px solid ${theme.palette.divider}` : 'none',
        borderBottom: !isLastRow ? `1px solid ${theme.palette.divider}` : 'none',
        cursor: item.url ? 'pointer' : 'default',
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

      {item.pages && (
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
      )}
    </Box>
  );
}

function MaterialViewerModal({ item, onClose, theme }) {
  const kind = item ? tipoArchivo(item.url) : null;

  return (
    <Dialog
      open={Boolean(item)}
      onClose={onClose}
      fullWidth
      maxWidth={kind === 'externo' ? 'xs' : 'lg'}
      PaperProps={{
        sx: {
          bgcolor: 'background.default',
          borderRadius: 0,
          border: `1px solid ${theme.palette.divider}`,
          overflow: 'hidden',
        },
      }}
    >
      {item && (
        <>
          {/* Header */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'flex-start',
              justifyContent: 'space-between',
              gap: 2,
              px: { xs: 3, md: 4 },
              pt: 3,
              pb: 2,
            }}
          >
            <Box sx={{ minWidth: 0 }}>
              <Typography
                sx={{
                  fontSize: '0.68rem',
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  color: 'secondary.main',
                  mb: 0.5,
                }}
              >
                {item.type}
              </Typography>
              <Typography
                sx={{
                  fontFamily: '"Playfair Display", serif',
                  fontSize: { xs: '1.1rem', md: '1.35rem' },
                  color: 'text.primary',
                  lineHeight: 1.25,
                }}
              >
                {item.title}
              </Typography>
            </Box>
            <IconButton
              onClick={onClose}
              sx={{
                color: 'text.secondary',
                flexShrink: 0,
                '&:hover': { color: 'secondary.main', bgcolor: 'transparent' },
              }}
            >
              <CloseIcon />
            </IconButton>
          </Box>

          {/* Media */}
          {kind === 'imagen' && (
            <Box
              sx={{
                bgcolor: '#0a0a0a',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: { xs: 260, md: 420 },
                maxHeight: '70vh',
              }}
            >
              <Box
                component="img"
                src={item.url}
                alt={item.title}
                sx={{ maxWidth: '100%', maxHeight: '70vh', objectFit: 'contain', display: 'block' }}
              />
            </Box>
          )}

          {kind === 'video' && (
            <Box sx={{ bgcolor: '#000' }}>
              <Box
                component="video"
                src={item.url}
                controls
                autoPlay
                sx={{ width: '100%', maxHeight: '70vh', display: 'block' }}
              />
            </Box>
          )}

          {kind === 'pdf' && (
            <Box sx={{ bgcolor: '#1a1a1a', height: { xs: '50vh', md: '70vh' } }}>
              <Box
                component="iframe"
                src={item.url}
                title={item.title}
                sx={{ width: '100%', height: '100%', border: 'none', display: 'block' }}
              />
            </Box>
          )}

          {kind === 'externo' && (
            <Box sx={{ px: { xs: 3, md: 4 }, py: 6, textAlign: 'center' }}>
              <Typography sx={{ color: 'text.secondary', fontSize: '0.9rem', mb: 3, lineHeight: 1.8 }}>
                Este material se aloja en un sitio externo.
              </Typography>
              <Button
                variant="outlined"
                endIcon={<OpenInNewIcon sx={{ fontSize: '15px !important' }} />}
                onClick={() => window.open(item.url, '_blank', 'noopener,noreferrer')}
                sx={{
                  color: 'secondary.main',
                  borderColor: 'secondary.main',
                  px: 4,
                  py: 1.2,
                  fontSize: '0.78rem',
                  letterSpacing: '0.08em',
                  '&:hover': { bgcolor: 'secondary.main', color: '#fff' },
                }}
              >
                Abrir enlace
              </Button>
            </Box>
          )}

          {/* Ficha técnica */}
          <Box
            sx={{
              px: { xs: 3, md: 4 },
              py: 2.2,
              borderTop: `1px solid ${theme.palette.divider}`,
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              gap: { xs: 1.2, md: 2 },
            }}
          >
            <Typography sx={{ fontSize: '0.82rem', color: 'text.primary', fontStyle: 'italic' }}>
              {item.author}
            </Typography>
            <Box sx={{ width: 3, height: 3, borderRadius: '50%', bgcolor: 'text.secondary', opacity: 0.5 }} />
            <Typography sx={{ fontSize: '0.78rem', color: 'text.secondary' }}>{item.year}</Typography>
            {item.pages && (
              <>
                <Box sx={{ width: 3, height: 3, borderRadius: '50%', bgcolor: 'text.secondary', opacity: 0.5 }} />
                <Typography sx={{ fontSize: '0.78rem', color: 'text.secondary' }}>{item.pages}</Typography>
              </>
            )}
            <Chip
              label={item.discipline}
              size="small"
              sx={{
                ml: 'auto',
                fontSize: '0.6rem',
                letterSpacing: '0.06em',
                bgcolor: 'transparent',
                border: `1px solid ${theme.palette.divider}`,
                color: 'text.secondary',
                borderRadius: 1,
              }}
            />
            {kind !== 'externo' && (
              <Button
                size="small"
                endIcon={<OpenInNewIcon sx={{ fontSize: '13px !important' }} />}
                onClick={() => window.open(item.url, '_blank', 'noopener,noreferrer')}
                sx={{
                  color: 'text.secondary',
                  fontSize: '0.7rem',
                  letterSpacing: '0.06em',
                  '&:hover': { color: 'secondary.main', bgcolor: 'transparent' },
                }}
              >
                Abrir en pestaña nueva
              </Button>
            )}
          </Box>
        </>
      )}
    </Dialog>
  );
}
