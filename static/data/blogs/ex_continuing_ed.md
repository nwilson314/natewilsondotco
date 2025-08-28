---
title: "On Continuing Education"
excerpt: "Feeling stagnant in my mid-30s software career, I'm designing a self-directed computer science curriculum to bridge knowledge gaps and explore everything from compilers to AI systems."
date: "2025-07-21"
tags: ["learning","career","personal-growth"]
featured: false
series: "Continuing Education"
series_part: "1"
series_featured: true
readTime: "10 min read"
updated: "2025-08-28"
---

## TL;DR
Feeling like I'm treading water in my Mid-30s as a primarily backend web dev, I'm building a year-long self-directed CS curriculum. It's project-based learning focused on the fun stuff I never get to touch at work (compilers, AI systems, game programming). This post lays out the guts why and how I'm doing it.

# Why Now?

Recently, I have found myself becoming a bit stagnant in my work/career.

The truth is that I am still quite early in my CSE journey (despite being in my mid-30s) and while I find my day job to be quite stimulating, it's rather narrow in focus (primarily backend web development, though increasingly fullstack). There's this whole AI/gen-AI thing going on (perhaps you've heard of a thing called ChatGPT) that I'm not being exposed to during the course of my day-to-day (other than using it cursorily... wink, wink) due to the fact that my company just doesn't use it... and by exposed I am talking purely from a technical level.

Secondarily, I just have a lot of things that I'm interested in: some side web app projects/ideas, game programming, compilers/interpreters. I find genuine enjoyment out of programming and thinking through projects.

And none of this is even mentioning that my "hard" CS knowledge gathering has tapered off since obtaining my masters. Or the fact that as the world becomes increasingly reliant on AI/LLMs to do their thinking that there's less and less incentive to actually sit down and learn the basics. I'm banking on this being a valuable commodity in the near-ish future.

## The Plan

So this is how I find myself interested in a self-directed CS course for continuing my education in the field. This way, I can more formalize the random tinkering and half projects that I seem to start and stop on a whim constantly and direct that energy into "bettering myself" (or at least expanding my knowledge domain).

My first observation was that I don't have to go it alone. There are A LOT of resources out there. People are (or were) interested in learning, apparently. However, a lot of what was there seemed to fall in one of two camps: more traditional CS university style courses and tutorial hell.

The CS university style courses (from places like MIT or Stanford and offered through say Coursera) are a nice supplement but hew more toward the standard university degree (for obvious reasons). I have this already and I wasn't interested in going back to that, at least fully. 

The Tutorial Hell version is a lot of what you find every where else. Big promises, typically bad content, and just generally underwhelming. There's some potentially good stuff out there but it's scattered.

So instead, I have attempted to curate my own, more project-focused education that still leans into books/lectures as a supplement. It's what I find more interesting, and frankly, what I think people can learn best from. Read/watch the hard technical knowledge followed by actually doing something solidifies understanding in a way that just reading/watching/listening alone doesn't.

# The Curriculum 

## My Approach

I went through a few different iterations and false starts. As I mentioned above, there are an enormous (and even overwhelming) amount of resources for teaching yourself computer science. Some better than others. I eventually found the [Teach Yourself Computer Science](https://teachyourselfcs.com/) (TYCS) curriculum and it immediately resonated with me. For one, I realized that because I have had a slightly non-traditional path through CS, I did not receive as much of a formal education in some key CS topics. TYCS, to me, felt like it could fill in those holes while also being relatively straightforward.

Now, that said, I am not going to follow it to the tee (T, tea?). Instead, I'm going to modify the topics slightly and expand to some others that I think are important to learn. My goal here is more "masters" level than undergrad, even if some of the gaps in my knowledge probably are undergraduate level. Additionally, I'm going to tailor the experience to be more project oriented.

## AI as Learning Partner

AI is your friend in this. I have some high-level ideas about what I want to learn and what topics, but sometimes it's hard for me to structure a "course" out of each topic, including projects. This is where AI can really help give some structure. And probably even more importantly, tailor it to your specific knowledge and/or interests. 

I leaned heavily into AI to curate the course. Starting high level by mapping out each module and its goals which includes, where appropriate, tying modules and their projects together. LLMs have progressed far enough where there's a lot of value to be had here. In particular, the "Deep Research" mode in ChatGPT (there similar features at other companies as well) not only crafts pretty solid week-by-week course material, it also cites a bunch of articles and blogs across the internet it used to build the material. This is awesome for wrangling all of the Tutorial Hell pieces that are maybe actually good.

## The Topics

I'm going to break this down into some high level topics that are then completed separately as a course. The general idea is to produce *something* at the end of each "course" (and hopefully a couple of somethings).

- **Computer Architecture**
  - Build a simple CPU emulator
  - Implement basic caching mechanisms
  - Project: Working 8-bit processor simulation

- **Algorithms & Data Structures**
  - Implement everything from scratch (no libraries)
  - Project: Performance comparison tool for different sorting algorithms

- **Math for CS/ML**
  - Focus on linear algebra and statistics
  - Project: Build neural network from scratch using only basic math

- **Operating Systems**
  - Project: Simple kernel that can boot and handle basic syscalls

- **Computer Networking**
  - Project: HTTP server implementation from scratch

- **Web Development & Browser Architecture**
  - Project: Simple browser engine that can render basic HTML/CSS

- **Databases**
  - Project: Build a basic relational database with SQL parser

- **Compilers & Interpreters**
  - Project: Complete programming language with interpreter

- **Distributed Systems**
  - Project: Distributed key-value store with consensus algorithm

- **LLM & AI Systems**
  - Project: Train a small language model from scratch

## Timeline

As outlined, this curriculum will take about a year part-time. If you're someone that has a lot of free time on your hands, this plan can be done in something like 6 months (and you'll likely hate yourself at the end of it). I'm going to strive for something in the middle, shooting for about a year. I do have something of a life after all (and a day job besides).

This is often the hardest part. Well, at least for me it is. Often I find that when I am up against the realities of how time works, I get impatient and give up. You can't just learn things overnight (despite what a bunch of people on the internet will tell you). Sure, it's easy to get a high-level understanding in like 2 weeks of dedicated learning on just about any topic. The goal of this curriculum is not to get a high-level understanding, but a true understanding. The goal is to get cracked (as the kids are calling it these days). 

So yes, you might feel like waiting 6-12 months to start digging in on ML/AI is going to put you behind. But the reality is, you might just be behind already because you don't fully understand the core concepts (like I am). Jumping to the end isn't going to fix your issues. I have to tell myself this A LOT. But it's a lesson that I have learned the hard way over the years.

Honestly, I truly believe that there are so many "engineers" out there that don't know the basics that if you do actually show up with a solid foundation, you're going to seem like a damn wizard.

# What's Next

I'm starting with Computer Architecture next week. I'll be documenting everything as I go... the projects I build, the resources I use, and anything that I might come up with.

Follow along on social media for updates, or just check back here occasionally. I'll be posting project demos and lessons learned. I'll also be posting some of curriculum and projects on [github](https://github.com/nwilson314/10x-cont-ed).

Success for me means: building something concrete for each topic that I can point to and say "yeah, I actually understand how this works under the hood." Not just knowing the theory, but having the muscle memory of implementing it myself.

AI is eating the world, but not yet. In the meantime, let's take the time to learn why.

---

## Alternatives I Considered

Quick summary of other curricula I evaluated (see [detailed reviews](#appendix-curriculum-reviews) below):

- **[TYCS](https://teachyourselfcs.com)**: Best overall, but not project-focused
- **[OSSU](https://github.com/ossu/computer-science)**: Comprehensive but too rigid for me  
- **[Coding Interview University](https://github.com/jwasham/coding-interview-university)**: Great for algorithms/DS
- **[Free Code Camp](https://www.freecodecamp.org/)**: Excellent project approach, limited scope

# Appendix

## Curriculum Reviews

### Teach Yourself Computer Science
IMO the current best undergraduate level CS overview. It's a good middle ground between covering enough of the important topics while not being so much that it would literally take you 4 years to complete. If I was attempting to be a self-taught CS engineer, this is what I would go with.

It's not actually project focused though. This in particular was why I found it to be more of a guide than an actual curriculum to follow (though obviously YMMV). I guess one more bullet to add... it is not actually all that structured. Which is nice in some ways, but if you actually have no idea what you are supposed to learn then it's likely that the OSSU might be a better option.

### Open Source Society University
There's a lot here. If you follow their advice and go through the Core + some electives in the Advanced section, you may be doing it for 2-3 years. Obviously, if you don't have a job this may be able to be shortened, but for my purposes there was too much.

It's broken down in a very step-by-step way that might be nice for someone that doesn't want to have to tailor their own experience. I find this to be too rigid, but for someone that is purely self-taught, this might be an advantage. That said, I found that much of the curriculum is "solid" though a bit light on books (which is a preferred way of learning for myself).

### Coding Interview University
I found this years ago when I was first getting into CS. It's not really a replacement for an undergrad degree. As the title suggests, it is geared toward getting a job, and is more of a repository of data structures and algorithm resources.

However, there are a lot of resources here that an aspiring undergraduate level CS student should learn. The emphasis for this "course" is data structures and algorithms which isn't ALL that comprises CS, but it is much of what modern CS jobs require when job seeking (though I am finding that AI has been changing this paradigm somewhat).

### Free Code Camp
I would be remiss if I did not include Free Code Camp. As the name suggests, it is more akin to a coding bootcamp rather than a formal CS degree. Going through FCC purely will probably mean you'll end up as a Type 2 engineer (from TYCS, this is an engineer that stays surface level on all topics), at least initially.

However, I think one thing that it is exceptional at is building out programming knowledge via projects. Which is, IMO, the absolute best way of learning. One other (small downside) is that FCC is primarily focused on web development. The vast majority of jobs are in this realm so it may seem that this is a strength, but there's a lot of the hardcore CS topics that are glossed over by JS (and Python which is the other language that FCC has made courses with).

FCC might be a good place to start, get your feet wet, and then come back to some of the others above to learn more "hard" CS knowledge. Or even go through them concurrently.