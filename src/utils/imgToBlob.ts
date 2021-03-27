/**
 * convert image data to blob for image upload using `FormData`
 * @param img - html image element
 * @param type
 * @param quality
 * @returns Promise<Blob>
 */
function imgToBlob (
  img: HTMLImageElement,
  type: string | null = null,
  quality = 1.0
) {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

  canvas.width = img.naturalWidth;
  canvas.height = img.naturalHeight;
  ctx.drawImage(img, 0, 0);

  return new Promise<Blob>(resolve => {
    canvas.toBlob(blob => {
      resolve(blob as Blob);
    }, type || undefined, quality);
  });
}

export default imgToBlob;