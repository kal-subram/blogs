+++
date = '2025-10-14T09:00:00-07:00'
draft = false
title = 'Moving the Workflow Into Figma'
summary = 'Visily had validated the shape of the workflow. Figma is where it actually became a real design, with real hierarchy, real states, and a lot more scrutiny.'
weight = 7
tags = ['ai-native-workflow', 'pm learning series']

[cover]
  image = 'images/learn/ai-native-workflow-design/07-cover.svg'
  alt = 'A rough wireframe box on the left transforming into a detailed, styled Figma screen on the right'
+++

Once the low fidelity sketches had been through a round of reaction from reviewers and team leads, I handed the work properly to our designer, and we moved everything into Figma. This is the point where the project stopped being something I could mostly drive alone and became genuinely collaborative, in a way that changed how I worked day to day.

## Why Figma, specifically, at this stage

Figma was the natural choice mainly because our design team already lived there, with an established component library, shared type styles, and color tokens that matched the rest of the product. Sketch and Adobe XD can do similar work, but neither had the institutional muscle memory or the existing library our team had already built up in Figma over several years. Starting fresh in a different tool for one project would have meant rebuilding components that already existed, for no real benefit.

The other reason was collaboration. Figma lets multiple people work in the same file at the same time, commenting directly on a specific element rather than a general thread. Once engineering started reviewing designs seriously, that mattered a lot. A comment pinned to the exact button in question is a very different experience than a comment in a chat channel that says "the button on the case screen," which everyone then has to go find.

There was also a practical benefit I had not fully anticipated going in, which was reusing an existing component library. Buttons, input fields, and status indicators already existed as proper components in our design system, meaning our designer was not redrawing basic elements from scratch, she was assembling from parts that already carried the right spacing, the right type scale, and the right accessibility contrast baked in. That alone probably saved a couple of weeks compared to building visual design from a blank canvas.

## What actually changed going from Visily to Figma

The biggest shift was the ambiguity signal on the case detail screen, the one piece of feedback from the last post that mattered most. Instead of a single word summarizing confidence, the Figma version showed the actual factors contributing to that assessment, laid out as a short, scannable list a reviewer could glance at in a few seconds. Getting that list to feel scannable rather than cluttered took several rounds of real visual design work that a rough wireframe was never going to surface.

Interaction states were the second big addition. The Visily sketches were static, one version of each screen. Figma is where we designed what a case detail screen looks like while data is still loading, what an error state looks like if the automated assessment fails partway through, and what a reviewer sees immediately after they submit a decision. None of that existed as a question in the wireframe stage, because a wireframe does not force you to think about time passing or things going wrong. A real design does.

Visual hierarchy was the third shift, and the subtlest one. In Visily, every box on the case detail screen carried roughly equal visual weight, because nothing was styled. In Figma, we had to actually decide what a reviewer's eye should land on first. The answer we landed on, after a few rounds of disagreement between me and our designer, was that the ambiguity factors should sit visually above the raw case details, not below them, because the whole point of the new triage step was to help a reviewer form a judgment quickly, and burying that signal under a wall of raw data would have quietly undone the thing we were trying to fix.

That disagreement is worth describing honestly, since it was a real one, not a polite formality. My first instinct was to keep the raw case details on top, since that felt closer to how the old process presented cases, and I did not want reviewers to feel like something familiar had been taken away from them. Our designer argued the opposite, that familiarity was not actually the goal here, usefulness was, and that keeping a worse layout out of comfort would be a mistake dressed up as caution. We tested both orderings informally with two reviewers before deciding, and both of them read the ambiguity factors first regardless of where we placed them on the page, which settled the argument in her favor.

## Where engineering came in earlier than I expected

I brought engineering into these Figma reviews earlier than I originally planned, mostly because our designer suggested it, and she was right to. A few of the interaction states we sketched assumed data would be available instantly, which was not actually true given how the underlying model calls worked. Catching that in Figma, before any of it was built, was a lot cheaper than catching it after the fact. It also meant the version of the design that went into the next post, the full end to end walkthrough, was already grounded in what was technically real, not just what looked good on a static screen.

One engineer, in that same review, asked a question I had not thought to ask myself, which was what a reviewer should see if the model service was simply down for a few minutes. Not wrong, not slow, just unavailable. My instinct up to that point had been to design for the model working correctly and treat outages as an engineering concern rather than a design one. He was right to push back. If the system falls back to something confusing during an outage, reviewers lose trust in the whole workflow fast, and trust, once lost that way, is slow to rebuild. We added a clear, honest fallback state for exactly that scenario before the design was considered done.
