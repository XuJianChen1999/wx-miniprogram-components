// components/coupon/coupon.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    isShowRules: false
  },

  /**
   * 组件的方法列表
   */
  methods: {
    //点击优惠券
    onClickDiscountItem() {
      this.triggerEvent('onClickDiscount', { val: '点击了优惠券' })
    },
    //点击使用规则
    onClickShowRules() {
      this.setData({
        isShowRules: !this.data.isShowRules
      })
    }
  }
})
