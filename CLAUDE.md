# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Personal website built with SvelteKit to showcase projects, host blog posts, and serve as a digital garden. Content is primarily authored in Markdown and rendered as HTML.

## Development Commands

- `npm run dev` - Start development server
- `npm run dev -- --open` - Start development server and open in browser
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run check` - Run TypeScript and Svelte checks
- `npm run check:watch` - Run checks in watch mode

## Architecture

SvelteKit project with TypeScript and Tailwind CSS v4. Uses:

- **SvelteKit**: File-based routing with markdown content integration
- **Svelte 5**: New runes API (`$props()` instead of `export let`)
- **TypeScript**: Strict mode enabled
- **Tailwind CSS v4**: Styling via Vite plugin
- **Markdown**: Primary content authoring format

## Content Structure

- Blog posts and project content authored in Markdown
- Static content in `static/` directory
- Shared components in `src/lib/` (accessible via `$lib` alias)
- Page routes in `src/routes/` following SvelteKit conventions

## Key Files

- `src/routes/+layout.svelte` - Root layout with global CSS imports
- `src/app.css` - Global Tailwind styles
- TypeScript config extends `.svelte-kit/tsconfig.json`