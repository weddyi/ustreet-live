"use client";
import { useState } from "react";

const CARD_TYPES = [
  {
    color: "🔴",
    bg: "#FF1744",
    label: "RED",
    action: "Answer a truth question",
    detail: "Be honest — no filter.",
  },
  {
    color: "🔵",
    bg: "#2979FF",
    label: "BLUE",
    action: "Give someone a dare",
    detail: "Pick a player and dare them.",
  },
  {
    color: "🟡",
    bg: "#FFD600",
    label: "YELLOW",
    action: "Make a rule for the group",
    detail: "Your rule, everyone follows.",
  },
  {
    color: "🟢",
    bg: "#00C853",
    label: "GREEN",
    action: "Safe card",
    detail: "Share a fun fact about yourself.",
  },
  {
    color: "⚫",
    bg: "#424242",
    label: "WILD",
    action: "You pick ANY action",
    detail: "For any player. Total power.",
  },
  {
    color: "🔄",
    bg: "#AA00FF",
    label: "REVERSE",
    action: "Opponent takes the action",
    detail: "The person who played against you goes instead.",
  },
];

const PLAYER_COLORS = ["#FF1744", "#D4AF37", "#2979FF", "#00E676", "#FF6D00", "#AA00FF", "#F50057", "#00BCD4"];

function randomCard() {
  return CARD_TYPES[Math.floor(Math.random() * CARD_TYPES.length)];
}

type Player = { name: string; card: typeof CARD_TYPES[0] | null; revealed: boolean };

