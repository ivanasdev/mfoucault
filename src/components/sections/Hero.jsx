import { Box, Container, Typography, Button } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

function scrollTo(href) {
  const el = document.querySelector(href);
  if (el) el.scrollIntoView({ behavior: 'smooth' });
}

export default function Hero() {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';

  return (
    <Box
      id="hero"
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden',
        bgcolor: isDark ? '#090909' : '#eee8dc',
        backgroundImage: isDark
          ? `
            radial-gradient(ellipse 80% 50% at 50% 40%, rgba(155,37,37,0.04) 0%, transparent 65%),
            radial-gradient(ellipse 60% 40% at 20% 80%, rgba(30,50,80,0.04) 0%, transparent 60%)
          `
          : `
            radial-gradient(ellipse 80% 50% at 50% 40%, rgba(139,26,26,0.05) 0%, transparent 65%)
          `,
        '&::before': {
          content: '""',
          position: 'absolute',
          inset: 0,
          backgroundImage: isDark
            ? 'radial-gradient(circle, rgba(255,255,255,0.018) 1px, transparent 1px)'
            : 'radial-gradient(circle, rgba(0,0,0,0.025) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
          pointerEvents: 'none',
        },
      }}
    >
      {/* Top accent line */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '2px',
          background: 'linear-gradient(to right, transparent, rgba(155,37,37,0.5), transparent)',
        }}
      />

      <Container maxWidth="md" sx={{ px: { xs: 3, md: 4 }, position: 'relative', zIndex: 1 }}>
        <Box
          sx={{
            textAlign: 'center',
            animation: 'fadeInUp 1s ease both',
          }}
        >
          {/* Est label */}
          <Typography
            sx={{
              fontSize: '0.65rem',
              letterSpacing: '0.28em',
              textTransform: 'uppercase',
              color: isDark ? 'rgba(221,200,180,0.4)' : 'rgba(90,80,64,0.5)',
              mb: 5,
              fontFamily: '"Inter", sans-serif',
              animation: 'fadeIn 1.2s ease 0.2s both',
            }}
          >
            Est. 2026 · CDMX · México
          </Typography>

          {/* Main title */}
          <Typography
            variant="h1"
            sx={{
              fontSize: { xs: '2.4rem', sm: '3.4rem', md: '4.6rem', lg: '5.4rem' },
              color: isDark ? 'rgba(228,218,200,0.95)' : 'rgba(20,16,10,0.92)',
              lineHeight: { xs: 1.1, md: 1.05 },
              mb: 0,
              fontWeight: 400,
              animation: 'fadeInUp 1s ease 0.15s both',
            }}
          >
            Proyecto

          </Typography>
          <Typography
            variant="h1"
            sx={{
              fontSize: { xs: '2.4rem', sm: '3.4rem', md: '4.6rem', lg: '5.4rem' },
              color: isDark ? 'rgba(228,218,200,0.95)' : 'rgba(20,16,10,0.92)',
              lineHeight: { xs: 1.1, md: 1.05 },
              mb: 3,
              fontWeight: 400,
              fontStyle: 'italic',
              animation: 'fadeInUp 1s ease 0.25s both',
            }}
          >
            Michel Foucault
          </Typography>

          {/* Divider */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 3,
              mb: 3,
              animation: 'fadeIn 1s ease 0.4s both',
            }}
          >
            <Box sx={{ height: '1px', width: { xs: 40, md: 80 }, bgcolor: isDark ? 'rgba(155,37,37,0.4)' : 'rgba(139,26,26,0.35)' }} />
            <Box sx={{ width: 4, height: 4, borderRadius: '50%', bgcolor: 'secondary.main', opacity: 0.6 }} />
            <Box sx={{ height: '1px', width: { xs: 40, md: 80 }, bgcolor: isDark ? 'rgba(155,37,37,0.4)' : 'rgba(139,26,26,0.35)' }} />
          </Box>

          {/* Subtitle */}
          <Typography
            sx={{
              fontSize: { xs: '0.72rem', md: '0.8rem' },
              letterSpacing: '0.35em',
              textTransform: 'uppercase',
              color: isDark ? 'rgba(165, 50, 46, 0.6)' : 'rgba(43, 41, 38, 0.65)',
              mb: 8,
              fontFamily: '"Inter", sans-serif',
              animation: 'fadeIn 1s ease 0.45s both',
            }}
          >
            Crítica &nbsp;·&nbsp; Política &nbsp;·&nbsp; Poética
          </Typography>

          {/* Quote */}
          <Box
            sx={{
              mb: 8,
              px: { xs: 0, md: 4 },
              animation: 'fadeInUp 1s ease 0.55s both',
            }}
          >
            <Typography
              sx={{
                fontFamily: '"Playfair Display", serif',
                fontStyle: 'italic',
                fontSize: { xs: '1.05rem', md: '1.25rem' },
                color: isDark ? 'rgba(200,188,170,0.7)' : 'rgba(50,40,28,0.62)',
                lineHeight: 1.65,
                mb: 2,
              }}
            >
              "La crítica consiste en desenterrar al sujeto de los saberes que lo gobiernan
              sin que lo sepa, y en develar las relaciones de poder que lo atraviesan."
            </Typography>
            <Typography
              sx={{
                fontSize: '0.68rem',
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color: isDark ? 'rgba(155,37,37,0.7)' : 'rgba(139,26,26,0.65)',
                fontFamily: '"Inter", sans-serif',
              }}
            >
              — Michel Foucault
            </Typography>
          </Box>

          {/* Buttons */}
          <Box
            sx={{
              display: 'flex',
              gap: { xs: 2, md: 3 },
              justifyContent: 'center',
              flexWrap: 'wrap',
              animation: 'fadeInUp 1s ease 0.7s both',
            }}
          >
            <Button
              variant="outlined"
              size="large"
              onClick={() => scrollTo('#seminarios')}
              endIcon={<ArrowForwardIcon sx={{ fontSize: '14px !important' }} />}
              sx={{
                color: isDark ? 'rgba(221,211,191,0.85)' : 'rgba(26,21,16,0.8)',
                borderColor: isDark ? 'rgba(221,211,191,0.25)' : 'rgba(26,21,16,0.25)',
                px: { xs: 3.5, md: 4.5 },
                py: 1.4,
                fontSize: '0.8rem',
                letterSpacing: '0.1em',
                '&:hover': {
                  borderColor: isDark ? 'rgba(221,211,191,0.55)' : 'rgba(26,21,16,0.5)',
                  bgcolor: isDark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.04)',
                },
                transition: 'all 0.3s ease',
              }}
            >
              Explorar seminarios
            </Button>
            <Button
              variant="contained"
              size="large"
              onClick={() => scrollTo('#manifiesto')}
              sx={{
                bgcolor: 'secondary.main',
                color: 'rgba(228,218,200,0.95)',
                px: { xs: 3.5, md: 4.5 },
                py: 1.4,
                fontSize: '0.8rem',
                letterSpacing: '0.1em',
                boxShadow: 'none',
                '&:hover': {
                  bgcolor: 'secondary.dark',
                  boxShadow: 'none',
                },
                transition: 'background-color 0.3s ease',
              }}
            >
              Conocer el proyecto
            </Button>
          </Box>
        </Box>
      </Container>

      {/* Scroll indicator */}
      <Box
        sx={{
          position: 'absolute',
          bottom: 36,
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 1,
          cursor: 'pointer',
          opacity: 0.4,
          transition: 'opacity 0.2s',
          '&:hover': { opacity: 0.7 },
          animation: 'fadeIn 1s ease 1.2s both',
        }}
        onClick={() => scrollTo('#manifiesto')}
      >
        <Box
          sx={{
            width: '1px',
            height: 28,
            bgcolor: isDark ? 'rgba(221,211,191,0.5)' : 'rgba(26,21,16,0.4)',
          }}
        />
        <KeyboardArrowDownIcon
          sx={{
            fontSize: 16,
            color: isDark ? 'rgba(221,211,191,0.6)' : 'rgba(26,21,16,0.5)',
          }}
        />
      </Box>

      {/* Large background text */}
      <Typography
        sx={{
          position: 'absolute',
          bottom: -30,
          right: -10,
          fontFamily: '"Playfair Display", serif',
          fontSize: { xs: '6rem', md: '12rem' },
          fontWeight: 700,
          color: isDark ? 'rgba(255,255,255,0.013)' : 'rgba(0,0,0,0.03)',
          lineHeight: 1,
          userSelect: 'none',
          pointerEvents: 'none',
          letterSpacing: '-0.05em',
        }}
      >
        CMF
      </Typography>
    </Box>
  );
}
