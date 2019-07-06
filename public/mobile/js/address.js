$(function() {
    mui("header, nav").on("tap", "a", function() {
        mui.openWindow({
            url: this.href
        })
    })

    $.ajax({
        url: "/address/queryAddress",
        method: "get",
        success: function(result) {

            $("#adress").html(template("adressTpl", { result: result }))
        }
    })



    // 删除收货地址
    $("#adress").on("tap", ".deleteAdress", function() {
        alert(1)
            // $.ajax({
            //     url: "/address/deleteAddress",
            //     type: "post",
            //     data: {
            //         id: $(this).attr("data-id")
            //     },
            //     success: function(result) {

        //         if (result.success) {

        //             location.reload();

        //         } else {

        //             mui.toast("删除地址失败");

        //         }

        //     }
        // })

    })
    $("#adress").on("tap", ".editAdress", function() {
        alert(1)

        // $.ajax({
        //     url: "/address/deleteAddress",
        //     type: "post",
        //     data: {
        //         id: $(this).attr("data-id")
        //     },
        //     success: function(result) {

        //         if (result.success) {

        //             location.reload();

        //         } else {

        //             mui.toast("删除地址失败");

        //         }

        //     }
        // })

    })

})