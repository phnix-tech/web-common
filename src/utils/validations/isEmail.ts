/**
 * email regexp pattern
 */
const pattern = /^(([^<>()[\]\\.,;:\s@%!~"]+(\.[^<>()[\]\\.,;:\s@%!~"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

/**
 * email check regular expression
 * 
 * @param email
 * @return
 * @example Functions.isValidEmail("12345@163.com")
 * @see http://stackoverflow.com/questions/46155/validate-email-address-in-javascript
 */
function isEmail (email?: string) {
  email = email || "";
  return pattern.test(email);
}

isEmail.pattern = pattern;

export default isEmail;

export {pattern};