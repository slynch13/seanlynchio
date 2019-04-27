---
id: 35
title: HttpHandlers and web.config settings
date: 2007-09-16T18:28:36+00:00
author: Sean
layout: post
guid: http://seanlynch.io/archive/2007/09/16/httphandlers-and-web.config-settings.aspx
permalink: /httphandlers-and-web-config-settings/
categories:
  - .Net
  - Subtext
---
I figured out what was happening in my [previous post](/httphandlers-and-directory-authenticationhttpmodules "HttpHandlers and directory authentication/HttpModules"). It makes a bit more sense now that I have seen it, being able to just stop working on something is handy, basically the Rss feeds don&#8217;t do URL rewriting. So the call to /test1/Admin/ModeratedCommentRss.aspx uses the /web.config and would use the /test1/Admin/web.config, but it has no reason to look at the /Admin/web.config. 

Not completely sure how I should change this. Right now I have the ModeratedCommentRss.aspx checking to see if the requestor is an Admin, and if not it calls FormsAuthentication.RedirectToLoginPage(). This works, but I would rather a solution that didn&#8217;t involve people needing to know to put the check in.

I also found this module helpful when I was figuring out where to do the conversion:  

> <pre class="code"><font size="1"><span style="COLOR: rgb(0,0,255)">public</span> <span style="COLOR: rgb(0,0,255)">class</span> <span style="COLOR: rgb(43,145,175)">DebugModule</span>:System.Web.</font><font size="1"><span style="COLOR: rgb(43,145,175)">IHttpModule
></span>{
>   <span style="COLOR: rgb(0,0,255)">public</span> <span style="COLOR: rgb(43,145,175)">EventHandler</span> GetEventhandler(<span style="COLOR: rgb(0,0,255)">string</span> name)
>    {
>        <span style="COLOR: rgb(0,0,255)">return</span> <span style="COLOR: rgb(0,0,255)">new</span> <span style="COLOR: rgb(43,145,175)">EventHandler</span>(<span style="COLOR: rgb(0,0,255)">delegate</span>(<span style="COLOR: rgb(0,0,255)">object</span> sender, <span style="COLOR: rgb(43,145,175)">EventArgs</span> e)
>        {
>            <span style="COLOR: rgb(43,145,175)">HttpApplication</span> app = (<span style="COLOR: rgb(43,145,175)">HttpApplication</span>)sender;
>            <span style="COLOR: rgb(43,145,175)">HttpContext</span> context = app.Context;
>            <span style="COLOR: rgb(0,0,255)">if</span> (context != <span style="COLOR: rgb(0,0,255)">null</span>)
>                <span style="COLOR: rgb(43,145,175)">Debug</span>.WriteIf(context.Response.StatusCode == 302, <span style="COLOR: rgb(163,21,21)">"Redirecting - "</span>);
>            <span style="COLOR: rgb(43,145,175)">Debug</span>.WriteLine(name);
>        });
>    }
>
>    <span style="COLOR: rgb(0,0,255)">public</span> <span style="COLOR: rgb(0,0,255)">void</span> Init(<span style="COLOR: rgb(43,145,175)">HttpApplication</span> app)
>    {
>
>        <span style="COLOR: rgb(43,145,175)">Debug</span>.WriteLine(<span style="COLOR: rgb(163,21,21)">"---------------------------------"</span>);
>        <span style="COLOR: rgb(43,145,175)">Debug</span>.WriteLine(<span style="COLOR: rgb(163,21,21)">"Module Init"</span>);
>        <span style="COLOR: rgb(43,145,175)">Type</span> appType = app.GetType();
>        <span style="COLOR: rgb(43,145,175)">EventInfo</span>[] events = appType.GetEvents();
>        <span style="COLOR: rgb(0,0,255)">foreach</span> (<span style="COLOR: rgb(43,145,175)">EventInfo</span> eventInfo <span style="COLOR: rgb(0,0,255)">in</span> events)
>        {
>            eventInfo.AddEventHandler(app, GetEventhandler(eventInfo.Name));
>        }
>    }
>}</font></pre>

[](http://11011.net/software/vspaste)I used that class and a small test web project to figure out how to change the FormsAuthentication over to Basic authentication (seems like mixed authentication should have already been there though). 

Of course shortly after I figured most of it out I saw the link to the MSDN article [Phil Haack](http://haacked.com/) had posted for the feature request.

