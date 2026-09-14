"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize2,
  Minimize2,
  RotateCcw,
  RotateCw,
  ExternalLink,
  Sparkles,
  MonitorPlay,
  Laptop,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import type { Project } from "../../_data/data";
import Reveal from "./Reveal";
import { Button } from "./ui/button";

type ProjectDemoProps = {
  project: Project;
};

function formatTime(seconds: number): string {
  if (isNaN(seconds) || seconds < 0) return "0:00";
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
}

export default function ProjectDemo({ project }: ProjectDemoProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const controlsTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [bufferedEnd, setBufferedEnd] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(1);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [hasStarted, setHasStarted] = useState(false);
  const [activeTab, setActiveTab] = useState<"video" | "interactive">(
    project.video ? "video" : "interactive"
  );

  const liveUrl = project.demoUrl || project.link;
  const hasVideo = Boolean(project.video);
  const hasLiveDemo = Boolean(liveUrl);

  // Resolve video URL (handle local filenames vs full URLs)
  const videoSrc = project.video
    ? project.video.startsWith("http") || project.video.startsWith("/")
      ? project.video
      : `/video/${project.video}`
    : "";

  const isEmbedVideo =
    videoSrc.includes("youtube.com") ||
    videoSrc.includes("youtu.be") ||
    videoSrc.includes("vimeo.com") ||
    videoSrc.includes("loom.com");

  const posterImage = project.videoPoster
    ? project.videoPoster.startsWith("/")
      ? project.videoPoster
      : `/img/${project.videoPoster}`
    : project.img
    ? `/img/${project.img}`
    : undefined;

  // Toggle play/pause
  const togglePlay = useCallback(() => {
    if (!videoRef.current) return;
    if (videoRef.current.paused || videoRef.current.ended) {
      videoRef.current.play();
      setIsPlaying(true);
      setHasStarted(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  }, []);

  // Controls auto-hide logic
  const handleMouseMove = useCallback(() => {
    setShowControls(true);
    if (controlsTimeoutRef.current) clearTimeout(controlsTimeoutRef.current);
    if (isPlaying) {
      controlsTimeoutRef.current = setTimeout(() => {
        setShowControls(false);
      }, 2500);
    }
  }, [isPlaying]);

  // Fullscreen toggle
  const toggleFullscreen = useCallback(() => {
    if (!containerRef.current) return;

    // State is driven by the `fullscreenchange` listener below rather than
    // set optimistically here — a refused request would otherwise leave the
    // button showing "exit fullscreen" forever.
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().catch(() => {});
    } else {
      document.exitFullscreen().catch(() => {});
    }
  }, []);

  // Drop any pending auto-hide timer when the player unmounts.
  useEffect(() => {
    return () => {
      if (controlsTimeoutRef.current) clearTimeout(controlsTimeoutRef.current);
    };
  }, []);

  // Listen for fullscreen change event from browser (e.g. Esc key)
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(Boolean(document.fullscreenElement));
    };
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, []);

  // Keyboard navigation for video
  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (!videoRef.current) return;
    // Keydown from a focused control bubbles up here; letting it through
    // would toggle play twice on Space and fight the button's own handler.
    const target = e.target as HTMLElement;
    if (target !== e.currentTarget && target.closest("button, a, input")) {
      return;
    }
    if (e.key === " " || e.key === "k" || e.key === "K") {
      e.preventDefault();
      togglePlay();
    } else if (e.key === "m" || e.key === "M") {
      e.preventDefault();
      const nextMute = !isMuted;
      setIsMuted(nextMute);
      videoRef.current.muted = nextMute;
    } else if (e.key === "f" || e.key === "F") {
      e.preventDefault();
      toggleFullscreen();
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      videoRef.current.currentTime = Math.max(0, videoRef.current.currentTime - 5);
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      videoRef.current.currentTime = Math.min(
        videoRef.current.duration || 0,
        videoRef.current.currentTime + 5
      );
    }
  };

  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    setCurrentTime(videoRef.current.currentTime);

    // Update buffer
    if (videoRef.current.buffered.length > 0) {
      try {
        const end = videoRef.current.buffered.end(
          videoRef.current.buffered.length - 1
        );
        setBufferedEnd(end);
      } catch {
        // Safe buffer fallback
      }
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!videoRef.current) return;
    const seekTime = Number(e.target.value);
    videoRef.current.currentTime = seekTime;
    setCurrentTime(seekTime);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!videoRef.current) return;
    const newVol = Number(e.target.value);
    setVolume(newVol);
    videoRef.current.volume = newVol;
    setIsMuted(newVol === 0);
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    const next = !isMuted;
    setIsMuted(next);
    videoRef.current.muted = next;
    if (!next && volume === 0) {
      setVolume(0.5);
      videoRef.current.volume = 0.5;
    }
  };

  const skipTime = (delta: number) => {
    if (!videoRef.current) return;
    videoRef.current.currentTime = Math.max(
      0,
      Math.min(videoRef.current.duration || 0, videoRef.current.currentTime + delta)
    );
  };

  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;
  const bufferPercent = duration > 0 ? (bufferedEnd / duration) * 100 : 0;

  // If project has neither a video nor a demo link, omit the section
  if (!hasVideo && !hasLiveDemo) {
    return null;
  }

  return (
    <section className="mt-20 scroll-mt-24">
      {/* ---- Section Header ---- */}
      <Reveal as="group" gap={0.06}>
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent-soft px-3 py-1 text-xs font-medium text-accent">
              <Sparkles className="size-3.5" />
              <span>Demonstration</span>
            </div>
            <h2 className="mt-3 text-2xl font-semibold tracking-[-0.02em] sm:text-3xl">
              {project.demoTitle || "Project Walkthrough & Demo"}
            </h2>
            <p className="mt-2 text-base text-muted-foreground">
              Explore the live workflow, interface interactions, and real-time mechanics in action.
            </p>
          </div>

          {/* Tab Switcher if both video and live link exist */}
          {hasVideo && hasLiveDemo ? (
            <div className="inline-flex rounded-xl border border-border bg-muted/50 p-1">
              <button
                type="button"
                onClick={() => setActiveTab("video")}
                className={`inline-flex items-center gap-2 rounded-lg px-3.5 py-1.5 text-xs font-medium transition-all ${
                  activeTab === "video"
                    ? "bg-card text-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <MonitorPlay className="size-3.5" />
                Video Walkthrough
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("interactive")}
                className={`inline-flex items-center gap-2 rounded-lg px-3.5 py-1.5 text-xs font-medium transition-all ${
                  activeTab === "interactive"
                    ? "bg-card text-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <Laptop className="size-3.5" />
                Live Application
              </button>
            </div>
          ) : null}
        </div>
      </Reveal>

      {/* ---- Interactive or Video Display ---- */}
      <Reveal delay={0.08} className="mt-8">
        {activeTab === "video" && hasVideo ? (
          isEmbedVideo ? (
            /* Embedded Iframe Player (YouTube / Vimeo / Loom) */
            <div className="relative aspect-video w-full overflow-hidden rounded-2xl border border-border bg-black shadow-[var(--shadow-soft)]">
              <iframe
                src={videoSrc}
                title={`${project.name} Video Demo`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="h-full w-full border-0"
              />
            </div>
          ) : (
            /* Custom HTML5 Video Player */
            <div
              ref={containerRef}
              tabIndex={0}
              role="region"
              aria-label={`${project.name} video player`}
              onMouseMove={handleMouseMove}
              onMouseLeave={() => isPlaying && setShowControls(false)}
              onKeyDown={handleKeyDown}
              className="group relative aspect-video w-full overflow-hidden rounded-2xl border border-border bg-black shadow-[var(--shadow-soft)] outline-none ring-offset-background focus-visible:ring-2 focus-visible:ring-accent"
            >
              <video
                ref={videoRef}
                src={videoSrc}
                poster={posterImage}
                preload="metadata"
                playsInline
                onClick={togglePlay}
                onPlay={() => {
                  setIsPlaying(true);
                  setHasStarted(true);
                }}
                onPause={() => setIsPlaying(false)}
                onTimeUpdate={handleTimeUpdate}
                onLoadedMetadata={() => {
                  if (videoRef.current) setDuration(videoRef.current.duration);
                }}
                onEnded={() => {
                  setIsPlaying(false);
                  setShowControls(true);
                }}
                className="h-full w-full cursor-pointer object-contain"
              />

              {/* Big Center Play/Pause Overlay */}
              <AnimatePresence>
                {(!isPlaying || !hasStarted) && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.85 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.2 }}
                    className="pointer-events-none absolute inset-0 flex items-center justify-center bg-black/35 backdrop-blur-[2px]"
                  >
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        togglePlay();
                      }}
                      className="pointer-events-auto group/play relative grid size-20 place-items-center rounded-full bg-accent text-accent-foreground shadow-2xl transition-all duration-300 hover:scale-110 hover:bg-accent-hover focus:outline-none focus:ring-4 focus:ring-accent/40 sm:size-24"
                      aria-label="Play video"
                    >
                      <span className="absolute -inset-2 rounded-full bg-accent/30 motion-safe:animate-ping opacity-60" />
                      <Play className="relative size-8 translate-x-0.5 fill-current sm:size-10" />
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Subtle top bar in player */}
              <div
                className={`pointer-events-none absolute inset-x-0 top-0 flex items-center justify-between p-4 bg-gradient-to-b from-black/60 to-transparent transition-opacity duration-300 ${
                  showControls ? "opacity-100" : "opacity-0"
                }`}
              >
                <span className="font-mono text-xs uppercase tracking-wider text-white/80">
                  {project.name} · Walkthrough
                </span>
                {duration > 0 ? (
                  <span className="rounded-full bg-black/40 px-2.5 py-0.5 font-mono text-[0.7rem] font-medium text-white/90 backdrop-blur-sm">
                    {formatTime(duration)}
                  </span>
                ) : null}
              </div>

              {/* Custom Bottom Controls Bar */}
              <div
                className={`absolute inset-x-0 bottom-0 p-3 sm:p-4 bg-gradient-to-t from-black/90 via-black/50 to-transparent transition-opacity duration-300 ${
                  showControls ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
                }`}
              >
                {/* Scrubbable Progress Bar */}
                <div className="relative mb-2.5 flex items-center group/scrubber cursor-pointer">
                  <input
                    type="range"
                    min={0}
                    max={duration || 100}
                    value={currentTime}
                    onChange={handleSeek}
                    className="absolute inset-0 z-20 h-4 w-full cursor-pointer opacity-0"
                    aria-label="Seek video position"
                  />
                  {/* Track Background */}
                  <div className="relative h-1.5 w-full rounded-full bg-white/20 transition-all duration-200 group-hover/scrubber:h-2">
                    {/* Buffered Progress */}
                    <div
                      className="absolute top-0 bottom-0 left-0 rounded-full bg-white/35"
                      style={{ width: `${bufferPercent}%` }}
                    />
                    {/* Played Progress */}
                    <div
                      className="absolute top-0 bottom-0 left-0 rounded-full bg-accent"
                      style={{ width: `${progressPercent}%` }}
                    />
                  </div>
                </div>

                {/* Controls Action Row */}
                <div className="flex items-center justify-between gap-2 text-white">
                  <div className="flex items-center gap-2 sm:gap-3">
                    {/* Play / Pause */}
                    <button
                      type="button"
                      onClick={togglePlay}
                      className="grid size-9 place-items-center rounded-lg hover:bg-white/15 transition-colors focus:outline-none focus:ring-2 focus:ring-accent"
                      aria-label={isPlaying ? "Pause" : "Play"}
                    >
                      {isPlaying ? (
                        <Pause className="size-4 fill-current" />
                      ) : (
                        <Play className="size-4 fill-current translate-x-0.5" />
                      )}
                    </button>

                    {/* Rewind 5s */}
                    <button
                      type="button"
                      onClick={() => skipTime(-5)}
                      className="grid size-9 place-items-center rounded-lg hover:bg-white/15 transition-colors text-white/80 hover:text-white"
                      aria-label="Rewind 5 seconds"
                    >
                      <RotateCcw className="size-4" />
                    </button>

                    {/* Forward 5s */}
                    <button
                      type="button"
                      onClick={() => skipTime(5)}
                      className="grid size-9 place-items-center rounded-lg hover:bg-white/15 transition-colors text-white/80 hover:text-white"
                      aria-label="Forward 5 seconds"
                    >
                      <RotateCw className="size-4" />
                    </button>

                    {/* Volume & Mute */}
                    <div className="group/vol flex items-center gap-1.5">
                      <button
                        type="button"
                        onClick={toggleMute}
                        className="grid size-9 place-items-center rounded-lg hover:bg-white/15 transition-colors"
                        aria-label={isMuted ? "Unmute" : "Mute"}
                      >
                        {isMuted || volume === 0 ? (
                          <VolumeX className="size-4" />
                        ) : (
                          <Volume2 className="size-4" />
                        )}
                      </button>
                      <input
                        type="range"
                        min={0}
                        max={1}
                        step={0.05}
                        value={isMuted ? 0 : volume}
                        onChange={handleVolumeChange}
                        className="h-1 w-14 cursor-pointer accent-accent transition-all duration-200 group-hover/vol:w-18"
                        aria-label="Volume slider"
                      />
                    </div>

                    {/* Time Display */}
                    <span className="font-mono text-xs text-white/80 select-none">
                      {formatTime(currentTime)} / {formatTime(duration)}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    {/* External Link */}
                    {liveUrl && (
                      <a
                        href={liveUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="hidden sm:inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-xs text-white/80 hover:text-white hover:bg-white/15 transition-colors"
                      >
                        Live app
                        <ExternalLink className="size-3" />
                      </a>
                    )}

                    {/* Fullscreen Button */}
                    <button
                      type="button"
                      onClick={toggleFullscreen}
                      className="grid size-9 place-items-center rounded-lg hover:bg-white/15 transition-colors focus:outline-none focus:ring-2 focus:ring-accent"
                      aria-label={isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
                    >
                      {isFullscreen ? (
                        <Minimize2 className="size-4" />
                      ) : (
                        <Maximize2 className="size-4" />
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )
        ) : (
          /* Interactive Live Demo Frame / Card */
          <div className="overflow-hidden rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-soft)] sm:p-8">
            <div className="flex flex-col items-center justify-center text-center py-8 px-4">
              <div className="grid size-14 place-items-center rounded-2xl border border-accent/25 bg-accent-soft text-accent shadow-inner">
                <Laptop className="size-7" />
              </div>

              <h3 className="mt-5 text-xl font-semibold sm:text-2xl">
                Experience {project.name} Live
              </h3>

              <p className="mt-2.5 max-w-lg text-sm text-muted-foreground sm:text-base leading-relaxed">
                Interact with the deployed application directly. Test out user flows, real-time responses, and interface components in real conditions.
              </p>

              {liveUrl ? (
                <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
                  <Button asChild size="lg" className="group shadow-[var(--shadow-soft)]">
                    <a href={liveUrl} target="_blank" rel="noreferrer">
                      Launch Live Interactive Demo
                      <ExternalLink className="size-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </a>
                  </Button>

                  {project.git && (
                    <Button asChild size="lg" variant="outline">
                      <a href={project.git} target="_blank" rel="noreferrer">
                        Inspect Source Repository
                      </a>
                    </Button>
                  )}
                </div>
              ) : null}

              {/* Architecture Highlight Tags */}
              <div className="mt-8 flex flex-wrap items-center justify-center gap-2 pt-6 border-t border-border w-full max-w-md">
                <span className="text-xs text-subtle-foreground font-mono mr-1">
                  Stack:
                </span>
                {project.lang.slice(0, 4).map((tech) => (
                  <span
                    key={tech}
                    className="rounded-full border border-border bg-muted/60 px-2.5 py-0.5 font-mono text-[0.7rem] text-muted-foreground"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}
      </Reveal>
    </section>
  );
}
