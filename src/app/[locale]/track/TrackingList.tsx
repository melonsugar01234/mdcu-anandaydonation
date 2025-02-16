"use client";

import { Input } from "@/components/Forms";
import { getStoredTrackingCodes, setStoredTrackingCodes } from "@/utils/localStorage";
import { decodeTrackingCode } from "@/utils/trackingCode";
import { useLocale, useTranslations } from "next-intl";
import { useContext, useEffect, useRef, useState } from "react";
import { findLostTrackingCode, getStatus } from "./actions";
import { BatchedDeferPromise } from "@/utils/utils";
import { FORM_TEXT_MAX_SIZE } from "@/config";
import { ConfirmationDialogContext } from "@/components/ConfirmationDialog";

const getStatusBatched = new BatchedDeferPromise(getStatus);

export const TrackingList: React.FC<{
  config: Record<"enableTrackingCodeRecovery", string | null | undefined>;
}> = ({ config }) => {
  const locale = useLocale();
  const t = useTranslations("TrackingPage");
  const tMisc = useTranslations("Misc");
  const { withConfirmationDialog } = useContext(ConfirmationDialogContext);

  // region Tracking Code recover
  const trackingCodeRecoverDialogRef = useRef<HTMLDialogElement | null>(null);
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [finding, setFinding] = useState(false);
  const [recoverResult, setRecoverResult] =
    useState<Awaited<ReturnType<typeof findLostTrackingCode>>>();
  // endregion

  // region Tracking code functionality
  const [codeInput, setCodeInput] = useState("");
  const [trackingCodes, setTrackingCodes] = useState(getStoredTrackingCodes);
  const [status, setStatus] = useState<
    Map<string, { statusId?: number; statusName: string; note?: string | null }>
  >(new Map());

  useEffect(() => {
    let active = true;

    (async () => {
      const dbStatus = await getStatusBatched.call(trackingCodes);
      if (!active) return;

      const result: NonNullable<typeof status> = new Map();
      for (const i of trackingCodes) {
        result.set(i, {
          statusName: t("notFound"),
        });
      }
      for (const i of dbStatus) {
        result.set(i.trackingCode, {
          statusId: i.status,
          statusName: (locale === "th" ? i.statusNameTH : i.statusNameEN) ?? t("unknown"),
          note: i.statusNotes,
        });
      }
      setStatus(result);
    })();

    return () => {
      active = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [trackingCodes]);

  const refresh = () => {
    setStatus(new Map());
    setTrackingCodes((c) => [...c]);
  };

  const addCode = (code: string) => {
    if (code.length === 0) return;
    setTrackingCodes((codes) => {
      const newCodes = Array.from(new Set([code, ...codes]));
      setStoredTrackingCodes(newCodes);
      return newCodes;
    });
  };

  const removeCode = (code: string) =>
    setTrackingCodes((codes) => {
      const newCodes = codes.filter((c) => c !== code);
      setStoredTrackingCodes(newCodes);
      return newCodes;
    });
  // endregion

  return (
    <>
      {
        // region Tracking code UI
      }
      <div className="flex w-full flex-nowrap items-end justify-center gap-2">
        <Input
          label={t("trackingCodeLabel")}
          autoComplete="off"
          maxLength={FORM_TEXT_MAX_SIZE}
          value={codeInput}
          placeholder={t("trackingCodeExample")}
          onChange={(v) => setCodeInput(decodeTrackingCode(v))}
        />
        <button
          type="button"
          className="btn btn-primary mb-1 h-12"
          onClick={() => {
            addCode(codeInput);
            setCodeInput("");
          }}
        >
          {t("trackingCodeAdd")}
        </button>
      </div>
      <p className="text-sm text-neutral-700">{t("note")}</p>

      <div className="flex w-full flex-nowrap items-center">
        <h2 className="mb-2 text-base font-bold">{t("trackingList")}</h2>
        <button type="button" className="btn btn-ghost btn-xs ml-auto" onClick={refresh}>
          {tMisc("btnRefresh")}
        </button>
      </div>

      <div className="w-full overflow-x-auto">
        <table className="table-zebra table text-nowrap whitespace-nowrap">
          <thead>
            <tr className="bg-primary text-primary-content">
              <th className="w-[1%] text-nowrap">{t("trackingListCode")}</th>
              <th>{t("trackingListStatus")}</th>
              <th className="w-[1%] p-0"></th>
            </tr>
          </thead>
          <tbody>
            {trackingCodes.map((code) => {
              const codeStatus = status.get(code);

              return (
                <tr key={code}>
                  <td>
                    <span className="font-bold">{code}</span>
                  </td>
                  <td>
                    {codeStatus ? (
                      <div className="flex flex-col gap-y-2">
                        <span>
                          {typeof codeStatus.statusId === "number"
                            ? `${codeStatus.statusId}: `
                            : ""}
                          <span className="font-bold">{codeStatus.statusName}</span>
                        </span>
                        {codeStatus.note && <span className="text-sm">{codeStatus.note}</span>}
                      </div>
                    ) : (
                      <span className="loading loading-dots loading-sm"></span>
                    )}
                  </td>
                  <td>
                    <button
                      type="button"
                      className="btn btn-ghost btn-error btn-xs btn-square p-0"
                      onClick={withConfirmationDialog(
                        t("trackingListRemoveConfirm", { code }),
                        () => removeCode(code),
                      )}
                    >
                      {t("trackingListRemove")}
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {
        // endregion
      }

      {
        // region Tracking code recovery UI
      }
      {config.enableTrackingCodeRecovery && (
        <button
          type="button"
          className="btn btn-link"
          onClick={() => trackingCodeRecoverDialogRef.current?.showModal()}
        >
          {t("forgotTrackingCode")}
        </button>
      )}

      <dialog ref={trackingCodeRecoverDialogRef} className="modal">
        <div className="modal-box">
          <button
            type="button"
            className="btn btn-sm btn-circle btn-error absolute top-2 right-2"
            onClick={() => trackingCodeRecoverDialogRef.current?.close()}
          >
            ✕
          </button>

          <p className="mt-2">{t("recoveryInstruction")}</p>

          <Input
            required
            type="text"
            label={t("nameLabel")}
            autoComplete="section-trackingcoderecovery name"
            placeholder={t("nameExample")}
            maxLength={FORM_TEXT_MAX_SIZE}
            validate={t("nameInvalid")}
            value={name}
            onChange={setName}
          />
          <Input
            required
            type="tel"
            label={t("phoneLabel")}
            autoComplete="section-trackingcoderecovery tel"
            placeholder={t("phoneExample")}
            maxLength={FORM_TEXT_MAX_SIZE}
            validate={t("phoneInvalid")}
            pattern="\+?\d+"
            value={phoneNumber}
            onChange={(v) => setPhoneNumber(v.replaceAll(/[^+\d]/g, ""))}
          />

          <button
            type="button"
            className="btn btn-block btn-primary mt-4"
            disabled={finding}
            onClick={() => {
              setFinding(true);
              findLostTrackingCode(name, phoneNumber)
                .then((r) => setRecoverResult(r))
                .finally(() => setFinding(false));
            }}
          >
            {finding ? (
              <>
                <span className="loading loading-spinner"></span>
                {t("searchingCode")}
              </>
            ) : (
              <>{t("searchCode")}</>
            )}
          </button>

          {recoverResult &&
            (recoverResult.error ? (
              <p className="mt-4 text-center font-bold">{t("recoveryDisabled")}</p>
            ) : (
              <>
                <p className="mt-4 font-bold">
                  {t("recoveryFound", { amount: recoverResult.result.length })}
                </p>
                <ul className="list-inside list-disc">
                  {recoverResult.result.map((c) => (
                    <li key={c}>{c}</li>
                  ))}
                </ul>
                {recoverResult.result.length > 0 && (
                  <button
                    type="button"
                    className="btn btn-block mt-2"
                    onClick={() => {
                      recoverResult.result.forEach(addCode);
                      setRecoverResult(undefined);
                      trackingCodeRecoverDialogRef.current?.close();
                    }}
                  >
                    {t("addRecoveryResults")}
                  </button>
                )}
              </>
            ))}
        </div>
        <div className="modal-backdrop">
          <button type="button" onClick={() => trackingCodeRecoverDialogRef.current?.close()}>
            close
          </button>
        </div>
      </dialog>
      {
        // endregion
      }
    </>
  );
};
