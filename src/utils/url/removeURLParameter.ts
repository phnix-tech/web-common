import {getURLParameter} from "./index";

/**
 * @param name
 * @param url
 * @return
 */
function removeURLParameter (name: string, url?: string) {
  url = url || (location.pathname + location.search);
  if (getURLParameter(name, url) !== null) {
    url = url.replace(new RegExp(name + "=[^&]*&?"), "");
    // 删除尾部无值参数
    url = url.replace(new RegExp("[?&]" + name + "$"), "");
    // 删除中间无值参数
    url = url.replace(new RegExp("([?&])" + name + "&"), "$1");
  }
  // 去除尾部多余的?&
  url = url.replace(new RegExp("[?&]+$"), "");
  return url;
}

export default removeURLParameter;