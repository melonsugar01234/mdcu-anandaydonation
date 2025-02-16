// Static configs (aka, configs that won't change over time)

/**
 * Max length of the text input in forms
 */
export const FORM_TEXT_MAX_SIZE = 1000 as const;

/**
 * The maximum number of item SKU per registration.
 * This value may not effect the UI, only data validation logic
 */
export const MAX_ORDERS_PER_REGISTRATION = 50 as const;

/**
 * The maximum number of any one item SKU.
 * This value may not effect the UI, only data validation logic
 */
export const MAX_ORDERS_PER_ITEM = 999 as const;

/**
 * How much to compress the image when upload, value is between 0.0 and 1.0
 * - Higher value => Better quality with larger file size
 * - Lower value  => Worse quality with smaller file size
 */
export const IMAGE_COMPRESSION_QUALITY = 0.8 as const;

/**
 * The maximum number of attached transfer receipt
 */
export const TRANSFER_RECEIPT_MAX_COUNT = 5 as const;

/**
 * The maximum size in bytes per attached transfer receipt
 * Note: Size is after compression, but before being stored in database.
 * This value may not effect the UI, only data validation logic
 */
export const TRANSFER_RECEIPT_MAX_SIZE = 5242880 as const;

/**
 * How many times to retry when a duplicate tracking code is generated
 */
export const TRACKING_CODE_GENERATION_RETRY = 3 as const;

/**
 * Length of tracking code
 */
export const TRACKING_CODE_GENERATION_LENGTH = 6 as const;

/**
 * JWT Issuer
 */
export const JWT_ISSUER = "MDCU Ananday Donation" as const;

/**
 * JWT Expire time in unit ms (604800000 = 7 days)
 */
export const JWT_EXPIRE_TIME = 604800000 as const;

/**
 * Page size for each DB query when exporting
 */
export const EXPORT_PAGE_SIZE = 10000 as const;

/**
 * Page size for each DB query for interactive UI
 */
export const UI_PAGE_SIZE = 300 as const;