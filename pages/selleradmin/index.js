//index.js
//获取应用实例
const app = getApp()

Page({
    data: {
        pageLoaded:false,
    },
    up(){
        var that = this;
        var type = that.data.datas.type;
        wx.navigateTo({
            url: '../up/index?type=' + type,
        })
    },    
    toallocat(){
        wx.navigateTo({
            url: '../toallocat/index',
        })
    },     
    adminshop(){
        wx.navigateTo({
            url: '../adminshop/index',
        })
    },    
    examine(){
        var that = this;
        var type = that.data.datas.type;
        wx.navigateTo({
            url: '../examine/index?type=' + type,
        })
    },    
    examine_(){
        wx.navigateTo({
            url: '../examine_/index',
        })
    },
    onShow(option) {
        var that = this;
        var token = app.data.token ? app.data.token : wx.getStorageSync('token');
        wx.request({
            url: app.data.api + 'manager/index', //仅为示例，并非真实的接口地址
            method: "POST",
            data: {
                token:token
            },
            header: {
                'content-type': 'application/json' // 默认值
            },
            success: function (res) {
                // wx.hideLoading();
                if (res.data.code == 200) {
                    that.setData({
                        pageLoaded: true,
                        datas:res.data.data
                    });
                } else {
                    wx.showToast({
                        title: res.data.msg,
                        icon: 'none',
                        duration: 2000
                    });
                }
            }
        });
    }
})
