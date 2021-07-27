import {getURLParameter} from "./index";

/**
 * @param name
 * @param val
 * @param url
 * @returns absolute url without hostname
 */
function replaceURLParameter (
  name: string,
  val: string | number | boolean,
  url?: string
) {
  url = url || (location.pathname + location.search);
  if (url.indexOf("?") === -1) {
    url += "?";
  }
  const params = name + "=" + encodeURIComponent(val);
  if (getURLParameter(name, url) !== null) {
    url = url.replace(new RegExp("([?&])" + name + "=[^&]*"), "$1" + params);
  } else if (/\?$/.test(url)) {
    url += params;
  } else {
    url += ("&" + params);
  }
  return url;
}

export default replaceURLParameter;