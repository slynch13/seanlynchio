---
id: 34
title: Subtext Admin Rss Feeds
date: 2007-09-19T01:51:43+00:00
author: Sean
layout: post
guid: http://seanlynch.io/archive/2007/09/19/subtext-admin-rss-feeds.aspx
permalink: /subtext-admin-rss-feeds/
categories:
  - .Net
  - Development
  - Subtext
published: false
---
I just committed the changes to provide 3 administrative rss feeds:

  * Comments Needing Moderation
  * Referrals
  * Errors

The change also uses the HttpModule that will convert forms authentication into basic authentication so that the feeds can be viewed in an Rss reader. After seeing [http://msdn2.microsoft.com/en-us/library/Aa479391.aspx](http://msdn2.microsoft.com/en-us/library/Aa479391.aspx "http://msdn2.microsoft.com/en-us/library/Aa479391.aspx") I had thought about changing over to use it instead of the simple module I wrote. I decided not to however because it would have meshed well with Subtexts security model. 

This was one of the more interesting things I have worked on in a while, though I am already thinking of several improvements that could be made (in the next version). These include:

  * A module for digest authentication.
  * A Configuration section for the new authentication modules to allow them to work with other file times outside of rss feeds.
  * A rework of the way that rss writers are done. Currently a new one needs to be added, along with a HttpHandler when a feed is going to serve up a new object type. It would be nice to be able to configure the feeds using the web.config or setting stored in database to be able to create feeds on any available subtext object collection.
  * Something seems off with the Error feed&#8217;s times. I think the local time is being stored without converting it to UTC or specifying a timezone.
