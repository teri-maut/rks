"use client";

import React, { useEffect, useRef } from "react";

interface DanceCanvasProps {
  images: HTMLImageElement[];
  scrollProgress: number;
}

export default function DanceCanvas({ images, scrollProgress }: DanceCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const currentFrameRef = useRef(0);
  const targetFrameRef = useRef(0);

  // Update target frame when scroll progress changes
  useEffect(() => {
    if (!images || images.length === 0) return;
    const maxIndex = images.length - 1;
    const target = Math.min(maxIndex, Math.max(0, scrollProgress * maxIndex));
    targetFrameRef.current = target;
  }, [scrollProgress, images]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    let animationFrameId: number;

    const handleResize = () => {
      if (!canvas) return;
      // Use 2x DPR for ultra-crisp HD Retina rendering
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const displayWidth = window.innerWidth;
      const displayHeight = window.innerHeight;

      if (canvas.width !== displayWidth * dpr || canvas.height !== displayHeight * dpr) {
        canvas.width = displayWidth * dpr;
        canvas.height = displayHeight * dpr;
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    const render = () => {
      // Smooth frame interpolation (lerp)
      const diff = targetFrameRef.current - currentFrameRef.current;
      currentFrameRef.current += diff * 0.16;

      const frameIndex = Math.min(
        images.length - 1,
        Math.max(0, Math.round(currentFrameRef.current))
      );
      const img = images[frameIndex];

      const width = canvas.width;
      const height = canvas.height;

      if (img && img.complete && img.naturalWidth > 0) {
        // High quality image smoothing
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = "high";

        // Clear background with deep cinematic black
        ctx.fillStyle = "#020204";
        ctx.fillRect(0, 0, width, height);

        const imgWidth = img.naturalWidth;
        const imgHeight = img.naturalHeight;
        const imgRatio = imgWidth / imgHeight;
        const screenRatio = width / height;

        let renderWidth: number;
        let renderHeight: number;
        let offsetX: number;
        let offsetY: number;

        // Dynamic containment with mobile and widescreen optimization
        if (screenRatio > imgRatio) {
          // Widescreen desktop: scale to fit comfortably with prominence
          renderHeight = height * 0.98;
          renderWidth = renderHeight * imgRatio;
          offsetX = (width - renderWidth) / 2;
          offsetY = (height - renderHeight) / 2;
        } else {
          // Portrait mobile or tablet: fit width cleanly so dancer is large & centered
          renderWidth = width;
          renderHeight = renderWidth / imgRatio;
          offsetX = 0;
          offsetY = (height - renderHeight) / 2;
        }

        // Apply subtle cinematic sharpness & color pop filter
        ctx.filter = "contrast(1.05) brightness(1.02) saturate(1.08)";
        ctx.drawImage(img, offsetX, offsetY, renderWidth, renderHeight);
        ctx.filter = "none";

        // Feathered edge-vignette ONLY at the outer edges (>70% radius) so the dancer in the center stays 100% crisp & unblocked!
        const radial = ctx.createRadialGradient(
          width / 2,
          height / 2,
          Math.min(width, height) * 0.45,
          width / 2,
          height / 2,
          Math.max(width, height) * 0.65
        );
        radial.addColorStop(0, "rgba(2, 2, 4, 0)");
        radial.addColorStop(0.7, "rgba(2, 2, 4, 0.3)");
        radial.addColorStop(1, "rgba(2, 2, 4, 0.96)");

        ctx.fillStyle = radial;
        ctx.fillRect(0, 0, width, height);

        // Very subtle top/bottom fade to melt the stage edges into pure black
        const topGrad = ctx.createLinearGradient(0, 0, 0, height * 0.12);
        topGrad.addColorStop(0, "rgba(2, 2, 4, 0.98)");
        topGrad.addColorStop(1, "rgba(2, 2, 4, 0)");
        ctx.fillStyle = topGrad;
        ctx.fillRect(0, 0, width, height * 0.12);

        const botGrad = ctx.createLinearGradient(0, height * 0.88, 0, height);
        botGrad.addColorStop(0, "rgba(2, 2, 4, 0)");
        botGrad.addColorStop(1, "rgba(2, 2, 4, 0.98)");
        ctx.fillStyle = botGrad;
        ctx.fillRect(0, height * 0.88, width, height * 0.12);
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [images]);

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        width: "100vw",
        height: "100vh",
        zIndex: 2,
        pointerEvents: "none",
        backgroundColor: "var(--bg-pure)",
      }}
    >
      <canvas
        ref={canvasRef}
        style={{
          width: "100%",
          height: "100%",
          display: "block",
        }}
      />
    </div>
  );
}
