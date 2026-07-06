+++
date = '2025-12-09T09:00:00-08:00'
draft = false
title = 'Designing the AI Workflow UI, End to End'
summary = 'By December the design was whole, not a wireframe, not a single screen in isolation, but a full path a case could travel, reviewed by everyone whose name was on the project.'
weight = 8
tags = ['ai-native-workflow', 'pm learning series']

[cover]
  image = 'images/learn/ai-native-workflow-design/08-cover.svg'
  alt = 'A complete end to end flow of screens from intake through triage, review, decision, and a clearer notification back to the customer'
+++

Every earlier post in this series covered one piece of this work in isolation, research, patterns, logic, a rough sketch, a Figma screen. By December, all of it had come together into a full flow, from the moment a case entered the system to the moment a seller or customer actually heard back. I want to walk through that whole path here, since a workflow only really proves itself when you look at it end to end rather than screen by screen.

## Walking the whole path

A case still enters the same way it always did, flagged by an upstream system or a report. What happens immediately after is where everything changed. Triage now runs automatically and instantly, producing the ambiguity read that used to not exist at all. Clear cut cases move down the fast path, get a final automated check partway through, as engineering had insisted on back in the workflow logic stage, and close without ever reaching a person, unless that recheck flags something worth a second look.

Ambiguous cases land in a reviewer's queue with the ambiguity factors visible immediately, not buried under raw data, exactly as we had settled after testing both layouts with real reviewers. The reviewer works the case with meaningfully more context than the old process ever gave them, makes a call, and either closes it or escalates it using the lightweight escalation screen from the Visily stage, now fully designed with real states for what happens while an escalation is pending.

One detail I am genuinely proud of, small as it sounds, is what happens to a case after a reviewer closes it. The old process gave a reviewer nothing back once a case left their queue, no signal on whether their call held up on later audit, no sense of whether they were calibrated the same way as their peers. The new design includes a lightweight, private view where a reviewer can see, in aggregate, how their calls compared to similar cases handled by others on their team. Nobody asked for this directly in research. It came out of noticing, across both the shadowing sessions and the survey, how much reviewers cared about doing the job well and how little visibility they had into whether they actually were.

## Where external research finally showed up in the design

Everything up to this point in the flow addressed what internal research had surfaced. The last piece of the flow is where external research, the conversations with sellers and customers from earlier in this series, actually changed the design.

The old notification a seller received was a single generic message. The new one names the specific factor that drove the decision, in plain language, not policy language, and includes a direct link to appeal rather than a general support contact. For customers who had filed a report, we added a simple status update, sent once a case tied to their report closed, confirming that it had in fact been looked at. Neither of these were complicated to build. What was hard was remembering to design them at all, since neither one had come up in a single internal research session. They only existed because we had gone and talked to the people on the outside of the process too.

## Getting to sign off

The final review before this design was considered done pulled in leadership, policy, legal, and engineering together in one room, which had not happened at any earlier stage of the project. Legal reviewed the new notification language carefully, since anything communicated externally carries different scrutiny than an internal tool. Policy reviewed whether the plain language explanations still accurately represented the actual policy being applied, without oversimplifying it into something misleading. Engineering confirmed feasibility against real system constraints one more time.

The one thing that almost got cut in that final review was the customer facing status update. It was seen by a couple of people in the room as a nice to have, not core to the project's original goal of fixing the review workflow itself. I pushed back on that, using the customer's own words from research, the one who said she just wanted to know someone had actually looked. That specific line, more than any argument I could construct myself, was what kept it in scope.

## What this design actually represented

Looking at the whole thing together, what struck me most was how little of the final design was about the model itself. Most of what changed a reviewer's day, and a customer's experience, came from decisions about information, sequencing, and communication, not from anything exotic about the underlying AI. The model made triage possible. Everything a person actually experienced was still a design problem, the same kind of design problem that existed before any of this was AI native at all.

With the core design done, the story does not end there. A few months into 2026, we picked the whole thing up again to bring it in line with a newer piece of our design system, and to make sure it stayed genuinely easy for engineering to build. That is where the next post picks up.
