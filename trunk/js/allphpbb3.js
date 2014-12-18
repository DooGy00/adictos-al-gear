if ($("#fa_menulist").length) {
    var status_box = {
        lang: {
            woym: _userdata.username + " ¿que tienes en mente?",
            update: '<img src="http://www.adictosalgear.org/adictosalgear/files/pencil.png">',
            too_short: "Status muy corto.",
            updated: "¡Actualizado!",
            error: "Error. Intenta de nuevo."
        },
        init: function(d, m) {
            if (d) {
                var a = my_getcookie("fa_" + location.host.replace(/\./g, "_") + "_data");
                this.user_id = a ? parseInt(a.split("userid")[1].replace(/s:\d+/g, "").match(/\d+/)) : 0;
                if (m) {
                    for (var l in m) {
                        this.lang[l] = m[l]
                    }
                }
                this.outer = document.getElementById("AAGstatus");
                this.outer.innerHTML = '<input id="AAGstatus_input" type="text" placeholder="' + this.lang.woym + '"><div onclick="status_box.update()" class="status-button">' + this.lang.update + '</div><span id="AAGstatus_notice"></span>';
                this.input = document.getElementById("AAGstatus_input");
                this.id = d;
                this.initiated = !0
            }
        },
        update: function() {
            if (this.initiated) {
                var a = document.getElementById("AAGstatus_notice");
                if (2 > this.input.value.length) {
                    return a.innerHTML = this.lang.too_short = this.lang.too_short
                }
                var d = document.getElementById("logout");
                d && (d = d.href, d = d.substring(d.indexOf("tid=") + 4, d.indexOf("&key")), d = "id=" + this.id.substring(this.id.lastIndexOf("_") + 1) + '&active=1&content=[["' + this.id + '", "' + this.input.value + '"]]&tid=' + d + "&user=" + this.user_id, $.post("/ajax_profile.forum?jsoncallback=jQuery1", d, function(g) {
                    0 < g.indexOf(status_box.input.value) ? (status_box.input.value = "", a.innerHTML = status_box.lang.updated, setTimeout("document.getElementById('AAGstatus_notice').innerHTML=\" \"", 2500)) : a.innerHTML = status_box.lang.error
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
            var a = $(ta).data("sceditor");
            a ? a.bind("keypress", a.updateOriginal).blur(a.updateOriginal) : setTimeout(fix_it, 200)
        };
        fix_it()
    }
    $(".sceditor-toolbar", function() {
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
            a(9, "before");
            a(8, "before");
            a(7, "before");
            a(6, "before");
            a(26, "after");
            a(27, "after");
            a(28, "after");
            a(29, "after");
            $(".sceditor-fontsize-option.new-size").on("click", function(d) {
                $("#text_editor_textarea").sceditor("instance").insertText("[size=" + $(this).attr("data-size") + "]", "[/size]");
                $(".sceditor-fontsize-picker").remove();
                d.preventDefault()
            })
        });

        function a(g, l) {
            var d = '<a unselectable="on" class="sceditor-fontsize-option new-size" href="#" data-size="' + g + '"><span unselectable="on" style="font-size:' + g + 'px;">' + g + "</span></a>";
            if (l == "after" || l == null) {
                $(".sceditor-fontsize-picker").find("div").append(d)
            }
            if (l == "before") {
                $(".sceditor-fontsize-picker").find("div").prepend(d)
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
                var n = "",
                    l = $("#imganc-width").val(),
                    d = $("#imganc-height").val(),
                    m = $("#imganc-img").val(),
                    g = $("#imganc-url").val();
                if (l.length > 0 && d.length > 0) {
                    n = "(" + l + "px," + d + "px)"
                } else {
                    if (l.length > 0 && d.length < 1) {
                        n = "(" + l + "px," + l + "px)"
                    } else {
                        if (l.length < 1 && d.length > 0) {
                            n = "(" + d + "px," + d + "px)"
                        }
                    }
                }
                if (m.length > 0 && g.length > 0) {
                    $("#text_editor_textarea").sceditor("instance").insertText("[url=" + g + "][img" + n + "]" + m, "[/img][/url]")
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
    $(function() {
        if (/\/u\d+/.test(location.pathname) == true) {
            return
        }
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
            var s = $(this).attr("href");
            var u = $(this).text();
            var v = "#cp-main .panel, .forumline:has(#profile-advanced-details), .clear + #profile-advanced-details";
            var a = '<center><span class="profileLoading" style="font-weight:bold;font-size:18px;">Cargando...</span></center>';
            var t = "#propop_profile, #propop_vm, #propop_stats, #propop_friends, #propop_contact, #propop_rpg, #propop_attach, #propop_close";
            $("body").append('<div id="profilefilter" style="position:fixed;top:0px;left:0px;right:0px;bottom:0px;background:rgba(0,0,0, 0.5);cursor:pointer;z-index:10;"></div><div id="profcont-container" style="background:#D1D1D1;top:20%;left:15%;right:15%;padding:4px;position:fixed;font-size:12px;-webkit-border-radius:5px;-moz-border-radius:5px;border-radius:5px;-webkit-box-shadow:0px 0px 2px rgba(0,0,0, 0.5) inset;-moz-box-shadow:0px 0px 2px rgba(0,0,0, 0.5) inset;box-shadow:0px 0px 2px rgba(0,0,0, 0.5) inset;z-index:50;"><div class="profile_popup_nav">' + o + '<span class="propop_tab" id="propop_profile">Perfil</span>' + g + d + n + l + p + q + '</div><a href="' + s + '"><div id="userAVA"></div></a><div id="userprofile" style="height:400px;overflow-y:auto;">' + a + '</div><span id="profileLinks"><a href="' + s + '">Ver perfil</a><span id="interactionLinks"> | <a href="/privmsg?mode=post&u=' + s.replace(/.*?\/u/, "") + '">Enviar MP</a> | <a href="/privmsg?mode=post_profile&u=' + s.replace(/.*?\/u/, "") + '">Escribir en el muro</a><span style="float:right;"><a href="/profile?friend=' + u.replace(/\s+/, "+") + '&mode=editprofile&page_profil=friendsfoes">Añadir a amigos</a> | <a href="/profile?foe=' + u.replace(/\s+/, "+") + '&mode=editprofile&page_profil=friendsfoes">Ignorar</a></span></span></div>');
            $("#userprofile").load(s + v);
            if (m.avatar == 1) {
                $("#userAVA").load(s + " #profile-advanced-right .module:first div img:first, .forumline td.row1.gensmall:first > img:first, .frm-set.profile-view.left dd img:first, dl.left-box.details:first dd img:first, .row1 b .gen:first img:first, .real_avatar img:first")
            }
            $("#propop_profile").addClass("activeTab");
            $("#propop_profile").on("click", function() {
                if ($(this).hasClass("activeTab")) {
                    return
                }
                $(t).removeClass("activeTab");
                $(this).addClass("activeTab");
                $("#userprofile").html(a).load(s + v)
            });
            $("#propop_vm").on("click", function() {
                if ($(this).hasClass("activeTab")) {
                    return
                }
                $(t).removeClass("activeTab");
                $(this).addClass("activeTab");
                $("#userprofile").html(a).load(s + "wall" + v)
            });
            $("#propop_stats").on("click", function() {
                if ($(this).hasClass("activeTab")) {
                    return
                }
                $(t).removeClass("activeTab");
                $(this).addClass("activeTab");
                $("#userprofile").html(a).load(s + "stats" + v)
            });
            $("#propop_friends").on("click", function() {
                if ($(this).hasClass("activeTab")) {
                    return
                }
                $(t).removeClass("activeTab");
                $(this).addClass("activeTab");
                $("#userprofile").html(a).load(s + "friends" + v)
            });
            $("#propop_contact").on("click", function() {
                if ($(this).hasClass("activeTab")) {
                    return
                }
                $(t).removeClass("activeTab");
                $(this).addClass("activeTab");
                $("#userprofile").html(a).load(s + "contact" + v)
            });
            $("#propop_rpg").on("click", function() {
                if ($(this).hasClass("activeTab")) {
                    return
                }
                $(t).removeClass("activeTab");
                $(this).addClass("activeTab");
                $("#userprofile").html(a).load(s + "rpg" + v)
            });
            $("#propop_attach").on("click", function() {
                if ($(this).hasClass("activeTab")) {
                    return
                }
                $(t).removeClass("activeTab");
                $(this).addClass("activeTab");
                $("#userprofile").html(a).load(s + "attachments" + v)
            });
            if (!document.getElementById("logout")) {
                $("#interactionLinks").remove()
            }
            $("#profilefilter, #close_popup").on("click", function() {
                $("#profilefilter, #profcont-container").remove()
            });
            return false
        })
    });
    (function(d) {
        var g = [];
        jQuery.fn.zzConfirm = function(a) {
            var p = jQuery.extend({
                    content: "¿Estás seguro?",
                    lang: ["Ok", "Cancelar"],
                    width: "auto",
                    dir: "left",
                    toggle: !1,
                    clickOut: !1,
                    ok: function(r, s) {},
                    cancel: function(r, s) {}
                }, a),
                o, q, m = function(D, B) {
                    var A = D.outerWidth(),
                        r = D.outerHeight(),
                        u = D.offset().top,
                        C = D.offset().left,
                        z = B.outerWidth(),
                        w = B.outerHeight(),
                        t = u + (r - w) / 2,
                        s = C + (A - z) / 2,
                        v = p.dir;
                    switch (v) {
                        case "top":
                            t = u - w - 10;
                            break;
                        case "bottom":
                            t = u + r + 10;
                            break;
                        case "left":
                            s = C - z - 10;
                            break;
                        case "right":
                            s = C + A + 10
                    }
                    B.attr("class", v).show().animate({
                        left: s,
                        top: t,
                        opacity: 1
                    })
                };
            a = d(this);
            var n = a.selector,
                l;
            g.push(n);
            return a.on("click", function(r) {
                r.preventDefault();
                o = d(this);
                var t = function(v) {
                    var u = d("#zzConfirm_wrap");
                    v && (u = d('#zzConfirm_wrap[data-selector="' + v + '"]'));
                    o.removeClass("zzConfirm_active");
                    u.hide().css({
                        left: l,
                        top: "-100px",
                        opacity: 0
                    })
                };
                d(".zzConfirm_active").not(o).removeClass("zzConfirm_active");
                if ((r = o.hasClass("zzConfirm_active")) && p.toggle) {
                    t()
                } else {
                    if (!r) {
                        o.addClass("zzConfirm_active");
                        d("#zzConfirm_wrap").length ? q = d("#zzConfirm_wrap") : (d("body").append('<div id="zzConfirm_wrap" style="width:' + p.width + ';left:50%;top:-100px;display:none"><div id="zzConfirm_content"></div><div id="zzConfirm_btn"><div id="zzConfirm_yes"></div><div id="zzConfirm_cancel"></div></div></div>'), q = d("#zzConfirm_wrap"), l = (d(window).width() - q.outerWidth()) / 2, q.css("left", l));
                        d("#zzConfirm_content").html(p.content);
                        d("div", "#zzConfirm_btn").off("click").on("click", function() {
                            t()
                        });
                        d("#zzConfirm_yes").html(p.lang[0]).on("click", function() {
                            p.ok(o, q)
                        });
                        d("#zzConfirm_cancel").html(p.lang[1]).on("click", function() {
                            p.cancel(o, q)
                        });
                        q.attr("data-selector", n).css("width", p.width);
                        m(o, q);
                        var s = !0;
                        d(window).resize(function() {
                            s && (setTimeout(function() {
                                m(o.filter(".zzConfirm_active"), q);
                                s = !0
                            }, 100), s = !1)
                        });
                        p.clickOut && d(document).on("click", function(u) {
                            d(u.target).closest(q).length || d(u.target).closest(g.join()).length || t(n)
                        })
                    }
                }
            })
        }
    })(jQuery);
    $("a[href*='mode=delete']").zzConfirm({
        content: "¿Deseas eliminar este post",
        ok: function(d) {
            var a = d.closest(".post");
            a.css("opacity", 0.3);
            $.post(d[0].href, {
                confirm: 1
            }, function(g) {
                a.slideUp(function() {
                    a.remove();
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
                for (var g = $(zeditor.message_dom), m = 0, d = g.length; m < d; m++) {
                    g[m].innerHTML = zeditor.replace(g[m].innerHTML)
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
        quote: function(d) {
            zeditor.loading("on");
            $.get(d.href, function(a) {
                zeditor.textarea.value = $(a).find("#text_editor_textarea").val().replace(/]/, '][quotelink="' + location.pathname + "#" + d.href.match(/[0-9]+/) + '"]');
                zeditor.textarea.focus();
                zeditor.loading("off")
            })
        },
        edit: function(d) {
            zeditor.loading("on");
            zeditor.url = d.href;
            if (zeditor.textarea.value != "") {
                if (confirm(_userdata.username + " de continuar  perderas lo escrito")) {
                    $.get(d.href, function(a) {
                        zeditor.textarea.value = $(a).find("#text_editor_textarea").val();
                        zeditor.subject.value = $(a).find('input[name="subject"]').val();
                        zeditor.textarea.focus();
                        zeditor.loading("off")
                    })
                } else {
                    zeditor.textarea.focus();
                    zeditor.loading("off");
                    return
                }
            } else {
                $.get(d.href, function(a) {
                    zeditor.textarea.value = $(a).find("#text_editor_textarea").val();
                    zeditor.subject.value = $(a).find('input[name="subject"]').val();
                    zeditor.textarea.focus();
                    zeditor.loading("off")
                })
            }
        },
        button: function(a) {
            $(a).each(function() {
                $(this).find('a[href*="quote"]').attr("onclick", "zeditor.start('quote', this); return false");
                $(this).parent().parent().after('<a class="pbutton1" onclick="zeditor.start(\'reply\', this)">' + zeditor.lang.reply_button + '</a><a class="pbutton2" onclick="zeditor.start(\'pm\', this)">' + zeditor.lang.pm_button + "</a>");
                $(this).find('a[href*="editpost"]').attr("onclick", "zeditor.start('edit', this); return false")
            })
        },
        start: function(d, g) {
            $(zeditor.editor).appendTo($(g).parents(zeditor.post_dom).find(zeditor.message_dom));
            $(zeditor.editor).slideDown();
            switch (d) {
                case "reply":
                    zeditor.url = $('a[href^="/post?t="]').first().attr("href");
                    zeditor.mode.innerHTML = zeditor.lang.reply;
                    zeditor.textarea.placeholder = _userdata.username + " escribe un comentario...";
                    if (zeditor.textarea.value != "") {
                        alert(_userdata.username + " si deseas publicar tu mensaje presiona ENVIAR");
                        $("#editor-send-button ").css("background", "gold")
                    }
                    break;
                case "quote":
                    zeditor.url = g.href;
                    zeditor.quote(g);
                    zeditor.mode.innerHTML = zeditor.lang.quote;
                    break;
                case "edit":
                    zeditor.edit(g);
                    zeditor.mode.innerHTML = zeditor.lang.edit;
                    break;
                case "pm":
                    zeditor.url = !1;
                    zeditor.mode.innerHTML = zeditor.lang.pm;
                    zeditor.textarea.placeholder = _userdata.username + " redacta tu mensaje privado...";
                    var g = $(".mp-mode").parents(zeditor.post_dom).find('.author').find('a[href^="/u"]').eq(0).text();
                    $(".mp-msg").html("Mensaje para:"+ g);
              
                    break
            }
        },
        add: function(a, m) {
            zeditor.textarea.focus();
            if (typeof(zeditor.textarea) != "undefined") {
                var g = parseInt(zeditor.textarea.value.length);
                var l = zeditor.textarea.selectionStart;
                var d = zeditor.textarea.selectionEnd;
                zeditor.textarea.value = zeditor.textarea.value.substring(0, l) + a + zeditor.textarea.value.substring(l, d) + m + zeditor.textarea.value.substring(d, g)
            } else {
                zeditor.textarea.value += a + m
            }
            zeditor.textarea.focus()
        },
        preview: function(d) {
            preview = document.getElementById("ze-preview");
            if (preview.style.display == "block") {
                preview.style.display = "none";
                document.getElementById("editor-top").setAttribute("style", "height:38px; transform: scaleY(1);-webkit-transform: scaleY(1)");
                d.innerHTML = zeditor.lang.preview_button
            } else {
                d.innerHTML = zeditor.lang.close_button;
                document.getElementById("editor-top").setAttribute("style", "height:3px; transform: scaleY(0);-webkit-transform: scaleY(0)");
                $.post(zeditor.url, {
                    message: zeditor.textarea.value,
                    preview: "Preview",
                }, function(a) {
                    preview.style.display = "block";
                    preview.innerHTML = zeditor.replace($(a).find(zeditor.preview_dom).html())
                })
            }
        },
        closePreview: function(d) {
            $(d).hide();
            zeditor.textarea.focus();
            document.getElementById("editor-preview-button").innerHTML = zeditor.lang.preview_button;
            document.getElementById("editor-top").setAttribute("style", "height:38px; transform: scaleY(1);-webkit-transform:scaleY(1)")
        },
        post: function(d) {
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
                    }, function(g) {
                        var a = "Tu mensaje ha sido publicado con éxito",
                            l = "Tu mensaje ha sido publicado con éxito";
                        b = (g.indexOf(a) < 0) ? l : a;
                        index = g.indexOf(b);
                        if (g.indexOf("Flood control") > 0) {
                            alert(zeditor.lang.flood_message)
                        } else {
                            if (g.indexOf("A new message") > 0) {
                                $.post("/post", $(g).find("form[name='post']").serialize() + "&post=1", function(m) {
                                    (index < 0) ? alert(zeditor.lang.error_message): zeditor.newPost($(m).find('p:contains("' + b + '") a:first').attr("href"));
                                    zeditor.closePreview("#ze-preview")
                                })
                            } else {
                                (index < 0) ? alert(zeditor.lang.error_message): zeditor.newPost($(g).find('p:contains("' + b + '") a:first').attr("href"));
                                zeditor.closePreview("#ze-preview")
                            }
                        }
                    })
                }
            } else {
                zeditor.pm(d)
            }
        },
        newPost: function(g) {
            var d = g.split("#")[1];
            zeditor.editor.style.display = "none";
            if (zeditor.mode.innerHTML == zeditor.lang.reply || zeditor.mode.innerHTML == zeditor.lang.quote) {
                $.get(g, function(a) {
                    $('<div class="zeditor-new">' + zeditor.replace($(a).find("#p" + d).wrapAll("<div></div>").parent().html()) + "</div>").insertAfter(zeditor.post_dom + ":last");
                    $("html,body").animate({
                        scrollTop: $(".zeditor-new:last").offset().top
                    }, 300);
                    zeditor.button(".zeditor-new:last " + zeditor.button_dom)
                })
            }
            if (zeditor.mode.innerHTML == zeditor.lang.edit) {
                dom = $(zeditor.editor).parents(zeditor.post_dom).find(zeditor.message_dom);
                $.get(g, function(a) {
                    $(dom).html(zeditor.replace($(a).find("#p" + d + " " + zeditor.message_dom).html()));
                    $(dom).hide().fadeIn("slow")
                })
            }
            zeditor.textarea.value = "", $(function() {
                if (_userdata.user_posts > 5) {
                    if ($(".post").first().find(".descargar").length > 0) {
                        $(".descargar").find("a,span").removeAttr("style")
                    }
                }
            })
        },
        popup: function(g, d) {
            zeditor.textarea.focus();
            x = document.getElementById(g);
            y = document.getElementById("ze-editor").offsetWidth;
            if (x.style.display == "none") {
                position = $(d).position().left;
                x.setAttribute("style", "display: block");
                if (position + x.offsetWidth + 20 > y) {
                    position = y - x.offsetWidth - 20
                }
                x.style.left = position - 30 + "px"
            } else {
                x.style.display = "none"
            }
            $("#" + g).siblings().hide()
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
                var g = '<table cellspacing="0" id="ze-color-inner">';
                var a = new Array("00", "33", "66", "99", "CC", "FF");
                for (i = 5; i >= 0; i--) {
                    g = g + "<tr>";
                    for (j = 5; j >= 0; j--) {
                        for (k = 5; k >= 0; k--) {
                            var d = a[j] + a[i] + a[k];
                            g = g + '<td style="background: #' + d + '" title="#' + d + '"><div style="background:#' + d + '" onclick="zeditor.add(\'[color=#' + d + "]', '[/color]');zeditor.hideColor()\"></div></td>"
                        }
                    }
                    g = g + "</tr>"
                }
                document.getElementById("ze-color").innerHTML = g + '</table><div id="ze-color-info"><div class="ze-color-input"><div>#</div><input id="ze-color-hex" maxlength="6" onkeypress="zeditor.convertHex(this)" placeholder="000000"></div><div class="ze-color-input"><div>R</div><input id="ze-color-r" maxlength="3" onkeypress="zeditor.convertRGB()" placeholder="000"></div><div class="ze-color-input"><div>G</div><input id="ze-color-g" maxlength="3" onkeypress="zeditor.convertRGB()" placeholder="000"></div><div class="ze-color-input"><div>B</div><input id="ze-color-b" maxlength="3" onkeypress="zeditor.convertRGB()" placeholder="000"></div><div class="editor-button-confirm" onclick="zeditor.submitColor()">OK</div></div>'
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
        convertHex: function(g) {
            var g = g.value,
                d = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(g);
            d ? (document.getElementById("ze-color-r").value = parseInt(d[1], 16), document.getElementById("ze-color-g").value = parseInt(d[2], 16), document.getElementById("ze-color-b").value = parseInt(d[3], 16)) : null
        },
        convertRGB: function() {
            var m = document.getElementById("ze-color-r").value,
                l = document.getElementById("ze-color-g").value,
                a = document.getElementById("ze-color-b").value,
                d = a | (l << 8) | (m << 16);
            document.getElementById("ze-color-hex").value = (16777216 + d).toString(16).slice(1)
        },
        smiley: function(d) {
            zeditor.textarea.value += d;
            zeditor.textarea.focus();
            document.getElementById("ze-smiley").style.display = "none"
        },
        tag: function(g) {
            var l = $(g).parents(zeditor.post_dom).find('a[href^="/u"]:has(span)').eq(0).text(),
                d = $(g).parents(zeditor.post_dom).find(".nombre-tema").find("a").attr("href");
            zeditor.textarea.value += "[tag]" + l + "[/tag] ";
            tagname = l;
            if (l.length > 0) {
                if (confirm(zeditor.lang.notify_message + " " + l + "?")) {
                    zeditor.post_pm(l, zeditor.lang.tag_message_title + ' "' + document.title + '"', tagname + zeditor.lang.tag_message_content + ' <a href="' + d + '"> ' + document.title + " en el post: " + d.split("#")[1] + "</a>")
                }
            } else {
                alert(zeditor.lang.tag_message_error)
            }
        },
        pm: function(d) {
            var g = $(d).parents(zeditor.post_dom).find('a[href^="/u"]:not(:empty)').eq(0).text();
            if (g.length > 0) {
                zeditor.post_pm(g, zeditor.lang.pm_message_title + ' "' + document.title + '"', zeditor.textarea.value);
              
            } else {
                alert(zeditor.lang.pm_message_error)
            }
            zeditor.textarea.value = ""
        },
        post_pm: function(a, d, g) {
            $.post("/privmsg?mode=post&post=1", {
                "username[]": a,
                subject: d,
                message: g,
                post: "Send",
                folder: "inbox"
            }, function() {
                $("textarea").attr("placeholder", _userdata.username + " tu mensaje privado se envió con éxito")
            })
        },
        replace: function(d) {
            return d.replace(/\[tag\](.*?)\[\/tag\]/g, function(l, g) {
                return '<a href="/profile?mode=viewprofile&u=' + g.replace(/ /g, "+") + '" onmouseover="zeditor.avatar(this, this.href)" class="ze-avatar">@' + g + "</a>"
            }).replace(/:<\/cite>\[quotelink="(\S+)"\]/gi, function(l, g) {
                return " " + zeditor.lang.quote_message + ' <a href="' + g + '"> ' + g.split("#")[1] + "</a></cite>"
            })
        },
        loading: function(d) {
            b = document.getElementById("editor-loading");
            d == "on" ? (b.style.display = "") : (b.style.display = "none")
        },
   advance: function () {
    if ($(".edit-mode").length || $(".quote-mode").length) {
        location.href = zeditor.url;
        window.onbeforeunload = false
          }
     if ($(".mp-mode").length){
   location.href = "privmsg?mode=post";
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
        avatar: function(g, d) {
            if (g.getElementsByTagName("span")[0] == null) {
                $.get(d, function(a) {
                    g.innerHTML += "<span>" + $(a).find("#profile-advanced-right img:first")[0].outerHTML + "</span>"
                })
            }
        },
        imgur: {
            input: 0,
            holder: [],
            prepare: function() {
                zeditor.imgur.input = document.getElementById("ze-imgur-input");
                document.getElementById("ze-imgur-placeholder").addEventListener("change", function(g) {
                    var d = g.target.files;
                    for (i = 0; i < d.length; i++) {
                        if (d[i].type.match(/image.*/)) {
                            zeditor.imgur.holder.push(d[i])
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
            upload: function(g) {
                document.body.className = "uploading";
                var d = new FormData();
                d.append("image", g);
                d.append("key", zeditor.imgur_key);
                var l = new XMLHttpRequest();
                var a = document.getElementById("ze-imgur-images");
                l.open("POST", "http://api.imgur.com/2/upload.json");
                l.onload = function() {
                    if (this.status == 400) {
                        document.getElementById("ze-imgur-status").innerHTML = JSON.parse(l.responseText).error.message
                    } else {
                        var p = JSON.parse(l.responseText).upload.links;
                        var q = p.small_square;
                        var n = p.imgur_page;
                        var m = document.createElement("a");
                        m.href = n;
                        m.addEventListener("click", function(r) {
                            r.preventDefault();
                            zeditor.textarea.value += "[img]" + this.firstChild.src.replace("s.", ".") + "[/img]"
                        });
                        var o = document.createElement("img");
                        o.src = q;
                        m.appendChild(o);
                        a.appendChild(m);
                        document.body.className = "uploaded"
                    }
                };
                l.send(d)
            },
            submit: function() {
                if (zeditor.imgur.input.placeholder == zeditor.lang.imgur_placeholder1) {
                    for (var a = 0; a < zeditor.imgur.holder.length; a++) {
                        zeditor.imgur.upload(zeditor.imgur.holder[a])
                    }
                } else {
                    zeditor.imgur.upload(document.getElementById("ze-imgur-input").value)
                }
            },
        },
    };
    var zeditoronbeforeunload = $("#editor-post-button").find("span");
    window.onbeforeunload = function(a) {
        if (zeditor.textarea.value != "") {
            return _userdata.username + " tienes texto en el editor que podrias perder"
        }
    };
    zeditoronbeforeunload.submit = function(a) {
        window.onbeforeunload = false
    };
    $(function() {
        zeditor.ready()
    });
    $(".mp").attr("onclick", "zeditor.start('pm', this)").parent().removeAttr("href").css("cursor", "pointer");
    $(".post").find(".postnumber").find("a").on("click", function() {
        zeditor.start("reply", this);
        var a = $(this).attr("href");
        $("#editor-textarea").val("[post]" + a + "[/post]")
    });
    var level = _userdata.user_level;
    var del = $('a[href*="mode=delete"]').attr("href");
    var trash = $('a[href*="mode=trash"]').attr("href");
    var move = $('a[href*="mode=move"]').attr("href");
    var lockunlock = $('a[href*="mode=lock"]').attr("href");
    var split = $('a[href*="mode=split"]').attr("href");
    var merge = $('a[href*="merge"]').attr("href");
    if (level === 1 | level === 2 | trash) {
        $(".left-box").first().after('<div id="moderation_tool" class="act_mod"><p class="mod" title="Moderar tema">Moderar</p></div>');
        $("#moderation_tool").append('<div id="popw" class="action_mod"><div class="mod_hover"></div><div class="popwinner"><li><a href="' + del + '">Eliminar este tema</a></li><li><a href="' + trash + '">Enviar a la papelera</a></li><li><a href="' + move + '">Mover este tema</a></li><li><a href="' + lockunlock + '">Bloquear/Desbloquear</a></li><li><a href="' + split + '">Separar este tema</a></li><li><a href="' + merge + '">Fusionar el tema</a></li></div></div>');
        $(".mod").on("click", function() {
            $(".action_mod").slideToggle(300)
        })
    }
}
if (sub) {
    var h = document.getElementsByTagName("a");
    watchBTN = '<img style="display: inline-table;margin-bottom:-6px;" src="https://cdn2.iconfinder.com/data/icons/snipicons/5000/eye-open-20.png"><p style="display: inline-table;"> Vigilar</p>', unwatchBTN = '<img style="display: inline-table;margin-bottom:-6px;" src="https://cdn2.iconfinder.com/data/icons/snipicons/500/eye-close-20.png"><p style="display: inline-table;"> Dejar de Vigilar este foro </p>';
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
    e.on("click", function(a) {
        a.preventDefault();
        var g = $(this).attr("href");
        var d = $(this);
        $.post(g, {
            confirm: 1
        }).success(function() {
            var l = d.attr("href");
            l.replace(/\?watch=forum/g, "?unwatch=forum");
            d.html(unwatchBTN);
            d.attr("href", l);
            d.attr("original-title", "Dejar de vigilar este subforo");
            alert("vigilas este  subforo")
        })
    });
    var c = $('a[href*="?unwatch=forum"]');
    c.on("click", function(a) {
        a.preventDefault();
        var d = $(this).attr("href");
        var g = $(this);
        $.post(d, {
            confirm: 1
        }).success(function() {
            var l = g.attr("href");
            l.replace(/\?unwatch=forum/g, "?watch=forum");
            g.html(watchBTN);
            g.attr("href", l);
            g.attr("original-title", "Vigilar este subforo");
            alert("Ya no sigues el subforo")
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
(function(d) {
    function a() {
        d("body").prepend('<div id="loading-bar" style="z-index: 9999; background-color: ' + quicktopic.color + '; position: fixed; top: 0; width: 20%; left: 0; height: 3px;"></div>');
        document.forms.post.message.value = d("#text_editor_textarea").sceditor("instance").val();
        d.post("/post", d(document.forms.post).serialize() + "&post=1", function(l) {
            setInterval(function() {
                "100%" != document.getElementById("loading-bar").style.width && (document.getElementById("loading-bar").style.width = parseInt(document.getElementById("loading-bar").style.width) + 10 + "%")
            }, 10);
            window.location = void 0 == quicktopic.redirect ? l.match(/url=(.*?)"/)[1] : quicktopic.redirect
        })
    }
    var g;
    g = void 0 == quicktopic.forums || "string" != typeof quicktopic.forums ? "\\d+" : quicktopic.forums.replace(/,\s?/g, "|");
    RegExp("\\/?post\\?f=(" + g + ").*").test(window.location) && d(function() {
        d("#text_editor_textarea").length && (d(window).on("beforeunload", function() {
            if (d(".sceditor-container").find("textarea").val().length || d(".sceditor-container").find("i-frame").contents().find("body").text().length) {
                return _userdata.username + " todavía no has enviado el mensaje."
            }
        }), d(document.forms.post.post).on("click", function(l) {
            $(window).off("beforeunload");
            l.preventDefault();
            a()
        }))
    })
})(jQuery);
setTimeout(function() {
    $(function() {
        var l = {
            time: 750,
            background: "#CCC",
            border: "#DDDDDD",
            shadow: 1,
            offsetX: "42"
        };
        var n = 'style="margin:0px 2px;"';
        var o = l.shadow;
        var p = l.time;
        if (o == 1) {
            var r = "box-shadow:2px 2px 6px rgba(0,0,0,0.3);"
        } else {
            var r = "box-shadow:none;"
        }
        var q = "position:fixed;background:" + l.background + ";border:1px solid " + l.border + ";display:inline-block;padding:10px;z-index:99999;" + r;
        var s = '<div id="quickLoginPanel" style="' + q + '"><fieldset class="fields1 left fld_connexion"><form name="form_login" method="post" action="/login"><dl><dt><label for="username">Usuario:</label></dt><dd><input id="username" class="inputbox autowidth" type="text" value="" maxlength="40" size="25" name="username" tabindex="1"></dd></dl><dl><dt><label for="password">Contraseña:</label></dt><dd><input id="password" class="inputbox autowidth" type="password" maxlength="25" size="25" name="password" tabindex="2"></dd><dd><a href="/profile?mode=sendpassword">Olvide mi contraseña</a></dd></dl><dl><dd><label for="autologin"><input id="autologin" class="radio" type="checkbox" tabindex="4" name="autologin">Ingresar automaticamente</label></dd></dl><dl><dt>&nbsp;</dt><dd><input type="hidden" value="" name="redirect"><input type="hidden" value="" name="query"><input class="button1" type="submit" value="Entrar" tabindex="6" name="login"></dd></dl><a href="" id="quickLoginClose">Cerrar</a><form></fieldset></div>';
        var m = '<div id="quickLogoutPanel" style="' + q + '"><form method="post" action="/login?logout=true"><p>¿Estas seguro de salir?</p><fieldset class="submit-buttons"><div id="tid" style="display:none;"></div><div id="key" style="display:none;"></div><input class="button2" type="submit" value="Si" name="confirm" ' + n + '><input class="button2" type="submit" value="No" name="cancel" id="quickLogoutClose" ' + n + "></fieldset></form></div>";
        if (!document.getElementById("logout")) {
            $('a[href*="/login"]').on("click", function() {
                if (!document.getElementById("quickLoginPanel")) {
                    $("body").append(s);
                    $("#quickLoginPanel").css("left", l.offsetX + "%").css("top", "-25%").animate({
                        top: "40px"
                    }, p);
                    $("#quickLoginClose").on("click", function() {
                        $("#quickLoginPanel").animate({
                            top: "-25%"
                        }, p, function() {
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
                    $("body").append(m);
                    $("#tid").load('/login?logout=1 input[name="tid"]');
                    $("#key").load('/login?logout=1 input[name="key"]');
                    $("#quickLogoutPanel").css("left", l.offsetX + "%").css("top", "-25%").animate({
                        top: "40px"
                    }, p);
                    $("#quickLogoutClose").on("click", function() {
                        $("#quickLogoutPanel").animate({
                            top: "-25%"
                        }, p, function() {
                            $("#quickLogoutPanel").remove()
                        });
                        return false
                    })
                }
                return false
            })
        }
    });
    if (tm) {
        $("p.right").find("iframe").addClass("facelike").detach().appendTo(".post:eq(0)")
    }
}, 1500);
(function() {
    function m(o, a) {
        return a ? o.replace(/\r?\n/g, "<br/>") : o.replace(/\<br\s?\/?\>/gi, "\n")
    }

    function g(o, a) {
        return '<span clapanda="' + o + '">' + a + "</span>"
    }

    function n(p, o, a) {
        return p.replace(RegExp("\\b(?:" + o.join("|") + ")\\b", "g"), function(q) {
            return g(a, q)
        })
    }

    function d(q, p, a) {
        for (var o in p) {
            a = a.replace(p[o], function(r) {
                return g(q + "-" + o, r)
            })
        }
        return a
    }
    var l = {
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
        parse: function(L, u) {
            var M = l.languages[L];
            if (!M) {
                return u
            }
            var O = M.matchers,
                v = M.keywords,
                K = M.specials,
                P = (new Date).getTime(),
                N = {};
            u = m(u).replace(/\</g, "&lt;").replace(/>/g, "&gt;").replace(/&nbsp;/g, "");
            for (var H = 0, a = 0, s; s = O[H++];) {
                var G = this.regex[s],
                    r = "\u00a3panda_" + s + "_" + P + "_",
                    w = N[s] = {},
                    J = !1;
                G && (G.inner && (J = G.inner, G = G.outer), u = u.replace(G, function(o) {
                    var p = r + a++ +"_" + (G.multiline ? "m_" : "") + "panda\u00a3";
                    J && (o = d("panda-" + s, J, o));
                    w[p] = o;
                    return p
                }))
            }
            v.length && (u = n(u, v, "panda-keyword"));
            K.length && (u = n(u, K, "panda-special"));
            M.noints || (u = u.replace(/\b\d+(?:\.\d+)?\b/g, function(o) {
                return g("panda-int", o)
            }));
            for (H = O.length; H; H--) {
                s = O[H - 1];
                var M = N[s],
                    I;
                for (I in M) {
                    v = M[I], I.indexOf("_m_") && (v = v.replace(/\n/g, '</span>\n<span clapanda="panda-' + s + '">')), u = u.replace(I, g("panda-" + s, v))
                }
            }
            u = u.split(" ").join("&nbsp;").replace(/&nbsp;clapanda=/g, " class=").replace(/\t/g, "&nbsp;&nbsp;&nbsp;&nbsp;");
            return m('<ol><li class="panda-line">' + u.split(/\n/).join('</li><li class="panda-line">') + "</li></ol>", 1)
        },
        identify: function(o) {
            if (o.pandaType) {
                return o.pandaType
            }
            var a = /(?:\s|^)panda[_-](\w+)(?:\s|$)/;
            return a.test(o.className) ? a.exec(o.className)[1] : "default"
        },
        colorNode: function(o) {
            var a = l.identify(o);
            l.cacheIdentity && (o.pandaType = a);
            o.className += " panda-code panda-" + a;
            o.innerHTML = l.parse(a, o.innerHTML)
        },
        addSpecials: function(o, a) {
            this.addKeywords(o, a, !0)
        },
        addKeywords: function(r, q, a) {
            if (r in l) {
                for (var o = 0, p = q.length; o < p; o++) {
                    l.languages[r][a ? "specials" : "keywords"].push(q[o])
                }
            }
        },
        addLang: function(q, p) {
            if ("matchers" in p) {
                var a = l.languages[q] = {};
                l.installedLanguages.push(q);
                a.matchers = "string" == typeof p.matchers ? p.matchers.split(" ") : p.matchers;
                a.specials = ("string" == typeof p.specials ? p.specials.split(" ") : p.specials) || [];
                a.keywords = ("string" == typeof p.keywords ? p.keywords.split(" ") : p.keywords) || [];
                if (p.regex && "object" == typeof p.regex) {
                    for (var o in p.regex) {
                        l.regex[o] = p.regex[o]
                    }
                }
            }
        }
    };
    window.panda = l;
    l.addLang("default", {
        matchers: ["string"],
        keywords: "var for while if else elseif function def class try catch return true false continue break case default delete switch in as null typeof sizeof null int char bool boolean long double float enum import struct signed unsigned",
        specials: ["document"]
    });
    l.onload = function() {
        for (var p = document.getElementsByTagName("code"), o = 0, a; a = p[o++];) {
            l.colorNode(a)
        }
    }
})();
panda.onload = function() {
    var m = ["default", "dark", "deepsea", "bright", "neon", "desert", "plain", "geany", "github"],
        l = document.getElementsByTagName("code"),
        o = my_getcookie("panda-theme"),
        p = '<option value="null"> -------------- </option>';
    for (var q = 0, r;
        (r = m[q++]);) {
        p += '<option value="' + r + '" ' + (o && o == r ? ' selected="selected"' : "") + ">";
        p += r.charAt(0).toUpperCase() + r.substr(1) + "</option>"
    }
    for (var s = 0, n;
        (n = l[s++]);) {
        panda.colorNode(n);
        $(n.parentNode.parentNode).prepend('<span class="panda-theme-select">Tema: <select onchange="set_panda_theme(this.value)">' + p + "</select></span>")
    }
    if (o) {
        set_panda_theme(o, l)
    }
};

function set_panda_theme(n, l) {
    l = l || document.getElementsByTagName("code");
    for (var g = 0, m;
        (m = l[g++]);) {
        m.className = m.className.replace(/\s?panda-theme-\w+\s?/, "") + " panda-theme-" + n
    }
    my_setcookie("panda-theme", n, 1)
}
$(panda.onload);

function selectCode(g) {
    g = g.parentNode.tagName === "B" ? $(g).closest("table").find(".cont_code")[0] : $(g).closest("dl").find("code")[0];
    if (window.getSelection) {
        var a = window.getSelection();
        if (a.setBaseAndExtent) {
            a.setBaseAndExtent(g, 0, g, g.innerText.length - 1)
        } else {
            window.opera && g.innerHTML.substring(g.innerHTML.length - 4) == "<BR>" && (g.innerHTML += " ");
            var l = document.createRange();
            l.selectNodeContents(g);
            a.removeAllRanges();
            a.addRange(l)
        }
    } else {
        document.getSelection ? (a = document.getSelection(), l = document.createRange(), l.selectNodeContents(g), a.removeAllRanges(), a.addRange(l)) : document.selection && (l = document.body.createTextRange(), l.moveToElementText(g), l.select())
    }
}
$(function() {
    $("dl.codebox:not(.spoiler,.hidecode) dt").append('<table class="cabecera-code"><td class="sel-code"><td><img class="codeimg" src="https://cdn1.iconfinder.com/data/icons/hawcons/32/698678-icon-70-document-code-24.png"/></td><td class="titulo-code">Código:</td><td onClick="selectCode(this)" class="selectCode" style="cursor:pointer">Seleccionar el contenido</td></table>')
});
if (tm) {
    $(document).ready(function() {
        var s = "phpbb3";
        var p = {
            repName: "Puntos",
            repStyle: "block",
            repImage: "http://i57.servimg.com/u/f57/18/21/41/30/star12.png"
        };
        var n = {
            lv1: 1,
            lv2: 50,
            lv3: 100,
            lv4: 150,
            lv5: 200,
            lv6: 250,
            lv7: 320,
            lv8: 640
        };
        if (p.repStyle.toLowerCase() == "block") {
            var r = '<span id="rLv" class="repuBlock">'
        } else {
            if (p.repStyle.toLowerCase() == "image") {
                var r = '<img id="rLv" src="' + p.repImage + '"/>'
            } else {
                var r = '<span id="rLv" class="repuBlock">'
            }
        }
        var m = {
            phpbb3: s.toLowerCase() == "phpbb3",
        };
        var q = new RegExp(".*" + p.repName + ":\\s+(\\d+).*");
        if (m.phpbb3 || m.punbb || m.invision) {
            if (m.phpbb3) {
                var o = ".postprofile";
                var l = $(this).find(".f_a1").append('<div id="repu">')
            }
            $(o).each(function() {
                var a = Number($(this).text().replace(q, "$1"));
                l;
                if (a >= n.lv1) {
                    $(this).find("#repu").append(r);
                    var d = a + "/" + n.lv2
                }
                if (a >= n.lv2) {
                    $(this).find("#repu").append(r);
                    var d = a + "/" + n.lv3
                }
                if (a >= n.lv3) {
                    $(this).find("#repu").append(r);
                    var d = a + "/" + n.lv4
                }
                if (a >= n.lv4) {
                    $(this).find("#repu").append(r);
                    var d = a + "/" + n.lv5
                }
                if (a >= n.lv5) {
                    $(this).find("#repu").append(r);
                    var d = a + "/" + n.lv6
                }
                if (a >= n.lv6) {
                    $(this).find("#repu").append(r);
                    var d = a + "/" + n.lv7
                }
                if (a >= n.lv7) {
                    $(this).find("#repu").append(r);
                    var d = a + "/" + n.lv8
                }
                if (a >= n.lv8) {
                    $(this).find("#repu").append(r);
                    var d = "MAX"
                }
                $(this).find("#repu").attr("title", "Reputation level " + $(this).find("#rLv").length + "\nNext : (" + d + ")")
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
(function(d, g, l) {
    (function(a) {
        if (typeof define === "function" && define.amd) {
            define(["jquery"], a)
        } else {
            if (jQuery && !jQuery.fn.qtip) {
                a(jQuery)
            }
        }
    }(function(br) {
        var a8 = true,
            bk = false,
            bI = null,
            bN = "x",
            bO = "y",
            be = "width",
            bY = "height",
            aR = "top",
            a2 = "left",
            bp = "bottom",
            aU = "right",
            bh = "center",
            aL = "flip",
            a3 = "flipinvert",
            aQ = "shift",
            a, bW, bC, aX, bP = {},
            aP = "qtip",
            bo = "data-hasqtip",
            bL = "data-qtip-id",
            bD = ["ui-widget", "ui-tooltip"],
            C = "." + aP,
            bK = "click dblclick mousedown mouseup mousemove mouseleave mouseenter".split(" "),
            bs = aP + "-fixed",
            ba = aP + "-default",
            bc = aP + "-focus",
            bQ = aP + "-hover",
            a5 = aP + "-disabled",
            bR = "_replacedByqTip",
            bm = "oldtitle",
            bS, aN = {
                ie: (function() {
                    for (var m = 4, n = g.createElement("div");
                        (n.innerHTML = "<!--[if gt IE " + m + "]><i></i><![endif]-->") && n.getElementsByTagName("i")[0]; m += 1) {}
                    return m > 4 ? m : NaN
                }()),
                iOS: parseFloat(("" + (/CPU.*OS ([0-9_]{1,5})|(CPU like).*AppleWebKit.*Mobile/i.exec(navigator.userAgent) || [0, ""])[1]).replace("undefined", "3_2").replace("_", ".").replace("_", "")) || bk
            };

        function bl(o, p, m, n) {
            this.id = m;
            this.target = o;
            this.tooltip = bI;
            this.elements = {
                target: o
            };
            this._id = aP + "-" + m;
            this.timers = {
                img: {}
            };
            this.options = p;
            this.plugins = {};
            this.cache = {
                event: {},
                target: br(),
                disabled: bk,
                attr: n,
                onTooltip: bk,
                lastClass: ""
            };
            this.rendered = this.destroyed = this.disabled = this.waiting = this.hiddenDuringWait = this.positioning = this.triggering = bk
        }
        bW = bl.prototype;
        bW._when = function(m) {
            return br.when.apply(br, m)
        };
        bW.render = function(v) {
            if (this.rendered || this.destroyed) {
                return this
            }
            var s = this,
                p = this.options,
                o = this.cache,
                m = this.elements,
                t = p.content.text,
                w = p.content.title,
                z = p.content.button,
                u = p.position,
                n = "." + this._id + " ",
                q = [],
                r;
            br.attr(this.target[0], "aria-describedby", this._id);
            o.posClass = this._createPosClass((this.position = {
                my: u.my,
                at: u.at
            }).my);
            this.tooltip = m.tooltip = r = br("<div/>", {
                id: this._id,
                "class": [aP, ba, p.style.classes, o.posClass].join(" "),
                width: p.style.width || "",
                height: p.style.height || "",
                tracking: u.target === "mouse" && u.adjust.mouse,
                role: "alert",
                "aria-live": "polite",
                "aria-atomic": bk,
                "aria-describedby": this._id + "-content",
                "aria-hidden": a8
            }).toggleClass(a5, this.disabled).attr(bL, this.id).data(aP, this).appendTo(u.container).append(m.content = br("<div />", {
                "class": aP + "-content",
                id: this._id + "-content",
                "aria-atomic": a8
            }));
            this.rendered = -1;
            this.positioning = a8;
            if (w) {
                this._createTitle();
                if (!br.isFunction(w)) {
                    q.push(this._updateTitle(w, bk))
                }
            }
            if (z) {
                this._createButton()
            }
            if (!br.isFunction(t)) {
                q.push(this._updateContent(t, bk))
            }
            this.rendered = a8;
            this._setWidget();
            br.each(bP, function(A) {
                var B;
                if (this.initialize === "render" && (B = this(s))) {
                    s.plugins[A] = B
                }
            });
            this._unassignEvents();
            this._assignEvents();
            this._when(q).then(function() {
                s._trigger("render");
                s.positioning = bk;
                if (!s.hiddenDuringWait && (p.show.ready || v)) {
                    s.toggle(a8, o.event, bk)
                }
                s.hiddenDuringWait = bk
            });
            a.api[this.id] = this;
            return this
        };
        bW.destroy = function(m) {
            if (this.destroyed) {
                return this.target
            }

            function n() {
                if (this.destroyed) {
                    return
                }
                this.destroyed = a8;
                var q = this.target,
                    p = q.attr(bm),
                    o;
                if (this.rendered) {
                    this.tooltip.stop(1, 0).find("*").remove().end().remove()
                }
                br.each(this.plugins, function(r) {
                    this.destroy && this.destroy()
                });
                for (o in this.timers) {
                    clearTimeout(this.timers[o])
                }
                q.removeData(aP).removeAttr(bL).removeAttr(bo).removeAttr("aria-describedby");
                if (this.options.suppress && p) {
                    q.attr("title", p).removeAttr(bm)
                }
                this._unassignEvents();
                this.options = this.elements = this.cache = this.timers = this.plugins = this.mouse = bI;
                delete a.api[this.id]
            }
            if ((m !== a8 || this.triggering === "hide") && this.rendered) {
                this.tooltip.one("tooltiphidden", br.proxy(n, this));
                !this.triggering && this.hide()
            } else {
                n.call(this)
            }
            return this.target
        };

        function bw(m) {
            return m === bI || br.type(m) !== "object"
        }

        function a9(m) {
            return !(br.isFunction(m) || (m && m.attr) || m.length || (br.type(m) === "object" && (m.jquery || m.then)))
        }

        function aK(p) {
            var q, m, n, o;
            if (bw(p)) {
                return bk
            }
            if (bw(p.metadata)) {
                p.metadata = {
                    type: p.metadata
                }
            }
            if ("content" in p) {
                q = p.content;
                if (bw(q) || q.jquery || q.done) {
                    q = p.content = {
                        text: (m = a9(q) ? bk : q)
                    }
                } else {
                    m = q.text
                }
                if ("ajax" in q) {
                    n = q.ajax;
                    o = n && n.once !== bk;
                    delete q.ajax;
                    q.text = function(s, t) {
                        var r = m || br(this).attr(t.options.content.attr) || "Loading...",
                            u = br.ajax(br.extend({}, n, {
                                context: t
                            })).then(n.success, bI, n.error).then(function(v) {
                                if (v && o) {
                                    t.set("content.text", v)
                                }
                                return v
                            }, function(v, z, w) {
                                if (t.destroyed || v.status === 0) {
                                    return
                                }
                                t.set("content.text", z + ": " + w)
                            });
                        return !o ? (t.set("content.text", r), u) : r
                    }
                }
                if ("title" in q) {
                    if (br.isPlainObject(q.title)) {
                        q.button = q.title.button;
                        q.title = q.title.text
                    }
                    if (a9(q.title || bk)) {
                        q.title = bk
                    }
                }
            }
            if ("position" in p && bw(p.position)) {
                p.position = {
                    my: p.position,
                    at: p.position
                }
            }
            if ("show" in p && bw(p.show)) {
                p.show = p.show.jquery ? {
                    target: p.show
                } : p.show === a8 ? {
                    ready: a8
                } : {
                    event: p.show
                }
            }
            if ("hide" in p && bw(p.hide)) {
                p.hide = p.hide.jquery ? {
                    target: p.hide
                } : {
                    event: p.hide
                }
            }
            if ("style" in p && bw(p.style)) {
                p.style = {
                    classes: p.style
                }
            }
            br.each(bP, function() {
                this.sanitize && this.sanitize(p)
            });
            return p
        }
        aX = bW.checks = {
            builtin: {
                "^id$": function(o, n, r, q) {
                    var m = r === a8 ? a.nextid : r,
                        p = aP + "-" + m;
                    if (m !== bk && m.length > 0 && !br("#" + p).length) {
                        this._id = p;
                        if (this.rendered) {
                            this.tooltip[0].id = this._id;
                            this.elements.content[0].id = this._id + "-content";
                            this.elements.title[0].id = this._id + "-title"
                        }
                    } else {
                        o[n] = q
                    }
                },
                "^prerender": function(o, n, m) {
                    m && !this.rendered && this.render(this.options.show.ready)
                },
                "^content.text$": function(o, n, m) {
                    this._updateContent(m)
                },
                "^content.attr$": function(o, m, n, p) {
                    if (this.options.content.text === this.target.attr(p)) {
                        this._updateContent(this.target.attr(n))
                    }
                },
                "^content.title$": function(o, n, m) {
                    if (!m) {
                        return this._removeTitle()
                    }
                    m && !this.elements.title && this._createTitle();
                    this._updateTitle(m)
                },
                "^content.button$": function(o, n, m) {
                    this._updateButton(m)
                },
                "^content.title.(text|button)$": function(o, n, m) {
                    this.set("content." + n, m)
                },
                "^position.(my|at)$": function(o, n, m) {
                    "string" === typeof m && (this.position[n] = o[n] = new bC(m, n === "at"))
                },
                "^position.container$": function(o, n, m) {
                    this.rendered && this.tooltip.appendTo(m)
                },
                "^show.ready$": function(o, n, m) {
                    m && (!this.rendered && this.render(a8) || this.toggle(a8))
                },
                "^style.classes$": function(o, m, n, p) {
                    this.rendered && this.tooltip.removeClass(p).addClass(n)
                },
                "^style.(width|height)": function(o, n, m) {
                    this.rendered && this.tooltip.css(n, m)
                },
                "^style.widget|content.title": function() {
                    this.rendered && this._setWidget()
                },
                "^style.def": function(o, n, m) {
                    this.rendered && this.tooltip.toggleClass(ba, !!m)
                },
                "^events.(render|show|move|hide|focus|blur)$": function(o, n, m) {
                    this.rendered && this.tooltip[(br.isFunction(m) ? "" : "un") + "bind"]("tooltip" + n, m)
                },
                "^(show|hide|position).(event|target|fixed|inactive|leave|distance|viewport|adjust)": function() {
                    if (!this.rendered) {
                        return
                    }
                    var m = this.options.position;
                    this.tooltip.attr("tracking", m.target === "mouse" && m.adjust.mouse);
                    this._unassignEvents();
                    this._assignEvents()
                }
            }
        };

        function bA(q, o) {
            var r = 0,
                m, p = q,
                n = o.split(".");
            while (p = p[n[r++]]) {
                if (r < n.length) {
                    m = p
                }
            }
            return [m || q, n.pop()]
        }
        bW.get = function(o) {
            if (this.destroyed) {
                return this
            }
            var n = bA(this.options, o.toLowerCase()),
                m = n[0][n[1]];
            return m.precedance ? m.string() : m
        };

        function bM(n, q) {
            var p, m, o;
            for (p in this.checks) {
                for (m in this.checks[p]) {
                    if (o = (new RegExp(m, "i")).exec(n)) {
                        q.push(o);
                        if (p === "builtin" || this.plugins[p]) {
                            this.checks[p][m].apply(this.plugins[p] || this, q)
                        }
                    }
                }
            }
        }
        var X = /^position\.(my|at|adjust|target|container|viewport)|style|content|show\.ready/i,
            aO = /^prerender|show\.ready/i;
        bW.set = function(o, n) {
            if (this.destroyed) {
                return this
            }
            var m = this.rendered,
                r = bk,
                p = this.options,
                q = this.checks,
                s;
            if ("string" === typeof o) {
                s = o;
                o = {};
                o[s] = n
            } else {
                o = br.extend({}, o)
            }
            br.each(o, function(v, u) {
                if (m && aO.test(v)) {
                    delete o[v];
                    return
                }
                var t = bA(p, v.toLowerCase()),
                    w;
                w = t[0][t[1]];
                t[0][t[1]] = u && u.nodeType ? br(u) : u;
                r = X.test(v) || r;
                o[v] = [t[0], t[1], u, w]
            });
            aK(p);
            this.positioning = a8;
            br.each(o, br.proxy(bM, this));
            this.positioning = bk;
            if (this.rendered && this.tooltip[0].offsetWidth > 0 && r) {
                this.reposition(p.position.target === "mouse" ? bI : this.cache.event)
            }
            return this
        };
        bW._update = function(m, n, p) {
            var o = this,
                q = this.cache;
            if (!this.rendered || !m) {
                return bk
            }
            if (br.isFunction(m)) {
                m = m.call(this.elements.target, q.event, this) || ""
            }
            if (br.isFunction(m.then)) {
                q.waiting = a8;
                return m.then(function(r) {
                    q.waiting = bk;
                    return o._update(r, n)
                }, bI, function(r) {
                    return o._update(r, n)
                })
            }
            if (m === bk || (!m && m !== "")) {
                return bk
            }
            if (m.jquery && m.length > 0) {
                n.empty().append(m.css({
                    display: "block",
                    visibility: "visible"
                }))
            } else {
                n.html(m)
            }
            return this._waitForContent(n).then(function(r) {
                if (o.rendered && o.tooltip[0].offsetWidth > 0) {
                    o.reposition(q.event, !r.length)
                }
            })
        };
        bW._waitForContent = function(n) {
            var m = this.cache;
            m.waiting = a8;
            return (br.fn.imagesLoaded ? n.imagesLoaded() : br.Deferred().resolve([])).done(function() {
                m.waiting = bk
            }).promise()
        };
        bW._updateContent = function(n, m) {
            this._update(n, this.elements.content, m)
        };
        bW._updateTitle = function(n, m) {
            if (this._update(n, this.elements.title, m) === bk) {
                this._removeTitle(bk)
            }
        };
        bW._createTitle = function() {
            var m = this.elements,
                n = this._id + "-title";
            if (m.titlebar) {
                this._removeTitle()
            }
            m.titlebar = br("<div />", {
                "class": aP + "-titlebar " + (this.options.style.widget ? bU("header") : "")
            }).append(m.title = br("<div />", {
                id: n,
                "class": aP + "-title",
                "aria-atomic": a8
            })).insertBefore(m.content).delegate(".qtip-close", "mousedown keydown mouseup keyup mouseout", function(o) {
                br(this).toggleClass("ui-state-active ui-state-focus", o.type.substr(-4) === "down")
            }).delegate(".qtip-close", "mouseover mouseout", function(o) {
                br(this).toggleClass("ui-state-hover", o.type === "mouseover")
            });
            if (this.options.content.button) {
                this._createButton()
            }
        };
        bW._removeTitle = function(m) {
            var n = this.elements;
            if (n.title) {
                n.titlebar.remove();
                n.titlebar = n.title = n.button = bI;
                if (m !== bk) {
                    this.reposition()
                }
            }
        };
        bW._createPosClass = function(m) {
            return aP + "-pos-" + (m || this.options.position.my).abbrev()
        };
        bW.reposition = function(O, o) {
            if (!this.rendered || this.positioning || this.destroyed) {
                return this
            }
            this.positioning = a8;
            var q = this.cache,
                E = this.tooltip,
                L = this.options.position,
                J = L.target,
                s = L.my,
                r = L.at,
                M = L.viewport,
                u = L.container,
                P = L.adjust,
                p = P.method.split(" "),
                N = E.outerWidth(bk),
                m = E.outerHeight(bk),
                B = 0,
                A = 0,
                n = E.css("position"),
                K = {
                    left: 0,
                    top: 0
                },
                H = E[0].offsetWidth > 0,
                t = O && O.type === "scroll",
                F = br(d),
                I = u[0].ownerDocument,
                v = this.mouse,
                w, D, G, z;
            if (br.isArray(J) && J.length === 2) {
                r = {
                    x: a2,
                    y: aR
                };
                K = {
                    left: J[0],
                    top: J[1]
                }
            } else {
                if (J === "mouse") {
                    r = {
                        x: a2,
                        y: aR
                    };
                    if ((!P.mouse || this.options.hide.distance) && q.origin && q.origin.pageX) {
                        O = q.origin
                    } else {
                        if (!O || (O && (O.type === "resize" || O.type === "scroll"))) {
                            O = q.event
                        } else {
                            if (v && v.pageX) {
                                O = v
                            }
                        }
                    }
                    if (n !== "static") {
                        K = u.offset()
                    }
                    if (I.body.offsetWidth !== (d.innerWidth || I.documentElement.clientWidth)) {
                        D = br(g.body).offset()
                    }
                    K = {
                        left: O.pageX - K.left + (D && D.left || 0),
                        top: O.pageY - K.top + (D && D.top || 0)
                    };
                    if (P.mouse && t && v) {
                        K.left -= (v.scrollX || 0) - F.scrollLeft();
                        K.top -= (v.scrollY || 0) - F.scrollTop()
                    }
                } else {
                    if (J === "event") {
                        if (O && O.target && O.type !== "scroll" && O.type !== "resize") {
                            q.target = br(O.target)
                        } else {
                            if (!O.target) {
                                q.target = this.elements.target
                            }
                        }
                    } else {
                        if (J !== "event") {
                            q.target = br(J.jquery ? J : this.elements.target)
                        }
                    }
                    J = q.target;
                    J = br(J).eq(0);
                    if (J.length === 0) {
                        return this
                    } else {
                        if (J[0] === g || J[0] === d) {
                            B = aN.iOS ? d.innerWidth : J.width();
                            A = aN.iOS ? d.innerHeight : J.height();
                            if (J[0] === d) {
                                K = {
                                    top: (M || J).scrollTop(),
                                    left: (M || J).scrollLeft()
                                }
                            }
                        } else {
                            if (bP.imagemap && J.is("area")) {
                                w = bP.imagemap(this, J, r, bP.viewport ? p : bk)
                            } else {
                                if (bP.svg && J && J[0].ownerSVGElement) {
                                    w = bP.svg(this, J, r, bP.viewport ? p : bk)
                                } else {
                                    B = J.outerWidth(bk);
                                    A = J.outerHeight(bk);
                                    K = J.offset()
                                }
                            }
                        }
                    }
                    if (w) {
                        B = w.width;
                        A = w.height;
                        D = w.offset;
                        K = w.position
                    }
                    K = this.reposition.offset(J, K, u);
                    if ((aN.iOS > 3.1 && aN.iOS < 4.1) || (aN.iOS >= 4.3 && aN.iOS < 4.33) || (!aN.iOS && n === "fixed")) {
                        K.left -= F.scrollLeft();
                        K.top -= F.scrollTop()
                    }
                    if (!w || (w && w.adjustable !== bk)) {
                        K.left += r.x === aU ? B : r.x === bh ? B / 2 : 0;
                        K.top += r.y === bp ? A : r.y === bh ? A / 2 : 0
                    }
                }
            }
            K.left += P.x + (s.x === aU ? -N : s.x === bh ? -N / 2 : 0);
            K.top += P.y + (s.y === bp ? -m : s.y === bh ? -m / 2 : 0);
            if (bP.viewport) {
                G = K.adjusted = bP.viewport(this, K, L, B, A, N, m);
                if (D && G.left) {
                    K.left += D.left
                }
                if (D && G.top) {
                    K.top += D.top
                }
                if (G.my) {
                    this.position.my = G.my
                }
            } else {
                K.adjusted = {
                    left: 0,
                    top: 0
                }
            }
            if (q.posClass !== (z = this._createPosClass(this.position.my))) {
                E.removeClass(q.posClass).addClass((q.posClass = z))
            }
            if (!this._trigger("move", [K, M.elem || M], O)) {
                return this
            }
            delete K.adjusted;
            if (o === bk || !H || isNaN(K.left) || isNaN(K.top) || J === "mouse" || !br.isFunction(L.effect)) {
                E.css(K)
            } else {
                if (br.isFunction(L.effect)) {
                    L.effect.call(E, this, br.extend({}, K));
                    E.queue(function(Q) {
                        br(this).css({
                            opacity: "",
                            height: ""
                        });
                        if (aN.ie) {
                            this.style.removeAttribute("filter")
                        }
                        Q()
                    })
                }
            }
            this.positioning = bk;
            return this
        };
        bW.reposition.offset = function(w, s, o) {
            if (!o[0]) {
                return s
            }
            var p = br(w[0].ownerDocument),
                t = !!aN.ie && g.compatMode !== "CSS1Compat",
                q = o[0],
                n, u, m, v;

            function r(A, z) {
                s.left += z * A.scrollLeft();
                s.top += z * A.scrollTop()
            }
            do {
                if ((u = br.css(q, "position")) !== "static") {
                    if (u === "fixed") {
                        m = q.getBoundingClientRect();
                        r(p, -1)
                    } else {
                        m = br(q).position();
                        m.left += (parseFloat(br.css(q, "borderLeftWidth")) || 0);
                        m.top += (parseFloat(br.css(q, "borderTopWidth")) || 0)
                    }
                    s.left -= m.left + (parseFloat(br.css(q, "marginLeft")) || 0);
                    s.top -= m.top + (parseFloat(br.css(q, "marginTop")) || 0);
                    if (!n && (v = br.css(q, "overflow")) !== "hidden" && v !== "visible") {
                        n = br(q)
                    }
                }
            } while ((q = q.offsetParent));
            if (n && (n[0] !== p[0] || t)) {
                r(n, 1)
            }
            return s
        };
        var bG = (bC = bW.reposition.Corner = function(o, n) {
            o = ("" + o).replace(/([A-Z])/, " $1").replace(/middle/gi, bh).toLowerCase();
            this.x = (o.match(/left|right/i) || o.match(/center/) || ["inherit"])[0].toLowerCase();
            this.y = (o.match(/top|bottom|center/i) || ["inherit"])[0].toLowerCase();
            this.forceY = !!n;
            var m = o.charAt(0);
            this.precedance = (m === "t" || m === "b" ? bO : bN)
        }).prototype;
        bG.invert = function(n, m) {
            this[n] = this[n] === a2 ? aU : this[n] === aU ? a2 : m || this[n]
        };
        bG.string = function(o) {
            var p = this.x,
                m = this.y;
            var n = p !== m ? (p === "center" || m !== "center" && (this.precedance === bO || this.forceY) ? [m, p] : [p, m]) : [p];
            return o !== false ? n.join(" ") : n
        };
        bG.abbrev = function() {
            var m = this.string(false);
            return m[0].charAt(0) + (m[1] && m[1].charAt(0) || "")
        };
        bG.clone = function() {
            return new bC(this.string(), this.forceY)
        };
        bW.toggle = function(D, s) {
            var u = this.cache,
                n = this.options,
                E = this.tooltip;
            if (s) {
                if ((/over|enter/).test(s.type) && u.event && (/out|leave/).test(u.event.type) && n.show.target.add(s.target).length === n.show.target.length && E.has(s.relatedTarget).length) {
                    return this
                }
                u.event = br.event.fix(s)
            }
            this.waiting && !D && (this.hiddenDuringWait = a8);
            if (!this.rendered) {
                return D ? this.render(1) : this
            } else {
                if (this.destroyed || this.disabled) {
                    return this
                }
            }
            var F = D ? "show" : "hide",
                v = this.options[F],
                w = this.options[!D ? "show" : "hide"],
                q = this.options.position,
                A = this.options.content,
                t = this.tooltip.css("width"),
                H = this.tooltip.is(":visible"),
                B = D || v.target.length === 1,
                z = !s || v.target.length < 2 || u.target[0] === s.target,
                r, m, G, p, o;
            if ((typeof D).search("boolean|number")) {
                D = !H
            }
            r = !E.is(":animated") && H === D && z;
            m = !r ? !!this._trigger(F, [90]) : bI;
            if (this.destroyed) {
                return this
            }
            if (m !== bk && D) {
                this.focus(s)
            }
            if (!m || r) {
                return this
            }
            br.attr(E[0], "aria-hidden", !!!D);
            if (D) {
                this.mouse && (u.origin = br.event.fix(this.mouse));
                if (br.isFunction(A.text)) {
                    this._updateContent(A.text, bk)
                }
                if (br.isFunction(A.title)) {
                    this._updateTitle(A.title, bk)
                }
                if (!bS && q.target === "mouse" && q.adjust.mouse) {
                    br(g).bind("mousemove." + aP, this._storeMouse);
                    bS = a8
                }
                if (!t) {
                    E.css("width", E.outerWidth(bk))
                }
                this.reposition(s, arguments[2]);
                if (!t) {
                    E.css("width", "")
                }
                if (!!v.solo) {
                    (typeof v.solo === "string" ? br(v.solo) : br(C, v.solo)).not(E).not(v.target).qtip("hide", br.Event("tooltipsolo"))
                }
            } else {
                clearTimeout(this.timers.show);
                delete u.origin;
                if (bS && !br(C + '[tracking="true"]:visible', v.solo).not(E).length) {
                    br(g).unbind("mousemove." + aP);
                    bS = bk
                }
                this.blur(s)
            }
            o = br.proxy(function() {
                if (D) {
                    if (aN.ie) {
                        E[0].style.removeAttribute("filter")
                    }
                    E.css("overflow", "");
                    if ("string" === typeof v.autofocus) {
                        br(this.options.show.autofocus, E).focus()
                    }
                    this.options.show.target.trigger("qtip-" + this.id + "-inactive")
                } else {
                    E.css({
                        display: "",
                        visibility: "",
                        opacity: "",
                        left: "",
                        top: ""
                    })
                }
                this._trigger(D ? "visible" : "hidden")
            }, this);
            if (v.effect === bk || B === bk) {
                E[F]();
                o()
            } else {
                if (br.isFunction(v.effect)) {
                    E.stop(1, 1);
                    v.effect.call(E, this);
                    E.queue("fx", function(I) {
                        o();
                        I()
                    })
                } else {
                    E.fadeTo(90, D ? 1 : 0, o)
                }
            }
            if (D) {
                v.target.trigger("qtip-" + this.id + "-inactive")
            }
            return this
        };
        bW.show = function(m) {
            return this.toggle(a8, m)
        };
        bW.hide = function(m) {
            return this.toggle(bk, m)
        };
        bW.focus = function(o) {
            if (!this.rendered || this.destroyed) {
                return this
            }
            var m = br(C),
                n = this.tooltip,
                q = parseInt(n[0].style.zIndex, 10),
                r = a.zindex + m.length,
                p;
            if (!n.hasClass(bc)) {
                if (this._trigger("focus", [r], o)) {
                    if (q !== r) {
                        m.each(function() {
                            if (this.style.zIndex > q) {
                                this.style.zIndex = this.style.zIndex - 1
                            }
                        });
                        m.filter("." + bc).qtip("blur", o)
                    }
                    n.addClass(bc)[0].style.zIndex = r
                }
            }
            return this
        };
        bW.blur = function(m) {
            if (!this.rendered || this.destroyed) {
                return this
            }
            this.tooltip.removeClass(bc);
            this._trigger("blur", [this.tooltip.css("zIndex")], m);
            return this
        };
        bW.disable = function(m) {
            if (this.destroyed) {
                return this
            }
            if (m === "toggle") {
                m = !(this.rendered ? this.tooltip.hasClass(a5) : this.disabled)
            } else {
                if ("boolean" !== typeof m) {
                    m = a8
                }
            }
            if (this.rendered) {
                this.tooltip.toggleClass(a5, m).attr("aria-disabled", m)
            }
            this.disabled = !!m;
            return this
        };
        bW.enable = function() {
            return this.disable(bk)
        };
        bW._createButton = function() {
            var r = this,
                n = this.elements,
                o = n.tooltip,
                q = this.options.content.button,
                p = typeof q === "string",
                m = p ? q : "Close tooltip";
            if (n.button) {
                n.button.remove()
            }
            if (q.jquery) {
                n.button = q
            } else {
                n.button = br("<a />", {
                    "class": "qtip-close " + (this.options.style.widget ? "" : aP + "-icon"),
                    title: m,
                    "aria-label": m
                }).prepend(br("<span />", {
                    "class": "ui-icon ui-icon-close",
                    html: "&times;"
                }))
            }
            n.button.appendTo(n.titlebar || o).attr("role", "button").on("click", function(s) {
                if (!o.hasClass(a5)) {
                    r.hide(s)
                }
                return bk
            })
        };
        bW._updateButton = function(m) {
            if (!this.rendered) {
                return bk
            }
            var n = this.elements.button;
            if (m) {
                this._createButton()
            } else {
                n.remove()
            }
        };

        function bU(m) {
            return bD.concat("").join(m ? "-" + m + " " : " ")
        }
        bW._setWidget = function() {
            var o = this.options.style.widget,
                m = this.elements,
                n = m.tooltip,
                p = n.hasClass(a5);
            n.removeClass(a5);
            a5 = o ? "ui-state-disabled" : "qtip-disabled";
            n.toggleClass(a5, p);
            n.toggleClass("ui-helper-reset " + bU(), o).toggleClass(ba, this.options.style.def && !o);
            if (m.content) {
                m.content.toggleClass(bU("content"), o)
            }
            if (m.titlebar) {
                m.titlebar.toggleClass(bU("header"), o)
            }
            if (m.button) {
                m.button.toggleClass(aP + "-icon", !o)
            }
        };

        function a1(n, m) {
            if (m > 0) {
                return setTimeout(br.proxy(n, this), m)
            } else {
                n.call(this)
            }
        }

        function bf(m) {
            if (this.tooltip.hasClass(a5)) {
                return
            }
            clearTimeout(this.timers.show);
            clearTimeout(this.timers.hide);
            this.timers.show = a1.call(this, function() {
                this.toggle(a8, m)
            }, this.options.show.delay)
        }

        function aY(n) {
            if (this.tooltip.hasClass(a5) || this.destroyed) {
                return
            }
            var q = br(n.relatedTarget),
                p = q.closest(C)[0] === this.tooltip[0],
                o = q[0] === this.options.show.target[0];
            clearTimeout(this.timers.show);
            clearTimeout(this.timers.hide);
            if (this !== q[0] && (this.options.position.target === "mouse" && p) || (this.options.hide.fixed && ((/mouse(out|leave|move)/).test(n.type) && (p || o)))) {
                try {
                    n.preventDefault();
                    n.stopImmediatePropagation()
                } catch (m) {}
                return
            }
            this.timers.hide = a1.call(this, function() {
                this.toggle(bk, n)
            }, this.options.hide.delay, this)
        }

        function aW(m) {
            if (this.tooltip.hasClass(a5) || !this.options.hide.inactive) {
                return
            }
            clearTimeout(this.timers.inactive);
            this.timers.inactive = a1.call(this, function() {
                this.hide(m)
            }, this.options.hide.inactive)
        }

        function bF(m) {
            if (this.rendered && this.tooltip[0].offsetWidth > 0) {
                this.reposition(m)
            }
        }
        bW._storeMouse = function(m) {
            (this.mouse = br.event.fix(m)).type = "mousemove";
            return this
        };
        bW._bind = function(q, p, m, n, r) {
            if (!q || !m || !p.length) {
                return
            }
            var o = "." + this._id + (n ? "-" + n : "");
            br(q).bind((p.split ? p : p.join(o + " ")) + o, br.proxy(m, r || this));
            return this
        };
        bW._unbind = function(m, n) {
            m && br(m).unbind("." + this._id + (n ? "-" + n : ""));
            return this
        };

        function bx(n, o, m) {
            br(g.body).delegate(n, (o.split ? o : o.join("." + aP + " ")) + "." + aP, function() {
                var p = a.api[br.attr(this, bL)];
                p && !p.disabled && m.apply(p, arguments)
            })
        }
        bW._trigger = function(p, o, n) {
            var m = br.Event("tooltip" + p);
            m.originalEvent = (n && br.extend({}, n)) || this.cache.event || bI;
            this.triggering = p;
            this.tooltip.trigger(m, [this].concat(o || []));
            this.triggering = bk;
            return !m.isDefaultPrevented()
        };
        bW._bindEvents = function(s, m, t, r, p, q) {
            var n = t.filter(r).add(r.filter(t)),
                o = [];
            if (n.length) {
                br.each(m, function(v, u) {
                    var w = br.inArray(u, s);
                    w > -1 && o.push(s.splice(w, 1)[0])
                });
                if (o.length) {
                    this._bind(n, o, function(v) {
                        var u = this.rendered ? this.tooltip[0].offsetWidth > 0 : false;
                        (u ? q : p).call(this, v)
                    });
                    t = t.not(n);
                    r = r.not(n)
                }
            }
            this._bind(t, s, p);
            this._bind(r, m, q)
        };
        bW._assignInitialEvents = function(o) {
            var s = this.options,
                p = s.show.target,
                r = s.hide.target,
                q = s.show.event ? br.trim("" + s.show.event).split(" ") : [],
                m = s.hide.event ? br.trim("" + s.hide.event).split(" ") : [];
            this._bind(this.elements.target, ["remove", "removeqtip"], function(t) {
                this.destroy(true)
            }, "destroy");
            if (/mouse(over|enter)/i.test(s.show.event) && !/mouse(out|leave)/i.test(s.hide.event)) {
                m.push("mouseleave")
            }
            this._bind(p, "mousemove", function(t) {
                this._storeMouse(t);
                this.cache.onTarget = a8
            });

            function n(t) {
                if (this.disabled || this.destroyed) {
                    return bk
                }
                this.cache.event = t && br.event.fix(t);
                this.cache.target = t && br(t.target);
                clearTimeout(this.timers.show);
                this.timers.show = a1.call(this, function() {
                    this.render(typeof t === "object" || s.show.ready)
                }, s.prerender ? 0 : s.show.delay)
            }
            this._bindEvents(q, m, p, r, n, function() {
                if (!this.timers) {
                    return bk
                }
                clearTimeout(this.timers.show)
            });
            if (s.show.ready || s.prerender) {
                n.call(this, o)
            }
        };
        bW._assignEvents = function() {
            var r = this,
                p = this.options,
                t = p.position,
                q = this.tooltip,
                z = p.show.target,
                u = p.hide.target,
                w = t.container,
                o = t.viewport,
                A = br(g),
                n = br(g.body),
                v = br(d),
                m = p.show.event ? br.trim("" + p.show.event).split(" ") : [],
                s = p.hide.event ? br.trim("" + p.hide.event).split(" ") : [];
            br.each(p.events, function(D, B) {
                r._bind(q, D === "toggle" ? ["tooltipshow", "tooltiphide"] : ["tooltip" + D], B, null, q)
            });
            if (/mouse(out|leave)/i.test(p.hide.event) && p.hide.leave === "window") {
                this._bind(A, ["mouseout", "blur"], function(B) {
                    if (!/select|option/.test(B.target.nodeName) && !B.relatedTarget) {
                        this.hide(B)
                    }
                })
            }
            if (p.hide.fixed) {
                u = u.add(q.addClass(bs))
            } else {
                if (/mouse(over|enter)/i.test(p.show.event)) {
                    this._bind(u, "mouseleave", function() {
                        clearTimeout(this.timers.show)
                    })
                }
            }
            if (("" + p.hide.event).indexOf("unfocus") > -1) {
                this._bind(w.closest("html"), ["mousedown", "touchstart"], function(B) {
                    var D = br(B.target),
                        E = this.rendered && !this.tooltip.hasClass(a5) && this.tooltip[0].offsetWidth > 0,
                        F = D.parents(C).filter(this.tooltip[0]).length > 0;
                    if (D[0] !== this.target[0] && D[0] !== this.tooltip[0] && !F && !this.target.has(D[0]).length && E) {
                        this.hide(B)
                    }
                })
            }
            if ("number" === typeof p.hide.inactive) {
                this._bind(z, "qtip-" + this.id + "-inactive", aW, "inactive");
                this._bind(u.add(q), a.inactiveEvents, aW)
            }
            this._bindEvents(m, s, z, u, bf, aY);
            this._bind(z.add(q), "mousemove", function(B) {
                if ("number" === typeof p.hide.distance) {
                    var D = this.cache.origin || {},
                        E = this.options.hide.distance,
                        F = Math.abs;
                    if (F(B.pageX - D.pageX) >= E || F(B.pageY - D.pageY) >= E) {
                        this.hide(B)
                    }
                }
                this._storeMouse(B)
            });
            if (t.target === "mouse") {
                if (t.adjust.mouse) {
                    if (p.hide.event) {
                        this._bind(z, ["mouseenter", "mouseleave"], function(B) {
                            if (!this.cache) {
                                return bk
                            }
                            this.cache.onTarget = B.type === "mouseenter"
                        })
                    }
                    this._bind(A, "mousemove", function(B) {
                        if (this.rendered && this.cache.onTarget && !this.tooltip.hasClass(a5) && this.tooltip[0].offsetWidth > 0) {
                            this.reposition(B)
                        }
                    })
                }
            }
            if (t.adjust.resize || o.length) {
                this._bind(br.event.special.resize ? o : v, "resize", bF)
            }
            if (t.adjust.scroll) {
                this._bind(v.add(t.container), "scroll", bF)
            }
        };
        bW._unassignEvents = function() {
            var p = this.options,
                o = p.show.target,
                m = p.hide.target,
                n = br.grep([this.elements.target[0], this.rendered && this.tooltip[0], p.position.container[0], p.position.viewport[0], p.position.container.closest("html")[0], d, g], function(q) {
                    return typeof q === "object"
                });
            if (o && o.toArray) {
                n = n.concat(o.toArray())
            }
            if (m && m.toArray) {
                n = n.concat(m.toArray())
            }
            this._unbind(n)._unbind(n, "destroy")._unbind(n, "inactive")
        };
        br(function() {
            bx(C, ["mouseenter", "mouseleave"], function(q) {
                var n = q.type === "mouseenter",
                    p = br(q.currentTarget),
                    m = br(q.relatedTarget || q.target),
                    o = this.options;
                if (n) {
                    this.focus(q);
                    p.hasClass(bs) && !p.hasClass(a5) && clearTimeout(this.timers.hide)
                } else {
                    if (o.position.target === "mouse" && o.position.adjust.mouse && o.hide.event && o.show.target && !m.closest(o.show.target[0]).length) {
                        this.hide(q)
                    }
                }
                p.toggleClass(bQ, n)
            });
            bx("[" + bL + "]", bK, aW)
        });

        function bH(B, o, m) {
            var A, p, u, n, r, z = br(g.body),
                s = B[0] === g ? z : B,
                t = (B.metadata) ? B.metadata(m.metadata) : bI,
                q = m.metadata.type === "html5" && t ? t[m.metadata.name] : bI,
                w = B.data(m.metadata.name || "qtipopts");
            try {
                w = typeof w === "string" ? br.parseJSON(w) : w
            } catch (v) {}
            n = br.extend(a8, {}, a.defaults, m, typeof w === "object" ? aK(w) : bI, aK(q || t));
            p = n.position;
            n.id = o;
            if ("boolean" === typeof n.content.text) {
                u = B.attr(n.content.attr);
                if (n.content.attr !== bk && u) {
                    n.content.text = u
                } else {
                    return bk
                }
            }
            if (!p.container.length) {
                p.container = z
            }
            if (p.target === bk) {
                p.target = s
            }
            if (n.show.target === bk) {
                n.show.target = s
            }
            if (n.show.solo === a8) {
                n.show.solo = p.container.closest("body")
            }
            if (n.hide.target === bk) {
                n.hide.target = s
            }
            if (n.position.viewport === a8) {
                n.position.viewport = p.container
            }
            p.container = p.container.eq(0);
            p.at = new bC(p.at, a8);
            p.my = new bC(p.my);
            if (B.data(aP)) {
                if (n.overwrite) {
                    B.qtip("destroy", true)
                } else {
                    if (n.overwrite === bk) {
                        return bk
                    }
                }
            }
            B.attr(bo, o);
            if (n.suppress && (r = B.attr("title"))) {
                B.removeAttr("title").attr(bm, r).attr("title", "")
            }
            A = new bl(B, n, o, !!u);
            B.data(aP, A);
            return A
        }
        a = br.fn.qtip = function(t, o, n) {
            var m = ("" + t).toLowerCase(),
                p = bI,
                s = br.makeArray(arguments).slice(1),
                q = s[s.length - 1],
                r = this[0] ? br.data(this[0], aP) : bI;
            if ((!arguments.length && r) || m === "api") {
                return r
            } else {
                if ("string" === typeof t) {
                    this.each(function() {
                        var u = br.data(this, aP);
                        if (!u) {
                            return a8
                        }
                        if (q && q.timeStamp) {
                            u.cache.event = q
                        }
                        if (o && (m === "option" || m === "options")) {
                            if (n !== l || br.isPlainObject(o)) {
                                u.set(o, n)
                            } else {
                                p = u.get(o);
                                return bk
                            }
                        } else {
                            if (u[m]) {
                                u[m].apply(u, s)
                            }
                        }
                    });
                    return p !== bI ? p : this
                } else {
                    if ("object" === typeof t || !arguments.length) {
                        r = aK(br.extend(a8, {}, t));
                        return this.each(function(w) {
                            var v, u;
                            u = br.isArray(r.id) ? r.id[w] : r.id;
                            u = !u || u === bk || u.length < 1 || a.api[u] ? a.nextid++ : u;
                            v = bH(br(this), u, r);
                            if (v === bk) {
                                return a8
                            } else {
                                a.api[u] = v
                            }
                            br.each(bP, function() {
                                if (this.initialize === "initialize") {
                                    this(v)
                                }
                            });
                            v._assignInitialEvents(q)
                        })
                    }
                }
            }
        };
        br.qtip = bl;
        a.api = {};
        br.each({
            attr: function(p, m) {
                if (this.length) {
                    var q = this[0],
                        n = "title",
                        o = br.data(q, "qtip");
                    if (p === n && o && "object" === typeof o && o.options.suppress) {
                        if (arguments.length < 2) {
                            return br.attr(q, bm)
                        }
                        if (o && o.options.content.attr === n && o.cache.attr) {
                            o.set("content.text", m)
                        }
                        return this.attr(bm, m)
                    }
                }
                return br.fn["attr" + bR].apply(this, arguments)
            },
            clone: function(p) {
                var m = br([]),
                    o = "title",
                    n = br.fn["clone" + bR].apply(this, arguments);
                if (!p) {
                    n.filter("[" + bm + "]").attr("title", function() {
                        return br.attr(this, bm)
                    }).removeAttr(bm)
                }
                return n
            }
        }, function(o, n) {
            if (!n || br.fn[o + bR]) {
                return a8
            }
            var m = br.fn[o + bR] = br.fn[o];
            br.fn[o] = function() {
                return n.apply(this, arguments) || m.apply(this, arguments)
            }
        });
        if (!br.ui) {
            br["cleanData" + bR] = br.cleanData;
            br.cleanData = function(o) {
                for (var p = 0, n;
                    (n = br(o[p])).length; p++) {
                    if (n.attr(bo)) {
                        try {
                            n.triggerHandler("removeqtip")
                        } catch (m) {}
                    }
                }
                br["cleanData" + bR].apply(this, arguments)
            }
        }
        a.version = "2.2.1";
        a.nextid = 0;
        a.inactiveEvents = bK;
        a.zindex = 15000;
        a.defaults = {
            prerender: bk,
            id: bk,
            overwrite: a8,
            suppress: a8,
            content: {
                text: a8,
                attr: "title",
                title: bk,
                button: bk
            },
            position: {
                my: "top left",
                at: "bottom right",
                target: bk,
                container: bk,
                viewport: bk,
                adjust: {
                    x: 0,
                    y: 0,
                    mouse: a8,
                    scroll: a8,
                    resize: a8,
                    method: "flipinvert flipinvert"
                },
                effect: function(o, n, m) {
                    br(this).animate(n, {
                        duration: 200,
                        queue: bk
                    })
                }
            },
            show: {
                target: bk,
                event: "mouseenter",
                effect: a8,
                delay: 90,
                solo: bk,
                ready: bk,
                autofocus: bk
            },
            hide: {
                target: bk,
                event: "mouseleave",
                effect: a8,
                delay: 0,
                fixed: bk,
                inactive: bk,
                leave: "window",
                distance: bk
            },
            style: {
                classes: "",
                widget: bk,
                width: bk,
                height: bk,
                def: a8
            },
            events: {
                render: bI,
                move: bI,
                show: bI,
                hide: bI,
                toggle: bI,
                visible: bI,
                hidden: bI,
                focus: bI,
                blur: bI
            }
        };
        var aV, a6 = ".qtip-tip",
            bb = "margin",
            bj = "border",
            bt = "color",
            bz = "background-color",
            bE = "transparent",
            bu = " !important",
            bn = !!g.createElement("canvas").getContext,
            a0 = /rgba?\(0, 0, 0(, 0)?\)|transparent|#123456/i;

        function a4(m) {
            return m.charAt(0).toUpperCase() + m.slice(1)
        }
        var bq = {},
            bi = ["Webkit", "O", "Moz", "ms"];

        function aS(p, m) {
            var r = m.charAt(0).toUpperCase() + m.slice(1),
                q = (m + " " + bi.join(r + " ") + r).split(" "),
                n, o, s = 0;
            if (bq[m]) {
                return p.css(bq[m])
            }
            while ((n = q[s++])) {
                if ((o = p.css(n)) !== l) {
                    return bq[m] = n, o
                }
            }
        }

        function bg(m, n) {
            return Math.ceil(parseFloat(aS(m, n)))
        }
        if (!bn) {
            var bX = function(n, m, o) {
                return "<qtipvml:" + n + ' xmlns="urn:schemas-microsoft.com:vml" class="qtip-vml" ' + (m || "") + ' style="behavior: url(#default#VML); ' + (o || "") + '" />'
            }
        } else {
            var Y = d.devicePixelRatio || 1,
                bV = (function() {
                    var m = g.createElement("canvas").getContext("2d");
                    return m.backingStorePixelRatio || m.webkitBackingStorePixelRatio || m.mozBackingStorePixelRatio || m.msBackingStorePixelRatio || m.oBackingStorePixelRatio || 1
                }()),
                bd = Y / bV
        }

        function by(n, m) {
            this._ns = "tip";
            this.options = m;
            this.offset = m.offset;
            this.size = [m.width, m.height];
            this.init((this.qtip = n))
        }
        br.extend(by.prototype, {
            init: function(n) {
                var m, o;
                o = this.element = n.elements.tip = br("<div />", {
                    "class": aP + "-tip"
                }).prependTo(n.tooltip);
                if (bn) {
                    m = br("<canvas />").appendTo(this.element)[0].getContext("2d");
                    m.lineJoin = "miter";
                    m.miterLimit = 100000;
                    m.save()
                } else {
                    m = bX("shape", 'coordorigin="0,0"', "position:absolute;");
                    this.element.html(m + m);
                    n._bind(br("*", o).add(o), ["click", "mousedown"], function(p) {
                        p.stopPropagation()
                    }, this._ns)
                }
                n._bind(n.tooltip, "tooltipmove", this.reposition, this._ns, this);
                this.create()
            },
            _swapDimensions: function() {
                this.size[0] = this.options.height;
                this.size[1] = this.options.width
            },
            _resetDimensions: function() {
                this.size[0] = this.options.width;
                this.size[1] = this.options.height
            },
            _useTitle: function(m) {
                var n = this.qtip.elements.titlebar;
                return n && (m.y === aR || (m.y === bh && this.element.position().top + (this.size[1] / 2) + this.options.offset < n.outerHeight(a8)))
            },
            _parseCorner: function(m) {
                var n = this.qtip.options.position.my;
                if (m === bk || n === bk) {
                    m = bk
                } else {
                    if (m === a8) {
                        m = new bC(n.string())
                    } else {
                        if (!m.string) {
                            m = new bC(m);
                            m.fixed = a8
                        }
                    }
                }
                return m
            },
            _parseWidth: function(p, q, o) {
                var n = this.qtip.elements,
                    m = bj + a4(q) + "Width";
                return (o ? bg(o, m) : (bg(n.content, m) || bg(this._useTitle(p) && n.titlebar || n.content, m) || bg(n.tooltip, m))) || 0
            },
            _parseRadius: function(n) {
                var o = this.qtip.elements,
                    m = bj + a4(n.y) + a4(n.x) + "Radius";
                return aN.ie < 9 ? 0 : bg(this._useTitle(n) && o.titlebar || o.content, m) || bg(o.tooltip, m) || 0
            },
            _invalidColour: function(o, m, p) {
                var n = o.css(m);
                return !n || (p && n === o.css(p)) || a0.test(n) ? bk : n
            },
            _parseColours: function(o) {
                var m = this.qtip.elements,
                    n = this.element.css("cssText", ""),
                    p = bj + a4(o[o.precedance]) + a4(bt),
                    s = this._useTitle(o) && m.titlebar || m.content,
                    r = this._invalidColour,
                    q = [];
                q[0] = r(n, bz) || r(s, bz) || r(m.content, bz) || r(m.tooltip, bz) || n.css(bz);
                q[1] = r(n, p, bt) || r(s, p, bt) || r(m.content, p, bt) || r(m.tooltip, p, bt) || m.tooltip.css(p);
                br("*", n).add(n).css("cssText", bz + ":" + bE + bu + ";" + bj + ":0" + bu + ";");
                return q
            },
            _calculateSize: function(s) {
                var u = s.precedance === bO,
                    o = this.options.width,
                    r = this.options.height,
                    v = s.abbrev() === "c",
                    m = (u ? o : r) * (v ? 0.5 : 1),
                    A = Math.pow,
                    q = Math.round,
                    t, w, p, n = Math.sqrt(A(m, 2) + A(r, 2)),
                    z = [(this.border / m) * n, (this.border / r) * n];
                z[2] = Math.sqrt(A(z[0], 2) - A(this.border, 2));
                z[3] = Math.sqrt(A(z[1], 2) - A(this.border, 2));
                t = n + z[2] + z[3] + (v ? 0 : z[0]);
                w = t / n;
                p = [q(w * o), q(w * r)];
                return u ? p : p.reverse()
            },
            _calculateTip: function(n, s, m) {
                m = m || 1;
                s = s || this.size;
                var p = s[0] * m,
                    t = s[1] * m,
                    q = Math.ceil(p / 2),
                    o = Math.ceil(t / 2),
                    r = {
                        br: [0, 0, p, t, p, 0],
                        bl: [0, 0, p, 0, 0, t],
                        tr: [0, t, p, 0, p, t],
                        tl: [0, 0, 0, t, p, t],
                        tc: [0, t, q, 0, p, t],
                        bc: [0, 0, p, 0, q, t],
                        rc: [0, 0, p, o, 0, t],
                        lc: [p, 0, p, t, 0, o]
                    };
                r.lt = r.br;
                r.rt = r.bl;
                r.lb = r.tr;
                r.rb = r.tl;
                return r[n.abbrev()]
            },
            _drawCoords: function(m, n) {
                m.beginPath();
                m.moveTo(n[0], n[1]);
                m.lineTo(n[2], n[3]);
                m.lineTo(n[4], n[5]);
                m.closePath()
            },
            create: function() {
                var m = this.corner = (bn || aN.ie) && this._parseCorner(this.options.corner);
                if ((this.enabled = !!this.corner && this.corner.abbrev() !== "c")) {
                    this.qtip.cache.corner = m.clone();
                    this.update()
                }
                this.element.toggle(this.enabled);
                return this.corner
            },
            update: function(F, n) {
                if (!this.enabled) {
                    return this
                }
                var B = this.qtip.elements,
                    D = this.element,
                    p = D.children(),
                    m = this.options,
                    w = this.size,
                    r = m.mimic,
                    q = Math.round,
                    u, A, o, s, z, E, G, v, t;
                if (!F) {
                    F = this.qtip.cache.corner || this.corner
                }
                if (r === bk) {
                    r = F
                } else {
                    r = new bC(r);
                    r.precedance = F.precedance;
                    if (r.x === "inherit") {
                        r.x = F.x
                    } else {
                        if (r.y === "inherit") {
                            r.y = F.y
                        } else {
                            if (r.x === r.y) {
                                r[F.precedance] = F[F.precedance]
                            }
                        }
                    }
                }
                A = r.precedance;
                if (F.precedance === bN) {
                    this._swapDimensions()
                } else {
                    this._resetDimensions()
                }
                u = this.color = this._parseColours(F);
                if (u[1] !== bE) {
                    v = this.border = this._parseWidth(F, F[F.precedance]);
                    if (m.border && v < 1 && !a0.test(u[1])) {
                        u[0] = u[1]
                    }
                    this.border = v = m.border !== a8 ? m.border : v
                } else {
                    this.border = v = 0
                }
                G = this.size = this._calculateSize(F);
                D.css({
                    width: G[0],
                    height: G[1],
                    lineHeight: G[1] + "px"
                });
                if (F.precedance === bO) {
                    E = [q(r.x === a2 ? v : r.x === aU ? G[0] - w[0] - v : (G[0] - w[0]) / 2), q(r.y === aR ? G[1] - w[1] : 0)]
                } else {
                    E = [q(r.x === a2 ? G[0] - w[0] : 0), q(r.y === aR ? v : r.y === bp ? G[1] - w[1] - v : (G[1] - w[1]) / 2)]
                }
                if (bn) {
                    o = p[0].getContext("2d");
                    o.restore();
                    o.save();
                    o.clearRect(0, 0, 6000, 6000);
                    s = this._calculateTip(r, w, bd);
                    z = this._calculateTip(r, this.size, bd);
                    p.attr(be, G[0] * bd).attr(bY, G[1] * bd);
                    p.css(be, G[0]).css(bY, G[1]);
                    this._drawCoords(o, z);
                    o.fillStyle = u[1];
                    o.fill();
                    o.translate(E[0] * bd, E[1] * bd);
                    this._drawCoords(o, s);
                    o.fillStyle = u[0];
                    o.fill()
                } else {
                    s = this._calculateTip(r);
                    s = "m" + s[0] + "," + s[1] + " l" + s[2] + "," + s[3] + " " + s[4] + "," + s[5] + " xe";
                    E[2] = v && /^(r|b)/i.test(F.string()) ? aN.ie === 8 ? 2 : 1 : 0;
                    p.css({
                        coordsize: (G[0] + v) + " " + (G[1] + v),
                        antialias: "" + (r.string().indexOf(bh) > -1),
                        left: E[0] - (E[2] * Number(A === bN)),
                        top: E[1] - (E[2] * Number(A === bO)),
                        width: G[0] + v,
                        height: G[1] + v
                    }).each(function(I) {
                        var H = br(this);
                        H[H.prop ? "prop" : "attr"]({
                            coordsize: (G[0] + v) + " " + (G[1] + v),
                            path: s,
                            fillcolor: u[0],
                            filled: !!I,
                            stroked: !I
                        }).toggle(!!(v || I));
                        !I && H.html(bX("stroke", 'weight="' + (v * 2) + 'px" color="' + u[1] + '" miterlimit="1000" joinstyle="miter"'))
                    })
                }
                d.opera && setTimeout(function() {
                    B.tip.css({
                        display: "inline-block",
                        visibility: "visible"
                    })
                }, 1);
                if (n !== bk) {
                    this.calculate(F, G)
                }
            },
            calculate: function(r, p) {
                if (!this.enabled) {
                    return bk
                }
                var q = this,
                    m = this.qtip.elements,
                    s = this.element,
                    o = this.options.offset,
                    v = m.tooltip.hasClass("ui-widget"),
                    t = {},
                    n, u;
                r = r || this.corner;
                n = r.precedance;
                p = p || this._calculateSize(r);
                u = [r.x, r.y];
                if (n === bN) {
                    u.reverse()
                }
                br.each(u, function(B, D) {
                    var z, A, w;
                    if (D === bh) {
                        z = n === bO ? a2 : aR;
                        t[z] = "50%";
                        t[bb + "-" + z] = -Math.round(p[n === bO ? 0 : 1] / 2) + o
                    } else {
                        z = q._parseWidth(r, D, m.tooltip);
                        A = q._parseWidth(r, D, m.content);
                        w = q._parseRadius(r);
                        t[D] = Math.max(-q.border, B ? A : (o + (w > z ? w : -z)))
                    }
                });
                t[r[n]] -= p[n === bN ? 0 : 1];
                s.css({
                    margin: "",
                    top: "",
                    bottom: "",
                    left: "",
                    right: ""
                }).css(t);
                return t
            },
            reposition: function(E, v, r, u) {
                if (!this.enabled) {
                    return
                }
                var o = v.cache,
                    p = this.corner.clone(),
                    q = r.adjusted,
                    m = v.options.position.adjust.method.split(" "),
                    n = m[0],
                    B = m[1] || m[0],
                    D = {
                        left: bk,
                        top: bk,
                        x: 0,
                        y: 0
                    },
                    z, w = {},
                    t;

                function s(G, J, F, I, H) {
                    if (G === aQ && p.precedance === J && q[I] && p[F] !== bh) {
                        p.precedance = p.precedance === bN ? bO : bN
                    } else {
                        if (G !== aQ && q[I]) {
                            p[J] = p[J] === bh ? (q[I] > 0 ? I : H) : (p[J] === I ? H : I)
                        }
                    }
                }

                function A(F, H, G) {
                    if (p[F] === bh) {
                        w[bb + "-" + H] = D[F] = z[bb + "-" + H] - q[H]
                    } else {
                        t = z[G] !== l ? [q[H], -z[H]] : [-q[H], z[H]];
                        if ((D[F] = Math.max(t[0], t[1])) > t[0]) {
                            r[H] -= q[H];
                            D[H] = bk
                        }
                        w[z[G] !== l ? G : H] = D[F]
                    }
                }
                if (this.corner.fixed !== a8) {
                    s(n, bN, bO, a2, aU);
                    s(B, bO, bN, aR, bp);
                    if (p.string() !== o.corner.string() || o.cornerTop !== q.top || o.cornerLeft !== q.left) {
                        this.update(p, bk)
                    }
                }
                z = this.calculate(p);
                if (z.right !== l) {
                    z.left = -z.right
                }
                if (z.bottom !== l) {
                    z.top = -z.bottom
                }
                z.user = this.offset;
                if (D.left = (n === aQ && !!q.left)) {
                    A(bN, a2, aU)
                }
                if (D.top = (B === aQ && !!q.top)) {
                    A(bO, aR, bp)
                }
                this.element.css(w).toggle(!((D.x && D.y) || (p.x === bh && D.y) || (p.y === bh && D.x)));
                r.left -= z.left.charAt ? z.user : n !== aQ || D.top || !D.left && !D.top ? z.left + this.border : 0;
                r.top -= z.top.charAt ? z.user : B !== aQ || D.left || !D.left && !D.top ? z.top + this.border : 0;
                o.cornerLeft = q.left;
                o.cornerTop = q.top;
                o.corner = p.clone()
            },
            destroy: function() {
                this.qtip._unbind(this.qtip.tooltip, this._ns);
                if (this.qtip.elements.tip) {
                    this.qtip.elements.tip.find("*").remove().end().remove()
                }
            }
        });
        aV = bP.tip = function(m) {
            return new by(m, m.options.style.tip)
        };
        aV.initialize = "render";
        aV.sanitize = function(m) {
            if (m.style && "tip" in m.style) {
                var n = m.style.tip;
                if (typeof n !== "object") {
                    n = m.style.tip = {
                        corner: n
                    }
                }
                if (!(/string|boolean/i).test(typeof n.corner)) {
                    n.corner = a8
                }
            }
        };
        aX.tip = {
            "^position.my|style.tip.(corner|mimic|border)$": function() {
                this.create();
                this.qtip.reposition()
            },
            "^style.tip.(height|width)$": function(m) {
                this.size = [m.width, m.height];
                this.update();
                this.qtip.reposition()
            },
            "^content.title|style.(classes|widget)$": function() {
                this.update()
            }
        };
        br.extend(a8, a.defaults, {
            style: {
                tip: {
                    corner: a8,
                    mimic: bk,
                    width: 6,
                    height: 6,
                    border: a8,
                    offset: 0
                }
            }
        });
        var a7, aT, aM = "qtip-modal",
            bB = "." + aM;
        aT = function() {
            var p = this,
                r = {},
                o, n, s, m;

            function t(v) {
                if (br.expr[":"].focusable) {
                    return br.expr[":"].focusable
                }
                var z = !isNaN(br.attr(v, "tabindex")),
                    A = v.nodeName && v.nodeName.toLowerCase(),
                    B, D, w;
                if ("area" === A) {
                    B = v.parentNode;
                    D = B.name;
                    if (!v.href || !D || B.nodeName.toLowerCase() !== "map") {
                        return false
                    }
                    w = br("img[usemap=#" + D + "]")[0];
                    return !!w && w.is(":visible")
                }
                return (/input|select|textarea|button|object/.test(A) ? !v.disabled : "a" === A ? v.href || z : z)
            }

            function u(v) {
                if (r.length < 1 && v.length) {
                    v.not("body").blur()
                } else {
                    r.first().focus()
                }
            }

            function q(w) {
                if (!m.is(":visible")) {
                    return
                }
                var B = br(w.target),
                    v = o.tooltip,
                    z = B.closest(C),
                    A;
                A = z.length < 1 ? bk : (parseInt(z[0].style.zIndex, 10) > parseInt(v[0].style.zIndex, 10));
                if (!A && B.closest(C)[0] !== v[0]) {
                    u(B)
                }
                n = w.target === r[r.length - 1]
            }
            br.extend(p, {
                init: function() {
                    m = p.elem = br("<div />", {
                        id: "qtip-overlay",
                        html: "<div></div>",
                        mousedown: function() {
                            return bk
                        }
                    }).hide();
                    br(g.body).bind("focusin" + bB, q);
                    br(g).bind("keydown" + bB, function(v) {
                        if (o && o.options.show.modal.escape && v.keyCode === 27) {
                            o.hide(v)
                        }
                    });
                    m.bind("click" + bB, function(v) {
                        if (o && o.options.show.modal.blur) {
                            o.hide(v)
                        }
                    });
                    return p
                },
                update: function(v) {
                    o = v;
                    if (v.options.show.modal.stealfocus !== bk) {
                        r = v.tooltip.find("*").filter(function() {
                            return t(this)
                        })
                    } else {
                        r = []
                    }
                },
                toggle: function(D, I, G) {
                    var E = br(g.body),
                        z = D.tooltip,
                        v = D.options.show.modal,
                        w = v.effect,
                        B = I ? "show" : "hide",
                        H = m.is(":visible"),
                        F = br(bB).filter(":visible:not(:animated)").not(z),
                        A;
                    p.update(D);
                    if (I && v.stealfocus !== bk) {
                        u(br(":focus"))
                    }
                    m.toggleClass("blurs", v.blur);
                    if (I) {
                        m.appendTo(g.body)
                    }
                    if ((m.is(":animated") && H === I && s !== bk) || (!I && F.length)) {
                        return p
                    }
                    m.stop(a8, bk);
                    if (br.isFunction(w)) {
                        w.call(m, I)
                    } else {
                        if (w === bk) {
                            m[B]()
                        } else {
                            m.fadeTo(parseInt(G, 10) || 90, I ? 1 : 0, function() {
                                if (!I) {
                                    m.hide()
                                }
                            })
                        }
                    }
                    if (!I) {
                        m.queue(function(J) {
                            m.css({
                                left: "",
                                top: ""
                            });
                            if (!br(bB).length) {
                                m.detach()
                            }
                            J()
                        })
                    }
                    s = I;
                    if (o.destroyed) {
                        o = bI
                    }
                    return p
                }
            });
            p.init()
        };
        aT = new aT();

        function bT(n, m) {
            this.options = m;
            this._ns = "-modal";
            this.init((this.qtip = n))
        }
        br.extend(bT.prototype, {
            init: function(n) {
                var m = n.tooltip;
                if (!this.options.on) {
                    return this
                }
                n.elements.overlay = aT.elem;
                m.addClass(aM).css("z-index", a.modal_zindex + br(bB).length);
                n._bind(m, ["tooltipshow", "tooltiphide"], function(q, r, o) {
                    var s = q.originalEvent;
                    if (q.target === m[0]) {
                        if (s && q.type === "tooltiphide" && /mouse(leave|enter)/.test(s.type) && br(s.relatedTarget).closest(aT.elem[0]).length) {
                            try {
                                q.preventDefault()
                            } catch (p) {}
                        } else {
                            if (!s || (s && s.type !== "tooltipsolo")) {
                                this.toggle(q, q.type === "tooltipshow", o)
                            }
                        }
                    }
                }, this._ns, this);
                n._bind(m, "tooltipfocus", function(q, r) {
                    if (q.isDefaultPrevented() || q.target !== m[0]) {
                        return
                    }
                    var p = br(bB),
                        s = a.modal_zindex + p.length,
                        t = parseInt(m[0].style.zIndex, 10);
                    aT.elem[0].style.zIndex = s - 1;
                    p.each(function() {
                        if (this.style.zIndex > t) {
                            this.style.zIndex -= 1
                        }
                    });
                    p.filter("." + bc).qtip("blur", q.originalEvent);
                    m.addClass(bc)[0].style.zIndex = s;
                    aT.update(r);
                    try {
                        q.preventDefault()
                    } catch (o) {}
                }, this._ns, this);
                n._bind(m, "tooltiphide", function(o) {
                    if (o.target === m[0]) {
                        br(bB).filter(":visible").not(m).last().qtip("focus", o)
                    }
                }, this._ns, this)
            },
            toggle: function(n, o, m) {
                if (n && n.isDefaultPrevented()) {
                    return this
                }
                aT.toggle(this.qtip, !!o, m)
            },
            destroy: function() {
                this.qtip.tooltip.removeClass(aM);
                this.qtip._unbind(this.qtip.tooltip, this._ns);
                aT.toggle(this.qtip, bk);
                delete this.qtip.elements.overlay
            }
        });
        a7 = bP.modal = function(m) {
            return new bT(m, m.options.show.modal)
        };
        a7.sanitize = function(m) {
            if (m.show) {
                if (typeof m.show.modal !== "object") {
                    m.show.modal = {
                        on: !!m.show.modal
                    }
                } else {
                    if (typeof m.show.modal.on === "undefined") {
                        m.show.modal.on = a8
                    }
                }
            }
        };
        a.modal_zindex = a.zindex - 200;
        a7.initialize = "render";
        aX.modal = {
            "^show.modal.(on|blur)$": function() {
                this.destroy();
                this.init();
                this.qtip.elems.overlay.toggle(this.qtip.tooltip[0].offsetWidth > 0)
            }
        };
        br.extend(a8, a.defaults, {
            show: {
                modal: {
                    on: bk,
                    effect: a8,
                    blur: a8,
                    stealfocus: a8,
                    escape: a8
                }
            }
        });
        bP.viewport = function(r, I, L, D, B, O, P) {
            var J = L.target,
                F = r.elements.tooltip,
                t = L.my,
                q = L.at,
                Q = L.adjust,
                p = Q.method.split(" "),
                v = p[0],
                z = p[1] || p[0],
                M = L.viewport,
                u = L.container,
                s = r.cache,
                G = {
                    left: 0,
                    top: 0
                },
                n, A, E, K, m, H, o, N;
            if (!M.jquery || J[0] === d || J[0] === g.body || Q.method === "none") {
                return G
            }
            E = u.offset() || G;
            K = u.css("position") === "static";
            n = F.css("position") === "fixed";
            m = M[0] === d ? M.width() : M.outerWidth(bk);
            H = M[0] === d ? M.height() : M.outerHeight(bk);
            o = {
                left: n ? 0 : M.scrollLeft(),
                top: n ? 0 : M.scrollTop()
            };
            N = M.offset() || G;

            function w(ag, ah, ae, al, Z, ab, R, aj, V) {
                var ad = I[Z],
                    U = t[ag],
                    ak = q[ag],
                    ai = ae === aQ,
                    aa = U === Z ? V : U === ab ? -V : -V / 2,
                    T = ak === Z ? aj : ak === ab ? -aj : -aj / 2,
                    S = o[Z] + N[Z] - (K ? 0 : E[Z]),
                    ac = S - ad,
                    af = ad + V - (R === be ? m : H) - S,
                    W = aa - (t.precedance === ag || U === t[ah] ? T : 0) - (ak === bh ? aj / 2 : 0);
                if (ai) {
                    W = (U === Z ? 1 : -1) * aa;
                    I[Z] += ac > 0 ? ac : af > 0 ? -af : 0;
                    I[Z] = Math.max(-E[Z] + N[Z], ad - W, Math.min(Math.max(-E[Z] + N[Z] + (R === be ? m : H), ad + W), I[Z], U === "center" ? ad - aa : 1000000000))
                } else {
                    al *= (ae === a3 ? 2 : 0);
                    if (ac > 0 && (U !== Z || af > 0)) {
                        I[Z] -= W + al;
                        A.invert(ag, Z)
                    } else {
                        if (af > 0 && (U !== ab || ac > 0)) {
                            I[Z] -= (U === bh ? -W : W) + al;
                            A.invert(ag, ab)
                        }
                    }
                    if (I[Z] < o && -I[Z] > af) {
                        I[Z] = ad;
                        A = t.clone()
                    }
                }
                return I[Z] - ad
            }
            if (v !== "shift" || z !== "shift") {
                A = t.clone()
            }
            G = {
                left: v !== "none" ? w(bN, bO, v, Q.x, a2, aU, be, D, O) : 0,
                top: z !== "none" ? w(bO, bN, z, Q.y, aR, bp, bY, B, P) : 0,
                my: A
            };
            return G
        };
        bP.polys = {
            polygon: function(o, q) {
                var p = {
                        width: 0,
                        height: 0,
                        position: {
                            top: 10000000000,
                            right: 0,
                            bottom: 0,
                            left: 10000000000
                        },
                        adjustable: bk
                    },
                    v = 0,
                    u, r = [],
                    s = 1,
                    t = 1,
                    w = 0,
                    n = 0,
                    z, m;
                v = o.length;
                while (v--) {
                    u = [parseInt(o[--v], 10), parseInt(o[v + 1], 10)];
                    if (u[0] > p.position.right) {
                        p.position.right = u[0]
                    }
                    if (u[0] < p.position.left) {
                        p.position.left = u[0]
                    }
                    if (u[1] > p.position.bottom) {
                        p.position.bottom = u[1]
                    }
                    if (u[1] < p.position.top) {
                        p.position.top = u[1]
                    }
                    r.push(u)
                }
                z = p.width = Math.abs(p.position.right - p.position.left);
                m = p.height = Math.abs(p.position.bottom - p.position.top);
                if (q.abbrev() === "c") {
                    p.position = {
                        left: p.position.left + (p.width / 2),
                        top: p.position.top + (p.height / 2)
                    }
                } else {
                    while (z > 0 && m > 0 && s > 0 && t > 0) {
                        z = Math.floor(z / 2);
                        m = Math.floor(m / 2);
                        if (q.x === a2) {
                            s = z
                        } else {
                            if (q.x === aU) {
                                s = p.width - z
                            } else {
                                s += Math.floor(z / 2)
                            }
                        }
                        if (q.y === aR) {
                            t = m
                        } else {
                            if (q.y === bp) {
                                t = p.height - m
                            } else {
                                t += Math.floor(m / 2)
                            }
                        }
                        v = r.length;
                        while (v--) {
                            if (r.length < 2) {
                                break
                            }
                            w = r[v][0] - p.position.left;
                            n = r[v][1] - p.position.top;
                            if ((q.x === a2 && w >= s) || (q.x === aU && w <= s) || (q.x === bh && (w < s || w > (p.width - s))) || (q.y === aR && n >= t) || (q.y === bp && n <= t) || (q.y === bh && (n < t || n > (p.height - t)))) {
                                r.splice(v, 1)
                            }
                        }
                    }
                    p.position = {
                        left: r[0][0],
                        top: r[0][1]
                    }
                }
                return p
            },
            rect: function(p, o, m, n) {
                return {
                    width: Math.abs(m - p),
                    height: Math.abs(n - o),
                    position: {
                        left: Math.min(p, m),
                        top: Math.min(o, n)
                    }
                }
            },
            _angles: {
                tc: 3 / 2,
                tr: 7 / 4,
                tl: 5 / 4,
                bc: 1 / 2,
                br: 1 / 4,
                bl: 3 / 4,
                rc: 2,
                lc: 1,
                c: 0
            },
            ellipse: function(t, m, o, p, q) {
                var n = bP.polys._angles[q.abbrev()],
                    s = n === 0 ? 0 : o * Math.cos(n * Math.PI),
                    r = p * Math.sin(n * Math.PI);
                return {
                    width: (o * 2) - Math.abs(s),
                    height: (p * 2) - Math.abs(r),
                    position: {
                        left: t + s,
                        top: m + r
                    },
                    adjustable: bk
                }
            },
            circle: function(o, m, n, p) {
                return bP.polys.ellipse(o, m, n, n, p)
            }
        };
        bP.svg = function(B, A, F) {
            var m = br(g),
                s = A[0],
                w = br(s.ownerSVGElement),
                q = s.ownerDocument,
                p = (parseInt(A.css("stroke-width"), 10) || 0) / 2,
                H, n, o, D, t, z, u, v, E, r, G;
            while (!s.getBBox) {
                s = s.parentNode
            }
            if (!s.getBBox || !s.parentNode) {
                return bk
            }
            switch (s.nodeName) {
                case "ellipse":
                case "circle":
                    E = bP.polys.ellipse(s.cx.baseVal.value, s.cy.baseVal.value, (s.rx || s.r).baseVal.value + p, (s.ry || s.r).baseVal.value + p, F);
                    break;
                case "line":
                case "polygon":
                case "polyline":
                    v = s.points || [{
                        x: s.x1.baseVal.value,
                        y: s.y1.baseVal.value
                    }, {
                        x: s.x2.baseVal.value,
                        y: s.y2.baseVal.value
                    }];
                    for (E = [], u = -1, t = v.numberOfItems || v.length; ++u < t;) {
                        z = v.getItem ? v.getItem(u) : v[u];
                        E.push.apply(E, [z.x, z.y])
                    }
                    E = bP.polys.polygon(E, F);
                    break;
                default:
                    E = s.getBBox();
                    E = {
                        width: E.width,
                        height: E.height,
                        position: {
                            left: E.x,
                            top: E.y
                        }
                    };
                    break
            }
            r = E.position;
            w = w[0];
            if (w.createSVGPoint) {
                n = s.getScreenCTM();
                v = w.createSVGPoint();
                v.x = r.left;
                v.y = r.top;
                o = v.matrixTransform(n);
                r.left = o.x;
                r.top = o.y
            }
            if (q !== g && B.position.target !== "mouse") {
                H = br((q.defaultView || q.parentWindow).frameElement).offset();
                if (H) {
                    r.left += H.left;
                    r.top += H.top
                }
            }
            q = br(q);
            r.left += q.scrollLeft();
            r.top += q.scrollTop();
            return E
        };
        bP.imagemap = function(v, o, r, B) {
            if (!o.jquery) {
                o = br(o)
            }
            var t = (o.attr("shape") || "rect").toLowerCase().replace("poly", "polygon"),
                n = br('img[usemap="#' + o.parent("map").attr("name") + '"]'),
                u = br.trim(o.attr("coords")),
                m = u.replace(/,$/, "").split(","),
                p, s, A, z, q, w;
            if (!n.length) {
                return bk
            }
            if (t === "polygon") {
                q = bP.polys.polygon(m, r)
            } else {
                if (bP.polys[t]) {
                    for (A = -1, w = m.length, s = []; ++A < w;) {
                        s.push(parseInt(m[A], 10))
                    }
                    q = bP.polys[t].apply(this, s.concat(r))
                } else {
                    return bk
                }
            }
            p = n.offset();
            p.left += Math.ceil((n.outerWidth(bk) - n.width()) / 2);
            p.top += Math.ceil((n.outerHeight(bk) - n.height()) / 2);
            q.position.left += p.left;
            q.position.top += p.top;
            return q
        };
        var bv, bJ = '<iframe class="qtip-bgiframe" frameborder="0" tabindex="-1" src="javascript:\'\';"  style="display:block; position:absolute; z-index:-1; filter:alpha(opacity=0); -ms-filter:"progid:DXImageTransform.Microsoft.Alpha(Opacity=0)";"></iframe>';

        function aZ(m, n) {
            this._ns = "ie6";
            this.init((this.qtip = m))
        }
        br.extend(aZ.prototype, {
            _scroll: function() {
                var m = this.qtip.elements.overlay;
                m && (m[0].style.top = br(d).scrollTop() + "px")
            },
            init: function(n) {
                var o = n.tooltip,
                    m;
                if (br("select, object").length < 1) {
                    this.bgiframe = n.elements.bgiframe = br(bJ).appendTo(o);
                    n._bind(o, "tooltipmove", this.adjustBGIFrame, this._ns, this)
                }
                this.redrawContainer = br("<div/>", {
                    id: aP + "-rcontainer"
                }).appendTo(g.body);
                if (n.elements.overlay && n.elements.overlay.addClass("qtipmodal-ie6fix")) {
                    n._bind(d, ["scroll", "resize"], this._scroll, this._ns, this);
                    n._bind(o, ["tooltipshow"], this._scroll, this._ns, this)
                }
                this.redraw()
            },
            adjustBGIFrame: function() {
                var n = this.qtip.tooltip,
                    q = {
                        height: n.outerHeight(bk),
                        width: n.outerWidth(bk)
                    },
                    r = this.qtip.plugins.tip,
                    o = this.qtip.elements.tip,
                    p, m;
                m = parseInt(n.css("borderLeftWidth"), 10) || 0;
                m = {
                    left: -m,
                    top: -m
                };
                if (r && o) {
                    p = (r.corner.precedance === "x") ? [be, a2] : [bY, aR];
                    m[p[1]] -= o[p[0]]()
                }
                this.bgiframe.css(m).css(q)
            },
            redraw: function() {
                if (this.qtip.rendered < 1 || this.drawing) {
                    return this
                }
                var m = this.qtip.tooltip,
                    n = this.qtip.options.style,
                    s = this.qtip.options.position.container,
                    p, o, r, q;
                this.qtip.drawing = 1;
                if (n.height) {
                    m.css(bY, n.height)
                }
                if (n.width) {
                    m.css(be, n.width)
                } else {
                    m.css(be, "").appendTo(this.redrawContainer);
                    o = m.width();
                    if (o % 2 < 1) {
                        o += 1
                    }
                    r = m.css("maxWidth") || "";
                    q = m.css("minWidth") || "";
                    p = (r + q).indexOf("%") > -1 ? s.width() / 100 : 0;
                    r = ((r.indexOf("%") > -1 ? p : 1) * parseInt(r, 10)) || o;
                    q = ((q.indexOf("%") > -1 ? p : 1) * parseInt(q, 10)) || 0;
                    o = r + q ? Math.min(Math.max(o, q), r) : o;
                    m.css(be, Math.round(o)).appendTo(s)
                }
                this.drawing = 0;
                return this
            },
            destroy: function() {
                this.bgiframe && this.bgiframe.remove();
                this.qtip._unbind([d, this.qtip.tooltip], this._ns)
            }
        });
        bv = bP.ie6 = function(m) {
            return aN.ie === 6 ? new aZ(m) : bk
        };
        bv.initialize = "render";
        aX.ie6 = {
            "^content|style$": function() {
                this.redraw()
            }
        }
    }))
}(window, document));
$("[title]").qtip();
$(".mainmenu").eq(0).qtip({
    prerender: true,
    content: {
        text: "Ir a la página principal del foro"
    }
});
$(".mainmenu").eq(1).qtip({
    prerender: true,
    content: {
        text: "Ver la lista de usuarios"
    }
});
$(".mainmenu").eq(2).qtip({
    prerender: true,
    content: {
        text: "Grupos de usuarios a los que podrías pertenecer"
    }
});
$(".mainmenu").eq(3).qtip({
    prerender: true,
    content: {
        text: "Perzonaliza toda la informacín de tu perfil"
    }
});
$(".mainmenu").eq(4).qtip({
    prerender: true,
    content: {
        text: "Ir a la bandeja de entrada"
    }
});
$(".mainmenu").eq(5).qtip({
    prerender: true,
    content: {
        text: "Cerrar la sesión"
    }
});
$("img[alt]").qtip({
    content: {
        attr: "alt"
    }
});
$("a[original-title]").qtip({
    content: {
        attr: "original-title"
    }
});

function AAGpreview() {
    if (ajax_preview_form) {
        $("#text_editor_textarea").sceditor("instance").updateOriginal();
        var g = $(ajax_preview_form).serialize(),
            a, l;
        if (3 > ajax_preview_form.message.length) {
            return alert("El mensaje es muy corto")
        }(l = document.getElementById("AAGpreview_overlay")) || (l = document.createElement("div"), l.id = "AAGpreview_overlay", document.body.appendChild(l), $(l).on("click", function() {
            $("#AAGpreview_overlay").add("#AAGpreview_box").hide()
        }));
        (a = document.getElementById("AAGpreview_box")) || (a = document.createElement("div"), a.id = "AAGpreview_box", document.body.appendChild(a));
        a.style.display = l.style.display = "block";
        a.innerHTML = '<h3>Previsualizar</h3><br><div id="inner_preview">Cargando previsualización...</div>';
        $.post(ajax_preview_form.action, g + "&preview=1", function(d) {
            d = d.substring(d.indexOf('class="h3">Previsualización'));
            d = d.substring(0, d.indexOf('class="corners-bottom">')).replace(/.*class="content"\>(.*?)\<\/div\>\<\/div\>\<span/, "$1");
            window.AAGBB && (d = AAGBB.parse(d));
            document.getElementById("inner_preview").innerHTML = d
        })
    }
}
$(function() {
    window.ajax_preview_form = document.post || document.getElementById("quick_reply") || null;
    ajax_preview_form && ajax_preview_form.preview && (ajax_preview_form.preview.type = "button", $(ajax_preview_form.preview).on("click", AAGpreview))
});
console.log("*************************** '¡allcode.js Listo!' **************************");
console.log("***************************************************************************");