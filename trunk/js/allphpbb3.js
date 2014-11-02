(function(a) {
    var c = {
        check: function() {
            a.get("/forum", function(b) {
                document.getElementById("logout") && (0 < a(b).find("#i_icon_mini_new_message").length && !document.getElementById("pm_alert") ? a("body").prepend('<div id="pm_alert"><a href="/privmsg?folder=inbox">' + a(b).find("#i_icon_mini_new_message")[0].title + "</a></div>") : document.getElementById("pm_alert") && document.getElementById("pm_alert").firstChild.innerHTML != a(b).find("#i_icon_mini_new_message")[0].title && (document.getElementById("pm_alert").firstChild.innerHTML = a(b).find("#i_icon_mini_new_message")[0].title))
            })
        },
        init: function() {
            setInterval(function() {
                c.check()
            }, 15E3)
        }
    };
    window.ajaxify = c
})(jQuery);
$(function() {
    ajaxify.init()
});
var mpindex = $(".forabg").length;
if (mp && mpindex) {
 $(function () {
  $('.panel.mps-index').after('<div class="forabg preview-mp"><ul class="topiclist"><li id="ajaxPM_header" class="header"><dl><dt>Selecciona el mensaje :</dt></dl></li></ul><div id="ajaxPM" class="panel" style="padding:3px;"><div style="text-align:center;font-size:16px;">No hay mensaje seleccionado</div></div></div>');
  _activePM = undefined;
  $('.pmlist').find('.topictitle').on("click", function () {
   if ($(this).attr('href') == _activePM) {
    if (document.getElementById('notif_activepm')) return false;
    $('body').append('<div id="notif_activepm" class="notif_ajaxPM"><div class="notif_icon">!</div>El MP que seleccionaste esta actualmente activo.<br/><a id="dismiss_notif" style="cursor:pointer;float:right;">Cerrar la notificación</a></div>');
    $('#dismiss_notif').on("click", function () {
     $('.notif_ajaxPM').fadeOut(300, function () {
      $(this).remove()
     })
    });
    $('#notif_activepm').animate({
     top: "40px"
    }, 700);
    return false
   }
   _activePM = $(this).attr('href');
   $('#ajaxPM_nav, .notif_ajaxPM').remove();
   $('#ajaxPM').html('<div style="text-align:center;font-size:16px;">Cargando...</div>').load(_activePM + ' form[action^="/privmsg"]', function () {
    $('#ajaxPM_header dl').append('<dd id="ajaxPM_nav" style="float:right"><a id="directLink" class="ajaxPM_link">Ver más</a>&nbsp;&bull;&nbsp;<a id="clearSelected" class="ajaxPM_link">Limpiar</a></dd>');
    $('#directLink').attr('href', _activePM);
    $('#clearSelected').on("click", function () {
     $('#ajaxPM').html('<div style="text-align:center;font-size:16px;">No seleccionaste un mensaje</div>');
     $('#ajaxPM_nav, .notif_ajaxPM').remove();
     _activePM = undefined
    })
   });
   return false
  })
 });
}
var quicktopic = {
 color: "orange"
};
(function (a) {
 function c() {
  a("body").prepend('<div id="loading-bar" style="z-index: 9999; background-color: ' + quicktopic.color + '; position: fixed; top: 0; width: 20%; left: 0; height: 3px;"></div>');
  document.forms.post.message.value = a("#text_editor_textarea").sceditor("instance").val();
  a.post("/post", a(document.forms.post).serialize() + "&post=1", function (a) {
   setInterval(function () {
    "100%" != document.getElementById("loading-bar").style.width && (document.getElementById("loading-bar").style.width = parseInt(document.getElementById("loading-bar").style.width) + 10 + "%")
   }, 10);
   window.location = void 0 == quicktopic.redirect ? a.match(/url=(.*?)"/)[1] : quicktopic.redirect
  })
 }
 var b;
 b = void 0 == quicktopic.forums || "string" != typeof quicktopic.forums ? "\\d+" : quicktopic.forums.replace(/,\s?/g, "|");
 RegExp("\\/?post\\?f=(" + b + ").*").test(window.location) && a(function () {
  a("#text_editor_textarea").length && (a(window).on("beforeunload", function () {
   if (a(".sceditor-container").find("textarea").val().length || a(".sceditor-container").find("i-frame").contents().find("body").text().length) return "Todavía no has enviado el mensaje. ¿Quieres salir sin enviarlo?"
  }), a(document.forms.post.post).on("click", function (a) {
   $(window).off("beforeunload");
   a.preventDefault();
   c()
  }))
 })
})(jQuery);
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
  notify_message: _userdata.username +" deseas etiquetar a",
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
   $(document.body).append('<div id="ze-editor" style="display:none"><form id="ze-editor-form" name="ze-editor" method="post" action="/post"><div id="editor-top"><div id="editor-tool"><span onclick="zeditor.add(\'[b]\',\'[/b]\')" class="editor-button-outer">' + zeditor.lang.bold_button + '</span><span onclick="zeditor.add(\'[i]\',\'[/i]\')"  class="editor-button-outer">' + zeditor.lang.italic_button + '</span><span onclick="zeditor.add(\'[u]\',\'[/u]\')"  class="editor-button-outer">' + zeditor.lang.underline_button + '</span><span onclick="zeditor.add(\'[strike]\',\'[/strike]\')"  class="editor-button-outer">' + zeditor.lang.strike_button + '</span><span class="editor-button-outer" onclick="zeditor.popup(\'ze-color\', this);zeditor.createColor()">' + zeditor.lang.color_button + '</span><span class="editor-button-outer" onclick="zeditor.popup(\'ze-smiley\', this);zeditor.createSmilies()">' + zeditor.lang.smiley_button + '</span><span class="editor-button-outer" onclick="zeditor.popup(\'ze-image\', this)">' + zeditor.lang.image_button + '</span><span class="editor-button-outer" onclick="zeditor.popup(\'ze-upload\', this);zeditor.imgur.prepare()">' + zeditor.lang.upload_button + '</span><span class="editor-button-outer" onclick="zeditor.tag(this)">' + zeditor.lang.tag_button + '</span><span onclick="zeditor.add(\'[download][ic]\',\' [/ic][/download]\')" class="editor-button-outer">' + zeditor.lang.download_button + '</span><span onclick="zeditor.add(\'[noguest]\',\'[/noguest]\')" class="editor-button-outer">' + zeditor.lang.noguest_button + '</span><span onclick="zeditor.add(\'[img]\',\'[/img]\')" class="editor-button-outer">' + zeditor.lang.tagimg_button + '</span><span onclick="zeditor.add(\'[offtopic]\',\'[/offtopic]\')" class="editor-button-outer">' + zeditor.lang.offtopic_button + '</span><div class="modbar" style="display:none"><span onclick="zeditor.add(\'[warning]\',\'[/warning]\')" class="editor-button-outer">' + zeditor.lang.warning_button + '</span><span onclick="zeditor.add(\'[alert]\',\'[/alert]\')" class="editor-button-outer">' + zeditor.lang.alert_button + '</span><span onclick="zeditor.add(\'[ok]\',\'[/ok]\')" class="editor-button-outer">' + zeditor.lang.ok_button + '</span><span onclick="zeditor.add(\'[info]\',\'[/info]\')" class="editor-button-outer">' + zeditor.lang.info_button + '</span></div></div></div><div id="ze-popups"><div id="ze-subject" class="ze-popups" style="display:none"><input id="editor-subject" type="text"></input></div><div id="ze-mode" class="ze-popups" style="display:none"><p><center>Selecciona un tema</center></p><p><input type="radio" name="ze-mode" checked="checked"> Light grey</input><p></div><div id="ze-color" class="ze-popups" style="display:none"></div><div id="ze-smiley" class="ze-popups" style="display:none"></div><div id="ze-image" class="ze-popups" style="display:none"><input type="text" style="height:20px;border:1px solid #BDBDBD" /><div><br><span class="editor-button-confirm" onclick="zeditor.popup(\'ze-image\', this);zeditor.add(\'[img]\'+this.parentNode.previousSibling.value, \'[/img]\');this.parentNode.previousSibling.value=\'\'">OK</span></div></div><div id="ze-upload" class="ze-popups" style="display:none"><div id="ze-imgur"><span id="ze-imgur-mode" class="editor-button-confirm" onclick="zeditor.imgur.mode()">Mode</span><span onclick="zeditor.imgur.files()"><input id="ze-imgur-input" type="input" placeholder="' + zeditor.lang.imgur_placeholder1 + '" value="" disabled></span><span id="ze-imgur-submit" class="editor-button-confirm" onclick="zeditor.imgur.submit(this)">Submit</span><input type="file" id="ze-imgur-placeholder" multiple><div id="ze-imgur-status"></div><div id="ze-imgur-images"></div></div></div></div><div id="outer-preview"><div id="ze-preview" ondblclick="zeditor.closePreview(this)"></div><div id="editor-loading" style="display: none"><img src="http://i11.servimg.com/u/f11/16/80/27/29/ajax-l10.gif" /><br>' + zeditor.lang.loading + '</div><textarea name="message" id="editor-textarea" placeholder="Escribe tu mensaje"></textarea></div><div id="editor-data"><input type="hidden" value="reply" name="mode"><input type="hidden" value="1" name="notify"></div><div id="editor-post-tool"><div id="editor-post-button"><span  id="editor-send-button" onclick="zeditor.post(this)">' + zeditor.lang.send_button + '</span><span onclick="zeditor.preview(this)" id="editor-preview-button">' + zeditor.lang.preview_button + '</span><span onclick="zeditor.advance()">' + zeditor.lang.advance_button + '</span></div><div id="editor-mode"><span onclick="zeditor.popup(\'ze-subject\', this)">' + zeditor.lang.subject_button + '</span><span onclick="zeditor.popup(\'ze-mode\', this)"></span></div></div></form></div>')
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
    zeditor.textarea.placeholder =_userdata.username+ " escribe un comentario...";
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
    zeditor.textarea.placeholder = _userdata.username +" redacta tu mensaje privado...";
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
   $("textarea").attr("placeholder", _userdata.username+" tu mensaje privado se envió con éxito")
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
 if (zeditor.textarea.value != '') return _userdata.username+ ' tienes texto en el editor que podrias perder'
};
zeditoronbeforeunload.submit = function (e) {
 window.onbeforeunload = false;
}
$(function () {
 zeditor.ready()
});
setTimeout(function () {
 $(function () {
  var panel = {
   time: 750,
   background: '#CCC',
   border: '#DDDDDD',
   shadow: 1,
   offsetX: '42'
  };
  var t0 = 'style="margin:0px 2px;"';
  var t1 = panel["shadow"];
  var t2 = panel["time"];
  if (t1 == 1) {
   var t3 = 'box-shadow:2px 2px 6px rgba(0,0,0,0.3);'
  } else {
   var t3 = 'box-shadow:none;'
  }
  var style = 'position:fixed;background:' + panel["background"] + ';border:1px solid ' + panel["border"] + ';display:inline-block;padding:10px;z-index:99999;' + t3;
  var login = '<div id="quickLoginPanel" style="' + style + '"><fieldset class="fields1 left fld_connexion"><form name="form_login" method="post" action="/login"><dl><dt><label for="username">Usuario:</label></dt><dd><input id="username" class="inputbox autowidth" type="text" value="" maxlength="40" size="25" name="username" tabindex="1"></dd></dl><dl><dt><label for="password">Contraseña:</label></dt><dd><input id="password" class="inputbox autowidth" type="password" maxlength="25" size="25" name="password" tabindex="2"></dd><dd><a href="/profile?mode=sendpassword">Olvide mi contraseña</a></dd></dl><dl><dd><label for="autologin"><input id="autologin" class="radio" type="checkbox" tabindex="4" name="autologin">Ingresar automaticamente</label></dd></dl><dl><dt>&nbsp;</dt><dd><input type="hidden" value="" name="redirect"><input type="hidden" value="" name="query"><input class="button1" type="submit" value="Entrar" tabindex="6" name="login"></dd></dl><a href="" id="quickLoginClose">Cerrar</a><form></fieldset></div>';
  var logout = '<div id="quickLogoutPanel" style="' + style + '"><form method="post" action="/login?logout=true"><p>¿Estas seguro de salir?</p><fieldset class="submit-buttons"><div id="tid" style="display:none;"></div><div id="key" style="display:none;"></div><input class="button2" type="submit" value="Si" name="confirm" ' + t0 + '><input class="button2" type="submit" value="No" name="cancel" id="quickLogoutClose" ' + t0 + '></fieldset></form></div>';
  if (!document.getElementById('logout')) {
   $('a[href*="/login"]').on("click", function () {
    if (!document.getElementById('quickLoginPanel')) {
     $('body').append(login);
     $('#quickLoginPanel').css('left', panel["offsetX"] + '%').css('top', '-25%').animate({
      top: '40px'
     }, t2);
     $('#quickLoginClose').on("click", function () {
      $('#quickLoginPanel').animate({
       top: '-25%'
      }, t2, function () {
       $('#quickLoginPanel').remove()
      });
      return false
     })
    }
    return false
   })
  } else {
   $('#logout').add('a[href="http://source.openphpbb.com/login?logout=1"]').on("click", function () {
    if (!document.getElementById('quickLogoutPanel')) {
     $('body').append(logout);
     $('#tid').load('/login?logout=1 input[name="tid"]');
     $('#key').load('/login?logout=1 input[name="key"]');
     $('#quickLogoutPanel').css('left', panel["offsetX"] + '%').css('top', '-25%').animate({
      top: '40px'
     }, t2);
     $('#quickLogoutClose').click(function () {
      $('#quickLogoutPanel').animate({
       top: '-25%'
      }, t2, function () {
       $('#quickLogoutPanel').remove()
      });
      return false
     })
    }
    return false
   })
  }
 })
}, 100);
(function () {
 function p(b, a) {
  return a ? b.replace(/\r?\n/g, "<br/>") : b.replace(/\<br\s?\/?\>/gi, "\n")
 }

 function l(b, a) {
  return '<span clapanda="' + b + '">' + a + "</span>"
 }

 function q(b, a, c) {
  return b.replace(RegExp("\\b(?:" + a.join("|") + ")\\b", "g"), function (a) {
   return l(c, a)
  })
 }

 function t(b, a, c) {
  for (var d in a) c = c.replace(a[d], function (a) {
   return l(b + "-" + d, a)
  });
  return c
 }
 var d = {
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
  parse: function (b, a) {
   var c = d.languages[b];
   if (!c) return a;
   var e = c.matchers,
    g = c.keywords,
    r = c.specials,
    u = (new Date).getTime(),
    s = {};
   a = p(a).replace(/\</g, "&lt;").replace(/>/g, "&gt;").replace(/&nbsp;/g, "");
   for (var k = 0, v = 0, f; f = e[k++];) {
    var h = this.regex[f],
     w = "\u00a3panda_" + f + "_" + u + "_",
     x = s[f] = {},
     n = !1;
    h && (h.inner && (n = h.inner, h = h.outer), a = a.replace(h, function (a) {
     var b = w + v+++"_" + (h.multiline ? "m_" : "") + "panda\u00a3";
     n && (a = t("panda-" + f, n, a));
     x[b] = a;
     return b
    }))
   }
   g.length && (a = q(a, g, "panda-keyword"));
   r.length && (a = q(a, r, "panda-special"));
   c.noints || (a = a.replace(/\b\d+(?:\.\d+)?\b/g, function (a) {
    return l("panda-int", a)
   }));
   for (k = e.length; k; k--) {
    f = e[k - 1];
    var c = s[f],
     m;
    for (m in c) g = c[m], m.indexOf("_m_") && (g = g.replace(/\n/g, '</span>\n<span clapanda="panda-' + f + '">')), a = a.replace(m, l("panda-" + f, g))
   }
   a = a.split(" ").join("&nbsp;").replace(/&nbsp;clapanda=/g, " class=").replace(/\t/g, "&nbsp;&nbsp;&nbsp;&nbsp;");
   return p('<ol><li class="panda-line">' + a.split(/\n/).join('</li><li class="panda-line">') + "</li></ol>", 1)
  },
  identify: function (b) {
   if (b.pandaType) return b.pandaType;
   var a = /(?:\s|^)panda[_-](\w+)(?:\s|$)/;
   return a.test(b.className) ? a.exec(b.className)[1] : "default"
  },
  colorNode: function (b) {
   var a = d.identify(b);
   d.cacheIdentity && (b.pandaType = a);
   b.className += " panda-code panda-" + a;
   b.innerHTML = d.parse(a, b.innerHTML)
  },
  addSpecials: function (b, a) {
   this.addKeywords(b, a, !0)
  },
  addKeywords: function (b, a, c) {
   if (b in d)
    for (var e = 0, g = a.length; e < g; e++) d.languages[b][c ? "specials" : "keywords"].push(a[e])
  },
  addLang: function (b, a) {
   if ("matchers" in a) {
    var c = d.languages[b] = {};
    d.installedLanguages.push(b);
    c.matchers = "string" == typeof a.matchers ? a.matchers.split(" ") : a.matchers;
    c.specials = ("string" == typeof a.specials ? a.specials.split(" ") : a.specials) || [];
    c.keywords = ("string" == typeof a.keywords ? a.keywords.split(" ") : a.keywords) || [];
    if (a.regex && "object" == typeof a.regex)
     for (var e in a.regex) d.regex[e] = a.regex[e]
   }
  }
 };
 window.panda = d;
 d.addLang("default", {
  matchers: ["string"],
  keywords: "var for while if else elseif function def class try catch return true false continue break case default delete switch in as null typeof sizeof null int char bool boolean long double float enum import struct signed unsigned",
  specials: ["document"]
 });
 d.onload = function () {
  for (var b = document.getElementsByTagName("code"), a = 0, c; c = b[a++];) d.colorNode(c)
 }
})();
panda.onload = function () {
 var themes = ['default', 'dark', 'deepsea', 'bright', 'neon', 'desert', 'plain', 'geany', 'github'],
  codes = document.getElementsByTagName('code'),
  curTheme = my_getcookie('panda-theme'),
  themeHTML = '<option value="null"> -------------- </option>';
 for (var i = 0, t;
  (t = themes[i++]);) {
  themeHTML += '<option value="' + t + '" ' + (curTheme && curTheme == t ? ' selected="selected"' : '') + '>';
  themeHTML += t.charAt(0).toUpperCase() + t.substr(1) + '</option>'
 }
 for (var j = 0, c;
  (c = codes[j++]);) {
  panda.colorNode(c);
  $(c.parentNode.parentNode).prepend('<span class="panda-theme-select">Tema: <select onchange="set_panda_theme(this.value)">' + themeHTML + '</select></span>')
 };
 if (curTheme) set_panda_theme(curTheme, codes)
};

