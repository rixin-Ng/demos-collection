function createImg(obj, imgWidth = 200) {
    var wrap = obj.wrap;
    var imgSrc = obj.imgSrc;
    var imgArr = [];
    var gap, col;
    var timer = null;
    // console.log()
    addImg();
    // setPosition();
   
    window.addEventListener('resize',function(){
        if(timer){
            clearInterval(timer);
        }
        timer = setInterval(function(){
            setPosition()
        },500)
    })
    function addImg() {
        for (var i = 0; i < imgSrc.length; i++) {
            var img = new Image();
            img.src = imgSrc[i];
            img.style.position = 'absolute';
            img.style.width = imgWidth + 'px';
            img.addEventListener('load',function(){
                setPosition()
            })
            wrap.appendChild(img);
            imgArr.push(img);
        }
    }
    function setPosition() {
        col = Math.floor(wrap.clientWidth / imgWidth);
        gap = Math.floor(wrap.clientWidth - col * imgWidth) / (col - 1);
        var YPos = new Array(col);
        YPos.fill(0);
        for (var i = 0; i < imgArr.length; i++) {
            var img = imgArr[i];
            var y = Math.min(...YPos);
            var curIndex = YPos.indexOf(y);
            img.style.top = y + 'px';
            img.style.left = (curIndex * imgWidth + gap * curIndex) + 'px';
            YPos[curIndex] += Math.floor(img.height) + gap;
        }
        wrap.style.height = Math.max(...YPos) + 'px';

    }
}