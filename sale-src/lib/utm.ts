import { trackingConfig } from "@/config/trackingConfig";

/**
 * 流入元パラメータの取得・保存（分析専用）
 *
 * ⚠ ここで取得した値を、表示内容やAmazonリンクの切り替えに使わないこと。
 *   全ユーザーに同じサイト体験を出すのが原則です。
 */
export type Attribution = Partial<Record<(typeof trackingConfig.attributionParams)[number], string>> & {
  landing_page?: string;
  referrer_host?: string;
};

const SESSION_KEY = "scv_attr";
const FIRST_KEY = "scv_attr_first";

function safeGet(storage: () => Storage, key: string): Attribution | null {
  try {
    const raw = storage().getItem(key);
    return raw ? (JSON.parse(raw) as Attribution) : null;
  } catch {
    return null;
  }
}

function safeSet(storage: () => Storage, key: string, value: Attribution) {
  try {
    storage().setItem(key, JSON.stringify(value));
  } catch {
    /* プライベートブラウズ等で保存できなくても動作は継続 */
  }
}

let memory: Attribution | null = null;

/** ページ表示時に呼ぶ。URLにパラメータがあれば保存（セッション内で保持） */
export function captureAttribution(): Attribution {
  if (typeof window === "undefined") return {};
  const params = new URLSearchParams(window.location.search);
  const found: Attribution = {};
  let hasAny = false;
  for (const key of trackingConfig.attributionParams) {
    const v = params.get(key);
    if (v) {
      found[key] = v.slice(0, 100);
      hasAny = true;
    }
  }

  const existing = safeGet(() => window.sessionStorage, SESSION_KEY) ?? memory;
  if (hasAny || !existing) {
    let referrerHost = "";
    try {
      referrerHost = document.referrer ? new URL(document.referrer).hostname : "";
    } catch {
      referrerHost = "";
    }
    const next: Attribution = { ...found, landing_page: window.location.pathname, referrer_host: referrerHost };
    memory = next;
    safeSet(() => window.sessionStorage, SESSION_KEY, next);
    if (!safeGet(() => window.localStorage, FIRST_KEY)) safeSet(() => window.localStorage, FIRST_KEY, next);
    return next;
  }
  memory = existing;
  return existing;
}

export function getAttribution(): Attribution {
  if (typeof window === "undefined") return {};
  return memory ?? safeGet(() => window.sessionStorage, SESSION_KEY) ?? {};
}

/** 初回流入時の情報（再訪分析用） */
export function getFirstTouch(): Attribution {
  if (typeof window === "undefined") return {};
  return safeGet(() => window.localStorage, FIRST_KEY) ?? {};
}
