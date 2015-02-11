   console.log("--------------> Zeditor");
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
        reply_button: "Responder",
        cancel_button: "Cancelar",
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
      
       download_button: '<img src="https://cdn0.iconfinder.com/data/icons/octicons/1024/cloud-download-16.png"/>',
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
        inlinecode_button: '<img src="https://cdn2.iconfinder.com/data/icons/ledicons/page_code.png">',
        send_button: "Enviar",
        tag_button: "@",
        copyright_button: '<img src="https://cdn2.iconfinder.com/data/icons/color-svg-vector-icons-part-2/512/copyright_right_of_first_publication-16.png"/>',
        spoiler_button: '<img src="https://cdn3.iconfinder.com/data/icons/humano2/16x16/apps/kblogger.png">',
        imgur_placeholder1: "Selecciona los archivos que deseas subir",
        imgur_placeholder2: "URL externa"
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
            zeditor.button_dom = ".profile-icons";
        }
        if (!window.jQuery) {
            alert("JQuery is required to run this. Visit http://www.jquery.com/ for more details");
        } else {
            zeditor.button(zeditor.button_dom);
            for (var s = $(zeditor.message_dom), a = 0, t = s.length; a < t; a++) {
                s[a].innerHTML = zeditor.replace(s[a].innerHTML);
            }
            $(document.body).append('<div id="ze-editor" style="display:none"><form id="ze-editor-form" name="ze-editor" method="post" action="/post"><div id="editor-top"><div id="editor-tool"><div class="newtab" style="display:none;margin-top: 27px;left: 312px;top: 33px;z-index: 999; position: absolute;border:1px solid #ccc;background:#fff"><iframe src="http://source.openphpbb.com/h3-tinypic" style="padding-bottom:0;border:none" frameborder="1" height="280px" scrolling="si" width="285px"></iframe></div><span onclick="zeditor.add(\'[b]\',\'[/b]\')" class="editor-button-outer" title="Negritas">' +
                zeditor.lang.bold_button + '</span><span onclick="zeditor.add(\'[i]\',\'[/i]\')"  class="editor-button-outer" title="Italica">' +
                zeditor.lang.italic_button + '</span><span onclick="zeditor.add(\'[u]\',\'[/u]\')"  class="editor-button-outer" title="Subrayado">' +
                zeditor.lang.underline_button + '</span><span onclick="zeditor.add(\'[strike]\',\'[/strike]\')"  class="editor-button-outer" title="Cancelado">' +
                zeditor.lang.strike_button + "</span><span onclick=\"zeditor.add('[strike]','[/strike]')\"  class=\"editor-button-outer\">" +
                zeditor.lang.strike_button + "</span><span onclick=\"zeditor.add('[justify]','[/justify]')\" class=\"editor-button-outer\">" +
                zeditor.lang.justify_button + "</span><span onclick=\"zeditor.add('[center]','[/center]')\" class=\"editor-button-outer\">" +
                zeditor.lang.center_button + "</span><span onclick=\"zeditor.add('[left]','[/left]')\" class=\"editor-button-outer\">" + zeditor.lang.left_button + "</span><span onclick=\"zeditor.add('[right]','[/right]')\" class=\"editor-button-outer\">" + zeditor.lang.right_button + '</span><span class="editor-button-outer" title="Color de la fuente" onclick="zeditor.popup(\'ze-color\', this);zeditor.createColor()">' +
                zeditor.lang.color_button + '</span><span title="Inserta un url" onclick="zeditor.add(\'[url]\',\'[/url]\')" class="editor-button-outer">' +
                zeditor.lang.postlink_button + '</span><span title="Spoilers" onclick="zeditor.add(\'[spoiler]\',\'[/spoiler]\')" class="editor-button-outer">' +
                zeditor.lang.spoiler_button + '</span><span title="Tags para colocar código, contine además el hide" onclick="zeditor.add(\'[hide][code]\',\'[/code][/hide]\')"  class="editor-button-outer">' +
                zeditor.lang.code_button + '</span><span title="Tags para colocar código en línea" onclick="zeditor.add(\'[ic]\',\'[/ic]\')"  class="editor-button-outer">' +
                zeditor.lang.inlinecode_button + '</span><span class="editor-button-outer" onclick="zeditor.popup(\'ze-smiley\', this);zeditor.createSmilies()" title="Smilies">' +
                zeditor.lang.smiley_button + '</span><span class="editor-button-outer" onclick="zeditor.popup(\'ze-upload\', this);zeditor.imgur.prepare()" title="Subir una imagen">' +
                zeditor.lang.upload_button + '</span><span class="editor-button-outer tinypic" ><img src="http://i.imgur.com/vU0Y04s.png"/></span><span class="editor-button-outer" onclick="zeditor.tag(this)" title="Etiqueta al usuario de este post">' +
                zeditor.lang.tag_button + '</span><span title="Ocultar un link para compartir" onclick="zeditor.add(\'[download]\',\' [/download]\')" class="editor-button-outer">' +
                zeditor.lang.download_button + '</span><span title="Ocultar un code para compartir" onclick="zeditor.add(\'[hidecode]\',\' [/hidecode]\')" class="editor-button-outer">' +
                zeditor.lang.hidecode_button + '</span><span title="ocultar texto de los visitantes" onclick="zeditor.add(\'[noguest]\',\'[/noguest]\')" class="editor-button-outer">' +
                zeditor.lang.noguest_button + '</span><span title="Colocar tags IMG a una imagen" onclick="zeditor.add(\'[img]\',\'[/img]\')" class="editor-button-outer">' +
                zeditor.lang.tagimg_button + '</span><span title="Contenido offtopic" onclick="zeditor.add(\'[offtopic]\',\'[/offtopic]\')" class="editor-button-outer">' +
                zeditor.lang.offtopic_button + '</span><div class="modbar" style="display:none"><span title="Moderación Warning" onclick="zeditor.add(\'[warning]\',\'[/warning]\')" class="editor-button-outer">' +
                zeditor.lang.warning_button + '</span><span title="Moderación Alerta" onclick="zeditor.add(\'[alert]\',\'[/alert]\')" class="editor-button-outer">' +
                zeditor.lang.alert_button + '</span><span title="Moderación todo esta bien" onclick="zeditor.add(\'[ok]\',\'[/ok]\')" class="editor-button-outer">' +
                zeditor.lang.ok_button + '</span><span title="Moderación Información" onclick="zeditor.add(\'[info]\',\'[/info]\')" class="editor-button-outer">' +
                zeditor.lang.info_button + '</span></div><span class="editor-button-outer" onclick="zeditor.copyright()" id="ze-copyright">' +
                zeditor.lang.copyright_button + '</span></div></div><div id="ze-popups"><div id="ze-subject" class="ze-popups" style="display:none"><input id="editor-subject" type="text"></input></div><div id="ze-mode" class="ze-popups" style="display:none"><p><center>Selecciona un tema</center></p><p><input type="radio" name="ze-mode" checked="checked"> Light grey</input><p></div><div id="ze-color" class="ze-popups" style="display:none"></div><div id="ze-smiley" class="ze-popups" style="display:none;top:38px!important;"></div><div id="ze-image" class="ze-popups" style="display:none"><input type="text" style="height:20px;border:1px solid #BDBDBD" /><div><br><span class="editor-button-confirm" onclick="zeditor.popup(\'ze-image\', this);zeditor.add(\'[img]\'+this.parentNode.previousSibling.value, \'[/img]\');this.parentNode.previousSibling.value=\'\'">OK</span></div></div><div id="ze-upload" class="ze-popups" style="display:none"><div id="ze-imgur"><span id="ze-imgur-mode" class="editor-button-confirm" onclick="zeditor.imgur.mode()">Mode</span><span onclick="zeditor.imgur.files()"><input id="ze-imgur-input" type="input" placeholder="' +
                zeditor.lang.imgur_placeholder1 + '" value="" disabled></span><span id="ze-imgur-submit" class="editor-button-confirm" onclick="zeditor.imgur.submit(this)">Submit</span><input type="file" id="ze-imgur-placeholder" multiple><div id="ze-imgur-status"></div><div id="ze-imgur-images"></div></div></div></div><div id="outer-preview"><div id="ze-preview" ondblclick="zeditor.closePreview(this)"></div><div id="editor-loading" style="display: none"><img src="http://www.adictosalgear.org/adictosalgear/files/lodwall.gif" style="border:none!important" /><br>' +
                zeditor.lang.loading + '</div><textarea name="message" id="editor-textarea" placeholder="Escribe tu mensaje"></textarea></div><div id="editor-data"><input type="hidden" value="reply" name="mode"><input type="hidden" value="1" name="notify"></div><div id="editor-post-tool"><span class="mp-msg" style="margin-top:7px;position:absolute;margin-left:311px;color:rgb(0, 0, 148);"></span><div id="editor-post-button"><span  id="editor-send-button" onclick="zeditor.post(this)">' +
                zeditor.lang.send_button + '</span><span onclick="zeditor.preview(this)" id="editor-preview-button">' +
                zeditor.lang.preview_button + '</span><span class="advance-button" onclick="zeditor.advance()">' +
                zeditor.lang.advance_button + '</span><span class="cancel-button" onclick="$(\'#ze-editor\').slideToggle().addClass(\'postUp\');$(\'.baivietdai\').height(310);$(\'body,html\').stop().animate({scrollTop: $(this).closest(\'.post\').offset().top}, 100); window.onbeforeunload = false ">' +
                zeditor.lang.cancel_button + '</span></div><div id="editor-mode"><span onclick="zeditor.popup(\'ze-subject\', this)">' + zeditor.lang.subject_button + '</span><span class="mode-button" onclick="zeditor.popup(\'ze-mode\', this)"></span></div></div></form></div>');
        }
        zeditor.textarea = document.getElementById("editor-textarea");
        zeditor.subject = document.getElementById("editor-subject");
        zeditor.mode = document.getElementById("editor-mode").getElementsByTagName("span")[1];
        zeditor.editor = document.getElementById("ze-editor");
        zeditor.send_button = document.getElementById("editor-send-button");
        if (_userdata.user_level >= 1) {
            $(".modbar").removeAttr("style");
        }
    },
    copyright: function() {
        alert("zEditor 1.7.1 \n Modificado por Chalo \n Exclusivo para OS phpbb3")
    },
    bb: function() {
    $(function(){

        var preview = $(".prevMode").length;
    if (preview) {
        
         var p = $('#ze-preview');
    }
    if (zeditor.mode.innerHTML == zeditor.lang.edit&&!preview) {
       var p = dom;
    }
    if (zeditor.mode.innerHTML == zeditor.lang.reply&&!preview || zeditor.mode.innerHTML == zeditor.lang.quote&&!preview) {
      var p = $('.zeditor-new:last').find('.content');
    }
    for (var i = 0, post;
        (post = p[i++]);) {
        var codes = post.getElementsByTagName('code'),
            store = [];
        for (var j = 0, c;
            (c = codes[j++]);) {
            store.push(c.innerHTML);
            c.innerHTML = ''
        }
        post.innerHTML = BB.parse(post.innerHTML);
        for (var s, j = 0;
            (s = store[j]);) codes[j++].innerHTML = s
    }
});
},
    quote: function(a) {
        zeditor.loading("on");
        $.get(a.href, function(s) {
            zeditor.textarea.value += $(s).find("#text_editor_textarea").val().replace(/]/, '][quotelink="' + location.pathname + "#" + a.href.match(/[0-9]+/) + '"]\n');
            zeditor.textarea.focus();
            zeditor.loading("off");
        });
    },
    edit: function(a) {
        zeditor.loading("on");
        zeditor.url = a.href;
        if (zeditor.textarea.value !== "") {
            if (confirm(_userdata.username + " de continuar  perderas lo escrito")) {
                $.get(a.href, function(s) {
                    zeditor.textarea.value = $(s).find("#text_editor_textarea").val();
                    zeditor.subject.value = $(s).find('input[name="subject"]').val();
                    zeditor.textarea.focus();
                    zeditor.loading("off");
                });
            } else {
                zeditor.textarea.focus();
                zeditor.loading("off");
                return;
            }
        } else {
            $.get(a.href, function(s) {
                zeditor.textarea.value = $(s).find("#text_editor_textarea").val();
                zeditor.subject.value = $(s).find('input[name="subject"]').val();
                zeditor.textarea.focus();
                zeditor.loading("off");
            });
        }
    },
    button: function(s) {
        $(s).each(function() {
            $(this).find('a[href*="quote"]').attr("onclick", "zeditor.start('quote', this); return false");
            $(this).parent().parent().after('<table><td><a class="pbutton1" onclick="zeditor.start(\'reply\', this)">' + zeditor.lang.reply_button + '</a></td><td><a class="pbutton2" onclick="zeditor.start(\'pm\', this)">' + zeditor.lang.pm_button + "</a></td></table>");
            $(this).find('a[href*="editpost"]').attr("onclick", "zeditor.start('edit', this); return false");
        });
    },
    start: function(t, a) {
        var zeditoronbeforeunload = $("#editor-post-button").find("span").eq(0);
        window.onbeforeunload = function(s) {
            if (zeditor.textarea.value != "") {
                return _userdata.username + " tienes texto en el editor que podrias perder"
            }
        };
        zeditoronbeforeunload.submit = function(s) {
            window.onbeforeunload = false
        };
        $(zeditor.editor).appendTo($(a).parents(zeditor.post_dom).find(zeditor.message_dom));
        $(zeditor.editor).slideDown();
        switch (t) {
            case "reply":
                zeditor.textarea.focus();
                zeditor.url = $('a[href^="/post?t="]').first().attr("href");
                zeditor.mode.innerHTML = zeditor.lang.reply;
                zeditor.textarea.placeholder = _userdata.username + " escribe un comentario...";
                if (zeditor.textarea.value !== "") {
                    $(".mode-button").text(_userdata.username + ' si deseas publicar tu mensaje presiona ENVIAR');
                    $("#editor-send-button ").css("background", "gold");
                }
                if (zeditor.send_button.innerHTML === "Guardar") {
                    zeditor.send_button.innerHTML = "Enviar"
                }
                if (!$('.pathname-box').find('a[href="/f13-staff"]').length) {
                    $("#editor-send-button").on("click", function() {
                        if ($(".reply-mode").length && zeditor.textarea.value !== "") {
                            $.post("/privmsg", {
                                subject: "Mensaje automático",
                                message: _userdata.username + " comentó en : [url=" + window.location.href + "]" + document.title + "[/url]",
                                username: "Historial",
                                mode: "post_profile",
                                folder: "profile",
                                post: "Send"
                            });
                        }
                    });
                }
                $(".mp-msg").fadeOut("200");
                break;
            case "quote":
                zeditor.url = a.href;
                zeditor.quote(a);
                zeditor.mode.innerHTML = zeditor.lang.quote;
                if (zeditor.send_button.innerHTML === "Guardar") {
                    zeditor.send_button.innerHTML = "Enviar"
                }
                zeditor.textarea.focus();
                $(".mp-msg").fadeOut("200");
                break;
            case "edit":
                zeditor.edit(a);
                zeditor.mode.innerHTML = zeditor.lang.edit;
                zeditor.send_button.innerHTML = "Guardar";
                if ($(".thugon").length && zeditor.send_button.innerHTML === "Guardar") {
                    $(".baivietdai").height("100%");
                }
                zeditor.textarea.focus();
                $(".mp-msg").fadeOut("200");
                break;
            case "pm":
                if (zeditor.send_button.innerHTML === "Guardar") {
                    zeditor.send_button.innerHTML = "Enviar"
                }
                zeditor.textarea.focus();
                zeditor.url = !1;
                zeditor.mode.innerHTML = zeditor.lang.pm;
                zeditor.textarea.placeholder = _userdata.username + " redacta tu mensaje privado...";
                var s = $(".mp-mode").parents(zeditor.post_dom).find(".author").find('a[href^="/u"]').eq(0).text();
                $(".mp-msg").fadeIn("200").html("Mensaje para:" + s);
                zeditor.textarea.focus();
                break;
        }
    },
    add: function(u, s) {
        zeditor.textarea.focus();
        if (typeof(zeditor.textarea) != "undefined") {
            var v = parseInt(zeditor.textarea.value.length);
            var t = zeditor.textarea.selectionStart;
            var w = zeditor.textarea.selectionEnd;
            zeditor.textarea.value = zeditor.textarea.value.substring(0, t) + u + zeditor.textarea.value.substring(t, w) + s + zeditor.textarea.value.substring(w, v);
        } else {
            zeditor.textarea.value += u + s;
        }
        zeditor.textarea.focus();
    },
    preview: function(a) {
  
        preview = document.getElementById("ze-preview");
        if (preview.style.display == "block") {
            preview.style.display = "none";
            document.getElementById("editor-top").setAttribute("style", "height:38px; transform: scaleY(1);-webkit-transform: scaleY(1)");
            a.innerHTML = zeditor.lang.preview_button;
               $(".mode-button").removeClass("prevMode");
        } else {
            a.innerHTML = zeditor.lang.close_button;
            document.getElementById("editor-top").setAttribute("style", "height:3px; transform: scaleY(0);-webkit-transform: scaleY(0)");
                 $(".mode-button").addClass("prevMode");
            $.post(zeditor.url, {
                message: zeditor.textarea.value,
                preview: "Preview"
            }, function(s) {
                preview.style.display = "block";
                preview.innerHTML = zeditor.replace($(s).find(zeditor.preview_dom).html());
              setTimeout(function() {
              
              zeditor.bb()
              },10)
            });
        }
    },
    closePreview: function(a) {
        $(a).hide();
        zeditor.textarea.focus();
        document.getElementById("editor-preview-button").innerHTML = zeditor.lang.preview_button;
        document.getElementById("editor-top").setAttribute("style", "height:38px; transform: scaleY(1);-webkit-transform:scaleY(1)");
     
    },
    post: function(a) {
        if (zeditor.mode.innerHTML == zeditor.lang.quote) {
            zeditor.url = $('a[href^="/post?t="]').first().attr("href");
        }
        if (zeditor.url) {
            if (zeditor.textarea.value === 0) {
                alert(zeditor.lang.no_message);
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
                        alert(zeditor.lang.flood_message);
                    } else {
                        if (u.indexOf("A new message") > 0) {
                            $.post("/post", $(u).find("form[name='post']").serialize() + "&post=1", function(v) {
                                (index < 0) ? alert(zeditor.lang.error_message): zeditor.newPost($(v).find('p:contains("' + b + '") a:first').attr("href"));
                                zeditor.closePreview("#ze-preview");
                            });
                        } else {
                            (index < 0) ? alert(zeditor.lang.error_message): zeditor.newPost($(u).find('p:contains("' + b + '") a:first').attr("href"));
                            zeditor.closePreview("#ze-preview");
                        }
                    }
                });
            }
        } else {
            zeditor.pm(a);
        }
    },
    newPost: function(a) {
        var s = a.split("#")[1];
        zeditor.editor.style.display = "none";
        if (zeditor.mode.innerHTML == zeditor.lang.reply || zeditor.mode.innerHTML == zeditor.lang.quote) {
            $.get(a, function(t) {
                setTimeout(function() {
                
                zeditor.bb()
                }, 100);
                $('<div class="zeditor-new">' + zeditor.replace($(t).find("#p" + s).wrapAll("<div></div>").parent().html()) + "</div>").insertAfter(zeditor.post_dom + ":last");
                $(".postprofile").last().find(".f_a2").contents().filter(function() {
                    return this.nodeType === 3;
                }).wrap("<p></p>");
              if($(".descargar.hidecode").length){
               $("html,body").animate({
                    scrollTop: $(".texto-descarga").offset().top
                }, 200);
              }else{
                $("html,body").animate({
                    scrollTop: $(".zeditor-new:last").offset().top
                }, 200);
            }
                zeditor.button(".zeditor-new:last " + zeditor.button_dom);
            });
        }
        if (zeditor.mode.innerHTML == zeditor.lang.edit) {
            dom = $(zeditor.editor).parents(zeditor.post_dom).find(zeditor.message_dom);
            $.get(a, function(t) {
                setTimeout(function() {
                zeditor.bb();
                 }, 50);
                $(dom).html(zeditor.replace($(t).find("#p" + s + " " + zeditor.message_dom).html()));
                $(dom).hide().fadeIn("slow");
            });
        }
        zeditor.textarea.value = "", $(function() {
            if (_userdata.user_posts > 5) {
                if ($(".post").first().find(".descargar").length > 0) {
                    $(".descargar").find("a,span").removeAttr("style");
                    $(".info-new").remove();
                }
            }
        });
    },
    popup: function(a, s) {
        zeditor.textarea.focus();
        x = document.getElementById(a);
        y = document.getElementById("ze-editor").offsetWidth;
        if (x.style.display == "none") {
            position = $(s).position().left;
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
    createSmilies: function() {
        smiley = document.getElementById("ze-smiley");
        if (smiley.innerHTML === "") {
            $(smiley).load("/smilies.forum?mode=smilies_frame", function() {
                this.innerHTML = this.innerHTML.replace(/alt=\"(.*?)\"/g, "onclick=\"zeditor.smiley('$1')\"");
            });
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
                        t = t + '<td style="background: #' + u + '" title="#' + u + '"><div style="background:#' + u + '" onclick="zeditor.add(\'[color=#' + u + "]', '[/color]');zeditor.hideColor()\"></div></td>";
                    }
                }
                t = t + "</tr>";
            }
            document.getElementById("ze-color").innerHTML = t + '</table><div id="ze-color-info"><div class="ze-color-input"><div>#</div><input id="ze-color-hex" maxlength="6" onkeypress="zeditor.convertHex(this)" placeholder="000000"></div><div class="ze-color-input"><div>R</div><input id="ze-color-r" maxlength="3" onkeypress="zeditor.convertRGB()" placeholder="000"></div><div class="ze-color-input"><div>G</div><input id="ze-color-g" maxlength="3" onkeypress="zeditor.convertRGB()" placeholder="000"></div><div class="ze-color-input"><div>B</div><input id="ze-color-b" maxlength="3" onkeypress="zeditor.convertRGB()" placeholder="000"></div><div class="editor-button-confirm" onclick="zeditor.submitColor()">OK</div></div>';
        }
    },
    hideColor: function() {
        document.getElementById("ze-color").setAttribute("style", "display:none");
    },
    submitColor: function() {
        if (document.getElementById("ze-color-hex").value !== "") {
            zeditor.add("[color=#" + document.getElementById("ze-color-hex").value + "]", "[/color]");
        } else {
            zeditor.add("[color=#000000]", "[/color]");
        }
        zeditor.hideColor();
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
        }).done(function() {
            zeditor.textarea.placeholder = _userdata.username + " tu mensaje privado se envió con éxito";
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
        if ($(".mp-mode").length) {
            var a = $(".mp-mode").parents(zeditor.post_dom).find(".author").find('a[href^="/u"]').eq(0).attr("href").split("u");
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
$(function() {

$(".author").find("strong").add($(".postprofile").find("strong:eq(1)")).attr("title", "Menciona a este usuario").on("click", function(event) {
    event.preventDefault();
    $('.baivietdai').height("100%");
    zeditor.textarea.focus();
    zeditor.start('reply', this);
    isTagName = $(this).text();
    isValue = $(this).closest(".post").find(".zeditor-message").find("span:eq(0)").text();
     $.post("/privmsg", {
             folder: "inbox",
             mode: "post",
             post: "1",
             username: isTagName,
             subject: "Mensaje automático: Te he etiquetado en: " + document.title,
       message: "[quote]Hola {USERNAME}, Te he etiquetado en :" + "[url=" + window.location + "]" + document.title + "[/url] \n " + isValue + "[/quote]",
         });
    $('#editor-textarea')[0].value += '@"' + isTagName + '", ';
    return false;
});
if (_userdata.session_logged_in != 1) {
    $(".pbutton1").add(".pbutton2").removeAttr("onclick");
}

     zeditor.ready()
});
$(function(){
  $('.tinypic').on("click", function() {
        $(".newtab").css({
            "left": $(this).position().left,
            "top": $(this).position().top
        });
        $(".newtab").toggle();
    });
    });
console.log("--------------> Completado todo lo relacionado con Zeditor :)");