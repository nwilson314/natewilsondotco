---
title: "The Last Polygon"
excerpt: "A simple, shapes-only, bullet heaven game built in Odin with Raylib"
date: "2025-08-03"
tags: ["odin", "gamedev", "bullet-heaven", "geometry", "2d"]
featured: true
status: "complete"
playable: true
github: ""
demo: ""
technologies: ["Odin", "Raylib", "WebAssembly", "Emscripten", "ECS"]
image: "the-last-polygon.png"
---

# The Last Polygon

**The Last Polygon** is a simple, shapes-only, bullet heaven game built in Odin with Raylib. Inspired by Brotato and other bullet heaven/hell games, everything (outside of the title image) is pure code-generated shapes.

You play as a lone polygon through 20 levels of increasingly difficult hostile geometric foes. Your guns autofire at the enemies as you collect their fallen scrap which can be used to purchase new weapons and upgrades at the Shop between levels.

You can play in the browswer with the link above (you need a keyboard so mobile is out... sorry!) or download via the following link on itch (link to come).

## How to Play

- **WASD** to move your triangle around
- **Auto-fire** at nearby enemies
- **Survive** increasingly ridiculous waves of geometric enemies
- **Collect** scrap to purchase weapons and upgrades at the midlevel shop

## The Why Behind It

I've always been interested in making my own game so I decided that now was as good a time as any go down that path. I've often heard that one of the biggest pit falls for new indie game devs is that they start with their dream game and quickly get lost in all of the various game mechanics. So, instead, I did the opposite. I decided to see what I could do with 3 weeks, leaving the last week to put together some "promotional" materials (like the one you're reading now!).

Because of the extreme contstraint, I decided that I was going to keep things as simple as possible. Obviously, games like Brotato and Vampire Survivors are extremely polished and layered games that are really fun to play. But the concept is easy to conceptualize. And because I haven't ever really built anything I decided that I wouldn't mess around at all with sprites.

I had been playing around with **Odin** for awhile as a systems language so it seemed like this was as good a time as any. [Karl Zylinski](https://zylinski.se/) had posted a few interesting articles about using **Odin** and **Raylib** for an honest to goodness real game so it seemed like this was perfect for what I was trying to do. **Raylib** is dead simple and while not really a full on engine, it actually leaves things open ended enough to be flexible in your designs.

## Some Other Technical Stuff

Prior to starting this project I had begun building out a reaaaal [simple EC(S)](https://www.natewilson.co/projects/raven-ecs) (where the S is very silent in this case). It was more or less my first "real" Odin project and I honestly didn't really know what I was doing. It seems to work fairly well (at least for this implementation). When doing testing, most of the limitations for FPS were actually in the Raylib shape rendering loop and not in the ECS (with about 10k shapes). It was a fun exercise and I got to actually battle test it. I ended up rewriting the querying API to allow either a more ergonomic approach (for when you're not in a hot loop) or a more performance based one.

## Web Integration

Getting this to work in the browser was... an adventure. Initially tried to integrate the WebAssembly directly into the SvelteKit component system, but Emscripten really wants to control the entire initialization flow.

The game runs in its native `index.html` environment (exactly as Emscripten intended).

**Build process:**
1. `odin build . -target:js_wasm32` generates the web files
2. Copy `index.html`, `index.js`, `index.wasm`, `index.data`, `odin.js` to `/static/play/the-last-polygon/`
3. The SvelteKit route links to it directly

Turns out the "just use what works" approach is often the right one.

## Things I Learned

Turns out making a game with only geometric shapes is actually pretty liberating. No worrying about art style consistency, no animation blending issues, no texture memory management. Just "make the blue square chase the black hexagon" and call it gameplay.

Also learned that Odin's compile times are actually fast enough to do the feedback loop of "change code, compile, test". It takes seconds instead of minutes (which was kinda the norm when I had been playing around with Rust in years past).

Finally, probably the most important lesson: the actual game systems coding is relatively straight forward. You piece together the game mechanics bit by bit and you end up with the building blocks for a game. What I wasn't expecting was the "polish" phase to be so rough. I spent a HUGE amount of time just playing the game and trying to make it both fun and challenging. It was hard! I had an incredibly small surface area compared to "real" games in the genre (and in general I suppose) and it was rough getting things to click together. I never really found the best balance, but time contraints (even self imposed ones) win out.

## What's Next

So this was Game 1 of some indeterminant number of games. 

I learned a lot but I'm ready to start to expand a bit. I had this idea that I was going to progressively create more and more complex games, learning new mechanics and how to actually ship things.

With that said, Game 2 is already in the works and I'm thinking something with actual sprites this time. Maybe. Probably.

---