$(function() {
    mui("header, nav").on("tap", "a", function() {
        mui.openWindow({
            url: this.href
        })
    })
    mui('.mui-scroll-wrapper').scroll({
        deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
    })

    // let times = setInterval(() => {
    //     $(".template-first").find("li:first-child a").click()
    //     clearInterval(times)
    // }, 1)

    $.ajax({
        url: "/category/queryTopCategory",
        type: "get",
        success: function(res) {
            let html = template("template-first", res)
            $(".template-first").html(html)

            $(".template-first").find("li:first-child a").addClass("active")

            if (res.rows.length > 0) {
                var id = res.rows[0].id
                reqSecond(id)
            }
        }

    })
    $(".template-first").on("click", "a", function() {
        let id = $(this).data("id")
        $(this).addClass("active").parent().siblings().children().removeClass("active")
        console.log(id)
        reqSecond(id)
    })

    function reqSecond(id) {
        $.ajax({
            url: "/category/querySecondCategory",
            type: "get",
            data: { id },
            success: function(res) {
                console.log(res)
                let html = template("template-last", res)
                $(".template-last").html(html)
            }
        })
    }
})