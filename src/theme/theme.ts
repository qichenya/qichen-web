import '@mui/material/styles';

declare module '@mui/material/styles' {
  interface CustomSurface {
    main: string;
    variant: string;
    onMain: string;
    onVariant: string;
  }

  interface Palette {
    tertiary: Palette['primary'];

    surface: CustomSurface;

<<<<<<< HEAD
    outline: string;
  }

  interface PaletteOptions {
    tertiary?: PaletteOptions['primary'];
=======
export const createLightTheme = (palette: typeof colorPalettes[0]) => {
  return createTheme({
    ...commonTheme,
    palette: {
      mode: 'light',
      primary: {
        main: palette.primary.main,
        container: palette.primary.container,
        onContainer: palette.primary.onContainer,
      } as any,
      secondary: {
        main: palette.secondary.main,
        container: palette.secondary.container,
        onContainer: palette.secondary.onContainer,
      } as any,
      tertiary: {
        main: palette.tertiary.main,
        container: palette.tertiary.container,
        onContainer: palette.tertiary.onContainer,
      } as any,
      surface: {
        main: '#FFFFFF',
        variant: '#F0F4F4',
        onMain: '#1A2A2A',
        onVariant: '#3D4D4D',
      } as any,
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
        container: '#FFD9D7',
        onContainer: '#410E0D',
      } as any,
      outline: '#7A8F8F',
    } as any,
  });
};

export const createDarkTheme = (palette: typeof colorPalettes[0]) => {
  return createTheme({
    ...commonTheme,
    palette: {
      mode: 'dark',
      primary: {
        main: palette.primary.container,
        container: palette.primary.main,
        onContainer: '#FFFFFF',
      } as any,
      secondary: {
        main: palette.secondary.container,
        container: palette.secondary.main,
        onContainer: '#FFFFFF',
      } as any,
      tertiary: {
        main: palette.tertiary.container,
        container: palette.tertiary.main,
        onContainer: '#FFFFFF',
      } as any,
      surface: {
        main: '#1C2626',
        variant: '#2A3636',
        onMain: '#E8EDED',
        onVariant: '#C4D4D4',
      } as any,
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
        container: '#8C1D18',
        onContainer: '#F9DEDC',
      } as any,
      outline: '#6B8080',
    } as any,
  });
};
>>>>>>> 39ff1c4 (feat: add initial project structure with HTML, SVG avatar, and Vite configuration)

    surface?: {
      main: string;
      variant: string;
      onMain: string;
      onVariant: string;
    };

    outline?: string;
  }

  interface PaletteColor {
    container?: string;
    onContainer?: string;
    onMain?: string;
  }

  interface SimplePaletteColorOptions {
    container?: string;
    onContainer?: string;
    onMain?: string;
  }
}
