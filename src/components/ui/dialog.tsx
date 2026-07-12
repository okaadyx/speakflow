import React from "react";
import { X } from "lucide-react";

export interface DialogProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  children?: React.ReactNode;
}

export const Dialog: React.FC<DialogProps> = ({
  isOpen,
  onClose,
  title,
  description,
  children,
}) => {
  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fadeIn">
      {/* Backdrop: translucent dark overlay */}
      <div
        className="fixed inset-0 bg-black/40 dark:bg-black/60 backdrop-blur-xs transition-opacity duration-300"
        onClick={onClose}
      />
      {/* Modal Container */}
      <div className="relative w-full max-w-md bg-surface-primary border border-border-subtle rounded-3xl p-6 shadow-2xl z-10 transition-all duration-300 backdrop-blur-md animate-scaleUp">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-1.5 rounded-lg text-text-muted hover:text-text-primary hover:bg-hover-surface transition-colors"
          title="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="space-y-1.5 mb-6">
          <h3 className="font-display font-extrabold text-xl text-text-primary tracking-tight">
            {title}
          </h3>
          {description && (
            <p className="text-sm text-text-secondary leading-relaxed">
              {description}
            </p>
          )}
        </div>

        <div>{children}</div>
      </div>
    </div>
  );
};
export default Dialog;
