---
title: "PyOdin Lox"
excerpt: "Started implementing the Lox language in Odin, discovered OOP doesn't translate well, switched to Python, then got distracted by other projects."
date: "2023-08-15"
tags: ["Programming Languages","Interpreters","Python","Odin","Learning"]
featured: false
status: "paused"
github: "https://github.com/nwilson314/py-odin-lox"
demo: ""
technologies: ["Python","Odin","Language Design","Tree-walk Interpreter"]
image: "project_placeholder.png"
images: ["project_placeholder.png"]
readTime: "3 min read"
updated: "2025-08-21"
---

# PyOdin Lox

I was working through "Crafting Interpreters" by Robert Nystrom with the plan to do everything in Odin instead of Java/C. When I started the tree-walk interpreter, I quickly realized the book's heavy OOP design doesn't translate well to Odin, so I switched to Python to actually learn the concepts. I finished that part completely, then started the bytecode interpreter in Odin (since that part of the book uses C anyway) but got distracted by other projects before finishing it.

## What Lox Actually Is

Lox is a simple programming language designed specifically for the "Crafting Interpreters" book. It's got just enough features to be interesting without being overwhelming: variables, functions, classes, inheritance, closures. Think of it as a teaching language - small enough to implement completely but sophisticated enough to demonstrate real language features.

The book walks you through building two different interpreters for Lox:
1. A tree-walk interpreter (slower, easier to understand)
2. A bytecode virtual machine (faster, more complex)

## What I Actually Built

**Tree-walk interpreter in Python**: Complete and functional. You can run Lox programs, use the REPL, all the language features work. Switched from the original Odin plan because Python's object model maps naturally to the book's Java design patterns.

**Bytecode interpreter in Odin**: I started this part since the book uses C here anyway (better fit for Odin). I got the basic VM structure set up but never finished the instruction set or garbage collector because I got distracted by other projects.

```python
# Basic Lox program running in the Python interpreter
var message = "Hello from Lox!";
print message;

fun fibonacci(n) {
    if (n <= 1) return n;
    return fibonacci(n - 2) + fibonacci(n - 1);
}

print fibonacci(10);  // 55
```

## The Technical Reality

**Tree-walk interpreter**: Parses source code into an abstract syntax tree, then walks that tree to execute the program. Simple to implement but slow since you're essentially interpreting the AST every time.

**Python implementation**: Works fine. The lexer tokenizes Lox source code, the parser builds an AST, and the interpreter evaluates it. Pretty standard stuff if you've built interpreters before.

**Odin bytecode VM**: I started implementing the virtual machine part in Odin. The C-style approach fits better with Odin than the OOP tree-walker did. I got basic stack operations and chunk management working but never finished the full instruction set.

## What I Actually Learned

The biggest lesson was that language choice matters a lot when following programming tutorials. The book assumes an object-oriented mindset, and trying to force that into Odin's procedural style created more friction than learning.

Also learned that implementing a programming language is way more about parsing and tree structures than I expected. The actual evaluation logic is pretty straightforward once you have a good AST representation.

The Python version taught me more about interpreter design than the Odin attempt, even though I was originally trying to learn Odin.

## Why I Stopped

Got to the end of the tree-walking interpreter and felt like I understood the concepts. The bytecode VM section looked interesting but I had other projects calling. Classic case of "learned what I wanted to learn, moved on."

Also, building toy languages is fun for understanding concepts but doesn't have much practical application unless you're actually designing a language for real use.

## Current Status

The Python tree-walking interpreter is complete and works. You can clone it and run Lox programs. The Odin bytecode interpreter has basic VM infrastructure but is missing most of the instruction implementations.

Would I finish it? Probably, eventually. I'm still interested in how interpreters work and the bytecode VM is the more interesting part technically. Just need to find the time to sit down and work through the rest of the instruction set.

**Good for**: Learning how interpreters work, understanding language implementation

**Not good for**: Actual programming (use a real language), production use (it's a toy)