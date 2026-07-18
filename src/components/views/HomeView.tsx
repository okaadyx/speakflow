import { useState } from "react";
import { Sparkles, PenTool, ChevronRight, Clock, Sprout, Mic, Shield, Megaphone, Eraser, Smile, Award, Trophy, Leaf, Video, Star, Globe } from "lucide-react";
import type { Script } from "../../types";
import { INSPIRATIONS, CATEGORIES } from "../../types";
import { useCreateScript } from "../../hooks/useCreateScript";
import { Button, Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter, Badge, Progress } from "../ui";

interface HomeViewProps {
  theme: "dark" | "light";
  scripts: Script[];
  setScripts: React.Dispatch<React.SetStateAction<Script[]>>;
  inputText: string;
  setInputText: (text: string) => void;
  activeCategory: string;
  setActiveCategory: (cat: string) => void;
  isGenerating: boolean;
  generationProgress: number;
  handleAiGenerate: (customPrompt?: string, customDifficulty?: string) => void;
  startPractice: (script: Script) => void;
  setEditingScript: (script: Script | null) => void;
  setActiveTab: (tab: "home" | "my-scripts" | "practice-history") => void;
}

export default function HomeView({
  theme,
  scripts,
  setScripts,
  inputText,
  setInputText,
  activeCategory,
  setActiveCategory,
  isGenerating,
  generationProgress,
  handleAiGenerate,
  startPractice,
  setEditingScript,
  setActiveTab,
}: HomeViewProps) {
  void theme;
  void isGenerating;
  void generationProgress;

  const [difficulty, setDifficulty] = useState<"beginner" | "intermediate" | "advanced">(() => {
    const saved = localStorage.getItem("speakflow_ai_difficulty");
    if (saved === "beginner" || saved === "intermediate" || saved === "advanced") {
      return saved;
    }
    return "beginner";
  });

  const handleDifficultyChange = (level: "beginner" | "intermediate" | "advanced") => {
    setDifficulty(level);
    localStorage.setItem("speakflow_ai_difficulty", level);
  };

  const { mutate, isPending } = useCreateScript();

  const handleGeneration = () => {
    const prompt = inputText.trim() || "Write a speech about public speaking and confidence.";
    mutate(
      { topic: prompt, difficulty },
      {
        onSuccess: (resData) => {
          if (resData && resData.script) {
            setScripts([resData.script, ...scripts]);
            startPractice(resData.script);
            setInputText("");
          }
        },
        onError: (err) => {
          console.error("AI prompt generation error, using fallback:", err);
          handleAiGenerate(prompt, difficulty);
        }
      }
    );
  };

  const renderInspirationIcon = (type: string) => {
    const iconClass = "w-5 h-5 text-accent";
   switch (type) {
  case "leaf":
    return <Leaf className={iconClass}/>;
  case "mic":
    return <Mic className={iconClass}/>;
  case "shield":
    return <Shield className={iconClass}/>;
  case "megaphone":
    return <Megaphone className={iconClass}/>;
  case "video":
    return <Video className={iconClass}/>;
  case "star":
    return <Star className={iconClass}/>;
  case "sparkles":
    return <Sparkles className={iconClass}/>;
  case "globe":
    return <Globe className={iconClass}/>;
}
  };

 const selectCategory = (cat: string) => {
  setActiveCategory(cat);

  switch (cat) {
    case "English Speaking":
      setInputText(
        "Write a simple English practice speech about building good daily habits and staying consistent."
      );
      break;

    case "Storytelling":
      setInputText(
        "Tell an engaging story about overcoming a difficult challenge and the lessons learned."
      );
      break;

    case "Interview Practice":
      setInputText(
        "Create an interview answer describing a time when I solved a difficult problem and what I learned from the experience."
      );
      break;

    case "Public Speaking":
      setInputText(
        "Write an inspiring speech about why small actions can create meaningful change in our lives."
      );
      break;

    case "Presentation":
      setInputText(
        "Create a clear presentation introducing a new product or idea, explaining its purpose, key features, and benefits."
      );
      break;

    default:
      setInputText("");
  }
};

  return (
    <div className="space-y-16 animate-fadeIn">
      <div className="text-center max-w-4xl mx-auto space-y-6">
       

        <h1 className="font-display font-extrabold text-5xl md:text-7xl leading-tight tracking-tight text-text-primary">
          Practice Your Speech
          <br />
          <span className="text-accent">
            with Confidence
          </span>
        </h1>

        <p className="text-base md:text-lg max-w-2xl mx-auto font-normal text-text-secondary">
          Write, generate with AI, or reuse your existing scripts to perfect your delivery in a
          distraction-free, glassmorphic studio environment.
        </p>

        <div className="relative max-w-3xl mx-auto mt-10">
          <div className="p-5 rounded-3xl border border-border-subtle bg-white/40 dark:bg-zinc-900/35 focus-within:border-accent/40 focus-within:bg-white/70 dark:focus-within:bg-zinc-900/55 shadow-md dark:shadow-black/20 backdrop-blur-md transition-all duration-300 relative">
            {inputText.trim() && (
              <button
                onClick={() => setInputText("")}
                className="absolute top-4 right-4 p-1.5 rounded-lg text-text-muted hover:text-text-primary hover:bg-hover-surface transition-all duration-200"
                title="Clear input"
              >
                <Eraser className="w-4 h-4" />
              </button>
            )}

            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="What would you like to practice today? Type your script, or select an AI suggestion pill below..."
              rows={3}
              className="w-full bg-transparent resize-none focus:outline-none text-base md:text-lg leading-relaxed text-text-primary placeholder-text-muted"
              disabled={isPending}
            />

            {isPending && (
              <div className="mb-4 text-left">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs font-bold text-accent flex items-center gap-1.5 animate-pulse">
                    <Sparkles className="w-3.5 h-3.5 animate-spin" />
                    <span>SpeakFlow AI is writing your script...</span>
                  </span>
                </div>
                <Progress value={95} className="animate-pulse" />
              </div>
            )}

            <div className="border-t border-border-subtle/50 my-3 pt-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-left">
              <span className="text-[10px] font-bold text-text-muted uppercase tracking-wider">
                Difficulty Level
              </span>
              <div className="inline-flex p-0.5 rounded-xl bg-surface-secondary/40 border border-border-subtle/50">
                {(
                  [
                    { id: "beginner", label: "Beginner", icon: <Smile className="w-3.5 h-3.5" /> },
                    { id: "intermediate", label: "Intermediate", icon: <Award className="w-3.5 h-3.5" /> },
                    { id: "advanced", label: "Advanced", icon: <Trophy className="w-3.5 h-3.5" /> },
                  ] as const
                ).map((item) => {
                  const isSelected = difficulty === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      disabled={isPending}
                      onClick={() => handleDifficultyChange(item.id)}
                      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-bold cursor-pointer transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed ${
                        isSelected
                          ? "bg-white dark:bg-zinc-800 text-accent shadow-sm"
                          : "text-text-secondary hover:text-text-primary"
                      }`}
                    >
                      {item.icon}
                      <span>{item.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between border-t border-border-subtle pt-4 gap-4">
              <div className="text-xs text-text-muted font-semibold">
                {inputText.trim() ? `${inputText.trim().split(/\s+/).length} words entered` : "0 words"}
              </div>

              <div className="flex space-x-3 w-full sm:w-auto">
                <Button
                  variant="secondary"
                  size="md"
                  onClick={() => {
                    const newScript: Script = {
                      id: `script-${Date.now()}`,
                      title: "New Speech Script",
                      content:
                        inputText.trim() ||
                        "Welcome back. Let's practice speaking clearly and pacing ourselves.",
                      editedAt: "Just now",
                      readTime: "1 min",
                      category: activeCategory || "Presentation",
                    };
                    setScripts([newScript, ...scripts]);
                    setEditingScript(newScript);
                  }}
                  disabled={isPending}
                  className="flex-1 sm:flex-initial"
                >
                  <PenTool className="w-4 h-4" />
                  <span>Start Writing</span>
                </Button>

                <Button
                  variant="default"
                  size="md"
                  onClick={handleGeneration}
                  disabled={isPending || !inputText.trim()}
                  className="flex-1 sm:flex-initial"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Generate with AI</span>
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-2 pt-4">
          {CATEGORIES.map((cat) => {
            const isSelected = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => selectCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-semibold border transition-all duration-250 cursor-pointer shadow-xs ${
                  isSelected
                    ? "bg-accent text-white border-accent"
                    : "bg-surface-secondary border-border-subtle text-text-secondary hover:bg-hover-surface hover:text-text-primary"
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="font-display font-extrabold text-2xl md:text-3xl tracking-tight text-text-primary">
            Recent Scripts
          </h2>

          <button
            onClick={() => setActiveTab("my-scripts")}
            className="text-xs font-bold text-accent hover:text-accent-hover transition-colors flex items-center gap-1 group cursor-pointer"
          >
            <span>View all scripts</span>
            <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>

        {scripts.length === 0 ? (
          <Card className="p-12 text-center border-dashed border-2">
            <p className="text-text-muted font-semibold">
              No recent scripts found. Enter a prompt above to start practicing!
            </p>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {scripts.slice(0, 3).map((script) => (
              <Card
                key={script.id}
                onClick={() => startPractice(script)}
                className="group relative flex flex-col justify-between h-[220px] cursor-pointer hover:-translate-y-1"
              >
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between gap-4">
                    <CardTitle className="line-clamp-1 group-hover:text-accent transition-colors">
                      {script.title}
                    </CardTitle>
                    <Badge variant="default" className="shrink-0">
                      {script.category}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="pb-4">
                  <p className="text-sm text-text-secondary leading-relaxed line-clamp-3">
                    {script.content}
                  </p>
                </CardContent>
                <CardFooter className="flex items-center justify-end text-[10px] font-bold text-text-muted uppercase tracking-wider">
                  <div className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{script.readTime.replace(/ read$/i, "")}</span>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </div>

      <div className="space-y-6">
        <h2 className="font-display font-extrabold text-2xl md:text-3xl tracking-tight text-text-primary">
          Need Inspiration?
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {INSPIRATIONS.map((insp) => {
            const isHighlighted = insp.id === "insp-1";
            return (
              <Card
                key={insp.id}
                onClick={() => {
                  setInputText(insp.prompt);
                  window.scrollTo({ top: 120, behavior: "smooth" });
                }}
                className={`group flex flex-col justify-between cursor-pointer hover:-translate-y-1 ${
                  isHighlighted
                    ? "border-accent/30 bg-accent/5 hover:border-accent hover:shadow-accent/5"
                    : ""
                }`}
              >
                <CardHeader className="space-y-4">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-surface-secondary border border-border-subtle group-hover:bg-accent/10 group-hover:border-accent/20 transition-all duration-300">
                    {renderInspirationIcon(insp.iconType)}
                  </div>
                  <div className="space-y-2">
                    <CardTitle className="text-sm font-bold group-hover:text-accent transition-colors">
                      {insp.title}
                    </CardTitle>
                    <CardDescription className="text-xs">
                      {insp.description}
                    </CardDescription>
                  </div>
                </CardHeader>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}
