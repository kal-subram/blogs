+++
date = '2025-08-19T09:00:00-07:00'
draft = false
title = 'Sketching the Workflow in Visily'
summary = 'With the logic reviewed, it was time to make it visual for the first time, in Visily, deliberately rough, before anyone spent real design hours on it.'
weight = 6
tags = ['ai-native-workflow', 'pm learning series']

[cover]
  image = 'images/learn/ai-native-workflow-design/06-cover.svg'
  alt = 'Three rough low fidelity wireframe screens laid out side by side, a queue screen, a case detail screen, and an escalation screen'
+++

The Mermaid diagrams from the last post described logic, boxes and arrows and branching conditions. They did not tell anyone what a reviewer would actually see on screen, and at some point that gap has to close. Visily is where I closed it, on purpose, at low fidelity, before I let anyone spend real design hours on anything.

## Why Visily specifically

Visily is built around fast, rough wireframing, and it leans on AI assistance to generate layout variations quickly rather than making you place every box by hand. For this stage of the project, that mattered more than polish. I was not trying to produce anything that looked finished. I was trying to produce enough of a shape that a reviewer, a team lead, or an engineer could look at it and tell me whether the workflow actually made sense once it had a screen attached to it.

I want to be fair to the alternatives too. Balsamiq does a similar job and has been around longer, with a slightly more manual feel to building screens. Whimsical can do rough wireframing as well, though I found it stronger for the diagramming and flowcharting work from the last post than for screen layouts specifically. Visily's edge for me was speed, I could describe roughly what I wanted and get three variations to react to, rather than building one option slowly by hand and anchoring on it too early.

There is a real cost to that speed as well, worth naming honestly. AI generated layout variations sometimes hand you something plausible looking that does not actually reflect a decision you made on purpose, it just reflects a common pattern the tool has seen before. I caught myself accepting a layout once or twice before I had actually asked whether it fit our specific workflow, purely because it looked reasonable at a glance. Once I noticed that habit in myself, I started treating every AI generated variation as a rough first draft to interrogate, not an answer to accept.

## Working with our own designer alongside this

I was not doing this entirely alone. Our design team had one designer partially allocated to this project, and I want to be honest that Visily was mostly my tool, not hers. She worked in Figma from very early on, even for rough concepts, since that was where her muscle memory and component libraries already lived. I used Visily specifically because it let me, as the PM, produce something concrete fast enough to bring into a conversation without waiting on design bandwidth for every small iteration. The two of us then reconciled our sketches before anything moved further, which meant Visily's job was really to keep the conversation moving quickly between design cycles, not to replace design work outright.

## What the low fidelity sketches actually covered

## What the low fidelity sketches actually covered

I built three screens at this stage, deliberately kept rough with boxes, labels, and placeholder text rather than real content. A queue screen, showing how a reviewer would see cases that had been routed to them after triage, with the ambiguity signal from the new logic visible upfront instead of hidden. A case detail screen, showing what context a reviewer would actually have in front of them when making a call, which was noticeably more than the old process provided. And a lightweight escalation screen, for the smaller number of cases that needed to go beyond a single reviewer.

None of these had a real visual design yet. Boxes were boxes, buttons said things like "approve" and "escalate" in a plain default font, and nothing was styled. That was intentional. The moment a wireframe looks polished, people stop giving you structural feedback and start giving you opinions about color and spacing instead, which is the wrong feedback at the wrong stage.

I made a point of showing the automated path and the human review path as genuinely different screens rather than one screen with a toggle, even at this rough stage. That decision came directly out of the earlier research. Reviewers had told me the old queue treated every case identically regardless of how much judgment it actually needed, and I did not want the new wireframes to quietly repeat that same mistake in a different form, just because one shared screen felt simpler to design.

## Getting reaction from the same people I had researched with

I brought these sketches back to a handful of the same reviewers I had shadowed months earlier, along with their team leads. This was not a formal usability study, just short sessions where I walked through the screens and asked people to react honestly.

The most useful piece of feedback was about the ambiguity signal on the queue screen. My first version showed it as a single word, something like "low" or "high." A team lead pointed out that reviewers would start ignoring a label that coarse within a week, the same way people learn to ignore a low fuel warning light that comes on too early. She suggested showing the actual factors driving the signal, not just a summary word, so a reviewer could form their own judgment about it rather than outsourcing that judgment to a label. That single piece of feedback changed the case detail screen more than anything else at this stage, and it carried through directly into the Figma work in the next post.
