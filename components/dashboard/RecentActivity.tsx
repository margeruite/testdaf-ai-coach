'use client'

import { Clock, MessageCircle, FileText, CheckCircle, TrendingUp, AlertCircle } from 'lucide-react'
import { useState } from 'react'

interface Activity {
  id: string
  type: 'session' | 'achievement' | 'feedback' | 'improvement'
  title: string
  description: string
  timestamp: string
  icon: any
  color: string
  bgColor: string
  score?: number
}

export function RecentActivity() {
  const [selectedFilter, setSelectedFilter] = useState('all')

  const activities: Activity[] = [
    {
      id: '1',
      type: 'session',
      title: 'Writing Practice',
      description: 'Completed essay on "Digitalization in Education"',
      timestamp: '2 hours ago',
      icon: FileText,
      color: 'text-turquoise',
      bgColor: 'bg-turquoise/10',
      score: 87
    },
    {
      id: '2',
      type: 'achievement',
      title: 'Streak Master',
      description: 'Achieved 7-day study streak!',
      timestamp: '1 day ago',
      icon: CheckCircle,
      color: 'text-coral',
      bgColor: 'bg-coral/10'
    },
    {
      id: '3',
      type: 'feedback',
      title: 'Grammar Improvement',
      description: 'Article usage improved by 15%',
      timestamp: '1 day ago',
      icon: TrendingUp,
      color: 'text-mint',
      bgColor: 'bg-mint/10'
    },
    {
      id: '4',
      type: 'session',
      title: 'Reading Comprehension',
      description: 'Academic text analysis exercise',
      timestamp: '2 days ago',
      icon: FileText,
      color: 'text-gold',
      bgColor: 'bg-gold/10',
      score: 92
    },
    {
      id: '5',
      type: 'improvement',
      title: 'Vocabulary Expansion',
      description: 'Added 23 new academic terms',
      timestamp: '3 days ago',
      icon: MessageCircle,
      color: 'text-purple-500',
      bgColor: 'bg-purple-50'
    },
    {
      id: '6',
      type: 'session',
      title: 'Speaking Practice',
      description: 'Oral presentation simulation',
      timestamp: '3 days ago',
      icon: FileText,
      color: 'text-turquoise',
      bgColor: 'bg-turquoise/10',
      score: 78
    }
  ]

  const filters = [
    { id: 'all', label: 'All', count: activities.length },
    { id: 'session', label: 'Sessions', count: activities.filter(a => a.type === 'session').length },
    { id: 'achievement', label: 'Achievements', count: activities.filter(a => a.type === 'achievement').length },
    { id: 'feedback', label: 'Feedback', count: activities.filter(a => a.type === 'feedback' || a.type === 'improvement').length }
  ]

  const filteredActivities = selectedFilter === 'all' 
    ? activities 
    : activities.filter(activity => {
        if (selectedFilter === 'feedback') {
          return activity.type === 'feedback' || activity.type === 'improvement'
        }
        return activity.type === selectedFilter
      })

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-mint'
    if (score >= 80) return 'text-turquoise'
    if (score >= 70) return 'text-gold'
    return 'text-coral'
  }

  const getScoreBg = (score: number) => {
    if (score >= 90) return 'bg-mint/10'
    if (score >= 80) return 'bg-turquoise/10'
    if (score >= 70) return 'bg-gold/10'
    return 'bg-coral/10'
  }

  return (
    <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-white/50 shadow-lg">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-r from-petrol to-turquoise rounded-xl flex items-center justify-center">
            <Clock className="text-white w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-petrol">Recent Activity</h3>
            <p className="text-sm text-gray-600">Your learning history</p>
          </div>
        </div>
      </div>

      {/* Activity Filters */}
      <div className="flex flex-wrap gap-2 mb-6">
        {filters.map((filter) => (
          <button
            key={filter.id}
            onClick={() => setSelectedFilter(filter.id)}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 ${
              selectedFilter === filter.id
                ? 'bg-gradient-main text-white shadow-sm'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {filter.label} ({filter.count})
          </button>
        ))}
      </div>

      {/* Activity List */}
      <div className="space-y-3 max-h-80 overflow-y-auto scrollbar-hide">
        {filteredActivities.length === 0 ? (
          <div className="text-center py-8">
            <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <AlertCircle className="w-6 h-6 text-gray-400" />
            </div>
            <p className="text-gray-500 text-sm">No activities in this category yet</p>
          </div>
        ) : (
          filteredActivities.map((activity) => {
            const Icon = activity.icon
            
            return (
              <div
                key={activity.id}
                className="p-4 rounded-xl bg-white/50 border border-gray-100 hover:shadow-md transition-all duration-200 group"
              >
                <div className="flex items-start space-x-3">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${activity.bgColor} group-hover:scale-110 transition-transform duration-200`}>
                    <Icon className={`w-5 h-5 ${activity.color}`} />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="font-semibold text-petrol text-sm truncate">
                        {activity.title}
                      </h4>
                      {activity.score && (
                        <div className={`px-2 py-1 rounded-full text-xs font-bold ${getScoreBg(activity.score)} ${getScoreColor(activity.score)}`}>
                          {activity.score}%
                        </div>
                      )}
                    </div>
                    
                    <p className="text-xs text-gray-600 mb-2 leading-relaxed">
                      {activity.description}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <div className="text-xs text-gray-500">
                        {activity.timestamp}
                      </div>
                      
                      {/* Activity type badge */}
                      <div className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                        activity.type === 'session' ? 'bg-turquoise/10 text-turquoise' :
                        activity.type === 'achievement' ? 'bg-coral/10 text-coral' :
                        activity.type === 'feedback' ? 'bg-mint/10 text-mint' :
                        'bg-purple-50 text-purple-500'
                      }`}>
                        {activity.type === 'session' ? 'Session' :
                         activity.type === 'achievement' ? 'Achievement' :
                         activity.type === 'feedback' ? 'Feedback' :
                         'Progress'}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )
          })
        )}
      </div>

      {/* Activity Summary */}
      <div className="mt-6 pt-4 border-t border-gray-100">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-lg font-bold text-turquoise">
              {activities.filter(a => a.type === 'session').length}
            </div>
            <div className="text-xs text-gray-500">Sessions</div>
          </div>
          <div>
            <div className="text-lg font-bold text-coral">
              {activities.filter(a => a.type === 'achievement').length}
            </div>
            <div className="text-xs text-gray-500">Achievements</div>
          </div>
          <div>
            <div className="text-lg font-bold text-mint">
              {activities.filter(a => a.score).reduce((avg, a) => avg + (a.score || 0), 0) / activities.filter(a => a.score).length || 0}%
            </div>
            <div className="text-xs text-gray-500">Avg Score</div>
          </div>
        </div>
      </div>
    </div>
  )
}