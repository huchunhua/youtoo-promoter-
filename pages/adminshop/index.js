const app = getApp()
Page({
    data: {
        pageLoaded: false,
        lists:[]
    },
    computed: {

    },
    sellerinfo(e){
        var id = e.currentTarget.dataset.id;
        wx.navigateTo({
            url: '../sellerinfo/index?status=2&id=' + id,
        })
    },
    onShow(option) {
        var that = this;
        var token = app.data.token ? app.data.token : wx.getStorageSync('token');
        wx.request({
            url: app.data.api + 'manager/mangerLists', //仅为示例，并非真实的接口地址
            method: "POST",
            data: {
                token: token,
                type:6
            },
            header: {
                'content-type': 'application/json', // 默认值
            },
            success: function (res) {
                // wx.hideLoading();
                if (res.data.code == 200) {
                    that.setData({
                        pageLoaded: true,
                        lists: res.data.data,
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
