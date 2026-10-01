import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
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
      system: `You are FUTA IQ Assistant, an academic AI helper for students at the Federal University of Technology Akure (FUTA), Nigeria. You help students with understanding course topics, explaining past exam questions, study tips, and FUTA specific courses. Be friendly, encouraging, and clear.`,
      messages
    })
  })

  const data = await response.json()
  return NextResponse.json(data)
}
