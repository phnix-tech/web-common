import {Any} from "../types";

export default function (obj: Any) {
  return Object.prototype.toString.call(obj) === "[object Object]";
}