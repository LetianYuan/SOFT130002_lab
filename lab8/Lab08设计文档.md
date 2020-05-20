# Lab08设计文档

> 19302010019 袁乐天

## 实现过程

### 轮播图

借鉴了bootstrap源码中的轮播图实现思路

* 当图片不出现时，display属性为none，当图片出现时，display属性为block
* 切换图片时给对应的两张图片（切出和切入的两张图片）运行css animation动画

这样子就不需要7张图片，5张即可

将从A图片切换到B图片封装成一个函数，这样任务一、二、三的代码都可以写得很简短

```js
function slide(from, to, direction)//从第from张图片切向第to张图片，范围为0~4
{
    for(let i = 0; i < 5; i++)
    {
        imgs[i].removeAttribute("class");
        btns[i].removeAttribute("class");
    }
    if(direction)//向右切，即按了向左按钮
    {
        imgs[from].classList.add("active");
        imgs[to].classList.add("active");
        imgs[from].classList.add("from-right");//from-right动画声明于CSS文件中
        imgs[to].classList.add("to-left");
    }
    else
    {
        imgs[from].classList.add("active");
        imgs[to].classList.add("active");
        imgs[from].classList.add("from-left");
        imgs[to].classList.add("to-right");
    }
    currentPicture = to;
    btns[currentPicture].classList.add("on");
}
```

### 任务四

利用html5新标准中的contenteditable属性（这样就不需要调用jQuery，也不需要写一百多行的代码）。对每个单元格添加onclick与onblur事件即可。对于光标的定位，利用js中的内置对象Selection即可。

```js
for(let e of document.getElementsByTagName("td"))
{
    e.style.width = "100px";
    e.setAttribute("contenteditable", "true");
    e.editing = false;
    e.onclick = function()
    {
        if(!e.editing)
        {
            e.editing = true;
            e.focus();
            e.classList.add("focused");
            let range = window.getSelection();
            range.selectAllChildren(e);
            range.collapseToStart();
        }
    };
    e.onblur = function()
    {
        e.editing = false;
        e.classList.remove("focused");
    };
}
```

