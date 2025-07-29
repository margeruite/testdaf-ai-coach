import { Message, AnalysisData, APIResponse, ChatError } from '@/types/chat'
import OpenAIClient from '@/lib/openai/client'

class ChatAPIError extends Error {
  constructor(
    message: string,
    public type: ChatError['type'],
    public details?: string
  ) {
    super(message)
    this.name = 'ChatAPIError'
  }
}

export class ChatAPI {
  private static instance: ChatAPI
  private baseURL = '/api'
  private openai: OpenAIClient

  public static getInstance(): ChatAPI {
    if (!ChatAPI.instance) {
      ChatAPI.instance = new ChatAPI()
    }
    return ChatAPI.instance
  }

  private constructor() {
    // Client-side fallback for static export
    if (typeof window !== 'undefined') {
      // Running on client side - use mock responses
      this.openai = null as any
    } else {
      // Running on server side - use real OpenAI
      this.openai = OpenAIClient.getInstance()
    }
  }

  async sendMessage(content: string, userId?: string): Promise<APIResponse<Message>> {
    try {
      if (!content.trim()) {
        throw new ChatAPIError('Message content cannot be empty', 'validation')
      }

      let response: string
      if (typeof window !== 'undefined') {
        // Client-side mock response
        response = this.generateMockResponse(content)
        await new Promise(resolve => setTimeout(resolve, 1000)) // Simulate delay
      } else {
        // Server-side OpenAI response
        response = await this.openai.generateResponse(content)
      }
      
      return {
        success: true,
        data: {
          id: Date.now().toString(),
          content: response,
          sender: 'agent',
          timestamp: new Date(),
          type: 'text'
        }
      }
    } catch (error) {
      return this.handleError(error)
    }
  }

  async uploadAndAnalyzeImage(file: File, userId?: string): Promise<APIResponse<Message>> {
    try {
      this.validateFile(file)
      
      const ocrText = await this.performOCR(file)
      const analysis = await this.analyzeText(ocrText)
      
      return {
        success: true,
        data: {
          id: Date.now().toString(),
          content: this.formatAnalysisResponse(analysis),
          sender: 'agent',
          timestamp: new Date(),
          type: 'analysis',
          metadata: {
            fileName: file.name,
            fileSize: file.size,
            ocrText,
            analysisData: analysis
          }
        }
      }
    } catch (error) {
      return this.handleError(error)
    }
  }

  private validateFile(file: File): void {
    const maxSize = 10 * 1024 * 1024 // 10MB
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']
    
    if (!allowedTypes.includes(file.type)) {
      throw new ChatAPIError(
        'Invalid file type. Please upload JPEG, PNG, or WebP images only.',
        'validation'
      )
    }
    
    if (file.size > maxSize) {
      throw new ChatAPIError(
        'File size too large. Please upload images smaller than 10MB.',
        'validation'
      )
    }
  }

  private async performOCR(file: File): Promise<string> {
    try {
      // TODO: Implement actual OCR using Google Vision API
      // For now, simulate OCR with a delay
      await new Promise(resolve => setTimeout(resolve, 1000))
      return "Die Grafik zeigt die Entwicklung der Studenten in Deutschland von 2010 bis 2020. Man kann sehen, dass die Anzahl der Studenten kontinuierlich gestiegen ist."
    } catch (error) {
      throw new ChatAPIError(
        'Failed to extract text from image',
        'api',
        error instanceof Error ? error.message : 'Unknown OCR error'
      )
    }
  }

  private async analyzeText(text: string): Promise<AnalysisData> {
    try {
      if (typeof window !== 'undefined') {
        // Client-side mock analysis
        await new Promise(resolve => setTimeout(resolve, 1500))
        return this.generateMockAnalysis(text)
      } else {
        // Server-side OpenAI analysis
        return await this.openai.analyzeGermanText(text)
      }
    } catch (error) {
      throw new ChatAPIError(
        'Failed to analyze text',
        'api',
        error instanceof Error ? error.message : 'Unknown analysis error'
      )
    }
  }

  private generateMockResponse(content: string): string {
    if (content.toLowerCase().includes('help')) {
      return "I'm here to help! You can:\n\n📝 **Upload text**: Send me a photo of your handwriting or type directly\n🔍 **Get feedback**: I'll analyze your grammar, vocabulary, and structure\n💡 **Learn**: Ask me about German grammar rules\n🎯 **Practice**: I'll create exercises based on your mistakes\n\nWhat would you like to start with?"
    }
    
    if (content.toLowerCase().includes('grammar')) {
      return "Great! German grammar can be tricky, but I'm here to help. 📚\n\nSome common areas students struggle with:\n• **Articles** (der, die, das)\n• **Cases** (Nominativ, Akkusativ, Dativ, Genitiv)\n• **Word order** in complex sentences\n• **Verb conjugations** and positions\n\nDo you have a specific grammar question, or would you like me to analyze a text you've written?"
    }

    return "I understand you want to improve your TestDaF writing! 🎯\n\nPlease share a text with me (either by typing or uploading an image), and I'll provide detailed feedback on:\n\n✅ **Grammar accuracy**\n✅ **Vocabulary usage**\n✅ **Text structure**\n✅ **TestDaF-specific criteria**\n\nI'll explain everything in your native language to make it easier to understand!"
  }

  private generateMockAnalysis(text: string): AnalysisData {
    return {
      grammarErrors: [
        {
          text: "Die Grafik",
          correction: "Die Grafik",
          explanation: "Correct usage of feminine article",
          position: { start: 0, end: 10 },
          type: 'grammar'
        }
      ],
      vocabularyScore: 78,
      structureScore: 82,
      overallScore: 80,
      suggestions: [
        "Use more varied sentence structures",
        "Consider adding transitional phrases",
        "Good use of academic vocabulary"
      ]
    }
  }


  private formatAnalysisResponse(analysis: AnalysisData): string {
    const { grammarErrors, vocabularyScore, structureScore, overallScore, suggestions } = analysis
    
    let response = "📸 **Image Analysis Complete!**\n\n"
    response += "**Overall Score:** " + overallScore + "/100\n\n"
    
    if (grammarErrors.length > 0) {
      response += "**Grammar Issues Found:**\n"
      grammarErrors.forEach(error => {
        response += `❌ "${error.text}" → "${error.correction}"\n`
        response += `   ${error.explanation}\n\n`
      })
    }
    
    response += "**Detailed Scores:**\n"
    response += `• Grammar: ${vocabularyScore}/100\n`
    response += `• Structure: ${structureScore}/100\n\n`
    
    if (suggestions.length > 0) {
      response += "**Suggestions for Improvement:**\n"
      suggestions.forEach(suggestion => {
        response += `💡 ${suggestion}\n`
      })
    }
    
    return response
  }

  private handleError(error: unknown): APIResponse<never> {
    if (error instanceof ChatAPIError) {
      return {
        success: false,
        error: {
          message: error.message,
          type: error.type,
          details: error.details
        }
      }
    }
    
    return {
      success: false,
      error: {
        message: 'An unexpected error occurred',
        type: 'api',
        details: error instanceof Error ? error.message : 'Unknown error'
      }
    }
  }
}