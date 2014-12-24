$(function() {
    $(function () {
        var b = {
            time: 750,
            background: "#DDD",
            border: "#CCC",
            shadow: 1,
            offsetX: "44"
        };
        var h = 'style="margin:0px 2px;"';
        var g = b.shadow;
        var f = b.time;
        if (g == 1) {
            var d = "box-shadow:2px 2px 6px rgba(0,0,0,0.3);"
        } else {
            var d = "box-shadow:none;"
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
                    $("#quickLogoutPanel").css("left", b.offsetX + "%").css("top", "-25%").animate({
                        top: "40px"
                    }, f);
                    $("#quickLogoutClose").on("click", function () {
                        $("#quickLogoutPanel").animate({
                            top: "-25%"
                        }, f, function () {
                            $("#quickLogoutPanel").remove()
                        });
                        return false
                    })
                }
                return false
            })
        }
    })
});
if (ps) {
    function AAGpreview() {
        if (ajax_preview_form) {
            $("#text_editor_textarea").sceditor("instance").updateOriginal();
            var d = $(ajax_preview_form).serialize(),
                b, c;
            if (3 > ajax_preview_form.message.length) return alert("El mensaje es muy corto");
            (c = document.getElementById("AAGpreview_overlay")) || (c = document.createElement("div"), c.id = "AAGpreview_overlay", document.body.appendChild(c), $(c).on("click", function () {
                $("#AAGpreview_overlay").add("#AAGpreview_box").hide()
            }));
            (b = document.getElementById("AAGpreview_box")) || (b = document.createElement("div"), b.id = "AAGpreview_box", document.body.appendChild(b));
            b.style.display = c.style.display = "block";
            b.innerHTML = '<h3>Previsualizar</h3><br><div id="inner_preview">Cargando...</div>';
            $.post(ajax_preview_form.action, d + "&preview=1", function (a) {
                a = a.substring(a.indexOf('class="h3">Previsualización'));
                a = a.substring(0, a.indexOf('class="corners-bottom">')).replace(/.*class="content"\>(.*?)\<\/div\>\<\/div\>\<span/, "$1");
                window.BB && (a = BB.parse(a));
                document.getElementById("inner_preview").innerHTML = a
            })
        }
    }
    $(function () {
        window.ajax_preview_form = document.post || document.getElementById("quick_reply") || null;
        ajax_preview_form && ajax_preview_form.preview && (ajax_preview_form.preview.type = "button", $(ajax_preview_form.preview).on("click", AAGpreview))
    });
}
if (ind) {
    (function () {
        var h = "Aceptar";
        $(function () {
            window.LGfriend_requests_ready = true
        });
        $.get("/profile?mode=editprofile&page_profil=friendsfoes", function (g) {
            if (g.indexOf(' alt="' + h) > 0 && g.indexOf(' title="' + h) > 0) {
                var k = function () {
                    $("body").prepend('<div id="LGfrs"><a href="/profile?mode=editprofile&page_profil=friendsfoes">Tienes solicitud de amistad</a></div>')
                };
                (window.LGfriend_requests_ready) ? k() : $(k)
            }
        })
    })();
}

function checkNotif() {
    if ($(".fa_notification").length > 0) {
        window.clearInterval(notifChecker);
        alertNotif()
    }
}

function removeNotif() {
    if ($(".fa_notification").css("display") === "none") {
        $(".fa_notification").remove();
        $(".audioElem").remove();
        notifChecker = setInterval("checkNotif()", 100)
    }
}

