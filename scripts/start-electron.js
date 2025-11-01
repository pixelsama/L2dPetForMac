#!/usr/bin/env node

const path = require('path');
const fs = require('fs');
const { spawn, spawnSync } = require('child_process');
const electron = require('electron');

const projectRoot = path.join(__dirname, '..');
const live2dRoot = path.join(projectRoot, 'live2d');
const live2dBundlePath = path.join(live2dRoot, 'dist', 'bundle.js');

function ensureLive2dBundle() {
  if (fs.existsSync(live2dBundlePath)) {
    return;
  }

  console.log('Live2D bundle not found, running live2d build script...');
  const npmCmd = process.platform === 'win32' ? 'npm.cmd' : 'npm';
  const buildEnv = { ...process.env };
  buildEnv.NODE_OPTIONS = `${buildEnv.NODE_OPTIONS || ''} --openssl-legacy-provider`.trim();

  const result = spawnSync(npmCmd, ['run', 'build'], {
    cwd: live2dRoot,
    stdio: 'inherit',
    env: buildEnv,
  });

  if (result.status !== 0) {
    console.error('Failed to build Live2D bundle.');
    process.exit(result.status ?? 1);
  }

  if (!fs.existsSync(live2dBundlePath)) {
    console.error('Live2D bundle build completed but bundle.js is still missing.');
    process.exit(1);
  }
}

ensureLive2dBundle();

delete process.env.ELECTRON_RUN_AS_NODE;

const child = spawn(electron, ['.'], {
  stdio: 'inherit',
  env: process.env,
  windowsHide: false,
});

child.on('exit', (code, signal) => {
  if (signal) {
    process.kill(process.pid, signal);
  } else {
    process.exit(code);
  }
});
