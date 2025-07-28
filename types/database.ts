export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          email: string
          name: string | null
          native_language: string | null
          current_tdn: number | null
          target_tdn: number | null
          test_date: string | null
          subscription_plan: string | null
          total_points: number
          current_streak: number
          longest_streak: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          name?: string | null
          native_language?: string | null
          current_tdn?: number | null
          target_tdn?: number | null
          test_date?: string | null
          subscription_plan?: string | null
          total_points?: number
          current_streak?: number
          longest_streak?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          name?: string | null
          native_language?: string | null
          current_tdn?: number | null
          target_tdn?: number | null
          test_date?: string | null
          subscription_plan?: string | null
          total_points?: number
          current_streak?: number
          longest_streak?: number
          created_at?: string
          updated_at?: string
        }
      }
      learning_sessions: {
        Row: {
          id: string
          user_id: string
          agent_type: string
          session_data: any
          improvements: any
          duration: number
          accuracy: number
          completed_at: string
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          agent_type: string
          session_data: any
          improvements: any
          duration: number
          accuracy: number
          completed_at?: string
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          agent_type?: string
          session_data?: any
          improvements?: any
          duration?: number
          accuracy?: number
          completed_at?: string
          created_at?: string
        }
      }
      achievements: {
        Row: {
          id: string
          user_id: string
          achievement_type: string
          title: string
          description: string
          points_earned: number
          badge_icon: string
          unlocked_at: string
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          achievement_type: string
          title: string
          description: string
          points_earned: number
          badge_icon: string
          unlocked_at?: string
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          achievement_type?: string
          title?: string
          description?: string
          points_earned?: number
          badge_icon?: string
          unlocked_at?: string
          created_at?: string
        }
      }
      knowledge_embeddings: {
        Row: {
          id: string
          content: string
          embedding: number[]
          metadata: any
          document_type: string
          created_at: string
        }
        Insert: {
          id?: string
          content: string
          embedding: number[]
          metadata: any
          document_type: string
          created_at?: string
        }
        Update: {
          id?: string
          content?: string
          embedding?: number[]
          metadata?: any
          document_type?: string
          created_at?: string
        }
      }
      chat_messages: {
        Row: {
          id: string
          user_id: string
          message: string
          sender: 'user' | 'agent'
          agent_type: string | null
          response_data: any | null
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          message: string
          sender: 'user' | 'agent'
          agent_type?: string | null
          response_data?: any | null
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          message?: string
          sender?: 'user' | 'agent'
          agent_type?: string | null
          response_data?: any | null
          created_at?: string
        }
      }
    }
  }
}

// User-related types
export interface User {
  id: string
  email: string
  name: string | null
  nativeLanguage: string | null
  currentTDN: number | null
  targetTDN: number | null
  testDate: string | null
  subscriptionPlan: string | null
  totalPoints: number
  currentStreak: number
  longestStreak: number
  createdAt: string
  updatedAt: string
}

export interface LearningSession {
  id: string
  userId: string
  agentType: string
  sessionData: any
  improvements: any
  duration: number
  accuracy: number
  completedAt: string
  createdAt: string
}

export interface Achievement {
  id: string
  userId: string
  achievementType: string
  title: string
  description: string
  pointsEarned: number
  badgeIcon: string
  unlockedAt: string
  createdAt: string
}

export interface ChatMessage {
  id: string
  userId: string
  message: string
  sender: 'user' | 'agent'
  agentType: string | null
  responseData: any | null
  createdAt: string
}

// Learning analytics types
export interface UserStats {
  daysUntilTest: number
  currentStreak: number
  totalSessions: number
  overallProgress: number
  weakAreas: SkillArea[]
  strengths: SkillArea[]
  sessionsCompleted: number
  totalStudyTime: number
}

export interface SkillArea {
  skill: string
  level: number
  max: number
  color: string
}

export interface ProgressPoint {
  date: string
  tdn: number
  accuracy: number
}