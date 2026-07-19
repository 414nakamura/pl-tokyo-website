#!/usr/bin/env python3
# -*- coding: utf-8 -*-
from __future__ import annotations

from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
LINE_URL = "https://lin.ee/8MZB401J"

INDUSTRIES = [
    {
        "slug": "restaurant",
        "label": "飲食店",
        "title": "飲食店のキャッシュレス決済導入｜手数料2.45%〜・全東信切替相談",
        "description": "飲食店向けに、クレジットカード・電子マネー・PayPay等のキャッシュレス決済導入を手数料2.45%〜で相談可能。全東信からの切替、端末選び、申込手続きを支援します。",
        "h1": "飲食店の決済コストを、売上を落とさず見直す。",
        "h1_lines": ["飲食店の決済コストを、", "売上を落とさず見直す。"],
        "lead": "居酒屋・カフェ・レストランなど、客単価やピークタイムの会計導線に合わせて、手数料・端末・申込条件を整理します。",
        "image": "/images/izakaya.jpg",
        "pains": ["ピークタイムの会計待ちを減らしたい", "カード・電子マネー・QRをまとめて案内したい", "全東信の停止に伴い代替手段を探している"],
        "checks": ["営業形態、客単価、月間決済額", "既存の決済端末・レジとの使い方", "ランチ・ディナーなど会計が集中する時間帯"],
        "terminal": "非接触型または据え置き型",
    },
    {
        "slug": "beauty-salon",
        "label": "美容室・サロン",
        "title": "美容室・サロンのキャッシュレス決済導入｜手数料2.45%〜",
        "description": "美容室・エステ・ネイルサロン向けのキャッシュレス決済導入相談。高単価メニュー、物販、回数券等の運用を確認しながら、手数料2.45%〜の導入を支援します。",
        "h1": "美容室・サロンの高単価会計を、スムーズに。",
        "h1_lines": ["美容室・サロンの", "高単価会計を、", "スムーズに。"],
        "lead": "施術単価や物販、予約導線に合わせて、店舗の印象を損なわない端末・決済ブランド・申込条件を整理します。",
        "image": "/images/biyoin.JPG",
        "pains": ["現金以外の支払いニーズに対応したい", "物販や高単価メニューの取りこぼしを減らしたい", "カウンター周りをすっきり見せたい"],
        "checks": ["施術メニューと物販の有無", "回数券・前払い商品の取扱い", "受付・会計スペースの広さ"],
        "terminal": "モバイル型または非接触型",
    },
    {
        "slug": "clinic",
        "label": "クリニック・医療機関",
        "title": "クリニック・医療機関のキャッシュレス決済導入｜医療機関1.50%〜",
        "description": "クリニック・医療機関向けに、医療機関手数料1.50%〜のキャッシュレス決済導入を相談可能。受付会計、保険診療・自費診療の運用確認を支援します。",
        "h1": "クリニックの受付会計を、患者様にもスタッフにもやさしく。",
        "h1_lines": ["クリニックの", "受付会計を、", "患者様にもスタッフにも", "やさしく。"],
        "lead": "医療機関コードの有無、保険診療・自費診療の扱い、受付オペレーションを確認しながら、導入可否と料率を整理します。",
        "image": "/images/contact_support.jpg",
        "pains": ["受付での現金管理を減らしたい", "自費診療や物販の支払いを便利にしたい", "医療機関向け料率の対象か確認したい"],
        "checks": ["医療機関コードの有無", "保険診療・自費診療・物販の比率", "受付スタッフの会計オペレーション"],
        "terminal": "据え置き型または非接触型",
        "rate_note": "医療機関は1.50%〜のご案内対象となる場合があります。",
    },
    {
        "slug": "retail",
        "label": "小売店",
        "title": "小売店のキャッシュレス決済導入｜クレジット・電子マネー・PayPay対応",
        "description": "小売店・物販店向けのキャッシュレス決済導入相談。クレジットカード、電子マネー、PayPay等の対応ブランドと手数料を整理し、申込手続きを支援します。",
        "h1": "小売店の支払い方法を、選ばれる理由に変える。",
        "h1_lines": ["小売店の支払い方法を、", "選ばれる理由に変える。"],
        "lead": "物販・専門店・テイクアウト販売など、客層と購入単価に合わせて必要な決済ブランドを整理します。",
        "image": "/images/buppan.jpg",
        "pains": ["カード・電子マネー・QRをまとめて使えるようにしたい", "少額決済でも使いやすい端末を選びたい", "月額固定費を抑えて導入したい"],
        "checks": ["平均購入単価と決済件数", "取扱商品・前払い商品の有無", "レジ周りの設置スペース"],
        "terminal": "据え置き型またはモバイル型",
    },
    {
        "slug": "seitai",
        "label": "整体・整骨院",
        "title": "整体・整骨院のキャッシュレス決済導入｜回数券・自費メニューも相談",
        "description": "整体院・整骨院・接骨院向けのキャッシュレス決済導入相談。自費メニュー、物販、回数券などの運用を確認しながら、申込可否と手数料を整理します。",
        "h1": "整体・整骨院の自費メニューを、支払いの面から支える。",
        "h1_lines": ["整体・整骨院の", "自費メニューを、", "支払いの面から支える。"],
        "lead": "自費施術・物販・回数券など、現場の説明が必要な商材を確認しながら、無理のない決済導入を支援します。",
        "image": "/images/counter.JPG",
        "pains": ["自費メニューの支払い選択肢を増やしたい", "回数券や物販の扱いを事前に確認したい", "患者様・利用者様の会計負担を減らしたい"],
        "checks": ["保険施術と自費施術の比率", "回数券・前払い商品の有無", "受付での端末設置・運用方法"],
        "terminal": "モバイル型または据え置き型",
    },
]


