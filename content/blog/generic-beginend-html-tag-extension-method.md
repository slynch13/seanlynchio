---
id: 24
title: Generic begin/end Html tag extension method
date: 2008-03-18T00:51:14+00:00
author: Sean
layout: post
guid: http://seanlynch.io/archive/2008/03/18/generic-beginend-html-tag-extension-method.aspx
permalink: /generic-beginend-html-tag-extension-method/
categories:
  - .Net
  - Development
published: false
---
After working on the login usercontrol, I decided that I wanted to add similar functionality to the navigation sections of the site for accounts/roles that didn't get ads displayed. So I needed a standard way to put dynamic sections into a page.

I liked the syntax used by the form HtmlHelper methods, so decided to base it off of the SimpleForm class and ended up with this

<pre class="code"><span style="color: rgb(0,128,0)">//Based on the SimpleForm class in MvcToolkit <br /><span style="color: rgb(0,128,0)">//Wish I believed I would have ever thought to use<br /></span></span><span style="color: rgb(0,128,0)">//IDisposable to do this</span></pre>

<pre class="code"><span style="color: rgb(0,0,255)">public</span> <span style="color: rgb(0,0,255)">class</span> <span style="color: rgb(43,145,175)">SimpleWrappingTag</span> : <span style="color: rgb(43,145,175)">IDisposable<br /></span>{
    <span style="color: rgb(0,0,255)">protected</span> <span style="color: rgb(0,0,255)">string</span> _beginTagFormat = <span style="color: rgb(163,21,21)">"&lt;{0} {1}&gt;"</span>;
    <span style="color: rgb(0,0,255)">protected</span> <span style="color: rgb(0,0,255)">string</span> _attributeFormat = <span style="color: rgb(163,21,21)">"{0}="{1}" "</span>;
    <span style="color: rgb(0,0,255)">bool</span> _startTagRendered = <span style="color: rgb(0,0,255)">false</span>;
    <span style="color: rgb(0,0,255)">bool</span> _endTagRendered = <span style="color: rgb(0,0,255)">false</span>;
    <span style="color: rgb(0,0,255)">protected</span> <span style="color: rgb(43,145,175)">IHttpContext</span> _context;
    <span style="color: rgb(0,0,255)">protected</span> <span style="color: rgb(0,0,255)">object</span> _htmlAttributes = <span style="color: rgb(0,0,255)">null</span>;


    <span style="color: rgb(0,128,0)">//Not letting this be modified outside the class for now
</span>    <span style="color: rgb(0,128,0)">//might change later
</span>    <span style="color: rgb(0,0,255)">public</span> <span style="color: rgb(0,0,255)">string</span> TagName { <span style="color: rgb(0,0,255)">get</span>; <span style="color: rgb(0,0,255)">protected</span> <span style="color: rgb(0,0,255)">set</span>; }


    <span style="color: rgb(0,128,0)">//Subclassed controls can put their class specific info here
</span>    <span style="color: rgb(0,0,255)">public</span> SimpleWrappingTag(<span style="color: rgb(0,0,255)">string</span> tagName)
    {
        <span style="color: rgb(0,0,255)">this</span>.TagName = tagName;
    }
    <span style="color: rgb(0,0,255)">public</span> SimpleWrappingTag(<span style="color: rgb(0,0,255)">string</span> tagName, <span style="color: rgb(43,145,175)">IHttpContext</span> context
        , <span style="color: rgb(0,0,255)">object</span> htmlAttributes)
    {
        <span style="color: rgb(0,0,255)">this</span>.TagName = tagName;
        <span style="color: rgb(0,0,255)">this</span>._context = context;
        <span style="color: rgb(0,0,255)">this</span>._htmlAttributes = htmlAttributes;
    }

    <span style="color: rgb(128,128,128)">///</span><span style="color: rgb(0,128,0)"> </span><span style="color: rgb(128,128,128)">&lt;summary&gt;
</span>    <span style="color: rgb(128,128,128)">///</span><span style="color: rgb(0,128,0)"> Creates a StringBuilder and passes it to an overloaded method. 
</span>    <span style="color: rgb(128,128,128)">///</span><span style="color: rgb(0,128,0)"> Override this method for attributes that should be first in tag.
</span>    <span style="color: rgb(128,128,128)">///</span><span style="color: rgb(0,128,0)"> </span><span style="color: rgb(128,128,128)">&lt;/summary&gt;
</span>    <span style="color: rgb(128,128,128)">///</span><span style="color: rgb(0,128,0)"> </span><span style="color: rgb(128,128,128)">&lt;returns&gt;&lt;/returns&gt;
</span>    <span style="color: rgb(0,0,255)">protected</span> <span style="color: rgb(0,0,255)">virtual</span> <span style="color: rgb(43,145,175)">StringBuilder</span> BuildAttributeList()
    {
        <span style="color: rgb(0,0,255)">return</span> BuildAttributeList(<span style="color: rgb(0,0,255)">new</span> <span style="color: rgb(43,145,175)">StringBuilder</span>());
    }
    <span style="color: rgb(0,0,255)">protected</span> <span style="color: rgb(0,0,255)">virtual</span> <span style="color: rgb(43,145,175)">StringBuilder</span> BuildAttributeList(<span style="color: rgb(43,145,175)">StringBuilder</span> sb)
    {
        sb.Append(_htmlAttributes.ToAttributeList());
        <span style="color: rgb(0,0,255)">return</span> sb;
    }
    <span style="color: rgb(0,128,0)">//Method orginally from SimpleForm, but changed to work with 
</span>    <span style="color: rgb(0,128,0)">//BuildAttributeList instead of BuildFormOpenTag
</span>    <span style="color: rgb(0,0,255)">public</span> <span style="color: rgb(0,0,255)">void</span> WriteStartTag()
    {
        <span style="color: rgb(0,0,255)">if</span> (!<span style="color: rgb(0,0,255)">this</span>._startTagRendered)
        {
            <span style="color: rgb(0,0,255)">string</span> formTag = <span style="color: rgb(43,145,175)">String</span>.Format(<span style="color: rgb(163,21,21)">"&lt;{0} {1}&gt;"</span>, TagName
                , BuildAttributeList());
            <span style="color: rgb(0,0,255)">this</span>._context.Response.Write(formTag);
        }
    }
    <span style="color: rgb(0,0,255)">public</span> <span style="color: rgb(0,0,255)">void</span> WriteEndTag()
    {
        <span style="color: rgb(0,0,255)">if</span> (!<span style="color: rgb(0,0,255)">this</span>._endTagRendered)
            <span style="color: rgb(0,0,255)">this</span>._context.Response.Write(<span style="color: rgb(43,145,175)">String</span>.Format(<span style="color: rgb(163,21,21)">"&lt;/{0}&gt;"</span>, TagName));
    }

    <span style="color: rgb(0,0,255)">public</span> <span style="color: rgb(0,0,255)">void</span> Dispose()
    {
        WriteEndTag();
    }
}
<a href="http://11011.net/software/vspaste"></a><a href="http://11011.net/software/vspaste"></a><a href="http://11011.net/software/vspaste"></a></pre>

