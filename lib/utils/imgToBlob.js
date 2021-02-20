"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * convert image data to blob for image upload using `FormData`
 * @param img - html image element
 * @param type
 * @param quality
 * @returns Promise<Blob>
 */
function imgToBlob(img, type, quality) {
    if (type === void 0) { type = null; }
    if (quality === void 0) { quality = 1.0; }
    var canvas = document.createElement("canvas");
    var ctx = canvas.getContext("2d");
    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;
    ctx.drawImage(img, 0, 0);
    return new Promise(function (resolve) {
        canvas.toBlob(function (blob) {
            resolve(blob);
        }, type || undefined, quality);
    });
}
exports.default = imgToBlob;
