---
id: 46
title: Open Id with DotNetOpenId
date: 2010-03-02T17:28:00+00:00
author: Sean
layout: post
guid: http://apilibrary.com/slynchblog/2010/03/02/open-id-with-dotnetopenid/
permalink: /open-id-with-dotnetopenid/
has_been_twittered:
  - 'yes'
tcb2_ready:
  - "1"
categories:
  - .Net
  - OpenId
  - WebQuestBuilder
published: false
---
I recently integrated OpenId into a project that I am working on with my wife, [WebQuest Builder](http://webquestbuilder.com/) in order to avoid the extra considerations related to storing user password.

Originally I had planned on using RPXNow in order to do this. But after reading about how realms worked, specifically that  Google gives a different identifier for each realm, I decided against this option. Because

while RPXNow does have support  for custom realms, webquestbuilder.com instead of webquestbuilder.rpxnow.com, it would cost $99/month in order to get this. And after my wife made a comment that it seemed almost like someone phishing for her account do to the webquestbuilder.rxpnow.com in Googles OpenId form.

The other option that I had been considering had been [DotNetOpenAuth](http://www.dotnetopenauth.net/) which was very simple to integrate. It took about an hour to get it running in my development environment. I only had one issue when I pushed it live, which I will go into in a [future post](http://seanlynch.io/dotnetopenauth-with-appdirectory-removed/ "future post"). For the OpenId selector I used [Jarrett Vance’s Id selector](http://jvance.com/pages/JQueryOpenIDPlugin.xhtml) for the Sign In.

After showing it to a few people I ended up making a few tweaks to the Id Selector. The first  chance that I made was to change it so that the OpenId checkbox did not show up, because a couple of the people I showed it to tried entering in their gmail address instead of Google’s OpenId Url. The other change I did was order them by which providers I thought they were most likely to be using, I hope the Microsoft gets their OpenId provider going soon so that I can integrate hotmail/live accounts into this.
