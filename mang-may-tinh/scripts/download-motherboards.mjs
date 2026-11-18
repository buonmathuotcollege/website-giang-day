import fs from "fs";
import path from "path";

async function download() {
  const asusUrl = "https://dlcdnwebimgs.asus.com/gain/ea007876-939f-40e6-a1ce-f0e29263107c/w800";
  console.log("Downloading ASUS PRIME H510M-K image from:", asusUrl);

  try {
    const res = await fetch(asusUrl, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
      }
    });

    if (res.ok) {
      const arrayBuffer = await res.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      const dest1 = path.resolve("mang-may-tinh/public/images/ol-01/main-asus-h510.jpg");
      const dest2 = path.resolve("public/images/ol-01/main-asus-h510.jpg");
      fs.writeFileSync(dest1, buffer);
      fs.writeFileSync(dest2, buffer);
      console.log(`Saved ASUS image (${buffer.length} bytes) to ${dest1} and ${dest2}`);
    } else {
      console.error("Failed to download ASUS image, status:", res.status);
    }
  } catch (err) {
    console.error("Download error:", err);
  }
}

download();
