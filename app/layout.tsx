import type { Metadata, Viewport } from "next";
import "./globals.css";
import BottomNav from "./components/BottomNav";

export const metadata: Metadata = {
  title: "U Street Live — Chi-Cha Presents",
  description: "The ultimate street interview card game for DC nights",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{ background: "#0a0a0a", minHeight: "100dvh", overflowX: "hidden" }}>
        <main style={{ paddingBottom: "80px", minHeight: "100dvh" }}>
          {children}
        </main>
        <BottomNav />
      </body>
    </html>
  );
}
