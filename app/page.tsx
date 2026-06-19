"use client";
import { useState, useRef } from "react";

const QUESTIONS: Record<string, string[]> = {
  "🎵 Music": [
    "What song is your anthem right now?",
    "Who's the most underrated DC artist?",
    "What song describes your night?",
    "If you had to perform right now what would you sing?",
    "What song gets the whole room going?",
    "Last song that made you emotional?",
    "What's your walk-in song?",
    "Guilty pleasure song?",
  ],
  "🌆 DC": [
    "What's the most DC thing about you?",
    "Best spot on U Street?",
    "How long you been in DC?",
    "What does DC need more of?",
    "Best neighborhood go!",
    "DC or ATL?",
    "Describe DC in 3 words",
    "Best thing about being from DC?",
  ],
  "🔥 Spicy": [
    "What's your hot take about DC nightlife?",
    "Rate your confidence tonight 1-10",
    "What would your ex say about you?",
    "Most embarrassing thing you've done sober?",
    "What's your move when you see your ex?",
    "Biggest red flag you ignored?",
    "What do you lie about most?",
    "What are you pretending not to care about?",
  ],
  "🏷️ Brand": [
    "If you started a business tomorrow what would it be?",
    "Have you been to Chi-Cha? Rate it.",
    "What's your side hustle?",
    "What app are you opening first in the morning?",
    "Best investment you ever made?",
    "What's your money move this year?",
    "Entrepreneur or 9-5?",
    "What would make you quit your job today?",
  ],
  "💭 Random": [
    "What's your superpower?",
    "Most unpredictable thing about you?",
    "What would your friends never believe about you?",
    "Last time you surprised yourself?",
    "What's your villain origin story?",
    "Pick: famous, rich, or happy?",
    "What are you known for in your group?",
    "What do people always get wrong about you?",
  ],
};

const CATEGORIES = Object.keys(QUESTIONS);

