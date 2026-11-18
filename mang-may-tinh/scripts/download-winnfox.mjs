import fs from "fs";
import path from "path";

async function downloadWinnfox() {
  const urls = [
    "https://daitailoc.com/assets/NEW/MAIN/H%20-SERIES/Winnfox/H510/mainboard-Winnfox-H510.jpg",
    "https://daitailoc.com/assets/NEW/MAIN/H%20-SERIES/Winnfox/H510/mainboard-Winnfox-H510-1.jpg"
  ];

  for (const url of urls) {
    console.log("Trying URL:", url);
    try {
      const res = await fetch(url, {
        headers: {
          "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
          "Referer": "https://daitailoc.com/"
        }
      });
      console.log("Status:", res.status, "Content-Type:", res.headers.get("content-type"));
      if (res.ok) {
        const buffer = Buffer.from(await res.arrayBuffer());
        if (buffer.length > 5000) {
          const dest1 = path.resolve("mang-may-tinh/public/images/ol-01/main-winnfox-h510.jpg");
          const dest2 = path.resolve("public/images/ol-01/main-winnfox-h510.jpg");
          fs.writeFileSync(dest1, buffer);
          fs.writeFileSync(dest2, buffer);
          console.log(`Successfully saved Winnfox H510 image (${buffer.length} bytes)!`);
          return;
        }
      }
    } catch (err) {
      console.error("Error for", url, err.message);
    }
  }
}

downloadWinnfox();
