// components/keyboard/keyboard.js

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    //是否显示小数点
    isShowPoint: {
      type: Boolean,
      value: true
    },
    //键盘类型 ==> number：数字   car：车辆
    type: {
      type: String,
      value: ''
    },
    // 是否显示"取消"按钮
		cancelBtn: {
			type: Boolean,
			value: true
		},
		// 是否显示"完成"
		confirmBtn: {
			type: Boolean,
			value: true
		},
		// 是否显示车牌号键盘
		isCarBoard:{
			type: Boolean,
			value: false
		},
		// 车牌号中英切换
		abc:{
			type: Boolean,
			value: false
		}
  },

  /**
   * 组件的初始数据
   */
  data: {
    //是否弹出
    isShowKeyboard: false,
    index: 0,
    pwdVal: ['','','','','',''],
    // 数字键盘列表
    keyboardNumList: [1,2,3,4,5,6,7,8,9,'.',0],
    // 车牌输入时，abc=true为输入车牌号码，bac=false为输入省份中文简称
		areaList: [
			['京', '沪', '粤', '津', '冀', '豫', '云', '辽', '黑', '湘' ],
			['皖', '鲁', '苏', '浙', '赣', '鄂', '桂', '甘', '晋', '陕' ],
			['蒙', '吉', '闽', '贵', '渝', '川', '青', '琼', '宁', '挂' ],
			['藏', '港', '澳', '新', '使', '学' ]
		],
		EngKeyBoardList: [
			[1, 2, 3, 4, 5, 6, 7, 8, 9, 0 ],
			['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P' ],
			['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'Z' ],
			['X', 'C', 'V', 'B', 'N', 'M' ]
		]
  },
  observers: {
    isShowPoint(newVal,oldVal){
      console.log(newVal)
      let { keyboardNumList } = this.data
      //根据传值判断是否显示小数点
      if(!newVal){
        let boardArr = keyboardNumList.filter(item =>{
          return item !== "."
        })
        this.setData({
          keyboardNumList: boardArr
        })
      }
    }
  },
  /**
   * 组件的方法列表
   */
  methods: {
    //点击数字键盘
    handKeyboardChange(e){
      let { pwdVal, index, keyboardNumList } = this.data
      let { val }  = e.currentTarget.dataset
      if(index > 5){
        wx.showToast({
          title: '不能再输入了',
        })
      } else {
        let arr = pwdVal
        // console.log(arr)
        // 根据index向数组中追加对应的数据
        arr.splice(index, 1, val)
        this.setData({
          pwdVal: arr,
          index: index + 1,
        })
      }
    },
    //删除密码
    onClearPwd(){
      let { pwdVal, index } = this.data
      if(index === 0){
        wx.showToast({
          title: '不能再删除了',
        })
        return
      }
      let arr = pwdVal;
      arr.splice(index - 1, 1, '')
      this.setData({
        pwdVal: arr,
        index: index - 1,
      })
      console.log(this.data.pwdVal)
    },
    //显示弹框
    onShowKeyboard(){
      console.log()
      this.setData({
        isShowKeyboard: true
      })
    },
    //关闭弹框
    onCloseKeyboard(){
      this.setData({
        isShowKeyboard: false,
        pwdVal: ['','','','','','']
      })
    },
    carInputClick(e) {
      let { i, j } = e.currentTarget.dataset
      let { abc, EngKeyBoardList, areaList } = this.data
			let value = ''
			// 不同模式，获取不同数组的值
			if (abc) {
				value = EngKeyBoardList[i][j]
			} else {
				value = areaList[i][j]
			}
			console.log("value", value)
			this.triggerEvent('carValue', value)
		},
		// 修改汽车牌键盘的输入模式，中文|英文
		changeCarInputMode() {
			this.setData({
				abc: !this.data.abc
			})
		},
		// 点击退格键
		backspaceClick() {
      this.triggerEvent('myevent', 'backspace')
      //再次清空定时器，防止重复注册定时器
			clearInterval(this.timer) 
			this.timer = setInterval(() => {
				this.triggerEvent('myevent', 'backspace')
			}, 250)
		},
		clearTimer() {
			clearInterval(this.timer)
		},
		// 输入完成
		onConfirm() {
			this.triggerEvent('myevent', 'confirm')
		},
		// 取消输入
		onCancel() {
			this.triggerEvent('myevent', 'cancel')
		},
  }
})

