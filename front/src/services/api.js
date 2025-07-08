class Api {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
    this.ws = null;
  }

  async createSession() {
    const response = await fetch(`${this.baseUrl}/session`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) {
      throw new Error('Ошибка при создании сессии');
    }
    return response.json();
  }

  connectWebSocket(sessionId, onMessage, onOpen, onClose, onError) {
    this.ws = new WebSocket(`${this.baseUrl.replace('http', 'ws')}/ws/${sessionId}`);
    this.ws.onopen = onOpen;
    this.ws.onmessage = (event) => {
      if (onMessage) onMessage(event.data);
    };
    this.ws.onclose = onClose;
    this.ws.onerror = onError;
  }

  sendMessage(message) {
    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      this.ws.send(message);
    }
  }

  closeWebSocket() {
    if (this.ws) {
      this.ws.close();
      this.ws = null;
    }
  }
}

export default Api;
