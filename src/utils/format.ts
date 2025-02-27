export const formatNumber = (
  num: number,
  options?: { useGrouping?: boolean; isTHB?: boolean; maxDecimals?: number | null },
): string => {
  return num.toLocaleString("en-US", {
    style: options?.isTHB ? "currency" : "decimal",
    currency: options?.isTHB ? "THB" : undefined,
    currencyDisplay: "narrowSymbol",
    useGrouping: options?.useGrouping ?? false,
    minimumFractionDigits: 0,
    maximumFractionDigits: options?.maxDecimals === null ? undefined : (options?.maxDecimals ?? 2),
    roundingMode: "trunc",
  });
};
