'use client'

import { Trophy, Award, Star, Crown, Zap, Target } from 'lucide-react'
import { useState } from 'react'

interface Achievement {
  id: string
  title: string
  description: string
  icon: any
  color: string
  bgColor: string
  unlocked: boolean
  progress?: number
  maxProgress?: number
  unlockedDate?: string
}

export function AchievementsCard() {
  const [selectedCategory, setSelectedCategory] = useState('recent')

  const achievements: Achievement[] = [
    {
      id: 'first-session',
      title: 'First Steps',
      description: 'Complete your first training session',
      icon: Target,
      color: 'text-turquoise',
      bgColor: 'bg-turquoise/10',
      unlocked: true,
      unlockedDate: '2024-01-15'
    },
    {
      id: 'streak-master',
      title: 'Streak Master',
      description: 'Maintain a 7-day study streak',
      icon: Zap,
      color: 'text-coral',
      bgColor: 'bg-coral/10',
      unlocked: true,
      unlockedDate: '2024-01-22'
    },
    {
      id: 'grammar-guru',
      title: 'Grammar Guru',
      description: 'Score 95% on grammar exercises',
      icon: Crown,
      color: 'text-gold',
      bgColor: 'bg-gold/10',
      unlocked: false,
      progress: 87,
      maxProgress: 95
    },
    {
      id: 'writing-wizard',
      title: 'Writing Wizard',
      description: 'Complete 25 writing exercises',
      icon: Award,
      color: 'text-mint',
      bgColor: 'bg-mint/10',
      unlocked: false,
      progress: 18,
      maxProgress: 25
    },
    {
      id: 'perfectionist',
      title: 'Perfectionist',
      description: 'Get 100% on any exercise',
      icon: Star,
      color: 'text-purple-500',
      bgColor: 'bg-purple-50',
      unlocked: true,
      unlockedDate: '2024-01-20'
    }
  ]

  const categories = [
    { id: 'recent', label: 'Recent', count: achievements.filter(a => a.unlocked).length },
    { id: 'progress', label: 'In Progress', count: achievements.filter(a => !a.unlocked && a.progress).length },
    { id: 'locked', label: 'Locked', count: achievements.filter(a => !a.unlocked && !a.progress).length }
  ]

  const filteredAchievements = achievements.filter(achievement => {
    switch(selectedCategory) {
      case 'recent':
        return achievement.unlocked
      case 'progress':
        return !achievement.unlocked && achievement.progress
      case 'locked':
        return !achievement.unlocked && !achievement.progress
      default:
        return true
    }
  })

  return (
    <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-white/50 shadow-lg">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-r from-gold to-coral rounded-xl flex items-center justify-center">
            <Trophy className="text-white w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-petrol">Achievements</h3>
            <p className="text-sm text-gray-600">Your milestones</p>
          </div>
        </div>
      </div>

      {/* Achievement Summary */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setSelectedCategory(category.id)}
            className={`p-3 rounded-xl text-center transition-all duration-200 ${
              selectedCategory === category.id
                ? 'bg-gradient-main text-white shadow-md'
                : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
            }`}
          >
            <div className="font-bold text-lg">{category.count}</div>
            <div className="text-xs">{category.label}</div>
          </button>
        ))}
      </div>

      {/* Achievements List */}
      <div className="space-y-3 max-h-64 overflow-y-auto scrollbar-hide">
        {filteredAchievements.length === 0 ? (
          <div className="text-center py-8">
            <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Trophy className="w-6 h-6 text-gray-400" />
            </div>
            <p className="text-gray-500 text-sm">No achievements in this category yet</p>
          </div>
        ) : (
          filteredAchievements.map((achievement) => {
            const Icon = achievement.icon
            
            return (
              <div
                key={achievement.id}
                className={`p-4 rounded-xl border transition-all duration-200 hover:shadow-md ${
                  achievement.unlocked
                    ? 'bg-white border-gray-200'
                    : 'bg-gray-50 border-gray-100 opacity-75'
                }`}
              >
                <div className="flex items-start space-x-3">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${achievement.bgColor} ${
                    achievement.unlocked ? '' : 'grayscale'
                  }`}>
                    <Icon className={`w-5 h-5 ${achievement.color}`} />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="font-semibold text-petrol text-sm truncate">
                        {achievement.title}
                      </h4>
                      {achievement.unlocked && (
                        <div className="flex items-center space-x-1">
                          <Star className="w-3 h-3 text-gold fill-current" />
                        </div>
                      )}
                    </div>
                    
                    <p className="text-xs text-gray-600 mb-2 leading-relaxed">
                      {achievement.description}
                    </p>
                    
                    {achievement.unlocked ? (
                      <div className="text-xs text-turquoise font-medium">
                        Unlocked {new Date(achievement.unlockedDate!).toLocaleDateString()}
                      </div>
                    ) : achievement.progress !== undefined ? (
                      <div className="space-y-1">
                        <div className="flex justify-between text-xs">
                          <span className="text-gray-500">Progress</span>
                          <span className="text-petrol font-medium">
                            {achievement.progress}/{achievement.maxProgress}
                          </span>
                        </div>
                        <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-gradient-main rounded-full transition-all duration-1000 ease-out"
                            style={{ width: `${(achievement.progress! / achievement.maxProgress!) * 100}%` }}
                          />
                        </div>
                      </div>
                    ) : (
                      <div className="text-xs text-gray-400">
                        Complete requirements to unlock
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )
          })
        )}
      </div>

      {/* Achievement Points */}
      <div className="mt-6 pt-4 border-t border-gray-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 bg-gold/10 rounded-full flex items-center justify-center">
              <Star className="w-3 h-3 text-gold" />
            </div>
            <span className="text-sm text-gray-600">Achievement Points</span>
          </div>
          <div className="text-lg font-bold text-gold">
            {achievements.filter(a => a.unlocked).length * 50}
          </div>
        </div>
      </div>
    </div>
  )
}