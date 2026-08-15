"use client";

import React, { useEffect, useState } from "react";
import { siteContent } from "@/config/siteContent";

interface PreloaderProps {
  onComplete: () => void;
  onImagesLoaded: (images: HTMLImageElement[]) => void;
}

export default function Preloader({ onComplete, onImagesLoaded }: PreloaderProps) {
  const [progress, setProgress] = useState(0);
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    const { totalFrames, prefix, extension, padLength } = siteContent.frames;
    const totalAssets = totalFrames + 1; // 120 dance frames + 1 school memory photo
    const loadedImages: HTMLImageElement[] = new Array(totalFrames);
    let loadedCount = 0;

    const updateProgress = () => {
      loadedCount++;
      const currentPct = Math.round((loadedCount / totalAssets) * 100);
      setProgress(currentPct);

      if (loadedCount >= totalAssets) {
        onImagesLoaded(loadedImages);
        setTimeout(() => {
          setIsFading(true);
          setTimeout(() => {
            onComplete();
          }, 800);
        }, 400);
      }
    };

    // Preload dance frames
    for (let i = 1; i <= totalFrames; i++) {
      const frameNum = String(i).padStart(padLength, "0");
      const img = new Image();
      img.src = `${prefix}${frameNum}${extension}`;
      img.onload = () => {
        loadedImages[i - 1] = img;
        updateProgress();
      };
      img.onerror = () => {
        loadedImages[i - 1] = img;
        updateProgress();
      };
    }

    // Preload school photo
    const schoolImg = new Image();
    schoolImg.src = siteContent.schoolPhoto.src;
    schoolImg.onload = () => updateProgress();
    schoolImg.onerror = () => updateProgress();
  }, [onComplete, onImagesLoaded]);

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        backgroundColor: "var(--bg-pure)",
        zIndex: 9999,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        opacity: isFading ? 0 : 1,
        transition: "opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1)",
        pointerEvents: isFading ? "none" : "all",
      }}
    >
      {/* Ambient background glow */}
      <div
        style={{
          position: "absolute",
          width: 320,
          height: 320,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(212, 175, 55, 0.15) 0%, transparent 70%)",
          filter: "blur(40px)",
        }}
      />

      {/* Progress SVG Ring */}
      <div style={{ position: "relative", width: 120, height: 120, marginBottom: "2rem" }}>
        <svg width="120" height="120" viewBox="0 0 120 120" style={{ transform: "rotate(-90deg)" }}>
          <circle
            cx="60"
            cy="60"
            r="52"
            stroke="rgba(212, 175, 55, 0.12)"
            strokeWidth="3"
            fill="none"
          />
          <circle
            cx="60"
            cy="60"
            r="52"
            stroke="url(#goldGrad)"
            strokeWidth="3"
            fill="none"
            strokeDasharray={326.7}
            strokeDashoffset={326.7 - (326.7 * progress) / 100}
            strokeLinecap="round"
            style={{ transition: "stroke-dashoffset 0.15s ease-out" }}
          />
          <defs>
            <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#f3e5ab" />
              <stop offset="100%" stopColor="#d4af37" />
            </linearGradient>
          </defs>
        </svg>

        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <span
            className="font-serif"
            style={{
              fontSize: "1.5rem",
              fontWeight: 600,
              color: "var(--gold-light)",
            }}
          >
            {progress}%
          </span>
        </div>
      </div>

      <div style={{ textAlign: "center", maxWidth: "90%", zIndex: 2 }}>
        <p
          className="font-serif"
          style={{
            fontSize: "1.4rem",
            color: "var(--text-warm)",
            letterSpacing: "0.04em",
            marginBottom: "0.5rem",
          }}
        >
          Loading memories for {siteContent.recipient.name}...
        </p>
        <p
          className="font-sans"
          style={{
            fontSize: "0.85rem",
            color: "var(--text-muted)",
            letterSpacing: "0.06em",
            textTransform: "uppercase",
          }}
        >
          Preloading 120 Performance Frames & Photo Vault
        </p>
      </div>
    </div>
  );
}
