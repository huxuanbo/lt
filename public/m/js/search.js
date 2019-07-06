$(function() {
    let keyWords
    if (localStorage.getItem("keyWords")) {
        keyWords = JSON.parse(localStorage.getItem("keyWords"))
    } else {
        keyWords = []
    }
    let html = template("historyList", { data: keyWords })

    $("#historyBox").html(html)
    $("#search_btn").on("click", function() {
        let kWords = $(this).prev().val()
        if (kWords) {
            keyWords.forEach((el, i) => {
                if (kWords == el) {
                    keyWords.splice(i, 1)
                }
            })
            keyWords.unshift(kWords)
            localStorage.setItem("keyWords", JSON.stringify(keyWords))


        }
        if (kWords.trim() == "") {
            alert("请输入查询的关键字喔~")
        } else {
            location.href = "search-result.html?keyWords=" + kWords
        }
        $(this).prev().val("")
    })
    $("#clear_data").on("click", function() {
        localStorage.removeItem("keyWords")
        keyWords = []
        $("#historyBox").html("")
    })
    $("#historyBox").on("click", "li", function() {
        let kWords = $(this).html()
        location.href = "search-result.html?keyWords=" + kWords
    })
})