//倒计时区域，setTimeout方法
//倒计时结束后，滚动名单
//

var xinm = new Array();
xinm[0] = "林黛玉"
xinm[1] = "贾宝玉"
xinm[2] = "唐僧"
xinm[3] = "韦小宝"
xinm[4] = "猪八戒"
xinm[5] = "葫芦娃"
xinm[6] = "杨过"
xinm[7] = "五阿哥"
xinm[8] = "小燕子"
xinm[9] = "赵云"
xinm[10] = "多啦A梦"
xinm[11] = "樱桃小丸子"
xinm[12] = "梁山伯"
xinm[13] = "小龙女"
xinm[14] = "张无忌"
xinm[15] = "蜡笔小新"
xinm[16] = "关羽"
xinm[17] = "刘备"
xinm[18] = "曹操"

var phone = new Array();
phone[0] = "15161584615"
phone[1] = "18024631478"
phone[2] = "15816354851"
phone[3] = "13513154899"
phone[4] = "18286479113"
phone[5] = "18011111111"
phone[6] = "18631549875"
phone[7] = "18312345678"
phone[8] = "15800000000"
phone[9] = "13712365487"
phone[10] = "13222225488"
phone[11] = "13233225489"
phone[12] = "13233225480"
phone[13] = "13233225481"
phone[14] = "13233225482"
phone[15] = "13233225483"
phone[16] = "13233225484"
phone[17] = "13233225485"
phone[18] = "13233225486"

var downTime = 2000;
var sec = parseInt(downTime / 1000) % 60;
var min = parseInt(downTime / 1000 / 60) % 60;
var hour = parseInt(downTime / 1000 / 60 / 60) % 24;
var day = parseInt(downTime / 1000 / 60 / 60 / 24) % 24;

add0();
function add0() {
    $('.sec').html(sec);
    $('.min').html(min);
    $('.hour').html(hour);
    $('.day').html(day);
    if (sec < 10) {
        $('.sec').html('0' + sec);
    }
    if (min < 10) {
        $('.min').html('0' + min);
    }
    if (hour < 10) {
        $('.hour').html('0' + hour);
    }
    if (day < 10) {
        $('.day').html('0' + day);
    }
}
var timer = setInterval(function () {
    sec--;
    if (sec < 0) {
        min--;
        second = 59;
        if (min < 0) {
            hour--;
            min = 59;
            if (hour < 0) {
                day--;
                hour = 23;
            }
        }
    }
    if (sec <= 0 && min <= 0 && hour <= 0 && day <= 0) {
        clearInterval(timer);
        $('.count-down').html('正在抽奖，请稍候...');
        timeEnd();
    }
    add0();
}, 1000)

var num;
var perCount = xinm.length;
var flag = true;
var zjCount = 10;//用来计数
var roll;
var nametxt = $('.name');
var phonetxt = $('.num');

//左侧名单滚动
function rolling() {
    //每次更新名单，长度都会-1，所以要更新perCount
    perCount = xinm.length - 1;
    num = Math.floor(Math.random() * perCount);
    nametxt.html(xinm[num]);
    phonetxt.html(phone[num]);
    roll = setTimeout(rolling, 0);//无限滚动
}
//倒计时为0，隔一秒抽一个名单
function timeEnd() {
    if (flag) {
        flag = false;
        rolling();
    }
    var timer = setInterval(function () {
        time = timer;
        md();
    }, 1000)
}

//显示名单
function md() {
    if (zjCount >= 1) {
        clearInterval(time);
        stop();
        $('.list').prepend('<div>' + zjCount + " " + xinm[num] + " " + phone[num] + '</div>');
        zjCount--;
    }
    //最后一人也抽取后
    if (zjCount < 1) {
        clearInterval(time);
        $('.count-down').html('抽奖结束，恭喜获奖者');
        stop();
        flag = true;
    }
    //每隔两秒抽出一个人
    if (zjCount > 0) {
        setTimeout(pause, 2000);
    }
    //把中奖者从数组中删除
    xinm.splice($.inArray(xinm[num], xinm), 1);
    phone.splice($.inArray(phone[num], phone), 1);
}

//暂停滚动
function stop() {
    clearTimeout(roll);
    roll = null;
}
//再次滚动，打印出名单
function pause() {
    rolling();
    var timer = setInterval(function () {
        time = timer;
        md();
    }, 1000)
}







