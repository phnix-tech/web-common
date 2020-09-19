/**
 *
 * @param {string} src - image source url
 * @returns {Promise<HTMLImageElement|Error>}
 */
function loadImage (src) {
  const img = document.createElement("img");
  img.src = src;

  return new Promise((resolve, reject) => {
    if (img.complete) {
      resolve(img);
    } else {
      img.onload = () => {
        resolve(img);
      };
    }
    img.onerror = reject;
  });
}

export default loadImage;