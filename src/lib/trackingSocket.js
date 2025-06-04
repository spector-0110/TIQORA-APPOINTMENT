import { io } from 'socket.io-client';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

class TrackingSocket {
  constructor() {
    this.socket = null;
    this.listeners = new Map();
  }

  connect() {
    if (!this.socket) {
      this.socket = io(BASE_URL, {
        reconnectionDelay: 1000,
        reconnection: true,
        reconnectionAttempts: 10,
        transports: ['websocket'],
        agent: false,
        upgrade: false,
        rejectUnauthorized: false
      });

      this.setupBaseHandlers();
    }
    return this.socket;
  }

  setupBaseHandlers() {
    this.socket.on('connect', () => {
      console.log('Connected to tracking socket');
    });

    this.socket.on('disconnect', () => {
      console.log('Disconnected from tracking socket');
    });

    this.socket.on('error', (error) => {
      console.error('Socket error:', error);
      console.debug('Error details:', JSON.stringify(error, null, 2));
      this.notifyListeners('error', error);
    });

    this.socket.on('queue-update', (queueInfo) => {
      console.log('Received queue update:', JSON.stringify(queueInfo, null, 2));
      this.notifyListeners('update', queueInfo);
    });
  }

  startTracking(token) {
    const socket = this.connect();
    socket.emit('track-queue', { token });
  }

  stopTracking() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }
  }

  addListener(type, callback) {
    if (!this.listeners.has(type)) {
      this.listeners.set(type, new Set());
    }
    this.listeners.get(type).add(callback);
  }

  removeListener(type, callback) {
    if (this.listeners.has(type)) {
      this.listeners.get(type).delete(callback);
    }
  }

  notifyListeners(type, data) {
    if (this.listeners.has(type)) {
      this.listeners.get(type).forEach(callback => callback(data));
    }
  }
}

// Create a singleton instance
const trackingSocket = new TrackingSocket();
export default trackingSocket;
