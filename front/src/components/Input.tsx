import { useEffect, useState } from 'react';
import { TextField, Box } from '@mui/material';
import type { ChangeEvent } from 'react';
import { api } from '../services';

import useDebouncedValue from '../hooks/useDebouncedValue';

function InputField() {
    const [value, setValue] = useState('');
    const [sessionId, setSessionId] = useState('');

    // useEffect(() => {
    //     api.createSession()
    //         .then((data) => {
    //             if (!data.session_id) return;

    //             setSessionId(data.session_id);
    //         })
    //         .catch(err => err)
    // }, [])

    // const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    //     setValue(useDebouncedValue(event.target.value, 5000));
    // };

    // useEffect(() => {
    //     api.connectWebSocket(sessionId);
    // }, [sessionId])

    // useEffect(() => {
    //     api.sendMessage(value);
    // }, [value])

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
            {/* <TextField
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
            /> */}
        </Box>
    );
}

export default InputField;
