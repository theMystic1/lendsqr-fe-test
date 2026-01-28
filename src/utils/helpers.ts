import type { FormatNumberOptions } from "../types/type";

export const capitalizeFirst = (input: string): string => {
  const s = input.trim();
  if (!s) return "";
  return s[0].toUpperCase() + s.slice(1);
};

export function formatNumber(
  value: number | string | null | undefined,
  opts: FormatNumberOptions = {},
): string {
  const n =
    typeof value === "number"
      ? value
      : typeof value === "string"
        ? Number(value.replace(/,/g, ""))
        : NaN;

  if (!Number.isFinite(n)) return "";

  const { locale = "en-NG", decimals, currency, compact = false } = opts;

  const nf = new Intl.NumberFormat(locale, {
    ...(currency ? { style: "currency", currency } : {}),
    ...(typeof decimals === "number"
      ? { minimumFractionDigits: decimals, maximumFractionDigits: decimals }
      : {}),
    ...(compact ? { notation: "compact", compactDisplay: "short" } : {}),
  });

  return nf.format(n);
}

export const formatDate = (date: string | Date | number): string => {
  const dateObj =
    typeof date === "string" || typeof date === "number"
      ? new Date(date)
      : date;

  const formatter = new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });

  return formatter.format(dateObj);
};

export const setLocalStorage = (key: string, value: string) => {
  localStorage.setItem(key, value);
};

export const getToken = () => {
  return localStorage.getItem("ADMIN_TOKEN");
};
