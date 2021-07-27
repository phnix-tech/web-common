/**
 * domain regexp pattern
 */
const pattern = /^((?:(?:(?:\w[.\-+]?)*)\w)+)((?:(?:(?:\w[.\-+]?){0,62})\w)+)\.(\w{2,6})$/;

/**
 * check whether input is valid domain
 * 
 * @param domain
 * @returns
 */
function isDomain (domain?: string) {
  domain = domain || "";
  return !!domain.match(pattern);
}

isDomain.pattern = pattern;

export default isDomain;

export {pattern};