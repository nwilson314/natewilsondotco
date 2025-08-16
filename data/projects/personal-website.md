---
title: "Personal Website & Digital Garden"
excerpt: "A performant, SEO-optimized digital garden built with SvelteKit 5, featuring server-side rendering, markdown-based content, and a custom design system."
date: "2025-07-16"
tags: ["SvelteKit", "TypeScript", "Digital Garden"]
featured: false
status: "completed"
github: "https://github.com/nwilson314/natewilsondotco"
demo: "https://natewilson.co"
technologies: ["SvelteKit 5", "TypeScript", "Tailwind CSS v4", "Markdown", "SSR"]
image: "personal_site_landing.png"
images: ["personal_site_landing.png"]
---

# Personal Website & Digital Garden

This very website! Started as a "professional portfolio" but evolved into something way more (I hope) interesting - a digital garden where I can document projects, write about whatever's on my mind.

![natewilson.co landing page](personal_site_landing.png)

## About

I've never felt the need for a personal website. It always felt somehow self-aggrandizing. But I miss the late 90s/early 00s internet vibe where people put weird stuff on their sites just because. That's what I wanted this to be.

## Tech Stack

It's just Sveltekit with some markdown that I'm generating HTML from. It's super basic but it gets the job done for what I want. I've been messing around with Svelte for a little while now and so this was just another extension of trying to learn a bit more about frontend development since I'm coming from a primarily backend focus.

## Design and Code Challenges

Blog posts and projects are all markdown files with frontmatter. I built a custom renderer that handles images, code blocks, and maintains the design system. The whole custom markdown generator was probably a waste of time but once I got going, I just kept it. It handles everything from syntax highlighting to automatic image styling while maintaining the site's design consistency. Plus if I want to style things a particular way, I can!

The blog series system was the most complex part. I had to build aggregation logic, series landing pages, and navigation between posts while keeping it flexible enough for both standalone posts and series content. Image handling was trickier than expected too - I built automatic path resolution so you can just write `![Description](image.png)` and it finds the right image in the right folder.

Recently, I realized that I was running everything from the client side. The site was functional but if I tried to point anything to it (LLMs and just plain grabbing the site myself), I was just seeing the placeholders. So that means that search engines were only seeing "Loading..." text as well. I realized I needed to fundamentally change how the site worked.

I converted the entire site from client-side rendering to **server-side rendering with prerendering**. Instead of JavaScript fetching content after the page loads, all the markdown files are now processed during the build process. The result? Pages that load instantly with all content already rendered.

**Before**: User visits `/projects` → sees "Loading..." for 3-5 seconds → JavaScript fetches data → content finally appears
**After**: User visits `/projects` → sees all projects immediately → JavaScript loads in background for interactivity

The technical implementation involved creating `+page.server.ts` files that read markdown during build time, switching from `adapter-auto` to `adapter-static`, and updating all the page components to use server-side data instead of `onMount()` calls.

## The Personality

I deliberately chose authentic voice over professional corporate speak. The about page literally has ASCII art and talks about farm life. This isn't a portfolio designed to impress recruiters (though, hi!). It's a digital garden where I can share work and thoughts without conforming to what everyone thinks a "developer portfolio" should look like.

## What's Next

Always evolving. Currently thinking about adding search functionality across all content, maybe a newsletter integration, and some kind of analytics. But honestly, the current version does what I need it to do. It gives me a place to share work and thoughts while demonstrating that you can build something performant and professional without losing personality.