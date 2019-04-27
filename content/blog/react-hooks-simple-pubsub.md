---
title: Simple pubsub hook for react
date: 2019-4-10T00:34:55+00:00
author: Sean
layout: post
categories:
  - Blog, React, hooks
frontpage: true
published: true
---

While working with making some dom elements movable in for a project I am working on, I found that I wanted to have a single handler for mouse move instead of having the individual components that I needed to move. This would facilitate moving multiple components at once, and also ensured that I could not move off of the component if I moved the mouse to fast.

To facilitate this, I made a simple pubsub hook that let me register subscribers to a channel, and publish to an event. In the codesandbox below it is simply incrementing a counter.

https://codesandbox.io/s/kl2jkpvo5