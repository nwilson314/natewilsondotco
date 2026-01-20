---
title: "Raven ECS"
excerpt: "A minimal-yet-extensible Entity-Component-(System) framework written in Odin, optimized for solo game developers who want some performance without complexity."
date: "2025-06-20"
tags: ["Odin","ECS","Game Development","Systems Programming","Performance"]
featured: false
status: "paused"
github: "https://github.com/nwilson314/raven_ecs"
demo: ""
technologies: ["Odin","ECS Architecture","Systems Programming"]
image: "raven_code_ex.png"
images: ["raven-ecs-performance.png","raven-ecs-architecture.png"]
readTime: "4 min read"
updated: "2026-01-20"
---

# Raven ECS

A specialized Entity-Component-(System) framework written in Odin, designed for game developers (i.e. me) who want a decent performance-oriented architecture without drowning in complexity. The system is (hopefully) easy to understand and use. I wanted something I could build once and use and then optimize as I needed to.

## (System)

I should also note that the "S" in ECS is extremely silent in this implementation. There's no actual concept of storing systems in the `ecs.World` struct. It's just a way of quickly accessing via the `query` proc any and all entities that match what your current needs are anywhere in your code. Which means "systems" are just your procs!

## What It Actually Is

I set out to both explore using **Odin** for a "real" project and to also set myself up for making some small games over a relatively short amount of time. While I understand that an ECS (even one without the concept of systems) might be overkill and would maybe even be [frowned upon by the master GingerBill himself](https://x.com/TheGingerBill/status/1857473296272609451), I typically get some productivity gains by having foundational systems that I don't have to think about while building up other, larger systems. And not to mention it was just kinda fun.

So yeah, since I don't really know much about proper ECS's (obviously because I didn't even end up building one), this one is probably not great. But it's good enough for now and for what I need.

## The Performance Story

The main selling point is simplicity. Performance is good - the query iterator averages around 0.25ms for 100,000 entities, which is pretty decent for a framework written by someone who's definitely not a systems programming expert. But the main idea is that you can take this, run with it, and get decent performance if you're just building dumb little side projects.

**Current approach**: Sparse-set component storage with optimized iterators

**Next evolution**: Transitioning to archetype-based storage with chunk-based memory layout. This probably won't happen and I'm not even sure how to do it, but the internet tells me it is better.

## Technical Stuff

**World-centric data**: All data is stored on a single world struct and accessed through a few procedures.

```odin
package main

import "core:fmt"
import ecs "path/to/raven_ecs"

Transform :: struct { x, y: f32 }
Velocity :: struct { dx, dy: f32 }
Renderable :: struct { color: u32 }

main :: proc() {
    world := ecs.World{}
    defer ecs.destroy_world(&world)
    
    // Setup component pools
    ecs.create_component_pool(&world, Transform)
    ecs.create_component_pool(&world, Velocity)
    ecs.create_component_pool(&world, Renderable)
    
    // Spawn entities
    for i in 0..<1000 {
        entity := ecs.make_entity(&world)
        ecs.add(&world, entity, Transform{f32(i), 0})
        ecs.add(&world, entity, Velocity{1, 1})
        ecs.add(&world, entity, Renderable{0xFF0000FF})
    }
    
    // Game loop
    for frame in 0..<60 {
        // Update physics (now fast by default!)
        it := ecs.query(&world, Transform, Velocity)
        for {
            entity, ok := ecs.next(it)
            if !ok {
                ecs.destroy_iterator(it)
                break
            }
            
            // Use get_from_query for best performance
            transform, _ := ecs.get_from_query(it, entity, Transform)
            velocity, _ := ecs.get_from_query(it, entity, Velocity)
            
            transform.x += velocity.dx
            transform.y += velocity.dy
        }
        
        // Render (now fast by default!)
        render_it := ecs.query(&world, Transform, Renderable)
        for {
            entity, ok := ecs.next(render_it)
            if !ok {
                ecs.destroy_iterator(render_it)
                break
            }
            
            transform, _ := ecs.get_from_query(render_it, entity, Transform)
            renderable, _ := ecs.get_from_query(render_it, entity, Renderable)
            
            // Draw entity
            fmt.printf("Drawing entity %v at (%v, %v) with color %v\n", 
                      entity, transform.x, transform.y, renderable.color)
        }
    }
}
```

The API is deliberately simple. Create entities, add components, query for entities with specific component combinations. Most of the complexity is hidden in the query optimization.

**Sparse-set storage**: Fast component addition/removal, reasonable iteration performance, predictable memory usage.

**Planned archetype system**: The next major milestone would be chunk-based storage that groups entities with similar component compositions into contiguous memory, which should improve cache locality significantly.

## What I Learned

Building a performance-oriented library in Odin taught me a lot about memory layout, compiler optimization, and the difference between "fast enough" and "actually fast."

The most interesting challenge was designing an API that feels natural to use while maintaining the performance characteristics that make ECS worthwhile in the first place. Sometimes sacrificing a bit of performance for ergonomics is worthwhile. 

Also learned that benchmarking is both crucial and easy to get wrong. I spent way too much time optimizing for synthetic workloads that didn't represent real usage patterns (and don't get me started about optimizing builds and how that affects performance).

## Current Status

Paused development. I've found that for what I am doing, it works well enough. There might be some sparse development here and there if I see something, but this is mostly just going on the backburner.