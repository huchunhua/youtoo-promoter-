//index.js
//获取应用实例
const app = getApp()

Page({
    data: {
        showIndex:0,
        asc:false,
        pageLoaded:false,
        lists:[],
        files:[]
    },
    onLoad(option) {
        var that = this;
        var token = app.data.token ? app.data.token : wx.getStorageSync('token');
        wx.request({
            url: app.data.api + 'article/articleLists',
            method: 'post',
            dataType  : 'json',
            data: {
                token: token
            },
            success: function (res)
            {
                if(res.data.code == 200)
                {
                    that.setData({
                        pageLoaded:true,
                        lists: res.data.data.school,
                        files: res.data.data.policy
                    })
                }
                else
                {
                    wx.showToast({
                        title: res.data.msg,
                        icon: 'loading',
                        duration: 3000
                    })
                }
            }
        });
    },
    college() {
        wx.navigateTo({
            url: '../college/index',
        })
    },
    files() {
        wx.navigateTo({
            url: '../files/index',
        })
    }
})
