const Util = require('../utils/util.js')

class ShopModules extends Util {
  constructor() {
    super()
  }

  //获取商品列表
  static getShopList(type, callback) {
    // type: 要获取哪种类型的商品列表
    Util.httpRequest({
      url: `${hostCharge}/getShopList/${type}`,
      method: 'post'
    }).then(res => {
      callback(res.data)
    }).catch(err => 
      callback(err))
  }

  //获取商品详情
  static getShopDetailById(type, goodId, callback) {
    let tAccessToken = wx.getStorageSync('access_token')
    if (!tAccessToken) return
    Util.httpRequest({
      url: `${hostCharge}/getShopList/${type}`,
      method: 'post',
      header: {
        "Authorization": 'Bearer ' + tAccessToken
      },
      data: {
        type, goodId
      }
    }).then(res => {
      callback(res)
    })
  }
}

export { ShopModules }