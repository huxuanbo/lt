$(function() {
    let data = null
    $.ajax({
        url: "/address/queryAddress",
        method: "get",
        success: function(result) {
            console.log(result);
            data = result
            $("#adress").html(template("adressTpl", { result: result }))
        }
    })



    // 删除收货地址
    $("#adress").on("tap", ".deleteAdress", function() {
        let id = $(this).attr("data-id")
        let li = $(this).parents("li")
        mui.confirm("是否确认删除", function(e) {
            console.log(e)
            if (e.index) {
                $.ajax({
                    url: "/address/deleteAddress",
                    type: "post",
                    data: {
                        id: id
                    },
                    success: function(result) {
                        if (result.success) {
                            location.reload();
                        } else {
                            mui.toast("删除地址失败");
                        }

                    }
                })
            } else {
                mui.swipeoutClose(li[0])
            }
        })
    })

    $("#adress").on("tap", ".editAdress", function() {
        let id = $(this).attr("data-id")
        data.forEach((el) => {
            if (id == el.id) {
                console.log(el)
                localStorage.setItem("data", JSON.stringify(el))
                location.href = "addAddress.html?isEdit=1"
            }
        })

    })
})