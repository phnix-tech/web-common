/**
 * url regexp pattern
 */
const pattern = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#/%?=~_|!:,.;]*[-A-Z0-9+&@#/%=~_|])/ig;

/**
 * check whether input is valid url
 * 
 * @param url
 * @returns
 */
function isUrl (url?: string) {
  url = url || "";
  return !!url.match(pattern);
}

isUrl.pattern = pattern;

export default isUrl;

export {pattern};