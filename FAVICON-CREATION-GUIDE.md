# Favicon Creation Guide

## Required Files and Sizes

### 1. Create Base Logo (512x512px)
- Open your design tool (Photoshop, GIMP, Figma)
- Create new document: 512x512px, transparent background
- Place your logo centered
- Save as `logo-512.png`

### 2. Generate All Sizes

#### favicon-192x192.png
- Resize logo-512.png to 192x192px
- Export as PNG-24 with transparency
- Save to `/public/favicon-192x192.png`

#### favicon-512x512.png
- Use original logo-512.png
- Export as PNG-24 with transparency
- Save to `/public/favicon-512x512.png`

#### apple-touch-icon.png
- Resize to 180x180px
- Add 20px padding (logo should be 140x140px within)
- Background: white or brand color (no transparency for iOS)
- Save to `/public/apple-touch-icon.png`

#### favicon.ico
- Use online converter or Photoshop plugin
- Include sizes: 16x16, 32x32, 48x48
- Save to `/public/favicon.ico`

### 3. Optimize Files
- Use [TinyPNG](https://tinypng.com/) to compress all PNG files
- Ensure total size < 50KB for all favicons combined

### 4. Test Your Favicons
- Open your site in different browsers
- Check on mobile devices
- Use [Favicon Checker](https://realfavicongenerator.net/favicon_checker)

## Quick Command-Line Method (if you have ImageMagick)

```bash
# Install ImageMagick first
brew install imagemagick  # Mac
# or
sudo apt-get install imagemagick  # Linux

# Then run these commands with your logo.png
convert logo.png -resize 192x192 favicon-192x192.png
convert logo.png -resize 512x512 favicon-512x512.png
convert logo.png -resize 180x180 -background white -gravity center -extent 180x180 apple-touch-icon.png
convert logo.png -resize 16x16 favicon-16.png
convert logo.png -resize 32x32 favicon-32.png
convert favicon-16.png favicon-32.png favicon.ico
```