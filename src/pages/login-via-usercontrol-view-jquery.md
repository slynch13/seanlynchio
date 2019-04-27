---
id: 20
title: Login via Usercontrol View + jQuery
date: 2008-03-18T02:55:18+00:00
author: Sean
layout: post
guid: http://seanlynch.io/archive/2008/03/18/login-via-usercontrol-view-jquery.aspx
permalink: /login-via-usercontrol-view-jquery/
tcb2_ready:
  - "1"
categories:
  - .Net
  - Development
  - Learning
published: false
---
Since administration was the next part I wanted to work on.

I decided that for the moment I just want a little login for in the upper corner

I decided to put the login screen view logic into a user control, and added the following user control named Login.ascx and placed it into the Shared

<pre class="code"><span style="background: #ffee62;">&lt;%@</span> <span style="color: #a31515;">Control</span> <span style="color: #ff0000;">Language</span><span style="color: #0000ff;">="C#"</span> <span style="color: #ff0000;">Inherits</span><span style="color: #0000ff;">="System.Web.Mvc.ViewUserControl"</span> <span style="background: #ffee62;">%&gt;

&lt;%if</span>(!Page.User.Identity.IsAuthenticated) {<span style="background: #ffee62;">%&gt;
</span>    <span style="color: #0000ff;">&lt;</span><span style="color: #a31515;">form</span> <span style="color: #ff0000;">action</span><span style="color: #0000ff;">="/Home/Login"</span> <span style="color: #ff0000;">method</span><span style="color: #0000ff;">="post"</span> <span style="color: #ff0000;">id</span><span style="color: #0000ff;">="LoginForm"&gt;
</span>        <span style="color: #0000ff;">&lt;</span><span style="color: #a31515;">span</span> <span style="color: #ff0000;">id</span><span style="color: #0000ff;">="EmailLabel"&gt;</span>Username:<span style="color: #0000ff;">&lt;/</span><span style="color: #a31515;">span</span><span style="color: #0000ff;">&gt;&lt;</span><span style="color: #a31515;">br</span> <span style="color: #0000ff;">/&gt;
</span>        <span style="background: #ffee62;">&lt;%=</span>Html.TextBox(<span style="color: #a31515;">"Username"</span>)<span style="background: #ffee62;">%&gt;&lt;</span><span style="color: #a31515;">br</span> <span style="color: #0000ff;">/&gt;
</span>        <span style="color: #0000ff;">&lt;</span><span style="color: #a31515;">span</span> <span style="color: #ff0000;">id</span><span style="color: #0000ff;">="PasswordLabel"&gt;</span>Password:<span style="color: #0000ff;">&lt;/</span><span style="color: #a31515;">span</span><span style="color: #0000ff;">&gt;&lt;</span><span style="color: #a31515;">br</span> <span style="color: #0000ff;">/&gt;
</span>        <span style="background: #ffee62;">&lt;%=</span>Html.Password(<span style="color: #a31515;">"Password"</span>)<span style="background: #ffee62;">%&gt;&lt;</span><span style="color: #a31515;">br</span> <span style="color: #0000ff;">/&gt;
</span>         <span style="color: #0000ff;">&lt;</span><span style="color: #a31515;">span</span> <span style="color: #ff0000;">id</span><span style="color: #0000ff;">="Error"&gt;
</span>            <span style="background: #ffee62;">&lt;%=</span>ViewData.ContainsDataItem(<span style="color: #a31515;">"Message"</span>) ? ViewData[<span style="color: #a31515;">"Message"</span>] + 
               <span style="color: #a31515;">"&lt;BR /&gt;"</span> : <span style="color: #a31515;">""</span><span style="background: #ffee62;">%&gt;
</span>        <span style="color: #0000ff;">&lt;/</span><span style="color: #a31515;">span</span><span style="color: #0000ff;">&gt;
</span>        <span style="background: #ffee62;">&lt;%=</span>Html.SubmitButton(<span style="color: #a31515;">"Submit"</span>, <span style="color: #a31515;">"Login"</span>)<span style="background: #ffee62;">%&gt;
</span>    <span style="color: #0000ff;">&lt;/</span><span style="color: #a31515;">form</span><span style="color: #0000ff;">&gt;
</span><span style="background: #ffee62;">&lt;%</span>}<span style="color: #0000ff;">else</span> {<span style="background: #ffee62;">%&gt;
</span>        <span style="color: #0000ff;">&lt;</span><span style="color: #a31515;">span</span><span style="color: #0000ff;">&gt;</span>Not <span style="background: #ffee62;">&lt;%=</span>Page.User.Identity.Name <span style="background: #ffee62;">%&gt;&lt;</span><span style="color: #a31515;">br</span> <span style="color: #0000ff;">/&gt;</span>    
        <span style="background: #ffee62;">&lt;%=</span>Html.ActionLink&lt;DevExamples.Controllers.<span style="color: #2b91af;">HomeController</span>&gt;(c =&gt; c.Logout()
            , <span style="color: #a31515;">"Logout"</span>, <span style="color: #0000ff;">new</span> { id = <span style="color: #a31515;">"LogoutLink"</span> })<span style="background: #ffee62;">%&gt;&lt;/</span><span style="color: #a31515;">span</span><span style="color: #0000ff;">&gt;

</span><span style="background: #ffee62;">&lt;%</span>} <span style="background: #ffee62;">%&gt;
</span></pre>

