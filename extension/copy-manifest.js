import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const src = path.join(__dirname, 'manifest.json');
const dest = path.join(__dirname, 'dist', 'manifest.json');

try {
  // Ensure dist directory exists
  const distDir = path.dirname(dest);
  if (!fs.existsSync(distDir)) {
    fs.mkdirSync(distDir, { recursive: true });
  }
  
  fs.copyFileSync(src, dest);
  console.log('Successfully copied manifest.json to dist/manifest.json');
} catch (err) {
  console.error('Error copying manifest.json:', err);
  process.exit(1);
}
