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
function downloadFile ({
  url,
  fileName,
  method = "GET",
  params,
  headers = {}
}: {
  url: string;
  fileName?: string;
  method?: "GET" | "POST" | "PUT" | "get" | "post" | "put";
  params?: unknown;
  headers?: Record<string, string>;
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
        resolve(undefined);
      } else {
        reject(this);
      }
    };
    xhr.onerror = function (e: ProgressEvent) {
      reject.call(reject, [e, xhr]);
    };
    xhr.send(params !== undefined ? JSON.stringify(params) : null);
  });
}

export default downloadFile;