var ground;
var coordinate = [{ x: 130, y: 173 }, { x: 320, y: 171 }, { x: 515, y: 175 }, { x: 105, y: 265 }, { x: 320, y: 256 }, { x: 522, y: 256 }, { x: 96, y: 350 }, { x: 320, y: 355 }, { x: 540, y: 358 }];//洞口坐标
var gametimer;
var mask = [];
var mouse = new Array(9);
var maxCount = 2;
var score = 0;
var life = 10;
window.onload = function () {
    ground = document.getElementsByClassName('bg')[0];
    ground.onmousedown = function () {
        ground.style.cursor = 'url("./images/hammer2.png"), auto'
    };
    ground.onmouseup = function () {
        ground.style.cursor = 'url("./images/hammer.png"), auto'
    };
    init();
}

function init() {
    createMask();
    gameTimer = setInterval(function () {
        controlMouse()
        if (life < 1) {
            clearInterval(gameTimer);
            alert('游戏结束：得分：' + score)
        }else{
            document.getElementsByClassName('scoreNum')[0].innerHTML = score;
            document.getElementsByClassName('lifeNum')[0].innerHTML = life;
            maxCount = score / 100 + 1;
        }
    }, 50)
}

function createMask() {
    for (var i = 0; i < coordinate.length; i++) {
        var temp = document.createElement('div');
        temp.classList.add('cave');
        temp.style.left = coordinate[i].x + 'px';
        temp.style.top = coordinate[i].y + 'px';
        var img = document.createElement('div');
        img.classList.add('cave');
        img.style.background = 'url("./images/mask' + i + '.png")';
        img.style.zIndex = i * 2 + 1;
        mask[i] = temp;
        temp.appendChild(img);
        ground.appendChild(temp);
        temp.index = i;
        temp.onclick = function () {
            disappear(this.index, true);
        }
    }
}

// 创建地鼠
function createMouse(i) {
    var num = Math.floor(Math.random() * 4);
    mouse[i] = num;
    var temp = document.createElement('div');
    temp.classList.add('mouse');
    temp.style.background = 'url("./images/mouse' + num + '.png")';
    mouse[i] = temp;
    temp.style.zIndex = i * 2;
    temp.style.animation = "moveTop 0.5s linear";
    mask[i].appendChild(temp);
    var timer = setTimeout(function () {
        disappear(i, false);
    }, 2000);
    temp.timer = timer;
}
// 控制地鼠的数量和位置
function controlMouse() {
    var num = Math.floor(Math.random() * 9);
    if (mouse.filter(function (item) {
        return item;
        // 限制出现的最大数和出现的位置
    }).length < maxCount && mouse[num] == null) {
        createMouse(num);
    }
}

// 消失函数
function disappear(i, isHit) {
    if (mouse[i]) {
        mouse[i].style.top = '70px';
        if (isHit) {
            score += 10;
            var bomp = document.createElement('img');
            bomp.classList.add('mouse');
            bomp.style.top = '-40px';
            bomp.src = "./images/bomb.gif";
            mouse[i].style.backgorund = 'url("./images/hit' + mouse[i].num + '")';
            mouse[i].appendChild(bomp);
            clearTimeout(mouse[i].timer);
        } else {
            life -= 1;
            if(life < 1){
                document.getElementsByClassName('lifeNum')[0].innerHTML = '0';
            }
        }
        setTimeout(function () {
            if (mouse[i]) {
                mask[i].removeChild(mouse[i]);
            }
            mouse[i] = null;
        }, 500);
    }
}