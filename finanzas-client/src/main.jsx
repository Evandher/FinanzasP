import { StrictMode, useState, useMemo } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';

import { ThemeProvider, CssBaseline } from '@mui/material';
import { createAppTheme } from './theme/theme.js';

function Main() {
  const [mode, setMode] = useState('light');
  const theme = useMemo(() => createAppTheme(mode), [mode]);

  return (
    <StrictMode>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <App mode={mode} setMode={setMode} />
      </ThemeProvider>
    </StrictMode>
  );
}

createRoot(document.getElementById('root')).render(<Main />);
