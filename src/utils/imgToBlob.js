/**
 * convert image data to blob for image upload using `FormData`
 * @param {HTMLImageElement} img - html image element
 * @returns {Promise<Blob>}
 */
function imgToBlob (img) {
  const
    canvas = document.createElement("canvas"),
    ctx = canvas.getContext("2d");

  canvas.width = img.naturalWidth;
  canvas.height = img.naturalHeight;
  ctx.drawImage(img, 0, 0);

  return new Promise(resolve => {
    canvas.toBlob(blob => {
      resolve(blob);
    }, null, 1.0);
  });
}

export default imgToBlob;