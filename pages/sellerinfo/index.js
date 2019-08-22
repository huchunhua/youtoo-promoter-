const app = getApp()
Page({
    data: {
        pageLoaded: false,
        imgtype:0,
        status:0,//审核中
    },
    computed: {

    },
    review(){
        var that = this;
        var id = that.data.datas.id;
        var name = that.data.datas.seller_name;
        var address = that.data.datas.address;
        wx.navigateTo({
            url: '../review/index?id=' + id + '&name=' + name + '&address=' + address,
        })
    },
    onLoad(option) {
        var that = this;
        var status = option.status;
        var id = option.id;
        that.setData({
            status:status,
            id:id
        })
    },
    onShow(){
        var that = this;
        var token = app.data.token ? app.data.token : wx.getStorageSync('token');
        var id = that.data.id;
        wx.request({
            url: app.data.api + 'manager/managerDetail', //仅为示例，并非真实的接口地址
            method: "POST",
            data: {
                token: token,
                id:id
            },
            header: {
                'content-type': 'application/json', // 默认值
            },
            success: function (res) {
                // wx.hideLoading();
                if (res.data.code == 200) {
                    that.setData({
                        pageLoaded: true,
                        datas: res.data.data,
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
    chooseimg:function(e){
      var that = this;
      var type = e.currentTarget.dataset.type;
      that.setData({
        imgtype:type
      })

    }, 

});
