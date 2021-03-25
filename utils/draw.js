import { hostUrl,  appversion } from './wxRequest'; // 下载图片
import regeneratorRuntime from './runtime';

const downloadFile = (url) => new Promise((resolve, reject) => {
  wx.downloadFile({
    url: url,
    success: resolve,
    fail: reject
  });
}).catch((error) => {
  console.log(error);
}); // 保存图片

const saveFile = (tempFilePath) => new Promise((resolve, reject) => {
  wx.saveFile({
    tempFilePath: tempFilePath,
    success: resolve,
    fail: reject
  });
}).catch((error) => {
  console.log(error);
}); // 保存到相册--注意fail情况下的处理

const saveImageToPhotosAlbum = (filePath) => new Promise((resolve, reject) => {
  wx.saveImageToPhotosAlbum({
    filePath: filePath,
    success: resolve,
    fail: function(res) {
      if (
        res.errMsg == 'saveImageToPhotosAlbum:fail:auth denied' ||
          res.errMsg == 'saveImageToPhotosAlbum:fail auth deny' ||
          res.errMsg == 'saveImageToPhotosAlbum:fail authorize no response'
      ) {
        resolve(res);
      } else {
        reject(res);
      }
    }
  });
}).catch((error) => {
  console.log(error);
});

/** 分享图背景图片下载**/

const getShareBg = async(url, resId) => {
  let shareBgPic = tt.getStorageSync('shareBgPic' + resId);
  if (shareBgPic) {
    try {
      if (wx.getFileSystemManager().statSync(shareBgPic)) {
        return shareBgPic;
      }
    } catch (exp) {
      console.error(exp);
    }
  }

  try {
    let downRes = await downloadFile(url);
    let saveRes = await saveFile(downRes.tempFilePath);
    wx.removeStorageSync('shareBgPic' + resId);
    tt.setStorageSync('shareBgPic' + resId, saveRes.savedFilePath);
    return saveRes.savedFilePath;
  } catch (err) {
    return '';
  }
};

/** 二维码下载**/

const getEwm = async() => {
  // let url = `${hostUrl}api/code?version=${appversion}&ticket=${wx.getStorageSync(
  // 	'ticket'
  // )}&user_identity=${wx.getStorageSync('user_identity')}`;
  let url = `${hostUrl}new_code.png`;
  let ewmPic = wx.getStorageSync('ewmPic');
  if (ewmPic) {return ewmPic;}
  let downRes = await downloadFile(url);
  let saveRes = await saveFile(downRes.tempFilePath);
  wx.setStorageSync('ewmPic', saveRes.savedFilePath);
  return saveRes.savedFilePath;
};

/** 头像下载**/

const getUsrAvatar = async(url) => {
  let usrAvatar = tt.getStorageSync('usrAvatar');
  if (usrAvatar) {
    try {
      if (wx.getFileSystemManager().statSync(usrAvatar)) {
        return usrAvatar;
      }
    } catch (exp) {
      console.error(exp);
    }
  }

  try {
    let urlAvatar = `${hostUrl}banner/useravatar?url=${encodeURIComponent(url)}`;
    // console.log('999urlAvatar',urlAvatar)
    let downRes = await downloadFile(urlAvatar);
    let saveRes = await saveFile(downRes.tempFilePath);
    tt.removeStorageSync('usrAvatar');
    tt.setStorageSync('usrAvatar', saveRes.savedFilePath);
    return saveRes.savedFilePath;
  } catch (err) {
    return '';
  }
}; // 画圆

const drawRoundRect = (ctx, x, y, width, height, radius) => {
  ctx.beginPath();
  ctx.arc(x + radius, y + radius, radius, Math.PI, (Math.PI * 3) / 2);
  ctx.lineTo(width - radius + x, y);
  ctx.arc(
    width - radius + x,
    radius + y,
    radius,
    (Math.PI * 3) / 2,
    Math.PI * 2
  );
  ctx.lineTo(width + x, height + y - radius);
  ctx.arc(
    width - radius + x,
    height - radius + y,
    radius,
    0,
    (Math.PI * 1) / 2
  );
  ctx.lineTo(radius + x, height + y);
  ctx.arc(radius + x, height - radius + y, radius, (Math.PI * 1) / 2, Math.PI);
  ctx.closePath();
}; // canvas绘图

