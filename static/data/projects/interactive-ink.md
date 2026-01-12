---
title: "Interactive Ink"
excerpt: "AI-generated choose-your-own-adventure stories. Cool concept, but turns out AI gets really repetitive when you give it creative freedom."
date: "2024-09-18"
tags: ["AI","Storytelling","Interactive Fiction","Python","FastAPI"]
featured: false
status: "completed"
github: "https://github.com/nwilson314/interactive-ink"
demo: "https://interactive-ink.fly.dev"
technologies: ["Python","FastAPI","OpenAI","DALL-E","Llama Index","Fly.io"]
image: "project_placeholder.png"
images: ["project_placeholder.png"]
readTime: "4 min read"
updated: "2026-01-12"
---

# Interactive Ink

I wanted to build a choose-your-own-adventure story generator where AI would create unique narratives that actually adapt to your choices. Plus it generates images for each story beat using DALL-E. Sounds awesome in theory, right?

## What It Actually Does

The idea was simple: instead of pre-written choose-your-own-adventure books, use AI to generate stories on the fly. You make a choice, the AI continues the story based on that choice, generates an image for the scene, and gives you new options.

In practice? It works, but... turns out AI is not particularly creative when you give it completely open-ended story prompts. After playing through a few stories, you start noticing the same patterns: mysterious forests, ancient artifacts, wise old mentors who speak in riddles. The AI has clearly read every fantasy novel ever written and just recombines the same tropes.

The image generation is actually pretty cool though. DALL-E creates surprisingly decent illustrations for each story beat, and seeing your choices visualized does add to the experience.

## The Technical Reality

**Backend**: FastAPI because it handles async requests well, which you need when you're waiting for OpenAI's API to generate both text and images. Also the auto-generated docs are handy when you're trying to remember what endpoints you built.

**AI Integration**: Uses OpenAI's GPT models for story generation and DALL-E for images. Llama Index helps manage the story context, though keeping the AI consistent across multiple story beats is harder than you'd think.

**The Slow Part**: The real killer is that image generation has to happen AFTER story generation. You can't generate an image for a scene that doesn't exist yet. So it's: generate story text (3-5 seconds), parse it for visual elements, then generate image (another 5-10 seconds). Sequential API calls mean users wait 10-15 seconds between every single choice, which completely kills any narrative flow.

**Deployment**: Running on Fly.io because it's simple and cheap for side projects that don't get much traffic.

## What I Actually Learned

The biggest lesson? AI creativity is an oxymoron when you give it complete freedom. It defaults to the most statistically likely story elements, which means every adventure involves finding magical items in forests or meeting mysterious strangers in taverns.

The image generation was the most successful part. DALL-E consistently produces relevant, decent-quality illustrations that actually match the story context. Sometimes the images are more creative than the stories themselves.

```python
# The basic flow that takes forever
async def generate_story_continuation(story_context, user_choice):
    # Build prompt with story context (this part works fine)
    prompt = build_continuation_prompt(story_context, user_choice)
    
    # First API call: generate story text (3-5 seconds)
    story_response = await openai_client.complete(prompt)
    story_segment, choices = parse_ai_response(story_response)
    
    # Extract scene description from the story we just generated
    image_prompt = extract_scene_description(story_segment)
    
    # Second API call: generate image (5-10 more seconds)
    # Can't parallelize this - need the story first!
    image_url = await dalle_client.generate_image(image_prompt)
    
    return {
        "story": story_segment,
        "image": image_url,  # This is why everything is slow
        "choices": choices,
        "context": update_context(story_context, story_segment)
    }
```

## The Honest Assessment

I thought this would be a breakthrough in interactive storytelling. Turns out:

1. **AI isn't creative** - It just remixes existing patterns. After 3-4 stories you've seen all the variations.
2. **It's slow** - 10-15 seconds per choice kills any narrative flow
3. **Consistency is hard** - The AI forgets character details from earlier in the story
4. **Users break it** - Give people creative freedom and they'll try to seduce every NPC or become a dragon

The image generation actually works better than expected. DALL-E creates decent scene illustrations that usually match the story context.

## How I'd Fix It

The core problem is giving AI complete creative freedom. It just defaults to the most generic fantasy tropes. Better approach:

1. **Let users set initial details** - Character background, setting preferences, tone/genre
2. **Add manual text input** - Users can inject their own random details and ideas to "seed" the story with more interesting elements
3. **Constrained creativity** - Give the AI specific parameters to work within instead of "write whatever"

Basically, treat the AI as a collaborative writing partner rather than the sole creative force. Users provide the weird, specific details that make stories interesting, AI handles the connecting tissue.

## Current Status

Built it, deployed it, learned that AI creativity needs human constraints. The demo still works at [interactive-ink.fly.dev](https://interactive-ink.fly.dev) if you want to see what happens when you give AI complete creative freedom (spoiler: fantasy tropes).

Would I build it again? Maybe, but with much more user input to guide the AI away from its generic defaults.

**Works for**: Understanding AI's creative limitations
**Doesn't work for**: Actually engaging interactive fiction without major UX changes