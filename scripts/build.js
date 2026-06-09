const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const rootDir = path.resolve(__dirname, '..');
const sourceDir = path.join(rootDir, 'Content Hub Power Extension');
const outDir = path.join(rootDir, 'dist');

function removeDir(dir) {
  if (!fs.existsSync(dir)) return;
  for (const entry of fs.readdirSync(dir)) {
    const fullPath = path.join(dir, entry);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      removeDir(fullPath);
    } else {
      fs.unlinkSync(fullPath);
    }
  }
  fs.rmdirSync(dir);
}

function copyRecursive(src, dest) {
  const stat = fs.statSync(src);
  if (stat.isDirectory()) {
    fs.mkdirSync(dest, { recursive: true });
    for (const item of fs.readdirSync(src)) {
      copyRecursive(path.join(src, item), path.join(dest, item));
    }
  } else {
    if (path.extname(src) === '.ts') return;
    fs.copyFileSync(src, dest);
  }
}

const args = process.argv.slice(2);
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
} catch (error) {
  console.error('TypeScript build failed.');
  process.exit(1);
}
