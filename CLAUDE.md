# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Personal website built with SvelteKit - but this isn't your typical portfolio site. This is a **digital garden** 🌱 that harks back to the good ole internet days (late 90s/early 2000s) where personal sites had character and visiting someone's corner of the internet felt like exploring their actual space.

**Vibe Check:**
- More "come hang out in my digital living room" than "hire me portfolio"
- Personality-driven copy over corporate speak
- Fun, exploratory navigation rather than sterile business cards
- Early web nostalgia with modern tech underneath
- Content is authored in Markdown and rendered as HTML

## Development Commands

- `npm run dev` - Start development server
- `npm run dev -- --open` - Start development server and open in browser
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run check` - Run TypeScript and Svelte checks
- `npm run check:watch` - Run checks in watch mode

## Development Workflow

**IMPORTANT:** After making code changes, always verify the project compiles without errors before considering the task complete. Use this command pattern:

```bash
npm run dev &
sleep 5
pkill -f "vite dev"
```

This starts the dev server in background, waits 5 seconds to catch compilation errors, then kills the process. If there are compilation errors, they will be visible in the output.

## Architecture

SvelteKit project with TypeScript and Tailwind CSS v4. Uses:

- **SvelteKit**: File-based routing with markdown content integration
- **Svelte 5**: New runes API (`$props()` instead of `export let`)
- **TypeScript**: Strict mode enabled
- **Tailwind CSS v4**: Styling via Vite plugin
- **Markdown**: Primary content authoring format

## Content Structure

- **Digital garden content** in `data/` directory (blogs, projects) authored in Markdown
- **Static assets** in `static/` directory (images, PDFs, etc.)
- **Shared components** in `src/lib/` (accessible via `$lib` alias)
- **Page routes** in `src/routes/` following SvelteKit conventions

## Design Philosophy

When working on this site, keep in mind:

1. **Personality over polish** - A little rough around the edges is fine if it has character
2. **Conversational tone** - Write like you're talking to a friend, not a hiring manager
3. **Fun interactions** - Hover effects, subtle animations, playful elements
4. **Nostalgic touches** - ASCII art, visitor counters, "last updated" timestamps
5. **Actual content over generic descriptions** - Show real project titles, current interests, etc.

## Content Writing Style

**CRITICAL:** Avoid corporate speak and marketing language. The site has personality, not polish.

- **Be honest about failures** - "This didn't work out" is better than "strategic pivot"
- **Include real challenges** - AI is repetitive, projects get slow, things break
- **Use conversational language** - Write like you're explaining to a friend over coffee
- **Admit when things suck** - "Turns out AI isn't very creative when given completely open prompts"
- **Include actual technical details** - Show real problems, not sanitized success stories
- **Be specific about what you learned** - Include the messy, frustrating parts

Examples of good vs bad:
- ❌ "Leveraged cutting-edge AI to deliver innovative storytelling experiences"
- ✅ "Turns out AI gets really repetitive when you give it complete creative freedom"

- ❌ "Successfully implemented dynamic content generation"  
- ✅ "The stories it generates are honestly kind of boring after a while"

## Key Files

- `src/routes/+page.svelte` - Homepage with digital garden welcome
- `src/routes/+layout.svelte` - Root layout with global CSS imports  
- `src/app.css` - Global Tailwind styles
- `src/lib/utils/markdown.ts` - Content loading utilities
- `src/lib/utils/markdownRenderer.ts` - Custom markdown to HTML converter
- TypeScript config extends `.svelte-kit/tsconfig.json`