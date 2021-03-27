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
function getURLParameter(name, url) {
    url = url || location.search;
    var regexp = new RegExp("[?|&]" + name + "(=([^&;]*)|&|#|;|$)");
    var group = regexp.exec(url);
    if (!group) {
        return null;
    }
    if (!group[2]) {
        return "";
    }
    return decodeURIComponent(group[2].replace(/\+/g, "%20"));
}
export default getURLParameter;
