/**
 * get browser cookie
 * 
 * @param cookieName
 * @returns
 */
function getCookie (cookieName?: string) {
  const name = cookieName + "=";
  const cookies = document.cookie.split(";");

  for (let i = 0; i < cookies.length; i++) {
    let cookie = cookies[i];
    while (cookie.charAt(0) === " ") {
      cookie = cookie.substring(1);
    }
    if (cookie.indexOf(name) === 0) {
      cookie = cookie.substring(name.length, cookie.length);
      return cookie;
    }
  }

  return "";
}

export default getCookie;