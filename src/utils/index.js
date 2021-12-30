import { ElMessage } from 'element-plus'
// import { errCode } from '../config/index.ts'
import router from '../router'
import moment from 'moment'

/**
 * check if the result from request is instance of Error
 * if true, notify error and return false
 * else notify success message and return true
 * @param {any} res 
 * @param {boolean} notifySuccess 
 * @returns 
 */
export const handleResult = (res, notifySuccess = true, notifyMessage = 'Success!') => {
  if (isError(res)) {
    if (res?.code == 10003) {
      router.push('/no-auth')
    }
    if (res?.code == 10002) {
      return true
    }
    ElMessage({
      message: res?.msg || 'error',
      type: 'error',
    })
    return false
  } else {
    if (notifySuccess) {
      ElMessage({
        message: notifyMessage,
        type: 'success',
      })
    }
    return true
  }
}

/**
 * check if the parameter is an Error
 * @param {any} p  
 * @returns boolean
 */
export const isError = p => {
  return p?.code != 200 && p?.code != 201
}

export const debounce = (fn, interval, context) => {
  let timer = null
  return function () {
    if (timer) {
      clearTimeout(timer)
      timer = null
    }
    timer = setTimeout(() => {
      const that = context
      const args = arguments
      fn.apply(that, args)
      clearTimeout(timer)
      timer = null
    }, interval)
  }
}

/**
 * check if string is numeric
 * @param {string} s
 * @returns boolean
 */
export const stringIsNumeric = (s) => {
  const stringIsDigit = /^\d+$/
  return stringIsDigit.test(s)
}

/**
 * check if parameter is number
 * @param {any} p
 * @returns boolean
 */
 export const isNumber = (p) => {
  return typeof p == 'number'
}

/**
 * return the unix timestamp of a date
 * @param {Date} date 
 * @returns {number} unix timestamp
 */
export const getUnixTimeStamp = (date) => {
  return date ? Math.floor(new Date(date).getTime() / 1000) : Math.floor(new Date().getTime() / 1000)
}

export const getTimeStamp = (date) => {
  return date ? new Date(date).getTime() : new Date().getTime()
}

/**
 * convert timestamp into string
 */ 
export const formatTS = (ts, form = 'YYYY-MM-DD HH:mm:ss') => {
  if (!ts || typeof ts != 'number') return ''
  if (ts.toString().length == 10) return moment(ts*1000).format(form)
  return moment(ts).format(form)
}

/**
 * convert date string to timestamp
 * @param {*} date 
 */
export const formatDate = (date = '2022-01-01 00:00:00') => {
  return moment(date)
}

 // get height and width of viewport
export const getWindowHeight = () => { 
  return window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
} 

export const getWindowWidth = () => { 
  return window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth
}

export const getWindowPath = () => {
  const { location } = window
  const { pathname, search } = location
  return { pathname, param: getUrlParam(search) }
}

export const getUrlParam = (url) => {
  const exp = /(?<=\?|&)(?<k>\w+)=(?<v>\w+)/g
  let res = url.matchAll(exp)
  return [...res]
}

/**
 * convert big money to normal
 * if decimal == true, returns string
 * else returns number
 * @param {number} money 
 * @param {boolean} decimal 
 * @returns 
 */
export const convertBigMoney = (money, decimal = true) => {
  return decimal ? Number((money / 100).toFixed(2)) : Math.floor(money / 100)
}

export const deepClone = (raw) => {
  const res = {}
  if (Array.isArray(raw)) {
    return raw.map(item => deepClone(item))
  } else if (typeof raw != 'object') {
    return raw
  } else {
    for (let attr of Reflect.ownKeys(raw)) {
      res[attr] = deepClone(raw[attr])
    }
  }
  return res
}

/**
 * download img
 * @param {*} imgSrc 
 * @param {*} name 'pic'
 */
export const downloadImg = (imgSrc, name) => {
    var image = new Image()
    // 解决跨域 Canvas 污染问题
    image.setAttribute('crossOrigin', 'anonymous')
    image.onload = function () {
      var canvas = document.createElement('canvas')
      canvas.width = image.width
      canvas.height = image.height
      var context = canvas.getContext('2d')
      context.drawImage(image, 0, 0, image.width, image.height)
      var url = canvas.toDataURL() //得到图片的base64编码数据

      var a = document.createElement('a') // 生成一个a元素
      var event = new MouseEvent('click') // 创建一个单击事件
      a.download = name || 'photo' // 设置图片名称
      a.href = url // 将生成的URL设置为a.href属性
      a.dispatchEvent(event) // 触发a的单击事件
    }
    image.src = imgSrc
}