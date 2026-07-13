import React, { useState, useEffect, useRef } from "react";
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
  RefreshCw,
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

// ─── Professional Teleprompter Script Formatter ──────────────────────────────
// Splits raw scripts into read-optimized lines at natural sentence/phrase boundaries.
interface ScriptLine {
  text: string;
  isParagraphStart: boolean;
}

const MAX_LINE_CHARS = 70;

const CONJUNCTION_RE =
  /^(and|but|or|so|yet|nor|for|because|although|though|while|when|where|if|unless|until|since|before|after|as|that|which|who|whom|whose|however|therefore|moreover|furthermore|meanwhile|otherwise|instead|rather|then)$/i;

function splitByWordBoundary(text: string): string[] {
  const words = text.split(/\s+/);
  const lines: string[] = [];
  let current = "";
  for (const word of words) {
    if (!word) continue;
    if (!current) {
      current = word;
    } else if ((current + " " + word).length <= MAX_LINE_CHARS) {
      current += " " + word;
    } else {
      lines.push(current);
      current = word;
    }
  }
  if (current) lines.push(current);
  return lines;
}

// Splits long sentence segments into smaller, comfortable reading sizes.
function splitLongPhrase(phrase: string): string[] {
  const trimmed = phrase.trim();
  if (!trimmed) return [];
  if (trimmed.length <= MAX_LINE_CHARS) return [trimmed];

  const commaChunks = trimmed.split(/,\s*|;\s*|:\s*/);
  const afterCommas: string[] = [];
  let cur = "";
  for (let ci = 0; ci < commaChunks.length; ci++) {
    const raw = (commaChunks[ci] ?? "").trim();
    if (!raw) continue;
    const chunk = ci < commaChunks.length - 1 ? raw + "," : raw;
    if (!cur) {
      cur = chunk;
    } else if ((cur + " " + chunk).length <= MAX_LINE_CHARS) {
      cur += " " + chunk;
    } else {
      afterCommas.push(cur);
      cur = chunk;
    }
  }
  if (cur) afterCommas.push(cur);

  const afterConj: string[] = [];
  for (const line of afterCommas) {
    if (line.length <= MAX_LINE_CHARS) {
      afterConj.push(line);
      continue;
    }
    const words = line.split(/\s+/);
    const mid = words.length / 2;
    let splitIdx = -1;
    let bestDist = Infinity;
    for (let wi = 1; wi < words.length; wi++) {
      if (CONJUNCTION_RE.test(words[wi] ?? "")) {
        const dist = Math.abs(wi - mid);
        if (dist < bestDist) {
          bestDist = dist;
          splitIdx = wi;
        }
      }
    }
    if (splitIdx > 0) {
      afterConj.push(words.slice(0, splitIdx).join(" "));
      afterConj.push(words.slice(splitIdx).join(" "));
    } else {
      afterConj.push(...splitByWordBoundary(line));
    }
  }

  const final: string[] = [];
  for (const line of afterConj) {
    if (line.length > MAX_LINE_CHARS) {
      final.push(...splitByWordBoundary(line));
    } else {
      final.push(line);
    }
  }
  return final.filter(Boolean);
}

const formatScriptLines = (text: string): ScriptLine[] => {
  const paragraphs = text
    .split(/\n{2,}|\r\n{2,}/)
    .map((p) => p.replace(/\n/g, " ").trim())
    .filter(Boolean);

  const result: ScriptLine[] = [];
  paragraphs.forEach((para, paraIdx) => {
    const sentences = para
      .split(/(?<=[.!?])\s+/)
      .map((s) => s.trim())
      .filter(Boolean);

    sentences.forEach((sentence, sentIdx) => {
      const shortLines = splitLongPhrase(sentence);
      shortLines.forEach((lineText, lineIdx) => {
        result.push({
          text: lineText,
          isParagraphStart: paraIdx > 0 && sentIdx === 0 && lineIdx === 0,
        });
      });
    });
  });

  return result;
};

