---
title: "Computer Architecture: Understanding the Machine"
excerpt: "Building systems-level intuition by understanding how programs execute on real hardware, from data representation to performance optimization."
date: "2025-07-22"
tags: ["computer-science","systems","performance","learning"]
featured: false
series: "Continuing Education"
series_part: "2"
series_featured: false
readTime: "3 min read"
updated: "2025-08-28"
---

# Computer Architecture: Finally Understanding What's Actually Happening

So I'm starting with Computer Architecture as the first module in my [continuing education curriculum](/blog/ex_continuing_ed). As I discussed there, the modules are going to, as much as possible, be focused around delivering a project of some sort.

There's a lot here. And I'm going to (mostly) follow the Computer Systems: A Programmer's Perspective approach. Here's a [nifty link](https://learncs.me/cmu/15213) for lectures and labs and all that. The goal is to break it down into 8-ish weeks for completion with the final project being a Pipeline-And-Cache CPU Simulator.

## The Journey

**Weeks 1-2: Bits, Bytes, and Assembly**
Starting with the absolute basics: binary representation, two's complement, how computers actually store data. Then diving into assembly language and building a simple assembler for a hypothetical CPU. This is about understanding what happens when you compile code - what does the CPU actually see?

**Weeks 3-5: Building a CPU Simulator**
Here's where it gets real. I'm implementing the fetch-decode-execute cycle, building a single-cycle CPU simulator, then adding pipelining. This means understanding registers, ALUs, memory access, and how modern CPUs can work on multiple instructions simultaneously. Also tackling the nightmare that is pipeline hazards and how to deal with them.

**Weeks 6-7: Adding Caching and Integration**
Memory hierarchy time. Building an L1 cache simulator and integrating it with the pipelined CPU. This is where performance really starts to matter - how do cache hits and misses affect execution time?

**Week 8: The Full System**
Putting it all together into a complete Pipeline-And-Cache CPU Simulator. Running benchmarks, collecting performance metrics, and hopefully having something that actually works and teaches me how this stuff really operates under the hood.

## What I'm Hoping to Get Out of This

By the time I'm done with this module, I want to:

- Actually understand what happens when I write `int x = 5;` in C
- Be able to look at code and have some intuition about why it's slow
- Stop feeling like an imposter when people talk about "cache misses" and "branch prediction"
- Have built a working CPU simulator with pipelining and caching
- Feel confident enough to tackle the harder stuff like operating systems and compilers

## Why This Matters (To Me)

Look, I could keep coasting as a web dev who doesn't think about performance. But I'm tired of hitting walls where I don't understand what's actually happening. When your Node.js app is mysteriously slow, or when you're trying to optimize a database query, or when you're having that conversation about why this service uses so much CPU – I want to actually understand the underlying systems.

Plus, honestly, I think this stuff is just cool. The more I learn about how computers work, the more amazed I am that any of this works at all.

## What's Next

Computer Architecture is just the first step. The plan is to build on this foundation with operating systems, then databases, then distributed systems. Each module will have its own project, its own deep dives, its own moments of "oh shit, that's how it works."

I'll be documenting the journey here as I go. The wins, the struggles, the moments where I realize I understood way less than I thought I did. If you're on a similar path, or if you're just curious about what it's like to learn this stuff as a working engineer, stick around.
