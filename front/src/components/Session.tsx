import { useState, useRef, useEffect } from 'react';
import { TextField, Box, Typography } from '@mui/material';
import type { ChangeEvent } from 'react';
import { useWebSocket } from '../hooks/useWebSocket';
import { api } from '../services';

interface SessionProps {
    sessionId: string;
}

function Session({ sessionId }: SessionProps) {
    const [value, setValue] = useState('');
    const [isConnected, setIsConnected] = useState<boolean | null>(null);
    const [clientId, setClientId] = useState<string | null>(null);
    // Уникальный идентификатор клиента

    // const { isConnected, sendMessage } = useWebSocket({
    //     sessionId,
    //     onMessage: (message: string) => {
    //         try {
    //             const { value: msgValue, clientId: senderId } = JSON.parse(message);
    //             if (senderId !== clientId) {
    //                 setValue(msgValue);
    //             }
    //         } catch {
    //             // fallback: если старый формат
    //             setValue(message);
    //         }
    //     }
    // });
    useEffect(() => {
        api.connectWebSocket(sessionId, onMessage, onOpen, onClose);
        // setClientId(sessionId);
    }, [])

    function onOpen() {
        console.log("Соединение открыто.");
        setIsConnected(true);
    }

    function onMessage(message: string) {
        // if (clientId !== sessionId) {
            console.log("Получено сообщение:", message);
        // }
    }

    function offMessage() {
        console.log('Отписался от сообщений.')
    }

    function onClose() {
        console.log("Соединение закрыто.")
        setIsConnected(false);
    }


    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const newValue = event.target.value;
        setValue(newValue);
    };

    useEffect(() => {
        api.sendMessage(JSON.stringify({ value, clientId }));
    }, [value])

    useEffect(() => {
        if (!isConnected) return;
        api.onMessage(onMessage);

        return () => {
            api.offMessage(offMessage);
        }
    }, [isConnected])

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
                width: '100%',
                gap: 2
            }}
        >
            <Typography variant="h6" color="text.secondary">
                Сессия: {sessionId}
                {isConnected && ' (Подключено)'}
            </Typography>

            <TextField
                type='text'
                label="Введите текст"
                variant="outlined"
                value={value}
                onChange={handleChange}
                fullWidth
                multiline
                minRows={8}
                sx={{
                    borderRadius: '0.5rem',
                    width: '100%',
                }}
            />
        </Box>
    );
}

export default Session; 