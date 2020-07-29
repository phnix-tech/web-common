/**
 * @param {Number,String} para
 * @return {String}
 * */
function handleDouble (para) {
  return ("" + para).length > 1 ? "" + para : "0" + para;
}

/**
 * @param {Number} timeStamp eg:1551323702241
 * @param {String} formatter eg:yyyy-MM-dd yyyy/MM/dd yyyy-M-d yyyy/M/d yyyy-MM-dd hh:mm:ss
 * @returns {string}
 */
function timestamp2String (timeStamp, formatter) {
  const
    date = new Date(timeStamp),
    obj = {
      "y+": date.getFullYear(),
      "M+": date.getMonth() + 1,
      "d+": date.getDate(),
      "h+": date.getHours(),
      "m+": date.getMinutes(),
      "s+": date.getSeconds()
    };

  for (const item in obj) {
    if (new RegExp("(" + item + ")").test(formatter)) {
      formatter = formatter.replace(RegExp.$1, RegExp.$1.length > 1 ? handleDouble(obj[item]) : obj[item]);
    }
  }

  return formatter;
}

/**
 * @param {Date|Number} date eg: new Date(2019, 7, 2, 23, 58, 12), 1551323702241
 * @param {string} formatter eg:yyyy-MM-dd yyyy/MM/dd yyyy-M-d yyyy/M/d yyyy-MM-dd hh:mm:ss
 * @returns {string}
 */
function date2String (date, formatter) {
  const timestamp = date instanceof Date ? date.getTime() : date;
  return timestamp2String(timestamp, formatter);
}

export default {
  timestamp2String,
  date2String
};
