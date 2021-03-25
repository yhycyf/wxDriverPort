/*
 * @Author: your name
 * @Date: 2021-02-07 09:12:55
 * @LastEditTime: 2021-03-25 17:09:13
 * @LastEditors: sueRimn
 * @Description: In User Settings Edit
 * @FilePath: \Scooter\pages\index\index.js
 */
// index.js
// 获取应用实例
import utils from '../../utils/index';
import api from '../../api/api';
const app = getApp()

Page({
  data: {
    motto: 'Helelo World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    active: 1,
    value: '',
    radio: 0,
    carCount: 0, //车辆管理数量
    fromCount: 0 //我的订单数量
  },
  // 我的订单
  myOrder() {
    wx.navigateTo({
      url: '/pages/personalCenter/myOrder/index'
    })
  },
  // 卡券管理
  goCard() {
    wx.navigateTo({
      url: `/pages/personalCenter/myCard/index`
    })
  },
  // 车辆管理
  goSelectCar() {
    wx.navigateTo({
      url: `/pages/index/shopDetails/orderPackUp/selectCar/index?disabled=${true}`
    })
  },
  payment() {
    wx.navigateTo({
      url: '/pages/dDelayedCar/payment/index'
    })
  },
  // 单选框
  onChangeRadio(event) {
    this.setData({
      radio: event.detail,
    });
  },
  // 事件处理函数
  bindViewTap() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  // 车辆管理
  async getUserPersonageCarCount() {
    let res = await api.getUserPersonageCarCount();
    if(res.flag) {
      this.setData({
        carCount: res.data.count
      })
    } else {
      utils.showToast(res.message)
    }
    console.log('车辆管理', res)
  },
  // 我的订单
  async getUserPersonageFromCount() {
    let res = await api.getUserPersonageFromCount();
    if(res.flag) {
      this.setData({
        fromCount: res.data.count
      })
    } else {
      utils.showToast(res.message)
    }
    console.log('我的订单', res)
  },
  onShow() {
    // this.getUserPersonageCarCount();
    // this.getUserPersonageFromCount();
  },
  onLoad() {
  },
})
