
import regeneratorRuntime from './runtime';
export const cdnUrl = 'https://cdn.fairgame.cn/love-powder-app/image/';
const QQMapWX = require('./qqmap-wx-jssdk.min');
const mapKey = 'P5TBZ-ZMSE6-G7WS3-EW2FS-7WO6K-N7FRL';

const countDown = (time) => {
  let now  = new Date();
  let start = new Date(time);
  let year = start.getFullYear();
  let month = start.getMonth() + 1;
  let day = start.getDate();
  let hour = start.getHours();
  if (hour < 10) {
    hour = '0' + hour;
  }
  let minute = start.getMinutes();
  if (minute < 10) {
    minute = '0' + minute;
  }

  let mills = now.getTime() - start.getTime();
  if (mills < 1000 * 60) {
    return '刚刚';
  }
  if (mills < 1000 * 60 * 60) {
    let seconds = parseInt(mills / 1000 / 60);
    return seconds + '分钟前';
  }
  if (mills < 1000 * 60 * 60 * 24) {
    let hours = parseInt(mills / 1000 / 60 / 60);
    return hours + '小时前';
  }

  let showDate = month + '月' + day + '日 ' + hour + ':' + minute;
  if (year - now.getFullYear() != 0) {
    showDate = year + '年' + showDate;
  }
  return showDate;
};

const reportAnalytics = (name, data) => {  // 事件上报
  tt.reportAnalytics(name, data);
};


const showFavoriteGuide = () => {
  tt.showFavoriteGuide({
    type: 'bar',
    content: '一键添加到我的小程序',
    position: 'bottom',
    success(res) {
      console.log('引导组件展示成功');
    },
    fail(res) {
      console.log('引导组件展示失败');
    }
  });
};


function _getSuffix (filename) {
  var pos = filename.lastIndexOf('.')
  var suffix = ''
  if (pos != -1) {
      suffix = filename.substring(++pos)
  }
  return suffix;
}




const commonShare = (res, path) => {
  if (res.from == 'button') {
    if (res.channel == 'video') {
      return {
        channel: 'video',
        title: '',
        path: path ? path : '/pages/index/index' // ?后面的参数会在转发页面打开时传入onLoad方法
        // extra: {
        // 	// 注意，只有小程序使用button组件触发分享时，会有target属性
        //   videoPath : res.target.dataset.path
        // }
      };
    } else {
      return {
        title: '',
        desc: '',
        path: path ? path : '/pages/index/index', // ?后面的参数会在转发页面打开时传入onLoad方法
        imageUrl: '' // 支持本地或远程图片，默认是小程序 icon
      };
    }
  } else {
    return {
      title: '',
      desc: '',
      path: path ? path : '/pages/index/index', // ?后面的参数会在转发页面打开时传入onLoad方法
      imageUrl: '' // 支持本地或远程图片，默认是小程序 icon
    };
  }
};


const chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_'.split('');
// 截取媒体地址中间值
const subMduioStr = () => {
  let uid = wx.getStorageSync('identity');
  let size = chars.length;
  let str = '';
  for (let i = 0; i < 19; ++i) {
    let index = Math.floor(Math.random() * size);
    str += chars[index];
  }
  return '' + uid +  new Date().getTime() + str;


  // return str.match(/https?:\/\/tmp\/\w+\.\w+\.(\w+\.\S+)/)[1]; //开发工具
  // return str.split('tmp_')[1];
};

const oneMonthAfter = (value) => {
  if (!value) {
    return true;
  }
  let createTime = new Date(value).getTime();
  let nowTime = new Date().getTime();
  let timestamp = 60 * 1000 * 60 * 24 * 30;
  if ((nowTime - createTime) >=  timestamp) {
    return true;
  } else {
    return false;
  }
};


// 倒计时日时分秒
const countDownDays = (value) => {
  // value = 1595779199;
  let times;
  let nowTime = new Date().getTime();
  let timestamp = (value * 1000) - nowTime;
  let day = parseInt(timestamp / 1000 / 60 / 60 / 24);
  let hours = parseInt(timestamp / 1000 / 60 / 60 % 24);
  let minutes = parseInt(timestamp / 1000 / 60 % 60);
  let seconds = parseInt(timestamp / 1000 % 60);
  if (day < 10) {
    day = '0' + day;
  }
  if (hours < 10) {
    hours = '0' + hours;
  }
  if (minutes < 10) {
    minutes = '0' + minutes;
  }
  if (seconds < 10) {
    seconds = '0' + seconds;
  }
  times = day + '天' + hours + ':' + minutes + ':' + seconds;
  return times;
};


