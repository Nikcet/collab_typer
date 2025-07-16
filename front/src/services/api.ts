class Api {
  baseUrl: string;
  ws: WebSocket | null;
  private messageCallbacks: ((data: string) => void)[] = [];

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
    this.ws = null;
  }

  async createSession(): Promise<any> {
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

  connectWebSocket(
    sessionId: string,
    onMessage?: (data: string) => void,
    onOpen?: (this: WebSocket, ev: Event) => any,
    onClose?: (this: WebSocket, ev: CloseEvent) => any,
    onError?: (this: WebSocket, ev: Event) => any
  ): void {
    console.log(sessionId);
    this.ws = new WebSocket(`${this.baseUrl.replace('http', 'ws')}/ws/${sessionId}`);
    
    this.ws.onopen = onOpen || null;
    this.ws.onmessage = (event: MessageEvent) => {
      // Вызываем все зарегистрированные callback'ы
      this.messageCallbacks.forEach(callback => callback(event.data));
      if (onMessage) onMessage(event.data);
    };
    this.ws.onclose = onClose || null;
    this.ws.onerror = onError || null;
  }

  // Метод для подписки на сообщения
  onMessage(callback: (data: string) => void): void {
    this.messageCallbacks.push(callback);
  }

  // Метод для отписки от сообщений
  offMessage(callback: (data: string) => void): void {
    this.messageCallbacks = this.messageCallbacks.filter(cb => cb !== callback);
  }

  sendMessage(message: string): void {
    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      this.ws.send(message);
    }
  }

  closeWebSocket(): void {
    if (this.ws) {
      this.ws.close();
      this.ws = null;
    }
  }
}

export default Api;
