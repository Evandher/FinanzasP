// theme.js
import { createTheme } from '@mui/material/styles';

export const getDesignTokens = (mode) => ({
  palette: {
    mode,
    ...(mode === 'light'
      ? {
          // Colores para modo claro
          primary: { main: '#1976d2' },
          background: { default: '#f5f5f5', paper: '#ffffff' },
        }
      : {
          // Colores para modo oscuro
          primary: { main: '#90caf9' },
          background: { default: '#121212', paper: '#1e1e1e' },
        }),
  },
  typography: {
    fontFamily: 'Roboto, sans-serif',
  },
});

export const createAppTheme = (mode) => createTheme(getDesignTokens(mode));
