/**
 * 36位uuid生成器，第15位固定数字4，比如`3d94e4dd-9576-45de-8b29-1c9a10d38e4b`  
 * 
 * @param prefix 可选前缀
 * @returns uuid string
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