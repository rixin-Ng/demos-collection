var control = document.getElementsByClassName('control')[0];
var btnList = control.getElementsByTagName('input');
var img = document.getElementsByTagName('img')[0];
var timer = null;
var num = 0;
var speed = 10;
var stopImg = null;
control.addEventListener('click', function (e) {
    var e = e || window.event;
    var id = e.target.id;
    if (id.length > 0) {
        if (!timer && id == 'stop') {
            img.src = './images/down-0.png';
        } else if (id == 'stop') {
            clearInterval(timer);
            img.src = 'images/' + stopImg + '-' + 0 + '.png';
            return;
        } else {
            clearInterval(timer);
            stopImg = id;
            timer = setInterval(function () {
                img.src = '././images/' + id + '-' + num + '.png';
                num++;
                if (num == 4) {
                    num = 0;
                }
                switch (stopImg) {
                    case 'up':
                        img.style.top = img.offsetTop - speed + 'px';
                        break;
                    case 'down':
                        img.style.top = img.offsetTop + speed + 'px';
                        break;
                    case 'ld':
                        img.style.top = img.offsetTop + speed + 'px';
                        img.style.left = img.offsetLeft - speed + 'px';
                        break;
                    case 'left':
                        img.style.left = img.offsetLeft - speed + 'px';
                        break;
                    case 'lu':
                        img.style.top = img.offsetTop - speed + 'px';
                        img.style.left = img.offsetLeft - speed + 'px';
                        break;
                    case 'rd':
                        img.style.top = img.offsetTop + speed + 'px';
                        img.style.left = img.offsetLeft + speed + 'px';
                        break;
                    case 'right':
                        img.style.left = img.offsetLeft + speed + 'px';
                        break;
                    case 'rightUp':
                        img.style.top = img.offsetTop - speed + 'px';
                        img.style.left = img.offsetLeft + speed + 'px';
                        break;
                    case 'up':
                        img.style.top = img.offsetTop - speed + 'px';
                        break;

                }
                console.log(img.offsetLeft, img.style.left)

            }, 100)

        }
    }



})

