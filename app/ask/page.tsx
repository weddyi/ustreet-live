"use client";
import { useState } from "react";

const QUESTIONS: Record<string, { emoji: string; label: string; color: string; qs: string[] }> = {
  deep: {
    emoji: "💬",
    label: "Deep",
    color: "#2979FF",
    qs: [
      "What's the one thing you'd change about yourself?",
      "What's your biggest fear that you never talk about?",
      "What does success actually look like for you?",
      "When did you last feel truly proud of yourself?",
      "What's one belief you've changed in the last year?",
      "What would your younger self think of you now?",
      "What's the last thing that genuinely surprised you?",
      "What are you waiting for?",
    ],
  },
  funny: {
    emoji: "😂",
    label: "Funny",
    color: "#FF6D00",
    qs: [
      "What's your most embarrassing childhood photo?",
      "What's the most ridiculous thing you've ever bought?",
      "What's your go-to excuse to leave a bad date?",
      "What's the weirdest thing you do when no one's watching?",
      "What's a habit that would confuse people if they saw it?",
      "What's the most dramatic thing you've done for attention?",
      "If your life was a reality show what would it be called?",
      "What's your villain laugh sound like?",
    ],
  },
  romantic: {
    emoji: "💕",
    label: "Romantic",
    color: "#F50057",
    qs: [
      "What's the most romantic thing someone has ever done for you?",
      "What quality do you find most attractive?",
      "What's your love language?",
      "What's the worst first date you've ever been on?",
      "What's a green flag you always look for?",
      "When did you last feel butterflies?",
      "What would your ideal relationship look like?",
      "What's something that instantly makes you fall for someone?",
    ],
  },
  ambition: {
    emoji: "💼",
    label: "Ambition",
    color: "#D4AF37",
    qs: [
      "Where do you see yourself in 5 years?",
      "What's the biggest risk you've ever taken?",
      "What would you do if money wasn't an issue?",
      "What's something you're actively building right now?",
      "What's your definition of making it?",
      "What's the hardest lesson you learned about success?",
      "What's your next big move?",
      "What's something you're willing to sacrifice for your goals?",
    ],
  },
};

const MODES = Object.keys(QUESTIONS);

export default function AskPage() {
  const [mode, setMode] = useState("deep");
  const [cardIndex, setCardIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);

  const current = QUESTIONS[mode];
  const q = current.qs[cardIndex % current.qs.length];

  function nextCard() {
    setFlipped(false);
    setTimeout(() => {
      setCardIndex((i) => i + 1);
    }, 200);
  }

  function switchMode(m: string) {
    setMode(m);
    setCardIndex(0);
    setFlipped(false);
  }

  return (
    <div style={{
      minHeight: "100dvh",
      background: "linear-gradient(180deg, #0a0a0a 0%, #070a10 100%)",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      padding: "0 20px",
    }}>
      <div style={{ width: "100%", maxWidth: "430px" }}>
        {/* Header */}
        <div style={{ textAlign: "center", paddingTop: "52px", marginBottom: "28px" }}>
          <div style={{ fontSize: "11px", letterSpacing: "0.3em", color: "rgba(212,175,55,0.7)", fontWeight: 600, marginBottom: "6px" }}>
            CONVERSATION STARTERS
          </div>
          <div style={{ fontSize: "28px", fontWeight: 900, letterSpacing: "0.08em", color: "#fff" }}>
            ❓ ASK
          </div>
        </div>

        {/* Mode pills */}
        <div style={{ display: "flex", gap: "8px", marginBottom: "32px", overflowX: "auto" }} className="no-scrollbar">
          {MODES.map((m) => {
            const info = QUESTIONS[m];
            const active = m === mode;
            return (
              <button
                key={m}
                onClick={() => switchMode(m)}
                style={{
                  flexShrink: 0,
                  padding: "10px 16px",
                  borderRadius: "999px",
                  border: `1.5px solid ${active ? info.color : "rgba(255,255,255,0.15)"}`,
                  background: active ? `${info.color}22` : "rgba(255,255,255,0.05)",
                  color: active ? info.color : "rgba(255,255,255,0.55)",
                  fontSize: "14px",
                  fontWeight: 700,
                  cursor: "pointer",
                  whiteSpace: "nowrap",
                  transition: "all 0.2s",
                }}
              >
                {info.emoji} {info.label}
              </button>
            );
          })}
        </div>

        {/* Card */}
        <div className="card-scene" style={{ margin: "0 auto" }} onClick={() => setFlipped((f) => !f)}>
          <div className={`card-inner ${flipped ? "flipped" : ""}`}>
            {/* Back */}
            <div className="card-face card-back" style={{ borderColor: current.color }}>
              <div style={{ fontSize: "48px", marginBottom: "16px" }}>{current.emoji}</div>
              <div style={{ fontSize: "16px", fontWeight: 700, color: current.color, marginBottom: "8px", letterSpacing: "0.1em" }}>
                {current.label.toUpperCase()}
              </div>
              <div style={{ fontSize: "12px", color: "rgba(255,255,255,0.35)", letterSpacing: "0.15em" }}>
                TAP TO REVEAL
              </div>
            </div>
            {/* Front */}
            <div className="card-face card-front" style={{ borderColor: `${current.color}55` }}>
              <div style={{
                fontSize: "12px",
                color: current.color,
                letterSpacing: "0.2em",
                marginBottom: "20px",
                fontWeight: 700,
              }}>{current.emoji} {current.label.toUpperCase()}</div>
              <p style={{
                fontSize: "22px",
                fontWeight: 800,
                color: "#fff",
                textAlign: "center",
                lineHeight: 1.4,
              }}>{q}</p>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div style={{ marginTop: "28px", display: "flex", flexDirection: "column", gap: "12px", alignItems: "center" }}>
          <div style={{ fontSize: "13px", color: "rgba(255,255,255,0.3)", letterSpacing: "0.1em" }}>
            Tap card to reveal • Tap again to flip back
          </div>
          <button
            onClick={nextCard}
            style={{
              width: "100%",
              padding: "16px",
              borderRadius: "14px",
              background: current.color,
              border: "none",
              color: "#fff",
              fontSize: "16px",
              fontWeight: 800,
              letterSpacing: "0.06em",
              cursor: "pointer",
              boxShadow: `0 4px 20px ${current.color}55`,
              transition: "transform 0.15s",
            }}
          >
            NEXT QUESTION ❓
          </button>
        </div>
      </div>
    </div>
  );
}
