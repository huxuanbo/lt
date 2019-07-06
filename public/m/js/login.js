$(function() {
    mui("lt-header, nav").on("tap", "a", function() {
            mui.openWindow({ url: this.href })
        })
        // 1.0 给登录按钮注册点击事件
    $("#loginBtn").on("click", function() {
        // 1.1 获取用户名和密码，然后进行验证
        var username = $.trim($("[name=username]").val())
        var password = $.trim($("[name=password]").val())
        if (!username) {
            mui.toast("请输入用户名")
            $("[name=username]").val("")
            return
        }
        if (!password) {
            mui.toast("请输入密码")
            $("[name=password]").val("")
            return
        }
        // 1.2 发送ajax请求，进行跳转
        $.ajax({
            type: "post",
            url: "/user/login",
            data: {
                username: username,
                password: password
            },
            beforeSend: function() {
                $("#loginBtn").text("正在登录...")
            },
            success: function(res) {
                console.log(res)
                if (res.success) {
                    mui.toast("登录成功")

                    setTimeout(function() {
                        $("#loginBtn").text("登录")
                        location.href = "user.html"
                    }, 2000)
                } else if (res.message) {
                    $("#loginBtn").text("登录")
                    mui.toast(res.message)
                    switch (res.message) {
                        case "密码错误！":
                            $("[name=password]").val("")
                            break
                        case "用户名不存在! ":
                            break
                    }
                }
            }
        })
    })
})