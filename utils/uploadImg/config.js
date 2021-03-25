/*
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2020-04-06 04:18:24
 * @LastEditors: sueRimn
 * @LastEditTime: 2021-03-12 12:01:29
 */
var fileHost = "https://daibuche.oss-cn-beijing.aliyuncs.com/";//你的oss地址
var config = {
  //aliyun OSS config
  uploadImageUrl: `${fileHost}`,
  AccessKeySecret: 'E6JHHKWQtXeSi2QAFhAZVf56NnyHTU',//登录oss控制台查看
  OSSAccessKeyId: 'LTAI4G59JjrrAQe1VRWmcFNK',//登录oss控制台查看
  timeout: 87600
};
module.exports = config