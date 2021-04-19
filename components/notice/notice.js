// components/notice/notice.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    text: {
      type: String || Array,
      value: '' || []
    }
  },
  /**
   * 组件的初始数据
   */
  data: {
    animation: null, //文字滚动动画集
    timer: null, //定时器
    duration: 0, //设置滚动速度，数值越大速度越慢
    textWidth: 0, //文本宽度
    wrapWidth: 0, //容器宽度
    isShowNotice: false
  },
  pageLifetimes: {
    show(){
      this.initAnimation()
      setTimeout(() => {
        this.setData({
          isShowNotice: true
        })
        setTimeout(() => {
          this.setData({
            isShowNotice: false
          })
        }, 1500)
      }, 500)
    },
    hide(){
      this.destroyTimer()
      this.setData({
        timer: null
      })
    }
  },
  // observers: {

  // },
  /**
   * 组件的方法列表
   */
  methods: {
    //初始化动画
    initAnimation(){
      let query = this.createSelectorQuery()
      query.select('.content-text').boundingClientRect()
      query.select('.box').boundingClientRect()
      // 设置容器宽度和文本宽度
      query.exec(rect => {
        // console.log(rect)
        let { duration } = this.data
        //设置时间
        this.data.duration = 4000 * (rect[0].width / rect[1].width)
        //创建动画并选择动画节点
        this.data.animation = wx.createAnimation({
          duration,
          timingFunction: 'linear'
        })
        this.setData({
          textWidth: rect[0].width <= rect[1].width ? rect[1].width : rect[0].width,
          wrapWidth: rect[1].width
        }, () => {
          this.startAnimation()
        })
      })
    },
    // 为定时器设置动画
    startAnimation() {
      let { animation, wrapWidth, textWidth, duration } = this.data
      // 设置X轴的偏移位置并导出动画
      const resetAnimation = animation.translateX(wrapWidth).step({
        duration: 0
      })
      //导出动画
      this.setData({
        animationData: resetAnimation.export()
      })
      const animationData = animation.translateX(-(textWidth + wrapWidth) + 100).step({
        duration
      })
      setTimeout(() => {
        this.setData({
          animationData: animationData.export()
        })
      }, 100)
      const timer = setTimeout(() => {
        this.startAnimation()
      }, duration)
      this.setData({
        timer
      })
    },
    //销毁定时器
    destroyTimer() {
      if (this.data.timer) {
        clearTimeout(this.data.timer)
      }
    }
  }
})
