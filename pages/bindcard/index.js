const app = getApp()
Page({
    data: {
        pageLoaded: false,
        bank:'',
        index:'',
        bankname:'',
        card:'',
        username:'',
        code:''

    },
    onLoad(option) {
        var that = this;
        var token = app.data.token ? app.data.token : wx.getStorageSync('token');
        that.setData({
            phone:wx.getStorageSync('phone')
        })
        wx.request({
            url: app.data.api + 'own/allBank', //仅为示例，并非真实的接口地址
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
                        bank: res.data.data,
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
    bindPickerChange: function (e) {
        this.setData({
          index: e.detail.value
        });
    },    
    bankname: function (e) {
        this.setData({
          bankname: e.detail.value
        });
    },    
    card: function (e) {
        this.setData({
          card: e.detail.value
        });
    },    
    username: function (e) {
        this.setData({
          username: e.detail.value
        });
    },    
    code: function (e) {
        this.setData({
          code: e.detail.value
        });
    },    
    sendmsg: function (e) {
        var that = this;
        var token = app.data.token ? app.data.token : wx.getStorageSync('token');
        var phone = that.data.phone;
         wx.request({
            url: app.data.api + 'login/sendSms', //仅为示例，并非真实的接口地址
            method: "POST",
            data: {
                token: token,
                phone:phone,
                type:5
            },
            header: {
                'content-type': 'application/json', // 默认值
            },
            success: function (res) {
                if (res.data.code == 200) {
                    wx.showToast({
                        title: '短信发送成功，请注意查收！',
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
    },
    addcard:function(e){
        var that = this;
        var token = app.data.token ? app.data.token : wx.getStorageSync('token');
        var code = that.data.code;
        var index = that.data.index;
        var bankname = that.data.bankname;
        var card = that.data.card;
        var username = that.data.username;
        var reg = /^\d{19}$/g;
        if(index !== ''){
            var bankId = that.data.bank[index].id;
        }
        if(index == ''){
            wx.showToast({
                title: '请选择开户银行',
                icon: 'none',
                duration: 2000
            });  
            return false;          
        }else if(card == ''){
            wx.showToast({
                title: '请填写卡号',
                icon: 'none',
                duration: 2000
            });  
            return false;          
        }else if (!reg.test(card)){
            wx.showToast({
              title: '请输入正确的卡号',
              icon:"none",
              duration:2000
            });
            return false;
        }else if(bankname == ''){
            wx.showToast({
                title: '请填写开户银行网点',
                icon: 'none',
                duration: 2000
            });  
            return false;          
        }else if(username == ''){
            wx.showToast({
                title: '姓名不能为空',
                icon: 'none',
                duration: 2000
            });  
            return false;          
        }else {
            wx.request({
                url: app.data.api + 'own/addBank', //仅为示例，并非真实的接口地址
                method: "POST",
                data: {
                    token: token,
                    code:code,
                    bankId:bankId,
                    bank_branches_name:bankname,
                    bank_card:card,
                    user_name:username
                },
                header: {
                    'content-type': 'application/json', // 默认值
                },
                success: function (res) {
                    if (res.data.code == 200) {
                        wx.showToast({
                            title: '绑定成功',
                            icon: 'none',
                            duration: 2000
                        });
                        setTimeout(function () {
                            wx.navigateBack({
                              delta: 1
                            })
                        }, 2000) 
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
    }
});
