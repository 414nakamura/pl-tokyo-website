#!/usr/bin/env python3
"""
Fetch PUNCHLINE TOKYO note RSS and generate HP column pages.

Policy:
- note is treated as the full article body.
- The HP gets an indexable column listing page.
- Each HP article page is a noindex summary page that links to the original note.
"""

from __future__ import annotations

import email.utils
import html
import json
import re
import sys
import urllib.request
from dataclasses import asdict, dataclass
from datetime import datetime, timezone
from pathlib import Path
from typing import Iterable
from xml.etree import ElementTree as ET


NOTE_RSS_URL = "https://note.com/punchline_tokyo/rss"
NOTE_TOP_URL = "https://note.com/punchline_tokyo"
SITE_URL = "https://pl-tokyo.com"
SITE_NAME = "株式会社PUNCHLINE TOKYO"
COLUMN_TITLE = "コラム"
MAX_POSTS = 24
LINE_URL = "https://lin.ee/8MZB401J"


@dataclass
class NotePost:
    title: str
    url: str
    slug: str
    published: str
    published_iso: str
    thumbnail: str
    excerpt: str


def text_or_empty(parent: ET.Element, path: str, namespaces: dict[str, str] | None = None) -> str:
    node = parent.find(path, namespaces or {})
    return (node.text or "").strip() if node is not None else ""


def strip_tags(value: str) -> str:
    value = re.sub(r"<br\s*/?>", "\n", value, flags=re.I)
    value = re.sub(r"</p\s*>", "\n", value, flags=re.I)
    value = re.sub(r"<[^>]+>", "", value)
    value = html.unescape(value)
    value = re.sub(r"\s+", " ", value).strip()
    value = re.sub(r"続きをみる\s*$", "", value).strip()
    return value


def build_excerpt(title: str, raw_excerpt: str) -> str:
    """Create a reader-facing HP summary from note RSS text."""
    excerpt = raw_excerpt
    excerpt = re.sub(r"公開日[:：][^。]*", "", excerpt).strip()
    excerpt = re.sub(r"情報確認日[:：][^。]*", "", excerpt).strip()
    excerpt = re.sub(r"執筆[:：][^。]*", "", excerpt).strip()
    excerpt = re.sub(
        r"本記事は、EPARKフィナンシャルパートナーズ公式代理店である株式会社PUNCHLINE TOKYOが運営・執筆しています。?",
        "",
        excerpt,
    ).strip()

    if "全東信" in title:
        return (
            "全東信の破産・サービス停止を受け、カード決済が使えない、または今後の入金や切替に不安がある事業者向けに、"
            "まず確認すべき公式情報、保管しておきたい売上明細・入金履歴・契約書類、代替決済サービスを選ぶ際の手数料・初期費用・端末・審査・サポートの見方を整理した記事です。"
        )

    if not excerpt:
        return f"{title}について、PUNCHLINE TOKYOがnoteで整理しています。"
    return excerpt


def make_slug(url: str) -> str:
    match = re.search(r"/n/([^/?#]+)", url)
    if match:
        return match.group(1)
    cleaned = re.sub(r"[^a-zA-Z0-9_-]+", "-", url).strip("-")
    return cleaned[-80:] or "note-post"


def format_date(pub_date: str) -> tuple[str, str]:
    parsed = email.utils.parsedate_to_datetime(pub_date)
    if parsed.tzinfo is None:
        parsed = parsed.replace(tzinfo=timezone.utc)
    local = parsed.astimezone()
    return local.strftime("%Y.%m.%d"), local.date().isoformat()


def fetch_rss(url: str) -> bytes:
    request = urllib.request.Request(
        url,
        headers={"User-Agent": "punchline-tokyo-note-sync/1.0"},
    )
    with urllib.request.urlopen(request, timeout=30) as response:
        return response.read()


