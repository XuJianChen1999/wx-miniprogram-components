# wx-miniprogram-components
小程序常用组件库
目前有：弹出层、通知、日历、键盘、loading、购物车、充电进度球、瀑布流。长期维护


util.js使用方法

    1、首先在js文件中引入
    const Util = require('../utils/util.js')

    2、部分方法使用

    防抖函数的使用
    Util.doubunce(() => {
        //some opertion
    },时间（毫秒）)


    网络请求
    Util.httpRequest({
        url: `http://xxxxx/xxxx/xxxxx`,
        method: 'post',
        header: {
            //这里的格式不一定都是"Authorization": 'Bearer ' + xxxxxx，根据后台
            "Authorization": 'Bearer ' + 你的token
        },
        timeout: 5000,
        data: {
            x: 1, y: 2, z: 3
        }
    }).then(res => {

    }).catch(err => {

    })


    获取用户OpdenId
    async getId() {
        let openId = await Util.getOpenId(userId)
        console.log(openId)
    }


    获取用户信息
    //在app.js中要传this，不能写app
    async getUserInfo() {
        await Util.getUserInfo(app, userId)
        console.log(app.globalData)
    }
    


    获取身份验证信息和设备id
    let { authorization, deviceId } = Util.getAuthorizationInfo()


    生成随机字符串
    let randomStr = Util.getRandomCode()



modules使用方法

    以shopListModule.js为例，这里是关于所有商品相关的请求；使用是static后我们就不用去实例化里面的方法
    直接调用即可

    1、在顶部引入这个js文件
    const { ShopModules } = require('../modules/shopModule.js)

    2、使用(以第一个为例)
    ShopModules.getShopList('food', res => {
        console.log(res)
    }).catch(err => {
        console.log(err)
    })