def css() -> str:
    return """@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Noto+Sans+JP:wght@400;500;700;900&display=swap');
:root{--ink:#111;--body:#333;--muted:#6d6d6d;--blue:#4a90d9;--blue2:#2369b0;--line:#dedbd5;--paper:#f7f5ef;--pale:#edf7f3;--linegreen:#06C755}
*{box-sizing:border-box}html{scroll-behavior:smooth}body{margin:0;background:#fafafa;color:var(--ink);font-family:'Noto Sans JP',sans-serif;line-height:1.85;letter-spacing:.02em}a{color:inherit}.container{width:min(1120px,calc(100% - 48px));margin:auto}.site-header{position:sticky;top:0;z-index:50;background:rgba(250,250,250,.94);border-bottom:1px solid var(--line);backdrop-filter:blur(14px)}.header-inner{height:78px;display:flex;align-items:center;gap:28px}.brand{font-family:'Bebas Neue';font-size:22px;letter-spacing:.15em;text-decoration:none;white-space:nowrap}.nav{margin-left:auto;display:flex;align-items:center;gap:20px}.nav a{font-size:12px;font-weight:600;letter-spacing:.06em;text-decoration:none;text-transform:none;color:var(--muted);white-space:nowrap}.nav-priority{padding:10px 14px;border:1px solid rgba(74,144,217,.38);background:rgba(74,144,217,.08);color:var(--blue2)!important;font-weight:700!important}.nav-secondary{color:#888!important;font-weight:500!important}.nav a:hover{color:var(--blue2)}.nav-item{position:relative}.nav-item::after{content:'';position:absolute;left:-10px;right:-10px;top:100%;height:18px}.nav-trigger{display:inline-flex;align-items:center;gap:6px;line-height:1;vertical-align:middle}.nav-trigger::after{content:'⌄';font-size:12px;color:var(--blue2)}.nav-dropdown{position:absolute;top:calc(100% + 12px);left:50%;min-width:260px;padding:10px;background:rgba(255,255,255,.98);border:1px solid var(--line);box-shadow:0 18px 40px rgba(17,17,17,.12);opacity:0;visibility:hidden;pointer-events:none;transform:translateX(-50%) translateY(8px);transition:.2s;z-index:80}.nav-item:hover .nav-dropdown,.nav-item:focus-within .nav-dropdown{opacity:1;visibility:visible;pointer-events:auto;transform:translateX(-50%) translateY(0)}.nav-dropdown a{display:block;padding:10px 12px;border-radius:6px;color:var(--ink);font-weight:500;letter-spacing:.08em;text-transform:none}.nav-dropdown a:hover{background:rgba(74,144,217,.06);color:var(--blue2)}.nav-line{background:#111;color:#fff!important;padding:11px 16px}.nav-cta{border:1px solid var(--blue);color:var(--blue2)!important;padding:9px 13px}.hero{padding:74px 0 54px;background:linear-gradient(100deg,rgba(250,250,250,.98),rgba(250,250,250,.72)),var(--hero) center/cover}.breadcrumbs{font-size:12px;color:var(--muted);margin-bottom:34px}.breadcrumbs a{color:var(--blue2);text-decoration:none}.eyebrow{color:var(--blue2);font-size:12px;font-weight:900;letter-spacing:.18em;text-transform:uppercase}.hero-grid{display:grid;grid-template-columns:minmax(0,.92fr) minmax(330px,.72fr);gap:clamp(32px,5vw,72px);align-items:center}.hero-grid>div:first-child{min-width:0;max-width:760px}.hero h1{margin:14px 0 0;font-size:clamp(34px,4.35vw,54px);line-height:1.18;letter-spacing:-.05em;text-wrap:balance;word-break:keep-all;line-break:strict}.hero h1 .h1-line,.section-title .title-line{display:block;width:max-content;max-width:100%}.hero p{max-width:680px;color:var(--body)}.hero-card{position:relative;z-index:1;min-width:0;background:rgba(255,255,255,.88);border:1px solid var(--line);border-radius:16px;padding:28px;box-shadow:0 20px 60px rgba(17,17,17,.08)}.rate{display:flex;align-items:baseline;gap:10px;color:var(--blue2)}.rate strong{font-size:clamp(54px,8vw,92px);line-height:1;letter-spacing:-.06em}.rate span{font-size:28px;font-weight:900}.actions{display:flex;flex-wrap:wrap;gap:12px;margin-top:30px}.btn{display:inline-flex;align-items:center;justify-content:center;min-height:54px;padding:13px 20px;border:1px solid var(--line);font-size:13px;font-weight:900;text-decoration:none}.btn-line{background:var(--linegreen);border-color:var(--linegreen);color:#fff}.btn-primary{background:var(--blue);border-color:var(--blue);color:#fff}.section{padding:76px 0}.section.alt{background:var(--paper)}.section-title{font-size:clamp(28px,4vw,44px);line-height:1.35;letter-spacing:-.03em;text-wrap:balance;word-break:keep-all;line-break:strict}.lead{color:var(--body);max-width:720px}.grid{display:grid;grid-template-columns:repeat(3,1fr);gap:18px;margin-top:34px}.card{background:#fff;border:1px solid var(--line);border-radius:16px;padding:28px;box-shadow:0 14px 34px rgba(17,17,17,.055)}.card h3{font-size:18px;margin:0 0 10px;text-wrap:balance;word-break:keep-all;line-break:strict}.card p,.card li{color:var(--body);font-size:14px}.card ul{margin:0;padding-left:1.2em}.media{display:grid;grid-template-columns:.95fr 1.05fr;gap:42px;align-items:center}.media img{width:100%;aspect-ratio:4/3;object-fit:cover;border:1px solid var(--line);border-radius:16px;background:#fff;box-shadow:0 14px 34px rgba(17,17,17,.055)}.device-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:18px;margin-top:34px}.device{background:#fff;border:1px solid var(--line);border-radius:18px;padding:24px;text-align:center;box-shadow:0 14px 34px rgba(17,17,17,.055)}.device img{height:160px;width:100%;object-fit:contain}.device h3,.brand-card h3{text-wrap:balance;word-break:keep-all;line-break:strict}.brand-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:16px}.brand-card{background:#fff;border:1px solid var(--line);border-radius:16px;padding:22px;text-align:center;box-shadow:0 12px 28px rgba(17,17,17,.05)}.brand-card img{height:54px;max-width:100%;object-fit:contain}.brand-card:nth-child(2) img{height:72px}.cta{background:#111;color:#fff;text-align:center}.cta p{color:#d5d5d5}.cta .section-title .title-line{margin-inline:auto}.footer{background:#050505;color:#aaa;padding:54px 0 42px}.footer-inner{display:block}.footer-top{display:grid;grid-template-columns:minmax(240px,1fr) minmax(220px,320px);gap:30px;align-items:center;padding-bottom:30px;border-bottom:1px solid rgba(255,255,255,.08)}.footer-brand{font-family:'Bebas Neue';color:#fff;letter-spacing:.15em;font-size:22px}.footer-copy{margin-top:12px;color:#8f8f8f;font-size:12px;line-height:1.9}.footer-note{display:inline-flex;justify-self:end;max-width:320px;opacity:.92;transition:opacity .25s,transform .25s}.footer-note:hover{opacity:1;transform:translateY(-1px)}.footer-note img{display:block;width:100%;height:auto;border-radius:8px}.footer-sitemap{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:1px;margin-top:30px;background:rgba(255,255,255,.08);border:1px solid rgba(255,255,255,.08)}.footer-group{min-height:205px;padding:24px 22px;background:#050505}.footer-group h3{position:relative;margin:0 0 16px;padding-left:22px;color:#fff;font-size:14px;font-weight:700;letter-spacing:.08em}.footer-group h3:before{content:'›';position:absolute;left:0;top:2px;display:grid;place-items:center;width:16px;height:16px;border-radius:50%;background:var(--blue,#4a90d9);color:#fff;font-size:13px;line-height:1}.footer-links{display:grid;gap:10px;margin-top:0}.footer-links a{position:relative;padding-left:18px;color:#bbb;font-size:12px;line-height:1.55;text-decoration:none;text-underline-offset:3px}.footer-links a:before{content:'›';position:absolute;left:0;color:#8ec2f5;font-weight:700}.footer-links a:hover{color:#8ec2f5}.footer-meta{margin-top:26px;color:#777;font-size:10px;line-height:1.8;text-align:right}.mobile-menu{display:none}
@media(max-width:900px){.footer-top{grid-template-columns:1fr}.footer-note{justify-self:start;max-width:260px}.footer-sitemap{grid-template-columns:1fr}.footer-group{min-height:auto;padding:22px 20px}.footer-meta{text-align:left}.container{width:calc(100% - 40px)}.nav{display:none}.hero{padding:46px 0}.hero-grid,.media{grid-template-columns:1fr;gap:30px}.hero h1{font-size:clamp(28px,7vw,40px);line-height:1.24;letter-spacing:-.04em}.hero h1 .h1-line,.section-title .title-line{width:auto}.section-title{font-size:clamp(25px,6.4vw,34px);line-height:1.38;letter-spacing:-.025em}.hero-card{padding:22px}.grid,.device-grid,.brand-grid{grid-template-columns:1fr}.section{padding:58px 0}.footer-top{grid-template-columns:1fr}.footer-note{justify-self:start;max-width:260px}.footer-sitemap{grid-template-columns:1fr}.footer-group{min-height:auto;padding:22px 20px}.footer-meta{text-align:left}.mobile-menu{display:block;margin-top:18px}.mobile-menu details{border:1px solid var(--line);background:#fff;padding:14px}.mobile-menu summary{font-weight:900;color:var(--blue2);cursor:pointer}.mobile-menu a{display:block;padding:9px 0;text-decoration:none}.device img{height:130px}}"""