const drawSharePic = (
  shareBgPic,
  usrAvatar,
  canvasId,
  txtArr,
  params = {}
) => new Promise((resolve, reject) => {
  let canvasWd = wx.getSystemInfoSync().screenWidth * 2; // 650
  // console.log('canvasWd',canvasWd)
  let imgWidth = params.image ? params.image.width : 670;
  // console.log('imgWidth',imgWidth)
  let imgHeight = params.image ? params.image.height : 670 * 1.61;
  let rate = canvasWd / imgWidth; // 实际宽与设计稿的比率
  let canvasHei = imgHeight * rate;

  let ctx = wx.createCanvasContext(canvasId); // 背景
  // ctx.save();
  if (shareBgPic) {
    ctx.drawImage(shareBgPic, 0, 0, canvasWd, canvasHei);
    ctx.restore();
    ctx.save();
  }

  let wdCenter = canvasWd / 2;

  // console.log('canvasWd',canvasWd)
  let userName = wx.getStorageSync('name');
  let nameFontSize = 30;
  let nameCoordinate = params.name;
  if (nameCoordinate && nameCoordinate.y !== '') {
    let nameY = Number(nameCoordinate.y) + nameFontSize;
    console.log('宽高比', rate);
    if (nameCoordinate.x) {
      let nameX =
        (Number(nameCoordinate.x)) * rate;
        // ctx.setTextAlign('center');
      ctx.setFillStyle(nameCoordinate.color);
      ctx.setFontSize(nameFontSize * rate);
      ctx.fillText(userName, nameX, nameY * rate);
    } else {
      ctx.setTextAlign('center');
      // ctx.setTextAlign('center');
      ctx.setFillStyle(nameCoordinate.color);
      ctx.setFontSize(nameFontSize * rate);
      ctx.fillText(userName, wdCenter, nameY * rate);
      ctx.restore();

    }
  }

  ctx.save(); // 头像背景
  let avatarCoordinate = params.avatar;
  if (avatarCoordinate && avatarCoordinate.x !== '') {
    let avatarY = Number(avatarCoordinate.y) * rate;
    let avatarX = Number(avatarCoordinate.x) * rate;
    let avatarBg = {
      left: avatarX,
      top: avatarY,
      width: Number(avatarCoordinate.width) * rate,
      height: Number(avatarCoordinate.width) * rate,
      radius: (Number(avatarCoordinate.width) / 2) * rate,
      borderWd: 0
    };
    drawRoundRect(
      ctx,
      avatarBg.left,
      avatarBg.top,
      avatarBg.width,
      avatarBg.height,
      avatarBg.radius
    );
    ctx.fillStyle = '#ffffff';
    ctx.fill();
    ctx.clip();

    /** 画头像**/

    let usrAtaPos = {
      left: avatarBg.left + avatarBg.borderWd,
      top: avatarBg.top + avatarBg.borderWd,
      width: avatarBg.width - 2 * avatarBg.borderWd,
      height: avatarBg.height - 2 * avatarBg.borderWd
    }; // drawRoundRect(ctx, usrAtaPos.left, usrAtaPos.top, usrAtaPos.width, usrAtaPos.height, avatarBg.radius * 0.85);

    usrAvatar = usrAvatar || 'https://sf1-ttcdn-tos.pstatp.com/img/mosaic-legacy/3791/5035712059~120x256.image';

    ctx.drawImage(
      usrAvatar,
      usrAtaPos.left,
      usrAtaPos.top,
      usrAtaPos.width,
      usrAtaPos.height
    );
    ctx.restore();
  }

  /** 画文字 */
  if (txtArr && txtArr.length) {
    ctx.save();
    let externalAgeArr = txtArr.extList; // 外在年龄

    drawExternalAge(ctx, rate, canvasWd, wdCenter, externalAgeArr);
    let mentalAgeArr = txtArr.mentList; // 心理年龄

    drawMentalAge(ctx, rate, canvasWd, wdCenter, mentalAgeArr);
    let soulAgeArr = txtArr.soulList; // 灵魂年龄

    drawSoulAge(ctx, rate, canvasWd, wdCenter, soulAgeArr);
    ctx.restore();
  }
  // console.log('画文字')
  // ctx.draw(false, saveSharePicFn(canvasId, pageThis));
  ctx.draw(false, function() {
    setTimeout(() => {
      console.log('执行', canvasId);
      wx.canvasToTempFilePath({
        x: 0,
        y: 0,
        width: canvasWd,
        height: canvasHei,
        canvasId: canvasId,
        success: async(res) => {
          resolve(res.tempFilePath);
        },
        fail: (err) => {
          reject('');
          console.log('失败', err);
        }
      });
    }, 80);
  });
}); // 绘制灵魂年龄


const drawSoulAge = function(ctx, rate, canvasWd, wdCenter, arr) {
  let txtAlignType = 'center';
  let initPos = 735 * rate; // 开始的纵向位置

  ctx.setTextAlign(txtAlignType);

  for (let i = 0; i < arr.length; i++) {
    if (i > 10) {
      return;
    }

    ctx.setFillStyle('#000000');
    ctx.setFontSize(24 * rate);

    if (i == 0) {
      ctx.setFillStyle('#ffffff');
      ctx.setFontSize(42 * rate);
      ctx.fillText(arr[0], wdCenter, initPos);
    } else if (i == 9) {
      ctx.fillText(arr[9], wdCenter, initPos);
      ctx.fillText(arr[10], wdCenter, initPos + 25 * rate);
      i++;
    } else {
      let retract = 0;

      if (i >= 5) {
        retract = 30 * rate;
      }

      ctx.setTextAlign(txtAlignType);
      ctx.fillText(arr[i], canvasWd * 0.3 + retract, initPos);
      ctx.fillText(arr[i + 1], canvasWd * 0.3 + retract, initPos + 25 * rate);
      ctx.fillText(arr[i + 2], canvasWd * 0.7 - retract, initPos);
      ctx.fillText(arr[i + 3], canvasWd * 0.7 - retract, initPos + 25 * rate);
      initPos = initPos + 25 * 3 * rate;
      i += 3;
    }
  }
}; // 绘制心理年龄

