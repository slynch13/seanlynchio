---
id: 155
title: Getting imports working with dotless and CssBundles
date: 2012-09-11T21:27:22+00:00
author: Sean
layout: post
guid: http://seanlynch.io/?p=155
permalink: /getting-imports-working-with-dotless-and-cssbundles/
quote-author:
  - Unknown
image:
  - ""
quote-url:
  - http://
quote-copy:
  - Unknown
audio:
  - http://
link-url:
  - http://
seo_follow:
  - 'false'
seo_noindex:
  - 'false'
dsq_thread_id:
  - "2065135593"
categories:
  - .Net
  - MS Mvc
published: false
---
I was watching [Single Page Apps with HTML5, Web API, Knockout and jQuery](http://pluralsight.com/training/Courses/TableOfContents/spa) by John Papa on pluralsight and one of the pieces was sending compiled less files down using the bundling.

<div class="oembed-gist">
  <noscript>
    View the code on <a href="https://gist.github.com/3703799">Gist</a>.
  </noscript>
</div>

Unfortunately this did not work while using @import because the current directory was set to my IIS Express directory. After searching most suggestions were to use Directory.SetCurrentDirectory but didn&#8217;t really like that solution so this is what I decided on:

<div class="oembed-gist">
  <noscript>
    View the code on <a href="https://gist.github.com/3689144">Gist</a>.
  </noscript>
</div>

