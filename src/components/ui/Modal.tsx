import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface ModalProps {
  /** Whether the modal is open */
  open: boolean;
  /** Callback when user clicks outside or closes */
  onClose: () => void;
  /** Modal title */
  title: string;
  /** Modal content */
  children: ReactNode;
  /** Optional className */
  className?: string;
}

export function Modal({
  open,
  onClose,
  title,
  children,
  className,
}: ModalProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className={cn("bg-white rounded-lg shadow-xl w-full max-w-lg p-6", className)}>
        <div className="flex justify-between items-start mb-4">
          <h2 className="text-xl font-bold text-gray-900">{title}</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
            aria-label="Cerrar"
          >
            ×
          </button>
        </div>
        <div>{children}</div>
      </div>
    </div>
  );
}