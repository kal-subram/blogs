+++
date = '2025-05-20T09:00:00-07:00'
draft = false
title = 'Turning Research Notes Into Patterns'
summary = 'Two months of interviews, shadowing sessions, and survey responses left me with a pile of notes and no design yet. Making sense of that pile was its own piece of work.'
weight = 4
tags = ['ai-native-workflow', 'pm learning series']

[cover]
  image = 'images/learn/ai-native-workflow-design/04-cover.svg'
  alt = 'A messy cluster of research notes on the left being organized into affinity groups and a single case journey map on the right'
+++

By the end of the external research round, I had somewhere around sixty pages of raw notes, a spreadsheet of survey results, and a stack of quotes I had written down almost verbatim because I liked how specific they were. None of that is a design yet. It is just material. Turning it into something usable took a couple of weeks I had not fully budgeted for, and I want to walk through how I actually did that, since this part of the process gets skipped over a lot when people talk about research.

## Affinity mapping the raw notes

The first pass was affinity mapping, which is really just a fancy name for grouping similar things together until patterns show up on their own. I pulled every distinct observation, quote, and complaint out of my notes onto individual sticky notes, virtual ones in this case since half the team was remote, and started clustering them by theme rather than by which interview they came from.

This step is more physical and less analytical than it sounds. A lot of it is just staring at forty notes on a board and moving them around until groups start to feel right. I resisted the urge to decide the categories in advance. The temptation is strong, because you walk in already half convinced you know what the themes will be. A few times I moved a note into a group, stared at it, and moved it somewhere else entirely, because on rereading it actually said something different than my first instinct.

I did this with two other people from the team, one designer and one applied scientist, rather than alone. That turned out to matter more than I expected. The designer kept pulling notes toward user experience groupings, things about confusion and friction. The scientist kept pulling the same notes toward measurement, things about variance and error rate. Both readings were valid, and having both people in the room meant the final groupings held up from more than one angle instead of just mine.

## What the clusters actually were

What came out of this were five or six clear clusters. Things like inconsistent outcomes for similar cases, hard cases and easy cases arriving indistinguishable, unclear communication after a decision, appeals feeling opaque, and new reviewers taking too long to ramp. None of these were surprising individually, since versions of each had come up directly in earlier conversations. What was useful was seeing how much weight each cluster actually carried once every note was accounted for, rather than relying on which complaint happened to be the most memorable one.

## Building a single case journey

The second pass was a journey map, and this is where internal and external research actually got stitched together for the first time. I drew out the full path a single case took, from the moment something triggered it, through triage, review, possible escalation, a decision, and finally whatever communication reached the seller or customer at the end.

Along that journey, I marked where each research theme actually showed up. The intake step is where hard and easy cases got mixed together with no signal. The middle of the journey is where consistency broke down across reviewers. The very end of the journey, the notification back to the seller or customer, is where the communication and trust problems from external research landed almost entirely.

Laying it out this way made something obvious that had not been obvious from the interview notes alone. Every theme from research had a specific home on this journey. Nothing was vague or floating. That mattered a lot for what came next, because it meant I was not designing against a mood, I was designing against specific, located points of failure.

## What the patterns actually were, once assembled

Three things stood out once I stepped back from the map.

The intake problem and the consistency problem were really the same root cause wearing two faces. Cases had no upfront signal about how much judgment they actually needed, so every case got treated the same way procedurally, which wasted effort on the easy ones and under-served the hard ones.

The communication problem at the end of the journey was almost entirely separate from the review problem in the middle. This mattered, because it meant I could not solve everything with one clever piece of automation in the review step. The notification and appeals experience needed its own attention, regardless of how good the review step became.

And the training and ramp problem was a symptom of the first issue, not a separate one. New reviewers struggled most with judgment calls on ambiguous cases, the same cases experienced reviewers found hardest too. A better system for surfacing which cases needed real judgment would help new reviewers as much as it would help anyone.

That third point in particular changed how I thought about what to design next. I was not just designing a workflow for cases anymore. I was designing something that had to make the review step legible enough that a newer reviewer and a five year veteran could both use it well, just at different speeds. That framing is what I carried into sketching an actual workflow, which the next post covers.
