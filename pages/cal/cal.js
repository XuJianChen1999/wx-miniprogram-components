const app = getApp()

Page({
  data: {
    isShowCalendar: false
  },
  onLoad: function () {
    
  },
  onClickShowCalendar(){
    this.setData({
      isShowCalendar: !this.data.isShowCalendar
    })
  },
  solarAndLunar(e){
    this.setData({
      alltime:e.detail
    })
  },
  /**
   * 点击日期时候触发的事件
   * bind:getdate
   */
  getdate(e) {
    console.log(e.detail);
  },
  /**
   * 点击全选触发的事件
   * bind:checkall
   */
  checkall(e) {
    console.log(e.detail.days);
  },
  /** 
  * 点击确定按钮触发的事件
  * bind:select
  */
  cmfclick(e){
    console.log(e.detail.selectDays);
    this.setData({
      isShowCalendar: false
    })
  },
  /** 
  * 点击清空事件
  * bind:clear
  */
  clear(e) {
    console.log("要清空选中日期")
  }
})