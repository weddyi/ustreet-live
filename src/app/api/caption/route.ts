import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const { question, platform } = await req.json()

    const apiKey = process.env.OPENAI_API_KEY
    if (!apiKey) {
      // Fallback response without API
      return NextResponse.json(generateFallback(question, platform))
    }

    const prompt = `You are a viral social media content expert specializing in DC nightlife and street culture.

A street interview was recorded at Chi-Cha Lounge on U Street NW, Washington DC.
The question asked was: "${question}"
Target platform: ${platform}

Generate a viral caption package. Return JSON with exactly:
{
  "caption": "engaging caption (2-4 sentences, conversational, DC culture vibes, emojis)",
  "hashtags": ["15 relevant hashtags starting with #"],
  "title": "short punchy video title"
}

Make it feel authentic, not corporate. DC street culture, nightlife, Chi-Cha vibes.`

    const res = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o',
        messages: [{ role: 'user', content: prompt }],
        response_format: { type: 'json_object' },
        max_tokens: 500,
      }),
    })

    if (!res.ok) {
      return NextResponse.json(generateFallback(question, platform))
    }

    const data = await res.json()
    const content = JSON.parse(data.choices[0].message.content)

    return NextResponse.json({
      caption: content.caption || '',
      hashtags: content.hashtags || [],
      title: content.title || 'U Street Live 🔥',
    })
  } catch (e) {
    return NextResponse.json(generateFallback('', ''))
  }
}

function generateFallback(question: string, platform: string) {
  const captions = [
    `DC streets never miss 🔥 Caught this one right on U Street — the realest answers only. Chi-Cha vibes all night long 🥂 This is what the culture looks like.`,
    `U Street doesn't lie 🎤 Asked the question, they delivered. DC got the most authentic people in the game fr fr. Chi-Cha Lounge hits different.`,
    `The streets are talking 🔴 U Street NW is built different and this right here proves it. Come to Chi-Cha if you want the real ones.`,
  ]
  return {
    caption: captions[Math.floor(Math.random() * captions.length)],
    hashtags: [
      '#UStreet', '#DCNightlife', '#ChiChaLounge', '#DCStreetInterview',
      '#DMV', '#DCVibes', '#StreetTalk', '#DCContent', '#NightlifeContent',
      '#UStreetLive', '#ContentCreator', '#StreetInterview', '#DCMETRO',
      '#WashingtonDC', '#DCCulture',
    ],
    title: 'U Street Never Misses 🔥',
  }
}
