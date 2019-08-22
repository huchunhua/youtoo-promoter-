const app = getApp()
Page({
    data: {
        pageLoaded: false,
        type:0,
        status:1,
        goodstype:[
          {
            "id":0,
            "title":"全部"
          },{
            "id":0,
            "title":"全部"            
          }
        ]
    },
    bindcard() {
        wx.navigateTo({
            url: '../bindcard/index',
        })
    },
    onLoad() {
        var that = this;
        var token = app.data.token ? app.data.token : wx.getStorageSync('token');
        var categoryId = that.type;
        var status = that.status;
        wx.request({
            url: app.data.api + 'goods/category', //仅为示例，并非真实的接口地址
            method: "POST",
            data: {
                token: token,
            },
            header: {
                'content-type': 'application/json', // 默认值
            },
            success: function (res) {
                // wx.hideLoading();
                if (res.data.code == 200) {
                    that.setData({
                        pageLoaded: true,
                        goodstype: res.data.data,
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
        that.loading()
    },
    bindPickerChange: function (e) {
        this.setData({
          index: e.detail.value
        });
    },
    select(e){
      var that = this;
      var type = e.currentTarget.dataset.type;
      that.setData({
        type:type
      });
      that.loading()
    },
    changestatus(e){
      var that = this;
      var status = e.currentTarget.dataset.status;
      that.setData({
        status:status
      });
      that.loading()     
    },
    loading(){
        var that = this;
        var token = app.data.token ? app.data.token : wx.getStorageSync('token');
        var categoryId = that.data.type;
        var status = that.data.status;
        wx.request({
            url: app.data.api + 'goods/index', //仅为示例，并非真实的接口地址
            method: "POST",
            data: {
                token: token,
                categoryId:categoryId,
                status:status
            },
            header: {
                'content-type': 'application/json', // 默认值
            },
            success: function (res) {
                // wx.hideLoading();
                if (res.data.code == 200) {
                    that.setData({
                        pageLoaded: true,
                        goods: res.data.data.data,
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
