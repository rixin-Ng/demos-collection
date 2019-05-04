//创建矩阵，初始化棋盘，初始化棋子
//棋子绑定事件，游戏是否结束-->是否连成5子
(function () {
    var grid;
    var gridLength = 15;
    var gridwidth = 50;
    var board = document.getElementsByClassName('board')[0];
    var count = 0;
    var lock = false;

    function checkLine(x, y) {
        //横向 纵向 斜上 斜下
        var result1 = 3, result2 = 3, result3 = 3, result4 = 3;
        for (var i = 0; i < 5; i++) {
            // 按位与
            result1 &= y + i > 14 ? 0 : grid[x][y + i].value;//判断横向五子
            result2 &= x + i > 14 ? 0 : grid[x + i][y].value;//判断纵向五子
            result3 &= x + i > 14 || y - i < 0 ? 0 : grid[x + i][y - i].value;//判断斜上五子
            result4 &= x + i > 14 || y + i > 14 ? 0 : grid[x + i][y + i].value;//判断斜下五子
        }
        // 按位或
        return result1 || result2 || result3 || result4;
    }
    function gameFinish() {
        for (var i = 0 ; i < grid.length ; i ++) {
            for (var j = 0 ; j < grid[i].length ; j ++) {
                if (grid[i][j].value == 0) {
                    continue;
                }
                var result = checkLine(i, j);
                if (result > 0) {
                    return result;
                }
            }
        }
        return 0;
    }
    function createGrid(x, y) {
        var temp = document.createElement('div');
        temp.classList.add('grid');
        // temp.style.backgroundImage = 'url(./img/1.png)';
        temp.style.top = (7 + y * gridwidth) + 'px';
        temp.style.left = (7 + x * gridwidth) + 'px';
        temp.i = x;
        temp.j = y;
        temp.value = 0;
        return temp;
    }
    function init() {
        grid = new Array(gridLength);
        var len = grid.length;
        for (var i = 0; i < len; i++) {
            grid[i] = new Array(gridLength);
            for (var j = 0; j < grid[i].length; j++) {
                grid[i][j] = createGrid(i, j);
                grid[i][j].onclick = function () {
                    if (this.value > 0 || lock) {
                        return;
                    }
                    block = true;
                    this.style.backgroundImage = 'url(./img/' + (count % 2 + 1) + '.png)';
                    this.value = count % 2 + 1;
                    count += 1;
                    var result = gameFinish();
                    // gameFinish();
                    // console.log(gameFinish())
                    if (result != 0) {
                        lock = true;
                        setTimeout(function () {
                            alert(result == 1 ? "黑棋胜" : "白棋胜");
                        }, 1000)
                    }else{
                        block = false;
                    }
                }
                board.appendChild(grid[i][j]);

            }
        }
    }
    document.addEventListener('DOMContentLoaded', init)
}())