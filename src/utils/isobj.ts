import {Any} from "../types";

/**
 * 检查变量是否是纯对象
 * 
 * @param obj any value
 * @returns true if plain object, otherwise false
 */
function isobj (obj: Any): boolean {
  return Object.prototype.toString.call(obj) === "[object Object]";
}

export default isobj;