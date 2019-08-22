const app = getApp()
Page({
    data: {
        pageLoaded: false,
        class:'',
        index:'',
        state:[
          {
            name: '上架',
            value: 1
          },          
          {
            name: '下架',
            value: 0
          },
        ],
        price:'',
        mprice:'',
        title:'',
        name:'',
        tips:'',
        detial:'',
        prompt:'',
        describe:'',
        starttime:'8:00',
        endtime:'18:00',
        inventory:'',
        ischangeimgModal:false,
        pics:[],
        logo:'',
        logoid:'',
        pictures:'',
        status:'',
        id:''
    },
    bindcard() {
        wx.navigateTo({
            url: '../bindcard/index',
        })
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
    onLoad(option) {
      var that = this;
      var id = option.id;
      var token = app.data.token ? app.data.token : wx.getStorageSync('token');
      wx.request({
            url: app.data.api + 'goods/detail', //仅为示例，并非真实的接口地址
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
                    that.setData({
                        pageLoaded: true,
                        id:id,
                        price:res.data.data.g_group_price,
                        title:res.data.data.g_title,
                        name:res.data.data.g_name,
                        tips:res.data.data.g_describe,
                        status:res.data.data.g_status
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
                        class:res.data.data
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
    price:function(e){
      this.setData({
        price:e.detail.value
      });
    },     
    mprice:function(e){
      this.setData({
        mprice:e.detail.value
      });
    },    
    title:function(e){
      this.setData({
        title:e.detail.value
      });
    },    
    name:function(e){
      this.setData({
        name:e.detail.value
      });
    },      
    describe:function(e){
      this.setData({
        describe:e.detail.value
      });
    },          
    inventory:function(e){
      this.setData({
        inventory:e.detail.value
      });
    },
    radioChange:function(e){
      this.setData({
        status:e.detail.value
      });      
    },
    bindTimeChange(e) {
        let that = this;
        console.log(e.detail.value)
        that.setData({
          starttime: e.detail.value,
        })
    },   
    bindTimeChange2(e) {
        let that = this;
        that.setData({
          endtime: e.detail.value,
        })
    },
    editgoods:function(){
      var that = this;
      var token = app.data.token ? app.data.token : wx.getStorageSync('token');
      var id = that.data.id;
      var category_id = that.data.class[that.data.index].id ? that.data.class[that.data.index].id : 0;
      var group_price = that.data.price;
      var market_price = that.data.mprice;
      var name = that.data.name;
      var title = that.data.title;
      var describe = that.data.describe;
      var cycle_start = that.data.starttime;
      var cycle_end = that.data.endtime;
      var inventory = that.data.inventory;
      var logo = that.data.logoid;
      var pictures = that.data.pictures;
      var status = that.data.status;
      if(category_id==""){
        wx.showToast({
          title: '请选择商品分类',
          icon:"none",
          duration:2000
        });
       return false;
      };      
      if(group_price==""){
        wx.showToast({
          title: '团购价不能为空',
          icon:"none",
          duration:2000
        });
       return false;
      };      
      if(market_price==""){
        wx.showToast({
          title: '市场价不能为空',
          icon:"none",
          duration:2000
        });
       return false;
      };      
      if(name==""){
        wx.showToast({
          title: '商品名称不能为空',
          icon:"none",
          duration:2000
        });
       return false;
      };      
      if(title==""){
        wx.showToast({
          title: '商品标题不能为空',
          icon:"none",
          duration:2000
        });
       return false;
      };      
      if(describe==""){
        wx.showToast({
          title: '商品描述不能为空',
          icon:"none",
          duration:2000
        });
       return false;
      };      
      if(cycle_start==""){
        wx.showToast({
          title: '商品使用开始时间不能为空',
          icon:"none",
          duration:2000
        });
       return false;
      };      
      if(cycle_end==""){
        wx.showToast({
          title: '商品使用结束时间不能为空',
          icon:"none",
          duration:2000
        });
       return false;
      };      
      if(inventory==""){
        wx.showToast({
          title: '商品库存不能为空',
          icon:"none",
          duration:2000
        });
       return false;
      };      
      if(logo==""){
        wx.showToast({
          title: '商品图片不能为空',
          icon:"none",
          duration:2000
        });
       return false;
      };      
      if(pictures==""){
        wx.showToast({
          title: '商品展示图片不能为空',
          icon:"none",
          duration:2000
        });
       return false;
      };      
      if(status==""){
        wx.showToast({
          title: '商品状态不能为空',
          icon:"none",
          duration:2000
        });
       return false;
      };
      wx.request({
            url: app.data.api + 'goods/editGoods', //仅为示例，并非真实的接口地址
            method: "POST",
            data: {
                token: token,
                id:id,
                category_id:category_id,
                group_price:group_price,
                market_price:market_price,
                name:name,
                title:title,
                describe:describe,
                cycle_start:cycle_start,
                cycle_end:cycle_end,
                inventory:inventory,
                logo:logo,
                pictures:pictures,
                status:status
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
          if(that.data.imgtype == 'one'){
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
          }else if (that.data.imgtype == 'more'){
            that.setData({
              // avatar:tempFilePaths[0],
              ischangeimgModal: false,
              pics:pics.concat(tempFilePaths)
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
                  pictures: that.data.pictures + data.datas.ids[0] + ',',
                })
              }
              console.log(that.data.pictures);
            }
          });
          }
        }
      })
  },
});
