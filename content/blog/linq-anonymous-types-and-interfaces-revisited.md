---
id: 32
title: LINQ, Anonymous Types and Interfaces Revisited
date: 2007-12-11T23:54:59+00:00
author: Sean
layout: post
guid: http://seanlynch.io/archive/2007/12/12/linq-anonymous-types-and-interfaces-revisited.aspx
permalink: /linq-anonymous-types-and-interfaces-revisited/
tcb2_ready:
  - "1"
categories:
  - .Net
published: false
---
After making my [previous post](http://myheadsexploding.com/archive/2007/12/06/anonymous-types-and-interfaces.aspx) I worked on it a bit more, and found that the best way to accomplish what I was trying to do, creating quick data layer that I can change later, was to simply add the IExample interface to the partial class definition. I know I can create this with [Subsonic](http://www.subsonicproject.com) or another  DAL generator, but currently they aren&#8217;t on the list of tech I want to learn at the moment.

And while this did work, I ran into an error in the dbmI designer when I clicked &#8220;View Code&#8221; from the context menu:

This seems to happen when the project has a default namespace assigned to it or possibly having an Entity Namespace set, since I have both. I haven&#8217;t looked to much into it since VS puts the partial class definition that it goes to in the cs file of the same name as the dbml file, so I doubt I will be using the view code much anyway.

