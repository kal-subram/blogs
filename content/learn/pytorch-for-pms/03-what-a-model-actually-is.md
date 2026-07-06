+++
date = '2026-06-15T09:00:00-07:00'
draft = false
title = 'What a Model Actually Is'
summary = 'A model is a function with adjustable numbers inside it. That is the whole secret. This post builds one in five lines.'
weight = 3
tags = ['pytorch', 'pm learning series']
+++

The word "model" gets thrown around in meetings like it's some kind of digital brain sitting in a server somewhere, thinking things. It is not that. A model is a function, the same kind you used in tenth standard maths, that takes a tensor in and produces a tensor out. The only thing special about it is that the function has a bunch of adjustable numbers inside it, and training is just the process of nudging those numbers until the function's answers get closer to correct.

That's genuinely the whole secret. Once that lands, a lot of the mystery goes away.

## Building the smallest possible model

In PyTorch, a model is built using `nn.Module`, and the simplest useful building block is `nn.Linear`, which does exactly what it sounds like, a linear equation, the `y = mx + c` from school, just with more numbers involved at once.

```python
import torch
import torch.nn as nn

model = nn.Linear(in_features=3, out_features=1)

x = torch.tensor([[1.0, 2.0, 3.0]])
output = model(x)

print(output)
print(output.shape)   # torch.Size([1, 1])
```

`in_features=3` means the model expects an input with 3 numbers. `out_features=1` means it produces 1 number out. We fed it a tensor of shape `[1, 3]`, one example, three numbers, and got back a tensor of shape `[1, 1]`, one example, one number. That output number is meaningless right now, the model hasn't learned anything yet, but it ran, and that's the whole mechanic of a forward pass: data goes in one end, a number comes out the other.

## Where the adjustable numbers actually live

The "adjustable numbers" have a name, weights and biases, and you can look right at them.

```python
print(model.weight)
print(model.weight.shape)   # torch.Size([1, 3])
print(model.bias)
print(model.bias.shape)     # torch.Size([1])
```

`model.weight` is a tensor with one number for each of the three inputs, and `model.bias` is one extra number added at the end. Right now these are random, PyTorch fills them in with small random values when the model is created. Training, which we'll get to properly next post, is the process of adjusting these exact numbers, nothing else, until the output starts making sense for your problem.

This is worth sitting with for a second. When a headline says a model has "7 billion parameters," this is what it means, literally. It means there are 7 billion of these adjustable weight and bias numbers, spread across many more layers than our one tiny `nn.Linear`. Same idea, only bigger, a lot bigger.

## Stacking layers, and why you need a kink in the line

One `nn.Linear` layer can only draw a straight line through your data, no matter how many inputs you give it. Real problems are rarely that polite. So models stack several layers together with something called an activation function in between, most commonly one called ReLU, which just means "if the number is negative, make it zero, otherwise leave it alone."

```python
model = nn.Sequential(
    nn.Linear(3, 8),
    nn.ReLU(),
    nn.Linear(8, 1),
)

x = torch.tensor([[1.0, 2.0, 3.0]])
output = model(x)
print(output.shape)   # torch.Size([1, 1])
```

That small kink from ReLU, repeated across enough layers, is what lets a model bend and curve around messy real world data instead of only ever drawing a straight line through it. You don't need the maths behind why, just the idea that stacking layers plus a small nonlinearity in between is most of what "deep" in deep learning is pointing at. Deep just means more layers stacked up.

## Why the numbers start out random

A fair question at this point is why not just set the weights to sensible numbers to begin with, instead of random ones. The honest answer is that nobody knows what "sensible" looks like ahead of time, that's the entire thing training is meant to discover. Starting random also serves a quieter purpose, it breaks symmetry. If every weight in a layer started at the exact same value, they'd all get nudged the exact same way during training too, forever, and the layer would behave like it had only one weight instead of many. Small random numbers at the start let each weight find its own, different job to do.

You can peek at every named weight in a model, which is handy when a model has more than one layer and you want to know which is which:

```python
for name, param in model.named_parameters():
    print(name, param.shape)
```

For the two layer model above, this prints something like `0.weight torch.Size([8, 3])`, `0.bias torch.Size([8])`, `2.weight torch.Size([1, 8])`, `2.bias torch.Size([1])`, one line per layer that has adjustable numbers in it. ReLU has no weights of its own, it's just the kink, so it doesn't show up in this list at all.

## Counting parameters, since people love quoting this number

```python
total_params = sum(p.numel() for p in model.parameters())
print(total_params)
```

For our tiny two layer model above, this prints something like 41, three numbers per input times eight, plus eight biases, plus eight times one, plus one final bias. Not a number anyone would put in a press release, but the exact same counting logic scales up to the billions you see quoted for large language models. Same arithmetic, just repeated an enormous number of times.

## What this buys you in a review

Next time a slide says "we added another layer" or "we increased the hidden size," you now know what actually changed underneath that sentence. More layers means more of these weight and bias grids stacked in sequence. A bigger hidden size means a wider grid at some step in the middle, like our `8` above turning into `256` or `1024`. None of it is a black box function anymore, it's a function with knobs, and now you know where the knobs are.

Next post, we finally turn those knobs on purpose. That's training, and it's less mysterious than the name suggests.
