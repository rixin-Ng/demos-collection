var game = {
    init: function () {
        this.coordinate = [{ x: 130, y: 173 }, { x: 320, y: 171 }, { x: 515, y: 175 }, { x: 105, y: 265 }, { x: 320, y: 256 }, { x: 522, y: 256 }, { x: 96, y: 350 }, { x: 320, y: 355 }, { x: 540, y: 358 }];//洞口坐标
        this.cave = [];
        this.mouse = new Array(9);
        this.maxMouse = 1;
        this.live = 10;
        this.score = 0;
        this.bindEvent();
        var that = this;
        var gameTimer = setInterval(function () {
            that.controlMouse();
            document.getElementsByClassName('scoreNum')[0].innerHTML = that.score;
            document.getElementsByClassName('liveNum')[0].innerHTML = that.live;
            if (that.live <0) {
                clearInterval(gameTimer);
                alert('游戏结束：得分：' + that.score);
                document.getElementsByClassName('liveNum')[0].innerHTML = 0;
            }
            that.maxMouse = that.score / 100 + 1 ;
        }, 50)

        // this.createMouse();
        this.createCave();
    },
    bindEvent: function () {
        var bg = document.getElementsByClassName('bg')[0];
        window.onload = function () {
            bg.onmousedown = function () {
                bg.style.cursor = 'url("./images/hammer2.png"), auto'
            };
            bg.onmouseup = function () {
                bg.style.cursor = 'url("./images/hammer.png"), auto'
            };
        }

    },
    createCave: function () {
        var that = this;
        var bg = document.getElementsByClassName('bg')[0];
        for (var i = 0; i < this.coordinate.length; i++) {
            var temp = document.createElement('div');
            temp.classList.add('cave');
            temp.style.left = this.coordinate[i].x + 'px';
            temp.style.top = this.coordinate[i].y + 'px';
            var img = document.createElement('img');
            img.classList.add('cave');
            img.style.background = 'url("./images/mask'+i+'.png")';
            img.style.border ='none';
            img.style.zIndex = i + 1;
            temp.appendChild(img);
            this.cave[i] = temp;
            bg.appendChild(temp);
            temp.index = i;
            temp.onclick = function(){
                that.disappear(this.index,true)
            }
        }
    },
    controlMouse: function () {
        var num = Math.floor(Math.random() * 9);
        if (this.mouse.filter(function (item) {
            return item
        }).length < this.maxMouse && this.mouse[num] == null) {
            this.createMouse(num);
        }

    },
    createMouse: function (i) {
        var that = this;
        var num = Math.floor(Math.random() * 4);
        var temp = document.createElement('div');
        temp.num = num;
        temp.classList.add('mouse');
        temp.style.background = 'url("./images/mouse' + num +'.png")';
        temp.style.zIndex = i;
        temp.style.animation = 'moveTop 0.5s linear'
        this.mouse[i] = temp;
        this.cave[i].appendChild(temp);
        var timer = setTimeout(function(){
            that.disappear(i,false)
        },2000)
        temp.timer = timer;
    },
    disappear: function(i,isHit){
        var that = this;
        if(this.mouse[i]){
            this.mouse[i].style.top = '70px';
            if(isHit){
                this.score +=10;
                var bomp = document.createElement('img');
                bomp.classList.add('mouse');
                bomp.src =  "./images/bomb.gif";
                bomp.style.top = '-40px';
                this.mouse[i].style.background = 'url("./images/hit'+ this.mouse[i].num +'.png")';
                this.mouse[i].appendChild(bomp);
                clearTimeout(this.mouse[i].timer);  
            }else{
                this.live -= 1;
            }
            setTimeout(function(){
                if(that.mouse[i]){
                    that.cave[i].removeChild(that.mouse[i]);
                }
                that.mouse[i] = null;
            },500);
        
        }
    }

}
game.init();