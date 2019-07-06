var userInfo = null

// 2.0 同步发送请求，先执行这里的代码，再加载后面的标签
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

$(function() {
    // 1.0 发送ajax请求，退出登录
    $("#logout").on("tap", function() {
        $.ajax({
            type: "get",
            url: "/user/logout",
            success: function(res) {
                if (res.success) {
                    mui.toast("退出登录成功...")
                    setTimeout(function() {
                        location.href = "index.html"
                    }, 2000)
                }
            }
        })
    })
    var html = template("userTpl", userInfo)
    $("#user").html(html)
})