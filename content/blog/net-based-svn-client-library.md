---
id: 18
title: .Net based SVN client library
date: 2008-03-18T01:30:38+00:00
author: Sean
layout: post
guid: http://seanlynch.io/archive/2008/03/18/.net-based-svn-client-library.aspx
permalink: /net-based-svn-client-library/
categories:
  - Uncategorized
published: false
---
As an exercise to figure out socket programming I have been messing around with creating an SVN client library to use with DevExamples.com, well actually a generic SC client library that would allow me to change what repository site I was working against, SVN just seemed like the simplest of them at the moment.

However, after thinking about it, I think it would be better to use one that is already built if possible. I just have not been able to find a pure .Net client library. It is also seems rare for a source control library to work without a working folder, which is somewhat limiting when I want to check the propagation of examples using this method on the same machine.

Though I think it would be interesting to write a LINQ to Source provider, as a way to learn expression trees better. Plus it would be nice to be able to not only easily switch hosting providers (the reason I am looking for a pure .Net library) but also to have a standard syntax to allow me to easily switch from SVN to [SourceGear&#8217;s Vault](http://sourcegear.com/vault/index.html) (which I use for my personal development projects) to TFS (which we use at work) as the storage system for the examples.

Though [SvnBridge](http://www.codeplex.com/SvnBridge) could possibly help with that too.

