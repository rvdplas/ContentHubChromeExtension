import fs from 'fs';
import path from 'path';
import { spawn, ChildProcessWithoutNullStreams } from 'child_process';

const rootDir = path.resolve(__dirname, '..');
const watchDir = path.join(rootDir, 'Content Hub Power Extension');
const debounceDelay = 250;
const pollIntervalMs = 500;
let rebuildTimer: NodeJS.Timeout | null = null;
let buildRunning = false;
let pendingRun = false;
let pollTimer: NodeJS.Timeout | null = null;
let previousSnapshot: Map<string, number> = new Map();

function runBuild(): void {
  if (buildRunning) {
    pendingRun = true;
    return;
  }

  buildRunning = true;
  console.log('Rebuilding extension...');

  const build = spawn(
    'npx',
    [
      'ts-node',
      '--project',
      path.join(rootDir, 'tsconfig.scripts.json'),
      'scripts/build.ts',
    ],
    {
      cwd: rootDir,
      stdio: 'inherit',
    }
  );

  build.on('exit', (code: number | null) => {
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

function scheduleBuild(): void {
  if (rebuildTimer !== null) {
    clearTimeout(rebuildTimer);
  }
  rebuildTimer = setTimeout(runBuild, debounceDelay);
}

function isWatchableFile(filename: string): boolean {
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

function scanDirectory(dir: string, snapshot: Map<string, number>): void {
  const entries: fs.Dirent[] = fs.readdirSync(dir, { withFileTypes: true });
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

function createSnapshot(): Map<string, number> {
  const snapshot = new Map<string, number>();
  scanDirectory(watchDir, snapshot);
  return snapshot;
}

function snapshotsDiffer(
  oldSnapshot: Map<string, number>,
  newSnapshot: Map<string, number>
): boolean {
  if (oldSnapshot.size !== newSnapshot.size) return true;

  for (const [filePath, mtime] of newSnapshot.entries()) {
    if (!oldSnapshot.has(filePath) || oldSnapshot.get(filePath) !== mtime) {
      return true;
    }
  }

  return false;
}

function pollForChanges(): void {
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

function startPolling(): void {
  previousSnapshot = createSnapshot();
  pollTimer = setInterval(pollForChanges, pollIntervalMs);
}

function stopPolling(): void {
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
