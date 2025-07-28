'use client'

import { useEffect, useState } from 'react'

interface ProgressRingProps {
  progress: number
  size?: number
  strokeWidth?: number
  showPercentage?: boolean
  className?: string
  color?: 'gradient' | 'turquoise' | 'mint' | 'coral' | 'gold'
}

export function ProgressRing({ 
  progress, 
  size = 120, 
  strokeWidth = 8,
  showPercentage = true,
  className = '',
  color = 'gradient'
}: ProgressRingProps) {
  const [animatedProgress, setAnimatedProgress] = useState(0)
  
  const radius = (size - strokeWidth) / 2
  const circumference = radius * 2 * Math.PI
  const strokeDasharray = circumference
  const strokeDashoffset = circumference - (animatedProgress / 100) * circumference

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedProgress(progress)
    }, 100)
    
    return () => clearTimeout(timer)
  }, [progress])

  const getStrokeColor = () => {
    switch (color) {
      case 'turquoise':
        return '#40E0D0'
      case 'mint':
        return '#98FB98'
      case 'coral':
        return '#FF6B6B'
      case 'gold':
        return '#FFD700'
      default:
        return 'url(#progressGradient)'
    }
  }

  return (
    <div className={`relative ${className}`}>
      <svg
        width={size}
        height={size}
        className="transform -rotate-90"
        viewBox={`0 0 ${size} ${size}`}
      >
        {/* Background Circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="transparent"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          className="text-gray-200"
        />
        
        {/* Progress Circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="transparent"
          stroke={getStrokeColor()}
          strokeWidth={strokeWidth}
          strokeDasharray={strokeDasharray}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          className="transition-all duration-2000 ease-out"
        />
        
        {/* Gradient Definition */}
        {color === 'gradient' && (
          <defs>
            <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#006A6B" />
              <stop offset="100%" stopColor="#40E0D0" />
            </linearGradient>
          </defs>
        )}
      </svg>
      
      {/* Center Content */}
      {showPercentage && (
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-2xl font-bold text-petrol">
            {Math.round(animatedProgress)}%
          </span>
          <span className="text-xs text-gray-500">Complete</span>
        </div>
      )}
    </div>
  )
}