---
id: 37
title: Blog Alias Recap
date: 2007-09-12T03:08:41+00:00
author: Sean
layout: post
guid: http://seanlynch.io/archive/2007/09/12/blog-alias-recap.aspx
permalink: /blog-alias-recap/
categories:
  - Development
  - Subtext
published: false
---
Well the blog alias feature is in, and the self spam in my referral section has reduced significantly since I started using it last night. Its also nice not seeing Google and Yahoo spidering my blog on 4 different domains (still don&#8217;t know how they got 2 of them).

**How To Use**

  * Blog edit screen has a list all the domain aliases, and a button to add a new alias.
  * If an alias is found, redirects request to the associated blog.
  * Aliases can be at both the host and subfolder level.
  
    **Note:** Requests are validated against blogs first, so if there is only one blog with a give host name then subfolder aliases would not work.

**Lessons**

  * [Rob Conery](http://blog.wekeroad.com/) is for the most part right [about the provider model](http://blog.wekeroad.com/2007/09/04/in-which-we-discuss-digital-gearheads-and-geek-mastery/). Having both a data provider and an object provider with wrapper objects over that on top of that seemed to be a little overkill. But even so, figuring out where to put the changes was one of the more enjoyable parts of the change, which was paid for when I implemented the change. I also learned that it is better then the way we do it at work (think really big Page_Load functions).
  * I still don&#8217;t care much post backs, especially after a pseudo-AJAX/JavaScript framework at work since .Net 1.0. They aren&#8217;t as bad as I remembered them being, but the refresh popup when navigating is annoying.
  * Seeing a message appear in my email about the build being broken within 30 minutes of committing is somewhat disheartening. Thankfully it wasn&#8217;t my code, though it did make me look at aggregate blogs which I had missed when testing.
  * That I learned far more from making changes to the code then I would have from just reading through it.

**Areas for improvement**

  * The formatting of the host admin page could likely be improved some.
  * Possibly add more validation to prevent overlap of aliases between blogs.
  * The requests seem a little bit chatty with the database, looks to be something with the lookup for cookie paths.

**What&#8217;s Next**

  * Eyeing 
      * [Excerpt feature](http://sourceforge.net/tracker/index.php?func=detail&aid=1552078&group_id=137896&atid=739982)
      * [Changing subfolder breaking pictures](http://sourceforge.net/tracker/index.php?func=detail&aid=1467885&group_id=137896&atid=739979), possibly using the blog aliases to allow for links to be maintained.
      * [Image not defined error in galleries](http://sourceforge.net/tracker/index.php?func=detail&aid=1724885&group_id=137896&atid=739979) &#8211; have had this happen
      * [Easier affiliate ID integration](http://sourceforge.net/tracker/index.php?func=detail&aid=1740335&group_id=137896&atid=739982) &#8211; add a set of options that can autopopulate the Sitewide Tracking code surrounded by generated marker comment tags to allow additional code to work. And possibly something to make the amazon links.
  * Looking around for a project that uses WCF to learn from.

