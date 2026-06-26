import { Box, Container, Typography, Grid, IconButton, Divider, Link } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';
import TwitterIcon from '@mui/icons-material/Twitter';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import PhoneOutlinedIcon from '@mui/icons-material/PhoneOutlined';

const footerLinks = {
  institución: [
    { label: 'Sobre el Colegio', href: '#manifiesto' },
    { label: 'Manifiesto', href: '#manifiesto' },
    { label: 'Líneas de investigación', href: '#investigacion' },
    { label: 'Comunidad académica', href: '#comunidad' },
    { label: 'Aviso de privacidad', href: '#' },
  ],
  programas: [
    { label: 'Licenciatura en Psicología Crítica', href: '#oferta' },
    { label: 'Maestría en Psicoanálisis', href: '#oferta' },
    { label: 'Criminología Crítica', href: '#oferta' },
    { label: 'Diplomados', href: '#oferta' },
    { label: 'Seminarios permanentes', href: '#seminarios' },
  ],
  recursos: [
    { label: 'Biblioteca y archivo', href: '#biblioteca' },
    { label: 'Publicaciones', href: '#publicaciones' },
    { label: 'Podcast y multimedia', href: '#multimedia' },
    { label: 'Eventos y coloquios', href: '#seminarios' },
    { label: 'Grupos de lectura', href: '#comunidad' },
  ],
};

function scrollTo(href) {
  if (href === '#') return;
  const el = document.querySelector(href);
  if (el) el.scrollIntoView({ behavior: 'smooth' });
}

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        bgcolor: '#080808',
        borderTop: '1px solid rgba(255,255,255,0.06)',
        pt: { xs: 8, md: 12 },
        pb: { xs: 5, md: 6 },
      }}
    >
      <Container maxWidth="xl" sx={{ px: { xs: 3, md: 6 } }}>
        {/* Top quote */}
        <Box
          sx={{
            mb: { xs: 7, md: 10 },
            pb: { xs: 7, md: 10 },
            borderBottom: '1px solid rgba(255,255,255,0.07)',
            textAlign: 'center',
          }}
        >
          <Typography
            sx={{
              fontFamily: '"Playfair Display", serif',
              fontStyle: 'italic',
              fontSize: { xs: '1.35rem', md: '1.9rem' },
              color: 'rgba(221,211,191,0.75)',
              lineHeight: 1.5,
              maxWidth: 700,
              mx: 'auto',
              mb: 2,
            }}
          >
            "El pensamiento crítico es el movimiento por el cual el sujeto se da el derecho
            de interrogar la verdad acerca de sus efectos de poder."
          </Typography>
          <Typography
            sx={{
              fontSize: '0.72rem',
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: 'rgba(155,37,37,0.8)',
              fontFamily: '"Inter", sans-serif',
            }}
          >
            — Michel Foucault
          </Typography>
        </Box>

        {/* Links grid */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: '2fr 1fr 1fr 1fr' },
            gap: { xs: 5, md: 6 },
            mb: { xs: 7, md: 10 },
          }}
        >
          {/* Brand column */}
          <Box>
            <Typography
              sx={{
                fontFamily: '"Playfair Display", serif',
                fontSize: '1.35rem',
                color: 'rgba(221,211,191,0.9)',
                mb: 1,
                lineHeight: 1.3,
              }}
            >
              Colegio Michel Foucault
            </Typography>
            <Typography
              sx={{
                fontSize: '0.65rem',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: 'rgba(155,37,37,0.7)',
                mb: 3,
                fontFamily: '"Inter", sans-serif',
              }}
            >
              Crítica · Política · Poética
            </Typography>
            <Typography
              sx={{
                fontSize: '0.82rem',
                color: 'rgba(221,211,191,0.45)',
                lineHeight: 1.8,
                fontFamily: '"Inter", sans-serif',
                maxWidth: 280,
                mb: 4,
              }}
            >
              Espacio académico dedicado a la producción colectiva
              de pensamiento crítico, clínico y filosófico.
            </Typography>

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
              {[
                { icon: <LocationOnOutlinedIcon sx={{ fontSize: 15 }} />, text: 'Ciudad de México, México' },
                { icon: <EmailOutlinedIcon sx={{ fontSize: 15 }} />, text: 'contacto@colegioMFoucault.mx' },
                { icon: <PhoneOutlinedIcon sx={{ fontSize: 15 }} />, text: '+52 55 0000 0000' },
              ].map((item) => (
                <Box key={item.text} sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                  <Box sx={{ color: 'rgba(155,37,37,0.6)', display: 'flex' }}>{item.icon}</Box>
                  <Typography
                    sx={{
                      fontSize: '0.78rem',
                      color: 'rgba(221,211,191,0.45)',
                      fontFamily: '"Inter", sans-serif',
                    }}
                  >
                    {item.text}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Box>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([section, links]) => (
            <Box key={section}>
              <Typography
                sx={{
                  fontSize: '0.65rem',
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  color: 'rgba(221,211,191,0.35)',
                  mb: 2.5,
                  fontFamily: '"Inter", sans-serif',
                  fontWeight: 500,
                }}
              >
                {section}
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                {links.map((link) => (
                  <Typography
                    key={link.label}
                    component="button"
                    onClick={() => scrollTo(link.href)}
                    sx={{
                      background: 'none',
                      border: 'none',
                      padding: 0,
                      textAlign: 'left',
                      cursor: 'pointer',
                      fontSize: '0.82rem',
                      color: 'rgba(221,211,191,0.45)',
                      fontFamily: '"Inter", sans-serif',
                      lineHeight: 1.4,
                      transition: 'color 0.2s',
                      '&:hover': { color: 'rgba(221,211,191,0.85)' },
                    }}
                  >
                    {link.label}
                  </Typography>
                ))}
              </Box>
            </Box>
          ))}
        </Box>

        <Divider sx={{ borderColor: 'rgba(255,255,255,0.06)', mb: 4 }} />

        {/* Bottom bar */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            justifyContent: 'space-between',
            alignItems: { xs: 'flex-start', md: 'center' },
            gap: 3,
          }}
        >
          <Typography
            sx={{
              fontSize: '0.72rem',
              color: 'rgba(221,211,191,0.25)',
              fontFamily: '"Inter", sans-serif',
              letterSpacing: '0.05em',
            }}
          >
            © 2024 Colegio Michel Foucault · Todos los derechos reservados
          </Typography>

          <Box sx={{ display: 'flex', gap: 1 }}>
            {[
              { icon: <FacebookIcon sx={{ fontSize: 17 }} />, label: 'Facebook' },
              { icon: <InstagramIcon sx={{ fontSize: 17 }} />, label: 'Instagram' },
              { icon: <TwitterIcon sx={{ fontSize: 17 }} />, label: 'Twitter / X' },
              { icon: <YouTubeIcon sx={{ fontSize: 17 }} />, label: 'YouTube' },
            ].map((social) => (
              <IconButton
                key={social.label}
                size="small"
                aria-label={social.label}
                sx={{
                  color: 'rgba(221,211,191,0.3)',
                  '&:hover': { color: 'rgba(221,211,191,0.75)', bgcolor: 'rgba(255,255,255,0.05)' },
                  transition: 'color 0.2s',
                }}
              >
                {social.icon}
              </IconButton>
            ))}
          </Box>

          <Typography
            sx={{
              fontSize: '0.65rem',
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: 'rgba(155,37,37,0.45)',
              fontFamily: '"Inter", sans-serif',
            }}
          >
            Pensar es un acto político
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
