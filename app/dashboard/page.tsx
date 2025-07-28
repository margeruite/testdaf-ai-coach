'use client'

import { useState, useEffect } from 'react'
import { TopNavigation } from '@/components/dashboard/TopNavigation'
import { HeroStatsSection } from '@/components/dashboard/HeroStatsSection'
import { ChatInterface } from '@/components/chat/ChatInterface'
import { ProgressCard } from '@/components/dashboard/ProgressCard'
import { AchievementsCard } from '@/components/dashboard/AchievementsCard'
import { SkillRadarChart } from '@/components/dashboard/SkillRadarChart'
import { StreakCard } from '@/components/dashboard/StreakCard'
import { RecentActivity } from '@/components/dashboard/RecentActivity'

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
      {/* Top Navigation */}
      <TopNavigation user={mockUser} />
      
      {/* Hero Stats Section */}
      <HeroStatsSection stats={mockStats} />
      
      {/* Main Content Grid */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
          
          {/* Left Sidebar - Progress & Goals */}
          <div className="xl:col-span-1 space-y-6">
            <ProgressCard />
            <StreakCard />
          </div>
          
          {/* Center - Chat Interface */}
          <div className="xl:col-span-2">
            <ChatInterface />
          </div>
          
          {/* Right Sidebar - Stats & Achievements */}
          <div className="xl:col-span-1 space-y-6">
            <AchievementsCard />
            <SkillRadarChart />
            <RecentActivity />
          </div>
          
        </div>
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
              <span className="text-white font-bold text-sm">TDN</span>
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
      <div className="p-4 space-y-4">
        <ChatInterface />
        <div className="grid grid-cols-2 gap-4">
          <ProgressCard />
          <AchievementsCard />
        </div>
      </div>

      {/* Bottom Navigation */}
      <MobileBottomNav />
    </div>
  )
}

// Mobile Bottom Navigation
function MobileBottomNav() {
  const navItems = [
    { id: 'home', label: 'Home', icon: '🏠', active: true },
    { id: 'practice', label: 'Practice', icon: '📚' },
    { id: 'achievements', label: 'Achievements', icon: '🏆' },
    { id: 'profile', label: 'Profile', icon: '👤' },
  ]

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 safe-area-pb">
      <div className="flex justify-around">
        {navItems.map((item) => (
          <button
            key={item.id}
            className={`flex flex-col items-center space-y-1 p-2 rounded-lg transition-colors ${
              item.active 
                ? 'text-petrol bg-turquoise/10' 
                : 'text-gray-400 hover:text-gray-600'
            }`}
          >
            <span className="text-lg">{item.icon}</span>
            <span className="text-xs font-medium">{item.label}</span>
          </button>
        ))}
      </div>
    </div>
  )
}