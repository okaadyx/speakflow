import React from "react";
import { X } from "lucide-react";

export interface SheetProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}

export const Sheet: React.FC<SheetProps> = ({
  isOpen,
  onClose,
  title,
  subtitle,
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
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-40 bg-black/40 dark:bg-black/60 backdrop-blur-xs transition-opacity duration-300 animate-fadeIn"
        onClick={onClose}
      />
      {/* Slide-over panel */}
      <div className="fixed top-0 right-0 h-full w-85 max-w-full shadow-2xl p-6 z-50 flex flex-col border-l backdrop-blur-lg bg-surface-primary border-border-subtle text-text-primary animate-slideIn">
        <div className="flex items-center justify-between border-b pb-4 mb-6 border-border-subtle">
          <div>
            {subtitle && (
              <span className="text-[10px] uppercase font-bold text-text-muted tracking-wider block mb-0.5">
                {subtitle}
              </span>
            )}
            <h3 className="font-display font-extrabold text-lg text-text-primary tracking-tight">
              {title}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-text-muted hover:text-text-primary hover:bg-hover-surface transition-colors"
            title="Close drawer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto pr-1 -mr-2 scroll-smooth">{children}</div>
      </div>
    </>
  );
};
export default Sheet;
