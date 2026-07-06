+++
date = '2026-06-22T09:00:00-07:00'
draft = false
title = 'Training a Model, Without the Mysticism'
summary = 'Training is three ideas stacked together: a number that measures wrongness, a way to figure out which knob to turn, and a small nudge repeated many times.'
weight = 4
tags = ['pytorch', 'pm learning series']
+++

"Training" is one of those words that sounds like it's hiding something complicated, gym membership for software. It isn't. Training is three ideas stacked on top of each other, and none of them are hard on their own. A number that measures how wrong the model currently is. A method for figuring out which of the model's knobs to turn, and in which direction, to make that number smaller. And a loop that repeats this a few thousand times until the number stops improving much.

That's the entire idea. Let's build it.

## The loss function, a number for "how wrong"

A loss function compares what the model predicted against what the answer should have been, and returns a single number. Bigger number, worse prediction.

```python
import torch
import torch.nn as nn

loss_fn = nn.MSELoss()

prediction = torch.tensor([4.0])
actual = torch.tensor([5.0])

loss = loss_fn(prediction, actual)
print(loss)   # tensor(1.)
```

`MSELoss` is Mean Squared Error, it takes the difference between prediction and actual, squares it, and that's the loss. Predicted 4, actual was 5, difference of 1, squared is still 1. If the model had predicted 3, the loss would jump to 4, because being more wrong costs more, and the squaring punishes big misses harder than small ones on purpose. There are other loss functions for other kinds of problems, but they all do the same job, turn "how wrong was this" into one number you can try to shrink.

## Backpropagation, or, whose fault was it

Once you have a loss number, you need to know which weight to nudge and by how much to bring that number down. That's what backpropagation does. Don't let the name intimidate you, it is genuinely just an automatic blame assignment exercise. It works backward through the model, layer by layer, calculating how much each individual weight contributed to the final error.

You never do this maths by hand, PyTorch does it for you the moment you call one method:

```python
loss.backward()
```

That single line calculates, for every weight in the model, exactly which direction and how far to nudge it to reduce the loss slightly. This is why it's called backpropagation, the error is propagated backward through the model to figure out who's responsible.

## The optimizer, the thing that actually makes the nudge

Backprop tells you the direction to nudge each weight. The optimizer is the thing that actually does the nudging, by some small step size called the learning rate.

```python
optimizer = torch.optim.SGD(model.parameters(), lr=0.01)
```

`lr=0.01` means take small steps. Too large a learning rate and the model overshoots and never settles, like adjusting your shower temperature in huge turns and constantly swinging between scalding and freezing. Too small and it takes forever to get anywhere. Most of what's called "tuning" in early model development is exactly this kind of knob turning, at a level above what you'll ever need to do yourself, but now you know what the knob is called when someone mentions it.

## Putting the whole loop together

Here's a complete, tiny, actually runnable training loop:

```python
import torch
import torch.nn as nn

model = nn.Linear(1, 1)
loss_fn = nn.MSELoss()
optimizer = torch.optim.SGD(model.parameters(), lr=0.01)

x = torch.tensor([[1.0], [2.0], [3.0]])
y = torch.tensor([[3.0], [5.0], [7.0]])

for epoch in range(100):
    prediction = model(x)
    loss = loss_fn(prediction, y)

    optimizer.zero_grad()
    loss.backward()
    optimizer.step()

    if epoch % 20 == 0:
        print(epoch, loss.item())
```

Walking through it once: `model(x)` is the forward pass from the last post, a guess. `loss_fn` scores how bad the guess was. `optimizer.zero_grad()` clears out old nudge calculations so they don't pile up from the previous round. `loss.backward()` figures out the blame for every weight. `optimizer.step()` actually applies the small nudge. Then the whole thing repeats.

Run this and you'll see the loss number printed at the top get smaller and smaller each time. The data here is just `y = 2x + 1`, and the model is slowly discovering that pattern on its own, purely by being nudged away from wrong answers, a hundred small corrections at a time.

## Learning rate, the shower tap problem again

It's worth sitting with the learning rate a bit longer, because it's one of the first things anyone touches when a model isn't training well. Set it too high and the loss number from earlier won't calmly shrink, it'll bounce around, sometimes even grow, because each nudge overshoots past the good answer like turning a steering wheel too hard and over correcting the other way. Set it too low and the loss shrinks, but so slowly that you'd need days of training to get anywhere, like nudging that same steering wheel by a millimetre at a time on a sharp curve.

Most teams don't just pick one number and hope. A common trick is starting with a slightly larger learning rate and shrinking it gradually as training goes on, big corrections early when the model is wildly wrong, smaller and smaller corrections later as it gets close. If you hear "we're using a learning rate schedule," that's all it means, the step size itself changes over time instead of staying fixed.

## One pass through your data is called an epoch

Each full trip through your training data, `x` and `y` above, is one epoch. We ran 100 epochs in that loop. In real projects with millions of examples, one epoch alone can take hours, which is exactly why "how many epochs did this train for" is a completely reasonable, sharp question to ask in a review, and why the answer tells you a lot about how much the team actually let the model learn before calling it done.

Next post, we stop feeding the model three neat, hand typed numbers and look at how real data, thousands or millions of examples, actually gets loaded in.
