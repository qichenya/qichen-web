import { alpha, createTheme, ThemeOptions } from '@mui/material/styles';

/* ------------------------------------------------------------
   QICHEN — Nothing style tokens
   Pure black, dot-matrix display type, mono labels, single red.
   ------------------------------------------------------------ */

export const FONT_DOTS = '"Doto", "JetBrains Mono", "Noto Sans SC", monospace';
export const FONT_MONO = '"JetBrains Mono", ui-monospace, SFMono-Regular, "Noto Sans SC", monospace';
export const FONT_TEXT = '"Noto Sans SC", system-ui, -apple-system, sans-serif';

export const PAGE_MAX_WIDTH = 625;

const commonTheme: ThemeOptions = {
  typography: {
    fontFamily: FONT_TEXT,
    h1: {
      fontFamily: FONT_DOTS, fontWeight: 900, fontSize: '4.25rem', lineHeight: 0.95, letterSpacing: '2px',
    },
    h2: {
      fontFamily: FONT_DOTS, fontWeight: 900, fontSize: '3.25rem', lineHeight: 1, letterSpacing: '2px',
    },
    h3: {
      fontFamily: FONT_DOTS, fontWeight: 900, fontSize: '2.5rem', lineHeight: 1, letterSpacing: '1.5px',
    },
    h4: {
      fontFamily: FONT_DOTS, fontWeight: 900, fontSize: '2rem', lineHeight: 1, letterSpacing: '1.5px',
    },
    h5: {
      fontFamily: FONT_MONO, fontWeight: 500, fontSize: '1rem', lineHeight: 1.5, letterSpacing: '0.06em',
    },
    h6: {
      fontFamily: FONT_MONO, fontWeight: 500, fontSize: '0.9rem', lineHeight: 1.5, letterSpacing: '0.04em',
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.8,
    },
    body2: {
      fontSize: '0.875rem',
      lineHeight: 1.75,
    },
    caption: {
      fontFamily: FONT_MONO,
      fontSize: '0.72rem',
      letterSpacing: '0.08em',
      lineHeight: 1.6,
    },
    overline: {
      fontFamily: FONT_MONO,
      fontSize: '0.65rem',
      fontWeight: 400,
      letterSpacing: '0.16em',
      lineHeight: 1.6,
      textTransform: 'uppercase',
    },
    button: {
      fontFamily: FONT_MONO,
      fontWeight: 400,
      fontSize: '0.875rem',
      letterSpacing: '0.06em',
      textTransform: 'none',
    },
  },
  shape: {
    borderRadius: 2,
  },
  components: {
    MuiButton: {
      defaultProps: { disableElevation: true },
      styleOverrides: {
        root: {
          borderRadius: 2,
          height: 48,
          padding: '0 20px',
          fontFamily: FONT_MONO,
          fontSize: '0.875rem',
          fontWeight: 400,
          letterSpacing: '0.06em',
          boxShadow: 'none',
          transition: 'opacity .15s ease, background-color .15s ease, border-color .15s ease',
          '& .MuiButton-startIcon svg, & .MuiButton-endIcon svg': { fontSize: 16 },
          '&:hover': { boxShadow: 'none', opacity: 0.82 },
        },
        contained: {
          backgroundColor: '#D71921',
          color: '#FFFFFF',
          '&:hover': { backgroundColor: '#D71921' },
          '&.Mui-disabled': { backgroundColor: '#2A2A2A', color: '#5E5E5E' },
        },
        outlined: ({ theme }) => ({
          borderColor: theme.palette.divider,
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.background.paper,
          '&:hover': { borderColor: alpha(theme.palette.text.primary, 0.4), backgroundColor: theme.palette.action.hover },
        }),
        text: ({ theme }) => ({ padding: '0 10px', color: theme.palette.text.secondary }),
        sizeSmall: { height: 38, padding: '0 14px', fontSize: '0.75rem' },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: ({ theme }) => ({
          borderRadius: 2,
          boxShadow: 'none',
          border: `1px solid ${theme.palette.divider}`,
          backgroundColor: theme.palette.background.paper,
          backgroundImage: 'none',
        }),
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 2,
          height: 26,
          fontFamily: FONT_MONO,
          fontSize: '0.68rem',
          letterSpacing: '0.08em',
        },
        outlined: ({ theme }) => ({ borderColor: theme.palette.divider }),
        filled: ({ theme }) => ({ backgroundColor: theme.palette.action.selected }),
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: ({ theme }) => ({
          borderRadius: 2,
          color: theme.palette.text.primary,
          '&:hover': { backgroundColor: theme.palette.action.hover },
        }),
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: ({ theme }) => ({
          borderRadius: 2,
          border: `1px solid ${theme.palette.divider}`,
          backgroundImage: 'none',
          backgroundColor: theme.palette.background.paper,
        }),
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: { backgroundImage: 'none', boxShadow: 'none' },
      },
    },
    MuiTextField: {
      defaultProps: { variant: 'outlined' },
      styleOverrides: {
        root: ({ theme }) => ({
          '& .MuiOutlinedInput-root': {
            borderRadius: 2,
            fontFamily: FONT_MONO,
            fontSize: '0.875rem',
            backgroundColor: theme.palette.background.paper,
            '& fieldset': { borderColor: theme.palette.divider },
            '&:hover fieldset': { borderColor: alpha(theme.palette.text.primary, 0.35) },
            '&.Mui-focused fieldset': { borderColor: theme.palette.primary.main, borderWidth: 1 },
          },
          '& .MuiInputBase-input::placeholder': { color: theme.palette.text.secondary, opacity: 1 },
        }),
      },
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: ({ theme }) => ({
          borderRadius: 2,
          backgroundColor: theme.palette.text.primary,
          color: theme.palette.background.default,
          fontFamily: FONT_MONO,
          fontSize: '0.7rem',
          letterSpacing: '0.04em',
        }),
      },
    },
    MuiCssBaseline: {
      styleOverrides: {
        body: { minHeight: '100vh' },
        '*': { scrollbarColor: '#242424 transparent' },
      },
    },
  },
};

export const createLightTheme = () => createTheme({
  ...commonTheme,
  palette: {
    mode: 'light',
    primary: { main: '#D71921', contrastText: '#FFFFFF' },
    secondary: { main: '#5E5E5E' },
    tertiary: { main: '#8C8C8C' },
    background: {
      default: '#F2F2F2',
      paper: '#FFFFFF',
    },
    text: {
      primary: '#000000',
      secondary: '#5E5E5E',
      disabled: '#8C8C8C',
    },
    divider: '#DCDCDC',
    outline: '#DCDCDC',
    error: { main: '#D71921' },
  } as any,
});

export const createDarkTheme = () => createTheme({
  ...commonTheme,
  palette: {
    mode: 'dark',
    primary: { main: '#D71921', contrastText: '#FFFFFF' },
    secondary: { main: '#8C8C8C' },
    tertiary: { main: '#5E5E5E' },
    background: {
      default: '#000000',
      paper: '#0A0A0A',
    },
    text: {
      primary: '#F2F2F2',
      secondary: '#8C8C8C',
      disabled: '#5E5E5E',
    },
    divider: '#1E1E1E',
    outline: '#2A2A2A',
    error: { main: '#D71921' },
  } as any,
});
