import React, { useState } from "react";
import { Plus, Edit2, Trash2, BookOpen, AlertTriangle, Clock } from "lucide-react";
import type { Script } from "../../types";
import { Button, Card, CardHeader, CardTitle, CardContent, CardFooter, Badge, Dialog } from "../ui";

interface MyScriptsViewProps {
  theme: "dark" | "light";
  scripts: Script[];
  setScripts: React.Dispatch<React.SetStateAction<Script[]>>;
  startPractice: (script: Script) => void;
  setEditingScript: (script: Script | null) => void;
  startNewScript: () => void;
}

export default function MyScriptsView({
  theme,
  scripts,
  setScripts,
  startPractice,
  setEditingScript,
  startNewScript,
}: MyScriptsViewProps) {
  void theme;

  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);
  const deleteTargetTitle = scripts.find((s) => s.id === deleteTargetId)?.title || "";

  const openDeleteDialog = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setDeleteTargetId(id);
  };

  const closeDeleteDialog = () => {
    setDeleteTargetId(null);
  };

  const handleConfirmDelete = () => {
    if (deleteTargetId) {
      setScripts(scripts.filter((s) => s.id !== deleteTargetId));
      closeDeleteDialog();
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h2 className="font-display font-extrabold text-3xl tracking-tight text-text-primary">
            My Speech Scripts
          </h2>
          <p className="text-sm text-text-secondary mt-1">
            Create, edit, and launch practice sessions for all your saved speech templates.
          </p>
        </div>

        <Button variant="default" size="md" onClick={startNewScript} className="shrink-0">
          <Plus className="w-5 h-5" />
          <span>Create New Script</span>
        </Button>
      </div>

      {scripts.length === 0 ? (
        <Card className="rounded-2xl border-2 border-dashed p-16 text-center bg-surface-secondary/10">
          <div className="mx-auto w-12 h-12 rounded-xl flex items-center justify-center bg-surface-secondary border border-border-subtle text-text-muted mb-4">
            <BookOpen className="w-6 h-6" />
          </div>
          <h3 className="font-display font-bold text-lg text-text-primary mb-1">
            No scripts found
          </h3>
          <p className="text-sm text-text-muted max-w-sm mx-auto mb-6">
            Get started by creating a new template or drafting speech scripts using AI generation.
          </p>
          <Button variant="outline" size="sm" onClick={startNewScript}>
            <Plus className="w-4 h-4" />
            <span>Create first script</span>
          </Button>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {scripts.map((script) => (
            <Card
              key={script.id}
              onClick={() => startPractice(script)}
              className="group relative flex flex-col justify-between min-h-[220px] cursor-pointer hover:-translate-y-1"
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

              <CardFooter className="flex items-center justify-between text-[10px] font-bold text-text-muted uppercase tracking-wider">
                <div className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{script.readTime.replace(/ read$/i, "")}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      setEditingScript(script);
                    }}
                    title="Edit script content"
                    className="w-9 h-9 p-0 rounded-lg hover:text-accent hover:bg-hover-surface"
                  >
                    <Edit2 className="w-5 h-5" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={(e) => openDeleteDialog(script.id, e)}
                    title="Delete script"
                    className="w-9 h-9 p-0 rounded-lg hover:text-error hover:bg-error/5"
                  >
                    <Trash2 className="w-5 h-5" />
                  </Button>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}

      <Dialog
        isOpen={deleteTargetId !== null}
        onClose={closeDeleteDialog}
        title="Delete Speech Template"
        description="This action is permanent. It will permanently remove this script from your saved browser templates."
      >
        <div className="p-4 rounded-xl border border-error/20 bg-error/5 text-error flex items-start gap-3 mb-6 animate-scaleUp">
          <AlertTriangle className="w-5 h-5 text-error shrink-0 mt-0.5" />
          <div className="text-xs leading-relaxed font-semibold">
            Deleting: <span className="font-extrabold font-mono">{deleteTargetTitle}</span>
          </div>
        </div>

        <div className="flex space-x-3 justify-end">
          <Button variant="ghost" size="sm" onClick={closeDeleteDialog}>
            Cancel
          </Button>
          <Button variant="destructive" size="sm" onClick={handleConfirmDelete}>
            Delete Script
          </Button>
        </div>
      </Dialog>
    </div>
  );
}
