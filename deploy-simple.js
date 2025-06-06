#!/usr/bin/env node

/**
 * Simple Deployment Script - Fast deployment solution
 * Creates correct directory structure without recursive copy
 */

import { execSync } from 'child_process';
import fs from 'fs';

function log(message) {
  console.log(`[deploy-simple] ${message}`);
}

try {
  log('Starting deployment...');
  
  // Clean build
  if (fs.existsSync('dist')) {
    execSync('rm -rf dist');
  }
  
  // Build with timeout protection
  log('Building client...');
  execSync('timeout 300 vite build', { stdio: 'pipe' });
  
  log('Building server...');  
  execSync('esbuild server/index.ts --platform=node --packages=external --bundle --format=esm --outdir=dist', { stdio: 'pipe' });
  
  // Verify structure
  if (!fs.existsSync('dist/public/index.html')) {
    throw new Error('Client build failed');
  }
  
  if (!fs.existsSync('dist/index.js')) {
    throw new Error('Server build failed');
  }
  
  log('Deployment build complete!');
  log('Structure: dist/index.js (server) + dist/public/ (client)');
  
} catch (error) {
  console.error('Build failed:', error.message);
  process.exit(1);
}