import React, { useState } from "react";
import {
  ArrowLeft,
  Maximize,
  Minimize,
  Settings,
  Mic,
  MicOff,
  Play,
  Pause,
  RotateCcw,
  Clock,
  Save,
  Sliders,
  Type,
  Layout,
} from "lucide-react";
import type { Script } from "../../types";
import { Button, Sheet } from "../ui";

interface TeleprompterViewProps {
  theme: "dark" | "light";
  practiceScript: Script;
  setIsPracticing: (val: boolean) => void;
  finishPractice: () => void;
  teleprompterRef: React.RefObject<HTMLDivElement | null>;
  fontSize: string;
  setFontSize: (size: string) => void;
  scrollSpeed: number;
  setScrollSpeed: (speed: number) => void;
  isRecording: boolean;
  setIsRecording: (rec: boolean) => void;
  recordingSeconds: number;
  soundBars: number[];
  isPlaying: boolean;
  setIsPlaying: (play: boolean) => void;
  toggleFullscreen: () => void;
  isFullscreen: boolean;
}

export default function TeleprompterView({
  theme,
  practiceScript,
  setIsPracticing,
  finishPractice,
  teleprompterRef,
  fontSize,
  setFontSize,
  scrollSpeed,
  setScrollSpeed,
  isRecording,
  setIsRecording,
  recordingSeconds,
  soundBars,
  isPlaying,
  setIsPlaying,
  toggleFullscreen,
  isFullscreen,
}: TeleprompterViewProps) {
  void theme;
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [activeParagraphIndex, setActiveParagraphIndex] = useState(0);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const container = e.currentTarget;
    const containerCenter = container.scrollTop + container.clientHeight / 2;

    const paragraphs = container.getElementsByTagName("p");
    let closestIndex = 0;
    let closestDistance = Infinity;

    for (let i = 0; i < paragraphs.length; i++) {
      const p = paragraphs[i];
      if (!p) continue;
      const pTop = p.offsetTop;
      const pHeight = p.clientHeight;
      const pCenter = pTop + pHeight / 2;
      const distance = Math.abs(containerCenter - pCenter);

      if (distance < closestDistance) {
        closestDistance = distance;
        closestIndex = i;
      }
    }

    setActiveParagraphIndex(closestIndex);
  };

  return (
    <div
      className={`animate-fadeIn transition-all duration-300 ${
        isFullscreen
          ? "max-w-full w-full h-[100vh] p-6 flex flex-col justify-between"
          : "max-w-4xl mx-auto space-y-6"
      }`}
    >
      {/* Top Navigation */}
      <div className="flex items-center justify-between gap-4 mb-6">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsPracticing(false)}
          title="Exit Session"
          className="text-text-secondary hover:text-text-primary"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Exit Studio</span>
        </Button>

        <div className="flex items-center space-x-3">
          <Button
            variant="glass"
            size="sm"
            onClick={toggleFullscreen}
            title={isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}
            className="w-10 h-10 p-0 rounded-xl"
          >
            {isFullscreen ? <Minimize className="w-5 h-5" /> : <Maximize className="w-5 h-5" />}
          </Button>

          <Button
            variant="glass"
            size="sm"
            onClick={() => setIsDrawerOpen(true)}
            title="Adjust prompter settings"
            className="w-10 h-10 p-0 rounded-xl text-accent"
          >
            <Settings className="w-5 h-5 animate-spin-hover" />
          </Button>
        </div>
      </div>

      {/* Prompter Scrolling Screen */}
      <div
        className={`relative flex flex-col rounded-3xl border transition-all duration-300 ${
          isFullscreen
            ? "flex-1 border-none shadow-none rounded-none bg-transparent"
            : "bg-surface-primary/25 border-border-subtle/50 backdrop-blur-md shadow-xl"
        }`}
      >
        <div
          ref={teleprompterRef}
          onScroll={handleScroll}
          className={`overflow-y-auto px-8 md:px-16 py-[220px] text-center select-none leading-relaxed transition-all duration-300 font-medium relative scroll-smooth ${fontSize} ${
            isFullscreen ? "flex-1 h-full" : "h-[440px]"
          } text-text-muted/30`}
        >
          {practiceScript.content
            .split(/(?<=[.!?,;:])\s+|\n+/)
            .map((s) => s.trim())
            .filter(Boolean)
            .map((paragraph, pIdx) => {
              const isActive = pIdx === activeParagraphIndex;
              return (
                <p
                  key={pIdx}
                  className={`mb-12 transition-all duration-300 transform origin-center ${
                    isActive
                      ? "text-text-primary font-extrabold opacity-100 scale-[1.03]"
                      : "text-text-muted/20 opacity-20 scale-98 blur-[0.3px]"
                  }`}
                >
                  {paragraph}
                </p>
              );
            })}

          <div className="h-[220px]" />
        </div>
      </div>

      {/* Subtle Immersive Control Panel Toolbar */}
      <div className="flex justify-center items-center gap-4 bg-surface-primary/45 border border-border-subtle/50 px-5 py-3 rounded-full backdrop-blur-md shadow-lg max-w-sm mx-auto mt-8">
        {/* Mic Record Toggle */}
        <Button
          variant="glass"
          size="sm"
          onClick={() => setIsRecording(!isRecording)}
          title={isRecording ? "Stop Recording" : "Start Microphone Practice"}
          className={`w-11 h-11 p-0 rounded-full border-border-subtle hover:bg-hover-surface/50 relative ${
            isRecording ? "text-error border-error/35" : "text-text-secondary"
          }`}
        >
          {isRecording ? (
            <>
              <MicOff className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-error animate-pulse" />
            </>
          ) : (
            <Mic className="w-5 h-5" />
          )}
        </Button>

        {/* Play/Pause Auto-Scroll */}
        <Button
          variant="glass"
          size="sm"
          onClick={() => setIsPlaying(!isPlaying)}
          title={isPlaying ? "Pause Auto-Scroll" : "Start Auto-Scroll"}
          className={`w-13 h-13 p-0 rounded-full border-border-subtle hover:scale-105 ${
            isPlaying ? "text-accent border-accent/40 bg-accent/5" : "text-text-primary"
          }`}
        >
          {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6 ml-0.5" />}
        </Button>

        {/* Start Fresh / Restart scroll position */}
        <Button
          variant="glass"
          size="sm"
          onClick={() => {
            if (teleprompterRef.current) teleprompterRef.current.scrollTop = 0;
            setIsPlaying(false);
          }}
          title="Start Fresh (Back to Top)"
          className="w-11 h-11 p-0 rounded-full border-border-subtle text-text-secondary hover:bg-hover-surface/50"
        >
          <RotateCcw className="w-5 h-5" />
        </Button>
      </div>

      {/* Prompter Config Drawer */}
      <Sheet
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        title="Prompter Config"
        subtitle="Active Session"
      >
        <div className="space-y-6 pt-2">
          {/* Active Speech Card */}
          <div className="space-y-1 bg-surface-secondary/40 p-3.5 rounded-2xl border border-border-subtle">
            <span className="text-[10px] font-bold text-text-muted uppercase tracking-wider block">
              Active Speech
            </span>
            <p className="text-sm font-bold truncate text-text-primary">
              {practiceScript.title}
            </p>
            <p className="text-xs text-text-secondary">
              {practiceScript.category} • {practiceScript.readTime}
            </p>
          </div>

          {/* Font Size Selector */}
          <div className="space-y-3 pt-3 border-t border-border-subtle">
            <label className="text-[10px] font-bold text-text-muted uppercase tracking-wider flex items-center gap-1.5">
              <Type className="w-3.5 h-3.5 text-text-muted" />
              <span>Font Size</span>
            </label>
            <div className="grid grid-cols-3 gap-2 p-1.5 rounded-xl border bg-surface-secondary/40 border-border-subtle">
              <button
                onClick={() => setFontSize("text-lg md:text-2xl")}
                className={`py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                  fontSize === "text-lg md:text-2xl"
                    ? "bg-accent text-white shadow-xs"
                    : "text-text-secondary hover:text-text-primary hover:bg-hover-surface"
                }`}
              >
                Small
              </button>
              <button
                onClick={() => setFontSize("text-xl md:text-3xl")}
                className={`py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                  fontSize === "text-xl md:text-3xl"
                    ? "bg-accent text-white shadow-xs"
                    : "text-text-secondary hover:text-text-primary hover:bg-hover-surface"
                }`}
              >
                Medium
              </button>
              <button
                onClick={() => setFontSize("text-2xl md:text-4xl")}
                className={`py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                  fontSize === "text-2xl md:text-4xl"
                    ? "bg-accent text-white shadow-xs"
                    : "text-text-secondary hover:text-text-primary hover:bg-hover-surface"
                }`}
              >
                Large
              </button>
            </div>
          </div>

          {/* Scroll Speed Adjustment */}
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <label className="text-[10px] font-bold text-text-muted uppercase tracking-wider flex items-center gap-1.5">
                <Sliders className="w-3.5 h-3.5 text-text-muted" />
                <span>Scroll Speed</span>
              </label>
              <span className="text-3xs font-extrabold font-mono px-2 py-0.5 rounded text-accent border border-accent/20 bg-accent/5">
                {scrollSpeed}x
              </span>
            </div>
            <div className="px-3.5 py-3 rounded-xl border bg-surface-secondary/40 border-border-subtle">
              <input
                type="range"
                min="0.5"
                max="4"
                step="0.1"
                value={scrollSpeed}
                onChange={(e) => setScrollSpeed(Number(e.target.value))}
                className="w-full accent-accent cursor-pointer"
              />
            </div>
          </div>

          {/* Display Mode Toggle */}
          <div className="space-y-3">
            <label className="text-[10px] font-bold text-text-muted uppercase tracking-wider flex items-center gap-1.5">
              <Layout className="w-3.5 h-3.5 text-text-muted" />
              <span>Display Layout</span>
            </label>
            <Button
              variant="glass"
              size="md"
              onClick={toggleFullscreen}
              className="w-full justify-center"
            >
              {isFullscreen ? (
                <>
                  <Minimize className="w-4 h-4" />
                  <span>Exit Fullscreen</span>
                </>
              ) : (
                <>
                  <Maximize className="w-4 h-4" />
                  <span>Enter Fullscreen</span>
                </>
              )}
            </Button>
          </div>

          {/* Live Recording stats */}
          <div className="space-y-3 pt-4 border-t border-border-subtle">
            <label className="text-[10px] font-bold text-text-muted uppercase tracking-wider flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-text-muted" />
              <span>Mic Recording Stats</span>
            </label>
            <div className="p-4 rounded-xl border bg-surface-secondary/40 border-border-subtle space-y-3.5">
              <div className="flex justify-between items-center text-xs font-semibold text-text-secondary">
                <span>Duration:</span>
                <span className="font-mono text-accent font-bold">
                  {Math.floor(recordingSeconds / 60)}:
                  {(recordingSeconds % 60).toString().padStart(2, "0")}
                </span>
              </div>
              <div className="flex justify-between items-center text-xs font-semibold text-text-secondary">
                <span>Status:</span>
                <span
                  className={`inline-flex items-center px-2 py-0.5 rounded text-3xs font-bold uppercase tracking-wider ${
                    isRecording
                      ? "bg-error/10 text-error border border-error/20 animate-pulse"
                      : "bg-surface-secondary text-text-muted"
                  }`}
                >
                  {isRecording ? "Recording" : "Idle"}
                </span>
              </div>

              {isRecording && (
                <div className="pt-2">
                  <div className="flex items-end justify-center space-x-1.5 h-10 text-accent">
                    {soundBars.map((level, i) => (
                      <span
                        key={i}
                        className="wave-bar w-1.5 bg-accent rounded-sm"
                        style={{
                          height: level === 1 ? "6px" : level === 2 ? "18px" : "30px",
                          animationName:
                            level === 1 ? "quiet" : level === 2 ? "normal-wave" : "loud-wave",
                        }}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Quick Actions Footer */}
        <div className="border-t pt-4 mt-8 border-border-subtle space-y-3">
          <Button
            onClick={() => {
              setIsDrawerOpen(false);
              finishPractice();
            }}
            variant="default"
            size="md"
            className="w-full"
          >
            <Save className="w-4 h-4" />
            <span>Finish & Log Practice</span>
          </Button>

          <Button
            onClick={() => setIsPracticing(false)}
            variant="outline"
            size="md"
            className="w-full"
          >
            Exit without Saving
          </Button>
        </div>
      </Sheet>
    </div>
  );
}
