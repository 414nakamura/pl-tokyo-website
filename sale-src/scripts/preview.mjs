// 本番と同じ「/sale/ 配下」で静的サイトを確認するためのローカルサーバー
//   npm run preview  →  http://localhost:3000/sale/
import { cpSync, existsSync, mkdirSync, readFileSync, rmSync, statSync } from "node:fs";
import { createServer } from "node:http";
import { extname, join, normalize } from "node:path";

const base = process.env.NEXT_PUBLIC_BASE_PATH ?? "/sale";
const root = "out-preview";
rmSync(root, { recursive: true, force: true });
mkdirSync(join(root, base), { recursive: true });
cpSync("out", join(root, base), { recursive: true });

const types = {
  ".html": "text/html; charset=utf-8", ".js": "text/javascript", ".css": "text/css", ".svg": "image/svg+xml",
  ".png": "image/png", ".jpg": "image/jpeg", ".webp": "image/webp", ".json": "application/json",
  ".xml": "application/xml", ".txt": "text/plain; charset=utf-8", ".ico": "image/x-icon", ".woff2": "font/woff2",
};

const port = Number(process.env.PORT ?? 3000);
createServer((req, res) => {
  const url = new URL(req.url ?? "/", "http://localhost");
  let p = normalize(decodeURIComponent(url.pathname)).replace(/^(\.\.[/\\])+/, "");
  if (p === "/") {
    res.writeHead(200, { "content-type": "text/html; charset=utf-8" });
    return res.end(`<p>（ここは既存の企業サイト <code>/</code> の位置です）</p><p><a href="${base}/">${base}/ を開く</a></p>`);
  }
  let file = join(root, p);
  if (existsSync(file) && statSync(file).isDirectory()) file = join(file, "index.html");
  if (!existsSync(file)) {
    res.writeHead(404, { "content-type": "text/html; charset=utf-8" });
    const nf = join(root, base, "404.html");
    return res.end(existsSync(nf) ? readFileSync(nf) : "404");
  }
  res.writeHead(200, { "content-type": types[extname(file)] ?? "application/octet-stream" });
  res.end(readFileSync(file));
}).listen(port, () => console.log(`Preview: http://localhost:${port}${base}/`));