function set_panda_theme(theme, codes) {
 codes = codes || document.getElementsByTagName('code');
 for (var j = 0, c;
  (c = codes[j++]);) {
  c.className = c.className.replace(/\s?panda-theme-\w+\s?/, '') + ' panda-theme-' + theme
 }
 my_setcookie('panda-theme', theme, 1)
};
$(panda.onload);

function selectCode(a) {
 a = a.parentNode.tagName === "B" ? $(a).closest("table").find(".cont_code")[0] : $(a).closest("dl").find("code")[0];
 if (window.getSelection) {
  var c = window.getSelection();
  if (c.setBaseAndExtent) c.setBaseAndExtent(a, 0, a, a.innerText.length - 1);
  else {
   window.opera && a.innerHTML.substring(a.innerHTML.length - 4) == "<BR>" && (a.innerHTML += " ");
   var b = document.createRange();
   b.selectNodeContents(a);
   c.removeAllRanges();
   c.addRange(b)
  }
 } else document.getSelection ? (c = document.getSelection(), b = document.createRange(), b.selectNodeContents(a), c.removeAllRanges(), c.addRange(b)) : document.selection && (b = document.body.createTextRange(), b.moveToElementText(a), b.select())
}
$(function () {
 $("dl.codebox:not(.spoiler,.hidecode) dt").append('<div class="sel-code"><p><img class="codeimg" src="https://cdn0.iconfinder.com/data/icons/typicons-2/24/code-outline-16.png"/>Código:</p><span onClick="selectCode(this)" class="selectCode" style="cursor:pointer">Seleccionar el contenido</span></div>')
});
if (tm) {
 $(document).ready(function () {
  var version = 'phpbb3';
  var settings = {
   repName: 'Puntos',
   repStyle: 'block',
   repImage: 'http://i57.servimg.com/u/f57/18/21/41/30/star12.png'
  };
  var repLv = {
   lv1: 1,
   lv2: 50,
   lv3: 100,
   lv4: 150,
   lv5: 200,
   lv6: 250,
   lv7: 320,
   lv8: 640
  };
  if (settings.repStyle.toLowerCase() == 'block') {
   var repBlock = '<span id="rLv" class="repuBlock">'
  } else if (settings.repStyle.toLowerCase() == 'image') {
   var repBlock = '<img id="rLv" src="' + settings.repImage + '"/>'
  } else {
   var repBlock = '<span id="rLv" class="repuBlock">'
  }
  var ver = {
   phpbb2: version.toLowerCase() == 'phpbb2',
   phpbb3: version.toLowerCase() == 'phpbb3',
   punbb: version.toLowerCase() == 'punbb',
   invision: version.toLowerCase() == 'invision'
  };
  var reg = new RegExp('.*' + settings.repName + ':\\s+(\\d+).*');
  if (ver.phpbb3 || ver.punbb || ver.invision) {
   if (ver.phpbb3 || ver.invision) {
    var profSel = '.postprofile';
    var addRepu = $(this).find('.f_a1').append('<div id="repu">')
   } else if (ver.punbb) {
    var profSel = '.user';
    var addRepu = $(this).find('.user-ident').prepend('<div id="repu">')
   }
   $(profSel).each(function () {
    var rep = Number($(this).text().replace(reg, '$1'));
    addRepu;
    if (rep >= repLv.lv1) {
     $(this).find('#repu').append(repBlock);
     var next = rep + '/' + repLv.lv2
    }
    if (rep >= repLv.lv2) {
     $(this).find('#repu').append(repBlock);
     var next = rep + '/' + repLv.lv3
    }
    if (rep >= repLv.lv3) {
     $(this).find('#repu').append(repBlock);
     var next = rep + '/' + repLv.lv4
    }
    if (rep >= repLv.lv4) {
     $(this).find('#repu').append(repBlock);
     var next = rep + '/' + repLv.lv5
    }
    if (rep >= repLv.lv5) {
     $(this).find('#repu').append(repBlock);
     var next = rep + '/' + repLv.lv6
    }
    if (rep >= repLv.lv6) {
     $(this).find('#repu').append(repBlock);
     var next = rep + '/' + repLv.lv7
    }
    if (rep >= repLv.lv7) {
     $(this).find('#repu').append(repBlock);
     var next = rep + '/' + repLv.lv8
    }
    if (rep >= repLv.lv8) {
     $(this).find('#repu').append(repBlock);
     var next = 'MAX'
    }
    $(this).find('#repu').attr('title', 'Reputation level ' + $(this).find('#rLv').length + '\nNext : (' + next + ')')
   })
  } else if (ver.phpbb2) {
   $('td .postdetails.poster-profile').each(function () {
    var rep = Number($(this).text().replace(reg, '$1'));
    $(this).parent().find('.name').next().after('<div id="repu">');
    if (rep >= repLv.lv1) {
     $(this).parent().find('#repu').append(repBlock);
     var next = rep + '/' + repLv.lv2
    }
    if (rep >= repLv.lv2) {
     $(this).parent().find('#repu').append(repBlock);
     var next = rep + '/' + repLv.lv3
    }
    if (rep >= repLv.lv3) {
     $(this).parent().find('#repu').append(repBlock);
     var next = rep + '/' + repLv.lv4
    }
    if (rep >= repLv.lv4) {
     $(this).parent().find('#repu').append(repBlock);
     var next = rep + '/' + repLv.lv5
    }
    if (rep >= repLv.lv5) {
     $(this).parent().find('#repu').append(repBlock);
     var next = rep + '/' + repLv.lv6
    }
    if (rep >= repLv.lv6) {
     $(this).parent().find('#repu').append(repBlock);
     var next = rep + '/' + repLv.lv7
    }
    if (rep >= repLv.lv7) {
     $(this).parent().find('#repu').append(repBlock);
     var next = rep + '/' + repLv.lv8
    }
    if (rep >= repLv.lv8) {
     $(this).parent().find('#repu').append(repBlock);
     var next = 'MAX'
    }
    $(this).parent().find('#repu').attr('title', 'Reputation level ' + $(this).parent().find('#rLv').length + '\nNext : (' + next + ')')
   })
  }
 });
}
var status_box = {
 lang: {
  woym: " ¿Que tienes en mente?",
  update: '<img src="http://www.adictosalgear.org/adictosalgear/files/pencil.png">',
  too_short: "Status muy corto.",
  updated: "¡Actualizado!",
  error: "Error. Intenta de nuevo."
 },
 init: function (b, a) {
  if (b) {
   var c = my_getcookie("fa_" + location.host.replace(/\./g, "_") + "_data");
   this.user_id = c ? parseInt(c.split("userid")[1].replace(/s:\d+/g, "").match(/\d+/)) : 0;
   if (a)
    for (var d in a) this.lang[d] = a[d];
   this.outer = document.getElementById("AAGstatus");
   this.outer.innerHTML = '<input id="AAGstatus_input" type="text" placeholder="'+_userdata.username + this.lang.woym + '"><div onclick="status_box.update()" class="status-button">' + this.lang.update + '</div><span id="AAGstatus_notice"></span>';
   this.input = document.getElementById("AAGstatus_input");
   this.id = b;
   this.initiated = !0
  }
 },
 update: function () {
  if (this.initiated) {
   var b = document.getElementById("AAGstatus_notice");
   if (2 > this.input.value.length) return b.innerHTML = this.lang.too_short = this.lang.too_short;
   var a = document.getElementById("logout");
   a && (a = a.href, a = a.substring(a.indexOf("tid=") + 4, a.indexOf("&key")), a = "id=" + this.id.substring(this.id.lastIndexOf("_") + 1) + '&active=1&content=[["' + this.id + '", "' + this.input.value + '"]]&tid=' + a + "&user=" + this.user_id, $.post("/ajax_profile.forum?jsoncallback=jQuery1", a, function (a) {
    0 < a.indexOf(status_box.input.value) ? (status_box.input.value = "", b.innerHTML = status_box.lang.updated, setTimeout("document.getElementById('AAGstatus_notice').innerHTML=\" \"", 2500)) : b.innerHTML = status_box.lang.error
   }))
  }
 }
};
if (_userdata.session_logged_in == '1') {
 $("#fa_menulist").prepend('<div id="AAGstatus"></div>');
 status_box.init('profile_field_13_1');
}
$("#fa_welcome").on("click", function () {
 $("#fa_menulist").slideToggle(100)
});
$("#fa_notifications").on("click", function () {
 $("#notif_list").slideToggle(100);
 $(this).attr("style", "background-image: url(http://adictosalgear.org/images/bell.png)!important;background-position: right!important;background-repeat: no-repeat!important;")
});
