(function ($) {
    var methods = {
        init : function(options){
            return this.each(function(){
                var $this = $(this);
                $this.mobMenu('events', $this, options);
            });
        },

        show : function (){
            $('body').addClass('menu-open');
            $('body').append('<div class="bg"></div>');
        },

        hiden : function () {
            $('body').removeClass('menu-open');
            $('.bg').remove();
        },

        tab : function (_this){
            var id = _this.attr('data-id'),
                parent = _this.parents('.menu-headline'),
                tabs = $('.tab'),
                activeTab = $('#'+id);

            parent.toggleClass('active');
            tabs.removeClass('active');
            activeTab.addClass('active');
        },

        submenu : function (_this, submenu) {
            var menuItem = _this,
                allMenuItem  = $('.main-menu-item').not(menuItem),
                allSubmenu = $('.submenu').not(submenu);
            allMenuItem.removeClass('open');
            allSubmenu.slideUp();
            menuItem.toggleClass('open');
            submenu.slideToggle();
        },

        events : function ($this, options){
            var settings = $.extend( {
                'tabs' : true,
                'submenu' : true
            }, options);

            $('.js-mobile-burger').click(function(e){
                e.stopPropagation();
                if (!$('body').hasClass('menu-open')) {
                    $this.mobMenu('show');
                } else {
                    $this.mobMenu('hiden');
                }
            });
            $(document).click(function(e) {
                if ( $(e.target).closest('.header__nav').length === 0 ) {
                    $this.mobMenu('hiden');
                }
            });

            if (settings.tabs == true) {
                $('.additional_menu-link').click(function(){
                    var _this =$(this);

                    $this.mobMenu("tab", _this);
                });
            }

            if (settings.submenu == true) {
                $('.main-menu-item').click(function(e){
                    var _this = $(this),
                        submenu = _this.find('.submenu'),
                        link = _this.find('.main-menu-link'),
                        linkHref =link.attr('href');

                    if(submenu.length) {
                        if (!_this.hasClass('open')) {
                            $this.mobMenu('submenu', _this, submenu);
                            e.preventDefault();
                        }
                    } else {
                        if (linkHref == undefined) {
                            e.target.preventDefault();
                        } else {
                            location.href = linkHref;
                        }
                    }
                });
                $('.btn-submenu').click(function(e){
                    var _this = $(this).parents('.main-menu-item'),
                        submenu = _this.find('.submenu');

                    $this.mobMenu('submenu', _this, submenu);
                    e.preventDefault();
                    e.stopPropagation();
                });
            }

        }
    };

    $.fn.mobMenu = function (method) {
        if ( methods[method] ) {
            return methods[ method ].apply( this, Array.prototype.slice.call( arguments, 1 ));
        } else if ( typeof method === 'object' || ! method ) {
            return methods.init.apply( this, arguments );
        } else {
            $.error( 'Метод с именем ' +  method + ' не существует для jQuery.mobMenu' );
        }
    };
})(jQuery);