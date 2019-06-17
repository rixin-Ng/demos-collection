var cell = document.querySelector('.cell');
var turntable = document.querySelector('.turntable');
var init = document.querySelector('.init');
var icon = document.querySelector('.icon');
var num = '';
function addImg() {
    var target = Math.floor(Math.random() * 16);
    for (var i = 0; i < 100; i++) {
        if (i % 9 == 0) {
            num = target;
        } else {
            num = Math.floor(Math.random() * 16);
        }
        cell.innerHTML += ` <div class="item">
        <span class="num">${i}</span>
        <span class="val"><img src="./img/values/${num}.png" alt=""></span>
    </div>`
    }
}
turntable.onclick = function(e){
    console.log(e.currentTarget)
    e.currentTarget.style.transition = "all 2s cubic-bezier(0.1, 0.68, 0.53, 0.98)";
    e.currentTarget.style.transform = "rotate(1800deg)";
}
turntable.addEventListener('transitionend',function(e){
    e.currentTarget.style.transition = 'none';
    init.style.opacity = 0;
    icon.src = `./img/values/${num}.png`;
    icon.style.opacity = 1;
})
addImg();
