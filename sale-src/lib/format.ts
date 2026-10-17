/** "2026-10-17T12:30:00+09:00" → "10月17日 12:30"（日本時間） */
export function formatJstDateTime(iso: string | null | undefined): string | null {
  if (!iso) return null;
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return null;
  const parts = new Intl.DateTimeFormat("ja-JP", {
    timeZone: "Asia/Tokyo",
    month: "numeric",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).formatToParts(d);
  const get = (t: string) => parts.find((p) => p.type === t)?.value ?? "";
  return `${get("month")}月${get("day")}日 ${get("hour")}:${get("minute")}`;
}

export function formatYen(n: number | null | undefined): string | null {
  if (n == null || !Number.isFinite(n)) return null;
  return `￥${Math.round(n).toLocaleString("ja-JP")}`;
}
