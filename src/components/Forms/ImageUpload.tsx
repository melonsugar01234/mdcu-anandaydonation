/* eslint-disable @next/next/no-img-element */

import {
  IMAGE_COMPRESSION_QUALITY,
  TRANSFER_RECEIPT_MAX_COUNT,
  TRANSFER_RECEIPT_MAX_SIZE,
} from "@/config";
import { useEffect, useId, useRef, useState } from "react";
import Compressor from "compressorjs";
import { formatNumber } from "@/utils/format";
import { useTranslations } from "next-intl";

export const ImageUpload: React.FC<{
  maxCount?: number;
  maxSize?: number;
  label: string;
  note?: string;
  initialValues?: File[];
  onChange?: (files: File[]) => void;
}> = ({ maxCount, maxSize, label, note, initialValues, onChange }) => {
  const t = useTranslations("ImageUpload");

  const inputRef = useRef<HTMLInputElement | null>(null);
  const inputId = useId();
  const labelRef = useRef<HTMLLabelElement | null>(null);
  const labelId = useId();
  const previewImageRef = useRef<HTMLImageElement | null>(null);
  const previewDialogRef = useRef<HTMLDialogElement | null>(null);

  // Set default values
  maxCount = maxCount ?? TRANSFER_RECEIPT_MAX_COUNT;
  maxSize = maxSize ?? TRANSFER_RECEIPT_MAX_SIZE;

  // Local states
  const [errorMessage, setErrorMessage] = useState<string>();
  const [files, setFiles] = useState<File[]>(initialValues ?? []);

  // Callback to onChange
  useEffect(() => {
    if (files !== initialValues) onChange?.(files);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [files, onChange]);

  /**
   * Take the uploaded images, processes them, and add them to files
   */
  const processFileList = (files: FileList) => {
    for (const file of files) {
      new Compressor(file, {
        quality: IMAGE_COMPRESSION_QUALITY,
        mimeType: "image/jpeg",

        success(result) {
          if (result.size > maxSize) {
            setErrorMessage(t("fileTooLarge"));
            return;
          }

          setFiles((files) => {
            if (files.length >= maxCount) {
              console.log(files.length);
              setErrorMessage(t("fileTooMany"));
              return files;
            }

            return [
              ...files,
              new File([result], file.name, { type: result.type, lastModified: Date.now() }),
            ];
          });
        },
        error(err) {
          setErrorMessage(t("fileNotCompatible"));
          console.log(err.message);
        },
      });
    }
  };

  const displayPreview = (file: File) => {
    if (previewImageRef.current) previewImageRef.current.src = URL.createObjectURL(file);
    if (previewDialogRef.current) previewDialogRef.current.showModal();
  };

  const closePreview = () => {
    if (previewImageRef.current) previewImageRef.current.src = "";
    if (previewDialogRef.current) previewDialogRef.current.close();
  };

  return (
    <fieldset className="fieldset">
      <legend className="fieldset-legend text-base">{label}</legend>
      {note && <p className="text-sm text-neutral-700">{note}</p>}

      {
        // region Error message banner
      }
      {errorMessage && (
        <div role="alert" className="alert alert-error alert-soft">
          <span></span>
          <span className="text-red-800">{errorMessage}</span>
          <button
            type="button"
            className="btn btn-ghost btn-xs"
            onClick={() => setErrorMessage(undefined)}
          >
            ✕
          </button>
        </div>
      )}
      {
        // endregion
      }

      {
        // region File list UI
      }
      <ul className="list bg-base-100 rounded-box shadow-md">
        {files.map((f, idx) => (
          <li key={f.name + f.lastModified} className="list-row">
            <div>
              <img
                alt=""
                draggable="false"
                className="rounded-box size-10 cursor-pointer"
                src={URL.createObjectURL(f)}
                onLoad={(e) => URL.revokeObjectURL(e.currentTarget.src)}
                onClick={() => displayPreview(f)}
              />
            </div>
            <div>
              <div className="link link-hover select-none" onClick={() => displayPreview(f)}>
                {f.name}
              </div>
              <div className="text-xs opacity-60 select-none" onClick={() => displayPreview(f)}>
                {formatNumber(f.size / 1024 / 1024)} MiB
              </div>
            </div>
            <button
              type="button"
              className="btn btn-link btn-xs text-base!"
              onClick={() => {
                setFiles((files) => {
                  const newFiles = [...files];
                  newFiles.splice(idx, 1);
                  return newFiles;
                });
              }}
            >
              {t("delete")}
            </button>
          </li>
        ))}
      </ul>
      {
        // endregion
      }

      {
        // region Preview popup
      }
      <dialog ref={previewDialogRef} className="modal">
        <div className="modal-box h-max max-h-max w-max max-w-max">
          <button
            type="button"
            className="btn btn-sm btn-circle btn-error absolute top-2 right-2"
            onClick={closePreview}
          >
            ✕
          </button>
          <img
            alt="preview of the uploaded image"
            draggable="false"
            ref={previewImageRef}
            className="max-h-[80vh] max-w-[80vw] object-contain"
            onLoad={(e) => URL.revokeObjectURL(e.currentTarget.src)}
          ></img>
        </div>
        <div className="modal-backdrop">
          <button type="button" onClick={closePreview}>
            close
          </button>
        </div>
      </dialog>
      {
        // endregion
      }

      {
        // region Upload box
      }
      <label
        ref={labelRef}
        id={labelId}
        className="btn btn-block btn-dash btn-lg btn-primary hover:btn-active"
        role="button"
        aria-controls="filename"
        tabIndex={0}
        htmlFor={inputId}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") inputRef.current?.click();
        }}
        onDragOver={(e) => {
          e.preventDefault();
          labelRef.current?.classList.add("btn-active");
        }}
        onDragLeave={(e) => {
          e.preventDefault();
          labelRef.current?.classList.remove("btn-active");
        }}
        onDrop={(e) => {
          e.preventDefault();
          labelRef.current?.classList.remove("btn-active");
          processFileList(e.dataTransfer.files);
        }}
      >
        <input
          ref={inputRef}
          id={inputId}
          type="file"
          accept="image/*"
          aria-labelledby={labelId}
          multiple
          hidden
          onChange={(e) => {
            if (e.target.files) processFileList(e.target.files);
          }}
        />
        <span className="text-base">{t("add")}</span>
      </label>
      {
        // endregion
      }
    </fieldset>
  );
};