const drawMentalAge = function(ctx, rate, canvasWd, wdCenter, arr) {
  let txtAlignType = 'left';
  let initPos = 330 * rate; // 开始的纵向位置

  let beginPos = wdCenter + 17 * rate; // 开始的横向位置

  for (let i = 0; i < arr.length; i++) {
    if (i > 10) {
      return;
    }

    ctx.setFillStyle('#000000');
    ctx.setFontSize(24 * rate);

    if (i == 0) {
      ctx.setFillStyle('#ffffff');
      ctx.setFontSize(42 * rate);
      ctx.setTextAlign('center');
      ctx.fillText(arr[0], canvasWd * 0.7, 325 * rate);
    } else {
      ctx.setTextAlign(txtAlignType);

      if (i == 5) {
        beginPos = wdCenter + 40 * rate;
      } else if (i == 9) {
        beginPos = wdCenter + 130 * rate;
      }

      ctx.fillText(arr[i], beginPos, initPos + i * 30 * rate);
      ctx.fillText(arr[i + 1], beginPos, initPos + (i + 1) * 30 * rate);

      if (txtAlignType == 'left') {
        txtAlignType = 'right';
        beginPos = canvasWd - 17 * rate;
      } else {
        txtAlignType = 'left';
        beginPos = wdCenter + 24 * rate;
      }

      i++;
    }
  }
}; // 绘制外在年龄

const drawExternalAge = function(ctx, rate, canvasWd, wdCenter, arr) {
  let txtAlignType = 'left';
  let initPos = 330 * rate; // 开始的纵向位置

  let beginPos = 24 * rate; // 开始的横向位置

  for (let i = 0; i < arr.length; i++) {
    if (i > 10) {
      return;
    }

    ctx.setFillStyle('#000000');
    ctx.setFontSize(24 * rate);

    if (i == 0) {
      ctx.setFillStyle('#ffffff');
      ctx.setFontSize(42 * rate);
      ctx.setTextAlign('center');
      ctx.fillText(arr[0], canvasWd * 0.3, 325 * rate);
    } else {
      ctx.setTextAlign(txtAlignType);

      if (i == 7) {
        beginPos = wdCenter - 65 * rate;
      }

      ctx.fillText(arr[i], beginPos, initPos + i * 30 * rate);
      ctx.fillText(arr[i + 1], beginPos, initPos + (i + 1) * 30 * rate);

      if (txtAlignType == 'left') {
        txtAlignType = 'right';
        beginPos = wdCenter - 17 * rate;
      } else {
        txtAlignType = 'left';
        beginPos = 24 * rate;
      }

      i++;
    }
  }
};

/** 保存生成的分享图**/

const saveSharePicFn = (canvasId, pageThis) => {
  console.log('canvasId, pageThis', canvasId, pageThis);
  setTimeout(() => {
    wx.canvasToTempFilePath(
      {
        x: 0,
        y: 0,
        width: 300,
        height: 300,
        canvasId: canvasId,
        success: function(res) {
          console.log('res.tempFilePath', res);
          pageThis.imgSrc = res.tempFilePath; // savePicToLocal(res.tempFilePath, pageThis);
        }
      },
      this
    );
  }, 1000);
};

/** 保存图片到相册**/

const savePicToLocal = async(path, pageThis) => {
  wx.hideLoading();
  let saveRes = await saveImageToPhotosAlbum(path);

  if (saveRes.errMsg == 'saveImageToPhotosAlbum:ok') {
    wx.showModal({
      title: '已保存',
      content: '微信 > 发现 > 朋友圈 > 点相册 > 分享朋友圈',
      showCancel: false
    });
  } else if (
    saveRes.errMsg == 'saveImageToPhotosAlbum:fail:auth denied' ||
    saveRes.errMsg == 'saveImageToPhotosAlbum:fail auth deny' ||
    saveRes.errMsg == 'saveImageToPhotosAlbum:fail authorize no response'
  ) {
    pageThis.settingPop.show = true;
  } else {
    console.log('保存出错');
  }
};

export default {
  getShareBg,
  getEwm,
  getUsrAvatar,
  drawSharePic,
  savePicToLocal,
  saveSharePicFn
};
