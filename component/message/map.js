/*
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2020-12-19 14:14:55
 * @LastEditors: sueRimn
 * @LastEditTime: 2021-02-08 14:35:08
 */

// import utils, { cdnUrl } from '@/utils/index';
const app = getApp();
Component({

  behaviors: [],

  // 属性定义（详情参见下文）
  properties: {
    getOn: {
      type: Boolean,
      value: true
    },
  },

  data: {
    latitude: 23.099994,
    longitude: 113.324520,
    markers: [{
      id: 1,
      latitude: 23.099994,
      longitude: 113.324520,
      name: 'T.I.T 创意园111'
    }],
    circles: [
      {
        latitude: 22.099994,
        longitude: 112.304520,
        color: '#000000',
        fillColor: '#ffffff',
        radius: 300,
        strokeWidth: 2,
        level: 'abovelabels'
      }
    ]
  }, // 私有数据，可用于模板渲染

  lifetimes: {
    // 生命周期函数，可以为函数，或一个在methods段中定义的方法名
    attached: function() {
      this.mapCtx = wx.createMapContext('myMap')
    },
    moved: function() { },
    detached: function() { }
  },

  // 生命周期函数，可以为函数，或一个在methods段中定义的方法名
  attached: function() { }, // 此处attached的声明会被lifetimes字段中的声明覆盖
  ready: function() { },

  pageLifetimes: {
    // 组件所在页面的生命周期函数
    show: function() { },
    hide: function() { },
    resize: function() { }
  },

  methods: {

  
  }

});