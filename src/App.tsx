import { useState, useEffect, useRef } from "react";
import { Header, Footer } from "./components/layout";
import {
  HomeView,
  MyScriptsView,
  PracticeHistoryView,
  EditorView,
  TeleprompterView,
  SupportView,
  PrivacyPolicyView,
  TermsConditionsView,
  AboutView,
} from "./components/views";
import { useLocalStorage } from "./hooks/useLocalStorage";
import { Button } from "./components/ui";

import type { Script, PracticeLog } from "./types";
import { INITIAL_SCRIPTS } from "./types";

export default function App() {
  const [activeTab, setActiveTab] = useState<string>("home");
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  const [scripts, setScripts] = useLocalStorage<Script[]>("speakflow_scripts", INITIAL_SCRIPTS);
  const [logs, setLogs] = useLocalStorage<PracticeLog[]>("speakflow_logs", []);

  const [inputText, setInputText] = useState("");
  const [activeCategory, setActiveCategory] = useState("");

  const [isGenerating, setIsGenerating] = useState(false);
  const [generationProgress, setGenerationProgress] = useState(0);

  const [practiceScript, setPracticeScript] = useState<Script | null>(null);
  const [isPracticing, setIsPracticing] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [scrollSpeed, setScrollSpeed] = useState(1.5);
  const [fontSize, setFontSize] = useState("text-xl md:text-3xl");
  const [isRecording, setIsRecording] = useState(false);
  const [recordingSeconds, setRecordingSeconds] = useState(0);
  const [soundBars, setSoundBars] = useState<number[]>([1, 1, 1, 1, 1, 1, 1, 1, 1, 1]);

  const [editingScript, setEditingScript] = useState<Script | null>(null);

  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [userWpmTarget, setUserWpmTarget] = useState(130);

  const handleSetIsRecording = (val: boolean) => {
    setIsRecording(val);
    if (!val) {
      setRecordingSeconds(0);
      setSoundBars([1, 1, 1, 1, 1, 1, 1, 1, 1, 1]);
    }
  };

  const teleprompterRef = useRef<HTMLDivElement>(null);
  const timerIntervalRef = useRef<number | null>(null);
  const visualizerIntervalRef = useRef<number | null>(null);

  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [theme]);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, []);

  // Track Recording Timer
  useEffect(() => {
    if (isRecording) {
      timerIntervalRef.current = window.setInterval(() => {
        setRecordingSeconds((prev) => prev + 1);
      }, 1000);
    } else {
      if (timerIntervalRef.current) {
        clearInterval(timerIntervalRef.current);
      }
    }
    return () => {
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    };
  }, [isRecording]);

  // Mock voice volume visualizer waves
  useEffect(() => {
    if (isRecording) {
      visualizerIntervalRef.current = window.setInterval(() => {
        setSoundBars(Array.from({ length: 10 }, () => Math.floor(Math.random() * 3) + 1));
      }, 120);
    } else {
      if (visualizerIntervalRef.current) {
        clearInterval(visualizerIntervalRef.current);
      }
    }
    return () => {
      if (visualizerIntervalRef.current) clearInterval(visualizerIntervalRef.current);
    };
  }, [isRecording]);

  // Prevent body/html page scroll when in fullscreen practice mode
  useEffect(() => {
    if (isPracticing && isFullscreen) {
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
      window.scrollTo(0, 0);
    } else {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    };
  }, [isPracticing, isFullscreen]);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement
        .requestFullscreen()
        .then(() => {
          setIsFullscreen(true);
        })
        .catch((err) => {
          console.error("Error enabling fullscreen mode", err);
        });
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  const handleAiGenerate = () => {
    const prompt = inputText.trim() || "Write a speech about public speaking and confidence.";
    setIsGenerating(true);
    setGenerationProgress(0);

    const totalDuration = 2500;
    const step = 50;
    let current = 0;

    const progressInterval = setInterval(() => {
      current += step;
      const progress = Math.min((current / totalDuration) * 100, 100);
      setGenerationProgress(Math.floor(progress));

      if (progress >= 100) {
        clearInterval(progressInterval);

        const generatedTitle = `AI: ${prompt.split(" ").slice(0, 3).join(" ")}...`;
        const generatedContent = `Ladies and gentlemen, thank you for being here today. Let's discuss a crucial subject: ${prompt
          .toLowerCase()
          .replace(/^(write a speech about|create a|draft a|write a)\s*/i, "")}. 

To communicate with impact, we must practice with intent. We must understand our rhythm, adjust our pacing, and shape our message to match our audience. In a distraction-free space, we can listen to our own pacing, refine our tone, and construct a compelling narrative. 

Let us speak not just to be heard, but to inspire, to motivate, and to build bridges between our technical creations and human connections. Thank you.`;

        const newScript: Script = {
          id: `script-${Date.now()}`,
          title: generatedTitle,
          content: generatedContent,
          editedAt: "Just now",
          readTime: `${Math.ceil(generatedContent.split(/\s+/).length / 130)} min`,
          category: activeCategory || "Presentation",
        };

        setScripts([newScript, ...scripts]);
        setInputText("");
        setActiveCategory("");
        setIsGenerating(false);

        setPracticeScript(newScript);
        setIsPracticing(true);
      }
    }, step);
  };

  const startPractice = (script: Script) => {
    setPracticeScript(script);
    setIsPracticing(true);
    setIsPlaying(false);
    handleSetIsRecording(false);
  };

  const finishPractice = () => {
    if (!practiceScript) return;

    const wordCount = practiceScript.content.split(/\s+/).filter(Boolean).length;
    const durationMin = recordingSeconds > 0 ? recordingSeconds / 60 : 1.2;
    const durationSec = recordingSeconds > 0 ? recordingSeconds : 72;
    const calculatedWpm = Math.round(wordCount / durationMin);

    let pace: "Too Slow" | "Perfect" | "Too Fast" = "Perfect";
    if (calculatedWpm < userWpmTarget - 20) pace = "Too Slow";
    else if (calculatedWpm > userWpmTarget + 20) pace = "Too Fast";

    const newLog: PracticeLog = {
      id: `log-${Date.now()}`,
      scriptTitle: practiceScript.title,
      date:
        new Date().toLocaleDateString(undefined, {
          month: "short",
          day: "numeric",
          year: "numeric",
        }) +
        " " +
        new Date().toLocaleTimeString(undefined, { hour: "2-digit", minute: "2-digit" }),
      duration: durationSec,
      wpm: calculatedWpm,
      paceRating: pace,
      satisfaction: 4,
    };

    setLogs([newLog, ...logs]);
    setIsPracticing(false);
    setIsPlaying(false);
    handleSetIsRecording(false);
    setActiveTab("practice-history");
  };

  const saveEditedScript = () => {
    if (!editingScript) return;

    const wordCount = editingScript.content.split(/\s+/).filter(Boolean).length;
    const updated: Script = {
      ...editingScript,
      editedAt: "Just now",
      readTime: `${Math.ceil(wordCount / 130)} min`,
    };

    setScripts(scripts.map((s) => (s.id === updated.id ? updated : s)));
    setEditingScript(null);
  };

  const startNewScript = () => {
    const newScript: Script = {
      id: `script-${Date.now()}`,
      title: "Untitled Script",
      content: "Write your speech content here...",
      editedAt: "Just now",
      readTime: "1 min",
      category: "Presentation",
    };
    setScripts([newScript, ...scripts]);
    setEditingScript(newScript);
  };

  return (
    <div className="flex flex-col min-h-screen bg-app-bg text-text-primary transition-colors duration-300 font-sans antialiased">
      {!(isPracticing && isFullscreen) && (
        <Header
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          theme={theme}
          setTheme={setTheme}
          showSettings={showSettings}
          setShowSettings={setShowSettings}
          toggleFullscreen={toggleFullscreen}
          isFullscreen={isFullscreen}
          isPracticing={isPracticing}
          editingScript={editingScript}
          setEditingScript={setEditingScript}
          setIsPracticing={setIsPracticing}
        />
      )}

      {showSettings && (
        <div className="border-b bg-surface-primary/80 border-border-subtle text-text-primary backdrop-blur-md px-6 py-5 transition-all duration-300">
          <div className="max-w-4xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h4 className="font-display font-bold text-base tracking-tight">Practice Options</h4>
              <p className="text-xs text-text-secondary mt-0.5">
                Configure global target speaking speeds (Words Per Minute).
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2.5">
                <label className="text-xs font-semibold text-text-secondary">
                  Target WPM:
                </label>
                <input
                  type="number"
                  min="80"
                  max="240"
                  value={userWpmTarget}
                  onChange={(e) => setUserWpmTarget(Number(e.target.value))}
                  className="w-20 px-3 py-1.5 text-xs font-bold rounded-xl border border-border-subtle bg-surface-secondary text-text-primary text-center focus:outline-none focus:ring-2 focus:ring-accent/15 focus:border-accent/40"
                />
              </div>
              <Button variant="glass" size="sm" onClick={() => setShowSettings(false)}>
                Done
              </Button>
            </div>
          </div>
        </div>
      )}

      <main
        className={`flex-1 w-full mx-auto transition-all duration-300 ${
          isPracticing && isFullscreen ? "max-w-full px-0 py-0" : "max-w-7xl px-4 md:px-8 py-10"
        }`}
      >
        {editingScript ? (
          <EditorView
            theme={theme}
            editingScript={editingScript}
            setEditingScript={setEditingScript}
            saveEditedScript={saveEditedScript}
          />
        ) : isPracticing && practiceScript ? (
          <TeleprompterView
            theme={theme}
            practiceScript={practiceScript}
            setIsPracticing={setIsPracticing}
            finishPractice={finishPractice}
            teleprompterRef={teleprompterRef}
            fontSize={fontSize}
            setFontSize={setFontSize}
            scrollSpeed={scrollSpeed}
            setScrollSpeed={setScrollSpeed}
            isRecording={isRecording}
            setIsRecording={handleSetIsRecording}
            recordingSeconds={recordingSeconds}
            soundBars={soundBars}
            isPlaying={isPlaying}
            setIsPlaying={setIsPlaying}
            toggleFullscreen={toggleFullscreen}
            isFullscreen={isFullscreen}
          />
        ) : activeTab === "home" ? (
          <HomeView
            theme={theme}
            scripts={scripts}
            setScripts={setScripts}
            inputText={inputText}
            setInputText={setInputText}
            activeCategory={activeCategory}
            setActiveCategory={setActiveCategory}
            isGenerating={isGenerating}
            generationProgress={generationProgress}
            handleAiGenerate={handleAiGenerate}
            startPractice={startPractice}
            setEditingScript={setEditingScript}
            setActiveTab={setActiveTab}
          />
        ) : activeTab === "my-scripts" ? (
          <MyScriptsView
            theme={theme}
            scripts={scripts}
            setScripts={setScripts}
            startPractice={startPractice}
            setEditingScript={setEditingScript}
            startNewScript={startNewScript}
          />
        ) : activeTab === "support" ? (
          <SupportView />
        ) : activeTab === "privacy-policy" ? (
          <PrivacyPolicyView />
        ) : activeTab === "terms-conditions" ? (
          <TermsConditionsView />
        ) : activeTab === "about" ? (
          <AboutView />
        ) : (
          <PracticeHistoryView theme={theme} logs={logs} setLogs={setLogs} />
        )}
      </main>

      {!(isPracticing && isFullscreen) && (
        <Footer
          theme={theme}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          setIsPracticing={setIsPracticing}
          setEditingScript={setEditingScript}
        />
      )}
    </div>
  );
}
