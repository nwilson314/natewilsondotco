# SvelteKit Integration Guide for The Last Polygon

## Overview
This guide explains how to integrate The Last Polygon's web build into a SvelteKit site with a scalable games section that can accommodate all 6 planned games.

## File Structure Setup

### 1. Create Route Structure
```
src/routes/
  games/
    +page.svelte                    # Games gallery/list page
    the-last-polygon/
      +page.svelte                  # Individual game page
```

### 2. Static Assets Location
```
static/
  games/
    the-last-polygon/
      index.js                      # Emscripten generated JS
      index.wasm                    # Main WASM binary  
      index.data                    # Preloaded assets/levels
      odin.js                       # Odin runtime
      game.js                       # Game-specific JS
      game.wasm                     # Game WASM
```

## Code Implementation

### Games Gallery Page (`src/routes/games/+page.svelte`)
```svelte
<script>
  const games = [
    {
      title: "The Last Polygon",
      slug: "the-last-polygon", 
      description: "Geometric bullet heaven - survive the mathematical carnage!",
      status: "Complete",
      playable: true
    }
    // Future games will be added here as they're completed
    // Game 2, Game 3, etc.
  ];
</script>

<svelte:head>
  <title>Games - Your Site Name</title>
  <meta name="description" content="Collection of indie games built over 5 years" />
</svelte:head>

<div class="games-section">
  <h1>Games</h1>
  <p>A 6-game journey to build a sustainable indie game studio</p>
  
  <div class="games-grid">
    {#each games as game}
      <div class="game-card" class:playable={game.playable}>
        <h2>
          {#if game.playable}
            <a href="/games/{game.slug}">{game.title}</a>
          {:else}
            {game.title}
          {/if}
        </h2>
        <p>{game.description}</p>
        <div class="game-meta">
          <span class="status status-{game.status.toLowerCase()}">{game.status}</span>
          {#if game.playable}
            <a href="/games/{game.slug}" class="play-button">Play Now</a>
          {/if}
        </div>
      </div>
    {/each}
  </div>
</div>

<style>
  .games-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2rem;
    margin-top: 2rem;
  }
  
  .game-card {
    border: 2px solid #333;
    border-radius: 8px;
    padding: 1.5rem;
    background: #1a1a1a;
    color: white;
  }
  
  .game-card.playable {
    border-color: #0066cc;
  }
  
  .game-card h2 a {
    color: #0066cc;
    text-decoration: none;
  }
  
  .game-meta {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 1rem;
  }
  
  .status-complete { color: #00cc66; }
  .status-in-progress { color: #ffaa00; }
  .status-planned { color: #666; }
  
  .play-button {
    background: #0066cc;
    color: white;
    padding: 0.5rem 1rem;
    border-radius: 4px;
    text-decoration: none;
    font-weight: bold;
  }
</style>
```

### Individual Game Page (`src/routes/games/the-last-polygon/+page.svelte`)
```svelte
<script>
  import { onMount } from 'svelte';
  
  onMount(() => {
    // Game initialization will happen here
    // See "Game Integration Script" section below
  });
</script>

<svelte:head>
  <title>The Last Polygon - Geometric Bullet Heaven</title>
  <meta name="description" content="A bullet heaven game where everything is geometric shapes. No sprites, no assets, just pure mathematical carnage." />
</svelte:head>

<div class="game-page">
  <nav class="game-nav">
    <a href="/games">← Back to Games</a>
  </nav>
  
  <header class="game-header">
    <h1>The Last Polygon</h1>
    <p>Geometric bullet heaven - survive the mathematical carnage!</p>
    <div class="game-info">
      <span>Controls: WASD to move, auto-fires at enemies</span>
    </div>
  </header>

  <div class="game-container">
    <canvas id="canvas" class="game_canvas"></canvas>
    <div class="loading" id="loading">Loading The Last Polygon...</div>
  </div>
</div>

<style>
  .game-page {
    max-width: 1400px;
    margin: 0 auto;
    padding: 2rem;
  }
  
  .game-nav a {
    color: #0066cc;
    text-decoration: none;
    font-weight: bold;
  }
  
  .game-header {
    text-align: center;
    margin: 2rem 0;
  }
  
  .game-info {
    margin-top: 1rem;
    color: #666;
  }
  
  .game-container {
    position: relative;
    display: flex;
    justify-content: center;
    margin: 2rem 0;
  }
  
  .game_canvas {
    border: 2px solid #333;
    background-color: black;
    display: block;
    max-width: 100%;
    height: auto;
  }
  
  .loading {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: white;
    font-size: 1.5rem;
    z-index: 10;
  }
</style>
```