def parse_posts(xml_bytes: bytes) -> list[NotePost]:
    namespaces = {"media": "http://search.yahoo.com/mrss/"}
    root = ET.fromstring(xml_bytes)
    items = root.findall("./channel/item")
    posts: list[NotePost] = []

    for item in items[:MAX_POSTS]:
        title = text_or_empty(item, "title")
        url = text_or_empty(item, "link")
        pub_date = text_or_empty(item, "pubDate")
        description = text_or_empty(item, "description")
        thumb_node = item.find("media:thumbnail", namespaces)
        thumbnail = ""
        if thumb_node is not None and thumb_node.text:
            thumbnail = thumb_node.text.strip()
        if thumb_node is not None and thumb_node.attrib.get("url"):
            thumbnail = thumb_node.attrib["url"].strip()

        if not title or not url or not pub_date:
            continue

        published, published_iso = format_date(pub_date)
        excerpt = build_excerpt(title, strip_tags(description))
        if excerpt.startswith("この記事の著者"):
            excerpt = f"{title}について、PUNCHLINE TOKYOがnoteで整理しています。"
        if len(excerpt) > 190:
            excerpt = excerpt[:190].rstrip() + "..."

        posts.append(
            NotePost(
                title=title,
                url=url,
                slug=make_slug(url),
                published=published,
                published_iso=published_iso,
                thumbnail=thumbnail,
                excerpt=excerpt,
            )
        )

    return sorted(posts, key=lambda post: post.published_iso, reverse=True)


