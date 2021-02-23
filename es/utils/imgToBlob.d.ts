/**
 * convert image data to blob for image upload using `FormData`
 * @param img - html image element
 * @param type
 * @param quality
 * @returns Promise<Blob>
 */
declare function imgToBlob(img: HTMLImageElement, type?: string | null, quality?: number): Promise<Blob>;
export default imgToBlob;
