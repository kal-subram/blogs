+++
date = '2026-07-06T00:50:51-07:00'
draft = false
title = 'What Building at Catalog Scale Teaches You About AI'
summary = "At catalog scale, weird cases are not exceptions, they are a population. Notes on why the long tail, not the common case, is the real job."
categories = ['Safety, Compliance, and Human Review']

[cover]
  image = 'images/posts/what-building-at-catalog-scale-teaches-you-about-ai-cover.svg'
  alt = 'A long tail distribution curve, a tall peak labeled Common Cases on the left tapering into a long, sparse tail labeled The Long Tail extending to the right'
+++

Catalog scale changes your personality a little.

After you spend enough time around large marketplaces, billions of listings, many countries, many languages, many product types, and many people trying to describe the same object in fifty different ways, you stop believing in clean taxonomies as a natural state of the world.

Clean taxonomies are a hope. Reality is more creative.

A product catalog looks simple from the outside. There are products, titles, descriptions, images, sellers, categories, attributes, and policies. Very neat. Very organized. Then you go one level deeper and realize that the same product can be described differently across sellers, stores, languages, use cases, and regulatory contexts. A product can look harmless in one category and risky in another. A listing can be incomplete, over-optimized, mistranslated, duplicated, or carefully worded to avoid detection.

This is where AI becomes both useful and difficult.

AI can help classify, detect, group, summarize, compare, and automate at a scale that manual systems cannot handle alone. But catalog scale also exposes every weakness in the system. The long tail is not a footnote. It is the job.

In smaller systems, the weird cases feel like exceptions. At catalog scale, weird cases are a population.

This is one of the biggest lessons I learned from working on AI-assisted compliance and safety systems. The challenge was not only building models that performed well on known examples. The challenge was building workflows that could handle product variation, policy interpretation, seller behavior, regional differences, and evolving risk.

A model might work well on the examples everyone already understands. That is helpful, but not enough. The harder work is in the edges: products that sit between categories, listings that change language, safety issues that emerge later, or cases where the item itself is not the only risk. Sometimes the use case changes. Sometimes regulation changes. Sometimes the way people interact with a product changes.

Catalogs are alive in that way. They do not sit quietly after launch.

This is why aggregate metrics can become misleading. A model can perform well overall and still underperform in a small but important segment. At large scale, even a small segment can represent many customers, many sellers, or a meaningful safety risk. When people say, "It is only a small percentage," I become immediately alert. Small percentage of a very large number is still a number with its own life.

The practical lesson is that AI teams need segment-level thinking. Performance has to be understood across categories, languages, policy types, regions, risk severity, and operational pathways. Not because dashboards should become more complicated for entertainment purposes. They will do that on their own. But because the average will hide what the product needs to know.

Catalog scale also teaches humility about data.

Labeled datasets are useful, but they are shaped by what the system already noticed. If the historical workflow missed a certain type of risk, that risk may be underrepresented in the training or evaluation data. If reviewers never saw a pattern, the labels will not magically contain it. If a category is emerging, past data may be polite but unhelpful.

This is where human review, audits, active learning, and post-launch monitoring become essential. Not as a sign that the AI failed, but as part of how the system keeps learning. The goal is not to remove humans from every decision. The goal is to use automation where it is strong, and human judgment where the world is still changing.

Another lesson from catalog scale is that policy is not just text. Policy has to become an operational system.

A written policy may look clear. Then it meets listings, edge cases, seller appeals, regional variation, customer safety concerns, and enforcement workflows. Suddenly the policy needs evidence standards, escalation paths, reviewer guidance, seller communication, and monitoring. The written rule is only the beginning.

This is where product work becomes important. Someone has to translate policy intent into system behavior. What does the model classify? What evidence does the reviewer see? What happens when information is missing? How does the system handle uncertainty? How do sellers understand what changed? How does the team know if enforcement is working as intended?

None of this is glamorous in the usual AI-demo sense. There is no single magical moment. The work is layered. Data, models, thresholds, review, policy, operations, communication, measurement, and feedback.

At catalog scale, AI is not a feature. It is part of an operating system.

That operating system has to be reliable enough to handle the common cases, cautious enough to route uncertainty, flexible enough to adapt when risk changes, and measurable enough to know when it is wrong.

This is why I find marketplace AI so interesting. It forces a product team to deal with reality. Not the clean version of reality from a demo, but the version with messy listings, changing policies, multilingual data, long-tail edge cases, and business pressure.

Catalog scale teaches you that AI systems do not become trustworthy because they are powerful. They become trustworthy because they are measured honestly, monitored carefully, and designed with enough respect for the mess they are about to enter.

That lesson stays with you.
