import OpenAI from 'openai'

class OpenAIClient {
  private static instance: OpenAIClient
  private client: OpenAI

  private constructor() {
    if (!process.env.OPENAI_API_KEY) {
      throw new Error('OPENAI_API_KEY environment variable is not set')
    }
    
    this.client = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    })
  }

  public static getInstance(): OpenAIClient {
    if (!OpenAIClient.instance) {
      OpenAIClient.instance = new OpenAIClient()
    }
    return OpenAIClient.instance
  }

  async generateResponse(message: string, context?: string): Promise<string> {
    try {
      const systemPrompt = `You are a TestDaF writing coach AI assistant. You help German language learners improve their writing skills for the TestDaF exam.

Key responsibilities:
- Analyze German texts for grammar, vocabulary, and structure
- Provide constructive feedback in clear, understandable language
- Explain German grammar rules and TestDaF requirements
- Suggest improvements for better TestDaF scores
- Be encouraging and supportive

Respond in a helpful, educational tone. Use emojis sparingly and appropriately. If the user asks about TestDaF writing, focus on the specific requirements like:
- Text structure and organization
- Academic vocabulary usage
- Grammar accuracy
- Argumentation quality
- Meeting TestDaF criteria

${context ? `Additional context: ${context}` : ''}`

      const completion = await this.client.chat.completions.create({
        model: 'gpt-4',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: message }
        ],
        max_tokens: 500,
        temperature: 0.7,
      })

      return completion.choices[0]?.message?.content || 'I apologize, but I could not generate a response. Please try again.'
    } catch (error) {
      console.error('OpenAI API error:', error)
      throw new Error('Failed to generate AI response')
    }
  }

  async analyzeGermanText(text: string): Promise<{
    grammarErrors: Array<{
      text: string
      correction: string
      explanation: string
      position: { start: number; end: number }
      type: 'grammar' | 'spelling' | 'style'
    }>
    vocabularyScore: number
    structureScore: number
    overallScore: number
    suggestions: string[]
  }> {
    try {
      const analysisPrompt = `Analyze this German text for TestDaF writing quality. Provide detailed feedback in the following JSON format:

{
  "grammarErrors": [
    {
      "text": "original text with error",
      "correction": "corrected version",
      "explanation": "explanation in English",
      "position": {"start": 0, "end": 10},
      "type": "grammar"
    }
  ],
  "vocabularyScore": 75,
  "structureScore": 80,
  "overallScore": 78,
  "suggestions": [
    "Use more varied sentence structures",
    "Add transitional phrases"
  ]
}

Text to analyze: "${text}"

Focus on:
- German grammar accuracy (articles, cases, verb positions)
- Academic vocabulary appropriateness
- Text structure and coherence
- TestDaF-specific requirements
- Provide scores out of 100`

      const completion = await this.client.chat.completions.create({
        model: 'gpt-4',
        messages: [{ role: 'user', content: analysisPrompt }],
        max_tokens: 800,
        temperature: 0.3,
      })

      const response = completion.choices[0]?.message?.content
      if (!response) {
        throw new Error('No analysis response received')
      }

      try {
        return JSON.parse(response)
      } catch (parseError) {
        // Fallback if JSON parsing fails
        return {
          grammarErrors: [],
          vocabularyScore: 70,
          structureScore: 75,
          overallScore: 72,
          suggestions: ['Please try uploading the text again for detailed analysis.']
        }
      }
    } catch (error) {
      console.error('Text analysis error:', error)
      throw new Error('Failed to analyze text')
    }
  }
}

export default OpenAIClient