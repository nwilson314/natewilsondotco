# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Personal website built with SvelteKit. This is a professional portfolio and blog that showcases technical depth while maintaining an authentic voice. The goal is to present work in a way that's appropriate for job applications—polished and credible, but not sterile or corporate.

**Design Philosophy:**
- Clean, editorial aesthetic over flashy or gimmicky
- Professional enough for hiring managers, personal enough to be memorable
- Let the technical content speak for itself
- Personality comes through in the writing, not visual tricks

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

- **Content source files** in `data/` directory (blogs, projects, games) authored in Markdown
- **Static assets** in `static/` directory (images, PDFs, playable games)
- **Shared components** in `src/lib/` (accessible via `$lib` alias)
- **Page routes** in `src/routes/` following SvelteKit conventions

## Design System

The site uses an editorial aesthetic with clear typographic hierarchy:

- **Fonts**: Inter (headings), Lora (body), JetBrains Mono (code)
- **Layout**: Constrained width (max-w-2xl for content, max-w-4xl for container)
- **Visual rhythm**: Left-border treatment on list items for structure
- **Color**: Minimal palette with blue accent, good dark mode support

## Content Writing Style

**CRITICAL:** Avoid corporate speak and marketing language. The site should feel like a real person wrote it.

- **Be honest about project status** - "paused," "didn't work out," "still figuring it out" are all fine
- **Include real challenges** - What was hard, what you learned, what you'd do differently
- **Use conversational language** - Write like you're explaining to a colleague
- **Show technical depth** - Include actual implementation details, not just high-level summaries
- **Admit uncertainty** - "I don't know if this is the right approach" builds more trust than false confidence

Examples of good vs bad:
- ❌ "Leveraged cutting-edge AI to deliver innovative storytelling experiences"
- ✅ "Turns out AI gets really repetitive when you give it complete creative freedom"

- ❌ "Successfully architected a scalable microservices platform"  
- ✅ "The performance is decent—about 0.25ms for 100k entities. Not amazing, but good enough."

## Key Files

- `src/routes/+page.svelte` - Homepage with intro, current activities, projects, writing
- `src/routes/+layout.svelte` - Root layout with global CSS imports and Prism.js setup
- `src/app.css` - Global Tailwind styles and typography
- `src/lib/utils/markdown.ts` - Content loading utilities
- `src/lib/utils/markdownRenderer.ts` - Custom markdown to HTML converter
- TypeScript config extends `.svelte-kit/tsconfig.json`
