'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Plus, Edit, Trash2, Play, Square } from 'lucide-react'
import ConnectionForm from './ConnectionForm'
import { SSHConnection, SSHConnectionStatus } from '../../../shared/types'

interface ConnectionManagerProps {
  onConnect: (connectionId: string) => void
}

export default function ConnectionManager({ onConnect }: ConnectionManagerProps) {
  const [connections, setConnections] = useState<SSHConnection[]>([])
  const [showForm, setShowForm] = useState(false)
  const [editingConnection, setEditingConnection] = useState<SSHConnection | null>(null)
  const [connectionStatuses, setConnectionStatuses] = useState<Record<string, SSHConnectionStatus>>({})

  const handleSaveConnection = (connectionData: Omit<SSHConnection, 'id' | 'createdAt'>) => {
    if (editingConnection) {
      // Update existing connection
      setConnections(prev => prev.map(conn => 
        conn.id === editingConnection.id 
          ? { ...conn, ...connectionData }
          : conn
      ))
    } else {
      // Create new connection
      const newConnection: SSHConnection = {
        ...connectionData,
        id: Math.random().toString(36).substr(2, 9),
        createdAt: new Date()
      }
      setConnections(prev => [...prev, newConnection])
    }
    
    setShowForm(false)
    setEditingConnection(null)
  }

  const handleEditConnection = (connection: SSHConnection) => {
    setEditingConnection(connection)
    setShowForm(true)
  }

  const handleDeleteConnection = (connectionId: string) => {
    setConnections(prev => prev.filter(conn => conn.id !== connectionId))
    delete connectionStatuses[connectionId]
  }

  const handleConnect = (connectionId: string) => {
    onConnect(connectionId)
  }

  const handleDisconnect = (connectionId: string) => {
    // Implement disconnect logic
    console.log('Disconnecting from:', connectionId)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">SSH Connections</h2>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>New Connection</span>
        </button>
      </div>

      {showForm && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
        >
          <ConnectionForm
            connection={editingConnection}
            onSave={handleSaveConnection}
            onCancel={() => {
              setShowForm(false)
              setEditingConnection(null)
            }}
          />
        </motion.div>
      )}

      {connections.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-slate-400 text-lg mb-4">No connections configured</div>
          <p className="text-slate-500">
            Create your first SSH connection to get started
          </p>
        </div>
      ) : (
        <div className="grid gap-4">
          {connections.map((connection) => {
            const status = connectionStatuses[connection.id]
            const isConnected = status?.connected || false
            
            return (
              <motion.div
                key={connection.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6 hover:bg-slate-800/70 transition-all"
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-lg font-semibold text-white">
                        {connection.name}
                      </h3>
                      <div className={`w-2 h-2 rounded-full ${
                        isConnected ? 'bg-green-400' : 'bg-slate-500'
                      }`} />
                    </div>
                    
                    <div className="text-slate-400 text-sm space-y-1">
                      <p>{connection.username}@{connection.host}:{connection.port}</p>
                      <p>Auth: {connection.authMethod}</p>
                      {connection.lastConnected && (
                        <p>Last connected: {new Date(connection.lastConnected).toLocaleString()}</p>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    {isConnected ? (
                      <button
                        onClick={() => handleDisconnect(connection.id)}
                        className="flex items-center space-x-1 px-3 py-1 bg-red-600 hover:bg-red-700 text-white text-sm rounded-md transition-colors"
                      >
                        <Square className="w-3 h-3" />
                        <span>Disconnect</span>
                      </button>
                    ) : (
                      <button
                        onClick={() => handleConnect(connection.id)}
                        className="flex items-center space-x-1 px-3 py-1 bg-green-600 hover:bg-green-700 text-white text-sm rounded-md transition-colors"
                      >
                        <Play className="w-3 h-3" />
                        <span>Connect</span>
                      </button>
                    )}
                    
                    <button
                      onClick={() => handleEditConnection(connection)}
                      className="p-2 text-slate-400 hover:text-white transition-colors"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    
                    <button
                      onClick={() => handleDeleteConnection(connection.id)}
                      className="p-2 text-slate-400 hover:text-red-400 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
      )}
    </div>
  )
} 