'use client'

import { useState } from 'react'
import { Folder, File, Download, Upload, Trash2 } from 'lucide-react'

interface FileManagerProps {
  connectionId: string | null
}

export default function FileManager({ connectionId }: FileManagerProps) {
  const [currentPath, setCurrentPath] = useState('/')
  
  // Mock file data - in real implementation, this would come from the server
  const mockFiles = [
    { name: '..', type: 'directory', size: 0, permissions: 'drwxr-xr-x' },
    { name: 'home', type: 'directory', size: 4096, permissions: 'drwxr-xr-x' },
    { name: 'var', type: 'directory', size: 4096, permissions: 'drwxr-xr-x' },
    { name: 'etc', type: 'directory', size: 4096, permissions: 'drwxr-xr-x' },
    { name: 'usr', type: 'directory', size: 4096, permissions: 'drwxr-xr-x' },
    { name: 'boot.log', type: 'file', size: 2048, permissions: '-rw-r--r--' },
    { name: 'README.txt', type: 'file', size: 1024, permissions: '-rw-r--r--' }
  ]

  if (!connectionId) {
    return (
      <div className="flex items-center justify-center h-96 bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl">
        <div className="text-center">
          <div className="w-16 h-16 bg-slate-700 rounded-full flex items-center justify-center mx-auto mb-4">
            <Folder className="w-8 h-8 text-slate-400" />
          </div>
          <h3 className="text-lg font-medium text-white mb-2">No Connection Selected</h3>
          <p className="text-slate-400">Select a connection to browse files</p>
        </div>
      </div>
    )
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '-'
    const sizes = ['B', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(1024))
    return Math.round(bytes / Math.pow(1024, i) * 100) / 100 + ' ' + sizes[i]
  }

  return (
    <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl overflow-hidden">
      {/* Header */}
      <div className="bg-slate-800 px-4 py-3 border-b border-slate-700">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Folder className="w-5 h-5 text-slate-400" />
            <div>
              <h3 className="text-lg font-semibold text-white">File Manager</h3>
              <p className="text-sm text-slate-400">{currentPath}</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <button className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-md text-sm transition-colors">
              <Upload className="w-4 h-4" />
              <span>Upload</span>
            </button>
            <button className="flex items-center space-x-2 bg-slate-700 hover:bg-slate-600 text-white px-3 py-1.5 rounded-md text-sm transition-colors">
              <Download className="w-4 h-4" />
              <span>Download</span>
            </button>
          </div>
        </div>
      </div>

      {/* File List */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-slate-700/50">
            <tr>
              <th className="text-left py-3 px-4 font-medium text-slate-300">Name</th>
              <th className="text-left py-3 px-4 font-medium text-slate-300">Size</th>
              <th className="text-left py-3 px-4 font-medium text-slate-300">Permissions</th>
              <th className="text-left py-3 px-4 font-medium text-slate-300">Actions</th>
            </tr>
          </thead>
          <tbody>
            {mockFiles.map((file, index) => (
              <tr 
                key={index}
                className="border-b border-slate-700/50 hover:bg-slate-700/25 transition-colors"
              >
                <td className="py-3 px-4">
                  <div className="flex items-center space-x-3">
                    {file.type === 'directory' ? (
                      <Folder className="w-4 h-4 text-blue-400" />
                    ) : (
                      <File className="w-4 h-4 text-slate-400" />
                    )}
                    <span className="text-white font-medium">{file.name}</span>
                  </div>
                </td>
                <td className="py-3 px-4 text-slate-400">
                  {formatFileSize(file.size)}
                </td>
                <td className="py-3 px-4">
                  <code className="text-sm text-slate-300 bg-slate-900/50 px-2 py-1 rounded">
                    {file.permissions}
                  </code>
                </td>
                <td className="py-3 px-4">
                  <div className="flex items-center space-x-2">
                    {file.type === 'file' && (
                      <>
                        <button className="text-slate-400 hover:text-blue-400 transition-colors">
                          <Download className="w-4 h-4" />
                        </button>
                        <button className="text-slate-400 hover:text-red-400 transition-colors">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Status Bar */}
      <div className="bg-slate-800 px-4 py-2 border-t border-slate-700">
        <div className="flex items-center justify-between text-sm">
          <span className="text-slate-400">
            {mockFiles.filter(f => f.type === 'directory').length - 1} folders, {mockFiles.filter(f => f.type === 'file').length} files
          </span>
          <span className="text-slate-400">
            Connection: {connectionId}
          </span>
        </div>
      </div>
    </div>
  )
} 

import { useState } from 'react'
import { Folder, File, Download, Upload, Trash2 } from 'lucide-react'

interface FileManagerProps {
  connectionId: string | null
}

export default function FileManager({ connectionId }: FileManagerProps) {
  const [currentPath, setCurrentPath] = useState('/')
  
  // Mock file data - in real implementation, this would come from the server
  const mockFiles = [
    { name: '..', type: 'directory', size: 0, permissions: 'drwxr-xr-x' },
    { name: 'home', type: 'directory', size: 4096, permissions: 'drwxr-xr-x' },
    { name: 'var', type: 'directory', size: 4096, permissions: 'drwxr-xr-x' },
    { name: 'etc', type: 'directory', size: 4096, permissions: 'drwxr-xr-x' },
    { name: 'usr', type: 'directory', size: 4096, permissions: 'drwxr-xr-x' },
    { name: 'boot.log', type: 'file', size: 2048, permissions: '-rw-r--r--' },
    { name: 'README.txt', type: 'file', size: 1024, permissions: '-rw-r--r--' }
  ]

  if (!connectionId) {
    return (
      <div className="flex items-center justify-center h-96 bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl">
        <div className="text-center">
          <div className="w-16 h-16 bg-slate-700 rounded-full flex items-center justify-center mx-auto mb-4">
            <Folder className="w-8 h-8 text-slate-400" />
          </div>
          <h3 className="text-lg font-medium text-white mb-2">No Connection Selected</h3>
          <p className="text-slate-400">Select a connection to browse files</p>
        </div>
      </div>
    )
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '-'
    const sizes = ['B', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(1024))
    return Math.round(bytes / Math.pow(1024, i) * 100) / 100 + ' ' + sizes[i]
  }

  return (
    <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl overflow-hidden">
      {/* Header */}
      <div className="bg-slate-800 px-4 py-3 border-b border-slate-700">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Folder className="w-5 h-5 text-slate-400" />
            <div>
              <h3 className="text-lg font-semibold text-white">File Manager</h3>
              <p className="text-sm text-slate-400">{currentPath}</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <button className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-md text-sm transition-colors">
              <Upload className="w-4 h-4" />
              <span>Upload</span>
            </button>
            <button className="flex items-center space-x-2 bg-slate-700 hover:bg-slate-600 text-white px-3 py-1.5 rounded-md text-sm transition-colors">
              <Download className="w-4 h-4" />
              <span>Download</span>
            </button>
          </div>
        </div>
      </div>

      {/* File List */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-slate-700/50">
            <tr>
              <th className="text-left py-3 px-4 font-medium text-slate-300">Name</th>
              <th className="text-left py-3 px-4 font-medium text-slate-300">Size</th>
              <th className="text-left py-3 px-4 font-medium text-slate-300">Permissions</th>
              <th className="text-left py-3 px-4 font-medium text-slate-300">Actions</th>
            </tr>
          </thead>
          <tbody>
            {mockFiles.map((file, index) => (
              <tr 
                key={index}
                className="border-b border-slate-700/50 hover:bg-slate-700/25 transition-colors"
              >
                <td className="py-3 px-4">
                  <div className="flex items-center space-x-3">
                    {file.type === 'directory' ? (
                      <Folder className="w-4 h-4 text-blue-400" />
                    ) : (
                      <File className="w-4 h-4 text-slate-400" />
                    )}
                    <span className="text-white font-medium">{file.name}</span>
                  </div>
                </td>
                <td className="py-3 px-4 text-slate-400">
                  {formatFileSize(file.size)}
                </td>
                <td className="py-3 px-4">
                  <code className="text-sm text-slate-300 bg-slate-900/50 px-2 py-1 rounded">
                    {file.permissions}
                  </code>
                </td>
                <td className="py-3 px-4">
                  <div className="flex items-center space-x-2">
                    {file.type === 'file' && (
                      <>
                        <button className="text-slate-400 hover:text-blue-400 transition-colors">
                          <Download className="w-4 h-4" />
                        </button>
                        <button className="text-slate-400 hover:text-red-400 transition-colors">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Status Bar */}
      <div className="bg-slate-800 px-4 py-2 border-t border-slate-700">
        <div className="flex items-center justify-between text-sm">
          <span className="text-slate-400">
            {mockFiles.filter(f => f.type === 'directory').length - 1} folders, {mockFiles.filter(f => f.type === 'file').length} files
          </span>
          <span className="text-slate-400">
            Connection: {connectionId}
          </span>
        </div>
      </div>
    </div>
  )
} 

import { useState } from 'react'
import { Folder, File, Download, Upload, Trash2 } from 'lucide-react'

interface FileManagerProps {
  connectionId: string | null
}

export default function FileManager({ connectionId }: FileManagerProps) {
  const [currentPath, setCurrentPath] = useState('/')
  
  // Mock file data - in real implementation, this would come from the server
  const mockFiles = [
    { name: '..', type: 'directory', size: 0, permissions: 'drwxr-xr-x' },
    { name: 'home', type: 'directory', size: 4096, permissions: 'drwxr-xr-x' },
    { name: 'var', type: 'directory', size: 4096, permissions: 'drwxr-xr-x' },
    { name: 'etc', type: 'directory', size: 4096, permissions: 'drwxr-xr-x' },
    { name: 'usr', type: 'directory', size: 4096, permissions: 'drwxr-xr-x' },
    { name: 'boot.log', type: 'file', size: 2048, permissions: '-rw-r--r--' },
    { name: 'README.txt', type: 'file', size: 1024, permissions: '-rw-r--r--' }
  ]

  if (!connectionId) {
    return (
      <div className="flex items-center justify-center h-96 bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl">
        <div className="text-center">
          <div className="w-16 h-16 bg-slate-700 rounded-full flex items-center justify-center mx-auto mb-4">
            <Folder className="w-8 h-8 text-slate-400" />
          </div>
          <h3 className="text-lg font-medium text-white mb-2">No Connection Selected</h3>
          <p className="text-slate-400">Select a connection to browse files</p>
        </div>
      </div>
    )
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '-'
    const sizes = ['B', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(1024))
    return Math.round(bytes / Math.pow(1024, i) * 100) / 100 + ' ' + sizes[i]
  }

  return (
    <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl overflow-hidden">
      {/* Header */}
      <div className="bg-slate-800 px-4 py-3 border-b border-slate-700">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Folder className="w-5 h-5 text-slate-400" />
            <div>
              <h3 className="text-lg font-semibold text-white">File Manager</h3>
              <p className="text-sm text-slate-400">{currentPath}</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <button className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-md text-sm transition-colors">
              <Upload className="w-4 h-4" />
              <span>Upload</span>
            </button>
            <button className="flex items-center space-x-2 bg-slate-700 hover:bg-slate-600 text-white px-3 py-1.5 rounded-md text-sm transition-colors">
              <Download className="w-4 h-4" />
              <span>Download</span>
            </button>
          </div>
        </div>
      </div>

      {/* File List */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-slate-700/50">
            <tr>
              <th className="text-left py-3 px-4 font-medium text-slate-300">Name</th>
              <th className="text-left py-3 px-4 font-medium text-slate-300">Size</th>
              <th className="text-left py-3 px-4 font-medium text-slate-300">Permissions</th>
              <th className="text-left py-3 px-4 font-medium text-slate-300">Actions</th>
            </tr>
          </thead>
          <tbody>
            {mockFiles.map((file, index) => (
              <tr 
                key={index}
                className="border-b border-slate-700/50 hover:bg-slate-700/25 transition-colors"
              >
                <td className="py-3 px-4">
                  <div className="flex items-center space-x-3">
                    {file.type === 'directory' ? (
                      <Folder className="w-4 h-4 text-blue-400" />
                    ) : (
                      <File className="w-4 h-4 text-slate-400" />
                    )}
                    <span className="text-white font-medium">{file.name}</span>
                  </div>
                </td>
                <td className="py-3 px-4 text-slate-400">
                  {formatFileSize(file.size)}
                </td>
                <td className="py-3 px-4">
                  <code className="text-sm text-slate-300 bg-slate-900/50 px-2 py-1 rounded">
                    {file.permissions}
                  </code>
                </td>
                <td className="py-3 px-4">
                  <div className="flex items-center space-x-2">
                    {file.type === 'file' && (
                      <>
                        <button className="text-slate-400 hover:text-blue-400 transition-colors">
                          <Download className="w-4 h-4" />
                        </button>
                        <button className="text-slate-400 hover:text-red-400 transition-colors">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Status Bar */}
      <div className="bg-slate-800 px-4 py-2 border-t border-slate-700">
        <div className="flex items-center justify-between text-sm">
          <span className="text-slate-400">
            {mockFiles.filter(f => f.type === 'directory').length - 1} folders, {mockFiles.filter(f => f.type === 'file').length} files
          </span>
          <span className="text-slate-400">
            Connection: {connectionId}
          </span>
        </div>
      </div>
    </div>
  )
} 