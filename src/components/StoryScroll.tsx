"use client";

import React, { useEffect, useState } from "react";
import { siteContent, SiblingMemory } from "@/config/siteContent";
import CelebrationOverlay from "./CelebrationOverlay";

interface StoryScrollProps {
  onProgressChange: (progress: number) => void;
}

const STORY_STEPS = [
  { id: "hero", label: "Intro", icon: "✨", target: 0.03, range: [0.0, 0.08] as [number, number] },
  { id: "mem-1", label: "01 • 2-Day Apology", icon: "🩹", target: 0.14, range: [0.08, 0.21] as [number, number] },
  { id: "mem-2", label: "02 • Name Confusion", icon: "👶", target: 0.28, range: [0.22, 0.35] as [number, number] },
  { id: "mem-3", label: "03 • Finger Check", icon: "🩺", target: 0.42, range: [0.36, 0.49] as [number, number] },
  { id: "mem-4", label: "04 • Dog Chaos", icon: "🐕", target: 0.56, range: [0.50, 0.63] as [number, number] },
  { id: "mem-5", label: "05 • Jassi Dialogue", icon: "🎭", target: 0.70, range: [0.64, 0.76] as [number, number] },
  { id: "photo", label: "06 • Moong Daal Photo", icon: "📸", target: 0.83, range: [0.77, 0.89] as [number, number] },
  { id: "rakhi", label: "07 • Raksha Bandhan", icon: "🌺", target: 0.92, range: [0.90, 0.95] as [number, number] },
  { id: "thanks", label: "08 • THANKS", icon: "🙏", target: 0.98, range: [0.95, 1.0] as [number, number] },
];

