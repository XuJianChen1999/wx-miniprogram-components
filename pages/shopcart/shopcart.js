// pages/shopcart/shopcart.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cartShops: [
      {
        shop_name: '店铺1',
        shop_id: 1
      },
      {
        shop_name: '店铺2',
        shop_id: 2
      }
    ],
    goodsList: [
      {
        goods_name: '上衣',
        goods_price: 10,
        sales_num: 1,
        goods_stock: 10,
        goods_id: '0'
      },
      {
        goods_name: '裤子',
        goods_price: 20,
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
    totalCount: 0
  },
  //选择购物车商品
  handleShopChange(e){
    let { goodsList, isAllChecked } = this.data
    let values = e.detail.value
    for (let item of goodsList) {
      let goodId = String(item.goods_id)
      // 如果要检索的字符串值没有出现，则返回 -1。
      if (values.indexOf(goodId) >= 0) {
        item.checked = true
      } else {
        item.checked = false
      }
    }
    // this.setData({
    //   checkedArr: values
    // })
    this.data.checkedArr = values
    let length = this.data.checkedArr.length
    // 如果选择的数组中有值，并且长度等于列表长度，就是全选
    if (length > 0 && length === goodsList.length) {
      isAllChecked = true
    } else {
      isAllChecked = false
    }
    this.setData({
      isAllChecked
    })
    this.calTotalCountPrice()
  },
  //加减数量
  handleCountChange(e){
    const { type, id } = e.currentTarget.dataset
    console.log(id)
    let { goodsList } = this.data
    if (type === 'add') {
      if (goodsList[id].sales_num >= 10) return
      goodsList[id].sales_num++
    } else {
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
  //计算总数
  calTotalCountPrice(){
    let { goodsList, totalCount, totalPrice } = this.data
    //初始化
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
      totalPrice
    })
  },
  onShow: function () {

  },
  onPullDownRefresh: function () {

  },
  onReachBottom: function () {

  },
})