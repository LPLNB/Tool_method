const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

// 防抖节流
/**
 * 函数节流
 * @param fn 需要进行节流操作的事件函数
 * @param interval 间隔时间
 * @returns {Function}
 */
function throttle(fn, interval) {
  let enterTime = 0; //触发的时间
  let gapTime = interval || 500; //间隔时间，如果interval不传，则默认500ms
  return function () {
    let context = this;
    let backTime = new Date(); //第一次函数return即触发的时间
    if (backTime - enterTime > gapTime) {
      fn.call(context, arguments[0]); //arguments[0]是事件处理函数默认事件参数event call绑定当前page对象
      enterTime = backTime; //赋值给第一次触发的时间，这样就保存了第二次触发的时间
    }
  };
}

/**
 * 函数防抖
 * @param fn 需要进行防抖操作的事件函数
 * @param interval 间隔时间
 * @returns {Function}
 */
function debounce(fn, interval) {
  let timer;
  let gapTime = interval || 1000; //间隔时间，如果interval不传，则默认1000ms
  return function () {
    clearTimeout(timer);
    let context = this;
    let args = arguments[0]; //保存此处的arguments，因为setTimeout是全局的，arguments无法在回调函数中获取，此处为闭包。
    timer = setTimeout(function () {
      fn.call(context, args); //args是事件处理函数默认事件参数event  call绑定当前page对象
    }, gapTime);
  };
}

// 文本框禁止输入特殊字符
function teshu(txts) {
  let regs = /[^\a-\z\A-\Z0-9\u4E00-\u9FA5\.]/g
  let text = ''
  if (regs.test(txts) === true) {
    text = txts.replace(regs, '')
  } else {
    text = txts
  }
  return text
}

// 将时间戳转换为正常时间
function getTime(timestamp) {
  var date = new Date(timestamp * 1000); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
  var Y = date.getFullYear() + '-';
  var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
  var D = date.getDate() + ' ';
  var h = date.getHours() + ':';
  var m = date.getMinutes() + ':';
  var s = date.getSeconds();
  return Y + M + D + h + m + s;
}
// 文本框禁止输入特殊字符
function teshu(txts) {
  let regs = /[^\a-\z\A-\Z0-9\u4E00-\u9FA5\.]/g
  let text = ''
  if (regs.test(txts) === true) {
    text = txts.replace(regs, '')
  } else {
    text = txts
  }
  return text
}

// 验证

function checkPhone(num,str) {
  switch(str) {
    case 'phone':
      return /^1[3456789]\d{9}$/.test(num)
    case 'idcards':
      return /(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}$)/.test(num)
  }
}

// 返回年月日
function getnyr(times,s=0,istime=1) {
  if(s === 0) {
    times = Number(times)*1000
  }else if(s === 1) {
    times = times
  }
  let nowtimes = new Date(times)
  let y = nowtimes.getFullYear()
  let m = (nowtimes.getMonth() + 1).toString().length == 1?`0${nowtimes.getMonth() + 1}`:nowtimes.getMonth() + 1
  let d = nowtimes.getDate().toString().length == 1?`0${nowtimes.getDate()}`:nowtimes.getDate()
  let h = nowtimes.getHours().toString().length == 1?`0${nowtimes.getHours()}`:nowtimes.getHours()
  let mins = nowtimes.getMinutes().toString().length == 1?`0${nowtimes.getMinutes()}`:nowtimes.getMinutes()
  let sce = nowtimes.getSeconds().toString().length == 1?`0${nowtimes.getSeconds()}`:nowtimes.getSeconds()
  if(istime == 1){
    return `${y}/${m}/${d}`
  }else if(istime == 0) {
    return `${y}/${m}/${d} ${h}:${mins}:${sce}`
  } else if(istime == 2) {
    return `${m}月${d}日`
  }
}


// 展示
function zs(texts) {
  wx.showToast({
    title: texts,
    icon:'none',
    mask:true
  })
}

// 时间区域

function timezones(num) {
  let nowtimes = new Date()
  let y = nowtimes.getFullYear() + num
  let m = nowtimes.getMonth() + 1
  let d = nowtimes.getDate()
  let endtimes = new Date(`${y}/${m}/${d}`)
  return `${endtimes.getFullYear()}-${endtimes.getMonth() + 1}-${endtimes.getDate()}`
}

// 转化uint8Array为中文并解决中文乱码
function Utf8ArrayToStr(array) {
  var out, i, len, c;
  var char2, char3;

  out = "";
  len = array.length;
  i = 0;
  while(i < len) {
  c = array[i++];
  switch(c >> 4)
  { 
    case 0: case 1: case 2: case 3: case 4: case 5: case 6: case 7:
      // 0xxxxxxx
      out += String.fromCharCode(c);
      break;
    case 12: case 13:
      // 110x xxxx   10xx xxxx
      char2 = array[i++];
      out += String.fromCharCode(((c & 0x1F) << 6) | (char2 & 0x3F));
      break;
    case 14:
      // 1110 xxxx  10xx xxxx  10xx xxxx
      char2 = array[i++];
      char3 = array[i++];
      out += String.fromCharCode(((c & 0x0F) << 12) |
                     ((char2 & 0x3F) << 6) |
                     ((char3 & 0x3F) << 0));
      break;
  }
  }

  return out;
}

module.exports = {
  formatTime,
  throttle,
  debounce,
  getTime,
  teshu,
  checkPhone,
  getnyr,
  zs,
  timezones,
  zhongwen:Utf8ArrayToStr
}