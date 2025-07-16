import { useState } from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { api } from '../services';

function Header() {
    const navigate = useNavigate();
    const [isCreating, setIsCreating] = useState(false);

    const handleCreateSession = async () => {
        setIsCreating(true);
        try {
            const response = await api.createSession();
            console.log(response.session_id);
            navigate(`/session/${response.session_id}`);
        } catch (error) {
            console.error('Ошибка при создании сессии:', error);
        } finally {
            setIsCreating(false);
        }
    };

    return (
        <AppBar position="static" sx={{ borderRadius: '0.5rem' }}>
            <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="h6">Collab Typer</Typography>
                <Button 
                    color="inherit" 
                    variant="outlined"
                    onClick={handleCreateSession}
                    disabled={isCreating}
                >
                    {isCreating ? 'Создание...' : 'Создать сессию'}
                </Button>
            </Toolbar>
        </AppBar>
    )
}

export default Header;