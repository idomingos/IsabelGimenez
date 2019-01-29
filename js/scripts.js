function initIsotope() {
    var t = Isotope.Item.prototype.reveal;
    Isotope.Item.prototype.reveal = function() {
        t.apply(this, arguments), $(this.element).removeClass("isotope-hidden")
    };
    var e = Isotope.Item.prototype.hide;
    Isotope.Item.prototype.hide = function() {
        e.apply(this, arguments), $(this.element).addClass("isotope-hidden")
    };
    var o = window.location.hash.substring(1),
        i = $(".isotope"),
        a = ".filter a",
        n = "active";
    i.imagesLoaded(function() {
        if (i.isotope({
                itemSelector: ".box",
                filter: "*",
                percentPosition: !0,
                layoutMode: "masonry",
                isFitWidth: !0,
                isOriginTop: !0,
                originLeft: !0,
                resizesContainer: !1,
                resize: !0,
                transitionDuration: "0",
                vertical: {
                    horizontalAlignment: .5
                }
            }), o) {
            i.isotope({
                filter: "." + o
            }), $("." + n).removeClass(n), $(a + "[href=" + window.location.hash + "]").addClass(n);
            var t = $("." + n).attr("data-layout-mode");
            t && i.isotope({
                layoutMode: "masonry",
                originLeft: !0
            })
        }
        i.isotope("on", "layoutComplete", function() {
            $(window).trigger("layoutComplete"), i.photoswipe(pswp_options)
        })
    }), $(window).on("resize", function() {
        clearTimeout($(this).data("timer")), $(this).data("timer", setTimeout(function() {
            i.isotope({
                transitionDuration: "0"
            })
        }, 300))
    }).resize(), $(a).on("click", function(t) {
        t.preventDefault();
        var e = $(this).attr("data-filter");
        i.isotope({
            filter: e,
            transitionDuration: "0.5s"
        });
        var o = $(this).attr("data-layout-mode");
        return o ? i.isotope({
            layoutMode: o,
            originLeft: !0
        }) : i.isotope({
            layoutMode: "masonry",
            originLeft: !0
        }), !$(this).hasClass(n) && ($("." + n).removeClass(n), void $(this).addClass(n))
    })
}

function initLightBox() {
    ! function($) {
        $.fn.photoswipe = function(t) {
            var e = [],
                o = t,
                i = function(t, e) {
                    var o;
                    if ("undefined" == t.attr("data-" + e) || "undefined" == t.attr("data-" + e + "-size")) throw SyntaxError("Missing data-* attributes for " + e);
                    var i = t.data(e + "-size").split("x");
                    if (2 != i.length) throw SyntaxError("Missing data-size attribute.");
                    return o = {
                        src: t.data(e),
                        w: parseInt(i[0], 10),
                        h: parseInt(i[1], 10)
                    }
                },
                a = function(t) {
                    e = [], t.each(function(t, o) {
                        e.push({
                            id: t,
                            items: []
                        }), $(o).find("div.image-box:not(.isotope-hidden) a").each(function(o, a) {
                            var n = $(a);
                            n.data("gallery-id", t + 1), n.data("photo-id", o);
                            var r = {
                                src: a.href,
                                msrc: a.children[0].getAttribute("alt-src"),
                                title: n.parent().siblings("figcaption").html(),
                                el: a,
                                smallImage: i(n, "small"),
                                mediumImage: i(n, "medium"),
                                largeImage: i(n, "large")
                            };
                            e[t].items.push(r)
                        }), $(o).off("click", "div.image-box a"), $(o).on("click", "div.image-box a", function(t) {
                            t.preventDefault();
                            var e = $(this).data("gallery-id"),
                                o = $(this).data("photo-id");
                            r(e, o)
                        })
                    })
                },
                n = function() {
                    var t = window.location.hash.substring(1),
                        e = {};
                    if (t.length < 5) return e;
                    for (var o = t.split("&"), i = 0; i < o.length; i++)
                        if (o[i]) {
                            var a = o[i].split("=");
                            a.length < 2 || (e[a[0]] = a[1])
                        }
                    return e.gid && (e.gid = parseInt(e.gid, 10)), e.hasOwnProperty("pid") ? (e.pid = parseInt(e.pid, 10), e) : e
                },
                r = function(t, i) {
                    var a = document.querySelectorAll(".pswp")[0],
                        n = e[t - 1].items,
                        r = {
                            index: i,
                            galleryUID: t,
                            getThumbBoundsFn: function(t) {
                                var e = n[t].el.children[0],
                                    o = window.pageYOffset || document.documentElement.scrollTop,
                                    i = e.getBoundingClientRect();
                                return {
                                    x: i.left,
                                    y: i.top + o,
                                    w: i.width
                                }
                            }
                        };
                    $.extend(r, o);
                    var s = new PhotoSwipe(a, PhotoSwipeUI_Default, n, r),
                        l, p = "large",
                        d = !0,
                        m;
                    s.listen("beforeResize", function() {
                        l = s.viewportSize.x, "small" != p && l < s.options.breakpoints.medium ? (p = "small", m = !0) : "medium" != p && l >= s.options.breakpoints.medium && l < s.options.breakpoints.large ? (p = "medium", m = !0) : "large" != p && l >= s.options.breakpoints.large && (p = "large", m = !0), m && !d && s.invalidateCurrItems(), d && (d = !1), m = !1
                    }), s.listen("gettingData", function(t, e) {
                        "large" == p ? (e.src = e.largeImage.src, e.w = e.largeImage.w, e.h = e.largeImage.h) : "medium" == p ? (e.src = e.mediumImage.src, e.w = e.mediumImage.w, e.h = e.mediumImage.h) : "small" == p && (e.src = e.smallImage.src, e.w = e.smallImage.w, e.h = e.smallImage.h)
                    }), s.init()
                };
            a(this);
            var s = n();
            return s.pid > 0 && s.gid > 0 && r(s.gid, s.pid), this
        }
    }(jQuery), $(".isotope").photoswipe(pswp_options)
}

