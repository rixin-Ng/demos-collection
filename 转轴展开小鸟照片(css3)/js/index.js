var  wrap = $('.wrap');
setTimeout(function(){
    wrap.removeClass('init');
},200);
$('.item').on('click',function(){
    $(this).addClass('active');
    wrap.addClass('wrap-active');
})
$('.close').on('click',function(e){
    e.stopPropagation();
       $('.item').removeClass('active');
    wrap.removeClass('wrap-active');
})