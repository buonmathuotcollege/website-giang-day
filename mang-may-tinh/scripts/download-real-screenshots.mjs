import fs from "fs";
import path from "path";
import https from "https";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const targetDir = path.resolve(__dirname, "../public/images/chia-se-file");
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

// 5 ảnh chụp màn hình thực tế Windows 10 từ các chuyên trang công nghệ uy tín
const realScreenshots = [
  {
    fileName: "step-1-private-network.webp",
    url: "https://i0.wp.com/pureinfotech.com/wp-content/uploads/2022/01/windows-11-change-network-private-public-hero.webp",
    stepName: "Bước 1: Chuyển Network Profile sang Private",
  },
  {
    fileName: "step-2-advanced-sharing.jpg",
    url: "https://i0.wp.com/pureinfotech.com/wp-content/uploads/2017/01/change-advanced-sharing-settings.jpg",
    stepName: "Bước 2: Bật Network Discovery & File Sharing",
  },
  {
    fileName: "step-3-sharing-permissions.webp",
    url: "https://i0.wp.com/pureinfotech.com/wp-content/uploads/2022/03/share-folder-permissions-settings.webp",
    stepName: "Bước 3: Phân quyền Everyone Full Control ở tab Sharing",
  },
  {
    fileName: "step-4-security-tab-ntfs.webp",
    url: "https://i0.wp.com/pureinfotech.com/wp-content/uploads/2022/03/set-security-folder-permissions-win11.webp",
    stepName: "Bước 4: Cấp quyền Everyone ở tab Security (NTFS)",
  },
  {
    fileName: "step-5-access-shared-folder.jpg",
    url: "https://i0.wp.com/pureinfotech.com/wp-content/uploads/2017/01/share-network-folder-path.jpg",
    stepName: "Bước 5: Truy cập thư mục chia sẻ qua đường dẫn mạng \\\\IP",
  },
];

function downloadFile(url, destPath) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(destPath);
    const options = {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
      },
    };

    https
      .get(url, options, (res) => {
        if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
          downloadFile(res.headers.location, destPath).then(resolve).catch(reject);
          return;
        }

        if (res.statusCode !== 200) {
          reject(new Error(`Tải thất bại với HTTP ${res.statusCode}: ${url}`));
          return;
        }

        res.pipe(file);
        file.on("finish", () => {
          file.close(resolve);
        });
      })
      .on("error", (err) => {
        fs.unlink(destPath, () => {});
        reject(err);
      });
  });
}

async function main() {
  console.log("Bắt đầu tải 5 ảnh chụp màn hình thực tế từ web lưu vào: " + targetDir);

  for (const item of realScreenshots) {
    const dest = path.join(targetDir, item.fileName);
    try {
      console.log(`Đang tải [${item.stepName}] từ: ${item.url}...`);
      await downloadFile(item.url, dest);
      const stat = fs.statSync(dest);
      console.log(`✓ Thành công: ${item.fileName} (${(stat.size / 1024).toFixed(1)} KB)`);
    } catch (err) {
      console.error(`✗ Lỗi tải ${item.fileName}:`, err.message);
    }
  }

  console.log("\nHoàn tất tải ảnh thực tế!");
}

main();