def page_shell(title: str, description: str, body: str, canonical: str, og_type: str = "website", robots: str = "index, follow") -> str:
    escaped_title = html.escape(title)
    escaped_description = html.escape(description)
    escaped_canonical = html.escape(canonical)
    return f"""<!DOCTYPE html>
<html lang="ja">
<head>
  <script>if(/^https?:$/.test(location.protocol)&&/\\/index\\.html$/.test(location.pathname)){{history.replaceState(null,'',location.pathname.replace(/index\\.html$/,'')+location.search+location.hash)}}</script>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="{escaped_description}">
  <meta name="robots" content="{html.escape(robots)}">
  <title>{escaped_title}</title>
  <link rel="canonical" href="{escaped_canonical}">
  <meta property="og:title" content="{escaped_title}">
  <meta property="og:description" content="{escaped_description}">
  <meta property="og:type" content="{html.escape(og_type)}">
  <meta property="og:url" content="{escaped_canonical}">
  <meta property="og:image" content="{SITE_URL}/images/hero_payment.jpg">
  <meta property="og:locale" content="ja_JP">
  <meta name="twitter:card" content="summary_large_image">
  <link rel="icon" href="/images/favicon.png" type="image/png">
  <link rel="apple-touch-icon" href="/images/apple-touch-icon.png">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Noto+Sans+JP:wght@400;500;600;700;800&display=swap" rel="stylesheet">
  <script async src="https://www.googletagmanager.com/gtag/js?id=G-XCETDXT170"></script>
  <script>window.dataLayer=window.dataLayer||[];function gtag(){{dataLayer.push(arguments);}}gtag('js',new Date());gtag('config','G-XCETDXT170');</script>
  <script type="text/javascript">(function(c,l,a,r,i,t,y){{c[a]=c[a]||function(){{(c[a].q=c[a].q||[]).push(arguments)}};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);}})(window,document,"clarity","script","xirbqmt6z7");</script>
  <style>
    *,*::before,*::after{{box-sizing:border-box}}html{{scroll-behavior:smooth}}body{{margin:0;background:#f7f5ef;color:#111;font-family:'Noto Sans JP',sans-serif;line-height:1.85;overflow-x:hidden}}a{{color:inherit}}img{{max-width:100%;display:block}}.container{{width:min(1120px,calc(100% - 40px));margin:auto}}
    .site-header{{position:sticky;top:0;z-index:50;background:rgba(250,250,250,.94);backdrop-filter:blur(14px);border-bottom:1px solid #e5e1da}}.head{{height:76px;display:flex;align-items:center;justify-content:space-between;gap:24px}}.brand{{font-family:'Bebas Neue',sans-serif;font-size:22px;letter-spacing:.14em;text-decoration:none;white-space:nowrap}}.nav{{display:flex;align-items:center;gap:24px}}.nav a{{font-size:12px;font-weight:700;letter-spacing:.08em;text-decoration:none;color:#555}}.nav .line{{background:#06C755;color:#fff;padding:10px 15px;border-radius:4px}}.nav .line:hover{{background:#049c43}}.hamburger{{display:none;background:none;border:0;width:42px;height:42px;position:relative}}.hamburger span{{position:absolute;left:8px;right:8px;height:2px;background:#111}}.hamburger span:nth-child(1){{top:13px}}.hamburger span:nth-child(2){{top:20px}}.hamburger span:nth-child(3){{top:27px}}
    .mobile-menu{{position:fixed;inset:0;z-index:60;background:rgba(20,35,40,.25);backdrop-filter:blur(3px);opacity:0;visibility:hidden;pointer-events:none;transition:.25s}}.mobile-menu.open{{opacity:1;visibility:visible;pointer-events:auto}}.mobile-menu ul{{margin:0 0 0 auto;padding:104px 34px 40px;list-style:none;width:min(86vw,360px);height:100%;background:rgba(250,250,250,.98);box-shadow:-20px 0 40px rgba(0,0,0,.12);transform:translateX(100%);transition:.3s}}.mobile-menu.open ul{{transform:translateX(0)}}.mobile-menu li+li{{margin-top:22px}}.mobile-menu a{{display:block;text-decoration:none;font-weight:700;color:#111}}.mobile-menu .line{{background:#06C755;color:#fff;text-align:center;padding:14px 18px;border-radius:4px}}
    .hero{{padding:92px 0 58px;background:linear-gradient(135deg,#fff,#eef6ff 58%,#f7f5ef)}}.eyebrow{{margin:0 0 18px;color:#4a90d9;font-size:12px;font-weight:800;letter-spacing:.22em;text-transform:uppercase}}h1{{margin:0;color:#111;font-size:clamp(38px,7vw,80px);line-height:1.08;letter-spacing:-.03em;text-wrap:balance}}.hero p.lead{{max-width:760px;margin:24px 0 0;color:#555;font-size:clamp(15px,2vw,18px);font-weight:500}}.hero-actions{{display:flex;flex-wrap:wrap;gap:12px;margin-top:32px}}.btn{{display:inline-flex;align-items:center;justify-content:center;min-height:52px;padding:14px 22px;border:1px solid #111;text-decoration:none;font-size:13px;font-weight:800;letter-spacing:.04em}}.btn-primary{{background:#111;color:#fff}}.btn-line{{background:#06C755;border-color:#06C755;color:#fff}}.btn-line:hover{{background:#049c43;border-color:#049c43}}
    .section{{padding:82px 0}}.section.alt{{background:#fff}}.section-head{{display:flex;align-items:end;justify-content:space-between;gap:28px;margin-bottom:34px}}.section-title{{margin:0;font-size:clamp(28px,4vw,46px);line-height:1.25;text-wrap:balance}}.section-lead{{max-width:680px;margin:14px 0 0;color:#555;font-weight:500}}.column-grid{{display:grid;grid-template-columns:1fr;gap:16px}}.column-card{{background:#fff;border:1px solid #e5e1da;border-radius:16px;overflow:hidden;box-shadow:0 10px 26px rgba(0,0,0,.05);display:grid;grid-template-columns:minmax(210px,31%) 1fr;align-items:stretch}}.column-card img{{width:100%;height:100%;min-height:174px;max-height:220px;aspect-ratio:16/9;object-fit:contain;background:#f6f7f8;padding:10px}}.column-card-body{{padding:22px 26px;display:flex;flex-direction:column;gap:8px;flex:1}}.column-card time,.summary-date{{color:#4a90d9;font-size:11px;font-weight:800;letter-spacing:.08em}}.column-card h2{{margin:0;font-size:clamp(18px,2vw,24px);line-height:1.45;text-wrap:balance}}.column-card p{{margin:0;color:#555;font-size:13px;font-weight:500;line-height:1.85}}.read-more{{margin-top:auto;color:#1f6db4;font-size:14px;font-weight:800;text-decoration:none}}.note-link-box{{margin-top:38px;padding:26px;background:#eef8f2;border:1px solid #bce9c9;border-radius:16px;display:flex;align-items:center;justify-content:space-between;gap:18px}}.note-link-box p{{margin:0;color:#244b33;font-weight:700}}
    .summary{{max-width:880px;margin:auto}}.summary h1{{font-size:clamp(30px,5vw,54px);line-height:1.25;margin-top:12px}}.summary-image{{width:100%;aspect-ratio:16/9;object-fit:cover;border-radius:20px;margin:0 0 24px;background:#eef2f5}}.summary-box{{margin:28px 0;padding:28px;background:#fff;border-left:5px solid #4a90d9;border-radius:0 16px 16px 0;box-shadow:0 12px 30px rgba(0,0,0,.05)}}.summary-box p{{margin:0;color:#333;font-size:16px;font-weight:500}}.breadcrumb{{font-size:12px;color:#777;margin-bottom:28px}}.breadcrumb a{{color:#1f6db4;text-decoration:none}}
    .cta{{background:#111;color:#fff;text-align:center}}.cta .section-title{{color:#fff}}.cta p{{color:#ccc}}.footer{{padding:42px 0;background:#080808;color:#aaa}}.footer-inner{{display:flex;justify-content:space-between;gap:24px;align-items:flex-start}}.footer-brand{{font-family:'Bebas Neue',sans-serif;font-size:22px;letter-spacing:.14em;color:#fff}}.footer-links{{display:flex;flex-wrap:wrap;gap:10px 20px;margin-top:12px}}.footer-links a{{color:#bbb;font-size:12px;text-decoration:none}}.footer-meta{{font-size:11px;text-align:right;line-height:1.8}}
    .sticky-cta{{position:fixed;right:18px;bottom:18px;z-index:55;display:flex;gap:10px}}.sticky-cta a{{display:flex;align-items:center;justify-content:center;min-height:46px;padding:12px 16px;border-radius:6px;text-decoration:none;font-size:12px;font-weight:800;box-shadow:0 12px 24px rgba(0,0,0,.16)}}.sticky-cta .line{{background:#06C755;color:#fff}}.sticky-cta .form{{background:#111;color:#fff}}.floating-line-qr{{position:fixed;right:0;top:50%;z-index:56;width:132px;border-radius:14px 0 0 14px;background:#06C755;overflow:hidden;box-shadow:-10px 0 30px rgba(6,199,85,.28),-2px 0 8px rgba(0,0,0,.14);transform:translateX(calc(100% + 2px)) translateY(-50%);transition:transform .38s cubic-bezier(.4,0,.2,1)}}.floating-line-qr.is-visible{{transform:translateX(0) translateY(-50%)}}.floating-line-qr a{{display:flex;flex-direction:column;align-items:center;justify-content:center;gap:8px;padding:16px 12px 14px;color:#fff;text-decoration:none;font-size:14px;font-weight:900;line-height:1.45;text-align:center;word-break:keep-all}}.floating-line-qr img{{display:block;width:96px;height:96px;padding:5px;border-radius:8px;background:#fff;object-fit:contain;box-shadow:0 4px 12px rgba(0,0,0,.16)}}
    @media(max-width:900px){{.nav{{display:none}}.hamburger{{display:block}}.column-card{{grid-template-columns:1fr}}.column-card img{{height:auto;min-height:0}}.section-head{{display:block}}.footer-inner{{display:block}}.footer-meta{{text-align:left;margin-top:24px}}}}
    @media(max-width:640px){{.container{{width:calc(100% - 32px)}}.head{{height:68px}}.hero{{padding:64px 0 44px}}.hero-actions{{display:grid;grid-template-columns:1fr}}.btn{{width:100%}}.section{{padding:62px 0}}.column-grid{{gap:16px}}.column-card img{{max-height:none}}.column-card-body{{padding:18px}}.column-card h2{{font-size:19px}}.column-card p{{font-size:13px}}.note-link-box{{display:block}}.note-link-box .btn{{margin-top:16px}}.floating-line-qr{{display:none}}.sticky-cta{{left:0;right:0;bottom:0;gap:0}}.sticky-cta a{{flex:1;border-radius:0;min-height:54px}}body{{padding-bottom:54px}}}}
  </style>
</head>
<body>
{body}
  <div class="floating-line-qr" id="floating-line-qr" aria-hidden="true"><a href="{LINE_URL}" target="_blank" rel="noopener" aria-label="LINEで無料相談"><span>LINEで<br>無料相談</span><img src="/images/LINE_QRcode.png" alt="LINEで無料相談するQRコード" loading="lazy"></a></div>
  <script>(function(){{var el=document.getElementById('floating-line-qr');if(!el)return;var shown=false;function tick(){{var s=window.scrollY>380;if(s===shown)return;shown=s;el.classList.toggle('is-visible',s);el.setAttribute('aria-hidden',String(!s));}}window.addEventListener('scroll',tick,{{passive:true}});tick();}})();</script>
</body>
</html>
"""


