import React from "react";
import { ArrowLeft, Save, FileText, ChevronDown } from "lucide-react";
import type { Script } from "../../types";
import { CATEGORIES } from "../../types";
import { Button, Card, Input, Textarea } from "../ui";

interface EditorViewProps {
  theme: "dark" | "light";
  editingScript: Script;
  setEditingScript: React.Dispatch<React.SetStateAction<Script | null>>;
  saveEditedScript: () => void;
}

export default function EditorView({
  theme,
  editingScript,
  setEditingScript,
  saveEditedScript,
}: EditorViewProps) {
  void theme;
  const wordCount = editingScript.content.split(/\s+/).filter(Boolean).length;
  const charCount = editingScript.content.length;

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex items-center justify-between gap-4">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setEditingScript(null)}
          className="text-text-secondary hover:text-accent"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Scripts</span>
        </Button>

        <Button variant="default" size="md" onClick={saveEditedScript}>
          <Save className="w-4 h-4" />
          <span>Save Template</span>
        </Button>
      </div>

      <Card className="p-6 md:p-8 space-y-6">
        <div className="space-y-1.5">
          <label className="text-[10px] uppercase font-extrabold tracking-wider text-text-muted">
            Script Title
          </label>
          <Input
            type="text"
            placeholder="e.g. Opening Keynote Speech"
            value={editingScript.title}
            onChange={(e) => setEditingScript({ ...editingScript, title: e.target.value })}
            className="font-display text-2xl font-bold border-none px-0 pb-3 rounded-none border-b border-border-subtle focus:ring-0 focus:border-accent focus:bg-transparent text-text-primary"
          />
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-2 border-t border-border-subtle">
          <div className="flex items-center space-x-2.5">
            <span className="text-xs font-semibold text-text-muted uppercase tracking-wider">
              Category:
            </span>
            <div className="relative inline-block">
              <select
                value={editingScript.category}
                onChange={(e) => setEditingScript({ ...editingScript, category: e.target.value })}
                className="text-xs font-bold rounded-xl pl-3 pr-8 py-1.5 border border-border-subtle bg-surface-secondary text-text-primary appearance-none focus:outline-none focus:border-accent/40 transition-colors cursor-pointer"
              >
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-text-muted absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          <div className="flex items-center space-x-1.5 text-xs text-text-secondary font-semibold font-mono bg-surface-secondary px-2.5 py-1 rounded-lg border border-border-subtle">
            <FileText className="w-4 h-4 text-text-muted" />
            <span>
              {wordCount} words | {charCount} chars
            </span>
          </div>
        </div>

        <div className="space-y-1.5 pt-2">
          <label className="text-[10px] uppercase font-extrabold tracking-wider text-text-muted">
            Speech Content
          </label>
          <Textarea
            value={editingScript.content}
            onChange={(e) => setEditingScript({ ...editingScript, content: e.target.value })}
            rows={15}
            className="text-base md:text-lg leading-relaxed focus:ring-accent/15 focus:border-accent/40"
            placeholder="Write your speech body here. Keep paragraphs reasonably short for optimal pacing visualizer highlighting."
          />
        </div>
      </Card>
    </div>
  );
}
