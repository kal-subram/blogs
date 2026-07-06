+++
date = '2026-06-01T09:00:00-07:00'
draft = false
title = 'Why Bother With PyTorch as a PM'
summary = "You don't need to become an engineer. You just need enough PyTorch that the next model review doesn't go over your head."
weight = 1
tags = ['pytorch', 'pm learning series']
+++

Every review I sit in now, someone talks about "the model" like it's a person with opinions. It ships, it hallucinates, it drifts, it degrades. For years I nodded along in these meetings and filled the gaps with confidence and a straight face. That worked fine, until it didn't, usually right when a VP asked me one follow up question and I had nothing behind the confidence.

So at some point I actually opened PyTorch and started typing things into it. Not to become an engineer, I have zero interest in writing production training code, and my applied scientists would rightly throw me out of the room if I tried. But there is a big gap between "I have opinions about AI products" and "I understand what the file the engineer just pulled up on screen actually does." That gap is where a lot of PMs live, and it is a bad place to be during an incident call at 11pm.

This series is me writing down what I wish someone had handed me a few years ago. Six short posts, each one built around something you can actually run on your own laptop in a few minutes. No GPU, no cloud account, nothing to set up beyond a Python install you probably already have.

## What PyTorch actually is

PyTorch is a library, not a product. It's the thing engineers and applied scientists use to build and train models, the same way a spreadsheet is the thing an analyst uses to build a forecast. Nobody ships "a spreadsheet" to a customer, they ship the forecast that came out of it. Same idea here. Nobody ships "PyTorch," they ship the model that got built with it.

There's also TensorFlow, JAX, and a handful of others doing roughly the same job. PyTorch just happens to be what most applied science teams reach for these days, partly because it reads closer to regular Python, and partly because it's what most research papers use, so it's what most new hires already know coming in. You don't need the history lesson, only enough to recognize the name when it shows up in a slide and know it's not a competitor product, it's a toolkit.

## Why this actually helps a PM, concretely

Three things changed for me once I'd actually touched the tool instead of just reading about it in a deck.

The vocabulary stops being scary. Words like tensor, epoch, batch size, and loss function stop sounding like a foreign language and start sounding like normal words with boring, specific meanings. A tensor is a grid of numbers. An epoch is one full pass through the training data. None of it is secretly complicated, it's just unfamiliar the first time you hear it, same as any new domain.

You can tell a real blocker from a vague one. When an engineer says "we need more data" or "the shapes don't line up," you actually know what that means instead of trusting their tone of voice to decide how worried to be. This alone has saved me from signing off on timelines that had no real chance.

You ask sharper questions in reviews. Instead of "is the model good," which nobody can answer honestly in thirty seconds flat, you can ask what the validation loss is doing compared to training loss, or how many epochs the run went for. Small shift, but it changes how seriously the room takes you, and more usefully, it changes how honest the room is willing to be with you.

## Let's actually run something

This is the whole point of doing it hands on instead of reading slides about it. Open a terminal and install PyTorch, if you don't already have it:

```bash
pip install torch
```

Then open Python and type exactly four lines:

```python
import torch

x = torch.tensor([1, 2, 3])
print(x)
print(x.shape)
```

That's it. You just created your first tensor, which, as we'll get into properly next time, is the one and only data structure everything in PyTorch is built on. `torch.tensor([1, 2, 3])` made a small grid of numbers, and `.shape` told you its dimensions. Print statements, nothing scary, no advanced degree required only.

If that ran without an error, PyTorch is installed and working on your machine, and you've written your first working line of it. Small step, but a real one, not a slide someone else made for you.

## A quick note on what you don't need

Before we go further, let me clear up a worry I had myself before starting. You do not need a fancy laptop, you do not need a GPU, and you do not need to have been good at maths in college. Everything in this series runs on a plain CPU in seconds, because we're working with tiny amounts of data on purpose, just enough to see the ideas move. The maths under the hood is real, but PyTorch handles all of it for you. Your job here is to understand what's happening conceptually, not to derive it on a whiteboard. I certainly can't, and I've been doing this for a while now.

The other worry I had was time. Six posts sounds like a commitment, but each one is written to be read in the time it takes to finish a cup of chai, five to six minutes, with a bit of code you can copy, paste, and actually watch run.

## What's coming across this series

Quick map of where we're headed, so you know what you're signing up for. Next post is tensors properly, what shapes actually mean, and why "shape mismatch" is the single most common complaint you'll hear out of any engineer's mouth. After that, what a model actually is under the hood, followed by training, which sounds mysterious and mostly isn't. Then how real data, not three numbers typed by hand, actually flows into a model. And last, how you tell whether a model that trained beautifully is actually any good, or just memorised the exam.

Understanding this one idea, tensors and shapes, will make you genuinely useful in your next model review, not just present in the room.

I'll keep each post short and each one runnable on your own laptop. No accounts, no GPUs, no pretending you followed something you didn't. Just enough PyTorch that the next time someone in a meeting says "the model" like it has opinions of its own, you'll actually know what they mean by it.