def site_header() -> str:
    return f"""  <header class="site-header">
    <div class="container head">
      <a class="brand" href="/">PUNCHLINE TOKYO</a>
      <nav class="nav" aria-label="グローバルナビゲーション">
        <a href="/">TOP</a>
        <a href="/cashless/">CASHLESS</a>
        <a href="/cashless/zentoshin-switch/">全東信切替相談</a>
        <a href="/column/">COLUMN</a>
        <a href="/contact/">CONTACT</a>
        <a class="line" href="{LINE_URL}" target="_blank" rel="noopener">LINE相談</a>
      </nav>
      <button class="hamburger" id="hamburger" aria-label="メニューを開く" aria-expanded="false" aria-controls="mobile-menu"><span></span><span></span><span></span></button>
    </div>
  </header>
  <nav class="mobile-menu" id="mobile-menu" aria-label="モバイルメニュー" aria-hidden="true">
    <ul>
      <li><a href="/">TOP</a></li>
      <li><a href="/cashless/">キャッシュレス総合</a></li>
      <li><a href="/cashless/zentoshin-switch/">全東信切替相談</a></li>
      <li><a href="/column/">コラム</a></li>
      <li><a href="/contact/">お問い合わせ</a></li>
      <li><a class="line" href="{LINE_URL}" target="_blank" rel="noopener">LINEで無料相談</a></li>
    </ul>
  </nav>"""


