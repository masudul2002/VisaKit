import fs from 'fs';
import path from 'path';
import zlib from 'zlib';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function createSolidPng(width, height, r, g, b, filename) {
  // PNG signature
  const signature = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);

  // IHDR chunk
  const ihdrData = Buffer.alloc(13);
  ihdrData.writeUInt32BE(width, 0);
  ihdrData.writeUInt32BE(height, 4);
  ihdrData.writeUInt8(8, 8); // bit depth (8-bit)
  ihdrData.writeUInt8(2, 9); // color type (RGB)
  ihdrData.writeUInt8(0, 10); // compression method (deflate)
  ihdrData.writeUInt8(0, 11); // filter method (standard)
  ihdrData.writeUInt8(0, 12); // interlace method (none)

  const ihdrChunk = createChunk('IHDR', ihdrData);

  // IDAT chunk (raw pixel data)
  // scanline length = 1 filter byte + width * 3 color bytes
  const rowLength = 1 + width * 3;
  const rawData = Buffer.alloc(rowLength * height);
  for (let y = 0; y < height; y++) {
    const offset = y * rowLength;
    rawData.writeUInt8(0, offset); // Filter type 0 (None)
    for (let x = 0; x < width; x++) {
      const pixelOffset = offset + 1 + x * 3;
      rawData.writeUInt8(r, pixelOffset);
      rawData.writeUInt8(g, pixelOffset + 1);
      rawData.writeUInt8(b, pixelOffset + 2);
    }
  }

  const compressed = zlib.deflateSync(rawData);
  const idatChunk = createChunk('IDAT', compressed);

  // IEND chunk
  const iendChunk = createChunk('IEND', Buffer.alloc(0));

  // Combine and write
  const fullBuffer = Buffer.concat([signature, ihdrChunk, idatChunk, iendChunk]);
  const destDir = path.dirname(filename);
  if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir, { recursive: true });
  }
  fs.writeFileSync(filename, fullBuffer);
}

function createChunk(type, data) {
  const length = data.length;
  const buffer = Buffer.alloc(4 + 4 + length + 4);
  buffer.writeUInt32BE(length, 0);
  buffer.write(type, 4, 4, 'ascii');
  data.copy(buffer, 8);

  // Calculate CRC-32 for Chunk Type + Chunk Data
  const crcInput = buffer.subarray(4, 8 + length);
  const crcValue = crc32(crcInput);
  buffer.writeUInt32BE(crcValue, 8 + length);
  return buffer;
}

// CRC-32 lookup table
const crcTable = [];
for (let n = 0; n < 256; n++) {
  let c = n;
  for (let k = 0; k < 8; k++) {
    if (c & 1) {
      c = 0xedb88320 ^ (c >>> 1);
    } else {
      c = c >>> 1;
    }
  }
  crcTable[n] = c;
}

function crc32(buf) {
  let crc = 0xffffffff;
  for (let i = 0; i < buf.length; i++) {
    crc = crcTable[(crc ^ buf[i]) & 0xff] ^ (crc >>> 8);
  }
  return (crc ^ 0xffffffff) >>> 0;
}

// Generate the required icons
const sizes = [16, 32, 48, 128];
const publicPath = path.join(__dirname, 'public');
for (const size of sizes) {
  const filename = path.join(publicPath, `icon-${size}.png`);
  createSolidPng(size, size, 37, 99, 235, filename); // #2563EB
  console.log(`Generated icon-${size}.png in extension/public/`);
}
