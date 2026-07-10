# Moneyfest public UI direction

- Hero sections use a full-bleed 50/50 layout: left side is clean midnight copy area, right side is a dedicated cropped visual panel.
- Never place the full-page mockup image inside the hero right panel.
- For each page, crop only the intended hero visual region from the supplied ChatGPT mockup source image.
- Prefer native-size PNG crops over upscaled raster assets to avoid blur/breakage.
- If the supplied mockup crop is visibly broken or pixelated, replace the hero panel with an AI-generated high-resolution visual that preserves the same composition, palette, and dark-academia financial mood.
- Use a subtle left-edge gradient only to blend the visual into the text area; do not cover the entire visual with a dark overlay.
- CTA buttons should stay single-line on desktop and preserve the proportions from the mockup.
- Icons that do not exist as files should be recreated as clean SVG/lucide-style line icons in code, not blurry raster placeholders.
