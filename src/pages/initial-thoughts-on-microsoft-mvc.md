---
id: 23
title: Initial thoughts on Microsoft MVC
date: 2008-03-18T00:51:36+00:00
author: Sean
layout: post
guid: http://seanlynch.io/archive/2008/03/18/initial-thoughts-on-microsoft-mvc.aspx
permalink: /initial-thoughts-on-microsoft-mvc/
categories:
  - .Net
  - Development
published: true
---
My first thought is, I really wish I could use this at work, but it is working nicely so far for my rewrite of my web site. Writing Classic ASP style again is taking a little getting used to again though, the visual preview from the designers made styling the page a lot nicer. 

The lack of control designers also seem like it would hinder having a graphics guy using Expression Web do the UI with MVC based web applications. But I have never worked with a graphics guy on a project that way anyway so I am could be wrong.

 

It would also be nice if the method used by the Route class to parse the Url was virtual, so I could subclass it and allow me to parse something like:

/Example/Simple/Form/MultiPageForm/ShowSource/

to go to the Examples controller, going into the following controller action

<pre class="code">[<span style="color: rgb(43,145,175)">ControllerAction</span>]<br /><span style="color: rgb(0,0,255)">public</span> <span style="color: rgb(0,0,255)">void</span> ShowSource(<span style="color: rgb(0,0,255)">string</span>[] Categories, <span style="color: rgb(0,0,255)">string</span> ID)
</pre>

[](http://11011.net/software/vspaste)

which would allow me to have a consistent directory scheme for both the ASP.Net examples, along with the Classic ASP examples that are already available.

I could probably do something like /Example/Simple_Form/MultiPageForm/ and use [Controller]/[Category]/[ID]/[Action] but I would prefer it to get to the controller action pre-parsed.

