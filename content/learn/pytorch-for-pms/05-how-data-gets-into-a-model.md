+++
date = '2026-06-29T09:00:00-07:00'
draft = false
title = 'How Data Actually Gets Into a Model'
summary = 'A Dataset is your pile of examples. A DataLoader hands them out in small batches. That is basically the entire pipeline.'
weight = 5
tags = ['pytorch', 'pm learning series']
+++

Last post we trained a model on three hand typed numbers, which was fine for learning the training loop but nothing like how it works with real data. Real projects deal with thousands or millions of examples, and you obviously cannot type those into a list by hand or shove them all into the model in one go. This post is about the two objects that solve that, `Dataset` and `DataLoader`. Between the two of them, that's basically the whole data pipeline, however fancy the actual project looks from the outside.

## Dataset, your organised pile of examples

A `Dataset` in PyTorch is just an object that knows two things, how many examples you have, and how to fetch any one of them by its index. That's the entire contract.

```python
import torch
from torch.utils.data import TensorDataset

x = torch.tensor([[1.0], [2.0], [3.0], [4.0]])
y = torch.tensor([[3.0], [5.0], [7.0], [9.0]])

dataset = TensorDataset(x, y)

print(len(dataset))     # 4
print(dataset[0])       # (tensor([1.]), tensor([3.]))
```

`TensorDataset` is the simplest version, it just wraps existing tensors. In a real project the dataset might instead read images off disk, or pull rows out of a database, or tokenize sentences on the fly, but the shape of the contract never changes, tell me how many examples exist, and let me grab example number `i`. If you ever hear "we wrote a custom Dataset class for this," this is all that means, someone taught PyTorch how to fetch their specific kind of data.

## DataLoader, the thing that hands out batches

Once you have a Dataset, a `DataLoader` wraps around it and does the boring, repetitive part, handing out small batches of examples, in a shuffled order, one batch at a time.

```python
from torch.utils.data import DataLoader

loader = DataLoader(dataset, batch_size=2, shuffle=True)

for batch_x, batch_y in loader:
    print(batch_x, batch_y)
```

`batch_size=2` means each batch has two examples instead of one. `shuffle=True` means the order gets mixed up every epoch, so the model doesn't accidentally learn something about the order your data happens to be stored in, only about the actual pattern you care about.

## Why bother with batches at all

Two honest reasons, and they're both practical, not clever.

Memory. If your dataset has ten million images, you simply cannot load all ten million into memory at once and run them through the model together, your machine would run out of room and fall over. Small batches keep memory use manageable no matter how large the overall dataset gets.

Better learning along the way. Feeding one example at a time makes the nudges from the last post noisy and jumpy, one weird example can yank the weights in a strange direction. Feeding the entire dataset at once makes each nudge painfully slow to compute and, oddly, doesn't actually train better. A batch in between, somewhere between 16 and a few hundred examples depending on the project, tends to give a nudge that's both fast to compute and reasonably steady. This middle ground is exactly why "batch size" shows up in almost every experiment write up you'll ever see, it's one of the first knobs anyone tries adjusting.

## Batches inside the training loop

Here's last post's training loop, updated to pull from a DataLoader instead of using the whole dataset directly:

```python
import torch
import torch.nn as nn
from torch.utils.data import TensorDataset, DataLoader

x = torch.tensor([[1.0], [2.0], [3.0], [4.0]])
y = torch.tensor([[3.0], [5.0], [7.0], [9.0]])

dataset = TensorDataset(x, y)
loader = DataLoader(dataset, batch_size=2, shuffle=True)

model = nn.Linear(1, 1)
loss_fn = nn.MSELoss()
optimizer = torch.optim.SGD(model.parameters(), lr=0.01)

for epoch in range(100):
    for batch_x, batch_y in loader:
        prediction = model(batch_x)
        loss = loss_fn(prediction, batch_y)

        optimizer.zero_grad()
        loss.backward()
        optimizer.step()
```

Notice there are now two loops, an outer one for epochs, and an inner one that walks through every batch the DataLoader hands out. One epoch means the inner loop has run enough times to cover the entire dataset once, which, now that batches are involved, is exactly why an epoch and "one training step" stopped meaning the same thing back in the last post. With a batch size of 2 and 4 total examples, one epoch here is 2 batches, not 1 giant step.

## Shuffling only matters one way

One detail that trips people up when they first read someone else's code, `shuffle=True` is used for training data, but never for validation or test data. That's on purpose. Shuffling the order the model learns from helps it generalise instead of picking up on some accidental pattern in how the data happens to be sorted. But when you're checking a model's performance, you want that check to be identical and repeatable every single time, so the order shouldn't be moving around. If you ever see two DataLoaders in the same file with different shuffle settings, that's not an inconsistency, that's someone doing it correctly.

## A word on num_workers, since you'll see it in real code

You'll also often see `DataLoader` set up with an extra argument, like `DataLoader(dataset, batch_size=32, num_workers=4)`. Fetching and preparing a batch, especially images or text that need extra processing, takes real time, and doing it one batch at a time on a single process can leave your GPU sitting idle waiting for data. `num_workers=4` tells PyTorch to prepare batches in the background using four separate processes, so the next batch is usually ready the moment the model finishes the current one. You don't need to tune this yourself, just recognise it as a performance knob, not a correctness one, when you spot it in someone's code.

## What this buys you in a review

Next time a slide mentions batch size, or someone says training ran out of memory and they had to lower it, or an engineer mentions writing a custom Dataset for some messy internal data source, none of it needs to be a black box anymore. It's a pile of examples and a thing that hands them out in small, shuffled scoops. Nothing more mysterious than that, however dressed up the actual data source turns out to be.

Last post in this series is next, and it's the one that matters most if you actually make decisions based on model quality. We'll look at how you tell whether a model that trained beautifully is actually any good, or whether it just memorised the exam.
