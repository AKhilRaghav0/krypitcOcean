'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Terminal, Server, Shield, Zap, Globe, Settings } from 'lucide-react'
import ConnectionForm from '@/components/ConnectionForm'
import TerminalComponent from '@/components/Terminal'
import FileManager from '@/components/FileManager'
import ConnectionManager from '@/components/ConnectionManager'

export default function Home() {
  const [activeTab, setActiveTab] = useState<'connections' | 'terminal' | 'files' | 'settings'>('connections')
  const [currentConnection, setCurrentConnection] = useState<string | null>(null)

  const features = [
    {
      icon: <Terminal className="w-8 h-8" />,
      title: "Web Terminal",
      description: "Full-featured terminal emulation in your browser with xterm.js"
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Secure Connections",
      description: "Advanced encryption and secure key management for all connections"
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "High Performance",
      description: "Optimized for speed with real-time communication via WebSockets"
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: "Cross Platform",
      description: "Access your servers from any device with a modern web browser"
    }
  ]

  const tabs = [
    { id: 'connections', label: 'Connections', icon: <Server className="w-4 h-4" /> },
    { id: 'terminal', label: 'Terminal', icon: <Terminal className="w-4 h-4" /> },
    { id: 'files', label: 'Files', icon: <Globe className="w-4 h-4" /> },
    { id: 'settings', label: 'Settings', icon: <Settings className="w-4 h-4" /> }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      {/* Header */}
      <header className="border-b border-slate-700/50 bg-slate-900/90 backdrop-blur-xl">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center space-x-3"
            >
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
                <Terminal className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">KrypticOcean</h1>
                <p className="text-sm text-slate-400">Modern SSH Alternative</p>
              </div>
            </motion.div>

            <div className="flex items-center space-x-4">
              <div className="flex bg-slate-800 rounded-lg p-1">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-all ${
                      activeTab === tab.id
                        ? 'bg-blue-600 text-white shadow-lg'
                        : 'text-slate-300 hover:text-white hover:bg-slate-700'
                    }`}
                  >
                    {tab.icon}
                    <span>{tab.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {!currentConnection && activeTab === 'connections' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-6xl mx-auto"
          >
            {/* Hero Section */}
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-6xl font-bold text-white mb-4">
                Connect to Your Servers
                <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                  {" "}Securely
                </span>
              </h2>
              <p className="text-xl text-slate-300 max-w-2xl mx-auto">
                KrypticOcean provides a modern, web-based SSH experience with advanced features
                for developers and system administrators.
              </p>
            </div>

            {/* Features Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6 hover:bg-slate-800/70 transition-all"
                >
                  <div className="text-blue-400 mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-slate-400 text-sm">
                    {feature.description}
                  </p>
                </motion.div>
              ))}
            </div>

            {/* Connection Manager */}
            <ConnectionManager onConnect={setCurrentConnection} />
          </motion.div>
        )}

        {activeTab === 'terminal' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-6xl mx-auto"
          >
            <TerminalComponent connectionId={currentConnection} />
          </motion.div>
        )}

        {activeTab === 'files' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-6xl mx-auto"
          >
            <FileManager connectionId={currentConnection} />
          </motion.div>
        )}

        {activeTab === 'settings' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto"
          >
            <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-8">
              <h2 className="text-2xl font-bold text-white mb-6">Settings</h2>
              <p className="text-slate-400">Settings panel coming soon...</p>
        </div>
          </motion.div>
        )}
      </main>
    </div>
  )
}

                for developers and system administrators.
              </p>
            </div>

            {/* Features Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6 hover:bg-slate-800/70 transition-all"
                >
                  <div className="text-blue-400 mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-slate-400 text-sm">
                    {feature.description}
                  </p>
                </motion.div>
              ))}
            </div>

            {/* Connection Manager */}
            <ConnectionManager onConnect={setCurrentConnection} />
          </motion.div>
        )}

        {activeTab === 'terminal' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-6xl mx-auto"
          >
            <TerminalComponent connectionId={currentConnection} />
          </motion.div>
        )}

        {activeTab === 'files' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-6xl mx-auto"
          >
            <FileManager connectionId={currentConnection} />
          </motion.div>
        )}

        {activeTab === 'settings' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto"
          >
            <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-8">
              <h2 className="text-2xl font-bold text-white mb-6">Settings</h2>
              <p className="text-slate-400">Settings panel coming soon...</p>
        </div>
          </motion.div>
        )}
      </main>
    </div>
  )
}

                for developers and system administrators.
              </p>
            </div>

            {/* Features Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6 hover:bg-slate-800/70 transition-all"
                >
                  <div className="text-blue-400 mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-slate-400 text-sm">
                    {feature.description}
                  </p>
                </motion.div>
              ))}
            </div>

            {/* Connection Manager */}
            <ConnectionManager onConnect={setCurrentConnection} />
          </motion.div>
        )}

        {activeTab === 'terminal' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-6xl mx-auto"
          >
            <TerminalComponent connectionId={currentConnection} />
          </motion.div>
        )}

        {activeTab === 'files' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-6xl mx-auto"
          >
            <FileManager connectionId={currentConnection} />
          </motion.div>
        )}

        {activeTab === 'settings' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto"
          >
            <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-8">
              <h2 className="text-2xl font-bold text-white mb-6">Settings</h2>
              <p className="text-slate-400">Settings panel coming soon...</p>
        </div>
          </motion.div>
        )}
      </main>
    </div>
  )
}
