/**
 *
 * @param blob - file blob
 * @param name - file name
 */
function saveFile (blob: Blob, name?: string): void {
  const URLCls = window.URL || window.webkitURL;
  const url = URLCls.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = name || url.toString();
  anchor.click();
  URLCls.revokeObjectURL(url);
}

export default saveFile;