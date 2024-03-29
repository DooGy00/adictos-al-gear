/*!
 * jQuery Plugin boxes v0.3
 *
 * by zzbaivong
 * http://devs.forumvi.com/
 */
(function(g) {
    var p = {
        init: function(b) {
            var a = g.extend({
                mode: "",
                title: "",
                message: "",
                okBtn: "X\u00e1c nh\u1eadn",
                cancelBtn: "H\u1ee7y b\u1ecf",
                closeBtn: "\u0110\u00f3ng",
                inputTxt: "",
                width: "auto",
                height: "auto",
                minWidth: 250,
                minHeight: 120,
                maxWidth: 800,
                maxHeight: 600,
                padding: [25, 20],
                border: [3, 3],
                autoClose: 0,
                noClose: !1,
                clickOut: !1,
                messString: !0,
                autoResize: !0,
                okBtnShow: !1,
                cancelBtnShow: !1,
                closeBtnShow: !1,
                inputTxtShow: !1,
                ok: function() {},
                cancel: function() {},
                close: function() {},
                input: function() {},
                button: function() {},
                helper: function() {},
                temp: {}
            }, b),
                h = {
                    boxes: '<div class="zzBoxes"></div>',
                    overlay: '<div class="zzBoxes_overlay"></div>',
                    inner: '<div class="zzBoxes_inner"></div>',
                    title: '<h2 class="zzBoxes_title"></h2>',
                    close: '<div class="zzBoxes_close"></div>',
                    content: '<div class="zzBoxes_content"></div>',
                    mess: '<div class="zzBoxes_mess"></div>',
                    input: '<input class="zzBoxes_input" type="text" />',
                    button: '<div class="zzBoxes_button"></div>',
                    ok: '<div class="zzBoxes_ok"></div>',
                    cancel: '<div class="zzBoxes_cancel"></div>'
                };
            b = function(c) {
                var b = eval("a.temp." + c);
                b || (b = eval("h." + c));
                return g(b)
            };
            var n = b("boxes"),
                x = b("overlay"),
                e = b("inner"),
                p = b("title"),
                s = b("close"),
                u = b("content"),
                t = b("mess"),
                l = b("input"),
                m = b("button"),
                q = b("ok"),
                r = b("cancel"),
                d = {
                    el: {
                        boxes: n,
                        overlay: x,
                        inner: e,
                        title: p,
                        close: s,
                        content: u,
                        mess: t,
                        input: l,
                        button: m,
                        ok: q,
                        cancel: r
                    },
                    effect: function(a) {
                        "load" == a ? a = "data:image/gif;base64,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" : "error" == a && (a = "data:image/png;base64,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");
                        x.css("background-image", "url(" + a + ")");
                        e.css({
                            opacity: 0,
                            top: "-100%"
                        })
                    },
                    removeEffect: function() {
                        0 == e.css("opacity") && (x.css("background-image", "none"), e.css("top", "-" + e.height()), e.animate({
                            opacity: 1,
                            top: "50%"
                        }))
                    },
                    curWidth: 0,
                    curHeight: 0,
                    center: function(b, h) {
                        h || (h = a.width);
                        e.width(h);
                        var c = e.width();
                        e.css({
                            width: c,
                            height: "auto",
                            "margin-left": "-" + c / 2 + "px"
                        });
                        var f = g(window).width(),
                            k = a.maxWidth;
                        k > f && (k = f);
                        c = c > k ? k : c;
                        f = a.minWidth;
                        c < f && (c = f);
                        e.css({
                            width: c,
                            "margin-left": "-" + (c / 2 + z[1]) + "px"
                        });
                        t && t.height("auto");
                        d.curWidth = c;
                        b || (b = a.height);
                        e.height(b);
                        c = 0;
                        m && (c = m.height());
                        c = e.height() + c;
                        e.css({
                            height: c,
                            "margin-top": "-" + c / 2 + "px"
                        });
                        f = g(window).height();
                        k = a.maxHeight;
                        k > f && (k = f);
                        c = c > k ? k : c;
                        f = a.minHeight;
                        c < f && (c = f);
                        e.css({
                            height: c,
                            "margin-top": "-" + (c / 2 + z[0]) + "px"
                        });
                        d.curHeight = c;
                        if (t) {
                            f = 0;
                            m && (f = m.outerHeight());
                            k = 0;
                            p && (k = p.outerHeight());
                            var n = 0;
                            l && (n = l.outerHeight(!0));
                            c -= k + n + f + 2 * A[0];
                            0 > c ? d.effect("error") : (t.height(c), d.removeEffect())
                        }
                    },
                    close: function() {
                        n && e.animate({
                            opacity: 0,
                            top: "-" + e.height()
                        }, 300, function() {
                            n.remove();
                            d.setHeight = d.setWidth = d.curHeight = d.curWidth = 0
                        })
                    }
                }, w = a.mode,
                C = a.title,
                h = a.message,
                D = a.inputTxt,
                A = a.padding,
                z = a.border,
                y = function() {
                    null === h ? h = "null" : "object" == g.type(h) && (h = "[object Object]");
                    a.messString && (h = h.toString().replace(/[<>\n\t]/g, function(a) {
                        return {
                            "<": "&lt;",
                            ">": "&gt;",
                            "\n": "<br />",
                            "\t": '<span style="display:inline-block;width:20px"></span>'
                        }[a]
                    }));
                    q && q.click(function() {
                        a.ok.call(q, d, a);
                        a.button(!0, d, a);
                        a.noClose || d.close()
                    });
                    r && r.click(function() {
                        a.cancel.call(r, d, a);
                        a.button(!1, d, a);
                        a.noClose || d.close()
                    });
                    s && s.click(function() {
                        d.noClose = !0;
                        a.close.call(s, d, a);
                        d.close()
                    });
                    if (l) l.on("input", function() {
                        a.input.call(l, d, a)
                    });
                    a.clickOut && x.click(function() {
                        d.close()
                    });
                    var b, y = function() {
                            b = setTimeout(function() {
                                d.close()
                            }, a.autoClose)
                        };
                    500 <= a.autoClose && (y(), e.hover(function() {
                        clearTimeout(b)
                    }, function() {
                        y()
                    }));
                    a.okBtnShow || /^alert|confirm|prompt$/.test(w) || (q = "");
                    a.cancelBtnShow || /^confirm|prompt$/.test(w) || (r = "");
                    q || r || (m = "");
                    a.inputTxtShow || "prompt" == w || (l = "");
                    !a.closeBtnShow && /^alert|confirm|prompt$/.test(w) && (s = "");
                    n.appendTo("body");
                    d.effect("load");
                    w && n.addClass(w);
                    n.append(x);
                    n.append(e);
                    e.css("border-width", z[0] + "px " + z[1] + "px");
                    e.append(u);
                    C && u.append(p.html(C));
                    u.append(t.html(h));
                    u.css({
                        padding: A[0] + "px " + A[1] + "px"
                    });
                    s && e.append(s.html(a.closeBtn));
                    l && (u.append(l), D && l.val(D));
                    m && (e.append(m), q && m.append(q.html(a.okBtn)), r && m.append(r.html(a.cancelBtn)), m.css({
                        padding: "0 " + A[1] + "px"
                    }));
                    var c = t.find("img"),
                        f = c.length,
                        k = function() {
                            d.center();
                            d.removeEffect()
                        };
                    if (f) {
                        var v = 0;
                        c.each(function(a, b) {
                            this.complete ? (v++, f == v && k()) : g(this).load(function() {
                                v++;
                                f == v && k()
                            }).error(function() {
                                v++;
                                f == v && (g(this).replaceWith('<span style="color:red">[ Image not loading: ' + this.src + " ]</span>"), k())
                            })
                        })
                    } else k(); if (a.autoResize) {
                        var B = !0;
                        g(window).on("resize", function() {
                            B && (setTimeout(function() {
                                d.center(height, width);
                                B = !0
                            }, 300), B = !1)
                        })
                    }
                    if (l) {
                        var c = l.get(0),
                            E = c.value.length;
                        c.selectionStart = 0;
                        c.selectionEnd = E;
                        c.focus()
                    }
                };
            void 0 === this.selector ? (y(), a.helper.call(document, d, a)) : this.click(function(b) {
                b.preventDefault();
                y();
                a.helper.call(this, d, a)
            })
        },
        alert: function(b, a) {
            g.boxes({
                mode: "alert",
                message: b,
                ok: function() {
                    "function" === g.type(a) && a.apply({
                        data: void 0
                    })
                }
            })
        },
        confirm: function(b, a) {
            g.boxes({
                mode: "confirm",
                message: b,
                button: function(b) {
                    "function" === g.type(a) && a.apply({
                        data: b
                    })
                }
            })
        },
        prompt: function(b, a, h) {
            g.boxes({
                mode: "prompt",
                message: b,
                inputTxt: a,
                button: function(a, b) {
                    if ("function" === g.type(h)) {
                        var e = null;
                        a && (e = b.el.input.val());
                        h.apply({
                            data: e
                        })
                    }
                }
            })
        }
    };
    g.fn.boxes = g.boxes = function(b) {
        if (p[b]) {
            var a = this,
                h = Array.prototype.slice.call(arguments, 1);
            void 0 === this.selector ? p[b].apply(a, h) : this.click(function(g) {
                g.preventDefault();
                p[b].apply(a, h)
            })
        } else if ("object" !== typeof b && b) window.console && console.error("Method " + b + " does not exist on jQuery.boxes");
        else return p.init.apply(this, arguments)
    }
})(jQuery);
