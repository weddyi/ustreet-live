"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const tabs = [
  { href: "/", icon: "🃏", label: "Cards" },
  { href: "/truth-dare", icon: "🔥", label: "Truth/Dare" },
  { href: "/ask", icon: "❓", label: "Ask" },
  { href: "/uno", icon: "🎴", label: "Uno Vibes" },
  { href: "/wild", icon: "🎲", label: "Wild" },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav style={{
      position: "fixed",
      bottom: 0,
      left: 0,
      right: 0,
      zIndex: 100,
      background: "rgba(8,8,8,0.95)",
      backdropFilter: "blur(20px)",
      WebkitBackdropFilter: "blur(20px)",
      borderTop: "1px solid rgba(255,255,255,0.08)",
      display: "flex",
      alignItems: "stretch",
      height: "72px",
      paddingBottom: "env(safe-area-inset-bottom)",
    }}>
      {tabs.map((tab) => {
        const active = pathname === tab.href;
        return (
          <Link
            key={tab.href}
            href={tab.href}
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: "3px",
              textDecoration: "none",
              position: "relative",
              color: active ? "#D4AF37" : "rgba(255,255,255,0.45)",
              transition: "color 0.2s",
            }}
          >
            {active && (
              <span style={{
                position: "absolute",
                top: 0,
                left: "20%",
                right: "20%",
                height: "2px",
                background: "#D4AF37",
                borderRadius: "0 0 4px 4px",
              }} />
            )}
            <span style={{ fontSize: "20px", lineHeight: 1 }}>{tab.icon}</span>
            <span style={{
              fontSize: "10px",
              fontWeight: active ? 700 : 500,
              letterSpacing: "0.03em",
              textTransform: "uppercase",
            }}>{tab.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
