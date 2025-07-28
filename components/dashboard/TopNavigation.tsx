'use client'

import { BookOpen, Settings, Bell, Star, Trophy, User } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { useState } from 'react'

interface User {
  id: string
  name: string
  email: string
  currentTDN: number
  totalPoints: number
}

interface TopNavigationProps {
  user: User
}

export function TopNavigation({ user }: TopNavigationProps) {
  const [showProfileMenu, setShowProfileMenu] = useState(false)

  return (
    <nav className="bg-white/80 backdrop-blur-lg border-b border-gray-200/50 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          
          {/* Logo & User Info */}
          <div className="flex items-center space-x-4">
            <div className="bg-gradient-main rounded-xl p-2">
              <BookOpen className="text-white w-6 h-6" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-petrol">TestDaF AI Coach</h1>
              <p className="text-sm text-gray-600">Welcome back, {user.name}!</p>
            </div>
          </div>

          {/* Center - Quick Stats */}
          <div className="hidden md:flex items-center space-x-6">
            <div className="text-center">
              <div className="text-lg font-bold text-petrol">TDN {user.currentTDN}</div>
              <div className="text-xs text-gray-500">Current Level</div>
            </div>
            <div className="w-px h-8 bg-gray-200"></div>
            <div className="text-center">
              <div className="text-lg font-bold text-turquoise">{user.totalPoints.toLocaleString()}</div>
              <div className="text-xs text-gray-500">Points</div>
            </div>
          </div>

          {/* Right Side - Actions & Profile */}
          <div className="flex items-center space-x-4">
            
            {/* Current Level Badge */}
            <div className="bg-gradient-to-r from-petrol to-turquoise rounded-full px-4 py-2 shadow-lg">
              <div className="flex items-center space-x-2">
                <Trophy className="text-white w-4 h-4" />
                <span className="text-white font-bold">TDN {user.currentTDN}</span>
              </div>
            </div>
            
            {/* Total Points */}
            <div className="bg-gold/10 border border-gold/30 rounded-full px-4 py-2">
              <div className="flex items-center space-x-2">
                <Star className="text-gold w-4 h-4" />
                <span className="text-gold font-bold">{user.totalPoints.toLocaleString()}</span>
              </div>
            </div>

            {/* Notifications */}
            <button className="relative p-2 text-gray-400 hover:text-petrol transition-colors">
              <Bell className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-coral rounded-full"></span>
            </button>
            
            {/* Profile Menu */}
            <div className="relative">
              <button
                onClick={() => setShowProfileMenu(!showProfileMenu)}
                className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <div className="w-8 h-8 bg-gradient-main rounded-full flex items-center justify-center">
                  <User className="text-white w-4 h-4" />
                </div>
                <span className="hidden md:block text-sm font-medium text-gray-700">
                  {user.name}
                </span>
              </button>

              {/* Profile Dropdown */}
              {showProfileMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-200 py-2 z-50">
                  <div className="px-4 py-2 border-b border-gray-100">
                    <div className="text-sm font-medium text-gray-900">{user.name}</div>
                    <div className="text-xs text-gray-500">{user.email}</div>
                  </div>
                  <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center space-x-2">
                    <Settings className="w-4 h-4" />
                    <span>Settings</span>
                  </button>
                  <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center space-x-2">
                    <Trophy className="w-4 h-4" />
                    <span>Achievements</span>
                  </button>
                  <hr className="my-1" />
                  <button className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50">
                    Sign Out
                  </button>
                </div>
              )}
            </div>
            
          </div>
        </div>
      </div>
    </nav>
  )
}