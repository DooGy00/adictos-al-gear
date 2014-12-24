$("form + .clear + p.right").clone().addClass("moderar").insertBefore($("#theme-banner-image"));
if (wl) {
    $("#AAGquickvm_message").length && ($(window).on("beforeunload", function() {
        if ($("textarea").val().length) {
            return _userdata.username + " todavía no has enviado el mensaje."
        }
    }), $("#AAGquickvm_send").submit(function() {
        $(window).off("beforeunload")
    }))
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
        init: function(v, s) {
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
        update: function() {
            if (this.initiated) {
                var s = document.getElementById("AAGstatus_notice");
                if (2 > this.input.value.length) {
                    return s.innerHTML = this.lang.too_short = this.lang.too_short
                }
                var t = document.getElementById("logout");
                t && (t = t.href, t = t.substring(t.indexOf("tid=") + 4, t.indexOf("&key")), t = "id=" + this.id.substring(this.id.lastIndexOf("_") + 1) + '&active=1&content=[["' + this.id + '", "' + this.input.value + '"]]&tid=' + t + "&user=" + this.user_id, $.post("/ajax_profile.forum?jsoncallback=jQuery1", t, function(a) {
                    0 < a.indexOf(status_box.input.value) ? (status_box.input.value = "", s.innerHTML = status_box.lang.updated, setTimeout("document.getElementById('AAGstatus_notice').innerHTML=\" \"", 2500)) : s.innerHTML = status_box.lang.error
                }))
            }
        }
    };
    if (_userdata.session_logged_in == "1") {
        $("#fa_menulist").append('<div id="AAGstatus"></div>');
        status_box.init("profile_field_13_1")
    }
}
if (lin || ps || mp) {
    var ta = document.getElementById("text_editor_textarea");
    if (ta && document.post) {
        var fix_it = function() {
            var s = $(ta).data("sceditor");
            s ? s.bind("keypress", s.updateOriginal).blur(s.updateOriginal) : setTimeout(fix_it, 200)
        };
        fix_it()
    }
    $(".sceditor-toolbar", function() {
        $(".sceditor-button").prependTo(".sceditor-group:eq(0)");
        $(".sceditor-group:eq(0)").addClass("piloto");
        $('<a class="sceditor-button post-preview-button" unselectable="on" title="Post Preview"><div unselectable="on" style="background-image:url(http://www.adictosalgear.org/adictosalgear/files/tv.png)!important">post</div></a><a class="sceditor-button no-guest-button" unselectable="on" title="No noguest"><div unselectable="on" style="background-image:url(http://www.adictosalgear.org/adictosalgear/files/glasses.png)!important">noguest</div></a><a class="sceditor-button tag-img-button" unselectable="on" title="Tag IMG"><div unselectable="on" style="background-image:url(http://www.adictosalgear.org/adictosalgear/files/tag.png)!important">IMG</div></a><a class="sceditor-button download-button" unselectable="on" title="Formato descargar"><div unselectable="on" style="background-image:url(http://www.adictosalgear.org/adictosalgear/files/savepdf.png)!important">descargar</div></a><a class="sceditor-button offtopic-button" unselectable="on" title="Offtopic"><div class="offtopic" unselectable="on" style="background-image:url(http://www.adictosalgear.org/adictosalgear/files/offtopic.png)!important" ></div></a><a title="Insert a linked image" class="sceditor-button sceditor-button-imganc"><div class="button-img-link" unselectable="on" style="background:url(http://i39.servimg.com/u/f39/18/21/41/30/imganc10.png)!important;">IMG link</div></a>').insertBefore(".sceditor-button-quote");
        $(".post-preview-button").on("click", function() {
            $("#text_editor_textarea").sceditor("instance").insertText("[post]", "[/post]")
        });
        $(".no-guest-button").on("click", function() {
            $("#text_editor_textarea").sceditor("instance").insertText("[noguest]", "[/noguest]")
        });
        $(".tag-img-button").on("click", function() {
            $("#text_editor_textarea").sceditor("instance").insertText("[img]", "[/img]")
        });
        $(".download-button").on("click", function() {
            $("#text_editor_textarea").sceditor("instance").insertText("[download]", " [/download]")
        });
        $(".offtopic-button").on("click", function() {
            $("#text_editor_textarea").sceditor("instance").insertText("[offtopic]", "[/offtopic]")
        });
        $(".sceditor-button-size").on("click", function() {
            s(9, "before");
            s(8, "before");
            s(7, "before");
            s(6, "before");
            s(26, "after");
            s(27, "after");
            s(28, "after");
            s(29, "after");
            $(".sceditor-fontsize-option.new-size").on("click", function(a) {
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
        $(".sceditor-button-imganc").on("click", function() {
            if ($(".sceditor-insertimganc").length) {
                return $(".sceditor-insertimganc").remove()
            }
            $("body").append('<div class="sceditor-dropdown sceditor-insertimganc" style="position:absolute;"><div><label>IMAGE URL:</label> <input id="imganc-img" class="url" placeholder="http://" type="text"></div><div><label>LINK URL:</label> <input id="imganc-url" class="url" placeholder="http://" type="text"></div><div><label>Width (optional):</label> <input id="imganc-width" size="2" type="text"></div><div><label>Height (optional):</label> <input id="imganc-height" size="2" type="text"></div><div><input id="submit-imganc" class="button" value="Insert" type="button"></div></div>');
            $(".sceditor-insertimganc").css({
                left: $(".sceditor-button-imganc").offset().left + "px",
                top: $(".sceditor-button-imganc").offset().top + 25 + "px"
            });
            $("#submit-imganc").on("click", function() {
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
        $(".sceditor-button-source").on("click", function() {
            $(".sceditor-button-imganc").removeClass("disabled")
        });
        $(".sceditor-button").not(".sceditor-button-imganc").on("click", function() {
            $(".sceditor-insertimganc").remove()
        });
        $(".sceditor-container textarea").focus(function() {
            $(".sceditor-insertimganc").remove()
        });
        $(".sceditor-container iframe").contents().mousedown(function() {
            $(".sceditor-insertimganc").remove()
        });
        if (_userdata.user_level >= 1) {
            $('<a class="sceditor-button warning-button" unselectable="on" title="Advertencia"><div unselectable="on" style="background-image:url(http://www.adictosalgear.org/adictosalgear/files/error.png)!important">Advertencia</div></a><a class="sceditor-button alert-button" unselectable="on" title="Alerta"><div unselectable="on" style="background-image:url(http://www.adictosalgear.org/adictosalgear/files/alert.png)!important">Alerta</div></a><a class="sceditor-button ok-button" unselectable="on" title="Éxito"><div unselectable="on" style="background-image:url(http://www.adictosalgear.org/adictosalgear/files/accept.png)!important">Exito</div></a><a class="sceditor-button info-button" unselectable="on" title="Información"><div unselectable="on" style="background-image:url(http://www.adictosalgear.org/adictosalgear/files/infop.png)!important">info</div></a>').insertBefore(".sceditor-button-source");
            $(".warning-button").on("click", function() {
                $("#text_editor_textarea").sceditor("instance").insertText("[warning]", "[/warning]")
            });
            $(".alert-button").on("click", function() {
                $("#text_editor_textarea").sceditor("instance").insertText("[alert]", "[/alert]")
            });
            $(".ok-button").on("click", function() {
                $("#text_editor_textarea").sceditor("instance").insertText("[ok]", "[/ok]")
            });
            $(".info-button").on("click", function() {
                $("#text_editor_textarea").sceditor("instance").insertText("[info]", "[/info]")
            })
        }
    })
}
if (mp) {
    $(".post-icon").find("img").replaceWith("<buttom>Enviar un MP</buttom>")
}
if (tm) {
    $.getScript("http://www.forumeiros.url.ph/js/lightbox2_fa.js");
    $(".postbody").find(".content").find("img").each(function() {
        $(this).not("a>img").not('img[src*="/smiles/"]').not(".img-descarga").wrap('<a href="' + jQuery(this).attr("src") + '" rel="lightbox"></a>')
    });
    if ($('img[alt="Este tema está cerrado y no puedes editar mensajes o responder"]').length) {
        $(".tema-info").addClass("lock-theme").attr("style", "background:url(https://cdn2.iconfinder.com/data/icons/ios-7-icons/50/lock-32.png)rgba(237,36,20,0.35)");
        $(".tema-info").find("h1").prepend('<img src="https://cdn2.iconfinder.com/data/icons/pittogrammi/142/91-48.png"style="margin-top: -10px;margin-bottom: -12px;">')
    }
    $(function() {
        $('a[href*="/modcp?mode=lock"]').on("click", function(s) {
            s.preventDefault();
            var a = $(this).attr("href");
            $.ajax({
                url: a,
                type: "GET",
                success: function(t) {
                    alert("Tema bloqueado.");
                    window.location.reload()
                },
                error: function() {
                    alert("Fallo bloquear el tema vía Ajax\nSeras redireccionado para hacerlo manualmente.");
                    window.location.href = a
                }
            })
        });
        $('a[href*="/modcp?mode=unlock"]').on("click", function(s) {
            s.preventDefault();
            var a = $(this).attr("href");
            $.ajax({
                url: a,
                type: "GET",
                success: function(t) {
                    alert("Tema desbloqueado.");
                    window.location.reload()
                },
                error: function() {
                    alert("Fallo desbloquear el tema vía Ajax\nSeras redireccionado para hacerlo manualmente.");
                    window.location.href = a
                }
            })
        });
        $('a[href*="/modcp?mode=trash"]').on("click", function(s) {
            s.preventDefault();
            var a = $(this).attr("href");
            $.ajax({
                url: a,
                type: "GET",
                success: function(t) {
                    alert("Se envió el tema a la papelera");
                    window.location.reload()
                },
                error: function() {
                    alert("Fallo el envio a la papelera vía Ajax\nSeras redireccionado para hacerlo manualmente.");
                    window.open(a)
                }
            })
        });
        $('a[href*="/modcp?mode=move"]').on("click", function(a) {
            a.preventDefault();
            var s = $(this).attr("href");
            $('<div id="moveTpcHw"><div class="mtHwCont"><div id="closeHwCont">Mover un tema<img title="Fechar" src="http://i.imgur.com/ELI5O7H.png" class="closeHwm"></div><div id="contHw"><img width="75" src="http://i.imgur.com/b2x7Vag.gif" style="margin-left: 35%;"></div></div><div id="lightBG"></div></div>"').insertBefore("body");
            $("<style>#lightBG {background-color: rgba(0, 0, 0, 0.6);height: 100%;left: 0;position: fixed;top: 0;width: 100%;z-index: 5;}#moveTpcHw {position: fixed;display:none;}.mtHwCont {background: none repeat scroll 0 0 #fff;border: 5px solid #cccccc;border-radius: 2px;height: auto;margin: 10% 40% 0;opacity: 1;padding: 10px;position: relative;width: 470px;z-index: 10;}#closeHwCont {font-family: sans-serif;background-color: #ddd;border-bottom: 1px solid #ccc;height: 23px;margin: -10px -10px 15px;padding: 10px;}#closeHwCont img {float: right;}</style>").insertBefore("body");
            $(".closeHwm").click(function() {
                $("#moveTpcHw").fadeOut("400", function() {
                    $("#moveTpcHw").delay("500").remove()
                })
            });
            $("#moveTpcHw").fadeIn();
            $("#contHw").load(s + " .move-theme", function() {
                $(this).find("label, .main-head").remove();
                $("#contHw form").css("margin-left", "-250px");
                $("#contHw .buttons2").css("border-top", "medium none");
                $('#contHw input[name="confirm"]').click(function(t) {
                    t.preventDefault();
                    var u = $("#contHw select").val();
                    $.post(s, {
                        confirm: 1,
                        new_forum: u
                    }).success(function() {
                        $("#contHw").html('Moviendo...<br/><img src="http://i.imgur.com/xMmmGWQ.gif"/>');
                        window.location.reload()
                    }).fail(function() {
                        alert("Fallo el mover el tema vía Ajax\nSeras redireccionado para hacerlo manualmente.");
                        window.location.href = s
                    })
                })
            })
        });
        $(".postbody .clearfix").each(function() {
            600 <= $(this).height() && $(this).addClass("baivietdai").height(310).after('<p class="thugon"><span><span class="viewfull">Ver completo</span><span class="viewhide" style="display:none">Colapsar</span></span><span><span class="fullOff" style="float:right">Desactivar colapso</span><span class="fullOn" style="float:right;display:none">Activar colapso</span></span></p>')
        });
        "100%" == my_getcookie("thugonbaiviet") && ($(".fullOn, .viewhide,.fullOff, .viewfull").toggle(), $(".baivietdai").height("100%"));
        $(".viewfull, .viewhide, .fullOff, .fullOn").click(function() {
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
    (function(s) {
        var a = [];
        jQuery.fn.zzConfirm = function(v) {
            var z = jQuery.extend({
                    content: "¿Estás seguro?",
                    lang: ["Ok", "Cancelar"],
                    width: "auto",
                    dir: "left",
                    toggle: !1,
                    clickOut: !1,
                    ok: function(D, C) {},
                    cancel: function(D, C) {}
                }, v),
                A, w, t = function(E, H) {
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
            return v.on("click", function(E) {
                E.preventDefault();
                A = s(this);
                var C = function(F) {
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
                        s("div", "#zzConfirm_btn").off("click").on("click", function() {
                            C()
                        });
                        s("#zzConfirm_yes").html(z.lang[0]).on("click", function() {
                            z.ok(A, w)
                        });
                        s("#zzConfirm_cancel").html(z.lang[1]).on("click", function() {
                            z.cancel(A, w)
                        });
                        w.attr("data-selector", B).css("width", z.width);
                        t(A, w);
                        var D = !0;
                        s(window).resize(function() {
                            D && (setTimeout(function() {
                                t(A.filter(".zzConfirm_active"), w);
                                D = !0
                            }, 100), D = !1)
                        });
                        z.clickOut && s(document).on("click", function(F) {
                            s(F.target).closest(w).length || s(F.target).closest(a.join()).length || C(B)
                        })
                    }
                }
            })
        }
    })(jQuery);
    $("a[href*='mode=delete']").zzConfirm({
        content: "¿Deseas eliminar este post",
        ok: function(t) {
            var s = t.closest(".post");
            s.css("opacity", 0.3);
            $.post(t[0].href, {
                confirm: 1
            }, function(a) {
                s.slideUp(function() {
                    s.remove();
                    $(".post").length || location.replace($(".nav[href^='/f']:last")[0].href)
                })
            })
        }
    });
    var zeditor = {
        version: "phpbb3",
        lang: {
            reply: 'Modo: <font color="purple" class="reply-mode">Respuesta</font>',
            pm: 'Modo: <font color="darkblue" class="mp-mode">Mensaje Privado</font>',
            edit: 'Modo: <font color="red" class="edit-mode">Edición</font>',
            quote: 'Modo: <font color="green" class="quote-mode">Citar</font>',
            preview: 'Modo: <font color="lightblue">Previsualizar</font>',
            loading: "Cargando...",
            flood_message: "No puedes enviar 2 mensajes consecutivos",
            error_message: "Ocurrió un error recarga la página",
            no_message: "Escribe un mensaje",
            notify_message: _userdata.username + " deseas etiquetar a",
            quote_message: "en el Post",
            tag_message_title: " fuiste etiquetado en ",
            tag_message_error: "No se encuentra el nombre",
            tag_message_content: " fuiste etiquetado en ",
            pm_message_title: "Te enviaron un mensaje en el tema",
            pm_message_error: "No se encuentra el nombre",
            reply_button: "Respuesta rápida",
            pm_button: "Mensaje Privado",
            subject_button: "Título",
            preview_button: "Previsualizar",
            advance_button: "Editor completo",
            close_button: "Cerrar",
            justify_button: '<img src="https://cdn3.iconfinder.com/data/icons/tango-icon-library/48/format-justify-fill-16.png"/>',
            left_button: '<img src="https://cdn3.iconfinder.com/data/icons/tango-icon-library/48/format-justify-left-16.png"/>',
            right_button: '<img src="https://cdn3.iconfinder.com/data/icons/tango-icon-library/48/format-justify-right-16.png"/>',
            center_button: '<img src="https://cdn3.iconfinder.com/data/icons/tango-icon-library/48/format-justify-center-16.png"/>',
            offtopic_button: '<img src="http://www.adictosalgear.org/adictosalgear/files/offtopic.png"/>',
            tagimg_button: '<img src="http://www.adictosalgear.org/adictosalgear/files/tag.png"/>',
            download_button: '<img src="https://cdn3.iconfinder.com/data/icons/fugue/icon/drive-download.png"/>',
            noguest_button: '<img src="http://www.adictosalgear.org/adictosalgear/files/glasses.png"/>',
            bold_button: '<img src="https://cdn3.iconfinder.com/data/icons/fugue/icon/edit-bold.png"/>',
            italic_button: '<img src="https://cdn3.iconfinder.com/data/icons/fugue/icon/edit-italic.png"/>',
            strike_button: '<img src="https://cdn3.iconfinder.com/data/icons/fugue/icon/edit-strike.png"/>',
            underline_button: '<img src="https://cdn3.iconfinder.com/data/icons/fugue/icon/edit-underline.png"/>',
            color_button: '<img src="https://cdn2.iconfinder.com/data/icons/crystalproject/Open-Office-Icons/stock_3d-colors-16.png"/>',
            smiley_button: '<img src="http://i82.servimg.com/u/f82/12/56/56/12/213.png"/>',
            image_button: '<img src="https://cdn1.iconfinder.com/data/icons/Momentum_GlossyEntireSet/16/img-landscape-add.png"/>',
            upload_button: '<img src="http://i82.servimg.com/u/f82/12/56/56/12/imag1010.gif"/>',
            warning_button: '<img src="http://www.adictosalgear.org/adictosalgear/files/error.png"/>',
            alert_button: '<img src="http://www.adictosalgear.org/adictosalgear/files/alert.png"/>',
            ok_button: '<img src="http://www.adictosalgear.org/adictosalgear/files/accept.png"/>',
            info_button: '<img src="http://www.adictosalgear.org/adictosalgear/files/infop.png"/>',
            code_button: '<img src="https://cdn3.iconfinder.com/data/icons/fugue/icon/edit-code.png"/>',
            hidecode_button: '<img src="https://cdn1.iconfinder.com/data/icons/jigsoar-icons/16/_code.png"/>',
            postlink_button: '<img src="https://cdn3.iconfinder.com/data/icons/fatcow/16/link_add.png">',
            send_button: "Enviar",
            tag_button: "@",
            imgur_placeholder1: "Selecciona los archivos",
            imgur_placeholder2: "URL externa",
        },
        imgur_key: "6528448c258cff474ca9701c5bab6927",
        post_dom: ".post",
        message_dom: ".zeditor-message",
        button_dom: ".zeditor-buttons",
        preview_dom: 0,
        editor: 0,
        mode: 0,
        url: 0,
        textarea: 0,
        ready: function() {
            if (zeditor.version == "phpbb3") {
                zeditor.preview_dom = ".content";
                zeditor.button_dom = ".profile-icons"
            }
            if (!window.jQuery) {
                alert("JQuery is required to run this. Visit http://www.jquery.com/ for more details")
            } else {
                zeditor.button(zeditor.button_dom);
                for (var s = $(zeditor.message_dom), a = 0, t = s.length; a < t; a++) {
                    s[a].innerHTML = zeditor.replace(s[a].innerHTML)
                }
                $(document.body).append('<div id="ze-editor" style="display:none"><form id="ze-editor-form" name="ze-editor" method="post" action="/post"><div id="editor-top"><div id="editor-tool"><span onclick="zeditor.add(\'[b]\',\'[/b]\')" class="editor-button-outer" title="Negritas">' + zeditor.lang.bold_button + '</span><span onclick="zeditor.add(\'[i]\',\'[/i]\')"  class="editor-button-outer" title="Italica">' + zeditor.lang.italic_button + '</span><span onclick="zeditor.add(\'[u]\',\'[/u]\')"  class="editor-button-outer" title="Subrayado">' + zeditor.lang.underline_button + '</span><span onclick="zeditor.add(\'[strike]\',\'[/strike]\')"  class="editor-button-outer" title="Cancelado">' + zeditor.lang.strike_button + "</span><span onclick=\"zeditor.add('[strike]','[/strike]')\"  class=\"editor-button-outer\">" + zeditor.lang.strike_button + "</span><span onclick=\"zeditor.add('[justify]','[/justify]')\" class=\"editor-button-outer\">" + zeditor.lang.justify_button + "</span><span onclick=\"zeditor.add('[center]','[/center]')\" class=\"editor-button-outer\">" + zeditor.lang.center_button + "</span><span onclick=\"zeditor.add('[left]','[/left]')\" class=\"editor-button-outer\">" + zeditor.lang.left_button + "</span><span onclick=\"zeditor.add('[right]','[/right]')\" class=\"editor-button-outer\">" + zeditor.lang.right_button + '</span><span class="editor-button-outer" title="Color de la fuente" onclick="zeditor.popup(\'ze-color\', this);zeditor.createColor()">' + zeditor.lang.color_button + '</span><span title="Inserta un url" onclick="zeditor.add(\'[url]\',\'[/url]\')" class="editor-button-outer">' + zeditor.lang.postlink_button + '</span><span title="Tags para colocar código, contine además el hide" onclick="zeditor.add(\'[hide][code]\',\'[/code][/hide]\')"  class="editor-button-outer">' + zeditor.lang.code_button + '</span><span title="Tags para colocar código oculto, contine además el hide" onclick="zeditor.add(\'[hidecode]\',\'[/hidecode]\')"  class="editor-button-outer">' + zeditor.lang.hidecode_button + '</span><span class="editor-button-outer" onclick="zeditor.popup(\'ze-smiley\', this);zeditor.createSmilies()" title="Smilies">' + zeditor.lang.smiley_button + '</span><span class="editor-button-outer" onclick="zeditor.popup(\'ze-upload\', this);zeditor.imgur.prepare()" title="Subir una imagen">' + zeditor.lang.upload_button + '</span><span class="editor-button-outer" onclick="zeditor.tag(this)" title="Etiqueta al usuario de este post">' + zeditor.lang.tag_button + '</span><span title="Ocultar un link para compartir" onclick="zeditor.add(\'[download]\',\' [/download]\')" class="editor-button-outer">' + zeditor.lang.download_button + '</span><span title="ocultar texto de los visitantes" onclick="zeditor.add(\'[noguest]\',\'[/noguest]\')" class="editor-button-outer">' + zeditor.lang.noguest_button + '</span><span title="Colocar tags IMG a una imagen" onclick="zeditor.add(\'[img]\',\'[/img]\')" class="editor-button-outer">' + zeditor.lang.tagimg_button + '</span><span title="Contenido offtopic" onclick="zeditor.add(\'[offtopic]\',\'[/offtopic]\')" class="editor-button-outer">' + zeditor.lang.offtopic_button + '</span><div class="modbar" style="display:none"><span title="Moderación Warning" onclick="zeditor.add(\'[warning]\',\'[/warning]\')" class="editor-button-outer">' + zeditor.lang.warning_button + '</span><span title="Moderación Alerta" onclick="zeditor.add(\'[alert]\',\'[/alert]\')" class="editor-button-outer">' + zeditor.lang.alert_button + '</span><span title="Moderación todo esta bien" onclick="zeditor.add(\'[ok]\',\'[/ok]\')" class="editor-button-outer">' + zeditor.lang.ok_button + '</span><span title="Moderación Información" onclick="zeditor.add(\'[info]\',\'[/info]\')" class="editor-button-outer">' + zeditor.lang.info_button + '</span></div></div></div><div id="ze-popups"><div id="ze-subject" class="ze-popups" style="display:none"><input id="editor-subject" type="text"></input></div><div id="ze-mode" class="ze-popups" style="display:none"><p><center>Selecciona un tema</center></p><p><input type="radio" name="ze-mode" checked="checked"> Light grey</input><p></div><div id="ze-color" class="ze-popups" style="display:none"></div><div id="ze-smiley" class="ze-popups" style="display:none"></div><div id="ze-image" class="ze-popups" style="display:none"><input type="text" style="height:20px;border:1px solid #BDBDBD" /><div><br><span class="editor-button-confirm" onclick="zeditor.popup(\'ze-image\', this);zeditor.add(\'[img]\'+this.parentNode.previousSibling.value, \'[/img]\');this.parentNode.previousSibling.value=\'\'">OK</span></div></div><div id="ze-upload" class="ze-popups" style="display:none"><div id="ze-imgur"><span id="ze-imgur-mode" class="editor-button-confirm" onclick="zeditor.imgur.mode()">Mode</span><span onclick="zeditor.imgur.files()"><input id="ze-imgur-input" type="input" placeholder="' + zeditor.lang.imgur_placeholder1 + '" value="" disabled></span><span id="ze-imgur-submit" class="editor-button-confirm" onclick="zeditor.imgur.submit(this)">Submit</span><input type="file" id="ze-imgur-placeholder" multiple><div id="ze-imgur-status"></div><div id="ze-imgur-images"></div></div></div></div><div id="outer-preview"><div id="ze-preview" ondblclick="zeditor.closePreview(this)"></div><div id="editor-loading" style="display: none"><img src="http://i11.servimg.com/u/f11/16/80/27/29/ajax-l10.gif" /><br>' + zeditor.lang.loading + '</div><textarea name="message" id="editor-textarea" placeholder="Escribe tu mensaje"></textarea></div><div id="editor-data"><input type="hidden" value="reply" name="mode"><input type="hidden" value="1" name="notify"></div><div id="editor-post-tool"><span class="mp-msg" style="margin-top:7px;position:absolute;margin-left:248px;color:#fff;"></span><div id="editor-post-button"><span  id="editor-send-button" onclick="zeditor.post(this)">' + zeditor.lang.send_button + '</span><span onclick="zeditor.preview(this)" id="editor-preview-button">' + zeditor.lang.preview_button + '</span><span class="advance-button" onclick="zeditor.advance()">' + zeditor.lang.advance_button + '</span></div><div id="editor-mode"><span onclick="zeditor.popup(\'ze-subject\', this)">' + zeditor.lang.subject_button + '</span><span class="mode-button" onclick="zeditor.popup(\'ze-mode\', this)"></span></div></div></form></div>')
            }
            zeditor.textarea = document.getElementById("editor-textarea");
            zeditor.subject = document.getElementById("editor-subject");
            zeditor.mode = document.getElementById("editor-mode").getElementsByTagName("span")[1];
            zeditor.editor = document.getElementById("ze-editor");
            if (_userdata.user_level >= 1) {
                $(".modbar").removeAttr("style")
            }
        },
        quote: function(a) {
            zeditor.loading("on");
            $.get(a.href, function(s) {
                zeditor.textarea.value = $(s).find("#text_editor_textarea").val().replace(/]/, '][quotelink="' + location.pathname + "#" + a.href.match(/[0-9]+/) + '"]');
                zeditor.textarea.focus();
                zeditor.loading("off")
            })
        },
        edit: function(a) {
            zeditor.loading("on");
            zeditor.url = a.href;
            if (zeditor.textarea.value != "") {
                if (confirm(_userdata.username + " de continuar  perderas lo escrito")) {
                    $.get(a.href, function(s) {
                        zeditor.textarea.value = $(s).find("#text_editor_textarea").val();
                        zeditor.subject.value = $(s).find('input[name="subject"]').val();
                        zeditor.textarea.focus();
                        zeditor.loading("off")
                    })
                } else {
                    zeditor.textarea.focus();
                    zeditor.loading("off");
                    return
                }
            } else {
                $.get(a.href, function(s) {
                    zeditor.textarea.value = $(s).find("#text_editor_textarea").val();
                    zeditor.subject.value = $(s).find('input[name="subject"]').val();
                    zeditor.textarea.focus();
                    zeditor.loading("off")
                })
            }
        },
        button: function(s) {
            $(s).each(function() {
                $(this).find('a[href*="quote"]').attr("onclick", "zeditor.start('quote', this); return false");
                $(this).parent().parent().after('<table><td><a class="pbutton1" onclick="zeditor.start(\'reply\', this)">' + zeditor.lang.reply_button + '</a></td><td><a class="pbutton2" onclick="zeditor.start(\'pm\', this)">' + zeditor.lang.pm_button + "</a></td></table>");
                $(this).find('a[href*="editpost"]').attr("onclick", "zeditor.start('edit', this); return false")
            })
        },
        start: function(t, a) {
            $(zeditor.editor).appendTo($(a).parents(zeditor.post_dom).find(zeditor.message_dom));
            $(zeditor.editor).slideDown();
            switch (t) {
                case "reply":
                    zeditor.textarea.focus();
                    zeditor.url = $('a[href^="/post?t="]').first().attr("href");
                    zeditor.mode.innerHTML = zeditor.lang.reply;
                    zeditor.textarea.placeholder = _userdata.username + " escribe un comentario...";
                    if (zeditor.textarea.value != "") {
                        alert(_userdata.username + " si deseas publicar tu mensaje presiona ENVIAR");
                        $("#editor-send-button ").css("background", "gold")
                    }
                    if ($("#editor-send-button").text() === "Guardar") {
                        $("#editor-send-button").text("Enviar")
                    }
                    break;
                case "quote":
                    zeditor.url = a.href;
                    zeditor.quote(a);
                    zeditor.mode.innerHTML = zeditor.lang.quote;
                    if ($("#editor-send-button").text() === "Guardar") {
                        $("#editor-send-button").text("Enviar")
                    }
                    zeditor.textarea.focus();
                    break;
                case "edit":
                    zeditor.edit(a);
                    zeditor.mode.innerHTML = zeditor.lang.edit;
                    $("#editor-send-button").text("Guardar");
                    zeditor.textarea.focus();
                    break;
                case "pm":
                    if ($("#editor-send-button").text() === "Guardar") {
                        $("#editor-send-button").text("Enviar")
                    }
                    zeditor.textarea.focus();
                    zeditor.url = !1;
                    zeditor.mode.innerHTML = zeditor.lang.pm;
                    zeditor.textarea.placeholder = _userdata.username + " redacta tu mensaje privado...";
                    var s = $(".mp-mode").parents(zeditor.post_dom).find(".author").find('a[href^="/u"]').eq(0).text();
                    $(".mp-msg").html("Mensaje para:" + s);
                    zeditor.textarea.focus();
                    break
            }
        },
        add: function(u, s) {
            zeditor.textarea.focus();
            if (typeof(zeditor.textarea) != "undefined") {
                var v = parseInt(zeditor.textarea.value.length);
                var t = zeditor.textarea.selectionStart;
                var w = zeditor.textarea.selectionEnd;
                zeditor.textarea.value = zeditor.textarea.value.substring(0, t) + u + zeditor.textarea.value.substring(t, w) + s + zeditor.textarea.value.substring(w, v)
            } else {
                zeditor.textarea.value += u + s
            }
            zeditor.textarea.focus()
        },
        preview: function(a) {
            preview = document.getElementById("ze-preview");
            if (preview.style.display == "block") {
                preview.style.display = "none";
                document.getElementById("editor-top").setAttribute("style", "height:38px; transform: scaleY(1);-webkit-transform: scaleY(1)");
                a.innerHTML = zeditor.lang.preview_button
            } else {
                a.innerHTML = zeditor.lang.close_button;
                document.getElementById("editor-top").setAttribute("style", "height:3px; transform: scaleY(0);-webkit-transform: scaleY(0)");
                $.post(zeditor.url, {
                    message: zeditor.textarea.value,
                    preview: "Preview",
                }, function(s) {
                    preview.style.display = "block";
                    preview.innerHTML = zeditor.replace($(s).find(zeditor.preview_dom).html())
                })
            }
        },
        closePreview: function(a) {
            $(a).hide();
            zeditor.textarea.focus();
            document.getElementById("editor-preview-button").innerHTML = zeditor.lang.preview_button;
            document.getElementById("editor-top").setAttribute("style", "height:38px; transform: scaleY(1);-webkit-transform:scaleY(1)")
        },
        post: function(a) {
            if (zeditor.mode.innerHTML == zeditor.lang.quote) {
                zeditor.url = $('a[href^="/post?t="]').first().attr("href")
            }
            if (zeditor.url) {
                if (zeditor.textarea.value == 0) {
                    alert(zeditor.lang.no_message)
                } else {
                    $.post(zeditor.url, {
                        post: "Send",
                        message: zeditor.textarea.value,
                        subject: zeditor.subject.value
                    }, function(u) {
                        var t = "Tu mensaje ha sido publicado con éxito",
                            s = "Tu mensaje ha sido publicado con éxito";
                        b = (u.indexOf(t) < 0) ? s : t;
                        index = u.indexOf(b);
                        if (u.indexOf("Flood control") > 0) {
                            alert(zeditor.lang.flood_message)
                        } else {
                            if (u.indexOf("A new message") > 0) {
                                $.post("/post", $(u).find("form[name='post']").serialize() + "&post=1", function(v) {
                                    (index < 0) ? alert(zeditor.lang.error_message): zeditor.newPost($(v).find('p:contains("' + b + '") a:first').attr("href"));
                                    zeditor.closePreview("#ze-preview")
                                })
                            } else {
                                (index < 0) ? alert(zeditor.lang.error_message): zeditor.newPost($(u).find('p:contains("' + b + '") a:first').attr("href"));
                                zeditor.closePreview("#ze-preview")
                            }
                        }
                    })
                }
            } else {
                zeditor.pm(a)
            }
        },
        newPost: function(a) {
            var s = a.split("#")[1];
            zeditor.editor.style.display = "none";
            if (zeditor.mode.innerHTML == zeditor.lang.reply || zeditor.mode.innerHTML == zeditor.lang.quote) {
                $.get(a, function(t) {
                    $('<div class="zeditor-new">' + zeditor.replace($(t).find("#p" + s).wrapAll("<div></div>").parent().html()) + "</div>").insertAfter(zeditor.post_dom + ":last");
                    $("html,body").animate({
                        scrollTop: $(".zeditor-new:last").offset().top
                    }, 300);
                    zeditor.button(".zeditor-new:last " + zeditor.button_dom)
                })
            }
            if (zeditor.mode.innerHTML == zeditor.lang.edit) {
                dom = $(zeditor.editor).parents(zeditor.post_dom).find(zeditor.message_dom);
                $.get(a, function(t) {
                    $(dom).html(zeditor.replace($(t).find("#p" + s + " " + zeditor.message_dom).html()));
                    $(dom).hide().fadeIn("slow")
                })
            }
            zeditor.textarea.value = "", $(function() {
                if ($(".reply-mode").length) {
                    $.post("/privmsg", {
                        subject: "Mensaje automático",
                        message: _userdata.username + " comentó en : [url=" + window.location.href + "]" + document.title + "[/url]",
                        username: "Historial",
                        mode: "post_profile",
                        folder: "profile",
                        post: "Send"
                    });
                }
                if (_userdata.user_posts > 5) {
                    if ($(".post").first().find(".descargar").length > 0) {
                        $(".descargar").find("a,span").removeAttr("style")
                    }
                }
            })
        },
        popup: function(a, s) {
            zeditor.textarea.focus();
            x = document.getElementById(a);
            y = document.getElementById("ze-editor").offsetWidth;
            if (x.style.display == "none") {
                position = $(s).position().left;
                x.setAttribute("style", "display: block");
                if (position + x.offsetWidth + 20 > y) {
                    position = y - x.offsetWidth - 20
                }
                x.style.left = position - 30 + "px"
            } else {
                x.style.display = "none"
            }
            $("#" + a).siblings().hide()
        },
        createSmilies: function() {
            smiley = document.getElementById("ze-smiley");
            if (smiley.innerHTML == "") {
                $(smiley).load("/smilies.forum?mode=smilies_frame", function() {
                    this.innerHTML = this.innerHTML.replace(/alt=\"(.*?)\"/g, "onclick=\"zeditor.smiley('$1')\"")
                })
            }
        },
        createColor: function() {
            if (!document.getElementById("ze-color-inner")) {
                var t = '<table cellspacing="0" id="ze-color-inner">';
                var s = new Array("00", "33", "66", "99", "CC", "FF");
                for (i = 5; i >= 0; i--) {
                    t = t + "<tr>";
                    for (j = 5; j >= 0; j--) {
                        for (k = 5; k >= 0; k--) {
                            var u = s[j] + s[i] + s[k];
                            t = t + '<td style="background: #' + u + '" title="#' + u + '"><div style="background:#' + u + '" onclick="zeditor.add(\'[color=#' + u + "]', '[/color]');zeditor.hideColor()\"></div></td>"
                        }
                    }
                    t = t + "</tr>"
                }
                document.getElementById("ze-color").innerHTML = t + '</table><div id="ze-color-info"><div class="ze-color-input"><div>#</div><input id="ze-color-hex" maxlength="6" onkeypress="zeditor.convertHex(this)" placeholder="000000"></div><div class="ze-color-input"><div>R</div><input id="ze-color-r" maxlength="3" onkeypress="zeditor.convertRGB()" placeholder="000"></div><div class="ze-color-input"><div>G</div><input id="ze-color-g" maxlength="3" onkeypress="zeditor.convertRGB()" placeholder="000"></div><div class="ze-color-input"><div>B</div><input id="ze-color-b" maxlength="3" onkeypress="zeditor.convertRGB()" placeholder="000"></div><div class="editor-button-confirm" onclick="zeditor.submitColor()">OK</div></div>'
            }
        },
        hideColor: function() {
            document.getElementById("ze-color").setAttribute("style", "display:none")
        },
        submitColor: function() {
            if (document.getElementById("ze-color-hex").value !== "") {
                zeditor.add("[color=#" + document.getElementById("ze-color-hex").value + "]", "[/color]")
            } else {
                zeditor.add("[color=#000000]", "[/color]")
            }
            zeditor.hideColor()
        },
        convertHex: function(a) {
            var a = a.value,
                s = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(a);
            s ? (document.getElementById("ze-color-r").value = parseInt(s[1], 16), document.getElementById("ze-color-g").value = parseInt(s[2], 16), document.getElementById("ze-color-b").value = parseInt(s[3], 16)) : null
        },
        convertRGB: function() {
            var s = document.getElementById("ze-color-r").value,
                u = document.getElementById("ze-color-g").value,
                t = document.getElementById("ze-color-b").value,
                v = t | (u << 8) | (s << 16);
            document.getElementById("ze-color-hex").value = (16777216 + v).toString(16).slice(1)
        },
        smiley: function(a) {
            zeditor.textarea.value += a;
            zeditor.textarea.focus();
            document.getElementById("ze-smiley").style.display = "none"
        },
        tag: function(s) {
            var a = $(s).parents(zeditor.post_dom).find('a[href^="/u"]:has(span)').eq(0).text(),
                t = $(s).parents(zeditor.post_dom).find(".nombre-tema").find("a").attr("href");
            zeditor.textarea.value += "[tag]" + a + "[/tag] ";
            tagname = a;
            if (a.length > 0) {
                if (confirm(zeditor.lang.notify_message + " " + a + "?")) {
                    zeditor.post_pm(a, zeditor.lang.tag_message_title + ' "' + document.title + '"', tagname + zeditor.lang.tag_message_content + ' <a href="' + t + '"> ' + document.title + " en el post: " + t.split("#")[1] + "</a>")
                }
            } else {
                alert(zeditor.lang.tag_message_error)
            }
        },
        pm: function(s) {
            var t = $(s).parents(zeditor.post_dom).find('a[href^="/u"]:not(:empty)').eq(1).text();
            if (t.length > 0) {
                zeditor.post_pm(t, zeditor.lang.pm_message_title + ' "' + document.title + '"', zeditor.textarea.value)
            } else {
                alert(zeditor.lang.pm_message_error)
            }
            zeditor.textarea.value = ""
        },
        post_pm: function(a, s, t) {
            $.post("/privmsg?mode=post&post=1", {
                "username[]": a,
                subject: s,
                message: t,
                post: "Send",
                folder: "inbox"
            }, function() {
                $("textarea").attr("placeholder", _userdata.username + " tu mensaje privado se envió con éxito")
            })
        },
        replace: function(a) {
            return a.replace(/\[tag\](.*?)\[\/tag\]/g, function(s, t) {
                return '<a href="/profile?mode=viewprofile&u=' + t.replace(/ /g, "+") + '" onmouseover="zeditor.avatar(this, this.href)" class="ze-avatar">@' + t + "</a>"
            }).replace(/:<\/cite>\[quotelink="(\S+)"\]/gi, function(s, t) {
                return " " + zeditor.lang.quote_message + ' <a href="' + t + '"> ' + t.split("#")[1] + "</a></cite>"
            })
        },
        loading: function(a) {
            b = document.getElementById("editor-loading");
            a == "on" ? (b.style.display = "") : (b.style.display = "none")
        },
        advance: function() {
            if ($(".edit-mode").length || $(".quote-mode").length) {
                location.href = zeditor.url;
                window.onbeforeunload = false
            }
            var a = $(".mp-mode").parents(zeditor.post_dom).find(".author").find('a[href^="/u"]').eq(0).attr("href").split("u");
            a[1];
            if ($(".mp-mode").length && zeditor.textarea.value === "") {
                location.href = "privmsg?mode=post&u=" + a[1]
            } else {
                window.onbeforeunload = false;
                if (confirm(_userdata.username + " de continuar  perderas lo escrito ¿Deseas ir al editor avanzado?")) {
                    location.href = "privmsg?mode=post&u=" + a[1]
                } else {
                    zeditor.textarea.focus()
                }
            }
            if ($(".reply-mode").length && zeditor.textarea.value != "") {
                window.onbeforeunload = false;
                if (confirm(_userdata.username + " de continuar  perderas lo escrito ¿Deseas ir al editor avanzado?")) {
                    location.href = zeditor.url
                } else {
                    zeditor.textarea.focus()
                }
            }
            if ($(".reply-mode").length && zeditor.textarea.value === "") {
                location.href = zeditor.url
            }
        },
        avatar: function(a, s) {
            if (a.getElementsByTagName("span")[0] == null) {
                $.get(s, function(t) {
                    a.innerHTML += "<span>" + $(t).find("#profile-advanced-right img:first")[0].outerHTML + "</span>"
                })
            }
        },
        imgur: {
            input: 0,
            holder: [],
            prepare: function() {
                zeditor.imgur.input = document.getElementById("ze-imgur-input");
                document.getElementById("ze-imgur-placeholder").addEventListener("change", function(a) {
                    var s = a.target.files;
                    for (i = 0; i < s.length; i++) {
                        if (s[i].type.match(/image.*/)) {
                            zeditor.imgur.holder.push(s[i])
                        }
                        zeditor.imgur.input.value = this.value
                    }
                }, false)
            },
            mode: function() {
                if (zeditor.imgur.input.placeholder == zeditor.lang.imgur_placeholder1) {
                    zeditor.imgur.input.placeholder = zeditor.lang.imgur_placeholder2;
                    zeditor.imgur.input.disabled = false;
                    zeditor.imgur.input.parentNode.removeAttribute("onclick");
                    zeditor.imgur.input.value = ""
                } else {
                    zeditor.imgur.input.placeholder = zeditor.lang.imgur_placeholder1;
                    zeditor.imgur.input.disabled = true;
                    zeditor.imgur.input.parentNode.setAttribute("onclick", "zeditor.imgur.files()");
                    zeditor.imgur.input.value = ""
                }
            },
            files: function() {
                document.getElementById("ze-imgur-placeholder").click()
            },
            upload: function(u) {
                document.body.className = "uploading";
                var v = new FormData();
                v.append("image", u);
                v.append("key", zeditor.imgur_key);
                var t = new XMLHttpRequest();
                var s = document.getElementById("ze-imgur-images");
                t.open("POST", "http://api.imgur.com/2/upload.json");
                t.onload = function() {
                    if (this.status == 400) {
                        document.getElementById("ze-imgur-status").innerHTML = JSON.parse(t.responseText).error.message
                    } else {
                        var z = JSON.parse(t.responseText).upload.links;
                        var w = z.small_square;
                        var B = z.imgur_page;
                        var a = document.createElement("a");
                        a.href = B;
                        a.addEventListener("click", function(C) {
                            C.preventDefault();
                            zeditor.textarea.value += "[img]" + this.firstChild.src.replace("s.", ".") + "[/img]"
                        });
                        var A = document.createElement("img");
                        A.src = w;
                        a.appendChild(A);
                        s.appendChild(a);
                        document.body.className = "uploaded"
                    }
                };
                t.send(v)
            },
            submit: function() {
                if (zeditor.imgur.input.placeholder == zeditor.lang.imgur_placeholder1) {
                    for (var s = 0; s < zeditor.imgur.holder.length; s++) {
                        zeditor.imgur.upload(zeditor.imgur.holder[s])
                    }
                } else {
                    zeditor.imgur.upload(document.getElementById("ze-imgur-input").value)
                }
            },
        },
    };
    var zeditoronbeforeunload = $("#editor-post-button").find("span");
    window.onbeforeunload = function(s) {
        if (zeditor.textarea.value != "") {
            return _userdata.username + " tienes texto en el editor que podrias perder"
        }
    };
    zeditoronbeforeunload.submit = function(s) {
        window.onbeforeunload = false
    };
    $(function() {
        zeditor.ready()
    });
    $(".mp").on("click", function(s) {
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
    $(".post").find(".postnumber").find("a").on("click", function() {
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
        $(".pbutton1").add(".pbutton2").add(".quote a").add(".edit a").add(".mp").add(".postnumber a").on("click", function() {
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
    e.on("click", function(s) {
        s.preventDefault();
        var t = $(this).attr("href");
        var u = $(this);
        $.post(t, {
            confirm: 1
        }).success(function() {
            var a = u.attr("href");
            a.replace(/\?watch=forum/g, "?unwatch=forum");
            u.html(unwatchBTN);
            u.attr("href", a);
            alert("vigilas este  subforo");
             $.post("/privmsg", {
                    subject: "Actividad de los usuarios",
                    message: _userdata.username + ' esta vigilando el foro: ' + document.title,
                    username: 'Historial',
                    mode: "post_profile",
                    folder: "profile",
                    post: "Send"
                });
        })
    });
    var c = $('a[href*="?unwatch=forum"]');
    c.on("click", function(s) {
        s.preventDefault();
        var u = $(this).attr("href");
        var t = $(this);
        $.post(u, {
            confirm: 1
        }).success(function() {
            var a = t.attr("href");
            a.replace(/\?unwatch=forum/g, "?watch=forum");
            t.html(watchBTN);
            t.attr("href", a);
           alert("Ya no sigues el subforo");
             $.post("/privmsg", {
                    subject: "Actividad de los usuarios",
                    message: _userdata.username + ' dejo de vigilar el foro: ' + document.title,
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
    $(function() {
        $(".panel.mps-index").after('<div class="forabg preview-mp"><ul class="topiclist"><li id="ajaxPM_header" class="header"><dl><dt>Selecciona el mensaje :</dt></dl></li></ul><div id="ajaxPM" class="panel" style="padding:3px;"><div style="text-align:center;font-size:16px;">No hay mensaje seleccionado</div></div></div>');
        _activePM = undefined;
        $(".pmlist").find(".topictitle").on("click", function() {
            if ($(this).attr("href") == _activePM) {
                if (document.getElementById("notif_activepm")) {
                    return false
                }
                $("body").append('<div id="notif_activepm" class="notif_ajaxPM"><div class="notif_icon">!</div>El MP que seleccionaste esta actualmente activo.<br/><a id="dismiss_notif" style="cursor:pointer;float:right;">Cerrar la notificación</a></div>');
                $("#dismiss_notif").on("click", function() {
                    $(".notif_ajaxPM").fadeOut(300, function() {
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
            $("#ajaxPM").html('<div style="text-align:center;font-size:16px;">Cargando...</div>').load(_activePM + ' form[action^="/privmsg"]', function() {
                $("#ajaxPM_header dl").append('<dd id="ajaxPM_nav" style="float:right"><a id="directLink" class="ajaxPM_link">Ver más</a>&nbsp;&bull;&nbsp;<a id="clearSelected" class="ajaxPM_link">Limpiar</a></dd>');
                $("#directLink").attr("href", _activePM);
                $("#clearSelected").on("click", function() {
                    $("#ajaxPM").html('<div style="text-align:center;font-size:16px;">No seleccionaste un mensaje</div>');
                    $("#ajaxPM_nav, .notif_ajaxPM").remove();
                    _activePM = undefined
                })
            });
            return false
        })
    })
}
var quicktopic = {
    color: "orange"
};
(function(u) {
    function s() {
        u("body").prepend('<div id="loading-bar" style="z-index: 9999; background-color: ' + quicktopic.color + '; position: fixed; top: 0; width: 20%; left: 0; height: 3px;"></div>');
        document.forms.post.message.value = u("#text_editor_textarea").sceditor("instance").val();
        u.post("/post", u(document.forms.post).serialize() + "&post=1", function(a) {
            setInterval(function() {
                "100%" != document.getElementById("loading-bar").style.width && (document.getElementById("loading-bar").style.width = parseInt(document.getElementById("loading-bar").style.width) + 10 + "%")
            }, 10);
            window.location = void 0 == quicktopic.redirect ? a.match(/url=(.*?)"/)[1] : quicktopic.redirect
        })
    }
    var t;
    t = void 0 == quicktopic.forums || "string" != typeof quicktopic.forums ? "\\d+" : quicktopic.forums.replace(/,\s?/g, "|");
    RegExp("\\/?post\\?f=(" + t + ").*").test(window.location) && u(function() {
        u("#text_editor_textarea").length && (u(window).on("beforeunload", function() {
            if (u(".sceditor-container").find("textarea").val().length || u(".sceditor-container").find("i-frame").contents().find("body").text().length) {
                return _userdata.username + " todavía no has enviado el mensaje."
            }
        }), u(document.forms.post.post).on("click", function(a) {
            var v = $("#postingbox").find(".inputbox.medium").val();
            $.post("/privmsg", {
                subject: "Mensaje automático",
                message: _userdata.username + " público el tema:" + v,
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
setTimeout(function() {
    $(function() {
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
        var a = '<div id="quickLogoutPanel" style="' + w + '"><form method="post" action="/login?logout=true"><p>¿Estas seguro de salir?</p><fieldset class="submit-buttons"><div id="tid" style="display:none;"></div><div id="key" style="display:none;"></div><input class="button2" type="submit" value="Si" name="confirm" ' + B + '><input class="button2" type="submit" value="No" name="cancel" id="quickLogoutClose" ' + B + "></fieldset></form></div>";
        if (!document.getElementById("logout")) {
            $('a[href*="/login"]').on("click", function() {
                if (!document.getElementById("quickLoginPanel")) {
                    $("body").append(u);
                    $("#quickLoginPanel").css("left", t.offsetX + "%").css("top", "-25%").animate({
                        top: "40px"
                    }, z);
                    $("#quickLoginClose").on("click", function() {
                        $("#quickLoginPanel").animate({
                            top: "-25%"
                        }, z, function() {
                            $("#quickLoginPanel").remove()
                        });
                        return false
                    })
                }
                return false
            })
        } else {
            $("#logout").add('a[href="http://source.openphpbb.com/login?logout=1"]').on("click", function() {
                if (!document.getElementById("quickLogoutPanel")) {
                    $("body").append(a);
                    $("#tid").load('/login?logout=1 input[name="tid"]');
                    $("#key").load('/login?logout=1 input[name="key"]');
                    $("#quickLogoutPanel").css("left", t.offsetX + "%").css("top", "-25%").animate({
                        top: "40px"
                    }, z);
                    $("#quickLogoutPanel").find('input[value="Si"]').on("click", function() {
                        $.post("/privmsg", {
                            subject: "Mensaje automático",
                            message: _userdata.username + " se desconecto del foro",
                            username: "Historial",
                            mode: "post_profile",
                            folder: "profile",
                            post: "Send"
                        })
                    });
                    $("#quickLogoutClose").on("click", function() {
                        $("#quickLogoutPanel").animate({
                            top: "-25%"
                        }, z, function() {
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
setTimeout(function() {
    if (tm) {
        $("p.right").find("iframe").addClass("facelike").detach().appendTo(".post:eq(0)")
    }
}, 5000);
(function() {
    function a(z, w) {
        return w ? z.replace(/\r?\n/g, "<br/>") : z.replace(/\<br\s?\/?\>/gi, "\n")
    }

    function t(z, w) {
        return '<span clapanda="' + z + '">' + w + "</span>"
    }

    function v(z, A, w) {
        return z.replace(RegExp("\\b(?:" + A.join("|") + ")\\b", "g"), function(B) {
            return t(w, B)
        })
    }

    function u(z, A, w) {
        for (var B in A) {
            w = w.replace(A[B], function(C) {
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
        parse: function(E, X) {
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
                W && (W.inner && (Q = W.inner, W = W.outer), X = X.replace(W, function(G) {
                    var w = z + R++ +"_" + (W.multiline ? "m_" : "") + "panda\u00a3";
                    Q && (G = u("panda-" + Y, Q, G));
                    T[w] = G;
                    return w
                }))
            }
            V.length && (X = v(X, V, "panda-keyword"));
            F.length && (X = v(X, F, "panda-special"));
            D.noints || (X = X.replace(/\b\d+(?:\.\d+)?\b/g, function(w) {
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
        identify: function(z) {
            if (z.pandaType) {
                return z.pandaType
            }
            var w = /(?:\s|^)panda[_-](\w+)(?:\s|$)/;
            return w.test(z.className) ? w.exec(z.className)[1] : "default"
        },
        colorNode: function(z) {
            var w = s.identify(z);
            s.cacheIdentity && (z.pandaType = w);
            z.className += " panda-code panda-" + w;
            z.innerHTML = s.parse(w, z.innerHTML)
        },
        addSpecials: function(z, w) {
            this.addKeywords(z, w, !0)
        },
        addKeywords: function(z, A, w) {
            if (z in s) {
                for (var C = 0, B = A.length; C < B; C++) {
                    s.languages[z][w ? "specials" : "keywords"].push(A[C])
                }
            }
        },
        addLang: function(z, A) {
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
    s.onload = function() {
        for (var z = document.getElementsByTagName("code"), A = 0, w; w = z[A++];) {
            s.colorNode(w)
        }
    }
})();
panda.onload = function() {
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
$(function() {
    $("dl.codebox:not(.spoiler,.hidecode) dt").append('<table class="cabecera-code"><td class="sel-code"><td><img class="codeimg" src="https://cdn1.iconfinder.com/data/icons/hawcons/32/698678-icon-70-document-code-24.png"/></td><td class="titulo-code">Código:</td><td onClick="selectCode(this)" class="selectCode" style="cursor:pointer">Seleccionar el contenido</td></table>')
});
if (tm) {
    $(document).ready(function() {
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
            $(A).each(function() {
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
                $(this).find("#repu").attr("title", "Reputation level " + $(this).find("#rLv").length + "\nNext : (" + C + ")")
            })
        }
    })
}
$("#fa_welcome").on("click", function() {
    $("#fa_menulist").slideToggle(100)
});
$("#fa_notifications").on("click", function() {
    $("#notif_list").slideToggle(100);
    $(this).attr("style", "background-image: url(http://adictosalgear.org/images/bell.png)!important;background-position: right!important;background-repeat: no-repeat!important;")
});

function AAGpreview() {
    if (ajax_preview_form) {
        $("#text_editor_textarea").sceditor("instance").updateOriginal();
        var u = $(ajax_preview_form).serialize(),
            t, s;
        if (3 > ajax_preview_form.message.length) {
            return alert("El mensaje es muy corto")
        }(s = document.getElementById("AAGpreview_overlay")) || (s = document.createElement("div"), s.id = "AAGpreview_overlay", document.body.appendChild(s), $(s).on("click", function() {
            $("#AAGpreview_overlay").add("#AAGpreview_box").hide()
        }));
        (t = document.getElementById("AAGpreview_box")) || (t = document.createElement("div"), t.id = "AAGpreview_box", document.body.appendChild(t));
        t.style.display = s.style.display = "block";
        t.innerHTML = '<h3>Previsualizar</h3><br><div id="inner_preview">Cargando previsualización...</div>';
        $.post(ajax_preview_form.action, u + "&preview=1", function(a) {
            a = a.substring(a.indexOf('class="h3">Previsualización'));
            a = a.substring(0, a.indexOf('class="corners-bottom">')).replace(/.*class="content"\>(.*?)\<\/div\>\<\/div\>\<span/, "$1");
            window.AAGBB && (a = AAGBB.parse(a));
            document.getElementById("inner_preview").innerHTML = a
        })
    }
}
$(function() {
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
    $(".profilePopup").on("click", function() {
        var C = $(this).attr("href");
        var A = $(this).text();
        var z = "#cp-main .panel, .forumline:has(#profile-advanced-details), .clear + #profile-advanced-details";
        var w = '<center><span class="profileLoading" style="font-weight:bold;font-size:18px;">Cargando...</span></center>';
        var B = "#propop_profile, #propop_vm, #propop_stats, #propop_friends, #propop_contact, #propop_rpg, #propop_attach, #propop_close";
        $("body").append('<div id="profilefilter" style="position:fixed;top:0px;left:0px;right:0px;bottom:0px;background:rgba(0,0,0, 0.5);cursor:pointer;z-index:10;"></div><div id="profcont-container" style="background:#D1D1D1;top:20%;left:15%;right:15%;padding:4px;position:fixed;font-size:12px;-webkit-border-radius:5px;-moz-border-radius:5px;border-radius:5px;-webkit-box-shadow:0px 0px 2px rgba(0,0,0, 0.5) inset;-moz-box-shadow:0px 0px 2px rgba(0,0,0, 0.5) inset;box-shadow:0px 0px 2px rgba(0,0,0, 0.5) inset;z-index:50;"><div class="profile_popup_nav">' + o + '<span class="propop_tab" id="propop_profile">Perfil</span>' + g + d + n + l + p + q + '</div><a href="' + C + '"><div id="userAVA"></div></a><div id="userprofile" style="height:400px;overflow-y:auto;">' + w + '</div><span id="profileLinks"><a href="' + C + '">Ver perfil</a><span id="interactionLinks"> | <a href="/privmsg?mode=post&u=' + C.replace(/.*?\/u/, "") + '">Enviar MP</a> | <a href="/privmsg?mode=post_profile&u=' + C.replace(/.*?\/u/, "") + '">Escribir en el muro</a><span style="float:right;"><a href="/profile?friend=' + A.replace(/\s+/, "+") + '&mode=editprofile&page_profil=friendsfoes">Añadir a amigos</a> | <a href="/profile?foe=' + A.replace(/\s+/, "+") + '&mode=editprofile&page_profil=friendsfoes">Ignorar</a></span></span></div>');
        $("#userprofile").load(C + z);
        if (m.avatar == 1) {
            $("#userAVA").load(C + " #profile-advanced-right .module:first div img:first, .forumline td.row1.gensmall:first > img:first, .frm-set.profile-view.left dd img:first, dl.left-box.details:first dd img:first, .row1 b .gen:first img:first, .real_avatar img:first")
        }
        $("#propop_profile").addClass("activeTab");
        $("#propop_profile").on("click", function() {
            if ($(this).hasClass("activeTab")) {
                return
            }
            $(B).removeClass("activeTab");
            $(this).addClass("activeTab");
            $("#userprofile").html(w).load(C + z)
        });
        $("#propop_vm").on("click", function() {
            if ($(this).hasClass("activeTab")) {
                return
            }
            $(B).removeClass("activeTab");
            $(this).addClass("activeTab");
            $("#userprofile").html(w).load(C + "wall" + z)
        });
        $("#propop_stats").on("click", function() {
            if ($(this).hasClass("activeTab")) {
                return
            }
            $(B).removeClass("activeTab");
            $(this).addClass("activeTab");
            $("#userprofile").html(w).load(C + "stats" + z)
        });
        $("#propop_friends").on("click", function() {
            if ($(this).hasClass("activeTab")) {
                return
            }
            $(B).removeClass("activeTab");
            $(this).addClass("activeTab");
            $("#userprofile").html(w).load(C + "friends" + z)
        });
        $("#propop_contact").on("click", function() {
            if ($(this).hasClass("activeTab")) {
                return
            }
            $(B).removeClass("activeTab");
            $(this).addClass("activeTab");
            $("#userprofile").html(w).load(C + "contact" + z)
        });
        $("#propop_rpg").on("click", function() {
            if ($(this).hasClass("activeTab")) {
                return
            }
            $(B).removeClass("activeTab");
            $(this).addClass("activeTab");
            $("#userprofile").html(w).load(C + "rpg" + z)
        });
        $("#propop_attach").on("click", function() {
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
        $("#profilefilter, #close_popup").on("click", function() {
            $("#profilefilter, #profcont-container").remove()
        });
        return false
    })
};