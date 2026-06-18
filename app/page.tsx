'use client'
import { useRouter } from 'next/navigation'
import { useEffect, useRef } from 'react'

export default function Home() {
  const router = useRouter()
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const particles: {x:number,y:number,r:number,vx:number,vy:number,alpha:number,color:string}[] = []
    const colors = ['#FF1744','#D4AF37','#FF6D00','#FF4081']
    
    for (let i = 0; i < 80; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 3 + 1,
        vx: (Math.random() - 0.5) * 0.5,
        vy: -Math.random() * 0.8 - 0.2,
        alpha: Math.random() * 0.6 + 0.2,
        color: colors[Math.floor(Math.random() * colors.length)]
      })
    }

    let animId: number
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      particles.forEach(p => {
        p.x += p.vx
        p.y += p.vy
        p.alpha -= 0.002
        if (p.y < -10 || p.alpha <= 0) {
          p.y = canvas.height + 10
          p.x = Math.random() * canvas.width
          p.alpha = Math.random() * 0.6 + 0.2
        }
        ctx.save()
        ctx.globalAlpha = p.alpha
        ctx.fillStyle = p.color
        ctx.shadowBlur = 15
        ctx.shadowColor = p.color
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fill()
        ctx.restore()
      })
      animId = requestAnimationFrame(animate)
    }
    animate()
    return () => cancelAnimationFrame(animId)
  }, [])

  return (
    <div style={{
      position: 'fixed', inset: 0, background: '#000',
      display: 'flex', flexDirection: 'column', alignItems: 'center',
      justifyContent: 'space-between', overflow: 'hidden',
      fontFamily: "'Inter', sans-serif"
    }}>
      {/* Hero BG */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: 'url(/hero-bg.jpg)',
        backgroundSize: 'cover', backgroundPosition: 'center',
        opacity: 0.4
      }} />
      
      {/* Dark overlay */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.85) 100%)'
      }} />

      {/* Particles */}
      <canvas ref={canvasRef} style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }} />

      {/* Content */}
      <div style={{ position: 'relative', zIndex: 10, width: '100%', padding: '48px 24px 0' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ color: '#D4AF37', fontSize: 11, letterSpacing: 3, textTransform: 'uppercase', fontWeight: 700 }}>
            Chi-Cha Presents
          </span>
          <span style={{ color: 'white', fontSize: 13, letterSpacing: 4, fontWeight: 900 }}>
            U STREET LIVE
          </span>
        </div>
      </div>

      {/* Center — Record Button */}
      <div style={{ position: 'relative', zIndex: 10, textAlign: 'center', flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 24 }}>
        <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: 11, letterSpacing: 4, textTransform: 'uppercase' }}>
          Tap to Start
        </p>
        
        {/* Pulse rings */}
        <div style={{ position: 'relative', width: 140, height: 140 }}>
          {[1,2,3].map(i => (
            <div key={i} style={{
              position: 'absolute', inset: 0, borderRadius: '50%',
              border: '1px solid rgba(255,23,68,0.4)',
              animation: `pulse-ring ${1 + i * 0.4}s ease-out infinite`,
              animationDelay: `${i * 0.3}s`
            }} />
          ))}
          <button
            onClick={() => router.push('/interview')}
            style={{
              position: 'absolute', inset: 10, borderRadius: '50%',
              background: 'radial-gradient(circle, #FF1744, #c62828)',
              border: 'none', cursor: 'pointer',
              boxShadow: '0 0 40px rgba(255,23,68,0.7), 0 0 80px rgba(255,23,68,0.3)',
              animation: 'pulse-btn 2s ease-in-out infinite',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 40
            }}
          >
            🎤
          </button>
        </div>

        <p style={{ color: 'white', fontSize: 22, fontWeight: 900, letterSpacing: 1, textTransform: 'uppercase', textAlign: 'center', lineHeight: 1.2 }}>
          Your Next Interview<br />Starts Here
        </p>
      </div>

      {/* Bottom glass card */}
      <div style={{
        position: 'relative', zIndex: 10, width: '100%', padding: '0 16px 40px'
      }}>
        <div style={{
          background: 'rgba(255,255,255,0.06)', backdropFilter: 'blur(20px)',
          border: '1px solid rgba(255,255,255,0.1)', borderRadius: 24,
          padding: '20px 24px'
        }}>
          <div style={{
            display: 'inline-block', background: '#FF1744', borderRadius: 20,
            padding: '4px 12px', fontSize: 11, color: 'white', fontWeight: 700,
            letterSpacing: 2, textTransform: 'uppercase', marginBottom: 16
          }}>
            ● Live from U Street
          </div>
          
          <div style={{ display: 'flex', justifyContent: 'space-around', marginBottom: 20 }}>
            {[['127', 'Interviews'], ['48', 'Brands'], ['U St NW', 'DC']].map(([val, label]) => (
              <div key={label} style={{ textAlign: 'center' }}>
                <div style={{ color: '#D4AF37', fontSize: 20, fontWeight: 900 }}>{val}</div>
                <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: 11, letterSpacing: 1 }}>{label}</div>
              </div>
            ))}
          </div>

          <div style={{ display: 'flex', gap: 8 }}>
            {['🎥 Record', '✨ AI Edit', '📤 Post'].map(pill => (
              <div key={pill} style={{
                flex: 1, textAlign: 'center', padding: '8px 4px',
                background: 'rgba(255,255,255,0.08)', borderRadius: 12,
                color: 'white', fontSize: 12, fontWeight: 600
              }}>{pill}</div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes pulse-ring {
          0% { transform: scale(1); opacity: 0.8; }
          100% { transform: scale(2); opacity: 0; }
        }
        @keyframes pulse-btn {
          0%, 100% { box-shadow: 0 0 40px rgba(255,23,68,0.7); transform: scale(1); }
          50% { box-shadow: 0 0 80px rgba(255,23,68,0.9), 0 0 120px rgba(255,23,68,0.4); transform: scale(1.05); }
        }
      `}</style>
    </div>
  )
}
