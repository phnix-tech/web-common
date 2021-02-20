/**
 * read blob file to base64 formatted string
 * @param file - blob file
 * @returns Promise<string|Error>
 */
declare function readFileToDataUrl(file: File): Promise<string | null>;
export default readFileToDataUrl;
