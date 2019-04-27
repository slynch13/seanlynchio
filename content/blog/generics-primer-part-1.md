---
id: 232
title: 'Generics Primer - Part 1'
date: 2014-01-02T10:15:32+00:00
author: Sean
layout: post
guid: http://seanlynch.io/?p=232
permalink: /generics-primer-part-1/
categories:
  - .Net
tags:
  - archived
  - .net
  - featured
  - generics
published: false
---
<span style="font-size: 13px;">When generics were first released, the generic collections where the first place that I used them. They removed a lot of the boilerplate code when it came to creating strongly typed collections. In 1.x you would inherit from the base class of the type of collection you wanted, and then implement strongly typed versions of methods such as Add, Remove, Contains.</span> <a style="font-size: 13px;" title="An example of that can be found here." href="http://msdn.microsoft.com/en-US/library/system.collections.dictionarybase(v=vs.80).aspx" target="_blank">An example of this can be found here.</a><span style="font-size: 13px;"> Thanks to generics you don&#8217;t need to create a MyClass1List and a MyClass2List you can simply instantiate a new List<MyClass1>() and new List<MyClass2> without needing to write the plumbing code to have this work.</span>

<div class="oembed-gist">
  <noscript>
    View the code on <a href="https://gist.github.com/8192633">Gist</a>.
  </noscript>
</div>

When .Net 3.5 was released it included one of my favorite features in .Net, LINQ which is a set of extension methods that make extensive use of generics, allowing for removal of much of the boilerplate involved with searching collections.

<div class="oembed-gist">
  <noscript>
    View the code on <a href="https://gist.github.com/8192749">Gist</a>.
  </noscript>
</div>

In my next post I will talk about creating some simple generic classes and methods.
