/*
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2020-12-19 14:14:55
 * @LastEditors: sueRimn
 * @LastEditTime: 2021-03-22 16:14:32
 */
import wxRequest from '../../utils/wxRequest'
import {showTime} from '../../utils/format'
import utils from '../../utils/index'
import api from '../../api/api'
const app = getApp();
Component({
  options: {
    multipleSlots: true // 在组件定义时的选项中启用多slot支持
  },
  observers: {
    
  },

  // 属性定义（详情参见下文）
  properties: {
    type: {
      type: String,
      value: ''
    },
    getCarLocation: {
      type: String,
      value: ''
    }
  },

  data: {
    show: false,
    showTipsBox: true,
    getCarTime: '',
    checked: false,
    phone: '',
    countDown: 0,
    isShowcountDown: false,
    times: null
  }, // 私有数据，可用于模板渲染

  lifetimes: {
    // 生命周期函数，可以为函数，或一个在methods段中定义的方法名
    attached: function() {
      console.log('attached');
      // this.getLocation();
    },
    moved: function() { },
    created: function() {
      console.log('created')
    },
    detached: function() {},
    ready: function() {
      
    }
  },

  pageLifetimes: {
    // 组件所在页面的生命周期函数
    show: function() { 
      console.log('show');
      
    },
    hide: function() { },
    resize: function() { }
  },

  methods: {
    submit(e) {
      let type = e.currentTarget.dataset.type;
      this.triggerEvent('seeDetails')
    },
    showPopup(e) {
      let type = e.currentTarget.dataset.type;
      this.triggerEvent('showPopup', {type: type})
    },
  
    // 同意协议
    onChangeAgree(event) {
      this.setData({
        checked: event.detail,
      });
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
              getCarLocation: e.name,
              showTipsBox: false
            })
            that.triggerEvent('sfOutCarSite', e)
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
    getTips() {
      this.setData({
        getCarLocation: this.data.getCarLocation
      })
      this.triggerEvent('sfOutCarSite', this.data.historyAddress)
      this.closeTipsBox();
    },
    closeTipsBox(e) {
      this.setData({
        showTipsBox: false
      })
    },
    currentDate(event) {
      let currentDate = showTime(new Date(event.detail));
      this.setData({
        getCarTime: currentDate
      })
      this.triggerEvent('currentDate', event.detail)
    },
    // 输入手机号
    onChangePhone(event) {
      console.log('event', event)
      this.setData({
        phone: event.detail.value
      })
    },
    // 发送验证码
    async sendCode() {
      if(this.data.countDown > 0) {
        return;
      }
      let phone = this.data.phone;
      if(!phone) return;
      let flag = utils.isPhone(phone);
      if(flag) {
        let res = await api.scooterOrderCode({
          upPhone: phone
        });
        if(res.flag) {
          utils.showToast(res.message);
          this.setData({
            countDown: 60
          })
          clearInterval(this.data.times);
          this.data.times = setInterval(() => {
            if(this.data.countDown > 0) {
              this.setData({
                countDown: this.data.countDown - 1
              })
            } else {
              clearInterval(this.data.times);
              this.setData({
                countDown: 0,
                isShowcountDown: false
              })
            }
          }, 1000);
        } else {
          utils.showToast(res.message);
        }
        console.log('手机号验证', res)
      } else {
        utils.showToast('手机号输入有误！请重新输入')
      }
    },
  }

});