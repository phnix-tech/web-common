/**
 * 检查是否是dataURL协议格式`data:`内容
 * https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/Data_URIs
 * @param src
 * @return {boolean}
 */
declare function isDataUrl(src?: string): boolean;
export default isDataUrl;
