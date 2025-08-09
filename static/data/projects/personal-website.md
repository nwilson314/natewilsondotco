---
title: "Personal Website & Digital Garden"
excerpt: "My throwback digital garden built with SvelteKit - featuring blog series, project showcases, and way too much personality for a portfolio site."
date: "2025-07-16"
tags: ["SvelteKit","TypeScript","Tailwind CSS","Digital Garden","Web Development"]
featured: false
status: "in-progress"
github: "https://github.com/nwilson314/natewilsondotco"
demo: "https://natewilson.co"
technologies: ["SvelteKit","TypeScript","Tailwind CSS v4","Markdown"]
image: "personal-website-home.png"
images: ["personal-website-home.png","personal-website-blog.png","personal-website-dark.png"]
readTime: "3 min read"
updated: "2025-08-09"
---

# Personal Website & Digital Garden

This very website! Started as a "professional portfolio" but evolved into something way more (I hope) interesting - a digital garden where I can document projects, write about whatever's on my mind, and generally avoid the corporate portfolio aesthetic that makes everyone sound the same.

![natewilson.co landing page](personal_site_landing.png)

## What Actually Happened

I wanted a place to showcase projects without the usual "I leverage synergistic solutions" nonsense. I've also been a tinkerer and I have 100's of half baked projects and thoughts floating around. I figured I should codify them somehow.

## The Good Stuff

**Blog Series System**: Built a whole system for organizing related posts into series (like my continuing education curriculum). Features series landing pages, navigation between posts, and the ability to feature entire series instead of just individual posts.

**Project Showcase**: Three different sections - "Actually Proud Of These", "Currently Cooking", and "Experiments & Side Quests".

**Image System**: Comprehensive image handling for both projects and blog posts, with automatic fallbacks and proper markdown rendering. Supports both thumbnails and gallery images.

**Personality Over Polish**: Deliberately chose authentic voice over professional corporate speak. The about page literally has ASCII art and talks about farm life.

## How I Built It

**Why SvelteKit instead of a static generator?**: Honestly, I probably could have gotten away with a static site generator like Hugo or something. However, I wanted the flexibility to add interactive features later without rebuilding everything. Plus I was already familiar with Svelte from work, and the component-based development just feels cleaner than managing a bunch of HTML templates. The hybrid approach means I get static site performance but can add dynamic features when I inevitably want to over-engineer something.

**SvelteKit + Svelte 5**: Used the new runes API (`$props()` instead of `export let`) because I like living on the edge. The reactivity model is actually really nice once you get used to it.

**Markdown Everything**: Blog posts and projects are all markdown files with frontmatter. Built a custom renderer that handles images, code blocks, and maintains the design system. I might come back to this in the future but for now, it is "good enough" for what I need.

**Mobile-First**: Added proper hamburger menu functionality and made sure everything works on phones, because that's where most people will actually read this stuff.

## Technical Stuff That Was Fun

The blog series system was the most complex part. I had to build aggregation logic, series landing pages, and navigation between posts while keeping it flexible enough for both standalone posts and series content.

Image handling was trickier than expected. Built automatic path resolution so you can just write `![Description](image.png)` and it finds the right image in the right folder. With simple markdown, I get fully styled, responsive images with automatic captions and dark mode support.

The markdown renderer got pretty sophisticated (and not really in a good way). It handles everything from syntax highlighting to automatic image styling while maintaining the site's design consistency. Again, I will probably come back to this to build a proper parser instead of the regex monster that it currently is.

## What's Next

Always evolving. Currently thinking about adding:
- Comment system for blog posts (maybe, but probably not)
- Search functionality
- Newsletter signup (if I ever start writing consistently)
- More interactive elements and animations

But honestly, the current version does what I need it to do. It gives me a place to share work and thoughts without conforming to what everyone thinks a "developer portfolio" should look like.