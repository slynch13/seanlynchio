---
id: 25
title: Routing revisited
date: 2008-03-18T00:50:07+00:00
author: Sean
layout: post
guid: http://seanlynch.io/archive/2008/03/18/routing-revisited.aspx
permalink: /routing-revisited/
tcb2_ready:
  - "1"
categories:
  - .Net
  - Development
published: false
---
It turned out to be a lot easier to work around not being able to [override the route parsing method](http://myheadsexploding.com/archive/2007/12/12/initial-thoughts-on-microsoft-mvc.aspx) then I had thought it would be last night. Though when they allow me to override that method I will be changing over.

By setting up the following routes I was able to get almost the effect that I was looking for:

<pre class="code"><span style="color: #2b91af;">RouteTable</span>.Routes.Add(<span style="color: #0000ff;">new</span> <span style="color: #2b91af;">Route
</span>{
    Url = <span style="color: #a31515;">"Example/[id]/[action]"</span>,
    Defaults = <span style="color: #0000ff;">new</span> { Controller = <span style="color: #a31515;">"Example"</span> },
    RouteHandler = <span style="color: #0000ff;">typeof</span>(<span style="color: #2b91af;">MvcRouteHandler</span>)
});

<span style="color: #2b91af;">RouteTable</span>.Routes.Add(<span style="color: #0000ff;">new</span> <span style="color: #2b91af;">Route
</span>{
    Url = <span style="color: #a31515;">"Example/[Category1]/[id]/[action]"</span>,
    Defaults = <span style="color: #0000ff;">new</span> { Controller = <span style="color: #a31515;">"Example"</span> },
    RouteHandler = <span style="color: #0000ff;">typeof</span>(<span style="color: #2b91af;">MvcRouteHandler</span>)
});

<span style="color: #2b91af;">RouteTable</span>.Routes.Add(<span style="color: #0000ff;">new</span> <span style="color: #2b91af;">Route
</span>{
    Url = <span style="color: #a31515;">"Example/[Category1]/[Category2]/[id]/[action]"</span>,
    Defaults = <span style="color: #0000ff;">new</span> { Controller = <span style="color: #a31515;">"Example"</span> },
    RouteHandler = <span style="color: #0000ff;">typeof</span>(<span style="color: #2b91af;">MvcRouteHandler</span>)
});</pre>

Though the execute action just takes the id in

<pre class="code">[<span style="color: #2b91af;">ControllerAction</span>]
<span style="color: #0000ff;">public</span> <span style="color: #0000ff;">void</span> Execute(<span style="color: #0000ff;">string</span> id)
</pre>

&nbsp;

If I find that I actually need access to the Categories found in the path, I can access them using RouteData.Values. It also helps that I had decided that the examples should have a unique ID, that will be a lot like the friendly Urls used in [Subtext](http://subtextproject.com). That way the directories are there more for aesthetics then utility. Though when the ability to override the route parsing, I will probably be changing it to this if possible later:

[<span style="color: #2b91af;">ControllerAction</span>]
  
<span style="color: #0000ff;">public</span> <span style="color: #0000ff;">void</span> Execute(<span style="color: #0000ff;">string</span> id, <span style="color: #0000ff;">string</span>[] categories)

So now that I have the site navigation working the way that I want it, with the exception of a helper method for writing out the longer category listings, its time to work on the maintenance parts of the site.

And so far it seems that this will be a better fit then WebForms was for the last few reworks of the site, since I can make the UserControls containing the examples completely isolated, including having the runat server form in the control. The only one I liked better was the JSON based one, using ASP.Net AJAX Extensions, which would have gone live if AdSense worked with AJAX/JSON sites.

Overall the more I use it the more I like the feel of the framework. Especially now that I realized which of these  I wanted to selected when using a master page.

And so far the best part of the framework is that I don&#8217;t have to ignore features to not see this dialog after refreshing the page I just navigated to.



