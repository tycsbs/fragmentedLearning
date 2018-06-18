# 前端性能优化：细说JavaScript的加载与执行

本文主要是从**性能优化**的角度来探讨JavaScript在加载与执行过程中的优化思路与实践方法，既是细说，文中为了将涉及到的原理尽量阐述清楚，不免会多说几句，望各位读者保持耐心，请相信，您的耐心付出一定会让您得到与之匹配的回报。

随着用户体验的日益重视，前端性能对用户体验的影响备受关注，但由于引起性能问题的原因相对复杂，我们很难但从某一方面或某几个方面来全面解决它，这也是我行此文的原因，想以此文为起点，用一系列文章来深层次探讨与梳理有关Javascript性能的方方面面，以填补并夯实自己的技术不足。

---

## JavaScript的**阻塞特性**

前端开发者应该都知道，JavaScript是单线程运行的，什么意思呢？就是在JavaScript运行一段脚本的时候，页面中其他的事情在同一时间是不能被同时处理的，所以在执行一段js脚本的时候，它会影响其他的操作。这是JavaScript本身的特性，我们无法改变。

我们把JavaScript的这一特性叫做**阻塞特性**，正因为这个阻塞特性，让前端的性能优化，尤其是在JavaScript的性能优化变得相对复杂。

### 为什么要**阻塞**？

也许你还会问，既然JavaScript的阻塞特性会产生这么多的问题，为什么JavaScript语言不能像Java等语言一样，采用多线程，不就OK了么？

原因很简单，最初JavaScript的目标只是用来在浏览器端改善网页的用户体验，去处理一些页面中类似表单验证的简单任务。所以，客户端JavaScript一定是和界面是强关联的,试想，如果在某个页面中有两段js脚本都会去更改某一个dom元素的内容，如果JavaScript采用了多线程的处理方式，那么最终页面元素显示的内容到底是哪一段js脚本操作的结果就不确定了，这是我们不想要的结果。因此：**JavaScript采用单线程，是为了避免在执行过程中页面内容被不可预知的重复修改**。

> 关于JavaScript的更多“身世”之谜，可以看阮一峰老师的[Javascript诞生记](http://www.ruanyifeng.com/blog/2011/06/birth_of_javascript.html)

### 从加载上优化：脚本位置

由于JavaScript的阻塞特性，在每一个&lt;script&gt;出现的时候，无论是内嵌还是外链的方式，它都会让页面等待脚本的加载解析和执行，并且&lt;script&gt;标签可以放在页面的&lt;head&gt;或者&lt;body&gt;中，因此，如果我们页面中的css和js的引用顺序或者位置不一样，即使是同样的代码，加载体验都是不一样的。举个栗子：

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width,initial-scale=1.0">
    <title>js引用的位置性能优化</title>
    <script type="text/javascript" src="index-1.js"></script>
    <script type="text/javascript" src="index-2.js"></script>
    <link rel="stylesheet" href="style.css">
  </head>
  <body>
    <div id="app"></div>
  </body>
</html>
```

以上代码是一个简单的html界面，其中加载了两个js脚本文件和一个css样式文件，由于js的阻塞问题，当加载到index-1.js的时候，其后面的内容将会被挂起等待，直到index-1.js加载、执行完毕，才会执行第二个脚本文件index-2.js，这个时候页面又将被挂起等待脚本的加载和执行完成，一次类推，这样用户打开该界面的时候，界面内容会明显被延迟，我们就会看到一个空白的页面闪过，这种体验是明显不好的，因此**我们应该尽量的让内容和样式先展示出来，将js文件放在&lt;body&gt;最后，以此来优化用户体验**。

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width,initial-scale=1.0">
    <title>js引用的位置性能优化</title>
    <link rel="stylesheet" href="style.css">
  </head>
  <body>
    <div id="app"></div>
    <script type="text/javascript" src="index-1.js"></script>
    <script type="text/javascript" src="index-2.js"></script>
  </body>
</html>
```

### 从请求次数上优化： 减少请求次数

有一点我们需要知道：页面加载的过程中，**最耗时间的不是js本身的加载和执行，相比之下，每一次去后端获取资源，客户端与后台建立链接才是最耗时的**，也就是大名鼎鼎的Http三次握手，当然，http请求不是我们这一次讨论的主题，想深入了解的自行搜索，网络上相关文章很多。

因此，减少HTTP请求，是我们着重优化的一项，事实上，在页面中js脚本文件加载很很多情况下，它的优化效果是很显著的。

#### 文件的精简与压缩

要减少访问请求，则必然会用到js的**精简(minifucation)和压缩(compression)**了，需要注意的是，精简文件实际并不复杂，但不适当的使用也会导致错误或者代码无效的问题，因此在实际的使用中，最好在压缩之前对js进行语法解析，帮我们避免不必要的问题（例如文件中包含中文等unicode转码问题）。

解析型的压缩工具常用有三：**YUI Compressor**、**Closure Complier**、**UglifyJs**

YUI Compressor: YUI Compressor的出现曾被认为是最受欢迎的基于解析器的压缩工具，**它将去去除代码中的注释和额外的空格并且会用单个或者两个字符去代替局部变量以节省更多的字节**。但默认会关闭对可能导致错误的替换，例如with或者eval();

Closure Complier: Closure Complier同样是一个基于解析器的压缩工具，他会试图去让你的代码变得尽可能小。**它会去除注释和额外的空格并进行变量替换，而且会分析你的代码进行相应的优化**，比如他会删除你定义了但未使用的变量，也会把只使用了一次的变量变成内联函数。

UglifyJs：UglifyJs被认为第一个基于node.js的压缩工具，**它会去除注释和额外的空格，替换变量名，合并var表达式，也会进行一些其他方式的优化**

每种工具都有自己的优势，比如说YUI压缩后的代码准确无误，Closure压缩的代码会更小，而UglifyJs不依靠于Java而是基于JavaScript，相比Closure错误更少，具体用哪个更好我觉得没有个确切的答案，开发者应该根据自己项目实际情况酌情选择。

---



---

最后，由于个人技术能力限制，若有行文不全或疏漏错误之处，恳请各位读者批评指正。
