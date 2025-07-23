---
title: "Raven ECS"
excerpt: "A minimal-yet-extensible Entity-Component-System framework written in Odin, optimized for solo game developers who want performance without complexity."
date: "2025-06-20"
tags: ["Odin", "ECS", "Game Development", "Systems Programming", "Performance"]
featured: true
status: "in-progress"
github: "https://github.com/nwilson314/raven_ecs"
demo: ""
technologies: ["Odin", "ECS Architecture", "Systems Programming"]
image: "raven_code_ex.png"
images: ["raven-ecs-performance.png", "raven-ecs-architecture.png"]
---

# Raven ECS

A specialized Entity-Component-System framework written in Odin, designed for game developers who want performance-oriented architecture without drowning in complexity. The system is (hopefully) easy to understand and use. I wanted something I could build once and use and then optimize as I needed to.

## What It Actually Is

Most ECS frameworks are either academic exercises that prioritize theoretical purity or massive enterprise solutions that require a PhD to configure. Raven ECS tries to hit the sweet spot: fast enough for real games, simple enough that you can actually understand what's happening.

The whole thing is built around the idea that solo game developers (like me) need something that just works without requiring a team of engine programmers to maintain (or understand).

## The Performance Story

The main selling point is simplicity. Performance is good - the query iterator averages around 0.16ms for 100,000 entities, which is pretty decent for a framework written by someone who's definitely not a systems programming expert. But the main idea is that you can take this, run with it, and get decent performance if you're just building dumb little side projects.

**Current approach**: Sparse-set component storage with optimized iterators

**Next evolution**: Transitioning to archetype-based storage with chunk-based memory layout

## Technical Stuff

**World-centric data**: All data is stored on a single world struct and accessed through a few procedures.

```odin
package main

import "core:fmt"
import ecs "vendor:raven_ecs/src" // Adjust import path as needed

// 1. Define components as simple structs
Position :: struct {
	x, y: f32,
}

Velocity :: struct {
	dx, dy: f32,
}

main :: proc() {
	// 2. Create a world
	world: ecs.World
	defer ecs.destroy_world(&world) // Handles all cleanup automatically

	// 3. Create component pools. The world will manage their memory.
	position_pool := ecs.create_component_pool(&world, Position)
	velocity_pool := ecs.create_component_pool(&world, Velocity)

	// 4. Create an entity and add components
	player := ecs.make_entity(&world)
	ecs.add(&world, player, Position{10, 20})
	ecs.add(&world, player, Velocity{1, 0})

	// 5. Query for entities with both Position and Velocity
	fmt.println("Moving entities:")
	it := ecs.query(&world, Position, Velocity)
	for {
		entity, ok := ecs.next(&it)
		if !ok {
			break
		}
		pos := ecs.get(&world, entity, Position)
		vel := ecs.get(&world, entity, Velocity)
		fmt.printf("  -> Entity %v is at (%v, %v) with velocity (%v, %v)\n", entity, pos.x, pos.y, vel.dx, vel.dy)
	}
}
```

The API is deliberately simple - create entities, add components, query for entities with specific component combinations. Most of the complexity is hidden in the query optimization.

**Sparse-set storage**: Fast component addition/removal, reasonable iteration performance, predictable memory usage.

**Planned archetype system**: The next major milestone is chunk-based storage that groups entities with similar component compositions into contiguous memory, which should improve cache locality significantly.

## Development Philosophy

Built with a 6-sprint roadmap because I needed structure to actually finish the thing. Each sprint has concrete deliverables and performance targets.

The goal isn't to build the "ultimate" ECS framework - it's to build something that works well for the kinds of games I want to make, with performance characteristics that don't make me cringe.

## What I Learned

Building a performance-oriented library in Odin taught me a lot about memory layout, compiler optimization, and the difference between "fast enough" and "actually fast."

The most interesting challenge was designing an API that feels natural to use while maintaining the performance characteristics that make ECS worthwhile in the first place. Sometimes sacrificing a bit of performance for ergonomics is worthwhile. 

Also learned that benchmarking is both crucial and easy to get wrong - spent way too much time optimizing for synthetic workloads that didn't represent real usage patterns (and don't get me started about optimizing builds and how that affects performance).

## Current Status

Active development, transitioning from the initial sparse-set implementation to a more sophisticated archetype-based system. The core API is stable, but the internal storage is getting a complete rewrite for better performance.

Next major milestone is chunk-based storage, which should unlock some interesting optimization opportunities while keeping the same user-facing API.

Perfect for: Small to medium indie games, learning ECS concepts, Odin language projects
Not great for: AAA studios, developers who need battle-tested stability, anything requiring immediate production readiness