// 倒计时分秒
const countDownMinutes = (value) => {
  let times;
  let nowTime = new Date().getTime();
  let timestamp = (10 * 60 * 1000) - (nowTime - (value * 1000));
  let minutes = parseInt(timestamp / 1000 / 60 % 60);
  let seconds = parseInt(timestamp / 1000 % 60);
  if (timestamp <= 0) {
    return '00:00';
  } else {
    if (minutes < 10) {
      minutes = '0' + minutes;
    }
    if (seconds < 10) {
      seconds = '0' + seconds;
    }
    times = minutes + ':' + seconds;
    return times;
  }
};


const sliceStr = (index, str) =>
  str.slice(0, index)
;


// 当前时间
const nowTime = () => {
  let start = new Date();
  let year = start.getFullYear();
  let month = start.getMonth() + 1;
  let day = start.getDate();
  let hour = start.getHours();
  if (month < 10) {
    month = '0' + month;
  }
  if (day < 10) {
    day = '0' + day;
  }
  if (hour < 10) {
    hour = '0' + hour;
  }
  let minute = start.getMinutes();
  if (minute < 10) {
    minute = '0' + minute;
  }
  let seconds = start.getSeconds();
  if (seconds < 10) {
    seconds = '0' + seconds;
  }
  let time = year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + seconds;
  return time;
};


// 倒计时秒数
const countDownSeconds = (value) => {
  let nowTime = new Date().getTime();
  let flag = 120;
  let seconds = parseInt((nowTime - value * 1000) / 1000);
  if (seconds < 120) {
    flag = flag - seconds;
  } else {
    flag = 0;
  }
  return flag;
};




// 有离线收益就设置小红点
const showTabBarRedDot = () => {
  tt.showTabBarRedDot({
    index: 1,
    success(e) {
    },
    fail(e) {
    }
  });
};


const chooseImage = (params) => {
  return new Promise((resolve, reject) => {
    wx.chooseImage({
      count: params.count || 1,
      sizeType: params.sizeType || [ 'original', 'compressed' ],
      sourceType: params.sourceType || [ 'album', 'camera' ],
      success(res) {
        // tempFilePath可以作为img标签的src属性显示图片
        resolve(res);
      },
      fail(res) {
        reject(res);
      }
    });
  }).catch((err) => {
    console.log('chooseImageErr', err);
  });
};

// 返回一个Promise
const sleep = ((time)=> {
	return new Promise((resolve)=> {
		setTimeout(resolve,time)
	})
});


const showToast = (content,icon = 'none',time = 1000) => {
  console.log('icon', icon)
	wx.showToast({
		title: content,
		icon: icon,
		duration: time,
		mask: true,
	})
};

const showLoading = (title = ' ',mask = true) => {
	wx.showLoading({
        title: title,
        mask: mask
	})
};

const hideLoading = (title = ' ',mask = true) => {
	wx.hideLoading();
}


const isPhone = (value) => {
  let flag = /^[1][3,5,7,8][0-9]{9}$/.test(value);
  if(flag) {
    return true;
  } else {
    return false;
  }
}



const getAddress = (str) => new Promise((resolve,reject) => {
  var getAddressUrl = "https://apis.map.qq.com/ws/geocoder/v1/?location=" + str.latitude + "," + str.longitude + "&key=" + mapKey + "&get_poi=1";
  wx.request({
    url: getAddressUrl,
    success: function (result) {
      console.log('result', result)
      resolve(result);
    }
  })
})

const qqmapsdk = () => {
  let qqmapsdk = new QQMapWX({
    key: mapKey
  });

  return qqmapsdk;
}



export default {
  cdnUrl,
  countDown,
  reportAnalytics,
  showFavoriteGuide,
  oneMonthAfter,
  subMduioStr,
  countDownDays,
  nowTime,
  countDownSeconds,
  commonShare,
  countDownMinutes,
  showTabBarRedDot,
  sliceStr,
  chooseImage,
  sleep,
  showToast,
  showLoading,
  hideLoading,
  isPhone,
  getAddress,
  qqmapsdk
};
