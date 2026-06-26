import { useState, useContext } from 'react';
import {
  AppBar, Toolbar, Typography, Box, IconButton, Button,
  Drawer, List, ListItem, ListItemButton, ListItemText,
  useScrollTrigger, Tooltip,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import { useTheme } from '@mui/material/styles';
import { ColorModeContext } from '../../App';

const navLinks = [
  { label: 'Manifiesto', href: '#manifiesto' },
  { label: 'Oferta Académica', href: '#oferta' },
  { label: 'Seminarios', href: '#seminarios' },
  { label: 'Biblioteca', href: '#biblioteca' },
  { label: 'Publicaciones', href: '#publicaciones' },
  { label: 'Investigación', href: '#investigacion' },
  { label: 'Comunidad', href: '#comunidad' },
  { label: 'Clínica', href: '#clinica' },
];

function scrollTo(href) {
  const el = document.querySelector(href);
  if (el) el.scrollIntoView({ behavior: 'smooth' });
}

export default function Header() {
  const theme = useTheme();
  const { toggleColorMode, mode } = useContext(ColorModeContext);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const scrolled = useScrollTrigger({ disableHysteresis: true, threshold: 60 });

  const isDark = theme.palette.mode === 'dark';

  return (
    <>
      <AppBar
        position="fixed"
        sx={{
          bgcolor: scrolled
            ? isDark ? 'rgba(9,9,9,0.96)' : 'rgba(240,235,224,0.96)'
            : 'transparent',
          backdropFilter: scrolled ? 'blur(14px)' : 'none',
          borderBottom: scrolled ? `1px solid ${theme.palette.divider}` : 'none',
          transition: 'background-color 0.5s ease, border-bottom 0.5s ease, backdrop-filter 0.5s ease',
          boxShadow: 'none',
        }}
      >
        <Toolbar
          sx={{
            justifyContent: 'space-between',
            py: { xs: 1.5, md: 1.5 },
            px: { xs: 2.5, md: 5 },
            minHeight: { xs: 64, md: 72 },
          }}
        >
          {/* Logo */}
          <Box
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            sx={{ cursor: 'pointer', userSelect: 'none' }}
          >
            <Typography
              sx={{
                fontFamily: '"Playfair Display", serif',
                fontWeight: 500,
                fontSize: { xs: '0.88rem', md: '1rem' },
                color: 'text.primary',
                lineHeight: 1.25,
                letterSpacing: '0.02em',
              }}
            >
              Colegio Michel Foucault
            </Typography>
            <Typography
              sx={{
                fontFamily: '"Inter", sans-serif',
                fontSize: '0.58rem',
                letterSpacing: '0.22em',
                color: 'text.secondary',
                textTransform: 'uppercase',
                mt: 0.3,
              }}
            >
              Crítica · Política · Poética
            </Typography>
          </Box>

          {/* Desktop Nav */}
          <Box sx={{ display: { xs: 'none', lg: 'flex' }, gap: 0, alignItems: 'center' }}>
            {navLinks.map((link) => (
              <Button
                key={link.label}
                onClick={() => scrollTo(link.href)}
                sx={{
                  color: 'text.secondary',
                  fontSize: '0.76rem',
                  letterSpacing: '0.05em',
                  fontWeight: 400,
                  px: 1.5,
                  py: 0.75,
                  minWidth: 'auto',
                  '&:hover': {
                    color: 'text.primary',
                    bgcolor: 'action.hover',
                  },
                  transition: 'color 0.2s',
                }}
              >
                {link.label}
              </Button>
            ))}

            <Box sx={{ width: 1, height: 18, bgcolor: 'divider', mx: 1.5 }} />

            <Tooltip title={mode === 'dark' ? 'Modo claro' : 'Modo oscuro'}>
              <IconButton
                onClick={toggleColorMode}
                size="small"
                sx={{ color: 'text.secondary', '&:hover': { color: 'text.primary' } }}
                aria-label="toggle color mode"
              >
                {mode === 'dark'
                  ? <LightModeOutlinedIcon sx={{ fontSize: 18 }} />
                  : <DarkModeOutlinedIcon sx={{ fontSize: 18 }} />}
              </IconButton>
            </Tooltip>

            <Button
              variant="outlined"
              size="small"
              onClick={() => scrollTo('#oferta')}
              sx={{
                ml: 2,
                color: 'secondary.main',
                borderColor: 'secondary.main',
                borderWidth: '1px',
                fontSize: '0.73rem',
                letterSpacing: '0.1em',
                px: 2.5,
                py: 0.75,
                '&:hover': {
                  bgcolor: 'rgba(155,37,37,0.08)',
                  borderColor: 'secondary.main',
                },
              }}
            >
              Inscripciones
            </Button>
          </Box>

          {/* Mobile Controls */}
          <Box sx={{ display: { xs: 'flex', lg: 'none' }, alignItems: 'center', gap: 0.5 }}>
            <Tooltip title={mode === 'dark' ? 'Modo claro' : 'Modo oscuro'}>
              <IconButton
                onClick={toggleColorMode}
                size="small"
                sx={{ color: 'text.secondary' }}
                aria-label="toggle color mode"
              >
                {mode === 'dark'
                  ? <LightModeOutlinedIcon sx={{ fontSize: 18 }} />
                  : <DarkModeOutlinedIcon sx={{ fontSize: 18 }} />}
              </IconButton>
            </Tooltip>
            <IconButton
              onClick={() => setDrawerOpen(true)}
              sx={{ color: 'text.primary' }}
              aria-label="open navigation"
            >
              <MenuIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        PaperProps={{
          sx: {
            width: '82vw',
            maxWidth: 320,
            bgcolor: 'background.default',
            px: 3,
            py: 4,
            borderLeft: `1px solid ${theme.palette.divider}`,
          },
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 5 }}>
          <Typography
            sx={{
              fontSize: '0.65rem',
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: 'text.secondary',
              fontFamily: '"Inter", sans-serif',
            }}
          >
            Navegación
          </Typography>
          <IconButton onClick={() => setDrawerOpen(false)} size="small" sx={{ color: 'text.secondary' }}>
            <CloseIcon fontSize="small" />
          </IconButton>
        </Box>

        <List disablePadding>
          {navLinks.map((link) => (
            <ListItem key={link.label} disablePadding>
              <ListItemButton
                onClick={() => { setDrawerOpen(false); scrollTo(link.href); }}
                sx={{
                  py: 1.75,
                  px: 0,
                  borderBottom: `1px solid ${theme.palette.divider}`,
                  '&:hover': { bgcolor: 'transparent' },
                }}
              >
                <ListItemText
                  primary={link.label}
                  primaryTypographyProps={{
                    fontFamily: '"Playfair Display", serif',
                    fontSize: '1.15rem',
                    color: 'text.primary',
                    fontWeight: 400,
                  }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>

        <Button
          fullWidth
          variant="outlined"
          onClick={() => { setDrawerOpen(false); scrollTo('#oferta'); }}
          sx={{
            mt: 5,
            color: 'secondary.main',
            borderColor: 'secondary.main',
            py: 1.5,
            letterSpacing: '0.1em',
            fontSize: '0.8rem',
          }}
        >
          Inscripciones abiertas
        </Button>

        <Box sx={{ mt: 'auto', pt: 5 }}>
          <Typography
            sx={{
              fontSize: '0.62rem',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              color: 'text.secondary',
              fontFamily: '"Inter", sans-serif',
              lineHeight: 1.8,
            }}
          >
            Colegio Michel Foucault
            <br />
            Ciudad de México
          </Typography>
        </Box>
      </Drawer>
    </>
  );
}
