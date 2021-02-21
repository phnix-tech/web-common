/**
 * @param prefix
 * @returns uuid string
 * @desc get uuid, borrowed from `gs-common/fe/Functions@uuid`
 */
function uuid (prefix?: string) {
  prefix = prefix || "";
  const d = new Date().getTime();
  const str = prefix + "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx";
  return (
    str.replace(/[xy]/g, c => {
      const r = (d + Math.random() * 16) % 16 | 0;
      return (c === "x" ? r : (r & 0x3 | 0x8)).toString(16);
    })
  );
}

export default uuid;