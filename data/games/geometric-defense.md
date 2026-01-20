---
title: "Geometric Defense"
excerpt: "A tower defense game built with geometric shapes. No sprites, no assets—just procedural geometry."
date: "2025-08-03"
tags: ["odin", "gamedev", "tower defense", "geometry", "2d"]
featured: true
status: "in-progress"
playable: true
github: ""
demo: ""
technologies: ["Odin", "Raylib", "WebAssembly", "Emscripten", "ECS"]
image: "geometric-defense.png"
---

**THIS IS A WORK IN PROGRESS**

# Geometric Defense

**Geometric Defense** is a tower defense game built in Odin with Raylib. It's a standard tower defense game with a twist: towers placed in 2x2 grids can be combined into more powerful versions. No sprites, no assets—just procedural geometry. Following [The Last Polygon](/games/the-last-polygon), everything is once again pure Raylib shapes.

You can play in the browser with the link above.

## How to Play

**Objective:** Defend your base from waves of geometric enemies by placing towers along their path.

**Controls:**
- Click an empty cell to open the tower menu
- Hover over tower options to preview range
- Click to place (if you can afford it)
- Start Wave button to begin the next wave
- R to restart after game over or victory

## Towers

| Tower   | Behavior                                |
|---------|----------------------------------------|
| Blaster | Single-target homing projectile         |
| Pulse   | AOE damage ring around tower            |
| Beam    | Piercing line that lingers briefly      |
| Tesla   | Chain lightning jumps between 3 enemies |
| Shard   | Long-range instant sniper shot          |

## Game Development Background

Following the completion of The Last Polygon, where I did basically a 1-month sprint to completion, I got a bit burnt out from the process. It was tough! Even if it was super basic, I hadn't really ever built something like that before. 

Eventually, I did catch the bug again but was also starting work on a [Database Internals journey](/blog/learning-database-internals). This time around, the process was more spread out which helped a lot.

I also continued to make use of [Raven ECS](/projects/raven-ecs), though a tower defense game lends itself a lot less to a pure ECS design. That said, it was still usable as a store for different entities.

## Tech Stack

- **Language:** Odin
- **Graphics:** Raylib
- **Architecture:** raven_ecs (custom ECS library)
- **Platforms:** Desktop + Web (via Emscripten)

## Things I Learned

## What's Next

---