function alertNotif() {
    $("body").append('<audio class="audioElem" style="display:none;" controls autoplay><source src="http://adictosalgear.org/plop.mp3" type="audio/mpeg"></audio>')
}
notifChecker = setInterval("checkNotif()", 100);
dispCheck = setInterval("removeNotif()", 100);
$('body').prepend('<div style="display: none;" class="overlayHancki"></div>');
var prefilupforum = $('li a[href="/profile?mode=editprofile"]');
var pos = prefilupforum.offset();
var dropdown = '<div class="ulprofile"><ul style="box-shadow: 0 2px 10px;border-radius:2px"><li class="limenup"><a href="/profile?mode=editprofile">Editar Perfil</a></li><li class="limenup"><a href="/profile?mode=editprofile&page_profil=avatars">Editar avatar</a></li><li class="limenup"><a href="/profile?mode=editprofile&page_profil=preferences">Preferencias</a></li><li class="limenup"><a href="/sta/' + _userdata.username + '">Mi contenido</a></li><li class="limenup"><a href="/profile?mode=editprofile&page_profil=friendsfoes">Gestionar Amigos</a</li></ul></div>';
prefilupforum.after(dropdown).on("click", function (e) {
    e.preventDefault();
    $('.overlayHancki').show();
    $(this).next('div').fadeToggle();
    $('li a[href="/profile?mode=editprofile"]').toggleClass('ativelink');
});
$('.overlayHancki').on("click", function () {
    $(this).hide();
    $('.ulprofile').fadeToggle();
    $('li a[href="/profile?mode=editprofile"]').toggleClass('ativelink')
});
$(window).load(function () {
    $("input#gsc-i-id1.gsc-input").attr({
        placeholder: " Busca en Adictos",
        style: "font-size:12px;background:#fff;width:100%;padding:0px;border:none;margin:-0.0625em 0px 0px;height:22px;outline:none;"
    })
})
var quicktopic = {
    color: "orange"
};
(function (l) {
    function m() {
        l("body").prepend('<div id="loading-bar" style="z-index: 9999; background-color: ' + quicktopic.color + '; position: fixed; top: 0; width: 20%; left: 0; height: 3px;"></div>');
        document.forms.post.message.value = l("#text_editor_textarea").sceditor("instance").val();
        l.post("/post", l(document.forms.post).serialize() + "&post=1", function (g) {
            setInterval(function () {
                "100%" != document.getElementById("loading-bar").style.width && (document.getElementById("loading-bar").style.width = parseInt(document.getElementById("loading-bar").style.width) + 10 + "%")
            }, 10);
            window.location = void 0 == quicktopic.redirect ? g.match(/url=(.*?)"/)[1] : quicktopic.redirect
        })
    }
    var k;
    k = void 0 == quicktopic.forums || "string" != typeof quicktopic.forums ? "\\d+" : quicktopic.forums.replace(/,\s?/g, "|");
    RegExp("\\/?post\\?f=(" + k + ").*").test(window.location) && l(function () {
        l("#text_editor_textarea").length && (l(window).on("beforeunload", function () {
            if (l(".sceditor-container").find("textarea").val().length || l(".sceditor-container").find("i-frame").contents().find("body").text().length) {
                return _userdata.username + " todavía no has enviado el mensaje."
            }
        }), l(document.forms.post.post).on("click", function (g) {
            $(window).off("beforeunload");
            g.preventDefault();
            m()
        }))
    })
})(jQuery);
var oConfig = {
    sContent: '<div class="ipsHeaderMenu boxShadow" id="user_inbox_link_menucontent" style="display: none; width: 300px; position: absolute; z-index: 9999;"><h4 class="ipsType_sectiontitle">Tus ultimos Mensajes<p class="ipsPad_half ipsType_smaller right"><a class="configure" href="/privmsg?folder=inbox">Ir a mis MP</a> | <a href="/privmsg?mode=post" title="New message">Enviar un MP</a></p></h4><ul class="ipsList_withminiphoto"><img src="http://i55.servimg.com/u/f55/18/17/62/92/ajax-l10.gif" alt="- Load" style="display: block; margin-left: auto; margin-right: auto;"></ul></div>',
    sTarget: "",
    sSearch: "",
    sExpression0: "",
    sExpression1: "",
    sExpression2: "",
    sGetIMG: ""
};
$("body").append(oConfig.sContent);

    oConfig.sSearch = ".topiclist.pmlist.bg_none li";
    oConfig.sTarget = ".icon dt";
    oConfig.sExpression1 = '$(this).find("a.topictitle")[0].outerHTML';
    oConfig.sExpression2 = '$(this).find("em").html()';
    oConfig.sGetIMG = " #profile-advanced-right img:eq(0)";

$("#i_icon_mini_message").on("click", function () {
    var oClicked = $(this);
    var oTarget = $("#user_inbox_link_menucontent");
    if (oTarget[0].style.display == "none") {
        oClicked.addClass("menu_active");
        if (!$("#user_inbox_link_menucontent ul.ipsList_withminiphoto > li").length) {
            var memDiv = $("<div>");
            memDiv.load("/privmsg?folder=inbox " + oConfig.sSearch + ":lt(5)", function () {
                if (oConfig.sExpression0) {
                    eval(oConfig.sExpression0)
                }
                var sHtml = "";
                oConfig.sTarget = memDiv.find(oConfig.sTarget);
                $.each(oConfig.sTarget, function (index, value) {
                    sHtml += '<li class="ipsType_small clearfix"><img class="ipsUserPhoto ipsUserPhoto_mini left" alt="User image" src="http://i78.servimg.com/u/f78/18/17/62/92/defaul10.png"><div class="list_content">' + eval(oConfig.sExpression1) + '<br><span class="ipsType_smaller desc lighter">' + eval(oConfig.sExpression2) + "</span></div></li>"
                });
                memDiv.html(sHtml);
                $("#user_inbox_link_menucontent ul.ipsList_withminiphoto").html(memDiv.html());
                var oImgTarget = oTarget.find(".ipsType_small.clearfix");
                oImgTarget.each(function (e) {
                    var t = $(this).find(".ipsType_smaller a, .list_content a:last");
                    if (t.length) {
                        t = t.attr("href");
                        var n = $(this).find(".ipsUserPhoto");
                        var r = sessionStorage.getItem(t);
                        if (r) {
                            $(this).find("img").attr("src", r)
                        } else {
                            $.get(t, function (e) {
                                var r = $(oConfig.sGetIMG, e).attr("src");
                                if (r !== undefined) {
                                    n.attr("src", r);
                                    sessionStorage.setItem(t, r)
                                }
                            })
                        }
                    }
                })
            })
        }
        oTarget.css({
            left: oClicked.offset().left + oClicked.outerWidth() - oTarget.outerWidth(),
            top: oClicked.offset().top + oClicked.outerHeight()
        }).fadeIn();
        $(document).mousedown(function () {
            if (!oTarget.is(":hover")) {
                $(document).off("mousedown");
                oClicked.removeClass("menu_active");
                oTarget.fadeOut()
            }
        })
    } else {
        oClicked.removeClass("menu_active");
        oTarget.fadeOut()
    }
    return false
});
var status_box = {
    lang: {
        woym: "¿Que tienes en mente?",
        update: '<p style="font-size:14px;display: inline-table;">✎ </p>Enviar ',
        too_short: "Status muy corto.",
        updated: "¡Actualizado!",
        error: "Error. Intenta de nuevo."
    },
    init: function (m, o) {
        if (m) {
            var l = my_getcookie("fa_" + location.host.replace(/\./g, "_") + "_data");
            this.user_id = l ? parseInt(l.split("userid")[1].replace(/s:\d+/g, "").match(/\d+/)) : 0;
            if (o) {
                for (var n in o) {
                    this.lang[n] = o[n]
                }
            }
            this.outer = document.getElementById("AAGstatus");
            this.outer.innerHTML = '<input id="AAGstatus_input" type="text" placeholder="' + this.lang.woym + '"><div onclick="status_box.update()" class="status-button">' + this.lang.update + '</div><span id="AAGstatus_notice"></span>';
            this.input = document.getElementById("AAGstatus_input");
            this.id = m;
            this.initiated = !0
        }
    },
    update: function () {
        if (this.initiated) {
            var j = document.getElementById("AAGstatus_notice");
            if (2 > this.input.value.length) {
                return j.innerHTML = this.lang.too_short = this.lang.too_short
            }
            var k = document.getElementById("logout");
            k && (k = k.href, k = k.substring(k.indexOf("tid=") + 4, k.indexOf("&key")), k = "id=" + this.id.substring(this.id.lastIndexOf("_") + 1) + '&active=1&content=[["' + this.id + '", "' + this.input.value + '"]]&tid=' + k + "&user=" + this.user_id, $.post("/ajax_profile.forum?jsoncallback=jQuery1", k, function (g) {
                0 < g.indexOf(status_box.input.value) ? (status_box.input.value = "", j.innerHTML = status_box.lang.updated, setTimeout("document.getElementById('AAGstatus_notice').innerHTML=\" \"", 2500)) : j.innerHTML = status_box.lang.error
            }))
        }
    }
};
if (_userdata.session_logged_in == "1") {
    $("#fa_notifications").attr("style", "background-image: url(http://adictosalgear.org/images/bell.png);background-position: left;background-repeat: no-repeat;padding-right: 15px!important;padding-left:20px;font-size:0!important");
    $("#fa_menu ul").prepend('<div id="AAGstatus"></div>');
    status_box.init("profile_field_13_2")
}
(function (j) {
    var k = {
        check: function () {
            j.get("/forum", function (g) {
                document.getElementById("logout") && (0 < j(g).find("#i_icon_mini_new_message").length && !document.getElementById("pm_alert") ? j("body").prepend('<div id="pm_alert"><a href="/privmsg?folder=inbox">' + j(g).find("#i_icon_mini_new_message")[0].title + "</a></div>") : document.getElementById("pm_alert") && document.getElementById("pm_alert").firstChild.innerHTML != j(g).find("#i_icon_mini_new_message")[0].title && (document.getElementById("pm_alert").firstChild.innerHTML = j(g).find("#i_icon_mini_new_message")[0].title))
            })
        },
        init: function () {
            setInterval(function () {
                k.check()
            }, 15000)
        }
    };
    window.ajaxify = k
})(jQuery);
$(function () {
    ajaxify.init()
});
var b = document.getElementById("profile-advanced-right");
if (b) {
    if ($(".h3", b)[0].getElementsByTagName("em")[0]) {
        var c = document.createElement("div");
        $(c).load("/viewonline .forumbg", function () {
            for (var o = 0, r = c.getElementsByTagName("a"), m; m = r[o++];) {
                0 <= window.location.href.indexOf(m.href) && (m = m.parentNode.parentNode.lastChild.innerHTML, b.getElementsByTagName("img")[0].parentNode.innerHTML += '<div class="newonlineprofile"><span class="forum-location"><img src="https://cdn1.iconfinder.com/data/icons/Map-Markers-Icons-Demo-PNG/16/Map-Marker-Drawing-Pin-Right-Chartreuse.png"/> Estoy: ' + m + "</span></div>")
            }
            $(".newonlineprofile").eq(0).nextAll().remove();
            var n = $("#profile-advanced-right").find(".module").eq(0).find("strong").eq(0).text(),
                q = _userdata.username;
            if (n == q) {
                $(".newonlineprofile").eq(0).find("a").text("Viendo mi perfil")
            }
        })
    } else {
        b.getElementsByTagName("img")[0].parentNode.innerHTML += '<br><span class="forum-location-not"><img src="https://cdn1.iconfinder.com/data/icons/Map-Markers-Icons-Demo-PNG/16/Map-Marker-Drawing-Pin-Right-Pink.png"/>No estoy en el foro</span>'
    }
}

if (_userdata.session_logged_in === 0) {
    $("#username_reg").attr("maxlength", 12);
    var validation = {
        empty_username: "Introduce algún nickname",
        username_length: "Es muy corto",
        username_available: " Disponible",
        username_taken: " No disponible",
        invalid_email: "Introduce un e-mail válido",
        no_user: "Lo sentimos pero ese usuario no existe"
    };
    (function (j) {
        var k;
        k = void 0 == validation.no_user ? "Sorry, but this user does not exist." : validation.no_user;
        /register\?agreed=true&step=2/.test(window.location) && j(function () {
            document.getElementById("email").setAttribute("type", "email");
            var g = document.createElement("div");
            g.id = "username_status";
            g.style.paddingTop = "5px";
            document.getElementById("username_reg").parentNode.appendChild(g);
            j("#username_reg").bind("blur", function () {
                0 == this.value.length ? this.nextSibling.innerHTML = "<img src='http://cdn1.iconfinder.com/data/icons/diagona/icon/16/050.png' style='width:12px;height:12px;' /> " + validation.empty_username : 1 == this.value.length && (this.nextSibling.innerHTML = "<img src='http://cdn1.iconfinder.com/data/icons/diagona/icon/16/050.png' style='width:12px;height:12px;' /> " + validation.username_length);
                1 < this.value.length && jQuery.get("/profile?mode=viewprofile&u=" + document.getElementById("username_reg").value.replace(/\s/g, "+"), function (h) {
                    -1 != h.indexOf(k) ? document.getElementById("username_status").innerHTML = "<img src='http://illiweb.com/fa/valid.png' /> " + document.getElementById("username_reg").value + " " + validation.username_available : document.getElementById("username_status").innerHTML = "<img src='http://illiweb.com/fa/admin/icones/supprimer.png' style='width:12px;height;12px;' /> " + document.getElementById("username_reg").value + " " + validation.username_taken
                })
            });
            g = document.createElement("div");
            g.id = "email_status";
            g.style.paddingTop = "5px";
            document.getElementById("email").parentNode.appendChild(g);
            j("#email").bind("blur", function () {
                this.nextSibling.innerHTML = /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i.test(this.value) ? "" : "<img src='http://cdn1.iconfinder.com/data/icons/diagona/icon/16/050.png' style='width:12px;height:12px;' /> " + validation.invalid_email
            })
        })
    })(jQuery);
    if ($(location).attr("pathname") + $(location).attr("search") == "/register?agreed=true&step=2") {
        $("input[value='Registrar']").on("click", function () {
            if ($("#username_reg").val().match(/\./)) {
                alert("Tu nombre de usuario no puede contener puntos");
                return false
            }
        });
        $("input#username_reg").length && $("#ucp").submit(function () {
            if ($("input#username_reg").val().match(/[0-9]/)) {
                return alert("No puedes usar cifras en el nick ( y las hay en el nick elegido " + $("input#username_reg").val() + " )"), !1
            }
        })
    }
}
if (mp) {
    $("#text_editor_textarea").length && ($(window).on("beforeunload", function () {
        if ($(".sceditor-container").find("textarea").val().length || $(".sceditor-container").find("i-frame").contents().find("body").text().length) {
            return _userdata.username + " todavía no has enviado el mensaje."
        }
    }), $("form[name='post']").submit(function () {
        $(window).off("beforeunload")
    }))
}
if (wl) {
    $("#AAGquickvm_message").length && ($(window).on("beforeunload", function () {
        if ($("textarea").val().length) {
            return _userdata.username + " todavía no has enviado el mensaje."
        }
    }), $("#AAGquickvm_send").submit(function () {
        $(window).off("beforeunload")
    }))
}
var mpindex = $(".forabg").length;
if (mp && mpindex) {
    $(function () {
        $(".inbox-css").find(".inner").eq(0).after('<div class="forabg preview-mp"><ul class="topiclist"><li id="ajaxPM_header" class="header"><dl><dt>Selecciona el mensaje :</dt></dl></li></ul><div id="ajaxPM" class="panel" style="padding:3px;"><div style="text-align:center;font-size:16px;">No hay mensaje seleccionado</div></div></div>');
        _activePM = undefined;
        $(".pmlist").find(".topictitle").on("click", function () {
            if ($(this).attr("href") == _activePM) {
                if (document.getElementById("notif_activepm")) {
                    return false
                }
                $("body").append('<div id="notif_activepm" class="notif_ajaxPM"><div class="notif_icon">!</div>El MP que seleccionaste esta actualmente activo.<br/><a id="dismiss_notif" style="cursor:pointer;float:right;">Cerrar notificación</a></div>');
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
                $("#ajaxPM_header dl").append('<dd id="ajaxPM_nav" style="float:right"><a id="directLink" class="ajaxPM_link">Responder este mensaje</a>&nbsp;&bull;&nbsp;<a id="clearSelected" class="ajaxPM_link">Limpiar</a></dd>');
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
};
if (tm) {
    var zeditor = {
        version: 'phpbb3',
        lang: {
            reply: 'Modo: <img src="https://cdn1.iconfinder.com/data/icons/material-core/24/reply-all-16.png" style="display: inline-table;margin-top: -5px;margin-bottom: 0;"> Respuesta',
            pm: 'Modo: <img src="https://cdn4.iconfinder.com/data/icons/linecon/512/send-16.png" style="display: inline-table;margin-top: -5px;margin-bottom: -3px;"> Mensaje Privado',
            edit: 'Modo: <img src="https://cdn2.iconfinder.com/data/icons/facebook-svg-icons-1/64/editprofile-16.png" style="display: inline-table;margin-top: -5px;margin-bottom: -3px;"> Edición',
            quote: 'Modo: <img src="https://cdn0.iconfinder.com/data/icons/bijou/10/Quote.png" style="display: inline-table;margin-top: -5px;margin-bottom: 0;"> Citar',
            preview: "Modo: Previsualizar",
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
            reply_button: "Responder",
            pm_button: "Mensaje Privado",
            subject_button: "Título",
            preview_button: "Previsualizar",
            advance_button: "Editor completo",
            close_button: "Cerrar",
            offtopic_button: '<img src="http://www.adictosalgear.org/adictosalgear/files/offtopic.png"/>',
            tagimg_button: '<img src="http://www.adictosalgear.org/adictosalgear/files/tag.png"/>',
            download_button: '<img src="http://www.adictosalgear.org/adictosalgear/files/savepdf.png"/>',
            noguest_button: '<img src="http://www.adictosalgear.org/adictosalgear/files/glasses.png"/>',
            bold_button: '<img src="https://cdn3.iconfinder.com/data/icons/fugue/icon/edit-bold.png"/>',
            italic_button: '<img src="https://cdn3.iconfinder.com/data/icons/fugue/icon/edit-italic.png"/>',
            strike_button: '<img src="https://cdn3.iconfinder.com/data/icons/fugue/icon/edit-strike.png"/>',
            underline_button: '<img src="https://cdn3.iconfinder.com/data/icons/fugue/icon/edit-underline.png"/>',
            color_button: '<img src="https://cdn2.iconfinder.com/data/icons/pretty-office-10/16/Colorpencils-16.png"/>',
            smiley_button: '<img src="http://i82.servimg.com/u/f82/12/56/56/12/213.png"/>',
            image_button: '<img src="https://cdn1.iconfinder.com/data/icons/Momentum_GlossyEntireSet/16/img-landscape-add.png"/>',
            upload_button: '<img src="http://i82.servimg.com/u/f82/12/56/56/12/imag1010.gif"/>',
            warning_button: '<img src="http://www.adictosalgear.org/adictosalgear/files/error.png"/>',
            alert_button: '<img src="http://www.adictosalgear.org/adictosalgear/files/alert.png"/>',
            ok_button: '<img src="http://www.adictosalgear.org/adictosalgear/files/accept.png"/>',
            info_button: '<img src="http://www.adictosalgear.org/adictosalgear/files/infop.png"/>',
            code_button: '<img src="https://cdn3.iconfinder.com/data/icons/fugue/icon/edit-code.png"/>',
            justify_button: '<img src="https://cdn3.iconfinder.com/data/icons/tango-icon-library/48/format-justify-fill-16.png"/>',
            left_button: '<img src="https://cdn3.iconfinder.com/data/icons/tango-icon-library/48/format-justify-left-16.png"/>',
            right_button: '<img src="https://cdn3.iconfinder.com/data/icons/tango-icon-library/48/format-justify-right-16.png"/>',
            center_button: '<img src="https://cdn3.iconfinder.com/data/icons/tango-icon-library/48/format-justify-center-16.png"/>',
            hide_button: '<img src="https://cdn2.iconfinder.com/data/icons/gnomeicontheme/16x16/stock/object/stock_slide-showhide.png"/>',
            send_button: "Enviar",
            tag_button: "@",
            imgur_placeholder1: "Selecciona los archivos",
            imgur_placeholder2: "URL externa",
        },
        imgur_key: '6528448c258cff474ca9701c5bab6927',
        post_dom: '.post',
        message_dom: '.zeditor-message',
        button_dom: '.zeditor-buttons',
        preview_dom: 0,
        editor: 0,
        mode: 0,
        url: 0,
        textarea: 0,
        ready: function () {
            if (zeditor.version == 'phpbb3') {
                zeditor.preview_dom = '.content';
                zeditor.button_dom = '.profile-icons'
            }
            if (!window.jQuery) {
                alert('JQuery is required to run this. Visit http://www.jquery.com/ for more details')
            } else {
                zeditor.button(zeditor.button_dom);
                for (var a = $(zeditor.message_dom), i = 0, l = a.length; i < l; i++) {
                    a[i].innerHTML = zeditor.replace(a[i].innerHTML)
                }
                $(document.body).append('<div id="ze-editor" style="display:none"><form id="ze-editor-form" name="ze-editor" method="post" action="/post"><div id="editor-top"><div id="editor-tool"><div class="newtab" style="display:none;margin-top: 27px;left: 312px;top: 33px;z-index: 999; position: absolute;border:1px solid #ccc;background:#fff"><iframe src="http://www.adictosalgear.net/h17-tinypic" style="padding-bottom:0;border:none" frameborder="1" height="280px" scrolling="si" width="285px"></iframe></div><span onclick="zeditor.add(\'[b]\',\'[/b]\')" class="editor-button-outer">' + zeditor.lang.bold_button + '</span><span onclick="zeditor.add(\'[i]\',\'[/i]\')"  class="editor-button-outer">' + zeditor.lang.italic_button + '</span><span onclick="zeditor.add(\'[u]\',\'[/u]\')"  class="editor-button-outer">' + zeditor.lang.underline_button + '</span><span onclick="zeditor.add(\'[strike]\',\'[/strike]\')"  class="editor-button-outer">' + zeditor.lang.strike_button + '</span><span onclick="zeditor.add(\'[justify]\',\'[/justify]\')" class="editor-button-outer">' + zeditor.lang.justify_button + '</span><span onclick="zeditor.add(\'[center]\',\'[/center]\')" class="editor-button-outer">' + zeditor.lang.center_button + '</span><span onclick="zeditor.add(\'[left]\',\'[/left]\')" class="editor-button-outer">' + zeditor.lang.left_button + '</span><span onclick="zeditor.add(\'[right]\',\'[/right]\')" class="editor-button-outer">' + zeditor.lang.right_button + '</span><span class="editor-button-outer" onclick="zeditor.popup(\'ze-color\', this);zeditor.createColor()">' + zeditor.lang.color_button + '</span><span onclick="zeditor.add(\'[hide][code]\',\'[/code][/hide]\')"  class="editor-button-outer">' + zeditor.lang.code_button + '</span><span onclick="zeditor.add(\'[hide]\',\'[/hide]\')" class="editor-button-outer">' + zeditor.lang.hide_button + '</span><span style="display:none" class="editor-button-outer" onclick="zeditor.popup(\'ze-smiley\', this);zeditor.createSmilies()">' + zeditor.lang.smiley_button + '</span><span class="editor-button-outer imgur" onclick="zeditor.popup(\'ze-upload\', this);zeditor.imgur.prepare()">' + zeditor.lang.upload_button + '</span><span class="editor-button-outer tinypic" ><img src="http://i.imgur.com/vU0Y04s.png"/></span><span class="editor-button-outer" onclick="zeditor.tag(this)">' + zeditor.lang.tag_button + '</span><span onclick="zeditor.add(\'[size=1][color=#FFFFFF]Debes entrar al foro-Debes entrar al foro-Debes entrar al foro-Debes entrar al foro-Debes entrar al foro-Debes entrar al foro-Debes entrar al foro-Debes entrar al foro-Debes entrar al foro-Debes entrar al foro-Debes entrar al foro-Debes entrar al foro-Debes entrar al foro-Debes entrar al foro-Debes entrar al foro-Debes entrar al foro-Debes entrar al foro-Debes entrar al foro-Debes entrar al foro-Debes entrar al foro-Debes entrar al foro-Debes entrar al foro-Debes entrar al foro-Debes entrar al foro-Debes entrar al foro-Debes entrar al foro-Debes entrar al foro-Debes entrar al foro-Debes entrar al foro-Debes entrar al foro-Debes entrar al foro-Debes entrar al foro-Debes entrar al foro-Debes entrar al foro-Debes entrar al foro-Debes entrar al foro-Debes entrar al foro-Debes entrar al foro-Debes entrar al foro-Debes entrar al foro-Debes entrar al foro-Debes entrar al foro-Debes entrar al foro-Debes entrar al foro-Debes entrar al foro-Debes entrar al foro-Debes entrar al foro-Debes entrar al foro-Debes entrar al foro-Debes entrar al foro-Debes entrar al foro-Debes entrar al foro-Debes entrar al foro-Debes entrar al foro-Debes entrar al foro-Debes entrar al foro-Debes entrar al foro-Debes entrar al foro-Debes entrar al foro-Debes entrar al foro-Debes entrar al foro-Debes entrar al foro-Debes entrar al foro-Debes entrar al foro-Debes entrar al foro-Debes entrar al foro-Debes entrar al foro-Debes entrar al foro-Debes entrar al foro-Debes entrar al foro-Debes entrar al foro-Debes entrar al foro-Debes entrar al foro-Debes entrar al foro-Debes entrar al foro-Debes entrar al foro-Debes entrar al foro-Debes entrar al foro-Debes entrar al foro-Debes entrar al foro-Debes entrar al foro[/color][/size][download]\',\' [/download]\')" class="editor-button-outer">' + zeditor.lang.download_button + '</span><span onclick="zeditor.add(\'[noguest]\',\'[/noguest]\')" class="editor-button-outer">' + zeditor.lang.noguest_button + '</span><span onclick="zeditor.add(\'[img]\',\'[/img]\')" class="editor-button-outer">' + zeditor.lang.tagimg_button + '</span><span onclick="zeditor.add(\'[offtopic]\',\'[/offtopic]\')" class="editor-button-outer">' + zeditor.lang.offtopic_button + '</span><div class="modbar" style="display:none"><span onclick="zeditor.add(\'[warning]\',\'[/warning]\')" class="editor-button-outer">' + zeditor.lang.warning_button + '</span><span onclick="zeditor.add(\'[alert]\',\'[/alert]\')" class="editor-button-outer">' + zeditor.lang.alert_button + '</span><span onclick="zeditor.add(\'[ok]\',\'[/ok]\')" class="editor-button-outer">' + zeditor.lang.ok_button + '</span><span onclick="zeditor.add(\'[info]\',\'[/info]\')" class="editor-button-outer">' + zeditor.lang.info_button + '</span></div></div></div><div id="ze-popups"><div id="ze-subject" class="ze-popups" style="display:none"><input id="editor-subject" type="text"></input></div><div id="ze-mode" class="ze-popups" style="display:none"><p><center>Selecciona un tema</center></p><p><input type="radio" name="ze-mode" checked="checked"> Light grey</input><p></div><div id="ze-color" class="ze-popups" style="display:none"></div><div id="ze-smiley" class="ze-popups" style="display:none"></div><div id="ze-image" class="ze-popups" style="display:none"><input type="text" style="height:20px;border:1px solid #BDBDBD" /><div><br><span class="editor-button-confirm" onclick="zeditor.popup(\'ze-image\', this);zeditor.add(\'[img]\'+this.parentNode.previousSibling.value, \'[/img]\');this.parentNode.previousSibling.value=\'\'">OK</span></div></div><div id="ze-upload" class="ze-popups" style="display:none"><div id="ze-imgur"><span id="ze-imgur-mode" class="editor-button-confirm" onclick="zeditor.imgur.mode()">Mode</span><span onclick="zeditor.imgur.files()"><input id="ze-imgur-input" type="input" placeholder="' + zeditor.lang.imgur_placeholder1 + '" value="" disabled></span><span id="ze-imgur-submit" class="editor-button-confirm" onclick="zeditor.imgur.submit(this)">Submit</span><input type="file" id="ze-imgur-placeholder" multiple><div id="ze-imgur-status"></div><div id="ze-imgur-images"></div></div></div></div><div id="outer-preview"><div id="ze-preview" ondblclick="zeditor.closePreview(this)"></div><div id="editor-loading" style="display: none"><img src="http://i11.servimg.com/u/f11/16/80/27/29/ajax-l10.gif" /><br>' + zeditor.lang.loading + '</div><textarea name="message" id="editor-textarea" placeholder="Escribe tu mensaje"></textarea></div><div id="editor-data"><input type="hidden" value="reply" name="mode"><input type="hidden" value="1" name="notify"></div><div id="editor-post-tool"><div id="editor-post-button"><span  id="editor-send-button" onclick="zeditor.post(this)">' + zeditor.lang.send_button + '</span><span onclick="zeditor.preview(this)" id="editor-preview-button">' + zeditor.lang.preview_button + '</span><span onclick="zeditor.advance()">' + zeditor.lang.advance_button + '</span></div><div id="editor-mode"><span class="ze-subjet"onclick="zeditor.popup(\'ze-subject\', this)">' + zeditor.lang.subject_button + '</span><span onclick="zeditor.popup(\'ze-mode\', this)"></span></div></div></form></div>')
            }
            zeditor.textarea = document.getElementById('editor-textarea');
            zeditor.subject = document.getElementById('editor-subject');
            zeditor.mode = document.getElementById('editor-mode').getElementsByTagName('span')[1];
            zeditor.editor = document.getElementById('ze-editor');
            if (_userdata.user_level >= 1) {
                $(".modbar").removeAttr("style")
            }
        },
        quote: function (a) {
            zeditor.loading('on');
            $.get(a.href, function (data) {
                zeditor.textarea.value = $(data).find('#text_editor_textarea').val().replace(/]/, '][quotelink="' + location.pathname + '#' + a.href.match(/[0-9]+/) + '"]');
                zeditor.textarea.focus();
                zeditor.loading('off')
            })
        },
        edit: function (a) {
            zeditor.loading('on');
            zeditor.url = a.href;
            $.get(a.href, function (data) {
                zeditor.textarea.value = $(data).find('#text_editor_textarea').val();
                zeditor.subject.value = $(data).find('input[name="subject"]').val();
                zeditor.textarea.focus();
                zeditor.loading('off')
            })
        },
        button: function (where) {
            $(where).each(function () {
                $(this).find('a[href*="quote"]').attr('onclick', 'zeditor.start(\'quote\', this); return false');
                $(this).parent().parent().parent().after('<a class="pbutton1" onclick="zeditor.start(\'reply\', this)">' + zeditor.lang.reply_button + '</a><a class="pbutton2" onclick="zeditor.start(\'pm\', this)">' + zeditor.lang.pm_button + '</a>');
                $(this).find('a[href*="editpost"]').attr('onclick', 'zeditor.start(\'edit\', this); return false')
            })
        },
        start: function (a, dom) {
            $(zeditor.editor).appendTo($(dom).parents(zeditor.post_dom).find(zeditor.message_dom));
            $(zeditor.editor).slideDown();
            switch (a) {
            case "reply":
                zeditor.url = $('a[href^="/post?t="]').first().attr("href");
                zeditor.mode.innerHTML = zeditor.lang.reply;
                zeditor.textarea.placeholder = _userdata.username + " escribe un comentario...";
                
                if ($("#editor-send-button").text() === "Guardar") {
                    $("#editor-send-button").text("Enviar");
                   
                }
 if (zeditor.textarea.value != "") {
                    alert(_userdata.username + " si deseas publicar tu mensaje presiona ENVIAR");
                    $("#editor-send-button ").css("background", "gold");
                }
                break;
            case "quote":
                zeditor.url = dom.href;
                zeditor.quote(dom);
                zeditor.mode.innerHTML = zeditor.lang.quote;
                if ($("#editor-send-button").text() === "Guardar") {
                    $("#editor-send-button").text("Enviar")
                }
                break;
            case "edit":
                zeditor.edit(dom);
                zeditor.mode.innerHTML = zeditor.lang.edit;
                $("#editor-send-button").text("Guardar");
                break;
            case "pm":
                zeditor.url = !1;
                zeditor.mode.innerHTML = zeditor.lang.pm;
                zeditor.textarea.placeholder = _userdata.username + " redacta tu mensaje privado...";
                if ($("#editor-send-button").text() === "Guardar") {
                    $("#editor-send-button").text("Enviar")
                }
                break
            }
        },
        add: function (x, y) {
            zeditor.textarea.focus();
            if (typeof (zeditor.textarea) != "undefined") {
                var longueur = parseInt(zeditor.textarea.value.length);
                var selStart = zeditor.textarea.selectionStart;
                var selEnd = zeditor.textarea.selectionEnd;
                zeditor.textarea.value = zeditor.textarea.value.substring(0, selStart) + x + zeditor.textarea.value.substring(selStart, selEnd) + y + zeditor.textarea.value.substring(selEnd, longueur)
            } else zeditor.textarea.value += x + y;
            zeditor.textarea.focus()
        },
        preview: function (a) {
            preview = document.getElementById('ze-preview');
            if (preview.style.display == 'block') {
                preview.style.display = 'none';
                document.getElementById('editor-top').setAttribute('style', 'height:70px; transform: scaleY(1);-webkit-transform: scaleY(1)');
                a.innerHTML = zeditor.lang.preview_button
            } else {
                a.innerHTML = zeditor.lang.close_button;
                document.getElementById('editor-top').setAttribute('style', 'height:3px; transform: scaleY(0);-webkit-transform: scaleY(0)');
                $.post(zeditor.url, {
                    "message": zeditor.textarea.value,
                    "preview": "Preview",
                }, function (data) {
                    preview.style.display = 'block';
                    preview.innerHTML = zeditor.replace($(data).find(zeditor.preview_dom).html())
                })
            }
        },
        closePreview: function (a) {
            $(a).hide();
            zeditor.textarea.focus();
            document.getElementById('editor-preview-button').innerHTML = zeditor.lang.preview_button;
            document.getElementById('editor-top').setAttribute('style', 'height:70px; transform: scaleY(1);-webkit-transform:scaleY(1)')
        },
        post: function (a) {
            if (zeditor.mode.innerHTML == zeditor.lang.quote) {
                zeditor.url = $('a[href^="/post?t="]').first().attr("href")
            }
            if (zeditor.url) {
                if (zeditor.textarea.value == 0) {
                    alert(zeditor.lang.no_message)
                } else {
                    $.post(zeditor.url, {
                        'post': 'Send',
                        'message': zeditor.textarea.value,
                        'subject': zeditor.subject.value
                    }, function (data) {
                        var en = "Tu mensaje ha sido publicado con éxito",
                            vi = "Tu mensaje ha sido publicado con éxito";
                        b = (data.indexOf(en) < 0) ? vi : en;
                        index = data.indexOf(b);
                        if (data.indexOf("Flood control") > 0) {
                            alert(zeditor.lang.flood_message)
                        } else if (data.indexOf('A new message') > 0) {
                            $.post('/post', $(data).find("form[name='post']").serialize() + '&post=1', function (c) {
                                (index < 0) ? alert(zeditor.lang.error_message) : zeditor.newPost($(c).find('p:contains("' + b + '") a:first').attr('href'));
                                zeditor.closePreview('#ze-preview')
                            })
                        } else {
                            (index < 0) ? alert(zeditor.lang.error_message) : zeditor.newPost($(data).find('p:contains("' + b + '") a:first').attr('href'));
                            zeditor.closePreview('#ze-preview')
                        }
                    })
                }
            } else {
                zeditor.pm(a)
            }
        },
        newPost: function (a) {
            var b = a.split('#')[1];
            zeditor.editor.style.display = 'none';
            if (zeditor.mode.innerHTML == zeditor.lang.reply || zeditor.mode.innerHTML == zeditor.lang.quote) {
                $.get(a, function (data) {
                    $('<div class="zeditor-new">' + zeditor.replace($(data).find("#p" + b).wrapAll('<div></div>').parent().html()) + '</div>').insertAfter(zeditor.post_dom + ':last');
                    $.getScript("http://adictosalgear.org/js/ajax_comp.js");
                    window.BB && (a = BB.parse(a));
                    $('html,body').animate({
                        scrollTop: $('.zeditor-new:last').offset().top
                    }, 600);
                    zeditor.button('.zeditor-new:last ' + zeditor.button_dom)
                })
            }
            if (zeditor.mode.innerHTML == zeditor.lang.edit) {
                dom = $(zeditor.editor).parents(zeditor.post_dom).find(zeditor.message_dom);
                $.get(a, function (data) {
                    $(dom).html(zeditor.replace($(data).find('#p' + b + ' ' + zeditor.message_dom).html()));
                    $(dom).hide().fadeIn('slow')
                })
            }
            zeditor.textarea.value = '', $(function () {
                if (_userdata.user_posts > 5) {
                    if ($(".post").find(".descargar").length > 0) {
                        $(".descargar").find("a,span").removeAttr("style");
                    }
                    if ($('.attachbox').length) {
                        $(".descargar").remove();
                        $(".attachments").removeAttr("style")
                    }
                }
            })
        },
        popup: function (a, b) {
            zeditor.textarea.focus();
            x = document.getElementById(a);
            y = document.getElementById('ze-editor').offsetWidth;
            if (x.style.display == 'none') {
                position = $(b).position().left;
                x.setAttribute('style', 'display: block');
                if (position + x.offsetWidth + 20 > y) {
                    position = y - x.offsetWidth - 20
                }
                x.style.left = position - 30 + 'px'
            } else {
                x.style.display = 'none'
            }
            $('#' + a).siblings().hide()
        },
        createSmilies: function () {
            smiley = document.getElementById('ze-smiley');
            if (smiley.innerHTML == '') {
                $(smiley).load('/smilies.forum?mode=smilies_frame', function () {
                    this.innerHTML = this.innerHTML.replace(/alt=\"(.*?)\"/g, 'onclick="zeditor.smiley(\'$1\')"')
                })
            }
        },
        createColor: function () {
            if (!document.getElementById('ze-color-inner')) {
                var c = '<table cellspacing="0" id="ze-color-inner">';
                var colors = new Array('00', '33', '66', '99', 'CC', 'FF');
                for (i = 5; i >= 0; i--) {
                    c = c + '<tr>';
                    for (j = 5; j >= 0; j--) {
                        for (k = 5; k >= 0; k--) {
                            var col = colors[j] + colors[i] + colors[k];
                            c = c + '<td style="background: #' + col + '" title="#' + col + '"><div style="background:#' + col + '" onclick="zeditor.add(\'[color=#' + col + ']\', \'[/color]\');zeditor.hideColor()"></div></td>'
                        }
                    }
                    c = c + '</tr>'
                }
                document.getElementById('ze-color').innerHTML = c + '</table><div id="ze-color-info"><div class="ze-color-input"><div>#</div><input id="ze-color-hex" maxlength="6" onkeypress="zeditor.convertHex(this)" placeholder="000000"></div><div class="ze-color-input"><div>R</div><input id="ze-color-r" maxlength="3" onkeypress="zeditor.convertRGB()" placeholder="000"></div><div class="ze-color-input"><div>G</div><input id="ze-color-g" maxlength="3" onkeypress="zeditor.convertRGB()" placeholder="000"></div><div class="ze-color-input"><div>B</div><input id="ze-color-b" maxlength="3" onkeypress="zeditor.convertRGB()" placeholder="000"></div><div class="editor-button-confirm" onclick="zeditor.submitColor()">OK</div></div>'
            }
        },
        hideColor: function () {
            document.getElementById('ze-color').setAttribute('style', 'display:none')
        },
        submitColor: function () {
            if (document.getElementById('ze-color-hex').value !== '') {
                zeditor.add('[color=#' + document.getElementById('ze-color-hex').value + ']', '[/color]')
            } else {
                zeditor.add('[color=#000000]', '[/color]')
            }
            zeditor.hideColor()
        },
        convertHex: function (a) {
            var a = a.value,
                result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(a);
            result ? (document.getElementById('ze-color-r').value = parseInt(result[1], 16), document.getElementById('ze-color-g').value = parseInt(result[2], 16), document.getElementById('ze-color-b').value = parseInt(result[3], 16)) : null
        },
        convertRGB: function () {
            var r = document.getElementById('ze-color-r').value,
                g = document.getElementById('ze-color-g').value,
                b = document.getElementById('ze-color-b').value,
                rgb = b | (g << 8) | (r << 16);
            document.getElementById('ze-color-hex').value = (0x1000000 + rgb).toString(16).slice(1)
        },
        smiley: function (a) {
            zeditor.textarea.value += a;
            zeditor.textarea.focus();
            document.getElementById('ze-smiley').style.display = 'none'
        },
        tag: function (a) {
            var e = $(a).parents(zeditor.post_dom).find('a[href^="/u"]:has(span)').eq(0).text(),
                b = $(a).parents(zeditor.post_dom).find('h2 a').attr("href");
            zeditor.textarea.value += '[tag]' + e + '[/tag] ';
            tagname = e;
            if (e.length > 0) {
                if (confirm(zeditor.lang.notify_message + ' ' + e + '?')) {
                    zeditor.post_pm(e, zeditor.lang.tag_message_title + ' "' + document.title + '"', tagname + zeditor.lang.tag_message_content + ' <a href="' + b + '"> ' + document.title + ' en el post: ' + b.split("#")[1] + '</a>')
                }
            } else {
                alert(zeditor.lang.tag_message_error)
            }
        },
        pm: function (a) {
            var e = $(a).parents(zeditor.post_dom).find('a[href^="/u"]:not(:empty)').eq(0).text();
            if (e.length > 0) {
                zeditor.post_pm(e, zeditor.lang.pm_message_title + ' "' + document.title + '"', zeditor.textarea.value)
            } else {
                alert(zeditor.lang.pm_message_error)
            }
            zeditor.textarea.value = ''
        },
        post_pm: function (name, subject, message) {
            $.post('/privmsg?mode=post&post=1', {
                'username[]': name,
                'subject': subject,
                'message': message,
                'post': 'Send',
                'folder': 'inbox'
            }, function () {
                $("textarea").attr("placeholder", _userdata.username + " tu mensaje privado se envió con éxito")
            })
        },
        replace: function (a) {
            return a.replace(/\[tag\](.*?)\[\/tag\]/g, function (a, b) {
                return '<a href="/profile?mode=viewprofile&u=' + b.replace(/ /g, "+") + '" onmouseover="zeditor.avatar(this, this.href)" class="ze-avatar">@' + b + '</a>'
            }).replace(/:<\/cite>\[quotelink="(\S+)"\]/gi, function (a, b) {
                return ' ' + zeditor.lang.quote_message + ' <a href="' + b + '"> ' + b.split("#")[1] + '</a></cite>';
            })
        },
        loading: function (a) {
            b = document.getElementById('editor-loading');
            a == 'on' ? (b.style.display = '') : (b.style.display = 'none')
        },
        advance: function () {
            if (zeditor.textarea.value != '') {
                location.href = zeditor.url
                window.onbeforeunload = false;
            } else {
                location.href = zeditor.url
            }
        },
        avatar: function (a, b) {
            if (a.getElementsByTagName('span')[0] == null) {
                $.get(b, function (data) {
                    a.innerHTML += '<span>' + $(data).find('#profile-advanced-right img:first')[0].outerHTML + '</span>'
                })
            }
        },
        imgur: {
            input: 0,
            holder: [],
            prepare: function () {
                zeditor.imgur.input = document.getElementById('ze-imgur-input');
                document.getElementById('ze-imgur-placeholder').addEventListener("change", function (e) {
                    var a = e.target.files;
                    for (i = 0; i < a.length; i++) {
                        if (a[i].type.match(/image.*/)) {
                            zeditor.imgur.holder.push(a[i])
                        }
                        zeditor.imgur.input.value = this.value
                    }
                }, false)
            },
            mode: function () {
                if (zeditor.imgur.input.placeholder == zeditor.lang.imgur_placeholder1) {
                    zeditor.imgur.input.placeholder = zeditor.lang.imgur_placeholder2;
                    zeditor.imgur.input.disabled = false;
                    zeditor.imgur.input.parentNode.removeAttribute('onclick');
                    zeditor.imgur.input.value = ''
                } else {
                    zeditor.imgur.input.placeholder = zeditor.lang.imgur_placeholder1;
                    zeditor.imgur.input.disabled = true;
                    zeditor.imgur.input.parentNode.setAttribute('onclick', 'zeditor.imgur.files()');
                    zeditor.imgur.input.value = ''
                }
            },
            files: function () {
                document.getElementById('ze-imgur-placeholder').click()
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
                        document.getElementById("ze-imgur-status").innerHTML = JSON.parse(xhr.responseText).error.message
                    } else {
                        var links = JSON.parse(xhr.responseText).upload.links;
                        var dimage = links.small_square;
                        var dlink = links.imgur_page;
                        var a = document.createElement("a");
                        a.href = dlink;
                        a.addEventListener("click", function (event) {
                            event.preventDefault();
                            zeditor.textarea.value += '[img]' + this.firstChild.src.replace('s.', '.') + '[/img]'
                        });
                        var img = document.createElement("img");
                        img.src = dimage;
                        a.appendChild(img);
                        output.appendChild(a);
                        document.body.className = "uploaded"
                    }
                };
                xhr.send(fd)
            },
            submit: function () {
                if (zeditor.imgur.input.placeholder == zeditor.lang.imgur_placeholder1) {
                    for (var i = 0; i < zeditor.imgur.holder.length; i++) {
                        zeditor.imgur.upload(zeditor.imgur.holder[i])
                    }
                } else {
                    zeditor.imgur.upload(document.getElementById('ze-imgur-input').value);
                }
            },
        },
    };
    var zeditoronbeforeunload = $('#editor-post-button').find('span');
    window.onbeforeunload = function (e) {
        if (zeditor.textarea.value != '') return _userdata.username + ' tienes texto en el editor que podrias perder'
    };
    zeditoronbeforeunload.submit = function (e) {
        window.onbeforeunload = false;
    }
    $(function () {
        zeditor.ready()
    });
    if (_userdata.user_level == 0) {
        $('<table class="aviso_normas"><td id="av_quickreply" style="width:20px;height:25px">' + _userdata.avatar + '</td><td class="aviso-name"style="color:orange;">' + _userdata.username + '</td><td> Antes de postear en el foro recuerda leer primero: <a href="http://www.adictosalgear.net/t2-reglamento"style= "color:yellow"> El reglamento</a></td></table>').prependTo("#editor-top")
    } else {
        $('<table class="aviso_normas"><td id="av_quickreply" style="width:20px;height:25px">' + _userdata.avatar + '</td><td class="aviso-name"style="color:orange;">' + _userdata.username + "</td><td> Eres Staff colabora moderando, recuerda dar bienvenidas y comentar los PDF´s esto nos da actividad en Facebook :)</td></table>").prependTo("#editor-top")
    }
    $('.tinypic').on("click", function () {
        $(".newtab").css({
            "left": $(this).position().left,
            "top": $(this).position().top
        });
        $(".newtab").toggle();
    });
    if (_userdata.user_posts <= 5) {
        if ($(".post").find(".descargar").length > 0) {
            $(".pbutton1").text("Aún no puedes responder aquí").removeAttr("onclick")
        }
    }
    if (!!window.sidebar) {
        $(".imgur").hide()
    }
     $(".mp").on("click", function(a) {
     a.preventDefault();
    zeditor.start('pm', this);
    $('body,html').stop().animate({
    scrollTop: $('#ze-editor').offset().top
   
  }, 100);
   zeditor.textarea.focus();
  return false
    });
   $(".post").find(".postnumber").find("a").on("click", function() {
   zeditor.start('reply', this);
  var aaa_text = $(this).attr("href");
    $("#editor-textarea").val('[post]' + aaa_text + '[/post]');
    $('body,html').stop().animate({
    scrollTop: $('#ze-editor').offset().top
  }, 100);
  zeditor.textarea.focus();
  return false
  });
  $(".postprofile").find("dt").find("strong:eq(0)").on("click", function(event) {
  event.preventDefault();
  zeditor.start('reply', this);
  isTagName = $(this).text();
 $("#editor-textarea")[0].value += "@"  + isTagName  ;
 $('body,html').stop().animate({
    scrollTop: $('#ze-editor').offset().top
  }, 100);
  return false
});
$(".borrar").find("a").click(function (a) {
        a.preventDefault();
        var b = $(this).closest(".post");
        !0 == confirm("¿Deseas eliminar el post") && $.post(this.href, {
            confirm: 1
        }, function (a) {
            b.fadeOut(function () {
                b.remove();
            })
        })
    });
    if ($('a[href="/f3-presentaciones"]').length) {
        var staffU = [1, 45, 2022, 37, 45, 118, 147, 212, 450, 726, 996, 2933, 2022, 2261, 3427, 3428];
        if (($.inArray(parseInt(_userdata.user_id), staffU) != -1)) {
            if (_userdata.user_id == 1) {
                var bienvenida = "Bienvenido a AAG, ójala te sea útil, cualquier duda pregunta"
            }
            if (_userdata.user_id == 37) {
                var bienvenida = "Bienvenido al foro compañero, saludos."
            }
            if (_userdata.user_id == 45) {
                var bienvenida = "Hola amigo, disfruta del foro"
            }
            if (_userdata.user_id == 118) {
                var bienvenida = "Que bien que te nos unes, pon fotos de tus fierros"
            }
            if (_userdata.user_id == 147) {
                var bienvenida = "Bienvenido amigo, espero te guste el foro."
            }
            if (_userdata.user_id == 212) {
                var bienvenida = ":fuckyea: bienvenido hermano"
            }
            if (_userdata.user_id == 450) {
                var bienvenida = "bienvenido hermano a este antro de perdición :)"
            }
            if (_userdata.user_id == 726) {
                var bienvenida = "Bienvenido al foro, ojalá la información te sea de interés. Esperamos tu participación, ya hay convocatoria a concurso."
            }
            if (_userdata.user_id == 996) {
                var bienvenida = "Bienvenido, sube la foto de tu gear al foro y diviértete"
            }
            if (_userdata.user_id == 2933) {
                var bienvenida = "Bienvenido al foro, échate un roll y muéstranos tu gear. Saludos, hermano. :3"
            }
            if (_userdata.user_id == 2022) {
                var bienvenida = "Bienvenido, disfruta, comparte, convive"
            }
            if (_userdata.user_id == 2261) {
                var bienvenida = "[youtube]_gfO9WViYZE[/youtube]"
            }
            if (_userdata.user_id == 3427) {
                var bienvenida = "Hola, bienvenido al foro :3"
            }
            if (_userdata.user_id == 3428) {
                var bienvenida = "Bienvenido pásale y diviértete"
            }
            $("#editor-textarea").focus(function () {
                $(this).val(($(this).val() ? $(this).val() + "\n" : "") + bienvenida).unbind("focus")
            })
        }
    }
    if ($('a[href="/f22-back-to-school"]').length) {
        if (_userdata.user_id == 1) {
            var gracias = "Gracias por el aporte bajando"
        }
        if (_userdata.user_id == 45) {
            var gracias = "Muchas gracias"
        }
        if (_userdata.user_id == 2022) {
            var gracias = "Gracias por tu archivo :)"
        }
        var staffU2 = [1, 45, 2022];
        if (($.inArray(parseInt(_userdata.user_id), staffU2) != -1)) {
            $("#editor-textarea").focus(function () {
                $(this).val(($(this).val() ? $(this).val() + "\n" : "") + gracias).unbind("focus")
            })
        }
    }
    if ($(".topic-actions").find('a[alt="Este tema está cerrado y no puedes editar mensajes o responder"]').length) {
        $(".pbutton1").text("Cerrado").removeAttr("onclick");
    }
}