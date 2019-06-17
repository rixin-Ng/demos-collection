var logoBtn = document.getElementsByClassName('logoBtn')[0];
var mask = document.getElementsByClassName('mask')[0];
var close = document.getElementsByClassName('close')[0];
var numBtn = document.getElementsByTagName('button')[0];
var ul = document.getElementsByTagName('ul')[0];
var numList = [];
var minNum = null;
var index = 0;
logoBtn.addEventListener('click', function () {
    mask.style.display = 'block';
})
close.onclick = function () {
    mask.style.display = 'none';
}
numBtn.addEventListener('mousedown', createNum);
window.addEventListener('keydown',function(e){
    var e = e || window.event;
    if(e.keyCode == '32'){
        createNum()
    }
})
window.addEventListener('keyup',function(e){
    var e = e || window.event;
    if(e.keyCode == '32'){
        numBtn.style.backgroundPosition = '0 0';
    }
})
function createNum(){
        numBtn.style.backgroundPosition = '0 -68px';
        var num = Math.floor(Math.random() * 100);
        if(num == minNum){
            arguments.callee();
        }
        numList.push(num);
        minNum = min(numList);
        // console.log(numList, index,minNum)
        if (numList.length > 12) {
            if (index == 0 && num > minNum) {
                numList.splice(1, 1);
            }else{
                numList.splice(0,1);
            }
        }
        index = numList.indexOf(minNum);
        createLi(numList, index);
}
function min(arr) {
    var miniNum = arr[0];
    for (var i = 0; i < arr.length; i++) {
        if (arr[i] < miniNum) {
            miniNum = arr[i];
        }
    }
    return miniNum;
}
function createLi(arr, index) {
    var liStr = '';
    ul.innerHTML = '';
    var len = arr.length;
    for (var i = 0; i < len; i++) {
        liStr += '<li>扔出一个' + arr[i] + '</li>'
    }
    ul.innerHTML = liStr;
    ul.getElementsByTagName('li')[index].className = 'active';
}
numBtn.addEventListener('mouseup', function () {
    numBtn.style.backgroundPosition = '0 0px';
})