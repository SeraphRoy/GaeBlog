---
title: "Jekyll Search Solutions"
date: "2019-01-20 15:13"
categories: ["Jekyll"]
tags: ["Jekyll","Blog"]
mathjax: true
---



# Updates

终于我找到了[这个](https://github.com/wzpan/hexo-theme-freemind/blob/master/source/js/search.js)。
但是这个其实充满了各种bug，比如我提交的[这个](https://github.com/wzpan/hexo-theme-freemind/issues/83)。
里面还有很多的bug以及我不满意的地方（不知道为什么能活到现在……），反正
所以我现在自己写了[我自己的版本](https://github.com/SeraphRoy/SimpleBlogSearch)。
现在的左侧搜索框应该能显示搜索出来的节选高亮了。问题终于解决了（大概

Agolia的我还是先留着吧，毕竟我自己写的也没有特别满意，而且他们也帮我[卖广告](https://community.algolia.com/jekyll-algolia/themes.html)
了所以就
都保留着想用哪个用哪个吧。。

# 问题和需求

最近心血来潮想自己在博客上加上搜索功能，因为我用的这个框架的程序员一直不更新就一气之下想着自己写一个算了。
问题在于我就完全没碰过前端，工作也跟写网页一点关系都没有，于是我就google呗，看看有啥
好的在jekyll创建的静态网页有好用的搜索。问题在于，无论google用中文搜索还是英文都没有
一个完美的方案来对应我的需求，见到有[别人的博客](https://chenkaihua.com/)能实现我的需求
但是好像并没有开源……好吧说了这么多我先列个需求：

1. 方便：最好是一个小插件或者一段js就好，我懒得换主题而且换了的新主题就算搜索功能很好
也不一定别的功能很好
2. 能搜索全文
3. 搜索出来的东西能高亮：这个是最重要的feature，也是我到处怎么找开源也找不到的feature。
意思就是你搜索正文中的东西能把match上的文字以及前后文的一小段都显示出来而且高亮match。
我看到的基本要么只显示title，要么只能显示正文节选。
4. 免费开源：这样我自己也能改样式
5. API好用

好吧基本上2+3就能排除掉一大箱的google上的选项了，下面说说我的解决方案吧……

<!--more-->

# 解决方案（暂时）

我用了两套搜索工具，也没说一定要用两套只不过刚好写了两套就都放着呗……

首先是[这个](https://github.com/christian-fei/Simple-Jekyll-Search)。使用很简单方便
github page上也有教程，API也挺好用的，满足了1245，但是3这个点挺麻烦的，要修改它
本身js的search的function，which is doable但是其实跟我自己重新写一个插件没什么区别了……

然后我专门写了一个单独的page用的[algolia](https://community.algolia.com/jekyll-algolia/blog.html)
链接里面是详细的教程，使用倒是也挺方便的，最主要是能高亮啊啊啊！唯一的问题就是
它不是开源的，有免费的plan倒是如果你的博客很小倒没所谓，但是不开源的我自己用起来
也不舒服，毕竟没什么控制权……

以上两种解决方案在我github上都能看到，分别是\_includes/algolia.html和\_includes/sidebar-search.html
css和js什么的自己看着搜索就能看到了……代码会跟上面的攻略不一样毕竟这是我自己的博客……

# 总结吐槽

anyway反正就这么先用着了，有更好的方案再说……不得不吐槽网上那些程序员自己写的博客前端
真是一个比一个坑……博客文章雷同不说…写关于Jekyll博客搜索功能的攻略然而自己博客的搜索
功能蠢的一B……有些前端的排版还完全不对…其它什么页面404啊搜索只能搜索title啊就不提了真是
坑爹……还有些写了搜索攻略的但是博客本身就没搜索功能的……

好了发泄了一通，不管怎么说用这两套方案kind of满足我的需求了……最好还是有个开源的
插件吧algolia替换掉啦…嘛以上
