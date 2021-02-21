/**
 * read blob file to base64 formatted string
 * @param file - blob file
 * @returns Promise<string|Error>
 */
function readFileToDataUrl (file: File) {
  const reader = new FileReader();
  reader.readAsDataURL(file);

  return new Promise<string | null>((resolve, reject) => {
    reader.onload = e => {
      const base64DataURL = e.target?.result || "";
      resolve(base64DataURL as string);
    };
    reader.onerror = reject;
  });
}

export default readFileToDataUrl;