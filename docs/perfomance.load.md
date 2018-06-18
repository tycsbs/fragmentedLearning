# 前端性能优化：细说JavaScript的加载与执行

本文主要是从**性能优化**的角度来探讨JavaScript在加载与执行过程中的优化思路与实践方法，既是细说，文中在涉及原理性的地方，不免会多说几句，还望各位读者保持耐心，仔细理解，请相信，您的耐心付出一定会让您得到与之匹配的回报。

## 缘起

随着用户体验的日益重视，前端性能对用户体验的影响备受关注，但由于引起性能问题的原因相对复杂，我们很难但从某一方面或某几个方面来全面解决它，这也是我行此文的原因，想以此文为起点，用一系列文章来深层次探讨与梳理有关Javascript性能的方方面面，以填补并夯实自己的知识结构。

## 目录结构

本文大致的行文思路，包含但不局限：

* 不得不说的JavaScript阻塞特性

* 合理放置脚本位置，以优化加载体验，js脚本放在 `<body>`标签闭合之前。

* 减少HTTP请求次数，压缩精简脚本代码。

* 无阻塞加载JavaScript脚本：

  * 使用`<script>`标签的defer属性。

  * 使用HTML5的async属性。

  * 动态创建`<script>`元素加载JavaScript。

  * 使用XHR对象加载JavaScript。


## 不得不说JavaScript的阻塞特性

前端开发者应该都知道，JavaScript是单线程运行的，也就是说，在JavaScript运行一段代码块的时候，页面中其他的事情（UI更新或者别的脚本加载执行等）在同一时间段内是被挂起的状态，不能被同时处理的，所以在执行一段js脚本的时候，这段代码会影响其他的操作。这是JavaScript本身的特性，我们无法改变。

我们把JavaScript的这一特性叫做**阻塞特性**，正因为这个阻塞特性，让前端的性能优化尤其是在对JavaScript的性能优化上变得相对复杂。

### 为什么要阻塞？

也许你还会问，既然JavaScript的阻塞特性会产生这么多的问题，为什么JavaScript语言不能像Java等语言一样，采用多线程，不就OK了么？

要彻底理解JavaScript的单线程设计，其实并不难，简单总结就是：最初设计JavaScript的目的只是用来在浏览器端改善网页的用户体验，去处理一些页面中类似表单验证的简单任务。所以，那个时候JavaScript所做的事情很少，并且代码不会太多，这也奠定了JavaScript和界面操作的强关联性。

既然JavaScript和界面操作强相关，我们不妨这样理解：试想，如果在某个页面中有两段js脚本都会去更改某一个dom元素的内容，如果JavaScript采用了多线程的处理方式，那么最终页面元素显示的内容到底是哪一段js脚本操作的结果就不确定了，因为两段js是通过不同线程加载的，我们无法预估谁先处理完，这是我们不想要的结果，而这种界面数据更新的操作在JavaScript中比比皆是。因此，我们就不难理解JavaScript单线程的设计原因：**JavaScript采用单线程，是为了避免在执行过程中页面内容被不可预知的重复修改**。


