'use client'

import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function HomePage() {
  const router = useRouter()
  const [scrollY, setScrollY] = useState(0)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const parallaxOffset = scrollY * 0.4

  return (
    <main className="relative min-h-screen bg-black overflow-x-hidden">
      {/* Layer 1: Background Image with Parallax */}
      <div
        className="fixed inset-0 w-full h-full"
        style={{ transform: `translateY(${parallaxOffset}px)`, zIndex: 0 }}
      >
        <div
          className="absolute inset-0 w-full h-[120%]"
          style={{
            backgroundImage: 'url(/hero-bg.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center top',
            backgroundRepeat: 'no-repeat',
          }}
        />
      </div>

      {/* Layer 2: Gradient Overlay */}
      <div
        className="fixed inset-0"
        style={{
          background: 'linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.5) 30%, rgba(0,0,0,0.8) 60%, rgba(0,0,0,1) 100%)',
          zIndex: 1,
        }}
      />

      {/* Layer 3: Content */}
      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Top Bar */}
        <div className="flex items-center justify-between px-6 pt-14 pb-4">
          <div className="flex flex-col">
            <span
              className="text-xs font-semibold tracking-widest uppercase"
              style={{ color: '#D4AF37', textShadow: '0 0 15px rgba(212,175,55,0.6)' }}
            >
              Chi-Cha Presents
            </span>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/gallery" className="glass-card px-3 py-1.5 text-xs text-white/60 hover:text-white transition-colors">
              Gallery
            </Link>
          </div>
        </div>

        {/* Title */}
        <div className="px-6 mt-2">
          <h1
            className="text-5xl font-black tracking-tight leading-none"
            style={{
              background: 'linear-gradient(135deg, #ffffff 0%, rgba(255,255,255,0.8) 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            U STREET
          </h1>
          <h1
            className="text-5xl font-black tracking-tight leading-none"
            style={{
              background: 'linear-gradient(135deg, #FF1744, #FF6B6B)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              textShadow: 'none',
              filter: 'drop-shadow(0 0 20px rgba(255,23,68,0.6))',
            }}
          >
            LIVE
          </h1>
        </div>

        {/* Spacer */}
        <div className="flex-1" />

        {/* Hero Center — Record Button */}
        <div className="flex flex-col items-center justify-center py-12 px-6">
          {/* TAP TO START label */}
          <p
            className="text-xs font-semibold tracking-[0.4em] uppercase mb-8 text-white/60"
          >
            Tap to Start
          </p>

          {/* The big record button */}
          <button
            onClick={() => router.push('/interview')}
            className="record-button relative flex items-center justify-center rounded-full cursor-pointer select-none active:scale-95 transition-transform"
            style={{
              width: 120,
              height: 120,
              background: 'radial-gradient(circle at 40% 35%, #FF4569, #FF1744 60%, #CC0033)',
              border: '3px solid rgba(255,23,68,0.4)',
            }}
            aria-label="Start recording"
          >
            {/* Inner mic icon */}
            <svg width="48" height="48" viewBox="0 0 24 24" fill="white">
              <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/>
              <path d="M19 10v2a7 7 0 0 1-14 0v-2H3v2a9 9 0 0 0 8 8.94V23h-3v2h8v-2h-3v-2.06A9 9 0 0 0 21 12v-2h-2z"/>
            </svg>

            {/* Outer ring pulse */}
            <div
              className="absolute inset-0 rounded-full"
              style={{
                border: '2px solid rgba(255,23,68,0.3)',
                animation: 'pulse-glow 2s ease-in-out infinite',
                transform: 'scale(1.2)',
              }}
            />
          </button>

          {/* Below button */}
          <p
            className="mt-8 text-sm font-medium tracking-widest uppercase text-center text-white/50"
          >
            Your Next Interview Starts Here
          </p>
        </div>

        {/* Bottom Glassmorphism Card */}
        <div className="px-4 pb-10">
          <div className="glass-card p-5">
            {/* Badge */}
            <div className="flex items-center justify-center mb-4">
              <div
                className="px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase"
                style={{
                  background: 'linear-gradient(135deg, rgba(255,23,68,0.2), rgba(212,175,55,0.2))',
                  border: '1px solid rgba(255,23,68,0.4)',
                  color: '#FF1744',
                }}
              >
                🔴 Live from U Street
              </div>
            </div>

            {/* Stats */}
            <div className="flex items-center justify-around mb-5">
              {[
                { value: '127', label: 'Interviews' },
                { value: '48', label: 'Brands' },
                { value: 'U St NW', label: 'DC' },
              ].map((stat, i) => (
                <div key={i} className="flex flex-col items-center">
                  <span
                    className="text-2xl font-black"
                    style={{ color: i === 0 ? '#FF1744' : i === 1 ? '#D4AF37' : '#fff' }}
                  >
                    {stat.value}
                  </span>
                  <span className="text-xs text-white/40 tracking-wider uppercase mt-0.5">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>

            {/* Divider */}
            <div className="h-px bg-white/10 mb-4" />

            {/* Feature Pills */}
            <div className="flex gap-2 justify-center">
              {[
                { icon: '🎥', label: 'Record' },
                { icon: '✨', label: 'AI Edit' },
                { icon: '📤', label: 'Post' },
              ].map((pill, i) => (
                <div
                  key={i}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium"
                  style={{
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(255,255,255,0.1)',
                  }}
                >
                  <span>{pill.icon}</span>
                  <span className="text-white/80">{pill.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Floating ambient orbs */}
      {mounted && (
        <>
          <div
            className="fixed pointer-events-none"
            style={{
              width: 300,
              height: 300,
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(255,23,68,0.08) 0%, transparent 70%)',
              top: '20%',
              right: '-100px',
              zIndex: 2,
              animation: 'float3d 8s ease-in-out infinite',
            }}
          />
          <div
            className="fixed pointer-events-none"
            style={{
              width: 200,
              height: 200,
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(212,175,55,0.06) 0%, transparent 70%)',
              top: '50%',
              left: '-80px',
              zIndex: 2,
              animation: 'float3d 10s ease-in-out infinite reverse',
            }}
          />
        </>
      )}
    </main>
  )
}
