const app = getApp()
Page({
    data: {
        pageLoaded: false,
        logo:'',
        text:''
    },
    computed: {

    },
    onLoad(option) {
        var that = this;
        var token = app.data.token ? app.data.token : wx.getStorageSync('token');
        wx.request({
            url: app.data.api + 'article/articleDetail',
            method: 'post',
            dataType  : 'json',
            data: {
                token: token,
                id: option.id
            },
            success: function (res)
            {
                if(res.data.code == 200)
                {
                    that.setData({
                        pageLoaded: true,
                        logo: res.data.data.logo,
                        text: res.data.data.detail
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
});
