'use client'

import { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'

type Platform = 'TikTok' | 'Instagram Reels' | 'YouTube Shorts'

interface AIResult {
  caption: string
  hashtags: string[]
  title: string
}

export default function PlaybackPage() {
  const router = useRouter()
  const videoRef = useRef<HTMLVideoElement>(null)
  const [videoUrl, setVideoUrl] = useState('')
  const [question, setQuestion] = useState('')
  const [duration, setDuration] = useState(0)
  const [platform, setPlatform] = useState<Platform>('TikTok')
  const [watermark, setWatermark] = useState(false)
  const [aiResult, setAiResult] = useState<AIResult | null>(null)
  const [aiLoading, setAiLoading] = useState(false)
  const [waveActive, setWaveActive] = useState(false)
  const [saved, setSaved] = useState(false)
  const [trimStart, setTrimStart] = useState(0)
  const [trimEnd, setTrimEnd] = useState(100)

  useEffect(() => {
    const url = sessionStorage.getItem('lastRecordingUrl') || ''
    const q = sessionStorage.getItem('lastRecordingQuestion') || ''
    const d = parseInt(sessionStorage.getItem('lastRecordingDuration') || '0')
    setVideoUrl(url)
    setQuestion(q)
    setDuration(d)
  }, [])

  const handleAICaption = async () => {
    setAiLoading(true)
    setWaveActive(true)
    try {
      const res = await fetch('/api/caption', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question, platform }),
      })
      const data = await res.json()
      setAiResult(data)
    } catch (e) {
      setAiResult({
        caption: `DC streets never miss 🔥 Caught this one right on U Street — the realest answers only. Chi-Cha vibes all night 🥂`,
        hashtags: ['#UStreet', '#DCNightlife', '#ChiCha', '#DCStreetInterview', '#DMV', '#DCVibes', '#StreetTalk', '#DCContent', '#NightlifeContent', '#UStreetLive', '#ContentCreator', '#StreetInterview', '#DCMETRO', '#DCFood', '#WashingtonDC'],
        title: 'U Street Never Misses 🔥',
      })
    }
    setAiLoading(false)
    setTimeout(() => setWaveActive(false), 2000)
  }

  const handleSave = () => {
    // Save to localStorage gallery
    const existing = JSON.parse(localStorage.getItem('gallery') || '[]')
    const entry = {
      id: Date.now().toString(),
      url: videoUrl,
      question,
      duration,
      date: new Date().toISOString(),
      platform,
      caption: aiResult?.caption || '',
      hashtags: aiResult?.hashtags || [],
    }
    localStorage.setItem('gallery', JSON.stringify([entry, ...existing]))
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: aiResult?.title || 'U Street Live',
          text: aiResult?.caption || 'Check out this street interview from U Street DC!',
          url: window.location.origin,
        })
      } catch (e) {}
    } else {
      navigator.clipboard.writeText(aiResult?.caption || 'U Street Live — street interviews from DC 🔥')
      alert('Caption copied to clipboard!')
    }
  }

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60)
    const sec = s % 60
    return `${String(m).padStart(2, '0')}:${String(sec).padStart(2, '0')}`
  }

  const platforms: Platform[] = ['TikTok', 'Instagram Reels', 'YouTube Shorts']

  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <div className="flex items-center justify-between px-6 pt-14 pb-4">
        <button
          onClick={() => router.push('/')}
          className="text-white/60 hover:text-white transition-colors"
        >
          ← Home
        </button>
        <span
          className="text-xs font-bold tracking-widest uppercase"
          style={{ color: '#D4AF37' }}
        >
          Edit & Share
        </span>
        <button
          onClick={() => router.push('/gallery')}
          className="text-white/60 hover:text-white text-sm transition-colors"
        >
          Gallery
        </button>
      </div>

      <div className="px-4 pb-20 space-y-4">
        {/* Video Preview Card */}
        <div className="glass-card overflow-hidden">
          {/* Video */}
          <div className="relative bg-black" style={{ aspectRatio: '9/16', maxHeight: 360 }}>
            {videoUrl ? (
              <video
                ref={videoRef}
                src={videoUrl}
                className="w-full h-full object-cover"
                controls
                playsInline
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <p className="text-white/30 text-sm">No recording found</p>
              </div>
            )}

            {/* Watermark overlay */}
            {watermark && (
              <div
                className="absolute bottom-4 left-4 right-4 px-3 py-2 rounded-xl"
                style={{ background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(10px)' }}
              >
                <div className="flex items-center justify-between">
                  <span style={{ color: '#D4AF37', fontSize: 11, fontWeight: 700, letterSpacing: '0.1em' }}>
                    CHI-CHA LOUNGE
                  </span>
                  <span style={{ color: '#FF1744', fontSize: 11, fontWeight: 700, letterSpacing: '0.1em' }}>
                    U STREET LIVE
                  </span>
                </div>
              </div>
            )}

            {/* Waveform animation */}
            {waveActive && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="flex items-end gap-1 h-16">
                  {Array.from({ length: 20 }).map((_, i) => (
                    <div
                      key={i}
                      className="wave-bar w-1.5 rounded-full"
                      style={{
                        height: `${Math.random() * 60 + 10}%`,
                        animationDelay: `${i * 0.06}s`,
                        background: '#FF1744',
                        opacity: 0.8,
                      }}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Question used */}
          {question && (
            <div className="px-4 py-3 border-t border-white/5">
              <p className="text-white/40 text-xs tracking-wider uppercase mb-1">Question used</p>
              <p className="text-white/80 text-sm">{question}</p>
            </div>
          )}

          {/* Duration */}
          <div className="px-4 pb-3 flex gap-4">
            <div>
              <span className="text-white/30 text-xs">Duration</span>
              <span className="text-white/60 text-xs ml-2">{formatTime(duration)}</span>
            </div>
          </div>
        </div>

        {/* Trim Slider */}
        <div className="glass-card p-5">
          <p className="text-white/60 text-xs tracking-wider uppercase mb-3">Clip Trim</p>
          <div className="flex gap-3 items-center">
            <span className="text-white/40 text-xs w-8">
              {Math.round(trimStart * duration / 100)}s
            </span>
            <div className="flex-1 relative">
              <input
                type="range"
                min={0}
                max={100}
                value={trimStart}
                onChange={e => setTrimStart(Number(e.target.value))}
                className="w-full accent-red-500"
              />
            </div>
            <span className="text-white/40 text-xs w-8 text-right">
              {Math.round(trimEnd * duration / 100)}s
            </span>
            <div className="flex-1 relative">
              <input
                type="range"
                min={0}
                max={100}
                value={trimEnd}
                onChange={e => setTrimEnd(Number(e.target.value))}
                className="w-full accent-red-500"
              />
            </div>
          </div>
        </div>

        {/* Platform Selector */}
        <div className="glass-card p-5">
          <p className="text-white/60 text-xs tracking-wider uppercase mb-3">Platform</p>
          <div className="flex gap-2">
            {platforms.map(p => (
              <button
                key={p}
                onClick={() => setPlatform(p)}
                className="flex-1 py-2.5 rounded-xl text-xs font-semibold transition-all"
                style={
                  platform === p
                    ? {
                        background: 'linear-gradient(135deg, #FF1744, #CC0033)',
                        color: '#fff',
                        boxShadow: '0 0 15px rgba(255,23,68,0.3)',
                      }
                    : {
                        background: 'rgba(255,255,255,0.04)',
                        border: '1px solid rgba(255,255,255,0.08)',
                        color: 'rgba(255,255,255,0.5)',
                      }
                }
              >
                {p === 'TikTok' ? '🎵' : p === 'Instagram Reels' ? '📸' : '📺'} {p.split(' ')[0]}
              </button>
            ))}
          </div>
        </div>

        {/* Watermark Toggle */}
        <div className="glass-card p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white text-sm font-semibold">Add Watermark</p>
              <p className="text-white/40 text-xs mt-0.5">Chi-Cha + U Street Live lower third</p>
            </div>
            <button
              onClick={() => setWatermark(w => !w)}
              className="relative w-12 h-6 rounded-full transition-colors duration-200"
              style={{ background: watermark ? '#FF1744' : 'rgba(255,255,255,0.1)' }}
            >
              <div
                className="absolute top-1 w-4 h-4 bg-white rounded-full transition-transform duration-200"
                style={{ transform: watermark ? 'translateX(28px)' : 'translateX(4px)' }}
              />
            </button>
          </div>
        </div>

        {/* AI Caption */}
        <div className="glass-card p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-white text-sm font-semibold">✨ AI Caption</p>
              <p className="text-white/40 text-xs mt-0.5">Generate viral caption + hashtags</p>
            </div>
            <button
              onClick={handleAICaption}
              disabled={aiLoading}
              className="px-4 py-2 rounded-xl text-sm font-bold text-white transition-all active:scale-95"
              style={{
                background: aiLoading
                  ? 'rgba(255,255,255,0.1)'
                  : 'linear-gradient(135deg, rgba(212,175,55,0.3), rgba(212,175,55,0.1))',
                border: '1px solid rgba(212,175,55,0.4)',
                color: '#D4AF37',
              }}
            >
              {aiLoading ? '✨ Writing...' : '✨ Generate'}
            </button>
          </div>

          {aiResult && (
            <div className="space-y-3">
              {/* Title */}
              <div
                className="p-3 rounded-xl"
                style={{ background: 'rgba(212,175,55,0.08)', border: '1px solid rgba(212,175,55,0.2)' }}
              >
                <p className="text-xs text-white/40 mb-1 uppercase tracking-wider">Suggested Title</p>
                <p className="text-white font-semibold text-sm">{aiResult.title}</p>
              </div>

              {/* Caption */}
              <div
                className="p-3 rounded-xl"
                style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
              >
                <p className="text-xs text-white/40 mb-1 uppercase tracking-wider">Caption</p>
                <p className="text-white/80 text-sm leading-relaxed">{aiResult.caption}</p>
              </div>

              {/* Hashtags */}
              <div className="flex flex-wrap gap-1.5">
                {aiResult.hashtags.map((tag, i) => (
                  <span
                    key={i}
                    className="text-xs px-2.5 py-1 rounded-full font-medium"
                    style={{
                      background: 'rgba(255,23,68,0.1)',
                      border: '1px solid rgba(255,23,68,0.25)',
                      color: '#FF6B6B',
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <button
            onClick={handleSave}
            className="flex-1 py-4 rounded-2xl font-bold text-sm transition-all active:scale-95"
            style={{
              background: saved ? 'rgba(34,197,94,0.2)' : 'rgba(255,255,255,0.06)',
              border: `1px solid ${saved ? 'rgba(34,197,94,0.4)' : 'rgba(255,255,255,0.1)'}`,
              color: saved ? '#22c55e' : 'rgba(255,255,255,0.7)',
            }}
          >
            {saved ? '✓ Saved!' : '💾 Save to Gallery'}
          </button>

          <button
            onClick={handleShare}
            className="flex-1 py-4 rounded-2xl font-bold text-sm text-white transition-all active:scale-95"
            style={{
              background: 'linear-gradient(135deg, #FF1744, #CC0033)',
              boxShadow: '0 0 25px rgba(255,23,68,0.4)',
            }}
          >
            Share Now →
          </button>
        </div>
      </div>
    </div>
  )
}
