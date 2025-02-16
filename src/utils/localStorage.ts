import type { FormStepsData } from "@/app/[locale]/register/types";

/**
 * @param key The localStorage key
 * @param version Version the stored type, so that they can be upgraded later
 * @param defaultValue Default value when the stored value cannot be retrieved
 */
const makeLocalStorage = <T, TStored = T extends undefined ? never : T>(
  key: string,
  version: number,
  defaultValue: TStored,
) =>
  [
    (): TStored => {
      if (typeof window === "undefined") return defaultValue;

      const storedValue = window.localStorage.getItem(key);
      if (!storedValue) return defaultValue;

      const versionMarker = storedValue.split(";", 1)[0];
      if (!versionMarker || versionMarker !== version.toString()) return defaultValue;

      return JSON.parse(storedValue.slice(versionMarker.length + 1)) as TStored;
    },
    (value: TStored): void => {
      window.localStorage.setItem(key, `${version};${JSON.stringify(value)}`);
    },
  ] as const;

const [getStoredTrackingCodes, setStoredTrackingCodes] = makeLocalStorage<string[]>("tc", 1, []);

const [getStoredRegistrationForm, setStoredRegistrationForm] =
  makeLocalStorage<FormStepsData | null>("rf", 1, null);

export {
  getStoredTrackingCodes,
  setStoredTrackingCodes,
  getStoredRegistrationForm,
  setStoredRegistrationForm,
};
