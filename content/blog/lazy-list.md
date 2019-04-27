---
id: 16
title: Lazy list
date: 2008-05-21T01:34:18+00:00
author: Sean
layout: post
guid: http://seanlynch.io/archive/2008/05/21/lazy-list.aspx
permalink: /lazy-list/
categories:
  - .Net
  - Development
  - MS Mvc
published: true
frontpage: true
---
I have been following <a href="http://blog.wekeroad.com/" target="_blank">Rob Conery's</a> posts on the MVC Storefront, and trying the repository/pipes-filters for data access that he has been using.

While trying out the implementation of a LazyList he was using, I had noticed that the example table was being joined onto the category table. At the time however, I really had not thought much of it, until I read <a href="http://blog.wekeroad.com/mvc-storefront/mvcstore-intermission2/" target="_blank">MVC Storefront: Brainbender Intermission</a> which got me thinking. 

Admittedly, I don&#8217;t really have to much of a problem with it loading all of the examples for all the categories at one time at the moment. However, I figured it would be nice to have it work the way intended, and query the database for the examples in a category only when asked for.

I liked the idea of the LazyList, and since I was already using a Service class for all data access, along with setting up the category hierarchy I moved the creation of the LazyList of examples property into the the GetCategories method of the service class.

It seems that as long as the LazyList is created after the categories .ToList() call it properly works. So I ended up with this code:

<pre class="code">categories.ForEach(category =>d
            {
                category.Examples =
                    <span style="color: rgb(0,0,255)">new</span> <span style="color: rgb(43,145,175)">LazyList</span>&lt;DevExamples.Data.<span style="color: rgb(43,145,175)">Example</span>&gt;(
                        <span style="color: rgb(0,0,255)">from</span> e <span style="color: rgb(0,0,255)">in</span> repository.GetExamples()
                        <span style="color: rgb(0,0,255)">where</span> e.CategoryId == category.ID
                        <span style="color: rgb(0,0,255)">select</span> e);

                <span style="color: rgb(0,0,255)">var</span> subCategories = (<span style="color: rgb(0,0,255)">from</span> sub <span style="color: rgb(0,0,255)">in</span> categories
                                     <span style="color: rgb(0,0,255)">where</span> sub.ParentId == category.ID
                                     <span style="color: rgb(0,0,255)">select</span> sub).ToList();
                category.SubCategories = subCategories;

                subCategories.ForEach(c =&gt; c.Parent = category);

            });
</pre>

