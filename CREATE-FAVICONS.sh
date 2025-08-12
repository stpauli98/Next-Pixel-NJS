#!/bin/bash

# Create placeholder favicons using ImageMagick (if available) or create empty files

echo "Creating placeholder favicon files..."

# Navigate to public directory
cd public

# Create a simple SVG favicon as base
cat > favicon.svg << 'EOF'
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
  <rect width="512" height="512" fill="#1e40af"/>
  <text x="50%" y="50%" font-family="Arial, sans-serif" font-size="300" font-weight="bold" fill="white" text-anchor="middle" dominant-baseline="middle">NP</text>
</svg>
EOF

# Check if ImageMagick is installed
if command -v convert &> /dev/null; then
    echo "ImageMagick found, creating proper favicons..."
    
    # Convert SVG to various sizes
    convert favicon.svg -resize 16x16 favicon-16x16.png
    convert favicon.svg -resize 32x32 favicon-32x32.png
    convert favicon.svg -resize 192x192 favicon-192x192.png
    convert favicon.svg -resize 512x512 favicon-512x512.png
    convert favicon.svg -resize 180x180 -background white -gravity center -extent 180x180 apple-touch-icon.png
    
    # Create .ico file
    convert favicon-16x16.png favicon-32x32.png favicon.ico
    
    echo "✅ Favicons created successfully!"
else
    echo "ImageMagick not found, creating placeholder files..."
    
    # Create empty placeholder files
    touch favicon.ico
    touch favicon-16x16.png
    touch favicon-32x32.png
    touch favicon-192x192.png
    touch favicon-512x512.png
    touch apple-touch-icon.png
    
    echo "⚠️ Placeholder files created. Install ImageMagick for proper favicons:"
    echo "  Mac: brew install imagemagick"
    echo "  Linux: sudo apt-get install imagemagick"
fi

echo "📁 Created files:"
ls -la favicon* apple-touch-icon.png 2>/dev/null

echo "
Next steps:
1. Replace these with your actual logo
2. Use https://realfavicongenerator.net/ for professional favicons
"