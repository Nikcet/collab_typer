import { useEffect, useState } from 'react';
import { api } from '../services';

interface UseWebSocketProps {
  sessionId: string;
  onMessage?: (message: string) => void;
}

export const useWebSocket = ({ sessionId, onMessage }: UseWebSocketProps) => {
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    if (!sessionId) return;

    const handleMessage = (message: string) => {
      onMessage?.(message);
    };

    // Подключаемся к WebSocket
    if (!api.ws) {
      api.connectWebSocket(sessionId, handleMessage, () => {
        setIsConnected(true);
      });
    }

    // Подписываемся на сообщения
    api.onMessage(handleMessage);

    return () => {
      api.offMessage(handleMessage);
      api.closeWebSocket();
    };
  }, [sessionId]);

  const sendMessage = (message: string) => {
    if (isConnected) {
      api.sendMessage(message);
    }
  };

  return {
    isConnected,
    sendMessage
  };
}; 