---
id: 39
title: 'I wish C# 3.0 was here already'
date: 2007-09-10T02:18:09+00:00
author: Sean
layout: post
guid: http://seanlynch.io/archive/2007/09/10/i-wish-c-3.0-was-here-already.aspx
permalink: /i-wish-c-3-0-was-here-already/
categories:
  - .Net
  - Development
  - Work
---
I was reading [IHttpContext And Other Interfaces For Your Duck Typing Benefit](http://haacked.com/archive/2007/09/09/ihttpcontext-and-other-interfaces-for-your-duck-typing-benefit.aspx "IHttpContext And Other Interfaces For Your Duck Typing Benefit") over on [Haacked](http://www.haacked.com). It reminded my of something I did Thursday, which made me wish that .Net 3.5 was already usable.

I actually finally convinced my boss to let me try to automate at least some of the testing. So first order of business, change our the SQL installer program we use to allow it run without user interaction. 

After a good amount of refactoring of the monolithic control function, I get that part working. It can now do everything it needs to do by passing in all the stuff I need on the command line. After answering some several questions from the junior developers, several of which they answered them selves during the course of the conversation, I start to move onto making it into something useful.

I decide to make a simple API that I could use to inside of programs, so I can make a quick proof of concept for my boss who is skeptical that it would be feasible to make tests for the SQL (business logic). Something along the lines of here are your options, start and let me know how it went. That&#8217;s when the fun started, its a single executable file and &#8220;needs&#8221; to stay that way (which I agree with overall). After my momentary amnesia about not being able to reference exe files, I decide that I am going to use reflection.

My first attempt went something like: </p> 

> <pre class="csharpcode">//The installer has a start method
>interface IInstaller{void Start();} 
>public IInstaller Bind()
>{
>	Assembly assembly = Assembly.LoadFile("&lt;Path&gt;");
>	Type type = assembly.GetType("namespace.frm");
>	ConstructorInfo constructorInfo = type.GetConstructor(new Type[]{});
>	IInstaller installer = (IInstaller)constructorInfo.Invoke(new object[]{});
>}
></pre>

That didnt work so well, since while namespace.frm object had a Start method, it wasn&#8217;t from that interface, and shared no assemblies in common that I could use an interface from. In the end I decided to make a wrapper class that would take the object and make use a delegate to keep a reference to the Start method.

Something close to this: 
>
> <pre class="csharpcode">public interface IInstaller{void Start();}
>public class InstallerWrapper:IInstaller
>{
>	private delegate void StartMethod();
>	StartMethod startDelegate;
>	object _installer;
>	public InstallerWrapper(object installer)
>	{
>		_installer = installer;
>		startDelegate = (StartMethod)Delegate.CreateDelegate(typeof(StartMethod), installer, >"Start");
>	}
>	public void Start()
>	{
>		startDelegate();	
>	}	
>}
>public IInstaller Bind()
>{
>	Assembly assembly = Assembly.LoadFile("&lt;Path&gt;");
>	Type type = assembly.GetType("namespace.frm");
>	ConstructorInfo constructorInfo = type.GetConstructor(new Type[]{});
>	return new InstallerWrapper(constructorInfo.Invoke(new object[]{}));
>}
</pre>

Thinking about what I have read about the implementation of it in C# 3.0 I would likely have needed to do it this way anyways, since atleast from what I have read it is a compile time feature. Haven&#8217;t tested it yet on my VS 2008 beta VM yet though, so I could be wrong. 

Oh, and please forgive the formatting of the code, haven't done it much yet.

