---
id: 22
title: Got my nice Urls working
date: 2008-03-18T00:52:52+00:00
author: Sean
layout: post
guid: http://seanlynch.io/archive/2008/03/18/got-my-nice-urls-working.aspx
permalink: /got-my-nice-urls-working/
categories:
  - .Net
  - Development
  - MS Mvc
published: false
---
Its amazing how fast things can be done when not fighting bad assumptions. In this case it was that my admin URLs needed to use the nice descriptive URLs, instead of just /[Controller]/[Action]/[id] type routing.

Once I realized I was making things overly complicated I, I ended up with a set of routing functions that are actually a bit less complicated then what I would have come up with if I had been able to extend the RouteTable the way I had planned originally.

I also decided that I didn&#8217;t like the idea of having the make every category and example name unique. Most of this was that I&#8217;m not the creative, but I also realized that it would be really ugly I wanted to have namespaces as categories. For example, it would not have been possible to have both C/System/Windows/Forms/Control and C/System/Web/UI/Control since Control would have had to be unique.

I also decided that I was going to set a limit to the depth of categories that the site was going to have, though it is easy to update this. First I made a function that would generate routes similar to those [previously posted](http://myheadsexploding.com/archive/2007/12/13/routing-revisited.aspx). 

<pre class="code"><span style="color: rgb(0,0,255)">protected</span> <span style="color: rgb(0,0,255)">void</span> CreateRouteSet(<span style="color: rgb(0,0,255)">string</span> baseRoute, <span style="color: rgb(0,0,255)">string</span> baseName
    , <span style="color: rgb(0,0,255)">int</span> maxDepth, <span style="color: rgb(0,0,255)">object</span> Defaults)
{
    <span style="color: rgb(43,145,175)">StringBuilder</span> sb = <span style="color: rgb(0,0,255)">new</span> <span style="color: rgb(43,145,175)">StringBuilder</span>();
    <span style="color: rgb(0,0,255)">for</span> (<span style="color: rgb(0,0,255)">int</span> i = 0; i &lt; maxDepth; i++)
    {
        <span style="color: rgb(0,0,255)">if</span> (sb.Length &gt; 0)
            sb.Append(<span style="color: rgb(163,21,21)">"/"</span>);

        sb.AppendFormat(<span style="color: rgb(163,21,21)">"[{0}{1}]"</span>, baseName, i);

        <span style="color: rgb(43,145,175)">RouteTable</span>.Routes.Add(<span style="color: rgb(0,0,255)">new</span> <span style="color: rgb(43,145,175)">Route</span>{
         
            Url = <span style="color: rgb(43,145,175)">String</span>.Format(baseRoute,sb.ToString()),
            Defaults = Defaults,
            RouteHandler = <span style="color: rgb(0,0,255)">typeof</span>(<span style="color: rgb(43,145,175)">MvcRouteHandler</span>)
        });
    }
}

<span style="color: rgb(0,0,255)">protected</span> <span style="color: rgb(0,0,255)">void</span> Application_Start(<span style="color: rgb(0,0,255)">object</span> sender, <span style="color: rgb(43,145,175)">EventArgs</span> e)
{

    CreateRouteSet(<span style="color: rgb(163,21,21)">"C/{0}"</span>, <span style="color: rgb(163,21,21)">"Category"</span>, 6,
        <span style="color: rgb(0,0,255)">new</span> { Action = <span style="color: rgb(163,21,21)">"Index"</span>, Controller = <span style="color: rgb(163,21,21)">"Categories"</span> }
        );

    <span style="color: rgb(0,128,0)">//Other routes using the standard [Controller]/[Action]/[Id]</span>

}</pre>

[](http://11011.net/software/vspaste)

This will setup routes to handle category hierarchies up to 6 deep.  And add Category1,Category2&#8230; into the RouteData.Values collection in the controller.

Next I set up the code to allow me to handle the route, which I did in the model, adding a method that takes an IDictionary<string,object>. 

<pre class="code"><span style="color: rgb(0,0,255)">public</span> <span style="color: rgb(43,145,175)">Category</span> GetCategoryFromRouteData(<span style="color: rgb(43,145,175)">IDictionary</span>&lt;<span style="color: rgb(43,145,175)">String</span>,<span style="color: rgb(0,0,255)">object</span>&gt; data)
{
<span style="color: rgb(0,128,0)">    //Grab just the category data<br /></span>    <span style="color: rgb(0,0,255)">var</span> navList = <span style="color: rgb(0,0,255)">from</span> route <span style="color: rgb(0,0,255)">in</span> data
               <span style="color: rgb(0,0,255)">where</span> route.Key.IndexOf(<span style="color: rgb(163,21,21)">"Category"</span>) == 0
               <span style="color: rgb(0,0,255)">orderby</span> route.Key
               <span style="color: rgb(0,0,255)">select</span> <span style="color: rgb(0,0,255)">new</span>{Key = route.Key, Value = route.Value.ToString()};

    <span style="color: rgb(0,0,255)">string</span> sqlSelect = <span style="color: rgb(163,21,21)">@"
        SELECT {0}.* 
        FROM Category {0}
        {1}
        WHERE {0}.Name = {{0}}"</span>;
<span style="color: rgb(0,128,0)">    <br />    //{{{2}}} will be replaced with {{&lt;param index&gt;}}<br /></span>    <span style="color: rgb(0,0,255)">string</span> join = <span style="color: rgb(163,21,21)">@"INNER JOIN Category {0} ON {0}.[Key] = {1}.ParentKey 
                    AND {0}.[Name] = {{{2}}}

</span><span style="color: rgb(0,128,0)">    //This is the name of the category I am actually interested in<br /></span>    <span style="color: rgb(0,0,255)">var</span> mainCat = navList.Last();

    <span style="color: rgb(0,128,0)">//Build a list of category values to for parameterized query<br />    </span><span style="color: rgb(43,145,175)">List</span>&lt;<span style="color: rgb(0,0,255)">string</span>&gt; values = <span style="color: rgb(0,0,255)">new</span> <span style="color: rgb(43,145,175)">List</span>&lt;<span style="color: rgb(0,0,255)">string</span>&gt;();
    values.Add(mainCat.Value);
    <span style="color: rgb(43,145,175)">StringBuilder</span> sb = <span style="color: rgb(0,0,255)">new</span> <span style="color: rgb(43,145,175)">StringBuilder</span>();
    <span style="color: rgb(0,0,255)">string</span> lastCategory = mainCat.Key;

    <span style="color: rgb(0,0,255)">int</span> i = 1;
    <span style="color: rgb(0,0,255)">foreach</span> (<span style="color: rgb(0,0,255)">var</span> item <span style="color: rgb(0,0,255)">in</span> navList.Reverse().Skip(1))
    {
        sb.AppendFormat(join, item.Key, lastCategory,i++);
        values.Add(item.Value);
        lastCategory = item.Key;
    }

    <span style="color: rgb(0,0,255)">string</span> sql = <span style="color: rgb(43,145,175)">String</span>.Format(sqlSelect,mainCat.Key, sb.ToString());
    <span style="color: rgb(43,145,175)">Category</span> cat = <span style="color: rgb(0,0,255)">this</span>.ExecuteQuery&lt;<span style="color: rgb(43,145,175)">Category</span>&gt;(sql, values.ToArray()).Single();<br />
<span style="color: rgb(0,128,0)"><br /><br />    //GetDisplayCategory skips over categories that have only 1 subcategory <br />    //and no examples, allowing me to have the planned Url structure without <br />    //</span><span style="color: rgb(0,128,0)">requiring the user to navigate through several empty categories.<br /></span>    <span style="color: rgb(0,0,255)">return</span> GetDisplayCategory(cat);
}</pre>

[](http://11011.net/software/vspaste)

I had planned on having doing it all LINQ to SQL expressions, but it was taking more time then it was worth to figure out how to do the hierarchy lookup from the category names.  I need to add some caching of the key lookups at some point, since the joins look like they might get a bit nasty for deep categories, but that can wait.

I added a few overloads to the HtmlHelper ActionLink extension methods to handle making the nice Url links.

Now I need to figure out how to deploy the usercontrols that will contain the executable part of the example. I have had some problems with compilation sometimes when I had the website directly upload the usercontrols. Plus I would like them to go into source control when I add them.

