//index.js
//获取应用实例
const app = getApp()

Page({
    data: {

    },
    onLoad: function (option) {
    }, 
    mobile(){
        var that = this;
        var role = that.data.role;
        wx.navigateTo({
            url: '../mobile-register/index',
        })
    },
})