export default function CardsPage() {
  const [category, setCategory] = useState(CATEGORIES[0]);
  const [cardIndex, setCardIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [totalSeen, setTotalSeen] = useState(1);
  const touchStartX = useRef<number | null>(null);

  const questions = QUESTIONS[category];
  const currentQ = questions[cardIndex % questions.length];

  function nextCard() {
    setFlipped(false);
    setTimeout(() => {
      setCardIndex((i) => i + 1);
      setTotalSeen((t) => t + 1);
    }, 200);
  }

  function handleCategoryChange(cat: string) {
    setCategory(cat);
    setCardIndex(0);
    setFlipped(false);
  }

  function handleTouchStart(e: React.TouchEvent) {
    touchStartX.current = e.touches[0].clientX;
  }

  function handleTouchEnd(e: React.TouchEvent) {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (diff > 60) {
      nextCard();
    }
    touchStartX.current = null;
  }

  return (
    <div style={{
      minHeight: "100dvh",
      position: "relative",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      overflow: "hidden",
    }}>
      {/* Hero background */}
      <div style={{
        position: "fixed",
        inset: 0,
        backgroundImage: "url('/hero-bg.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        zIndex: 0,
      }} />
      <div style={{
        position: "fixed",
        inset: 0,
        background: "linear-gradient(180deg, rgba(10,10,10,0.75) 0%, rgba(10,10,10,0.88) 50%, rgba(10,10,10,0.97) 100%)",
        zIndex: 1,
      }} />

      {/* Content */}
      <div style={{
        position: "relative",
        zIndex: 2,
        width: "100%",
        maxWidth: "430px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "0 20px",
      }}>
        {/* Header */}
        <div style={{ textAlign: "center", paddingTop: "52px", marginBottom: "24px" }}>
          <div style={{ fontSize: "11px", letterSpacing: "0.3em", color: "rgba(212,175,55,0.7)", fontWeight: 600, marginBottom: "6px" }}>
            CHI-CHA PRESENTS
          </div>
          <div style={{
            fontSize: "32px",
            fontWeight: 900,
            letterSpacing: "0.12em",
            color: "#D4AF37",
            textShadow: "0 0 40px rgba(212,175,55,0.5)",
          }}>
            U STREET LIVE
          </div>
        </div>

        {/* Category pills */}
        <div style={{
          display: "flex",
          gap: "8px",
          overflowX: "auto",
          width: "100%",
          paddingBottom: "4px",
          marginBottom: "24px",
        }} className="no-scrollbar">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => handleCategoryChange(cat)}
              style={{
                flexShrink: 0,
                padding: "8px 14px",
                borderRadius: "999px",
                border: `1.5px solid ${cat === category ? "#D4AF37" : "rgba(255,255,255,0.15)"}`,
                background: cat === category ? "rgba(212,175,55,0.15)" : "rgba(255,255,255,0.05)",
                color: cat === category ? "#D4AF37" : "rgba(255,255,255,0.6)",
                fontSize: "13px",
                fontWeight: 600,
                cursor: "pointer",
                whiteSpace: "nowrap",
                transition: "all 0.2s",
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Card */}
        <div
          className="card-scene"
          onClick={() => setFlipped((f) => !f)}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <div className={`card-inner ${flipped ? "flipped" : ""}`}>
            {/* Back (shown first) */}
            <div className="card-face card-back">
              <div style={{
                width: "80px",
                height: "80px",
                borderRadius: "50%",
                background: "rgba(212,175,55,0.2)",
                border: "2px solid rgba(212,175,55,0.5)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "36px",
                marginBottom: "20px",
              }}>🃏</div>
              <div style={{
                fontSize: "22px",
                fontWeight: 900,
                letterSpacing: "0.12em",
                color: "#D4AF37",
                marginBottom: "8px",
              }}>U STREET</div>
              <div style={{
                fontSize: "11px",
                letterSpacing: "0.25em",
                color: "rgba(212,175,55,0.6)",
              }}>TAP TO REVEAL</div>
            </div>

            {/* Front (shows question) */}
            <div className="card-face card-front">
              <div style={{
                fontSize: "11px",
                letterSpacing: "0.25em",
                color: "rgba(212,175,55,0.7)",
                marginBottom: "20px",
                fontWeight: 600,
              }}>{category}</div>
              <p style={{
                fontSize: "22px",
                fontWeight: 800,
                color: "#fff",
                textAlign: "center",
                lineHeight: 1.35,
                letterSpacing: "-0.01em",
              }}>
                {currentQ}
              </p>
              <div style={{
                marginTop: "24px",
                fontSize: "11px",
                color: "rgba(255,255,255,0.3)",
                letterSpacing: "0.1em",
              }}>SWIPE ← FOR NEXT</div>
            </div>
          </div>
        </div>

        {/* Counter & button */}
        <div style={{
          width: "100%",
          marginTop: "28px",
          display: "flex",
          flexDirection: "column",
          gap: "12px",
          alignItems: "center",
        }}>
          <div style={{ fontSize: "13px", color: "rgba(255,255,255,0.35)", letterSpacing: "0.08em" }}>
            Card {totalSeen} of ∞
          </div>
          <button
            onClick={nextCard}
            style={{
              width: "100%",
              padding: "16px",
              borderRadius: "14px",
              background: "#FF1744",
              border: "none",
              color: "#fff",
              fontSize: "16px",
              fontWeight: 800,
              letterSpacing: "0.06em",
              cursor: "pointer",
              boxShadow: "0 4px 20px rgba(255,23,68,0.4)",
              transition: "transform 0.15s, box-shadow 0.15s",
            }}
            onMouseDown={(e) => (e.currentTarget.style.transform = "scale(0.97)")}
            onMouseUp={(e) => (e.currentTarget.style.transform = "scale(1)")}
          >
            NEW CARD 🃏
          </button>
        </div>
      </div>
    </div>
  );
}
