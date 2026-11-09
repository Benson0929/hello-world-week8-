# Moiré Time — Four Ways of Seeing Time

Time, translated into geometry. A p5.js generative clock with four animated studies: Fold, Capsule, Cross, and Wave.

## Two ways to view the work

- **Real-time website — `index.html#home`**: the drawings build gradually over each local hour. At the next hour, progress resets and the completed lines fade out over two seconds.
- **Accelerated preview — `preview.html#home`**: quickly demonstrate a complete cycle. Approximately 60 seconds shows one hour of growth, followed by the two-second reset at normal speed. Play, pause, scrub the timeline, or restart.

The main homepage includes **WATCH A FULL CYCLE · 60× PREVIEW**. The preview has a return link to the real-time website. All paths are relative, so both pages work under the same GitHub Pages project URL.

**加速預覽頁可以快速展示完整一輪：從稀疏線條逐漸生成完整作品，再跨整點淡出歸零。正式網站維持真實時間，每小時一輪。**

## Time and geometry

- Hours control orientation, proportions, or arm opening.
- Minutes control hourly generation progress and the existing structural deformation.
- Seconds and milliseconds control smooth local motion and optical interference.
- Progress is `(minutes * 60 + seconds + milliseconds / 1000) / 3600`.
- Reloading or switching studies preserves the current time's generation state; no accumulated session history is needed.

Fold and Wave reveal curves from the center of their line families outward. Cross adds matching curves to all four arms. Capsule reveals contours from summit levels toward the base. Rendering retains the complete geometry for stable framing.

## Preview isolation

Only `preview.html` loads `preview.js` and `preview.css`. The production `index.html` uses the actual local clock. Preview controls do not change the device clock, browser storage, or production settings. The preview begins at `:00:02`, just after the previous cycle has faded, and pauses at the next `:00:02`.

## Files to publish together

```text
index.html
style.css
sketch.js
preview.html
preview.css
preview.js
.nojekyll
```

This is a static website with no build step. Keep these files together in the existing GitHub Pages publishing directory. Do not replace other repository files or deployment settings without checking the current configuration.

p5.js 1.11.3 is loaded from an HTTPS CDN, so an internet connection is required.

## Local preview

```sh
python3 -m http.server 5500 --bind 127.0.0.1
```

Open `http://127.0.0.1:5500/index.html#home` for the live clock, or `http://127.0.0.1:5500/preview.html#home` for the accelerated demonstration.
