import { spawn } from 'node:child_process';
import { createRequire } from 'node:module';
import { delimiter, dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const require = createRequire(import.meta.url);
const turboJs = require.resolve('turbo/bin/turbo');
const pnpmShimDir = join(dirname(fileURLToPath(import.meta.url)), 'bin');

const child = spawn(process.execPath, [turboJs, ...process.argv.slice(2)], {
  stdio: 'inherit',
  env: {
    ...process.env,
    PATH: `${pnpmShimDir}${delimiter}${process.env.PATH ?? ''}`,
  },
});

child.on('exit', (code, signal) => {
  if (signal) {
    process.kill(process.pid, signal);
    return;
  }
  process.exit(code ?? 1);
});
