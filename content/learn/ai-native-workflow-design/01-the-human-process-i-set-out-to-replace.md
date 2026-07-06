+++
date = '2025-02-10T09:00:00-08:00'
draft = false
title = 'The Human Process I Set Out to Replace'
summary = 'Before any of the research or the Figma work, there was a manual compliance process that had simply outgrown the number of humans available to run it.'
weight = 1
tags = ['ai-native-workflow', 'pm learning series']

[cover]
  image = 'images/learn/ai-native-workflow-design/01-cover.svg'
  alt = 'A single case moving through a long chain of human reviewers and handoffs before reaching a decision'
+++

Before I say anything about research or Figma, I want to describe the process I was actually trying to replace. Without that, the rest of this series will not make much sense.

I will keep the specifics light here. This work was done at Amazon, on a safety and compliance workflow in e-commerce, and a good part of the detail is confidential. What I can talk about is the shape of the problem, because the shape is the useful part anyway. Most compliance workflows at scale end up looking similar, whatever the company, whatever the industry.

## What the process actually looked like

A case would come in, usually flagged by some upstream system, or a report from a customer, a seller, or an internal team. From there it went into a queue. A reviewer would pick it up, look at the details, apply policy as best they understood it that week, and make a call. Depending on what they decided, the case might get closed, escalated to someone more senior, sent to a different team entirely, or sent back for more information.

On paper this sounds simple enough. In practice, a single case could pass through three or four people before anyone made a final call. Each of those people had their own queue, their own backlog, their own read of the policy that week. So a case did not move through the process in a straight line, it moved through a chain of individual decisions, each one made a little differently.

It was common for two reviewers to look at similar cases and reach different decisions. Not because anyone was careless, but because policy had a lot of edge cases, the guidance was long and dense, and the volume of cases meant nobody had the time to sit and deliberate the way the written guidance quietly assumed they would. A guidance document written for a calm, careful reading does not survive contact with a queue of four hundred cases and a shift ending in an hour.

The number of touchpoints was the real issue underneath all of this. Every handoff added time, and every handoff was a place where context could get lost. A reviewer at the end of a chain often knew less about a case than the person who first looked at it, because notes were short, systems didn't always talk to each other well, and everyone was moving fast. I sat with a few reviewers early on and watched this happen in real time, a case arriving with three lines of context from the previous person, most of which raised more questions than it answered.

## Why this was becoming unworkable

Volume kept growing, and it grew faster than the reviewer headcount could reasonably grow with it. This is the part every PM working on a manual process eventually runs into. You can hire more reviewers for a while, but at some point the math stops working, and it stops working well before anyone in the room wants to admit it out loud. Hiring is slow, training a new reviewer to be reliable on a nuanced policy takes months, and the queue does not wait for either of those things to catch up.

There was also a consistency problem sitting underneath the volume problem. When policy has that many edge cases and reviewers are moving quickly, you end up with real variance in outcomes for similar cases. That is a hard thing to defend, to the customers and sellers affected by it, and to the teams responsible for the policy itself. I remember pulling a small sample of cases that looked nearly identical on paper and finding three different outcomes among them. Nobody had done anything wrong. The process itself simply did not guarantee sameness, and at that volume, it never really could.

And there was a slower, quieter cost too, one that took me longer to notice. Good reviewers who joined the team hoping to do careful, judgment heavy work were instead spending most of their day on cases that did not need much judgment at all. The genuinely hard cases, the ones that actually needed a sharp, experienced person, were competing for the same attention and the same minutes as the routine ones. Over time that wears a team down in a way that does not show up on any dashboard, at least not for a while.

Leadership cared about this for reasons beyond team morale as well. A process that grows headcount in step with order volume is not really a scalable process, it is a cost line that scales with the business, and at some point that stops being something a company wants to carry.

## What I was actually asked to figure out

My job was not simply to go automate this. It was closer to figuring out whether an AI-native version of this process could exist at all, and if it could, what it should look like so that the judgment a good reviewer brings does not get lost along the way.

That distinction mattered more than I appreciated at the start. Automating the existing process, exactly as it stood, would have just made the same inconsistent decisions faster, and arguably harder to catch. The actual task was to redesign the workflow itself around what a model could reliably do, what genuinely still needed a person, and where the two should hand off to each other cleanly.

I did not know the answer to any of that on day one. I did not even know the right questions yet, and I want to be honest that this took me longer to accept than I would like to admit. It is tempting, especially as a PM, to walk in with a point of view and start sketching a solution in week one. Getting to the right questions took actual research, with the people running the process today, and with the customers and sellers on the other end of it. That is where the next post in this series picks up.
