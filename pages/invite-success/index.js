//index.js
//获取应用实例
const app = getApp()

Page({
    data: {

    },
    onLoad: function (option) {
        setTimeout(function () {
            wx.switchTab({
                url: '../person/index',
            })
        }, 2000) 
    }
})