def header() -> str:
    links = '<a href="/cashless/">低コストキャッシュレス決済</a><a href="/cashless/fees/">料金・手数料</a><a href="/cashless/terminals/">決済端末</a><a href="/cashless/zentoshin-switch/">全東信 切替相談</a><a href="/cashless/industry/">業種別ガイド</a>' + "".join(
        f'<a href="/cashless/industry/{item["slug"]}/">{item["label"]}</a>' for item in INDUSTRIES
    )
    mobile_links = "".join(
        f'<a href="/cashless/industry/{item["slug"]}/">{item["label"]}</a>' for item in INDUSTRIES
    )
    return f"""<header class="site-header"><div class="container header-inner">
  <a class="brand" href="/">PUNCHLINE TOKYO</a>
  <nav class="nav" aria-label="グローバルナビゲーション">
    <div class="nav-item nav-cashless-group"><a class="nav-priority nav-trigger" href="/cashless/">キャッシュレス決済</a><div class="nav-dropdown">{links}</div></div>
    <a class="nav-secondary" href="/web-production/">WEB制作</a>
    <a class="nav-secondary" href="/#about">事業案内</a>
    <a class="nav-secondary" href="/about/">会社概要</a>
    <a class="nav-secondary" href="/column/">コラム</a>
    <a class="nav-line" href="{LINE_URL}" target="_blank" rel="noopener">LINE相談</a>
  </nav>
</div></header>
<div class="container mobile-menu"><details><summary>キャッシュレスメニュー</summary><a href="/cashless/">キャッシュレス決済</a><a href="/cashless/fees/">料金・手数料</a><a href="/cashless/terminals/">決済端末</a><a href="/cashless/zentoshin-switch/">全東信切替</a><a href="/cashless/industry/">業種別トップ</a>{mobile_links}<a href="/web-production/">WEB制作</a><a href="/#about">事業案内</a><a href="/about/">会社概要</a><a href="/column/">コラム</a></details></div>"""


def footer() -> str:
    return """<footer class="footer"><div class="container footer-inner">
  <div class="footer-top">
    <div><div class="footer-brand">PUNCHLINE TOKYO</div><p class="footer-copy">低コストキャッシュレス決済の導入・切替を、業種や店舗状況に合わせてご案内します。</p></div>
    <a class="footer-note" href="https://note.com/punchline_tokyo" target="_blank" rel="noopener" aria-label="PUNCHLINE TOKYOのnoteへ"><img src="/images/note-banner.png" alt="PUNCHLINE TOKYO note"></a>
  </div>
  <div class="footer-sitemap" aria-label="フッターサイトマップ">
    <section class="footer-group"><h3>会社情報</h3><div class="footer-links"><a href="/">会社TOP</a><a href="/#about">事業案内</a><a href="/about/">会社概要</a><a href="/web-production/">WEB制作</a><a href="/contact/">お問い合わせ</a></div></section>
    <section class="footer-group"><h3>キャッシュレス</h3><div class="footer-links"><a href="/cashless/">低コストキャッシュレス決済</a><a href="/cashless/fees/">料金・手数料</a><a href="/cashless/terminals/">決済端末</a><a href="/cashless/zentoshin-switch/">全東信 切替相談</a></div></section>
    <section class="footer-group"><h3>業種別ガイド</h3><div class="footer-links"><a href="/cashless/industry/">業種別トップ</a><a href="/cashless/industry/restaurant/">飲食店</a><a href="/cashless/industry/beauty-salon/">美容室・サロン</a><a href="/cashless/industry/clinic/">クリニック・医療機関</a><a href="/cashless/industry/retail/">小売店</a><a href="/cashless/industry/seitai/">整体・整骨院</a></div></section>
    <section class="footer-group"><h3>情報発信・相談</h3><div class="footer-links"><a href="/column/">コラム</a><a href="https://note.com/punchline_tokyo" target="_blank" rel="noopener">note</a><a href="https://lin.ee/8MZB401J" target="_blank" rel="noopener">LINEで無料相談</a><a href="/contact/">フォーム相談</a></div></section>
  </div>
  <div class="footer-meta">株式会社PUNCHLINE TOKYO<br>代表事務所：〒107-0061 東京都港区北青山3-3-1 アールキューブ青山3階<br>EPARKフィナンシャルパートナーズ正規代理店<br>© 2026 PUNCHLINE TOKYO</div>
</div></footer>"""


