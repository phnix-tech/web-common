/**
 * convert image data to blob for image upload using `FormData`
 * @param {HTMLImageElement} img - html image element
 * @param {string|null} type
 * @param {number} quality
 * @returns {Promise<Blob>}
 */
function imgToBlob (
  img,
  type = null,
  quality = 1.0
) {
  const
    canvas = document.createElement("canvas"),
    ctx = canvas.getContext("2d");

  canvas.width = img.naturalWidth;
  canvas.height = img.naturalHeight;
  ctx.drawImage(img, 0, 0);

  return new Promise(resolve => {
    canvas.toBlob(blob => {
      resolve(blob);
    }, type, quality);
  });
}

export default imgToBlob;