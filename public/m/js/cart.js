$(function() {
    mui("lt-header, nav").on("tap", "a", function() {
        mui.openWindow({ url: this.href })
    })
    var userInfo = null
    $.ajax({
        type: "get",
        url: "/user/queryUserMessage",
        async: false,
        success: function(res) {
            if (res.error && res.error == 400) {
                location.href = "login.html"
            } else {
                userInfo = res
            }
        }
    })

    $.ajax({
        url: "/cart/queryCart",
        type: "get",
        success: function(res) {
            console.log(res)
            let html = template("tmp", { data: res })
            $("#commList").html(html)
        }
    })
    $("#checkAll").on("change", function() {
        $("#checkbox").each(function(i, ele) {
            $(ele).prop("checked", $(this).prop("checked"))
        }.bind(this))
        money()
    })
    $("#checkbox").change(function() {
        if ($("#checkbox:checked").length === $("#checkbox").length) {
            $("#checkAll").prop("checked", true)
        } else {
            $("#checkAll").prop("checked", false)
        }
        money();
    })
    $(".p-action").click(function() {
        $(this).parent(".cart-item").remove();
        money()
    })
    $("body").on('change', "#checkbox", function() {
        let p = $(this).siblings("#box").find(".money").text().substr(1)
        var n = $(this).siblings("#box").find("#test").val()
        $(this).siblings("#box").find("#hidden").val(n * p)
        money()
    })
    $("body").on('change', "#test", function() {
        let p = $(this).parent().siblings(".money").text().substr(1)
        var n = $(this).val()
        $(this).parents(".mui-media-body").siblings("#hidden").val(n * p)
        money()
    })
    money()
        //算出总额
    function money() {
        let nn = 0
        $("#checkbox:checked").siblings("#box").find("#hidden").each(function(i, ele) {
            nn += parseFloat($(ele).val());
        })
        $("#total").text(nn.toFixed(2))
    }
})