> 关于JavaScript的更多“身世”之谜，可以看阮一峰老师的[Javascript诞生记](http://www.ruanyifeng.com/blog/2011/06/birth_of_javascript.html)

## 从加载上优化：合理放置脚本位置

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

## 从请求次数上优化： 减少请求次数

有一点我们需要知道：页面加载的过程中，最耗时间的不是js本身的加载和执行，相比之下，每一次去后端获取资源，客户端与后台建立链接才是最耗时的，也就是大名鼎鼎的Http三次握手，当然，http请求不是我们这一次讨论的主题，想深入了解的自行搜索，网络上相关文章很多。

因此，减少HTTP请求，是我们着重优化的一项，事实上，在页面中js脚本文件加载很很多情况下，它的优化效果是很显著的。要减少HTTP的请求，就不得不提起文件的精简压缩了。

### 文件的精简与压缩

要减少访问请求，则必然会用到js的**精简(minifucation)和压缩(compression)**了，需要注意的是，精简文件实际并不复杂，但不适当的使用也会导致错误或者代码无效的问题，因此在实际的使用中，最好在压缩之前对js进行语法解析，帮我们避免不必要的问题（例如文件中包含中文等unicode转码问题）。

解析型的压缩工具常用有三：YUI Compressor、Closure Complier、UglifyJs

**YUI Compressor**: YUI Compressor的出现曾被认为是最受欢迎的基于解析器的压缩工具，它将去去除代码中的注释和额外的空格并且会用单个或者两个字符去代替局部变量以节省更多的字节。但默认会关闭对可能导致错误的替换，例如with或者eval();

**Closure Complier**: Closure Complier同样是一个基于解析器的压缩工具，他会试图去让你的代码变得尽可能小。它会去除注释和额外的空格并进行变量替换，而且会分析你的代码进行相应的优化，比如他会删除你定义了但未使用的变量，也会把只使用了一次的变量变成内联函数。

**UglifyJs**：UglifyJs被认为第一个基于node.js的压缩工具，它会去除注释和额外的空格，替换变量名，合并var表达式，也会进行一些其他方式的优化

每种工具都有自己的优势，比如说YUI压缩后的代码准确无误，Closure压缩的代码会更小，而UglifyJs不依靠于Java而是基于JavaScript，相比Closure错误更少，具体用哪个更好我觉得没有个确切的答案，开发者应该根据自己项目实际情况酌情选择。


## 从加载方式上优化：无阻塞脚本加载

在JavaScript性能优化上，减少脚本文件大小并限制HTTP请求的次数仅仅是让界面响应迅速的第一步，现在的web应用功能丰富，js脚本越来越多，光靠精简源码大小和减少次数不总是可行的，即使是一次HTTP请求，但文件过于庞大，界面也会被锁死很长一段时间，这明显不好的，因此，无阻塞加载技术应运而生。

简单来说，**就是页面在加载完成后才加载js代码，也就是在window对象的load事件触发后才去下载脚本**。 要实现这种方式，常用以下几种方式：

### 延迟脚本加载（defer）

HTML4以后为&lt;script&gt;标签定义了一个扩展属性：defer。defer属性的作用是指明要加载的这段脚本不会修改DOM，因此代码是可以安全的去延迟执行的，并且现在主流浏览器已经全部对defer支持。

```html
<script type="text/javascript" src="index-1.js" defer></script>
```

带defer属性的&lt;script&gt;标签在DOM完成加载之前都不会去执行，无论是内嵌还是外链方式。

### 延迟脚本加载（async）

HTML5规范中也引入了async属性，用于异步加载脚本，其大致作用和defer是一样的，都是采用的并行下载，下载过程中不会有阻塞，但**不同点在于他们的执行时机，async需要加载完成后就会自动执行代码，但是defer需要等待页面加载完成后才会执行**。

## 从加载方式上优化：动态添加脚本元素

把代码以动态的方式添加的好处是：无论这段脚本是在何时启动下载，它的下载和执行过程都不会则色页面的其他进程，我们甚至可以直接添加带头部head标签中，都不会影响其他部分。

因此，作为开发的你肯定见到过诸如此类的代码块：

```js
var script = document.createElement('script');
script.type = 'text/javascript';
script.src = 'file.js';
document.getElementsByTagName('head')[0].appendChild(script);
```

这种方式便是动态创建脚本的方式，也就是我们现在所说的动态脚本创建。通过这种方式下载文件后，代码就会自动执行。但是在现代浏览器中，这段脚本会等待所有动态节点加载完成后再执行。这种情况下，为了确保当前代码中包含的别的代码的接口或者方法能够被成功调用，就必须在别的代码加载前完成这段代码的准备。解决的具体操作思路是：

现代浏览器会在script标签内容下载完成后接收一个load事件，我们就可以在load事件后再去执行我们想要执行的代码加载和运行，在IE中，它会接收loaded和complete事件，理论上是loaded完成后才会有completed，但实践告诉我们他两似乎并没有个先后，甚至有时候只会拿到其中的一个事件，我们可以单独的封装一个专门的函数来体现这个功能的实践性,因此一个统一的写法是：


```js
 function LoadScript(url, callback) {
        var script = document.createElement('script');
        script.type = 'text/javascript';

        // IE浏览器下
        if (script.readyState) {
          script.onreadystatechange = function () {
            if (script.readyState == 'loaded' || script.readyState == 'complete') {
              // 确保执行两次
              script.onreadystatechange = null;
              // todo 执行要执行的代码
              callback()
            }
          }
        } else {
          script.onload = function () {
            callback();
          }
        }

        script.src = 'file.js';
        document.getElementsByTagName('head')[0].appendChild(script);
      }

```

LoadScript函数接收两个参数，分别是要加载的脚本路径和加载成功后需要执行的回调函数，LoadScript函数本身具有特征检测功能，根据检测结果（IE和其他浏览器），来决定脚本处理过程中监听哪一个事件。

> 实际上这里的LoadScript()函数，就是我们所说的LazyLoad.js（懒加载）的原型。

有了这个方法，我们可以实现一个简单的多文件按某一固定顺序加载代码块：

```js
LoadScript('file-1.js', function(){
  LoadScript('file-2.js', function(){
    LoadScript('file-3.js', function(){
        console.log('loaded all')
    })
  })
})
```

以上代码执行的时候，将会首先加载file-1.js,加载完成后再去加载file-2.js,以此类推。当然这种写法肯定是有待商榷的（多重回调嵌套写法简直就是地狱），但这种动态脚本添加的思想，和加载过程中需要注意的和避免的问题，都在LoadScript函数中得以澄清解决。

当然，如果文件过多，并且加载的顺序有要求，最好的解决方法还是建议按照正确的顺序合并一起加载，这从各方面讲都是更好的法子。

## 从加载方式上优化：XMLHttpRequest脚本注入

通过XMLHttpRequest对象来获取脚本并注入到页面也是实现无阻塞加载的另一种方式，这个我觉得不难理解，这其实和动态添加脚本的方式是一样的思想，来看具体代码：

```js
var xhr = new XMLHttpRequest();
xhr.open('get', 'file-1.js', true);
xhr.onreadystatechange = function() {
  if(xhr.readyState === 4) {
    if(xhr.status >= 200 && xhr.status < 300 || xhr.status === 304){
      // 如果从后台或者缓存中拿到数据，则添加到script中并加载执行。
      var script = document.createElement('script');
      script.type = 'text/javascript';
      script.text = xhr.responseText;
      // 将创建的script添加到文档页面
      document.body.appendChild(script);
    }
  }
}

```

通过这种方式拿到的数据有两个优点：其一，我们可以控制脚本是否要立即执行，因为我们知道新创建的script标签只要添加到文档界面中它就会立即执行，因此，在添加到文档界面之前，也就是在appendChild()之前，我们可以根据自己实际的业务逻辑去实现需求，到了想要让它执行的时候，再appendChild()即可。其二：它的兼容性很好，所有主流浏览器都支持，它不需要想动态添加脚本的方式那样，我们自己去写特性检测代码；

但由于是使用了XHR对象，所以不足之处是获取这种资源有“域”的限制。资源 必须在同一个域下才可以，不可以跨域操作。

## 最后总结

文章主要从JavaScript的加载和执行这一过程中挖掘探讨对前端优化的解决方案，并较细致的罗列了各个解决方案的优势和不足之处，当然，前端性能优化本就相对复杂，要想彻底理解其各中原由，还有很长一段路要走！

本文主要行文思路：

* 不得不说的JavaScript阻塞特性

* 合理放置脚本位置，以优化加载体验，js脚本放在 `<body>`标签闭合之前。

* 减少HTTP请求，压缩精简脚本代码。

* 无阻塞加载JavaScript脚本：

  * 使用`<script>`标签的defer属性。

  * 使用HTML5的async属性。

  * 动态创建`<script>`元素加载JavaScript。

  * 使用XHR对象加载JavaScript。


感谢这个时代，让我们可以站在巨人的肩膀上，窥探程序世界的宏伟壮观，我愿以一颗赤子心，踏遍程序世界的千山万水！愿每一个行走在程序世界的同仁，都活成心中想要的样子，加油！

最后，由于个人水平原因，若有行文不全或疏漏错误之处，恳请各位读者批评指正，一路有你，不胜感激！。
