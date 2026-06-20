'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

const QUESTIONS: Record<string, string[]> = {
  '🎵 Music': [
    "What song is your anthem right now?",
    "Who's the most underrated artist out of DC?",
    "What's on your playlist tonight?",
    "If your life was a song, what would it be?",
    "What song gets the whole room hyped?"
  ],
  '🍷 Nightlife': [
    "What's your go-to Friday night spot in DC?",
    "Best kept secret on U Street?",
    "Describe your perfect night out in one word",
    "What makes Chi-Cha different from everywhere else?",
    "What time does your night really start?"
  ],
  '🌆 DC Culture': [
    "What's the most DC thing about you?",
    "What do you love most about U Street?",
    "How long have you been in DC and what keeps you here?",
    "What does DC need more of?",
    "Best neighborhood in DC, go!"
  ],
  '🔥 Spicy': [
    "What's your hot take about DC nightlife?",
    "Be honest — best dressed or worst dressed city?",
    "What's something you'd only admit after midnight?",
    "Rate your confidence tonight 1-10 and explain",
    "What's your move when you see someone you used to talk to?"
  ],
  '🏷️ Brand': [
    "If you could start any business tomorrow, what would it be?",
    "What's your biggest money move this year?",
    "Have you been to Chi-Cha Lounge? What's your vibe?",
    "What app are you opening first thing in the morning?",
    "What's your side hustle and why isn't it your main hustle yet?"
  ]
}

const ORIGINAL_CATEGORIES_INTERVIEW = Object.keys(QUESTIONS)

export default function Interview() {
  const router = useRouter()
  const [category, setCategory] = useState('🎵 Music')
  const [qIdx, setQIdx] = useState(0)
  const [shuffledQuestions, setShuffledQuestions] = useState<Record<string, string[]>>({})
  const [categories, setCategories] = useState(ORIGINAL_CATEGORIES_INTERVIEW)

  useEffect(() => {
    const shuffled: Record<string, string[]> = {}
    for (const cat of ORIGINAL_CATEGORIES_INTERVIEW) {
      shuffled[cat] = shuffleArray(QUESTIONS[cat])
    }
    setShuffledQuestions(shuffled)
    setCategories(shuffleArray(ORIGINAL_CATEGORIES_INTERVIEW))
  }, [])

  const questions = (shuffledQuestions[category] || QUESTIONS[category])
  const q = questions[qIdx % questions.length]

  return (
    <div style={{ position: 'fixed', inset: 0, background: '#000', fontFamily: 'Inter, sans-serif', display: 'flex', flexDirection: 'column' }}>
      {/* Top bar */}
      <div style={{ padding: '48px 24px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <button onClick={() => router.push('/')} style={{ color: 'rgba(255,255,255,0.6)', background: 'none', border: '1px solid rgba(255,255,255,0.2)', borderRadius: 20, padding: '6px 14px', fontSize: 13, cursor: 'pointer' }}>← Back</button>
        <span style={{ color: 'white', fontWeight: 900, letterSpacing: 2, fontSize: 13 }}>CHOOSE QUESTIONS</span>
        <div style={{ width: 60 }} />
      </div>

      {/* Category tabs */}
      <div style={{ overflowX: 'auto', display: 'flex', gap: 8, padding: '0 16px 16px', scrollbarWidth: 'none' }}>
        {categories.map(cat => (
          <button key={cat} onClick={() => { setCategory(cat); setQIdx(0) }} style={{
            flexShrink: 0, padding: '8px 16px', borderRadius: 20, border: 'none', cursor: 'pointer', fontSize: 13, fontWeight: 600,
            background: category === cat ? '#FF1744' : 'rgba(255,255,255,0.08)',
            color: 'white', boxShadow: category === cat ? '0 0 20px rgba(255,23,68,0.5)' : 'none'
          }}>{cat}</button>
        ))}
      </div>

      {/* Question card */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '0 24px' }}>
        <div style={{
          background: 'rgba(255,255,255,0.05)', backdropFilter: 'blur(20px)',
          border: '1px solid rgba(255,255,255,0.1)', borderRadius: 28,
          padding: '40px 28px', width: '100%', maxWidth: 380, textAlign: 'center'
        }}>
          <div style={{ color: '#D4AF37', fontSize: 11, letterSpacing: 3, textTransform: 'uppercase', marginBottom: 20 }}>{category}</div>
          <p style={{ color: 'white', fontSize: 22, fontWeight: 700, lineHeight: 1.4, marginBottom: 32 }}>"{q}"</p>
          <div style={{ display: 'flex', gap: 8, justifyContent: 'center' }}>
            <button onClick={() => setQIdx(i => i + 1)} style={{
              background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)',
              color: 'white', padding: '10px 20px', borderRadius: 12, cursor: 'pointer', fontSize: 13
            }}>⏭ Next</button>
            <button onClick={() => setQIdx(Math.floor(Math.random() * questions.length))} style={{
              background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)',
              color: 'white', padding: '10px 20px', borderRadius: 12, cursor: 'pointer', fontSize: 13
            }}>🎲 Shuffle</button>
          </div>
        </div>
      </div>

      {/* Record button */}
      <div style={{ padding: '16px 24px 48px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
        <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: 12 }}>Question {(qIdx % questions.length) + 1} of {questions.length}</p>
        <button style={{
          width: '100%', maxWidth: 380, padding: '18px', borderRadius: 16, border: 'none', cursor: 'pointer',
          background: 'linear-gradient(135deg, #FF1744, #c62828)', color: 'white', fontSize: 17, fontWeight: 900,
          letterSpacing: 2, textTransform: 'uppercase', boxShadow: '0 0 40px rgba(255,23,68,0.5)'
        }}>
          ⬤ START RECORDING
        </button>
        <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: 11 }}>Camera access required</p>
      </div>
    </div>
  )
}
