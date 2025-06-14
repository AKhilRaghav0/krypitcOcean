'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Plus, Edit, Trash2, Play, Square } from 'lucide-react'
import ConnectionForm from './ConnectionForm'
import { SSHConnection, SSHConnectionStatus } from '../../../shared/types'

interface ConnectionManagerProps {
  onConnect: (connectionId: string) => void
}

export default function ConnectionManager({ onConnect }: ConnectionManagerProps) {
  const [connections, setConnections] = useState<SSHConnection[]>([])
  const [connectionStatuses, setConnectionStatuses] = useState<Record<string, SSHConnectionStatus>>({})
  const [showForm, setShowForm] = useState(false)
  const [editingConnection, setEditingConnection] = useState<SSHConnection | null>(null)

  useEffect(() => {
    // Load saved connections from localStorage
    const saved = localStorage.getItem('kryptic-ocean-connections')
    if (saved) {
      try {
        const parsed = JSON.parse(saved)
        setConnections(parsed)
      } catch (error) {
        console.error('Failed to parse saved connections:', error)
      }
    }
  }, [])

  useEffect(() => {
    // Save connections to localStorage
    if (connections.length > 0) {
      localStorage.setItem('kryptic-ocean-connections', JSON.stringify(connections))
    }
  }, [connections])

  const handleSaveConnection = (connection: Omit<SSHConnection, 'id' | 'createdAt'>) => {
    const newConnection: SSHConnection = {
      ...connection,
      id: editingConnection?.id || Math.random().toString(36).substr(2, 9),
      createdAt: editingConnection?.createdAt || new Date()
    }

    if (editingConnection) {
      setConnections(prev => 
        prev.map(conn => conn.id === editingConnection.id ? newConnection : conn)
      )
    } else {
      setConnections(prev => [...prev, newConnection])
    }

    setShowForm(false)
    setEditingConnection(null)
  }

  const handleDeleteConnection = (id: string) => {
    setConnections(prev => prev.filter(conn => conn.id !== id))
    delete connectionStatuses[id]
  }

  const handleEditConnection = (connection: SSHConnection) => {
    setEditingConnection(connection)
    setShowForm(true)
  }

  const handleConnect = async (connection: SSHConnection) => {
    try {
      // Update status to connecting
      setConnectionStatuses(prev => ({
        ...prev,
        [connection.id]: {
          id: connection.id,
          connected: false,
          connecting: true
        }
      }))

      // Here you would make an API call to establish the connection
      // For now, we'll simulate it
      setTimeout(() => {
        setConnectionStatuses(prev => ({
          ...prev,
          [connection.id]: {
            id: connection.id,
            connected: true,
            connecting: false,
            uptime: 0,
            lastActivity: new Date()
          }
        }))
        onConnect(connection.id)
      }, 1000)

    } catch (error) {
      setConnectionStatuses(prev => ({
        ...prev,
        [connection.id]: {
          id: connection.id,
          connected: false,
          connecting: false,
          error: 'Failed to connect'
        }
      }))
    }
  }

  const handleDisconnect = (connectionId: string) => {
    setConnectionStatuses(prev => ({
      ...prev,
      [connectionId]: {
        id: connectionId,
        connected: false,
        connecting: false
      }
    }))
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">SSH Connections</h2>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Add Connection</span>
        </button>
      </div>

      {/* Connection Form Modal */}
      {showForm && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => {
            setShowForm(false)
            setEditingConnection(null)
          }}
        >
          <div
            className="bg-slate-800 border border-slate-700 rounded-xl p-6 w-full max-w-md"
            onClick={(e) => e.stopPropagation()}
          >
            <ConnectionForm
              connection={editingConnection}
              onSave={handleSaveConnection}
              onCancel={() => {
                setShowForm(false)
                setEditingConnection(null)
              }}
            />
          </div>
        </motion.div>
      )}

      {/* Connections Grid */}
      {connections.length === 0 ? (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-slate-700 rounded-full flex items-center justify-center mx-auto mb-4">
            <Plus className="w-8 h-8 text-slate-400" />
          </div>
          <h3 className="text-lg font-medium text-white mb-2">No connections yet</h3>
          <p className="text-slate-400 mb-4">Add your first SSH connection to get started</p>
          <button
            onClick={() => setShowForm(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors"
          >
            Add Connection
          </button>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {connections.map((connection) => {
            const status = connectionStatuses[connection.id]
            const isConnected = status?.connected
            const isConnecting = status?.connecting

            return (
              <motion.div
                key={connection.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6 hover:bg-slate-800/70 transition-all"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-white">{connection.name}</h3>
                    <p className="text-slate-400 text-sm">
                      {connection.username}@{connection.host}:{connection.port}
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => handleEditConnection(connection)}
                      className="text-slate-400 hover:text-white transition-colors"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteConnection(connection.id)}
                      className="text-slate-400 hover:text-red-400 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div
                      className={`w-2 h-2 rounded-full ${
                        isConnected
                          ? 'bg-green-500'
                          : isConnecting
                          ? 'bg-yellow-500 animate-pulse'
                          : status?.error
                          ? 'bg-red-500'
                          : 'bg-slate-500'
                      }`}
                    />
                    <span className="text-sm text-slate-400">
                      {isConnected
                        ? 'Connected'
                        : isConnecting
                        ? 'Connecting...'
                        : status?.error
                        ? 'Error'
                        : 'Disconnected'}
                    </span>
                  </div>

                  <button
                    onClick={() => 
                      isConnected 
                        ? handleDisconnect(connection.id)
                        : handleConnect(connection)
                    }
                    disabled={isConnecting}
                    className={`flex items-center space-x-1 px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                      isConnected
                        ? 'bg-red-600 hover:bg-red-700 text-white'
                        : 'bg-green-600 hover:bg-green-700 text-white'
                    } disabled:opacity-50 disabled:cursor-not-allowed`}
                  >
                    {isConnected ? (
                      <>
                        <Square className="w-3 h-3" />
                        <span>Disconnect</span>
                      </>
                    ) : (
                      <>
                        <Play className="w-3 h-3" />
                        <span>Connect</span>
                      </>
                    )}
                  </button>
                </div>

                {status?.error && (
                  <div className="mt-3 p-2 bg-red-900/20 border border-red-800 rounded text-red-400 text-sm">
                    {status.error}
                  </div>
                )}
              </motion.div>
            )
          })}
        </div>
      )}
    </div>
  )
} 

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Plus, Edit, Trash2, Play, Square } from 'lucide-react'
import ConnectionForm from './ConnectionForm'
import { SSHConnection, SSHConnectionStatus } from '../../../shared/types'

