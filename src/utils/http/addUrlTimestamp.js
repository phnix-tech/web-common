function isAry (obj) {
  return Object.prototype.toString.call(obj) === "[object Array]";
}

/**
 * add timestamp to url (GET method only) for disable cache
 * @param {string} url
 * @returns {string}
 */
export default function (url = "") {
  const
    segments = url.split("?")
      .filter(segment => segment.trim() !== ""),
    kvObj = {};

  if (segments.length > 1) {
    const
      search = segments[1],
      kv = search.split("&");

    kv.forEach(str => {
      const equalIdx = str.indexOf("=");
      if (equalIdx === -1) {
        kvObj[str] = undefined;
        return;
      }

      const
        key = str.substring(0, equalIdx),
        value = decodeURIComponent((equalIdx + 1 <= str.length - 1) ?
          str.substring(equalIdx + 1) : "");

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
      str = value.map(v => v !== undefined ? `${key}=${v}` : key).join("&");
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