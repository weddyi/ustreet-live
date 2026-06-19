"use client";
import { useState, useEffect } from "react";

const TRUTHS = [
  "What's the biggest lie you've told this week?",
  "Who in this room would you date?",
  "What's your most embarrassing drunk story?",
  "What's something no one here knows about you?",
  "Rate everyone in the room by attractiveness",
  "What's your biggest regret this year?",
  "Who do you text most?",
  "What's the last thing you googled?",
  "What's your body count? (just kidding — or not)",
  "Confess something you've never told anyone",
];

const DARES = [
  "Do your best impression of someone in the room",
  "Text your ex right now",
  "Let someone post on your Instagram story",
  "Do 10 push-ups right now",
  "Call someone and say 'I miss you'",
  "Show your camera roll to the group",
  "Do your best twerk",
  "Speak in an accent for the next 3 rounds",
  "Give a 30-second speech about why you're a catch",
  "Let someone send a text from your phone",
];

function randomFrom(arr: string[]) {
  return arr[Math.floor(Math.random() * arr.length)];
}

const PLAYER_COLORS = [
  "#FF1744", "#D4AF37", "#2979FF", "#00E676",
  "#FF6D00", "#AA00FF", "#F50057", "#00BCD4",
];

export default function TruthDarePage() {
  const [players, setPlayers] = useState<string[]>([]);
  const [newName, setNewName] = useState("");
  const [currentPlayerIdx, setCurrentPlayerIdx] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [choice, setChoice] = useState<"truth" | "dare" | null>(null);
  const [currentCard, setCurrentCard] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem("usl-players");
    if (saved) setPlayers(JSON.parse(saved));
  }, []);

  function addPlayer() {
    if (!newName.trim() || players.length >= 8) return;
    const updated = [...players, newName.trim()];
    setPlayers(updated);
    localStorage.setItem("usl-players", JSON.stringify(updated));
    setNewName("");
  }

  function removePlayer(i: number) {
    const updated = players.filter((_, idx) => idx !== i);
    setPlayers(updated);
    localStorage.setItem("usl-players", JSON.stringify(updated));
  }

  function handleChoice(type: "truth" | "dare") {
    setChoice(type);
    setCurrentCard(type === "truth" ? randomFrom(TRUTHS) : randomFrom(DARES));
    setFlipped(true);
  }

  function skip() {
    setFlipped(false);
    setChoice(null);
    setCurrentCard("");
    setTimeout(() => {
      setCurrentPlayerIdx((i) => (i + 1) % Math.max(players.length, 1));
    }, 200);
  }

  function next() {
    skip();
  }

  const currentPlayer = players[currentPlayerIdx] || "Player";
  const playerColor = PLAYER_COLORS[currentPlayerIdx % PLAYER_COLORS.length];

  return (
    <div style={{
      minHeight: "100dvh",
      background: "linear-gradient(180deg, #0a0a0a 0%, #0d0508 100%)",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      padding: "0 20px",
    }}>
      <div style={{ width: "100%", maxWidth: "430px" }}>
        {/* Header */}
        <div style={{ textAlign: "center", paddingTop: "52px", marginBottom: "24px" }}>
          <div style={{ fontSize: "11px", letterSpacing: "0.3em", color: "rgba(212,175,55,0.7)", fontWeight: 600, marginBottom: "6px" }}>
            GAME MODE
          </div>
          <div style={{ fontSize: "28px", fontWeight: 900, letterSpacing: "0.08em", color: "#fff" }}>
            🔥 TRUTH OR DARE
          </div>
        </div>

        {/* Player setup */}
        <div style={{
          background: "rgba(255,255,255,0.05)",
          border: "1px solid rgba(255,255,255,0.1)",
          borderRadius: "16px",
          padding: "16px",
          marginBottom: "20px",
        }}>
          <div style={{ fontSize: "12px", color: "rgba(255,255,255,0.5)", letterSpacing: "0.15em", marginBottom: "12px", fontWeight: 600 }}>
            PLAYERS ({players.length}/8)
          </div>

          {/* Player list */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginBottom: "12px" }}>
            {players.map((p, i) => (
              <button
                key={i}
                onClick={() => removePlayer(i)}
                style={{
                  padding: "6px 12px",
                  borderRadius: "999px",
                  background: `${PLAYER_COLORS[i % PLAYER_COLORS.length]}22`,
                  border: `1px solid ${PLAYER_COLORS[i % PLAYER_COLORS.length]}55`,
                  color: PLAYER_COLORS[i % PLAYER_COLORS.length],
                  fontSize: "13px",
                  fontWeight: 600,
                  cursor: "pointer",
                }}
              >
                {p} ✕
              </button>
            ))}
          </div>

          {/* Add player */}
          {players.length < 8 && (
            <div style={{ display: "flex", gap: "8px" }}>
              <input
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && addPlayer()}
                placeholder="Add player name..."
                style={{
                  flex: 1,
                  padding: "10px 14px",
                  borderRadius: "10px",
                  background: "rgba(255,255,255,0.08)",
                  border: "1px solid rgba(255,255,255,0.15)",
                  color: "#fff",
                  fontSize: "14px",
                  outline: "none",
                }}
              />
              <button
                onClick={addPlayer}
                style={{
                  padding: "10px 16px",
                  borderRadius: "10px",
                  background: "#D4AF37",
                  border: "none",
                  color: "#000",
                  fontWeight: 800,
                  fontSize: "14px",
                  cursor: "pointer",
                }}
              >
                Add
              </button>
            </div>
          )}
        </div>

        {/* Current player card */}
        {players.length > 0 && (
          <div style={{ marginBottom: "20px", textAlign: "center" }}>
            <div style={{ fontSize: "12px", color: "rgba(255,255,255,0.4)", letterSpacing: "0.15em", marginBottom: "8px" }}>
              IT&apos;S YOUR TURN
            </div>
            <div style={{
              display: "inline-block",
              padding: "10px 28px",
              borderRadius: "999px",
              background: `${playerColor}22`,
              border: `2px solid ${playerColor}`,
              color: playerColor,
              fontSize: "22px",
              fontWeight: 800,
              letterSpacing: "0.04em",
            }}>
              {currentPlayer}
            </div>
          </div>
        )}

        {/* The card */}
        <div className="card-scene" style={{ margin: "0 auto 20px" }}
          onClick={() => !flipped && null}>
          <div className={`card-inner ${flipped ? "flipped" : ""}`}>
            {/* Back */}
            <div className="card-face card-back" style={{ gap: "16px" }}>
              {!flipped ? (
                <>
                  <div style={{ fontSize: "48px" }}>🔥</div>
                  <div style={{ fontSize: "18px", fontWeight: 800, color: "#D4AF37" }}>
                    {players.length > 0 ? `${currentPlayer}'s turn` : "Add players to start"}
                  </div>
                  <div style={{ fontSize: "12px", color: "rgba(255,255,255,0.4)", letterSpacing: "0.1em" }}>
                    CHOOSE BELOW
                  </div>
                </>
              ) : (
                <>
                  <div style={{ fontSize: "36px" }}>{choice === "truth" ? "🔵" : "🔴"}</div>
                  <div style={{ fontSize: "13px", color: choice === "truth" ? "#2979FF" : "#FF1744", letterSpacing: "0.2em", fontWeight: 700 }}>
                    {choice?.toUpperCase()}
                  </div>
                  <p style={{ fontSize: "20px", fontWeight: 800, textAlign: "center", lineHeight: 1.4, color: "#fff" }}>
                    {currentCard}
                  </p>
                </>
              )}
            </div>
            {/* Front (not used, card stays on back) */}
            <div className="card-face card-front" />
          </div>
        </div>

        {/* Action buttons */}
        <div style={{ display: "flex", gap: "10px", marginBottom: "12px" }}>
          <button
            onClick={() => handleChoice("truth")}
            disabled={players.length === 0}
            style={{
              flex: 1,
              padding: "16px",
              borderRadius: "14px",
              background: flipped && choice === "truth" ? "#2979FF" : "rgba(41,121,255,0.15)",
              border: "2px solid #2979FF",
              color: "#2979FF",
              fontSize: "16px",
              fontWeight: 800,
              cursor: players.length === 0 ? "not-allowed" : "pointer",
              opacity: players.length === 0 ? 0.4 : 1,
              transition: "all 0.2s",
            }}
          >
            TRUTH 🔵
          </button>
          <button
            onClick={() => handleChoice("dare")}
            disabled={players.length === 0}
            style={{
              flex: 1,
              padding: "16px",
              borderRadius: "14px",
              background: flipped && choice === "dare" ? "#FF1744" : "rgba(255,23,68,0.15)",
              border: "2px solid #FF1744",
              color: "#FF1744",
              fontSize: "16px",
              fontWeight: 800,
              cursor: players.length === 0 ? "not-allowed" : "pointer",
              opacity: players.length === 0 ? 0.4 : 1,
              transition: "all 0.2s",
            }}
          >
            DARE 🔴
          </button>
        </div>
        <button
          onClick={next}
          style={{
            width: "100%",
            padding: "14px",
            borderRadius: "14px",
            background: "rgba(255,255,255,0.06)",
            border: "1px solid rgba(255,255,255,0.12)",
            color: "rgba(255,255,255,0.5)",
            fontSize: "14px",
            fontWeight: 700,
            cursor: "pointer",
            letterSpacing: "0.08em",
          }}
        >
          SKIP →
        </button>
      </div>
    </div>
  );
}
