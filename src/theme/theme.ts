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

    outline: string;
  }

  interface PaletteOptions {
    tertiary?: PaletteOptions['primary'];

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
