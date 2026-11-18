import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const targetDir = path.resolve("public/images/ol-01");
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

console.log("Processing images in:", targetDir);

async function run() {
  // 1. Process comp-psu.jpg from nguon-psu.jpg
  if (fs.existsSync(path.join(targetDir, "nguon-psu.jpg"))) {
    await sharp(path.join(targetDir, "nguon-psu.jpg"))
      .resize(1000, 700, { fit: "cover", position: "center" })
      .jpeg({ quality: 88, mozjpeg: true })
      .toFile(path.join(targetDir, "comp-psu.jpg"));
    console.log("Created comp-psu.jpg");
  }

  // 2. Process comp-cpu-fan.jpg from intel-cooler.jpg
  if (fs.existsSync(path.join(targetDir, "intel-cooler.jpg"))) {
    await sharp(path.join(targetDir, "intel-cooler.jpg"))
      .resize(1000, 700, { fit: "cover", position: "center" })
      .jpeg({ quality: 88, mozjpeg: true })
      .toFile(path.join(targetDir, "comp-cpu-fan.jpg"));
    console.log("Created comp-cpu-fan.jpg");
  }

  // 3. Process comp-ssd-sata.jpg from ssd-sata.jpg
  if (fs.existsSync(path.join(targetDir, "ssd-sata.jpg"))) {
    await sharp(path.join(targetDir, "ssd-sata.jpg"))
      .resize(1000, 700, { fit: "cover", position: "center" })
      .jpeg({ quality: 88, mozjpeg: true })
      .toFile(path.join(targetDir, "comp-ssd-sata.jpg"));
    console.log("Created comp-ssd-sata.jpg");
  }

  // 4. Process comp-pin-cmos.jpg from pin-cmos.jpg
  if (fs.existsSync(path.join(targetDir, "pin-cmos.jpg"))) {
    await sharp(path.join(targetDir, "pin-cmos.jpg"))
      .resize(1000, 700, { fit: "cover", position: "center" })
      .jpeg({ quality: 88, mozjpeg: true })
      .toFile(path.join(targetDir, "comp-pin-cmos.jpg"));
    console.log("Created comp-pin-cmos.jpg");
  }

  // 5. Process wire-24pin-atx.jpg from atx-24pin.jpg
  if (fs.existsSync(path.join(targetDir, "atx-24pin.jpg"))) {
    await sharp(path.join(targetDir, "atx-24pin.jpg"))
      .resize(1000, 700, { fit: "cover", position: "center" })
      .jpeg({ quality: 88, mozjpeg: true })
      .toFile(path.join(targetDir, "wire-24pin-atx.jpg"));
    console.log("Created wire-24pin-atx.jpg");
  }

  // 6. Process wire-sata.jpg from sata-cable.jpg
  if (fs.existsSync(path.join(targetDir, "sata-cable.jpg"))) {
    await sharp(path.join(targetDir, "sata-cable.jpg"))
      .resize(1000, 700, { fit: "contain", background: "#f8fafc" })
      .jpeg({ quality: 88, mozjpeg: true })
      .toFile(path.join(targetDir, "wire-sata.jpg"));
    console.log("Created wire-sata.jpg");
  }

  // 7. Process wire-fpanel-power-sw.jpg from fpanel-header.jpg
  if (fs.existsSync(path.join(targetDir, "fpanel-header.jpg"))) {
    await sharp(path.join(targetDir, "fpanel-header.jpg"))
      .resize(1000, 700, { fit: "cover", position: "center" })
      .jpeg({ quality: 88, mozjpeg: true })
      .toFile(path.join(targetDir, "wire-fpanel-power-sw.jpg"));
    console.log("Created wire-fpanel-power-sw.jpg");
  }
}

run().catch(console.error);
