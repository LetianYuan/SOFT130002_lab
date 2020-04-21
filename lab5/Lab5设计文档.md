# Lab5设计文档

## 第一题

```js
function showWindowHref()
{
    url_result.value = /(?<=[?&]name=).*?((?=&)|$)/.exec(url.value)[0];
}
```

一行代码利用正则表达式即可解决。

* **(?<=[?&]name=)**是反向预查表达式，这表示被匹配字符**.\*?**之前需要满足**[?&]name=**这一正则表达式。
  * 之所以要加**[?&]**是因为要避免该正则表达式与**abc.com?xname=123**这类字符串匹配，保证了**name**前面的字符必须是**&**或**?**

* **.*?**是非贪婪匹配，如果不加**？**，则会匹配**abc.com?name=123&id=456&uid=7**中的**123&id=456&uid=7**，而本应匹配**123**
* **((?=&)|$)**表示被匹配字符**.\*?**之后要么是字符串结尾，要么是字符**&**

* **exec**函数表示被该正则表达式匹配的内容。由于使用了预查表达式，而预查表达式不会消耗字符，因而**name=**这5个字符不会在返回值里
* **[0]**是因为**exec**函数返回的是一个数组，如果不加上**[0]**，末尾会有一个分隔数组元素的逗号

## 第二题

```js
let interval = setInterval(timeTest, 5000);
let start_time = new Date();//起始时间
let start_minute = start_time.getMinutes();
let run_count = 0;//执行次数
if(mul.value === "")
    mul.value = 1;//将初始值设为1
function timeTest()
{
    let current_time = new Date();//当前时间
    if(current_time.getMinutes() !== start_minute || run_count >= 10)//如果分钟数有变化或者执行次数大于10次
    {
        clearInterval(interval);//停止计时器
        return;//退出函数
    }
    mul.value *= 2;
    run_count++;
}
```

主要使用了**setInterval**与**clearInterval**函数。

### 第三题

```js
function arrSameStr()
{
    /*O(n^2)时间复杂度的算法，没有使用哈希表
    let str = most.value;
    let max = 0;
    let most_character = "";
    while(str.length > 0)
    {
        let first_character = str.charAt(0);//字符串的第一个字符
        let regex = new RegExp(first_character, "g");//正则表达式
        let new_str = str.replace(regex, "");//将字符串中所有与第一个字符相等的字符删去
        if(str.length - new_str.length > max)//计算删去后的字符串的长度并更新答案
        {
            max = str.length - new_str.length;
            most_character = first_character;
        }
        str = new_str;
    }
    result.value = "The most character is:" + most_character + " times:" + max;
    */

    //O(n)时间复杂度的算法，使用了类似哈希表的关联数组
    let str = most.value;
    let hashtable = {};
    for(let i = 0; i < str.length; i++)
    {
        if(hashtable[str.charAt(i)])//如果不是undefined
        {
            hashtable[str.charAt(i)]++;
        }
        else
        {
            hashtable[str.charAt(i)] = 1;
        }
    }
    let max = 0;
    let most_character = "";
    for(let e in hashtable)
    {
        if(hashtable[e] > max)
        {
            max = hashtable[e];
            most_character = e;
        }
    }
    result.value = "The most character is:" + most_character + " times:" + max;
}
```

利用js的关联数组可以实现类似哈希表的功能，能在$O(n)$时间复杂度内实现这一算法。 

