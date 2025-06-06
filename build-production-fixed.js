#!/usr/bin/env node

/**
 * Production Build Script - Fixed for Deployment
 * Resolves recursive copy issue by building directly to correct directories
 */

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function log(message) {
  console.log(`[build-production] ${message}`);
}

async function main() {
  try {
    log('Starting production build...');
    
    // Clean any existing build
    if (fs.existsSync('dist')) {
      log('Cleaning previous build...');
      fs.rmSync('dist', { recursive: true, force: true });
    }
    
    // Build client - vite config already outputs to dist/public
    log('Building client application...');
    execSync('vite build', { 
      cwd: __dirname, 
      stdio: 'pipe'  // Reduce output for speed
    });
    
    // Build server - outputs to dist/index.js
    log('Building server application...');
    execSync('esbuild server/index.ts --platform=node --packages=external --bundle --format=esm --outdir=dist', { 
      cwd: __dirname, 
      stdio: 'pipe'
    });
    
    // Verify build structure
    const distPath = path.join(__dirname, 'dist');
    const publicPath = path.join(distPath, 'public');
    const serverPath = path.join(distPath, 'index.js');
    const indexHtmlPath = path.join(publicPath, 'index.html');
    
    if (!fs.existsSync(distPath)) {
      throw new Error('Build failed: dist directory not created');
    }
    
    if (!fs.existsSync(publicPath)) {
      throw new Error('Build failed: dist/public directory not created');
    }
    
    if (!fs.existsSync(serverPath)) {
      throw new Error('Build failed: dist/index.js not created');
    }
    
    if (!fs.existsSync(indexHtmlPath)) {
      throw new Error('Build failed: dist/public/index.html not created');
    }
    
    // Display build info
    const publicFiles = fs.readdirSync(publicPath);
    log('✅ Production build completed successfully!');
    log('📁 Build structure:');
    log(`   dist/index.js (${(fs.statSync(serverPath).size / 1024).toFixed(1)}KB)`);
    log(`   dist/public/ (${publicFiles.length} files)`);
    log('🚀 Ready for deployment!');
    
  } catch (error) {
    console.error('❌ Production build failed:', error.message);
    process.exit(1);
  }
}

main();