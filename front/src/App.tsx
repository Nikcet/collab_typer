import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import Header from './components/Header'
import InputField from './components/Input';
import Session from './components/Session';
import { Container, Box } from '@mui/material'
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import { useState, useMemo } from 'react';

function App() {
  const [mode, setMode] = useState<'light' | 'dark'>('dark');

  const theme = useMemo(() =>
    createTheme({
      palette: { mode }
    }), [mode]
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Container
          maxWidth="lg"
          sx={{
            padding: '1rem',
            display: 'flex',
            flexDirection: 'column',
            height: '100vh',
            backgroundColor: 'background.default',
            color: 'text.primary'
          }}>
          <Header />
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              width: '100%',
              marginTop: '1rem',
              height: '95vh'
            }}>
            <Routes>
              <Route path="/" element={<InputField />} />
              <Route path="/session/:sessionId" element={<SessionWrapper />} />
            </Routes>
          </Box>
        </Container>
      </Router>
    </ThemeProvider>
  )
}

// Компонент-обертка для получения sessionId из URL
function SessionWrapper() {
  const { sessionId } = useParams<{ sessionId: string }>();
  return sessionId ? <Session sessionId={sessionId} /> : <div>Ошибка: ID сессии не найден</div>;
}

export default App
