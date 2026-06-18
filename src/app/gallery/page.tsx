'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'

interface GalleryEntry {
  id: string
  url: string
  question: string
  duration: number
  date: string
  platform: string
  caption: string
  hashtags: string[]
}

export default function GalleryPage() {
  const router = useRouter()
  const [entries, setEntries] = useState<GalleryEntry[]>([])
  const [playing, setPlaying] = useState<string | null>(null)
  const [swipeTarget, setSwipeTarget] = useState<string | null>(null)
  const touchStartX = useRef<Record<string, number>>({})

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('gallery') || '[]')
    setEntries(saved)
  }, [])

  const handleDelete = (id: string) => {
    const updated = entries.filter(e => e.id !== id)
    setEntries(updated)
    localStorage.setItem('gallery', JSON.stringify(updated))
  }

  const handleExportAll = () => {
    const data = JSON.stringify(entries, null, 2)
    const blob = new Blob([data], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'ustreet-gallery.json'
    a.click()
  }

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60)
    const sec = s % 60
    return `${String(m).padStart(2, '0')}:${String(sec).padStart(2, '0')}`
  }

  const formatDate = (iso: string) => {
    return new Date(iso).toLocaleDateString('en-US', {
      month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit',
    })
  }

  const handleTouchStart = (id: string, x: number) => {
    touchStartX.current[id] = x
  }

  const handleTouchEnd = (id: string, x: number) => {
    const dx = touchStartX.current[id] - x
    if (dx > 80) {
      // Swipe left = show delete
      setSwipeTarget(id)
    } else if (dx < -40) {
      setSwipeTarget(null)
    }
  }

  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <div
        className="sticky top-0 z-20 px-6 pt-14 pb-4"
        style={{ background: 'rgba(0,0,0,0.9)', backdropFilter: 'blur(20px)' }}
      >
        <div className="flex items-center justify-between">
          <button
            onClick={() => router.push('/')}
            className="text-white/60 hover:text-white transition-colors"
          >
            ← Back
          </button>
          <div>
            <h1 className="text-lg font-black text-white text-center">Gallery</h1>
            <p
              className="text-xs text-center font-semibold tracking-widest uppercase"
              style={{ color: '#D4AF37' }}
            >
              {entries.length} {entries.length === 1 ? 'interview' : 'interviews'}
            </p>
          </div>
          <button
            onClick={handleExportAll}
            className="text-white/60 hover:text-white text-xs transition-colors"
            style={{ color: '#D4AF37' }}
          >
            Export All
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 pb-20">
        {entries.length === 0 ? (
          /* Empty state */
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div
              className="w-24 h-24 rounded-3xl flex items-center justify-center mb-6"
              style={{ background: 'rgba(255,23,68,0.1)', border: '1px solid rgba(255,23,68,0.2)' }}
            >
              <span className="text-4xl">🎥</span>
            </div>
            <h2 className="text-xl font-bold text-white mb-2">No interviews yet</h2>
            <p className="text-white/40 text-sm mb-8">
              Hit the streets and record your first interview
            </p>
            <button
              onClick={() => router.push('/interview')}
              className="px-8 py-3.5 rounded-2xl font-bold text-white"
              style={{
                background: 'linear-gradient(135deg, #FF1744, #CC0033)',
                boxShadow: '0 0 25px rgba(255,23,68,0.4)',
              }}
            >
              Start Recording →
            </button>
          </div>
        ) : (
          /* Masonry grid */
          <div className="masonry-grid">
            {entries.map((entry, i) => (
              <div
                key={entry.id}
                className="masonry-item relative"
                style={{
                  transform: swipeTarget === entry.id ? 'translateX(-80px)' : 'translateX(0)',
                  transition: 'transform 0.3s ease',
                }}
                onTouchStart={e => handleTouchStart(entry.id, e.touches[0].clientX)}
                onTouchEnd={e => handleTouchEnd(entry.id, e.changedTouches[0].clientX)}
              >
                <div
                  className="rounded-2xl overflow-hidden"
                  style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
                >
                  {/* Thumbnail / Video */}
                  <div
                    className="relative cursor-pointer"
                    style={{ aspectRatio: '9/16' }}
                    onClick={() => setPlaying(playing === entry.id ? null : entry.id)}
                  >
                    {playing === entry.id ? (
                      <video
                        src={entry.url}
                        className="w-full h-full object-cover"
                        autoPlay
                        playsInline
                        controls
                      />
                    ) : (
                      <>
                        <video
                          src={entry.url}
                          className="w-full h-full object-cover"
                          playsInline
                          muted
                        />
                        <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                          <div
                            className="w-12 h-12 rounded-full flex items-center justify-center"
                            style={{ background: 'rgba(255,23,68,0.8)', boxShadow: '0 0 20px rgba(255,23,68,0.4)' }}
                          >
                            <div
                              className="ml-1"
                              style={{
                                width: 0,
                                height: 0,
                                borderTop: '8px solid transparent',
                                borderBottom: '8px solid transparent',
                                borderLeft: '14px solid white',
                              }}
                            />
                          </div>
                        </div>
                        {/* Duration badge */}
                        <div
                          className="absolute bottom-2 right-2 px-2 py-0.5 rounded-lg text-xs font-mono font-bold text-white"
                          style={{ background: 'rgba(0,0,0,0.7)' }}
                        >
                          {formatTime(entry.duration)}
                        </div>
                        {/* Platform badge */}
                        <div
                          className="absolute top-2 left-2 px-2 py-0.5 rounded-lg text-xs font-bold"
                          style={{
                            background: 'rgba(255,23,68,0.8)',
                            color: '#fff',
                          }}
                        >
                          {entry.platform?.split(' ')[0] || 'Video'}
                        </div>
                      </>
                    )}
                  </div>

                  {/* Card info */}
                  <div className="p-3">
                    <p className="text-white/80 text-xs leading-snug line-clamp-2 mb-1">
                      {entry.question || 'Street Interview'}
                    </p>
                    <p className="text-white/30 text-xs">{formatDate(entry.date)}</p>
                  </div>
                </div>

                {/* Delete button (appears on swipe) */}
                {swipeTarget === entry.id && (
                  <button
                    onClick={() => handleDelete(entry.id)}
                    className="absolute right-0 top-0 bottom-0 w-20 flex items-center justify-center rounded-r-2xl"
                    style={{ background: '#FF1744' }}
                  >
                    <span className="text-white text-xs font-bold">Delete</span>
                  </button>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Floating record button */}
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2">
          <button
            onClick={() => router.push('/interview')}
            className="flex items-center gap-2 px-6 py-3.5 rounded-full font-bold text-white text-sm"
            style={{
              background: 'linear-gradient(135deg, #FF1744, #CC0033)',
              boxShadow: '0 0 30px rgba(255,23,68,0.5)',
            }}
          >
            <span className="w-2 h-2 rounded-full bg-white" />
            New Interview
          </button>
        </div>
      </div>
    </div>
  )
}
