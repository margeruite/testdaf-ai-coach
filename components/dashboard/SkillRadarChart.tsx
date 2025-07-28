'use client'

import { Radar } from 'lucide-react'
import { useState } from 'react'

interface SkillData {
  skill: string
  current: number
  target: number
  color: string
}

export function SkillRadarChart() {
  const [selectedPeriod, setSelectedPeriod] = useState('current')

  const skillsData: SkillData[] = [
    { skill: 'Leseverstehen', current: 3.5, target: 5, color: 'turquoise' },
    { skill: 'Hörverstehen', current: 4.0, target: 5, color: 'mint' },
    { skill: 'Schriftlicher Ausdruck', current: 3.8, target: 5, color: 'gold' },
    { skill: 'Mündlicher Ausdruck', current: 3.2, target: 5, color: 'coral' },
  ]

  const periods = [
    { id: 'current', label: 'Current' },
    { id: 'lastweek', label: 'Last Week' },
    { id: 'lastmonth', label: 'Last Month' }
  ]

  // Create radar chart points
  const createRadarPoints = (values: number[], center = 80, radius = 60) => {
    const angles = values.map((_, i) => (i * 2 * Math.PI) / values.length - Math.PI / 2)
    return values.map((value, i) => {
      const r = (value / 5) * radius // Normalize to 0-5 scale
      const x = center + r * Math.cos(angles[i])
      const y = center + r * Math.sin(angles[i])
      return `${x},${y}`
    }).join(' ')
  }

  const currentValues = skillsData.map(skill => skill.current)
  const targetValues = skillsData.map(skill => skill.target)

  return (
    <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-white/50 shadow-lg">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-r from-turquoise to-mint rounded-xl flex items-center justify-center">
            <Radar className="text-white w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-petrol">Skills Radar</h3>
            <p className="text-sm text-gray-600">Performance overview</p>
          </div>
        </div>
      </div>

      {/* Period Selector */}
      <div className="flex bg-gray-100 rounded-lg p-1 mb-6">
        {periods.map((period) => (
          <button
            key={period.id}
            onClick={() => setSelectedPeriod(period.id)}
            className={`flex-1 py-2 px-3 rounded-md text-sm font-medium transition-all duration-200 ${
              selectedPeriod === period.id
                ? 'bg-white text-petrol shadow-sm'
                : 'text-gray-600 hover:text-petrol'
            }`}
          >
            {period.label}
          </button>
        ))}
      </div>

      {/* Radar Chart */}
      <div className="flex justify-center mb-6">
        <div className="relative">
          <svg width="160" height="160" className="transform">
            {/* Background circles */}
            {[1, 2, 3, 4, 5].map((level) => (
              <circle
                key={level}
                cx="80"
                cy="80"
                r={(level * 60) / 5}
                fill="none"
                stroke="#e5e7eb"
                strokeWidth="1"
                opacity={0.3}
              />
            ))}
            
            {/* Grid lines */}
            {skillsData.map((_, i) => {
              const angle = (i * 2 * Math.PI) / skillsData.length - Math.PI / 2
              const x = 80 + 60 * Math.cos(angle)
              const y = 80 + 60 * Math.sin(angle)
              return (
                <line
                  key={i}
                  x1="80"
                  y1="80"
                  x2={x}
                  y2={y}
                  stroke="#e5e7eb"
                  strokeWidth="1"
                  opacity={0.3}
                />
              )
            })}

            {/* Target polygon */}
            <polygon
              points={createRadarPoints(targetValues)}
              fill="url(#targetGradient)"
              fillOpacity="0.1"
              stroke="#10b981"
              strokeWidth="2"
              strokeDasharray="5,5"
            />

            {/* Current performance polygon */}
            <polygon
              points={createRadarPoints(currentValues)}
              fill="url(#currentGradient)"
              fillOpacity="0.2"
              stroke="#0891b2"
              strokeWidth="2"
            />

            {/* Skill labels */}
            {skillsData.map((skill, i) => {
              const angle = (i * 2 * Math.PI) / skillsData.length - Math.PI / 2
              const labelRadius = 75
              const x = 80 + labelRadius * Math.cos(angle)
              const y = 80 + labelRadius * Math.sin(angle)
              
              return (
                <g key={skill.skill}>
                  <circle cx={x} cy={y} r="3" fill="#0891b2" />
                </g>
              )
            })}

            {/* Gradients */}
            <defs>
              <linearGradient id="currentGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#0891b2" />
                <stop offset="100%" stopColor="#06d6a0" />
              </linearGradient>
              <linearGradient id="targetGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#10b981" />
                <stop offset="100%" stopColor="#34d399" />
              </linearGradient>
            </defs>
          </svg>

          {/* Center TDN indicator */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="bg-white rounded-full w-12 h-12 flex items-center justify-center border-2 border-turquoise shadow-sm">
              <div className="text-center">
                <div className="text-sm font-bold text-petrol">3.6</div>
                <div className="text-xs text-gray-500">Avg</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Skills List */}
      <div className="space-y-3">
        {skillsData.map((skill, index) => (
          <div key={skill.skill} className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className={`w-3 h-3 rounded-full bg-${skill.color}`}></div>
              <span className="text-sm font-medium text-gray-700">{skill.skill}</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-petrol font-bold">TDN {skill.current}</span>
              <span className="text-xs text-gray-400">/</span>
              <span className="text-xs text-gray-500">{skill.target}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Legend */}
      <div className="mt-6 pt-4 border-t border-gray-100">
        <div className="flex justify-between text-sm">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-1 bg-turquoise rounded"></div>
            <span className="text-gray-600">Current Level</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-1 bg-mint border border-mint rounded" style={{ background: 'none', borderStyle: 'dashed' }}></div>
            <span className="text-gray-600">Target Level</span>
          </div>
        </div>
      </div>
    </div>
  )
}