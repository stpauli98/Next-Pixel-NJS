# Location Images Setup Guide

## Required Images

### 1. Belgrade Office Image
**File:** `/public/images/belgrade-office.jpg`
- **Recommended size:** 1200x630px (Open Graph standard)
- **Content ideas:**
  - Knez Mihailova street view
  - Belgrade fortress with tech overlay
  - Modern office space in Belgrade
  - Team working with Belgrade skyline

### 2. Novi Sad Office Image  
**File:** `/public/images/novi-sad-office.jpg`
- **Recommended size:** 1200x630px
- **Content ideas:**
  - Danube river with tech elements
  - Petrovaradin fortress with modern twist
  - Tech park or startup hub
  - Modern coworking space

### 3. Niš Office Image
**File:** `/public/images/nis-office.jpg`
- **Recommended size:** 1200x630px
- **Content ideas:**
  - Niš fortress modernized
  - University area with tech vibe
  - Modern office or coworking space
  - City center with digital elements

## How to Create/Obtain Images

### Option 1: Stock Photos (Quick Solution)
1. Visit [Unsplash](https://unsplash.com) or [Pexels](https://pexels.com)
2. Search for: "Belgrade office", "Novi Sad", "Serbia technology"
3. Download high-resolution images
4. Edit and brand them

### Option 2: AI Generation (Modern Solution)
1. Use [Midjourney](https://midjourney.com) or [DALL-E](https://openai.com/dall-e-2)
2. Prompts to use:
   - "Modern tech office in Belgrade Serbia, professional photography"
   - "Novi Sad technology hub, contemporary workspace"
   - "Niš Serbia digital agency office, modern interior"

### Option 3: Professional Photography (Best Quality)
1. Hire local photographer
2. Schedule photoshoot at actual locations
3. Include team members for authenticity
4. Cost: €200-500 per location

### Option 4: Canva Design (Budget Friendly)
1. Go to [Canva](https://canva.com)
2. Create new design: 1200x630px
3. Use templates: "Office Facebook Cover"
4. Add your brand colors and logo
5. Include city landmarks as background

## Image Optimization

After creating/obtaining images:

1. **Resize to exact dimensions:**
   - Width: 1200px
   - Height: 630px
   - Format: JPEG (better compression)

2. **Compress images:**
   - Use [TinyJPG](https://tinyjpg.com)
   - Target size: < 200KB per image
   - Quality: 80-85%

3. **Add images to project:**
   ```bash
   # Create images directory if it doesn't exist
   mkdir -p public/images
   
   # Copy your images
   cp belgrade-office.jpg public/images/
   cp novi-sad-office.jpg public/images/
   cp nis-office.jpg public/images/
   ```

4. **Test Open Graph preview:**
   - Use [OpenGraph.xyz](https://opengraph.xyz)
   - Enter your URLs to preview how they'll look when shared

## Placeholder Images (Temporary Solution)

If you need placeholders immediately:

```bash
# Create placeholder images with ImageMagick
convert -size 1200x630 xc:gray -pointsize 60 -fill white -gravity center \
  -annotate +0+0 'Belgrade Office' public/images/belgrade-office.jpg

convert -size 1200x630 xc:gray -pointsize 60 -fill white -gravity center \
  -annotate +0+0 'Novi Sad Office' public/images/novi-sad-office.jpg

convert -size 1200x630 xc:gray -pointsize 60 -fill white -gravity center \
  -annotate +0+0 'Niš Office' public/images/nis-office.jpg
```

Or use online placeholder service:
- https://via.placeholder.com/1200x630/333/fff?text=Belgrade+Office