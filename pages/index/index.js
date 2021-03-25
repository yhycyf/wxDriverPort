/*
 * @Author: your name
 * @Date: 2021-02-07 09:12:55
 * @LastEditTime: 2021-03-25 16:44:06
 * @LastEditors: sueRimn
 * @Description: In User Settings Edit
 * @FilePath: \Scooter\pages\index\index.js
 */
// index.js
// 获取应用实例
import wxRequest from '../../utils/wxRequest';
import utils from '../../utils/index'
const app = getApp();

Page({
  data: {
    show: false,
    getCarLocation: '',
    actions: [
      { name: '获取用户信息', color: '#07c160', openType: 'getUserInfo' },
    ],
    callBackTimes: 0,
  },
  onReady: function (e) {
    
  },
  // 申请还车
  seeDetails() {
    wx.navigateTo({
      url: '/pages/index/details/index'
    })
  },
  showPopup(type) {
    this.setData({ show: true });
  },
  getTips() {
    this.setData({
      getCarLocation: this.data.historyAddress
    })
    this.closeTipsBox();
  },
  closeTipsBox(e) {
    this.setData({
      showTipsBox: false
    })
  },
  locationEvent(e) {
    console.log('回调', e)
    if(this.data.callBackTimes > 0) {
      this.selectComponent('#message').closeTipsBox();
    }
    this.setData({
      getCarLocation: e.detail.result.pois[0].title,
      callBackTimes: this.data.callBackTimes + 1
    })
  },
  async selectLocation() {
    let that = this;
    let setting = await wxRequest.getSetting('scope.userLocation');
    if(setting) {
      wx.chooseLocation({
        success: function (e) {
          //允许打开定位
          console.log("开启了定位",e);
          that.setData({
            getCarLocation: e.name
          })
          
        },
      })
    }
    // wx.navigateTo({
    //   url: '/pages/applyReturnCar/getCarLocations/index',
    //   success: function(res) {
    //     // 通过eventChannel向被打开页面传送数据
    //     res.eventChannel.emit('acceptDataFromOpenerPage', { data: 'test' })
    //   }
    // })
  },
  onClose() {
    this.setData({ show: false });
  },

  onSelect(event) {
    console.log(event.detail);
  },
  moveToLocation() {
    console.log('执行')
    this.selectComponent('#map').moveToLocation();
  },
  onLoad() {
    
  },
})
