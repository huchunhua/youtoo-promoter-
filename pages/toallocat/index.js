const app = getApp()
Page({
    data: {
        pageLoaded: false,
        num:0,
        lists: [],
        shopId:[],
        // refuse:false
    },
    computed: {

    },
    staff(){
        var that = this;
        wx.navigateTo({
            url: '../staff/index?shopId=' + that.data.shopId,
        })
    },
    checkboxChange(e) {
        var that = this;
        var num = e.detail.value.length;
        that.setData({
            shopId:e.detail.value,
            num:num
        })
    },
    // refuse(){
    //     var that = this;
    //     var refuse = that .data.refuse;
    //     that.setData({
    //         refuse:!refuse
    //     })
    // },
    // msg(e){
    //     var that = this;
    //     that.setData({
    //         msg:e.detail.value
    //     })
    // },
    onLoad(option) {
        var that = this;
        var token = app.data.token ? app.data.token : wx.getStorageSync('token');
        wx.request({
            url: app.data.api + 'manager/mangerLists', //仅为示例，并非真实的接口地址
            method: "POST",
            data: {
                token: token,
                type:1
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
    // distribution(){
    //     var that = this;
    //     var token = app.data.token ? app.data.token : wx.getStorageSync('token');
    //     var shopid = that.data.shopId;
    //     var msg = that.data.msg;
    //     for(var i = 0;i<shopid.length;i++){
    //         var id = '';
    //         id = shopid[i] + ','
    //         that.setData({
    //             id:id
    //         })
    //     };
    //     wx.request({
    //         url: app.data.api + 'manager/audit', //仅为示例，并非真实的接口地址
    //         method: "POST",
    //         data: {
    //             token: token,
    //             id:id,
    //             msg:msg,
    //             status:2
    //         },
    //         header: {
    //             'content-type': 'application/json', // 默认值
    //         },
    //         success: function (res) {
    //             // wx.hideLoading();
    //             if (res.data.code == 200) {
    //                 wx.showToast({
    //                     title: res.data.datas,
    //                     icon: 'none',
    //                     duration: 2000
    //                 });
    //             } else {
    //                 wx.showToast({
    //                     title: res.data.datas.error.msg,
    //                     icon: 'none',
    //                     duration: 2000
    //                 });
    //             }
    //         }
    //     });        
    // }
});
