+++
date = '2025-07-15T09:00:00-07:00'
draft = false
title = 'From Patterns to a Workflow'
summary = 'The research gave me four clear problems located on a case journey. This post is about the unglamorous work of turning that into an actual proposed workflow, logic first, before any screen existed.'
weight = 5
tags = ['ai-native-workflow', 'pm learning series']

[cover]
  image = 'images/learn/ai-native-workflow-design/05-cover.svg'
  alt = 'A branching decision tree showing a case splitting into an automated path and a human review path based on confidence'
+++

With the patterns from research clearly located on a case journey, the temptation was to jump straight to screens. I did not do that, and I am glad I resisted, because a workflow's logic and a workflow's interface are two different problems, and it is much cheaper to get the logic wrong on paper than to get it wrong in a Figma file that three teams have already reviewed.

## Designing the logic before any screen existed

The core idea I landed on was a triage step at the very front of the journey, something that had never existed in the old process. Instead of every case entering one undifferentiated queue, a case would first get a rough read on how much ambiguity it actually carried. Clear cut cases, the ones a reviewer told me she could assess in ten seconds, would follow a fast, mostly automated path. Genuinely ambiguous cases would route straight to a reviewer, with more context attached upfront than the old process ever provided.

This is a simple idea to say out loud and a harder one to actually specify. How confident does the system need to be before treating a case as clear cut. What happens when that confidence turns out to be wrong. Who reviews the automated decisions after the fact, since accuracy on day one does not guarantee accuracy on day two hundred. These questions took several rounds of discussion with engineering and applied science to actually pin down, and I do not think I got all of them right on the first pass.

I also had to design for the case where triage itself gets it wrong. An early version of the logic treated triage as a one time decision, made once at intake and never revisited. Engineering pushed back on this fairly hard, pointing out that a wrong triage call sent down the automated path was worse than a wrong triage call sent to a reviewer, since a reviewer could still catch a mistake and a fully automated path might not. That pushback led me to add a lightweight recheck step partway through the automated path, essentially a second, cheaper confidence check before a decision actually went final. It added a bit of complexity, but it closed a real gap.

## How I actually diagrammed this

For the logic itself, I leaned heavily on Mermaid rather than a visual whiteboard tool. Mermaid lets you write a flowchart or a decision tree as plain text and it renders the diagram for you, which meant I could describe branching logic precisely, put it directly in a design document next to the reasoning behind it, and let anyone reviewing it suggest a change as a one line text edit instead of redrawing boxes. For pure logic, before any visual design exists, I would recommend it over a general diagramming tool. It is faster to edit and it lives naturally in version control alongside the document explaining it.

Tools like Whimsical or Miro are better once you want to think spatially, moving things around, clustering, sketching loosely. I used those earlier for the affinity mapping in the last post. But for a decision tree with real branching logic, Mermaid earned its place in my toolkit and stayed there for the rest of this project. If you have never tried it, the learning curve is genuinely small, a few hours at most, and the syntax reads close enough to plain English that most of it is guessable.

There is a real tradeoff worth naming, though. Mermaid diagrams look like diagrams, not like product. Nobody outside the immediate team should ever see one of these and mistake it for what we were actually going to ship. I made sure every Mermaid diagram I shared was clearly labeled as logic, not design, precisely so it did not get treated as a finished screen by someone skimming a document three levels removed from the work.

## Reviewing the proposed workflow before moving further

Before touching any actual design tool, I walked this logic past three groups separately. Applied science reviewed it for whether the confidence thresholds I was proposing were even realistic given the model performance we could expect. Engineering reviewed it for where the automated path would need to plug into existing systems. Policy owners reviewed it for whether the triage logic respected the actual policy structure, or whether I had oversimplified something that genuinely needed more nuance.

That last review caught something I had gotten wrong. My first draft treated ambiguity as a single scale from clear to unclear. One policy owner pointed out that some cases were unclear because of missing information, which meant more data could resolve them, while other cases were unclear because the policy itself had a genuine judgment call baked in, which no amount of additional data would resolve. Those needed different handling entirely. I redrew the logic with that distinction built in before moving forward, and it made the whole workflow noticeably better.

With the logic reviewed and reasonably solid, it was finally time to make it visual, which is where Visily comes in, in the next post.
