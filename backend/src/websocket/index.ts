import { Server, Socket } from 'socket.io';
import { SSHService } from '../services/sshService';
import { TerminalService } from '../services/terminalService';
import { FileService } from '../services/fileService';
import { 
  TerminalMessage, 
  SSHCommandRequest, 
  FileTransferRequest 
} from '../../../shared/types';

const sshService = new SSHService();
const terminalService = new TerminalService();
const fileService = new FileService();

export function setupWebSocketHandlers(io: Server) {
  io.on('connection', (socket: Socket) => {
    console.log(`🔌 Client connected: ${socket.id}`);

    // Terminal events
    socket.on('terminal:create', async (data) => {
      try {
        const session = await terminalService.createSession(data.connectionId, data.cols, data.rows);
        socket.join(`terminal:${session.id}`);
        socket.emit('terminal:created', { success: true, session });
      } catch (error) {
        socket.emit('terminal:error', { success: false, error: (error as Error).message });
      }
    });

    socket.on('terminal:data', async (message: TerminalMessage) => {
      try {
        await terminalService.sendData(message.sessionId, message.data || '');
      } catch (error) {
        socket.emit('terminal:error', { success: false, error: (error as Error).message });
      }
    });

    socket.on('terminal:resize', async (message: TerminalMessage) => {
      try {
        await terminalService.resize(message.sessionId, message.cols || 80, message.rows || 24);
      } catch (error) {
        socket.emit('terminal:error', { success: false, error: (error as Error).message });
      }
    });

    // SSH command execution
    socket.on('ssh:execute', async (request: SSHCommandRequest) => {
      try {
        const result = await sshService.executeCommand(request.connectionId, request.command);
        socket.emit('ssh:result', { success: true, result });
      } catch (error) {
        socket.emit('ssh:error', { success: false, error: (error as Error).message });
      }
    });

    // File transfer events
    socket.on('file:transfer', async (request: FileTransferRequest) => {
      try {
        const transferId = await fileService.startTransfer(request);
        socket.emit('file:transfer:started', { success: true, transferId });
      } catch (error) {
        socket.emit('file:transfer:error', { success: false, error: (error as Error).message });
      }
    });

    // Connection status
    socket.on('ssh:status', async (connectionId: string) => {
      try {
        const status = await sshService.getConnectionStatus(connectionId);
        socket.emit('ssh:status:update', { success: true, status });
      } catch (error) {
        socket.emit('ssh:error', { success: false, error: (error as Error).message });
      }
    });

    // Disconnect handler
    socket.on('disconnect', () => {
      console.log(`🔌 Client disconnected: ${socket.id}`);
      // Clean up any resources associated with this socket
      terminalService.cleanupSocketSessions(socket.id);
    });

    // Error handler
    socket.on('error', (error) => {
      console.error(`🚨 Socket error for ${socket.id}:`, error);
    });
  });

  // Broadcast system events
  setInterval(() => {
    io.emit('system:heartbeat', { 
      timestamp: new Date().toISOString(),
      connectedClients: io.sockets.sockets.size
    });
  }, 30000); // Every 30 seconds
} 
import { SSHService } from '../services/sshService';
import { TerminalService } from '../services/terminalService';
import { FileService } from '../services/fileService';
import { 
  TerminalMessage, 
  SSHCommandRequest, 
  FileTransferRequest 
} from '../../../shared/types';

const sshService = new SSHService();
const terminalService = new TerminalService();
const fileService = new FileService();

