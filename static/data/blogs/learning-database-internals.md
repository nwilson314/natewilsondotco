---
title: "Learning Database Internals"
excerpt: "A 12-18 month journey to learn databases from scratch"
date: "2025-12-06"
tags: ["computer-science","systems","learning","databases"]
featured: true
series: "Databases"
series_part: "1"
series_featured: true
series_description: "A 12-18 month journey to understand database internals, from storage engines to distributed systems."
readTime: "8 min read"
updated: "2026-01-27"
---

# Learning Database Internals

In this new era of LLMs and AI, doing (text-based) things has never been faster. And perhaps the best use case is leveling up your fundamental knowledge. LLMs are *great* at reading and summarizing. Especially recent iterations of them. I want to leverage this capability to really dive deep into a topic I've long had an interest in: databases.

And so, I've decided that I'm going to embark on a 12-18 month journey to learn database internals. First though, some high level notes:
- My intention is become somewhat of an expert in the field. I use "expert" here more to mean I expect to be an expert compared to most and an expert compared to myself at this moment. I have no illusions that I will be world class (and maybe not ever!), but that's ok.
- 12-18 months is pretty wide ranging. I have an outline in mind but I expect it to change.
- 12-18 months is REALLY long. Yeah, this is the big risk with this. I might give up. Life happens. But I want to try.
- I'm mixing a "from scratch," project-based learning style with university style lectures/readings.

## Why learn at all?

You may argue, and I'm certain there are a number who would, that you don't need to learn these things because that information is available whenever you want it via the LLM chatbot du jour. This is true! And it was also true before (though in a more cumbersome way) via Google search and the Internet writ large. However, LLMs can distill this down into concentrated learning paths. As I'm learning and coding (by hand), I have a personal teacher that can review and nudge me in the right direction. This is amazing! And was never possible before now.

Ok, but why bother?

Well, I spend a lot of my time every day coding and thinking about software engineering. I want to hone my craft. I want to be GOOD. And, at least for me personally, I derive some meaning to my life by being good at the things that I love spending time on.

So even though I might be coding less and less over time, I do believe that software engineers will continue to exist in the next 5-10 years. And because I like doing it, there's still incentives to be knowledgable. It might be paradoxical in thinking, but if everyone has access to ALL knowledge, then knowing what knowledge is relevant is the new skill. How do you know what knowledge is relevant? Well, by having it in the first place.

## Why Databases

So why databases you might ask. This one maybe doesn't have a great answer. Some of it (or maybe even all of it) is that I just think *they're cool*. And I want to learn about cool stuff. However, to be more concrete, let me give some better reasoning.

Databases are a ubiquitous element to any serious production-grade piece of software. There are very few systems that don't make use of some form of database or another. Moving data around is ultimately what software development is about. And databases are a huge part of that process. This alone makes them worth studying and understanding for any developer.

Even given their ubiquity, databases are often treated as black boxes for a lot of devs to varying degrees. I might be telling on myself a bit, but I haven't met many devs that understand DBs beyond a cursory "oh yeah B-Trees" level. So combining the last point with this one, having knowledge of a common system that many devs don't have is a differentiator.

Databases are systems that actually make use of fundamental CS knowledge in ways that most pieces of software don't. B-Trees, LSMs, memory locality, caching behavior, bloom filters, and concurrency are all important topics just when discussing database internal implementations. Then there's designing distributed systems which is itself a huge and interesting topic. There's something very compelling about taking "hard" CS knowledge and actually applying and using it rather than just building another CRUD app.

## The Curriculum

Ok, we've gotten the why out of the way. Now for the what. Below is my first shot at the next 12-18 months. I have no idea if this is that great and it's almost certainly not perfect. It will probably get adjusted as I go to fit my own needs and timelines. That said, I feel fairly confident that it will at least make me better and that's good enough of a first brush.

I've broken it up into four phases, roughly in order of dependency. Each of the major phases can be broken down further into chunks of 4-5 topics grouped thematically. Throughout, I will focus pretty heavily on building concrete pieces of code with minimal LLM help (though I will dabble for building out testing boiler plate).