export default function StoryScroll({ onProgressChange }: StoryScrollProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (maxScroll <= 0) return;

      const p = Math.min(1, Math.max(0, scrollY / maxScroll));
      setProgress(p);
      onProgressChange(p);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [onProgressChange]);

  const scrollToStep = (targetProgress: number) => {
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    window.scrollTo({
      top: targetProgress * maxScroll,
      behavior: "smooth",
    });
  };

  // Continuous overlapping opacity calculator
  const calculateOpacityAndTransform = (start: number, end: number, current: number) => {
    const fadeInWindow = (end - start) * 0.15;
    const fadeOutWindow = (end - start) * 0.15;

    if (current < start || current > end) {
      return { opacity: 0, transform: "translateY(24px)", pointerEvents: "none" as const };
    }

    let opacity = 1;
    let translateY = 0;

    if (current < start + fadeInWindow) {
      const localP = (current - start) / fadeInWindow;
      opacity = localP;
      translateY = (1 - localP) * 24;
    } else if (current > end - fadeOutWindow) {
      const localP = (end - current) / fadeOutWindow;
      opacity = localP;
      translateY = (1 - localP) * -24;
    }

    return {
      opacity: Math.max(0, Math.min(1, opacity)),
      transform: `translateY(${translateY}px)`,
      pointerEvents: opacity > 0.3 ? ("all" as const) : ("none" as const),
    };
  };

  return (
    <div style={{ position: "relative", minHeight: "800vh", zIndex: 10 }}>
      {/* ================================================================= */}
      {/* FIXED VIEWPORT PRESENTATION CONTAINER (100% RELIABLE OVERLAY) */}
      {/* ================================================================= */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          width: "100vw",
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          pointerEvents: "none",
          zIndex: 15,
          padding: "clamp(1rem, 3vw, 2rem)",
        }}
      >
        {/* ================================================================= */}
        {/* 1. HERO SCENE (0.00 to 0.08) */}
        {/* ================================================================= */}
        {(() => {
          const style = calculateOpacityAndTransform(0.0, 0.08, progress);
          return (
            <div
              style={{
                position: "absolute",
                maxWidth: "760px",
                textAlign: "center",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "1.25rem",
                ...style,
                transition: "transform 0.2s ease-out",
              }}
            >
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  padding: "0.4rem 1.25rem",
                  borderRadius: "var(--radius-full)",
                  background: "rgba(212, 175, 55, 0.15)",
                  border: "1px solid var(--gold-border)",
                  color: "var(--gold-light)",
                  fontSize: "0.82rem",
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  fontWeight: 600,
                }}
              >
                <span>{siteContent.hero.eyebrow}</span>
              </div>

              <h1
                className="font-serif gold-gradient-text"
                style={{
                  fontSize: "clamp(2.6rem, 6vw, 4.6rem)",
                  fontWeight: 700,
                  lineHeight: 1.12,
                  letterSpacing: "-0.01em",
                }}
              >
                {siteContent.hero.title}
              </h1>

              <p
                className="font-sans"
                style={{
                  fontSize: "clamp(1rem, 1.8vw, 1.25rem)",
                  color: "var(--text-muted)",
                  lineHeight: 1.6,
                  maxWidth: "580px",
                }}
              >
                {siteContent.hero.subtitle}
              </p>

              <div
                className="animate-pulse-subtle"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  marginTop: "1.2rem",
                  padding: "0.45rem 1.4rem",
                  borderRadius: "var(--radius-full)",
                  background: "rgba(255, 255, 255, 0.06)",
                  border: "1px solid var(--gold-border-subtle)",
                  color: "var(--gold-light)",
                  fontSize: "0.88rem",
                  letterSpacing: "0.06em",
                }}
              >
                <span>{siteContent.hero.scrollPrompt}</span>
              </div>
            </div>
          );
        })()}

        {/* ================================================================= */}
        {/* 2. THE 5 SPECIFIC CHILDHOOD MEMORIES */}
        {/* ================================================================= */}
        {siteContent.childhoodMemories.map((mem: SiblingMemory, idx: number) => {
          const style = calculateOpacityAndTransform(mem.range[0], mem.range[1], progress);
          const isLeft = idx % 2 === 0;

          return (
            <div
              key={mem.id}
              className="glass-card"
              style={{
                position: "absolute",
                maxWidth: "540px",
                width: "100%",
                left: isLeft ? "clamp(1rem, 5vw, 5rem)" : "auto",
                right: !isLeft ? "clamp(1rem, 5vw, 5rem)" : "auto",
                textAlign: "left",
                padding: "clamp(1.75rem, 3.5vw, 2.5rem)",
                border: "1px solid var(--gold-border)",
                background: "rgba(10, 12, 18, 0.92)",
                boxShadow: "0 20px 50px rgba(0, 0, 0, 0.95), 0 0 30px rgba(212, 175, 55, 0.2)",
                ...style,
                transition: "transform 0.25s ease-out",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: "0.85rem",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
                  <span style={{ fontSize: "1.6rem" }}>{mem.emoji}</span>
                  <span
                    className="font-sans"
                    style={{
                      padding: "0.25rem 0.75rem",
                      borderRadius: "var(--radius-full)",
                      background: "rgba(212, 175, 55, 0.18)",
                      border: "1px solid var(--gold-border)",
                      color: "var(--gold-primary)",
                      fontSize: "0.72rem",
                      fontWeight: 600,
                      letterSpacing: "0.12em",
                      textTransform: "uppercase",
                    }}
                  >
                    {mem.tag}
                  </span>
                </div>
                <span
                  style={{
                    fontSize: "0.75rem",
                    color: "var(--text-faint)",
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                  }}
                >
                  By Preet
                </span>
              </div>

              <h2
                className="font-serif"
                style={{
                  fontSize: "clamp(1.75rem, 3vw, 2.35rem)",
                  fontWeight: 600,
                  lineHeight: 1.25,
                  color: "var(--text-warm)",
                  marginBottom: "1rem",
                }}
              >
                {mem.title}
              </h2>

              <p
                className="font-sans"
                style={{
                  fontSize: "clamp(0.92rem, 1.4vw, 1.05rem)",
                  color: "var(--text-warm)",
                  lineHeight: 1.75,
                  marginBottom: "1.25rem",
                  opacity: 0.94,
                }}
              >
                {mem.story}
              </p>

              {mem.funnyQuote && (
                <div
                  style={{
                    borderLeft: "2px solid var(--gold-primary)",
                    paddingLeft: "0.85rem",
                    fontSize: "0.92rem",
                    fontStyle: "italic",
                    color: "var(--gold-light)",
                    lineHeight: 1.5,
                  }}
                >
                  &ldquo;{mem.funnyQuote}&rdquo;
                </div>
              )}
            </div>
          );
        })}

        {/* ================================================================= */}
        {/* 3. NOSTALGIC SCHOOL PHOTO MEMORY CARD (0.77 to 0.89) */}
        {/* ================================================================= */}
        {(() => {
          const { schoolPhoto } = siteContent;
          const style = calculateOpacityAndTransform(schoolPhoto.range[0], schoolPhoto.range[1], progress);

          return (
            <div
              className="glass-card"
              style={{
                position: "absolute",
                maxWidth: "520px",
                width: "92%",
                maxHeight: "86vh",
                overflowY: "auto",
                padding: "clamp(1.2rem, 2.5vw, 1.8rem)",
                textAlign: "center",
                border: "2px solid var(--gold-primary)",
                background: "rgba(10, 12, 18, 0.96)",
                boxShadow: "0 25px 60px -15px rgba(0, 0, 0, 0.98), 0 0 35px rgba(212, 175, 55, 0.28)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "1rem",
                ...style,
                transition: "transform 0.25s ease-out",
              }}
            >
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  padding: "0.3rem 0.9rem",
                  borderRadius: "var(--radius-full)",
                  background: "rgba(212, 175, 55, 0.18)",
                  border: "1px solid var(--gold-border)",
                  color: "var(--gold-primary)",
                  fontSize: "0.75rem",
                  fontWeight: 600,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                }}
              >
                <span>📸 {schoolPhoto.badge}</span>
              </div>

              {/* Framed Polaroid Style Container */}
              <div
                style={{
                  position: "relative",
                  width: "100%",
                  borderRadius: "var(--radius-md)",
                  overflow: "hidden",
                  border: "2px solid rgba(212, 175, 55, 0.35)",
                  boxShadow: "0 10px 25px rgba(0, 0, 0, 0.8)",
                  background: "#000",
                }}
              >
                {/* Standard robust img tag */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={schoolPhoto.src}
                  alt="School Memory"
                  style={{
                    width: "100%",
                    height: "auto",
                    maxHeight: "260px",
                    objectFit: "cover",
                    display: "block",
                  }}
                />
              </div>

              {/* User's Exact Caption */}
              <div
                style={{
                  padding: "0.85rem 1.25rem",
                  borderRadius: "var(--radius-md)",
                  background: "rgba(212, 175, 55, 0.12)",
                  border: "1px solid var(--gold-border)",
                  width: "100%",
                }}
              >
                <p
                  className="font-serif"
                  style={{
                    fontSize: "clamp(1.05rem, 2.2vw, 1.3rem)",
                    fontWeight: 600,
                    color: "var(--gold-light)",
                    lineHeight: 1.5,
                    fontStyle: "italic",
                  }}
                >
                  &ldquo;{schoolPhoto.caption}&rdquo;
                </p>
              </div>
            </div>
          );
        })()}

        {/* ================================================================= */}
        {/* 4. RAKSHA BANDHAN CLIMAX (0.90 to 0.95) */}
        {/* ================================================================= */}
        {(() => {
          const style = calculateOpacityAndTransform(0.90, 0.95, progress);
          return (
            <div
              style={{
                position: "absolute",
                maxWidth: "760px",
                textAlign: "center",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "1.25rem",
                ...style,
                transition: "transform 0.25s ease-out",
              }}
            >
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  padding: "0.4rem 1.25rem",
                  borderRadius: "var(--radius-full)",
                  background: "rgba(194, 51, 51, 0.15)",
                  border: "1px solid rgba(194, 51, 51, 0.35)",
                  color: "#ff9999",
                  fontSize: "0.82rem",
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  fontWeight: 600,
                }}
              >
                <span>{siteContent.climax.badge}</span>
              </div>

              <h2
                className="font-serif gold-gradient-text"
                style={{
                  fontSize: "clamp(2.6rem, 6vw, 4.8rem)",
                  fontWeight: 700,
                  lineHeight: 1.1,
                  letterSpacing: "-0.02em",
                }}
              >
                {siteContent.climax.title}
              </h2>

              <p
                className="font-serif"
                style={{
                  fontSize: "clamp(1.2rem, 2.5vw, 1.8rem)",
                  color: "var(--text-warm)",
                  lineHeight: 1.4,
                  maxWidth: "600px",
                }}
              >
                {siteContent.climax.subtitle}
              </p>

              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  justifyContent: "center",
                  gap: "1rem",
                  marginTop: "1rem",
                }}
              >
                {siteContent.climax.specialLines.map((line, idx) => (
                  <div
                    key={idx}
                    className="glass-card"
                    style={{
                      padding: "0.55rem 1.25rem",
                      borderRadius: "var(--radius-full)",
                      fontSize: "0.9rem",
                      color: "var(--gold-light)",
                      letterSpacing: "0.03em",
                      border: "1px solid var(--gold-border-subtle)",
                    }}
                  >
                    {line}
                  </div>
                ))}
              </div>
            </div>
          );
        })()}

        {/* ================================================================= */}
        {/* 5. FINALE: FOR VANIKA BY PREET & THANKS (0.95 to 1.00) */}
        {/* ================================================================= */}
        {(() => {
          const style = calculateOpacityAndTransform(0.95, 1.0, progress);
          return (
            <div
              style={{
                position: "absolute",
                maxWidth: "760px",
                textAlign: "center",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "1.25rem",
                ...style,
                transition: "transform 0.25s ease-out",
              }}
            >
              <h2
                className="font-serif gold-gradient-text"
                style={{
                  fontSize: "clamp(2.4rem, 5.5vw, 4rem)",
                  fontWeight: 700,
                  lineHeight: 1.15,
                }}
              >
                {siteContent.outro.mainGreeting}
              </h2>

              <div
                style={{
                  padding: "0.5rem 1.8rem",
                  borderRadius: "var(--radius-full)",
                  background: "linear-gradient(135deg, rgba(212, 175, 55, 0.25) 0%, rgba(212, 175, 55, 0.08) 100%)",
                  border: "1px solid var(--gold-bright)",
                  boxShadow: "0 0 25px rgba(212, 175, 55, 0.3)",
                }}
              >
                <span
                  className="font-serif"
                  style={{
                    fontSize: "clamp(1.3rem, 2.5vw, 1.8rem)",
                    fontWeight: 600,
                    color: "#ffffff",
                    letterSpacing: "0.05em",
                  }}
                >
                  {siteContent.outro.subGreeting}
                </span>
              </div>

              {/* Prominent THANKS reveal at the end */}
              <div
                className="glass-card"
                style={{
                  padding: "1.5rem 2.5rem",
                  borderRadius: "var(--radius-lg)",
                  border: "1px solid var(--gold-border)",
                  background: "rgba(18, 15, 10, 0.94)",
                  boxShadow: "0 0 35px rgba(212, 175, 55, 0.25)",
                  marginTop: "0.5rem",
                }}
              >
                <h3
                  className="font-serif gold-gradient-text"
                  style={{
                    fontSize: "clamp(2.2rem, 5vw, 3.4rem)",
                    fontWeight: 700,
                    letterSpacing: "0.15em",
                    marginBottom: "0.5rem",
                  }}
                >
                  {siteContent.outro.thanksMessage}
                </h3>
                <p
                  className="font-sans"
                  style={{
                    fontSize: "clamp(0.92rem, 1.6vw, 1.05rem)",
                    color: "var(--gold-light)",
                    lineHeight: 1.6,
                    maxWidth: "520px",
                  }}
                >
                  {siteContent.outro.dedication}
                </p>
              </div>

              <span
                className="font-serif"
                style={{
                  fontSize: "0.95rem",
                  color: "var(--gold-muted)",
                  letterSpacing: "0.08em",
                  fontStyle: "italic",
                  marginTop: "0.25rem",
                }}
              >
                {siteContent.outro.footerNote}
              </span>

              {/* Interactive celebration / blessing trigger */}
              <CelebrationOverlay />
            </div>
          );
        })()}
      </div>

      {/* ================================================================= */}
      {/* BOTTOM MEMORY TIMELINE BAR (CLICKABLE DIRECT ACCESS) */}
      {/* ================================================================= */}
      <div
        style={{
          position: "fixed",
          bottom: "1.25rem",
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 100,
          display: "flex",
          alignItems: "center",
          gap: "0.45rem",
          padding: "0.5rem 0.8rem",
          borderRadius: "var(--radius-full)",
          background: "rgba(10, 12, 18, 0.85)",
          border: "1px solid var(--gold-border-subtle)",
          backdropFilter: "blur(16px)",
          maxWidth: "92vw",
          overflowX: "auto",
          boxShadow: "0 10px 30px rgba(0, 0, 0, 0.8)",
        }}
      >
        {STORY_STEPS.map((step) => {
          const isActive = progress >= step.range[0] && progress < step.range[1];

          return (
            <button
              key={step.id}
              onClick={() => scrollToStep(step.target)}
              className="glass-card"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.4rem",
                padding: "0.4rem 0.75rem",
                borderRadius: "var(--radius-full)",
                cursor: "pointer",
                border: isActive ? "1px solid var(--gold-bright)" : "1px solid transparent",
                background: isActive ? "rgba(212, 175, 55, 0.2)" : "rgba(255, 255, 255, 0.04)",
                color: isActive ? "#ffffff" : "var(--text-muted)",
                fontSize: "0.76rem",
                fontWeight: isActive ? 600 : 400,
                whiteSpace: "nowrap",
                transition: "all 0.25s ease",
              }}
            >
              <span>{step.icon}</span>
              <span className="font-sans">{step.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
