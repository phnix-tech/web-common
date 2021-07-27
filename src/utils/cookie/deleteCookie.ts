/**
 * delete browser cookie by name
 * 
 * @param cookieName
 */
function deleteCookie (cookieName: string) {
  document.cookie = cookieName + "=;expires=Thu, 01 Jan 1970 00:00:01 GMT;path=/;domain=" + location.hostname;
}

export default deleteCookie;