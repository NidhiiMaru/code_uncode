/**
 * compress-images.js
 * Converts ALL PNG/JPG images inside public/ to WebP (quality 82).
 * Originals are kept as fallback. WebP files are placed next to the originals.
 *
 * Usage:
 *   npm run compress              ← convert everything in public/
 *   npm run compress logos        ← only convert public/logos/
 *   npm run compress parallax/parallax_water foreground-layer.png
 *
 * Run this whenever you add new images to the project.
 */

const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

const PUBLIC_DIR = path.join(__dirname, "../public");

// ── helpers ──────────────────────────────────────────────────────────────────

function walkDir(dir, fileList = []) {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
        const full = path.join(dir, entry.name);
        if (entry.isDirectory()) {
            walkDir(full, fileList);
        } else if (/\.(png|jpg|jpeg)$/i.test(entry.name)) {
            fileList.push(full);
        }
    }
    return fileList;
}

async function convertFile(filePath) {
    const outPath = filePath.replace(/\.(png|jpg|jpeg)$/i, ".webp");
    const rel = path.relative(PUBLIC_DIR, filePath);

    // Skip if WebP already exists AND is newer than the source
    if (fs.existsSync(outPath)) {
        const srcMtime = fs.statSync(filePath).mtimeMs;
        const outMtime = fs.statSync(outPath).mtimeMs;
        if (outMtime >= srcMtime) {
            console.log(`  ✓ skip  ${rel}  (WebP up to date)`);
            return;
        }
    }

    const srcKB = Math.round(fs.statSync(filePath).size / 1024);

    try {
        await sharp(filePath).webp({ quality: 82, effort: 4 }).toFile(outPath);
        const outKB = Math.round(fs.statSync(outPath).size / 1024);
        const pct = Math.round((1 - outKB / srcKB) * 100);
        console.log(`  ✅ ${rel}  →  ${path.basename(outPath)}  (${srcKB} KB → ${outKB} KB, −${pct}%)`);
    } catch (err) {
        console.error(`  ❌ FAILED ${rel}: ${err.message}`);
    }
}

// ── main ─────────────────────────────────────────────────────────────────────

(async () => {
    // Args after "node scripts/compress-images.js" are optional path filters
    const args = process.argv.slice(2); // e.g. ["logos"] or ["parallax/parallax_water", "foreground-layer.png"]

    let files = walkDir(PUBLIC_DIR);

    // If the user passed path filters, only keep matching files
    if (args.length > 0) {
        files = files.filter((f) => {
            const rel = path.relative(PUBLIC_DIR, f).replace(/\\/g, "/");
            return args.some((arg) => rel.includes(arg.replace(/\\/g, "/")));
        });

        if (files.length === 0) {
            console.log(`⚠️  No PNG/JPG files found matching: ${args.join(", ")}`);
            console.log(`   (Searched inside: ${PUBLIC_DIR})`);
            process.exit(0);
        }
    }

    console.log(`\n🗜️  Converting ${files.length} image(s) to WebP...\n`);

    for (const f of files) {
        await convertFile(f);
    }

    console.log("\n✨ Done!\n");
    console.log("📝 Remember to update the image extension to .webp in your source files.");
    console.log("   e.g. my-image.png  →  my-image.webp\n");
})();