export default function UnoPage() {
  const [phase, setPhase] = useState<"setup" | "game">("setup");
  const [players, setPlayers] = useState<Player[]>([]);
  const [newName, setNewName] = useState("");

  function addPlayer() {
    if (!newName.trim() || players.length >= 8) return;
    setPlayers([...players, { name: newName.trim(), card: null, revealed: false }]);
    setNewName("");
  }

  function dealCards() {
    if (players.length < 2) return;
    setPlayers(players.map((p) => ({ ...p, card: randomCard(), revealed: false })));
    setPhase("game");
  }

  function revealCard(i: number) {
    setPlayers((prev) => prev.map((p, idx) => idx === i ? { ...p, revealed: true } : p));
  }

  function reset() {
    setPhase("setup");
    setPlayers(players.map((p) => ({ ...p, card: null, revealed: false })));
  }

  return (
    <div style={{
      minHeight: "100dvh",
      background: "linear-gradient(180deg, #0a0a0a 0%, #0a080f 100%)",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      padding: "0 20px",
    }}>
      <div style={{ width: "100%", maxWidth: "430px" }}>
        {/* Header */}
        <div style={{ textAlign: "center", paddingTop: "52px", marginBottom: "24px" }}>
          <div style={{ fontSize: "11px", letterSpacing: "0.3em", color: "rgba(212,175,55,0.7)", fontWeight: 600, marginBottom: "6px" }}>
            ORIGINAL GAME
          </div>
          <div style={{ fontSize: "28px", fontWeight: 900, letterSpacing: "0.06em", color: "#fff" }}>
            🎴 SWITCH UP
          </div>
          <div style={{ fontSize: "12px", color: "rgba(255,255,255,0.35)", marginTop: "6px" }}>
            Social party card game
          </div>
        </div>

        {/* How to play */}
        <div style={{
          background: "rgba(255,255,255,0.04)",
          border: "1px solid rgba(255,255,255,0.08)",
          borderRadius: "16px",
          padding: "16px",
          marginBottom: "20px",
        }}>
          <div style={{ fontSize: "11px", color: "rgba(212,175,55,0.8)", letterSpacing: "0.2em", fontWeight: 700, marginBottom: "12px" }}>
            HOW TO PLAY
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            {CARD_TYPES.map((ct) => (
              <div key={ct.label} style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <span style={{ fontSize: "18px", width: "24px", textAlign: "center" }}>{ct.color}</span>
                <div>
                  <span style={{ color: ct.bg, fontWeight: 700, fontSize: "13px" }}>{ct.label}: </span>
                  <span style={{ color: "rgba(255,255,255,0.6)", fontSize: "13px" }}>{ct.action}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {phase === "setup" ? (
          <>
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
              <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginBottom: "12px" }}>
                {players.map((p, i) => (
                  <button
                    key={i}
                    onClick={() => setPlayers(players.filter((_, idx) => idx !== i))}
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
                    {p.name} ✕
                  </button>
                ))}
              </div>
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

            <button
              onClick={dealCards}
              disabled={players.length < 2}
              style={{
                width: "100%",
                padding: "18px",
                borderRadius: "14px",
                background: players.length >= 2 ? "#FF1744" : "rgba(255,255,255,0.1)",
                border: "none",
                color: players.length >= 2 ? "#fff" : "rgba(255,255,255,0.3)",
                fontSize: "17px",
                fontWeight: 800,
                letterSpacing: "0.08em",
                cursor: players.length >= 2 ? "pointer" : "not-allowed",
                boxShadow: players.length >= 2 ? "0 4px 20px rgba(255,23,68,0.4)" : "none",
              }}
            >
              🎴 DEAL CARDS
            </button>
            {players.length < 2 && (
              <div style={{ textAlign: "center", marginTop: "10px", fontSize: "13px", color: "rgba(255,255,255,0.3)" }}>
                Add at least 2 players to start
              </div>
            )}
          </>
        ) : (
          <>
            {/* Game cards */}
            <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginBottom: "20px" }}>
              {players.map((p, i) => {
                const card = p.card!;
                return (
                  <div
                    key={i}
                    onClick={() => !p.revealed && revealCard(i)}
                    style={{
                      borderRadius: "16px",
                      border: `2px solid ${p.revealed ? card.bg : "rgba(255,255,255,0.12)"}`,
                      background: p.revealed ? `${card.bg}18` : "rgba(255,255,255,0.05)",
                      padding: "16px 20px",
                      cursor: p.revealed ? "default" : "pointer",
                      transition: "all 0.3s",
                      display: "flex",
                      alignItems: "center",
                      gap: "14px",
                    }}
                  >
                    <div style={{
                      width: "48px",
                      height: "48px",
                      borderRadius: "12px",
                      background: p.revealed ? card.bg : "rgba(255,255,255,0.1)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "22px",
                      flexShrink: 0,
                      transition: "all 0.3s",
                    }}>
                      {p.revealed ? card.color : "🎴"}
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{
                        fontWeight: 800,
                        fontSize: "15px",
                        color: PLAYER_COLORS[i % PLAYER_COLORS.length],
                        marginBottom: "4px",
                      }}>{p.name}</div>
                      {p.revealed ? (
                        <>
                          <div style={{ fontSize: "13px", color: card.bg, fontWeight: 700 }}>{card.action}</div>
                          <div style={{ fontSize: "12px", color: "rgba(255,255,255,0.5)", marginTop: "2px" }}>{card.detail}</div>
                        </>
                      ) : (
                        <div style={{ fontSize: "13px", color: "rgba(255,255,255,0.35)" }}>Tap to reveal your card</div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            <div style={{ display: "flex", gap: "10px" }}>
              <button
                onClick={dealCards}
                style={{
                  flex: 1,
                  padding: "14px",
                  borderRadius: "14px",
                  background: "#FF1744",
                  border: "none",
                  color: "#fff",
                  fontSize: "15px",
                  fontWeight: 800,
                  cursor: "pointer",
                  boxShadow: "0 4px 16px rgba(255,23,68,0.4)",
                }}
              >
                🔄 Redeal
              </button>
              <button
                onClick={reset}
                style={{
                  flex: 1,
                  padding: "14px",
                  borderRadius: "14px",
                  background: "rgba(255,255,255,0.06)",
                  border: "1px solid rgba(255,255,255,0.12)",
                  color: "rgba(255,255,255,0.5)",
                  fontSize: "15px",
                  fontWeight: 700,
                  cursor: "pointer",
                }}
              >
                Change Players
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
