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
