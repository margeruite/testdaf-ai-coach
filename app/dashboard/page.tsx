'use client'

import { useState, useEffect } from 'react'
import { ChatInterface } from '@/components/chat/ChatInterface'
import { Button } from '@/components/ui/Button'
import { BookOpen, User, Trophy, Star } from 'lucide-react'

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
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  if (isMobile) {
    return <MobileDashboard />
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-turquoise/3 to-petrol/5">
      {/* Simple Top Navigation */}
      <nav className="bg-white/80 backdrop-blur-lg border-b border-gray-200/50 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-main rounded-xl p-2">
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
        <ChatInterface />
      </div>
    </div>
  )
}

// Mobile Dashboard Component
function MobileDashboard() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Top Bar */}
      <div className="bg-white border-b border-gray-200 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-main rounded-full flex items-center justify-center">
              <BookOpen className="text-white w-5 h-5" />
            </div>
            <div>
              <h2 className="font-bold text-petrol">TDN {mockUser.currentTDN}</h2>
              <p className="text-xs text-gray-500">{mockStats.daysUntilTest} days left</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <div className="bg-coral/10 rounded-full px-2 py-1">
              <span className="text-coral text-sm font-bold">{mockStats.currentStreak}🔥</span>
            </div>
            <div className="bg-gold/10 rounded-full px-2 py-1">
              <span className="text-gold text-sm font-bold">{mockUser.totalPoints}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Content */}
      <div className="p-4">
        <ChatInterface />
      </div>
    </div>
  )
}

