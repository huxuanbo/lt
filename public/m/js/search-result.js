$(function() {
    let kWords = getParam("keyWords")
    let page = 1
    let This = null
    let price = 1
        // let html = ""
    mui.init({
        pullRefresh: {
            container: "#refreshContainer", //待刷新区域标识，querySelector能定位的css选择器均可，比如：id、.class等
            up: {
                height: 50, //可选.默认50.触发上拉加载拖动距离
                auto: true, //可选,默认false.自动上拉加载一次
                contentrefresh: "正在加载...", //可选，正在加载状态时，上拉加载控件上显示的标题内容
                contentnomore: '没有更多数据了', //可选，请求完毕若没有更多数据时显示的提醒内容；
                callback: render //必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据；
            }
        }
    })

    $("#price-btn").on("tap", function() {
        $("#price-btn span").toggleClass("fa fa-angle-up fa fa-angle-down")
        price = price == 1 ? 2 : 1
        page = 1
        $("#searchListBox").html("")
        mui('#refreshContainer').pullRefresh().refresh(true)
        render()
    })



    function render() {
        if (!This) {
            This = this
        }
        $.ajax({
            type: "get",
            url: "/product/queryProduct",
            data: {
                page: page++,
                pageSize: 4,
                proName: kWords,
                price: price

            },
            success: function(res) {
                let html = template("searchList", { data: res.data })
                $("#searchListBox").append(html)
                if (res.data.length > 0) {
                    This.endPullupToRefresh(false)
                } else {
                    This.endPullupToRefresh(true)
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