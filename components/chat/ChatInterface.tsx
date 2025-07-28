'use client'

import { useState, useRef, useEffect } from 'react'
import { Send, Upload, Bot, User, Paperclip, Image } from 'lucide-react'
import { Button } from '@/components/ui/Button'

interface Message {
  id: string
  content: string
  sender: 'user' | 'agent'
  timestamp: Date
  type?: 'text' | 'image' | 'analysis'
  metadata?: any
}

export function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: "Hi! I'm your TestDaF writing coach. 👋\n\nI can help you improve your German writing skills with personalized feedback. You can:\n\n• Upload a handwritten text (I'll use OCR to read it)\n• Type a text directly\n• Ask me questions about German grammar\n\nWhat would you like to work on today?",
      sender: 'agent',
      timestamp: new Date(),
    }
  ])
  const [inputValue, setInputValue] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [dragActive, setDragActive] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return

    const userMessage: Message = {
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
      const agentMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: generateAIResponse(inputValue),
        sender: 'agent',
        timestamp: new Date(),
      }
      setMessages(prev => [...prev, agentMessage])
      setIsTyping(false)
    }, 1500)
  }

  const generateAIResponse = (userInput: string): string => {
    // Simple response generation - will be replaced with actual AI
    if (userInput.toLowerCase().includes('help')) {
      return "I'm here to help! You can:\n\n📝 **Upload text**: Send me a photo of your handwriting or type directly\n🔍 **Get feedback**: I'll analyze your grammar, vocabulary, and structure\n💡 **Learn**: Ask me about German grammar rules\n🎯 **Practice**: I'll create exercises based on your mistakes\n\nWhat would you like to start with?"
    }
    
    if (userInput.toLowerCase().includes('grammar')) {
      return "Great! German grammar can be tricky, but I'm here to help. 📚\n\nSome common areas students struggle with:\n• **Articles** (der, die, das)\n• **Cases** (Nominativ, Akkusativ, Dativ, Genitiv)\n• **Word order** in complex sentences\n• **Verb conjugations** and positions\n\nDo you have a specific grammar question, or would you like me to analyze a text you've written?"
    }

    return "I understand you want to improve your TestDaF writing! 🎯\n\nPlease share a text with me (either by typing or uploading an image), and I'll provide detailed feedback on:\n\n✅ **Grammar accuracy**\n✅ **Vocabulary usage**\n✅ **Text structure**\n✅ **TestDaF-specific criteria**\n\nI'll explain everything in your native language to make it easier to understand!"
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file && file.type.startsWith('image/')) {
      // Handle image upload - will implement OCR later
      const imageMessage: Message = {
        id: Date.now().toString(),
        content: 'Image uploaded for analysis',
        sender: 'user',
        timestamp: new Date(),
        type: 'image',
        metadata: { fileName: file.name }
      }
      setMessages(prev => [...prev, imageMessage])
      
      // Simulate OCR processing
      setIsTyping(true)
      setTimeout(() => {
        const ocrMessage: Message = {
          id: (Date.now() + 1).toString(),
          content: "📸 **Image Analysis Complete!**\n\nI can see your handwritten text. Here's what I recognized:\n\n*\"Der Grafik zeigt die Entwicklung der Studenten in Deutschland...\"*\n\n**Quick Analysis:**\n❌ **Grammar Error**: \"Der Grafik\" → should be \"**Die** Grafik\" (feminine article)\n\nWould you like me to provide a complete analysis with detailed feedback and corrections?",
          sender: 'agent',
          timestamp: new Date(),
          type: 'analysis'
        }
        setMessages(prev => [...prev, ocrMessage])
        setIsTyping(false)
      }, 2000)
    }
  }

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true)
    } else if (e.type === 'dragleave') {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      // Handle dropped file
      const file = e.dataTransfer.files[0]
      if (file.type.startsWith('image/')) {
        handleFileUpload({ target: { files: [file] } } as any)
      }
    }
  }

  return (
    <div 
      className={`bg-white rounded-2xl shadow-sm border border-gray-200 h-[600px] flex flex-col transition-all duration-200 ${
        dragActive ? 'border-turquoise bg-turquoise/5' : ''
      }`}
      onDragEnter={handleDrag}
      onDragLeave={handleDrag}
      onDragOver={handleDrag}
      onDrop={handleDrop}
    >
      {/* Chat Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-100">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-main rounded-full flex items-center justify-center">
            <Bot className="text-white w-5 h-5" />
          </div>
          <div>
            <h3 className="font-semibold text-petrol">TestDaF Coach</h3>
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-mint rounded-full animate-pulse"></div>
              <span className="text-xs text-gray-500">Online</span>
            </div>
          </div>
        </div>
        
        {/* Language Indicator */}
        <div className="bg-turquoise/10 px-3 py-1 rounded-full">
          <span className="text-sm text-petrol font-medium">🇬🇧 English</span>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-hide">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`flex items-start space-x-2 max-w-[80%] ${
              message.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''
            }`}>
              
              {/* Avatar */}
              <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                message.sender === 'user' 
                  ? 'bg-petrol' 
                  : 'bg-gradient-main'
              }`}>
                {message.sender === 'user' ? (
                  <User className="text-white w-4 h-4" />
                ) : (
                  <Bot className="text-white w-4 h-4" />
                )}
              </div>
              
              {/* Message Bubble */}
              <div className={`rounded-2xl px-4 py-3 ${
                message.sender === 'user'
                  ? 'bg-petrol text-white'
                  : 'bg-gray-100 text-gray-900'
              }`}>
                {message.type === 'image' ? (
                  <div className="flex items-center space-x-2">
                    <Image className="w-4 h-4" />
                    <span className="text-sm">Handwritten text uploaded</span>
                  </div>
                ) : (
                  <div className="text-sm leading-relaxed whitespace-pre-line">
                    {message.content}
                  </div>
                )}
                
                <div className={`text-xs mt-2 ${
                  message.sender === 'user' ? 'text-turquoise/80' : 'text-gray-500'
                }`}>
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
              </div>
            </div>
          </div>
        ))}
        
        {/* Typing Indicator */}
        {isTyping && (
          <div className="flex justify-start">
            <div className="flex items-start space-x-2">
              <div className="w-8 h-8 bg-gradient-main rounded-full flex items-center justify-center">
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
        
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 border-t border-gray-100">
        <div className="flex space-x-3">
          <div className="flex-1 relative">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
              className="w-full border border-gray-200 rounded-xl px-4 py-3 pr-12 focus:outline-none focus:ring-2 focus:ring-turquoise/50 focus:border-turquoise"
              placeholder="Type your message or upload text..."
              disabled={isTyping}
            />
            
            {/* Attachment Button */}
            <button
              onClick={() => fileInputRef.current?.click()}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 text-gray-400 hover:text-petrol transition-colors"
            >
              <Paperclip className="w-4 h-4" />
            </button>
          </div>
          
          <Button 
            onClick={handleSendMessage} 
            disabled={!inputValue.trim() || isTyping}
            className="p-3"
          >
            <Send className="w-5 h-5" />
          </Button>
        </div>
        
        {/* Quick Upload */}
        <div className="flex items-center justify-center mt-3">
          <button 
            onClick={() => fileInputRef.current?.click()}
            className="flex items-center space-x-2 text-sm text-gray-500 hover:text-petrol transition-colors"
          >
            <Upload className="w-4 h-4" />
            <span>Upload handwritten text</span>
          </button>
        </div>

        {/* Hidden File Input */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileUpload}
          className="hidden"
        />
      </div>

      {/* Drag Overlay */}
      {dragActive && (
        <div className="absolute inset-0 bg-turquoise/10 border-2 border-dashed border-turquoise rounded-2xl flex items-center justify-center z-10">
          <div className="text-center">
            <Upload className="w-12 h-12 text-turquoise mx-auto mb-2" />
            <p className="text-turquoise font-medium">Drop your image here</p>
            <p className="text-sm text-turquoise/70">I'll analyze your handwritten text</p>
          </div>
        </div>
      )}
    </div>
  )
}