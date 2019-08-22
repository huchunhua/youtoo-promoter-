const app = getApp()
Page({
    data: {
        sex:[
          {
            "id":1,
            "title":"男"
          },{
            "id":2,
            "title":"女"            
          }
        ],
        index:0,
        name:'',
        erpcode:'',
        idcard:''
    },
    onLoad(option) {
        var that = this;
        var token = app.data.token ? app.data.token : wx.getStorageSync('token');
        that.setData({
            phone:wx.getStorageSync('phone')
        })
    },
    bindPickerChange: function (e) {
        this.setData({
          index: e.detail.value
        });
    },       
    name: function (e) {
        this.setData({
          name: e.detail.value
        });
    },    
    idcard: function (e) {
        this.setData({
          idcard: e.detail.value
        });
    },     
    erpcode: function (e) {
        this.setData({
          erpcode: e.detail.value
        });
    },       
    submit:function(e){
        var that = this;
        var name = that.data.name;
        var sex = that.data.index;
        var idcard = that.data.idcard;
        var erpcode = that.data.erpcode;
        var token = app.data.token ? app.data.token : wx.getStorageSync('token');  
        if(name == '') {
            wx.showToast({
                title:'请填写姓名',
                icon: 'none',
                duration: 2000
            });            
        }else{
            if(sex == '') {
                wx.showToast({
                    title:'请选择性别',
                    icon: 'none',
                    duration: 2000
                }); 
            }else {
                if(idcard == '') {
                    wx.showToast({
                        title:'请填写身份证号',
                        icon: 'none',
                        duration: 2000
                    });             
                } else{
                    if(erpcode == '') {
                        wx.showToast({
                            title:'请填写ERP编号',
                            icon: 'none',
                            duration: 2000
                        });            
                    }else{
                        wx.request({
                            url: app.data.api + 'index/certification', //仅为示例，并非真实的接口地址
                            method: "POST",
                            data: {
                                token:token,
                                name:name,
                                idCard:idcard,
                                erpNum:erpcode,
                                sex:sex
                            },
                            header: {
                                'content-type': 'application/json', // 默认值
                            },
                            success: function (res) {
                                if (res.data.code == 200) {
                                    wx.setStorageSync('auth_status',1);
                                    wx.switchTab({
                                        url: '../study/index',
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
                    }                    
                }               
            }            
        }
    }
});
