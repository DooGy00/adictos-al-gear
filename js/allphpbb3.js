
        $("#propop_vm").on("click", function () {
            if ($(this).hasClass("activeTab")) {
                return
            }
            $(B).removeClass("activeTab");
            $(this).addClass("activeTab");
            $("#userprofile").html(w).load(C + "wall" + z)
        });
        $("#propop_stats").on("click", function () {
            if ($(this).hasClass("activeTab")) {
                return
            }
            $(B).removeClass("activeTab");
            $(this).addClass("activeTab");
            $("#userprofile").html(w).load(C + "stats" + z)
        });
        $("#propop_friends").on("click", function () {
            if ($(this).hasClass("activeTab")) {
                return
            }
            $(B).removeClass("activeTab");
            $(this).addClass("activeTab");
            $("#userprofile").html(w).load(C + "friends" + z)
        });
        $("#propop_contact").on("click", function () {
            if ($(this).hasClass("activeTab")) {
                return
            }
            $(B).removeClass("activeTab");
            $(this).addClass("activeTab");
            $("#userprofile").html(w).load(C + "contact" + z)
        });
        $("#propop_rpg").on("click", function () {
            if ($(this).hasClass("activeTab")) {
                return
            }
            $(B).removeClass("activeTab");
            $(this).addClass("activeTab");
            $("#userprofile").html(w).load(C + "rpg" + z)
        });
        $("#propop_attach").on("click", function () {
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
        $("#profilefilter, #close_popup").on("click", function () {
            $("#profilefilter, #profcont-container").remove()
        });
        return false
    })
};