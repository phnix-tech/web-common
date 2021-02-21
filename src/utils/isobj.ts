import {Any} from "../types";

export default function (obj: Any): boolean {
  return Object.prototype.toString.call(obj) === "[object Object]";
}