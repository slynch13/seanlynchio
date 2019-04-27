---
id: 17
title: Custom Rss Admin feeds
date: 2008-04-20T19:34:55+00:00
author: Sean
layout: post
guid: http://seanlynch.io/archive/2008/04/20/custom-rss-admin-feeds.aspx
permalink: /custom-rss-admin-feeds/
categories:
  - Subtext
published: false
---
I fixed up the Rss Admin feeds so that modifying web.config (along with new handler classes) would not needed to add a new Admin Rss feed.

Also added a simple form to allow administrators to created their own. It is a bit limited, but adding additional options should not be to hard. Though those will have to wait till a later date.

On a side note, I found that if I had the option of returning the non-generic  base class, or a generic subclass it makes the code a lot more flexible if you return the non-generic base class if you do not have a need to have the generic type.