interface ConnectionManagerProps {
  onConnect: (connectionId: string) => void
}

export default function ConnectionManager({ onConnect }: ConnectionManagerProps) {
  const [connections, setConnections] = useState<SSHConnection[]>([])
  const [connectionStatuses, setConnectionStatuses] = useState<Record<string, SSHConnectionStatus>>({})
  const [showForm, setShowForm] = useState(false)
  const [editingConnection, setEditingConnection] = useState<SSHConnection | null>(null)

  useEffect(() => {
    // Load saved connections from localStorage
    const saved = localStorage.getItem('kryptic-ocean-connections')
    if (saved) {
      try {
        const parsed = JSON.parse(saved)
        setConnections(parsed)
      } catch (error) {
        console.error('Failed to parse saved connections:', error)
      }
    }
  }, [])

  useEffect(() => {
    // Save connections to localStorage
    if (connections.length > 0) {
      localStorage.setItem('kryptic-ocean-connections', JSON.stringify(connections))
    }
  }, [connections])

  const handleSaveConnection = (connection: Omit<SSHConnection, 'id' | 'createdAt'>) => {
    const newConnection: SSHConnection = {
      ...connection,
      id: editingConnection?.id || Math.random().toString(36).substr(2, 9),
      createdAt: editingConnection?.createdAt || new Date()
    }

    if (editingConnection) {
      setConnections(prev => 
        prev.map(conn => conn.id === editingConnection.id ? newConnection : conn)
      )
    } else {
      setConnections(prev => [...prev, newConnection])
    }

    setShowForm(false)
    setEditingConnection(null)
  }

  const handleDeleteConnection = (id: string) => {
    setConnections(prev => prev.filter(conn => conn.id !== id))
    delete connectionStatuses[id]
  }

  const handleEditConnection = (connection: SSHConnection) => {
    setEditingConnection(connection)
    setShowForm(true)
  }

  const handleConnect = async (connection: SSHConnection) => {
    try {
      // Update status to connecting
      setConnectionStatuses(prev => ({
        ...prev,
        [connection.id]: {
          id: connection.id,
          connected: false,
          connecting: true
        }
      }))

      // Here you would make an API call to establish the connection
      // For now, we'll simulate it
      setTimeout(() => {
        setConnectionStatuses(prev => ({
          ...prev,
          [connection.id]: {
            id: connection.id,
            connected: true,
            connecting: false,
            uptime: 0,
            lastActivity: new Date()
          }
        }))
        onConnect(connection.id)
      }, 1000)

    } catch (error) {
      setConnectionStatuses(prev => ({
        ...prev,
        [connection.id]: {
          id: connection.id,
          connected: false,
          connecting: false,
          error: 'Failed to connect'
        }
      }))
    }
  }

  const handleDisconnect = (connectionId: string) => {
    setConnectionStatuses(prev => ({
      ...prev,
      [connectionId]: {
        id: connectionId,
        connected: false,
        connecting: false
      }
    }))
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">SSH Connections</h2>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Add Connection</span>
        </button>
      </div>

      {/* Connection Form Modal */}
      {showForm && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => {
            setShowForm(false)
            setEditingConnection(null)
          }}
        >
          <div
            className="bg-slate-800 border border-slate-700 rounded-xl p-6 w-full max-w-md"
            onClick={(e) => e.stopPropagation()}
          >
            <ConnectionForm
              connection={editingConnection}
              onSave={handleSaveConnection}
              onCancel={() => {
                setShowForm(false)
                setEditingConnection(null)
              }}
            />
          </div>
        </motion.div>
      )}

      {/* Connections Grid */}
      {connections.length === 0 ? (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-slate-700 rounded-full flex items-center justify-center mx-auto mb-4">
            <Plus className="w-8 h-8 text-slate-400" />
          </div>
          <h3 className="text-lg font-medium text-white mb-2">No connections yet</h3>
          <p className="text-slate-400 mb-4">Add your first SSH connection to get started</p>
          <button
            onClick={() => setShowForm(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors"
          >
            Add Connection
          </button>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {connections.map((connection) => {
            const status = connectionStatuses[connection.id]
            const isConnected = status?.connected
            const isConnecting = status?.connecting

            return (
              <motion.div
                key={connection.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6 hover:bg-slate-800/70 transition-all"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-white">{connection.name}</h3>
                    <p className="text-slate-400 text-sm">
                      {connection.username}@{connection.host}:{connection.port}
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => handleEditConnection(connection)}
                      className="text-slate-400 hover:text-white transition-colors"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteConnection(connection.id)}
                      className="text-slate-400 hover:text-red-400 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div
                      className={`w-2 h-2 rounded-full ${
                        isConnected
                          ? 'bg-green-500'
                          : isConnecting
                          ? 'bg-yellow-500 animate-pulse'
                          : status?.error
                          ? 'bg-red-500'
                          : 'bg-slate-500'
                      }`}
                    />
                    <span className="text-sm text-slate-400">
                      {isConnected
                        ? 'Connected'
                        : isConnecting
                        ? 'Connecting...'
                        : status?.error
                        ? 'Error'
                        : 'Disconnected'}
                    </span>
                  </div>

                  <button
                    onClick={() => 
                      isConnected 
                        ? handleDisconnect(connection.id)
                        : handleConnect(connection)
                    }
                    disabled={isConnecting}
                    className={`flex items-center space-x-1 px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                      isConnected
                        ? 'bg-red-600 hover:bg-red-700 text-white'
                        : 'bg-green-600 hover:bg-green-700 text-white'
                    } disabled:opacity-50 disabled:cursor-not-allowed`}
                  >
                    {isConnected ? (
                      <>
                        <Square className="w-3 h-3" />
                        <span>Disconnect</span>
                      </>
                    ) : (
                      <>
                        <Play className="w-3 h-3" />
                        <span>Connect</span>
                      </>
                    )}
                  </button>
                </div>

                {status?.error && (
                  <div className="mt-3 p-2 bg-red-900/20 border border-red-800 rounded text-red-400 text-sm">
                    {status.error}
                  </div>
                )}
              </motion.div>
            )
          })}
        </div>
      )}
    </div>
  )
} 

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Plus, Edit, Trash2, Play, Square } from 'lucide-react'
import ConnectionForm from './ConnectionForm'
import { SSHConnection, SSHConnectionStatus } from '../../../shared/types'

