/**
 * @param para
 * @return 格式化两位数字
 * */
function handleDouble (para: string | number) {
  return ("" + para).length > 1 ? "" + para : "0" + para;
}

/**
 * @param timeStamp eg:1551323702241
 * @param formatter eg:yyyy-MM-dd yyyy/MM/dd yyyy-M-d yyyy/M/d yyyy-MM-dd hh:mm:ss
 * @returns formatted date string
 */
function timestamp2String (timeStamp: number, formatter: string) {
  const date = new Date(timeStamp);
  const obj = {
    "y+": date.getFullYear(),
    "M+": date.getMonth() + 1,
    "d+": date.getDate(),
    "h+": date.getHours(),
    "m+": date.getMinutes(),
    "s+": date.getSeconds()
  };

  for (const item in obj) {
    const key = item as keyof typeof obj;
    if (new RegExp("(" + key + ")").test(formatter)) {
      formatter = formatter.replace(RegExp.$1, RegExp.$1.length > 1 ? handleDouble(obj[key]) : obj[key].toString());
    }
  }

  return formatter;
}

/**
 * @param date eg: new Date(2019, 7, 2, 23, 58, 12), 1551323702241
 * @param formatter eg:yyyy-MM-dd yyyy/MM/dd yyyy-M-d yyyy/M/d yyyy-MM-dd hh:mm:ss
 * @returns formatted date string
 */
function date2String (date: Date | number, formatter: string) {
  const timestamp = date instanceof Date ? date.getTime() : date;
  return timestamp2String(timestamp, formatter);
}

export default {
  timestamp2String,
  date2String
};