def floating_line_cta() -> str:
    return f"""<style>
.floating-line-qr{{position:fixed;right:0;top:50%;z-index:400;width:132px;border-radius:14px 0 0 14px;background:#06C755;overflow:hidden;box-shadow:-10px 0 30px rgba(6,199,85,.28),-2px 0 8px rgba(0,0,0,.14);transform:translateX(calc(100% + 2px)) translateY(-50%);transition:transform .38s cubic-bezier(.4,0,.2,1)}}
.floating-line-qr.is-visible{{transform:translateX(0) translateY(-50%)}}
.floating-line-qr a{{display:flex;flex-direction:column;align-items:center;justify-content:center;gap:8px;padding:16px 12px 14px;color:#fff;text-decoration:none;font-size:14px;font-weight:900;line-height:1.45;text-align:center;word-break:keep-all}}
.floating-line-qr img{{display:block;width:96px;height:96px;padding:5px;border-radius:8px;background:#fff;object-fit:contain;box-shadow:0 4px 12px rgba(0,0,0,.16)}}
.mobile-line-cta{{position:fixed;left:0;right:0;bottom:0;z-index:400;display:none;background:#06C755;color:#fff;text-decoration:none;min-height:56px;align-items:center;justify-content:center;font-size:14px;font-weight:900;box-shadow:0 -3px 20px rgba(17,17,17,.18);padding-bottom:env(safe-area-inset-bottom)}}
@media(min-width:901px){{.floating-line-qr{{display:block}}}}
@media(max-width:900px){{.floating-line-qr{{display:none}}.mobile-line-cta{{display:flex}}body{{padding-bottom:56px}}}}
/* Editorial heading wrap */
h1,h2,.section-title,.card h3{{
  text-wrap:balance;
  word-break:keep-all;
  line-break:strict;
  overflow-wrap:break-word;
}}
.heading-lines .title-line,
.section-title .title-line,
.hero h1 .h1-line{{
  display:block;
  max-width:100%;
}}
.heading-lines .title-line{{
  width:max-content;
}}
@media(max-width:640px){{
  .heading-lines .title-line{{
    width:auto;
  }}
}}
/* Mobile fixed CTA safe-area unification */
@media(max-width:980px){{
  .sticky-cta,
  .sticky-cta-bar,
  .mobile-line-cta{{
    bottom:0!important;
    padding-bottom:env(safe-area-inset-bottom,0px)!important;
    background:linear-gradient(90deg,#06C755 0 50%,#111 50% 100%)!important;
  }}
  .mobile-line-cta{{background:#06C755!important}}
  .sticky-cta a,
  .sticky-cta-bar a{{
    min-height:56px!important;
    border-radius:0!important;
  }}
  body{{
    padding-bottom:calc(56px + env(safe-area-inset-bottom,0px))!important;
  }}
}}

</style>
<div class="floating-line-qr" id="floating-line-qr" aria-hidden="true"><a href="{LINE_URL}" target="_blank" rel="noopener" aria-label="LINEで無料相談"><span>LINEで<br>無料相談</span><img src="/images/LINE_QRcode.png" alt="LINEで無料相談するQRコード" loading="lazy"></a></div>
<a class="mobile-line-cta" href="{LINE_URL}" target="_blank" rel="noopener">LINEで無料相談</a>
<script>(function(){{var el=document.getElementById('floating-line-qr');if(!el)return;var shown=false;function tick(){{var s=window.scrollY>380;if(s===shown)return;shown=s;el.classList.toggle('is-visible',s);el.setAttribute('aria-hidden',String(!s));}}window.addEventListener('scroll',tick,{{passive:true}});tick();}})();</script>"""


def page(title: str, description: str, canonical: str, body: str, hero_image: str = "/images/hero_payment.jpg") -> str:
    return f"""<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>{title}</title>
  <meta name="description" content="{description}">
  <link rel="canonical" href="https://pl-tokyo.com{canonical}">
  <meta property="og:title" content="{title}">
  <meta property="og:description" content="{description}">
  <meta property="og:type" content="website">
  <meta property="og:url" content="https://pl-tokyo.com{canonical}">
  <meta property="og:image" content="https://pl-tokyo.com{hero_image}">
  <link rel="icon" href="/images/favicon.png">
  <style>{css()}</style>
  <script type="application/ld+json">{{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{{"@type":"ListItem","position":1,"name":"ホーム","item":"https://pl-tokyo.com/"}},{{"@type":"ListItem","position":2,"name":"キャッシュレス決済","item":"https://pl-tokyo.com/cashless/"}},{{"@type":"ListItem","position":3,"name":"{title.split('｜')[0]}","item":"https://pl-tokyo.com{canonical}"}}]}}</script>
</head>
<body style="--hero:url('{hero_image}')">
{header()}
{body}
{footer()}
{floating_line_cta()}
</body>
</html>
"""


def hero_h1(lines: list[str]) -> str:
    return "<h1>" + "".join(f'<span class="h1-line">{line}</span>' for line in lines) + "</h1>"


def section_h2(lines: list[str]) -> str:
    return '<h2 class="section-title">' + "".join(f'<span class="title-line">{line}</span>' for line in lines) + "</h2>"


def industry_page(item: dict) -> str:
    rate_note = item.get("rate_note", "キャッシュレス決済手数料は一定条件を満たした場合2.45%〜。")
    pains = "".join(f"<li>{p}</li>" for p in item["pains"])
    checks = "".join(f"<li>{c}</li>" for c in item["checks"])
    h1 = hero_h1(item["h1_lines"])
    issues_h2 = section_h2([f"{item['label']}でよくある", "決済課題"])
    check_h2 = section_h2(["導入前に", "確認したいこと"])
    brand_h2 = section_h2(["主要ブランドに", "まとめて対応"])
    cta_h2 = section_h2(["まずは対象となるか、", "無料で確認しませんか。"])
    return f"""<main>
  <section class="hero"><div class="container">
    <div class="breadcrumbs"><a href="/">ホーム</a> / <a href="/cashless/">キャッシュレス</a> / <a href="/cashless/industry/">業種別</a> / {item['label']}</div>
    <div class="hero-grid">
      <div><div class="eyebrow">Cashless for {item['label']}</div>{h1}<p>{item['lead']}</p><div class="actions"><a class="btn btn-line" href="{LINE_URL}" target="_blank" rel="noopener">LINEで確認・相談・申込 →</a><a class="btn btn-primary" href="/contact/">フォームで無料相談 →</a></div></div>
      <div class="hero-card"><div class="rate"><strong>{'1.50' if item['slug']=='clinic' else '2.45'}</strong><span>%〜</span></div><p>{rate_note}</p><p>初期費用・月額固定費は0円。申込可否や実際の条件は、業種・取扱商品・審査結果により異なります。</p></div>
    </div>
  </div></section>
  <section class="section"><div class="container media"><img src="{item['image']}" alt="{item['label']}のキャッシュレス決済導入イメージ" loading="lazy"><div><div class="eyebrow">Issues</div>{issues_h2}<div class="card"><ul>{pains}</ul></div></div></div></section>
  <section class="section alt"><div class="container"><div class="eyebrow">Check Point</div>{check_h2}<div class="grid"><div class="card"><h3>申込条件</h3><ul>{checks}</ul></div><div class="card"><h3>おすすめ端末</h3><p>{item['terminal']}を中心に、店舗の会計導線に合う形を確認します。</p></div><div class="card"><h3>相談方法</h3><p>LINEで業種・決済状況を送っていただければ、対象となり得るかを深夜でも確認できます。</p></div></div></div></section>
  <section class="section"><div class="container"><div class="eyebrow">Payment Brands</div>{brand_h2}<div class="brand-grid"><div class="brand-card"><h3>クレジット・デビット</h3><img src="/images/credit_david_prepaid.jpg" alt="対応クレジットカードブランド" loading="lazy"></div><div class="brand-card"><h3>電子マネー</h3><img src="/images/traffic_electric_money.jpg" alt="対応電子マネーブランド" loading="lazy"></div><div class="brand-card"><h3>QRコード決済</h3><img src="/images/paypay_logo.jpg" alt="PayPay" loading="lazy"></div></div></div></section>
  <section class="section cta"><div class="container"><div class="eyebrow">Free Consultation</div>{cta_h2}<p>相談しただけで申込が確定することはありません。現在の業種・決済状況を確認し、ご案内可能な内容をお伝えします。</p><div class="actions" style="justify-content:center"><a class="btn btn-line" href="{LINE_URL}" target="_blank" rel="noopener">LINEで無料相談 →</a><a class="btn" href="/contact/" style="color:#fff">フォームで相談 →</a></div></div></section>
</main>"""


