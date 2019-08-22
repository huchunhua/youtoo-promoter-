const app = getApp()
Page({
    data: {
        pageLoaded:false,
        lists:[
        {
            shop_name:'精典洗车店',
            id:1,
            distance:3,
            add:"成都市高新区",
            time:2019
        },{
            shop_name:'精典洗车店',
            id:2,
            distance:3.3,
            add:'成都市金牛区',
            time:2019
        }
        ]
    },
    computed: {

    },
    sellerinfo(e){
        var that = this;
        var id = e.currentTarget.dataset.id;
        var type = that.data.type;
        if(type == 1){
            wx.navigateTo({
                url: '../sellerinfo/index?status=2&id=' + id,
            })
        }
    },
    onLoad(option) {
        var that = this;
        var type = option.type;
        that.setData({
            type:type
        })
    },
    onShow(){
        var that = this;
        var token = app.data.token ? app.data.token : wx.getStorageSync('token');
        var type = that.data.type;
        wx.request({
            url: app.data.api + 'manager/mangerLists', //仅为示例，并非真实的接口地址
            method: "POST",
            data: {
                token: token,
                type:3
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
    }
});
