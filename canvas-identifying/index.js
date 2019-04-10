(function () {
    var arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    var value = "";
    var str = "";
    for (var i = 65; i < 123; i++) {
        if (i > 90 && i < 97) {
            continue;
        }
        arr.push(String.fromCharCode(i));
    }
    init();
    function init() {
        refreshCode();
        bindEvent();
    }

    function refreshCode() {
        str = '';
        value = '';
        var len = arr.length;
        for (var i = 0; i < 6; i++) {
            var text = arr[Math.floor(Math.random() * len)];
            str += text + ' ';
            value += text;
        }
        var canvas = $('#canvas')[0];
        canvas.width = '260';
        canvas.height = '60'
        var ctx = canvas.getContext('2d');
        ctx.beginPath();
        ctx.clearRect(0,0,canvas.width,canvas.height);
        ctx.strokeStyle = '#cccccc';
        ctx.lineWidth = 15;
        ctx.moveTo(Math.floor(Math.random() * 50),10 + Math.floor(Math.random() * 40));
        ctx.lineTo(210 + Math.floor(Math.random() * 50), 10 + Math.floor(Math.random() * 40));
        ctx.globalCompositeOperation = "xor";
        ctx.stroke();
        ctx.closePath();

        ctx.beginPath();
        ctx.font = '40px Helvetica';
        ctx.fillStyle = '#cccccc';
        ctx.setTransform(1, -0.12, 0.2, 1, 0, 12);
        ctx.fillText(str,30,50);
        // $('#code span').text(str);
    }
    function bindEvent() {
        $('.submit').on('click', function () {
            var val = $('input').val();
            console.log(val, value);
            if (val == '' || val == undefined || val == null) {
                $('.prompt').show().html('请输入内容');
                $('.icon').css({
                    'background': "url('./images/false.png')",
                    'background-size': '100%',
                    'display': 'inline-block'
                });
            } else {
                if (val == value) {
                    $('.icon').css({
                        'background': "url('./images/true.png')",
                        'background-size': '100%',
                        'display': 'inline-block'
                    });
                    refreshCode();
                } else {
                    $('.prompt').show().html('验证码错误，请重新输入')
                    $('.icon').css({
                        'background': "url('./images/false.png')",
                        'background-size': '100%',
                        'display': 'inline-block'
                    });
                }
            }
        })
        $('.refresh').on('click', function () {
            refreshCode();
        })
        $('input').on('focus', function () {
            $('.icon').add('.prompt').fadeOut(100);
        })
    }






}())