// Available font sizes mapping
const FONT_SIZES = [
  "text-base md:text-xl",
  "text-lg md:text-2xl",
  "text-xl md:text-3xl",
  "text-2xl md:text-4xl",
  "text-3xl md:text-5xl",
];

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

  // UI Modes & States
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isMirrored, setIsMirrored] = useState(false);
  const [isFocusMode] = useState(false);
  const [activeLineIndex, setActiveLineIndex] = useState(0);

  // Dynamic layout metrics calculated Reactively by the ResizeObserver
  const [containerHeight, setContainerHeight] = useState(450);

  const scrollOffsetRef = useRef(0);

  // Synchronize play state and speed inside refs for the frame loop
  const isPlayingRef = useRef(isPlaying);
  const speedRef = useRef(scrollSpeed);

  useEffect(() => {
    isPlayingRef.current = isPlaying;
  }, [isPlaying]);

  useEffect(() => {
    speedRef.current = scrollSpeed;
  }, [scrollSpeed]);

  // Forces the scroll container to return to the absolute beginning
  const forceResetToTop = () => {
    setIsPlaying(false);
    const container = teleprompterRef.current;
    if (container) {
      container.scrollTop = 0;
      scrollOffsetRef.current = 0;
    }
    setActiveLineIndex(0);
  };

  // Re-verify alignment when content or font configuration is updated
  useEffect(() => {
    forceResetToTop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [practiceScript.content, fontSize]);

  // Reactive ResizeObserver tracking dimensions, scroll containment boundaries, and window resize
  useEffect(() => {
    const container = teleprompterRef.current;
    if (!container) return;

    const onResize = () => {
      setContainerHeight(container.clientHeight);
      forceResetToTop();
    };

    const observer = new ResizeObserver(onResize);
    observer.observe(container);

    // Initial measurement setup
    setContainerHeight(container.clientHeight);

    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [teleprompterRef, isFullscreen]);

  // Dedicated, hardware-synchronized scroll tick running outside React render cycle
  useEffect(() => {
    let animFrame: number;
    let lastTime = performance.now();

    const tick = (now: number) => {
      const delta = now - lastTime;
      lastTime = now;

      const container = teleprompterRef.current;
      if (container && isPlayingRef.current) {
        const maxScroll = container.scrollHeight - container.clientHeight;
        if (scrollOffsetRef.current >= maxScroll) {
          setIsPlaying(false);
          return;
        }

        // Base velocity: multiplier * (1px / 30ms baseline)
        const pixelsPerMs = speedRef.current / 30;
        const scrollAmount = pixelsPerMs * delta;

        scrollOffsetRef.current = Math.min(maxScroll, scrollOffsetRef.current + scrollAmount);
        container.scrollTop = Math.floor(scrollOffsetRef.current);
      }
      animFrame = requestAnimationFrame(tick);
    };

    animFrame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animFrame);
  }, [teleprompterRef, setIsPlaying]);

  // Handles scrolling and determines the active line index dynamically relative to middle of screen
  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const container = e.currentTarget;
    scrollOffsetRef.current = container.scrollTop;

    const containerCenter = container.scrollTop + container.clientHeight / 2;
    const els = container.getElementsByClassName("tele-line");
    if (els.length === 0) return;

    let closestIndex = 0;
    let minDistance = Infinity;
    Array.from(els).forEach((el, i) => {
      const h = el as HTMLElement;
      const lineCenter = h.offsetTop + h.clientHeight / 2;
      const d = Math.abs(containerCenter - lineCenter);
      if (d < minDistance) {
        minDistance = d;
        closestIndex = i;
      }
    });

    setActiveLineIndex(closestIndex);
  };

  // Calculate dynamic paddingTop and paddingBottom to center the first sentence at scrollTop = 0
  const paddingVal = `${Math.max(100, Math.floor(containerHeight / 2 - 24))}px`;

  return (
    <div
      className={`animate-fadeIn transition-all duration-500 ${
        isFullscreen
          ? "max-w-full w-full h-[100vh] p-6 flex flex-col justify-between"
          : "max-w-5xl mx-auto space-y-6"
      } ${isFocusMode ? "bg-black text-white" : ""}`}
    >
      <style>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>

      {/* Top Header Controls (Fades in on hover when in Focus Mode) */}
      <div
        className={`flex items-center justify-between gap-4 mb-6 transition-all duration-300 ${
          isFocusMode
            ? "opacity-0 hover:opacity-100 h-10 hover:h-auto overflow-hidden pointer-events-none hover:pointer-events-auto"
            : "opacity-100"
        }`}
      >
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

      {/* Main Reading Frame */}
      <div
        className={`relative flex flex-col rounded-3xl border transition-all duration-500 overflow-hidden ${
          isFullscreen
            ? "flex-1 border-none shadow-none rounded-none bg-transparent"
            : "bg-surface-primary/25 border-border-subtle/50 backdrop-blur-md shadow-xl"
        } ${isFocusMode ? "border-none bg-black" : ""}`}
      >
        {/* Continuous Opacity Faders */}
        <div
          className={`absolute top-0 left-0 right-0 h-36 pointer-events-none z-20 ${
            isFocusMode
              ? "bg-gradient-to-b from-black via-black/40 to-transparent"
              : "bg-gradient-to-b from-app-bg via-app-bg/50 to-transparent"
          }`}
        />
        <div
          className={`absolute bottom-0 left-0 right-0 h-36 pointer-events-none z-20 ${
            isFocusMode
              ? "bg-gradient-to-t from-black via-black/40 to-transparent"
              : "bg-gradient-to-t from-app-bg via-app-bg/50 to-transparent"
          }`}
        />

        {/* Script Content Viewer */}
        <div
          ref={teleprompterRef}
          onScroll={handleScroll}
          style={{
            paddingTop: paddingVal,
            paddingBottom: paddingVal,
          }}
          className={`overflow-y-auto no-scrollbar px-6 md:px-20 text-center select-none leading-relaxed transition-all duration-300 font-bold relative max-w-[75%] mx-auto w-full ${fontSize} ${
            isFullscreen ? "flex-1 min-h-0" : "h-[450px]"
          }`}
        >
          <div className={isMirrored ? "transform scale-x-[-1]" : ""}>
            {formatScriptLines(practiceScript.content).map((line, idx) => {
              const diff = idx - activeLineIndex;
              const absDiff = Math.abs(diff);

              // Continuous graduated styling for premium focus readability
              let opacity = 1;
              let colorClass = "text-text-primary";

              if (absDiff === 0) {
                opacity = 1;
                colorClass = "text-accent";
              } else if (absDiff === 1) {
                opacity = 0.65;
                colorClass = isFocusMode ? "text-white/60" : "text-text-primary";
              } else if (absDiff === 2) {
                opacity = 0.35;
                colorClass = isFocusMode ? "text-white/35" : "text-text-secondary";
              } else if (absDiff === 3) {
                opacity = 0.15;
                colorClass = isFocusMode ? "text-white/15" : "text-text-muted";
              } else {
                opacity = Math.max(0.04, 0.08 - (absDiff - 4) * 0.01);
                colorClass = isFocusMode ? "text-white/5" : "text-text-muted";
              }

              // Non-layout-shifting compositor scaling
              const scaleVal = absDiff === 0 ? 1.05 : Math.max(0.95, 1 - absDiff * 0.015);

              const handleLineClick = (e: React.MouseEvent<HTMLParagraphElement>) => {
                setActiveLineIndex(idx);
                const lineEl = e.currentTarget;
                const container = teleprompterRef.current;
                if (container && lineEl) {
                  const containerCenter = container.clientHeight / 2;
                  const lineCenter = lineEl.offsetTop + lineEl.clientHeight / 2;
                  container.scrollTo({
                    top: lineCenter - containerCenter,
                    behavior: "smooth",
                  });
                  scrollOffsetRef.current = lineCenter - containerCenter;
                }
              };



              return (
                <p
                  key={idx}
                  className={`tele-line cursor-pointer py-2.5 origin-center transition-colors duration-300 ${
                    line.isParagraphStart ? "mt-12" : ""
                  } ${colorClass}`}
                  style={{
                    opacity,
                    transform: `scale(${scaleVal})`,
                    transition: "opacity 0.4s ease, transform 0.4s ease",
                    willChange: "transform, opacity",
                  }}
                  onClick={handleLineClick}
                >
                  {line.text}
                </p>
              );
            })}
          </div>
        </div>
      </div>

      {/* Floating Bottom Control Panel */}
      <div
        className={`flex items-center justify-center gap-6 bg-surface-primary/45 border border-border-subtle/50 px-6 py-4 rounded-3xl backdrop-blur-md shadow-lg max-w-xs mx-auto mt-6 transition-all duration-500 ${
          isFocusMode ? "bg-zinc-950/85 border-zinc-800 text-white" : ""
        } ${
          isPlaying && isFocusMode
            ? "opacity-15 hover:opacity-100 focus-within:opacity-100"
            : "opacity-100"
        }`}
      >
        <Button
          variant="glass"
          size="sm"
          onClick={() => setIsRecording(!isRecording)}
          title={isRecording ? "Stop Recording" : "Start Microphone Practice"}
          className={`w-10 h-10 p-0 rounded-full border-border-subtle hover:bg-hover-surface/50 relative ${
            isRecording ? "text-error border-error/35" : "text-text-secondary"
          }`}
        >
          {isRecording ? (
            <>
              <MicOff className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-error animate-pulse" />
            </>
          ) : (
            <Mic className="w-5 h-5" />
          )}
        </Button>

        <Button
          variant="glass"
          size="sm"
          onClick={() => setIsPlaying(!isPlaying)}
          title={isPlaying ? "Pause Auto-Scroll" : "Start Auto-Scroll"}
          className={`w-12 h-12 p-0 rounded-full border-border-subtle hover:scale-105 ${
            isPlaying ? "text-accent border-accent/40 bg-accent/5" : "text-text-primary"
          }`}
        >
          {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-0.5" />}
        </Button>

        <Button
          variant="glass"
          size="sm"
          onClick={forceResetToTop}
          title="Restart from Beginning"
          className="w-10 h-10 p-0 rounded-full border-border-subtle text-text-secondary hover:bg-hover-surface/50"
        >
          <RotateCcw className="w-5 h-5" />
        </Button>
      </div>

      {/* Prompter Config Settings Drawer */}
      <Sheet
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        title="Prompter Config"
        subtitle="Active Session"
      >
        <div className="space-y-6 pt-2">
          <div className="space-y-1 bg-surface-secondary/40 p-3.5 rounded-2xl border border-border-subtle">
            <span className="text-[10px] font-bold text-text-muted uppercase tracking-wider block">
              Active Speech
            </span>
            <p className="text-sm font-bold truncate text-text-primary">
              {practiceScript.title}
            </p>
            <p className="text-xs text-text-secondary">
              {practiceScript.category} • {practiceScript.readTime.replace(/ read$/i, "")}
            </p>
          </div>

          <div className="space-y-3 pt-3 border-t border-border-subtle">
            <label className="text-[10px] font-bold text-text-muted uppercase tracking-wider flex items-center gap-1.5">
              <Type className="w-3.5 h-3.5 text-text-muted" />
              <span>Font Size</span>
            </label>
            <div className="grid grid-cols-5 gap-1.5 p-1 rounded-xl border bg-surface-secondary/40 border-border-subtle">
              {FONT_SIZES.map((sizeClass, i) => (
                <button
                  key={i}
                  onClick={() => setFontSize(sizeClass)}
                  className={`py-1.5 text-xs font-semibold rounded-lg transition-all ${
                    fontSize === sizeClass ? "bg-accent text-white" : "text-text-secondary"
                  }`}
                >
                  T{i + 1}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <label className="text-[10px] font-bold text-text-muted uppercase tracking-wider flex items-center gap-1.5">
                <Sliders className="w-3.5 h-3.5 text-text-muted" />
                <span>Scroll Speed</span>
              </label>
              <span className="text-[10px] font-extrabold font-mono px-2 py-0.5 rounded text-accent border border-accent/20 bg-accent/5">
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

          <div className="space-y-3">
            <label className="text-[10px] font-bold text-text-muted uppercase tracking-wider flex items-center gap-1.5">
              <Layout className="w-3.5 h-3.5 text-text-muted" />
              <span>Display Layout</span>
            </label>
            <div className="flex flex-col gap-2">
              <Button
                variant="glass"
                size="md"
                onClick={() => setIsMirrored(!isMirrored)}
                className="w-full justify-center"
              >
                <RefreshCw className="w-4 h-4" />
                <span>{isMirrored ? "Disable Mirror Mode" : "Enable Mirror Mode"}</span>
              </Button>

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
          </div>

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
                  className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
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
