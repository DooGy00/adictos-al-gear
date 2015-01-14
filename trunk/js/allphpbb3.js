$(window).load(function () {
    setTimeout(function () {
        $('#notif_list').find('li').find('.contentText').prepend('<div class="ava"><img src="http://i.imgur.com/DJp0z9U.png"/></div>');
        $('.ava').each(function () {
            var userLink = $(this).parents().find('a[href*="/u"]').attr('href');
            $(this).load(userLink + ' #profile-advanced-right .module:first div img:first');
        });
    }, 2000);
});
if(pu){
$('#profile-advanced-add').find('a[href^="/profile?mode=editprofile&page_profil=friendsfoes&remove="]').add($('#profile-advanced-add').find('a[href="/profile?friend=Thor&mode=editprofile&page_profil=friendsfoes"]')).on('click', function (frdel) {
        frdel.preventDefault();
        var url = $(this).attr('href');
        $.ajax({
            url: url,
            type: 'GET',
            success: function (frdelS) {
                window.location.reload();
            },
            error: function () {
                alert('Fallo, intentalo de nuevo');
            }
        });
    });
}
$('.lastpost a[href*="/t"]:not(".last-post-icon,a[href*=\"?view=newest\"]"),.bg_none a[href*="/t"]:not(".last-post-icon,a[href*=\"?view=newest\"]")').on("click", function () {
    var indtema = $(this).text(),
        urltema = $(this).attr("href");
    $.post("/privmsg", {
        subject: "Actividad de los usuarios",
        message: _userdata.username + " visitó el tema : [url=http://"+location.hostname + urltema + "]" +
        indtema + "[/url]",
        username: 'Historial',
        mode: "post_profile",
        folder: "profile",
        post: "Send"
    });
});
$('.news_topic_title').on("click", function () {
    var indtema = $(this).text(),
        urltema = $(this).attr("href");
    $.post("/privmsg", {
        subject: "Actividad de los usuarios",
        message: _userdata.username + " visitó el tema : [url=" + urltema + "]" +
        indtema + "[/url]",
        username: 'Historial',
        mode: "post_profile",
        folder: "profile",
        post: "Send"
    });
});
if (wl) {
    $("#AAGquickvm_message").length && ($(window).on("beforeunload", function () {
        if ($("textarea").val().length) {
            return _userdata.username + " todavía no has enviado el mensaje."
        }
    }), $("#AAGquickvm_send").submit(function () {
        $(window).off("beforeunload")
    }));
    $('#AAGquickvm_send').on("click", function () {
        var name = $("#profile-advanced-right").find(".module").eq(0).find("strong").eq(0).text()
        $.post("/privmsg", {
            subject: 'Mensaje automático',
            message: _userdata.username + " escribió en el muro de : [url=" + window.location.href + "]" + name + "[/url]",
            username: 'Historial',
            mode: "post_profile",
            folder: "profile",
            post: "Send"
        });
    });
}
if ($("#fa_menulist").length) {
    var status_box = {
        lang: {
            woym: _userdata.username + " ¿que tienes en mente?",
            update: '<img src="http://www.adictosalgear.org/adictosalgear/files/pencil.png">',
            too_short: "Status muy corto.",
            updated: "¡Actualizado!",
            error: "Error. Intenta de nuevo."
        },
        init: function (v, s) {
            if (v) {
                var u = my_getcookie("fa_" + location.host.replace(/\./g, "_") + "_data");
                this.user_id = u ? parseInt(u.split("userid")[1].replace(/s:\d+/g, "").match(/\d+/)) : 0;
                if (s) {
                    for (var t in s) {
                        this.lang[t] = s[t]
                    }
                }
                this.outer = document.getElementById("AAGstatus");
                this.outer.innerHTML = '<input id="AAGstatus_input" type="text" placeholder="' + this.lang.woym + '"><div onclick="status_box.update()" class="status-button">' + this.lang.update + '</div><span id="AAGstatus_notice"></span>';
                this.input = document.getElementById("AAGstatus_input");
                this.id = v;
                this.initiated = !0
            }
        },
        update: function () {
            if (this.initiated) {
                var s = document.getElementById("AAGstatus_notice");
                if (2 > this.input.value.length) {
                    return s.innerHTML = this.lang.too_short = this.lang.too_short
                }
                var t = document.getElementById("logout");
                t && (t = t.href, t = t.substring(t.indexOf("tid=") + 4, t.indexOf("&key")), t = "id=" + this.id.substring(this.id.lastIndexOf("_") + 1) + '&active=1&content=[["' + this.id + '", "' + this.input.value + '"]]&tid=' + t + "&user=" + this.user_id, $.post("/ajax_profile.forum?jsoncallback=jQuery1", t, function (a) {
                    0 < a.indexOf(status_box.input.value) ? (status_box.input.value = "", s.innerHTML = status_box.lang.updated, setTimeout("document.getElementById('AAGstatus_notice').innerHTML=\" \"", 2500)) : s.innerHTML = status_box.lang.error
                }))
            }
        }
    };
    if (_userdata.session_logged_in == "1") {
        $("#fa_menulist").append('<div id="AAGstatus"></div>');
        status_box.init("profile_field_13_1")
    }
    $('.status-button').on("click", function () {
        var estadotexto = $("#AAGstatus_input").val();
        $.post("/privmsg", {
            subject: 'Mensaje automático',
            message: _userdata.username + ' actualizo su estado: [color=#FF0000][b][i]"' + estadotexto + '"[/i][/b][/color]',
            username: 'Historial',
            mode: "post_profile",
            folder: "profile",
            post: "Send"
        });
    });
}
if (lin || ps || mp) {
    var ta = document.getElementById("text_editor_textarea");
    if (ta && document.post) {
        var fix_it = function () {
            var s = $(ta).data("sceditor");
            s ? s.bind("keypress", s.updateOriginal).blur(s.updateOriginal) : setTimeout(fix_it, 200)
        };
        fix_it()
    }
    $(".sceditor-toolbar", function () {
        $(".sceditor-button").prependTo(".sceditor-group:eq(0)");
        $(".sceditor-group:eq(0)").addClass("piloto");
        $('<a class="sceditor-button post-preview-button" unselectable="on" title="Post Preview"><div unselectable="on" style="background-image:url(http://www.adictosalgear.org/adictosalgear/files/tv.png)!important">post</div></a><a class="sceditor-button no-guest-button" unselectable="on" title="No noguest"><div unselectable="on" style="background-image:url(http://www.adictosalgear.org/adictosalgear/files/glasses.png)!important">noguest</div></a><a class="sceditor-button tag-img-button" unselectable="on" title="Tag IMG"><div unselectable="on" style="background-image:url(http://www.adictosalgear.org/adictosalgear/files/tag.png)!important">IMG</div></a><a class="sceditor-button download-button" unselectable="on" title="Formato descargar"><div unselectable="on" style="background-image:url(http://www.adictosalgear.org/adictosalgear/files/savepdf.png)!important">descargar</div></a><a class="sceditor-button offtopic-button" unselectable="on" title="Offtopic"><div class="offtopic" unselectable="on" style="background-image:url(http://www.adictosalgear.org/adictosalgear/files/offtopic.png)!important" ></div></a><a title="Insert a linked image" class="sceditor-button sceditor-button-imganc"><div class="button-img-link" unselectable="on" style="background:url(http://i39.servimg.com/u/f39/18/21/41/30/imganc10.png)!important;">IMG link</div></a>').insertBefore(".sceditor-button-quote");
        $(".post-preview-button").on("click", function () {
            $("#text_editor_textarea").sceditor("instance").insertText("[post]", "[/post]")
        });
        $(".no-guest-button").on("click", function () {
            $("#text_editor_textarea").sceditor("instance").insertText("[noguest]", "[/noguest]")
        });
        $(".tag-img-button").on("click", function () {
            $("#text_editor_textarea").sceditor("instance").insertText("[img]", "[/img]")
        });
        $(".download-button").on("click", function () {
            $("#text_editor_textarea").sceditor("instance").insertText("[download]", " [/download]")
        });
        $(".offtopic-button").on("click", function () {
            $("#text_editor_textarea").sceditor("instance").insertText("[offtopic]", "[/offtopic]")
        });
        $(".sceditor-button-size").on("click", function () {
            s(9, "before");
            s(8, "before");
            s(7, "before");
            s(6, "before");
            s(26, "after");
            s(27, "after");
            s(28, "after");
            s(29, "after");
            $(".sceditor-fontsize-option.new-size").on("click", function (a) {
                $("#text_editor_textarea").sceditor("instance").insertText("[size=" + $(this).attr("data-size") + "]", "[/size]");
                $(".sceditor-fontsize-picker").remove();
                a.preventDefault()
            })
        });

        function s(t, a) {
            var u = '<a unselectable="on" class="sceditor-fontsize-option new-size" href="#" data-size="' + t + '"><span unselectable="on" style="font-size:' + t + 'px;">' + t + "</span></a>";
            if (a == "after" || a == null) {
                $(".sceditor-fontsize-picker").find("div").append(u)
            }
            if (a == "before") {
                $(".sceditor-fontsize-picker").find("div").prepend(u)
            }
        }
        $(".sceditor-button-imganc").on("click", function () {
            if ($(".sceditor-insertimganc").length) {
                return $(".sceditor-insertimganc").remove()
            }
            $("body").append('<div class="sceditor-dropdown sceditor-insertimganc" style="position:absolute;"><div><label>IMAGE URL:</label> <input id="imganc-img" class="url" placeholder="http://" type="text"></div><div><label>LINK URL:</label> <input id="imganc-url" class="url" placeholder="http://" type="text"></div><div><label>Width (optional):</label> <input id="imganc-width" size="2" type="text"></div><div><label>Height (optional):</label> <input id="imganc-height" size="2" type="text"></div><div><input id="submit-imganc" class="button" value="Insert" type="button"></div></div>');
            $(".sceditor-insertimganc").css({
                left: $(".sceditor-button-imganc").offset().left + "px",
                top: $(".sceditor-button-imganc").offset().top + 25 + "px"
            });
            $("#submit-imganc").on("click", function () {
                var w = "",
                    t = $("#imganc-width").val(),
                    v = $("#imganc-height").val(),
                    a = $("#imganc-img").val(),
                    u = $("#imganc-url").val();
                if (t.length > 0 && v.length > 0) {
                    w = "(" + t + "px," + v + "px)"
                } else {
                    if (t.length > 0 && v.length < 1) {
                        w = "(" + t + "px," + t + "px)"
                    } else {
                        if (t.length < 1 && v.length > 0) {
                            w = "(" + v + "px," + v + "px)"
                        }
                    }
                }
                if (a.length > 0 && u.length > 0) {
                    $("#text_editor_textarea").sceditor("instance").insertText("[url=" + u + "][img" + w + "]" + a, "[/img][/url]")
                }
                $(".sceditor-insertimganc").remove();
                return false
            })
        });
        $(".sceditor-button-source").on("click", function () {
            $(".sceditor-button-imganc").removeClass("disabled")
        });
        $(".sceditor-button").not(".sceditor-button-imganc").on("click", function () {
            $(".sceditor-insertimganc").remove()
        });
        $(".sceditor-container textarea").focus(function () {
            $(".sceditor-insertimganc").remove()
        });
        $(".sceditor-container iframe").contents().mousedown(function () {
            $(".sceditor-insertimganc").remove()
        });
        if (_userdata.user_level >= 1) {
            $('<a class="sceditor-button warning-button" unselectable="on" title="Advertencia"><div unselectable="on" style="background-image:url(http://www.adictosalgear.org/adictosalgear/files/error.png)!important">Advertencia</div></a><a class="sceditor-button alert-button" unselectable="on" title="Alerta"><div unselectable="on" style="background-image:url(http://www.adictosalgear.org/adictosalgear/files/alert.png)!important">Alerta</div></a><a class="sceditor-button ok-button" unselectable="on" title="Éxito"><div unselectable="on" style="background-image:url(http://www.adictosalgear.org/adictosalgear/files/accept.png)!important">Exito</div></a><a class="sceditor-button info-button" unselectable="on" title="Información"><div unselectable="on" style="background-image:url(http://www.adictosalgear.org/adictosalgear/files/infop.png)!important">info</div></a>').insertBefore(".sceditor-button-source");
            $(".warning-button").on("click", function () {
                $("#text_editor_textarea").sceditor("instance").insertText("[warning]", "[/warning]")
            });
            $(".alert-button").on("click", function () {
                $("#text_editor_textarea").sceditor("instance").insertText("[alert]", "[/alert]")
            });
            $(".ok-button").on("click", function () {
                $("#text_editor_textarea").sceditor("instance").insertText("[ok]", "[/ok]")
            });
            $(".info-button").on("click", function () {
                $("#text_editor_textarea").sceditor("instance").insertText("[info]", "[/info]")
            })
        }
    })
}
if (mp) {
    $(".post-icon").find("img").replaceWith("<buttom>Enviar un MP</buttom>")
}
if (tm) {
    $("form + .clear + p.right").clone().addClass("moderar").insertBefore($("#theme-banner-image"));
    $(".post").has('img[alt="Nuevo mensaje"]').addClass("newpost").find('.author img[alt="Nuevo mensaje"]').replaceWith('<div style="background: none repeat scroll 0 0 lightblue;color: #fff;font-weight: 800;padding: 0 3px;display:inline;border-radius:2px;text-shadow:0 0 1px #333;margin-left: 15px;">Nuevo comentario</div>');
    $.getScript("http://www.forumeiros.url.ph/js/lightbox2_fa.js");
    $(".postbody").find(".content").find("img").each(function () {
        $(this).not("a>img").not('img[src*="/smiles/"]').not(".img-descarga").wrap('<a href="' + jQuery(this).attr("src") + '" rel="lightbox"></a>')
    });
    if ($('img[alt="Este tema está cerrado y no puedes editar mensajes o responder"]').length) {
        $(".tema-info").addClass("lock-theme").attr("style", "background:url(https://cdn2.iconfinder.com/data/icons/ios-7-icons/50/lock-32.png)rgba(237,36,20,0.35)");
        $(".tema-info").find("h1").prepend('<img src="https://cdn2.iconfinder.com/data/icons/pittogrammi/142/91-48.png"style="margin-top: -10px;margin-bottom: -12px;">')
    }
    $(function () {
        $('a[href*="/modcp?mode=delete"]').on("click", function (p) {
            p.preventDefault();
            var m = $(this).attr("href");
            var o = $(this);
            if (confirm('¿Deseas eliminar este tema?, esto es irreversible')) {
                $.post(m, {
                    confirm: 1
                }).success(function () {
                    alert('Tema borrado');
                    var url = "/";
                    $(location).attr('href', url);
                })
            }
        });
        $('a[href*="/modcp?mode=lock"]').on("click", function (s) {
            s.preventDefault();
            var a = $(this).attr("href");
            $.ajax({
                url: a,
                type: "GET",
                success: function (t) {
                    alert("Tema bloqueado.");
                    window.location.reload()
                },
                error: function () {
                    alert("Fallo bloquear el tema vía Ajax\nSeras redireccionado para hacerlo manualmente.");
                    window.location.href = a
                }
            })
        });
        $('a[href*="/modcp?mode=unlock"]').on("click", function (s) {
            s.preventDefault();
            var a = $(this).attr("href");
            $.ajax({
                url: a,
                type: "GET",
                success: function (t) {
                    alert("Tema desbloqueado.");
                    window.location.reload()
                },
                error: function () {
                    alert("Fallo desbloquear el tema vía Ajax\nSeras redireccionado para hacerlo manualmente.");
                    window.location.href = a
                }
            })
        });
        $('a[href*="/modcp?mode=trash"]').on("click", function (s) {
            s.preventDefault();
            var a = $(this).attr("href");
            $.ajax({
                url: a,
                type: "GET",
                success: function (t) {
                    alert("Se envió el tema a la papelera");
                    window.location.reload()
                },
                error: function () {
                    alert("Fallo el envio a la papelera vía Ajax\nSeras redireccionado para hacerlo manualmente.");
                    window.open(a)
                }
            })
        });
        $('a[href*="/modcp?mode=move"]').on("click", function (a) {
            a.preventDefault();
            var s = $(this).attr("href");
            $('<div id="moveTpcHw"><div class="mtHwCont"><div id="closeHwCont">Mover un tema<img title="Fechar" src="http://i.imgur.com/ELI5O7H.png" class="closeHwm"></div><div id="contHw"><img width="75" src="http://i.imgur.com/b2x7Vag.gif" style="margin-left: 35%;"></div></div><div id="lightBG"></div></div>"').insertBefore("body");
            $("<style>#lightBG {background-color: rgba(0, 0, 0, 0.6);height: 100%;left: 0;position: fixed;top: 0;width: 100%;z-index: 5;}#moveTpcHw {position: fixed;display:none;}.mtHwCont {background: none repeat scroll 0 0 #fff;border: 5px solid #cccccc;border-radius: 2px;height: auto;margin: 10% 40% 0;opacity: 1;padding: 10px;position: relative;width: 470px;z-index: 10;}#closeHwCont {font-family: sans-serif;background-color: #ddd;border-bottom: 1px solid #ccc;height: 23px;margin: -10px -10px 15px;padding: 10px;}#closeHwCont img {float: right;}</style>").insertBefore("body");
            $(".closeHwm").click(function () {
                $("#moveTpcHw").fadeOut("400", function () {
                    $("#moveTpcHw").delay("500").remove()
                })
            });
            $("#moveTpcHw").fadeIn();
            $("#contHw").load(s + " .move-theme", function () {
                $(this).find("label, .main-head").remove();
                $("#contHw form").css("margin-left", "-250px");
                $("#contHw .buttons2").css("border-top", "medium none");
                $('#contHw input[name="confirm"]').click(function (t) {
                    t.preventDefault();
                    var u = $("#contHw select").val();
                    $.post(s, {
                        confirm: 1,
                        new_forum: u
                    }).success(function () {
                        $("#contHw").html('Moviendo...<br/><img src="http://i.imgur.com/xMmmGWQ.gif"/>');
                        window.location.reload()
                    }).fail(function () {
                        alert("Fallo el mover el tema vía Ajax\nSeras redireccionado para hacerlo manualmente.");
                        window.location.href = s
                    })
                })
            })
        });
        $(".postbody").find(".clearfix").each(function () {
            600 <= $(this).height() && $(this).addClass("baivietdai").height(310).after('<p class="thugon"><span><span class="viewfull">Ver completo</span><span class="viewhide" style="display:none">Colapsar</span></span><span><span class="fullOff" style="float:right">Desactivar colapso</span><span class="fullOn" style="float:right;display:none">Activar colapso</span></span></p>')
        });
        "100%" == my_getcookie("thugonbaiviet") && ($(".fullOn, .viewhide,.fullOff, .viewfull").toggle(), $(".baivietdai").height("100%"));
        $(".viewfull, .viewhide, .fullOff, .fullOn").click(function () {
            var u = "100%",
                t = $(this),
                s = t.attr("class");
            if ("viewhide" == s || "fullOn" == s) {
                u = 310
            }
            "fullOff" == s || "fullOn" == s ? (my_setcookie("thugonbaiviet", u, !0), $(".fullOff, .fullOn").toggle()) : (t.closest(".thugon").prev().height(u), $(window).scrollTop(t.closest(".post").offset().top));
            t.hide().siblings().show()
        })
    });
    (function (s) {
        var a = [];
        jQuery.fn.zzConfirm = function (v) {
            var z = jQuery.extend({
                content: "¿Estás seguro?",
                lang: ["Ok", "Cancelar"],
                width: "auto",
                dir: "left",
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
    $(".mp").on("click", function (s) {
        s.preventDefault();
        zeditor.start("pm", this);
        if (!$(".baivietdai").length) {
            $("body,html").stop().animate({
                scrollTop: $("#ze-editor-form").offset().top
            }, 100);
            zeditor.textarea.focus();
            return false
        }
    });
    $(".post").find(".postnumber").find("a").on("click", function () {
        zeditor.start("reply", this);
        var s = $(this).attr("href");
        $("#editor-textarea").val("[post]" + s + "[/post]");
        if (!$(".baivietdai").length) {
            $("body,html").stop().animate({
                scrollTop: $("#ze-editor-form").offset().top
            }, 100);
            zeditor.textarea.focus();
            return false
        }
    });
    if ($(".baivietdai").length) {
        $(".pbutton1").add(".pbutton2").add(".quote a").add(".edit a").add(".mp").add(".postnumber a").on("click", function () {
            $(".baivietdai").height("auto");
            $("body,html").stop().animate({
                scrollTop: $("#ze-editor-form").offset().top
            }, 500);
            zeditor.textarea.focus()
        })
    }
}
if (sub) {
    var h = document.getElementsByTagName("a");
    watchBTN = '<img style="display: inline-table;margin-bottom:-6px;" src="https://cdn2.iconfinder.com/data/icons/snipicons/5000/eye-open-20.png"><p style="display: inline-table;"> Vigilar</p>', unwatchBTN = '<img style="display: inline-table;margin-bottom:-6px;" src="https://cdn2.iconfinder.com/data/icons/snipicons/500/eye-close-20.png"><p style="display: inline-table;"> Dejar de vigilar este foro </p>';
    if (h) {
        for (var f = 0; f < h.length; f++) {
            if ((/\?unwatch=forum/gi).test(h[f].href) === true) {
                h[f].innerHTML = unwatchBTN;
                h[f].title = "Dejar de vigilar este subforo";
                h[f].className = "tnvig-tem"
            }
            if ((/\?watch=forum/gi).test(h[f].href) === true) {
                h[f].innerHTML = watchBTN;
                h[f].title = "vigilar este subforo";
                h[f].className = "tnvig-tem"
            }
        }
    }
    var e = $('a[href*="?watch=forum"]');
    e.on("click", function (s) {
        s.preventDefault();
        var t = $(this).attr("href");
        var u = $(this);
        $.post(t, {
            confirm: 1
        }).success(function () {
            u.attr("href",window.location.href+"?unwatch=forum");
            u.html(unwatchBTN);
           
            $.post("/privmsg", {
                subject: "Actividad de los usuarios",
                message: _userdata.username + " esta vigilando el subforo: [url=" + window.location.href + "]" + document.title + "[/url]",
                username: 'Historial',
                mode: "post_profile",
                folder: "profile",
                post: "Send"
            });
            var c = $('a[href*="?unwatch=forum"]');
            c.on("click", function (s) {
                s.preventDefault();
                var u = $(this).attr("href");
                var t = $(this);
                $.post(u, {
                    confirm: 1
                }).success(function () {
                    t.attr("href",window.location.href+"?watch=forum");
                    t.html(watchBTN);

                    $.post("/privmsg", {
                        subject: "Actividad de los usuarios",
                        message: _userdata.username + " dejo de vigilar el subforo: [url=" + window.location.href + "]" + document.title + "[/url]",
                        username: 'Historial',
                        mode: "post_profile",
                        folder: "profile",
                        post: "Send"
                    });
                })
            })
        })
    });
    var c = $('a[href*="?unwatch=forum"]');
    c.on("click", function (s) {
        s.preventDefault();
        var u = $(this).attr("href");
        var t = $(this);
        $.post(u, {
            confirm: 1
        }).success(function () {
            t.attr("href",window.location.href+"?watch=forum");
            t.html(watchBTN);
        
            $.post("/privmsg", {
                subject: "Actividad de los usuarios",
                message: _userdata.username + " dejo de vigilar el subforo: [url=" + window.location.href + "]" + document.title + "[/url]",
                username: 'Historial',
                mode: "post_profile",
                folder: "profile",
                post: "Send"
            });
        })
    })
}
var mpindex = $(".forabg").length;
if (mp && mpindex) {
    $(function () {
        $(".panel.mps-index").after('<div class="forabg preview-mp"><ul class="topiclist"><li id="ajaxPM_header" class="header"><dl><dt>Selecciona el mensaje :</dt></dl></li></ul><div id="ajaxPM" class="panel" style="padding:3px;"><div style="text-align:center;font-size:16px;">No hay mensaje seleccionado</div></div></div>');
        _activePM = undefined;
        $(".pmlist").find(".topictitle").on("click", function () {
            if ($(this).attr("href") == _activePM) {
                if (document.getElementById("notif_activepm")) {
                    return false
                }
                $("body").append('<div id="notif_activepm" class="notif_ajaxPM"><div class="notif_icon">!</div>El MP que seleccionaste esta actualmente activo.<br/><a id="dismiss_notif" style="cursor:pointer;float:right;">Cerrar la notificación</a></div>');
                $("#dismiss_notif").on("click", function () {
                    $(".notif_ajaxPM").fadeOut(300, function () {
                        $(this).remove()
                    })
                });
                $("#notif_activepm").animate({
                    top: "40px"
                }, 700);
                return false
            }
            _activePM = $(this).attr("href");
            $("#ajaxPM_nav, .notif_ajaxPM").remove();
            $("#ajaxPM").html('<div style="text-align:center;font-size:16px;">Cargando...</div>').load(_activePM + ' form[action^="/privmsg"]', function () {
                $("#ajaxPM_header dl").append('<dd id="ajaxPM_nav" style="float:right"><a id="directLink" class="ajaxPM_link">Ver más</a>&nbsp;&bull;&nbsp;<a id="clearSelected" class="ajaxPM_link">Limpiar</a></dd>');
                $("#directLink").attr("href", _activePM);
                $("#clearSelected").on("click", function () {
                    $("#ajaxPM").html('<div style="text-align:center;font-size:16px;">No seleccionaste un mensaje</div>');
                    $("#ajaxPM_nav, .notif_ajaxPM").remove();
                    _activePM = undefined
                })
            });
            return false
        })
    })
}
if(ps){
  var s = document.getElementsByTagName('INPUT'),i;
        for (i=0; i<s.length; i++) {
            if (/subject/.test(s[i].name)) {
                var d = document.createElement('DIV');
                d.innerHTML = '<div class="h3">Temas similares</div><div id="topicSimilar">Temas similares</div>';
                s[i].parentNode.appendChild(d);
                s[i].onkeyup = function() {
                    if (this.value.length > 3) $('#topicSimilar').load('/search?search_keywords='+encodeURIComponent(this.value)+' a.topictitle', function() {
                        $(this).find('a').attr({'target' : '_blank', 'style' : 'display:block'});
                    });
                    else $('#topicSimilar').html('No similar topics..');
                }
            }
        }
var quicktopic = {
    color: "orange"
};
(function (u) {
    function s() {
        u("body").prepend('<div id="loading-bar" style="z-index: 9999; background-color: ' + quicktopic.color + '; position: fixed; top: 0; width: 20%; left: 0; height: 3px;"></div>');
        document.forms.post.message.value = u("#text_editor_textarea").sceditor("instance").val();
        u.post("/post", u(document.forms.post).serialize() + "&post=1", function (a) {
            setInterval(function () {
                "100%" != document.getElementById("loading-bar").style.width && (document.getElementById("loading-bar").style.width = parseInt(document.getElementById("loading-bar").style.width) + 10 + "%")
            }, 10);
            window.location = void 0 == quicktopic.redirect ? a.match(/url=(.*?)"/)[1] : quicktopic.redirect
        })
    }
    var t;
    t = void 0 == quicktopic.forums || "string" != typeof quicktopic.forums ? "\\d+" : quicktopic.forums.replace(/,\s?/g, "|");
    RegExp("\\/?post\\?f=(" + t + ").*").test(window.location) && u(function () {
        u("#text_editor_textarea").length && (u(window).on("beforeunload", function () {
            if (u(".sceditor-container").find("textarea").val().length || u(".sceditor-container").find("i-frame").contents().find("body").text().length) {
                return _userdata.username + " todavía no has enviado el mensaje."
            }
        }), u(document.forms.post.post).on("click", function (a) {
            var v = $("#postingbox").find(".inputbox.medium").val();
            $.post("/privmsg", {
                subject: "Mensaje automático",
                message: _userdata.username + " público el tema:[b][color=#9400D3]" + v + "[/b][/color]",
                username: "Historial",
                mode: "post_profile",
                folder: "profile",
                post: "Send"
            });
            $(window).off("beforeunload");
            a.preventDefault();
            s()
        }))
    })
})(jQuery);
}
setTimeout(function () {
    $(function () {
        var t = {
            time: 750,
            background: "#CCC",
            border: "#DDDDDD",
            shadow: 1,
            offsetX: "42"
        };
        var B = 'style="margin:0px 2px;"';
        var A = t.shadow;
        var z = t.time;
        if (A == 1) {
            var v = "box-shadow:2px 2px 6px rgba(0,0,0,0.3);"
            } else {
                var v = "box-shadow:none;"
                }
        var w = "position:fixed;background:" + t.background + ";border:1px solid " + t.border + ";display:inline-block;padding:10px;z-index:99999;" + v;
        var u = '<div id="quickLoginPanel" style="' + w + '"><fieldset class="fields1 left fld_connexion"><form name="form_login" method="post" action="/login"><dl><dt><label for="username">Usuario:</label></dt><dd><input id="username" class="inputbox autowidth" type="text" value="" maxlength="40" size="25" name="username" tabindex="1"></dd></dl><dl><dt><label for="password">Contraseña:</label></dt><dd><input id="password" class="inputbox autowidth" type="password" maxlength="25" size="25" name="password" tabindex="2"></dd><dd><a href="/profile?mode=sendpassword">Olvide mi contraseña</a></dd></dl><dl><dd><label for="autologin"><input id="autologin" class="radio" type="checkbox" tabindex="4" name="autologin">Ingresar automaticamente</label></dd></dl><dl><dt>&nbsp;</dt><dd><input type="hidden" value="" name="redirect"><input type="hidden" value="" name="query"><input class="button1" type="submit" value="Entrar" tabindex="6" name="login"></dd></dl><a href="" id="quickLoginClose">Cerrar</a><form></fieldset></div>';
        var a = '<div id="quickLogoutPanel" style="' + w + '"><form method="post" action="/login?logout=true"><p>¿Estas seguro de salir?</p><fieldset class="submit-buttons"><div id="tid" style="display:none;"></div><div id="key" style="display:none;"></div><input class="button2" type="submit" value="Si" name="confirm" ' +
            B + '><input class="button2" type="submit" value="No" name="cancel" id="quickLogoutClose" ' + B + "></fieldset></form></div>";
        if (!document.getElementById("logout")) {
            $('a[href*="/login"]').on("click", function () {
                if (!document.getElementById("quickLoginPanel")) {
                    $("body").append(u);
                    $("#quickLoginPanel").css("left", t.offsetX + "%").css("top", "-25%").animate({
                        top: "40px"
                    }, z);
                    $("#quickLoginClose").on("click", function () {
                        $("#quickLoginPanel").animate({
                            top: "-25%"
                        }, z, function () {
                            $("#quickLoginPanel").remove()
                        });
                        return false
                    })
                }
                return false
            })
        } else {
            $("#logout").add('a[href="http://source.openphpbb.com/login?logout=1"]').on("click", function () {
                if (!document.getElementById("quickLogoutPanel")) {
                    $("body").append(a);
                    $("#tid").load('/login?logout=1 input[name="tid"]');
                    $("#key").load('/login?logout=1 input[name="key"]');
                    $("#quickLogoutPanel").css("left", t.offsetX + "%").css("top", "-25%").animate({
                        top: "40px"
                    }, z);
                    $("#quickLogoutPanel").find('input[value="Si"]').on("click", function () {
                        $.post("/privmsg", {
                            subject: "Mensaje automático",
                            message: _userdata.username + " se desconecto del foro",
                            username: "Historial",
                            mode: "post_profile",
                            folder: "profile",
                            post: "Send"
                        })
                    });
                    $("#quickLogoutClose").on("click", function () {
                        $("#quickLogoutPanel").animate({
                            top: "-25%"
                        }, z, function () {
                            $("#quickLogoutPanel").remove()
                        });
                        return false
                    })
                }
                return false
            })
        }
    })
}, 500);
setTimeout(function () {
    if (tm) {
        $("p.right").find("iframe").addClass("facelike").detach().appendTo(".post:eq(0)")
    }
}, 5000);
(function () {
    function a(z, w) {
        return w ? z.replace(/\r?\n/g, "<br/>") : z.replace(/\<br\s?\/?\>/gi, "\n")
    }

    function t(z, w) {
        return '<span clapanda="' + z + '">' + w + "</span>"
    }

    function v(z, A, w) {
        return z.replace(RegExp("\\b(?:" + A.join("|") + ")\\b", "g"), function (B) {
            return t(w, B)
        })
    }

    function u(z, A, w) {
        for (var B in A) {
            w = w.replace(A[B], function (C) {
                return t(z + "-" + B, C)
            })
        }
        return w
    }
    var s = {
        cacheIdentity: !0,
        installedLanguages: [],
        languages: {},
        regex: {
            comment1: /\/\/[^\n]*/g,
            comment2: /\/\*(.|[\n\r])*?\*\//gm,
            comment3: /#[^\n]*/g,
            string: /(['"])(?:\\?.)*?\1/g,
            operators: /[!=\+%\*\-][!=\+\-]?|&(?:amp;){2}|&gt;|&lt;|(?:\|\|)/g,
            extra: /[:\{\}\[\]\(\)]/g
        },
        parse: function (E, X) {
            var D = s.languages[E];
            if (!D) {
                return X
            }
            var B = D.matchers,
                V = D.keywords,
                F = D.specials,
                A = (new Date).getTime(),
                C = {};
            X = a(X).replace(/\</g, "&lt;").replace(/>/g, "&gt;").replace(/&nbsp;/g, "");
            for (var U = 0, R = 0, Y; Y = B[U++];) {
                var W = this.regex[Y],
                    z = "\u00a3panda_" + Y + "_" + A + "_",
                    T = C[Y] = {},
                    Q = !1;
                W && (W.inner && (Q = W.inner, W = W.outer), X = X.replace(W, function (G) {
                    var w = z + R+++"_" + (W.multiline ? "m_" : "") + "panda\u00a3";
                    Q && (G = u("panda-" + Y, Q, G));
                    T[w] = G;
                    return w
                }))
            }
            V.length && (X = v(X, V, "panda-keyword"));
            F.length && (X = v(X, F, "panda-special"));
            D.noints || (X = X.replace(/\b\d+(?:\.\d+)?\b/g, function (w) {
                return t("panda-int", w)
            }));
            for (U = B.length; U; U--) {
                Y = B[U - 1];
                var D = C[Y],
                    S;
                for (S in D) {
                    V = D[S], S.indexOf("_m_") && (V = V.replace(/\n/g, '</span>\n<span clapanda="panda-' + Y + '">')), X = X.replace(S, t("panda-" + Y, V))
                }
            }
            X = X.split(" ").join("&nbsp;").replace(/&nbsp;clapanda=/g, " class=").replace(/\t/g, "&nbsp;&nbsp;&nbsp;&nbsp;");
            return a('<ol><li class="panda-line">' + X.split(/\n/).join('</li><li class="panda-line">') + "</li></ol>", 1)
        },
        identify: function (z) {
            if (z.pandaType) {
                return z.pandaType
            }
            var w = /(?:\s|^)panda[_-](\w+)(?:\s|$)/;
            return w.test(z.className) ? w.exec(z.className)[1] : "default"
        },
        colorNode: function (z) {
            var w = s.identify(z);
            s.cacheIdentity && (z.pandaType = w);
            z.className += " panda-code panda-" + w;
            z.innerHTML = s.parse(w, z.innerHTML)
        },
        addSpecials: function (z, w) {
            this.addKeywords(z, w, !0)
        },
        addKeywords: function (z, A, w) {
            if (z in s) {
                for (var C = 0, B = A.length; C < B; C++) {
                    s.languages[z][w ? "specials" : "keywords"].push(A[C])
                }
            }
        },
        addLang: function (z, A) {
            if ("matchers" in A) {
                var w = s.languages[z] = {};
                s.installedLanguages.push(z);
                w.matchers = "string" == typeof A.matchers ? A.matchers.split(" ") : A.matchers;
                w.specials = ("string" == typeof A.specials ? A.specials.split(" ") : A.specials) || [];
                w.keywords = ("string" == typeof A.keywords ? A.keywords.split(" ") : A.keywords) || [];
                if (A.regex && "object" == typeof A.regex) {
                    for (var B in A.regex) {
                        s.regex[B] = A.regex[B]
                    }
                }
            }
        }
    };
    window.panda = s;
    s.addLang("default", {
        matchers: ["string"],
        keywords: "var for while if else elseif function def class try catch return true false continue break case default delete switch in as null typeof sizeof null int char bool boolean long double float enum import struct signed unsigned",
        specials: ["document"]
    });
    s.onload = function () {
        for (var z = document.getElementsByTagName("code"), A = 0, w; w = z[A++];) {
            s.colorNode(w)
        }
    }
})();
panda.onload = function () {
    var a = ["default", "dark", "deepsea", "bright", "neon", "desert", "plain", "geany", "github"],
        t = document.getElementsByTagName("code"),
        A = my_getcookie("panda-theme"),
        z = '<option value="null"> -------------- </option>';
    for (var w = 0, v;
         (v = a[w++]);) {
        z += '<option value="' + v + '" ' + (A && A == v ? ' selected="selected"' : "") + ">";
        z += v.charAt(0).toUpperCase() + v.substr(1) + "</option>"
    }
    for (var u = 0, B;
         (B = t[u++]);) {
        panda.colorNode(B);
        $(B.parentNode.parentNode).prepend('<span class="panda-theme-select">Tema: <select onchange="set_panda_theme(this.value)">' + z + "</select></span>")
    }
    if (A) {
        set_panda_theme(A, t)
    }
};

function set_panda_theme(u, s) {
    s = s || document.getElementsByTagName("code");
    for (var t = 0, a;
         (a = s[t++]);) {
        a.className = a.className.replace(/\s?panda-theme-\w+\s?/, "") + " panda-theme-" + u
    }
    my_setcookie("panda-theme", u, 1)
}
$(panda.onload);

function selectCode(u) {
    u = u.parentNode.tagName === "B" ? $(u).closest("table").find(".cont_code")[0] : $(u).closest("dl").find("code")[0];
    if (window.getSelection) {
        var t = window.getSelection();
        if (t.setBaseAndExtent) {
            t.setBaseAndExtent(u, 0, u, u.innerText.length - 1)
        } else {
            window.opera && u.innerHTML.substring(u.innerHTML.length - 4) == "<BR>" && (u.innerHTML += " ");
            var s = document.createRange();
            s.selectNodeContents(u);
            t.removeAllRanges();
            t.addRange(s)
        }
    } else {
        document.getSelection ? (t = document.getSelection(), s = document.createRange(), s.selectNodeContents(u), t.removeAllRanges(), t.addRange(s)) : document.selection && (s = document.body.createTextRange(), s.moveToElementText(u), s.select())
    }
}
$(function () {
    $("dl.codebox:not(.spoiler,.hidecode) dt").append('<table class="cabecera-code"><td class="sel-code"><td><img class="codeimg" src="https://cdn1.iconfinder.com/data/icons/hawcons/32/698678-icon-70-document-code-24.png"/></td><td class="titulo-code">Código:</td><td onClick="selectCode(this)" class="selectCode" style="cursor:pointer">Seleccionar el contenido</td></table>')
});
if (tm) {
    $(document).ready(function () {
        var u = "phpbb3";
        var z = {
            repName: "Puntos",
            repStyle: "block",
            repImage: "http://i57.servimg.com/u/f57/18/21/41/30/star12.png"
        };
        var B = {
            lv1: 1,
            lv2: 50,
            lv3: 100,
            lv4: 150,
            lv5: 200,
            lv6: 350,
            lv7: 620,
            lv8: 840
        };
        if (z.repStyle.toLowerCase() == "block") {
            var v = '<span id="rLv" class="repuBlock">'
            } else {
                if (z.repStyle.toLowerCase() == "image") {
                    var v = '<img id="rLv" src="' + z.repImage + '"/>'
                    } else {
                        var v = '<span id="rLv" class="repuBlock">'
                        }
            }
        var a = {
            phpbb3: u.toLowerCase() == "phpbb3",
        };
        var w = new RegExp(".*" + z.repName + ":\\s+(\\d+).*");
        if (a.phpbb3 || a.punbb || a.invision) {
            if (a.phpbb3) {
                var A = ".postprofile";
                var t = $(this).find(".f_a1").append('<div id="repu">')
                }
            $(A).each(function () {
                var s = Number($(this).text().replace(w, "$1"));
                t;
                if (s >= B.lv1) {
                    $(this).find("#repu").append(v);
                    var C = s + "/" + B.lv2
                    }
                if (s >= B.lv2) {
                    $(this).find("#repu").append(v);
                    var C = s + "/" + B.lv3
                    }
                if (s >= B.lv3) {
                    $(this).find("#repu").append(v);
                    var C = s + "/" + B.lv4
                    }
                if (s >= B.lv4) {
                    $(this).find("#repu").append(v);
                    var C = s + "/" + B.lv5
                    }
                if (s >= B.lv5) {
                    $(this).find("#repu").append(v);
                    var C = s + "/" + B.lv6
                    }
                if (s >= B.lv6) {
                    $(this).find("#repu").append(v);
                    var C = s + "/" + B.lv7
                    }
                if (s >= B.lv7) {
                    $(this).find("#repu").append(v);
                    var C = s + "/" + B.lv8
                    }
                if (s >= B.lv8) {
                    $(this).find("#repu").append(v);
                    var C = "MAX"
                    }
                $(this).find("#repu").attr("title", "Reputation level " + $(this).find("#rLv").length + "\nNext : (" +
                                           C + ")")
            })
        }
    })
}
$("#fa_welcome").on("click", function () {
    $("#fa_menulist").animate({
        height: "toggle",
        opacity: "toggle"
    }, 300);
});
$("#fa_notifications").on("click", function () {
    $("#notif_list").animate({
        height: "toggle",
        opacity: "toggle"
    }, 300);
    $(this).attr("style", "background-image: url(http://adictosalgear.org/images/bell.png)!important;background-position: right!important;background-repeat: no-repeat!important;")
});

function AAGpreview() {
    if (ajax_preview_form) {
        $("#text_editor_textarea").sceditor("instance").updateOriginal();
        var u = $(ajax_preview_form).serialize(),
            t, s;
        if (3 > ajax_preview_form.message.length) {
            return alert("El mensaje es muy corto")
        }(s = document.getElementById("AAGpreview_overlay")) || (s = document.createElement("div"), s.id = "AAGpreview_overlay", document.body.appendChild(s), $(s).on("click", function () {
            $("#AAGpreview_overlay").add("#AAGpreview_box").hide()
        }));
        (t = document.getElementById("AAGpreview_box")) || (t = document.createElement("div"), t.id = "AAGpreview_box", document.body.appendChild(t));
        t.style.display = s.style.display = "block";
        t.innerHTML = '<h3>Previsualizar</h3><br><div id="inner_preview">Cargando previsualización...</div>';
        $.post(ajax_preview_form.action, u + "&preview=1", function (a) {
            a = a.substring(a.indexOf('class="h3">Previsualización'));
            a = a.substring(0, a.indexOf('class="corners-bottom">')).replace(/.*class="content"\>(.*?)\<\/div\>\<\/div\>\<span/, "$1");
            window.AAGBB && (a = AAGBB.parse(a));
            document.getElementById("inner_preview").innerHTML = a
        })
    }
}
$(function () {
    window.ajax_preview_form = document.post || document.getElementById("quick_reply") || null;
    ajax_preview_form && ajax_preview_form.preview && (ajax_preview_form.preview.type = "button", $(ajax_preview_form.preview).on("click", AAGpreview))
});
console.log("*************************** '¡allcode.js Listo!' **************************");
console.log("***************************************************************************");
if (!pu) {
    var m = {
        wall: 1,
        stats: 1,
        attachments: 0,
        friends: 1,
        contact: 1,
        rpg: 0,
        close: 1,
        avatar: 1
    };
    var r = document.getElementsByTagName("A");
    for (i = 0; i < r.length; i++) {
        if (/\/u\d+/.test(r[i].href) == true) {
            r[i].className = r[i].className + " profilePopup"
        }
    }
    $(".profilePopup:has(img)").removeClass("profilePopup");
    if (m.wall == 1) {
        var o = '<span class="propop_tab" id="propop_vm">Muro</span>'
        } else {
            var o = ""
            }
    if (m.stats == 1) {
        var g = '<span class="propop_tab" id="propop_stats">Estadisticas</span>'
        } else {
            var g = ""
            }
    if (m.attachments == 1) {
        var d = '<span class="propop_tab" id="propop_attach">Archivos</span>'
        } else {
            var d = ""
            }
    if (m.friends == 1) {
        var n = '<span class="propop_tab" id="propop_friends">Amigos</span>'
        } else {
            var n = ""
            }
    if (m.contact == 1) {
        var l = '<span class="propop_tab" id="propop_contact">Contacto</span>'
        } else {
            var l = ""
            }
    if (m.rpg == 1) {
        var p = '<span class="propop_tab" id="propop_rpg">Character sheet</span>'
        } else {
            var p = ""
            }
    if (m.close == 1) {
        var q = '<span class="propop_tab" id="close_popup" style="float:right;margin-top:-4px;">Cerrar</span>'
        } else {
            var q = ""
            }
    $(".profilePopup").on("click", function () {
        var C = $(this).attr("href");
        var A = $(this).text();
        var z = "#cp-main .panel, .forumline:has(#profile-advanced-details), .clear + #profile-advanced-details";
        var w = '<center><span class="profileLoading" style="font-weight:bold;font-size:18px;">Cargando...</span></center>';
        var B = "#propop_profile, #propop_vm, #propop_stats, #propop_friends, #propop_contact, #propop_rpg, #propop_attach, #propop_close";
        $("body").append('<div id="profilefilter" style="position:fixed;top:0px;left:0px;right:0px;bottom:0px;background:rgba(0,0,0, 0.5);cursor:pointer;z-index:10;"></div><div id="profcont-container" style="background:#D1D1D1;top:20%;left:15%;right:15%;padding:4px;position:fixed;font-size:12px;-webkit-border-radius:5px;-moz-border-radius:5px;border-radius:5px;-webkit-box-shadow:0px 0px 2px rgba(0,0,0, 0.5) inset;-moz-box-shadow:0px 0px 2px rgba(0,0,0, 0.5) inset;box-shadow:0px 0px 2px rgba(0,0,0, 0.5) inset;z-index:50;"><div class="profile_popup_nav">' +
                         o + '<span class="propop_tab" id="propop_profile">Perfil</span>' + g + d + n + l + p + q + '</div><a href="' + C + '"><div id="userAVA"></div></a><div id="userprofile" style="height:400px;overflow-y:auto;">' + w + '</div><span id="profileLinks"><a href="' + C + '">Ver perfil</a><span id="interactionLinks"> | <a href="/privmsg?mode=post&u=' + C.replace(/.*?\/u/, "") + '">Enviar MP</a> | <a href="/privmsg?mode=post_profile&u=' + C.replace(/.*?\/u/, "") + '">Escribir en el muro</a><span style="float:right;"><a href="/profile?friend=' + A.replace(/\s+/, "+") + '&mode=editprofile&page_profil=friendsfoes">Añadir a amigos</a> | <a href="/profile?foe=' + A.replace(/\s+/, "+") + '&mode=editprofile&page_profil=friendsfoes">Ignorar</a></span></span></div>');
        $("#userprofile").load(C + z);
        if (m.avatar == 1) {
            $("#userAVA").load(C + " #profile-advanced-right .module:first div img:first, .forumline td.row1.gensmall:first > img:first, .frm-set.profile-view.left dd img:first, dl.left-box.details:first dd img:first, .row1 b .gen:first img:first, .real_avatar img:first")
        }
        $("#propop_profile").addClass("activeTab");
        $("#propop_profile").on("click", function () {
            if ($(this).hasClass("activeTab")) {
                return
            }
            $(B).removeClass("activeTab");
            $(this).addClass("activeTab");
            $("#userprofile").html(w).load(C + z)
        });
        $("#propop_vm").on("click", function () {
            if ($(this).hasClass("activeTab")) {
                return
            }
            $(B).removeClass("activeTab");
            $(this).addClass("activeTab");
            $("#userprofile").html(w).load(C + "wall" + z)
        });
        $("#propop_stats").on("click", function () {
            if ($(this).hasClass("activeTab")) {
                return
            }
            $(B).removeClass("activeTab");
            $(this).addClass("activeTab");
            $("#userprofile").html(w).load(C + "stats" + z)
        });
        $("#propop_friends").on("click", function () {
            if ($(this).hasClass("activeTab")) {
                return
            }
            $(B).removeClass("activeTab");
            $(this).addClass("activeTab");
            $("#userprofile").html(w).load(C + "friends" + z)
        });
        $("#propop_contact").on("click", function () {
            if ($(this).hasClass("activeTab")) {
                return
            }
            $(B).removeClass("activeTab");
            $(this).addClass("activeTab");
            $("#userprofile").html(w).load(C + "contact" + z)
        });
        $("#propop_rpg").on("click", function () {
            if ($(this).hasClass("activeTab")) {
                return
            }
            $(B).removeClass("activeTab");
            $(this).addClass("activeTab");
            $("#userprofile").html(w).load(C + "rpg" + z)
        });
        $("#propop_attach").on("click", function () {
            if ($(this).hasClass("activeTab")) {
                return
            }
            $(B).removeClass("activeTab");
            $(this).addClass("activeTab");
            $("#userprofile").html(w).load(C + "attachments" + z)
        });
        if (!document.getElementById("logout")) {
            $("#interactionLinks").remove()
        }
        $("#profilefilter, #close_popup").on("click", function () {
            $("#profilefilter, #profcont-container").remove()
        });
        return false
    })
};