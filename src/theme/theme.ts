import { createTheme, ThemeOptions } from '@mui/material/styles';

const commonTheme: ThemeOptions = {
  typography: {
    fontFamily: '"Roboto", "Noto Sans SC", sans-serif',
    h1: {
      fontWeight: 700,
      fontSize: '3rem',
      lineHeight: 1.3,
      letterSpacing: '-0.01em',
    },
    h2: {
      fontWeight: 600,
      fontSize: '2.25rem',
      lineHeight: 1.4,
    },
    h3: {
      fontWeight: 600,
      fontSize: '1.75rem',
      lineHeight: 1.4,
    },
    h4: {
      fontWeight: 600,
      fontSize: '1.5rem',
      lineHeight: 1.4,
    },
    h5: {
      fontWeight: 500,
      fontSize: '1.25rem',
      lineHeight: 1.5,
    },
    h6: {
      fontWeight: 500,
      fontSize: '1rem',
      lineHeight: 1.5,
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.8,
    },
    body2: {
      fontSize: '0.875rem',
      lineHeight: 1.7,
    },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 500,
          borderRadius: 20,
          padding: '10px 24px',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
      },
    },
  },
};

const colorPalettes = [
  {
    name: '薰衣草紫',
    primary: { main: '#7B6EDB', container: '#DAD7F9', onContainer: '#201B47' },
    secondary: { main: '#8B6F9D', container: '#E8D9F3', onContainer: '#2D1F3A' },
    tertiary: { main: '#9A6B7C', container: '#F5D5DF', onContainer: '#3E1A26' },
  },
  {
    name: '珊瑚粉',
    primary: { main: '#E46F66', container: '#FFDAD7', onContainer: '#410E0C' },
    secondary: { main: '#775653', container: '#FFDAD7', onContainer: '#2C1513' },
    tertiary: { main: '#745A2F', container: '#FFDEA6', onContainer: '#281901' },
  },
  {
    name: '天空蓝',
    primary: { main: '#5390C0', container: '#D0E4F7', onContainer: '#0A1F32' },
    secondary: { main: '#557E89', container: '#D7E9EF', onContainer: '#0A1F27' },
    tertiary: { main: '#726B99', container: '#E5DEFF', onContainer: '#1D1837' },
  },
  {
    name: '杏黄色',
    primary: { main: '#C07D44', container: '#FFDCC4', onContainer: '#2E1600' },
    secondary: { main: '#8B6E58', container: '#F5D0BA', onContainer: '#1E0F05' },
    tertiary: { main: '#7E6E8D', container: '#E6DEFF', onContainer: '#1F1532' },
  },
  {
    name: '玫瑰红',
    primary: { main: '#A84E6A', container: '#FFD9E1', onContainer: '#3E0019' },
    secondary: { main: '#7E5260', container: '#FFD9E5', onContainer: '#31101D' },
    tertiary: { main: '#7C5B33', container: '#FFDDB1', onContainer: '#2E1900' },
  },
  {
    name: '湖蓝色',
    primary: { main: '#3A8692', container: '#B9EBF6', onContainer: '#001F24' },
    secondary: { main: '#4C6A71', container: '#CDE4E9', onContainer: '#072025' },
    tertiary: { main: '#5D6088', container: '#E1E0FF', onContainer: '#1A1D42' },
  },
  {
    name: '琥珀色',
    primary: { main: '#A3703D', container: '#FFDDB1', onContainer: '#361F00' },
    secondary: { main: '#8C634A', container: '#FFDBCA', onContainer: '#391608' },
    tertiary: { main: '#7C6B8E', container: '#E6DEFF', onContainer: '#1F1532' },
  },
  {
    name: '蜜桃粉',
    primary: { main: '#D36D7E', container: '#FFD9DE', onContainer: '#3E0E19' },
    secondary: { main: '#8B5F65', container: '#FFD9DF', onContainer: '#301015' },
    tertiary: { main: '#8F5E3B', container: '#FFDDB2', onContainer: '#311900' },
  },
  {
    name: '丁香紫',
    primary: { main: '#8F6F9E', container: '#E8D9F3', onContainer: '#241332' },
    secondary: { main: '#7A6E8E', container: '#E5DEFF', onContainer: '#1F1532' },
    tertiary: { main: '#8E685D', container: '#FFD9D3', onContainer: '#311009' },
  },
  {
    name: '樱花粉',
    primary: { main: '#D36A8E', container: '#FFD9E8', onContainer: '#3E0E24' },
    secondary: { main: '#8D5F75', container: '#FFD9E9', onContainer: '#2B101E' },
    tertiary: { main: '#7D6F5B', container: '#F0E5C9', onContainer: '#2E2100' },
  },
];

export const getRandomPalette = () => {
  const randomIndex = Math.floor(Math.random() * colorPalettes.length);
  return colorPalettes[randomIndex];
};

export const createLightTheme = (palette: typeof colorPalettes[0]) => {
  return createTheme({
    ...commonTheme,
    palette: {
      mode: 'light',
      primary: {
        main: palette.primary.main,
        onMain: '#FFFFFF',
        container: palette.primary.container,
        onContainer: palette.primary.onContainer,
      },
      secondary: {
        main: palette.secondary.main,
        onMain: '#FFFFFF',
        container: palette.secondary.container,
        onContainer: palette.secondary.onContainer,
      },
      tertiary: {
        main: palette.tertiary.main,
        onMain: '#FFFFFF',
        container: palette.tertiary.container,
        onContainer: palette.tertiary.onContainer,
      },
      surface: {
        main: '#FFFFFF',
        variant: '#F0F4F4',
        onMain: '#1A2A2A',
        onVariant: '#3D4D4D',
      },
      background: {
        default: '#F5F8F8',
        paper: '#FFFFFF',
      },
      text: {
        primary: '#1A2A2A',
        secondary: '#4A5F5F',
      },
      error: {
        main: '#C75450',
        onMain: '#FFFFFF',
        container: '#FFD9D7',
        onContainer: '#410E0D',
      },
      outline: '#7A8F8F',
    },
  });
};

export const createDarkTheme = (palette: typeof colorPalettes[0]) => {
  return createTheme({
    ...commonTheme,
    palette: {
      mode: 'dark',
      primary: {
        main: palette.primary.container,
        onMain: palette.primary.onContainer,
        container: palette.primary.main,
        onContainer: '#FFFFFF',
      },
      secondary: {
        main: palette.secondary.container,
        onMain: palette.secondary.onContainer,
        container: palette.secondary.main,
        onContainer: '#FFFFFF',
      },
      tertiary: {
        main: palette.tertiary.container,
        onMain: palette.tertiary.onContainer,
        container: palette.tertiary.main,
        onContainer: '#FFFFFF',
      },
      surface: {
        main: '#1C2626',
        variant: '#2A3636',
        onMain: '#E8EDED',
        onVariant: '#C4D4D4',
      },
      background: {
        default: '#1C2626',
        paper: '#1C2626',
      },
      text: {
        primary: '#E8EDED',
        secondary: '#B3C9C9',
      },
      error: {
        main: '#F2B8B5',
        onMain: '#601410',
        container: '#8C1D18',
        onContainer: '#F9DEDC',
      },
      outline: '#6B8080',
    },
  });
};

export const lightTheme = createLightTheme(colorPalettes[0]);
export const darkTheme = createDarkTheme(colorPalettes[0]);
