/// <reference types="node" />

import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

type FileSnapshot = Map<string, number>;

type ErrnoLike = { code?: string | number };

const rootDir = path.resolve(__dirname, '..');
const sourceDir = path.join(rootDir, 'Content Hub Power Extension');
const outDir = path.join(rootDir, 'dist');

function isENOENT(error: unknown): boolean {
  return (
    typeof error === 'object' &&
    error !== null &&
    'code' in error &&
    (error as ErrnoLike).code === 'ENOENT'
  );
}

function removeDir(dir: string): void {
  if (!fs.existsSync(dir)) return;

  for (const entry of fs.readdirSync(dir)) {
    const fullPath = path.join(dir, entry);
    let stat: fs.Stats;

    try {
      stat = fs.statSync(fullPath);
    } catch (error: unknown) {
      if (isENOENT(error)) continue;
      throw error;
    }

    if (stat.isDirectory()) {
      removeDir(fullPath);
      continue;
    }

    try {
      fs.unlinkSync(fullPath);
    } catch (error: unknown) {
      if (isENOENT(error)) continue;
      throw error;
    }
  }

  try {
    fs.rmdirSync(dir);
  } catch (error: unknown) {
    if (isENOENT(error)) return;
    throw error;
  }
}

function copyRecursive(src: string, dest: string): void {
  const stat = fs.statSync(src);
  if (stat.isDirectory()) {
    fs.mkdirSync(dest, { recursive: true });
    for (const item of fs.readdirSync(src)) {
      copyRecursive(path.join(src, item), path.join(dest, item));
    }
    return;
  }

  if (path.extname(src) === '.ts') return;
  fs.copyFileSync(src, dest);
}

const args: string[] = process.argv.slice(2);
if (args[0] === 'clean') {
  removeDir(outDir);
  process.exit(0);
}

if (!fs.existsSync(sourceDir)) {
  console.error(`Source directory not found: ${sourceDir}`);
  process.exit(1);
}

removeDir(outDir);
copyRecursive(sourceDir, outDir);

try {
  execSync('npx tsc -p "' + path.join(rootDir, 'tsconfig.json') + '"', {
    stdio: 'inherit',
    cwd: rootDir,
  });
  console.log(`Built Chrome extension to ${outDir}`);
} catch (error: unknown) {
  console.error('TypeScript build failed.');
  process.exit(1);
}