def industry_index() -> str:
    cards = "".join(
        f"""<a class="card" href="/cashless/industry/{item['slug']}/" style="text-decoration:none"><h3>{item['label']}</h3><p>{item['lead']}</p></a>"""
        for item in INDUSTRIES
    )
    h1 = hero_h1(["業種別に選ぶ、", "キャッシュレス決済導入ガイド。"])
    body = f"""<main><section class="hero"><div class="container"><div class="breadcrumbs"><a href="/">ホーム</a> / <a href="/cashless/">キャッシュレス</a> / 業種別</div><div class="eyebrow">Industry Guide</div>{h1}<p>同じ決済端末でも、飲食店・美容室・クリニック・小売店・整体院では確認すべきポイントが変わります。自社に近い業種からご確認ください。</p><div class="actions"><a class="btn btn-line" href="{LINE_URL}" target="_blank" rel="noopener">LINEで業種を確認 →</a><a class="btn btn-primary" href="/cashless/fees/">料金を見る →</a></div></div></section><section class="section"><div class="container">{section_h2(["業種業態別の", "解説"])}<div class="grid">{cards}</div></div></section></main>"""
    return page("業種別キャッシュレス決済導入ガイド｜PUNCHLINE TOKYO", "飲食店、美容室、クリニック、小売店、整体・整骨院など、業種別にキャッシュレス決済導入の確認点とおすすめ端末を解説します。", "/cashless/industry/", body)