You'll also notice that things get more and more vague as you go down the list. This is somewhat intentional. I know less and less at this moment the more "expert" things become. But, that's the journey!

### Storage Engine Fundamentals

The basic foundation for database internals. Focusing on how data lives on disk and the data structures that support it.

**Go Bootcamp and Basic Datastructures**

Go is the chosen language for this endeavor but I haven't really used it much. As such, I'm going to spend the first month-ish amount of time learning Go more thoroughly. Mostly, I'll be doing so through reading and then writing some basic database centric datastructures.

I could probably give a bit more detail about *why* Go specifically, but suffice it to say that I wanted: systems(ish) programming language, some broader industry usage, and not Rust (I don't hate Rust, I just didn't like it enough to use it here).

As for the basic datastructures, I plan to:

- Produce basic implementations of Queue, Hashmap, LRU, B-tree
- Produce a simple slotted page
- Produce a simple disk manager
- Read up on LSMs -- I have to cut somewhere and LSMs are it. I definitely need to at least understand the tradeoffs between them and B-trees, but I don't think I need to implement both (especially since later modules will be utilizing the B-tree for indexing)

**The Buffer Pool**

After I've gotten my feet wet with some basic database specific datastructures, the first step toward the real thing is to build a Buffer Pool.

In this section, I will cover:
- Building a Buffer Pool Manager
- Table Heap
- Table Scan
- Various benchmarks to test performance on this toy implementation

**The B+Tree Index**

This section is notoriously a slog so I anticipate it taking a bit longer than previous sections. Some specifics:

- B+Tree leaf nodes and tweaks from B-Tree implementation to work on raw bytes
- B+Tree internal nodes
- Index iterator

### Transactions and Recovery

This is where we make the database actually reliable. I'll be honest, this phase is still pretty abstract to me, but the goal is to understand how databases stay consistent and recover from crashes.

**Concurrency Control**

How do you let multiple transactions happen at once without corrupting data? Locking, isolation levels, all that good stuff.

**Logging (WAL)**

Write-ahead logging is apparently the trick that makes crash recovery possible. Write to the log before you write to disk, and you can always figure out what happened. Seems simple in theory; I'm sure the details are not. Also! Somehow it seems to make SQLite perform better in concurrent applications?

**Recovery**

How does a database recover after a crash? There's apparently a famous algorithm for this (ARIES). I want to build something where I can literally kill the process mid-transaction and watch it recover correctly.

### Query Execution and SQL

At this point, we have a storage engine and transactions. Now we need to actually run queries against it.

**Operators**

How does a query actually get executed? What happens between parsing `SELECT * FROM users` and getting rows back? I'm hoping this finally makes all those "explain plan" outputs make sense.

**The Optimizer**

How does the database decide the *best* way to run a query? This is apparently a deep rabbit hole, so I'm planning to keep it simple. Not trying to build Postgres here.

**SQL Interface**

I'm definitely not writing a SQL parser from scratch. I'll use an existing parser (probably from Vitess or PingCAP) and focus on binding it to my storage engine. The goal is a working REPL where I can actually run queries.

### Distributed Systems

The final boss. Taking everything single-node and making it work across multiple machines.

**Consensus (Raft)**

How do multiple machines agree on what happened? I know this is notoriously difficult to implement correctly, so some corners may be cut.

**Distributed KV**

Taking the single-node storage engine and making it work on top of the consensus layer.

**Sharding and Capstone**

Splitting data across multiple machines, rebalancing when things get uneven, and maybe distributed transactions if I'm feeling ambitious. The end goal is something that vaguely resembles a real distributed database—emphasis on vaguely.

## In the end

Ultimately, I know that this is fairly ambitious and somewhat hazy in implementation details. However, I'm excited to get going. Throughout the process I will be posting about various things that I'm learning related to database internals and/or Go. It won't necessarily be framed as if I'm an expert teaching others, but rather as a learning tool for myself. Writing forces you to clarify your thinking.

Up next, some explorations into Hashmaps.