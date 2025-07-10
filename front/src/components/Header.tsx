import { useState } from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';

function Header() {
    return (
        <AppBar position="static" sx={{ borderRadius: '0.5rem' }}>
            <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="h6">Collab Typer</Typography>
                <Button color="inherit" variant="outlined">
                    Создать сессию
                </Button>
            </Toolbar>
        </AppBar>
    )
}

export default Header;