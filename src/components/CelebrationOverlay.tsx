"use client";

import React, { useState } from "react";

interface Spark {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  color: string;
}

export default function CelebrationOverlay() {
  const [blessingsCount, setBlessingsCount] = useState(0);
  const [sparks, setSparks] = useState<Spark[]>([]);

  const handleSendBlessing = () => {
    setBlessingsCount((prev) => prev + 1);

    // Create 18 radiant celebration sparks/petals
    const newSparks: Spark[] = [];
    for (let i = 0; i < 18; i++) {
      newSparks.push({
        id: Date.now() + i,
        x: Math.random() * 80 + 10,
        y: Math.random() * 40 + 50,
        size: Math.random() * 12 + 6,
        duration: Math.random() * 1.5 + 1.2,
        color: ["#ffd700", "#f3e5ab", "#ff6b6b", "#ffa07a"][Math.floor(Math.random() * 4)],
      });
    }

    setSparks((prev) => [...prev, ...newSparks]);
    setTimeout(() => {
      setSparks((prev) => prev.filter((s) => !newSparks.includes(s)));
    }, 2800);
  };

  const handleScrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div style={{ position: "relative", width: "100%", textAlign: "center", marginTop: "3rem" }}>
      {/* Floating Sparks Overlay */}
      {sparks.map((spark) => (
        <div
          key={spark.id}
          style={{
            position: "fixed",
            left: `${spark.x}%`,
            top: `${spark.y}%`,
            width: `${spark.size}px`,
            height: `${spark.size}px`,
            borderRadius: "50%",
            backgroundColor: spark.color,
            boxShadow: `0 0 16px ${spark.color}`,
            pointerEvents: "none",
            zIndex: 90,
            animation: `floatUpAndFade ${spark.duration}s cubic-bezier(0.2, 0.8, 0.2, 1) forwards`,
          }}
        />
      ))}

      <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "1.2rem" }}>
        <button
          onClick={handleSendBlessing}
          className="btn-gold-luxury"
          style={{ minWidth: "220px" }}
        >
          <span style={{ fontSize: "1.15rem" }}>✨</span>
          <span>
            {blessingsCount === 0
              ? `Send Sister Love`
              : `Blessed ${blessingsCount} ${blessingsCount === 1 ? "Time" : "Times"} ❤️`}
          </span>
        </button>

        <button
          onClick={handleScrollTop}
          className="glass-card"
          style={{
            padding: "0.85rem 1.8rem",
            borderRadius: "var(--radius-full)",
            color: "var(--text-muted)",
            fontSize: "0.88rem",
            letterSpacing: "0.04em",
            cursor: "pointer",
            border: "1px solid var(--border-subtle)",
            transition: "all 0.3s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = "var(--gold-border)";
            e.currentTarget.style.color = "var(--text-warm)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = "var(--border-subtle)";
            e.currentTarget.style.color = "var(--text-muted)";
          }}
        >
          ↺ Replay Story From Beginning
        </button>
      </div>

      <style jsx>{`
        @keyframes floatUpAndFade {
          0% {
            opacity: 1;
            transform: translateY(0) scale(0.6);
          }
          100% {
            opacity: 0;
            transform: translateY(-160px) scale(1.4);
          }
        }
      `}</style>
    </div>
  );
}
