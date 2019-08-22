//index.js
//获取应用实例
const app = getApp()

Page({
    data: {

    },
    onLoad: function (option) {
        setTimeout(function () {
            wx.navigateBack({
                delta: 2
            })
        }, 2000) 
    }
})
