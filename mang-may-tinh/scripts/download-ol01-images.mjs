import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const TARGET_DIRS = [
  path.resolve('mang-may-tinh/public/images/ol-01'),
  path.resolve('public/images/ol-01')
];

for (const dir of TARGET_DIRS) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

const IMAGES = [
  {
    name: 'main-h510.jpg',
    url: 'https://storage-asset.msi.com/global/picture/image/feature/mb/H510M-A-RRO/h510m-a-pro-hero.png',
    maxWidth: 1600,
    background: '#ffffff',
    description: 'Mainboard MSI H510M-A PRO (Socket LGA1200, 2 khe RAM DDR4, Khe PCIe 3.0/4.0 x16, Cổng SATA III)'
  },
  {
    name: 'ram-ddr4.jpg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/3/39/DDR4_DIMM_4GB_-2133_IMGP5813_smial_wp.jpg',
    maxWidth: 1600,
    background: '#ffffff',
    description: 'Thanh RAM DDR4 chân mạ vàng, khe khuyết lệch chuẩn DDR4 (Bus 2666/3200MHz)'
  },
  {
    name: 'vga-gt730.jpg',
    url: 'https://storage-asset.msi.com/global/picture/product/five_pictures1_3494_20150629162400559100a05d734.webp',
    maxWidth: 1600,
    background: '#ffffff',
    description: 'Card màn hình rời NVIDIA GeForce GT 730 2GB GDDR5 chân cắm PCIe x16'
  }
];

async function downloadAndProcess() {
  console.log('--- BẮT ĐẦU TẢI & CHUẨN HÓA HÌNH ẢNH CẤU HÌNH H510 PHÒNG LAB ---');
  
  for (const img of IMAGES) {
    console.log(`\nĐang tải [${img.name}] từ: ${img.url}`);
    const res = await fetch(img.url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
      }
    });

    if (!res.ok) {
      throw new Error(`Tải thất bại ${img.name}: HTTP ${res.status}`);
    }

    const arrayBuffer = await res.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Chuyển đổi và tối ưu bằng Sharp sang định dạng JPG chất lượng cao
    const processedBuffer = await sharp(buffer)
      .flatten({ background: img.background })
      .resize({ width: img.maxWidth, withoutEnlargement: true })
      .jpeg({ quality: 90, mozjpeg: true })
      .toBuffer();

    for (const dir of TARGET_DIRS) {
      const destPath = path.join(dir, img.name);
      fs.writeFileSync(destPath, processedBuffer);
      console.log(` ✓ Đã lưu: ${destPath} (${Math.round(processedBuffer.length / 1024)} KB)`);
    }
  }

  // Đồng bộ ảnh chia-se-file sang thư mục public gốc nếu thiếu
  const srcShareWin10 = path.resolve('mang-may-tinh/public/images/chia-se-file/step-1-private-network-win10.png');
  const destShareWin10 = path.resolve('public/images/chia-se-file/step-1-private-network-win10.png');
  if (fs.existsSync(srcShareWin10) && !fs.existsSync(destShareWin10)) {
    fs.copyFileSync(srcShareWin10, destShareWin10);
    console.log(`\n✓ Đã đồng bộ: ${destShareWin10}`);
  }

  console.log('\n--- HOÀN TẤT TẢI VÀ LƯU ẢNH THÀNH CÔNG 100% ---');
}

downloadAndProcess().catch(err => {
  console.error('Lỗi thực thi:', err);
  process.exit(1);
});
