/*
 * @Author: your name
 * @Date: 2021-02-07 09:12:55
 * @LastEditTime: 2021-03-26 09:48:13
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
  onShow() {
    // this.getUserPersonageCarCount();
    // this.getUserPersonageFromCount();
  },
  onLoad() {
  },
})
