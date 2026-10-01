import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json()
    const lastMessage = messages[messages.length - 1].content

    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.GEMINI_KEY}`
    
    const body = {
      contents: [
        {
          role: 'user',
          parts: [{ text: lastMessage }]
        }
      ]
    }

    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    })

    const data = await response.json()
    console.log('Gemini raw response:', JSON.stringify(data))

    if (data.error) {
      return NextResponse.json({ text: `Error: ${data.error.message}` })
    }

    const text = data.candidates?.[0]?.content?.parts?.[0]?.text || 'No response received.'
    return NextResponse.json({ text })

  } catch (error: any) {
    console.error('API error:', error)
    return NextResponse.json({ text: `Error: ${error.message}` })
  }
  }
