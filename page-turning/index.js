
(function ($) {
    function init(dom, args) {
        if (args.currentPage > args.pageCount) {
            alert('请输入正确的页数')
        } else {
            createDom(dom, args);
            bindEvent(dom, args);
        }
    }
    function createDom(dom, args) {
        dom.empty();
        //上一页
        if(args.currentPage > 1){
            dom.append('<a href="#" class="prePage" >上一页</a>')
        }else{
            dom.remove('prePage');
            dom.append('<span class="disabled">上一页</span>');
        }
        //1
        if(args.pageCount != 4 && args.currentPage >= 4){
            dom.append('<a href="#" class="sNum" >1</a>')
        }
        //...
        if(args.currentPage - 2 > 2 && args.pageCount > 5 &&  args.currentPage <= args.pageCount){
            dom.append('<span class="dot" >...</span>')
        }
        //中间5个数
        var start = args.currentPage - 2;
        var end = args.currentPage + 2;
        for(; start <= end ; start++){
            if(start <= args.pageCount && start >= 1){
                if(start != args.currentPage){
                    dom.append('<a href="#" class="sNum">' + start + '</a>')
                }else{
                    dom.append('<a href="#" class="current">' + start + '</a>')
                }
            }
            
        }
        
        //...
        if(args.currentPage + 2 < args.pageCount - 1 && args.pageCount > 5){
            dom.append('<span class="dot" >...</span>')
        }
        //last
        if(args.currentPage + 2 < args.pageCount && args.pageCount != 4){
            dom.append('<span class="sNum" >'+ args.pageCount +'</span>')
        }
        //下一页
        if(args.currentPage < args.pageCount){
            dom.append('<a href="#" class="nextPage" >下一页</a>')
        }else{
            dom.remove('nextPage');
            dom.append('<span class="disabled">下一页</span>');
        }

    }
    function bindEvent(dom, args) {
        dom.on('click','.prePage',function(){
            var current = parseInt(dom.children('.current').text())
            createDom(dom,{
                currentPage: current - 1 ,
                pageCount: args.pageCount
            })
        })
        dom.on('click','.nextPage',function(){
            var current = parseInt(dom.children('.current').text());
            createDom(dom,{
                currentPage: current + 1 ,
                pageCount: args.pageCount
            })
        })
        dom.on('click','.sNum',function(){
            var current = parseInt($(this).text());
            createDom(dom,{
                currentPage: current ,
                pageCount: args.pageCount
            })
        })
    }

    $.fn.pageChange = function (options) {
        var args = $.extend({
            currentPage: 1,
            pageCount: 10
        }, options)
        init(this, args)
        return this;
    }


}(jQuery))