// SSH Connection Types
export interface SSHConnection {
  id: string;
  name: string;
  host: string;
  port: number;
  username: string;
  authMethod: 'password' | 'privateKey' | 'agent';
  password?: string;
  privateKey?: string;
  passphrase?: string;
  keepAlive?: boolean;
  timeout?: number;
  createdAt: Date;
  lastConnected?: Date;
}

export interface SSHConnectionStatus {
  id: string;
  connected: boolean;
  connecting: boolean;
  error?: string;
  uptime?: number;
  lastActivity?: Date;
}

// Terminal Types
export interface TerminalSession {
  id: string;
  connectionId: string;
  cols: number;
  rows: number;
  shell: string;
  workingDirectory: string;
  createdAt: Date;
}

export interface TerminalMessage {
  type: 'data' | 'resize' | 'close' | 'error';
  sessionId: string;
  data?: string;
  cols?: number;
  rows?: number;
  error?: string;
}

// File Transfer Types
export interface FileSystemItem {
  name: string;
  path: string;
  type: 'file' | 'directory' | 'symlink';
  size: number;
  permissions: string;
  owner: string;
  group: string;
  modified: Date;
  isHidden: boolean;
}

export interface FileTransferRequest {
  connectionId: string;
  localPath: string;
  remotePath: string;
  direction: 'upload' | 'download';
  overwrite?: boolean;
}

export interface FileTransferProgress {
  id: string;
  filename: string;
  transferred: number;
  total: number;
  speed: number;
  eta: number;
  status: 'pending' | 'transferring' | 'completed' | 'failed' | 'cancelled';
  error?: string;
}

// Authentication Types
export interface User {
  id: string;
  username: string;
  email: string;
  role: 'admin' | 'user';
  createdAt: Date;
  lastLogin?: Date;
}

export interface AuthResponse {
  token: string;
  user: User;
  expiresIn: number;
}

// Configuration Types
export interface AppConfig {
  theme: 'light' | 'dark' | 'auto';
  terminal: {
    fontSize: number;
    fontFamily: string;
    cursorStyle: 'block' | 'underline' | 'bar';
    cursorBlink: boolean;
    scrollback: number;
  };
  security: {
    sessionTimeout: number;
    autoLock: boolean;
    rememberConnections: boolean;
  };
  notifications: {
    enabled: boolean;
    sound: boolean;
    desktop: boolean;
  };
}

// WebSocket Event Types
export interface WSEvent {
  type: string;
  payload: any;
  timestamp: Date;
}

export interface SSHCommandRequest {
  connectionId: string;
  command: string;
  timeout?: number;
}

export interface SSHCommandResponse {
  stdout: string;
  stderr: string;
  exitCode: number;
  duration: number;
}

// API Response Types
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// Monitoring Types
export interface SystemStats {
  cpu: {
    usage: number;
    cores: number;
  };
  memory: {
    used: number;
    total: number;
    percentage: number;
  };
  disk: {
    used: number;
    total: number;
    percentage: number;
  };
  network: {
    bytesIn: number;
    bytesOut: number;
  };
  uptime: number;
  timestamp: Date;
}

export interface ConnectionMetrics {
  connectionId: string;
  bytesTransferred: number;
  commandsExecuted: number;
  sessionsActive: number;
  lastActivity: Date;
  averageLatency: number;
} 
export interface SSHConnection {
  id: string;
  name: string;
  host: string;
  port: number;
  username: string;
  authMethod: 'password' | 'privateKey' | 'agent';
  password?: string;
  privateKey?: string;
  passphrase?: string;
  keepAlive?: boolean;
  timeout?: number;
  createdAt: Date;
  lastConnected?: Date;
}

export interface SSHConnectionStatus {
  id: string;
  connected: boolean;
  connecting: boolean;
  error?: string;
  uptime?: number;
  lastActivity?: Date;
}

// Terminal Types
export interface TerminalSession {
  id: string;
  connectionId: string;
  cols: number;
  rows: number;
  shell: string;
  workingDirectory: string;
  createdAt: Date;
}

export interface TerminalMessage {
  type: 'data' | 'resize' | 'close' | 'error';
  sessionId: string;
  data?: string;
  cols?: number;
  rows?: number;
  error?: string;
}

// File Transfer Types
export interface FileSystemItem {
  name: string;
  path: string;
  type: 'file' | 'directory' | 'symlink';
  size: number;
  permissions: string;
  owner: string;
  group: string;
  modified: Date;
  isHidden: boolean;
}

export interface FileTransferRequest {
  connectionId: string;
  localPath: string;
  remotePath: string;
  direction: 'upload' | 'download';
  overwrite?: boolean;
}

export interface FileTransferProgress {
  id: string;
  filename: string;
  transferred: number;
  total: number;
  speed: number;
  eta: number;
  status: 'pending' | 'transferring' | 'completed' | 'failed' | 'cancelled';
  error?: string;
}

