import {Any} from "../../types";

function isAry (obj: Any) {
  return Object.prototype.toString.call(obj) === "[object Array]";
}

/**
 * add timestamp to url (GET method only) for disable cache  
 * 使用下划线`_`参数作为缓存参数，such as `/api/issue?_=1626227033424`
 *
 * @param url pathname或者带query string参数的url
 * @returns
 */
function addUrlTimestamp (url = ""): string {
  const segments = url.split("?").filter(segment => segment.trim() !== "");
  const kvObj: Record<string, Any> = {};

  if (segments.length > 1) {
    const search = segments[1];
    const kv = search.split("&");

    kv.forEach(str => {
      const equalIdx = str.indexOf("=");
      if (equalIdx === -1) {
        kvObj[str] = undefined;
        return;
      }

      const key = str.substring(0, equalIdx);
      const value = decodeURIComponent(
        (equalIdx + 1 <= str.length - 1) ?
          str.substring(equalIdx + 1) : ""
      );

      if (!kvObj.hasOwnProperty(key)) {
        kvObj[key] = value;
      } else {
        // 数组值
        let existVal = kvObj[key];
        if (!isAry(existVal)) {
          existVal = [existVal];
        }
        existVal.push(value);
        kvObj[key] = existVal;
      }
    });
  }

  let search = "?";
  search += Object.keys(kvObj).map(key => {
    let str;
    const value = kvObj[key];
    if (isAry(value)) {
      str = value.map((v: Any) => v !== undefined ? `${key}=${v}` : key).join("&");
    } else if (value === undefined) {
      // absent value, e.g. ?foo&foo1=test
      str = key;
    } else {
      str = `${key}=${value}`;
    }
    return str;
  }).join("&");

  if (search !== "?") {
    search += "&";
  }
  search += ("_=" + Date.now());
  url = segments[0] + search;

  return url;
}

export default addUrlTimestamp;