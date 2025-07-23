# Next.js (SSR) 專案

從原本 Vite SPA 架構升級為 Next.js SSR 架構，以解決 SEO 無法索引與 assets 檔案爆炸等問題。此專案具備更好的效能、SEO 支援與維護彈性。

---

## 使用技術

- [Next.js 14+](https://nextjs.org/)
- SCSS Modules
- React Context
- App Router
- Metadata API（取代 react-helmet-async）
- Favicon 支援（放於 `/public`）
- Vercel / Docker 可部署

---

## 開發與啟動

```bash
# 安裝依賴
npm install

# 本地開發模式
npm run dev

# 正式建置
npm run build
npm run start

---
