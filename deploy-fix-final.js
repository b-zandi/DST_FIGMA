#!/usr/bin/env node

/**
 * Fixed Deployment Script
 * Resolves the recursive copy issue and creates correct build structure
 */

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function log(message) {
  console.log(`[deploy-fix] ${message}`);
}

async function main() {
  try {
    log('Starting fixed deployment build...');
    
    // Clean previous build completely
    if (fs.existsSync('dist')) {
      log('Cleaning previous build...');
      execSync('rm -rf dist', { cwd: __dirname, stdio: 'inherit' });
    }
    
    // Build client first (creates dist/public with client files)
    log('Building client to dist/public...');
    execSync('vite build', { cwd: __dirname, stdio: 'inherit' });
    
    // Build server to dist root (creates dist/index.js)
    log('Building server to dist...');
    execSync('esbuild server/index.ts --platform=node --packages=external --bundle --format=esm --outdir=dist', { 
      cwd: __dirname, 
      stdio: 'inherit' 
    });
    
    // Verify the correct structure was created
    const distExists = fs.existsSync(path.join(__dirname, 'dist'));
    const publicExists = fs.existsSync(path.join(__dirname, 'dist', 'public'));
    const indexHtmlExists = fs.existsSync(path.join(__dirname, 'dist', 'public', 'index.html'));
    const serverExists = fs.existsSync(path.join(__dirname, 'dist', 'index.js'));
    
    if (!distExists) {
      throw new Error('dist directory was not created');
    }
    if (!publicExists) {
      throw new Error('dist/public directory was not created');
    }
    if (!indexHtmlExists) {
      throw new Error('dist/public/index.html was not created');
    }
    if (!serverExists) {
      throw new Error('dist/index.js was not created');
    }
    
    log('✅ Fixed deployment build completed successfully!');
    log('📁 Structure created:');
    log('   - dist/index.js (server)');
    log('   - dist/public/ (client files)');
    log('   - dist/public/index.html');
    log('🚀 Ready for deployment!');
    
  } catch (error) {
    console.error('❌ Build failed:', error.message);
    process.exit(1);
  }
}

main();