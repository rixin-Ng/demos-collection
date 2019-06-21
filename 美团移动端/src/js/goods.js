// import '../css/reset.css';
// import '../webfont/iconfont.css';
// import '../css/meituanDetail.css';

function getId() {
    var oId = '';
    var idStr = window.location.search.slice(1).split('&');
    idStr.forEach(function (ele, index) {
        if (ele.indexOf('id') !== -1) {
            oId = ele.slice(3);
        }
    })
    return oId;
}

getData();
function getData() {
    $.ajax({
        type: 'GET',
        url: 'http://localhost/pj/api/list.json',
        success: getGood,
        error: function () {
            console.log('error');
        }
    })
};

function getGood(data) {
    var dataList = data.list;
    var num = getId();
    console.log(num);
    var len = dataList.length;
    for (var i = 0; i < len; i++) {
        if (dataList[i].id === num) {
            addDom(dataList[i]);
            return;
        }
    }
}

function addDom(dataList) {
    var str = '';
    var info = dataList.info;
    $('.bigimg').find('img').attr('src', info.imgurl);
    $('.bigimg').find('.name').text(info.name);
    $('.bigimg').find('.des').text(info.des);
    $('.price-box .price').find('strong').text(info.price);
    $('.seller .address').find('h4').text(info.receive);
    $('.seller .address').find('p').text(info.adderess);
    var comment = info.comment;
    comment.forEach(function (ele, index) {
        str += '<li class="item-evaluate">\
					<div class="foot-user clearfix">\
						<img src="'+ ele.pic + '" alt="">\
						<div class="user-strart">\
							<h5>'+ ele.user + '</h5></div>\
						<p class="evaluate-date">'+ ele.date + '</p></div>\
					<div class="evaluate-content">\
						<p>'+ ele.content + '</p>\
						<p><span><img src="'+ ele.img + '" alt="">\
							<span><img src="'+ ele.img + '" alt=""></span></p></div>\
					<div class="locale"><a href="###">'+ info.receive + '</a></div></li> ';

    })

    $('.food-evaluate').find('ul').html(str);

}