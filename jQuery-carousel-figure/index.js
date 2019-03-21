(function ($) {
    function Slider(ele, opt) {
        var def = {
            curIndex: 0,
            autoPlay: false,
            interval: 2000
        }
        this.options = $.extend({}, def, opt);
        this.wrap = ele;
        this.curIndex = this.options.curIndex;
        this.autoPlay = this.options.autoPlay;
        this.interval = this.options.interval;
        this.$img = this.wrap.find('img');
        this.len = this.$img.length;
        this.nowIndex = 0;
        this.timer = null;
        this.init();
    }
    Slider.prototype.init = function () {
        this.bindClick();
        this.initMove();
    }
    Slider.prototype.bindClick = function () {
        var self = this;
        self.$img.on('click', function () {
            self.nowIndex = $(this).index();
            self.moving(self.nowIndex);
        }).hover(function () {
            clearInterval(self.timer);
        }, function () {
            self.timer = setInterval(function () {
                self.auPlay();
            }, self.interval)
        });
        this.timer = setInterval(function () {
            self.auPlay();
        }, this.interval)
    }
    //把图片分散
    Slider.prototype.initMove = function () {
        var rlen, llen;
        var midIndex = Math.floor(this.len / 2);
        for (var i = 0; i < midIndex; i++) {
            llen = this.curIndex - i - 1;
            this.$img.eq(llen).css({
                transform: 'translateX(' + (-150 * (i + 1)) + 'px) translateZ(' + (100 - i * 100) + 'px) rotateY(30deg)'
            })
            rlen = this.curIndex + i + 1;
            if (rlen > this.len - 1) {
                rlen -= this.len;
            }
            this.$img.eq(rlen).css({
                transform: 'translateX(' + (150 * (i + 1)) + 'px) translateZ(' + (100 - i * 100) + 'px) rotateY(-30deg)'
            })
        }
        this.$img.eq(this.curIndex).css({
            transform: 'translateZ(200px)'
        })

    }
    Slider.prototype.auPlay = function () {
        if (this.autoPlay) {
            if (this.nowIndex == this.len - 1) {
                this.nowIndex = 0;
            } else {
                this.nowIndex++;
            }
            this.moving(this.nowIndex);
        }
    }
    Slider.prototype.moving = function (index) {
        this.curIndex = index;
        // console.log(this.curIndex);
        this.initMove();
    }
    $.fn.extend({
        slider: function (options) {
            new Slider(this, options);
        }
    })
}(jQuery))