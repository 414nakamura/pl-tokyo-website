# 画像と表示の仕上げ（2026-10-17）

## 作成した画像

既存の17枚を維持し、不足3枚と新しいHero写真を組み込んだ。生成には組み込みの image_gen ツールを使用した。

| 元画像（images-src/） | 公開用画像（public/） |
|---|---|
| cat-emergency.png | images/categories/cat-emergency.webp |
| scene-daily-refill.png | images/scenes/scene-daily-refill.webp |
| scene-emergency.png | images/scenes/scene-emergency.webp |
| hero-shopping-v2.png | images/hero/hero-shopping-v2.webp / hero-shopping-v2-800.webp |

元PNGはimages-srcに保存済み（リポジトリ既存のgitignore対象）。公開用WebPは追跡対象。旧バナーは保存し、設定の参照先だけ変更した。

HeroのコピーとCTAは画像から分離してHTMLで表示。写真自体はリンクにせず、明示的なAmazonリンクとページ内スクロールCTAを設けた。OGPは public/og/shopping-guide-v2.png。OGP生成スクリプトもサイトと同じLINE Seed JPを使用する。

## 使用プロンプト

以下の共通指定をカテゴリ・シーンの各プロンプトの先頭に追加した。

```text
Use case: photorealistic-natural. Editorial photograph for Japanese shopping guide 買い忘れCHECK. Japanese home, warm off-white walls, light oak, soft natural window light, muted colors, subtle 35mm film texture, believable slightly informal arrangement. No people, hands, text, logos, trademarks, arrows, printed labels or watermarks. All packaging blank. Match calm household lifestyle photography.
```

### cat-emergency
```text
Square 1:1. Close still life on the floor of an open closet: plain muted sage emergency backpack, two clear unlabeled 2L water bottles, two plain metal tins, compact LED lantern and small white power bank. Objects large and clearly identifiable in center, oak floor and cream wall.
```

### scene-daily-refill
```text
Landscape 3:2. Open bathroom storage cabinet in a modest Japanese home. Nearly empty light oak shelf, exactly one remaining toilet paper roll and one plain pale green detergent refill pouch, with a folded cream towel on the lower shelf. Ample visible shelf space makes replenishment feel timely. Gentle side window light, eye-level medium shot.
```

### scene-emergency
```text
Landscape 3:2. Emergency kit being checked beside an open closet on oak floor: plain olive backpack open, a cardboard tray of clear unlabeled water bottles, three plain tins, compact LED lantern and white power bank naturally arranged beside it. Wider home context, soft calm daylight. No people.
```

### hero-shopping-v2（独立したプロンプト）
```text
Use case: photorealistic-natural. Website hero background photograph for Japanese household shopping guide. Landscape wide 16:9, high quality editorial natural light, subtle film grain. Bright Japanese home with cream plaster wall and light oak floor, soft daylight. Composition: left 45 percent mostly quiet plain cream wall and floor as space for HTML headline overlay, subjects grouped naturally in the right 55 percent. On right: small open blank cardboard delivery box containing blank pale sage detergent refill pouch and white tissue box; beside it two unlabeled water bottles, three toilet paper rolls, folded oatmeal cotton towels, a small matte white humidifier in background. Believable home scale, slightly informal arrangement, muted colors, sharp realistic texture without glossy CG. No text whatsoever, no logos, no brands, no smile symbols, no arrows, no people or hands, no borders, no collage, no UI, no buttons.
```

## 検証

- npm run images：4枚から5つのWebPを生成（HeroはPC用とモバイル用）
- npm run typecheck：成功
- npm run check:data：エラー0、設定されたカテゴリ・シーン画像の欠損0
- npm run build：17ページの静的生成に成功
- 360 / 390 / 430 / 1440px幅：ページの横はみ出しなし
- 防災カテゴリの選択・閉じる、Amazonリンクへのtag付与を確認

商品マスターには32件のサンプルが残っている。実商品への置換か、検索結果へ案内する買い物候補としての運用かは依頼者に確認中。並行して行われたナビ・商品マスターの編集は保持。本番mainへのpushは未実施。