&nbsp;

And added the user control to the masterpage using

<pre class="code"><span style="color: #0000ff;">&lt;</span><span style="color: #a31515;">div</span> <span style="color: #ff0000;">id</span><span style="color: #0000ff;">="Login"&gt;</span><span style="background: #ffee62;">&lt;%=</span>Html.RenderUserControl(<span style="color: #a31515;">"~/Views/Shared/Login.ascx"</span>) <span style="background: #ffee62;">%&gt;</span><span style="color: #a31515;">&lt;div</span><span style="color: #0000ff;">&gt;</span></pre>

&nbsp;

I was going to use

<pre class="code"><span style="color: #0000ff;">using</span> (Html.Form&lt;DevExamples.Controllers.<span style="color: #2b91af;">HomeController</span>&gt;(c=&gt;c.Login()
   ,System.Web.Mvc.<span style="color: #2b91af;">FormExtensions</span>.<span style="color: #2b91af;">FormMethod</span>.post,<span style="color: #0000ff;">new</span> {id=<span style="color: #a31515;">"LoginForm"</span>}))</pre>

&nbsp;

to create the form (because it is a lot cooler), but couldn&#8217;t get the html attributes to work and was more interested in getting the dynamic stuff working then looking at the code for the extension method in the MVCToolKit, in other words being lazy.

&nbsp;

I thought about putting the authentication checking logic into the controller. But handling it this way made it a bit simpler, and more self contained, so until I find a compelling enough reason I will be leaving it this way.

After I had the user control showing up, I decided to hook up the actual authentication. I decided to go with forms authentication, and set it up using the button in the solution explorer.

