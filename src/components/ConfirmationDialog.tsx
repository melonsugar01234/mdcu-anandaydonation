"use client";

import { useTranslations } from "next-intl";
import type React from "react";
import { createContext, memo, useCallback, useRef, useState } from "react";

const defaultConfimationDialog = (message: string, fn: () => void) => () => {
  if (window.confirm(message)) fn();
};

export const ConfirmationDialogContext = createContext({
  withConfirmationDialog: defaultConfimationDialog,
});

export const ConfirmationDialogProvider: React.FC<React.PropsWithChildren> = memo(
  function ConfirmationDialogProvider({ children }) {
    const t = useTranslations("Misc");
    const dialogRef = useRef<HTMLDialogElement | null>(null);
    const [message, setMessage] = useState("");
    const onConfirmFn = useRef<(() => void) | null>(null);

    const withConfirmationDialog = useCallback(
      (message: string, fn: () => void) => () => {
        setMessage(message);
        onConfirmFn.current = fn;
        dialogRef.current?.showModal();
      },
      [],
    );

    return (
      <>
        <dialog ref={dialogRef} className="modal">
          <div className="modal-box">
            <p className="select-none">{message}</p>
            <div className="modal-action grid grid-cols-2">
              <form method="dialog">
                <button className="btn btn-block">{t("btnCancel")}</button>
              </form>
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => {
                  dialogRef.current?.close();
                  const targetFn = onConfirmFn.current;
                  onConfirmFn.current = null;
                  targetFn?.();
                }}
              >
                {t("btnOk")}
              </button>
            </div>
          </div>
        </dialog>

        <ConfirmationDialogContext.Provider value={{ withConfirmationDialog }}>
          {children}
        </ConfirmationDialogContext.Provider>
      </>
    );
  },
);
