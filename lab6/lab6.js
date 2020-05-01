/*
1.
背景：
    每隔五秒运行一次函数直到某一整分钟停止，比如从20:55:45运行到20:56:00停止；
    或者运行10次，先到的为准。从1开始每过五秒，输入框内数值翻倍。初始值为1。
注意：
    你可以在函数 timeTest内部 和 timeTest外部 写代码使得该功能实现。
要求：
    ①要求使用JS闭包的方式使得计数实现局部私有，不可以在全局区域声明计数变量。
    ②使用console.log打印计数即可，到达一分钟提前停止也需要console.log相应的提示语句。
*/

function testTime()
{
    let value = 1;
    let runCount = 0;
    let startDate = new Date();
    let startMinute = startDate.getMinutes();
    console.log(value);
    return new Promise(resolve =>
    {
        let interval = setInterval(() =>
            {
                let currentTime = new Date();//当前时间
                if(currentTime.getMinutes() !== startMinute || runCount >= 10)//如果分钟数有变化或者执行次数大于10次
                {
                    console.log("Time's out! It's " + currentTime + " now.");
                    clearInterval(interval);//停止计时器
                    resolve();//testTime函数执行完毕
                    return;
                }
                value *= 2;
                console.log(value);
                runCount++;
            },
            5000);
    });
}

