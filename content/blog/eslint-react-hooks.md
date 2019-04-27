---
title: Customizing the eslint rules for create react app 
date: 2018-11-25T00:34:55+00:00
author: Sean
layout: post
categories:
  - Blog
frontpage: true
published: true
---
I have been doing a bit with [React Hooks](https://reactjs.org/docs/hooks-intro.html) recently, and wanted to enable the ESLint rules. It took a little bit to figure this out because when I added the .eslintrc file to the root of my project I began getting parcer errors. 

What I needed to do with add was this to my .eslintrc file: `"extends": "react-app"`

Like this:

<pre class="language-js">
{
    "extends": "react-app",
    "plugins": [
        "react-hooks"
    ],
    "rules":{
        "react-hooks/rules-of-hooks": "error"
    }
}
</pre>