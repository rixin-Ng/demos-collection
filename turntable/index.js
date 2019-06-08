(function (win) {
    var defaultObjs = {
        turnNum: 8,
        tarDom: document.getElementsByTagName('body')[0],
        judgeFn: function () { }
    }


    function Lottery(par) {
        this.par = Object.assign(defaultObjs, par);
        this.par.lock = false;
        this.init();
    }
    Lottery.prototype.init = function () {
        var that = this;
        var btn = document.getElementsByClassName('btn')[0];
        btn.addEventListener('click', function () {
            var num = Math.floor(Math.random() * 360);
            if(!that.par.lock){
                that.rotateRun(num);
                that.par.lock = true;
            }
         
        })
        this.par.tarDom.addEventListener('transitionend',function(){
            that.par.judgeFn(that.par.num);
            that.par.tarDom.style.transform = 'rotate(' + that.par.num + 'deg)';
            that.par.tarDom.style.transition = 'none';
            that.par.lock = false;
        })

    }
    Lottery.prototype.rotateRun = function (num) {
        var deg = 360 * this.par.turnNum + num;
        this.par.tarDom.style.transform = 'rotate(' + deg + 'deg)';
        this.par.tarDom.style.transition = '3s';
        this.par.num = num;
    }
   
    win.lottery = Lottery;

}(window))