'use client'

import { useState } from 'react'
import { SSHConnection } from '../../../shared/types'
import { Save, X } from 'lucide-react'

interface ConnectionFormProps {
  connection?: SSHConnection | null
  onSave: (connection: Omit<SSHConnection, 'id' | 'createdAt'>) => void
  onCancel: () => void
}

export default function ConnectionForm({ connection, onSave, onCancel }: ConnectionFormProps) {
  const [formData, setFormData] = useState({
    name: connection?.name || '',
    host: connection?.host || '',
    port: connection?.port || 22,
    username: connection?.username || '',
    authMethod: connection?.authMethod || 'password' as const,
    password: connection?.password || '',
    privateKey: connection?.privateKey || '',
    passphrase: connection?.passphrase || '',
    keepAlive: connection?.keepAlive ?? true,
    timeout: connection?.timeout || 30000
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.name.trim()) {
      newErrors.name = 'Connection name is required'
    }

    if (!formData.host.trim()) {
      newErrors.host = 'Host is required'
    }

    if (!formData.username.trim()) {
      newErrors.username = 'Username is required'
    }

    if (formData.authMethod === 'password' && !formData.password.trim()) {
      newErrors.password = 'Password is required for password authentication'
    }

    if (formData.authMethod === 'privateKey' && !formData.privateKey.trim()) {
      newErrors.privateKey = 'Private key is required for key-based authentication'
    }

    if (formData.port < 1 || formData.port > 65535) {
      newErrors.port = 'Port must be between 1 and 65535'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (validateForm()) {
      onSave({
        ...formData,
        lastConnected: connection?.lastConnected
      })
    }
  }

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }))
    }
  }

  return (
    <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-8">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-bold text-white">
            {connection ? 'Edit Connection' : 'New Connection'}
          </h3>
          <button
            type="button"
            onClick={onCancel}
            className="text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-4">
          {/* Connection Name */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Connection Name
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              className={`w-full px-3 py-2 bg-slate-700 border rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                errors.name ? 'border-red-500' : 'border-slate-600'
              }`}
              placeholder="My Server"
            />
            {errors.name && <p className="mt-1 text-sm text-red-400">{errors.name}</p>}
          </div>

          {/* Host */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Host</label>
            <input
              type="text"
              value={formData.host}
              onChange={(e) => handleInputChange('host', e.target.value)}
              className={`w-full px-3 py-2 bg-slate-700 border rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                errors.host ? 'border-red-500' : 'border-slate-600'
              }`}
              placeholder="192.168.1.100 or example.com"
            />
            {errors.host && <p className="mt-1 text-sm text-red-400">{errors.host}</p>}
          </div>

          {/* Port and Username */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Port</label>
              <input
                type="number"
                value={formData.port}
                onChange={(e) => handleInputChange('port', parseInt(e.target.value) || 22)}
                className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                min="1"
                max="65535"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Username</label>
              <input
                type="text"
                value={formData.username}
                onChange={(e) => handleInputChange('username', e.target.value)}
                className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                placeholder="root"
              />
            </div>
          </div>

          {/* Authentication Method */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Authentication Method</label>
            <select
              value={formData.authMethod}
              onChange={(e) => handleInputChange('authMethod', e.target.value)}
              className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
            >
              <option value="password">Password</option>
              <option value="privateKey">Private Key</option>
              <option value="agent">SSH Agent</option>
            </select>
          </div>

          {/* Password Authentication */}
          {formData.authMethod === 'password' && (
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Password</label>
              <input
                type="password"
                value={formData.password}
                onChange={(e) => handleInputChange('password', e.target.value)}
                className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                placeholder="Enter password"
              />
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex justify-end space-x-3 pt-6 border-t border-slate-700">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 text-sm font-medium text-slate-300 hover:text-white transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
          >
            <Save className="w-4 h-4" />
            <span>{connection ? 'Update' : 'Save'} Connection</span>
          </button>
        </div>
      </form>
    </div>
  )
} 