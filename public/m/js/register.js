$(function() {
    mui("lt-header, nav").on("tap", "a", function() {
            mui.openWindow({ url: this.href })
        })
        // 2.0 获取验证码
    $(".getCode").on("click", function() {
        $.ajax({
            type: "get",
            url: "/user/vCode",
            success: function(res) {
                console.log(res)
                if (res.vCode) {
                    $("[name=vCode]").val(res.vCode)
                }
            }
        })
    })


    // 1.0 点击注册按钮，获取信息验证后并发送请求
    $("#regBtn").on("click", function() {
        // 1.1 获取表单元素的内容
        var username = $("[name=username]").val().trim()
        var mobile = $("[name=mobile]").val().trim()
        var password = $("[name=password]").val().trim()
        var againPass = $("[name=againPass]").val().trim()
        var vCode = $("[name=checkCode]").val().trim()

        // 1.2 验证当前的表单信息
        if (!username) {
            mui.toast("请输入用户名")
            return
        }
        if (mobile.length != 11) {
            mui.toast("请输入手机号")
            return
        }
        if (password != againPass) {
            mui.toast("两次密码不一样喔")
            return
        }
        if (!vCode) {
            mui.toast("请输入验证码")
            return
        }

        // 1.3 发送ajax请求
        $.ajax({
            type: "post",
            url: "/user/register",
            data: {
                username: username,
                password: password,
                mobile: mobile,
                vCode: vCode
            },
            success: function(res) {
                console.log(res)
                if (res.success) {
                    mui.toast("注册成功")
                    setTimeout(function() {
                        location.href = "login.html"
                    }, 2000)
                } else if (res.message) {
                    mui.toast(res.message)
                    switch (res.message) {
                        case "验证码错误!":
                            $("[name=checkCode]").val("")
                            break
                        case "用户名已经存在!!!":
                            $("[name=username]").val("")
                            break
                        case "手机号已注册过!!!":
                            $("[name=mobile]").val("")
                            break
                    }
                }
            }
        })
    })
})