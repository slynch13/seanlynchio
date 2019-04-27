---
id: 78
title: Migrating to WordPress with URL Rewriting
date: 2010-03-13T23:38:29+00:00
author: Sean
layout: post
guid: http://seanlynch.io/?p=78
permalink: /migrating-to-wordpress-with-url-rewriting/
has_been_twittered:
  - 'yes'
tcb2_ready:
  - "1"
categories:
  - Uncategorized
published: false
---
Recently I switched from using <a title="SubText" href="http://subtextproject.com" target="_blank" rel="noopener">SubText</a> to <a class="zem_slink" title="WordPress" href="http://wordpress.org" rel="homepage">WordPress</a> as my blog engine. The reason for the switch was to get access to all of the plug ins available, I could have added the functionality, but unfortunately I find myself a bit time starved as of late.

In order to prevent all of my old permalinks links from breaking, while moving from a /year/month/day/postname format to simply having postname as the url, I am using IIS7&#8217;s URL Rewriting Module. It turned out to be quite simple to do this, and here are the entries that change the requests to the new Url Scheme:

`<rule name="Aspx" enabled="false" stopProcessing="true"><br />
<match url="archive/[0-9][0-9][0-9][0-9]/[0-9][0-9]/[0-9][0-9]/([A-Za-z0-9-_.]+).aspx" /><br />
<conditions logicalGrouping="MatchAny" /><br />
<action type="Redirect" url="http://seanlynch.io/{R:1}" /><br />
</rule><br />
<rule name="Rss" enabled="false" stopProcessing="true"><br />
<match url="rss.aspx" /><br />
<conditions logicalGrouping="MatchAny" /><br />
<action type="Redirect" url="/feed" redirectType="Permanent" /><br />
</rule><br />
` 

This has been working well, the only issue that I have run into so far is that categories in subtext were marked with numbers by default, and google&#8217;s crawler is finding them as broken links. I haven&#8217;t decided how to handle these links yet.</p> 

</a>
