+++
date = '2026-07-06T00:40:00-07:00'
draft = false
title = 'Thresholds Are Product Decisions'
summary = "A threshold is not just a number tuned for precision and recall. It is a decision about who experiences risk, who experiences friction, and how much uncertainty a system is allowed to act on."
categories = ['Safety, Compliance, and Human Review']

[cover]
  image = 'images/posts/thresholds-are-product-decisions-cover.svg'
  alt = 'A horizontal slider running from False Positives on the left to False Negatives on the right, with a threshold marker positioned along the track'
+++

One of the easiest ways to make AI sound purely technical is to talk about thresholds as if they belong only to science or engineering.

Move the threshold up. Move it down. Increase precision. Improve recall. Reduce false positives. Catch more risky cases.

All true. All useful. Also incomplete.

In real products, a threshold is not just a number. It is a decision about who experiences risk, who experiences friction, and how much uncertainty the system is allowed to act on.

That is why I have come to think of thresholds as product decisions.

This became clear to me while working on AI-assisted compliance and safety workflows. The model output was only one part of the system. The harder question was what the product should do with that output. A high-confidence case might move toward automation. A lower-confidence case might need human review. A borderline case might need more evidence. A severe risk might need faster action even when the system still had some uncertainty.

Each path had consequences.

If the threshold was too aggressive, the system could incorrectly flag good actors, create unnecessary operational work, frustrate users, and damage trust. If the threshold was too conservative, the system could miss risky cases and create customer or safety exposure. Neither side was free. Both had a cost.

This is why accuracy by itself never felt sufficient to me.

Accuracy can be comforting because it gives one clean number. Unfortunately, production systems are not so considerate. A model can look strong overall and still fail where it matters. It can perform well on common cases and badly on rare ones. It can look healthy in aggregate while creating pain for a specific group of users or missing a small but serious risk category.

A threshold decision has to understand that unevenness.

In safety and compliance systems, false positives and false negatives do not behave the same way. False positives are loud. A seller notices. An operator notices. A queue grows. Someone escalates. People ask why automation is creating extra work. Very quickly, the room has opinions.

False negatives are quieter. They may sit outside the sample set. They may show up later as an incident, an audit finding, a customer complaint, or a pattern someone finally decides to investigate. They are harder to measure because the system missed them in the first place.

That imbalance affects product decisions. Teams naturally get pulled toward the visible pain. This is human. It is also dangerous if the product is meant to catch high-risk misses.

The role of the product manager is not to pick a threshold by instinct and then decorate the decision with metrics. The role is to bring the right people into the trade-off. Science, engineering, policy, legal, operations, customer experience, and business stakeholders all see a different part of the cost.

In a good threshold discussion, the team is not only asking whether the model is good. The team is asking what kind of mistake the system can tolerate, which mistakes require human judgment, which decisions are reversible, and what monitoring is needed after launch.

That sounds obvious, but many teams skip it because the metric discussion feels more objective than the product discussion.

There is nothing wrong with precision, recall, F1, false positive rate, or false negative rate. I like these metrics. They bring discipline. But they become much more powerful when tied to the actual decision. Precision matters differently when an automated action can hurt a good actor. Recall matters differently when a miss can create safety exposure. Calibration matters when confidence scores decide whether the system acts, escalates, or waits.

The threshold is where model behavior becomes user experience.

It decides whether a user gets blocked, warned, reviewed, ignored, asked for evidence, or allowed through. It affects how much work operations receives. It affects what legal or policy teams need to defend. It affects whether customers experience the system as fair, confusing, cautious, or careless.

That is product territory.

One pattern I try to avoid is treating thresholds as permanent. A launch threshold is not a sacred object. It is a starting position based on evidence available at that time. Once the system is live, the data changes. The user behavior changes. The policy may change. The model may face segments that were underrepresented in evaluation.

Thresholds need monitoring. They need review. Sometimes they need to move.

The strongest AI systems do not pretend uncertainty does not exist. They route it. They expose it. They decide when to automate and when to slow down. They understand that not every decision deserves the same level of confidence, and not every error has the same consequence.

That is what makes thresholding product work.

It is not only about tuning a model. It is about deciding how much authority the system should have in the real world.

And in high-stakes environments, that decision deserves more than a metric slide.
