$(function() {
    var gallery = mui('.mui-slider')
    gallery.slider({
        interval: 3000 //自动轮播周期，若为0则不自动播放，默认为0；
    })

    mui("lt-header, nav").on("tap", "a", function() {
        mui.openWindow({ url: this.href })
    })

})