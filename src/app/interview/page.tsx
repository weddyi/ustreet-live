'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { QUESTIONS, CATEGORIES, Category, Question, getByCategory, shuffle } from '../../lib/questions'

type Phase = 'setup' | 'recording'

export default function InterviewPage() {
  const router = useRouter()
  const [phase, setPhase] = useState<Phase>('setup')
  const [selectedCategory, setSelectedCategory] = useState<Category>('Music')
  const [questions, setQuestions] = useState<Question[]>(getByCategory('Music'))
  const [qIndex, setQIndex] = useState(0)
  const [recording, setRecording] = useState(false)
  const [timer, setTimer] = useState(0)
  const [cameraError, setCameraError] = useState('')

  const videoRef = useRef<HTMLVideoElement>(null)
  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const streamRef = useRef<MediaStream | null>(null)
  const chunksRef = useRef<Blob[]>([])
  const timerRef = useRef<NodeJS.Timeout | null>(null)
  const touchStartY = useRef(0)

  // Start camera
  const startCamera = useCallback(async () => {
    try {
      const constraints = {
        video: {
          facingMode: 'environment',
          width: { ideal: 1080 },
          height: { ideal: 1920 },
        },
        audio: true,
      }
      const stream = await navigator.mediaDevices.getUserMedia(constraints)
      streamRef.current = stream
      if (videoRef.current) {
        videoRef.current.srcObject = stream
        videoRef.current.play()
      }
    } catch (err) {
      // Try without environment facing
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true })
        streamRef.current = stream
        if (videoRef.current) {
          videoRef.current.srcObject = stream
          videoRef.current.play()
        }
      } catch (e) {
        setCameraError('Camera access denied. Please allow camera & microphone permissions.')
      }
    }
  }, [])

  useEffect(() => {
    return () => {
      streamRef.current?.getTracks().forEach(t => t.stop())
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [])

  const handleCategoryChange = (cat: Category) => {
    setSelectedCategory(cat)
    setQuestions(getByCategory(cat))
  }

  const handleShuffle = () => {
    setQuestions(shuffle(QUESTIONS))
  }

  const handleStartRecording = async () => {
    await startCamera()
    setPhase('recording')
    setQIndex(0)

    setTimeout(() => {
      if (streamRef.current) {
        const mimeType = MediaRecorder.isTypeSupported('video/webm;codecs=vp9')
          ? 'video/webm;codecs=vp9'
          : MediaRecorder.isTypeSupported('video/webm')
          ? 'video/webm'
          : 'video/mp4'

        chunksRef.current = []
        const mr = new MediaRecorder(streamRef.current, { mimeType })
        mediaRecorderRef.current = mr

        mr.ondataavailable = (e) => {
          if (e.data.size > 0) chunksRef.current.push(e.data)
        }

        mr.onstop = () => {
          const blob = new Blob(chunksRef.current, { type: mimeType })
          const url = URL.createObjectURL(blob)
          // Save to sessionStorage for playback page
          sessionStorage.setItem('lastRecordingUrl', url)
          sessionStorage.setItem('lastRecordingQuestion', questions[qIndex]?.text || '')
          sessionStorage.setItem('lastRecordingDuration', String(timer))
          router.push('/playback')
        }

        mr.start(1000)
        setRecording(true)

        // Start timer
        timerRef.current = setInterval(() => {
          setTimer(t => t + 1)
        }, 1000)
      }
    }, 500)
  }

  const handleStop = () => {
    if (timerRef.current) clearInterval(timerRef.current)
    mediaRecorderRef.current?.stop()
    streamRef.current?.getTracks().forEach(t => t.stop())
  }

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60)
    const sec = s % 60
    return `${String(m).padStart(2, '0')}:${String(sec).padStart(2, '0')}`
  }

  // Swipe up to skip question
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartY.current = e.touches[0].clientY
  }
  const handleTouchEnd = (e: React.TouchEvent) => {
    const dy = touchStartY.current - e.changedTouches[0].clientY
    if (dy > 60) {
      // swipe up = next
      setQIndex(i => Math.min(i + 1, questions.length - 1))
    }
  }

  const currentQ = questions[qIndex]

  if (phase === 'setup') {
    return (
      <div className="min-h-screen bg-black flex flex-col">
        {/* Background */}
        <div
          className="fixed inset-0"
          style={{
            backgroundImage: 'url(/hero-bg.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'brightness(0.3) blur(4px)',
          }}
        />
        <div className="fixed inset-0 bg-black/60" />

        <div className="relative z-10 flex flex-col min-h-screen px-4">
          {/* Header */}
          <div className="flex items-center justify-between pt-14 pb-6">
            <button
              onClick={() => router.push('/')}
              className="text-white/60 hover:text-white transition-colors p-2 -ml-2"
            >
              ← Back
            </button>
            <span
              className="text-xs font-bold tracking-widest uppercase"
              style={{ color: '#D4AF37' }}
            >
              Chi-Cha Presents
            </span>
          </div>

          {/* Card */}
          <div className="glass-card p-6 flex-1 flex flex-col">
            <h2 className="text-2xl font-black mb-1 text-white">Choose Your Questions</h2>
            <p className="text-white/40 text-sm mb-6">Pick a category to set the vibe</p>

            {/* Category Tabs */}
            <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2 mb-6">
              {CATEGORIES.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => handleCategoryChange(cat.id)}
                  className={`flex-shrink-0 flex items-center gap-1.5 px-4 py-2.5 rounded-full text-sm font-semibold transition-all duration-200 ${
                    selectedCategory === cat.id
                      ? 'text-white glow-red'
                      : 'text-white/50 hover:text-white/80'
                  }`}
                  style={
                    selectedCategory === cat.id
                      ? {
                          background: 'linear-gradient(135deg, #FF1744, #CC0033)',
                          boxShadow: '0 0 20px rgba(255,23,68,0.4)',
                        }
                      : { background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }
                  }
                >
                  <span>{cat.icon}</span>
                  <span>{cat.id}</span>
                </button>
              ))}
            </div>

            {/* Question cards */}
            <div className="flex-1 overflow-y-auto no-scrollbar space-y-3 mb-6">
              {questions.map((q, i) => (
                <div
                  key={q.id}
                  className={`p-4 rounded-2xl transition-all duration-200 cursor-pointer ${
                    i === qIndex ? 'neon-border-red' : ''
                  }`}
                  style={{
                    background: i === qIndex
                      ? 'rgba(255,23,68,0.1)'
                      : 'rgba(255,255,255,0.03)',
                    border: i === qIndex
                      ? '1px solid rgba(255,23,68,0.4)'
                      : '1px solid rgba(255,255,255,0.06)',
                  }}
                  onClick={() => setQIndex(i)}
                >
                  <div className="flex items-start gap-3">
                    <span
                      className="text-xs font-bold mt-0.5 min-w-[20px]"
                      style={{ color: i === qIndex ? '#FF1744' : '#D4AF37' }}
                    >
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <p className={`text-sm leading-relaxed ${i === qIndex ? 'text-white' : 'text-white/60'}`}>
                      {q.text}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Buttons */}
            <div className="flex gap-3">
              <button
                onClick={handleShuffle}
                className="flex-1 py-3.5 rounded-2xl text-sm font-semibold text-white/70 hover:text-white transition-colors"
                style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}
              >
                🔀 Shuffle
              </button>
              <button
                onClick={handleStartRecording}
                className="flex-[2] py-3.5 rounded-2xl text-sm font-bold text-white transition-all active:scale-98"
                style={{
                  background: 'linear-gradient(135deg, #FF1744, #CC0033)',
                  boxShadow: '0 0 25px rgba(255,23,68,0.4)',
                }}
              >
                Start Recording →
              </button>
            </div>

            {cameraError && (
              <p className="mt-3 text-xs text-red-400 text-center">{cameraError}</p>
            )}
          </div>
        </div>
      </div>
    )
  }

  // Recording phase
  return (
    <div
      className="fixed inset-0 bg-black"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Camera feed */}
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover"
        playsInline
        muted
        autoPlay
      />

      {/* Dark vignette */}
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.7) 100%)',
        }}
      />

      {/* Bottom gradient */}
      <div
        className="absolute bottom-0 left-0 right-0 h-64"
        style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.95) 0%, transparent 100%)' }}
      />

      {/* TOP: REC indicator + timer */}
      <div className="absolute top-0 left-0 right-0 flex items-center justify-between px-6 pt-14">
        <div className="flex items-center gap-2 glass-dark px-3 py-2 rounded-full">
          <div
            className="rec-dot w-2.5 h-2.5 rounded-full"
            style={{ background: '#FF1744', boxShadow: '0 0 8px rgba(255,23,68,0.8)' }}
          />
          <span className="text-xs font-bold tracking-widest text-white">REC</span>
          <span className="text-xs font-mono text-white/80 ml-1">{formatTime(timer)}</span>
        </div>

        <div
          className="px-3 py-2 rounded-full text-xs font-bold"
          style={{
            background: 'rgba(212,175,55,0.15)',
            border: '1px solid rgba(212,175,55,0.3)',
            color: '#D4AF37',
          }}
        >
          {qIndex + 1}/{questions.length}
        </div>
      </div>

      {/* BOTTOM: Teleprompter question + controls */}
      <div className="absolute bottom-0 left-0 right-0 px-4 pb-10">
        {/* Question pill */}
        <div className="glass-dark p-4 mb-5 rounded-3xl">
          <p
            className="text-xs font-bold tracking-widest uppercase mb-2"
            style={{ color: '#FF1744' }}
          >
            {currentQ?.category}
          </p>
          <p className="text-white text-lg font-semibold leading-snug">
            {currentQ?.text}
          </p>
          <p className="text-white/30 text-xs mt-2">↑ Swipe up to skip</p>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-between gap-3">
          {/* Next question */}
          <button
            onClick={() => setQIndex(i => Math.min(i + 1, questions.length - 1))}
            className="flex-1 py-3.5 rounded-2xl text-sm font-semibold text-white/70 hover:text-white transition-colors"
            style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)' }}
          >
            Next →
          </button>

          {/* STOP button */}
          <button
            onClick={handleStop}
            className="w-16 h-16 rounded-2xl flex items-center justify-center active:scale-95 transition-transform"
            style={{
              background: '#FF1744',
              boxShadow: '0 0 25px rgba(255,23,68,0.6)',
            }}
          >
            <div className="w-5 h-5 rounded-sm bg-white" />
          </button>

          {/* Prev question */}
          <button
            onClick={() => setQIndex(i => Math.max(i - 1, 0))}
            className="flex-1 py-3.5 rounded-2xl text-sm font-semibold text-white/40 hover:text-white/70 transition-colors"
            style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)' }}
          >
            ← Prev
          </button>
        </div>
      </div>
    </div>
  )
}
