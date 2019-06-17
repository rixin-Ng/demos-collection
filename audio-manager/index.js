var audioManager = {
    moon: document.getElementsByClassName('moon')[0],
    sun: document.getElementsByClassName('sun')[0],
    dis: 0,
    flag: false,
    init: function () {
        this.bindEvent()
    },
    bindEvent: function () {
        var self = this;
        this.moon.addEventListener('mousedown', this.mouseDown.bind(self))
    },
    mouseDown: function (e) {
        var self = this;
        self.flag = true;
        self.dis = e.clientX - self.moon.offsetLeft;
        document.addEventListener('mousemove', this.mouseMove.bind(self))
    },
    mouseMove: function (e) {
        var self = this;
        if (!self.flag) {
            return;
        }
        if (parseInt(self.moon.style.left) > window.innerWidth - 200) {
            self.moon.style.left = window.innerWidth - 200 + 'px';
        } else {
            self.moon.style.left = e.clientX - self.dis + 'px';
        }
        document.addEventListener('mouseup', this.mouseUp.bind(self))
        this.changeVol()
    },
    mouseUp: function (e) {
        var self = this;
        self.flag = false;

    },
    changeVol: function () {
        var d = this.sun.clientWidth;
        var sunL = this.sun.offsetLeft;
        var sunR = this.sun.offsetLeft + d;
        var moonL = this.moon.offsetLeft;
        var moonR = this.moon.offsetLeft + d;
        var p = 0
        if (sunL > moonR || sunR < moonL) {
            //圆相离
            per = 0;
        } else {
            //圆相交
            if (sunL < moonL) {
                // 从右向左运动 sunR - moonL 计算出覆盖的水平距离  moonl 越来越小计算值越来越大
                per = (sunR - moonL) / d;
                // 从左向右运动  越来越大的moonR - 不动的sunL  覆盖水平距离越来越大 最后结果越来越大
            } else if (moonR >= sunL) {
                per = (moonR - sunL) / d;
            }
        }
        this.controlAudio(per)
    },
    controlAudio: function (vol) {
        var audio = document.getElementsByTagName('audio')[0];
        var percent = document.getElementsByClassName('percent')[0];
        vol > 0 ? audio.play() : audio.pause();
        audio.volume = vol;
        var str = "Volume: " + (vol * 100).toPrecision(4) + "%";
        percent.innerText = str;
        this.moon.style.background = 'hsl(190,50%,' + (1 - vol) * 50 + "%)";
        document.body.style.background = 'hsl(' + (190 + Math.floor(160 * vol)) + ',50%,' + (1 - vol) * 50 + "%)";
    }
}


audioManager.init()