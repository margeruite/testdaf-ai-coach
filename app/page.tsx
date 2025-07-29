'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { AuthModal } from '@/components/auth/AuthModal'
import { useAuth } from '@/contexts/AuthContext'
import { ArrowRight, BookOpen, Brain, Globe, MessageCircle, Trophy, Users, Zap } from 'lucide-react'
import Link from 'next/link'

export default function LandingPage() {
  const [isHovered, setIsHovered] = useState<string | null>(null)
  const [showAuthModal, setShowAuthModal] = useState(false)
  const { user } = useAuth()

  const features = [
    {
      id: 'ai-tutor',
      icon: Brain,
      title: 'AI-Powered Tutoring',
      description: 'Get personalized feedback that adapts to your learning style and progress.',
      color: 'from-petrol/10 to-turquoise/10',
      iconColor: 'text-petrol'
    },
    {
      id: 'native-support',
      icon: Globe,
      title: 'Native Language Support',
      description: 'Complex concepts explained in your native language for faster understanding.',
      color: 'from-turquoise/10 to-mint/10',
      iconColor: 'text-turquoise'
    },
    {
      id: 'real-time',
      icon: Zap,
      title: 'Instant Feedback',
      description: 'Receive immediate, detailed corrections and suggestions for improvement.',
      color: 'from-mint/10 to-gold/10',
      iconColor: 'text-mint'
    },
    {
      id: 'gamified',
      icon: Trophy,
      title: 'Gamified Learning',
      description: 'Stay motivated with achievements, streaks, and social sharing features.',
      color: 'from-gold/10 to-coral/10',
      iconColor: 'text-gold'
    }
  ]

  const stats = [
    { value: '10,000+', label: 'Students Helped' },
    { value: '95%', label: 'Success Rate' },
    { value: '24/7', label: 'AI Availability' },
    { value: '15+', label: 'Languages Supported' }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-turquoise/3 to-petrol/5">
      {/* Navigation */}
      <nav className="relative z-50 bg-white/80 backdrop-blur-lg border-b border-gray-200/50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-main rounded-xl p-2">
                <BookOpen className="text-white w-6 h-6" />
              </div>
              <span className="text-xl font-bold text-petrol">TestDaF AI Coach</span>
            </div>

            <div className="hidden md:flex items-center space-x-8">
              <Link href="#features" className="text-gray-600 hover:text-petrol transition-colors">
                Features
              </Link>
              <Link href="#pricing" className="text-gray-600 hover:text-petrol transition-colors">
                Pricing
              </Link>
              <Link href="#about" className="text-gray-600 hover:text-petrol transition-colors">
                About
              </Link>
              {user ? (
                <Link href="/dashboard">
                  <Button size="sm">
                    Dashboard
                  </Button>
                </Link>
              ) : (
                <Button size="sm" onClick={() => setShowAuthModal(true)}>
                  Get Started
                </Button>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-20 pb-32 px-4 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute -top-10 -left-10 w-72 h-72 bg-turquoise/20 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute -bottom-10 -right-10 w-96 h-96 bg-petrol/15 rounded-full blur-3xl animate-pulse-slow delay-1000"></div>
        
        <div className="relative max-w-6xl mx-auto text-center">
          <div className="animate-fade-in">
            <h1 className="text-6xl md:text-7xl font-bold mb-6">
              <span className="text-gradient">TestDaF</span>
              <br />
              <span className="text-4xl md:text-5xl text-gray-700 font-medium">AI Coach</span>
            </h1>
            
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
              Your personal AI tutor for TestDaF success. 
              <span className="text-petrol font-semibold"> Native language support</span> meets 
              <span className="text-turquoise font-semibold"> intelligent adaptation</span>.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              {user ? (
                <Link href="/dashboard">
                  <Button size="lg" className="group">
                    Continue Learning
                    <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform w-5 h-5" />
                  </Button>
                </Link>
              ) : (
                <Button size="lg" className="group" onClick={() => setShowAuthModal(true)}>
                  Start Free Analysis
                  <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform w-5 h-5" />
                </Button>
              )}
              <Button variant="secondary" size="lg">
                <MessageCircle className="mr-2 w-5 h-5" />
                Watch Demo
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-2xl mx-auto">
              {stats.map((stat, index) => (
                <div key={index} className="text-center animate-slide-up" style={{ animationDelay: `${index * 100}ms` }}>
                  <div className="text-2xl md:text-3xl font-bold text-petrol mb-1">
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-600">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-petrol mb-4">
              Why Choose Our AI Coach?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Experience the future of language learning with personalized AI tutoring
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature) => {
              const Icon = feature.icon
              return (
                <div
                  key={feature.id}
                  className={`relative p-8 rounded-2xl border border-white/50 shadow-lg backdrop-blur-sm bg-gradient-to-br ${feature.color} hover:shadow-xl transition-all duration-300 cursor-pointer group`}
                  onMouseEnter={() => setIsHovered(feature.id)}
                  onMouseLeave={() => setIsHovered(null)}
                >
                  <div className="flex items-start space-x-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center bg-white shadow-sm group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className={`w-6 h-6 ${feature.iconColor}`} />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-petrol mb-2">
                        {feature.title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                  
                  {isHovered === feature.id && (
                    <div className="absolute inset-0 rounded-2xl bg-gradient-main opacity-5 animate-fade-in"></div>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-main">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h2 className="text-4xl font-bold mb-4">
            Ready to Master TestDaF?
          </h2>
          <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
            Join thousands of successful students who achieved their TestDaF goals with our AI coach
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            {user ? (
              <Link href="/dashboard">
                <Button variant="secondary" size="lg" className="bg-white text-petrol hover:bg-white/90">
                  <Users className="mr-2 w-5 h-5" />
                  Go to Dashboard
                </Button>
              </Link>
            ) : (
              <Button 
                variant="secondary" 
                size="lg" 
                className="bg-white text-petrol hover:bg-white/90"
                onClick={() => setShowAuthModal(true)}
              >
                <Users className="mr-2 w-5 h-5" />
                Start Your Journey
              </Button>
            )}
            <Button variant="ghost" size="lg" className="text-white border-white/30 hover:bg-white/10">
              Learn More
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-petrol text-white py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-3 mb-4">
                <div className="bg-turquoise rounded-xl p-2">
                  <BookOpen className="text-petrol w-6 h-6" />
                </div>
                <span className="text-xl font-bold">TestDaF AI Coach</span>
              </div>
              <p className="text-turquoise/80 leading-relaxed max-w-md">
                Empowering students worldwide to achieve their German language goals through AI-powered personalized learning.
              </p>
            </div>
            
            <div>
              <h4 className="font-bold mb-4">Product</h4>
              <ul className="space-y-2 text-turquoise/80">
                <li><Link href="#" className="hover:text-white transition-colors">Features</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Pricing</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">API</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold mb-4">Support</h4>
              <ul className="space-y-2 text-turquoise/80">
                <li><Link href="#" className="hover:text-white transition-colors">Help Center</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Contact</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Privacy</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-turquoise/30 mt-8 pt-8 text-center text-turquoise/60">
            <p>&copy; 2024 TestDaF AI Coach. All rights reserved.</p>
          </div>
        </div>
      </footer>

      <AuthModal 
        isOpen={showAuthModal} 
        onClose={() => setShowAuthModal(false)} 
      />
    </div>
  )
}