def site_footer() -> str:
    return f"""  <footer class="footer">
    <div class="container footer-inner">
      <div>
        <div class="footer-brand">PUNCHLINE TOKYO</div>
        <nav class="footer-links" aria-label="フッターナビ">
          <a href="/">会社TOP</a>
          <a href="/cashless/">キャッシュレス</a>
          <a href="/cashless/zentoshin-switch/">全東信切替相談</a>
          <a href="/column/">コラム</a>
          <a href="/contact/">お問い合わせ</a>
        </nav>
      </div>
      <div class="footer-meta">株式会社PUNCHLINE TOKYO<br>EPARKフィナンシャルパートナーズ公式代理店<br>© 2026 PUNCHLINE TOKYO</div>
    </div>
  </footer>
  <div class="sticky-cta" aria-label="固定相談ボタン">
    <a class="line" href="{LINE_URL}" target="_blank" rel="noopener">LINEで無料相談</a>
    <a class="form" href="/contact/">フォーム相談</a>
  </div>
  <script>
    const hamburger = document.getElementById('hamburger');
    const mobileMenu = document.getElementById('mobile-menu');
    if (hamburger && mobileMenu) {{
      hamburger.addEventListener('click', () => {{
        const open = mobileMenu.classList.toggle('open');
        hamburger.setAttribute('aria-expanded', String(open));
        mobileMenu.setAttribute('aria-hidden', String(!open));
      }});
      mobileMenu.addEventListener('click', (event) => {{
        if (event.target === mobileMenu || event.target.closest('a')) {{
          mobileMenu.classList.remove('open');
          hamburger.setAttribute('aria-expanded', 'false');
          mobileMenu.setAttribute('aria-hidden', 'true');
        }}
      }});
    }}
    document.addEventListener('click', function(e) {{
      var a = e.target.closest('a');
      if (!a) return;
      var h = a.getAttribute('href') || '';
      var m = h.indexOf('lin.ee') > -1 ? 'line' : h.indexOf('/contact/') === 0 ? 'form' : null;
      if (m && typeof gtag === 'function') gtag('event', 'contact_intent', {{ method: m, page_path: location.pathname }});
    }});
  </script>"""


