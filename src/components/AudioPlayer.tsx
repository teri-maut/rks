"use client";

import React, { useEffect, useRef, useState } from "react";
import { siteContent } from "@/config/siteContent";

export default function AudioPlayer() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = 0.6;
    audio.loop = true;
  }, []);

  const togglePlay = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    setHasInteracted(true);
    if (isPlaying) {
      // Fade out
      let vol = audio.volume;
      const fadeInterval = setInterval(() => {
        if (vol > 0.05) {
          vol -= 0.05;
          audio.volume = Math.max(0, vol);
        } else {
          clearInterval(fadeInterval);
          audio.pause();
          setIsPlaying(false);
          audio.volume = 0.6;
        }
      }, 30);
    } else {
      try {
        audio.volume = 0;
        await audio.play();
        setIsPlaying(true);
        // Fade in
        let vol = 0;
        const fadeInterval = setInterval(() => {
          if (vol < 0.6) {
            vol += 0.05;
            audio.volume = Math.min(0.6, vol);
          } else {
            clearInterval(fadeInterval);
          }
        }, 30);
      } catch (err) {
        console.warn("Audio playback failed:", err);
      }
    }
  };

  return (
    <>
      <audio ref={audioRef} src={siteContent.music.src} preload="metadata" />

      <div
        style={{
          position: "fixed",
          top: "1.25rem",
          right: "1.25rem",
          zIndex: 100,
        }}
      >
        <button
          onClick={togglePlay}
          aria-label={isPlaying ? "Mute classical music" : "Play classical music"}
          className="glass-card"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.65rem",
            padding: "0.55rem 1.1rem",
            borderRadius: "var(--radius-full)",
            cursor: "pointer",
            background: isPlaying ? "rgba(25, 20, 10, 0.85)" : "var(--bg-card)",
            border: isPlaying
              ? "1px solid var(--gold-primary)"
              : "1px solid var(--gold-border-subtle)",
            boxShadow: isPlaying
              ? "0 0 20px rgba(212, 175, 55, 0.3)"
              : "var(--shadow-card)",
            transition: "all 0.3s cubic-bezier(0.2, 0.8, 0.2, 1)",
          }}
        >
          {/* Animated equalizer bars or music note */}
          <div
            style={{
              display: "flex",
              alignItems: "flex-end",
              gap: "2.5px",
              height: "14px",
              width: "14px",
            }}
          >
            {[1, 2, 3].map((bar) => (
              <span
                key={bar}
                style={{
                  width: "3px",
                  backgroundColor: isPlaying ? "var(--gold-bright)" : "var(--text-faint)",
                  borderRadius: "1px",
                  height: isPlaying ? "100%" : "30%",
                  transformOrigin: "bottom",
                  animation: isPlaying
                    ? `equalizer ${0.6 + bar * 0.2}s ease-in-out infinite alternate`
                    : "none",
                  transition: "all 0.3s ease",
                }}
              />
            ))}
          </div>

          <span
            className="font-sans"
            style={{
              fontSize: "0.8rem",
              fontWeight: 500,
              letterSpacing: "0.03em",
              color: isPlaying ? "var(--gold-light)" : "var(--text-muted)",
            }}
          >
            {isPlaying ? "Music On" : "Music"}
          </span>

          {!hasInteracted && (
            <span
              style={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                backgroundColor: "var(--gold-primary)",
                boxShadow: "0 0 6px var(--gold-bright)",
                animation: "subtlePulse 2s infinite",
              }}
            />
          )}
        </button>
      </div>

      <style jsx>{`
        @keyframes equalizer {
          0% {
            height: 20%;
          }
          50% {
            height: 100%;
          }
          100% {
            height: 40%;
          }
        }
      `}</style>
    </>
  );
}
