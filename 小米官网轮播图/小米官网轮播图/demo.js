var nowIndex = 0;
var len = $('.picBox li').length;
var timer;
// 初始化入口函数
function init() {
    bindEvent();
    sliderAuto();
}
init();


function bindEvent() {
    // 按钮绑定事件
    $('.btn a').on('click', function () {
        var tar = $(this).attr('class');
        move(tar);
    });
    $('.list li').on('click', function () {
        var i = $(this).index();
        move(i);
    });
    // 鼠标移入移出
    $('.wrapper').on('mouseenter', function () {
        clearTimeout(timer);
    }).on('mouseleave', function () {
        sliderAuto();
    })
}
function sliderAuto() {
    clearTimeout(timer);
    timer = setTimeout(function () {
        move('right');
    }, 2000);
}

// 移动函数
function move(dir) {
    if (dir == 'right' || dir == 'left') {
        if (dir == 'right') {
            nowIndex++;
            nowIndex = nowIndex > len - 1 ? 0 : nowIndex;
            sliderAuto();
        } else {
            nowIndex--;
            nowIndex = nowIndex < 0 ? len - 1 : nowIndex;
        }
    } else {
        nowIndex = dir;
    }
    $('.picBox').css({
        'left': -nowIndex * 700 + 'px'
    });
    $('.picBox li').eq(nowIndex).animate({
        'opacity': 1
    }, 800);
    // 其他图片再将opacity变0
    $('.picBox li').not(nowIndex).css('opacity', 0);
    changeStyle();
}

// 切换选中小圆点
function changeStyle() {
    $('.active').removeClass('active');
    $('.list li').eq(nowIndex).addClass('active');
}