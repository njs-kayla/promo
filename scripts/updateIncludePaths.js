// scripts/updateIncludePaths.js
const fs = require('fs');
const path = require('path');

const baseDir = path.resolve(__dirname, '..');
const templateDir = path.resolve(__dirname, '../app/template');
const nextConfigPath = path.join(baseDir, 'next.config.js');

// 1. 找出所有符合 SO- / SP- 的資料夾，且有 assets 子資料夾
const templateDirs = fs.readdirSync(templateDir).filter((dir) => {
  const fullPath = path.join(templateDir, dir);
  return (
    fs.statSync(fullPath).isDirectory() &&
    fs.existsSync(path.join(fullPath, 'assets'))
  );
});

// 2. 轉換為 path.resolve(__dirname, 'xxx/assets')
const includePaths = templateDirs
  .map((dir) => `path.resolve(__dirname, '${dir}/assets')`)
  .join(',\n        ');

// 3. 讀取 next.config.js 檔案
let content = fs.readFileSync(nextConfigPath, 'utf-8');

// 4. 用正規表示式取代舊的 include 區塊
const updatedContent = content.replace(
  /include:\s*\[(.|\s)*?\]/,
  `include: [\n        ${includePaths}\n      ]`
);

// 5. 寫回檔案
fs.writeFileSync(nextConfigPath, updatedContent, 'utf-8');

console.log('✅ next.config.js 已自動更新 include assets 路徑！');
console.log('\n🧾 更新後 include assets 路徑：\n');

includePaths
  .split(',\n        ')
  .forEach((p) => console.log('  ' + p));

console.log('\n🎉 next.config.js 更新完成！');


