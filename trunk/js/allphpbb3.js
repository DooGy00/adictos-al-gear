if (lin || ps || mp) {
    var ta = document.getElementById("text_editor_textarea");
    if (ta && document.post) {
        var fix_it = function () {
            var sc = $(ta).data("sceditor");
            sc ? sc.bind("keypress", sc.updateOriginal).blur(sc.updateOriginal) : setTimeout(fix_it, 200);
        };
        fix_it();
    }
    $(".sceditor-toolbar", function () {
        $('<a class="sceditor-button post-preview-button" unselectable="on" title="Post Preview"><div unselectable="on" style="background-image:url(http://www.adictosalgear.org/adictosalgear/files/tv.png)!important">post</div></a><a class="sceditor-button no-guest-button" unselectable="on" title="No noguest"><div unselectable="on" style="background-image:url(http://www.adictosalgear.org/adictosalgear/files/glasses.png)!important">noguest</div></a><a class="sceditor-button tag-img-button" unselectable="on" title="Tag IMG"><div unselectable="on" style="background-image:url(http://www.adictosalgear.org/adictosalgear/files/tag.png)!important">IMG</div></a><a class="sceditor-button download-button" unselectable="on" title="Formato descargar"><div unselectable="on" style="background-image:url(http://www.adictosalgear.org/adictosalgear/files/savepdf.png)!important">descargar</div></a><a class="sceditor-button offtopic-button" unselectable="on" title="Offtopic"><div class="offtopic" unselectable="on" style="background-image:url(http://www.adictosalgear.org/adictosalgear/files/offtopic.png)!important" ></div></a><a title="Insert a linked image" class="sceditor-button sceditor-button-imganc"><div class="button-img-link" unselectable="on" style="background:url(http://i39.servimg.com/u/f39/18/21/41/30/imganc10.png)!important;">IMG link</div></a>').insertBefore(".sceditor-button-quote");
        $(".post-preview-button").on("click", function () {
            $("#text_editor_textarea").sceditor("instance").insertText("[post]", "[/post]");
        });
        $(".no-guest-button").on("click", function () {
            $("#text_editor_textarea").sceditor("instance").insertText("[noguest]", "[/noguest]");
        });
        $(".tag-img-button").on("click", function () {
            $("#text_editor_textarea").sceditor("instance").insertText("[img]", "[/img]");
        });
        $(".download-button").on("click", function () {
            $("#text_editor_textarea").sceditor("instance").insertText("[download]", " [/download]");
        });
        $(".offtopic-button").on("click", function () {
            $("#text_editor_textarea").sceditor("instance").insertText("[offtopic]", "[/offtopic]");
        });
        $(".sceditor-button-size").on("click", function () {
            m(9, "before");
            m(8, "before");
            m(7, "before");
            m(6, "before");
            m(26, "after");
            m(27, "after");
            m(28, "after");
            m(29, "after");
            $(".sceditor-fontsize-option.new-size").on("click", function (o) {
                $("#text_editor_textarea").sceditor("instance").insertText("[size=" + $(this).attr("data-size") + "]", "[/size]");
                $(".sceditor-fontsize-picker").remove();
                o.preventDefault();
            });
        });

        function m(p, o) {
            var q = '<a unselectable="on" class="sceditor-fontsize-option new-size" href="#" data-size="' + p + '"><span unselectable="on" style="font-size:' + p + 'px;">' + p + "</span></a>";
            if (o == "after" || o == null) {
                $(".sceditor-fontsize-picker").find("div").append(q);
            }
            if (o == "before") {
                $(".sceditor-fontsize-picker").find("div").prepend(q);
            }
        }
        $(".sceditor-button-imganc").on("click", function () {
            if ($(".sceditor-insertimganc").length) {
                return $(".sceditor-insertimganc").remove();
            }
            $("body").append('<div class="sceditor-dropdown sceditor-insertimganc" style="position:absolute;"><div><label>IMAGE URL:</label> <input id="imganc-img" class="url" placeholder="http://" type="text"></div><div><label>LINK URL:</label> <input id="imganc-url" class="url" placeholder="http://" type="text"></div><div><label>Width (optional):</label> <input id="imganc-width" size="2" type="text"></div><div><label>Height (optional):</label> <input id="imganc-height" size="2" type="text"></div><div><input id="submit-imganc" class="button" value="Insert" type="button"></div></div>');
            $(".sceditor-insertimganc").css({
                left: $(".sceditor-button-imganc").offset().left + "px",
                top: $(".sceditor-button-imganc").offset().top + 25 + "px"
            });
            $("#submit-imganc").on("click", function () {
                var dimension = "",
                    width = $("#imganc-width").val(),
                    height = $("#imganc-height").val(),
                    image = $("#imganc-img").val(),
                    url = $("#imganc-url").val();
                if (width.length > 0 && height.length > 0) {
                    dimension = "(" + width + "px," + height + "px)";
                } else {
                    if (width.length > 0 && height.length < 1) {
                        dimension = "(" + width + "px," + width + "px)";
                    } else {
                        if (width.length < 1 && height.length > 0) {
                            dimension = "(" + height + "px," + height + "px)";
                        }
                    }
                } if (image.length > 0 && url.length > 0) {
                    $("#text_editor_textarea").sceditor("instance").insertText("[url=" + url + "][img" + dimension + "]" + image, "[/img][/url]");
                }
                $(".sceditor-insertimganc").remove();
                return false;
            });
        });
        $(".sceditor-button-source").on("click", function () {
            $(".sceditor-button-imganc").removeClass("disabled");
        });
        $(".sceditor-button").not(".sceditor-button-imganc").on("click", function () {
            $(".sceditor-insertimganc").remove();
        });
        $(".sceditor-container textarea").focus(function () {
            $(".sceditor-insertimganc").remove();
        });
        $(".sceditor-container iframe").contents().mousedown(function () {
            $(".sceditor-insertimganc").remove();
        });
        if (_userdata.user_level >= 1) {
            $('<a class="sceditor-button warning-button" unselectable="on" title="Advertencia"><div unselectable="on" style="background-image:url(http://www.adictosalgear.org/adictosalgear/files/error.png)!important">Advertencia</div></a><a class="sceditor-button alert-button" unselectable="on" title="Alerta"><div unselectable="on" style="background-image:url(http://www.adictosalgear.org/adictosalgear/files/alert.png)!important">Alerta</div></a><a class="sceditor-button ok-button" unselectable="on" title="Éxito"><div unselectable="on" style="background-image:url(http://www.adictosalgear.org/adictosalgear/files/accept.png)!important">Exito</div></a><a class="sceditor-button info-button" unselectable="on" title="Información"><div unselectable="on" style="background-image:url(http://www.adictosalgear.org/adictosalgear/files/infop.png)!important">info</div></a>').insertBefore(".sceditor-button-source");
            $(".warning-button").on("click", function () {
                $("#text_editor_textarea").sceditor("instance").insertText("[warning]", "[/warning]");
            });
            $(".alert-button").on("click", function () {
                $("#text_editor_textarea").sceditor("instance").insertText("[alert]", "[/alert]");
            });
            $(".ok-button").on("click", function () {
                $("#text_editor_textarea").sceditor("instance").insertText("[ok]", "[/ok]");
            });
            $(".info-button").on("click", function () {
                $("#text_editor_textarea").sceditor("instance").insertText("[info]", "[/info]");
            });
        }
    });
}
if (mp) {
    $(".post-icon").find("img").replaceWith("<buttom>Enviar un MP</buttom>");
}
if (tm) {
    $(function () {
        if (/\/u\d+/.test(location.pathname) == true) {
            return;
        }
        var settings = {
            wall: 1,
            stats: 1,
            attachments: 0,
            friends: 1,
            contact: 1,
            rpg: 0,
            close: 1,
            avatar: 1
        };
        var a = document.getElementsByTagName("A");
        for (i = 0; i < a.length; i++) {
            if (/\/u\d+/.test(a[i].href) == true) {
                a[i].className = a[i].className + " profilePopup";
            }
        }
        $(".profilePopup:has(img)").removeClass("profilePopup");
        if (settings.wall == 1) {
            var userWall = '<span class="propop_tab" id="propop_vm">Muro</span>';
        } else {
            var userWall = "";
        } if (settings.stats == 1) {
            var userStats = '<span class="propop_tab" id="propop_stats">Estadisticas</span>';
        } else {
            var userStats = "";
        } if (settings.attachments == 1) {
            var userAttachments = '<span class="propop_tab" id="propop_attach">Archivos</span>';
        } else {
            var userAttachments = "";
        } if (settings.friends == 1) {
            var userFriends = '<span class="propop_tab" id="propop_friends">Amigos</span>';
        } else {
            var userFriends = "";
        } if (settings.contact == 1) {
            var userContact = '<span class="propop_tab" id="propop_contact">Contacto</span>';
        } else {
            var userContact = "";
        } if (settings.rpg == 1) {
            var userRpg = '<span class="propop_tab" id="propop_rpg">Character sheet</span>';
        } else {
            var userRpg = "";
        } if (settings.close == 1) {
            var userClose = '<span class="propop_tab" id="close_popup" style="float:right;margin-top:-4px;">Cerrar</span>';
        } else {
            var userClose = "";
        }
        $(".profilePopup").on("click", function () {
            var UID = $(this).attr("href");
            var UNM = $(this).text();
            var SEL = "#cp-main .panel, .forumline:has(#profile-advanced-details), .clear + #profile-advanced-details";
            var LOAD = '<center><span class="profileLoading" style="font-weight:bold;font-size:18px;">Cargando...</span></center>';
            var TAB = "#propop_profile, #propop_vm, #propop_stats, #propop_friends, #propop_contact, #propop_rpg, #propop_attach, #propop_close";
            $("body").append('<div id="profilefilter" style="position:fixed;top:0px;left:0px;right:0px;bottom:0px;background:rgba(0,0,0, 0.5);cursor:pointer;z-index:10;"></div><div id="profcont-container" style="background:#D1D1D1;top:20%;left:15%;right:15%;padding:4px;position:fixed;font-size:12px;-webkit-border-radius:5px;-moz-border-radius:5px;border-radius:5px;-webkit-box-shadow:0px 0px 2px rgba(0,0,0, 0.5) inset;-moz-box-shadow:0px 0px 2px rgba(0,0,0, 0.5) inset;box-shadow:0px 0px 2px rgba(0,0,0, 0.5) inset;z-index:50;"><div class="profile_popup_nav">' + userWall + '<span class="propop_tab" id="propop_profile">Perfil</span>' + userStats + userAttachments + userFriends + userContact + userRpg + userClose + '</div><a href="' + UID + '"><div id="userAVA"></div></a><div id="userprofile" style="height:400px;overflow-y:auto;">' + LOAD + '</div><span id="profileLinks"><a href="' + UID + '">Ver perfil</a><span id="interactionLinks"> | <a href="/privmsg?mode=post&u=' + UID.replace(/.*?\/u/, "") + '">Enviar MP</a> | <a href="/privmsg?mode=post_profile&u=' + UID.replace(/.*?\/u/, "") + '">Escribir en el muro</a><span style="float:right;"><a href="/profile?friend=' + UNM.replace(/\s+/, "+") + '&mode=editprofile&page_profil=friendsfoes">Añadir a amigos</a> | <a href="/profile?foe=' + UNM.replace(/\s+/, "+") + '&mode=editprofile&page_profil=friendsfoes">Ignorar</a></span></span></div>');
            $("#userprofile").load(UID + SEL);
            if (settings.avatar == 1) {
                $("#userAVA").load(UID + " #profile-advanced-right .module:first div img:first, .forumline td.row1.gensmall:first > img:first, .frm-set.profile-view.left dd img:first, dl.left-box.details:first dd img:first, .row1 b .gen:first img:first, .real_avatar img:first");
            }
            $("#propop_profile").addClass("activeTab");
            $("#propop_profile").on("click", function () {
                if ($(this).hasClass("activeTab")) {
                    return;
                }
                $(TAB).removeClass("activeTab");
                $(this).addClass("activeTab");
                $("#userprofile").html(LOAD).load(UID + SEL);
            });
            $("#propop_vm").on("click", function () {
                if ($(this).hasClass("activeTab")) {
                    return;
                }
                $(TAB).removeClass("activeTab");
                $(this).addClass("activeTab");
                $("#userprofile").html(LOAD).load(UID + "wall" + SEL);
            });
            $("#propop_stats").on("click", function () {
                if ($(this).hasClass("activeTab")) {
                    return;
                }
                $(TAB).removeClass("activeTab");
                $(this).addClass("activeTab");
                $("#userprofile").html(LOAD).load(UID + "stats" + SEL);
            });
            $("#propop_friends").on("click", function () {
                if ($(this).hasClass("activeTab")) {
                    return;
                }
                $(TAB).removeClass("activeTab");
                $(this).addClass("activeTab");
                $("#userprofile").html(LOAD).load(UID + "friends" + SEL);
            });
            $("#propop_contact").on("click", function () {
                if ($(this).hasClass("activeTab")) {
                    return;
                }
                $(TAB).removeClass("activeTab");
                $(this).addClass("activeTab");
                $("#userprofile").html(LOAD).load(UID + "contact" + SEL);
            });
            $("#propop_rpg").on("click", function () {
                if ($(this).hasClass("activeTab")) {
                    return;
                }
                $(TAB).removeClass("activeTab");
                $(this).addClass("activeTab");
                $("#userprofile").html(LOAD).load(UID + "rpg" + SEL);
            });
            $("#propop_attach").on("click", function () {
                if ($(this).hasClass("activeTab")) {
                    return;
                }
                $(TAB).removeClass("activeTab");
                $(this).addClass("activeTab");
                $("#userprofile").html(LOAD).load(UID + "attachments" + SEL);
            });
            if (!document.getElementById("logout")) {
                $("#interactionLinks").remove();
            }
            $("#profilefilter, #close_popup").on("click", function () {
                $("#profilefilter, #profcont-container").remove();
            });
            return false;
        });
    });
    (function (a) {
        var h = [];
        jQuery.fn.zzConfirm = function (b) {
            var d = jQuery.extend({
                    content: "¿Estás seguro?",
                    lang: ["Ok", "Cancelar"],
                    width: "auto",
                    dir: "left",
                    toggle: !1,
                    clickOut: !1,
                    ok: function (a, d) {},
                    cancel: function (a, d) {}
                }, b),
                e, c, r = function (a, c) {
                    var e = a.outerWidth(),
                        q = a.outerHeight(),
                        m = a.offset().top,
                        b = a.offset().left,
                        f = c.outerWidth(),
                        g = c.outerHeight(),
                        n = m + (q - g) / 2,
                        p = b + (e - f) / 2,
                        h = d.dir;
                    switch (h) {
                    case "top":
                        n = m - g - 10;
                        break;
                    case "bottom":
                        n = m + q + 10;
                        break;
                    case "left":
                        p = b - f - 10;
                        break;
                    case "right":
                        p = b + e + 10;
                    }
                    c.attr("class", h).show().animate({
                        left: p,
                        top: n,
                        opacity: 1
                    });
                };
            b = a(this);
            var f = b.selector,
                g;
            h.push(f);
            return b.on("click", function (b) {
                b.preventDefault();
                e = a(this);
                var k = function (c) {
                    var b = a("#zzConfirm_wrap");
                    c && (b = a('#zzConfirm_wrap[data-selector="' + c + '"]'));
                    e.removeClass("zzConfirm_active");
                    b.hide().css({
                        left: g,
                        top: "-100px",
                        opacity: 0
                    });
                };
                a(".zzConfirm_active").not(e).removeClass("zzConfirm_active");
                if ((b = e.hasClass("zzConfirm_active")) && d.toggle) {
                    k();
                } else {
                    if (!b) {
                        e.addClass("zzConfirm_active");
                        a("#zzConfirm_wrap").length ? c = a("#zzConfirm_wrap") : (a("body").append('<div id="zzConfirm_wrap" style="width:' + d.width + ';left:50%;top:-100px;display:none"><div id="zzConfirm_content"></div><div id="zzConfirm_btn"><div id="zzConfirm_yes"></div><div id="zzConfirm_cancel"></div></div></div>'), c = a("#zzConfirm_wrap"), g = (a(window).width() - c.outerWidth()) / 2, c.css("left", g));
                        a("#zzConfirm_content").html(d.content);
                        a("div", "#zzConfirm_btn").off("click").on("click", function () {
                            k();
                        });
                        a("#zzConfirm_yes").html(d.lang[0]).on("click", function () {
                            d.ok(e, c);
                        });
                        a("#zzConfirm_cancel").html(d.lang[1]).on("click", function () {
                            d.cancel(e, c);
                        });
                        c.attr("data-selector", f).css("width", d.width);
                        r(e, c);
                        var l = !0;
                        a(window).resize(function () {
                            l && (setTimeout(function () {
                                r(e.filter(".zzConfirm_active"), c);
                                l = !0;
                            }, 100), l = !1);
                        });
                        d.clickOut && a(document).on("click", function (b) {
                            a(b.target).closest(c).length || a(b.target).closest(h.join()).length || k(f);
                        });
                    }
                }
            });
        };
    })(jQuery);
    $("a[href*='mode=delete']").zzConfirm({
        content: "¿Deseas eliminar este post",
        ok: function (ele) {
            var b = ele.closest(".post");
            b.css("opacity", 0.3);
            $.post(ele[0].href, {
                confirm: 1
            }, function (a) {
                b.slideUp(function () {
                    b.remove();
                    $(".post").length || location.replace($(".nav[href^='/f']:last")[0].href);
                });
            });
        }
    });
    var zeditor = {
        version: "phpbb3",
        lang: {
            reply: 'Modo: <font color="purple">Respuesta</font>',
            pm: 'Modo: <font color="darkblue">Mensaje Privado</font>',
            edit: 'Modo: <font color="red" class="edit-mode">Edición</font>',
            quote: 'Modo: <font color="green">Citar</font>',
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
            download_button: '<img src="http://www.adictosalgear.org/adictosalgear/files/savepdf.png"/>',
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
        ready: function () {
            if (zeditor.version == "phpbb3") {
                zeditor.preview_dom = ".content";
                zeditor.button_dom = ".profile-icons";
            }
            if (!window.jQuery) {
                alert("JQuery is required to run this. Visit http://www.jquery.com/ for more details");
            } else {
                zeditor.button(zeditor.button_dom);
                for (var a = $(zeditor.message_dom), i = 0, l = a.length; i < l; i++) {
                    a[i].innerHTML = zeditor.replace(a[i].innerHTML);
                }
                $(document.body).append('<div id="ze-editor" style="display:none"><form id="ze-editor-form" name="ze-editor" method="post" action="/post"><div id="editor-top"><div id="editor-tool"><span onclick="zeditor.add(\'[b]\',\'[/b]\')" class="editor-button-outer" title="Negritas">' + zeditor.lang.bold_button + '</span><span onclick="zeditor.add(\'[i]\',\'[/i]\')"  class="editor-button-outer" title="Italica">' + zeditor.lang.italic_button + '</span><span onclick="zeditor.add(\'[u]\',\'[/u]\')"  class="editor-button-outer" title="Subrayado">' + zeditor.lang.underline_button + '</span><span onclick="zeditor.add(\'[strike]\',\'[/strike]\')"  class="editor-button-outer" title="Cancelado">' + zeditor.lang.strike_button + "</span><span onclick=\"zeditor.add('[strike]','[/strike]')\"  class=\"editor-button-outer\">" + zeditor.lang.strike_button + "</span><span onclick=\"zeditor.add('[justify]','[/justify]')\" class=\"editor-button-outer\">" + zeditor.lang.justify_button + "</span><span onclick=\"zeditor.add('[center]','[/center]')\" class=\"editor-button-outer\">" + zeditor.lang.center_button + "</span><span onclick=\"zeditor.add('[left]','[/left]')\" class=\"editor-button-outer\">" + zeditor.lang.left_button + "</span><span onclick=\"zeditor.add('[right]','[/right]')\" class=\"editor-button-outer\">" + zeditor.lang.right_button + '</span><span class="editor-button-outer" title="Color de la fuente" onclick="zeditor.popup(\'ze-color\', this);zeditor.createColor()">' + zeditor.lang.color_button + '</span><span title="Tags para colocar código, contine además el hide" onclick="zeditor.add(\'[hide][code]\',\'[/code][/hide]\')"  class="editor-button-outer">' + zeditor.lang.code_button + '</span><span title="Ocultar un code" onclick="zeditor.add(\'[hidecode]\',\' [/hidecode]\')" class="editor-button-outer">' + zeditor.lang.hidecode_button + '</span><span class="editor-button-outer" onclick="zeditor.popup(\'ze-smiley\', this);zeditor.createSmilies()" title="Smilies">' + zeditor.lang.smiley_button + '</span><span class="editor-button-outer" onclick="zeditor.popup(\'ze-upload\', this);zeditor.imgur.prepare()" title="Subir una imagen">' + zeditor.lang.upload_button + '</span><span class="editor-button-outer" onclick="zeditor.tag(this)" title="Etiqueta al usuario de este post">' + zeditor.lang.tag_button + '</span><span title="Ocultar un link para compartir" onclick="zeditor.add(\'[download]\',\' [/download]\')" class="editor-button-outer">' + zeditor.lang.download_button + '</span><span title="ocultar texto de los visitantes" onclick="zeditor.add(\'[noguest]\',\'[/noguest]\')" class="editor-button-outer">' + zeditor.lang.noguest_button + '</span><span title="Colocar tags IMG a una imagen" onclick="zeditor.add(\'[img]\',\'[/img]\')" class="editor-button-outer">' + zeditor.lang.tagimg_button + '</span><span title="Contenido offtopic" onclick="zeditor.add(\'[offtopic]\',\'[/offtopic]\')" class="editor-button-outer">' + zeditor.lang.offtopic_button + '</span><div class="modbar" style="display:none"><span title="Moderación Warning" onclick="zeditor.add(\'[warning]\',\'[/warning]\')" class="editor-button-outer">' + zeditor.lang.warning_button + '</span><span title="Moderación Alerta" onclick="zeditor.add(\'[alert]\',\'[/alert]\')" class="editor-button-outer">' + zeditor.lang.alert_button + '</span><span title="Moderación todo esta bien" onclick="zeditor.add(\'[ok]\',\'[/ok]\')" class="editor-button-outer">' + zeditor.lang.ok_button + '</span><span title="Moderación Información" onclick="zeditor.add(\'[info]\',\'[/info]\')" class="editor-button-outer">' + zeditor.lang.info_button + '</span></div></div></div><div id="ze-popups"><div id="ze-subject" class="ze-popups" style="display:none"><input id="editor-subject" type="text"></input></div><div id="ze-mode" class="ze-popups" style="display:none"><p><center>Selecciona un tema</center></p><p><input type="radio" name="ze-mode" checked="checked"> Light grey</input><p></div><div id="ze-color" class="ze-popups" style="display:none"></div><div id="ze-smiley" class="ze-popups" style="display:none"></div><div id="ze-image" class="ze-popups" style="display:none"><input type="text" style="height:20px;border:1px solid #BDBDBD" /><div><br><span class="editor-button-confirm" onclick="zeditor.popup(\'ze-image\', this);zeditor.add(\'[img]\'+this.parentNode.previousSibling.value, \'[/img]\');this.parentNode.previousSibling.value=\'\'">OK</span></div></div><div id="ze-upload" class="ze-popups" style="display:none"><div id="ze-imgur"><span id="ze-imgur-mode" class="editor-button-confirm" onclick="zeditor.imgur.mode()">Mode</span><span onclick="zeditor.imgur.files()"><input id="ze-imgur-input" type="input" placeholder="' + zeditor.lang.imgur_placeholder1 + '" value="" disabled></span><span id="ze-imgur-submit" class="editor-button-confirm" onclick="zeditor.imgur.submit(this)">Submit</span><input type="file" id="ze-imgur-placeholder" multiple><div id="ze-imgur-status"></div><div id="ze-imgur-images"></div></div></div></div><div id="outer-preview"><div id="ze-preview" ondblclick="zeditor.closePreview(this)"></div><div id="editor-loading" style="display: none"><img src="http://i11.servimg.com/u/f11/16/80/27/29/ajax-l10.gif" /><br>' + zeditor.lang.loading + '</div><textarea name="message" id="editor-textarea" placeholder="Escribe tu mensaje"></textarea></div><div id="editor-data"><input type="hidden" value="reply" name="mode"><input type="hidden" value="1" name="notify"></div><div id="editor-post-tool"><div id="editor-post-button"><span  id="editor-send-button" onclick="zeditor.post(this)">' + zeditor.lang.send_button + '</span><span onclick="zeditor.preview(this)" id="editor-preview-button">' + zeditor.lang.preview_button + '</span><span class="advance-button" onclick="zeditor.advance()">' + zeditor.lang.advance_button + '</span></div><div id="editor-mode"><span onclick="zeditor.popup(\'ze-subject\', this)">' + zeditor.lang.subject_button + '</span><span class="mode-button" onclick="zeditor.popup(\'ze-mode\', this)"></span></div></div></form></div>');
            }
            zeditor.textarea = document.getElementById("editor-textarea");
            zeditor.subject = document.getElementById("editor-subject");
            zeditor.mode = document.getElementById("editor-mode").getElementsByTagName("span")[1];
            zeditor.editor = document.getElementById("ze-editor");
            if (_userdata.user_level >= 1) {
                $(".modbar").removeAttr("style");
            }
        },
        quote: function (a) {
            zeditor.loading("on");
            $.get(a.href, function (data) {
                zeditor.textarea.value = $(data).find("#text_editor_textarea").val().replace(/]/, '][quotelink="' + location.pathname + "#" + a.href.match(/[0-9]+/) + '"]');
                zeditor.textarea.focus();
                zeditor.loading("off");
            });
        },
        edit: function (a) {
            zeditor.loading("on");
            zeditor.url = a.href;
            if (zeditor.textarea.value != "") {
                if (confirm(_userdata.username + " de continuar  perderas lo escrito")) {
                    $.get(a.href, function (data) {
                        zeditor.textarea.value = $(data).find("#text_editor_textarea").val();
                        zeditor.subject.value = $(data).find('input[name="subject"]').val();
                        zeditor.textarea.focus();
                        zeditor.loading("off");
                    });
                } else {
                    zeditor.textarea.focus();
                    zeditor.loading("off");
                    return;
                }
            } else {
                $.get(a.href, function (data) {
                    zeditor.textarea.value = $(data).find("#text_editor_textarea").val();
                    zeditor.subject.value = $(data).find('input[name="subject"]').val();
                    zeditor.textarea.focus();
                    zeditor.loading("off");
                });
            }
        },
        button: function (where) {
            $(where).each(function () {
                $(this).find('a[href*="quote"]').attr("onclick", "zeditor.start('quote', this); return false");
                $(this).parent().parent().after('<a class="pbutton1" onclick="zeditor.start(\'reply\', this)">' + zeditor.lang.reply_button + '</a><a class="pbutton2" onclick="zeditor.start(\'pm\', this)">' + zeditor.lang.pm_button + "</a>");
                $(this).find('a[href*="editpost"]').attr("onclick", "zeditor.start('edit', this); return false");
            });
        },
        start: function (a, dom) {
            $(zeditor.editor).appendTo($(dom).parents(zeditor.post_dom).find(zeditor.message_dom));
            $(zeditor.editor).slideDown();
            switch (a) {
            case "reply":
                zeditor.url = $('a[href^="/post?t="]').first().attr("href");
                zeditor.mode.innerHTML = zeditor.lang.reply;
                zeditor.textarea.placeholder = _userdata.username + " escribe un comentario...";
                if (zeditor.textarea.value != "") {
                    alert(_userdata.username + " si deseas publicar tu mensaje presiona ENVIAR");
                    $("#editor-send-button ").css("background", "gold");
                }
                break;
            case "quote":
                zeditor.url = dom.href;
                zeditor.quote(dom);
                zeditor.mode.innerHTML = zeditor.lang.quote;
                break;
            case "edit":
                zeditor.edit(dom);
                zeditor.mode.innerHTML = zeditor.lang.edit;
                break;
            case "pm":
                zeditor.url = !1;
                zeditor.mode.innerHTML = zeditor.lang.pm;
                zeditor.textarea.placeholder = _userdata.username + " redacta tu mensaje privado...";
                break;
            }
        },
        add: function (x, y) {
            zeditor.textarea.focus();
            if (typeof (zeditor.textarea) != "undefined") {
                var longueur = parseInt(zeditor.textarea.value.length);
                var selStart = zeditor.textarea.selectionStart;
                var selEnd = zeditor.textarea.selectionEnd;
                zeditor.textarea.value = zeditor.textarea.value.substring(0, selStart) + x + zeditor.textarea.value.substring(selStart, selEnd) + y + zeditor.textarea.value.substring(selEnd, longueur);
            } else {
                zeditor.textarea.value += x + y;
            }
            zeditor.textarea.focus();
        },
        preview: function (a) {
            preview = document.getElementById("ze-preview");
            if (preview.style.display == "block") {
                preview.style.display = "none";
                document.getElementById("editor-top").setAttribute("style", "height:38px; transform: scaleY(1);-webkit-transform: scaleY(1)");
                a.innerHTML = zeditor.lang.preview_button;
            } else {
                a.innerHTML = zeditor.lang.close_button;
                document.getElementById("editor-top").setAttribute("style", "height:3px; transform: scaleY(0);-webkit-transform: scaleY(0)");
                $.post(zeditor.url, {
                    message: zeditor.textarea.value,
                    preview: "Preview",
                }, function (data) {
                    preview.style.display = "block";
                    preview.innerHTML = zeditor.replace($(data).find(zeditor.preview_dom).html());
                });
            }
        },
        closePreview: function (a) {
            $(a).hide();
            zeditor.textarea.focus();
            document.getElementById("editor-preview-button").innerHTML = zeditor.lang.preview_button;
            document.getElementById("editor-top").setAttribute("style", "height:38px; transform: scaleY(1);-webkit-transform:scaleY(1)");
        },
        post: function (a) {
            if (zeditor.mode.innerHTML == zeditor.lang.quote) {
                zeditor.url = $('a[href^="/post?t="]').first().attr("href");
            }
            if (zeditor.url) {
                if (zeditor.textarea.value == 0) {
                    alert(zeditor.lang.no_message);
                } else {
                    $.post(zeditor.url, {
                        post: "Send",
                        message: zeditor.textarea.value,
                        subject: zeditor.subject.value
                    }, function (data) {
                        var en = "Tu mensaje ha sido publicado con éxito",
                            vi = "Tu mensaje ha sido publicado con éxito";
                        b = (data.indexOf(en) < 0) ? vi : en;
                        index = data.indexOf(b);
                        if (data.indexOf("Flood control") > 0) {
                            alert(zeditor.lang.flood_message);
                        } else {
                            if (data.indexOf("A new message") > 0) {
                                $.post("/post", $(data).find("form[name='post']").serialize() + "&post=1", function (c) {
                                    (index < 0) ? alert(zeditor.lang.error_message) : zeditor.newPost($(c).find('p:contains("' + b + '") a:first').attr("href"));
                                    zeditor.closePreview("#ze-preview");
                                });
                            } else {
                                (index < 0) ? alert(zeditor.lang.error_message) : zeditor.newPost($(data).find('p:contains("' + b + '") a:first').attr("href"));
                                zeditor.closePreview("#ze-preview");
                            }
                        }
                    });
                }
            } else {
                zeditor.pm(a);
            }
        },
        newPost: function (a) {
            var b = a.split("#")[1];
            zeditor.editor.style.display = "none";
            if (zeditor.mode.innerHTML == zeditor.lang.reply || zeditor.mode.innerHTML == zeditor.lang.quote) {
                $.get(a, function (data) {
                    $('<div class="zeditor-new">' + zeditor.replace($(data).find("#p" + b).wrapAll("<div></div>").parent().html()) + "</div>").insertAfter(zeditor.post_dom + ":last");
                    $("html,body").animate({
                        scrollTop: $(".zeditor-new:last").offset().top
                    }, 600);
                    zeditor.button(".zeditor-new:last " + zeditor.button_dom);
                });
            }
            if (zeditor.mode.innerHTML == zeditor.lang.edit) {
                dom = $(zeditor.editor).parents(zeditor.post_dom).find(zeditor.message_dom);
                $.get(a, function (data) {
                    $(dom).html(zeditor.replace($(data).find("#p" + b + " " + zeditor.message_dom).html()));
                    $(dom).hide().fadeIn("slow");
                });
            }
            zeditor.textarea.value = "", $(function () {
                if (_userdata.user_posts > 5) {
                    if ($(".post").first().find(".descargar").length > 0) {
                        $(".descargar").find("a,span").removeAttr("style");
                    }
                }
            });
        },
        popup: function (a, b) {
            zeditor.textarea.focus();
            x = document.getElementById(a);
            y = document.getElementById("ze-editor").offsetWidth;
            if (x.style.display == "none") {
                position = $(b).position().left;
                x.setAttribute("style", "display: block");
                if (position + x.offsetWidth + 20 > y) {
                    position = y - x.offsetWidth - 20;
                }
                x.style.left = position - 30 + "px";
            } else {
                x.style.display = "none";
            }
            $("#" + a).siblings().hide();
        },
        createSmilies: function () {
            smiley = document.getElementById("ze-smiley");
            if (smiley.innerHTML == "") {
                $(smiley).load("/smilies.forum?mode=smilies_frame", function () {
                    this.innerHTML = this.innerHTML.replace(/alt=\"(.*?)\"/g, "onclick=\"zeditor.smiley('$1')\"");
                });
            }
        },
        createColor: function () {
            if (!document.getElementById("ze-color-inner")) {
                var c = '<table cellspacing="0" id="ze-color-inner">';
                var colors = new Array("00", "33", "66", "99", "CC", "FF");
                for (i = 5; i >= 0; i--) {
                    c = c + "<tr>";
                    for (j = 5; j >= 0; j--) {
                        for (k = 5; k >= 0; k--) {
                            var col = colors[j] + colors[i] + colors[k];
                            c = c + '<td style="background: #' + col + '" title="#' + col + '"><div style="background:#' + col + '" onclick="zeditor.add(\'[color=#' + col + "]', '[/color]');zeditor.hideColor()\"></div></td>";
                        }
                    }
                    c = c + "</tr>";
                }
                document.getElementById("ze-color").innerHTML = c + '</table><div id="ze-color-info"><div class="ze-color-input"><div>#</div><input id="ze-color-hex" maxlength="6" onkeypress="zeditor.convertHex(this)" placeholder="000000"></div><div class="ze-color-input"><div>R</div><input id="ze-color-r" maxlength="3" onkeypress="zeditor.convertRGB()" placeholder="000"></div><div class="ze-color-input"><div>G</div><input id="ze-color-g" maxlength="3" onkeypress="zeditor.convertRGB()" placeholder="000"></div><div class="ze-color-input"><div>B</div><input id="ze-color-b" maxlength="3" onkeypress="zeditor.convertRGB()" placeholder="000"></div><div class="editor-button-confirm" onclick="zeditor.submitColor()">OK</div></div>';
            }
        },
        hideColor: function () {
            document.getElementById("ze-color").setAttribute("style", "display:none");
        },
        submitColor: function () {
            if (document.getElementById("ze-color-hex").value !== "") {
                zeditor.add("[color=#" + document.getElementById("ze-color-hex").value + "]", "[/color]");
            } else {
                zeditor.add("[color=#000000]", "[/color]");
            }
            zeditor.hideColor();
        },
        convertHex: function (a) {
            var a = a.value,
                result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(a);
            result ? (document.getElementById("ze-color-r").value = parseInt(result[1], 16), document.getElementById("ze-color-g").value = parseInt(result[2], 16), document.getElementById("ze-color-b").value = parseInt(result[3], 16)) : null;
        },
        convertRGB: function () {
            var r = document.getElementById("ze-color-r").value,
                g = document.getElementById("ze-color-g").value,
                b = document.getElementById("ze-color-b").value,
                rgb = b | (g << 8) | (r << 16);
            document.getElementById("ze-color-hex").value = (16777216 + rgb).toString(16).slice(1);
        },
        smiley: function (a) {
            zeditor.textarea.value += a;
            zeditor.textarea.focus();
            document.getElementById("ze-smiley").style.display = "none";
        },
        tag: function (a) {
            var e = $(a).parents(zeditor.post_dom).find('a[href^="/u"]:has(span)').eq(0).text(),
                b = $(a).parents(zeditor.post_dom).find(".nombre-tema").find("a").attr("href");
            zeditor.textarea.value += "[tag]" + e + "[/tag] ";
            tagname = e;
            if (e.length > 0) {
                if (confirm(zeditor.lang.notify_message + " " + e + "?")) {
                    zeditor.post_pm(e, zeditor.lang.tag_message_title + ' "' + document.title + '"', tagname + zeditor.lang.tag_message_content + ' <a href="' + b + '"> ' + document.title + " en el post: " + b.split("#")[1] + "</a>");
                }
            } else {
                alert(zeditor.lang.tag_message_error);
            }
        },
        pm: function (a) {
            var e = $(a).parents(zeditor.post_dom).find('a[href^="/u"]:not(:empty)').eq(0).text();
            if (e.length > 0) {
                zeditor.post_pm(e, zeditor.lang.pm_message_title + ' "' + document.title + '"', zeditor.textarea.value);
            } else {
                alert(zeditor.lang.pm_message_error);
            }
            zeditor.textarea.value = "";
        },
        post_pm: function (name, subject, message) {
            $.post("/privmsg?mode=post&post=1", {
                "username[]": name,
                subject: subject,
                message: message,
                post: "Send",
                folder: "inbox"
            }, function () {
                $("textarea").attr("placeholder", _userdata.username + " tu mensaje privado se envió con éxito");
            });
        },
        replace: function (a) {
            return a.replace(/\[tag\](.*?)\[\/tag\]/g, function (a, b) {
                return '<a href="/profile?mode=viewprofile&u=' + b.replace(/ /g, "+") + '" onmouseover="zeditor.avatar(this, this.href)" class="ze-avatar">@' + b + "</a>";
            }).replace(/:<\/cite>\[quotelink="(\S+)"\]/gi, function (a, b) {
                return " " + zeditor.lang.quote_message + ' <a href="' + b + '"> ' + b.split("#")[1] + "</a></cite>";
            });
        },
        loading: function (a) {
            b = document.getElementById("editor-loading");
            a == "on" ? (b.style.display = "") : (b.style.display = "none");
        },
advance: function () {
    if ($(".edit-mode").length) {
        location.href = zeditor.url;
        window.onbeforeunload = false;
    } 
        window.onbeforeunload = false;
        if (zeditor.textarea.value = "") {
            location.href = zeditor.url;
        } else {
            if (confirm(_userdata.username + " de continuar  perderas lo escrito ¿Deseas ir al editor avanzado?")) {
                location.href = zeditor.url;
            }
        }
    
},
        avatar: function (a, b) {
            if (a.getElementsByTagName("span")[0] == null) {
                $.get(b, function (data) {
                    a.innerHTML += "<span>" + $(data).find("#profile-advanced-right img:first")[0].outerHTML + "</span>";
                });
            }
        },
        imgur: {
            input: 0,
            holder: [],
            prepare: function () {
                zeditor.imgur.input = document.getElementById("ze-imgur-input");
                document.getElementById("ze-imgur-placeholder").addEventListener("change", function (e) {
                    var a = e.target.files;
                    for (i = 0; i < a.length; i++) {
                        if (a[i].type.match(/image.*/)) {
                            zeditor.imgur.holder.push(a[i]);
                        }
                        zeditor.imgur.input.value = this.value;
                    }
                }, false);
            },
            mode: function () {
                if (zeditor.imgur.input.placeholder == zeditor.lang.imgur_placeholder1) {
                    zeditor.imgur.input.placeholder = zeditor.lang.imgur_placeholder2;
                    zeditor.imgur.input.disabled = false;
                    zeditor.imgur.input.parentNode.removeAttribute("onclick");
                    zeditor.imgur.input.value = "";
                } else {
                    zeditor.imgur.input.placeholder = zeditor.lang.imgur_placeholder1;
                    zeditor.imgur.input.disabled = true;
                    zeditor.imgur.input.parentNode.setAttribute("onclick", "zeditor.imgur.files()");
                    zeditor.imgur.input.value = "";
                }
            },
            files: function () {
                document.getElementById("ze-imgur-placeholder").click();
            },
            upload: function (file) {
                document.body.className = "uploading";
                var fd = new FormData();
                fd.append("image", file);
                fd.append("key", zeditor.imgur_key);
                var xhr = new XMLHttpRequest();
                var output = document.getElementById("ze-imgur-images");
                xhr.open("POST", "http://api.imgur.com/2/upload.json");
                xhr.onload = function () {
                    if (this.status == 400) {
                        document.getElementById("ze-imgur-status").innerHTML = JSON.parse(xhr.responseText).error.message;
                    } else {
                        var links = JSON.parse(xhr.responseText).upload.links;
                        var dimage = links.small_square;
                        var dlink = links.imgur_page;
                        var a = document.createElement("a");
                        a.href = dlink;
                        a.addEventListener("click", function (event) {
                            event.preventDefault();
                            zeditor.textarea.value += "[img]" + this.firstChild.src.replace("s.", ".") + "[/img]";
                        });
                        var img = document.createElement("img");
                        img.src = dimage;
                        a.appendChild(img);
                        output.appendChild(a);
                        document.body.className = "uploaded";
                    }
                };
                xhr.send(fd);
            },
            submit: function () {
                if (zeditor.imgur.input.placeholder == zeditor.lang.imgur_placeholder1) {
                    for (var i = 0; i < zeditor.imgur.holder.length; i++) {
                        zeditor.imgur.upload(zeditor.imgur.holder[i]);
                    }
                } else {
                    zeditor.imgur.upload(document.getElementById("ze-imgur-input").value);
                }
            },
        },
    };
    var zeditoronbeforeunload = $("#editor-post-button").find("span");
    window.onbeforeunload = function (e) {
        if (zeditor.textarea.value != "") {
            return _userdata.username + " tienes texto en el editor que podrias perder";
        }
    };
    zeditoronbeforeunload.submit = function (e) {
        window.onbeforeunload = false;
    };
    $(function () {
        zeditor.ready();
    });
    $(".mp").attr("onclick", "zeditor.start('pm', this)").parent().removeAttr("href").css("cursor", "pointer");
    $(".post").find(".postnumber").find("a").on("click", function () {
        zeditor.start("reply", this);
        var aaa_text = $(this).attr("href");
        $("#editor-textarea").val("[post]" + aaa_text + "[/post]");
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
        $(".mod").on("click", function () {
            $(".action_mod").slideToggle(300);
        });
    }
    var e = $(".pagination"),
        c = $("#plus_menu"),
        h = $(".pathname-box"),
        f = $(".topic-actions");
    var k = document.getElementsByTagName("a");
    watchBTN = '<img style="display: inline-table;margin-bottom: -6px;" src="https://cdn2.iconfinder.com/data/icons/snipicons/5000/eye-open-20.png"><p style="display: inline-table;"> Seguir el tema</p>', unwatchBTN = '<img style="display: inline-table;margin-bottom: -6px;" src="https://cdn2.iconfinder.com/data/icons/snipicons/500/eye-close-20.png"><p style="display: inline-table;"> Dejar de seguir el tema </p>', b = $('a[href*="?watch=topic"]'), g = $('a[href*="?unwatch=topic"]');
    if (k) {
        for (var j = 0; j < k.length; j++) {
            if ((/\?unwatch=topic/gi).test(k[j].href) === true) {
                k[j].innerHTML = unwatchBTN;
                k[j].title = "Dejar de vigilar este tema";
                k[j].className = "tnvig-tem";
            }
            if ((/\?watch=topic/gi).test(k[j].href) === true) {
                k[j].innerHTML = watchBTN;
                k[j].title = "Vigilar este tema";
                k[j].className = "tvig-tem";
            }
        }
    }
    b.on("click", function (p) {
        p.preventDefault();
        var m = $(this).attr("href");
        var o = $(this);
        $.post(m, {
            confirm: 1
        }).success(function () {
            o.html(unwatchBTN);
            o.removeAttr("href");
            o.attr("original-title", "Recargar la página para dar click y dejar de vigilar este tema");
            alert("Estas siguiendo el tema");
        });
    });
    g.on("click", function (p) {
        p.preventDefault();
        var o = $(this).attr("href");
        var m = $(this);
        $.post(o, {
            confirm: 1
        }).success(function () {
            m.html(watchBTN);
            m.removeAttr("href");
            m.attr("original-title", "Recargar la página para dar click y vigilar este tema");
            alert("Ya no sigues el tema");
        });
    });
}
if (sub) {
    var h = document.getElementsByTagName("a");
    watchBTN = '<img style="display: inline-table;margin-bottom:-6px;" src="https://cdn2.iconfinder.com/data/icons/snipicons/5000/eye-open-20.png"><p style="display: inline-table;"> Vigilar</p>', unwatchBTN = '<img style="display: inline-table;margin-bottom:-6px;" src="https://cdn2.iconfinder.com/data/icons/snipicons/500/eye-close-20.png"><p style="display: inline-table;"> Dejar de Vigilar este foro </p>';
    if (h) {
        for (var f = 0; f < h.length; f++) {
            if ((/\?unwatch=forum/gi).test(h[f].href) === true) {
                h[f].innerHTML = unwatchBTN;
                h[f].title = "Dejar de vigilar este subforo";
                h[f].className = "tnvig-tem";
            }
            if ((/\?watch=forum/gi).test(h[f].href) === true) {
                h[f].innerHTML = watchBTN;
                h[f].title = "vigilar este subforo";
                h[f].className = "tnvig-tem";
            }
        }
    }
    var e = $('a[href*="?watch=forum"]');
    e.on("click", function (m) {
        m.preventDefault();
        var j = $(this).attr("href");
        var k = $(this);
        $.post(j, {
            confirm: 1
        }).success(function () {
            var o = k.attr("href");
            o.replace(/\?watch=forum/g, "?unwatch=forum");
            k.html(unwatchBTN);
            k.attr("href", o);
            k.attr("original-title", "Dejar de vigilar este subforo");
            alert("vigilas este  subforo");
        });
    });
    var c = $('a[href*="?unwatch=forum"]');
    c.on("click", function (m) {
        m.preventDefault();
        var k = $(this).attr("href");
        var j = $(this);
        $.post(k, {
            confirm: 1
        }).success(function () {
            var o = j.attr("href");
            o.replace(/\?unwatch=forum/g, "?watch=forum");
            j.html(watchBTN);
            j.attr("href", o);
            j.attr("original-title", "Vigilar este subforo");
            alert("Ya no sigues el subforo");
        });
    });
}
var mpindex = $(".forabg").length;
if (mp && mpindex) {
    $(function () {
        $(".panel.mps-index").after('<div class="forabg preview-mp"><ul class="topiclist"><li id="ajaxPM_header" class="header"><dl><dt>Selecciona el mensaje :</dt></dl></li></ul><div id="ajaxPM" class="panel" style="padding:3px;"><div style="text-align:center;font-size:16px;">No hay mensaje seleccionado</div></div></div>');
        _activePM = undefined;
        $(".pmlist").find(".topictitle").on("click", function () {
            if ($(this).attr("href") == _activePM) {
                if (document.getElementById("notif_activepm")) {
                    return false;
                }
                $("body").append('<div id="notif_activepm" class="notif_ajaxPM"><div class="notif_icon">!</div>El MP que seleccionaste esta actualmente activo.<br/><a id="dismiss_notif" style="cursor:pointer;float:right;">Cerrar la notificación</a></div>');
                $("#dismiss_notif").on("click", function () {
                    $(".notif_ajaxPM").fadeOut(300, function () {
                        $(this).remove();
                    });
                });
                $("#notif_activepm").animate({
                    top: "40px"
                }, 700);
                return false;
            }
            _activePM = $(this).attr("href");
            $("#ajaxPM_nav, .notif_ajaxPM").remove();
            $("#ajaxPM").html('<div style="text-align:center;font-size:16px;">Cargando...</div>').load(_activePM + ' form[action^="/privmsg"]', function () {
                $("#ajaxPM_header dl").append('<dd id="ajaxPM_nav" style="float:right"><a id="directLink" class="ajaxPM_link">Ver más</a>&nbsp;&bull;&nbsp;<a id="clearSelected" class="ajaxPM_link">Limpiar</a></dd>');
                $("#directLink").attr("href", _activePM);
                $("#clearSelected").on("click", function () {
                    $("#ajaxPM").html('<div style="text-align:center;font-size:16px;">No seleccionaste un mensaje</div>');
                    $("#ajaxPM_nav, .notif_ajaxPM").remove();
                    _activePM = undefined;
                });
            });
            return false;
        });
    });
}
var quicktopic = {
    color: "orange"
};
(function (l) {
    function m() {
        l("body").prepend('<div id="loading-bar" style="z-index: 9999; background-color: ' + quicktopic.color + '; position: fixed; top: 0; width: 20%; left: 0; height: 3px;"></div>');
        document.forms.post.message.value = l("#text_editor_textarea").sceditor("instance").val();
        l.post("/post", l(document.forms.post).serialize() + "&post=1", function (g) {
            setInterval(function () {
                "100%" != document.getElementById("loading-bar").style.width && (document.getElementById("loading-bar").style.width = parseInt(document.getElementById("loading-bar").style.width) + 10 + "%");
            }, 10);
            window.location = void 0 == quicktopic.redirect ? g.match(/url=(.*?)"/)[1] : quicktopic.redirect;
        });
    }
    var k;
    k = void 0 == quicktopic.forums || "string" != typeof quicktopic.forums ? "\\d+" : quicktopic.forums.replace(/,\s?/g, "|");
    RegExp("\\/?post\\?f=(" + k + ").*").test(window.location) && l(function () {
        l("#text_editor_textarea").length && (l(window).on("beforeunload", function () {
            if (l(".sceditor-container").find("textarea").val().length || l(".sceditor-container").find("i-frame").contents().find("body").text().length) {
                return _userdata.username + " todavía no has enviado el mensaje.";
            }
        }), l(document.forms.post.post).on("click", function (g) {
            $(window).off("beforeunload");
            g.preventDefault();
            m();
        }));
    });
})(jQuery);
setTimeout(function () {
    $(function () {
        var b = {
            time: 750,
            background: "#CCC",
            border: "#DDDDDD",
            shadow: 1,
            offsetX: "42"
        };
        var h = 'style="margin:0px 2px;"';
        var g = b.shadow;
        var f = b.time;
        if (g == 1) {
            var d = "box-shadow:2px 2px 6px rgba(0,0,0,0.3);";
        } else {
            var d = "box-shadow:none;";
        }
        var e = "position:fixed;background:" + b.background + ";border:1px solid " + b.border + ";display:inline-block;padding:10px;z-index:99999;" + d;
        var c = '<div id="quickLoginPanel" style="' + e + '"><fieldset class="fields1 left fld_connexion"><form name="form_login" method="post" action="/login"><dl><dt><label for="username">Usuario:</label></dt><dd><input id="username" class="inputbox autowidth" type="text" value="" maxlength="40" size="25" name="username" tabindex="1"></dd></dl><dl><dt><label for="password">Contraseña:</label></dt><dd><input id="password" class="inputbox autowidth" type="password" maxlength="25" size="25" name="password" tabindex="2"></dd><dd><a href="/profile?mode=sendpassword">Olvide mi contraseña</a></dd></dl><dl><dd><label for="autologin"><input id="autologin" class="radio" type="checkbox" tabindex="4" name="autologin">Ingresar automaticamente</label></dd></dl><dl><dt>&nbsp;</dt><dd><input type="hidden" value="" name="redirect"><input type="hidden" value="" name="query"><input class="button1" type="submit" value="Entrar" tabindex="6" name="login"></dd></dl><a href="" id="quickLoginClose">Cerrar</a><form></fieldset></div>';
        var a = '<div id="quickLogoutPanel" style="' + e + '"><form method="post" action="/login?logout=true"><p>¿Estas seguro de salir?</p><fieldset class="submit-buttons"><div id="tid" style="display:none;"></div><div id="key" style="display:none;"></div><input class="button2" type="submit" value="Si" name="confirm" ' + h + '><input class="button2" type="submit" value="No" name="cancel" id="quickLogoutClose" ' + h + "></fieldset></form></div>";
        if (!document.getElementById("logout")) {
            $('a[href*="/login"]').on("click", function () {
                if (!document.getElementById("quickLoginPanel")) {
                    $("body").append(c);
                    $("#quickLoginPanel").css("left", b.offsetX + "%").css("top", "-25%").animate({
                        top: "40px"
                    }, f);
                    $("#quickLoginClose").on("click", function () {
                        $("#quickLoginPanel").animate({
                            top: "-25%"
                        }, f, function () {
                            $("#quickLoginPanel").remove();
                        });
                        return false;
                    });
                }
                return false;
            });
        } else {
            $("#logout").add('a[href="http://source.openphpbb.com/login?logout=1"]').on("click", function () {
                if (!document.getElementById("quickLogoutPanel")) {
                    $("body").append(a);
                    $("#tid").load('/login?logout=1 input[name="tid"]');
                    $("#key").load('/login?logout=1 input[name="key"]');
                    $("#quickLogoutPanel").css("left", b.offsetX + "%").css("top", "-25%").animate({
                        top: "40px"
                    }, f);
                    $("#quickLogoutClose").on("click", function () {
                        $("#quickLogoutPanel").animate({
                            top: "-25%"
                        }, f, function () {
                            $("#quickLogoutPanel").remove();
                        });
                        return false;
                    });
                }
                return false;
            });
        }
    });
}, 100);
(function () {
    function e(d, g) {
        return g ? d.replace(/\r?\n/g, "<br/>") : d.replace(/\<br\s?\/?\>/gi, "\n");
    }

    function a(d, g) {
        return '<span clapanda="' + d + '">' + g + "</span>";
    }

    function c(d, g, h) {
        return d.replace(RegExp("\\b(?:" + g.join("|") + ")\\b", "g"), function (i) {
            return a(h, i);
        });
    }

    function b(g, h, j) {
        for (var i in h) {
            j = j.replace(h[i], function (d) {
                return a(g + "-" + i, d);
            });
        }
        return j;
    }
    var f = {
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
        parse: function (z, B) {
            var y = f.languages[z];
            if (!y) {
                return B;
            }
            var t = y.matchers,
                p = y.keywords,
                d = y.specials,
                E = (new Date).getTime(),
                F = {};
            B = e(B).replace(/\</g, "&lt;").replace(/>/g, "&gt;").replace(/&nbsp;/g, "");
            for (var l = 0, D = 0, q; q = t[l++];) {
                var o = this.regex[q],
                    C = "\u00a3panda_" + q + "_" + E + "_",
                    A = F[q] = {},
                    i = !1;
                o && (o.inner && (i = o.inner, o = o.outer), B = B.replace(o, function (h) {
                    var g = C + D+++"_" + (o.multiline ? "m_" : "") + "panda\u00a3";
                    i && (h = b("panda-" + q, i, h));
                    A[g] = h;
                    return g;
                }));
            }
            p.length && (B = c(B, p, "panda-keyword"));
            d.length && (B = c(B, d, "panda-special"));
            y.noints || (B = B.replace(/\b\d+(?:\.\d+)?\b/g, function (g) {
                return a("panda-int", g);
            }));
            for (l = t.length; l; l--) {
                q = t[l - 1];
                var y = F[q],
                    j;
                for (j in y) {
                    p = y[j], j.indexOf("_m_") && (p = p.replace(/\n/g, '</span>\n<span clapanda="panda-' + q + '">')), B = B.replace(j, a("panda-" + q, p));
                }
            }
            B = B.split(" ").join("&nbsp;").replace(/&nbsp;clapanda=/g, " class=").replace(/\t/g, "&nbsp;&nbsp;&nbsp;&nbsp;");
            return e('<ol><li class="panda-line">' + B.split(/\n/).join('</li><li class="panda-line">') + "</li></ol>", 1);
        },
        identify: function (d) {
            if (d.pandaType) {
                return d.pandaType;
            }
            var g = /(?:\s|^)panda[_-](\w+)(?:\s|$)/;
            return g.test(d.className) ? g.exec(d.className)[1] : "default";
        },
        colorNode: function (d) {
            var g = f.identify(d);
            f.cacheIdentity && (d.pandaType = g);
            d.className += " panda-code panda-" + g;
            d.innerHTML = f.parse(g, d.innerHTML);
        },
        addSpecials: function (d, g) {
            this.addKeywords(d, g, !0);
        },
        addKeywords: function (d, h, k) {
            if (d in f) {
                for (var j = 0, i = h.length; j < i; j++) {
                    f.languages[d][k ? "specials" : "keywords"].push(h[j]);
                }
            }
        },
        addLang: function (d, g) {
            if ("matchers" in g) {
                var i = f.languages[d] = {};
                f.installedLanguages.push(d);
                i.matchers = "string" == typeof g.matchers ? g.matchers.split(" ") : g.matchers;
                i.specials = ("string" == typeof g.specials ? g.specials.split(" ") : g.specials) || [];
                i.keywords = ("string" == typeof g.keywords ? g.keywords.split(" ") : g.keywords) || [];
                if (g.regex && "object" == typeof g.regex) {
                    for (var h in g.regex) {
                        f.regex[h] = g.regex[h];
                    }
                }
            }
        }
    };
    window.panda = f;
    f.addLang("default", {
        matchers: ["string"],
        keywords: "var for while if else elseif function def class try catch return true false continue break case default delete switch in as null typeof sizeof null int char bool boolean long double float enum import struct signed unsigned",
        specials: ["document"]
    });
    f.onload = function () {
        for (var d = document.getElementsByTagName("code"), g = 0, h; h = d[g++];) {
            f.colorNode(h);
        }
    };
})();
panda.onload = function () {
    var a = ["default", "dark", "deepsea", "bright", "neon", "desert", "plain", "geany", "github"],
        b = document.getElementsByTagName("code"),
        h = my_getcookie("panda-theme"),
        g = '<option value="null"> -------------- </option>';
    for (var f = 0, e;
        (e = a[f++]);) {
        g += '<option value="' + e + '" ' + (h && h == e ? ' selected="selected"' : "") + ">";
        g += e.charAt(0).toUpperCase() + e.substr(1) + "</option>";
    }
    for (var d = 0, k;
        (k = b[d++]);) {
        panda.colorNode(k);
        $(k.parentNode.parentNode).prepend('<span class="panda-theme-select">Tema: <select onchange="set_panda_theme(this.value)">' + g + "</select></span>");
    }
    if (h) {
        set_panda_theme(h, b);
    }
};

function set_panda_theme(d, a) {
    a = a || document.getElementsByTagName("code");
    for (var b = 0, e;
        (e = a[b++]);) {
        e.className = e.className.replace(/\s?panda-theme-\w+\s?/, "") + " panda-theme-" + d;
    }
    my_setcookie("panda-theme", d, 1);
}
$(panda.onload);

function selectCode(e) {
    e = e.parentNode.tagName === "B" ? $(e).closest("table").find(".cont_code")[0] : $(e).closest("dl").find("code")[0];
    if (window.getSelection) {
        var f = window.getSelection();
        if (f.setBaseAndExtent) {
            f.setBaseAndExtent(e, 0, e, e.innerText.length - 1);
        } else {
            window.opera && e.innerHTML.substring(e.innerHTML.length - 4) == "<BR>" && (e.innerHTML += " ");
            var d = document.createRange();
            d.selectNodeContents(e);
            f.removeAllRanges();
            f.addRange(d);
        }
    } else {
        document.getSelection ? (f = document.getSelection(), d = document.createRange(), d.selectNodeContents(e), f.removeAllRanges(), f.addRange(d)) : document.selection && (d = document.body.createTextRange(), d.moveToElementText(e), d.select());
    }
}
$(function () {
    $("dl.codebox:not(.spoiler,.hidecode) dt").append('<table class="cabecera-code"><td class="sel-code"><td><img class="codeimg" src="https://cdn1.iconfinder.com/data/icons/hawcons/32/698678-icon-70-document-code-24.png"/></td><td class="titulo-code">Código:</td><td onClick="selectCode(this)" class="selectCode" style="cursor:pointer">Seleccionar el contenido</td></table>');
});
if (tm) {
    $(document).ready(function () {
        var c = "phpbb3";
        var f = {
            repName: "Puntos",
            repStyle: "block",
            repImage: "http://i57.servimg.com/u/f57/18/21/41/30/star12.png"
        };
        var h = {
            lv1: 1,
            lv2: 50,
            lv3: 100,
            lv4: 150,
            lv5: 200,
            lv6: 250,
            lv7: 320,
            lv8: 640
        };
        if (f.repStyle.toLowerCase() == "block") {
            var d = '<span id="rLv" class="repuBlock">';
        } else {
            if (f.repStyle.toLowerCase() == "image") {
                var d = '<img id="rLv" src="' + f.repImage + '"/>';
            } else {
                var d = '<span id="rLv" class="repuBlock">';
            }
        }
        var a = {
            phpbb3: c.toLowerCase() == "phpbb3",
        };
        var e = new RegExp(".*" + f.repName + ":\\s+(\\d+).*");
        if (a.phpbb3 || a.punbb || a.invision) {
            if (a.phpbb3) {
                var g = ".postprofile";
                var b = $(this).find(".f_a1").append('<div id="repu">');
            }
            $(g).each(function () {
                var j = Number($(this).text().replace(e, "$1"));
                b;
                if (j >= h.lv1) {
                    $(this).find("#repu").append(d);
                    var i = j + "/" + h.lv2;
                }
                if (j >= h.lv2) {
                    $(this).find("#repu").append(d);
                    var i = j + "/" + h.lv3;
                }
                if (j >= h.lv3) {
                    $(this).find("#repu").append(d);
                    var i = j + "/" + h.lv4;
                }
                if (j >= h.lv4) {
                    $(this).find("#repu").append(d);
                    var i = j + "/" + h.lv5;
                }
                if (j >= h.lv5) {
                    $(this).find("#repu").append(d);
                    var i = j + "/" + h.lv6;
                }
                if (j >= h.lv6) {
                    $(this).find("#repu").append(d);
                    var i = j + "/" + h.lv7;
                }
                if (j >= h.lv7) {
                    $(this).find("#repu").append(d);
                    var i = j + "/" + h.lv8;
                }
                if (j >= h.lv8) {
                    $(this).find("#repu").append(d);
                    var i = "MAX";
                }
                $(this).find("#repu").attr("title", "Reputation level " + $(this).find("#rLv").length + "\nNext : (" + i + ")");
            });
        }
    });
}
if ($("#fa_menulist").length) {
    var status_box = {
        lang: {
            woym: " ¿Que tienes en mente?",
            update: '<img src="http://www.adictosalgear.org/adictosalgear/files/pencil.png">',
            too_short: "Status muy corto.",
            updated: "¡Actualizado!",
            error: "Error. Intenta de nuevo."
        },
        init: function (e, f) {
            if (e) {
                var h = my_getcookie("fa_" + location.host.replace(/\./g, "_") + "_data");
                this.user_id = h ? parseInt(h.split("userid")[1].replace(/s:\d+/g, "").match(/\d+/)) : 0;
                if (f) {
                    for (var g in f) {
                        this.lang[g] = f[g];
                    }
                }
                this.outer = document.getElementById("AAGstatus");
                this.outer.innerHTML = '<input id="AAGstatus_input" type="text" placeholder="' + _userdata.username + this.lang.woym + '"><div onclick="status_box.update()" class="status-button">' + this.lang.update + '</div><span id="AAGstatus_notice"></span>';
                this.input = document.getElementById("AAGstatus_input");
                this.id = e;
                this.initiated = !0;
            }
        },
        update: function () {
            if (this.initiated) {
                var c = document.getElementById("AAGstatus_notice");
                if (2 > this.input.value.length) {
                    return c.innerHTML = this.lang.too_short = this.lang.too_short;
                }
                var d = document.getElementById("logout");
                d && (d = d.href, d = d.substring(d.indexOf("tid=") + 4, d.indexOf("&key")), d = "id=" + this.id.substring(this.id.lastIndexOf("_") + 1) + '&active=1&content=[["' + this.id + '", "' + this.input.value + '"]]&tid=' + d + "&user=" + this.user_id, $.post("/ajax_profile.forum?jsoncallback=jQuery1", d, function (b) {
                    0 < b.indexOf(status_box.input.value) ? (status_box.input.value = "", c.innerHTML = status_box.lang.updated, setTimeout("document.getElementById('AAGstatus_notice').innerHTML=\" \"", 2500)) : c.innerHTML = status_box.lang.error;
                }));
            }
        }
    };
    if (_userdata.session_logged_in == "1") {
        $("#fa_menulist").prepend('<div id="AAGstatus"></div>');
        status_box.init("profile_field_13_1");
    }
}
$("#fa_welcome").on("click", function () {
    $("#fa_menulist").slideToggle(100);
});
$("#fa_notifications").on("click", function () {
    $("#notif_list").slideToggle(100);
    $(this).attr("style", "background-image: url(http://adictosalgear.org/images/bell.png)!important;background-position: right!important;background-repeat: no-repeat!important;");
});

function lang_vi(b) {
    b = b.toLowerCase();
    b = b.replace(/\u00e0|\u00e1|\u1ea1|\u1ea3|\u00e3|\u00e2|\u1ea7|\u1ea5|\u1ead|\u1ea9|\u1eab|\u0103|\u1eb1|\u1eaf|\u1eb7|\u1eb3|\u1eb5/g, "a");
    b = b.replace(/\u00e8|\u00e9|\u1eb9|\u1ebb|\u1ebd|\u00ea|\u1ec1|\u1ebf|\u1ec7|\u1ec3|\u1ec5/g, "e");
    b = b.replace(/\u00ec|\u00ed|\u1ecb|\u1ec9|\u0129/g, "i");
    b = b.replace(/\u00f2|\u00f3|\u1ecd|\u1ecf|\u00f5|\u00f4|\u1ed3|\u1ed1|\u1ed9|\u1ed5|\u1ed7|\u01a1|\u1edd|\u1edb|\u1ee3|\u1edf|\u1ee1/g, "o");
    b = b.replace(/\u00f9|\u00fa|\u1ee5|\u1ee7|\u0169|\u01b0|\u1eeb|\u1ee9|\u1ef1|\u1eed|\u1eef/g, "u");
    b = b.replace(/\u1ef3|\u00fd|\u1ef5|\u1ef7|\u1ef9/g, "y");
    b = b.replace(/\u0111/g, "d");
    b = b.replace(/\W+/g, "-");
    return b.replace(/^\-+|\-+$/g, "");
}
var titulosprefixA = $(".lastpost").find("a"),
    titulosprefixB = $(".news_topic_title"),
    titulosprefixC = $(".topic-title").find("a"),
    titulosprefixD = $(".page-title").find("a");
$(function () {
    titulosprefixA.add(titulosprefixB).add(titulosprefixC).add(titulosprefixD).html(function () {
        var b = this.innerHTML;
        if (/^\[(tema|staff| sondeo |nota|codigo|actualizado|ayuda|tutorial|guia|consulta|punbb|phpbb3|nuevo|noticia|tv|presentacion|afiliacion|publicidad|recursos|anuncio|duda|evento|sugerencia|Premiun|resuelto|soporte|pedido|jquery|javascript|html|css|novedades)\]/i.test(b)) {
            return b.replace(/\[(.+)\]/, function (c) {
                return '<span class="prefix ' + lang_vi(c) + '">' + c.replace(/[\[\]]/g, "") + "</span>";
            });
        }
    });
});
(function (b, a, c) {
    (function (d) {
        if (typeof define === "function" && define.amd) {
            define(["jquery"], d);
        } else {
            if (jQuery && !jQuery.fn.qtip) {
                d(jQuery);
            }
        }
    }(function (av) {
        var S = true,
            H = false,
            ag = null,
            ab = "x",
            aa = "y",
            M = "width",
            aA = "height",
            o = "top",
            d = "left",
            aw = "bottom",
            l = "right",
            J = "center",
            u = "flip",
            Z = "flipinvert",
            p = "shift",
            z, aC, am, i, aJ = {},
            q = "qtip",
            F = "data-hasqtip",
            ad = "data-qtip-id",
            al = ["ui-widget", "ui-tooltip"],
            y = "." + q,
            ae = "click dblclick mousedown mouseup mousemove mouseleave mouseenter".split(" "),
            D = q + "-fixed",
            Q = q + "-default",
            O = q + "-focus",
            aI = q + "-hover",
            V = q + "-disabled",
            aH = "_replacedByqTip",
            G = "oldtitle",
            aG, s = {
                ie: (function () {
                    for (var C = 4, X = a.createElement("div");
                        (X.innerHTML = "<!--[if gt IE " + C + "]><i></i><![endif]-->") && X.getElementsByTagName("i")[0]; C += 1) {}
                    return C > 4 ? C : NaN;
                }()),
                iOS: parseFloat(("" + (/CPU.*OS ([0-9_]{1,5})|(CPU like).*AppleWebKit.*Mobile/i.exec(navigator.userAgent) || [0, ""])[1]).replace("undefined", "3_2").replace("_", ".").replace("_", "")) || H
            };

        function ay(Y, X, aK, C) {
            this.id = aK;
            this.target = Y;
            this.tooltip = ag;
            this.elements = {
                target: Y
            };
            this._id = q + "-" + aK;
            this.timers = {
                img: {}
            };
            this.options = X;
            this.plugins = {};
            this.cache = {
                event: {},
                target: av(),
                disabled: H,
                attr: C,
                onTooltip: H,
                lastClass: ""
            };
            this.rendered = this.destroyed = this.disabled = this.waiting = this.hiddenDuringWait = this.positioning = this.triggering = H;
        }
        aC = ay.prototype;
        aC._when = function (C) {
            return av.when.apply(av, C);
        };
        aC.render = function (aM) {
            if (this.rendered || this.destroyed) {
                return this;
            }
            var aP = this,
                aS = this.options,
                X = this.cache,
                C = this.elements,
                aO = aS.content.text,
                aL = aS.content.title,
                aK = aS.content.button,
                aN = aS.position,
                Y = "." + this._id + " ",
                aR = [],
                aQ;
            av.attr(this.target[0], "aria-describedby", this._id);
            X.posClass = this._createPosClass((this.position = {
                my: aN.my,
                at: aN.at
            }).my);
            this.tooltip = C.tooltip = aQ = av("<div/>", {
                id: this._id,
                "class": [q, Q, aS.style.classes, X.posClass].join(" "),
                width: aS.style.width || "",
                height: aS.style.height || "",
                tracking: aN.target === "mouse" && aN.adjust.mouse,
                role: "alert",
                "aria-live": "polite",
                "aria-atomic": H,
                "aria-describedby": this._id + "-content",
                "aria-hidden": S
            }).toggleClass(V, this.disabled).attr(ad, this.id).data(q, this).appendTo(aN.container).append(C.content = av("<div />", {
                "class": q + "-content",
                id: this._id + "-content",
                "aria-atomic": S
            }));
            this.rendered = -1;
            this.positioning = S;
            if (aL) {
                this._createTitle();
                if (!av.isFunction(aL)) {
                    aR.push(this._updateTitle(aL, H));
                }
            }
            if (aK) {
                this._createButton();
            }
            if (!av.isFunction(aO)) {
                aR.push(this._updateContent(aO, H));
            }
            this.rendered = S;
            this._setWidget();
            av.each(aJ, function (aU) {
                var aT;
                if (this.initialize === "render" && (aT = this(aP))) {
                    aP.plugins[aU] = aT;
                }
            });
            this._unassignEvents();
            this._assignEvents();
            this._when(aR).then(function () {
                aP._trigger("render");
                aP.positioning = H;
                if (!aP.hiddenDuringWait && (aS.show.ready || aM)) {
                    aP.toggle(S, X.event, H);
                }
                aP.hiddenDuringWait = H;
            });
            z.api[this.id] = this;
            return this;
        };
        aC.destroy = function (C) {
            if (this.destroyed) {
                return this.target;
            }

            function X() {
                if (this.destroyed) {
                    return;
                }
                this.destroyed = S;
                var Y = this.target,
                    aK = Y.attr(G),
                    aL;
                if (this.rendered) {
                    this.tooltip.stop(1, 0).find("*").remove().end().remove();
                }
                av.each(this.plugins, function (aM) {
                    this.destroy && this.destroy();
                });
                for (aL in this.timers) {
                    clearTimeout(this.timers[aL]);
                }
                Y.removeData(q).removeAttr(ad).removeAttr(F).removeAttr("aria-describedby");
                if (this.options.suppress && aK) {
                    Y.attr("title", aK).removeAttr(G);
                }
                this._unassignEvents();
                this.options = this.elements = this.cache = this.timers = this.plugins = this.mouse = ag;
                delete z.api[this.id];
            }
            if ((C !== S || this.triggering === "hide") && this.rendered) {
                this.tooltip.one("tooltiphidden", av.proxy(X, this));
                !this.triggering && this.hide();
            } else {
                X.call(this);
            }
            return this.target;
        };

        function A(C) {
            return C === ag || av.type(C) !== "object";
        }

        function R(C) {
            return !(av.isFunction(C) || (C && C.attr) || C.length || (av.type(C) === "object" && (C.jquery || C.then)));
        }

        function v(Y) {
            var X, aL, aK, C;
            if (A(Y)) {
                return H;
            }
            if (A(Y.metadata)) {
                Y.metadata = {
                    type: Y.metadata
                };
            }
            if ("content" in Y) {
                X = Y.content;
                if (A(X) || X.jquery || X.done) {
                    X = Y.content = {
                        text: (aL = R(X) ? H : X)
                    };
                } else {
                    aL = X.text;
                } if ("ajax" in X) {
                    aK = X.ajax;
                    C = aK && aK.once !== H;
                    delete X.ajax;
                    X.text = function (aO, aN) {
                        var aP = aL || av(this).attr(aN.options.content.attr) || "Loading...",
                            aM = av.ajax(av.extend({}, aK, {
                                context: aN
                            })).then(aK.success, ag, aK.error).then(function (aQ) {
                                if (aQ && C) {
                                    aN.set("content.text", aQ);
                                }
                                return aQ;
                            }, function (aS, aQ, aR) {
                                if (aN.destroyed || aS.status === 0) {
                                    return;
                                }
                                aN.set("content.text", aQ + ": " + aR);
                            });
                        return !C ? (aN.set("content.text", aP), aM) : aP;
                    };
                }
                if ("title" in X) {
                    if (av.isPlainObject(X.title)) {
                        X.button = X.title.button;
                        X.title = X.title.text;
                    }
                    if (R(X.title || H)) {
                        X.title = H;
                    }
                }
            }
            if ("position" in Y && A(Y.position)) {
                Y.position = {
                    my: Y.position,
                    at: Y.position
                };
            }
            if ("show" in Y && A(Y.show)) {
                Y.show = Y.show.jquery ? {
                    target: Y.show
                } : Y.show === S ? {
                    ready: S
                } : {
                    event: Y.show
                };
            }
            if ("hide" in Y && A(Y.hide)) {
                Y.hide = Y.hide.jquery ? {
                    target: Y.hide
                } : {
                    event: Y.hide
                };
            }
            if ("style" in Y && A(Y.style)) {
                Y.style = {
                    classes: Y.style
                };
            }
            av.each(aJ, function () {
                this.sanitize && this.sanitize(Y);
            });
            return Y;
        }
        i = aC.checks = {
            builtin: {
                "^id$": function (aK, aL, X, Y) {
                    var aM = X === S ? z.nextid : X,
                        C = q + "-" + aM;
                    if (aM !== H && aM.length > 0 && !av("#" + C).length) {
                        this._id = C;
                        if (this.rendered) {
                            this.tooltip[0].id = this._id;
                            this.elements.content[0].id = this._id + "-content";
                            this.elements.title[0].id = this._id + "-title";
                        }
                    } else {
                        aK[aL] = Y;
                    }
                },
                "^prerender": function (X, Y, C) {
                    C && !this.rendered && this.render(this.options.show.ready);
                },
                "^content.text$": function (X, Y, C) {
                    this._updateContent(C);
                },
                "^content.attr$": function (Y, aK, C, X) {
                    if (this.options.content.text === this.target.attr(X)) {
                        this._updateContent(this.target.attr(C));
                    }
                },
                "^content.title$": function (X, Y, C) {
                    if (!C) {
                        return this._removeTitle();
                    }
                    C && !this.elements.title && this._createTitle();
                    this._updateTitle(C);
                },
                "^content.button$": function (X, Y, C) {
                    this._updateButton(C);
                },
                "^content.title.(text|button)$": function (X, Y, C) {
                    this.set("content." + Y, C);
                },
                "^position.(my|at)$": function (X, Y, C) {
                    "string" === typeof C && (this.position[Y] = X[Y] = new am(C, Y === "at"));
                },
                "^position.container$": function (X, Y, C) {
                    this.rendered && this.tooltip.appendTo(C);
                },
                "^show.ready$": function (X, Y, C) {
                    C && (!this.rendered && this.render(S) || this.toggle(S));
                },
                "^style.classes$": function (Y, aK, C, X) {
                    this.rendered && this.tooltip.removeClass(X).addClass(C);
                },
                "^style.(width|height)": function (X, Y, C) {
                    this.rendered && this.tooltip.css(Y, C);
                },
                "^style.widget|content.title": function () {
                    this.rendered && this._setWidget();
                },
                "^style.def": function (X, Y, C) {
                    this.rendered && this.tooltip.toggleClass(Q, !!C);
                },
                "^events.(render|show|move|hide|focus|blur)$": function (X, Y, C) {
                    this.rendered && this.tooltip[(av.isFunction(C) ? "" : "un") + "bind"]("tooltip" + Y, C);
                },
                "^(show|hide|position).(event|target|fixed|inactive|leave|distance|viewport|adjust)": function () {
                    if (!this.rendered) {
                        return;
                    }
                    var C = this.options.position;
                    this.tooltip.attr("tracking", C.target === "mouse" && C.adjust.mouse);
                    this._unassignEvents();
                    this._assignEvents();
                }
            }
        };

        function ao(C, aK) {
            var X = 0,
                aM, Y = C,
                aL = aK.split(".");
            while (Y = Y[aL[X++]]) {
                if (X < aL.length) {
                    aM = Y;
                }
            }
            return [aM || C, aL.pop()];
        }
        aC.get = function (X) {
            if (this.destroyed) {
                return this;
            }
            var Y = ao(this.options, X.toLowerCase()),
                C = Y[0][Y[1]];
            return C.precedance ? C.string() : C;
        };

        function ac(aK, X) {
            var Y, aL, C;
            for (Y in this.checks) {
                for (aL in this.checks[Y]) {
                    if (C = (new RegExp(aL, "i")).exec(aK)) {
                        X.push(C);
                        if (Y === "builtin" || this.plugins[Y]) {
                            this.checks[Y][aL].apply(this.plugins[Y] || this, X);
                        }
                    }
                }
            }
        }
        var x = /^position\.(my|at|adjust|target|container|viewport)|style|content|show\.ready/i,
            r = /^prerender|show\.ready/i;
        aC.set = function (aL, aM) {
            if (this.destroyed) {
                return this;
            }
            var aN = this.rendered,
                C = H,
                aK = this.options,
                Y = this.checks,
                X;
            if ("string" === typeof aL) {
                X = aL;
                aL = {};
                aL[X] = aM;
            } else {
                aL = av.extend({}, aL);
            }
            av.each(aL, function (aP, aQ) {
                if (aN && r.test(aP)) {
                    delete aL[aP];
                    return;
                }
                var aR = ao(aK, aP.toLowerCase()),
                    aO;
                aO = aR[0][aR[1]];
                aR[0][aR[1]] = aQ && aQ.nodeType ? av(aQ) : aQ;
                C = x.test(aP) || C;
                aL[aP] = [aR[0], aR[1], aQ, aO];
            });
            v(aK);
            this.positioning = S;
            av.each(aL, av.proxy(ac, this));
            this.positioning = H;
            if (this.rendered && this.tooltip[0].offsetWidth > 0 && C) {
                this.reposition(aK.position.target === "mouse" ? ag : this.cache.event);
            }
            return this;
        };
        aC._update = function (aL, aK, C) {
            var Y = this,
                X = this.cache;
            if (!this.rendered || !aL) {
                return H;
            }
            if (av.isFunction(aL)) {
                aL = aL.call(this.elements.target, X.event, this) || "";
            }
            if (av.isFunction(aL.then)) {
                X.waiting = S;
                return aL.then(function (aM) {
                    X.waiting = H;
                    return Y._update(aM, aK);
                }, ag, function (aM) {
                    return Y._update(aM, aK);
                });
            }
            if (aL === H || (!aL && aL !== "")) {
                return H;
            }
            if (aL.jquery && aL.length > 0) {
                aK.empty().append(aL.css({
                    display: "block",
                    visibility: "visible"
                }));
            } else {
                aK.html(aL);
            }
            return this._waitForContent(aK).then(function (aM) {
                if (Y.rendered && Y.tooltip[0].offsetWidth > 0) {
                    Y.reposition(X.event, !aM.length);
                }
            });
        };
        aC._waitForContent = function (X) {
            var C = this.cache;
            C.waiting = S;
            return (av.fn.imagesLoaded ? X.imagesLoaded() : av.Deferred().resolve([])).done(function () {
                C.waiting = H;
            }).promise();
        };
        aC._updateContent = function (X, C) {
            this._update(X, this.elements.content, C);
        };
        aC._updateTitle = function (X, C) {
            if (this._update(X, this.elements.title, C) === H) {
                this._removeTitle(H);
            }
        };
        aC._createTitle = function () {
            var C = this.elements,
                X = this._id + "-title";
            if (C.titlebar) {
                this._removeTitle();
            }
            C.titlebar = av("<div />", {
                "class": q + "-titlebar " + (this.options.style.widget ? aE("header") : "")
            }).append(C.title = av("<div />", {
                id: X,
                "class": q + "-title",
                "aria-atomic": S
            })).insertBefore(C.content).delegate(".qtip-close", "mousedown keydown mouseup keyup mouseout", function (Y) {
                av(this).toggleClass("ui-state-active ui-state-focus", Y.type.substr(-4) === "down");
            }).delegate(".qtip-close", "mouseover mouseout", function (Y) {
                av(this).toggleClass("ui-state-hover", Y.type === "mouseover");
            });
            if (this.options.content.button) {
                this._createButton();
            }
        };
        aC._removeTitle = function (C) {
            var X = this.elements;
            if (X.title) {
                X.titlebar.remove();
                X.titlebar = X.title = X.button = ag;
                if (C !== H) {
                    this.reposition();
                }
            }
        };
        aC._createPosClass = function (C) {
            return q + "-pos-" + (C || this.options.position.my).abbrev();
        };
        aC.reposition = function (a1, aY) {
            if (!this.rendered || this.positioning || this.destroyed) {
                return this;
            }
            this.positioning = S;
            var aX = this.cache,
                aM = this.tooltip,
                a4 = this.options.position,
                a6 = a4.target,
                aV = a4.my,
                aW = a4.at,
                a3 = a4.viewport,
                aT = a4.container,
                a0 = a4.adjust,
                X = a0.method.split(" "),
                a2 = aM.outerWidth(H),
                aZ = aM.outerHeight(H),
                aO = 0,
                aP = 0,
                Y = aM.css("position"),
                a5 = {
                    left: 0,
                    top: 0
                },
                C = aM[0].offsetWidth > 0,
                aU = a1 && a1.type === "scroll",
                aL = av(b),
                a7 = aT[0].ownerDocument,
                aS = this.mouse,
                aR, aN, aK, aQ;
            if (av.isArray(a6) && a6.length === 2) {
                aW = {
                    x: d,
                    y: o
                };
                a5 = {
                    left: a6[0],
                    top: a6[1]
                };
            } else {
                if (a6 === "mouse") {
                    aW = {
                        x: d,
                        y: o
                    };
                    if ((!a0.mouse || this.options.hide.distance) && aX.origin && aX.origin.pageX) {
                        a1 = aX.origin;
                    } else {
                        if (!a1 || (a1 && (a1.type === "resize" || a1.type === "scroll"))) {
                            a1 = aX.event;
                        } else {
                            if (aS && aS.pageX) {
                                a1 = aS;
                            }
                        }
                    } if (Y !== "static") {
                        a5 = aT.offset();
                    }
                    if (a7.body.offsetWidth !== (b.innerWidth || a7.documentElement.clientWidth)) {
                        aN = av(a.body).offset();
                    }
                    a5 = {
                        left: a1.pageX - a5.left + (aN && aN.left || 0),
                        top: a1.pageY - a5.top + (aN && aN.top || 0)
                    };
                    if (a0.mouse && aU && aS) {
                        a5.left -= (aS.scrollX || 0) - aL.scrollLeft();
                        a5.top -= (aS.scrollY || 0) - aL.scrollTop();
                    }
                } else {
                    if (a6 === "event") {
                        if (a1 && a1.target && a1.type !== "scroll" && a1.type !== "resize") {
                            aX.target = av(a1.target);
                        } else {
                            if (!a1.target) {
                                aX.target = this.elements.target;
                            }
                        }
                    } else {
                        if (a6 !== "event") {
                            aX.target = av(a6.jquery ? a6 : this.elements.target);
                        }
                    }
                    a6 = aX.target;
                    a6 = av(a6).eq(0);
                    if (a6.length === 0) {
                        return this;
                    } else {
                        if (a6[0] === a || a6[0] === b) {
                            aO = s.iOS ? b.innerWidth : a6.width();
                            aP = s.iOS ? b.innerHeight : a6.height();
                            if (a6[0] === b) {
                                a5 = {
                                    top: (a3 || a6).scrollTop(),
                                    left: (a3 || a6).scrollLeft()
                                };
                            }
                        } else {
                            if (aJ.imagemap && a6.is("area")) {
                                aR = aJ.imagemap(this, a6, aW, aJ.viewport ? X : H);
                            } else {
                                if (aJ.svg && a6 && a6[0].ownerSVGElement) {
                                    aR = aJ.svg(this, a6, aW, aJ.viewport ? X : H);
                                } else {
                                    aO = a6.outerWidth(H);
                                    aP = a6.outerHeight(H);
                                    a5 = a6.offset();
                                }
                            }
                        }
                    } if (aR) {
                        aO = aR.width;
                        aP = aR.height;
                        aN = aR.offset;
                        a5 = aR.position;
                    }
                    a5 = this.reposition.offset(a6, a5, aT);
                    if ((s.iOS > 3.1 && s.iOS < 4.1) || (s.iOS >= 4.3 && s.iOS < 4.33) || (!s.iOS && Y === "fixed")) {
                        a5.left -= aL.scrollLeft();
                        a5.top -= aL.scrollTop();
                    }
                    if (!aR || (aR && aR.adjustable !== H)) {
                        a5.left += aW.x === l ? aO : aW.x === J ? aO / 2 : 0;
                        a5.top += aW.y === aw ? aP : aW.y === J ? aP / 2 : 0;
                    }
                }
            }
            a5.left += a0.x + (aV.x === l ? -a2 : aV.x === J ? -a2 / 2 : 0);
            a5.top += a0.y + (aV.y === aw ? -aZ : aV.y === J ? -aZ / 2 : 0);
            if (aJ.viewport) {
                aK = a5.adjusted = aJ.viewport(this, a5, a4, aO, aP, a2, aZ);
                if (aN && aK.left) {
                    a5.left += aN.left;
                }
                if (aN && aK.top) {
                    a5.top += aN.top;
                }
                if (aK.my) {
                    this.position.my = aK.my;
                }
            } else {
                a5.adjusted = {
                    left: 0,
                    top: 0
                };
            } if (aX.posClass !== (aQ = this._createPosClass(this.position.my))) {
                aM.removeClass(aX.posClass).addClass((aX.posClass = aQ));
            }
            if (!this._trigger("move", [a5, a3.elem || a3], a1)) {
                return this;
            }
            delete a5.adjusted;
            if (aY === H || !C || isNaN(a5.left) || isNaN(a5.top) || a6 === "mouse" || !av.isFunction(a4.effect)) {
                aM.css(a5);
            } else {
                if (av.isFunction(a4.effect)) {
                    a4.effect.call(aM, this, av.extend({}, a5));
                    aM.queue(function (a8) {
                        av(this).css({
                            opacity: "",
                            height: ""
                        });
                        if (s.ie) {
                            this.style.removeAttribute("filter");
                        }
                        a8();
                    });
                }
            }
            this.positioning = H;
            return this;
        };
        aC.reposition.offset = function (aK, aO, X) {
            if (!X[0]) {
                return aO;
            }
            var aR = av(aK[0].ownerDocument),
                aN = !!s.ie && a.compatMode !== "CSS1Compat",
                aQ = X[0],
                Y, aM, C, aL;

            function aP(aT, aS) {
                aO.left += aS * aT.scrollLeft();
                aO.top += aS * aT.scrollTop();
            }
            do {
                if ((aM = av.css(aQ, "position")) !== "static") {
                    if (aM === "fixed") {
                        C = aQ.getBoundingClientRect();
                        aP(aR, -1);
                    } else {
                        C = av(aQ).position();
                        C.left += (parseFloat(av.css(aQ, "borderLeftWidth")) || 0);
                        C.top += (parseFloat(av.css(aQ, "borderTopWidth")) || 0);
                    }
                    aO.left -= C.left + (parseFloat(av.css(aQ, "marginLeft")) || 0);
                    aO.top -= C.top + (parseFloat(av.css(aQ, "marginTop")) || 0);
                    if (!Y && (aL = av.css(aQ, "overflow")) !== "hidden" && aL !== "visible") {
                        Y = av(aQ);
                    }
                }
            } while ((aQ = aQ.offsetParent));
            if (Y && (Y[0] !== aR[0] || aN)) {
                aP(Y, 1);
            }
            return aO;
        };
        var ai = (am = aC.reposition.Corner = function (X, C) {
            X = ("" + X).replace(/([A-Z])/, " $1").replace(/middle/gi, J).toLowerCase();
            this.x = (X.match(/left|right/i) || X.match(/center/) || ["inherit"])[0].toLowerCase();
            this.y = (X.match(/top|bottom|center/i) || ["inherit"])[0].toLowerCase();
            this.forceY = !!C;
            var Y = X.charAt(0);
            this.precedance = (Y === "t" || Y === "b" ? aa : ab);
        }).prototype;
        ai.invert = function (X, C) {
            this[X] = this[X] === d ? l : this[X] === l ? d : C || this[X];
        };
        ai.string = function (Y) {
            var X = this.x,
                aK = this.y;
            var C = X !== aK ? (X === "center" || aK !== "center" && (this.precedance === aa || this.forceY) ? [aK, X] : [X, aK]) : [X];
            return Y !== false ? C.join(" ") : C;
        };
        ai.abbrev = function () {
            var C = this.string(false);
            return C[0].charAt(0) + (C[1] && C[1].charAt(0) || "");
        };
        ai.clone = function () {
            return new am(this.string(), this.forceY);
        };
        aC.toggle = function (aN, aV) {
            var aT = this.cache,
                Y = this.options,
                aM = this.tooltip;
            if (aV) {
                if ((/over|enter/).test(aV.type) && aT.event && (/out|leave/).test(aT.event.type) && Y.show.target.add(aV.target).length === Y.show.target.length && aM.has(aV.relatedTarget).length) {
                    return this;
                }
                aT.event = av.event.fix(aV);
            }
            this.waiting && !aN && (this.hiddenDuringWait = S);
            if (!this.rendered) {
                return aN ? this.render(1) : this;
            } else {
                if (this.destroyed || this.disabled) {
                    return this;
                }
            }
            var aL = aN ? "show" : "hide",
                aS = this.options[aL],
                aR = this.options[!aN ? "show" : "hide"],
                aX = this.options.position,
                aP = this.options.content,
                aU = this.tooltip.css("width"),
                C = this.tooltip.is(":visible"),
                aO = aN || aS.target.length === 1,
                aQ = !aV || aS.target.length < 2 || aT.target[0] === aV.target,
                aW, aZ, aK, aY, X;
            if ((typeof aN).search("boolean|number")) {
                aN = !C;
            }
            aW = !aM.is(":animated") && C === aN && aQ;
            aZ = !aW ? !!this._trigger(aL, [90]) : ag;
            if (this.destroyed) {
                return this;
            }
            if (aZ !== H && aN) {
                this.focus(aV);
            }
            if (!aZ || aW) {
                return this;
            }
            av.attr(aM[0], "aria-hidden", !!!aN);
            if (aN) {
                this.mouse && (aT.origin = av.event.fix(this.mouse));
                if (av.isFunction(aP.text)) {
                    this._updateContent(aP.text, H);
                }
                if (av.isFunction(aP.title)) {
                    this._updateTitle(aP.title, H);
                }
                if (!aG && aX.target === "mouse" && aX.adjust.mouse) {
                    av(a).bind("mousemove." + q, this._storeMouse);
                    aG = S;
                }
                if (!aU) {
                    aM.css("width", aM.outerWidth(H));
                }
                this.reposition(aV, arguments[2]);
                if (!aU) {
                    aM.css("width", "");
                }
                if (!!aS.solo) {
                    (typeof aS.solo === "string" ? av(aS.solo) : av(y, aS.solo)).not(aM).not(aS.target).qtip("hide", av.Event("tooltipsolo"));
                }
            } else {
                clearTimeout(this.timers.show);
                delete aT.origin;
                if (aG && !av(y + '[tracking="true"]:visible', aS.solo).not(aM).length) {
                    av(a).unbind("mousemove." + q);
                    aG = H;
                }
                this.blur(aV);
            }
            X = av.proxy(function () {
                if (aN) {
                    if (s.ie) {
                        aM[0].style.removeAttribute("filter");
                    }
                    aM.css("overflow", "");
                    if ("string" === typeof aS.autofocus) {
                        av(this.options.show.autofocus, aM).focus();
                    }
                    this.options.show.target.trigger("qtip-" + this.id + "-inactive");
                } else {
                    aM.css({
                        display: "",
                        visibility: "",
                        opacity: "",
                        left: "",
                        top: ""
                    });
                }
                this._trigger(aN ? "visible" : "hidden");
            }, this);
            if (aS.effect === H || aO === H) {
                aM[aL]();
                X();
            } else {
                if (av.isFunction(aS.effect)) {
                    aM.stop(1, 1);
                    aS.effect.call(aM, this);
                    aM.queue("fx", function (a0) {
                        X();
                        a0();
                    });
                } else {
                    aM.fadeTo(90, aN ? 1 : 0, X);
                }
            } if (aN) {
                aS.target.trigger("qtip-" + this.id + "-inactive");
            }
            return this;
        };
        aC.show = function (C) {
            return this.toggle(S, C);
        };
        aC.hide = function (C) {
            return this.toggle(H, C);
        };
        aC.focus = function (aK) {
            if (!this.rendered || this.destroyed) {
                return this;
            }
            var aM = av(y),
                aL = this.tooltip,
                Y = parseInt(aL[0].style.zIndex, 10),
                X = z.zindex + aM.length,
                C;
            if (!aL.hasClass(O)) {
                if (this._trigger("focus", [X], aK)) {
                    if (Y !== X) {
                        aM.each(function () {
                            if (this.style.zIndex > Y) {
                                this.style.zIndex = this.style.zIndex - 1;
                            }
                        });
                        aM.filter("." + O).qtip("blur", aK);
                    }
                    aL.addClass(O)[0].style.zIndex = X;
                }
            }
            return this;
        };
        aC.blur = function (C) {
            if (!this.rendered || this.destroyed) {
                return this;
            }
            this.tooltip.removeClass(O);
            this._trigger("blur", [this.tooltip.css("zIndex")], C);
            return this;
        };
        aC.disable = function (C) {
            if (this.destroyed) {
                return this;
            }
            if (C === "toggle") {
                C = !(this.rendered ? this.tooltip.hasClass(V) : this.disabled);
            } else {
                if ("boolean" !== typeof C) {
                    C = S;
                }
            } if (this.rendered) {
                this.tooltip.toggleClass(V, C).attr("aria-disabled", C);
            }
            this.disabled = !!C;
            return this;
        };
        aC.enable = function () {
            return this.disable(H);
        };
        aC._createButton = function () {
            var X = this,
                aL = this.elements,
                aK = aL.tooltip,
                Y = this.options.content.button,
                C = typeof Y === "string",
                aM = C ? Y : "Close tooltip";
            if (aL.button) {
                aL.button.remove();
            }
            if (Y.jquery) {
                aL.button = Y;
            } else {
                aL.button = av("<a />", {
                    "class": "qtip-close " + (this.options.style.widget ? "" : q + "-icon"),
                    title: aM,
                    "aria-label": aM
                }).prepend(av("<span />", {
                    "class": "ui-icon ui-icon-close",
                    html: "&times;"
                }));
            }
            aL.button.appendTo(aL.titlebar || aK).attr("role", "button").on("click", function (aN) {
                if (!aK.hasClass(V)) {
                    X.hide(aN);
                }
                return H;
            });
        };
        aC._updateButton = function (C) {
            if (!this.rendered) {
                return H;
            }
            var X = this.elements.button;
            if (C) {
                this._createButton();
            } else {
                X.remove();
            }
        };

        function aE(C) {
            return al.concat("").join(C ? "-" + C + " " : " ");
        }
        aC._setWidget = function () {
            var C = this.options.style.widget,
                aK = this.elements,
                Y = aK.tooltip,
                X = Y.hasClass(V);
            Y.removeClass(V);
            V = C ? "ui-state-disabled" : "qtip-disabled";
            Y.toggleClass(V, X);
            Y.toggleClass("ui-helper-reset " + aE(), C).toggleClass(Q, this.options.style.def && !C);
            if (aK.content) {
                aK.content.toggleClass(aE("content"), C);
            }
            if (aK.titlebar) {
                aK.titlebar.toggleClass(aE("header"), C);
            }
            if (aK.button) {
                aK.button.toggleClass(q + "-icon", !C);
            }
        };

        function e(X, C) {
            if (C > 0) {
                return setTimeout(av.proxy(X, this), C);
            } else {
                X.call(this);
            }
        }

        function L(C) {
            if (this.tooltip.hasClass(V)) {
                return;
            }
            clearTimeout(this.timers.show);
            clearTimeout(this.timers.hide);
            this.timers.show = e.call(this, function () {
                this.toggle(S, C);
            }, this.options.show.delay);
        }

        function h(aK) {
            if (this.tooltip.hasClass(V) || this.destroyed) {
                return;
            }
            var X = av(aK.relatedTarget),
                C = X.closest(y)[0] === this.tooltip[0],
                Y = X[0] === this.options.show.target[0];
            clearTimeout(this.timers.show);
            clearTimeout(this.timers.hide);
            if (this !== X[0] && (this.options.position.target === "mouse" && C) || (this.options.hide.fixed && ((/mouse(out|leave|move)/).test(aK.type) && (C || Y)))) {
                try {
                    aK.preventDefault();
                    aK.stopImmediatePropagation();
                } catch (aL) {}
                return;
            }
            this.timers.hide = e.call(this, function () {
                this.toggle(H, aK);
            }, this.options.hide.delay, this);
        }

        function j(C) {
            if (this.tooltip.hasClass(V) || !this.options.hide.inactive) {
                return;
            }
            clearTimeout(this.timers.inactive);
            this.timers.inactive = e.call(this, function () {
                this.hide(C);
            }, this.options.hide.inactive);
        }

        function aj(C) {
            if (this.rendered && this.tooltip[0].offsetWidth > 0) {
                this.reposition(C);
            }
        }
        aC._storeMouse = function (C) {
            (this.mouse = av.event.fix(C)).type = "mousemove";
            return this;
        };
        aC._bind = function (C, Y, aM, aL, X) {
            if (!C || !aM || !Y.length) {
                return;
            }
            var aK = "." + this._id + (aL ? "-" + aL : "");
            av(C).bind((Y.split ? Y : Y.join(aK + " ")) + aK, av.proxy(aM, X || this));
            return this;
        };
        aC._unbind = function (C, X) {
            C && av(C).unbind("." + this._id + (X ? "-" + X : ""));
            return this;
        };

        function ar(C, X, Y) {
            av(a.body).delegate(C, (X.split ? X : X.join("." + q + " ")) + "." + q, function () {
                var aK = z.api[av.attr(this, ad)];
                aK && !aK.disabled && Y.apply(aK, arguments);
            });
        }
        aC._trigger = function (X, C, Y) {
            var aK = av.Event("tooltip" + X);
            aK.originalEvent = (Y && av.extend({}, Y)) || this.cache.event || ag;
            this.triggering = X;
            this.tooltip.trigger(aK, [this].concat(C || []));
            this.triggering = H;
            return !aK.isDefaultPrevented();
        };
        aC._bindEvents = function (C, aO, X, Y, aL, aK) {
            var aN = X.filter(Y).add(Y.filter(X)),
                aM = [];
            if (aN.length) {
                av.each(aO, function (aQ, aR) {
                    var aP = av.inArray(aR, C);
                    aP > -1 && aM.push(C.splice(aP, 1)[0]);
                });
                if (aM.length) {
                    this._bind(aN, aM, function (aP) {
                        var aQ = this.rendered ? this.tooltip[0].offsetWidth > 0 : false;
                        (aQ ? aK : aL).call(this, aP);
                    });
                    X = X.not(aN);
                    Y = Y.not(aN);
                }
            }
            this._bind(X, C, aL);
            this._bind(Y, aO, aK);
        };
        aC._assignInitialEvents = function (aL) {
            var X = this.options,
                aK = X.show.target,
                Y = X.hide.target,
                C = X.show.event ? av.trim("" + X.show.event).split(" ") : [],
                aN = X.hide.event ? av.trim("" + X.hide.event).split(" ") : [];
            this._bind(this.elements.target, ["remove", "removeqtip"], function (aO) {
                this.destroy(true);
            }, "destroy");
            if (/mouse(over|enter)/i.test(X.show.event) && !/mouse(out|leave)/i.test(X.hide.event)) {
                aN.push("mouseleave");
            }
            this._bind(aK, "mousemove", function (aO) {
                this._storeMouse(aO);
                this.cache.onTarget = S;
            });

            function aM(aO) {
                if (this.disabled || this.destroyed) {
                    return H;
                }
                this.cache.event = aO && av.event.fix(aO);
                this.cache.target = aO && av(aO.target);
                clearTimeout(this.timers.show);
                this.timers.show = e.call(this, function () {
                    this.render(typeof aO === "object" || X.show.ready);
                }, X.prerender ? 0 : X.show.delay);
            }
            this._bindEvents(C, aN, aK, Y, aM, function () {
                if (!this.timers) {
                    return H;
                }
                clearTimeout(this.timers.show);
            });
            if (X.show.ready || X.prerender) {
                aM.call(this, aL);
            }
        };
        aC._assignEvents = function () {
            var aR = this,
                aT = this.options,
                aP = aT.position,
                aS = this.tooltip,
                aL = aT.show.target,
                aO = aT.hide.target,
                aM = aP.container,
                X = aP.viewport,
                aK = av(a),
                Y = av(a.body),
                aN = av(b),
                C = aT.show.event ? av.trim("" + aT.show.event).split(" ") : [],
                aQ = aT.hide.event ? av.trim("" + aT.hide.event).split(" ") : [];
            av.each(aT.events, function (aU, aV) {
                aR._bind(aS, aU === "toggle" ? ["tooltipshow", "tooltiphide"] : ["tooltip" + aU], aV, null, aS);
            });
            if (/mouse(out|leave)/i.test(aT.hide.event) && aT.hide.leave === "window") {
                this._bind(aK, ["mouseout", "blur"], function (aU) {
                    if (!/select|option/.test(aU.target.nodeName) && !aU.relatedTarget) {
                        this.hide(aU);
                    }
                });
            }
            if (aT.hide.fixed) {
                aO = aO.add(aS.addClass(D));
            } else {
                if (/mouse(over|enter)/i.test(aT.show.event)) {
                    this._bind(aO, "mouseleave", function () {
                        clearTimeout(this.timers.show);
                    });
                }
            } if (("" + aT.hide.event).indexOf("unfocus") > -1) {
                this._bind(aM.closest("html"), ["mousedown", "touchstart"], function (aX) {
                    var aW = av(aX.target),
                        aV = this.rendered && !this.tooltip.hasClass(V) && this.tooltip[0].offsetWidth > 0,
                        aU = aW.parents(y).filter(this.tooltip[0]).length > 0;
                    if (aW[0] !== this.target[0] && aW[0] !== this.tooltip[0] && !aU && !this.target.has(aW[0]).length && aV) {
                        this.hide(aX);
                    }
                });
            }
            if ("number" === typeof aT.hide.inactive) {
                this._bind(aL, "qtip-" + this.id + "-inactive", j, "inactive");
                this._bind(aO.add(aS), z.inactiveEvents, j);
            }
            this._bindEvents(C, aQ, aL, aO, L, h);
            this._bind(aL.add(aS), "mousemove", function (aX) {
                if ("number" === typeof aT.hide.distance) {
                    var aW = this.cache.origin || {},
                        aV = this.options.hide.distance,
                        aU = Math.abs;
                    if (aU(aX.pageX - aW.pageX) >= aV || aU(aX.pageY - aW.pageY) >= aV) {
                        this.hide(aX);
                    }
                }
                this._storeMouse(aX);
            });
            if (aP.target === "mouse") {
                if (aP.adjust.mouse) {
                    if (aT.hide.event) {
                        this._bind(aL, ["mouseenter", "mouseleave"], function (aU) {
                            if (!this.cache) {
                                return H;
                            }
                            this.cache.onTarget = aU.type === "mouseenter";
                        });
                    }
                    this._bind(aK, "mousemove", function (aU) {
                        if (this.rendered && this.cache.onTarget && !this.tooltip.hasClass(V) && this.tooltip[0].offsetWidth > 0) {
                            this.reposition(aU);
                        }
                    });
                }
            }
            if (aP.adjust.resize || X.length) {
                this._bind(av.event.special.resize ? X : aN, "resize", aj);
            }
            if (aP.adjust.scroll) {
                this._bind(aN.add(aP.container), "scroll", aj);
            }
        };
        aC._unassignEvents = function () {
            var X = this.options,
                Y = X.show.target,
                aK = X.hide.target,
                C = av.grep([this.elements.target[0], this.rendered && this.tooltip[0], X.position.container[0], X.position.viewport[0], X.position.container.closest("html")[0], b, a], function (aL) {
                    return typeof aL === "object";
                });
            if (Y && Y.toArray) {
                C = C.concat(Y.toArray());
            }
            if (aK && aK.toArray) {
                C = C.concat(aK.toArray());
            }
            this._unbind(C)._unbind(C, "destroy")._unbind(C, "inactive");
        };
        av(function () {
            ar(y, ["mouseenter", "mouseleave"], function (X) {
                var aK = X.type === "mouseenter",
                    Y = av(X.currentTarget),
                    aL = av(X.relatedTarget || X.target),
                    C = this.options;
                if (aK) {
                    this.focus(X);
                    Y.hasClass(D) && !Y.hasClass(V) && clearTimeout(this.timers.hide);
                } else {
                    if (C.position.target === "mouse" && C.position.adjust.mouse && C.hide.event && C.show.target && !aL.closest(C.show.target[0]).length) {
                        this.hide(X);
                    }
                }
                Y.toggleClass(aI, aK);
            });
            ar("[" + ad + "]", ae, j);
        });

        function ah(aK, X, C) {
            var aL, aU, aP, Y, aS, aM = av(a.body),
                aR = aK[0] === a ? aM : aK,
                aQ = (aK.metadata) ? aK.metadata(C.metadata) : ag,
                aT = C.metadata.type === "html5" && aQ ? aQ[C.metadata.name] : ag,
                aN = aK.data(C.metadata.name || "qtipopts");
            try {
                aN = typeof aN === "string" ? av.parseJSON(aN) : aN;
            } catch (aO) {}
            Y = av.extend(S, {}, z.defaults, C, typeof aN === "object" ? v(aN) : ag, v(aT || aQ));
            aU = Y.position;
            Y.id = X;
            if ("boolean" === typeof Y.content.text) {
                aP = aK.attr(Y.content.attr);
                if (Y.content.attr !== H && aP) {
                    Y.content.text = aP;
                } else {
                    return H;
                }
            }
            if (!aU.container.length) {
                aU.container = aM;
            }
            if (aU.target === H) {
                aU.target = aR;
            }
            if (Y.show.target === H) {
                Y.show.target = aR;
            }
            if (Y.show.solo === S) {
                Y.show.solo = aU.container.closest("body");
            }
            if (Y.hide.target === H) {
                Y.hide.target = aR;
            }
            if (Y.position.viewport === S) {
                Y.position.viewport = aU.container;
            }
            aU.container = aU.container.eq(0);
            aU.at = new am(aU.at, S);
            aU.my = new am(aU.my);
            if (aK.data(q)) {
                if (Y.overwrite) {
                    aK.qtip("destroy", true);
                } else {
                    if (Y.overwrite === H) {
                        return H;
                    }
                }
            }
            aK.attr(F, X);
            if (Y.suppress && (aS = aK.attr("title"))) {
                aK.removeAttr("title").attr(G, aS).attr("title", "");
            }
            aL = new ay(aK, Y, X, !!aP);
            aK.data(q, aL);
            return aL;
        }
        z = av.fn.qtip = function (X, aM, aN) {
            var aO = ("" + X).toLowerCase(),
                aL = ag,
                C = av.makeArray(arguments).slice(1),
                aK = C[C.length - 1],
                Y = this[0] ? av.data(this[0], q) : ag;
            if ((!arguments.length && Y) || aO === "api") {
                return Y;
            } else {
                if ("string" === typeof X) {
                    this.each(function () {
                        var aP = av.data(this, q);
                        if (!aP) {
                            return S;
                        }
                        if (aK && aK.timeStamp) {
                            aP.cache.event = aK;
                        }
                        if (aM && (aO === "option" || aO === "options")) {
                            if (aN !== c || av.isPlainObject(aM)) {
                                aP.set(aM, aN);
                            } else {
                                aL = aP.get(aM);
                                return H;
                            }
                        } else {
                            if (aP[aO]) {
                                aP[aO].apply(aP, C);
                            }
                        }
                    });
                    return aL !== ag ? aL : this;
                } else {
                    if ("object" === typeof X || !arguments.length) {
                        Y = v(av.extend(S, {}, X));
                        return this.each(function (aP) {
                            var aQ, aR;
                            aR = av.isArray(Y.id) ? Y.id[aP] : Y.id;
                            aR = !aR || aR === H || aR.length < 1 || z.api[aR] ? z.nextid++ : aR;
                            aQ = ah(av(this), aR, Y);
                            if (aQ === H) {
                                return S;
                            } else {
                                z.api[aR] = aQ;
                            }
                            av.each(aJ, function () {
                                if (this.initialize === "initialize") {
                                    this(aQ);
                                }
                            });
                            aQ._assignInitialEvents(aK);
                        });
                    }
                }
            }
        };
        av.qtip = ay;
        z.api = {};
        av.each({
            attr: function (C, aL) {
                if (this.length) {
                    var X = this[0],
                        aK = "title",
                        Y = av.data(X, "qtip");
                    if (C === aK && Y && "object" === typeof Y && Y.options.suppress) {
                        if (arguments.length < 2) {
                            return av.attr(X, G);
                        }
                        if (Y && Y.options.content.attr === aK && Y.cache.attr) {
                            Y.set("content.text", aL);
                        }
                        return this.attr(G, aL);
                    }
                }
                return av.fn["attr" + aH].apply(this, arguments);
            },
            clone: function (X) {
                var aK = av([]),
                    Y = "title",
                    C = av.fn["clone" + aH].apply(this, arguments);
                if (!X) {
                    C.filter("[" + G + "]").attr("title", function () {
                        return av.attr(this, G);
                    }).removeAttr(G);
                }
                return C;
            }
        }, function (X, Y) {
            if (!Y || av.fn[X + aH]) {
                return S;
            }
            var C = av.fn[X + aH] = av.fn[X];
            av.fn[X] = function () {
                return Y.apply(this, arguments) || C.apply(this, arguments);
            };
        });
        if (!av.ui) {
            av["cleanData" + aH] = av.cleanData;
            av.cleanData = function (C) {
                for (var X = 0, Y;
                    (Y = av(C[X])).length; X++) {
                    if (Y.attr(F)) {
                        try {
                            Y.triggerHandler("removeqtip");
                        } catch (aK) {}
                    }
                }
                av["cleanData" + aH].apply(this, arguments);
            };
        }
        z.version = "2.2.1";
        z.nextid = 0;
        z.inactiveEvents = ae;
        z.zindex = 15000;
        z.defaults = {
            prerender: H,
            id: H,
            overwrite: S,
            suppress: S,
            content: {
                text: S,
                attr: "title",
                title: H,
                button: H
            },
            position: {
                my: "top left",
                at: "bottom right",
                target: H,
                container: H,
                viewport: H,
                adjust: {
                    x: 0,
                    y: 0,
                    mouse: S,
                    scroll: S,
                    resize: S,
                    method: "flipinvert flipinvert"
                },
                effect: function (X, Y, C) {
                    av(this).animate(Y, {
                        duration: 200,
                        queue: H
                    });
                }
            },
            show: {
                target: H,
                event: "mouseenter",
                effect: S,
                delay: 90,
                solo: H,
                ready: H,
                autofocus: H
            },
            hide: {
                target: H,
                event: "mouseleave",
                effect: S,
                delay: 0,
                fixed: H,
                inactive: H,
                leave: "window",
                distance: H
            },
            style: {
                classes: "",
                widget: H,
                width: H,
                height: H,
                def: S
            },
            events: {
                render: ag,
                move: ag,
                show: ag,
                hide: ag,
                toggle: ag,
                visible: ag,
                hidden: ag,
                focus: ag,
                blur: ag
            }
        };
        var k, U = ".qtip-tip",
            P = "margin",
            az = "border",
            au = "color",
            ap = "background-color",
            ak = "transparent",
            at = " !important",
            ax = !!a.createElement("canvas").getContext,
            f = /rgba?\(0, 0, 0(, 0)?\)|transparent|#123456/i;

        function W(C) {
            return C.charAt(0).toUpperCase() + C.slice(1);
        }
        var E = {},
            I = ["Webkit", "O", "Moz", "ms"];

        function n(aK, aN) {
            var C = aN.charAt(0).toUpperCase() + aN.slice(1),
                Y = (aN + " " + I.join(C + " ") + C).split(" "),
                aM, aL, X = 0;
            if (E[aN]) {
                return aK.css(E[aN]);
            }
            while ((aM = Y[X++])) {
                if ((aL = aK.css(aM)) !== c) {
                    return E[aN] = aM, aL;
                }
            }
        }

        function K(C, X) {
            return Math.ceil(parseFloat(n(C, X)));
        }
        if (!ax) {
            var aB = function (C, Y, X) {
                return "<qtipvml:" + C + ' xmlns="urn:schemas-microsoft.com:vml" class="qtip-vml" ' + (Y || "") + ' style="behavior: url(#default#VML); ' + (X || "") + '" />';
            };
        } else {
            var w = b.devicePixelRatio || 1,
                aD = (function () {
                    var C = a.createElement("canvas").getContext("2d");
                    return C.backingStorePixelRatio || C.webkitBackingStorePixelRatio || C.mozBackingStorePixelRatio || C.msBackingStorePixelRatio || C.oBackingStorePixelRatio || 1;
                }()),
                N = w / aD;
        }

        function aq(X, C) {
            this._ns = "tip";
            this.options = C;
            this.offset = C.offset;
            this.size = [C.width, C.height];
            this.init((this.qtip = X));
        }
        av.extend(aq.prototype, {
            init: function (Y) {
                var C, X;
                X = this.element = Y.elements.tip = av("<div />", {
                    "class": q + "-tip"
                }).prependTo(Y.tooltip);
                if (ax) {
                    C = av("<canvas />").appendTo(this.element)[0].getContext("2d");
                    C.lineJoin = "miter";
                    C.miterLimit = 100000;
                    C.save();
                } else {
                    C = aB("shape", 'coordorigin="0,0"', "position:absolute;");
                    this.element.html(C + C);
                    Y._bind(av("*", X).add(X), ["click", "mousedown"], function (aK) {
                        aK.stopPropagation();
                    }, this._ns);
                }
                Y._bind(Y.tooltip, "tooltipmove", this.reposition, this._ns, this);
                this.create();
            },
            _swapDimensions: function () {
                this.size[0] = this.options.height;
                this.size[1] = this.options.width;
            },
            _resetDimensions: function () {
                this.size[0] = this.options.width;
                this.size[1] = this.options.height;
            },
            _useTitle: function (C) {
                var X = this.qtip.elements.titlebar;
                return X && (C.y === o || (C.y === J && this.element.position().top + (this.size[1] / 2) + this.options.offset < X.outerHeight(S)));
            },
            _parseCorner: function (C) {
                var X = this.qtip.options.position.my;
                if (C === H || X === H) {
                    C = H;
                } else {
                    if (C === S) {
                        C = new am(X.string());
                    } else {
                        if (!C.string) {
                            C = new am(C);
                            C.fixed = S;
                        }
                    }
                }
                return C;
            },
            _parseWidth: function (Y, X, C) {
                var aK = this.qtip.elements,
                    aL = az + W(X) + "Width";
                return (C ? K(C, aL) : (K(aK.content, aL) || K(this._useTitle(Y) && aK.titlebar || aK.content, aL) || K(aK.tooltip, aL))) || 0;
            },
            _parseRadius: function (C) {
                var X = this.qtip.elements,
                    Y = az + W(C.y) + W(C.x) + "Radius";
                return s.ie < 9 ? 0 : K(this._useTitle(C) && X.titlebar || X.content, Y) || K(X.tooltip, Y) || 0;
            },
            _invalidColour: function (C, aK, X) {
                var Y = C.css(aK);
                return !Y || (X && Y === C.css(X)) || f.test(Y) ? H : Y;
            },
            _parseColours: function (aL) {
                var aN = this.qtip.elements,
                    aM = this.element.css("cssText", ""),
                    aK = az + W(aL[aL.precedance]) + W(au),
                    X = this._useTitle(aL) && aN.titlebar || aN.content,
                    Y = this._invalidColour,
                    C = [];
                C[0] = Y(aM, ap) || Y(X, ap) || Y(aN.content, ap) || Y(aN.tooltip, ap) || aM.css(ap);
                C[1] = Y(aM, aK, au) || Y(X, aK, au) || Y(aN.content, aK, au) || Y(aN.tooltip, aK, au) || aN.tooltip.css(aK);
                av("*", aM).add(aM).css("cssText", ap + ":" + ak + at + ";" + az + ":0" + at + ";");
                return C;
            },
            _calculateSize: function (aQ) {
                var aO = aQ.precedance === aa,
                    X = this.options.width,
                    aR = this.options.height,
                    aN = aQ.abbrev() === "c",
                    C = (aO ? X : aR) * (aN ? 0.5 : 1),
                    aK = Math.pow,
                    aS = Math.round,
                    aP, aM, aT, Y = Math.sqrt(aK(C, 2) + aK(aR, 2)),
                    aL = [(this.border / C) * Y, (this.border / aR) * Y];
                aL[2] = Math.sqrt(aK(aL[0], 2) - aK(this.border, 2));
                aL[3] = Math.sqrt(aK(aL[1], 2) - aK(this.border, 2));
                aP = Y + aL[2] + aL[3] + (aN ? 0 : aL[0]);
                aM = aP / Y;
                aT = [aS(aM * X), aS(aM * aR)];
                return aO ? aT : aT.reverse();
            },
            _calculateTip: function (aN, Y, aO) {
                aO = aO || 1;
                Y = Y || this.size;
                var aL = Y[0] * aO,
                    X = Y[1] * aO,
                    aK = Math.ceil(aL / 2),
                    aM = Math.ceil(X / 2),
                    C = {
                        br: [0, 0, aL, X, aL, 0],
                        bl: [0, 0, aL, 0, 0, X],
                        tr: [0, X, aL, 0, aL, X],
                        tl: [0, 0, 0, X, aL, X],
                        tc: [0, X, aK, 0, aL, X],
                        bc: [0, 0, aL, 0, aK, X],
                        rc: [0, 0, aL, aM, 0, X],
                        lc: [aL, 0, aL, X, 0, aM]
                    };
                C.lt = C.br;
                C.rt = C.bl;
                C.lb = C.tr;
                C.rb = C.tl;
                return C[aN.abbrev()];
            },
            _drawCoords: function (C, X) {
                C.beginPath();
                C.moveTo(X[0], X[1]);
                C.lineTo(X[2], X[3]);
                C.lineTo(X[4], X[5]);
                C.closePath();
            },
            create: function () {
                var C = this.corner = (ax || s.ie) && this._parseCorner(this.options.corner);
                if ((this.enabled = !!this.corner && this.corner.abbrev() !== "c")) {
                    this.qtip.cache.corner = C.clone();
                    this.update();
                }
                this.element.toggle(this.enabled);
                return this.corner;
            },
            update: function (aK, aY) {
                if (!this.enabled) {
                    return this;
                }
                var aN = this.qtip.elements,
                    aM = this.element,
                    aX = aM.children(),
                    Y = this.options,
                    aQ = this.size,
                    aV = Y.mimic,
                    aW = Math.round,
                    aS, aO, X, aU, aP, aL, C, aR, aT;
                if (!aK) {
                    aK = this.qtip.cache.corner || this.corner;
                }
                if (aV === H) {
                    aV = aK;
                } else {
                    aV = new am(aV);
                    aV.precedance = aK.precedance;
                    if (aV.x === "inherit") {
                        aV.x = aK.x;
                    } else {
                        if (aV.y === "inherit") {
                            aV.y = aK.y;
                        } else {
                            if (aV.x === aV.y) {
                                aV[aK.precedance] = aK[aK.precedance];
                            }
                        }
                    }
                }
                aO = aV.precedance;
                if (aK.precedance === ab) {
                    this._swapDimensions();
                } else {
                    this._resetDimensions();
                }
                aS = this.color = this._parseColours(aK);
                if (aS[1] !== ak) {
                    aR = this.border = this._parseWidth(aK, aK[aK.precedance]);
                    if (Y.border && aR < 1 && !f.test(aS[1])) {
                        aS[0] = aS[1];
                    }
                    this.border = aR = Y.border !== S ? Y.border : aR;
                } else {
                    this.border = aR = 0;
                }
                C = this.size = this._calculateSize(aK);
                aM.css({
                    width: C[0],
                    height: C[1],
                    lineHeight: C[1] + "px"
                });
                if (aK.precedance === aa) {
                    aL = [aW(aV.x === d ? aR : aV.x === l ? C[0] - aQ[0] - aR : (C[0] - aQ[0]) / 2), aW(aV.y === o ? C[1] - aQ[1] : 0)];
                } else {
                    aL = [aW(aV.x === d ? C[0] - aQ[0] : 0), aW(aV.y === o ? aR : aV.y === aw ? C[1] - aQ[1] - aR : (C[1] - aQ[1]) / 2)];
                } if (ax) {
                    X = aX[0].getContext("2d");
                    X.restore();
                    X.save();
                    X.clearRect(0, 0, 6000, 6000);
                    aU = this._calculateTip(aV, aQ, N);
                    aP = this._calculateTip(aV, this.size, N);
                    aX.attr(M, C[0] * N).attr(aA, C[1] * N);
                    aX.css(M, C[0]).css(aA, C[1]);
                    this._drawCoords(X, aP);
                    X.fillStyle = aS[1];
                    X.fill();
                    X.translate(aL[0] * N, aL[1] * N);
                    this._drawCoords(X, aU);
                    X.fillStyle = aS[0];
                    X.fill();
                } else {
                    aU = this._calculateTip(aV);
                    aU = "m" + aU[0] + "," + aU[1] + " l" + aU[2] + "," + aU[3] + " " + aU[4] + "," + aU[5] + " xe";
                    aL[2] = aR && /^(r|b)/i.test(aK.string()) ? s.ie === 8 ? 2 : 1 : 0;
                    aX.css({
                        coordsize: (C[0] + aR) + " " + (C[1] + aR),
                        antialias: "" + (aV.string().indexOf(J) > -1),
                        left: aL[0] - (aL[2] * Number(aO === ab)),
                        top: aL[1] - (aL[2] * Number(aO === aa)),
                        width: C[0] + aR,
                        height: C[1] + aR
                    }).each(function (aZ) {
                        var a0 = av(this);
                        a0[a0.prop ? "prop" : "attr"]({
                            coordsize: (C[0] + aR) + " " + (C[1] + aR),
                            path: aU,
                            fillcolor: aS[0],
                            filled: !!aZ,
                            stroked: !aZ
                        }).toggle(!!(aR || aZ));
                        !aZ && a0.html(aB("stroke", 'weight="' + (aR * 2) + 'px" color="' + aS[1] + '" miterlimit="1000" joinstyle="miter"'));
                    });
                }
                b.opera && setTimeout(function () {
                    aN.tip.css({
                        display: "inline-block",
                        visibility: "visible"
                    });
                }, 1);
                if (aY !== H) {
                    this.calculate(aK, C);
                }
            },
            calculate: function (aO, aQ) {
                if (!this.enabled) {
                    return H;
                }
                var aP = this,
                    C = this.qtip.elements,
                    aN = this.element,
                    X = this.options.offset,
                    aK = C.tooltip.hasClass("ui-widget"),
                    aM = {},
                    Y, aL;
                aO = aO || this.corner;
                Y = aO.precedance;
                aQ = aQ || this._calculateSize(aO);
                aL = [aO.x, aO.y];
                if (Y === ab) {
                    aL.reverse();
                }
                av.each(aL, function (aU, aT) {
                    var aR, aV, aS;
                    if (aT === J) {
                        aR = Y === aa ? d : o;
                        aM[aR] = "50%";
                        aM[P + "-" + aR] = -Math.round(aQ[Y === aa ? 0 : 1] / 2) + X;
                    } else {
                        aR = aP._parseWidth(aO, aT, C.tooltip);
                        aV = aP._parseWidth(aO, aT, C.content);
                        aS = aP._parseRadius(aO);
                        aM[aT] = Math.max(-aP.border, aU ? aV : (X + (aS > aR ? aS : -aR)));
                    }
                });
                aM[aO[Y]] -= aQ[Y === ab ? 0 : 1];
                aN.css({
                    margin: "",
                    top: "",
                    bottom: "",
                    left: "",
                    right: ""
                }).css(aM);
                return aM;
            },
            reposition: function (aK, aQ, aU, aR) {
                if (!this.enabled) {
                    return;
                }
                var X = aQ.cache,
                    aW = this.corner.clone(),
                    aV = aU.adjusted,
                    C = aQ.options.position.adjust.method.split(" "),
                    Y = C[0],
                    aM = C[1] || C[0],
                    aL = {
                        left: H,
                        top: H,
                        x: 0,
                        y: 0
                    },
                    aO, aP = {},
                    aS;

                function aT(a0, aX, a1, aY, aZ) {
                    if (a0 === p && aW.precedance === aX && aV[aY] && aW[a1] !== J) {
                        aW.precedance = aW.precedance === ab ? aa : ab;
                    } else {
                        if (a0 !== p && aV[aY]) {
                            aW[aX] = aW[aX] === J ? (aV[aY] > 0 ? aY : aZ) : (aW[aX] === aY ? aZ : aY);
                        }
                    }
                }

                function aN(aZ, aX, aY) {
                    if (aW[aZ] === J) {
                        aP[P + "-" + aX] = aL[aZ] = aO[P + "-" + aX] - aV[aX];
                    } else {
                        aS = aO[aY] !== c ? [aV[aX], -aO[aX]] : [-aV[aX], aO[aX]];
                        if ((aL[aZ] = Math.max(aS[0], aS[1])) > aS[0]) {
                            aU[aX] -= aV[aX];
                            aL[aX] = H;
                        }
                        aP[aO[aY] !== c ? aY : aX] = aL[aZ];
                    }
                }
                if (this.corner.fixed !== S) {
                    aT(Y, ab, aa, d, l);
                    aT(aM, aa, ab, o, aw);
                    if (aW.string() !== X.corner.string() || X.cornerTop !== aV.top || X.cornerLeft !== aV.left) {
                        this.update(aW, H);
                    }
                }
                aO = this.calculate(aW);
                if (aO.right !== c) {
                    aO.left = -aO.right;
                }
                if (aO.bottom !== c) {
                    aO.top = -aO.bottom;
                }
                aO.user = this.offset;
                if (aL.left = (Y === p && !!aV.left)) {
                    aN(ab, d, l);
                }
                if (aL.top = (aM === p && !!aV.top)) {
                    aN(aa, o, aw);
                }
                this.element.css(aP).toggle(!((aL.x && aL.y) || (aW.x === J && aL.y) || (aW.y === J && aL.x)));
                aU.left -= aO.left.charAt ? aO.user : Y !== p || aL.top || !aL.left && !aL.top ? aO.left + this.border : 0;
                aU.top -= aO.top.charAt ? aO.user : aM !== p || aL.left || !aL.left && !aL.top ? aO.top + this.border : 0;
                X.cornerLeft = aV.left;
                X.cornerTop = aV.top;
                X.corner = aW.clone();
            },
            destroy: function () {
                this.qtip._unbind(this.qtip.tooltip, this._ns);
                if (this.qtip.elements.tip) {
                    this.qtip.elements.tip.find("*").remove().end().remove();
                }
            }
        });
        k = aJ.tip = function (C) {
            return new aq(C, C.options.style.tip);
        };
        k.initialize = "render";
        k.sanitize = function (C) {
            if (C.style && "tip" in C.style) {
                var X = C.style.tip;
                if (typeof X !== "object") {
                    X = C.style.tip = {
                        corner: X
                    };
                }
                if (!(/string|boolean/i).test(typeof X.corner)) {
                    X.corner = S;
                }
            }
        };
        i.tip = {
            "^position.my|style.tip.(corner|mimic|border)$": function () {
                this.create();
                this.qtip.reposition();
            },
            "^style.tip.(height|width)$": function (C) {
                this.size = [C.width, C.height];
                this.update();
                this.qtip.reposition();
            },
            "^content.title|style.(classes|widget)$": function () {
                this.update();
            }
        };
        av.extend(S, z.defaults, {
            style: {
                tip: {
                    corner: S,
                    mimic: H,
                    width: 6,
                    height: 6,
                    border: S,
                    offset: 0
                }
            }
        });
        var T, m, t = "qtip-modal",
            an = "." + t;
        m = function () {
            var aP = this,
                aN = {},
                X, Y, aM, C;

            function aL(aS) {
                if (av.expr[":"].focusable) {
                    return av.expr[":"].focusable;
                }
                var aQ = !isNaN(av.attr(aS, "tabindex")),
                    aV = aS.nodeName && aS.nodeName.toLowerCase(),
                    aU, aT, aR;
                if ("area" === aV) {
                    aU = aS.parentNode;
                    aT = aU.name;
                    if (!aS.href || !aT || aU.nodeName.toLowerCase() !== "map") {
                        return false;
                    }
                    aR = av("img[usemap=#" + aT + "]")[0];
                    return !!aR && aR.is(":visible");
                }
                return (/input|select|textarea|button|object/.test(aV) ? !aS.disabled : "a" === aV ? aS.href || aQ : aQ);
            }

            function aK(aQ) {
                if (aN.length < 1 && aQ.length) {
                    aQ.not("body").blur();
                } else {
                    aN.first().focus();
                }
            }

            function aO(aR) {
                if (!C.is(":visible")) {
                    return;
                }
                var aT = av(aR.target),
                    aS = X.tooltip,
                    aQ = aT.closest(y),
                    aU;
                aU = aQ.length < 1 ? H : (parseInt(aQ[0].style.zIndex, 10) > parseInt(aS[0].style.zIndex, 10));
                if (!aU && aT.closest(y)[0] !== aS[0]) {
                    aK(aT);
                }
                Y = aR.target === aN[aN.length - 1];
            }
            av.extend(aP, {
                init: function () {
                    C = aP.elem = av("<div />", {
                        id: "qtip-overlay",
                        html: "<div></div>",
                        mousedown: function () {
                            return H;
                        }
                    }).hide();
                    av(a.body).bind("focusin" + an, aO);
                    av(a).bind("keydown" + an, function (aQ) {
                        if (X && X.options.show.modal.escape && aQ.keyCode === 27) {
                            X.hide(aQ);
                        }
                    });
                    C.bind("click" + an, function (aQ) {
                        if (X && X.options.show.modal.blur) {
                            X.hide(aQ);
                        }
                    });
                    return aP;
                },
                update: function (aQ) {
                    X = aQ;
                    if (aQ.options.show.modal.stealfocus !== H) {
                        aN = aQ.tooltip.find("*").filter(function () {
                            return aL(this);
                        });
                    } else {
                        aN = [];
                    }
                },
                toggle: function (aV, aQ, aS) {
                    var aU = av(a.body),
                        aY = aV.tooltip,
                        a0 = aV.options.show.modal,
                        aZ = a0.effect,
                        aW = aQ ? "show" : "hide",
                        aR = C.is(":visible"),
                        aT = av(an).filter(":visible:not(:animated)").not(aY),
                        aX;
                    aP.update(aV);
                    if (aQ && a0.stealfocus !== H) {
                        aK(av(":focus"));
                    }
                    C.toggleClass("blurs", a0.blur);
                    if (aQ) {
                        C.appendTo(a.body);
                    }
                    if ((C.is(":animated") && aR === aQ && aM !== H) || (!aQ && aT.length)) {
                        return aP;
                    }
                    C.stop(S, H);
                    if (av.isFunction(aZ)) {
                        aZ.call(C, aQ);
                    } else {
                        if (aZ === H) {
                            C[aW]();
                        } else {
                            C.fadeTo(parseInt(aS, 10) || 90, aQ ? 1 : 0, function () {
                                if (!aQ) {
                                    C.hide();
                                }
                            });
                        }
                    } if (!aQ) {
                        C.queue(function (a1) {
                            C.css({
                                left: "",
                                top: ""
                            });
                            if (!av(an).length) {
                                C.detach();
                            }
                            a1();
                        });
                    }
                    aM = aQ;
                    if (X.destroyed) {
                        X = ag;
                    }
                    return aP;
                }
            });
            aP.init();
        };
        m = new m();

        function aF(X, C) {
            this.options = C;
            this._ns = "-modal";
            this.init((this.qtip = X));
        }
        av.extend(aF.prototype, {
            init: function (X) {
                var C = X.tooltip;
                if (!this.options.on) {
                    return this;
                }
                X.elements.overlay = m.elem;
                C.addClass(t).css("z-index", z.modal_zindex + av(an).length);
                X._bind(C, ["tooltipshow", "tooltiphide"], function (aL, aK, aN) {
                    var Y = aL.originalEvent;
                    if (aL.target === C[0]) {
                        if (Y && aL.type === "tooltiphide" && /mouse(leave|enter)/.test(Y.type) && av(Y.relatedTarget).closest(m.elem[0]).length) {
                            try {
                                aL.preventDefault();
                            } catch (aM) {}
                        } else {
                            if (!Y || (Y && Y.type !== "tooltipsolo")) {
                                this.toggle(aL, aL.type === "tooltipshow", aN);
                            }
                        }
                    }
                }, this._ns, this);
                X._bind(C, "tooltipfocus", function (aM, aL) {
                    if (aM.isDefaultPrevented() || aM.target !== C[0]) {
                        return;
                    }
                    var aN = av(an),
                        aK = z.modal_zindex + aN.length,
                        Y = parseInt(C[0].style.zIndex, 10);
                    m.elem[0].style.zIndex = aK - 1;
                    aN.each(function () {
                        if (this.style.zIndex > Y) {
                            this.style.zIndex -= 1;
                        }
                    });
                    aN.filter("." + O).qtip("blur", aM.originalEvent);
                    C.addClass(O)[0].style.zIndex = aK;
                    m.update(aL);
                    try {
                        aM.preventDefault();
                    } catch (aO) {}
                }, this._ns, this);
                X._bind(C, "tooltiphide", function (Y) {
                    if (Y.target === C[0]) {
                        av(an).filter(":visible").not(C).last().qtip("focus", Y);
                    }
                }, this._ns, this);
            },
            toggle: function (C, X, Y) {
                if (C && C.isDefaultPrevented()) {
                    return this;
                }
                m.toggle(this.qtip, !!X, Y);
            },
            destroy: function () {
                this.qtip.tooltip.removeClass(t);
                this.qtip._unbind(this.qtip.tooltip, this._ns);
                m.toggle(this.qtip, H);
                delete this.qtip.elements.overlay;
            }
        });
        T = aJ.modal = function (C) {
            return new aF(C, C.options.show.modal);
        };
        T.sanitize = function (C) {
            if (C.show) {
                if (typeof C.show.modal !== "object") {
                    C.show.modal = {
                        on: !!C.show.modal
                    };
                } else {
                    if (typeof C.show.modal.on === "undefined") {
                        C.show.modal.on = S;
                    }
                }
            }
        };
        z.modal_zindex = z.zindex - 200;
        T.initialize = "render";
        i.modal = {
            "^show.modal.(on|blur)$": function () {
                this.destroy();
                this.init();
                this.qtip.elems.overlay.toggle(this.qtip.tooltip[0].offsetWidth > 0);
            }
        };
        av.extend(S, z.defaults, {
            show: {
                modal: {
                    on: H,
                    effect: S,
                    blur: S,
                    stealfocus: S,
                    escape: S
                }
            }
        });
        aJ.viewport = function (aW, a8, a5, aN, aO, a2, a1) {
            var a7 = a5.target,
                aL = aW.elements.tooltip,
                aU = a5.my,
                aX = a5.at,
                a0 = a5.adjust,
                X = a0.method.split(" "),
                aS = X[0],
                aQ = X[1] || X[0],
                a4 = a5.viewport,
                aT = a5.container,
                aV = aW.cache,
                aK = {
                    left: 0,
                    top: 0
                },
                Y, aP, aM, a6, aZ, C, aY, a3;
            if (!a4.jquery || a7[0] === b || a7[0] === a.body || a0.method === "none") {
                return aK;
            }
            aM = aT.offset() || aK;
            a6 = aT.css("position") === "static";
            Y = aL.css("position") === "fixed";
            aZ = a4[0] === b ? a4.width() : a4.outerWidth(H);
            C = a4[0] === b ? a4.height() : a4.outerHeight(H);
            aY = {
                left: Y ? 0 : a4.scrollLeft(),
                top: Y ? 0 : a4.scrollTop()
            };
            a3 = a4.offset() || aK;

            function aR(ba, a9, bc, bo, bh, bf, bn, bq, bj) {
                var bd = a8[bh],
                    bk = aU[ba],
                    bp = aX[ba],
                    br = bc === p,
                    bg = bk === bh ? bj : bk === bf ? -bj : -bj / 2,
                    bl = bp === bh ? bq : bp === bf ? -bq : -bq / 2,
                    bm = aY[bh] + a3[bh] - (a6 ? 0 : aM[bh]),
                    be = bm - bd,
                    bb = bd + bj - (bn === M ? aZ : C) - bm,
                    bi = bg - (aU.precedance === ba || bk === aU[a9] ? bl : 0) - (bp === J ? bq / 2 : 0);
                if (br) {
                    bi = (bk === bh ? 1 : -1) * bg;
                    a8[bh] += be > 0 ? be : bb > 0 ? -bb : 0;
                    a8[bh] = Math.max(-aM[bh] + a3[bh], bd - bi, Math.min(Math.max(-aM[bh] + a3[bh] + (bn === M ? aZ : C), bd + bi), a8[bh], bk === "center" ? bd - bg : 1000000000));
                } else {
                    bo *= (bc === Z ? 2 : 0);
                    if (be > 0 && (bk !== bh || bb > 0)) {
                        a8[bh] -= bi + bo;
                        aP.invert(ba, bh);
                    } else {
                        if (bb > 0 && (bk !== bf || be > 0)) {
                            a8[bh] -= (bk === J ? -bi : bi) + bo;
                            aP.invert(ba, bf);
                        }
                    } if (a8[bh] < aY && -a8[bh] > bb) {
                        a8[bh] = bd;
                        aP = aU.clone();
                    }
                }
                return a8[bh] - bd;
            }
            if (aS !== "shift" || aQ !== "shift") {
                aP = aU.clone();
            }
            aK = {
                left: aS !== "none" ? aR(ab, aa, aS, a0.x, d, l, M, aN, a2) : 0,
                top: aQ !== "none" ? aR(aa, ab, aQ, a0.y, o, aw, aA, aO, a1) : 0,
                my: aP
            };
            return aK;
        };
        aJ.polys = {
            polygon: function (X, aR) {
                var aS = {
                        width: 0,
                        height: 0,
                        position: {
                            top: 10000000000,
                            right: 0,
                            bottom: 0,
                            left: 10000000000
                        },
                        adjustable: H
                    },
                    aM = 0,
                    aN, aQ = [],
                    aP = 1,
                    aO = 1,
                    aL = 0,
                    Y = 0,
                    aK, C;
                aM = X.length;
                while (aM--) {
                    aN = [parseInt(X[--aM], 10), parseInt(X[aM + 1], 10)];
                    if (aN[0] > aS.position.right) {
                        aS.position.right = aN[0];
                    }
                    if (aN[0] < aS.position.left) {
                        aS.position.left = aN[0];
                    }
                    if (aN[1] > aS.position.bottom) {
                        aS.position.bottom = aN[1];
                    }
                    if (aN[1] < aS.position.top) {
                        aS.position.top = aN[1];
                    }
                    aQ.push(aN);
                }
                aK = aS.width = Math.abs(aS.position.right - aS.position.left);
                C = aS.height = Math.abs(aS.position.bottom - aS.position.top);
                if (aR.abbrev() === "c") {
                    aS.position = {
                        left: aS.position.left + (aS.width / 2),
                        top: aS.position.top + (aS.height / 2)
                    };
                } else {
                    while (aK > 0 && C > 0 && aP > 0 && aO > 0) {
                        aK = Math.floor(aK / 2);
                        C = Math.floor(C / 2);
                        if (aR.x === d) {
                            aP = aK;
                        } else {
                            if (aR.x === l) {
                                aP = aS.width - aK;
                            } else {
                                aP += Math.floor(aK / 2);
                            }
                        } if (aR.y === o) {
                            aO = C;
                        } else {
                            if (aR.y === aw) {
                                aO = aS.height - C;
                            } else {
                                aO += Math.floor(C / 2);
                            }
                        }
                        aM = aQ.length;
                        while (aM--) {
                            if (aQ.length < 2) {
                                break;
                            }
                            aL = aQ[aM][0] - aS.position.left;
                            Y = aQ[aM][1] - aS.position.top;
                            if ((aR.x === d && aL >= aP) || (aR.x === l && aL <= aP) || (aR.x === J && (aL < aP || aL > (aS.width - aP))) || (aR.y === o && Y >= aO) || (aR.y === aw && Y <= aO) || (aR.y === J && (Y < aO || Y > (aS.height - aO)))) {
                                aQ.splice(aM, 1);
                            }
                        }
                    }
                    aS.position = {
                        left: aQ[0][0],
                        top: aQ[0][1]
                    };
                }
                return aS;
            },
            rect: function (X, C, aK, Y) {
                return {
                    width: Math.abs(aK - X),
                    height: Math.abs(Y - C),
                    position: {
                        left: Math.min(X, aK),
                        top: Math.min(C, Y)
                    }
                };
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
            ellipse: function (X, aO, aM, aL, aK) {
                var aN = aJ.polys._angles[aK.abbrev()],
                    Y = aN === 0 ? 0 : aM * Math.cos(aN * Math.PI),
                    C = aL * Math.sin(aN * Math.PI);
                return {
                    width: (aM * 2) - Math.abs(Y),
                    height: (aL * 2) - Math.abs(C),
                    position: {
                        left: X + Y,
                        top: aO + C
                    },
                    adjustable: H
                };
            },
            circle: function (C, aK, Y, X) {
                return aJ.polys.ellipse(C, aK, Y, Y, X);
            }
        };
        aJ.svg = function (aO, aP, aL) {
            var aZ = av(a),
                aV = aP[0],
                aR = av(aV.ownerSVGElement),
                aX = aV.ownerDocument,
                X = (parseInt(aP.css("stroke-width"), 10) || 0) / 2,
                C, Y, aY, aN, aU, aQ, aT, aS, aM, aW, aK;
            while (!aV.getBBox) {
                aV = aV.parentNode;
            }
            if (!aV.getBBox || !aV.parentNode) {
                return H;
            }
            switch (aV.nodeName) {
            case "ellipse":
            case "circle":
                aM = aJ.polys.ellipse(aV.cx.baseVal.value, aV.cy.baseVal.value, (aV.rx || aV.r).baseVal.value + X, (aV.ry || aV.r).baseVal.value + X, aL);
                break;
            case "line":
            case "polygon":
            case "polyline":
                aS = aV.points || [{
                    x: aV.x1.baseVal.value,
                    y: aV.y1.baseVal.value
                }, {
                    x: aV.x2.baseVal.value,
                    y: aV.y2.baseVal.value
                }];
                for (aM = [], aT = -1, aU = aS.numberOfItems || aS.length; ++aT < aU;) {
                    aQ = aS.getItem ? aS.getItem(aT) : aS[aT];
                    aM.push.apply(aM, [aQ.x, aQ.y]);
                }
                aM = aJ.polys.polygon(aM, aL);
                break;
            default:
                aM = aV.getBBox();
                aM = {
                    width: aM.width,
                    height: aM.height,
                    position: {
                        left: aM.x,
                        top: aM.y
                    }
                };
                break;
            }
            aW = aM.position;
            aR = aR[0];
            if (aR.createSVGPoint) {
                Y = aV.getScreenCTM();
                aS = aR.createSVGPoint();
                aS.x = aW.left;
                aS.y = aW.top;
                aY = aS.matrixTransform(Y);
                aW.left = aY.x;
                aW.top = aY.y;
            }
            if (aX !== a && aO.position.target !== "mouse") {
                C = av((aX.defaultView || aX.parentWindow).frameElement).offset();
                if (C) {
                    aW.left += C.left;
                    aW.top += C.top;
                }
            }
            aX = av(aX);
            aW.left += aX.scrollLeft();
            aW.top += aX.scrollTop();
            return aM;
        };
        aJ.imagemap = function (aO, X, aS, aK) {
            if (!X.jquery) {
                X = av(X);
            }
            var aQ = (X.attr("shape") || "rect").toLowerCase().replace("poly", "polygon"),
                Y = av('img[usemap="#' + X.parent("map").attr("name") + '"]'),
                aP = av.trim(X.attr("coords")),
                C = aP.replace(/,$/, "").split(","),
                aU, aR, aL, aM, aT, aN;
            if (!Y.length) {
                return H;
            }
            if (aQ === "polygon") {
                aT = aJ.polys.polygon(C, aS);
            } else {
                if (aJ.polys[aQ]) {
                    for (aL = -1, aN = C.length, aR = []; ++aL < aN;) {
                        aR.push(parseInt(C[aL], 10));
                    }
                    aT = aJ.polys[aQ].apply(this, aR.concat(aS));
                } else {
                    return H;
                }
            }
            aU = Y.offset();
            aU.left += Math.ceil((Y.outerWidth(H) - Y.width()) / 2);
            aU.top += Math.ceil((Y.outerHeight(H) - Y.height()) / 2);
            aT.position.left += aU.left;
            aT.position.top += aU.top;
            return aT;
        };
        var B, af = '<iframe class="qtip-bgiframe" frameborder="0" tabindex="-1" src="javascript:\'\';"  style="display:block; position:absolute; z-index:-1; filter:alpha(opacity=0); -ms-filter:"progid:DXImageTransform.Microsoft.Alpha(Opacity=0)";"></iframe>';

        function g(C, X) {
            this._ns = "ie6";
            this.init((this.qtip = C));
        }
        av.extend(g.prototype, {
            _scroll: function () {
                var C = this.qtip.elements.overlay;
                C && (C[0].style.top = av(b).scrollTop() + "px");
            },
            init: function (Y) {
                var X = Y.tooltip,
                    C;
                if (av("select, object").length < 1) {
                    this.bgiframe = Y.elements.bgiframe = av(af).appendTo(X);
                    Y._bind(X, "tooltipmove", this.adjustBGIFrame, this._ns, this);
                }
                this.redrawContainer = av("<div/>", {
                    id: q + "-rcontainer"
                }).appendTo(a.body);
                if (Y.elements.overlay && Y.elements.overlay.addClass("qtipmodal-ie6fix")) {
                    Y._bind(b, ["scroll", "resize"], this._scroll, this._ns, this);
                    Y._bind(X, ["tooltipshow"], this._scroll, this._ns, this);
                }
                this.redraw();
            },
            adjustBGIFrame: function () {
                var aL = this.qtip.tooltip,
                    Y = {
                        height: aL.outerHeight(H),
                        width: aL.outerWidth(H)
                    },
                    X = this.qtip.plugins.tip,
                    aK = this.qtip.elements.tip,
                    C, aM;
                aM = parseInt(aL.css("borderLeftWidth"), 10) || 0;
                aM = {
                    left: -aM,
                    top: -aM
                };
                if (X && aK) {
                    C = (X.corner.precedance === "x") ? [M, d] : [aA, o];
                    aM[C[1]] -= aK[C[0]]();
                }
                this.bgiframe.css(aM).css(Y);
            },
            redraw: function () {
                if (this.qtip.rendered < 1 || this.drawing) {
                    return this;
                }
                var aN = this.qtip.tooltip,
                    aM = this.qtip.options.style,
                    X = this.qtip.options.position.container,
                    aK, aL, C, Y;
                this.qtip.drawing = 1;
                if (aM.height) {
                    aN.css(aA, aM.height);
                }
                if (aM.width) {
                    aN.css(M, aM.width);
                } else {
                    aN.css(M, "").appendTo(this.redrawContainer);
                    aL = aN.width();
                    if (aL % 2 < 1) {
                        aL += 1;
                    }
                    C = aN.css("maxWidth") || "";
                    Y = aN.css("minWidth") || "";
                    aK = (C + Y).indexOf("%") > -1 ? X.width() / 100 : 0;
                    C = ((C.indexOf("%") > -1 ? aK : 1) * parseInt(C, 10)) || aL;
                    Y = ((Y.indexOf("%") > -1 ? aK : 1) * parseInt(Y, 10)) || 0;
                    aL = C + Y ? Math.min(Math.max(aL, Y), C) : aL;
                    aN.css(M, Math.round(aL)).appendTo(X);
                }
                this.drawing = 0;
                return this;
            },
            destroy: function () {
                this.bgiframe && this.bgiframe.remove();
                this.qtip._unbind([b, this.qtip.tooltip], this._ns);
            }
        });
        B = aJ.ie6 = function (C) {
            return s.ie === 6 ? new g(C) : H;
        };
        B.initialize = "render";
        i.ie6 = {
            "^content|style$": function () {
                this.redraw();
            }
        };
    }));
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
        var d = $(ajax_preview_form).serialize(),
            b, c;
        if (3 > ajax_preview_form.message.length) {
            return alert("El mensaje es muy corto");
        }(c = document.getElementById("AAGpreview_overlay")) || (c = document.createElement("div"), c.id = "AAGpreview_overlay", document.body.appendChild(c), $(c).on("click", function () {
            $("#AAGpreview_overlay").add("#AAGpreview_box").hide();
        }));
        (b = document.getElementById("AAGpreview_box")) || (b = document.createElement("div"), b.id = "AAGpreview_box", document.body.appendChild(b));
        b.style.display = c.style.display = "block";
        b.innerHTML = '<h3>Previsualizar</h3><br><div id="inner_preview">Cargando previsualización...</div>';
        $.post(ajax_preview_form.action, d + "&preview=1", function (a) {
            a = a.substring(a.indexOf('class="h3">Previsualización'));
            a = a.substring(0, a.indexOf('class="corners-bottom">')).replace(/.*class="content"\>(.*?)\<\/div\>\<\/div\>\<span/, "$1");
            window.AAGBB && (a = AAGBB.parse(a));
            document.getElementById("inner_preview").innerHTML = a;
        });
    }
}
$(function () {
    window.ajax_preview_form = document.post || document.getElementById("quick_reply") || null;
    ajax_preview_form && ajax_preview_form.preview && (ajax_preview_form.preview.type = "button", $(ajax_preview_form.preview).on("click", AAGpreview));
});
console.log("*************************** '¡allcode.js Listo!' **************************");
console.log("***************************************************************************");