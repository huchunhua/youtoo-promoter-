const app = getApp()
Page({
    data: {
        pageLoaded: true,
        ischangeimgModal:false,
        logo:'',
        logoid:'',
        name:'',
        add:'',
        shopper:'',
        phone:'',
        starttime:'',
        endtime:''

    },
    openchangeImg:function (e) {
        this.setData({
          ischangeimgModal: true,
        })
    },  
    closechangeImg:function () {
        this.setData({
          ischangeimgModal: false
        })
    },
    onLoad(option) {
    },
    name: function (e) {
        this.setData({
          name: e.detail.value
        });
    },
    add:function(e){
      this.setData({
        add:e.detail.value
      });
    },    
    shopper:function(e){
      this.setData({
        shopper:e.detail.value
      });
    },    
    phone:function(e){
      this.setData({
        phone:e.detail.value
      });
    },       
    starttime:function(e){
      this.setData({
        starttime:e.detail.value
      });
    },    
    endtime:function(e){
      this.setData({
        endtime:e.detail.value
      });
    },    
    editgoods:function(){
      var that = this;
      var token = app.data.token ? app.data.token : wx.getStorageSync('token');
      var seller_name = that.data.name;
      var seller_address = that.data.add;
      var seller_shopper = that.data.shopper;
      var seller_phone = that.data.phone;
      var seller_time_start = that.data.starttime;
      var seller_time_end = that.data.endtime;
      var seller_logo = that.data.logoid;
      console.log(seller_name);
      if(seller_name==""){
        wx.showToast({
          title: '商家名称不能为空',
          icon:"none",
          duration:2000
        });
        return false;
      }else{
        if(seller_address==""){
          wx.showToast({
            title: '商家地址不能为空',
            icon:"none",
            duration:2000
          });
          return false;
        }else{
            if(seller_shopper==""){
              wx.showToast({
                title: '店长名称不能为空',
                icon:"none",
                duration:2000
              });
              return false;
            }else{
                if(seller_phone==""){
                  wx.showToast({
                    title: '手机号码不能为空',
                    icon:"none",
                    duration:2000
                  });
                  return false;
                }else{
                  if(seller_time_end==""){
                    wx.showToast({
                      title: '营业开始时间不能为空',
                      icon:"none",
                      duration:2000
                    });
                    return false;
                  }else{
                      if(seller_time_start==""){
                        wx.showToast({
                          title: '营业结束时间不能为空',
                          icon:"none",
                          duration:2000
                        });
                        return false;
                      }else{
                        if(seller_logo==""){
                          wx.showToast({
                            title: '商店图片不能为空',
                            icon:"none",
                            duration:2000
                          });
                          return false;
                        }else{
                            wx.request({
                                  url: app.data.api + 'own/editSellerInfo', //仅为示例，并非真实的接口地址
                                  method: "POST",
                                  data: {
                                      token: token,
                                      seller_name:seller_name,
                                      seller_address:seller_address,
                                      seller_shopper:seller_shopper,
                                      seller_phone:seller_phone,
                                      seller_time_start:seller_time_start,
                                      seller_time_end:seller_time_end,
                                      seller_logo:seller_logo
                                  },
                                  header: {
                                      'content-type': 'application/json', // 默认值
                                  },
                                  success: function (res) {
                                      if (res.data.code == 200) {
                                          wx.showToast({
                                              title: res.data.data,
                                              icon: 'none',
                                              duration: 2000
                                          });
                                      } else {
                                        console.log(res)
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
        }        
      };                
    },
    delgoods:function(){
      var that = this;
      var token = app.data.token ? app.data.token : wx.getStorageSync('token');
      var id = that.data.id;
      wx.request({
            url: app.data.api + 'goods/delGoods', //仅为示例，并非真实的接口地址
            method: "POST",
            data: {
                token: token,
                id:id,
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
    },
     changeimg:function(e){
      const that=this;
      const post_url = app.data.api;
      const token = app.data.token ? app.data.token : wx.getStorageSync("token");
      const sourceType=e.currentTarget.dataset.sourcetype;
      var pics = that.data.pics;
      wx.chooseImage({
        count: 1,
        sizeType: ['original', 'compressed'],
        sourceType: [sourceType],
        success(res) {
          // tempFilePath可以作为img标签的src属性显示图片
          const tempFilePaths = res.tempFilePaths;

            that.setData({
              ischangeimgModal: false,
              logo:tempFilePaths
            })
            wx.uploadFile({
              url: post_url + 'goods/upload', //仅为示例，非真实的接口地址
              filePath: res.tempFilePaths[0],
              name: 'imgFiles[0]',
              formData: {
                token: token
              },
              success: function (res) {
                const data = JSON.parse(res.data);
                if (data.code == 200) {
                  that.setData({
                    logoid: data.datas.ids[0],
                  })
                }
              }
            });            


        }
      })
  },
});
