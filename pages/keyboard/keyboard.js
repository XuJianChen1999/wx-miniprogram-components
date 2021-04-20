// pages/keyboard/keyboard.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    type: 'number',
    isShowKeyboard: false,
    carNumStr: [],
    carBoxNum: 8,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  //打开车牌号键盘
  openCarBoard(){
    let { carNumStr, abc } = this.data
    if (carNumStr.length > 0) {
			abc = true
		} else {
			abc = false
		}
		this.setData({
			isShowKeyboard: true,
			abc
		})
  },
  //切换车牌
	changeCarType(e){
    let { carType, carBoxNum, carNumStr } = this.data
    if (carType === 1) {
			carType = 2
			carBoxNum = 8
		} else {
			carType = 1
			carBoxNum  = 7
			if (carNumStr && carNumStr.length === 8) {
				carNumStr.pop()
			}
    }
    this.setData({
      carType,
      carBoxNum,
      carNumStr
    })
	},
  //车牌号选择
  handleCarValue(e) {
    let value = e.detail
    let { carNumStr, carBoxNum, abc } = this.data
    if (carNumStr.length < carBoxNum) {
      carNumStr.push(value)
    }
    if (carNumStr.length > 0) {
      abc = true
    }
    this.setData({
      carNumStr,
      abc
    })
  },
  //车牌号键盘点击
  onClickCarEvent(e) {
    let type = e.detail
    console.log(type)
    let { carNumStr, isShowKeyboard, abc } = this.data
    switch (type) {
      // 点击完成
      case "confirm":
        if (carNumStr.length === 0) {
          wx.showModal({
            showCancel: false,
            title: '温馨提示',
            content: '请填写车牌号'
          })
        }
        isShowKeyboard = false
        break
      // 点击取消
      case "cancel":
        isShowKeyboard = false
        break
      // 点击删除
      case "backspace":
        console.log(carNumStr)
        if (carNumStr.length > 0) {
          carNumStr.pop()
          if (carNumStr.length < 1) {
            abc = false
          }
        }
        break
    }
    console.log(carNumStr)
    console.log(isShowKeyboard)
    this.setData({
      isShowKeyboard,
      carNumStr,
      abc
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },
})