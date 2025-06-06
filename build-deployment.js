#!/usr/bin/env node

/**
 * Deployment Build Script - Final Solution
 * Fixes recursive copy issue and creates proper directory structure
 */

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

function log(message) {
  console.log(`[build] ${message}`);
}

function ensureDirExists(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

try {
  log('Starting deployment build...');
  
  // Set production environment
  process.env.NODE_ENV = 'production';
  
  // Clean previous build
  if (fs.existsSync('dist')) {
    log('Cleaning previous build...');
    fs.rmSync('dist', { recursive: true, force: true });
  }
  
  // Ensure dist directory exists
  ensureDirExists('dist');
  
  // Build client to dist/public (as configured in vite.config.ts)
  log('Building client application...');
  try {
    execSync('vite build --mode production', { 
      stdio: 'inherit',
      timeout: 300000  // 5 minute timeout
    });
  } catch (error) {
    if (error.status === null) {
      log('Build timed out, but may have completed. Checking...');
    } else {
      throw error;
    }
  }
  
  // Build server to dist/index.js
  log('Building server application...');
  execSync('esbuild server/index.ts --platform=node --packages=external --bundle --format=esm --outdir=dist --minify', { 
    stdio: 'inherit'
  });
  
  // Verify deployment structure
  const requiredFiles = [
    'dist/index.js',
    'dist/public',
    'dist/public/index.html'
  ];
  
  for (const file of requiredFiles) {
    if (!fs.existsSync(file)) {
      throw new Error(`Required file missing: ${file}`);
    }
  }
  
  // Display build summary
  const publicFiles = fs.readdirSync('dist/public');
  const serverSize = Math.round(fs.statSync('dist/index.js').size / 1024);
  
  log('Build completed successfully!');
  log(`Server: dist/index.js (${serverSize}KB)`);
  log(`Client: dist/public/ (${publicFiles.length} files)`);
  log('Deployment structure verified!');
  
} catch (error) {
  console.error('Build failed:', error.message);
  
  // Show helpful debugging info
  if (fs.existsSync('dist')) {
    console.log('Current dist structure:');
    try {
      execSync('find dist -type f | head -10', { stdio: 'inherit' });
    } catch (e) {
      console.log('Could not list dist contents');
    }
  }
  
  process.exit(1);
}