import { trackingConfig, type TrackEventName } from "@/config/trackingConfig";
import { hasAnalyticsConsent } from "@/lib/consent";
import { getAttribution, getFirstTouch } from "@/lib/utm";

/**
 * イベント送信はすべてこの track() を通す（コンポーネントに計測コードを直接書かない）
 *
 * 送信先：
 *   - GA4（NEXT_PUBLIC_GA4_ID があれば）
 *   - Meta Pixel（NEXT_PUBLIC_META_PIXEL_ID があれば）
 *   - dataLayer（GTMを後から入れる場合用）
 * どれも未設定ならコンソール出力（debug時）のみで、サイトの動作には影響しない
 */

export type TrackParams = Record<string, string | number | boolean | null | undefined>;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
  }
}

/** 全イベント共通で付ける値（Tracking.tsx が設定） */
let context: TrackParams = {};

export function setTrackingContext(next: TrackParams) {
  context = { ...context, ...next };
}

function clean(params: TrackParams): Record<string, string | number | boolean> {
  const out: Record<string, string | number | boolean> = {};
  for (const [k, v] of Object.entries(params)) {
    if (v !== undefined && v !== null && v !== "") out[k] = v;
  }
  return out;
}

let vendorsReady = false;

/**
 * GA4 / Meta Pixel のキュー（スタブ）を準備。
 * 外部スクリプトの読み込み完了前に送ったイベントも、読み込み後にまとめて送信される
 */
export function initVendors() {
  if (vendorsReady || typeof window === "undefined" || !hasAnalyticsConsent()) return;
  vendorsReady = true;
  const w = window as Window & { _fbq?: unknown };

  if (trackingConfig.ga4Id) {
    w.dataLayer = w.dataLayer || [];
    if (typeof w.gtag !== "function") {
      w.gtag = function gtag() {
        // eslint-disable-next-line prefer-rest-params
        w.dataLayer!.push(arguments);
      };
    }
    w.gtag("js", new Date());
    w.gtag("config", trackingConfig.ga4Id, { send_page_view: false });
  }

  if (trackingConfig.metaPixelId && typeof w.fbq !== "function") {
    type Fbq = ((...args: unknown[]) => void) & { callMethod?: (...a: unknown[]) => void; queue: unknown[]; push: unknown; loaded: boolean; version: string };
    const n = function (...args: unknown[]) {
      if (n.callMethod) n.callMethod(...args);
      else n.queue.push(args);
    } as Fbq;
    n.queue = [];
    n.push = n;
    n.loaded = true;
    n.version = "2.0";
    w.fbq = n;
    if (!w._fbq) w._fbq = n;
    w.fbq("init", trackingConfig.metaPixelId);
  }
}

export function track(name: TrackEventName, params: TrackParams = {}) {
  if (typeof window === "undefined") return;
  if (!hasAnalyticsConsent()) return;
  initVendors();

  const attr = getAttribution();
  const first = getFirstTouch();
  const payload = clean({
    ...context,
    utm_source: attr.utm_source,
    utm_medium: attr.utm_medium,
    utm_campaign: attr.utm_campaign,
    utm_content: attr.utm_content,
    creative_id: attr.creative_id,
    referrer_host: attr.referrer_host,
    first_utm_source: first.utm_source,
    first_creative_id: first.creative_id,
    page_path: window.location.pathname,
    ...params,
  });

  try {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ event: name, ...payload });
  } catch {
    /* noop */
  }

  try {
    if (trackingConfig.ga4Id && typeof window.gtag === "function") {
      // beacon送信：同じタブでAmazonへ遷移してもイベントが欠けにくい
      window.gtag("event", name, { ...payload, transport_type: "beacon" });
    }
  } catch {
    /* noop */
  }

  try {
    const meta = trackingConfig.metaEventMap[name];
    if (meta && trackingConfig.metaPixelId && typeof window.fbq === "function") {
      if (meta.standard) window.fbq("track", meta.standard, payload);
      else if (meta.custom) window.fbq("trackCustom", meta.custom, payload);
    }
  } catch {
    /* noop */
  }

  if (trackingConfig.debug) {
    // eslint-disable-next-line no-console
    console.info(`[track] ${name} ${JSON.stringify(payload)}`);
  }
}
