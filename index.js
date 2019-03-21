var cartNum = 0, favNum = 0;
var favList = [];
function bindClick() {
    $('.wrap button').on('click', function () {
        var img = $(this).parent().find('img');
        var target = $(this);
        var btn = $(this).attr('class');
        var id = img.attr('data-id');
        var animateImg = img.clone();
        animateImg.css({
            'opacity': 0.6,
            'width': img.width() + 'px',
            'height': img.height() + 'px',
            'top': img.offset().top + 'px',
            'left': img.offset().left + 'px',
            'position': 'absolute',
            'border': '5px solid #fff'
        })
        if (btn == 'addcart') {
            $('.wrap').append(animateImg);
            animateImg.animate({
                'width': '50px',
                'height': '50px',
                'border-radius': '50%'
            }, 1000, function () {
                var t, l;
                l = $(document).width() - $('.rightnav').width() + 'px';
                t = $('.cart-num').offset().top + 'px';
                cartNum ++
                animateImg.animate({
                    'top': t,
                    'left': l,
                    'width': '0px',
                    'height': '0px'
                }, 1000, function () {
                    animateImg.remove();
                    $('.cart-num').html(cartNum)
                })

            })
        }else if(btn == 'addfav' || 'faved'){
            if($.inArray(id,favList) == -1){
                favNum ++;
                $('.fav-num').html(favNum);
                target.html('已收藏')
                favList.push(id);
                target.removeClass('addfav').addClass('faved');
            }else{
                favNum --;
                $('.fav-num').html(favNum);
                target.html('加入收藏夹')
                favList.splice($.inArray(id,favList),1);
                target.removeClass('faved').addClass('addfav');
            }
            // console.log(id,favList)
        }

    })
}
function hover() {
    $('.rightbox li').on('mouseenter', function () {
        $(this).find('.leftBox').show().animate({
            'left': -90 + 'px'
        });
        $(this).find('.fir-left-box').show();
        $(this).find('.sev-left-box').show();
    })
    $('.rightbox li').on('mouseleave', function () {
        $(this).find('.leftBox').hide().animate({
            'left': -121 + 'px'
        });
        $(this).find('.fir-left-box').hide();
        $(this).find('.sev-left-box').hide();
    })
}
bindClick()
hover()