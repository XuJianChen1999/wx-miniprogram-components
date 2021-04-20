const app = getApp()

Page({
  data: {
  	//新增的数据：分页后获得的数据，通过数组的concat方法拼起来的
    addMoreInfo:[],
   	//后台返回的全部数据，一般都是返回第一页的n条数据
    allData:[],
    analogData:[],
    middleGap:'5px'
  },
  onLoad: function () {
    // 获取模拟数据
    var arr1 = [],arr2 = []
    moNiData.forEach((ele,i) => {
      ele.id = i + '-' + new Date().getTime() // 模拟获取随机ID
      arr1.push(ele)
      arr2.push(ele)
    });
    this.setData({
      addMoreInfo: arr1,
      allData: arr2
    })
    
  },

  onReachBottom(){
    // console.log('小程序触底，触发加载数据')
    this.addPageInfo()
  },

  // 获取点击事件
  test(data){
    console.log(data)
  },
  // 增加数据
  addPageInfo(){
    var arr = this.data.addMoreInfo // 总数据集合（节点ID使用）
    var arr2 = []    // 新增数据集合（避免图片重复加载，导致速度过慢）
    var data = [
      {id:'0',image:'http://img2.imgtn.bdimg.com/it/u=1561660534,130168102&fm=26&gp=0.jpg'},
      {id:'1',image:'http://img2.imgtn.bdimg.com/it/u=1561660534,130168102&fm=26&gp=0.jpg'},
      {id:'2',image:'http://dashus.oss-cn-shenzhen.aliyuncs.com/DefaultImage/Game/20190313090409/完美9.png'},
      {id:'3',image:'http://img2.imgtn.bdimg.com/it/u=1561660534,130168102&fm=26&gp=0.jpg'},
      {id:'4',image:'http://img3.imgtn.bdimg.com/it/u=1417732605,3777474040&fm=26&gp=0.jpg'},
      {id:'5',image:'http://img3.imgtn.bdimg.com/it/u=1417732605,3777474040&fm=26&gp=0.jpg'},
      {id:'6',image:'http://img2.imgtn.bdimg.com/it/u=1561660534,130168102&fm=26&gp=0.jpg'},
    ];
    data.forEach((ele,i) => {
      ele.id = i + '-' + new Date().getTime() // 模拟获取随机ID
      arr.push(ele)
      arr2.push(ele)
    });
    this.setData({
      addMoreInfo: arr,
      allData: arr2
    })
    // console.log('新增的数据：',this.data.allData)
    // console.log('总数据：',this.data.addMoreInfo)
  },
})

var moNiData = [
  {id:'0',image:'http://img2.imgtn.bdimg.com/it/u=1561660534,130168102&fm=26&gp=0.jpg'},
  {id:'1',image:'http://img2.imgtn.bdimg.com/it/u=1561660534,130168102&fm=26&gp=0.jpg'},
  {id:'2',image:'http://dashus.oss-cn-shenzhen.aliyuncs.com/DefaultImage/Game/20190313090409/完美9.png'},
  {id:'3',image:'http://img2.imgtn.bdimg.com/it/u=1561660534,130168102&fm=26&gp=0.jpg'},
  {id:'4',image:'http://img2.imgtn.bdimg.com/it/u=1561660534,130168102&fm=26&gp=0.jpg'},
  {id:'5',image:'http://img2.imgtn.bdimg.com/it/u=1561660534,130168102&fm=26&gp=0.jpg'},
  {id:'6',image:'http://img2.imgtn.bdimg.com/it/u=1561660534,130168102&fm=26&gp=0.jpg'},
];