export function setupWebSocketHandlers(io: Server) {
  io.on('connection', (socket: Socket) => {
    console.log(`🔌 Client connected: ${socket.id}`);

    // Terminal events
    socket.on('terminal:create', async (data) => {
      try {
        const session = await terminalService.createSession(data.connectionId, data.cols, data.rows);
        socket.join(`terminal:${session.id}`);
        socket.emit('terminal:created', { success: true, session });
      } catch (error) {
        socket.emit('terminal:error', { success: false, error: (error as Error).message });
      }
    });

    socket.on('terminal:data', async (message: TerminalMessage) => {
      try {
        await terminalService.sendData(message.sessionId, message.data || '');
      } catch (error) {
        socket.emit('terminal:error', { success: false, error: (error as Error).message });
      }
    });

    socket.on('terminal:resize', async (message: TerminalMessage) => {
      try {
        await terminalService.resize(message.sessionId, message.cols || 80, message.rows || 24);
      } catch (error) {
        socket.emit('terminal:error', { success: false, error: (error as Error).message });
      }
    });

    // SSH command execution
    socket.on('ssh:execute', async (request: SSHCommandRequest) => {
      try {
        const result = await sshService.executeCommand(request.connectionId, request.command);
        socket.emit('ssh:result', { success: true, result });
      } catch (error) {
        socket.emit('ssh:error', { success: false, error: (error as Error).message });
      }
    });

    // File transfer events
    socket.on('file:transfer', async (request: FileTransferRequest) => {
      try {
        const transferId = await fileService.startTransfer(request);
        socket.emit('file:transfer:started', { success: true, transferId });
      } catch (error) {
        socket.emit('file:transfer:error', { success: false, error: (error as Error).message });
      }
    });

    // Connection status
    socket.on('ssh:status', async (connectionId: string) => {
      try {
        const status = await sshService.getConnectionStatus(connectionId);
        socket.emit('ssh:status:update', { success: true, status });
      } catch (error) {
        socket.emit('ssh:error', { success: false, error: (error as Error).message });
      }
    });

    // Disconnect handler
    socket.on('disconnect', () => {
      console.log(`🔌 Client disconnected: ${socket.id}`);
      // Clean up any resources associated with this socket
      terminalService.cleanupSocketSessions(socket.id);
    });

    // Error handler
    socket.on('error', (error) => {
      console.error(`🚨 Socket error for ${socket.id}:`, error);
    });
  });

  // Broadcast system events
  setInterval(() => {
    io.emit('system:heartbeat', { 
      timestamp: new Date().toISOString(),
      connectedClients: io.sockets.sockets.size
    });
  }, 30000); // Every 30 seconds
} 
import { SSHService } from '../services/sshService';
import { TerminalService } from '../services/terminalService';
import { FileService } from '../services/fileService';
import { 
  TerminalMessage, 
  SSHCommandRequest, 
  FileTransferRequest 
} from '../../../shared/types';

const sshService = new SSHService();
const terminalService = new TerminalService();
const fileService = new FileService();

export function setupWebSocketHandlers(io: Server) {
  io.on('connection', (socket: Socket) => {
    console.log(`🔌 Client connected: ${socket.id}`);

    // Terminal events
    socket.on('terminal:create', async (data) => {
      try {
        const session = await terminalService.createSession(data.connectionId, data.cols, data.rows);
        socket.join(`terminal:${session.id}`);
        socket.emit('terminal:created', { success: true, session });
      } catch (error) {
        socket.emit('terminal:error', { success: false, error: (error as Error).message });
      }
    });

    socket.on('terminal:data', async (message: TerminalMessage) => {
      try {
        await terminalService.sendData(message.sessionId, message.data || '');
      } catch (error) {
        socket.emit('terminal:error', { success: false, error: (error as Error).message });
      }
    });

    socket.on('terminal:resize', async (message: TerminalMessage) => {
      try {
        await terminalService.resize(message.sessionId, message.cols || 80, message.rows || 24);
      } catch (error) {
        socket.emit('terminal:error', { success: false, error: (error as Error).message });
      }
    });

    // SSH command execution
    socket.on('ssh:execute', async (request: SSHCommandRequest) => {
      try {
        const result = await sshService.executeCommand(request.connectionId, request.command);
        socket.emit('ssh:result', { success: true, result });
      } catch (error) {
        socket.emit('ssh:error', { success: false, error: (error as Error).message });
      }
    });

    // File transfer events
    socket.on('file:transfer', async (request: FileTransferRequest) => {
      try {
        const transferId = await fileService.startTransfer(request);
        socket.emit('file:transfer:started', { success: true, transferId });
      } catch (error) {
        socket.emit('file:transfer:error', { success: false, error: (error as Error).message });
      }
    });

    // Connection status
    socket.on('ssh:status', async (connectionId: string) => {
      try {
        const status = await sshService.getConnectionStatus(connectionId);
        socket.emit('ssh:status:update', { success: true, status });
      } catch (error) {
        socket.emit('ssh:error', { success: false, error: (error as Error).message });
      }
    });

    // Disconnect handler
    socket.on('disconnect', () => {
      console.log(`🔌 Client disconnected: ${socket.id}`);
      // Clean up any resources associated with this socket
      terminalService.cleanupSocketSessions(socket.id);
    });

    // Error handler
    socket.on('error', (error) => {
      console.error(`🚨 Socket error for ${socket.id}:`, error);
    });
  });

  // Broadcast system events
  setInterval(() => {
    io.emit('system:heartbeat', { 
      timestamp: new Date().toISOString(),
      connectedClients: io.sockets.sockets.size
    });
  }, 30000); // Every 30 seconds
} 