def article_schema(post: NotePost) -> str:
    data = {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        "headline": post.title,
        "description": post.excerpt,
        "datePublished": post.published_iso,
        "dateModified": post.published_iso,
        "mainEntityOfPage": post.url,
        "url": post.url,
        "author": {"@type": "Organization", "name": SITE_NAME, "url": SITE_URL},
        "publisher": {"@type": "Organization", "name": SITE_NAME, "url": SITE_URL},
    }
    if post.thumbnail:
        data["image"] = post.thumbnail
    return f'<script type="application/ld+json">{json.dumps(data, ensure_ascii=False)}</script>'


def render_index(posts: Iterable[NotePost]) -> str:
    cards = []
    for post in posts:
        image = (
            f'<img src="{html.escape(post.thumbnail)}" alt="{html.escape(post.title)}" loading="lazy">'
            if post.thumbnail
            else ""
        )
        cards.append(
            f"""          <article class="column-card">
            {image}
            <div class="column-card-body">
              <time datetime="{html.escape(post.published_iso)}">{html.escape(post.published)}</time>
              <h2>{html.escape(post.title)}</h2>
              <p>{html.escape(post.excerpt)}</p>
              <a class="read-more" href="/column/{html.escape(post.slug)}/">要約を読む →</a>
            </div>
          </article>"""
        )

    body = f"""{site_header()}
  <main>
    <section class="hero">
      <div class="container">
        <p class="eyebrow">PUNCHLINE TOKYO COLUMN</p>
        <h1>店舗経営と集客に効く、<br>実務目線のコラム。</h1>
        <p class="lead">PUNCHLINE TOKYOがnoteで発信している、キャッシュレス決済・店舗運営・Webマーケティングに関する記事を要約して掲載しています。全文はnoteでご確認いただけます。</p>
        <div class="hero-actions">
          <a class="btn btn-line" href="{LINE_URL}" target="_blank" rel="noopener">LINEで無料相談</a>
          <a class="btn" href="{NOTE_TOP_URL}" target="_blank" rel="noopener">noteを見る →</a>
        </div>
      </div>
    </section>
    <section class="section">
      <div class="container">
        <div class="section-head">
          <div>
            <p class="eyebrow">Latest Articles</p>
            <h2 class="section-title">最新コラム</h2>
          </div>
        </div>
        <div class="column-grid">
{chr(10).join(cards)}
        </div>
        <div class="note-link-box">
          <p>すべての記事本文はnoteで公開しています。</p>
          <a class="btn btn-primary" href="{NOTE_TOP_URL}" target="_blank" rel="noopener">PUNCHLINE TOKYOのnoteへ →</a>
        </div>
      </div>
    </section>
    <section class="section cta">
      <div class="container">
        <p class="eyebrow">Free Consultation</p>
        <h2 class="section-title">キャッシュレス導入や切替、<br>まずは無料で相談できます。</h2>
        <p class="section-lead" style="margin-left:auto;margin-right:auto">業種・現在の決済状況・希望条件をお聞きしたうえで、ご案内可能な内容を整理します。</p>
        <div class="hero-actions" style="justify-content:center">
          <a class="btn btn-line" href="{LINE_URL}" target="_blank" rel="noopener">LINEで無料相談</a>
          <a class="btn" href="/contact/" style="color:#fff;border-color:#777">フォームで相談</a>
        </div>
      </div>
    </section>
  </main>
{site_footer()}"""
    return page_shell(
        f"{COLUMN_TITLE}｜{SITE_NAME}",
        "PUNCHLINE TOKYOがnoteで発信しているキャッシュレス決済・店舗運営・Webマーケティングに関するコラムの要約一覧です。",
        body,
        f"{SITE_URL}/column/",
    )


