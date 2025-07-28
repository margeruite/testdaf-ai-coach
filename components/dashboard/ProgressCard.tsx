'use client'

import { BookOpen, Target, TrendingUp } from 'lucide-react'
import { ProgressRing } from '@/components/ui/ProgressRing'

interface SkillProgress {
  skill: string
  current: number
  target: number
  color: string
}

export function ProgressCard() {
  const overallProgress = 68
  const currentTDN = 3.5
  const targetTDN = 5

  const skillsProgress: SkillProgress[] = [
    { skill: 'Schriftlicher Ausdruck', current: 4, target: 5, color: 'turquoise' },
    { skill: 'Leseverstehen', current: 3, target: 5, color: 'mint' },
    { skill: 'Hörverstehen', current: 4, target: 5, color: 'gold' },
    { skill: 'Mündlicher Ausdruck', current: 3, target: 5, color: 'coral' },
  ]

  const getProgressPercentage = (current: number, target: number) => {
    return Math.min((current / target) * 100, 100)
  }

  return (
    <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-white/50 shadow-lg">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-main rounded-xl flex items-center justify-center">
            <TrendingUp className="text-white w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-petrol">Progress Overview</h3>
            <p className="text-sm text-gray-600">Your learning journey</p>
          </div>
        </div>
      </div>

      {/* Overall Progress Ring */}
      <div className="flex items-center justify-center mb-6">
        <div className="relative">
          <ProgressRing 
            progress={overallProgress} 
            size={120} 
            strokeWidth={8}
            color="turquoise"
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <div className="text-2xl font-bold text-petrol">{overallProgress}%</div>
            <div className="text-xs text-gray-500">Complete</div>
          </div>
        </div>
      </div>

      {/* TDN Progress */}
      <div className="bg-gradient-to-r from-petrol/5 to-turquoise/5 rounded-xl p-4 mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-700">Current TDN Level</span>
          <div className="flex items-center space-x-1">
            <Target className="w-4 h-4 text-petrol" />
            <span className="text-sm text-petrol font-bold">Target: TDN {targetTDN}</span>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <div className="text-3xl font-bold text-petrol">TDN {currentTDN}</div>
          <div className="flex-1">
            <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-main rounded-full transition-all duration-1000 ease-out"
                style={{ width: `${getProgressPercentage(currentTDN, targetTDN)}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Skills Breakdown */}
      <div className="space-y-4">
        <h4 className="font-semibold text-petrol text-sm flex items-center">
          <BookOpen className="w-4 h-4 mr-2" />
          Skills Breakdown
        </h4>
        
        {skillsProgress.map((skill, index) => (
          <div key={skill.skill} className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700">{skill.skill}</span>
              <span className="text-sm text-gray-500">TDN {skill.current}/{skill.target}</span>
            </div>
            
            <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className={`h-full rounded-full transition-all duration-1000 ease-out bg-${skill.color}`}
                style={{ 
                  width: `${getProgressPercentage(skill.current, skill.target)}%`,
                  animationDelay: `${index * 200}ms`
                }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Quick Stats */}
      <div className="mt-6 pt-4 border-t border-gray-100">
        <div className="grid grid-cols-2 gap-4 text-center">
          <div>
            <div className="text-lg font-bold text-turquoise">85%</div>
            <div className="text-xs text-gray-500">Accuracy</div>
          </div>
          <div>
            <div className="text-lg font-bold text-mint">12</div>
            <div className="text-xs text-gray-500">Weak Areas</div>
          </div>
        </div>
      </div>
    </div>
  )
}