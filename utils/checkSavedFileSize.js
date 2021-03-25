import regeneratorRuntime from './runtime';

let _maxSize = 8 * 1000 * 1000;
let _usedSize = -1;

const checkSavedFileSize =  () => {
  console.log('_usedSize', _usedSize);

  if (_usedSize < 0) {
    wx.getSavedFileList({
      success: (res) => {
        console.log('fileList', res.fileList);

        let _list = res.fileList;
        let _size = 0;
        let _tooLarge = false;

        for (let i = 0; i < _list.length; i++) {
          _size += _list[i].size;
          console.log('_size', _size);
        }

        _usedSize = _size;
        checkSavedFileSize();
      }
    });
  } else {
    // console.log("当前缓存文件:", _usedSize / 1000 / 1000, "M")
    if (_usedSize > _maxSize) {
      wx.getSavedFileList({
        success: function(res) {
          // console.log(res)
          let _list = res.fileList;
          for (let i in _list) {
            wx.removeSavedFile({
              filePath: _list[i].filePath
            });
          }
        }
      });

    }
  }
};


const checkStorageSize = () => {
  let res = wx.getStorageInfoSync();
  // console.log(res.keys)
  // console.log(res.currentSize)
  // console.log(res.limitSize)
};
module.exports = {
  checkSavedFileSize,
  checkStorageSize
};