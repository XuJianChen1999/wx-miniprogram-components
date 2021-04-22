// components/tabs/tabs.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    tabs: {
      type:Array,
      value: ['默认1', '默认2']
    },
    //动态传入的样式：字体大小、背景颜色、文字颜色
    styles: {
      type: Object,
      value: {}
    }
  },
  observers: {
    styles(val) {
      console.log(val)
    }
  },
  /**
   * 组件的初始数据
   */
  data: {
    curTabLabel: ''
  },
  pageLifetimes: {
    show() {
      this.setData({
        curTabLabel: this.properties.tabs[0]
      })
    }
  },
  /**
   * 组件的方法列表
   */
  methods: {
    onClickTabItem(e) {
      let { label } = e.currentTarget.dataset
      this.setData({
        curTabLabel: label
      })
      this.triggerEvent('onTabBarChange', { label })
    }
  }
})
