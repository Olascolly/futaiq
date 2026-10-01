import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json()

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_KEY || '',
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-haiku-4-5-20251001',
        max_tokens: 1024,
        system: `You are FUTA IQ Assistant, an academic AI helper for students at the Federal University of Technology Akure (FUTA), Nigeria. Help students with course topics, past questions, and study tips. Be friendly and clear.`,
        messages
      })
    })

    const data = await response.json()
    console.log('Anthropic response:', JSON.stringify(data))
    
    if (data.error) {
      return NextResponse.json({ error: data.error.message }, { status: 400 })
    }

    const text = data.content?.[0]?.text || 'No response received.'
    return NextResponse.json({ text })

  } catch (error: any) {
    console.error('API error:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
          }