def fees_page() -> str:
    fees_h1 = hero_h1(["キャッシュレス決済の料金を、", "利益目線で比較する。"])
    answer_h2 = section_h2(["料金ページで", "まず確認すべき結論"])
    why_h2 = section_h2(["決済手数料は、", "売上が増えるほど効いてくる費用です。"])
    comparison_h2 = section_h2(["キャッシュレス決済の料金比較で", "見るべき7項目"])
    industry_h2 = section_h2(["業種別に、", "見るべき料金ポイントは変わります。"])
    check_h2 = section_h2(["料金を正確に知るには、", "業種と決済状況の確認が必要です。"])
    related_h2 = section_h2(["料金とあわせて", "確認したいページ"])
    official_h2 = section_h2(["料金比較で迷うポイントは、", "公的資料でも確認できます。"])
    faq_h2 = section_h2(["料金・手数料の", "よくある質問"])
    cta_h2 = section_h2(["自店舗の料率を、", "まずは無料で確認しませんか。"])
    body = f"""<main>
<section class="hero"><div class="container"><div class="breadcrumbs"><a href="/">ホーム</a> / <a href="/cashless/">キャッシュレス</a> / 料金・手数料</div><div class="hero-grid"><div><div class="eyebrow">Fees & Cost</div>{fees_h1}<p>キャッシュレス決済は、導入できることよりも「毎月いくら残るか」が重要です。決済手数料、初期費用、月額固定費、端末費用、入金サイクル、契約条件をまとめて確認しましょう。</p><div class="actions"><a class="btn btn-line" href="{LINE_URL}" target="_blank" rel="noopener">LINEで自店舗の料率を確認 →</a><a class="btn btn-primary" href="/cashless/terminals/">端末も見る →</a></div></div><div class="hero-card"><div class="rate"><strong>2.45</strong><span>%〜</span></div><p><strong>初期費用0円・月額固定費0円。</strong><br>医療機関は1.50%〜のご案内対象となる場合があります。</p><p style="font-size:13px;color:#555">決済手数料・提供条件は業種、取扱商品、審査結果、契約内容により異なります。</p></div></div></div></section>
<section class="section alt"><div class="container"><div class="eyebrow">Answer First</div>{answer_h2}<div class="grid"><div class="card"><h3>1. 手数料は2.45%〜</h3><p>一定条件を満たした店舗様は、キャッシュレス決済手数料2.45%〜でご案内可能です。</p></div><div class="card"><h3>2. 固定費は0円</h3><p>初期費用・月額固定費を抑えて、導入後の固定コストを増やしにくい設計です。</p></div><div class="card"><h3>3. 医療機関は1.50%〜</h3><p>医療機関コードを持つ病院・クリニック等は、医療機関向け料率の対象となる場合があります。</p></div></div></div></section>
<section class="section"><div class="container media"><img src="/images/store_out_day.jpg" alt="店舗外観とキャッシュレス決済導入イメージ" loading="lazy"><div><div class="eyebrow">Why Fee Matters</div>{why_h2}<p class="lead">決済手数料は、カード・電子マネー・QRコード決済などのキャッシュレス売上に対して毎月発生します。たとえばキャッシュレス売上が月100万円の場合、手数料が3.24%なら32,400円、2.45%なら24,500円です。差額は月7,900円、年間では94,800円になります。</p><div class="grid" style="grid-template-columns:repeat(2,1fr);margin-top:24px"><div class="card"><h3>3.24%の場合</h3><p style="font-size:28px;color:#2369b0;font-weight:900">32,400円/月</p><p>月100万円のキャッシュレス売上で試算</p></div><div class="card"><h3>2.45%の場合</h3><p style="font-size:28px;color:#2369b0;font-weight:900">24,500円/月</p><p>差額は月7,900円。固定費削減と同じ効果です。</p></div></div></div></div></section>
<section class="section alt"><div class="container"><div class="eyebrow">Comparison Points</div>{comparison_h2}<div class="grid"><div class="card"><h3>決済手数料</h3><p>もっとも重要な比較軸。毎月の売上に連動して発生するため、長期では大きな差になります。</p></div><div class="card"><h3>初期費用</h3><p>導入時に端末代や登録費用が必要かを確認します。当社案内では初期費用0円です。</p></div><div class="card"><h3>月額固定費</h3><p>売上が少ない月でも発生する費用です。当社案内では月額固定費0円です。</p></div><div class="card"><h3>入金サイクル</h3><p>売上がいつ入金されるかは資金繰りに関わります。月1〜2回など、事前確認が必要です。</p></div><div class="card"><h3>端末タイプ</h3><p>据え置き型、非接触型、モバイル型など、店舗の会計導線に合う端末を選びます。</p></div><div class="card"><h3>対応ブランド</h3><p>クレジットカード、電子マネー、PayPayなど、必要な決済手段に対応しているかを確認します。</p></div><div class="card"><h3>審査・対象業種</h3><p>業種、取扱商品、前払い商品、営業形態によって申込可否や条件が変わります。</p></div><div class="card"><h3>契約条件</h3><p>契約期間の縛り、解約条件、端末返却条件など、後から困りやすい項目を確認します。</p></div><div class="card"><h3>サポート体制</h3><p>申込前の確認、必要書類、導入後の使い方まで相談できるかで安心感が変わります。</p></div></div></div></section>
<section class="section"><div class="container"><div class="eyebrow">By Industry</div>{industry_h2}<div class="grid"><a class="card" href="/cashless/industry/restaurant/" style="text-decoration:none"><h3>飲食店</h3><p>客単価、ピークタイムの会計、QR決済ニーズ、全東信からの切替有無を確認します。</p></a><a class="card" href="/cashless/industry/beauty-salon/" style="text-decoration:none"><h3>美容室・サロン</h3><p>高単価メニュー、物販、回数券・前払い商品の扱いを確認します。</p></a><a class="card" href="/cashless/industry/clinic/" style="text-decoration:none"><h3>クリニック</h3><p>医療機関コード、保険診療・自費診療、医療機関向け料率の対象可否を確認します。</p></a></div></div></section>
<section class="section alt"><div class="container media"><img src="/images/store.JPG" alt="店内でのキャッシュレス決済相談イメージ" loading="lazy"><div><div class="eyebrow">How to Check</div>{check_h2}<p class="lead">Web上の料率だけで判断すると、対象外の業種・取扱商品・審査条件を見落とすことがあります。LINEで業種、店舗名、現在の決済状況、月間決済額の目安を送っていただければ、申込対象となり得るかを無料で確認します。</p><div class="actions"><a class="btn btn-line" href="{LINE_URL}" target="_blank" rel="noopener">LINEで料金を確認 →</a><a class="btn btn-primary" href="/contact/">フォームで相談 →</a></div></div></div></section>
<section class="section"><div class="container"><div class="eyebrow">Related Guide</div>{related_h2}<div class="grid"><a class="card" href="/cashless/terminals/" style="text-decoration:none"><h3>決済端末の選び方</h3><p>据え置き型、非接触型、モバイル型の違いと、店舗に合う端末の選び方を確認できます。</p></a><a class="card" href="/cashless/industry/" style="text-decoration:none"><h3>業種別ガイド</h3><p>飲食店、美容室、クリニック、小売店、整体・整骨院など、業種別の注意点を確認できます。</p></a><a class="card" href="/cashless/zentoshin-switch/" style="text-decoration:none"><h3>全東信切替相談</h3><p>全東信のサービス停止を受け、代替決済を探している店舗様向けの確認事項を整理しています。</p></a></div></div></section>
<section class="section alt"><div class="container"><div class="eyebrow">Official References</div>{official_h2}<p class="lead">「手数料以外に何を見るべきか」「入金サイクルや端末費用も確認すべきか」など、店舗側が比較時に見るべき観点に近い公的資料を掲載しています。</p><div class="grid"><a class="card" href="https://www.meti.go.jp/policy/mono_info_service/cashless/chusho-guideline.pdf" target="_blank" rel="noopener noreferrer" style="text-decoration:none"><h3>手数料・入金サイクルの確認項目</h3><p>経済産業省の「中小店舗向け開示ガイドライン」。決済手数料、決済手数料以外の費用、入金条件など、比較時に確認すべき項目が整理されています。</p></a><a class="card" href="https://www.meti.go.jp/press/2025/03/20260331006/20260331006.html" target="_blank" rel="noopener noreferrer" style="text-decoration:none"><h3>キャッシュレス決済比率の公表資料</h3><p>経済産業省が公表するキャッシュレス決済比率の最新資料。国内でキャッシュレス決済がどの程度広がっているかを確認できます。</p></a><a class="card" href="https://www.meti.go.jp/policy/mono_info_service/cashless/image_pdf_movie/leaflet_filp.pdf" target="_blank" rel="noopener noreferrer" style="text-decoration:none"><h3>入金サイクル・資金繰りが不安な方へ</h3><p>キャッシュレス導入時の資金繰り不安に関する公的案内。入金サイクルの遅れや手数料負担が気になる場合の参考資料です。</p></a></div></div></section>
<section class="section"><div class="container"><div class="eyebrow">FAQ</div>{faq_h2}<div class="grid"><div class="card"><h3>キャッシュレス決済手数料2.45%〜は誰でも対象ですか？</h3><p>一定条件を満たした場合の料率です。業種、営業形態、取扱商品、審査結果により条件は変わります。</p></div><div class="card"><h3>初期費用や月額固定費は本当に0円ですか？</h3><p>当社が案内するプランでは、初期費用0円・月額固定費0円でご案内しています。詳細条件は個別に確認します。</p></div><div class="card"><h3>医療機関の1.50%〜はどんな場合に対象ですか？</h3><p>医療機関コードを持つ病院・クリニック等が対象となる場合があります。保険診療・自費診療の扱いも確認します。</p></div><div class="card"><h3>現在の決済会社から切り替えるべきか相談できますか？</h3><p>可能です。現在の手数料、月間決済額、入金サイクル、端末運用を伺い、見直し余地を整理します。</p></div><div class="card"><h3>全東信からの切替相談もできますか？</h3><p>可能です。専用ページで確認事項を整理しています。<a href="/cashless/zentoshin-switch/">全東信切替相談ページ</a>をご確認ください。</p></div><div class="card"><h3>相談したら申込しないといけませんか？</h3><p>いいえ。相談だけで申込が確定することはありません。まずは対象となるかの確認だけでも可能です。</p></div></div></div></section>
<section class="section cta"><div class="container">{cta_h2}<p>業種と現在の決済状況を送っていただければ、申込対象となり得るかを確認します。</p><div class="actions" style="justify-content:center"><a class="btn btn-line" href="{LINE_URL}" target="_blank" rel="noopener">LINEで確認・相談・申込 →</a><a class="btn" href="/contact/" style="color:#fff">フォームで相談 →</a></div></div></section>
<script type="application/ld+json">{{"@context":"https://schema.org","@type":"FAQPage","mainEntity":[{{"@type":"Question","name":"キャッシュレス決済手数料2.45%〜は誰でも対象ですか？","acceptedAnswer":{{"@type":"Answer","text":"一定条件を満たした場合の料率です。業種、営業形態、取扱商品、審査結果により条件は変わります。"}}}},{{"@type":"Question","name":"初期費用や月額固定費は0円ですか？","acceptedAnswer":{{"@type":"Answer","text":"当社が案内するプランでは、初期費用0円・月額固定費0円でご案内しています。詳細条件は個別に確認します。"}}}},{{"@type":"Question","name":"医療機関の1.50%〜はどんな場合に対象ですか？","acceptedAnswer":{{"@type":"Answer","text":"医療機関コードを持つ病院・クリニック等が対象となる場合があります。保険診療・自費診療の扱いも確認します。"}}}}]}}</script>
</main>"""
    return page("キャッシュレス決済の手数料・料金｜2.45%〜・初期/月額0円", "キャッシュレス決済の手数料、初期費用、月額固定費、端末費用、入金サイクル、契約条件を比較。PUNCHLINE TOKYOでは条件に合う店舗様へ2.45%〜、医療機関1.50%〜の導入相談を行います。", "/cashless/fees/", body, "/images/store_out_day.jpg")


