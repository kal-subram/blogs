+++
date = '2026-07-05T09:00:00-07:00'
draft = false
title = 'How Good the Model Actually Is'
summary = 'A model can look brilliant on the data it trained on and fall apart on anything new. This post is about catching that before your customers do.'
weight = 6
tags = ['pytorch', 'pm learning series']
+++

This is the last post in the series, and honestly the one I'd want you to remember even if you forget the other five. Everything so far has been about getting a model to train at all. This one is about the much more important question sitting underneath every status update you'll ever get: is it actually any good, or did it just get very good at the specific examples it happened to see.

## The exam analogy, because it's exactly this

If a student only ever practices with last year's exact question paper and memorises every answer, they'll score full marks on that paper. Put a slightly different question in front of them on the real day and they're lost, because they never actually learned the subject, they just mugged up the answer key. Models do exactly this, and it has a name, overfitting. A model that's overfit will show you a beautiful, low loss number on its training data and then quietly fall apart the moment it sees anything it hasn't already memorised.

This is why nobody serious ever judges a model using only the data it trained on. That number tells you almost nothing about whether it'll work in the real world.

## Splitting your data into three piles

The fix is simple in concept, split your data before training even starts, into three separate piles that never mix.

Training data is what the model actually learns from, the practice questions. Validation data is a set the model never trains on, used during development to check progress and make decisions, like which version of the model to keep, similar to a mock exam. Test data is a final set touched only once, at the very end, to report how the model actually performs, the real exam, no do overs.

```python
from torch.utils.data import random_split

full_dataset_size = 1000
train_size = int(0.7 * full_dataset_size)
val_size = int(0.15 * full_dataset_size)
test_size = full_dataset_size - train_size - val_size

train_data, val_data, test_data = random_split(
    my_dataset, [train_size, val_size, test_size]
)
```

A common split is roughly 70 percent training, 15 percent validation, 15 percent test, though the exact numbers move around depending on how much data you have. What matters far more than the exact percentages is the discipline of never letting the test set leak into training or into decisions made along the way. The moment it leaks, even a little, your final number stops meaning anything.

## Spotting overfitting while it's happening

The classic tell is training loss and validation loss drifting apart.

```python
for epoch in range(epochs):
    train_loss = run_one_epoch(model, train_loader, training=True)
    val_loss = run_one_epoch(model, val_loader, training=False)
    print(epoch, train_loss, val_loss)
```

Early on, both numbers drop together, the model is genuinely learning something general. At some point training loss keeps dropping while validation loss flattens out or starts climbing back up. That gap is the model starting to memorise instead of learn, mugging up the answer key instead of understanding the subject. This is precisely the graph an applied scientist is looking at when they decide to stop training early, and now, if you see that chart in a review, you'll know exactly what you're looking at too.

## Loss isn't the only number that matters

Loss is useful for training, but it's rarely the number that matters to your actual business, and this is the same ground covered in [Accuracy Is Not Enough]({{< relref "/posts/accuracy-is-not-enough" >}}) from the main blog, worth a read after this one. A model can have a perfectly respectable loss and still be dangerous in practice if it's confidently wrong on exactly the rare cases you cared about most. Precision, recall, and false negative rate exist because a single average number, loss included, can hide exactly the failures that hurt the most, quietly, in the tail.

You don't need to calculate these yourself as a PM. You do need to ask which one the team is optimising for, and why, because that choice quietly encodes what kind of mistake the team has decided is more acceptable than the other. That's a product decision wearing a metrics costume, not a purely technical one, and it deserves your opinion in the room.

## A simple metric, just so it's not abstract

To make this concrete, here's roughly how you'd check accuracy for a model sorting things into two categories, once it's done training:

```python
correct = 0
total = 0

for batch_x, batch_y in test_loader:
    predictions = model(batch_x)
    predicted_labels = (predictions > 0.5).float()
    correct += (predicted_labels == batch_y).sum().item()
    total += batch_y.size(0)

accuracy = correct / total
print(accuracy)
```

Nothing clever, count how many predictions matched the real answer, divide by how many predictions there were. This is the number that ends up quoted as "92 percent accurate," and it's worth knowing that a single sentence like that is hiding a training loss curve, a validation split, and a choice about what threshold counts as a positive prediction, all folded into one number. When someone quotes accuracy in a review, this loop, or something shaped exactly like it, is what produced it.

## Where that leaves you

Six posts back, "the model" was a black box that shipped, hallucinated, and drifted, and you nodded along. Now a tensor is just a grid of numbers with a shape. A model is a function with adjustable weights. Training is a loss number getting nudged down, batch by batch, epoch by epoch. And a model that looks perfect is worth exactly nothing until it's been checked against data it never got to memorise.

That's enough to sit in a review, actually follow the slide, and ask the one question that matters instead of five that don't. Good place to stop, and a good place to start asking better questions from here.
