import type { TargetId } from "@/types";

/** 「こんな人向け」の表示名。新しい TargetId を追加したらここにも追加 */
export const targetLabels: Record<TargetId, string> = {
  family: "家族で暮らす人",
  kids: "子育て家庭",
  single: "一人暮らし",
  couple: "二人暮らし",
  "pet-dog": "犬がいる家庭",
  "pet-cat": "猫がいる家庭",
  "remote-work": "在宅勤務の人",
  "daily-use": "毎日使う人",
  bulk: "まとめ買い派",
  beauty: "美容ケアをする人",
  cooking: "よく料理する人",
  emergency: "備えを見直したい人",
  gadget: "ガジェット好き",
};

export function targetText(targets: string[], max = 2): string | null {
  const labels = targets
    .map((t) => targetLabels[t as TargetId])
    .filter(Boolean)
    .slice(0, max);
  return labels.length ? labels.join("・") : null;
}
