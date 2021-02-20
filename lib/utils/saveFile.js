"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 *
 * @param blob - file blob
 * @param name - file name
 */
function saveFile(blob, name) {
    var URLCls = window.URL || window.webkitURL;
    var url = URLCls.createObjectURL(blob);
    var anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = name || url.toString();
    anchor.click();
    URLCls.revokeObjectURL(url);
}
exports.default = saveFile;