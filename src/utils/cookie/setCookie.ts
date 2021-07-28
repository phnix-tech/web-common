/**
 * set browser cookie
 * 
 * @param cookieName
 * @param value
 * @param expireTime
 */
function setCookie (cookieName: string, value: unknown, expireTime: string) {
  const now = new Date();
  now.setTime(now.getTime() + 10 * 365 * 86400000);
  // @ts-ignore: Property 'toGMTString' does not exist on type 'Date'. Did you mean 'toUTCString'?ts(2551)
  // lib.es5.d.ts(875, 5): 'toUTCString' is declared here.
  expireTime = expireTime || now.toGMTString();
  document.cookie = cookieName + "=" + value + (expireTime ? ";expires=" + expireTime : "") + ";path=/;domain=" + location.hostname;
}

export default setCookie;