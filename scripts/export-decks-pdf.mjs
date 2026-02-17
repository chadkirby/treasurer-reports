import { spawn } from 'node:child_process';
import { mkdir } from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';
import { setTimeout as delay } from 'node:timers/promises';

const HOST = '127.0.0.1';
const PORT = process.env.PDF_PORT || '4173';
const ROOT = process.cwd();
const OUTPUT_DIR = path.join(ROOT, 'pdf');
const DECKS = [
  { id: 'owners', output: 'owner-deck.pdf' },
  { id: 'board', output: 'board-deck.pdf' },
  { id: 'background', output: 'background-deck.pdf' },
];

function normalizeBasePath(value) {
  if (!value) return '/';
  let next = value.trim();
  if (!next.startsWith('/')) next = `/${next}`;
  if (!next.endsWith('/')) next = `${next}/`;
  return next;
}

function npmCommand() {
  return process.platform === 'win32' ? 'npm.cmd' : 'npm';
}

function startPreviewServer() {
  return spawn(
    npmCommand(),
    ['run', 'preview', '--', '--host', HOST, '--port', PORT, '--strictPort'],
    {
      cwd: ROOT,
      stdio: ['ignore', 'pipe', 'pipe'],
      env: { ...process.env },
    }
  );
}

async function waitForServer(origin, basePaths, hasProcessExited, timeoutMs = 30_000) {
  const startedAt = Date.now();

  while (Date.now() - startedAt < timeoutMs) {
    if (hasProcessExited()) {
      throw new Error('Preview server exited before becoming ready.');
    }

    for (const basePath of basePaths) {
      try {
        const response = await fetch(`${origin}${basePath}`, { redirect: 'manual' });
        if (response.ok || response.status === 304) return basePath;
      } catch {
        // Retry until timeout.
      }
    }
    await delay(400);
  }

  throw new Error(`Preview server did not become ready within ${timeoutMs}ms.`);
}

async function run() {
  const baseCandidates = Array.from(
    new Set(
      [process.env.PDF_BASE_PATH, '/treasurer-reports/', '/']
        .filter(Boolean)
        .map(normalizeBasePath)
    )
  );
  const origin = `http://${HOST}:${PORT}`;
  const preview = startPreviewServer();
  let previewExited = false;

  preview.stdout.on('data', (chunk) => process.stdout.write(chunk));
  preview.stderr.on('data', (chunk) => process.stderr.write(chunk));
  preview.on('exit', () => {
    previewExited = true;
  });

  try {
    const selectedBasePath = await waitForServer(
      origin,
      baseCandidates,
      () => previewExited
    );
    await mkdir(OUTPUT_DIR, { recursive: true });

    let chromium;
    try {
      ({ chromium } = await import('playwright'));
    } catch {
      throw new Error(
        'Playwright is not installed. Run "npm install" and "npx playwright install chromium".'
      );
    }

    const browser = await chromium.launch();
    const page = await browser.newPage();
    await page.setViewportSize({ width: 816, height: 1056 });
    await page.emulateMedia({ media: 'print' });

    for (const deck of DECKS) {
      const targetUrl = `${origin}${selectedBasePath}#/${deck.id}/print`;
      const outputPath = path.join(OUTPUT_DIR, deck.output);

      console.log(`Exporting ${deck.id} deck -> ${outputPath}`);
      await page.goto(targetUrl, { waitUntil: 'networkidle' });
      await page.waitForSelector(`[data-print-deck="${deck.id}"]`, { timeout: 20_000 });
      await page.evaluate(() => window.dispatchEvent(new Event('resize')));
      await page.waitForTimeout(1_500);

      await page.pdf({
        path: outputPath,
        format: 'Letter',
        printBackground: false,
        preferCSSPageSize: true,
      });
    }

    await browser.close();
    console.log('PDF export complete.');
  } finally {
    if (!preview.killed) {
      preview.kill('SIGTERM');
      await delay(400);
      if (!preview.killed) preview.kill('SIGKILL');
    }
  }
}

run().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});
