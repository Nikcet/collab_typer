import Header from './components/Header'
import InputField from './components/Input';
import { Container, Box, Typography } from '@mui/material'




function App() {

  return (
    <Container
      maxWidth="lg"
      sx={{ padding: '1rem', display: 'flex', flexDirection: 'column', height: '100vh'}}>
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
        <InputField />
      </Box>
    </Container>
  )
}

export default App
