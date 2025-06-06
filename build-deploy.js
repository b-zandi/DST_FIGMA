#!/usr/bin/env node

/**
 * Deployment Build Script
 * Creates the correct directory structure for Replit deployment
 */

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function log(message) {
  console.log(`[build-deploy] ${message}`);
}

async function main() {
  try {
    log('Starting deployment build...');
    
    // Clean previous build
    if (fs.existsSync('dist')) {
      log('Cleaning previous build...');
      execSync('rm -rf dist', { cwd: __dirname, stdio: 'inherit' });
    }
    
    // Build client (this creates dist/public)
    log('Building client...');
    execSync('vite build', { cwd: __dirname, stdio: 'inherit' });
    
    // Build server (this creates dist/index.js)
    log('Building server...');
    execSync('esbuild server/index.ts --platform=node --packages=external --bundle --format=esm --outdir=dist', { 
      cwd: __dirname, 
      stdio: 'inherit' 
    });
    
    // Verify build structure
    const distExists = fs.existsSync(path.join(__dirname, 'dist'));
    const publicExists = fs.existsSync(path.join(__dirname, 'dist', 'public'));
    const serverExists = fs.existsSync(path.join(__dirname, 'dist', 'index.js'));
    
    if (!distExists) {
      throw new Error('dist directory was not created');
    }
    if (!publicExists) {
      throw new Error('dist/public directory was not created');
    }
    if (!serverExists) {
      throw new Error('dist/index.js was not created');
    }
    
    log('Build completed successfully!');
    log(`- Client files: dist/public/`);
    log(`- Server file: dist/index.js`);
    
  } catch (error) {
    console.error('Build failed:', error.message);
    process.exit(1);
  }
}

main();