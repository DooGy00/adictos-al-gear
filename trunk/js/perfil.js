$(function () {
    if (/\/u\d+/.test(location.pathname) == true) return;
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
    var a = document.getElementsByTagName('A');
    for (i = 0; i < a.length; i++) {
        if (/\/u\d+/.test(a[i].href) == true) a[i].className = a[i].className + ' profilePopup'
    }
    $('.profilePopup:has(img)').removeClass('profilePopup');
    if (settings.wall == 1) var userWall = '<span class="propop_tab" id="propop_vm">Muro</span>';
    else var userWall = ''; if (settings.stats == 1) var userStats = '<span class="propop_tab" id="propop_stats">Estadisticas</span>';
    else var userStats = ''; if (settings.attachments == 1) var userAttachments = '<span class="propop_tab" id="propop_attach">Archivos</span>';
    else var userAttachments = ''; if (settings.friends == 1) var userFriends = '<span class="propop_tab" id="propop_friends">Amigos</span>';
    else var userFriends = ''; if (settings.contact == 1) var userContact = '<span class="propop_tab" id="propop_contact">Contacto</span>';
    else var userContact = ''; if (settings.rpg == 1) var userRpg = '<span class="propop_tab" id="propop_rpg">Character sheet</span>';
    else var userRpg = ''; if (settings.close == 1) var userClose = '<span class="propop_tab" id="close_popup" style="float:right;margin-top:-4px;">Cerrar</span>';
    else var userClose = '';
    $('.profilePopup').click(function () {
        var UID = $(this).attr('href');
        var UNM = $(this).text();
        var SEL = '#cp-main .panel, .forumline:has(#profile-advanced-details), .clear + #profile-advanced-details';
        var LOAD = '<center><span class="profileLoading" style="font-weight:bold;font-size:18px;">Cargando...</span></center>';
        var TAB = '#propop_profile, #propop_vm, #propop_stats, #propop_friends, #propop_contact, #propop_rpg, #propop_attach, #propop_close';
        $('body').append('<div id="profilefilter" style="position:fixed;top:0px;left:0px;right:0px;bottom:0px;background:rgba(0,0,0, 0.5);cursor:pointer;z-index:10;"></div><div id="profcont-container" style="background:#D1D1D1;top:20%;left:15%;right:15%;padding:4px;position:fixed;font-size:12px;-webkit-border-radius:5px;-moz-border-radius:5px;border-radius:5px;-webkit-box-shadow:0px 0px 2px rgba(0,0,0, 0.5) inset;-moz-box-shadow:0px 0px 2px rgba(0,0,0, 0.5) inset;box-shadow:0px 0px 2px rgba(0,0,0, 0.5) inset;z-index:50;"><div class="profile_popup_nav">' + userWall + '<span class="propop_tab" id="propop_profile">Perfil</span>' + userStats + userAttachments + userFriends + userContact + userRpg + userClose + '</div><a href="' + UID + '"><div id="userAVA"></div></a><div id="userprofile" style="height:400px;overflow-y:auto;">' + LOAD + '</div><span id="profileLinks"><a href="' + UID + '">Ver perfil</a><span id="interactionLinks"> | <a href="/privmsg?mode=post&u=' + UID.replace(/.*?\/u/, '') + '">Enviar MP</a> | <a href="/privmsg?mode=post_profile&u=' + UID.replace(/.*?\/u/, '') + '">Escribir en el muro</a><span style="float:right;"><a href="/profile?friend=' + UNM.replace(/\s+/, "+") + '&mode=editprofile&page_profil=friendsfoes">Añadir a amigos</a> | <a href="/profile?foe=' + UNM.replace(/\s+/, '+') + '&mode=editprofile&page_profil=friendsfoes">Ignorar</a></span></span></div>');
        $('#userprofile').load(UID + SEL);
        if (settings.avatar == 1) $('#userAVA').load(UID + ' #profile-advanced-right .module:first div img:first, .forumline td.row1.gensmall:first > img:first, .frm-set.profile-view.left dd img:first, dl.left-box.details:first dd img:first, .row1 b .gen:first img:first, .real_avatar img:first');
        $('#propop_profile').addClass('activeTab');
        $('#propop_profile').click(function () {
            if ($(this).hasClass('activeTab')) return;
            $(TAB).removeClass('activeTab');
            $(this).addClass('activeTab');
            $('#userprofile').html(LOAD).load(UID + SEL)
        });
        $('#propop_vm').click(function () {
            if ($(this).hasClass('activeTab')) return;
            $(TAB).removeClass('activeTab');
            $(this).addClass('activeTab');
            $('#userprofile').html(LOAD).load(UID + 'wall' + SEL)
        });
        $('#propop_stats').click(function () {
            if ($(this).hasClass('activeTab')) return;
            $(TAB).removeClass('activeTab');
            $(this).addClass('activeTab');
            $('#userprofile').html(LOAD).load(UID + 'stats' + SEL)
        });
        $('#propop_friends').click(function () {
            if ($(this).hasClass('activeTab')) return;
            $(TAB).removeClass('activeTab');
            $(this).addClass('activeTab');
            $('#userprofile').html(LOAD).load(UID + 'friends' + SEL)
        });
        $('#propop_contact').click(function () {
            if ($(this).hasClass('activeTab')) return;
            $(TAB).removeClass('activeTab');
            $(this).addClass('activeTab');
            $('#userprofile').html(LOAD).load(UID + 'contact' + SEL)
        });
        $('#propop_rpg').click(function () {
            if ($(this).hasClass('activeTab')) return;
            $(TAB).removeClass('activeTab');
            $(this).addClass('activeTab');
            $('#userprofile').html(LOAD).load(UID + 'rpg' + SEL)
        });
        $('#propop_attach').click(function () {
            if ($(this).hasClass('activeTab')) return;
            $(TAB).removeClass('activeTab');
            $(this).addClass('activeTab');
            $('#userprofile').html(LOAD).load(UID + 'attachments' + SEL)
        });
        if (!document.getElementById('logout')) $('#interactionLinks').remove();
        $('#profilefilter, #close_popup').click(function () {
            $('#profilefilter, #profcont-container').remove()
        });
        return false
    });
    $(".post a[href*='mode=delete']").on("click", function (a) {
        a.preventDefault();
        var b = $(this).closest(".post");
        !0 == confirm("¿Deseas eliminar el post") && $.post(this.href, {
            confirm: 1
        }, function (a) {
            b.fadeOut(function () {
                b.remove()
            })
        })
    });
});
var zeditor = {
    version: 'phpbb3',
    lang: {
        reply: "Modo: Respuesta",
        pm: "Modo: Mensaje Privado",
        edit: "Modo: Edición",
        quote: "Modo: Citar",
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
        reply_button: "Respuesta rápida",
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
        $('a[name="quickreply"]').next().add("#quick_reply").remove();
        if (!window.jQuery) {
            alert('JQuery is required to run this. Visit http://www.jquery.com/ for more details')
        } else {
            zeditor.button(zeditor.button_dom);
            for (var a = $(zeditor.message_dom), i = 0, l = a.length; i < l; i++) {
                a[i].innerHTML = zeditor.replace(a[i].innerHTML)
            }
            $(document.body).append('<div id="ze-editor" style="display:none"><form id="ze-editor-form" name="ze-editor" method="post" action="/post"><div id="editor-top"><div id="editor-tool"><span onclick="zeditor.add(\'[b]\',\'[/b]\')" class="editor-button-outer" title="Negritas">' + zeditor.lang.bold_button + '</span><span onclick="zeditor.add(\'[i]\',\'[/i]\')"  class="editor-button-outer" title="Italica">' + zeditor.lang.italic_button + '</span><span onclick="zeditor.add(\'[u]\',\'[/u]\')"  class="editor-button-outer" title="Subrayado">' + zeditor.lang.underline_button + '</span><span onclick="zeditor.add(\'[strike]\',\'[/strike]\')"  class="editor-button-outer" title="Cancelado">' + zeditor.lang.strike_button + '</span><span class="editor-button-outer" title="Color de la fuente" onclick="zeditor.popup(\'ze-color\', this);zeditor.createColor()">' + zeditor.lang.color_button + '</span><span title="Tags para colocar código, contine además el hide" onclick="zeditor.add(\'[hide][code]\',\'[/code][/hide]\')"  class="editor-button-outer">' + zeditor.lang.code_button + '</span><span title="Ocultar un code" onclick="zeditor.add(\'[hidecode]\',\' [/hidecode]\')" class="editor-button-outer">' + zeditor.lang.hidecode_button + '</span><span class="editor-button-outer" onclick="zeditor.popup(\'ze-smiley\', this);zeditor.createSmilies()" title="Smilies">' + zeditor.lang.smiley_button + '</span><span class="editor-button-outer" onclick="zeditor.popup(\'ze-upload\', this);zeditor.imgur.prepare()" title="Subir una imagen">' + zeditor.lang.upload_button + '</span><span class="editor-button-outer" onclick="zeditor.tag(this)" title="Etiqueta al usuario de este post">' + zeditor.lang.tag_button + '</span><span title="Ocultar un link para compartir" onclick="zeditor.add(\'[download]\',\' [/download]\')" class="editor-button-outer">' + zeditor.lang.download_button + '</span><span title="ocultar texto de los visitantes" onclick="zeditor.add(\'[noguest]\',\'[/noguest]\')" class="editor-button-outer">' + zeditor.lang.noguest_button + '</span><span title="Colocar tags IMG a una imagen" onclick="zeditor.add(\'[img]\',\'[/img]\')" class="editor-button-outer">' + zeditor.lang.tagimg_button + '</span><span title="Contenido offtopic" onclick="zeditor.add(\'[offtopic]\',\'[/offtopic]\')" class="editor-button-outer">' + zeditor.lang.offtopic_button + '</span><div class="modbar" style="display:none"><span title="Moderación Warning" onclick="zeditor.add(\'[warning]\',\'[/warning]\')" class="editor-button-outer">' + zeditor.lang.warning_button + '</span><span title="Moderación Alerta" onclick="zeditor.add(\'[alert]\',\'[/alert]\')" class="editor-button-outer">' + zeditor.lang.alert_button + '</span><span title="Moderación todo esta bien" onclick="zeditor.add(\'[ok]\',\'[/ok]\')" class="editor-button-outer">' + zeditor.lang.ok_button + '</span><span title="Moderación Información" onclick="zeditor.add(\'[info]\',\'[/info]\')" class="editor-button-outer">' + zeditor.lang.info_button + '</span></div></div></div><div id="ze-popups"><div id="ze-subject" class="ze-popups" style="display:none"><input id="editor-subject" type="text"></input></div><div id="ze-mode" class="ze-popups" style="display:none"><p><center>Selecciona un tema</center></p><p><input type="radio" name="ze-mode" checked="checked"> Light grey</input><p></div><div id="ze-color" class="ze-popups" style="display:none"></div><div id="ze-smiley" class="ze-popups" style="display:none"></div><div id="ze-image" class="ze-popups" style="display:none"><input type="text" style="height:20px;border:1px solid #BDBDBD" /><div><br><span class="editor-button-confirm" onclick="zeditor.popup(\'ze-image\', this);zeditor.add(\'[img]\'+this.parentNode.previousSibling.value, \'[/img]\');this.parentNode.previousSibling.value=\'\'">OK</span></div></div><div id="ze-upload" class="ze-popups" style="display:none"><div id="ze-imgur"><span id="ze-imgur-mode" class="editor-button-confirm" onclick="zeditor.imgur.mode()">Mode</span><span onclick="zeditor.imgur.files()"><input id="ze-imgur-input" type="input" placeholder="' + zeditor.lang.imgur_placeholder1 + '" value="" disabled></span><span id="ze-imgur-submit" class="editor-button-confirm" onclick="zeditor.imgur.submit(this)">Submit</span><input type="file" id="ze-imgur-placeholder" multiple><div id="ze-imgur-status"></div><div id="ze-imgur-images"></div></div></div></div><div id="outer-preview"><div id="ze-preview" ondblclick="zeditor.closePreview(this)"></div><div id="editor-loading" style="display: none"><img src="http://i11.servimg.com/u/f11/16/80/27/29/ajax-l10.gif" /><br>' + zeditor.lang.loading + '</div><textarea name="message" id="editor-textarea" placeholder="Escribe tu mensaje"></textarea></div><div id="editor-data"><input type="hidden" value="reply" name="mode"><input type="hidden" value="1" name="notify"></div><div id="editor-post-tool"><div id="editor-post-button"><span  id="editor-send-button" onclick="zeditor.post(this)">' + zeditor.lang.send_button + '</span><span onclick="zeditor.preview(this)" id="editor-preview-button">' + zeditor.lang.preview_button + '</span><span onclick="zeditor.advance()">' + zeditor.lang.advance_button + '</span></div><div id="editor-mode"><span onclick="zeditor.popup(\'ze-subject\', this)">' + zeditor.lang.subject_button + '</span><span onclick="zeditor.popup(\'ze-mode\', this)"></span></div></div></form></div>')
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
            $(this).parent().parent().after('<a class="pbutton1" onclick="zeditor.start(\'reply\', this)">' + zeditor.lang.reply_button + '</a><a class="pbutton2" onclick="zeditor.start(\'pm\', this)">' + zeditor.lang.pm_button + '</a>');
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
            zeditor.textarea.value = "";
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
            document.getElementById('editor-top').setAttribute('style', 'height:38px; transform: scaleY(1);-webkit-transform: scaleY(1)');
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
        document.getElementById('editor-top').setAttribute('style', 'height:38px; transform: scaleY(1);-webkit-transform:scaleY(1)')
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
                if ($(".post").first().find(".descargar").length > 0) {
                    $(".descargar").find("a,span").removeAttr("style")
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
            if (confirm("Si continuas al editor avanzado perderas lo escrito")) {
                location.href = zeditor.url
            }
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
$(".mp").attr("onclick", "zeditor.start('pm', this)").parent().removeAttr("href").css("cursor", "pointer");
$(".post").find(".postnumber").find("a").on("click", function () {
    zeditor.start('reply', this);
    var aaa_text = $(this).attr("href");
    $("#editor-textarea").val('[post]' + aaa_text + '[/post]');
});