// Authentication Types
export interface User {
  id: string;
  username: string;
  email: string;
  role: 'admin' | 'user';
  createdAt: Date;
  lastLogin?: Date;
}

export interface AuthResponse {
  token: string;
  user: User;
  expiresIn: number;
}

// Configuration Types
export interface AppConfig {
  theme: 'light' | 'dark' | 'auto';
  terminal: {
    fontSize: number;
    fontFamily: string;
    cursorStyle: 'block' | 'underline' | 'bar';
    cursorBlink: boolean;
    scrollback: number;
  };
  security: {
    sessionTimeout: number;
    autoLock: boolean;
    rememberConnections: boolean;
  };
  notifications: {
    enabled: boolean;
    sound: boolean;
    desktop: boolean;
  };
}

// WebSocket Event Types
export interface WSEvent {
  type: string;
  payload: any;
  timestamp: Date;
}

export interface SSHCommandRequest {
  connectionId: string;
  command: string;
  timeout?: number;
}

export interface SSHCommandResponse {
  stdout: string;
  stderr: string;
  exitCode: number;
  duration: number;
}

// API Response Types
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// Monitoring Types
export interface SystemStats {
  cpu: {
    usage: number;
    cores: number;
  };
  memory: {
    used: number;
    total: number;
    percentage: number;
  };
  disk: {
    used: number;
    total: number;
    percentage: number;
  };
  network: {
    bytesIn: number;
    bytesOut: number;
  };
  uptime: number;
  timestamp: Date;
}

export interface ConnectionMetrics {
  connectionId: string;
  bytesTransferred: number;
  commandsExecuted: number;
  sessionsActive: number;
  lastActivity: Date;
  averageLatency: number;
} 
export interface SSHConnection {
  id: string;
  name: string;
  host: string;
  port: number;
  username: string;
  authMethod: 'password' | 'privateKey' | 'agent';
  password?: string;
  privateKey?: string;
  passphrase?: string;
  keepAlive?: boolean;
  timeout?: number;
  createdAt: Date;
  lastConnected?: Date;
}

export interface SSHConnectionStatus {
  id: string;
  connected: boolean;
  connecting: boolean;
  error?: string;
  uptime?: number;
  lastActivity?: Date;
}

// Terminal Types
export interface TerminalSession {
  id: string;
  connectionId: string;
  cols: number;
  rows: number;
  shell: string;
  workingDirectory: string;
  createdAt: Date;
}

export interface TerminalMessage {
  type: 'data' | 'resize' | 'close' | 'error';
  sessionId: string;
  data?: string;
  cols?: number;
  rows?: number;
  error?: string;
}

// File Transfer Types
export interface FileSystemItem {
  name: string;
  path: string;
  type: 'file' | 'directory' | 'symlink';
  size: number;
  permissions: string;
  owner: string;
  group: string;
  modified: Date;
  isHidden: boolean;
}

export interface FileTransferRequest {
  connectionId: string;
  localPath: string;
  remotePath: string;
  direction: 'upload' | 'download';
  overwrite?: boolean;
}

export interface FileTransferProgress {
  id: string;
  filename: string;
  transferred: number;
  total: number;
  speed: number;
  eta: number;
  status: 'pending' | 'transferring' | 'completed' | 'failed' | 'cancelled';
  error?: string;
}

// Authentication Types
export interface User {
  id: string;
  username: string;
  email: string;
  role: 'admin' | 'user';
  createdAt: Date;
  lastLogin?: Date;
}

export interface AuthResponse {
  token: string;
  user: User;
  expiresIn: number;
}

// Configuration Types
export interface AppConfig {
  theme: 'light' | 'dark' | 'auto';
  terminal: {
    fontSize: number;
    fontFamily: string;
    cursorStyle: 'block' | 'underline' | 'bar';
    cursorBlink: boolean;
    scrollback: number;
  };
  security: {
    sessionTimeout: number;
    autoLock: boolean;
    rememberConnections: boolean;
  };
  notifications: {
    enabled: boolean;
    sound: boolean;
    desktop: boolean;
  };
}

// WebSocket Event Types
export interface WSEvent {
  type: string;
  payload: any;
  timestamp: Date;
}

export interface SSHCommandRequest {
  connectionId: string;
  command: string;
  timeout?: number;
}

export interface SSHCommandResponse {
  stdout: string;
  stderr: string;
  exitCode: number;
  duration: number;
}

// API Response Types
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// Monitoring Types
export interface SystemStats {
  cpu: {
    usage: number;
    cores: number;
  };
  memory: {
    used: number;
    total: number;
    percentage: number;
  };
  disk: {
    used: number;
    total: number;
    percentage: number;
  };
  network: {
    bytesIn: number;
    bytesOut: number;
  };
  uptime: number;
  timestamp: Date;
}

export interface ConnectionMetrics {
  connectionId: string;
  bytesTransferred: number;
  commandsExecuted: number;
  sessionsActive: number;
  lastActivity: Date;
  averageLatency: number;
} 