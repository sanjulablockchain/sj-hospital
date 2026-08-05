"use client";

import { useEffect, useRef } from "react";
import { ArrowLeftIcon, CloseIcon } from "@/components/ui/Icons";

type ModalProps = {
  open: boolean;
  onClose: () => void;
  title: string;
  labelledBy?: string;
  children: React.ReactNode;
};

export function Modal({ open, onClose, title, labelledBy, children }: ModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (open && !dialog.open) {
      dialog.showModal();
    } else if (!open && dialog.open) {
      dialog.close();
    }
  }, [open]);

  return (
    <>
      {open && (
        <div
          aria-hidden="true"
          onClick={onClose}
          className="fixed inset-0 z-40 hidden bg-ink/60 backdrop-blur-sm md:block"
        />
      )}
      <dialog
        ref={dialogRef}
        aria-labelledby={labelledBy}
        onClose={onClose}
        className="fixed inset-0 z-50 h-full w-full overflow-hidden rounded-none border-0 bg-white p-0 shadow-none md:m-auto md:h-fit md:w-[calc(100%-2rem)] md:max-w-lg md:rounded-[22px] md:border md:border-ink/10 md:shadow-[0_40px_80px_-30px_rgba(20,10,50,0.45)]"
      >
        <div className="themed-scrollbar h-full overflow-y-auto md:h-auto md:max-h-[85vh]">
          <div className="sticky top-0 z-10 flex items-center gap-2 border-b border-ink/10 bg-white/90 px-4 py-3 pt-[calc(env(safe-area-inset-top)+0.75rem)] backdrop-blur-md md:static md:items-start md:gap-4 md:border-0 md:bg-transparent md:px-8 md:pt-8 md:pb-0 md:backdrop-blur-none">
            <button
              type="button"
              onClick={onClose}
              aria-label="Back"
              className="flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center rounded-full text-ink transition hover:bg-surface md:hidden"
            >
              <ArrowLeftIcon className="h-5 w-5" />
            </button>

            <h3
              id={labelledBy}
              className="min-w-0 flex-1 truncate text-center font-heading text-base font-bold text-ink md:overflow-visible md:text-clip md:whitespace-normal md:text-left md:text-2xl md:font-extrabold"
            >
              {title}
            </h3>

            <span aria-hidden="true" className="h-9 w-9 shrink-0 md:hidden" />

            <button
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="hidden h-9 w-9 shrink-0 cursor-pointer items-center justify-center rounded-full text-muted transition hover:bg-surface hover:text-ink md:flex"
            >
              <CloseIcon className="h-5 w-5" />
            </button>
          </div>

          {children}
        </div>
      </dialog>
    </>
  );
}
