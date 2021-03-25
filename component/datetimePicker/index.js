/*
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2020-12-19 14:14:55
 * @LastEditors: sueRimn
 * @LastEditTime: 2021-03-15 15:08:20
 */
const app = getApp();
Component({
  options: {
    multipleSlots: true // 在组件定义时的选项中启用多slot支持
  },
  observers: {
    
  },

  // 属性定义（详情参见下文）
  properties: {
    show: {
      type: Boolean,
      value: false
    },
  },

  data: {
    minDate: new Date().getTime() + 1000 * 3600 * 2,
    maxDate: new Date().getTime() + 1000 * 3600 * 24 * 365,
    currentDate: new Date().getTime() + 1000 * 3600 * 2,
    formatter(type, value) {
      if (type === 'year') {
        return `${value}年`;
      } else if (type === 'month') {
        return `${value}月`;
      } else if (type === 'day') {
        return `${value}日`;
      } else if (type === 'hour') {
        return `${value}点`;
      } else if (type === 'minute') {
        return `${value}分`;
      }
      return value;
    },
    filter(type, options) {
      if(type == 'year') {
        return options.filter((option) => {
          if(option == new Date().getFullYear()) {
            return option
          }
        })
      }
      return options;
    },
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
    onInput(event) {
      console.log('onInput', event)
      this.setData({
        currentDate: event.detail,
      });
    },
    confirm(event) {
      console.log('confirm', event)
      this.triggerEvent('currentDate', this.data.currentDate)
      this.setData({ show: false });
    },
    onClose() {
      this.setData({ show: false });
    },
  }

});