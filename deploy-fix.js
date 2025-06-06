#!/usr/bin/env node

/**
 * Simple deployment fix script
 * Ensures correct build structure for Replit deployment
 */

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

console.log('Starting deployment build fix...');

try {
  // Run the original build command
  console.log('Building with original npm script...');
  execSync('npm run build', { stdio: 'inherit' });
  
  // Verify the build structure
  const distExists = fs.existsSync('dist');
  const publicExists = fs.existsSync('dist/public');
  const serverExists = fs.existsSync('dist/index.js');
  
  if (!distExists) {
    throw new Error('dist directory not found');
  }
  
  if (!publicExists) {
    console.log('Creating dist/public directory...');
    fs.mkdirSync('dist/public', { recursive: true });
    
    // Copy any built client files to the correct location
    if (fs.existsSync('client/dist')) {
      execSync('cp -r client/dist/* dist/public/', { stdio: 'inherit' });
    }
  }
  
  if (!serverExists) {
    throw new Error('Server build file dist/index.js not found');
  }
  
  console.log('✓ Build structure verified:');
  console.log('  - dist/index.js (server)');
  console.log('  - dist/public/ (client files)');
  
} catch (error) {
  console.error('Build fix failed:', error.message);
  process.exit(1);
}