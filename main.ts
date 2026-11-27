// A working best-site-01 entry (Node 22, standard library only): the site is this directory's app/ folder, plain
// static files a browser opens at app/index.html (ES modules, CSS, no build step), its content held in its own files:
// nothing it runs, styles or shows loads over the network. The program hands it in: it copies app/ and screenshots/
// from beside this file to /output and writes /output/dossier.json, the summary the judge reads (your screenshots, the
// first load's files and bytes, and your source), with the vendored make.fun library. Leave vendor/makefun-frontend.ts
// as it is: the scorer requires dossier.json to be byte for byte what its own copy writes.
//
// A starting point, not a winner: a plain recipe collection, a list of recipes and a page for each. Build the site the
// brief asks for in app/ (its content, ease of use, a phone layout, its look), put 3 or 4 PNG or JPEG screenshots of
// it running in screenshots/ (the first by name is the cover; one may be a 390 x 844 phone view; shots.json says which
// views this starter's were taken of), and run it.
//
// Serve it locally with `node serve.ts`, then open http://localhost:8080.
// Outside the grader's container, MAKEFUN_OUTPUT_DIR stands in for /output:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { cpSync, existsSync, mkdirSync, writeFileSync, readdirSync, statSync } from 'node:fs';
import { join, extname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { buildDossier } from './vendor/makefun-frontend.ts';

const here = fileURLToPath(new URL('.', import.meta.url));
const out = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

// Verification step: validate site and assets before copying
const indexPath = join(here, 'app/index.html');
if (!existsSync(indexPath)) {
  throw new Error('Verification failed: app/index.html does not exist');
}

const screenshotsDir = join(here, 'screenshots');
if (!existsSync(screenshotsDir)) {
  throw new Error('Verification failed: screenshots directory does not exist');
}

const screenshotEntries = readdirSync(screenshotsDir);
const validScreenshotExts = ['.png', '.jpg', '.jpeg'];
const screenshotFiles = screenshotEntries.filter((file) => {
  const ext = extname(file).toLowerCase();
  return validScreenshotExts.includes(ext);
});

if (screenshotFiles.length < 3 || screenshotFiles.length > 4) {
  throw new Error('Verification failed: screenshots directory must hold 3 or 4 PNG/JPEG files');
}

for (const file of screenshotFiles) {
  const filePath = join(screenshotsDir, file);
  const stats = statSync(filePath);
  const maxBytes = 256 * 1024;
  if (stats.size > maxBytes) {
    throw new Error('Verification failed: screenshot ' + file + ' exceeds 256 KiB');
  }
}

function countFiles(dir: string): number {
  let count = 0;
  const entries = readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = join(dir, entry.name);
    if (entry.isDirectory()) {
      count += countFiles(fullPath);
    } else if (entry.isFile()) {
      count++;
    }
  }
  return count;
}

const appDir = join(here, 'app');
const appFileCount = existsSync(appDir) ? countFiles(appDir) : 0;
const screenshotCount = screenshotFiles.length;

mkdirSync(out, { recursive: true });
cpSync(join(here, 'app'), join(out, 'app'), { recursive: true });
mkdirSync(join(out, 'screenshots'), { recursive: true });
if (existsSync(screenshotsDir)) {
  cpSync(screenshotsDir, join(out, 'screenshots'), { recursive: true });
}

console.log('Copied ' + appFileCount + ' app files and ' + screenshotCount + ' screenshots successfully.');

writeFileSync(
  join(out, 'dossier.json'),
  buildDossier(out, { text_max_bytes: 163840, screenshots: { max: 4, max_bytes: 262144 }, app_max_files: 993, app_max_bytes: 16777216 }),
);
