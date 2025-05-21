const fs = require("fs");
const path = require("path");

function removeMapFiles(directory) {
  const files = fs.readdirSync(directory);

  for (const file of files) {
    const filePath = path.join(directory, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      removeMapFiles(filePath);
    } else if (file.endsWith(".map")) {
      console.log(`Removing source map: ${filePath}`);
      fs.unlinkSync(filePath);
    }
  }
}

// 刪除 dist 目錄中的所有 .map 檔案
removeMapFiles("./dist");
console.log("All source maps removed successfully!");
