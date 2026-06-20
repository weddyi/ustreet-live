"use client";
import { useState, useRef, useEffect } from "react";

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

const WHEEL_SEGMENTS = [
  { label: "Truth", emoji: "🔵", color: "#2979FF" },
  { label: "Dare", emoji: "🔴", color: "#FF1744" },
  { label: "Ask", emoji: "❓", color: "#D4AF37" },
  { label: "Challenge", emoji: "⚡", color: "#FF6D00" },
  { label: "Roast", emoji: "🔥", color: "#AA00FF" },
  { label: "Vibe Check", emoji: "✨", color: "#00BCD4" },
];

const QUESTIONS: Record<string, string[]> = {
  Truth: [
    "What's the biggest lie you've told this week?",
    "Who in this room would you date?",
    "What's your most embarrassing drunk story?",
    "What's something no one here knows about you?",
    "What's your biggest regret this year?",
  ],
  Dare: [
    "Do your best impression of someone in the room",
    "Text your ex right now",
    "Do 10 push-ups right now",
    "Call someone and say 'I miss you'",
    "Do your best twerk",
  ],
  Ask: [
    "What's the one thing you'd change about yourself?",
    "What does success actually look like for you?",
    "What are you waiting for?",
    "What would your younger self think of you now?",
    "What's one belief you've changed in the last year?",
  ],
  Challenge: [
    "Say something nice about every person in the room",
    "Do your best celebrity impression",
    "Freestyle rap for 10 seconds about this party",
    "Recreate your best dance move",
    "Do a British accent for the next 2 minutes",
  ],
  Roast: [
    "Give this person a roast that's under 10 words",
    "What would their dating profile bio say?",
    "What's their most predictable personality trait?",
    "Write their Wikipedia first sentence",
  ],
  "Vibe Check": [
    "Does this person have main character energy? Vote.",
    "Rate the fit 1-10",
    "What's this person's vibe in one emoji?",
    "Is this person a lover or a fighter? Defend your answer.",
    "What celebrity does this person remind you of?",
  ],
};

const NUM_SEGMENTS = WHEEL_SEGMENTS.length;
const ANGLE_PER = 360 / NUM_SEGMENTS;

