const app = getApp()
Page({
    data: {
        pageLoaded: false,
        status:2,
        msg:''
    },
    onLoad(option) {
        var that = this;
        var token = app.data.token ? app.data.token : wx.getStorageSync('token');
        var id = option.id;
        var name = option.name;
        var add = option.address;
        that.setData({
            pageLoaded: true,
            id:id,
            name:name,
            add:add
        })
    },
    operation:function(e){
        var that = this;
        var status = e.currentTarget.dataset.status;
        that.setData({
            status:status
        })
    },
    msg: function (e) {
        this.setData({
          msg: e.detail.value
        });
    },
    submit(){
        var that = this;
        var token = app.data.token ? app.data.token : wx.getStorageSync('token');
        var id = that.data.id;
        var status = that.data.status;
        var msg = that.data.msg;
        if(msg == ''){
            wx.showToast({
                title: '请填写原因',
                icon: 'none',
                duration: 2000
            }); 
        }
        wx.request({
            url: app.data.api + 'manager/audit', //仅为示例，并非真实的接口地址
            method: "POST",
            data: {
                token: token,
                id:id,
                status:status,
                msg:msg
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