interface ConnectionManagerProps {
  onConnect: (connectionId: string) => void
}

export default function ConnectionManager({ onConnect }: ConnectionManagerProps) {
  const [connections, setConnections] = useState<SSHConnection[]>([])
  const [connectionStatuses, setConnectionStatuses] = useState<Record<string, SSHConnectionStatus>>({})
  const [showForm, setShowForm] = useState(false)
  const [editingConnection, setEditingConnection] = useState<SSHConnection | null>(null)

  useEffect(() => {
    // Load saved connections from localStorage
    const saved = localStorage.getItem('kryptic-ocean-connections')
    if (saved) {
      try {
        const parsed = JSON.parse(saved)
        setConnections(parsed)
      } catch (error) {
        console.error('Failed to parse saved connections:', error)
      }
    }
  }, [])

  useEffect(() => {
    // Save connections to localStorage
    if (connections.length > 0) {
      localStorage.setItem('kryptic-ocean-connections', JSON.stringify(connections))
    }
  }, [connections])

  const handleSaveConnection = (connection: Omit<SSHConnection, 'id' | 'createdAt'>) => {
    const newConnection: SSHConnection = {
      ...connection,
      id: editingConnection?.id || Math.random().toString(36).substr(2, 9),
      createdAt: editingConnection?.createdAt || new Date()
    }

    if (editingConnection) {
      setConnections(prev => 
        prev.map(conn => conn.id === editingConnection.id ? newConnection : conn)
      )
    } else {
      setConnections(prev => [...prev, newConnection])
    }

    setShowForm(false)
    setEditingConnection(null)
  }

  const handleDeleteConnection = (id: string) => {
    setConnections(prev => prev.filter(conn => conn.id !== id))
    delete connectionStatuses[id]
  }

  const handleEditConnection = (connection: SSHConnection) => {
    setEditingConnection(connection)
    setShowForm(true)
  }

  const handleConnect = async (connection: SSHConnection) => {
    try {
      // Update status to connecting
      setConnectionStatuses(prev => ({
        ...prev,
        [connection.id]: {
          id: connection.id,
          connected: false,
          connecting: true
        }
      }))

      // Here you would make an API call to establish the connection
      // For now, we'll simulate it
      setTimeout(() => {
        setConnectionStatuses(prev => ({
          ...prev,
          [connection.id]: {
            id: connection.id,
            connected: true,
            connecting: false,
            uptime: 0,
            lastActivity: new Date()
          }
        }))
        onConnect(connection.id)
      }, 1000)

    } catch (error) {
      setConnectionStatuses(prev => ({
        ...prev,
        [connection.id]: {
          id: connection.id,
          connected: false,
          connecting: false,
          error: 'Failed to connect'
        }
      }))
    }
  }

  const handleDisconnect = (connectionId: string) => {
    setConnectionStatuses(prev => ({
      ...prev,
      [connectionId]: {
        id: connectionId,
        connected: false,
        connecting: false
      }
    }))
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">SSH Connections</h2>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Add Connection</span>
        </button>
      </div>

      {/* Connection Form Modal */}
      {showForm && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => {
            setShowForm(false)
            setEditingConnection(null)
          }}
        >
          <div
            className="bg-slate-800 border border-slate-700 rounded-xl p-6 w-full max-w-md"
            onClick={(e) => e.stopPropagation()}
          >
            <ConnectionForm
              connection={editingConnection}
              onSave={handleSaveConnection}
              onCancel={() => {
                setShowForm(false)
                setEditingConnection(null)
              }}
            />
          </div>
        </motion.div>
      )}

      {/* Connections Grid */}
      {connections.length === 0 ? (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-slate-700 rounded-full flex items-center justify-center mx-auto mb-4">
            <Plus className="w-8 h-8 text-slate-400" />
          </div>
          <h3 className="text-lg font-medium text-white mb-2">No connections yet</h3>
          <p className="text-slate-400 mb-4">Add your first SSH connection to get started</p>
          <button
            onClick={() => setShowForm(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors"
          >
            Add Connection
          </button>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {connections.map((connection) => {
            const status = connectionStatuses[connection.id]
            const isConnected = status?.connected
            const isConnecting = status?.connecting

            return (
              <motion.div
                key={connection.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6 hover:bg-slate-800/70 transition-all"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-white">{connection.name}</h3>
                    <p className="text-slate-400 text-sm">
                      {connection.username}@{connection.host}:{connection.port}
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => handleEditConnection(connection)}
                      className="text-slate-400 hover:text-white transition-colors"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteConnection(connection.id)}
                      className="text-slate-400 hover:text-red-400 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div
                      className={`w-2 h-2 rounded-full ${
                        isConnected
                          ? 'bg-green-500'
                          : isConnecting
                          ? 'bg-yellow-500 animate-pulse'
                          : status?.error
                          ? 'bg-red-500'
                          : 'bg-slate-500'
                      }`}
                    />
                    <span className="text-sm text-slate-400">
                      {isConnected
                        ? 'Connected'
                        : isConnecting
                        ? 'Connecting...'
                        : status?.error
                        ? 'Error'
                        : 'Disconnected'}
                    </span>
                  </div>

                  <button
                    onClick={() => 
                      isConnected 
                        ? handleDisconnect(connection.id)
                        : handleConnect(connection)
                    }
                    disabled={isConnecting}
                    className={`flex items-center space-x-1 px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                      isConnected
                        ? 'bg-red-600 hover:bg-red-700 text-white'
                        : 'bg-green-600 hover:bg-green-700 text-white'
                    } disabled:opacity-50 disabled:cursor-not-allowed`}
                  >
                    {isConnected ? (
                      <>
                        <Square className="w-3 h-3" />
                        <span>Disconnect</span>
                      </>
                    ) : (
                      <>
                        <Play className="w-3 h-3" />
                        <span>Connect</span>
                      </>
                    )}
                  </button>
                </div>

                {status?.error && (
                  <div className="mt-3 p-2 bg-red-900/20 border border-red-800 rounded text-red-400 text-sm">
                    {status.error}
                  </div>
                )}
              </motion.div>
            )
          })}
        </div>
      )}
    </div>
  )
} 