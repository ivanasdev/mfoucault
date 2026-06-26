import { createTheme } from '@mui/material/styles';

const serifFont = '"Playfair Display", Georgia, "Times New Roman", serif';
const sansFont = '"Inter", "Helvetica Neue", system-ui, sans-serif';

const typography = {
  fontFamily: sansFont,
  h1: { fontFamily: serifFont, fontWeight: 400, letterSpacing: '-0.02em' },
  h2: { fontFamily: serifFont, fontWeight: 400, letterSpacing: '-0.015em' },
  h3: { fontFamily: serifFont, fontWeight: 400, letterSpacing: '-0.01em' },
  h4: { fontFamily: serifFont, fontWeight: 400 },
  h5: { fontFamily: serifFont, fontWeight: 400 },
  h6: { fontFamily: serifFont, fontWeight: 400 },
  overline: {
    fontFamily: sansFont,
    letterSpacing: '0.18em',
    fontSize: '0.68rem',
    fontWeight: 500,
  },
  subtitle1: {
    fontFamily: sansFont,
    letterSpacing: '0.12em',
    fontSize: '0.75rem',
    fontWeight: 400,
    textTransform: 'uppercase',
  },
  body1: { fontFamily: sansFont, lineHeight: 1.85 },
  body2: { fontFamily: sansFont, lineHeight: 1.75 },
  caption: { fontFamily: sansFont, letterSpacing: '0.06em' },
};

const components = {
  MuiButton: {
    styleOverrides: {
      root: {
        textTransform: 'none',
        letterSpacing: '0.07em',
        fontWeight: 400,
        borderRadius: 1,
      },
    },
  },
  MuiChip: {
    styleOverrides: {
      root: { borderRadius: 2, letterSpacing: '0.05em', fontSize: '0.7rem' },
    },
  },
  MuiAppBar: {
    defaultProps: { elevation: 0 },
  },
  MuiTextField: {
    defaultProps: { variant: 'outlined' },
  },
  MuiTab: {
    styleOverrides: {
      root: { textTransform: 'none', letterSpacing: '0.06em', fontWeight: 400 },
    },
  },
};

export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: '#090909',
      paper: '#111111',
    },
    primary: {
      main: '#c8bead',
      light: '#e0d6c2',
      dark: '#9a9080',
      contrastText: '#090909',
    },
    secondary: {
      main: '#9b2525',
      light: '#c04040',
      dark: '#6e1a1a',
      contrastText: '#e0d6c2',
    },
    text: {
      primary: '#ddd3bf',
      secondary: '#6e6458',
    },
    divider: 'rgba(255,255,255,0.07)',
    action: {
      hover: 'rgba(255,255,255,0.04)',
      selected: 'rgba(155,37,37,0.12)',
    },
  },
  typography,
  components,
  shape: { borderRadius: 2 },
});

export const lightTheme = createTheme({
  palette: {
    mode: 'light',
    background: {
      default: '#f0ebe0',
      paper: '#f8f3e6',
    },
    primary: {
      main: '#1e1a14',
      light: '#3a342a',
      dark: '#0a0807',
      contrastText: '#f8f3e6',
    },
    secondary: {
      main: '#8b1a1a',
      light: '#b03030',
      dark: '#5e1010',
      contrastText: '#f8f3e6',
    },
    text: {
      primary: '#1a1510',
      secondary: '#5a5040',
    },
    divider: 'rgba(0,0,0,0.09)',
    action: {
      hover: 'rgba(0,0,0,0.04)',
      selected: 'rgba(139,26,26,0.08)',
    },
  },
  typography,
  components,
  shape: { borderRadius: 2 },
});
