const app = getApp()
Page({
    data: {
        pageLoaded:false,
        num:0,
        lists: [],
        shopId:[]
    },
    computed: {

    },
    staff(){
        var that = this;
        if(that.data.num <= 0){
            wx.showToast({
                title: '请先选择商家',
                icon: 'none',
                duration: 2000
            });
        }else{
            wx.navigateTo({
                url: '../staff/index?shopId=' + that.data.shopId,
            })
        }
    },
    checkboxChange(e) {
        var that = this;
        var num = e.detail.value.length;
        that.setData({
            shopId:e.detail.value,
            num:num
        })
    },
    onLoad(option) {
        var that = this;
        var token = app.data.token ? app.data.token : wx.getStorageSync('token');
        var type = option.type;
        that.setData({
            type:type
        })
        wx.request({
            url: app.data.api + 'manager/mangerLists', //仅为示例，并非真实的接口地址
            method: "POST",
            data: {
                token: token,
                type:2
            },
            header: {
                'content-type': 'application/json', // 默认值
            },
            success: function (res) {
                // wx.hideLoading();
                if (res.data.code == 200) {
                    that.setData({
                        pageLoaded: true,
                        lists:res.data.data
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
    },
});
