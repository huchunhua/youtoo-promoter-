//index.js
//获取应用实例
const app = getApp()

Page({
    data: {
        showIndex:0,
        asc:false,
        pageLoaded:false,
        lists:[],
        type: 1,
        field: 'id',
        order: 'desc'
    },
    onLoad(option) {
        var that = this;
        var token = app.data.token ? app.data.token : wx.getStorageSync('token');
        wx.request({
            url: app.data.api + 'article/oilSchool',
            method: 'post',
            dataType  : 'json',
            data: {
                token: token,
                type: that.data.type,
                field: 'id',
                order: 'desc'
            },
            success: function (res)
            {
                if(res.data.code == 200)
                {
                    that.setData({
                        pageLoaded:true,    
                        lists: res.data.data
                    })
                }
                else
                {
                    wx.showToast({
                        title: res.data.msg,
                        icon: 'loading',
                        duration: 3000
                    })
                }
            }
        });
    },
    onTabSelect(e) {
        var that = this;
        var token = app.data.token ? app.data.token : wx.getStorageSync('token');
        var asc = e.currentTarget.dataset.asc ? e.currentTarget.dataset.asc : '';
        var sort_type = e.currentTarget.dataset.type;

        var field = 'id';
        var order = 'desc';
        if(e.currentTarget.dataset.index == 1)
        {
            if(asc)
            {
                field = 'reading';
                order = 'desc';
            }
            else
            {
                field = 'reading';
                order = 'asc';
            }
        }
        else if(e.currentTarget.dataset.index == 3)
        {
            if(asc)
            {
                field = 'create_time';
                order = 'desc';
            }
            else
            {
                field = 'create_time';
                order = 'asc';
            }
        }
        this.setData({
            showIndex: e.currentTarget.dataset.index,
            field: field,
            order: order,
            asc:!asc
        });
        wx.request({
            url: app.data.api + 'article/oilSchool',
            method: "POST",
            dataType  : 'json',
            data: {
                token: token,
                type: that.data.type,
                field: that.data.field,
                order: that.data.order
            },
            success: function (res)
            {
                if(res.data.code == 200)
                {
                    that.setData({
                        lists: res.data.data
                    })
                }
                else
                {
                    wx.showToast({
                        title: res.data.msg,
                        icon: 'loading',
                        duration: 3000
                    })
                }
            }
        });
    }
})
