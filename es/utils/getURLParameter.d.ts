/**
 * @param name - query string key
 * @param url - optional, if not given use location.search
 * @returns if not given key return null
 * @see http://stackoverflow.com/questions/901115/how-can-i-get-query-string-values-in-javascript
 * @description get query string params, borrowed from `gs-common/fe/Functions@getURLParameter`
 * e.g. query string: ?f=1&foo=&foo1
 * get foo empty string not null, (present with empty value)
 * get foo1 empty string not null, (present with no value)
 * get foo2 null (absent)
 */
declare function getURLParameter(name: string, url?: string): string | null;
export default getURLParameter;
