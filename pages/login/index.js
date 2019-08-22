//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    username:'',
    password:''
  },
  onLoad: function (option) {
  },
  username:function(e){
    this.setData({
      username:e.detail.value
    });
  },  
  password:function(e){
    this.setData({
      password:e.detail.value
    });
  },  
  login(){
    var that = this;
    var username = that.data.username;
    var password = that.data.password;
    if(username == '') {
      wx.showToast({
        title: '请输入手机号',
        icon: 'none',
        duration: 2000
      });
    }else if(password == ''){
      wx.showToast({
        title: '请输入密码',
        icon: 'none',
        duration: 2000
      });
    }else{
      wx.request({
              url: app.data.api + 'login/index', //仅为示例，并非真实的接口地址
              method: "POST",
              data: {
                  password: password,
                  username:username
              },
              header: {
                  'content-type': 'application/json', // 默认值
              },
              success: function (res) {
                  // wx.hideLoading();
                  if (res.data.code == 200) {
                      wx.setStorageSync('token', res.data.data.token);
                      wx.setStorageSync('auth_status', res.data.data.stats);
                      wx.switchTab({
                          url: '../study/index',
                      }) 
                  } else {
                      wx.showToast({
                          title:res.data.msg,
                          icon: 'none',
                          duration: 2000
                      });
                  }
              }
        });
    }
  },
  register(){
    wx.navigateTo({
      url: '../mobile-register/index',
    }) 
  }
})
