"use client";

import { useEffect, useRef } from "react";

type ModalProps = {
  open: boolean;
  onClose: () => void;
  labelledBy?: string;
  children: React.ReactNode;
};

export function Modal({ open, onClose, labelledBy, children }: ModalProps) {
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
          className="fixed inset-0 z-40 bg-ink/60 backdrop-blur-sm"
        />
      )}
      <dialog
        ref={dialogRef}
        aria-labelledby={labelledBy}
        onClose={onClose}
        className="fixed inset-0 z-50 m-auto h-fit w-[calc(100%-2rem)] max-w-lg overflow-hidden rounded-[22px] border border-ink/10 bg-white p-0 shadow-[0_40px_80px_-30px_rgba(20,10,50,0.45)]"
      >
        <div className="themed-scrollbar max-h-[85vh] overflow-y-auto">{children}</div>
      </dialog>
    </>
  );
}
