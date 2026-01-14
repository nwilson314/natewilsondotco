# Game Deployment Instructions

This document outlines how to build and deploy games to the website, specifically "The Last Polygon".

## The Last Polygon

### Location
- Source Code: (Your local game repo)
- Website Location: `static/play/the-last-polygon/`

### How It Works
The game is built as a static WebAssembly (WASM) application. The website serves these static files directly. 

**Crucial Note:** The `index.html` file in `static/play/the-last-polygon/` is **customized** for this website. It contains specific absolute paths (`/play/the-last-polygon/...`) to ensure assets load correctly regardless of the URL structure.

### Update Workflow
When you have a new version of the game ready:

1.  **Build the game** (usually `odin build . -target:js_wasm32`).
2.  **Copy ONLY these files** from your build output to `static/play/the-last-polygon/`:
    *   `index.wasm` (The game logic)
    *   `index.js` (Emscripten glue)
    *   `index.data` (Assets/Sounds)
    *   `odin.js` (Odin runtime)
3.  **DO NOT OVERWRITE `index.html`**. 
    *   If you accidentally overwrite it, you must restore the version that uses absolute paths (`/play/the-last-polygon/...`) and the `locateFile` hook.

### Troubleshooting
*   **"Odin is not defined":** Likely a path issue in `index.html`. Ensure `odin.js` is loaded before the main script.
*   **404 on .data or .wasm:** Ensure the `Module.locateFile` function in `index.html` is correctly pointing to `/play/the-last-polygon/`.
*   **OOM (Out of Memory):** Rebuild the game with `-extra-linker-flags:"-sALLOW_MEMORY_GROWTH=1"`.

