#!/usr/bin/env python3
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
*{box-sizing:border-box}html{scroll-behavior:smooth}body{margin:0;background:#fafafa;color:var(--ink);font-family:'Noto Sans JP',sans-serif;line-height:1.85;letter-spacing:.02em}a{color:inherit}.container{width:min(1120px,calc(100% - 48px));margin:auto}.site-header{position:sticky;top:0;z-index:50;background:rgba(250,250,250,.94);border-bottom:1px solid var(--line);backdrop-filter:blur(14px)}.header-inner{height:78px;display:flex;align-items:center;gap:28px}.brand{font-family:'Bebas Neue';font-size:22px;letter-spacing:.15em;text-decoration:none;white-space:nowrap}.nav{margin-left:auto;display:flex;align-items:center;gap:26px}.nav a{font-size:12px;font-weight:400;letter-spacing:.12em;text-decoration:none;text-transform:uppercase;color:var(--muted)}.nav a:hover{color:var(--blue2)}.nav-item{position:relative}.nav-item::after{content:'';position:absolute;left:-10px;right:-10px;top:100%;height:18px}.nav-trigger{display:inline-flex;align-items:center;gap:6px;line-height:1;vertical-align:middle}.nav-trigger::after{content:'⌄';font-size:12px;color:var(--blue2)}.nav-dropdown{position:absolute;top:calc(100% + 12px);left:50%;min-width:260px;padding:10px;background:rgba(255,255,255,.98);border:1px solid var(--line);box-shadow:0 18px 40px rgba(17,17,17,.12);opacity:0;visibility:hidden;pointer-events:none;transform:translateX(-50%) translateY(8px);transition:.2s;z-index:80}.nav-item:hover .nav-dropdown,.nav-item:focus-within .nav-dropdown{opacity:1;visibility:visible;pointer-events:auto;transform:translateX(-50%) translateY(0)}.nav-dropdown a{display:block;padding:10px 12px;border-radius:6px;color:var(--ink);font-weight:500;letter-spacing:.08em;text-transform:none}.nav-dropdown a:hover{background:rgba(74,144,217,.06);color:var(--blue2)}.nav-line{background:#111;color:#fff!important;padding:11px 16px}.nav-cta{border:1px solid var(--blue);color:var(--blue2)!important;padding:9px 13px}.hero{padding:74px 0 54px;background:linear-gradient(100deg,rgba(250,250,250,.98),rgba(250,250,250,.72)),var(--hero) center/cover}.breadcrumbs{font-size:12px;color:var(--muted);margin-bottom:34px}.breadcrumbs a{color:var(--blue2);text-decoration:none}.eyebrow{color:var(--blue2);font-size:12px;font-weight:900;letter-spacing:.18em;text-transform:uppercase}.hero-grid{display:grid;grid-template-columns:1.05fr .95fr;gap:54px;align-items:center}.hero h1{margin:14px 0 0;font-size:clamp(34px,5vw,62px);line-height:1.25;letter-spacing:-.04em;text-wrap:balance}.hero p{max-width:680px;color:var(--body)}.hero-card{background:rgba(255,255,255,.88);border:1px solid var(--line);padding:28px;box-shadow:0 20px 60px rgba(17,17,17,.08)}.rate{display:flex;align-items:baseline;gap:10px;color:var(--blue2)}.rate strong{font-size:clamp(54px,8vw,92px);line-height:1;letter-spacing:-.06em}.rate span{font-size:28px;font-weight:900}.actions{display:flex;flex-wrap:wrap;gap:12px;margin-top:30px}.btn{display:inline-flex;align-items:center;justify-content:center;min-height:54px;padding:13px 20px;border:1px solid var(--line);font-size:13px;font-weight:900;text-decoration:none}.btn-line{background:var(--linegreen);border-color:var(--linegreen);color:#fff}.btn-primary{background:var(--blue);border-color:var(--blue);color:#fff}.section{padding:76px 0}.section.alt{background:var(--paper)}.section-title{font-size:clamp(28px,4vw,44px);line-height:1.35;letter-spacing:-.03em;text-wrap:balance}.lead{color:var(--body);max-width:720px}.grid{display:grid;grid-template-columns:repeat(3,1fr);gap:18px;margin-top:34px}.card{background:#fff;border:1px solid var(--line);padding:28px}.card h3{font-size:18px;margin:0 0 10px}.card p,.card li{color:var(--body);font-size:14px}.card ul{margin:0;padding-left:1.2em}.media{display:grid;grid-template-columns:.95fr 1.05fr;gap:42px;align-items:center}.media img{width:100%;aspect-ratio:4/3;object-fit:cover;border:1px solid var(--line);background:#fff}.device-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:18px;margin-top:34px}.device{background:#fff;border:1px solid var(--line);border-radius:18px;padding:24px;text-align:center;box-shadow:0 12px 32px rgba(17,17,17,.06)}.device img{height:160px;width:100%;object-fit:contain}.brand-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:16px}.brand-card{background:#fff;border:1px solid var(--line);padding:22px;text-align:center}.brand-card img{height:54px;max-width:100%;object-fit:contain}.brand-card:nth-child(2) img{height:72px}.cta{background:#111;color:#fff;text-align:center}.cta p{color:#d5d5d5}.footer{background:#050505;color:#aaa;padding:34px 0}.footer-inner{display:flex;justify-content:space-between;gap:24px}.footer-brand{font-family:'Bebas Neue';color:#fff;letter-spacing:.15em;font-size:22px}.footer-links{display:flex;flex-wrap:wrap;gap:10px 18px;margin-top:12px}.footer-links a{font-size:12px;color:#bbb}.mobile-menu{display:none}
@media(max-width:900px){.container{width:calc(100% - 40px)}.nav{display:none}.hero{padding:46px 0}.hero-grid,.media{grid-template-columns:1fr;gap:30px}.hero-card{padding:22px}.grid,.device-grid,.brand-grid{grid-template-columns:1fr}.section{padding:58px 0}.footer-inner{display:block}.mobile-menu{display:block;margin-top:18px}.mobile-menu details{border:1px solid var(--line);background:#fff;padding:14px}.mobile-menu summary{font-weight:900;color:var(--blue2);cursor:pointer}.mobile-menu a{display:block;padding:9px 0;text-decoration:none}.device img{height:130px}}"""


def header() -> str:
    links = "".join(
        f'<a href="/cashless/industry/{item["slug"]}/">{item["label"]}</a>' for item in INDUSTRIES
    )
    mobile_links = "".join(
        f'<a href="/cashless/industry/{item["slug"]}/">{item["label"]}</a>' for item in INDUSTRIES
    )
    return f"""<header class="site-header"><div class="container header-inner">
  <a class="brand" href="/">PUNCHLINE TOKYO</a>
  <nav class="nav" aria-label="キャッシュレスナビゲーション">
    <a href="/cashless/">低コストキャッシュレス決済サービス</a>
    <div class="nav-item"><a class="nav-trigger" href="/cashless/industry/">業種別ガイド</a><div class="nav-dropdown">{links}</div></div>
    <a href="/cashless/fees/">料金・手数料</a>
    <a href="/cashless/terminals/">決済端末</a>
    <a href="/cashless/zentoshin-switch/">全東信スイッチ</a>
    <a class="nav-line" href="{LINE_URL}" target="_blank" rel="noopener">LINE相談</a>
  </nav>
</div></header>
<div class="container mobile-menu"><details><summary>キャッシュレスメニュー</summary><a href="/cashless/">総合ページ</a><a href="/cashless/industry/">業種別トップ</a>{mobile_links}<a href="/cashless/fees/">料金</a><a href="/cashless/terminals/">決済端末</a><a href="/cashless/zentoshin-switch/">全東信切替</a></details></div>"""


def footer() -> str:
    return """<footer class="footer"><div class="container footer-inner">
  <div><div class="footer-brand">PUNCHLINE TOKYO</div><nav class="footer-links" aria-label="フッターナビ"><a href="/">会社TOP</a><a href="/cashless/">キャッシュレス</a><a href="/cashless/industry/">業種別</a><a href="/cashless/fees/">料金</a><a href="/cashless/terminals/">決済端末</a><a href="/cashless/zentoshin-switch/">全東信切替相談</a><a href="/contact/">お問い合わせ</a></nav></div>
  <div>株式会社PUNCHLINE TOKYO<br>EPARKフィナンシャルパートナーズ公式代理店<br>© 2026 PUNCHLINE TOKYO</div>
</div></footer>"""


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
</body>
</html>
"""


def industry_page(item: dict) -> str:
    rate_note = item.get("rate_note", "キャッシュレス決済手数料は一定条件を満たした場合2.45%〜。")
    pains = "".join(f"<li>{p}</li>" for p in item["pains"])
    checks = "".join(f"<li>{c}</li>" for c in item["checks"])
    return f"""<main>
  <section class="hero"><div class="container">
    <div class="breadcrumbs"><a href="/">ホーム</a> / <a href="/cashless/">キャッシュレス</a> / <a href="/cashless/industry/">業種別</a> / {item['label']}</div>
    <div class="hero-grid">
      <div><div class="eyebrow">Cashless for {item['label']}</div><h1>{item['h1']}</h1><p>{item['lead']}</p><div class="actions"><a class="btn btn-line" href="{LINE_URL}" target="_blank" rel="noopener">LINEで確認・相談・申込 →</a><a class="btn btn-primary" href="/contact/">フォームで無料相談 →</a></div></div>
      <div class="hero-card"><div class="rate"><strong>{'1.50' if item['slug']=='clinic' else '2.45'}</strong><span>%〜</span></div><p>{rate_note}</p><p>初期費用・月額固定費は0円。申込可否や実際の条件は、業種・取扱商品・審査結果により異なります。</p></div>
    </div>
  </div></section>
  <section class="section"><div class="container media"><img src="{item['image']}" alt="{item['label']}のキャッシュレス決済導入イメージ" loading="lazy"><div><div class="eyebrow">Issues</div><h2 class="section-title">{item['label']}でよくある決済課題</h2><div class="card"><ul>{pains}</ul></div></div></div></section>
  <section class="section alt"><div class="container"><div class="eyebrow">Check Point</div><h2 class="section-title">導入前に確認したいこと</h2><div class="grid"><div class="card"><h3>申込条件</h3><ul>{checks}</ul></div><div class="card"><h3>おすすめ端末</h3><p>{item['terminal']}を中心に、店舗の会計導線に合う形を確認します。</p></div><div class="card"><h3>相談方法</h3><p>LINEで業種・決済状況を送っていただければ、対象となり得るかを深夜でも確認できます。</p></div></div></div></section>
  <section class="section"><div class="container"><div class="eyebrow">Payment Brands</div><h2 class="section-title">主要ブランドにまとめて対応</h2><div class="brand-grid"><div class="brand-card"><h3>クレジット・デビット</h3><img src="/images/credit_david_prepaid.jpg" alt="対応クレジットカードブランド" loading="lazy"></div><div class="brand-card"><h3>電子マネー</h3><img src="/images/traffic_electric_money.jpg" alt="対応電子マネーブランド" loading="lazy"></div><div class="brand-card"><h3>QRコード決済</h3><img src="/images/paypay_logo.jpg" alt="PayPay" loading="lazy"></div></div></div></section>
  <section class="section cta"><div class="container"><div class="eyebrow">Free Consultation</div><h2 class="section-title">まずは対象となるか、無料で確認しませんか。</h2><p>相談しただけで申込が確定することはありません。現在の業種・決済状況を確認し、ご案内可能な内容をお伝えします。</p><div class="actions" style="justify-content:center"><a class="btn btn-line" href="{LINE_URL}" target="_blank" rel="noopener">LINEで無料相談 →</a><a class="btn" href="/contact/" style="color:#fff">フォームで相談 →</a></div></div></section>
</main>"""


def industry_index() -> str:
    cards = "".join(
        f"""<a class="card" href="/cashless/industry/{item['slug']}/" style="text-decoration:none"><h3>{item['label']}</h3><p>{item['lead']}</p></a>"""
        for item in INDUSTRIES
    )
    body = f"""<main><section class="hero"><div class="container"><div class="breadcrumbs"><a href="/">ホーム</a> / <a href="/cashless/">キャッシュレス</a> / 業種別</div><div class="eyebrow">Industry Guide</div><h1>業種別に選ぶ、キャッシュレス決済導入ガイド。</h1><p>同じ決済端末でも、飲食店・美容室・クリニック・小売店・整体院では確認すべきポイントが変わります。自社に近い業種からご確認ください。</p><div class="actions"><a class="btn btn-line" href="{LINE_URL}" target="_blank" rel="noopener">LINEで業種を確認 →</a><a class="btn btn-primary" href="/cashless/fees/">料金を見る →</a></div></div></section><section class="section"><div class="container"><h2 class="section-title">業種業態別の解説</h2><div class="grid">{cards}</div></div></section></main>"""
    return page("業種別キャッシュレス決済導入ガイド｜PUNCHLINE TOKYO", "飲食店、美容室、クリニック、小売店、整体・整骨院など、業種別にキャッシュレス決済導入の確認点とおすすめ端末を解説します。", "/cashless/industry/", body)


def fees_page() -> str:
    body = f"""<main><section class="hero"><div class="container"><div class="breadcrumbs"><a href="/">ホーム</a> / <a href="/cashless/">キャッシュレス</a> / 料金</div><div class="hero-grid"><div><div class="eyebrow">Fees</div><h1>決済手数料を、利益に変える。</h1><p>キャッシュレス決済は「入れられるか」だけでなく、毎月発生する手数料をどれだけ抑えられるかが重要です。PUNCHLINE TOKYOでは、条件に合う店舗様へ2.45%〜のご案内を行っています。</p><div class="actions"><a class="btn btn-line" href="{LINE_URL}" target="_blank" rel="noopener">LINEで料率を確認 →</a><a class="btn btn-primary" href="/contact/">フォームで相談 →</a></div></div><div class="hero-card"><div class="rate"><strong>2.45</strong><span>%〜</span></div><p>初期費用0円・月額固定費0円。医療機関は1.50%〜のご案内対象となる場合があります。</p></div></div></div></section><section class="section alt"><div class="container"><h2 class="section-title">料金で確認すべきポイント</h2><div class="grid"><div class="card"><h3>決済手数料</h3><p>売上に対して毎月発生する費用です。数値が小さくても、年間では大きな差になります。</p></div><div class="card"><h3>初期費用・月額固定費</h3><p>端末代や固定費がかからないか、導入前に確認します。</p></div><div class="card"><h3>対象業種・審査</h3><p>業種、取扱商品、営業形態により申込可否や条件が変わります。</p></div></div></div></section><section class="section cta"><div class="container"><h2 class="section-title">自店舗の料率をLINEで確認しませんか。</h2><p>業種と現在の決済状況を送っていただければ、申込対象となり得るかを確認します。</p><div class="actions" style="justify-content:center"><a class="btn btn-line" href="{LINE_URL}" target="_blank" rel="noopener">LINEで確認・相談・申込 →</a></div></div></section></main>"""
    return page("キャッシュレス決済の手数料・料金｜2.45%〜・初期/月額0円", "キャッシュレス決済の手数料・初期費用・月額固定費をわかりやすく解説。PUNCHLINE TOKYOでは条件に合う店舗様へ2.45%〜、医療機関1.50%〜の導入相談を行います。", "/cashless/fees/", body)


def terminals_page() -> str:
    body = f"""<main><section class="hero"><div class="container"><div class="breadcrumbs"><a href="/">ホーム</a> / <a href="/cashless/">キャッシュレス</a> / 決済端末</div><div class="eyebrow">Terminals</div><h1>店舗に合う決済端末を、運用から選ぶ。</h1><p>据え置き型、非接触型、モバイル型。端末は見た目ではなく、会計導線・設置場所・スタッフ運用で選ぶのが失敗しないコツです。</p><div class="actions"><a class="btn btn-line" href="{LINE_URL}" target="_blank" rel="noopener">端末についてLINEで相談 →</a><a class="btn btn-primary" href="/cashless/fees/">料金を見る →</a></div></div></section><section class="section"><div class="container"><h2 class="section-title">豊富な決済端末のご紹介</h2><div class="device-grid"><div class="device"><img src="/images/terminalitem01.jpg" alt="据え置き型決済端末" loading="lazy"><h3>据え置き型</h3><p>カウンター会計に向く、安定感のある端末です。</p></div><div class="device"><img src="/images/terminalitem02.jpg" alt="非接触型決済端末" loading="lazy"><h3>最新の非接触型</h3><p>タッチ決済をスムーズに案内できます。</p></div><div class="device"><img src="/images/terminalitem03.jpg" alt="モバイル型決済端末" loading="lazy"><h3>モバイル型</h3><p>席会計や省スペース店舗でも使いやすい端末です。</p></div></div></div></section><section class="section alt"><div class="container media"><img src="/images/counter.JPG" alt="店舗カウンターでの決済端末利用イメージ" loading="lazy"><div><h2 class="section-title">端末選びで見るべきこと</h2><div class="card"><ul><li>会計場所が固定か、移動するか</li><li>スタッフが迷わず操作できるか</li><li>クレジット・電子マネー・QRのどれを重視するか</li><li>レジ周りの設置スペースに合うか</li></ul></div></div></div></section><section class="section cta"><div class="container"><h2 class="section-title">店舗写真やレジ周りの状況をLINEで送ってください。</h2><p>無理に申込へ進めず、まずは合う端末と導入可否を整理します。</p><div class="actions" style="justify-content:center"><a class="btn btn-line" href="{LINE_URL}" target="_blank" rel="noopener">LINEで端末相談 →</a></div></div></section></main>"""
    return page("キャッシュレス決済端末の選び方｜据え置き型・非接触型・モバイル型", "店舗の会計導線に合わせて、据え置き型・非接触型・モバイル型のキャッシュレス決済端末を解説。端末選びから申込までPUNCHLINE TOKYOが支援します。", "/cashless/terminals/", body, "/images/terminal_product.jpg")


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
