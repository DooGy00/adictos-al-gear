(function (s) {
        var a = [];
        jQuery.fn.zzConfirm = function (v) {
            var z = jQuery.extend({
                content: "¿Estás seguro?",
                lang: ["Si", "Cancelar"],
                width: "auto",
                dir: "top",
                toggle: !1,
                clickOut: !1,
                ok: function (D, C) {},
                cancel: function (D, C) {}
            }, v),
                A, w, t = function (E, H) {
                    var I = E.outerWidth(),
                        F = E.outerHeight(),
                        M = E.offset().top,
                        G = E.offset().left,
                        J = H.outerWidth(),
                        K = H.outerHeight(),
                        N = M + (F - K) / 2,
                        O = G + (I - J) / 2,
                        L = z.dir;
                    switch (L) {
                        case "top":
                            N = M - K - 10;
                            break;
                        case "bottom":
                            N = M + F + 10;
                            break;
                        case "left":
                            O = G - J - 10;
                            break;
                        case "right":
                            O = G + I + 10
                    }
                    H.attr("class", L).show().animate({
                        left: O,
                        top: N,
                        opacity: 1
                    })
                };
            v = s(this);
            var B = v.selector,
                u;
            a.push(B);
            return v.on("click", function (E) {
                E.preventDefault();
                A = s(this);
                var C = function (F) {
                    var G = s("#zzConfirm_wrap");
                    F && (G = s('#zzConfirm_wrap[data-selector="' + F + '"]'));
                    A.removeClass("zzConfirm_active");
                    G.hide().css({
                        left: u,
                        top: "-100px",
                        opacity: 0
                    })
                };
                s(".zzConfirm_active").not(A).removeClass("zzConfirm_active");
                if ((E = A.hasClass("zzConfirm_active")) && z.toggle) {
                    C()
                } else {
                    if (!E) {
                        A.addClass("zzConfirm_active");
                        s("#zzConfirm_wrap").length ? w = s("#zzConfirm_wrap") : (s("body").append('<div id="zzConfirm_wrap" style="width:' + z.width + ';left:50%;top:-100px;display:none"><div id="zzConfirm_content"></div><div id="zzConfirm_btn"><div id="zzConfirm_yes"></div><div id="zzConfirm_cancel"></div></div></div>'), w = s("#zzConfirm_wrap"), u = (s(window).width() - w.outerWidth()) / 2, w.css("left", u));
                        s("#zzConfirm_content").html(z.content);
                        s("div", "#zzConfirm_btn").off("click").on("click", function () {
                            C()
                        });
                        s("#zzConfirm_yes").html(z.lang[0]).on("click", function () {
                            z.ok(A, w)
                        });
                        s("#zzConfirm_cancel").html(z.lang[1]).on("click", function () {
                            z.cancel(A, w)
                        });
                        w.attr("data-selector", B).css("width", z.width);
                        t(A, w);
                        var D = !0;
                        s(window).resize(function () {
                            D && (setTimeout(function () {
                                t(A.filter(".zzConfirm_active"), w);
                                D = !0
                            }, 100), D = !1)
                        });
                        z.clickOut && s(document).on("click", function (F) {
                            s(F.target).closest(w).length || s(F.target).closest(a.join()).length || C(B)
                        })
                    }
                }
            })
        }
    })(jQuery);
$('.friends-foes-list a[href*="friendsfoes&remove="]').zzConfirm({
content: "¿Deseas eliminarlo de tu lista de amigos?",
ok: function (t) {
var m = t.attr("href");
var b = t.closest($(".friends-foes-list"));
var TID = $('a[href*="tid="]').attr('href').split('tid=')[1].split('&')[0];
$.post(m, {
confirm: 1,
tid: TID,
}, function (a) {
b.fadeOut(function () {
b.remove();
})
})
}
});
  $('a[href*="wall?d"]').zzConfirm({
  content: "¿Deseas eliminar el post de tu muro?",
ok: function (t) {
 var m = t.attr("href");
    var TID = $('a[href*="tid="]').attr('href').split('tid=')[1].split('&')[0];
    var b = t.closest($(".message-block").parent("li"));
        $.post(m, {
            tid: TID,
            confirm: 1
        }, function (a) {
          b.fadeOut(function () {
                b.remove();
          })
       })
     }
});
  
  $(".delete ").find("a[href*='mode=delete']").zzConfirm({
        content: "¿Deseas eliminar este post",
        ok: function (t) {
            var s = t.closest(".post");
            s.css("opacity", 0.3);
            $.post(t[0].href, {
                confirm: 1
            }, function (a) {
                s.slideUp(function () {
                    s.remove();
                    $(".post").length || location.replace($(".nav[href^='/f']:last")[0].href)
                })
            })
        }
    });
       $('a[href*="/modcp?mode=delete"]').zzConfirm({
        content: "¿Deseas eliminar este tema",
         ok: function (t) {
          var m = t.attr("href");
           $.post(m, {
                    confirm: 1
                }, function (a) {
                    alert('Tema borrado');
                    var url = "/";
                    $(location).attr('href', url);
                })
             }
        });