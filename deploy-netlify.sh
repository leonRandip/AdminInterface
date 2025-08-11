#!/bin/bash

echo "🚀 Deploying Job Management App to Netlify..."

# Build the application
echo "📦 Building application..."
npm install
npm run build
npm run export

echo "📁 Build complete! Files are in the 'out' directory."
echo ""
echo "📋 To deploy to Netlify:"
echo "1. Go to https://app.netlify.com/"
echo "2. Drag and drop the 'out' folder"
echo "3. Your app will be deployed automatically!"
echo ""
echo "🔗 Or use Netlify CLI:"
echo "npm install -g netlify-cli"
echo "netlify deploy --dir=out --prod"
