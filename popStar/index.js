//生成小块 n * n 二维数组，把小块放进页面，渲染小块样式
//绑定事件、点击、悬浮
//悬浮-->检查相连小块 -->相连小块数目连续>2块闪烁（先样式还原） -->计算分数并显示
//点击-->计算分数并显示-->清除小块-->小块位置变化掉落，合并-->判断是否达到目标分数

var wrap = document.getElementsByClassName('wrap')[0];
var tarScore = document.getElementsByClassName('targetScore')[0]
var currentScore = document.getElementsByClassName('selectScore')[0];
var nowScore = document.getElementsByClassName('nowScore')[0];
console.log()
var borderLength = 10;
var squareWidth = 50;
var squareInit = [];
var choose = [];
var targetScore = 2000;
var timer = null;
var selScore = 0;
var baseScore = 5;
var stepScore = 10;
var curScore = 0;
var allScore = 0;
var flag = true;
var tempObj = null;

function isFinish() {
    var result = true;
    for (var i = 0; i < borderLength; i++) {
        for (var j = 0; j < borderLength; j++) {
            var choose = [];
            chooseList(squareInit[i][j],choose);
            if(choose.length > 1){
                result = false;
            }
        }
    }
    return result;
}
function drop() {
    for (var i = 0; i < borderLength; i++) {
        var point = 0;
        for (var j = 0; j < borderLength; j++) {
            if (squareInit[j][i] != null) {
                if (point != j) {
                    squareInit[point][i] = squareInit[j][i];
                    squareInit[j][i].row = point;
                    squareInit[j][i] = null;
                }
                point++;
            }
        }
    }
    for (var i = 0; i < squareInit[0].length;) {
        if (squareInit[0][i] == null) {
            for (var j = 0; j < borderLength; j++) {
                squareInit[j].splice(i, 1);
            }
            continue;
        }
        i++;
    }
    styleSquare()
}
function selectScore() {
    var len = choose.length;
    selScore = 0;
    for (var i = 0; i < len; i++) {
        selScore += baseScore + (i * stepScore);
    }
    if (selScore == 0) {
        return;
    }
    currentScore.innerHTML = len + '块' + selScore + '分';
    currentScore.style.opacity = '1';
    currentScore.style.transition = 'none';
    setTimeout(function () {
        currentScore.style.opacity = '0';
        currentScore.style.transition = 'opacity 1s';
    }, 1000)
}
function stopFlicker() {
    if (timer) {
        clearInterval(timer);
    }
    for (var i = 0; i < squareInit.length; i++) {
        for (var j = 0; j < squareInit[i].length; j++) {
            if (squareInit[i][j] == null) {
                continue;
            }
            squareInit[i][j].style.border = "none";
            squareInit[i][j].style.transform = "scale(0.95)";
        }
    }
}
function flicker(list) {
    var num = 0;
    timer = setInterval(function () {
        for (var i = 0; i < list.length; i++) {
            list[i].style.border = "3px solid #BFEFFF";
            list[i].style.transform = "scale(" + (0.90 + 0.05 * Math.pow(-1, num)) + ")";
        }
        num++;
    }, 300);
}
function chooseList(square, list) {
    if (square == null) {
        return;
    }
    list.push(square);
    //左边
    if (square.col > 0 && squareInit[square.row][square.col - 1] && squareInit[square.row][square.col - 1].bgColor == square.bgColor && list.indexOf(squareInit[square.row][square.col - 1]) == -1) {
        chooseList(squareInit[square.row][square.col - 1], list);
    }
    //右边
    if (square.col < borderLength - 1 && squareInit[square.row][square.col + 1] && squareInit[square.row][square.col + 1].bgColor == square.bgColor && list.indexOf(squareInit[square.row][square.col + 1]) == -1) {
        chooseList(squareInit[square.row][square.col + 1], list);
    }
    //上面
    if (square.row < borderLength - 1 && squareInit[square.row + 1][square.col] && squareInit[square.row + 1][square.col].bgColor == square.bgColor && list.indexOf(squareInit[square.row + 1][square.col]) == -1) {
        chooseList(squareInit[square.row + 1][square.col], list);
    }
    //下面
    if (square.row > 0 && squareInit[square.row - 1][square.col] && squareInit[square.row - 1][square.col].bgColor == square.bgColor && list.indexOf(squareInit[square.row - 1][square.col]) == -1) {
        chooseList(squareInit[square.row - 1][square.col], list);
    }
    // console.log(list);
}

function styleSquare() {
    for (var i = 0; i < squareInit.length; i++) {
        for (var j = 0; j < squareInit[i].length; j++) {
            if (squareInit[i][j] == null) {
                continue;
            }
            squareInit[i][j].row = i;
            squareInit[i][j].col = j;
            squareInit[i][j].style.left = squareInit[i][j].col * squareWidth + "px";
            squareInit[i][j].style.bottom = squareInit[i][j].row * squareWidth + "px";
            squareInit[i][j].style.backgroundImage = "url('./pic/" + squareInit[i][j].bgColor + ".png')";
            squareInit[i][j].style.backgroundSize = "cover";
            squareInit[i][j].style.transform = "scale(0.95)";

        }
    }
}
function createSquare(bg, row, col) {
    var temp = document.createElement("div");
    temp.style.width = squareWidth + "px";
    temp.style.height = squareWidth + "px";
    temp.style.display = "inline-block";
    temp.style.position = "absolute";
    temp.style.boxSizing = "border-box";
    temp.style.borderRadius = "12px";
    temp.bgColor = bg;
    temp.row = row;
    temp.col = col;
    return temp;
}
function mouseOver(obj) {
    if (!flag) {
        tempObj = obj;
        return;
    }
    stopFlicker();
    choose = [];
    chooseList(obj, choose);
    if (choose.length <= 1) {
        choose = [];
        return;
    }
    flicker(choose);
    selectScore();
}
function init() {
    tarScore.innerHTML = "目标分数：" + targetScore;
    nowScore.innerHTML = "当前分数：" + curScore;
    for (var i = 0; i < borderLength; i++) {
        squareInit[i] = new Array();
        for (var j = 0; j < borderLength; j++) {
            var square = createSquare(Math.floor(Math.random() * 5), i, j);
            squareInit[i][j] = square;
            wrap.appendChild(square);
            squareInit[i][j].onmouseover = function () {
                mouseOver(this);
            }
            squareInit[i][j].onclick = function () {
                var len = choose.length;
                if (!flag || len == 0) {
                    return;
                }
                flag = false;
                tempObj = null;
                for (var i = 0; i < len; i++) {
                    curScore += baseScore + (i * stepScore);
                }
                nowScore.innerHTML = "当前分数：" + curScore;
                for (var i = 0; i < len; i++) {
                    (function (j) {
                        setTimeout(function () {
                            squareInit[choose[j].row][choose[j].col] = null;
                            wrap.removeChild(choose[j]);
                        }, j * 100)
                    }(i))

                }
                setTimeout(function () {
                    drop();
                    setTimeout(function () {
                        var finish = isFinish();
                        if (finish) {
                            if (targetScore <= curScore) {
                                alert('恭喜获胜')
                            } else {
                                alert('游戏失败')
                            }
                        } else {
                            choose = [];
                            flag = true;
                            mouseOver(tempObj);
                        }
                    }, len * 200)
                }, len * 100)


            }
        }
    }
    styleSquare();

}

window.onload = function () {
    init()
}