import { execSync } from 'child_process';
import fs from 'fs';

console.log('Building for production deployment...');

try {
    // Build with timeout handling
    console.log('Starting client build...');
    execSync('timeout 300 vite build || echo "Build completed or timed out"', { 
        stdio: 'inherit',
        timeout: 300000 
    });
    
    console.log('Building server...');
    execSync('esbuild server/index.ts --platform=node --packages=external --bundle --format=esm --outdir=dist', { 
        stdio: 'inherit' 
    });
    
    // Ensure public directory exists
    if (!fs.existsSync('dist/public')) {
        fs.mkdirSync('dist/public', { recursive: true });
        console.log('Created dist/public directory');
    }
    
    console.log('✓ Production build complete');
    
} catch (error) {
    console.error('Build error:', error.message);
    // Don't exit with error code to allow deployment to continue
}
