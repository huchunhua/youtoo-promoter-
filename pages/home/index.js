const app = getApp()
Page({
    data: {
        pageLoaded: false,
        latitude: "",
        longitude: "",
        controls: [{
          id: 1,
          iconPath: '/image/location.png',
          position: {
            left: 125,
            top: 125,
            width: 50,
            height: 50
          },
          clickable: true
        }]
    },
    onReady: function (e) {
      this.mapCtx = wx.createMapContext('myMap')
    },
    getCenterLocation: function () {
      var that = this;
      this.mapCtx.getCenterLocation({
        success: function(res){
          that.setData({
            maplongitude:parseFloat(res.longitude),
            maplatitude:parseFloat(res.latitude),
          })
        }
      })
    },
    write:function(){
      var that = this;
      var maplongitude = that.data.maplongitude;
      var maplatitude = that.data.maplatitude;
      wx.setStorageSync('maplongitude',maplongitude);
      wx.setStorageSync('maplatitude',maplatitude);
      wx.navigateBack({
        delta: 1
      })
    },         
    onLoad(option) {
        var that = this;
        wx.getLocation({
         type: 'wgs84',
         success (res) {
           const latitude = res.latitude
           const longitude = res.longitude
           const speed = res.speed
           const accuracy = res.accuracy
           that.setData({
            maplatitude:latitude,
            maplongitude:longitude
           })
         }
        })
    }
});
