/**
 * 动态加载JS脚本
 * @param src
 * @returns Promise<*>
 */
declare function loadScript(src: string): Promise<unknown>;
export default loadScript;
