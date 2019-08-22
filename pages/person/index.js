const app = getApp()
Page({
    data: {
        pageLoaded: false,
        seller_logo:'../../assets/images/person.png',
    },
    finance() {
        wx.navigateTo({
            url: '../finance-boss/index',
        })            
    },
    seller(){
        wx.navigateTo({
            url: '../selleradmin/index',
        })
    },    
    invite(){
        wx.navigateTo({
            url: '../invite/index',
        })
    },
    onShow(option) {
        var that = this;
        var token = app.data.token ? app.data.token : wx.getStorageSync('token');
        var auth =  wx.getStorageSync('auth_status');
        if(auth == 0){
            wx.showToast({
                title: '对不起，您的账号已被禁用',
                icon: 'none',
                duration: 2000
            });            
        }else if (auth == 2){
            wx.showToast({
                title: '请先进行推广员认证',
                icon: 'none',
                duration: 2000
            });
            wx.navigateTo({
                url: '../certification/index',
            })
        }else if (auth == 1){
            wx.request({
                url: app.data.api + 'own/index', //仅为示例，并非真实的接口地址
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
                            datas: res.data.data,
                        });
                        wx.setStorageSync('phone',res.data.data.phone)
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
    }
});
