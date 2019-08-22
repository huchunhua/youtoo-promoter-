const app = getApp()
Page({
    data: {
        pageLoaded: false,
        ischangeimgModal:false,
        name:'',
        contacts:'',
        phone:'',
        address:'',
        longitude:'',
        latitude:'',
        service:'',
        class:[],
        index:0,
        cid:'',
        licenseid:'',
        shopimgid:'',
        idcardid:'',
        sellerlogo:'',
        seller_logo:'',
        idcard_id:'',
        latitude: 30.64242,
        longitude: 104.04311
    },
    map() {
      wx.navigateTo({
        url: '../home/index',
      })
    },
    name:function(e){
      this.setData({
        name:e.detail.value
      });
    },     
    contacts:function(e){
      this.setData({
        contacts:e.detail.value
      });
    },     
    phone:function(e){
      this.setData({
        phone:e.detail.value
      });
    },    
    address:function(e){
      this.setData({
        address:e.detail.value
      });
    },     
    longitude:function(e){
      this.setData({
        longitude:e.detail.value
      });
    },    
    latitude:function(e){
      this.setData({
        latitude:e.detail.value
      });
    },     
    service:function(e){
      this.setData({
        service:e.detail.value
      });
    }, 
    bindPickerChange: function (e) {
        this.setData({
          index: e.detail.value
        });
    }, 
    onShow(option) {
        var that = this;
        var token = app.data.token ? app.data.token : wx.getStorageSync('token');
        var maplongitude = wx.getStorageSync('maplongitude') ? wx.getStorageSync('maplongitude') : '';
        var maplatitude = wx.getStorageSync('maplatitude') ? wx.getStorageSync('maplatitude') : '';
        wx.request({
            url: app.data.api + 'index/getCategory', //仅为示例，并非真实的接口地址
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
                        class:res.data.data
                    });
                    if(maplongitude !== ''){
                      that.setData({
                        longitude:maplongitude,
                        latitude:maplatitude
                      })
                    }
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
    openchangeImg:function (e) {
        var type = e.currentTarget.dataset.type;
        this.setData({
          ischangeimgModal: true,
          imgtype:type
        })
    },  
    closechangeImg:function () {
        this.setData({
          ischangeimgModal: false
        })
    },
    changeimg:function(e){
      const that=this;
      const post_url = app.data.api;
      const token = app.data.token ? app.data.token : wx.getStorageSync("token");
      const sourceType=e.currentTarget.dataset.sourcetype;
      wx.chooseImage({
        count: 1,
        sizeType: ['original', 'compressed'],
        sourceType: [sourceType],
        success(res) {
          // tempFilePath可以作为img标签的src属性显示图片
          const tempFilePaths = res.tempFilePaths;
          var tempFilesSize = res.tempFiles[0].size; 
          if(tempFilesSize <= 200000){
            if(that.data.imgtype == 'idcard'){
                    that.setData({
                      ischangeimgModal: false,
                      idcard:tempFilePaths
                    })
                    wx.uploadFile({
                      url: 'http://sichuan.95504.net/v4/common/Upload/upload', //仅为示例，非真实的接口地址
                      filePath: res.tempFilePaths[0],
                      name: 'imgFile',
                      formData: {
                        token: token
                      },
                      success: function (res) {
                        const data = JSON.parse(res.data);
                        if (data.code == 200) {
                          that.setData({
                            idcardid: data.data.id,
                          })
                        }else{
                          wx.showToast({
                            title: res.data.msg,
                            icon: 'none',
                            duration: 2000
                          });    
                        }
                      }
                    });            
            }else if(that.data.imgtype == 'sellerlogo'){
              that.setData({
                ischangeimgModal: false,
                sellerlogo:tempFilePaths
              })
              wx.uploadFile({
                url:'http://sichuan.95504.net/v4/common/Upload/upload', //仅为示例，非真实的接口地址
                filePath: res.tempFilePaths[0],
                name: 'imgFile',
                formData: {
                  token: token
                },
                success: function (res) {
                  const data = JSON.parse(res.data);
                  if (data.code == 200) {
                    that.setData({
                      seller_logo: data.data.id,
                    })
                  }else{
                    wx.showToast({
                      title: res.data.msg,
                      icon: 'none',
                      duration: 2000
                    });    
                  }
                }
              });             
            }else if(that.data.imgtype == 'idcard_'){
              that.setData({
                ischangeimgModal: false,
                idcard_:tempFilePaths
              })
              wx.uploadFile({
                url: 'http://sichuan.95504.net/v4/common/Upload/upload', //仅为示例，非真实的接口地址
                filePath: res.tempFilePaths[0],
                name: 'imgFile',
                formData: {
                  token: token
                },
                success: function (res) {
                  const data = JSON.parse(res.data);
                  if (data.code == 200) {
                    that.setData({
                      idcard_id: data.data.id,
                    })
                  }else{
                    wx.showToast({
                      title: res.data.msg,
                      icon: 'none',
                      duration: 2000
                    });    
                  }
                }
              });             
            }else if(that.data.imgtype == 'shopimg'){
              that.setData({
                ischangeimgModal: false,
                shopimg:tempFilePaths
              })
              wx.uploadFile({
                url: 'http://sichuan.95504.net/v4/common/Upload/upload', //仅为示例，非真实的接口地址
                filePath: res.tempFilePaths[0],
                name: 'imgFile',
                formData: {
                  token: token
                },
                success: function (res) {
                  const data = JSON.parse(res.data);
                  if (data.code == 200) {
                    that.setData({
                      shopimgid: data.data.id,
                    })
                  }else{
                    wx.showToast({
                      title: res.data.msg,
                      icon: 'none',
                      duration: 2000
                    });    
                  }
                }
              });             
            }else if(that.data.imgtype == 'license'){
              that.setData({
                ischangeimgModal: false,
                license:tempFilePaths
              })
              wx.uploadFile({
                url: 'http://sichuan.95504.net/v4/common/Upload/upload', //仅为示例，非真实的接口地址
                filePath: res.tempFilePaths[0],
                name: 'imgFile',
                formData: {
                  token: token
                },
                success: function (res) {
                  const data = JSON.parse(res.data);
                  if (data.code == 200) {
                    that.setData({
                      licenseid: data.data.id,
                    })
                  }else{
                    wx.showToast({
                      title:res.data.msg,
                      icon: 'none',
                      duration: 2000
                    });    
                  }
                }
              });             
            }            
          }else{
            wx.showToast({
              title:'请重新选择图片，不得大于200KB',
              icon: 'none',
              duration: 2000
            });  
          }


        }
      })
    },
    review(){
      var that = this;
      var token = app.data.token ? app.data.token : wx.getStorageSync('token');
      var seller_name = that.data.name;
      var contacts = that.data.contacts;
      var phone = that.data.phone;
      var address = that.data.address;
      var longitude = that.data.longitude;
      var latitude = that.data.latitude;
      var service = that.data.service;
      var cid = that.data.cid;
      var seller_logo = that.data.seller_logo;
      var business = that.data.licenseid;
      var shop_pic = that.data.shopimgid;
      var legal_card = that.data.idcardid;
      var legal_card_back = that.data.idcard_id;
      var index = that.data.index;
      var classes = that.data.class[index];
      var cid = classes.id;
      var reg = /^1(3|4|5|7|8)\d{9}$/;
      if(index == '' || cid == ''){
        wx.showToast({
          title: '请选择分类',
          icon: 'none',
          duration: 2000
        });  
        return false;      
      }
      else if(seller_name ==  ''){
        wx.showToast({
          title: '商家名称不能为空',
          icon: 'none',
          duration: 2000
        });
        return false;
      }else if(contacts == ''){
        wx.showToast({
          title: '联系人不能为空',
          icon: 'none',
          duration: 2000
        }); 
        return false;       
      }else if(phone == ''){
        wx.showToast({
          title: '联系人电话不能为空',
          icon: 'none',
          duration: 2000
        });  
        return false;      
      }else if(!reg.test(phone)){
        wx.showToast({
          title: '请输入正确的联系人电话',
          icon:"none",
          duration:2000
        });
          return false;
      }else if(address == ''){
        wx.showToast({
          title: '商家地址不能为空',
          icon: 'none',
          duration: 2000
        });  
        return false;      
      }else if(longitude == ''){
        wx.showToast({
          title: '请填写店铺经度',
          icon: 'none',
          duration: 2000
        });  
        return false;      
      }else if(latitude == ''){
        wx.showToast({
          title: '请填写店铺纬度',
          icon: 'none',
          duration: 2000
        });  
        return false;      
      }else if(service == ''){
        wx.showToast({
          title: '请填写经营范围',
          icon: 'none',
          duration: 2000
        });  
        return false;      
      }else if(seller_logo == ''){
        wx.showToast({
          title: '请上传店铺logo',
          icon: 'none',
          duration: 2000
        });  
        return false;      
      }else if(business == ''){
        wx.showToast({
          title: '请上传营业执照',
          icon: 'none',
          duration: 2000
        });  
        return false;      
      }else if(shop_pic == ''){
        wx.showToast({
          title: '请上传门店照片',
          icon: 'none',
          duration: 2000
        });  
        return false;      
      }else if(legal_card == ''){
        wx.showToast({
          title: '请上传法人身份证照片',
          icon: 'none',
          duration: 2000
        });  
        return false;      
      }else if(legal_card_back == ''){
        wx.showToast({
          title: '请上传法人身份证背面照片',
          icon: 'none',
          duration: 2000
        });  
        return false;      
      }else{
        wx.request({
              url: app.data.api + 'index/businessInvitation', //仅为示例，并非真实的接口地址
              method: "POST",
              data: {
                  token: token,
                  seller_name:seller_name,
                  contacts:contacts,
                  phone:phone,
                  address:address,
                  service:service,
                  longitude:longitude,
                  latitude:latitude,
                  cid:cid,
                  business:business,
                  shop_pic:shop_pic,
                  seller_logo:seller_logo,
                  legal_card:legal_card,
                  legal_card_back:legal_card_back
              },
              header: {
                  'content-type': 'application/json', // 默认值
              },
              success: function (res) {
                  // wx.hideLoading();
                  if (res.data.code == 200) {
                    wx.navigateTo({
                        url: '../invite-success/index',
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
    },
});
