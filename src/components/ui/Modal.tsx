"use client";

import { useEffect, useRef } from "react";
import { ArrowLeftIcon, CloseIcon } from "@/components/ui/Icons";

type ModalProps = {
  open: boolean;
  onClose: () => void;
  title?: string;
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
          className="fixed inset-0 z-40 hidden bg-ink/60 backdrop-blur-sm lg:block"
        />
      )}
      <dialog
        ref={dialogRef}
        aria-labelledby={labelledBy}
        onClose={onClose}
        className="fixed inset-0 z-50 h-full w-full max-w-none max-h-none overflow-hidden rounded-none border-0 bg-white p-0 shadow-none lg:m-auto lg:h-fit lg:w-[calc(100%-2rem)] lg:max-w-lg lg:rounded-[22px] lg:border lg:border-ink/10 lg:shadow-[0_40px_80px_-30px_rgba(20,10,50,0.45)]"
      >
        <div className="themed-scrollbar h-full overflow-y-auto lg:h-auto lg:max-h-[85vh]">
          {title && (
            <div className="sticky top-0 z-10 flex items-center gap-2 border-b border-ink/10 bg-white/90 px-7 py-3 backdrop-blur-md lg:static lg:items-start lg:gap-4 lg:border-0 lg:bg-transparent lg:px-8 lg:pt-8 lg:pb-0 lg:backdrop-blur-none">
              <button
                type="button"
                onClick={onClose}
                aria-label="Back"
                className="flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center rounded-full text-ink transition hover:bg-surface lg:hidden"
              >
                <ArrowLeftIcon className="h-5 w-5" />
              </button>

              <h3
                id={labelledBy}
                className="min-w-0 flex-1 line-clamp-2 text-center text-sm font-heading font-bold leading-tight text-ink lg:line-clamp-none lg:text-left lg:text-2xl lg:font-extrabold lg:leading-normal"
              >
                {title}
              </h3>

              <span aria-hidden="true" className="h-9 w-9 shrink-0 lg:hidden" />

              <button
                type="button"
                onClick={onClose}
                aria-label="Close"
                className="hidden h-9 w-9 shrink-0 cursor-pointer items-center justify-center rounded-full text-muted transition hover:bg-surface hover:text-ink lg:flex"
              >
                <CloseIcon className="h-5 w-5" />
              </button>
            </div>
          )}

          {children}
        </div>
      </dialog>
    </>
  );
}