Next I made some trivial, but needed extension methods for the HtmlHelper class.

<pre class="code"><span style="color: rgb(0,0,255)">public</span> <span style="color: rgb(0,0,255)">static</span> <span style="color: rgb(0,0,255)">class</span> <span style="color: rgb(43,145,175)">DevExamplesExtensions
</span>{
    <span style="color: rgb(0,0,255)">public</span> <span style="color: rgb(0,0,255)">static</span> <span style="color: rgb(43,145,175)">IDisposable</span> HtmlTag(<span style="color: rgb(0,0,255)">this</span> <span style="color: rgb(43,145,175)">HtmlHelper</span> helper, <span style="color: rgb(0,0,255)">string</span> tagName)
    {
        <span style="color: rgb(0,0,255)">return</span> helper.HtmlTag(tagName, <span style="color: rgb(0,0,255)">null</span>);
    }
    <span style="color: rgb(0,0,255)">public</span> <span style="color: rgb(0,0,255)">static</span> <span style="color: rgb(43,145,175)">IDisposable</span> HtmlTag(<span style="color: rgb(0,0,255)">this</span> <span style="color: rgb(43,145,175)">HtmlHelper</span> helper
        , <span style="color: rgb(0,0,255)">string</span> tagName, <span style="color: rgb(0,0,255)">object</span> htmlAttributes)
    {
        <span style="color: rgb(43,145,175)">SimpleWrappingTag</span> tag =  <span style="color: rgb(0,0,255)">new</span> <span style="color: rgb(43,145,175)">SimpleWrappingTag</span>(tagName
            , helper.ViewContext.HttpContext, htmlAttributes);
        tag.WriteStartTag();
        <span style="color: rgb(0,0,255)">return</span> tag;
    }
}</pre>

And while I'm satisfied with how this turned out, though I'm hoping to be able to delete the code at some point, I don't like how the code I wrote to implement an Ajax.UpdatePanel method turned out. So I'm not going to post it at the moment.

But it was going to look something like

public static UpdatePanel(this AjaxHelper helper, string panelId, &#8230;.)  
{  
   helper.ViewContext.HttpContext.Write(&#8220;update panel js&#8230;.&#8221;);  
   IDisposable tag = new HtmlHelper(helper.ViewContext.HttpContext)  
        .HtmlTag(&#8220;div&#8221;,new { id=panelId});

}

Below is a list of things I couldn't think of a good solution for at the moment

  1. I didn't like the fact that I was putting the actual JavaScript into the UpdatePanel   extension method. Rob Conery said something on the forums about using services to provide the view with site-wide info that seemed interesting, but not sure of a good way to implement this would be. 
    It would be nice to have service providers kind of like you can use in Windows Workflow Foundation or VS control designers, that would let me add a IScriptService to do the actual JavaScript coding based on the script library I wanted to use.  Maybe I should just create a script provider for this. 

  2. Having to pass in a list of &#8220;triggering&#8221; controls felt kind of clunky. I'm trying to think of the best way to allow me to specify that a Html.ActionLink should register itself with the &#8220;UpdatePanel&#8221;. 
    Most of what I think of for this, basically requires me to implement my own versions of the stuff already implemented in the MvcToolkit.
    
  3.  I couldn't come up with a clean way to have the panel in the Usercontrol, but only have it be done if the usercontrol is called from a page instead of as a standalone view. I guess I could have the controller tell it this, but ideally they would just kind of know.
    
  4.    I think I may have already thought of the solution #3, and a workable #2. But I am really hesitant to do anything with #1 (outside the provider maybe) since I doubt I would do it close enough that I wouldn't need to remove it all to move over to their way, should they implement something like service providers.
    
5.    I think I'm going to put this aside for a while on another part of the site, this just is a "nice to have" feature, and get some of the other pieces that I actually need to have for the site done.
    
     
    
