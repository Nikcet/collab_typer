import { useState } from 'react';
import { TextField, Box } from '@mui/material';
import type { ChangeEvent } from 'react';

function InputField() {
    const [value, setValue] = useState('');

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value);
    };

    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100%',
                width: '100%',
            }}
        >
            <TextField
                type='text'
                label="Введите текст"
                variant="outlined"
                value={value}
                onChange={handleChange}
                fullWidth
                multiline
                minRows={10}
                sx={{
                    borderRadius: '0.5rem',
                    width: '100%',
                }}
            />
        </Box>
    );
}

export default InputField;
