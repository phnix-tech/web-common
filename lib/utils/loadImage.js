"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 *
 * @param src - image source url
 * @returns Promise<HTMLImageElement|Error>
 */
function loadImage(src) {
    var img = document.createElement("img");
    img.src = src;
    return new Promise(function (resolve, reject) {
        if (img.complete) {
            resolve(img);
        }
        else {
            img.onload = function () {
                resolve(img);
            };
        }
        img.onerror = reject;
    });
}
exports.default = loadImage;
