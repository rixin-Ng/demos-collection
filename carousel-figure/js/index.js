//自动轮播，点击左右按钮、图片序列》点击切换图片》改变ul的left，同时改变图片

//初始化
var wrapper = document.getElementsByClassName('wrapper')[0];
var imgBox = document.getElementsByClassName('img-box')[0];
var btnPrev = document.getElementsByClassName('prev')[0];
var btnNext = document.getElementsByClassName('next')[0];
var index = 0;
var len = imgBox.children.length - 1;
var itemWidth = imgBox.children[0].offsetWidth;
var timer = null;
var flag = true;
var out = true;
var oLiArray = document.getElementsByClassName('order')[0].getElementsByTagName('li');

//绑定事件
btnPrev.onclick = function () {
	direction('prev');
}
btnNext.onclick = function () {
	direction('next');
}
wrapper.onmouseover = function () {
	out = false;
}
wrapper.onmouseout = function () {
	out = true;
	timer = setTimeout(autoMove, 1000);
}

//图片自动轮播
function autoMove(dir) {
	if (out) {
		direction(dir);
		timer = setTimeout(autoMove, 1000);
	} else {
		clearTimeout(timer);
	}
}
function direction(dir) {
	if (flag) {
		clearTimeout(timer);
		flag = false;
		if (!dir || dir == 'next') {
			startMove(imgBox, { left: imgBox.offsetLeft - itemWidth }, function () {
				index++;
				if (imgBox.offsetLeft == -len * itemWidth) {
					imgBox.style.left = '0px';
					index = 0;
				}
				changeIndex(index);
				flag = true;

			})
		} else if (dir == 'prev') {
			if (imgBox.offsetLeft == 0) {
				imgBox.style.left = -len * itemWidth + 'px';
				index = len;
			}
			index--;
			changeIndex(index);
			startMove(imgBox, { left: imgBox.offsetLeft + itemWidth }, function () {

				flag = true;

			})
		}

	}

}
timer = setTimeout(autoMove, 1000);

//切换小圆点class类名
function changeIndex(nowIndex) {
	for (var i = 0; i < oLiArray.length; i++) {
		oLiArray[i].className = "";
	}
	oLiArray[nowIndex].className = 'active';
}

for (var i = 0; i < oLiArray.length; i++) {
	(function (oindex) {
		oLiArray[i].onclick = function () {
			flag = false;
			clearTimeout(timer);
			index = oindex;
			changeIndex(index);
			startMove(imgBox, { left: -oindex * itemWidth }, function () {
				timer = setTimeout(autoMove, 300);
				flag = true;

			})
		}
	}(i))
}