def render_summary(post: NotePost) -> str:
    image = (
        f'<img class="summary-image" src="{html.escape(post.thumbnail)}" alt="{html.escape(post.title)}" loading="lazy">'
        if post.thumbnail
        else ""
    )
    body = f"""{site_header()}
  <main>
    <section class="hero">
      <div class="container summary">
        <div class="breadcrumb"><a href="/">ホーム</a> / <a href="/column/">コラム</a> / note要約</div>
        <p class="eyebrow">NOTE SUMMARY</p>
        <time class="summary-date" datetime="{html.escape(post.published_iso)}">{html.escape(post.published)}</time>
        <h1>{html.escape(post.title)}</h1>
      </div>
    </section>
    <section class="section alt">
      <div class="container summary">
        {image}
        <div class="summary-box">
          <p>{html.escape(post.excerpt)}</p>
        </div>
        <p>この記事の全文はnoteで公開しています。詳しい内容は以下のリンクからお読みください。</p>
        <div class="hero-actions">
          <a class="btn btn-primary" href="{html.escape(post.url)}" target="_blank" rel="noopener">noteで全文を読む →</a>
          <a class="btn btn-line" href="{LINE_URL}" target="_blank" rel="noopener">LINEで無料相談</a>
        </div>
      </div>
    </section>
  </main>
{site_footer()}
{article_schema(post)}"""
    return page_shell(
        f"{post.title}｜{SITE_NAME}",
        post.excerpt,
        body,
        post.url,
        og_type="article",
        robots="noindex, follow",
    )


def write_outputs(root: Path, posts: list[NotePost]) -> None:
    data_dir = root / "data"
    column_dir = root / "column"
    data_dir.mkdir(exist_ok=True)
    column_dir.mkdir(exist_ok=True)

    (data_dir / "note-posts.json").write_text(
        json.dumps([asdict(post) for post in posts], ensure_ascii=False, indent=2) + "\n",
        encoding="utf-8",
    )
    (column_dir / "index.html").write_text(render_index(posts), encoding="utf-8")

    for post in posts:
        post_dir = column_dir / post.slug
        post_dir.mkdir(exist_ok=True)
        (post_dir / "index.html").write_text(render_summary(post), encoding="utf-8")


def update_sitemap(root: Path) -> None:
    sitemap = root / "sitemap.xml"
    if not sitemap.exists():
        return
    content = sitemap.read_text(encoding="utf-8")
    today = datetime.now().date().isoformat()
    if f"{SITE_URL}/column/" not in content:
        entry = f"""  <url><loc>{SITE_URL}/column/</loc><lastmod>{today}</lastmod><changefreq>daily</changefreq><priority>0.7</priority></url>
"""
        content = content.replace("</urlset>", entry + "</urlset>")
    sitemap.write_text(content, encoding="utf-8")


def main() -> int:
    root = Path(sys.argv[1]).resolve() if len(sys.argv) > 1 else Path.cwd()
    posts = parse_posts(fetch_rss(NOTE_RSS_URL))
    if not posts:
        print("No note posts found.", file=sys.stderr)
        return 1
    write_outputs(root, posts)
    update_sitemap(root)
    print(f"Generated {len(posts)} note column entries in {root}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
