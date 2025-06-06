#!/usr/bin/env node

/**
 * Complete Deployment Solution
 * Fixes all deployment issues: recursive copy, alias resolution, and build structure
 */

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function log(message) {
  console.log(`[deploy] ${message}`);
}

// Backup and replacement data for alias fixes
const aliasReplacements = {
  '@/': './../../',
  '@shared/': './../../../shared/'
};

function fixAliasImports() {
  log('Fixing alias imports for production build...');
  
  const clientSrcPath = path.join(__dirname, 'client', 'src');
  const files = [];
  
  // Collect all TypeScript files
  function collectFiles(dir) {
    const items = fs.readdirSync(dir, { withFileTypes: true });
    for (const item of items) {
      const fullPath = path.join(dir, item.name);
      if (item.isDirectory()) {
        collectFiles(fullPath);
      } else if (item.name.endsWith('.tsx') || item.name.endsWith('.ts')) {
        files.push(fullPath);
      }
    }
  }
  
  collectFiles(clientSrcPath);
  
  const backups = new Map();
  
  // Fix imports in each file
  for (const filePath of files) {
    const content = fs.readFileSync(filePath, 'utf-8');
    let newContent = content;
    
    // Replace @/ with relative paths
    const relativePath = path.relative(path.dirname(filePath), clientSrcPath);
    const relativePrefix = relativePath ? `${relativePath}/` : './';
    
    newContent = newContent.replace(/from ["']@\//g, `from "${relativePrefix}`);
    newContent = newContent.replace(/import ["']@\//g, `import "${relativePrefix}`);
    
    // Replace @shared/ with relative paths to shared
    const sharedPath = path.relative(path.dirname(filePath), path.join(__dirname, 'shared'));
    newContent = newContent.replace(/from ["']@shared\//g, `from "${sharedPath}/`);
    newContent = newContent.replace(/import ["']@shared\//g, `import "${sharedPath}/`);
    
    if (newContent !== content) {
      backups.set(filePath, content);
      fs.writeFileSync(filePath, newContent);
    }
  }
  
  return backups;
}

function restoreFiles(backups) {
  log('Restoring original files...');
  for (const [filePath, content] of backups) {
    fs.writeFileSync(filePath, content);
  }
}

async function main() {
  let backups = new Map();
  
  try {
    log('Starting complete deployment build...');
    
    // Clean previous build
    if (fs.existsSync('dist')) {
      log('Cleaning previous build...');
      fs.rmSync('dist', { recursive: true, force: true });
    }
    
    // Fix alias imports temporarily
    backups = fixAliasImports();
    
    // Build client (outputs to dist/public via vite config)
    log('Building client...');
    execSync('vite build --mode production', { 
      cwd: __dirname, 
      stdio: 'inherit',
      env: { ...process.env, NODE_ENV: 'production' }
    });
    
    // Build server (outputs to dist/index.js)
    log('Building server...');
    execSync('esbuild server/index.ts --platform=node --packages=external --bundle --format=esm --outdir=dist --minify', { 
      cwd: __dirname, 
      stdio: 'inherit'
    });
    
    // Verify correct structure
    const distExists = fs.existsSync('dist');
    const publicExists = fs.existsSync('dist/public');
    const indexExists = fs.existsSync('dist/public/index.html');
    const serverExists = fs.existsSync('dist/index.js');
    
    if (!distExists || !publicExists || !indexExists || !serverExists) {
      throw new Error('Build verification failed - missing required files');
    }
    
    // Show build summary
    const publicFiles = fs.readdirSync('dist/public');
    const serverSize = fs.statSync('dist/index.js').size;
    
    log('Build completed successfully!');
    log(`Server: dist/index.js (${Math.round(serverSize / 1024)}KB)`);
    log(`Client: dist/public/ (${publicFiles.length} files)`);
    log('Ready for deployment!');
    
  } catch (error) {
    console.error('Deployment build failed:', error.message);
    process.exit(1);
  } finally {
    // Always restore original files
    if (backups.size > 0) {
      restoreFiles(backups);
    }
  }
}

main();