"use client";

import React, { useState, useCallback } from "react";
import Preloader from "@/components/Preloader";
import DanceCanvas from "@/components/DanceCanvas";
import ParticleCanvas from "@/components/ParticleCanvas";
import AudioPlayer from "@/components/AudioPlayer";
import StoryScroll from "@/components/StoryScroll";

export default function Home() {
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  const handleImagesLoaded = useCallback((loadedImgs: HTMLImageElement[]) => {
    setImages(loadedImgs);
  }, []);

  const handlePreloaderComplete = useCallback(() => {
    setIsLoaded(true);
  }, []);

  const handleProgressChange = useCallback((progress: number) => {
    setScrollProgress(progress);
  }, []);

  return (
    <main
      style={{
        position: "relative",
        minHeight: "100vh",
        backgroundColor: "var(--bg-pure)",
        color: "var(--text-warm)",
      }}
    >
      {/* 1. Initial Cinematic Preloader */}
      {!isLoaded && (
        <Preloader
          onComplete={handlePreloaderComplete}
          onImagesLoaded={handleImagesLoaded}
        />
      )}

      {/* 2. Floating Classical Audio Player */}
      <AudioPlayer />

      {/* 3. Subtle Golden Ember / Particle Overlay */}
      <ParticleCanvas />

      {/* 4. Dance Performance Canvas Animation Engine */}
      {images.length > 0 && (
        <DanceCanvas images={images} scrollProgress={scrollProgress} />
      )}

      {/* 5. Scroll-Controlled Emotional Narrative Layer */}
      <StoryScroll onProgressChange={handleProgressChange} />
    </main>
  );
}