def terminals_page() -> str:
    body = f"""<main>
<section class="hero"><div class="container"><div class="breadcrumbs"><a href="/">ホーム</a> / <a href="/cashless/">キャッシュレス</a> / 決済端末</div><div class="hero-grid"><div><div class="eyebrow">Payment Terminals</div><h1>キャッシュレス決済端末は、店舗の会計導線から選ぶ。</h1><p>同じキャッシュレス決済でも、端末の選び方でスタッフの操作性、お客様の会計体験、レジ周りの見た目が変わります。据え置き型、非接触型、モバイル型の違いを整理します。</p><div class="actions"><a class="btn btn-line" href="{LINE_URL}" target="_blank" rel="noopener">端末についてLINEで相談 →</a><a class="btn btn-primary" href="/cashless/fees/">料金・手数料を見る →</a></div></div><div class="hero-card"><img src="/images/terminal_product.jpg" alt="キャッシュレス決済端末ラインナップ" loading="lazy" style="width:100%;height:auto;object-fit:contain"><p>店舗環境、レジ位置、スタッフ人数、客単価、決済ブランドに合わせて端末を選びます。</p></div></div></div></section>
<section class="section"><div class="container"><div class="eyebrow">Three Types</div><h2 class="section-title">主な決済端末は3タイプあります。</h2><div class="device-grid"><div class="device"><img src="/images/terminalitem01.jpg" alt="据え置き型キャッシュレス決済端末" loading="lazy"><h3>据え置き型</h3><p>レジ横に固定して使いやすい端末。飲食店、小売店、美容室など、会計場所が決まっている店舗に向いています。</p></div><div class="device"><img src="/images/terminalitem02.jpg" alt="非接触型キャッシュレス決済端末" loading="lazy"><h3>非接触型</h3><p>タッチ決済をスムーズに案内しやすい端末。会計スピードや衛生面を重視する店舗に向いています。</p></div><div class="device"><img src="/images/terminalitem03.jpg" alt="モバイル型キャッシュレス決済端末" loading="lazy"><h3>モバイル型</h3><p>席会計、訪問サービス、省スペース店舗に向く端末。持ち運びやすさを重視する場合に選びます。</p></div></div></div></section>
<section class="section alt"><div class="container media"><img src="/images/store.JPG" alt="店舗内で決済端末を選ぶイメージ" loading="lazy"><div><div class="eyebrow">How to Choose</div><h2 class="section-title">端末選びで失敗しないための5つの判断軸</h2><div class="grid" style="grid-template-columns:1fr;gap:12px;margin-top:22px"><div class="card"><h3>1. 会計場所</h3><p>レジ固定なら据え置き型、席会計や訪問があるならモバイル型を検討します。</p></div><div class="card"><h3>2. 会計スピード</h3><p>ランチタイムや受付が混む店舗では、タッチ決済の案内しやすさが重要です。</p></div><div class="card"><h3>3. レジ周りの広さ</h3><p>小規模店舗では、端末のサイズやコード類の少なさが見た目と運用に影響します。</p></div><div class="card"><h3>4. スタッフ操作</h3><p>アルバイトや受付スタッフでも迷わない画面・操作フローかを確認します。</p></div><div class="card"><h3>5. 対応ブランド</h3><p>クレジット、電子マネー、QRコード決済など、お客様が使う支払い方法に対応しているか確認します。</p></div></div></div></div></section>
<section class="section"><div class="container"><div class="eyebrow">Best Fit</div><h2 class="section-title">業種別のおすすめ端末イメージ</h2><div class="grid"><a class="card" href="/cashless/industry/restaurant/" style="text-decoration:none"><h3>飲食店</h3><p>レジ会計中心なら据え置き型。テーブル会計や屋外イベントがある場合はモバイル型も検討します。</p></a><a class="card" href="/cashless/industry/beauty-salon/" style="text-decoration:none"><h3>美容室・サロン</h3><p>受付カウンターの見た目を重視し、コンパクトで案内しやすい端末を選びます。</p></a><a class="card" href="/cashless/industry/clinic/" style="text-decoration:none"><h3>クリニック</h3><p>受付スタッフが迷わず案内でき、患者様にとって分かりやすい端末運用を重視します。</p></a><a class="card" href="/cashless/industry/retail/" style="text-decoration:none"><h3>小売店</h3><p>少額決済や電子マネー利用が多い場合、会計スピードと対応ブランドを重視します。</p></a><a class="card" href="/cashless/industry/seitai/" style="text-decoration:none"><h3>整体・整骨院</h3><p>自費メニューや回数券の説明と合わせて、受付で使いやすい端末を選びます。</p></a><div class="card"><h3>迷う場合</h3><p>店舗写真やレジ周りの状況をLINEで送ってください。合う端末の方向性を整理します。</p></div></div></div></section>
<section class="section alt"><div class="container"><div class="eyebrow">Payment Brands</div><h2 class="section-title">対応したい決済ブランドも端末選びの重要ポイントです。</h2><p class="lead">お客様が使いたい決済手段に対応していないと、せっかく端末を導入しても機会損失につながります。クレジット・デビット・プリペイド、電子マネー、QRコード決済をまとめて確認しましょう。</p><div class="brand-grid" style="margin-top:28px"><div class="brand-card"><h3>クレジット・デビット</h3><img src="/images/credit_david_prepaid.jpg" alt="クレジットカード対応ブランド" loading="lazy"></div><div class="brand-card"><h3>電子マネー</h3><img src="/images/traffic_electric_money.jpg" alt="電子マネー対応ブランド" loading="lazy"></div><div class="brand-card"><h3>QRコード決済</h3><img src="/images/paypay_logo.jpg" alt="PayPayロゴ" loading="lazy"></div></div></div></section>
<section class="section"><div class="container media"><img src="/images/store_out_night.JPG" alt="夜の店舗外観とキャッシュレス導入イメージ" loading="lazy"><div><div class="eyebrow">Before Apply</div><h2 class="section-title">申込前に確認しておくとスムーズなこと</h2><div class="card"><ul><li>業種、店舗名、所在地、営業実態</li><li>月間の売上規模とキャッシュレス決済額の目安</li><li>現在使っている決済端末や決済会社</li><li>必要な決済ブランド</li><li>レジ周りの写真、会計導線、スタッフ人数</li><li>回数券・前払い商品・物販の有無</li></ul></div><div class="actions"><a class="btn btn-line" href="{LINE_URL}" target="_blank" rel="noopener">写真をLINEで送って相談 →</a></div></div></div></section>
<section class="section alt"><div class="container"><div class="eyebrow">Common Mistakes</div><h2 class="section-title">端末選びでよくある失敗</h2><div class="grid"><div class="card"><h3>料金だけで選ぶ</h3><p>手数料は重要ですが、端末が現場に合わないと会計オペレーションが崩れます。</p></div><div class="card"><h3>対応ブランドを確認しない</h3><p>お客様が使いたい決済手段に対応していないと、導入後の不満につながります。</p></div><div class="card"><h3>レジ周りの設置を考えない</h3><p>コード類、端末サイズ、置き場所を確認せず導入すると、カウンターが使いづらくなります。</p></div><div class="card"><h3>スタッフ教育を考えない</h3><p>端末操作が複雑だと、混雑時の会計ミスや問い合わせ増加につながります。</p></div><div class="card"><h3>入金サイクルを見ない</h3><p>端末だけでなく、売上入金のタイミングも資金繰りに影響します。</p></div><div class="card"><h3>審査条件を見落とす</h3><p>業種や取扱商品によって申込可否が変わるため、事前確認が重要です。</p></div></div></div></section>
<section class="section"><div class="container"><div class="eyebrow">Related Guide</div><h2 class="section-title">端末とあわせて確認したいページ</h2><div class="grid"><a class="card" href="/cashless/fees/" style="text-decoration:none"><h3>料金・手数料</h3><p>2.45%〜、初期費用0円、月額固定費0円など、料金面の確認ポイントを整理しています。</p></a><a class="card" href="/cashless/industry/" style="text-decoration:none"><h3>業種別ガイド</h3><p>業種ごとに会計導線や注意点が異なります。自店舗に近い業種から確認できます。</p></a><a class="card" href="/cashless/zentoshin-switch/" style="text-decoration:none"><h3>全東信切替相談</h3><p>全東信の停止に伴う代替決済の確認事項を整理しています。</p></a></div></div></section>
<section class="section alt"><div class="container"><div class="eyebrow">Official References</div><h2 class="section-title">端末選びで確認すべきことも、公的資料で整理できます。</h2><p class="lead">「端末費用は別でかかるのか」「対応ブランドや入金条件も見るべきか」など、端末選びに関わる確認事項に近い公的資料を掲載しています。</p><div class="grid"><a class="card" href="https://www.meti.go.jp/policy/mono_info_service/cashless/chusho-guideline.pdf" target="_blank" rel="noopener noreferrer" style="text-decoration:none"><h3>端末費用・通信費・対応ブランドの確認</h3><p>経済産業省のガイドラインでは、端末関連費用、通信関連費用、対応可能なブランド・サービス、端末種類の説明などを確認すべき情報として整理しています。</p></a><a class="card" href="https://www.meti.go.jp/policy/mono_info_service/cashless/" target="_blank" rel="noopener noreferrer" style="text-decoration:none"><h3>キャッシュレス決済の種類と制度背景</h3><p>クレジットカード、デビットカード、電子マネー、コード決済など、キャッシュレス決済の種類や社会的意義を確認できます。</p></a><a class="card" href="https://www.meti.go.jp/press/2025/03/20260331006/20260331006.html" target="_blank" rel="noopener noreferrer" style="text-decoration:none"><h3>利用拡大の最新データ</h3><p>キャッシュレス決済比率の公表資料。導入を検討する際に、利用者側の決済行動がどう広がっているかを把握できます。</p></a></div></div></section>
<section class="section"><div class="container"><div class="eyebrow">FAQ</div><h2 class="section-title">決済端末のよくある質問</h2><div class="grid"><div class="card"><h3>決済端末は無料で使えますか？</h3><p>当社案内では初期費用0円・月額固定費0円でご案内しています。詳細条件は個別に確認します。</p></div><div class="card"><h3>どの端末を選べばよいか分かりません。</h3><p>会計場所、店舗写真、必要な決済ブランドを確認し、店舗に合う端末を整理します。</p></div><div class="card"><h3>PayPayや電子マネーにも対応できますか？</h3><p>対応可能なブランドを確認しながらご案内します。必要な決済手段を事前に教えてください。</p></div><div class="card"><h3>飲食店でも使えますか？</h3><p>飲食店でも導入相談可能です。ランチ・ディナーの会計集中や席会計の有無を確認します。</p></div><div class="card"><h3>全東信からの切替でも端末相談できますか？</h3><p>可能です。現在の決済状況と必要なブランドを確認し、代替決済の候補を整理します。</p></div><div class="card"><h3>申込から利用開始までどれくらいですか？</h3><p>必要書類の準備状況、審査、端末手配によって異なります。まずは申込可否を確認します。</p></div></div></div></section>
<section class="section cta"><div class="container"><h2 class="section-title">端末選びから料金まで、まとめて無料相談できます。</h2><p>店舗写真、業種、現在の決済状況を送っていただければ、端末・料率・申込可否を整理します。</p><div class="actions" style="justify-content:center"><a class="btn btn-line" href="{LINE_URL}" target="_blank" rel="noopener">LINEで端末相談 →</a><a class="btn" href="/contact/" style="color:#fff">フォームで相談 →</a></div></div></section>
<script type="application/ld+json">{{"@context":"https://schema.org","@type":"FAQPage","mainEntity":[{{"@type":"Question","name":"決済端末は無料で使えますか？","acceptedAnswer":{{"@type":"Answer","text":"当社案内では初期費用0円・月額固定費0円でご案内しています。詳細条件は個別に確認します。"}}}},{{"@type":"Question","name":"どの端末を選べばよいか分かりません。","acceptedAnswer":{{"@type":"Answer","text":"会計場所、店舗写真、必要な決済ブランドを確認し、店舗に合う端末を整理します。"}}}},{{"@type":"Question","name":"PayPayや電子マネーにも対応できますか？","acceptedAnswer":{{"@type":"Answer","text":"対応可能なブランドを確認しながらご案内します。必要な決済手段を事前に教えてください。"}}}}]}}</script>
</main>"""
    return page("キャッシュレス決済端末の選び方｜据え置き型・非接触型・モバイル型", "店舗の会計導線に合わせて、据え置き型・非接触型・モバイル型のキャッシュレス決済端末を比較。対応ブランド、端末選びの失敗例、業種別の選び方までPUNCHLINE TOKYOが解説します。", "/cashless/terminals/", body, "/images/terminal_product.jpg")


