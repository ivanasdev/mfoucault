import { Box, Typography } from '@mui/material';

export default function SectionLabel({ children, light = false }) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 3 }}>
      <Box
        sx={{
          width: 28,
          height: '1px',
          bgcolor: 'secondary.main',
          flexShrink: 0,
        }}
      />
      <Typography
        component="span"
        sx={{
          fontFamily: '"Inter", sans-serif',
          fontSize: '0.68rem',
          fontWeight: 500,
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          color: light ? 'rgba(255,255,255,0.45)' : 'text.secondary',
        }}
      >
        {children}
      </Typography>
    </Box>
  );
}
