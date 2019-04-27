---
title: Dealing with infinite loops with timers in useEffect 
date: 2018-12-10T00:34:55+00:00
author: Sean
layout: post
categories:
  - Blog, React
frontpage: true
published: true
---

In a project that I was using useEffect in I needed to setup an interval and a timeout.

The interval was used to occationally check for updates, while the timeout was used for auto play.

The problem turned out to be that it was firing the useEffect any time the component was rerendering, which resulted in more intervals being added. To fix this I passed in that I only wanted it to update based on a certain prop changed like seen at https://reactjs.org/docs/hooks-reference.html#conditionally-firing-an-effect.