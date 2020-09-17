import saveFile from "./saveFile";

/**
 *
 * @param {string} url - file url
 * @param {string|undefined} fileName - file name
 * @param {string|undefined} method - request method
 * @param {object|undefined} params - request params
 * @param {object|undefined} headers - request headers
 * @returns {Promise<*>}
 */
function downloadFile ({
  url,
  fileName,
  method = "GET",
  params,
  headers = {}
}) {
  const xhr = new XMLHttpRequest();
  xhr.open(method.toLowerCase(), url, true);

  let contentType = "application/json";
  if (headers.hasOwnProperty("content-type")) {
    contentType = headers["content-type"];
    delete headers["content-type"];
  } else if (headers.hasOwnProperty("Content-Type")) {
    contentType = headers["Content-Type"];
    delete headers["Content-Type"];
  }
  xhr.setRequestHeader("Content-Type", contentType);
  Object.keys(headers).forEach(key => {
    xhr.setRequestHeader(key, headers[key]);
  });
  xhr.responseType = "blob";

  return new Promise((resolve, reject) => {
    xhr.onload = function () {
      if (this.status === 200) {
        saveFile(this.response, fileName);
        resolve();
      } else {
        reject(this);
      }
    };
    xhr.onerror = function () {
      const args = [...arguments];
      args.push(xhr);
      reject.apply(reject, ...args);
    };
    xhr.send(params !== undefined ? JSON.stringify(params) : null);
  });
}

export default downloadFile;