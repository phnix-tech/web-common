import saveFile from "./saveFile";
/**
 *
 * @param url - file url
 * @param fileName - file name
 * @param method - request method
 * @param params - request params
 * @param headers - request headers
 * @returns Promise<*>
 */
function downloadFile(_a) {
    var url = _a.url, fileName = _a.fileName, _b = _a.method, method = _b === void 0 ? "GET" : _b, params = _a.params, _c = _a.headers, headers = _c === void 0 ? {} : _c;
    var xhr = new XMLHttpRequest();
    xhr.open(method.toLowerCase(), url, true);
    var contentType = "application/json";
    if (headers.hasOwnProperty("content-type")) {
        contentType = headers["content-type"];
        delete headers["content-type"];
    }
    else if (headers.hasOwnProperty("Content-Type")) {
        contentType = headers["Content-Type"];
        delete headers["Content-Type"];
    }
    xhr.setRequestHeader("Content-Type", contentType);
    Object.keys(headers).forEach(function (key) {
        xhr.setRequestHeader(key, headers[key]);
    });
    xhr.responseType = "blob";
    return new Promise(function (resolve, reject) {
        xhr.onload = function () {
            if (this.status === 200) {
                saveFile(this.response, fileName);
                resolve(undefined);
            }
            else {
                reject(this);
            }
        };
        xhr.onerror = function (e) {
            reject.call(reject, [e, xhr]);
        };
        xhr.send(params !== undefined ? JSON.stringify(params) : null);
    });
}
export default downloadFile;
