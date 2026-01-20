---
title: "natewilson.co"
excerpt: "This very site!"
date: "2025-07-16"
tags: ["SvelteKit","TypeScript","Personal Site"]
featured: false
status: "completed"
github: "https://github.com/nwilson314/natewilsondotco"
demo: "https://natewilson.co"
technologies: ["SvelteKit 5","TypeScript","Tailwind CSS v4","Markdown","SSR"]
image: "personal_site_landing.png"
images: ["personal_site_landing.png"]
readTime: "1 min read"
updated: "2026-01-20"
---

# natewilson.co

A personal site for documenting projects and writing. I wanted somewhere to put stuff without it feeling like a LinkedIn extension.

## Why

I never really wanted a personal website. But I like having a place to write that I own, and it's useful to have project documentation somewhere other than GitHub READMEs.

## Tech

SvelteKit with markdown content. I've been learning Svelte through work and side projects, so this was an excuse to get more comfortable with it. I'm primarily a backend developer, so the frontend stuff is still new to me.

Blog posts and projects are markdown files with frontmatter. I built a custom renderer that handles images, code blocks, and syntax highlighting. Probably overkill for what I need, but once I started I just kept going.

## The SSR migration

Originally I had everything loading client-side. Worked fine for browsing, but search engines and LLMs were only seeing "Loading..." placeholders. Had to convert the whole thing to server-side rendering with prerendering.

The fix: `+page.server.ts` files that read markdown at build time, `adapter-static` instead of `adapter-auto`, and replacing all the `onMount()` data fetching with server-side data. Now pages load with content already rendered.