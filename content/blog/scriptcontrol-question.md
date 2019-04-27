---
id: 15
title: ScriptControl question
date: 2008-07-07T17:09:08+00:00
author: Sean
layout: post
guid: http://seanlynch.io/archive/2008/07/07/scriptcontrol-question.aspx
permalink: /scriptcontrol-question/
categories:
  - .Net
  - Development
  - Work
published: false
---
As of late I have gotten a chance to use the ASP.Net AJAX extenders and script controls, and so far am really liking how they work, though it would be nice if adding the .js was a little cleaner then manually adding them to the assembly wether in the AssemblyInfo.cs or the controls cs file.

I have to say I really like the extender and script controls that come with the ASP.NET AJAX. They really are so much nicer to work with then building up Javascript strings in the CS file of the server control. 

I do have a question about them though. One of the ScriptControls I made uses a webservice to pull data if the service name is set. At the moment I have it dynamically registering an JSON script service based webservice. Unfortunately I have found that this is not an optimal solution since the name of the Javascript object created by the ScriptService changes depending on the namespace and class name of the service. 

I am sure that there is a better way to do this, but I am not exactly certain of it. Any suggestions or links would be appreciated.

