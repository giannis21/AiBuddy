import io from 'socket.io-client';
import {store} from '../redux/store';
import {BASE_URL} from '../utils/Constants';

class SocketSingleton {
  static instance = null;

  constructor() {
    if (SocketSingleton.instance) {
      return SocketSingleton.instance;
    }

    //this.token = token;
    this.socket = null;
    this.isConnected = false;

    SocketSingleton.instance = this;
  }
  getIsConnected() {
    return this.isConnected;
  }

  initializeSocket() {
    if (!this.socket) {
      this.socket = io(BASE_URL, {
        transports: ['websocket'],
        secure: true,
        reconnection: true,
        reconnectionAttempts: Infinity,
        reconnectionDelay: 1000,
        reconnectionDelayMax: 5000,
        timeout: 20000,
      });

      // Socket event listeners
      this.socket.on('connect', this.onConnect);
      this.socket.on('disconnect', this.onDisconnect);
    }
  }

  onConnect = () => {
    console.log('Socket connected with ID:', this.socket.id);
    this.isConnected = true;
    // Emit event to notify server about user connection
  };

  onReconnect = () => {
    console.log('Reconnected to socket');
  };

  onDisconnect = () => {
    this.isConnected = false;
    console.log('Disconnected from socket');
  };

  onError = error => {
    console.error('Socket error:', error);
  };

  getSocket() {
    return this.socket;
  }

  closeSocket() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }

    // Unsubscribe from the store when socket is closed
    if (this.unsubscribe) {
      this.unsubscribe();
    }
  }
  static destroyInstance() {
    if (SocketSingleton.instance) {
      SocketSingleton.instance.closeSocket(); // Close socket connection
      SocketSingleton.instance = null; // Reset singleton instance
    }
  }
}

export default SocketSingleton;
