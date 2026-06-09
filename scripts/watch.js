const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');

const rootDir = path.resolve(__dirname, '..');
const watchDir = path.join(rootDir, 'Content Hub Power Extension');
const debounceDelay = 250;
const pollIntervalMs = 500;
let rebuildTimer = null;
let buildRunning = false;
let pendingRun = false;
let pollTimer = null;
let previousSnapshot = new Map();

function runBuild() {
  if (buildRunning) {
    pendingRun = true;
    return;
  }

  buildRunning = true;
  console.log('Rebuilding extension...');

  const build = spawn('node', ['scripts/build.js'], {
    cwd: rootDir,
    stdio: 'inherit',
  });

  build.on('exit', (code) => {
    buildRunning = false;
    if (code !== 0) {
      console.error(`Build exited with code ${code}`);
    } else {
      console.log('Build completed successfully.');
    }

    if (pendingRun) {
      pendingRun = false;
      runBuild();
    }
  });
}

function scheduleBuild() {
  clearTimeout(rebuildTimer);
  rebuildTimer = setTimeout(runBuild, debounceDelay);
}

function isWatchableFile(filename) {
  return [
    '.ts',
    '.js',
    '.html',
    '.json',
    '.css',
    '.png',
    '.jpg',
    '.jpeg',
    '.svg',
  ].includes(path.extname(filename).toLowerCase());
}

function scanDirectory(dir, snapshot) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      scanDirectory(fullPath, snapshot);
      continue;
    }

    if (!isWatchableFile(entry.name)) continue;

    const stats = fs.statSync(fullPath);
    snapshot.set(fullPath, stats.mtimeMs);
  }
}

function createSnapshot() {
  const snapshot = new Map();
  scanDirectory(watchDir, snapshot);
  return snapshot;
}

function snapshotsDiffer(oldSnapshot, newSnapshot) {
  if (oldSnapshot.size !== newSnapshot.size) return true;

  for (const [filePath, mtime] of newSnapshot.entries()) {
    if (!oldSnapshot.has(filePath) || oldSnapshot.get(filePath) !== mtime) {
      return true;
    }
  }

  return false;
}

function pollForChanges() {
  try {
    const currentSnapshot = createSnapshot();
    if (snapshotsDiffer(previousSnapshot, currentSnapshot)) {
      previousSnapshot = currentSnapshot;
      scheduleBuild();
    }
  } catch (error) {
    console.error('Watch polling failed:', error);
  }
}

function startPolling() {
  previousSnapshot = createSnapshot();
  pollTimer = setInterval(pollForChanges, pollIntervalMs);
}

function stopPolling() {
  if (pollTimer !== null) {
    clearInterval(pollTimer);
    pollTimer = null;
  }
}

try {
  console.log(`Watching ${watchDir} for changes. Press Ctrl+C to stop.`);
  startPolling();
  runBuild();

  process.on('SIGINT', () => {
    stopPolling();
    process.exit(0);
  });
} catch (error) {
  console.error('Failed to start watch mode:', error);
  stopPolling();
  process.exit(1);
}
