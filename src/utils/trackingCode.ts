// eslint-disable-next-line @typescript-eslint/no-require-imports
const en = require("nanoid-good/locale/en");
// eslint-disable-next-line @typescript-eslint/no-require-imports
const customAlphabet = require("nanoid-good/async").customAlphabet(en);

/**
 * Generate tracking code
 */
export async function generateTrackingCode(length: number): Promise<string> {
  return customAlphabet("0123456789ABCDEFGHJKMNPQRSTVWXYZ", length)();
}

/**
 * Decode similar-looking tracking codes: O to 0, l and I to 1.
 */
export function decodeTrackingCode(trackingCode: string): string {
  return trackingCode
    .toLocaleUpperCase("en")
    .replaceAll("O", "0")
    .replaceAll("I", "1")
    .replaceAll("L", "1")
    .replaceAll(/[^0-9A-Z]/g, "");
}
