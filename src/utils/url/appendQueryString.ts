/**
 * 
 * @param url 
 * @param qs query string, contains question mark `?`  
 * usually get it from `location.search`
 * @returns 
 */
function appendQueryString (url: string, qs?: string) {
  // qs contains question mark ?
  if (url.indexOf("?") === -1) {
    url += qs;
  } else if (qs) {
    if (url.indexOf("&") === -1 || !/&$/.test(url)) {
      url += "&";
    }
    url += qs.substring(1);
  }
  return url;
}

export default appendQueryString;