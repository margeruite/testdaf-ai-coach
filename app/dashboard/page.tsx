'use client'

import { useState, useEffect } from 'react'
import { BookOpen, User, Trophy, Star, Send, Upload, Bot, Paperclip, Image } from 'lucide-react'

// Mock data - will be replaced with real data from Supabase
const mockUser = {
  id: '1',
  name: 'Alex',
  email: 'alex@example.com',
  currentTDN: 3.5,
  targetTDN: 5,
  totalPoints: 2850,
  testDate: '2024-06-15',
}

const mockStats = {
  daysUntilTest: 45,
  currentStreak: 7,
  totalSessions: 23,
  overallProgress: 68,
  testDate: '2024-06-15',
}

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-turquoise/3 to-petrol/5">
      {/* Simple Top Navigation */}
      <nav className="bg-white/80 backdrop-blur-lg border-b border-gray-200/50 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-r from-petrol to-turquoise rounded-xl p-2">
                <BookOpen className="text-white w-6 h-6" />
              </div>
              <span className="text-xl font-bold text-petrol">TestDaF Coach</span>
            </div>
            <div className="flex items-center space-x-4">
              <div className="bg-gradient-to-r from-petrol to-turquoise rounded-full px-4 py-2">
                <div className="flex items-center space-x-2">
                  <Trophy className="text-white w-4 h-4" />
                  <span className="text-white font-bold">TDN {mockUser.currentTDN}</span>
                </div>
              </div>
              <div className="bg-gold/10 border border-gold/30 rounded-full px-4 py-2">
                <div className="flex items-center space-x-2">
                  <Star className="text-gold w-4 h-4" />
                  <span className="text-gold font-bold">{mockUser.totalPoints.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
      
      {/* Hero Stats Section */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-petrol mb-2">Welcome back, {mockUser.name}!</h1>
            <p className="text-gray-600">You have {mockStats.daysUntilTest} days until your TestDaF exam</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            <div className="text-center p-6 bg-gradient-to-br from-petrol/5 to-turquoise/5 rounded-2xl">
              <div className="text-3xl font-bold text-petrol">{mockStats.daysUntilTest}</div>
              <div className="text-sm text-gray-600">Days to Test</div>
            </div>
            <div className="text-center p-6 bg-gradient-to-br from-turquoise/5 to-mint/5 rounded-2xl">
              <div className="text-3xl font-bold text-turquoise">{mockStats.currentStreak}</div>
              <div className="text-sm text-gray-600">Day Streak</div>
            </div>
            <div className="text-center p-6 bg-gradient-to-br from-mint/5 to-gold/5 rounded-2xl">
              <div className="text-3xl font-bold text-mint">{mockStats.totalSessions}</div>
              <div className="text-sm text-gray-600">Sessions</div>
            </div>
            <div className="text-center p-6 bg-gradient-to-br from-gold/5 to-coral/5 rounded-2xl">
              <div className="text-3xl font-bold text-gold">{mockStats.overallProgress}%</div>
              <div className="text-sm text-gray-600">Progress</div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-6 py-8">
        <SimpleChatInterface />
      </div>
    </div>
  )
}

// Simple Chat Interface Component
function SimpleChatInterface() {
  const [messages, setMessages] = useState([
    {
      id: '1',
      content: "Hi! I'm your TestDaF writing coach. 👋\n\nI can help you improve your German writing skills with personalized feedback. You can:\n\n• Upload a handwritten text (I'll use OCR to read it)\n• Type a text directly\n• Ask me questions about German grammar\n\nWhat would you like to work on today?",
      sender: 'agent',
      timestamp: new Date(),
    }
  ])
  const [inputValue, setInputValue] = useState('')
  const [isTyping, setIsTyping] = useState(false)

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return

    const userMessage = {
      id: Date.now().toString(),
      content: inputValue,
      sender: 'user',
      timestamp: new Date(),
    }

    setMessages(prev => [...prev, userMessage])
    setInputValue('')
    setIsTyping(true)

    // Simulate AI response
    setTimeout(() => {
      const agentMessage = {
        id: (Date.now() + 1).toString(),
        content: generateResponse(inputValue),
        sender: 'agent',
        timestamp: new Date(),
      }
      setMessages(prev => [...prev, agentMessage])
      setIsTyping(false)
    }, 1500)
  }

  const generateResponse = (input) => {
    if (input.toLowerCase().includes('help')) {
      return "I'm here to help! 📝 Upload text or type directly for feedback on grammar, vocabulary, and structure. What would you like to start with?"
    }
    
    if (input.toLowerCase().includes('grammar')) {
      return "Great! German grammar areas: Articles (der, die, das), Cases, Word order, Verb conjugations. Do you have a specific question?"
    }

    return "I understand you want to improve your TestDaF writing! 🎯 Share a text with me for detailed feedback on grammar, vocabulary, structure, and TestDaF criteria."
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 h-[600px] flex flex-col">
      <div className="flex items-center justify-between p-4 border-b border-gray-100">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-r from-petrol to-turquoise rounded-full flex items-center justify-center">
            <Bot className="text-white w-5 h-5" />
          </div>
          <div>
            <h3 className="font-semibold text-petrol">TestDaF Coach</h3>
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-xs text-gray-500">Online</span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div key={message.id} className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`flex items-start space-x-2 max-w-[80%] ${message.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${message.sender === 'user' ? 'bg-petrol' : 'bg-gradient-to-r from-petrol to-turquoise'}`}>
                {message.sender === 'user' ? <User className="text-white w-4 h-4" /> : <Bot className="text-white w-4 h-4" />}
              </div>
              
              <div className={`rounded-2xl px-4 py-3 ${message.sender === 'user' ? 'bg-petrol text-white' : 'bg-gray-100 text-gray-900'}`}>
                <div className="text-sm leading-relaxed whitespace-pre-line">{message.content}</div>
                <div className={`text-xs mt-2 ${message.sender === 'user' ? 'text-turquoise/80' : 'text-gray-500'}`}>
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
              </div>
            </div>
          </div>
        ))}
        
        {isTyping && (
          <div className="flex justify-start">
            <div className="flex items-start space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-petrol to-turquoise rounded-full flex items-center justify-center">
                <Bot className="text-white w-4 h-4" />
              </div>
              <div className="bg-gray-100 rounded-2xl px-4 py-3">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="p-4 border-t border-gray-100">
        <div className="flex space-x-3">
          <div className="flex-1 relative">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
              className="w-full border border-gray-200 rounded-xl px-4 py-3 pr-12 focus:outline-none focus:ring-2 focus:ring-turquoise/50 focus:border-turquoise"
              placeholder="Type your message..."
              disabled={isTyping}
            />
          </div>
          
          <button 
            onClick={handleSendMessage} 
            disabled={!inputValue.trim() || isTyping}
            className="bg-gradient-to-r from-petrol to-turquoise text-white p-3 rounded-xl hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  )
}