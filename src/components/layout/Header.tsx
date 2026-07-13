import { Sun, Moon, Settings, Maximize, Minimize, BookOpen, History, Home } from "lucide-react";
import { Button } from "../ui/button";

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: any) => void;
  theme: "dark" | "light";
  setTheme: (theme: "dark" | "light") => void;
  showSettings: boolean;
  setShowSettings: (show: boolean) => void;
  toggleFullscreen: () => void;
  isFullscreen: boolean;
  isPracticing: boolean;
  editingScript: any;
  setEditingScript: (val: any) => void;
  setIsPracticing: (val: boolean) => void;
}

export default function Header({
  activeTab,
  setActiveTab,
  theme,
  setTheme,
  showSettings,
  setShowSettings,
  toggleFullscreen,
  isFullscreen,
  isPracticing,
  editingScript,
  setEditingScript,
  setIsPracticing,
}: HeaderProps) {
  const navigateTo = (tab: any) => {
    setActiveTab(tab);
    setIsPracticing(false);
    setEditingScript(null);
  };

  const navItems = [
    { id: "home", label: "Home", icon: Home },
    { id: "my-scripts", label: "My Scripts", icon: BookOpen },
    { id: "practice-history", label: "History", icon: History },
  ] as const;

  return (
    <header className="sticky top-0 z-30 px-6 py-4 flex items-center justify-between border-b backdrop-blur-lg bg-surface-primary/65 border-border-subtle transition-all duration-300">
      {/* Brand Logo */}
      <div className="flex items-center space-x-8">
        <div
          className="flex items-center space-x-2.5 cursor-pointer group"
          onClick={() => navigateTo("home")}
        >
          <div className="relative flex items-center justify-center w-9 h-9 rounded-xl bg-accent shadow-md shadow-accent/15 group-hover:scale-105 transition-transform duration-300">
            <svg
              viewBox="0 0 100 100"
              className="w-5.5 h-5.5 text-white"
              fill="none"
              stroke="currentColor"
              strokeWidth="10"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M 25 43 C 27 43, 29 33, 34 33 C 39 33, 37 57, 40 57 C 43 57, 40 70, 43 70 C 46 70, 48 25, 55 25 C 62 25, 73 25, 74 27 C 76 29, 73 35, 71 41 C 69 47, 67 49, 64 49 C 61 49, 58 38, 55 38 C 52 38, 52 45, 54 49 C 56 53, 59 53, 61 53 C 63 53, 65 47, 67 43" />
            </svg>
          </div>
          <span className="font-display font-extrabold text-xl tracking-tight text-text-primary group-hover:opacity-90 transition-opacity">
            SpeakFlow
          </span>
        </div>

        {/* Dynamic Navigation Pill bar */}
        <nav className="hidden md:flex items-center space-x-1 p-1 bg-surface-secondary border border-border-subtle rounded-xl">
          {navItems.map((item) => {
            const isSelected =
              activeTab === item.id && !isPracticing && !editingScript;
            const isEditingScriptsView = item.id === "my-scripts" && (activeTab === "my-scripts" || editingScript);
            const active = isSelected || isEditingScriptsView;

            return (
              <button
                key={item.id}
                onClick={() => navigateTo(item.id)}
                className={`flex items-center space-x-1.5 px-4 py-1.5 text-xs font-semibold rounded-lg transition-all duration-250 cursor-pointer ${
                  active
                    ? "bg-surface-primary text-text-primary shadow-xs"
                    : "text-text-secondary hover:text-text-primary hover:bg-surface-primary/30"
                }`}
              >
                <item.icon className="w-3.5 h-3.5" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Header Actions */}
      <div className="flex items-center space-x-2">
        {/* Light/Dark Toggle */}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          title="Toggle theme"
          className="w-9 h-9 p-0 rounded-xl"
        >
          {theme === "dark" ? (
            <Sun className="w-4 h-4 text-text-secondary hover:text-text-primary" />
          ) : (
            <Moon className="w-4 h-4 text-text-secondary hover:text-text-primary" />
          )}
        </Button>

        {/* Settings button */}
        <Button
          variant={showSettings ? "glass" : "ghost"}
          size="sm"
          onClick={() => setShowSettings(!showSettings)}
          title="Practice settings"
          className={`w-9 h-9 p-0 rounded-xl ${
            showSettings ? "text-accent bg-surface-secondary" : ""
          }`}
        >
          <Settings className="w-4 h-4" />
        </Button>

        {/* Fullscreen Toggle */}
        <Button
          variant="ghost"
          size="sm"
          onClick={toggleFullscreen}
          title="Toggle Fullscreen"
          className="w-9 h-9 p-0 rounded-xl"
        >
          {isFullscreen ? (
            <Minimize className="w-4 h-4 text-accent" />
          ) : (
            <Maximize className="w-4 h-4 text-text-secondary hover:text-text-primary" />
          )}
        </Button>
      </div>
    </header>
  );
}
