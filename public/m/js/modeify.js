$(function() {
    mui("lt-header, nav").on("tap", "a", function() {
        mui.openWindow({ url: this.href })
    })

    // 2.0 获取验证码
    $("#getCode").on("click", function() {

        $.ajax({
            type: "get",
            url: "/user/vCodeForUpdatePassword",
            success: function(res) {
                if (res.vCode) {
                    $("[name=getCode]").val(res.vCode)
                }
            }
        })
    })


    // 1.0 点击确认按钮，收集数据，发送请求
    $("#refirmBtn").on("tap", function() {

        var password = $.trim($("[name=password]").val())
        var newPassword = $.trim($("[name=newPassword]").val())
        var refirmNewPass = $.trim($("[name=refirmNewPass]").val())
        var vCode = $.trim($("[name=getCode]").val())

        // 1.1 验证密码
        if (!password) {
            mui.toast("请输入原始密码")
            $("[name=password]").val("")
            return
        }
        if (newPassword != refirmNewPass) {
            mui.toast("两次输入的密码不一致！")
            $("[name=password], [name=refirmNewPass]").val("")
            return
        }

        // 1.2 发起ajax请求
        $.ajax({
            type: "post",
            url: "/user/updatePassword",
            data: {
                oldPassword: password,
                newPassword: newPassword,
                vCode: vCode
            },
            success: function(res) {
                if (res.success) {
                    mui.toast("修改密码成功~")
                    setTimeout(function() {
                        // $("[name=password],[name=newPass], [name=refirmNewPass], [name=vCode]").val("")
                        location.href = "login.html"
                    }, 2000)
                }
            }
        })
    })

})