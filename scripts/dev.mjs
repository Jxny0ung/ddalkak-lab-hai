// Translate the preview supervisor's host/strict-port flags to Next's CLI.
import { spawn } from 'node:child_process';
import { existsSync } from 'node:fs';
const args = process.argv.slice(2).filter(arg => arg !== '--strictPort').map(arg => arg === '--host' ? '--hostname' : arg);
// The supervised preview uses a completed production build when one is present.
// Normal npm run dev still runs Next development mode. Rebuild before previewing changes.
const mode = process.argv.includes('--strictPort') && existsSync('.next/BUILD_ID') ? 'start' : 'dev';
const child = spawn(process.execPath, ['node_modules/next/dist/bin/next', mode, ...args], { stdio: 'inherit' });
for (const signal of ['SIGINT', 'SIGTERM']) process.on(signal, () => child.kill(signal));
child.on('exit', code => process.exit(code ?? 1));
