'use strict';

var Header = {
    init: function() {
        this.events();
    },

    fixed: function(header) {
        header.addClass('fixed');
        $('body').css('paddingTop', header.outerHeight() + 'px');
    },

    unFixed: function (header) {
        header.removeClass('fixed');
        $('body').css('paddingTop', 0 + 'px');
    },

    events: function() {
            var header = $('.header');
            $(window).scroll(function() {
                var scroll = $(window).scrollTop();
                if (scroll >= header.outerHeight()) {
                    Header.fixed(header);
                }
                else {
                    Header.unFixed(header);
                }
            });
            $(window).on('resize', function() {

            });
    }

};
