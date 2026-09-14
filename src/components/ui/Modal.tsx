"use client";

import { useEffect, useRef } from "react";
import { ArrowLeftIcon, CloseIcon } from "@/components/ui/Icons";

/**
 * The two shapes a modal takes, each carrying its own geometry because they
 * differ on phones as well as on desktop.
 *
 * `form` is the original: full screen on a phone, a 32rem column from `lg`.
 * A stack of labelled fields wants the whole screen on a small device, and
 * filling it means there is no wasted space to explain.
 *
 * `panel` is wide enough to seat a photograph beside its copy, and it is
 * sized to its content at EVERY width rather than only from `lg`. Full screen
 * is wrong for it: the announcement pop-up is four short elements, and
 * stretching them down a phone leaves a dead half-screen under the controls.
 *
 * `dialog` is the panel itself, `scroll` the container inside it that holds
 * the overflow.
 */
const SIZES = {
  form: {
    dialog:
      "h-full max-h-none w-full rounded-none border-0 lg:h-fit lg:w-[calc(100%-2rem)] lg:max-w-lg lg:rounded-[22px] lg:border",
    scroll: "h-full lg:h-auto lg:max-h-[85vh]",
  },
  panel: {
    dialog:
      "h-fit max-h-[calc(100dvh-1.5rem)] w-[calc(100%-1.5rem)] rounded-[18px] border lg:max-h-[90vh] lg:w-[calc(100%-2rem)] lg:max-w-[880px] lg:rounded-[22px]",
    scroll: "max-h-[calc(100dvh-1.5rem)] lg:max-h-[90vh]",
  },
} as const;

/**
 * `card` is the white sheet a form sits on, unaffected by the site's theme
 * toggle on purpose: a form is a document.
 *
 * `themed` follows the `--home-*` tokens, so the modal is dark on the dark
 * theme and light on the light one. Anything that reads as part of the page
 * rather than as a dialog over it wants this one.
 */
const SURFACES = {
  card: "bg-white border-ink/10",
  themed: "bg-[var(--home-bg)] border-[var(--home-hairline)]",
} as const;

type ModalProps = {
  open: boolean;
  onClose: () => void;
  /**
   * Renders the built-in header: a centred title with a back arrow on
   * phones and a close button from `lg`. Omit it to supply your own chrome
   * as part of `children`, which is what a modal with a footer wants.
   */
  title?: string;
  labelledBy?: string;
  size?: keyof typeof SIZES;
  surface?: keyof typeof SURFACES;
  children: React.ReactNode;
};

export function Modal({
  open,
  onClose,
  title,
  labelledBy,
  size = "form",
  surface = "card",
  children,
}: ModalProps) {
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
          className="fixed inset-0 z-60 bg-ink/60 backdrop-blur-sm"
        />
      )}
      <dialog
        ref={dialogRef}
        aria-labelledby={labelledBy}
        onClose={onClose}
        className={`fixed inset-0 z-70 m-auto max-w-none overflow-hidden p-0 shadow-none lg:shadow-[0_40px_80px_-30px_rgba(20,10,50,0.45)] ${SIZES[size].dialog} ${SURFACES[surface]}`}
      >
        <div className={`themed-scrollbar overflow-y-auto ${SIZES[size].scroll}`}>
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
                className="min-w-0 flex-1 line-clamp-2 text-center text-sm font-display font-bold leading-tight text-ink lg:line-clamp-none lg:text-left lg:text-2xl lg:font-extrabold lg:leading-normal"
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
