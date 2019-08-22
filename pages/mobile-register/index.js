//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
   
  },
  onLoad: function (option) {
  },
  phone:function(e){
    this.setData({
      phone:e.detail.value
    });
  },  
  password:function(e){
    this.setData({
      password:e.detail.value
    });
  },  
  code:function(e){
    this.setData({
      code:e.detail.value
    });
  },
  certification(){
    var that = this;
    var phone = that.data.phone;
    var password = that.data.password;
    var code = that.data.code;
    wx.request({
            url: app.data.api + 'login/register', //仅为示例，并非真实的接口地址
            method: "POST",
            data: {
                phone: phone,
                password: password,
                code:code
            },
            header: {
                'content-type': 'application/json', // 默认值
            },
            success: function (res) {
                // wx.hideLoading();
                if (res.data.code == 200) {
                    wx.setStorageSync('token',res.data.data.token);
                    wx.navigateTo({
                        url: '../certification/index',
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
  sendcode(){
    var that = this;
    var phone = that.data.phone;
    wx.request({
            url: app.data.api + 'login/sendSms', //仅为示例，并非真实的接口地址
            method: "POST",
            data: {
                phone: phone,
                type:4
            },
            header: {
                'content-type': 'application/json', // 默认值
            },
            success: function (res) {
                // wx.hideLoading();
                if (res.data.code == 200) {
                    wx.showToast({
                        title: '短信发送成功，注意查收！',
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
})
