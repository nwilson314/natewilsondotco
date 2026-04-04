---
title: "Geometric Defense"
excerpt: "A tower defense game built with geometric shapes. No sprites, no assets, just procedural geometry."
date: "2026-01-19"
tags: ["odin", "gamedev", "tower defense", "geometry", "2d"]
featured: true
status: "paused"
playable: true
github: ""
demo: ""
technologies: ["Odin", "Raylib", "WebAssembly", "Emscripten", "ECS"]
image: "geometric-defense.png"
---

# Geometric Defense

**Geometric Defense** is a tower defense game built in Odin with Raylib. Same deal as The Last Polygon: no sprites, no assets, everything rendered from code. But this time with actual systems, progression, and a lot more content to wrangle.

You place towers on a grid to defend against waves of geometric enemies marching along circuit-board traces. Six tower types, six enemy types, a 2x2 tower combining mechanic, a meta-progression shop, and 12 levels across 5 themed regions of a PCB. It even has a boss fight.

You can play in the browser with the link above (still need a keyboard, still sorry about mobile!) or download via itch (link to come).

## How to Play

- Click to place towers on the grid
- Combine any 2x2 group of towers into a super tower
- Upgrade towers through three levels for more damage, range, and fire rate
- Earn Cores from completing levels to unlock new towers and abilities in the shop
- Survive 10 waves per level across increasingly hostile regions of the board

## Why Tower Defense

After shipping The Last Polygon in three weeks, I wanted to see what happened when I gave myself more room. Last Polygon proved I could finish something. This one was about building systems that talk to each other, persist between sessions, and scale with content.

Tower defense is inherently systemic: towers need targeting, enemies need pathing, waves need pacing, and all of it needs to be tunable. I also wanted to keep the geometric aesthetic from Last Polygon because it worked. No sprites means no excuse to stall on art. You just build the game.

The "circuit board" theme came pretty naturally from there. If everything is geometric shapes, why not lean into it? Towers became electronic components. The overworld became a PCB with chips and copper traces. Regions are named after computer components: RAM, GPU, I/O, Storage, CPU. It gave the whole thing a cohesive identity without ever needing an artist.

## The Combining Mechanic

The hook that makes this more than a generic TD is the 2x2 combining system. Any four towers arranged in a square can merge into a super tower. Four of the same type gives you an amplified specialist: a 2x2 Blaster becomes a beast. Mix types and you get a versatile hybrid that fires every projectile type but with weaker individual stats.

This turns tower placement into a spatial puzzle on top of the usual "where do I put my DPS" decisions. You're constantly thinking about adjacency, what you might want to combine later, and whether it's worth burning gold now on a tower that'll complete a square.

The six towers each have a distinct role:

- **Blaster**: reliable single-target DPS, your bread and butter
- **Pulse**: AOE burst for clearing swarms
- **Beam**: piercing laser, high sustained damage, melts anything that holds still
- **Tesla**: chain lightning that applies Vulnerable (+30% damage taken), low damage but massive utility
- **Shard**: enormous single-shot damage, painfully slow, the elite killer
- **Dampener**: AOE slow field, keeps enemies in your kill zones longer

The real fun is in the synergies. Dampener plus Beam means enemies are stuck in the laser. Tesla plus Shard means you weaken something and then delete it. Once super towers and upgrades enter the picture, the combinations get pretty wild.

## Content and Progression

This was where things got significantly more complex than Last Polygon. That game had 20 levels but they were all essentially "survive this wave." Geometric Defense needed an actual content pipeline: levels with designed layouts, tuned wave compositions, HP scaling curves, a gold economy, and a meta-progression layer tying it all together.

The overworld is a two-tier system. Board View shows the full PCB with five chip-shaped regions. Click into a region and you get Chip View: individual levels laid out as logic nodes on a silicon die. Each region gates behind a voltage requirement that you earn by completing levels, so there's a natural difficulty curve.

Region 1 (RAM) is the tutorial arc: six levels that each introduce a tower and its corresponding enemy counter. Level 1 gives you the Blaster against Basic enemies. Level 3 introduces the Dampener when Fast enemies show up. By the end of the tutorial you've unlocked all six towers and understand the resistance system, where certain enemies resist certain damage types so you can't just spam one tower.

Then there are five post-tutorial levels with modifiers (gold multipliers, health overrides, tower restrictions) that test whether you actually learned anything. And it all ends with a boss fight against "The Cache," a pulsing octagon with 5000 HP and 30% resistance to everything. Shows up in wave 7 with the regular enemies, then comes back in wave 10 with a full army escort.

## The Level Editor

One of the bigger decisions I made was building a separate level editor as its own executable. Levels are defined in JSON (grid layout, spawn points, wave configs, HP scaling, gold bonuses) and the editor lets you visually place paths, set spawn timing, and test waves without touching the data files by hand.

This felt like overkill at first but paid for itself almost immediately. Tuning tower defense levels is incredibly iterative. You need to play the same level dozens of times with slightly different numbers. Having a tool that let me tweak wave composition and immediately test it saved a huge amount of time.

## The Web Build

Same story as Last Polygon: Odin compiles to WebAssembly via Emscripten and the game runs in its own index.html. The difference this time was handling responsive scaling for tablets and different screen sizes, which required some additional viewport math. But the core approach was the same.

## Systems Compound

The biggest thing I took away from this project was how systems compound. In Last Polygon, every feature was more or less independent: add a new weapon, add a new enemy, tune some numbers. In a tower defense game, everything touches everything. Adding a new tower type means updating the shop, the unlock sequence, the save system, the combining logic, the targeting modes, the balance spreadsheet. Every feature has a blast radius.

That compounding is also what makes it fun to build. Once the systems are in place, content creation becomes this satisfying loop of "what happens if I add a slow enemy that resists beam damage?" and you watch all your existing systems interact with it. But you have to build the systems first, and building systems without content to test them against is a weird chicken-and-egg problem I hadn't dealt with before.

Save/load was also deceptively annoying. The serialization itself is trivial (JSON in, JSON out) but deciding what to save, handling version migration, and making sure game state is always consistent after a load is where it gets ugly. I get why save systems in big games are such a common source of bugs now.

Last Polygon had a hard three-week deadline. This one didn't, and I could feel the difference. There's always one more tower to add, one more level to design, one more modifier to implement. At some point I had to decide the MVP was the MVP and ship it. Five regions was the plan; one complete region with a boss and a clear progression arc is what shipped. The systems are proven, the loop works, and the remaining regions are content problems, not engineering problems.

## What's Next

The progression so far has been: ship something small, then build real systems. Next is something with actual scope: open world, NPCs, combat, exploration. That's already in the works.

---
