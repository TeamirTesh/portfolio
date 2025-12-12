# Image Folders

This directory contains images for the portfolio landing page slideshows and backgrounds.

## Folder Structure

- `professional/` - Images for the "Teamir Teshome" (professional) portal slideshow
- `personal/` - Images for the "ተአምር" (personal) portal slideshow
- `backgrounds/` - Background image for the coding/professional portal (fully replaces background when hovering)

## How to Add Images

1. Add your images directly to the respective folders:
   - Professional/tech images → `professional/` folder (for slideshow)
   - Personal/cultural images → `personal/` folder (for slideshow)
   - Coding background image → `backgrounds/` folder (only one image, fully replaces background)

2. Supported formats:
   - `.jpg` / `.jpeg`
   - `.png`
   - `.webp`
   - `.gif`

3. Slideshow images:
   - Images are sorted alphabetically by filename
   - The slideshow cycles through all images in the folder
   - If no images are found, fallback placeholder images will be used

4. Background image:
   - Add ONE image to the `backgrounds/` folder
   - This image will fully replace the background when hovering over the professional portal
   - If no background image is found, a default coding pattern will be used

## Tips

- Use descriptive filenames (e.g., `tech-project-1.jpg`, `ethiopia-trip-2.png`)
- Images will be automatically optimized by Next.js
- Recommended aspect ratio: 16:9 or 4:3 for best display
- Keep file sizes reasonable for faster loading

