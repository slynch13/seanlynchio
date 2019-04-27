---
id: 33
title: HttpHandlers and directory authentication/HttpModules
date: 2007-09-19T22:09:57+00:00
author: Sean
layout: post
guid: http://seanlynch.io/archive/2007/09/20/httphandlers-and-directory-authenticationhttpmodules.aspx
permalink: /httphandlers-and-directory-authenticationhttpmodules/
categories:
  - .Net
  - Development
  - Subtext
published: true
---
I decided to implement  [Admin Rss Feeds](http://sourceforge.net/tracker/index.php?func=detail&aid=1202588&group_id=137896&atid=739982) after a particularly draining Friday. For the most part it went pretty smoothly, and learned something about working with a different team too ;). I Implemented an HttpModule that looked for FormsAuthentication redirects for rss feeds and changed it over to use basic authentication so rss readers could authenticate. 

And for a while all was good. In fact other then unit tests I had thought I was done.

Then just to be thorough I set up several subfolder blogs off of localhost, and everything stopped working. <strike>Apparently something in the way that the rss HttpHandlers in Subtext are called skips all of the HttpModules set up in the web.config. I have a fix for this, I loop through all of the modules in the application and initialize them.</strike> I dont think this is the right solution since it also stops the <authorization> section in the /Admin folder is not being looked at either.

