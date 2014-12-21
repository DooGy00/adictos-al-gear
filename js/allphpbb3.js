if (wl) {
    $("#AAGquickvm_message").length && ($(window).on("beforeunload", function () {
        if ($("textarea").val().length) {
            return _userdata.username + " todavía no has enviado el mensaje."
        }
    }), $("#AAGquickvm_send").submit(function () {
        $(window).off("beforeunload")
    }))
}

if ($("#field_id1").length) {
    $(".module .h3:first").next().find("img").insertAfter("#banner-image").attr("style", "width:120px;height:120px;border-radius:100%;position:absolute;margin-top:-111px;margin-left:-269px;border:4px double #fff;");
    setTimeout(function() {
        $(".forum-location-not").insertAfter("h1").attr("style", "margin-left:14px;margin-top:-13px!important;margin-bottom:3px;display:inherit;");
        $(".newonlineprofile").insertAfter("h1").attr("style", "margin-left:14px;margin-top:-13px!important;margin-bottom:3px;display:inherit;");
    }, 300);
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
    if ($('img[alt="Este tema está cerrado y no puedes editar mensajes o responder"]').length) {
        $(".tema-info").addClass("lock-theme").attr("style", "background:url(https://cdn2.iconfinder.com/data/icons/ios-7-icons/50/lock-32.png)rgba(237,36,20,0.35)");
        $(".tema-info").find("h1").prepend('<img src="https://cdn2.iconfinder.com/data/icons/pittogrammi/142/91-48.png"style="margin-top: -10px;margin-bottom: -12px;">')
    }
    $(function() {
        //Bloquear topico//
    $('a[href*="/modcp?mode=lock"]').on('click', function (lock) {

        lock.preventDefault();
        var url = $(this).attr('href');
        $.ajax({
            url: url,
            type: 'GET',
            success: function (lokS) {

                    alert('Tema bloqueado.');
                    window.location.reload();

            },
            error: function () {
                alert('Fallo bloquear el tema vía Ajax\nSeras redireccionado para hacerlo manualmente.');
                window.location.href = url;
            }
        });
    });
    //Desbloquear topico//
    $('a[href*="/modcp?mode=unlock"]').on('click', function (unlock) {

        unlock.preventDefault();
        var url = $(this).attr('href');
        $.ajax({
            url: url,
            type: 'GET',
            success: function (unlokS) {

                    alert('Tema desbloqueado.');
                    window.location.reload();

            },
            error: function () {
                alert('Fallo desbloquear el tema vía Ajax\nSeras redireccionado para hacerlo manualmente.');
                window.location.href = url;
            }
        });
    });

    //Lixeira topico//
    $('a[href*="/modcp?mode=trash"]').on('click', function (unlock) {

        unlock.preventDefault();
        var url = $(this).attr('href');
        $.ajax({
            url: url,
            type: 'GET',
            success: function (unlokS) {
          alert('Se envió el tema a la papelera');
                    window.location.reload();

            },
            error: function () {
                alert('Fallo el envio a la papelera vía Ajax\nSeras redireccionado para hacerlo manualmente.');
                window.open(url);
            }
        });
    });
 //Mover topico//
    $('a[href*="/modcp?mode=move"]').on('click', function (move) {

        move.preventDefault();
        var url = $(this).attr('href');
        $('<div id="moveTpcHw"><div class="mtHwCont"><div id="closeHwCont">Mover un tema<img title="Fechar" src="http://i.imgur.com/ELI5O7H.png" class="closeHwm"></div><div id="contHw"><img width="75" src="http://i.imgur.com/b2x7Vag.gif" style="margin-left: 35%;"></div></div><div id="lightBG"></div></div>"').insertBefore('body');
        $('<style>#lightBG {background-color: rgba(0, 0, 0, 0.6);height: 100%;left: 0;position: fixed;top: 0;width: 100%;z-index: 5;}#moveTpcHw {position: fixed;display:none;}.mtHwCont {background: none repeat scroll 0 0 #fff;border: 5px solid #cccccc;border-radius: 2px;height: auto;margin: 10% 40% 0;opacity: 1;padding: 10px;position: relative;width: 470px;z-index: 10;}#closeHwCont {font-family: sans-serif;background-color: #ddd;border-bottom: 1px solid #ccc;height: 23px;margin: -10px -10px 15px;padding: 10px;}#closeHwCont img {float: right;}</style>').insertBefore('body');
        $('.closeHwm').click(function () {
            $('#moveTpcHw').fadeOut('400', function () {
                $('#moveTpcHw').delay('500').remove();
            });
        });
        $('#moveTpcHw').fadeIn();
        $('#contHw').load(url + ' .move-theme', function () {
            $(this).find('label, .main-head').remove();
            $('#contHw form').css('margin-left', '-250px');
            $('#contHw .buttons2').css('border-top', 'medium none');
            $('#contHw input[name="confirm"]').click(function (sendM) {
                sendM.preventDefault();
                var new_forum = $('#contHw select').val();
                $.post(url, {
                    confirm: 1,
                    new_forum: new_forum
                }).success(function () {
                    $('#contHw').html('Moviendo...<br/><img src="http://i.imgur.com/xMmmGWQ.gif"/>');
                    window.location.reload();
                }).fail(function () {
                    alert('Fallo el mover el tema vía Ajax\nSeras redireccionado para hacerlo manualmente.');
                    window.location.href = url;
                });
            });
        });
    });
        $(".postbody .clearfix").each(function() {
            600 <= $(this).height() && $(this).addClass("baivietdai").height(310).after('<p class="thugon"><span><span class="viewfull">Ver completo</span><span class="viewhide" style="display:none">Colapsar</span></span><span><span class="fullOff" style="float:right">Desactivar colapso</span><span class="fullOn" style="float:right;display:none">Activar colapso</span></span></p>')
        });
        "100%" == my_getcookie("thugonbaiviet") && ($(".fullOn, .viewhide,.fullOff, .viewfull").toggle(), $(".baivietdai").height("100%"));
        $(".viewfull, .viewhide, .fullOff, .fullOn").click(function() {
            var c = "100%",
                a = $(this),
                b = a.attr("class");
            if ("viewhide" == b || "fullOn" == b) c = 310;
            "fullOff" == b || "fullOn" == b ? (my_setcookie("thugonbaiviet", c, !0), $(".fullOff, .fullOn").toggle()) : (a.closest(".thugon").prev().height(c), $(window).scrollTop(a.closest(".post").offset().top));
            a.hide().siblings().show()
        });
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
                $(this).parent().parent().after('<table><td><a class="pbutton1" onclick="zeditor.start(\'reply\', this)">' + zeditor.lang.reply_button + '</a></td><td><a class="pbutton2" onclick="zeditor.start(\'pm\', this)">' + zeditor.lang.pm_button + "</a></td></table>");
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
                    zeditor.textarea.focus();
                    zeditor.url = !1;
                    zeditor.mode.innerHTML = zeditor.lang.pm;
                    zeditor.textarea.placeholder = _userdata.username + " redacta tu mensaje privado...";
                    var g = $(".mp-mode").parents(zeditor.post_dom).find('.author').find('a[href^="/u"]').eq(0).text();
                    $(".mp-msg").html("Mensaje para:" + g);
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
        advance: function() {
            if ($(".edit-mode").length || $(".quote-mode").length) {
                location.href = zeditor.url;
                window.onbeforeunload = false
            }
            var textUID = $(".mp-mode").parents(zeditor.post_dom).find('.author').find('a[href^="/u"]').eq(0).attr("href").split("u");
            textUID[1]
            if ($(".mp-mode").length && zeditor.textarea.value === "") {
                location.href = "privmsg?mode=post&u=" + textUID[1];
            } else {
                window.onbeforeunload = false;
                if (confirm(_userdata.username + " de continuar  perderas lo escrito ¿Deseas ir al editor avanzado?")) {
                    location.href = "privmsg?mode=post&u=" + textUID[1];
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
    $(".mp").on("click", function(a) {
        a.preventDefault();
        zeditor.start('pm', this);
        if (!$(".baivietdai").length) {
            $('body,html').stop().animate({
                scrollTop: $('#ze-editor-form').offset().top
            }, 100);
            zeditor.textarea.focus();
            return false
        }
    });
    $(".post").find(".postnumber").find("a").on("click", function() {
        zeditor.start("reply", this);
        var a = $(this).attr("href");
        $("#editor-textarea").val("[post]" + a + "[/post]");
        if (!$(".baivietdai").length) {
            $('body,html').stop().animate({
                scrollTop: $('#ze-editor-form').offset().top
            }, 100);
            zeditor.textarea.focus();
            return false
        }
    });
    if ($(".baivietdai").length) {
        $(".pbutton1").add(".pbutton2").add(".quote a").add(".edit a").add(".mp").add(".postnumber a").on("click", function() {
            $('body,html').stop().animate({
                scrollTop: $('#ze-editor-form').offset().top
            }, 100);
            zeditor.textarea.focus();
            return false
        });
    }
    var level = _userdata.user_level;
    var del = $('a[href*="mode=delete"]').attr("href");
    var trash = $('a[href*="mode=trash"]').attr("href");
    var move = $('a[href*="mode=move"]').attr("href");
    var lockunlock = $('a[href*="mode=lock"]').attr("href");
    var split = $('a[href*="mode=split"]').attr("href");
    var merge = $('a[href*="merge"]').attr("href");
    if (level === 1 | level === 2 | trash) {
        $(".tema-info").after('<div id="moderation_tool" class="act_mod"><p class="mod" title="Moderar tema">Moderar</p></div>');
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
}, 500);
setTimeout(function() {
    if (tm) {
        $("p.right").find("iframe").addClass("facelike").detach().appendTo(".post:eq(0)")
    }
}, 5000);
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