import $ from "jquery"
window.jQuery = $;
require("bootstrap");

require("../node_modules/waypoints/lib/jquery.waypoints.js");

if ($('.hero').length) {
    /* Auto close navbar on click (mobile menu) */
    $(".navbar-nav > li > a").click(function() {
        $(".navbar-collapse").collapse('hide');
        console.log("here");
    });

    /* Change navbar class on scroll */
    $(".wrapper").waypoint(function() {
        $(".navbar").toggleClass("js-navbar-top");
        $(".navbar.js-toggleClass").toggleClass("navbar-default navbar-inverse");
        return false;
    }, {offset: "-20px" });


    /* Change navbar class on collapse/uncollapse in its top position */
    $('.wrapper .navbar-collapse').on('show.bs.collapse', function () {
        $(".navbar.js-navbar-top").toggleClass("navbar-default navbar-inverse");
        $(".navbar").toggleClass("js-toggleClass js-noToggleClass");
    });

    $('.wrapper .navbar-collapse').on('hide.bs.collapse', function () {
        $(".navbar.js-navbar-top").toggleClass("navbar-default navbar-inverse");
        $(".navbar").toggleClass("js-toggleClass js-noToggleClass");
    });

    /* Smooth scroll to anchor */
    $(function() {
        $('a[href*=#]:not([href=#])').click(function() {
            if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
                var target = $(this.hash);
                target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
                if (target.length) {
                    $('html,body').animate({
                        scrollTop: (target.offset().top - 70) // 70px offset for navbar menu
                    }, 1000);
                    return false;
                }
            }
        });
    });
} else {
    $(".navbar").toggleClass("js-navbar-top");
    $(".navbar.js-toggleClass").toggleClass("navbar-default navbar-inverse");
}

$(function() {
    $(".game .game-iframe").each(function(i, element) {
        element = $(element);
        var ratio = element.data("ratio");
        function resize() {
            var height = Math.min(
                element.width() / ratio,
                document.documentElement.clientHeight,
                630
            );
            element.css("height", height);
        }
        resize();
        $(window).resize(resize);
    });
});