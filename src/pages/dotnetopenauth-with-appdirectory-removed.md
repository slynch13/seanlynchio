---
id: 51
title: DotNetOpenAuth with AppDirectory removed
date: 2010-03-02T22:11:54+00:00
author: Sean
layout: post
guid: http://seanlynch.io/?p=51
permalink: /dotnetopenauth-with-appdirectory-removed/
has_been_twittered:
  - 'yes'
image:
  - ""
categories:
  - .Net
  - OpenId
  - WebQuestBuilder
tags:
  - featured
published: false
---
In my [previous post](http://seanlynch.io/open-id-with-dotnetopenid/) I had talked about my decision to implement OpenId, and how DotNetOpenAuth worked well for this. In this post I will talk a little about the only issue that I ran into while doing this.

The root of this issue had to do with how my hosting is setup for sites that have low traffic. I host these sites on winhost which allows for an unlimited number of domain pointers. They also have the URL Rewrite module, so I can rewrite <http://webquestbuilder.com/> to http://webquestbuilder.com/sitedir enabling the site to be moved later when demand requires more horsepower without having to deal with the removal of the sub directory.

The problem that came from this setup was that DotNetOpenAuth determined that the releam was webquestbuilder.com/sitedir instead of webquestbuilder.com, and returned from openid with to the sitedir/authenticate.  <a href="http://blog.nerdbank.net/" target="_blank">Andrew Arnott</a> pointed me in the right direction pretty quick after my tweet. Here is what I ended up with to fix this, it is in 2 parts.

The first is making the request:
  
<pre class="gatsby-highlight"><code>
if (isInSubDir)
{
request = openid.CreateRequest(Request.Form["openid_identifier"], new Realm("http://webquestbuilder.com/"),
new Uri("http://webquestbuilder.com/User/Authenticate/"));
}
else
{
request = openid.CreateRequest(Request.Form["openid_identifier"]);
}`
  
The second part is dealing with the response:
  
`
var isInSubDir = Request.ApplicationPath!="/";
IAuthenticationResponse response;
if (isInSubDir)
{
var absoluteUri = httpRequest.Url.AbsoluteUri;
var rawUrl = httpRequest.RawUrl;
if(isInSubDir)
{
absoluteUri = absoluteUri.Replace(Request.ApplicationPath, "");
rawUrl = rawUrl.Replace(Request.ApplicationPath, "");
}
var httpRequestInfo = new HttpRequestInfo(httpRequest.HttpMethod, new Uri(absoluteUri), rawUrl, headers, httpRequest.InputStream);
response = openid.GetResponse(httpRequestInfo);
}
else
{
response = openid.GetResponse();
}</code></pre>
