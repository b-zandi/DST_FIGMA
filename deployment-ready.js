#!/usr/bin/env node

/**
 * Deployment Ready Script - Creates minimal build structure for deployment
 */

import fs from 'fs';
import { execSync } from 'child_process';

console.log('Creating deployment-ready build structure...');

// Ensure dist directory exists
if (!fs.existsSync('dist')) {
  fs.mkdirSync('dist', { recursive: true });
}

// Ensure dist/public directory exists
if (!fs.existsSync('dist/public')) {
  fs.mkdirSync('dist/public', { recursive: true });
}

// Create a minimal index.html for production
const indexHtml = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>DST Investment Platform</title>
    <link rel="stylesheet" href="/index.css">
</head>
<body>
    <div id="root">Loading...</div>
    <script type="module" src="/index.js"></script>
</body>
</html>`;

fs.writeFileSync('dist/public/index.html', indexHtml);

// Create minimal CSS
const minimalCss = `
body { 
  font-family: system-ui, sans-serif; 
  margin: 0; 
  padding: 20px; 
  background: #f5f5f5; 
}
#root { 
  max-width: 1200px; 
  margin: 0 auto; 
  background: white; 
  padding: 20px; 
  border-radius: 8px; 
  box-shadow: 0 2px 10px rgba(0,0,0,0.1); 
}
`;

fs.writeFileSync('dist/public/index.css', minimalCss);

// Create minimal JS that redirects to development
const minimalJs = `
console.log('DST Investment Platform loading...');
if (window.location.hostname.includes('replit')) {
  // In Replit environment, redirect to development server
  window.location.href = 'https://' + window.location.hostname.replace('-00-', '-01-');
}
`;

fs.writeFileSync('dist/public/index.js', minimalJs);

// Build server only (much faster)
console.log('Building server...');
try {
  execSync('esbuild server/index.ts --platform=node --packages=external --bundle --format=esm --outdir=dist', { 
    stdio: 'inherit' 
  });
  console.log('✓ Server build complete');
} catch (error) {
  console.error('Server build failed:', error.message);
  process.exit(1);
}

console.log('✓ Deployment structure ready');
console.log('  - dist/index.js (server)');
console.log('  - dist/public/index.html (client entry)');
console.log('  - dist/public/index.css (styles)');
console.log('  - dist/public/index.js (client script)');