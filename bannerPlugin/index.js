function bannerPlugin(obj) {
    var opts = obj;
    var father = opts.dom;
    var bannerItem = opts.item;
    var index = 0;
    var bannerArea = document.createElement('div');
    var dotArea = document.createElement('div');
    var autoTimer = null;
    var timer = null;
    //每隔3000ms调用一次move
    var duration = 3000;
    var fps = 60;
    createBannerArea();
    createDotArea();
    move(0);
    autoMove();
    father.addEventListener('mouseenter', function () {
        clearInterval(autoTimer);
        autoTimer = null;
    })
    father.addEventListener('mouseout', function () {
        autoMove()
    })
    father.appendChild(bannerArea);
    father.appendChild(dotArea)
    //显示banner区域
    function createBannerArea() {
        bannerArea.style.width = "100%";
        bannerArea.style.height = "100%";
        bannerArea.style.display = "flex";
        bannerArea.style.overflow = "hidden";
        for (let item of bannerItem) {
            var img = document.createElement('img');
            img.src = item.url;
            img.style.width = "100%";
            img.style.height = "100%";
            img.style.marginLeft = "0";
            img.style.cursor = "pointer";
            bannerArea.appendChild(img);
            img.addEventListener('click', function () {
                if (item.link) {
                    location.href = item.link;
                }
            })

        }
    }
    function createDotArea() {
        dotArea.style.marginTop = '-30px';
        dotArea.style.textAlign = 'center';
        for (var i = 0; i < bannerItem.length; i++) {
            var span = document.createElement('span');
            span.style.display = 'inline-block';
            span.style.width = '15px';
            span.style.height = '15px';
            span.style.margin = '0 5px';
            span.style.backgroundColor = '#d3d3d3';
            span.style.borderRadius = '50%';
            span.style.cursor = 'pointer';
            dotArea.appendChild(span);
            (function (index) {
                span.addEventListener('click', function () {
                    move(index)
                })
            }(i))

        }
    }
    function move(nowIndex) {
        index = nowIndex;
        for (var i = 0; i < bannerItem.length; i++) {
            var oSpan = dotArea.children[i];
            if (index == i) {
                oSpan.style.backgroundColor = '#be926f';
            } else {
                oSpan.style.backgroundColor = '#d3d3d3';
            }
        }
        var tarMarLeft = index * -100;
        var curMarLeft = parseInt(bannerArea.children[0].style.marginLeft);
        var distance = tarMarLeft - curMarLeft;
        if (distance == 0) {
            return;
        }
        var rate = 1000 / fps;
        var dur = 500;
        //500ms实现一张图片的轮播
        var speed = distance * rate / dur;
        if (timer) {
            clearInterval(timer);
        }
        timer = setInterval(function () {
            curMarLeft += speed;
            bannerArea.children[0].style.marginLeft = curMarLeft + '%';
            if (Math.abs(tarMarLeft - curMarLeft) < 1) {
                clearInterval(timer);
                timer = null;
                bannerArea.children[0].style.marginLeft = tarMarLeft + '%';
            }
        }, rate)
    }
    function autoMove() {
        clearInterval(autoTimer);
        autoTimer = setInterval(function () {
            if (index == bannerItem.length - 1) {
                move(0)
            } else {
                move(index + 1);
            }
        }, duration)
    }



}
