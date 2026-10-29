# 暖星谷夢遊記 — 香港網站原型 (Version A + Version C 影像層)

**版本**：Version A 結構 + Version C 影像方向
**Built**：2026-10-29 · Migather
**來源**：`site/`（Version A 原始碼）＋ `AstryValley_BossPresentation_20261028/build/assets/wanan-*.jpg`（8 張生成的晚安羊影像）

---

## 這是甚麼

客戶討論後的決定：**保留 Version A 的版面與文案，把影像層換成 Version C 的陪伴感攝影**。
網站結構、IA、文案、價錢、對比表、合規區塊、發售日曆全部照舊 —— 只有圖片換了。

## ⚠️ 這些照片不是實拍

晚安羊**從來沒有被拍攝過**。網站上每一張陪伴照片都是我們用客戶自己的角色 artwork
生成的概念合成（MOOD COMP），用途是**在正式拍攝前先定調視覺方向**。

- 頁面上已保留 `概念合成影像 MOOD COMP` 標示 —— 不要拿掉
- 正式拍攝待客戶確認（拍攝 brief 見簡報第 22 頁）
- 這批影像**不可**當成產品實拍對外發布

## 影像對照表

| 位置 | 檔案 | 內容 |
| --- | --- | --- |
| hero-desktop | `vc-hero.jpg` | 首頁 hero — 爸爸媽媽 + 小朋友 + 晚安羊 · 人物在右，文案在左 |
| hero-mobile | `vc-hero-mobile.jpg` | 手機首頁 hero — 同一場景的直幅裁切 |
| mood-band | `vc-mood-touch.jpg` | 情緒帶 — 手放在臉上 · 對應「觸碰身體就開始講睡前故事」 |
| character | `vc-char-eyelevel.jpg` | 角色區 — 媽媽湊近，牠也在看你 |
| store-hero | `vc-store-hug.jpg` | 門市頁 — 小朋友抱住它 · 對應「先摸一摸，再決定帶走誰」 |
| pdp-eyelevel | `vc-pdp-eyelevel.jpg` | 商品頁圖庫 · 平視對望 |
| pdp-bedtime | `vc-pdp-bedtime.jpg` | 商品頁圖庫 · 睡著了，它在旁邊 |
| pdp-hug | `vc-pdp-hug.jpg` | 商品頁圖庫 · 抱住 |
| pdp-reading | `vc-pdp-reading.jpg` | 商品頁圖庫 · 一起看書 |
| pdp-room | `vc-pdp-room.jpg` | 商品頁圖庫 · 在家 |

`assets/img/vc-hero-mobile.jpg` 是由 `wanan-07-family.jpg` 裁切出的 9:16 直幅，
因為桌機首頁是橫幅構圖，手機要另一個裁切。

商品頁圖庫的方形縮圖用 `object-fit:cover` 裁切，每張的焦點已逐一對過
（`object-position` 寫在 HTML 的 inline style）。

## 刻意沒有換掉的圖

| 位置 | 原因 |
| --- | --- |
| 暖星谷世界插畫（`world-01..06`） | 客戶 IP 現有插畫素材，Version C 沒有要求換；而且這是「暖星谷世界」的敘事 |
| 限定造型（`season-01..07`、`kv-night`） | 換裝是產品資料，攝影不能代替造型圖；拍攝 brief 已寫明要補四季造型 |
| 產品本體照（`pdp-sheep-main`、`pdp-colourways`） | 商品頁要買家看得到產品本身 |
| 首頁零售情境圖（`mood-retail`） | 這張要表達「店裡有真的晚安羊」，家居照片說不出這件事 |

門市頁原本的 `ref-store-demo.jpg`（店內情境合成）已被陪伴照取代 ——
因為「先摸一摸，再決定帶走誰」這句話要的是一個人抱著它，不是空櫃。

## 已移除

內部版本切換器（Version A / B 比較 bar）已整段移除，因為這個原型只有一個版本。
連帶把 `.page-home .chrome` 的 `top` 與 `scroll-padding-top` 的位移還原。

## 順手修好的 Version A 缺陷