def write(path: str, html: str) -> None:
    target = ROOT / path
    target.parent.mkdir(parents=True, exist_ok=True)
    target.write_text(html, encoding="utf-8")


def update_sitemap() -> None:
    urls = [
        ("/cashless/industry/", "0.8"),
        ("/cashless/industry/restaurant/", "0.7"),
        ("/cashless/industry/beauty-salon/", "0.7"),
        ("/cashless/industry/clinic/", "0.7"),
        ("/cashless/industry/retail/", "0.7"),
        ("/cashless/industry/seitai/", "0.7"),
        ("/cashless/fees/", "0.8"),
        ("/cashless/terminals/", "0.8"),
    ]
    sitemap = ROOT / "sitemap.xml"
    content = sitemap.read_text(encoding="utf-8")
    insert = "\n".join(
        f'  <url><loc>https://pl-tokyo.com{url}</loc><lastmod>2026-07-10</lastmod><changefreq>weekly</changefreq><priority>{priority}</priority></url>'
        for url, priority in urls
        if f"https://pl-tokyo.com{url}" not in content
    )
    if insert:
        content = content.replace("</urlset>", insert + "\n</urlset>")
        sitemap.write_text(content, encoding="utf-8")


def main() -> None:
    write("cashless/industry/index.html", industry_index())
    for item in INDUSTRIES:
        body = industry_page(item)
        write(f"cashless/industry/{item['slug']}/index.html", page(item["title"], item["description"], f"/cashless/industry/{item['slug']}/", body, item["image"]))
    write("cashless/fees/index.html", fees_page())
    write("cashless/terminals/index.html", terminals_page())
    update_sitemap()


if __name__ == "__main__":
    main()
