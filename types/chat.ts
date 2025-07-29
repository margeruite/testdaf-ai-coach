export interface Message {
  id: string
  content: string
  sender: 'user' | 'agent'
  timestamp: Date
  type?: 'text' | 'image' | 'analysis'
  metadata?: MessageMetadata
}

export interface MessageMetadata {
  fileName?: string
  fileSize?: number
  imageUrl?: string
  ocrText?: string
  analysisData?: AnalysisData
}

export interface AnalysisData {
  grammarErrors: GrammarError[]
  vocabularyScore: number
  structureScore: number
  overallScore: number
  suggestions: string[]
}

export interface GrammarError {
  text: string
  correction: string
  explanation: string
  position: {
    start: number
    end: number
  }
  type: 'grammar' | 'spelling' | 'style'
}

export interface FileUploadEvent extends Event {
  target: HTMLInputElement & EventTarget
}

export interface ChatError {
  message: string
  type: 'upload' | 'api' | 'network' | 'validation'
  details?: string
}

export interface APIResponse<T = any> {
  success: boolean
  data?: T
  error?: ChatError
}