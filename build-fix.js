#!/usr/bin/env node

/**
 * Build Fix Script
 * Temporarily replaces @/ aliases with relative paths for production builds
 * Then restores them after the build completes
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const clientSrcDir = path.join(__dirname, 'client', 'src');

// Mapping of @/ aliases to relative paths based on file location
const aliasReplacements = {
  // From client/src root level files
  'client/src/App.tsx': {
    '@/components/': './components/',
    '@/hooks/': './hooks/',
    '@/lib/': './lib/',
    '@/pages/': './pages/'
  },
  // From client/src/components level files
  'client/src/components/': {
    '@/components/': './',
    '@/hooks/': '../hooks/',
    '@/lib/': '../lib/',
    '@/pages/': '../pages/'
  },
  // From client/src/hooks level files
  'client/src/hooks/': {
    '@/components/': '../components/',
    '@/hooks/': './',
    '@/lib/': '../lib/',
    '@/pages/': '../pages/'
  },
  // From client/src/lib level files
  'client/src/lib/': {
    '@/components/': '../components/',
    '@/hooks/': '../hooks/',
    '@/lib/': './',
    '@/pages/': '../pages/'
  },
  // From client/src/pages level files
  'client/src/pages/': {
    '@/components/': '../components/',
    '@/hooks/': '../hooks/',
    '@/lib/': '../lib/',
    '@/pages/': './'
  }
};

function getAllTsxFiles(dir) {
  const files = [];
  const items = fs.readdirSync(dir);
  
  for (const item of items) {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);
    
    if (stat.isDirectory()) {
      files.push(...getAllTsxFiles(fullPath));
    } else if (item.endsWith('.tsx') || item.endsWith('.ts')) {
      files.push(fullPath);
    }
  }
  
  return files;
}

function getReplacementMap(filePath) {
  const relativePath = path.relative(__dirname, filePath);
  const dir = path.dirname(relativePath);
  
  // Find the most specific replacement map
  for (const [pattern, replacements] of Object.entries(aliasReplacements)) {
    if (dir.startsWith(pattern)) {
      return replacements;
    }
  }
  
  // Default fallback
  return aliasReplacements['client/src/pages/'];
}

function replaceAliases() {
  console.log('Replacing @/ aliases with relative paths for build...');
  const files = getAllTsxFiles(clientSrcDir);
  const backupData = {};
  
  for (const file of files) {
    const content = fs.readFileSync(file, 'utf8');
    backupData[file] = content;
    
    let newContent = content;
    const replacements = getReplacementMap(file);
    
    for (const [alias, replacement] of Object.entries(replacements)) {
      const escaped = alias.replace('/', '\\/');
      const aliasRegex = new RegExp(`"${escaped}"`, 'g');
      newContent = newContent.replace(aliasRegex, `"${replacement}"`);
    }
    
    if (newContent !== content) {
      fs.writeFileSync(file, newContent);
    }
  }
  
  return backupData;
}

function restoreAliases(backupData) {
  console.log('Restoring @/ aliases...');
  for (const [file, content] of Object.entries(backupData)) {
    fs.writeFileSync(file, content);
  }
}

async function main() {
  let backupData = {};
  
  try {
    // Replace aliases
    backupData = replaceAliases();
    
    // Run the build
    console.log('Running Vite build...');
    execSync('vite build', { 
      cwd: __dirname,
      stdio: 'inherit'
    });
    
    console.log('Running server build...');
    execSync('esbuild server/index.ts --platform=node --packages=external --bundle --format=esm --outdir=dist', { 
      cwd: __dirname,
      stdio: 'inherit'
    });
    
    console.log('Build completed successfully!');
    
  } catch (error) {
    console.error('Build failed:', error.message);
    process.exit(1);
  } finally {
    // Always restore the original files
    if (Object.keys(backupData).length > 0) {
      restoreAliases(backupData);
    }
  }
}

main();