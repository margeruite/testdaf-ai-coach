'use client'

import { Flame, Calendar, Target, TrendingUp } from 'lucide-react'
import { useState } from 'react'

interface StreakData {
  currentStreak: number
  longestStreak: number
  weeklyGoal: number
  completedThisWeek: number
  streakHistory: boolean[] // Last 30 days
}

export function StreakCard() {
  const [showHistory, setShowHistory] = useState(false)

  const streakData: StreakData = {
    currentStreak: 7,
    longestStreak: 12,
    weeklyGoal: 5,
    completedThisWeek: 4,
    streakHistory: [
      // Last 30 days (most recent first)
      true, true, true, true, true, true, true, // This week
      false, true, true, true, true, true, false, // Last week
      true, true, false, true, true, true, true, // 2 weeks ago
      true, true, true, false, true, true, true, // 3 weeks ago
      true, true, false, false, true, true // 4+ weeks ago
    ]
  }

  const getStreakColor = (streak: number) => {
    if (streak >= 30) return 'from-purple-500 to-pink-500'
    if (streak >= 14) return 'from-coral to-gold'
    if (streak >= 7) return 'from-coral to-coral'
    if (streak >= 3) return 'from-turquoise to-coral'
    return 'from-gray-400 to-gray-500'
  }

  const getStreakEmoji = (streak: number) => {
    if (streak >= 30) return '🚀'
    if (streak >= 14) return '💎'
    if (streak >= 7) return '🔥'
    if (streak >= 3) return '⚡'
    return '💪'
  }

  return (
    <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-white/50 shadow-lg">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className={`w-10 h-10 bg-gradient-to-r ${getStreakColor(streakData.currentStreak)} rounded-xl flex items-center justify-center`}>
            <Flame className="text-white w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-petrol">Study Streak</h3>
            <p className="text-sm text-gray-600">Keep it burning!</p>
          </div>
        </div>
        
        <div className="text-2xl">
          {getStreakEmoji(streakData.currentStreak)}
        </div>
      </div>

      {/* Current Streak Display */}
      <div className="text-center mb-6">
        <div className={`text-4xl font-bold bg-gradient-to-r ${getStreakColor(streakData.currentStreak)} bg-clip-text text-transparent mb-2`}>
          {streakData.currentStreak}
        </div>
        <div className="text-sm text-gray-600 mb-1">
          Days in a row
        </div>
        <div className="text-xs text-gray-500">
          Longest streak: {streakData.longestStreak} days
        </div>
      </div>

      {/* This Week Progress */}
      <div className="bg-gradient-to-r from-turquoise/5 to-coral/5 rounded-xl p-4 mb-6">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <Target className="w-4 h-4 text-petrol" />
            <span className="text-sm font-medium text-petrol">This Week</span>
          </div>
          <span className="text-sm text-gray-600">
            {streakData.completedThisWeek}/{streakData.weeklyGoal} sessions
          </span>
        </div>
        
        <div className="flex space-x-2 mb-3">
          {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, index) => {
            const isCompleted = index < streakData.completedThisWeek
            const isToday = index === new Date().getDay() - 1
            
            return (
              <div key={day} className="flex-1 text-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium mb-1 ${
                  isCompleted 
                    ? 'bg-coral text-white' 
                    : isToday 
                      ? 'bg-coral/20 text-coral border-2 border-coral' 
                      : 'bg-gray-100 text-gray-400'
                }`}>
                  {isCompleted ? '✓' : day.charAt(0)}
                </div>
                <div className="text-xs text-gray-500">{day}</div>
              </div>
            )
          })}
        </div>

        <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-turquoise to-coral rounded-full transition-all duration-1000 ease-out"
            style={{ width: `${(streakData.completedThisWeek / streakData.weeklyGoal) * 100}%` }}
          />
        </div>
      </div>

      {/* Streak History Toggle */}
      <button
        onClick={() => setShowHistory(!showHistory)}
        className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors"
      >
        <div className="flex items-center space-x-2">
          <Calendar className="w-4 h-4 text-petrol" />
          <span className="text-sm font-medium text-petrol">Activity History</span>
        </div>
        <TrendingUp className={`w-4 h-4 text-gray-400 transition-transform ${showHistory ? 'rotate-180' : ''}`} />
      </button>

      {/* Activity History */}
      {showHistory && (
        <div className="mt-4 pt-4 border-t border-gray-100">
          <div className="grid grid-cols-7 gap-1">
            {streakData.streakHistory.slice(0, 28).map((active, index) => (
              <div
                key={index}
                className={`w-4 h-4 rounded-sm ${
                  active 
                    ? 'bg-coral' 
                    : 'bg-gray-200'
                }`}
                title={`${28 - index} days ago: ${active ? 'Active' : 'Rest day'}`}
              />
            ))}
          </div>
          <div className="flex justify-between text-xs text-gray-500 mt-2">
            <span>4 weeks ago</span>
            <span>Today</span>
          </div>
        </div>
      )}

      {/* Streak Motivation */}
      <div className="mt-6 pt-4 border-t border-gray-100">
        <div className="text-center">
          {streakData.currentStreak < 3 ? (
            <p className="text-sm text-gray-600">
              🌱 <span className="font-medium">Keep going!</span> Build your learning habit
            </p>
          ) : streakData.currentStreak < 7 ? (
            <p className="text-sm text-gray-600">
              ⚡ <span className="font-medium">Great momentum!</span> You're on fire
            </p>
          ) : streakData.currentStreak < 14 ? (
            <p className="text-sm text-gray-600">
              🔥 <span className="font-medium">Amazing streak!</span> Keep the flame alive
            </p>
          ) : (
            <p className="text-sm text-gray-600">
              💎 <span className="font-medium">Incredible dedication!</span> You're unstoppable
            </p>
          )}
        </div>
      </div>
    </div>
  )
}