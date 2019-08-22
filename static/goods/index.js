const app = getApp()
Component({
    options: {
        multipleSlots: true, // 在组件定义时的选项中启用多slot支持
        addGlobalClass: false,
    },
    data: {
        callback: null,
        refererPage: null,
        mobileBindModal: false,
        mobileBindForm: {
            mobile: '',
            seccode: ''
        },
        mobileBindCfg: {
            disabled: false,
            countText: '获取'
        }
    },
    externalClasses: ['i-class'],
    properties: {
        goods: {
            type: Object,
            value: {}
        }
    },
    methods: {
        edit(e) {
            let id = e.currentTarget.dataset.id;
            let status = e.currentTarget.dataset.status;
            wx.navigateTo({
                url: '../goodsedit/index?id=' + id,
            })
        }, 
    }
});
