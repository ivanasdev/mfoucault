import { useState } from 'react';
import { Box, Container, Typography, Tabs, Tab, Button, IconButton, Dialog } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import HeadphonesOutlinedIcon from '@mui/icons-material/HeadphonesOutlined';
import VideocamOutlinedIcon from '@mui/icons-material/VideocamOutlined';
import MicNoneOutlinedIcon from '@mui/icons-material/MicNoneOutlined';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CloseIcon from '@mui/icons-material/Close';
import SectionLabel from '../ui/SectionLabel';
import { useInView } from '../../hooks/useInView';
import video1 from '../../assets/video/vid01.mp4';
import video2 from '../../assets/video/vid02.mp4';
const tabs = ['Podcast', 'Conferencias', 'Videos'];

const podcast = [
  {
    episode: 'Ep. 14',
    title: 'El sujeto del inconsciente y la política: ¿qué puede el psicoanálisis?',
    guest: 'Elena Vásquez Reyes',
    duration: '1h 12min',
    date: 'Jun 2026',
    description: 'Conversación sobre las posibilidades y los límites del psicoanálisis como práctica política y su relación con el sujeto colectivo.',
  },
  {
    episode: 'Ep. 13',
    title: 'Abolicionismo penal: historia, crítica y utopía',
    guest: 'Rodrigo Montemayor',
    duration: '58 min',
    date: 'May 2026',
    description: 'Recorrido histórico por el pensamiento abolicionista, sus fundamentos teóricos y sus posibilidades en el contexto latinoamericano.',
  },
  {
    episode: 'Ep. 12',
    title: 'La psicosis en la era de Instagram: clínica de la imagen',
    guest: 'Sofía Cienfuegos',
    duration: '1h 04min',
    date: 'Abr 2026',
    description: 'Reflexión clínica sobre los efectos del régimen contemporáneo de la imagen sobre la constitución del sujeto y la psicosis.',
  },
  {
    episode: 'Ep. 11',
    title: 'Adorno hoy: sobre la industria cultural y la barbarie',
    guest: 'Luis Ibáñez Torres',
    duration: '1h 18min',
    date: 'Mar 2026',
    description: 'Lectura contemporánea de la crítica adorniana a la cultura de masas, las industrias del entretenimiento y la regresión del pensamiento.',
  },
  {
    episode: 'Ep. 10',
    title: 'Feminismo y psicoanálisis: tensiones y encuentros',
    guest: 'Carmen Delgado',
    duration: '1h 06min',
    date: 'Feb 2026',
    description: 'Exploración de los puntos de convergencia y tensión entre el pensamiento feminista contemporáneo y la clínica psicoanalítica.',
  },
];

const conferences = [
  {
    title: 'El poder pastoral y sus transformaciones: de la Iglesia al Estado de bienestar',
    speaker: 'Dr. Rodrigo Montemayor',
    event: 'Coloquio Foucault, 2025',
    duration: '78 min',
    date: 'Nov 2025',
  },
  {
    title: 'Transferencia y deseo del analista: problemas de la formación analítica',
    speaker: 'Dra. Elena Vásquez Reyes',
    event: 'Jornadas de psicoanálisis, 2025',
    duration: '62 min',
    date: 'Oct 2025',
  },
  {
    title: 'La crítica inmanente: método y política en Adorno',
    speaker: 'Dr. Luis Ibáñez Torres',
    event: 'Congreso de Filosofía, 2025',
    duration: '55 min',
    date: 'Sep 2025',
  },
  {
    title: 'Criminología, género y racismo: claves para una mirada interseccional',
    speaker: 'Mtra. Carmen Delgado',
    event: 'Foro de Criminología Crítica, 2025',
    duration: '70 min',
    date: 'Ago 2025',
  },
];

const videos = [
  {
    title: 'Seminario de apertura 2026',
    type: 'Seminario',
    duration: '2h 15min',
    date: 'Feb 2026',
    src: video1,
  },
  {
    title: 'Mesa redonda',
    type: 'Jornada',
    duration: '3h 40min',
    date: 'Nov 2025',
    src: video2,
  },
  {
    title: 'Clase magistral',
    type: 'Docencia',
    duration: '1h 45min',
    date: 'Mar 2026',
    src: video1,
  },
  {
    title: 'Conversatorio',
    type: 'Conversatorio',
    duration: '1h 28min',
    date: 'Abr 2026',
    src: video2,
  },
];