Next it was time to create the login and logout controller actions, which I decided would best fit in the HomeController, At first I had thought to create two separate views, one for when logged in and one for logged out, then remembered [Phil Haack](http://haacked.com/), at least I think it was him, something about being able to use user controls in the RenderView method of the controller.

I ended up with the following two controller actions:

<pre class="code">[<span style="color: #2b91af;">ControllerAction</span>]
<span style="color: #0000ff;">public</span> <span style="color: #0000ff;">void</span> Login()
{
    <span style="color: #0000ff;">if</span> (!ControllerContext.HttpContext.User.Identity.IsAuthenticated)
    {
        <span style="color: #0000ff;">if</span> (Request.RequestType == <span style="color: #a31515;">"POST"</span>)
        {
            <span style="color: #0000ff;">string</span> userName = Request.Form[<span style="color: #a31515;">"Username"</span>];
            <span style="color: #0000ff;">string</span> password = Request.Form[<span style="color: #a31515;">"Password"</span>];

            <span style="color: #0000ff;">if</span> (<span style="color: #2b91af;">Membership</span>.ValidateUser(userName, password))
            {
                <span style="color: #2b91af;">FormsAuthentication</span>.SetAuthCookie(userName, <span style="color: #0000ff;">true</span>);
                <span style="color: #008000;">//Set cookie and redirect
</span>                RedirectToAction(<span style="color: #a31515;">"Login"</span>);
            }
            <span style="color: #0000ff;">else
</span>            {
                ViewData.Add(<span style="color: #a31515;">"Message"</span>, <span style="color: #a31515;">"Invalid Username/Password"</span>);
            }
        }
    }
    RenderView(<span style="color: #a31515;">"Login"</span>);
}
[<span style="color: #2b91af;">ControllerAction</span>]
<span style="color: #0000ff;">public</span> <span style="color: #0000ff;">void</span> Logout()
{
    <span style="color: #2b91af;">FormsAuthentication</span>.SignOut();
    RedirectToAction(<span style="color: #a31515;">"Login"</span>);
}
</pre>

&nbsp;

Since it was allowing me to just render out the user control, I decided there was no point to refreshing the whole page, so decided to use a AJAXish way of doing it. So I decided it was time to pick a javascript library. And since [Phil had provided a link](http://haacked.com/archive/2007/12/13/thank-you-for-helping-me-with-my-job-with-asp.net.aspx) to  [Using script.aculo.us with ASP.NET MVC](http://www.chadmyers.com/Blog/archive/2007/12/10/using-script.aculo.us-with-asp.net-mvc.aspx) by Chad Myers,I decided to go with jQuery for this (that and it seemed to fit better).

After a bit of reading through their tutorials I added this to the header section of the master page.

<pre class="code"><span style="color: #0000ff;">&lt;</span><span style="color: #a31515;">script</span> <span style="color: #ff0000;">src</span><span style="color: #0000ff;">="../../Content/jquery.js"</span> <span style="color: #ff0000;">type</span><span style="color: #0000ff;">="text/javascript"&gt;&lt;/</span><span style="color: #a31515;">script</span><span style="color: #0000ff;">&gt;
&lt;</span><span style="color: #a31515;">script</span> <span style="color: #ff0000;">src</span><span style="color: #0000ff;">="../../Content/jquery.form.js"</span> <span style="color: #ff0000;">type</span><span style="color: #0000ff;">="text/javascript"&gt;&lt;/</span><span style="color: #a31515;">script</span><span style="color: #0000ff;">&gt;
&lt;</span><span style="color: #a31515;">script</span> <span style="color: #ff0000;">type</span><span style="color: #0000ff;">="text/javascript"&gt;
</span>    <span style="color: #0000ff;">var</span> readyFuncs = <span style="color: #0000ff;">function</span>() { 
        $(<span style="color: #a31515;">'#LoginForm'</span>).ajaxForm(<span style="color: #0000ff;">function</span>(result) { 
            $(<span style="color: #a31515;">'#Login'</span>).html(result); 
            $(document).ready(readyFuncs); 
        }); 
        $(<span style="color: #a31515;">'#LogoutLink'</span>).click(<span style="color: #0000ff;">function</span>(){
            $.<span style="color: #0000ff;">get</span>(<span style="color: #a31515;">'/Home/Logout'</span>,<span style="color: #0000ff;">function</span>(result){
                $(<span style="color: #a31515;">'#Login'</span>).html(result);
                $(document).ready(readyFuncs); 
            });
            <span style="color: #0000ff;">return</span> <span style="color: #0000ff;">false</span>;
        });
    };
    $(document).ready(readyFuncs);
<span style="color: #0000ff;">&lt;/</span><span style="color: #a31515;">script</span><span style="color: #0000ff;">&gt;</span></pre>

The only real snag I had run into with this was that each time the Login div was refreshed I had to reregister the events.

