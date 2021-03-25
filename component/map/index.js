/*
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2020-12-19 14:14:55
 * @LastEditors: sueRimn
 * @LastEditTime: 2021-03-25 15:27:30
 */

// import utils, { cdnUrl } from '@/utils/index';
import wxRequest from '../../utils/wxRequest';
import utils from '../../utils/index'
const app = getApp();
Component({
  options: {
    multipleSlots: true // 在组件定义时的选项中启用多slot支持
  },
  observers: {
    
  },

  // 属性定义（详情参见下文）
  properties: {
    height: {
      type: Number,
      value: 0
    },
  },

  data: {
    updated: false,  //地图初始化完成
    beginRegionchange: false, //是否获取中心地点
    latitude: 23.099994,
    longitude: 113.324520,
    markers: [{
      id: 1,
      latitude: 23.099994,
      longitude: 113.324520,
      iconPath: '/image/location.png'
    }],
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
      this.mapCtx = wx.createMapContext('myMap',this);
      console.log('ready');
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
    bindupdated() {
      if(this.data.updated) return;
      this.setData({
        updated: true
      })
      this.moveToLocation();
    },
    async regionchange(e) {
      // console.log('执行111', e)
      let str = e.detail.centerLocation;
      let that = this;
      let lat= "markers[0].latitude";
      let log= "markers[0].longitude";
      if(e.type == 'end' && e.causedBy == 'drag') {
        let result = await utils.getAddress(str);
        that.setData({
          [lat]: result.data.result.location.lat,
          [log]: result.data.result.location.lng,
        })
        that.triggerEvent('locationEvent', {result: result.data.result})
      }
    },
    getLocation () {
      var that = this;
      let lat= "markers[0].latitude";
      let log= "markers[0].longitude";
      
      wx.getLocation({
        type: "wgs84",
        success: function(res){
          console.log('res', res)
          that.setData({
            latitude: res.latitude,
            longitude: res.longitude,
            [lat]: res.latitude,
            [log]: res.longitude
          })

        }
      })
    },
    async moveToLocation () {
      let that = this;
      let lat= "markers[0].latitude";
      let log= "markers[0].longitude";
      let setting = await wxRequest.getSetting('scope.userLocation');
      console.log('setting', setting)
      if(setting) {
        this.mapCtx.moveToLocation({
          success: function() {
            //获取地图中心位置坐标
            setTimeout(function() {
              that.mapCtx.getCenterLocation({
                success: async function(res) {
                  let str = {
                    latitude: res.latitude,
                    longitude: res.longitude
                  }
                  let result = await utils.getAddress(str);
                  // console.log('地点111', result)
                  that.setData({
                    [lat]: result.data.result.location.lat,
                    [log]: result.data.result.location.lng,
                  })
                  that.triggerEvent('locationEvent', {result: result.data.result})
                }
              })

            },500)

          }
        });
      } else {
        this.moveToLocation();
      }
    }
  }

});