樣式表有 `img` 的 reset，但漏了 `figure`，所以瀏覽器預設的
`figure { margin: 1em 40px }` 仍在生效。`.store-hero-fig` 同時寫了 `width:100%`，
那 40px 的左邊距就把整張圖推出格線 —— 門市頁在 390px 手機上會橫向捲動 22px。

已加 `margin-inline:0` 修好。**這是 Version A 原有的問題，不是換圖造成**：
在未改動的 A 版上量到一模一樣的數值。

同一時間補了 `favicon.ico`（瀏覽器每次都會請求，沒有就會在 console 留 404）。

## 從這個原型移除的檔案（已 prune）

- `assets/img/flag-01.jpg`
- `assets/img/flag-02.jpg`
- `assets/img/flag-04.jpg`
- `assets/img/flag-05.jpg`
- `assets/img/hero-hand.jpg`
- `assets/img/hero-main.jpg`
- `assets/img/hero-mobile.jpg`
- `assets/img/hero-room.jpg`
- `assets/img/hero-sheep-frog.jpg`
- `assets/img/hero-sofa.jpg`
- `assets/img/mood-companion-home.jpg`
- `assets/img/mood-embrace.jpg`
- `assets/img/mood-product-set.jpg`
- `assets/img/mood-wardrobe.jpg`
- `assets/img/pdp-plush-bed.jpg`
- `assets/img/pdp-plush-hand.jpg`
- `assets/img/pdp-plush-sofa.jpg`
- `assets/img/ref-colourways.jpg`
- `assets/img/ref-furpack.jpg`
- `assets/img/ref-store-demo.jpg`
- `assets/img/season-02.jpg`
- `assets/img/season-08.jpg`

原始檔案仍在 `OUTDATED/AstryValley_HKWebsite_Draft_20261027/site/assets/img/`，沒有刪。

## 仍然待確認（網站上以「待定／待確認」顯示）

- 首發日期 · 售價 · SKU 組合 · 充電規格
- 英文名 `Goodnight Sheep` 待 IP 方確認
- 對比表的「無螢幕」「雙向對話」待技術確認
- 香港營運主體 · 客服聯絡資料 · App 上架時間
- 零售渠道合作狀態

完整待確認清單見 `OUTDATED/AstryValley_HKWebsite_Draft_20261027/PLACEHOLDER_REGISTER.md`。

## 已知弱點

1. **手機首頁 hero 清晰度不足** —— 由 1500px 橫幅裁切放大，實際細節只有約 586px 寬。
   正式拍攝必須原生直幅高檔（建議 ≥ 1200×2133）。
2. **桌機首頁 hero 只有 1500px 寬**，舊版是 2400px。在 2560 螢幕上會偏軟。
3. 全部陪伴照片都是橫幅 3:2，與舊版直幅素材的構圖習慣不同，排版要重新調。
4. 沒有真實的零售門市照片、沒有限定造型的實拍。

## 線上位置

**https://oneup24.github.io/migather-astryai/**

Repo：`git@github.com:oneup24/migather-astryai.git` · branch `main` · GitHub Pages 由根目錄發佈（`.nojekyll` 已加）。

## 再更新呢個網站

本機工作副本：`AstryValley_HKWebsite_Prototype_20261029_repo/`

```bash
cd AstryValley_HKWebsite_Prototype_20261029_repo
# 改完檔案之後
git add -A
git commit -m "描述今次改咗咩"
git push origin main
```

GitHub Pages 會自動重新發佈，通常幾分鐘內。唔使再撳 Settings。

由源碼重建呢個資料夾：

```bash
python3 OUTDATED/AstryValley_HKWebsite_Draft_20261027/build_prototype_vc.py
```

這是**原型**，不是正式網站：正式上線前要換掉 `assets/img/vc-*.jpg` 這些
概念合成影像、補上商品頁數據、接 Shopify、移除所有 `data-ph` 待確認標記。

## 重新生成

```bash
python3 build_prototype_vc.py
```

（在 `OUTDATED/AstryValley_HKWebsite_Draft_20261027/` 內執行。腳本每次都會重建整個資料夾。）
