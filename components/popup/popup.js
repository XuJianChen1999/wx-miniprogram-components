// components/popup/popup.js
Component({
  properties: {
    types: {
      type: String,
      value: ''
    },
    title: {
      type: String,
      value: '我是标题哦'
    },
    message: {
      type: String,
      value: '这里是信息这里是信息这里是信息这里是信息这里是信息这里是信息这里是信息这里哈哈哈哈啊哈哈哈哈哈哈哈哈'
    },
    //中间弹框图片
    showMiddleModalImg: {
      type: String,
      value: ''
    }
  },
  
  data: {
    isShowModal: false,
    list: [
      {key:'key', val: 'value'},
      {key:'key', val: 'value'},
      {key:'key', val: 'value'},
      {key:'key', val: 'value'},
      {key:'key', val: 'value'},
      {key:'key', val: 'value'},
      {key:'key', val: 'value'},
      {key:'key', val: 'value'},
      {key:'key', val: 'value'},
      {key:'key', val: 'value'},
      {key:'key', val: 'value'},
      {key:'key', val: 'value'},
      {key:'key', val: 'value'},
      {key:'key', val: 'value'},
      {key:'key', val: 'value'}
    ]
  },

  methods: {
    //点击确定
    onClickConfirm(){
      const data = this.data
      this.triggerEvent('onConfirm', data)
      return
      this.onClickHideModal()
    },
    onClickShowModal(){
      this.setData({
        isShowModal: true
      })
    },
    onClickHideModal(){
      this.setData({
        isShowModal: false
      })
    }
  }
})