/*
2.
要求：
    ①能够对传入的、移动手机电话（11位）、邮箱字符串（上网查找其要求）进行正则判定。
    ②使用console.log打印即可，例如，电话不符合要求但是邮箱符合要求，则console.log("The telephone is right and the mail is wrong!")。
    ③邮箱字符串的正则匹配的理解需写入lab文档。
    ④telephone与mail均是字符串。
*/
function testMail(telephone, mail)
{
    let isTelephoneCorrect = /^1[3456789]\d{9}$/.test(telephone);
    let isEmailCorrect = /^([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x22([^\x0d\x22\x5c\x80-\xff]|\x5c[\x00-\x7f])*\x22)(\x2e([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x22([^\x0d\x22\x5c\x80-\xff]|\x5c[\x00-\x7f])*\x22))*\x40([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x5b([^\x0d\x5b-\x5d\x80-\xff]|\x5c[\x00-\x7f])*\x5d)(\x2e([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x5b([^\x0d\x5b-\x5d\x80-\xff]|\x5c[\x00-\x7f])*\x5d))*(\.\w{2,})+$/.test(mail);
    console.log("The telephone is " + (isTelephoneCorrect ? "right" : "wrong") + " and the mail is " + (isEmailCorrect ? "right" : "wrong"));
}

/*
3.
要求：
    ①输入一段全英文语句，要求使用正则表达式找到相邻的重复单词放入一个Set，如果集合中元素超过10个，则按照首字母顺序取前10个于集合。
    ②使用console.log打印即可，将该集合打印出来。
    ③例如：输入"Is is the iS is cost of of gasoline going up up"，输出：Set { 'Is is', 'iS is', 'of of', 'up up' }。
    ④对该函数中用的正则匹配的理解需写入lab文档。
    ⑤str为字符串。
*/
function testRedundancy(str)
{
    let reg = /(\b[a-z]+\b) (\1)\b/gi;
    let result = new Set();
    let temp;
    while((temp = reg.exec(str)) !== null)
    {
        result.add(temp[0]);
        reg.lastIndex -= (temp[0].length - 1) / 2;//将\s\1匹配到的长度减掉，以避免“is IS iS”只匹配了“is IS”
    }

    function cmp(a, b)
    {
        let A = a.toUpperCase();
        let B = b.toUpperCase();
        if(A < B)
            return -1;
        else if(A === B)
            return 0;
        else
            return 1;
    }

    result = new Set(Array.from(result).sort(cmp).slice(0, 10));//如果集合中元素超过10个，则按照首字母顺序取前10个于集合
    console.log(result);
}


/*
4.
背景：
    旧键盘上坏了几个键，于是在敲一段文字的时候，对应的字符就不会出现。
    现在给出应该输入的一段文字、以及实际被输入的文字，请你使用Set列出肯定坏掉的那些键。
    例如：输入7_This_is_a_test和_hs_s_a_es    输出：Set { '7', 'T', 'I' }
要求：
    ①需要使用Set。
    ②只能使用一次循环。
    ③使用console.log打印即可，将该集合打印出来。
    ④wantInput和actualInput为字符串。
注意：
    ①注意联系生活，并注意观察我给的上述例子。
*/
function testKeyBoard(wantInput, actualInput)
{
    let upperCaseActualInput = new Set(actualInput.toUpperCase());
    console.log(new Set(Array.from(new Set(wantInput.toUpperCase())).filter(e => !upperCaseActualInput.has(e))));
}

/*
5.
背景：
    给定一个输入英文语句字符串，反转该语句。例如the sky is blue变成blue is sky the。
要求：
    ①如果输入的字符串前后有空格，输出中应该去除前后空格。如果输入字符串中间出现连续的两个空格，输出应该变为一个。
    比如输入是“  hello  world!  ”，输出应该是“world! hello”。
    ②请使用Array。
    ③使用console.log打印即可，将该数组打印出来。
    ④只能显式使用一次循环。
    ⑤str为字符串。
*/
function testSpecialReverse(str)
{
    console.log(str.trim().replace(/\s+/g, " ").split(" ").reverse().join(" "));
    console.log(str.trim().replace(/\s+/g, " ").split(" ").reverse());
}

/*
6.
背景：
    给定一个整数数组和一个值，找出相加为该值的两个元素下标并保存在一个数组中。
    例如给定 [2, 7, 11, 15]和9,
    打印结果为[0,1]
要求：
    ①使用Map。
    ②只能显式使用一次循环。
    ③使用console.log打印即可，将满足条件的数组打印出来。
    ④nums为数字数组，如[1,2,3,4],target为数字,如5，那么输出为
    [ 0, 3 ]
    [ 1, 2 ]
*/

function twoSum(nums, target)
{
    let map = new Map();
    for(let i = 0; i < nums.length; i++)
    {
        if(map.has(nums[i]))
        {
            console.log([nums[i], target - nums[i]]);
        }
        map.set(target - nums[i], nums[i]);
    }
}


/*
7.
背景：
    打印最长的包含不同字符串的子字符串长度。
要求：
    ①使用Map。
    ②例如：输入"abbbbb",输出2，输入"bbbbb",输出1；
    ③只能显式使用一次循环。
    ④使用console.log打印即可。
    ⑤str为字符串。
*/
function lengthOfLongestSubstring(str)
{
    let map = new Map();
    let longest = 0;
    let present = 0;
    for(let i = 0; i < str.length; i++)
    {
        if(!map.has(str[i]))
        {
            present++;
            longest = Math.max(present, longest);
            map.set(str[i], 1);
        }
        else
        {
            present = 0;
            map.clear();
        }
    }
    console.log(longest);
}

/*
8.
背景：
    该部分只是为了让你们自己动动手更好地感受不同继承方式。
要求：
    ①借助构造函数、原型链、和Object.create分别编写DevelopingCountry、PoorCountry、DevelopedCountry以实现对Country的继承，
    并在三者分别添加sayHi、saySad、sayHappy函数分别打印"Hi,i am a developing country."、"I am a sad poor country."、"I am a Happy developed country."
    ②请调用他们并打印相关语句即可。
*/
function Country()
{
    this.name = "国家";
}

function DevelopingCountry()
{
    Country.call(this);
}

DevelopingCountry.prototype.sayHi = function()
{
    console.log("Hi,i am a developing country.");
};

let developingCountryInstance = new DevelopingCountry();

function PoorCountry()
{
}

PoorCountry.prototype = new Country();
PoorCountry.prototype.saySad = function()
{
    console.log("I am a sad poor country.");
};
let poorCountryInstance = new PoorCountry();

let countryInstance = new Country();
let developedCountryInstance = Object.create(countryInstance);
developedCountryInstance.sayHappy = function()
{
    console.log("I am a Happy developed country.");
};


//=======Node.js的readline模块=======
const readline = require('readline');
const rl = readline.createInterface({input: process.stdin, output: process.stdout});
//===================================

test();

async function test()
{
    console.log("==========第1题==========");
    await testTime();//等待testTime函数执行完毕
    console.log("==========第2题==========");
    console.log("Please input a telephone number:");
    let telephone = "2.1";
    let mail = "2.2";
    let wantInput = "4.1";
    let actualInput = "4.2";
    let nums = [];
    let target = "6.2";
    let lineNumber = 1;
    rl.on('line', line =>
    {
        switch(lineNumber)
        {
            case 1:
                telephone = line;
                console.log("Please input an e-mail address:");
                break;
            case 2:
                mail = line;
                testMail(telephone, mail);
                console.log("==========第3题==========");
                console.log("Please input a sentence contains only English words:");
                break;
            case 3:
                testRedundancy(line);
                console.log("==========第4题==========");
                console.log("Please input your prompted input:");
                break;
            case 4:
                wantInput = line;
                console.log("Please input your actual input:");
                break;
            case 5:
                actualInput = line;
                testKeyBoard(wantInput, actualInput);
                console.log("==========第5题==========");
                console.log("Please input an English sentence:");
                break;
            case 6:
                testSpecialReverse(line);
                console.log("==========第6题==========");
                console.log("Please input some numbers:");
                break;
            case 7:
                nums = line.replace(/\s+/g, " ").split(" ").map(e => e = parseInt(e));
                console.log("Please input a target:");
                break;
            case 8:
                target = line;
                twoSum(nums, target);
                console.log("==========第7题==========");
                console.log("Please input a string:");
                break;
            case 9:
                lengthOfLongestSubstring(line);
                rl.close();
                break;
        }
        lineNumber++;
    });
    rl.on('close', () =>
    {
        console.log("==========第8题==========");
        developingCountryInstance.sayHi();
        poorCountryInstance.saySad();
        developedCountryInstance.sayHappy();
    });
}