function styleSwitch() {
    var t = $("html"),
        e = "animate-theme",
        o = "styleTheme";
    $(".styleswitch a").on("click", function(i) {
        i.preventDefault();
        var a = localStorage.styleTheme;
        t.removeClass(a), localStorage.removeItem(o);
        var n = $(this).attr("class");
        t.addClass(n), localStorage.setItem(o, n), t.addClass(e), $(".isotope").isotope("layout")
    })
}
$(function() {
    Modernizr.touchevents && FastClick.attach(document.body)
}), $(".content p, figcaption").widont(), $.lazyLoadXT.updateEvent += " layoutComplete", $(window).on("unload", function() {
    $(".isotope").isotope("layout")
});
var pswp_options = {
    breakpoints: {
        medium: 768,
        large: 960
    },
    showAnimationDuration: 666,
    hideAnimationDuration: 666,
    bgOpacity: .99,
    spacing: .12,
    loop: !1,
    mouseUsed: !0,
    history: !1,
    focus: !1,
    errorMsg: '<div class="pswp__error-msg">The image could not be loaded</div>',
    mainClass: "lightbox",
    barsSize: {
        top: 78,
        bottom: "78"
    },
    timeToIdle: 4e3,
    timeToIdleOutside: 2e3,
    loadingIndicatorDelay: 0,
    closeEl: !0,
    captionEl: !0,
    fullscreenEl: !1,
    zoomEl: !1,
    counterEl: !0,
    arrowEl: !0,
    preloaderEl: !0,
    shareEl: !1,
    zoomEl: !1,
    maxSpreadZoom: 1,
    getDoubleTapZoom: function(t, e) {
        return e.initialZoomLevel
    },
    pinchToClose: !0,
    tapToClose: !0,
    tapToToggleControls: !1,
    clickToCloseNonZoomable: !0,
    closeElClasses: ["item", "caption", "zoom-wrap", "ui", "top-bar"],
    indexIndicatorSep: "<br />"
};
styleSwitch(), $.easing.easeOutQuart = function(t, e, o, i, a) {
    return -i * ((e = e / a - 1) * e * e * e - 1) + o
}, $.easing.easeInOutExpo = function(t, e, o, i, a) {
    return 0 == e ? o : e == a ? o + i : (e /= a / 2) < 1 ? i / 2 * Math.pow(2, 10 * (e - 1)) + o : i / 2 * (-Math.pow(2, -10 * --e) + 2) + o
};
var scrollElement = "html, body";
$(scrollElement).each(function() {
    var t = $(this).attr("scrollTop");
    if ($(this).attr("scrollTop", t + 1), $(this).attr("scrollTop") == t + 1) return scrollElement = this.nodeName.toLowerCase(), $(this).attr("scrollTop", t), !1
}), $("a[href^='#']").click(function(t) {
    t.preventDefault();
    var e = $(this),
        o = this.hash,
        i = document.getElementById(o.substr(1)),
        a = $(i);
    a.length && $(scrollElement).stop().animate({
        scrollTop: a.offset().top
    }, 1200, "easeOutQuart")
}), $("a[href^='http:'], a[href^='https:']").not("[href*='" + document.domain + "']").attr("target", "_blank");