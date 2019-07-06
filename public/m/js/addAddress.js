$(function() {

    // 省市区弹出框
    var cityPicker = new mui.PopPicker({ layer: 3 });

    cityPicker.setData(cityData);

    $("#showCityPicker").on("tap", function() {
        cityPicker.show(function(items) {

            $("[name='city']").val(items[0].text + items[1].text + items[2].text)

        })
    })
    let data = JSON.parse(localStorage.getItem("data"))
    console.log(data)
    let isEdit = parseInt(getParam("isEdit"))
    let id = data.id
    if (isEdit) {
        $("[name=username]").val(data.recipients)
        $("[name=postCode]").val(data.postCode)
        $("[name=city]").val(data.address)
        $("[name=detail]").val(data.addressDetail)
    }




    $("#addAdress").on("tap", function() {
        var username = $.trim($("[name=username]").val())
        var postCode = $.trim($("[name=postCode]").val())
        var city = $.trim($("[name=city]").val())
        var detail = $.trim($("[name=detail]").val())
        if (!username) {
            mui.toast("请输入收货人姓名")
            return
        }
        if (!postCode) {
            mui.toast("请输入邮政编码")
            return
        }
        if (!city) {
            mui.toast("请选择省市")
            return
        }
        if (!detail) {
            mui.toast("请输入详细地址")
            return
        }
        if (!isEdit) {
            // 2.2 发送添加ajax请求
            $.ajax({
                type: "post",
                url: "/address/addAddress",
                data: {
                    address: city,
                    addressDetail: detail,
                    recipients: username,
                    postcode: postCode
                },
                success: function(res) {
                    if (res.success) {
                        mui.toast("添加地址成功~")
                        setTimeout(function() {
                            location.href = "address.html"
                        }, 1000)
                    }
                }
            })
        } else {
            // 2.2 发送修改ajax请求
            $.ajax({
                type: "post",
                url: "/address/updateAddress",
                data: {
                    id: id,
                    address: city,
                    addressDetail: detail,
                    recipients: username,
                    postcode: postCode
                },
                success: function(res) {
                    if (res.success) {
                        mui.toast("修改地址成功~")
                        setTimeout(function() {
                            location.href = "address.html"
                        }, 1000)
                    }
                }
            })
        }


    })

    function getParam(name) {
        var resArr = location.search.substr(1).split("&")
        let res = null
        resArr.forEach(el => {
            let newList = el.split("=")
            if (newList[0] == name) {
                res = newList[1]
            }
        })
        return res
    }
})