## Game Integration Script

Add this to the `onMount` function in the individual game page. **Copy the entire script section from your generated `builds/web/index.html`**:

```javascript
// Copy everything between <script> tags from builds/web/index.html
// This includes:
// - odinMemoryInterface setup
// - Module configuration with instantiateWasm
// - Game loop initialization
// - Event listeners
```

## Asset Management

### 1. Copy Web Build Assets
```bash
# From your game project directory:
cp builds/web/*.{js,wasm,data} /path/to/sveltekit/static/games/the-last-polygon/
```

### 2. Update Asset Paths
In the copied script, ensure all asset paths point to `/games/the-last-polygon/`:
- `fetch("index.wasm")` → `fetch("/games/the-last-polygon/index.wasm")`
- `src="odin.js"` → `src="/games/the-last-polygon/odin.js"`
- etc.

## SvelteKit Configuration

### vite.config.js (if needed)
```javascript
import { defineConfig } from 'vite';
import { sveltekit } from '@sveltejs/kit/vite';

export default defineConfig({
  plugins: [sveltekit()],
  server: {
    fs: {
      allow: ['..']
    }
  },
  optimizeDeps: {
    exclude: ['@sveltejs/kit']
  }
});
```

## Deployment Considerations

### 1. Static Adapter (Recommended)
For hosting on static sites (Netlify, Vercel, GitHub Pages):
```javascript
// svelte.config.js
import adapter from '@sveltejs/adapter-static';

export default {
  kit: {
    adapter: adapter({
      pages: 'build',
      assets: 'build',
      fallback: null
    })
  }
};
```

### 2. MIME Types
Ensure your hosting provider serves `.wasm` files with correct MIME type:
```
.wasm -> application/wasm
```

### 3. File Compression
Enable gzip/brotli compression for:
- `.js` files
- `.wasm` files  
- `.data` files

## Scaling for Future Games

### Adding Game 2
1. Create `src/routes/games/game-2/+page.svelte`
2. Add assets to `static/games/game-2/`
3. Update the games array in `games/+page.svelte`:

```javascript
const games = [
  {
    title: "The Last Polygon",
    slug: "the-last-polygon",
    description: "Geometric bullet heaven",
    status: "Complete",
    playable: true
  },
  {
    title: "Game 2 Name",
    slug: "game-2", 
    description: "Description of game 2",
    status: "In Progress",
    playable: false
  }
];
```

## Testing

1. **Local development**: `npm run dev`
2. **Production build**: `npm run build && npm run preview`
3. **Cross-browser testing**: Test in Chrome, Firefox, Safari
4. **Mobile testing**: Ensure touch controls work properly

## Troubleshooting

### Common Issues
- **WASM loading fails**: Check file paths and MIME types
- **Canvas not responsive**: Add CSS media queries for mobile
- **Audio doesn't work**: Add user interaction requirement for web audio
- **Performance issues**: Consider adding loading screens or reduced quality options

### Browser Console Errors
- Check for missing assets in Network tab
- Look for JavaScript errors in Console tab
- Verify WebAssembly support in browser

## Security Notes
- All game assets are client-side (no server-side processing needed)
- Consider adding Content Security Policy headers
- HTTPS recommended for WebAssembly features

---

This setup provides a clean, scalable foundation for showcasing all 6 games in your indie game studio journey while maintaining the professional look of your SvelteKit site.