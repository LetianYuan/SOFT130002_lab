//1. 获取url中名为name的参数。在URL输入框输入url，点击同行submit按钮后，其中的参数名为name的参数值需要出现在Argument value输入框内。
//如果没有名为name的参数，那么可以在Argument value输入框出现任何值。
//请仅在showWindowHref函数内写代码。

//提示：url指代 （若干字符串）?（参数名1）=（参数1值）&（参数2）=（参数2值）...  这样的字符串。具体可以上网查找。例如：hjsdghgbj?name=666666&group=876。
//url、url_submit、url_result指代对应id的三个对象，其中url和url_result可以通过url.value或者url_result.value获得值。
//字符数组处理可以使用相关函数
let url = document.getElementById("url");
let url_submit = document.getElementById("url_submit");
let url_result = document.getElementById("url-result");
url_submit.addEventListener('click', showWindowHref);

function showWindowHref()
{
    url_result.value = /(?<=[?&]name=).*?((?=&)|$)/.exec(url.value)[0];
}

//2. 每隔五秒运行一次函数直到某一整分钟停止，比如从20:55:45运行到20:56:00停止；或者运行10次，先到的为准。从1开始每过五秒，输入框内数值翻倍。初始值为1。
//注意：你可以在函数 timeTest内部 和 timeTest外部 写代码使得该功能实现。
//与设置时间相关的函数可以上网查找。

//提示：mul为html中id为"mul"的元素对象，可直接通过mul.value获得其内的输入值。
let mul = document.getElementById("mul");

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

//3. 判断输入框most里出现最多的字符，并统计出来。统计出是信息在most_result输入框内以"The most character is:" + index + " times:" + max的形式显示。
//如果多个出现数量一样则选择一个即可。
//请仅在arrSameStr函数内写代码。

//提示：most、result、most_submit的解释及其.value与上面类似。
let most = document.getElementById("most");
let result = document.getElementById("most-result");
let most_submit = document.getElementById("most_submit");
most_submit.addEventListener('click', arrSameStr);

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