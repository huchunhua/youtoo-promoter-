const app = getApp()
Page({
    data: {
        pageLoaded:false,
        num:1,
        items: [],
        shopid:'',
        uid:''
    },
    computed: {

    },
    radioChange(e) {
        var that = this;
        that.setData({
            uid:e.detail.value
        })
      },
    onLoad(option) {
        var that = this;
        var token = app.data.token ? app.data.token : wx.getStorageSync('token');
        var shopid = option.shopId;
        that.setData({
           shopid:shopid
        })
        wx.request({
            url: app.data.api + 'manager/employeesLists', //仅为示例，并非真实的接口地址
            method: "POST",
            data: {
                token:token
            },
            header: {
                'content-type': 'application/json', // 默认值
            },
            success: function (res) {
                // wx.hideLoading();
                if (res.data.code == 200) {
                    that.setData({
                        pageLoaded: true,
                        items:res.data.data
                    })
                } else {
                    wx.showToast({
                        title: res.data.msg,
                        icon: 'none',
                        duration: 2000
                    });
                }
            }
        });
    },
    distribution(){
        var that = this;
        var token = app.data.token ? app.data.token : wx.getStorageSync('token');
        var mid = that.data.shopid;
        var uid = that.data.uid;
        if(uid == ''){
            wx.showToast({
                title: '请选择员工',
                icon: 'none',
                duration: 2000
            });
        }
        wx.request({
            url: app.data.api + 'manager/distribution', //仅为示例，并非真实的接口地址
            method: "POST",
            data: {
                token:token,
                mid:mid,
                uid:uid
            },
            header: {
                'content-type': 'application/json', // 默认值
            },
            success: function (res) {
                // wx.hideLoading();
                if (res.data.code == 200) {
                     wx.showToast({
                        title: res.data.data,
                        icon: 'none',
                        duration: 2000
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
});
