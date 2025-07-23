---
title: "RoastNotes"
excerpt: "A community-driven platform for coffee enthusiasts to discover, rate, and share their coffee experiences with fellow coffee lovers."
date: "2025-05-15"
tags: ["web-app","coffee","community","social","reviews"]
featured: true
status: "completed"
github: ""
demo: "https://roastnotes.app"
technologies: ["SvelteKit","FastAPI","Python","TypeScript","Tailwind CSS","PostgreSQL"]
image: "landing_page_cup.png"
images: ["roastnotes-dashboard.png","roastnotes-profile.png","roastnotes-cupping.png"]
readTime: "3 min read"
updated: "2025-07-23"
---

![roastnotes landing page](roastnotes_landing.png)

# RoastNotes

A group of friends and I have been, every month, sending each other a "coffee of the month." We are scattered throughout the country so it was a good (but expensive) way of sharing our local coffee roasters with some fellow caffiene enthusiasts. We didn't really have a good way of keeping track of whether we actually enjoyed the coffee. Out of necessity, VOILA. Roastnotes was born.


## What Actually Happened

So the dream goal is this community-driven platform where coffee lovers discover amazing roasts and share their brewing wisdom. In reality, it's currently storing ratings from me and like 6 friends who remember to use it.

But honestly? That's fine. It solves the actual problem we had, which was "did we like that $20 bag of beans from Portland or not?"

## What's In There

The basic idea is pretty simple - rate coffee, add some notes about how you brewed it, maybe remember to check what your friends thought before ordering the same roast again.

**The stuff that works:**
- Rate the coffee roast based on your brew method
- Add brewing notes (grind size, method, whether you screwed up the timing)
- See what your friends rated stuff
- Remember which roasters consistently make good coffee
- If there were more people using the app, see how your group rates roasts vs. the rest of the world

## How I Built It

**Frontend**: SvelteKit because I had some experience with it at Skipper. TypeScript because I believe debugging compile-time errors is actually better than dealing with bugs at runtime despite the slower dev time. Tailwind for styling because writing CSS from scratch is for people with more time than me.

**Backend**: FastAPI with Python. It's basically my bread and butter for projects now. PostgreSQL because I know how to make it work and didn't want to learn a new database while figuring out coffee rating systems.

The ratings system with pseudo-cached aggregate ratings was the only really "hard" technical part of this project.

## Things I Figured Out

Turns out designing a rating system is weirdly hard from a UX/UI. Do you use numbers? Stars? Weird coffee terms that only enthusiasts understand? I went with a simple 0-5 scale because everyone gets that, and turned the score into a number of out 100. Sorta like what Beer Advocate does for beers.

Also learned that getting people to consistently use any app is basically impossible, even when it solves a real problem they have and they are your friends. Apparently habit formation is hard or something.

The database side was interesting too - modeling coffee ratings and brewing methods without making it feel like filling out a tax form. Still working on that balance.

## What's Next

Maybe someday it'll grow into the coffee community platform I originally envisioned. Maybe it'll stay a tool for tracking whether expensive mail-order coffee is worth it. Either way, it's useful, which is more than I can say for some projects I've built.

Currently pondering whether to add mobile apps or just accept that everyone uses their phone's browser anyway.