export default function Multimedia() {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';
  const [ref, inView] = useInView(0.06);
  const [tab, setTab] = useState(0);
  const currentTab = tabs[tab];
  const [activeVideo, setActiveVideo] = useState(null);

  return (
    <Box
      id="multimedia"
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
        <SectionLabel> Podcast y Multimedia</SectionLabel>
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
            El pensamiento en voz y en imagen
          </Typography>
          <Typography
            sx={{ fontSize: '0.85rem', color: 'text.secondary', fontFamily: '"Inter", sans-serif', maxWidth: 280, lineHeight: 1.75 }}
          >
            Conferencias grabadas, entrevistas en profundidad y documentos audiovisuales del Colegio.
          </Typography>
        </Box>

        {/* Podcast header card */}
        {currentTab === 'Podcast' && (
          <Box
            sx={{
              p: { xs: 3.5, md: 5 },
              mb: 6,
              bgcolor: isDark ? 'rgba(155,37,37,0.06)' : 'rgba(139,26,26,0.04)',
              border: `1px solid ${isDark ? 'rgba(155,37,37,0.18)' : 'rgba(139,26,26,0.14)'}`,
              display: 'flex',
              gap: 3,
              alignItems: 'center',
            }}
          >
            <Box
              sx={{
                width: { xs: 48, md: 64 },
                height: { xs: 48, md: 64 },
                borderRadius: '50%',
                bgcolor: isDark ? 'rgba(155,37,37,0.15)' : 'rgba(139,26,26,0.1)',
                border: `1px solid ${isDark ? 'rgba(155,37,37,0.3)' : 'rgba(139,26,26,0.25)'}`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                color: 'secondary.main',
              }}
            >
              <MicNoneOutlinedIcon sx={{ fontSize: { xs: 22, md: 28 } }} />
            </Box>
            <Box>
              <Typography
                sx={{
                  fontFamily: '"Playfair Display", serif',
                  fontStyle: 'italic',
                  fontSize: { xs: '1.05rem', md: '1.25rem' },
                  color: 'text.primary',
                  mb: 0.5,
                }}
              >
                El inconsciente político
              </Typography>
              <Typography sx={{ fontSize: '0.75rem', color: 'text.secondary', fontFamily: '"Inter", sans-serif' }}>
                Podcast del Colegio Michel Foucault · 14 episodios · Disponible en Spotify, Apple Podcasts
              </Typography>
            </Box>
          </Box>
        )}

        {/* Tabs */}
        <Tabs
          value={tab}
          onChange={(_, v) => setTab(v)}
          sx={{
            mb: { xs: 5, md: 6 },
            borderBottom: `1px solid ${theme.palette.divider}`,
            '& .MuiTab-root': {
              color: 'text.secondary',
              fontSize: '0.82rem',
              letterSpacing: '0.07em',
              pb: 2,
              minWidth: 'auto',
              px: { xs: 1.5, md: 2.5 },
              display: 'flex',
              gap: 1,
            },
            '& .Mui-selected': { color: 'text.primary' },
            '& .MuiTabs-indicator': { bgcolor: 'secondary.main', height: 1 },
          }}
        >
          <Tab label="Podcast" icon={<MicNoneOutlinedIcon sx={{ fontSize: 15 }} />} iconPosition="start" disableRipple />
          <Tab label="Conferencias" icon={<HeadphonesOutlinedIcon sx={{ fontSize: 15 }} />} iconPosition="start" disableRipple />
          <Tab label="Videos" icon={<VideocamOutlinedIcon sx={{ fontSize: 15, bgcolor: 'secondary.main', }} />} iconPosition="start" disableRipple />
        </Tabs>

        {/* Podcast episodes */}
        {currentTab === 'Podcast' && (
          <Box sx={{ display: 'flex', flexDirection: 'column', border: `1px solid ${theme.palette.divider}` }}>
            {podcast.map((ep, i) => (
              <Box
                key={ep.episode}
                tabIndex={0}
                role="article"
                sx={{
                  display: 'grid',
                  gridTemplateColumns: { xs: '1fr', md: 'auto 1fr auto' },
                  gap: { xs: 2, md: 4 },
                  alignItems: 'center',
                  p: { xs: 3, md: 3.5 },
                  borderBottom: i < podcast.length - 1 ? `1px solid ${theme.palette.divider}` : 'none',
                  cursor: 'pointer',
                  transition: 'background-color 0.2s',
                  '&:hover': { bgcolor: isDark ? 'rgba(255,255,255,0.025)' : 'rgba(0,0,0,0.02)' },
                  '&:hover .play-btn': { color: 'secondary.main', borderColor: 'secondary.main' },
                }}
              >
                <Box
                  className="play-btn"
                  sx={{
                    width: 40,
                    height: 40,
                    borderRadius: '50%',
                    border: `1px solid ${theme.palette.divider}`,
                    display: { xs: 'none', md: 'flex' },
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'text.secondary',
                    transition: 'all 0.2s',
                    flexShrink: 0,
                  }}
                >
                  <PlayArrowIcon sx={{ fontSize: 18, ml: 0.3 }} />
                </Box>
                <Box>
                  <Box sx={{ display: 'flex', gap: 2, mb: 0.75, alignItems: 'center' }}>
                    <Typography sx={{ fontSize: '0.65rem', color: 'secondary.main', fontFamily: '"Inter", sans-serif', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                      {ep.episode}
                    </Typography>
                    <Typography sx={{ fontSize: '0.65rem', color: 'text.secondary', fontFamily: '"Inter", sans-serif' }}>
                      {ep.date}
                    </Typography>
                  </Box>
                  <Typography sx={{ fontFamily: '"Playfair Display", serif', fontSize: { xs: '0.95rem', md: '1.05rem' }, color: 'text.primary', lineHeight: 1.3, mb: 0.75 }}>
                    {ep.title}
                  </Typography>
                  <Typography sx={{ fontSize: '0.78rem', color: 'text.secondary', fontFamily: '"Inter", sans-serif', fontStyle: 'italic', display: { xs: 'none', sm: 'block' } }}>
                    Con {ep.guest}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75, color: 'text.secondary', flexShrink: 0 }}>
                  <AccessTimeIcon sx={{ fontSize: 13 }} />
                  <Typography sx={{ fontSize: '0.73rem', fontFamily: '"Inter", sans-serif' }}>
                    {ep.duration}
                  </Typography>
                </Box>
              </Box>
            ))}
          </Box>
        )}

        {/* Conferences */}
        {currentTab === 'Conferencias' && (
          <Box sx={{ display: 'flex', flexDirection: 'column', border: `1px solid ${theme.palette.divider}` }}>
            {conferences.map((conf, i) => (
              <Box
                key={conf.title}
                tabIndex={0}
                role="article"
                sx={{
                  display: 'grid',
                  gridTemplateColumns: { xs: '1fr', md: 'auto 1fr' },
                  gap: { xs: 2, md: 4 },
                  alignItems: 'center',
                  p: { xs: 3, md: 3.5 },
                  borderBottom: i < conferences.length - 1 ? `1px solid ${theme.palette.divider}` : 'none',
                  cursor: 'pointer',
                  transition: 'background-color 0.2s',
                  '&:hover': { bgcolor: isDark ? 'rgba(255,255,255,0.025)' : 'rgba(0,0,0,0.02)' },
                  '&:hover .play-btn': { color: 'secondary.main', borderColor: 'secondary.main' },
                }}
              >
                <Box
                  className="play-btn"
                  sx={{
                    width: 40,
                    height: 40,
                    borderRadius: '50%',
                    border: `1px solid ${theme.palette.divider}`,
                    display: { xs: 'none', md: 'flex' },
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'text.secondary',
                    transition: 'all 0.2s',
                    flexShrink: 0,
                  }}
                >
                  <PlayArrowIcon sx={{ fontSize: 18, ml: 0.3 }} />
                </Box>
                <Box>
                  <Box sx={{ display: 'flex', gap: 2, mb: 0.75, alignItems: 'center', flexWrap: 'wrap' }}>
                    <Typography sx={{ fontSize: '0.65rem', color: 'text.secondary', fontFamily: '"Inter", sans-serif', letterSpacing: '0.05em' }}>
                      {conf.event}
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, color: 'text.secondary' }}>
                      <AccessTimeIcon sx={{ fontSize: 11 }} />
                      <Typography sx={{ fontSize: '0.65rem', fontFamily: '"Inter", sans-serif' }}>{conf.duration}</Typography>
                    </Box>
                  </Box>
                  <Typography sx={{ fontFamily: '"Playfair Display", serif', fontSize: { xs: '0.95rem', md: '1.05rem' }, color: 'text.primary', lineHeight: 1.3, mb: 0.5 }}>
                    {conf.title}
                  </Typography>
                  <Typography sx={{ fontSize: '0.78rem', color: 'text.secondary', fontFamily: '"Inter", sans-serif', fontStyle: 'italic' }}>
                    {conf.speaker}
                  </Typography>
                </Box>
              </Box>
            ))}
          </Box>
        )}

        {/* Videos grid */}
        {currentTab === 'Videos' && (
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' },
              gap: 0,
              border: `1px solid ${theme.palette.divider}`,
            }}
          >
            {videos.map((video, i) => (
              <Box
                key={video.title}
                tabIndex={0}
                role="article"
                onClick={() => setActiveVideo(video)}
                sx={{
                  borderRight: i % 2 === 0 ? `1px solid ${theme.palette.divider}` : 'none',
                  borderBottom: i < 2 ? `1px solid ${theme.palette.divider}` : 'none',
                  cursor: 'pointer',
                  overflow: 'hidden',
                  '&:hover .video-overlay': { opacity: 1 },
                }}
              >
                {/* Video thumbnail placeholder */}
<Box
  sx={{
    height: 220,
    position: 'relative',
    overflow: 'hidden',
    bgcolor: '#040404',
  }}
>
<video
    src={video.src}
    autoPlay
    muted
    loop
    playsInline
    style={{
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      display: 'block',
    }}
/>
  <Box
    className="video-overlay"
    sx={{
      position: 'absolute',
      inset: 0,
      bgcolor: 'rgba(161, 0, 0, 0.17)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      opacity: 0,
      transition: 'opacity .3s',
    }}
  >
    <Box
      sx={{
        width: 56,
        height: 56,
        borderRadius: '50%',
        bgcolor: 'rgba(155,37,37,.9)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <PlayArrowIcon
        sx={{
          color: '#fff',
          fontSize: 28,
          ml: 0.4,
        }}
      />
    </Box>
  </Box>
</Box>
                <Box sx={{ p: { xs: 2.5, md: 3 } }}>
                  <Box sx={{ display: 'flex', gap: 2, mb: 1, alignItems: 'center' }}>
                    <Typography sx={{ fontSize: '0.62rem', letterSpacing: '0.1em', color: 'secondary.main', opacity: 0.7, fontFamily: '"Inter", sans-serif', textTransform: 'uppercase' }}>
                      {video.type}
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, color: 'text.secondary' }}>
                      <AccessTimeIcon sx={{ fontSize: 11 }} />
                      <Typography sx={{ fontSize: '0.65rem', fontFamily: '"Inter", sans-serif' }}>{video.duration}</Typography>
                    </Box>
                  </Box>
                  <Typography sx={{ fontFamily: '"Playfair Display", serif', fontSize: '0.92rem', color: 'text.primary', lineHeight: 1.35 }}>
                    {video.title}
                  </Typography>
                </Box>
              </Box>
            ))}
          </Box>
        )}

        <Box sx={{ mt: 5, display: 'flex', justifyContent: 'center' }}>
          <Button
            endIcon={<ArrowForwardIcon sx={{ fontSize: '14px !important' }} />}
            sx={{ color: 'secondary.main', fontSize: '0.8rem', letterSpacing: '0.1em', '&:hover': { bgcolor: 'transparent', textDecoration: 'underline' } }}
          >
            Ver todo el archivo audiovisual
          </Button>
        </Box>

        <Dialog
          open={!!activeVideo}
          onClose={() => setActiveVideo(null)}
          maxWidth="md"
          fullWidth
          PaperProps={{
            sx: {
              bgcolor: '#000',
              borderRadius: 0,
              overflow: 'hidden',
            },
          }}
        >
          <IconButton
            onClick={() => setActiveVideo(null)}
            sx={{
              position: 'absolute',
              top: 8,
              right: 8,
              color: '#fff',
              zIndex: 1,
              bgcolor: 'rgba(0,0,0,0.4)',
              '&:hover': { bgcolor: 'rgba(0,0,0,0.6)' },
            }}
          >
            <CloseIcon />
          </IconButton>
          {activeVideo && (
            <video
              key={activeVideo.title}
              src={activeVideo.src}
              controls
              autoPlay
              style={{
                width: '100%',
                maxHeight: '80vh',
                display: 'block',
                backgroundColor: '#000',
              }}
            />
          )}
        </Dialog>
      </Container>
    </Box>
  );
}
