+++
date = '2026-02-11T09:00:00-08:00'
draft = false
title = 'Bringing Cloudscape Into the Workflow Design'
summary = 'A few months after sign off, we revisited the whole design to move it onto Cloudscape, less for looks and mostly to close the gap between what design approved and what engineering actually had to build.'
weight = 9
tags = ['ai-native-workflow', 'pm learning series', 'cloudscape']

[cover]
  image = 'images/learn/ai-native-workflow-design/09-cover.svg'
  alt = 'A Figma design file and a React codebase connected by shared Cloudscape components, closing the usual gap between design and engineering'
+++

The design from the last post shipped and worked. This post is a smaller, later addition, from early 2026, about a decision that had nothing to do with the workflow's logic and everything to do with how much friction there was between what design approved and what engineering actually had to build.

## What Cloudscape actually is

Cloudscape is an open source design system, originally built for AWS console style interfaces, that ships as both a Figma component library and a real React component library, built by the same team, kept in sync with each other. That second part is the reason this post exists. Most design systems I have worked with give you a Figma kit on one side and a separate, loosely related code library on the other, maintained by different people, drifting apart from each other slowly over time. Cloudscape closes that gap almost entirely, since the visual component and the code component are effectively the same artifact viewed from two different tools.

For an internal tool like this one, used by reviewers rather than external customers, that tradeoff made sense. We were not trying to express a unique brand identity here. We were trying to ship something reviewers could trust and engineers could build quickly, and Cloudscape is built precisely for that kind of internal, dense, data heavy interface.

It is worth saying plainly that this would have been a worse choice for a customer facing surface. The seller and customer notifications from the last post stayed outside Cloudscape entirely, since those needed to match the look and tone of the rest of the customer facing product, not an internal console aesthetic. Cloudscape solved a specific problem, an internal reviewer tool with a real engineering team behind it, and I do not think it generalizes cleanly beyond that.

## What actually changed in the design

The underlying decisions from the earlier posts in this series did not change at all, and I want to be clear about that. The ambiguity factors still sit above the raw case details. The fast path still gets a recheck before closing automatically. The notification language to sellers and customers stayed exactly as we had written it. None of that was up for revisiting.

What changed was the component layer underneath all of it. Custom styled cards became Cloudscape's container and box patterns. A hand built status indicator became Cloudscape's status indicator component, with its established color and iconography conventions already accessibility tested by a much larger team than ours. Our custom table for the reviewer queue became a Cloudscape table, which came with sorting, filtering, and pagination behavior already built in, none of which we had to design or build ourselves from scratch.

Redoing the visual layer sounds like it should be quick, and in places it was. In a few places it was not, because a couple of our custom components did things Cloudscape's equivalents genuinely did not support out of the box, particularly around how we displayed the ambiguity factors as a compact, scannable list. We ended up composing that specific piece from a few smaller Cloudscape primitives rather than finding one component that did the whole job, which took some real back and forth with our designer to get looking right.

## Why this mattered for engineering specifically

The actual payoff of this whole exercise was speed and confidence on the engineering side, not appearance. Before this change, an engineer building from our Figma file had to interpret a custom visual design and then go find or build the closest equivalent in code by hand, which is exactly the kind of translation step where small inconsistencies creep in. A spacing value that looked right in Figma would not always match what actually shipped, simply because two different people were making two different judgment calls about the same intent.

With Cloudscape, an engineer could open the same Figma file, see a component literally named the same thing as the npm package they were about to import, with matching props already documented. That is a genuinely different way of handing off a design, and it noticeably shortened the build phase compared to the custom component work in the original design.

## Closing this out

Looking back across this whole series, the thing I keep returning to is how little of the actual work was about the model. Research took months. Turning research into patterns took real, unglamorous synthesis work. The workflow logic took several rounds of pushback from engineering and applied science before it was actually sound. The visual design took real iteration, informed by testing actual layouts with actual reviewers. Even this last step, adopting Cloudscape, was about closing a gap between design and code, not about the AI itself.

The model made a new kind of triage possible, and that mattered. But almost everything a reviewer, a seller, or a customer actually experienced came from ordinary product and design work, the same kind that existed long before anyone called anything AI native. If there is one thing I would want a PM starting a similar project to take from this series, it is that the AI is rarely the hard part. The workflow around it is.
