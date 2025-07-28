'use client'

import { Calendar, Flame, CheckCircle, TrendingUp } from 'lucide-react'
import { format } from 'date-fns'

interface Stats {
  daysUntilTest: number
  currentStreak: number
  totalSessions: number
  overallProgress: number
  testDate?: string
}

interface HeroStatsSectionProps {
  stats: Stats
}

export function HeroStatsSection({ stats }: HeroStatsSectionProps) {
  const statCards = [
    {
      id: 'days-until-test',
      title: 'Days Until Test',
      value: stats.daysUntilTest,
      subtitle: stats.testDate ? format(new Date(stats.testDate), 'MMM dd, yyyy') : 'No date set',
      icon: Calendar,
      color: 'coral',
      bgColor: 'bg-coral/10',
      iconColor: 'text-coral'
    },
    {
      id: 'current-streak',
      title: 'Study Streak',
      value: stats.currentStreak,
      subtitle: stats.currentStreak === 1 ? 'day' : 'days in a row',
      icon: Flame,
      color: 'coral',
      bgColor: 'bg-coral/10',
      iconColor: 'text-coral'
    },
    {
      id: 'total-sessions',
      title: 'Sessions',
      value: stats.totalSessions,
      subtitle: 'completed',
      icon: CheckCircle,
      color: 'turquoise',
      bgColor: 'bg-turquoise/10',
      iconColor: 'text-turquoise'
    },
    {
      id: 'overall-progress',
      title: 'Progress',
      value: `${stats.overallProgress}%`,
      subtitle: 'to TDN 5',
      icon: TrendingUp,
      color: 'mint',
      bgColor: 'bg-mint/10',
      iconColor: 'text-mint'
    }
  ]

  return (
    <section className="max-w-7xl mx-auto px-6 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((card) => {
          const Icon = card.icon
          
          return (
            <div
              key={card.id}
              className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-white/50 shadow-lg hover:shadow-xl transition-all duration-300 group"
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <p className="text-sm text-gray-600 font-medium mb-1">
                    {card.title}
                  </p>
                  <p className={`text-3xl font-bold ${card.iconColor} mb-1`}>
                    {card.value}
                  </p>
                  <p className={`text-xs font-medium ${card.iconColor}`}>
                    {card.subtitle}
                  </p>
                </div>
                
                <div className={`w-12 h-12 ${card.bgColor} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className={`w-6 h-6 ${card.iconColor}`} />
                </div>
              </div>

              {/* Progress bar for progress card */}
              {card.id === 'overall-progress' && (
                <div className="mt-4">
                  <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-mint rounded-full transition-all duration-1000 ease-out"
                      style={{ width: `${stats.overallProgress}%` }}
                    />
                  </div>
                </div>
              )}

              {/* Streak visualization */}
              {card.id === 'current-streak' && stats.currentStreak > 0 && (
                <div className="mt-4 flex space-x-1">
                  {Array.from({ length: Math.min(stats.currentStreak, 7) }).map((_, i) => (
                    <div
                      key={i}
                      className="w-2 h-2 bg-coral rounded-full animate-pulse"
                      style={{ animationDelay: `${i * 100}ms` }}
                    />
                  ))}
                  {stats.currentStreak > 7 && (
                    <div className="text-xs text-coral font-medium ml-2">
                      +{stats.currentStreak - 7}
                    </div>
                  )}
                </div>
              )}
            </div>
          )
        })}
      </div>
    </section>
  )
}