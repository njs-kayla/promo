const fs = require("fs");
const path = require("path");

const TEMPLATE_DIR = path.resolve(__dirname, "../app/template");
const PUBLIC_TEMPLATE_DIR = path.resolve(__dirname, "../public/template");

// 只刪除 public/template/{theme} 中有對應 template 的資料夾
function cleanMatchingTemplates(themeNames) {
  if (!fs.existsSync(PUBLIC_TEMPLATE_DIR)) return;

  for (const theme of themeNames) {
    const themePath = path.join(PUBLIC_TEMPLATE_DIR, theme);
    if (fs.existsSync(themePath)) {
      fs.rmSync(themePath, { recursive: true, force: true });
      console.log(`🧹 Deleted existing folder: /public/template/${theme}`);
    }
  }
}

// 遞迴複製整個資料夾
function copyDir(src, dest) {
  if (!fs.existsSync(src)) return;
  if (!fs.existsSync(dest)) fs.mkdirSync(dest, { recursive: true });

  const entries = fs.readdirSync(src, { withFileTypes: true });

  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    if (entry.isDirectory()) {
      copyDir(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

// 複製 assets/images 到 public/template/{theme}/
function copyImagesOnly(themeName) {
  const srcImages = path.join(TEMPLATE_DIR, themeName, "assets", "images");
  const destFolder = path.join(PUBLIC_TEMPLATE_DIR, themeName);

  if (!fs.existsSync(srcImages)) return;

  copyDir(srcImages, destFolder);
  console.log(`✅ Copied images for ${themeName}`);
}

// 執行流程
function run() {
  const themes = fs.readdirSync(TEMPLATE_DIR).filter((name) =>
    fs.statSync(path.join(TEMPLATE_DIR, name)).isDirectory()
  );

  cleanMatchingTemplates(themes);

  for (const theme of themes) {
    copyImagesOnly(theme);
  }
}

run();