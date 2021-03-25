/*
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2021-02-08 11:46:21
 * @LastEditors: sueRimn
 * @LastEditTime: 2021-03-15 15:23:41
 */
const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return `${[year, month, day].map(formatNumber).join('-')} ${[hour, minute, second].map(formatNumber).join(':')}`
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : `0${n}`
}


const showTime = date => {
  const year = date.getFullYear() + '年'
  const month = date.getMonth() + 1 + '月'
  const day = date.getDate() + '日'
  const hour = date.getHours() + '点'
  const minute = date.getMinutes() + '分'
 
  return `${[year, month, day, hour, minute].map(formatNumber).join('')}`
}

module.exports = {
  formatTime,
  showTime
}
