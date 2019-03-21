$(".navigation a").click(function () {
                $('html,body').animate({ scrollTop: $($(this).attr('href')).offset().top + 'px' }, 500)
                // < !--console.log($(this).attr('href'), $($(this).attr('href'))); -->
                return false;
            });