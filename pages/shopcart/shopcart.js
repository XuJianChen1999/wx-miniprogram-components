// pages/shopcart/shopcart.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    clientX: 0, //开始坐标
    clientY: 0,
    goodsList: [
      {
        goods_name: '上衣',
        goods_price: 10.59,
        sales_num: 1,
        goods_stock: 10,
        goods_id: '0'
      },
      {
        goods_name: '裤子',
        goods_price: 20.69,
        sales_num: 1,
        goods_stock: 8,
        goods_id: '1'
      },
      {
        goods_name: '鞋子',
        goods_price: 30,
        sales_num: 1,
        goods_stock: 8,
        goods_id: '2'
      },
      {
        goods_name: '袜子',
        goods_price: 40,
        sales_num: 1,
        goods_stock: 15,
        goods_id: '3'
      },
      {
        goods_name: '帽子',
        goods_price: 25,
        sales_num: 1,
        goods_stock: 15,
        goods_id: '4'
      },
      {
        goods_name: '眼镜',
        goods_price: 30,
        sales_num: 1,
        goods_stock: 20,
        goods_id: '5'
      }
    ],
    isAllChecked: false, //是否全选
    checkedArr: [], //复选框选中的值
    totalPrice: 0,
    totalCount: 0,
    status: 'pay',//account结算，delete删除编辑状态
  },
  onDelete(){
    console.log(1212)
  },
  //选择购物车商品
  handleShopChange(e){
    let { goodsList, isAllChecked } = this.data
    let values = e.detail.value
    for (let item of goodsList) {
      //有时候id可能是number也有可能是string，这里做统一string处理
      let goodId = String(item.goods_id)
      // 如果要检索的字符串值没有出现，则返回 -1。
      values.indexOf(goodId) >= 0 ? item.checked = true : item.checked = false
    }
    let length = values.length
    // 如果选择的数组中有值，并且长度等于列表长度，就是全选
    length > 0 && length === goodsList.length ? isAllChecked = true : isAllChecked = false
    this.setData({
      isAllChecked
    })
    this.calTotalCountPrice()
  },
  //加减数量
  handleCountChange(e){
    const { type, id } = e.currentTarget.dataset
    let { goodsList } = this.data
    if (type === 'add') {
      //最大数量显示10个
      if (goodsList[id].sales_num >= 10) return
      goodsList[id].sales_num++
    } else {
      //最小数量限制一个
      if (goodsList[id].sales_num === 1) return
      goodsList[id].sales_num--
    }
    this.setData({
      goodsList
    })
    this.calTotalCountPrice()
  },
  //全选
  onSelectAll(e){
    let { goodsList, isAllChecked } = this.data
    let values = e.detail.value
    for (let i = 0; i < goodsList.length; i++) {
      goodsList[i].checked = false
      if (values[0] === 'all') {
        isAllChecked = true
        goodsList[i].checked = true
      } else {
        isAllChecked = false
        goodsList[i].checked = false
      }
    }
    this.setData({
      isAllChecked,
      goodsList
    })
    this.calTotalCountPrice()
  },
  //购物车状态
  onClickEdit(){
    let { status } = this.data
    if (status === 'pay'){
      this.setData({
        status: 'delete'
      })
      return
    } 
    this.setData({
      status: 'pay'
    })
  },
  //计算总数
  calTotalCountPrice(){
    let { goodsList, totalCount, totalPrice } = this.data
    //每次执行的时候初始化，防止重复计算
    totalCount = 0
    totalPrice = 0
    for (let i = 0; i < goodsList.length; i++) {
      //如果都是选中的状态在计算
      if (goodsList[i].checked) {
        totalCount += 1
        totalPrice += goodsList[i].goods_price * goodsList[i].sales_num
      }
    }
    this.setData({
      totalCount,
      totalPrice: totalPrice.toFixed(2)
    })
  },
  /**
  * 计算滑动角度
  * @param {Object} start 起点坐标
  * @param {Object} end 终点坐标
  */
  angle(start,end){
    let X = end.X - start.X,
    Y = end.Y - start.Y
    console.log(360 * Math.atan(Y / X) / (2 * Math.PI))
    return 360 * Math.atan(Y / X) / (2 * Math.PI)
  },
  //结算和删除
  onPayOrDelete(){
    const { status } = this.data
    console.log(status)
    status === 'delete' && this.deleteShopCartList()
    status === 'pay' && this.payShopCartPrice()
  },
  deleteShopCartList(){
    wx.showToast({
      title: 'delete',
    })
  },
  payShopCartPrice(){
    wx.showToast({
      title: 'pay price',
    })
  },
  onShow: function () {

  },
  onPullDownRefresh: function () {

  },
  onReachBottom: function () {

  },
})