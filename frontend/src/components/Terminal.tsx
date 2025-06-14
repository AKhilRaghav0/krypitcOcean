'use client'

import { useEffect, useRef } from 'react'
import { Terminal as TerminalIcon } from 'lucide-react'

interface TerminalProps {
  connectionId: string | null
}

export default function Terminal({ connectionId }: TerminalProps) {
  const terminalRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (connectionId && terminalRef.current) {
      // Here we would initialize xterm.js
      // For now, we'll just show a placeholder
      console.log('Terminal initialized for connection:', connectionId)
    }
  }, [connectionId])

  if (!connectionId) {
    return (
      <div className="flex items-center justify-center h-96 bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl">
        <div className="text-center">
          <div className="w-16 h-16 bg-slate-700 rounded-full flex items-center justify-center mx-auto mb-4">
            <TerminalIcon className="w-8 h-8 text-slate-400" />
          </div>
          <h3 className="text-lg font-medium text-white mb-2">No Connection Selected</h3>
          <p className="text-slate-400">Select a connection to start a terminal session</p>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-slate-900 border border-slate-700 rounded-xl overflow-hidden">
      <div className="bg-slate-800 px-4 py-2 border-b border-slate-700 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <TerminalIcon className="w-4 h-4 text-slate-400" />
          <span className="text-sm font-medium text-slate-300">Terminal - {connectionId}</span>
        </div>
        <div className="flex space-x-2">
          <div className="w-3 h-3 bg-red-500 rounded-full"></div>
          <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
        </div>
      </div>
      
      <div 
        ref={terminalRef}
        className="h-96 bg-black p-4 font-mono text-sm text-green-400"
      >
        <div className="mb-2">
          <span className="text-blue-400">user@server:~$</span> <span className="animate-pulse">|</span>
        </div>
        <div className="text-slate-400">
          KrypticOcean Terminal v1.0.0<br />
          Type 'help' for available commands.<br />
          <br />
          Terminal implementation coming soon with xterm.js integration...
        </div>
      </div>
    </div>
  )
} 

import { useEffect, useRef } from 'react'
import { Terminal as TerminalIcon } from 'lucide-react'

interface TerminalProps {
  connectionId: string | null
}

export default function Terminal({ connectionId }: TerminalProps) {
  const terminalRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (connectionId && terminalRef.current) {
      // Here we would initialize xterm.js
      // For now, we'll just show a placeholder
      console.log('Terminal initialized for connection:', connectionId)
    }
  }, [connectionId])

  if (!connectionId) {
    return (
      <div className="flex items-center justify-center h-96 bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl">
        <div className="text-center">
          <div className="w-16 h-16 bg-slate-700 rounded-full flex items-center justify-center mx-auto mb-4">
            <TerminalIcon className="w-8 h-8 text-slate-400" />
          </div>
          <h3 className="text-lg font-medium text-white mb-2">No Connection Selected</h3>
          <p className="text-slate-400">Select a connection to start a terminal session</p>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-slate-900 border border-slate-700 rounded-xl overflow-hidden">
      <div className="bg-slate-800 px-4 py-2 border-b border-slate-700 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <TerminalIcon className="w-4 h-4 text-slate-400" />
          <span className="text-sm font-medium text-slate-300">Terminal - {connectionId}</span>
        </div>
        <div className="flex space-x-2">
          <div className="w-3 h-3 bg-red-500 rounded-full"></div>
          <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
        </div>
      </div>
      
      <div 
        ref={terminalRef}
        className="h-96 bg-black p-4 font-mono text-sm text-green-400"
      >
        <div className="mb-2">
          <span className="text-blue-400">user@server:~$</span> <span className="animate-pulse">|</span>
        </div>
        <div className="text-slate-400">
          KrypticOcean Terminal v1.0.0<br />
          Type 'help' for available commands.<br />
          <br />
          Terminal implementation coming soon with xterm.js integration...
        </div>
      </div>
    </div>
  )
} 

import { useEffect, useRef } from 'react'
import { Terminal as TerminalIcon } from 'lucide-react'

interface TerminalProps {
  connectionId: string | null
}

export default function Terminal({ connectionId }: TerminalProps) {
  const terminalRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (connectionId && terminalRef.current) {
      // Here we would initialize xterm.js
      // For now, we'll just show a placeholder
      console.log('Terminal initialized for connection:', connectionId)
    }
  }, [connectionId])

  if (!connectionId) {
    return (
      <div className="flex items-center justify-center h-96 bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl">
        <div className="text-center">
          <div className="w-16 h-16 bg-slate-700 rounded-full flex items-center justify-center mx-auto mb-4">
            <TerminalIcon className="w-8 h-8 text-slate-400" />
          </div>
          <h3 className="text-lg font-medium text-white mb-2">No Connection Selected</h3>
          <p className="text-slate-400">Select a connection to start a terminal session</p>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-slate-900 border border-slate-700 rounded-xl overflow-hidden">
      <div className="bg-slate-800 px-4 py-2 border-b border-slate-700 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <TerminalIcon className="w-4 h-4 text-slate-400" />
          <span className="text-sm font-medium text-slate-300">Terminal - {connectionId}</span>
        </div>
        <div className="flex space-x-2">
          <div className="w-3 h-3 bg-red-500 rounded-full"></div>
          <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
        </div>
      </div>
      
      <div 
        ref={terminalRef}
        className="h-96 bg-black p-4 font-mono text-sm text-green-400"
      >
        <div className="mb-2">
          <span className="text-blue-400">user@server:~$</span> <span className="animate-pulse">|</span>
        </div>
        <div className="text-slate-400">
          KrypticOcean Terminal v1.0.0<br />
          Type 'help' for available commands.<br />
          <br />
          Terminal implementation coming soon with xterm.js integration...
        </div>
      </div>
    </div>
  )
} 