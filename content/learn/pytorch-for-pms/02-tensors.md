+++
date = '2026-06-08T09:00:00-07:00'
draft = false
title = 'Tensors, the One Data Structure That Matters'
summary = "A tensor is just a grid of numbers with a shape. Understand shape and dtype and you understand most of what breaks in a model."
weight = 2
tags = ['pytorch', 'pm learning series']
+++

Last post we installed PyTorch and made a tensor without really talking about what it was. Time to fix that, because tensors are genuinely the one thing worth understanding properly in this whole series. Almost every bug an engineer complains about, and almost every "the shapes don't line up" comment in a code review, traces back to this one idea.

## It's just a grid of numbers

Forget the word tensor for a second and think about what you already know. A single number, like 7, is the simplest case. A list of numbers, like your weekly sales figures, is one step up. A spreadsheet, rows and columns, is one step up from that. A workbook with several sheets stacked on top of each other is one more step up again.

That's it. That's the whole idea. A tensor is any one of these, a single number, a list, a spreadsheet, a stack of spreadsheets, or a stack of stacks. The fancy word "tensor" just means "grid of numbers with some number of dimensions," and PyTorch uses the same object and the same operations no matter how many dimensions you're working with. One tool, every shape.

## Shape is the thing that actually matters

Every tensor has a shape, which is just the size of each dimension. Let's look at a few:

```python
import torch

a = torch.tensor(7)
b = torch.tensor([1, 2, 3])
c = torch.tensor([[1, 2, 3], [4, 5, 6]])

print(a.shape)   # torch.Size([])
print(b.shape)   # torch.Size([3])
print(c.shape)   # torch.Size([2, 3])
```

`a` has no shape at all, it's a single value. `b` has shape `[3]`, three numbers in a row. `c` has shape `[2, 3]`, two rows of three numbers each, exactly like a small spreadsheet.

Here's why this matters more than it sounds like it should. Every operation in PyTorch, every layer in a model, expects its input to arrive in a specific shape. If your data shows up as `[2, 3]` and the model was expecting `[3, 2]`, or expecting three dimensions and only got two, PyTorch stops and complains loudly. That error, a shape mismatch, is probably the single most common thing that goes wrong in day to day model building. Now when an engineer mentions it in standup, you'll know exactly what kind of problem that is, and roughly how annoying it is to fix.

## The batch dimension, a small thing that trips up everyone at first

Models almost never see one example at a time. They see a batch, a small group of examples processed together, mostly for speed. So a single photo might have shape `[3, 224, 224]`, three colour channels, 224 pixels tall, 224 pixels wide. But when it's fed to a model, PyTorch expects it wrapped in a batch dimension, shape `[1, 3, 224, 224]` for a batch of one, or `[32, 3, 224, 224]` for a batch of thirty two photos at once.

This is exactly the kind of thing that causes an engineer to say "oh, I forgot to add the batch dimension" and lose twenty minutes. Not a deep bug, just an easy one to miss, and now you know why it happens.

## dtype, the other thing worth knowing

Alongside shape, every tensor has a dtype, short for data type, which tells you what kind of numbers are inside it.

```python
x = torch.tensor([1, 2, 3])
y = torch.tensor([1.0, 2.0, 3.0])

print(x.dtype)   # torch.int64
print(y.dtype)   # torch.float32
```

Whole numbers become `int64` by default, decimals become `float32`. Most model training happens in `float32`, sometimes a smaller `float16` to save memory on bigger models. You don't need to memorise the full list, just know that mixing types is another common way things quietly break, like trying to add a whole number tensor to a decimal one and getting an error instead of an answer.

## Reshaping, because data rarely arrives in the shape you need

One more useful trick, reshaping a tensor without changing the numbers inside it:

```python
x = torch.tensor([1, 2, 3, 4, 5, 6])
print(x.shape)              # torch.Size([6])

y = x.reshape(2, 3)
print(y.shape)              # torch.Size([2, 3])
print(y)
```

Same six numbers, rearranged from one long row into two rows of three. This is what's happening under the hood every time an engineer mentions "reshaping the input" before feeding it to a model. Nothing mystical, just moving the same numbers into a different grid.

## What a shape mismatch actually looks like

Since I keep mentioning it, here's the real thing, so it's not just a phrase. Try this:

```python
a = torch.tensor([[1.0, 2.0, 3.0]])   # shape [1, 3]
b = torch.tensor([[1.0], [2.0]])      # shape [2, 1]

torch.matmul(a, b)
```

This throws an error along the lines of `RuntimeError: mat1 and mat2 shapes cannot be multiplied`. That's it, that's the whole scary error message. Somewhere in the code, two grids of numbers were supposed to line up a certain way to be combined, and they didn't. Nobody's laptop is broken, no data got corrupted, a grid of one shape met a grid of another shape at a step that expected them to match. Ninety percent of the time, fixing this is adding or removing a batch dimension, or reshaping one tensor, exactly the kind of small fix we looked at above.

## A word on devices, since you'll see `.to()` everywhere

One more property tensors carry around, alongside shape and dtype, is which device they live on, your computer's regular processor, the CPU, or a graphics card, the GPU, if you have one. Training on a GPU can be dramatically faster for large models, and you'll see code like this constantly in real projects:

```python
device = "cuda" if torch.cuda.is_available() else "cpu"
x = x.to(device)
model = model.to(device)
```

All this says is, move this tensor and this model onto whichever device is available, and use it for anything after this line. You don't need a GPU for this series, everything here is small enough to run comfortably on a normal laptop, but now when a slide mentions "we moved training to a bigger GPU cluster," you know it's this same idea, just at a much larger scale, more tensors, on more devices, at once.

## Why this one post carries the whole series

I'm spending this much time on tensors because everything else in PyTorch, models, training, data loading, is really just operations on tensors. A model is a function that takes a tensor in and produces a tensor out. Training is adjusting numbers until that output tensor gets closer to what you wanted. Once shape and dtype stop being scary words, the rest of the series gets a lot easier to follow, and so does every model review you sit in after this.

Next post, we finally build something that deserves to be called a model, using exactly this grid-of-numbers idea as the input and the output.
