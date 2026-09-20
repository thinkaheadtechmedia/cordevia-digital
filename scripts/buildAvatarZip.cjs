const fs = require('fs');
const path = require('path');
const JSZip = require('jszip');

async function buildZip() {
  const zip = new JSZip();

  const publicDir = path.join(__dirname, '..', 'public');
  const masterSvgPath = path.join(publicDir, 'cordevia-social-profile-picture.svg');
  const circularSvgPath = path.join(publicDir, 'cordevia-avatar-circular.svg');

  const masterSvg = fs.existsSync(masterSvgPath) ? fs.readFileSync(masterSvgPath, 'utf8') : '';
  const circularSvg = fs.existsSync(circularSvgPath) ? fs.readFileSync(circularSvgPath, 'utf8') : '';

  // 1. Root master files
  zip.file('cordevia-social-profile-picture-1024x1024.svg', masterSvg);
  zip.file('cordevia-avatar-circular-1024x1024.svg', circularSvg);

  // 2. Vector folder
  const vectorFolder = zip.folder('01-vector-svg-masters');
  vectorFolder.file('cordevia-master-profile-picture.svg', masterSvg);
  vectorFolder.file('cordevia-circular-crop-avatar.svg', circularSvg);

  // Additional colorway variants
  const emeraldSvg = masterSvg
    .replace(/#0e1726/g, '#06201a')
    .replace(/#04060a/g, '#020d0b')
    .replace(/#06b6d4/g, '#10b981')
    .replace(/#0891b2/g, '#059669')
    .replace(/#38bdf8/g, '#34d399')
    .replace(/#22d3ee/g, '#10b981');
  vectorFolder.file('cordevia-avatar-emerald-matrix.svg', emeraldSvg);

  const titaniumSvg = masterSvg
    .replace(/#0e1726/g, '#1e293b')
    .replace(/#04060a/g, '#090d16')
    .replace(/#06b6d4/g, '#94a3b8')
    .replace(/#0891b2/g, '#64748b')
    .replace(/#38bdf8/g, '#f8fafc')
    .replace(/#22d3ee/g, '#cbd5e1');
  vectorFolder.file('cordevia-avatar-platinum-titanium.svg', titaniumSvg);

  const solarSvg = masterSvg
    .replace(/#0e1726/g, '#261706')
    .replace(/#04060a/g, '#0c0702')
    .replace(/#06b6d4/g, '#f59e0b')
    .replace(/#0891b2/g, '#d97706')
    .replace(/#38bdf8/g, '#fbbf24')
    .replace(/#22d3ee/g, '#f59e0b');
  vectorFolder.file('cordevia-avatar-solar-amber.svg', solarSvg);

  // 3. Platform-specific guidance folder
  const specsFolder = zip.folder('02-platform-specs-and-guidelines');
  
  const readmeContent = `================================================================================
CORDEVIA DIGITAL — OFFICIAL SOCIAL MEDIA PROFILE PICTURE ASSET PACK
================================================================================
Agency: Cordevia Digital (Formerly Tarana Group)
Website: https://cordeviadigital.com
Identity: Media-Tech Engineering, YouTube Scale, Algorithmic SEO & Web Systems
Version: 2.4 (High-Resolution Master Suite)

--------------------------------------------------------------------------------
1. RECOMMENDED PLATFORM UPLOAD SPECS
--------------------------------------------------------------------------------
• YouTube Channel Icon:
  - Required Size: 800 x 800 px (Circular Crop)
  - Recommended File: cordevia-avatar-circular-1024x1024.svg or rendered PNG
  - Safe Zone: Centered within 80% circle diameter (already calibrated)

• X / Twitter Profile Picture:
  - Required Size: 400 x 400 px (Circular Crop)
  - Recommended File: cordevia-avatar-circular-1024x1024.svg or rendered PNG

• LinkedIn Company Page Logo:
  - Required Size: 400 x 400 px (Square / Circular)
  - Recommended File: cordevia-social-profile-picture-1024x1024.svg

• Instagram Profile Picture:
  - Required Size: 320 x 320 px (Circular Crop)
  - Highlight Story Ring: Compatible with native gradient borders

• TikTok Profile Picture:
  - Required Size: 200 x 200 px (Circular Crop)

• WhatsApp Business & Telegram Channel / Store:
  - Required Size: 500 x 500 px or 1024 x 1024 px
  - Profile avatar for @CordeviaStore and @CordeviaStoreBot

--------------------------------------------------------------------------------
2. COLOR PALETTE & CODES
--------------------------------------------------------------------------------
• Primary Electric Cyan:  #06B6D4 (RGB: 6, 182, 212)
• Celestial Teal:         #14B8A6 (RGB: 20, 184, 166)
• Neon Emerald:           #10B981 (RGB: 16, 185, 129)
• Sky Highlight:          #38BDF8 (RGB: 56, 189, 248)
• Cosmic Obsidian Base:   #04060A to #0E1726
• Text / Light Specular:  #FFFFFF and #F8FAFC

--------------------------------------------------------------------------------
3. HOW TO USE THESE ASSETS
--------------------------------------------------------------------------------
• For SVG-compatible platforms: Directly upload the SVG files for infinite clarity.
• For PNG uploads: You can use the in-app Social Avatar Studio at:
  https://ais-pre-dbzrdxi2ld4xyxy453x4le-171458272362.europe-west1.run.app
  to instantly generate 1024x1024, 800x800, or 400x400 PNGs with 1 click!

All rights reserved © Cordevia Digital.
`;
  specsFolder.file('README-PROFILE-PICTURE-GUIDELINES.txt', readmeContent);

  const colorsContent = `CORDEVIA DIGITAL COLOR SYSTEM:
------------------------------------------
Primary Background Center:    #0E1726
Primary Background Edge:      #04060A
Badge Frame Fill:             #080D18
Glow Cyan Accent:             #06B6D4
Glow Teal Accent:             #14B8A6
Glow Emerald Accent:          #10B981
Monogram Specular Edge:       #E0F2FE / #FFFFFF
Satellite Energy Node:        #38BDF8
`;
  specsFolder.file('BRAND-HEX-CODES.txt', colorsContent);

  // Generate ZIP
  const content = await zip.generateAsync({ 
    type: 'nodebuffer', 
    compression: 'DEFLATE',
    compressionOptions: { level: 9 }
  });

  const zipOutputPath = path.join(publicDir, 'cordevia-profile-pictures.zip');
  fs.writeFileSync(zipOutputPath, content);
  console.log('Successfully generated:', zipOutputPath, `(${content.length} bytes)`);
}

buildZip().catch(console.error);
