/*
 * @Author: your name
 * @Date: 2021-02-07 09:12:55
 * @LastEditTime: 2021-04-07 15:44:48
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
    checked: true
  },
  // 同意协议
  onChangeAgree(event) {
    this.setData({
      checked: event.detail,
    });
  },
  onShow() {
    // this.getUserPersonageCarCount();
    // this.getUserPersonageFromCount();
  },
  onLoad() {
  },
})
