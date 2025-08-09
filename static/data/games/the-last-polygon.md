---
title: "The Last Polygon"
excerpt: "Geometric bullet heaven - survive the mathematical carnage! Everything is shapes, no sprites, just pure mathematical mayhem."
date: "2025-01-15"
tags: ["odin","gamedev","bullet-heaven","geometry","2d"]
featured: true
status: "complete"
playable: true
github: ""
demo: ""
technologies: ["Odin","WebGL","Canvas","WebAssembly"]
image: "the-last-polygon.png"
readTime: "2 min read"
updated: "2025-08-09"
---

# The Last Polygon

Welcome to **The Last Polygon** - a bullet heaven game where everything is geometric shapes. No sprites, no fancy art assets, just pure mathematical carnage rendered in real-time.

## What Actually Happened

I set out to make a simple game in Odin and ended up with something that looks like a geometry textbook exploded. But honestly? It works. The constraints of using only basic shapes forced me to focus on gameplay mechanics rather than getting lost in art asset hell.

## How to Play

- **WASD** to move your triangle around
- **Auto-fire** at nearby enemies (because who has time for manual aiming?)
- **Survive** increasingly ridiculous waves of geometric enemies
- **Collect** power-ups to become an unstoppable polygon

## What I Built

The core gameplay loop is classic bullet heaven: enemies spawn, you survive, you get stronger, repeat until your computer gives up. But everything is rendered as basic geometric shapes - triangles, squares, circles, and the occasional pentagon when I'm feeling fancy.

**Features that actually work:**
- Wave-based enemy spawning with increasing difficulty
- Power-up system that makes you feel temporarily invincible
- Collision detection that mostly works
- Particle effects (because explosions make everything better)
- Score system for competitive triangle pilots

## Technical Stuff

Built entirely in **Odin** because I wanted to see if I could actually finish a game without fighting Rust's borrow checker for 3 hours. The web build compiles to WebAssembly, which means you can play it in your browser without installing anything.

The rendering is all immediate-mode OpenGL calls - no fancy game engine, no complex scene graph, just "draw triangle here, draw circle there" repeated 60 times per second.

## Things I Learned

Turns out making a game with only geometric shapes is actually pretty liberating. No worrying about art style consistency, no animation blending issues, no texture memory management. Just "make the red square chase the blue triangle" and call it gameplay.

Also learned that Odin's compile times are insanely fast compared to... well, pretty much everything else. The feedback loop of "change code, compile, test" takes seconds instead of minutes.

## What's Next

This was supposed to be game 1 of 6 in my indie game studio journey. The plan is to gradually increase scope and complexity with each game while actually shipping something playable each time.

Game 2 is already in the works - thinking something with actual sprites this time. Maybe.

---

*Controls: WASD to move, auto-fires at enemies. Recommended to play in full screen for maximum geometric immersion.*