export default function WildPage() {
  const [spinning, setSpinning] = useState(false);
  const [currentAngle, setCurrentAngle] = useState(0);
  const [result, setResult] = useState<{ segment: typeof WHEEL_SEGMENTS[0]; question: string } | null>(null);
  const [animDuration, setAnimDuration] = useState(0);
  const spinCount = useRef(0);
  const [shuffledQuestions, setShuffledQuestions] = useState<Record<string, string[]>>(QUESTIONS);

  useEffect(() => {
    const shuffled: Record<string, string[]> = {};
    for (const cat of Object.keys(QUESTIONS)) {
      shuffled[cat] = shuffleArray(QUESTIONS[cat]);
    }
    setShuffledQuestions(shuffled);
  }, []);

  function randomQ(category: string) {
    const arr = shuffledQuestions[category] || QUESTIONS[category];
    return arr[Math.floor(Math.random() * arr.length)];
  }

  function spin() {
    if (spinning) return;
    setSpinning(true);
    setResult(null);

    const extraSpins = 5 + Math.floor(Math.random() * 4); // 5-8 full spins
    const targetSegmentIdx = Math.floor(Math.random() * NUM_SEGMENTS);
    // Calculate angle so pointer (top) lands on targetSegment
    // Segment 0 starts at top. Pointer is at top (270deg in SVG convention, but we'll just use angle math)
    const targetAngle = currentAngle + extraSpins * 360 + (360 - targetSegmentIdx * ANGLE_PER);
    const duration = 3000 + Math.random() * 1500;

    setAnimDuration(duration);
    setCurrentAngle(targetAngle);

    setTimeout(() => {
      setSpinning(false);
      const seg = WHEEL_SEGMENTS[targetSegmentIdx];
      setResult({ segment: seg, question: randomQ(seg.label) });
      spinCount.current++;
    }, duration + 100);
  }

  // Build SVG wheel
  const cx = 150, cy = 150, r = 130;

  function segmentPath(i: number) {
    const startAngle = (i * ANGLE_PER - 90) * (Math.PI / 180);
    const endAngle = ((i + 1) * ANGLE_PER - 90) * (Math.PI / 180);
    const x1 = cx + r * Math.cos(startAngle);
    const y1 = cy + r * Math.sin(startAngle);
    const x2 = cx + r * Math.cos(endAngle);
    const y2 = cy + r * Math.sin(endAngle);
    return `M ${cx} ${cy} L ${x1} ${y1} A ${r} ${r} 0 0 1 ${x2} ${y2} Z`;
  }

  function labelPos(i: number) {
    const midAngle = ((i + 0.5) * ANGLE_PER - 90) * (Math.PI / 180);
    return {
      x: cx + (r * 0.65) * Math.cos(midAngle),
      y: cy + (r * 0.65) * Math.sin(midAngle),
    };
  }

  return (
    <div style={{
      minHeight: "100dvh",
      background: "linear-gradient(180deg, #0a0a0a 0%, #0a050f 100%)",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      padding: "0 20px",
    }}>
      <div style={{ width: "100%", maxWidth: "430px" }}>
        {/* Header */}
        <div style={{ textAlign: "center", paddingTop: "52px", marginBottom: "28px" }}>
          <div style={{ fontSize: "11px", letterSpacing: "0.3em", color: "rgba(212,175,55,0.7)", fontWeight: 600, marginBottom: "6px" }}>
            CHAOS MODE
          </div>
          <div style={{ fontSize: "28px", fontWeight: 900, letterSpacing: "0.08em", color: "#fff" }}>
            🎲 WILD
          </div>
        </div>

        {/* Wheel */}
        <div style={{ position: "relative", display: "flex", justifyContent: "center", marginBottom: "12px" }}>
          {/* Pointer */}
          <div style={{
            position: "absolute",
            top: "-8px",
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 10,
            fontSize: "24px",
            filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.8))",
          }}>▼</div>

          <div style={{
            transform: `rotate(${currentAngle}deg)`,
            transition: spinning ? `transform ${animDuration}ms cubic-bezier(0.17, 0.67, 0.12, 1)` : "none",
            borderRadius: "50%",
            overflow: "hidden",
            boxShadow: "0 0 40px rgba(212,175,55,0.3)",
          }}>
            <svg width="300" height="300" viewBox="0 0 300 300">
              {WHEEL_SEGMENTS.map((seg, i) => (
                <g key={i}>
                  <path
                    d={segmentPath(i)}
                    fill={seg.color}
                    stroke="rgba(0,0,0,0.3)"
                    strokeWidth="2"
                  />
                  <text
                    x={labelPos(i).x}
                    y={labelPos(i).y}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fontSize="11"
                    fontWeight="800"
                    fill="#fff"
                    transform={`rotate(${(i + 0.5) * ANGLE_PER}, ${labelPos(i).x}, ${labelPos(i).y})`}
                  >
                    {seg.emoji}
                  </text>
                  <text
                    x={labelPos(i).x}
                    y={labelPos(i).y + 14}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fontSize="8"
                    fontWeight="700"
                    fill="rgba(255,255,255,0.9)"
                    transform={`rotate(${(i + 0.5) * ANGLE_PER}, ${labelPos(i).x}, ${labelPos(i).y + 14})`}
                  >
                    {seg.label}
                  </text>
                </g>
              ))}
              <circle cx={cx} cy={cy} r="20" fill="#0a0a0a" stroke="#D4AF37" strokeWidth="3" />
              <text x={cx} y={cy} textAnchor="middle" dominantBaseline="middle" fontSize="14">🎲</text>
            </svg>
          </div>
        </div>

        {/* Spin button */}
        <div style={{ display: "flex", justifyContent: "center", marginBottom: "28px" }}>
          <button
            onClick={spin}
            disabled={spinning}
            className={!spinning ? "pulse-gold" : ""}
            style={{
              padding: "18px 48px",
              borderRadius: "999px",
              background: spinning ? "rgba(255,255,255,0.08)" : "#D4AF37",
              border: "none",
              color: spinning ? "rgba(255,255,255,0.4)" : "#000",
              fontSize: "18px",
              fontWeight: 900,
              letterSpacing: "0.1em",
              cursor: spinning ? "not-allowed" : "pointer",
              transition: "all 0.3s",
            }}
          >
            {spinning ? "SPINNING..." : "🎲 SPIN"}
          </button>
        </div>

        {/* Result card */}
        {result && !spinning && (
          <div className="card-drop" style={{
            borderRadius: "20px",
            border: `2px solid ${result.segment.color}`,
            background: `${result.segment.color}15`,
            padding: "28px 24px",
            textAlign: "center",
          }}>
            <div style={{
              fontSize: "32px",
              marginBottom: "10px",
            }}>{result.segment.emoji}</div>
            <div style={{
              fontSize: "12px",
              fontWeight: 800,
              letterSpacing: "0.25em",
              color: result.segment.color,
              marginBottom: "16px",
            }}>{result.segment.label.toUpperCase()}</div>
            <p style={{
              fontSize: "20px",
              fontWeight: 800,
              color: "#fff",
              lineHeight: 1.45,
            }}>{result.question}</p>
            <button
              onClick={spin}
              style={{
                marginTop: "20px",
                padding: "12px 28px",
                borderRadius: "999px",
                background: "rgba(255,255,255,0.08)",
                border: `1px solid ${result.segment.color}55`,
                color: "rgba(255,255,255,0.6)",
                fontSize: "13px",
                fontWeight: 700,
                cursor: "pointer",
                letterSpacing: "0.08em",
              }}
            >
              SPIN AGAIN 🎲
            </button>
          </div>
        )}

        {/* Segments legend */}
        {!result && !spinning && (
          <div style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "8px",
          }}>
            {WHEEL_SEGMENTS.map((seg) => (
              <div key={seg.label} style={{
                padding: "10px 14px",
                borderRadius: "12px",
                background: `${seg.color}12`,
                border: `1px solid ${seg.color}30`,
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}>
                <span style={{ fontSize: "18px" }}>{seg.emoji}</span>
                <span style={{ fontSize: "13px", fontWeight: 600, color: seg.color }}>{seg.label}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
