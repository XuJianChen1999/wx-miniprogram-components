let app = getApp()
const { hostCharge } = require('./httpUrlConfig.js')

class Util {
  
  //防抖函数时间ID
  static antiShakeId = 0;
  //设备ID
  static deviceId = ''

  //防抖函数
  static doubunce(callback, time) {
    if (Util.antiShakeId) {
      clearTimeout(Util.antiShakeId)
    }
    Util.antiShakeId = setTimeout(callback, time)
  }

  //补0操作
  static formatNumber(number) {
    number = number.toString()
    return number[1] ? number : `0${number}`
  }

  // 格式化时间
  static formatTime(date) {
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()
    const hour = date.getHours()
    const minute = date.getMinutes()
    const second = date.getSeconds()
    return `${[year, month, day].map(Util.formatNumber).join('/')} ${[hour, minute, second].map(Util.formatNumber).join(':')}`
  }

  //http请求
  static httpRequest(params) {
    const { url, method, timeout, data } = params
    let tAccessToken = wx.getStorageSync("access_token")
    let tHeader = Object.assign({
      "Authorization": 'Bearer ' + tAccessToken
    }, params.header)
    return new Promise((resolve, reject) => {
      wx.request({
        url: `${hostCharge}/${url}`,
        method: method || 'GET',
        timeout: timeout || 6000,
        data: data || {},
        header: tHeader,
        success(res) {
          //判断是否有网络
          wx.getNetworkType({
            success: (result) => {
              if(result.networkType === "none"){
                wx.showToast({
                  title: '网络连接已断开！！！',
                })
                return
              }
              resolve(res.data)
            },
            fail:(tErr) => {
              resolve(res)
            }
          })
        },
        fail(err) {
          reject(err)
        }
      })
    })
  }

  //微信支付
  static WxPay(tPayData) {
    //文档中有4个必传项，所以这里写4
    if (Object.keys(tPayData).length < 4) return
    const { nonceStr, paySign, timeStamp, signType } = tPayData
    return new Promise((resolve,reject) => {
      wx.requestPayment({
        nonceStr,
        package: tPayData.package,
        paySign,
        timeStamp,
        signType: signType ? signType : 'MD5',
        success(res) {
          resolve(res)
        },
        fail(err) {
          reject(err)
        }
      })
    })
  }

  //获取用户OpdenId
  static getOpenId(userId) {
    let signature
    let openId = wx.getStorageSync('openId')
    return new Promise(async (resolve, reject) => {
      //判断本地是否存储openid
      if (openId && !userId) {
        resolve1(openId)
        return
      }

      //本地没有重新请求openId
      await new Promise(resolve2 => {
        wx.login({
          complete: (res) => {
            if(res.errMsg === 'login:ok'){
              signature = res.code
              resolve2()
            }
          },
        })
      })

      //向服务器请求openid
      Util.httpRequest({
        url: `${hostCharge}/wx/getOpenIdByCode`,
        data: {
          code: signature,
          userId: userId ? userId : ''
        }
      }).then(val => {
        let { flag, data } = val.data
        if (flag) {
          wx.setStorageSync('openId', data.openid)
          resolve1(data.openid)
        } else {
          wx.showToast({
            icon: 'none',
            duration: 3000,
            title: '获取openid失败',
          })
        }
      }).catch(err => {
        wx.showToast({
          title: '获取openid失败',
        })
        rej(err)
      })
    })
  }

  //获取身份验证相关信息
  static getAuthorizationInfo() {
    //请求身份认证转换base64
    let tArr = []
    let tStr = "xxxxxxxxxxxxxxxxxxxxx"
    for (let i = 0; i < tStr.length; i++) {
      tArr.push(tStr.charCodeAt(i))
    }
    //生成随机设备id
    if (!Util.deviceId) {
      Util.deviceId = Util.getRandomCode()
    }
    console.log(wx.arrayBufferToBase64(new Uint16Array(tArr)))
    return {
      authorization: wx.arrayBufferToBase64(new Uint16Array(tArr)),
      deviceId: Util.deviceId
    }
  }

  //获取新token
  /**
  * @param String tRefreshToken 刷新token标识
  * @param function app 小程序app实例
  */
  static getRefreshToken(tRefreshToken, app) {
    let { authorization } = Util.getAuthorizationInfo()
    Util.httpRequest({
      url: `${hostCharge}/oauth/token`,
      header: {
        "Authorization": 'Basic ' + authorization,
        'content-type': 'application/x-www-form-urlencoded'
      },
      method: 'POST',
      data: {
        grant_type: "refresh_token",
        refresh_token: tRefreshToken
      }
    }).then(val => {
      let { code, access_token, refresh_token } = val.data
      if (code === -99) {
        wx.navigateTo({
          url: '../pages/login/login'
        })
        return
      }
      //存储Token
      wx.setStorageSync("access_token", access_token)
      wx.setStorageSync("refresh_token", refresh_token)
      Util.getUserInfo(app)
    })
  }

  //获取用户信息
  static getUserInfo(appRef,userId) {
    return new Promise((resolve, reject) => {
      app = app || appRef
      try {
        let tAccessToken = wx.getStorageSync("access_token")
        let tRefreshToken = wx.getStorageSync("refresh_token")
        if (tAccessToken) {
          wx.request({
            url: `${hostCharge}/user/info`,
            header: {
              "Authorization": 'Bearer ' + tAccessToken,
              userId
            },
            success(res) {
              // console.log(res.data)
              //如果Token过期重新请求Token
              if (res.statusCode === 401) {
                Util.getRefreshToken(tRefreshToken, app)
              } else {
                if (!res.data.flag) {
                  wx.showToast({
                    icon: "none",
                    title: "服务器错误！！"
                  })
                  return
                }
                appRef.globalData.userInfo = res.data.data
                resolve()
              }
            }
          })
          return
        }
        wx.showModal({
          showCancel: false,
          content: '暂未登录',
          success(res) {
            wx.navigateTo({
              url: '../pages/login/login',
            })
          }
        })
      } catch (error) {
        wx.showToast({
          icon: 'none',
          title: "网络出错！！",
        })
        reject(error)
      }
    })
  }

  //随机字符串
  static getRandomCode(tStringCodeArr) {
    //如果不是数组先转为数组
    if (!tStringCodeArr.length) {
      tStringCodeArr.split('')
    }
    let tCode = ''
    for (let i = 0; i < 10; i++) {
      tCode += tStringCodeArr[Util.wxRandom(0, 11)]
    }
    return tCode + Date.now()
  }

  //随机数取出
  static wxRandom(m, n) {
    var num = Math.floor(Math.random() * (m - n) + n)
    return num
  }
}

module.exports = Util
