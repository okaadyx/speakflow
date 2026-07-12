import React, { useState } from "react";
import { Trash2, AlertTriangle, Calendar, Clock, Zap } from "lucide-react";
import type { PracticeLog } from "../../types";
import { Button, Card, Badge, Dialog } from "../ui";

interface PracticeHistoryViewProps {
  theme: "dark" | "light";
  logs: PracticeLog[];
  setLogs: React.Dispatch<React.SetStateAction<PracticeLog[]>>;
}

export default function PracticeHistoryView({
  theme,
  logs,
  setLogs,
}: PracticeHistoryViewProps) {
  void theme;

  // Modal state for log deletion
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);
  const deleteTargetTitle = logs.find((l) => l.id === deleteTargetId)?.scriptTitle || "";

  const openDeleteDialog = (id: string) => {
    setDeleteTargetId(id);
  };

  const closeDeleteDialog = () => {
    setDeleteTargetId(null);
  };

  const handleConfirmDelete = () => {
    if (deleteTargetId) {
      setLogs(logs.filter((l) => l.id !== deleteTargetId));
      closeDeleteDialog();
    }
  };

  const getPaceBadgeVariant = (pace: PracticeLog["paceRating"]) => {
    switch (pace) {
      case "Perfect":
        return "success";
      case "Too Fast":
        return "warning";
      case "Too Slow":
      default:
        return "info";
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* View Header */}
      <div>
        <h2 className="font-display font-extrabold text-3xl tracking-tight text-text-primary">
          Practice History Log
        </h2>
        <p className="text-sm text-text-secondary mt-1">
          Review logs of your past speaking practices, calculated speaking speeds, and tracking pace statistics.
        </p>
      </div>

      {logs.length === 0 ? (
        <Card className="rounded-2xl border-2 p-16 text-center bg-surface-secondary/10">
          <div className="mx-auto w-12 h-12 rounded-xl flex items-center justify-center bg-surface-secondary border border-border-subtle text-text-muted mb-4">
            <Zap className="w-6 h-6" />
          </div>
          <h3 className="font-display font-bold text-lg text-text-primary mb-1">
            No history recorded
          </h3>
          <p className="text-sm text-text-muted max-w-sm mx-auto">
            Run a microphone practice session inside any script to generate your first pace ratings and statistics.
          </p>
        </Card>
      ) : (
        <Card className="overflow-hidden p-0 border border-border-subtle shadow-md">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-border-subtle text-[10px] font-extrabold uppercase tracking-wider bg-surface-secondary/50 text-text-secondary">
                  <th className="py-4 px-6">Script</th>
                  <th className="py-4 px-6">Date & Time</th>
                  <th className="py-4 px-6">Duration</th>
                  <th className="py-4 px-6">Est. Speed</th>
                  <th className="py-4 px-6">Pacing Rating</th>
                  <th className="py-4 px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border-subtle/50">
                {logs.map((log) => (
                  <tr
                    key={log.id}
                    className="text-sm hover:bg-hover-surface/20 text-text-primary transition-colors duration-150"
                  >
                    <td className="py-4 px-6 font-bold text-text-primary">
                      {log.scriptTitle}
                    </td>
                    <td className="py-4 px-6 text-text-secondary font-mono text-xs">
                      <div className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-text-muted" />
                        <span>{log.date}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6 font-mono text-xs text-text-secondary">
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-text-muted" />
                        <span>
                          {Math.floor(log.duration / 60)}m {log.duration % 60}s
                        </span>
                      </div>
                    </td>
                    <td className="py-4 px-6 font-extrabold text-accent font-mono text-xs">
                      {log.wpm} WPM
                    </td>
                    <td className="py-4 px-6">
                      <Badge variant={getPaceBadgeVariant(log.paceRating)}>{log.paceRating}</Badge>
                    </td>
                    <td className="py-4 px-6 text-right">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => openDeleteDialog(log.id)}
                        className="w-8 h-8 p-0 rounded-lg text-text-muted hover:text-error hover:bg-error/5"
                        title="Delete log record"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {/* Styled accessible confirmation Dialog for Log Deletion */}
      <Dialog
        isOpen={deleteTargetId !== null}
        onClose={closeDeleteDialog}
        title="Delete Practice Record"
        description="Are you sure you want to permanently remove this history log? This action cannot be undone."
      >
        <div className="p-4 rounded-xl border border-error/20 bg-error/5 text-error flex items-start gap-3 mb-6 animate-scaleUp">
          <AlertTriangle className="w-5 h-5 text-error shrink-0 mt-0.5" />
          <div className="text-xs leading-relaxed font-semibold">
            Deleting record for: <span className="font-extrabold font-mono">{deleteTargetTitle}</span>
          </div>
        </div>

        <div className="flex space-x-3 justify-end">
          <Button variant="ghost" size="sm" onClick={closeDeleteDialog}>
            Cancel
          </Button>
          <Button variant="destructive" size="sm" onClick={handleConfirmDelete}>
            Delete Record
          </Button>
        </div>
      </Dialog>
    </div>
  );
}
