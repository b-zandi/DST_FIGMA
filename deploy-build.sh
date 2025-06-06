#!/bin/bash

# Simple deployment build script that temporarily fixes alias imports
echo "Starting deployment build process..."

# Create backup directory
mkdir -p .build-backup

# Copy original files for restoration
cp -r client/src .build-backup/

# Replace @/ aliases with relative paths in key files
echo "Adjusting import paths for build..."

# Fix App.tsx imports
sed -i 's|"@/components/ui/toaster"|"./components/ui/toaster"|g' client/src/App.tsx
sed -i 's|"@/pages/|"./pages/|g' client/src/App.tsx
sed -i 's|"@/hooks/use-auth"|"./hooks/use-auth"|g' client/src/App.tsx

# Fix component imports
find client/src/components -name "*.tsx" -exec sed -i 's|"@/lib/utils"|"../../lib/utils"|g' {} \;
find client/src/components -name "*.tsx" -exec sed -i 's|"@/hooks/use-toast"|"../../hooks/use-toast"|g' {} \;
find client/src/components -name "*.tsx" -exec sed -i 's|"@/components/ui/|"../ui/|g' {} \;

# Fix hooks imports
find client/src/hooks -name "*.tsx" -name "*.ts" -exec sed -i 's|"@/components/ui/toast"|"../components/ui/toast"|g' {} \;

# Fix pages imports
find client/src/pages -name "*.tsx" -exec sed -i 's|"@/components/|"../components/|g' {} \;
find client/src/pages -name "*.tsx" -exec sed -i 's|"@/hooks/|"../hooks/|g' {} \;
find client/src/pages -name "*.tsx" -exec sed -i 's|"@/lib/|"../lib/|g' {} \;
find client/src/pages -name "*.tsx" -exec sed -i 's|"@shared/schema"|"../../shared/schema"|g' {} \;

# Run the build
echo "Running Vite build..."
npm run build

# Store build result
BUILD_RESULT=$?

# Restore original files
echo "Restoring original source files..."
rm -rf client/src
mv .build-backup/src client/
rm -rf .build-backup

if [ $BUILD_RESULT -eq 0 ]; then
    echo "✅ Deployment build completed successfully!"
    echo "📁 Build output is in dist/ directory"
    echo "🚀 Ready for deployment!"
else
    echo "❌ Build failed"
    exit 1
fi