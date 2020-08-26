/**
 * read blob file to base64 formatted string
 * @param {File} file - blob file
 * @returns {Promise<string|Error>}
 */
function readFileToDataUrl (file) {
  const reader = new FileReader();
  reader.readAsDataURL(file);

  return new Promise((resolve, reject) => {
    reader.onload = e => {
      const base64DataURL = e.target.result;
      resolve(base64DataURL);
    };
    reader.onerror = reject;
  });
}

export default readFileToDataUrl;