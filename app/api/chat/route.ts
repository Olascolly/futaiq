import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json()

    const lastMessage = messages[messages.length - 1].content
    const history = messages.slice(0, -1).map((m: any) => ({
      role: m.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: m.content }]
    }))

    const response = await fetch(
`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.GEMINI_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          system_instruction: {
            parts: [{
              text: `You are FUTA IQ Assistant, an academic AI helper for students at the Federal University of Technology Akure (FUTA), Nigeria. Help students with course topics, past questions, and study tips. Be friendly, encouraging, and clear. Keep responses concise but complete.`
            }]
          },
          contents: [
            ...history,
            { role: 'user', parts: [{ text: lastMessage }] }
          ]
        })
      }
    )

    const data = await response.json()
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text || 'No response received.'
    return NextResponse.json({ text })

  } catch (error: any) {
    console.error('API error:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
      }
