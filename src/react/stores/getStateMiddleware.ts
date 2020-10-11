import {Dispatch, MiddlewareAPI} from "redux";
import {Any} from "../../ts/types";

/**
 * 异步执行action中间件
 * @param dispatch
 * @param getState
 * @see https://cloud.tencent.com/developer/article/1467032
 * @see https://www.cnblogs.com/cherryvenus/p/9685082.html
 * @see https://www.jianshu.com/p/ae7b5a2f78ae
 */
const getStateMiddleware = (
  {dispatch, getState}: MiddlewareAPI
) => (
  next: Dispatch
) => (
  action: Any
) => {
  if (typeof action === "function") {
    return action({dispatch, getState});
  }
  return next(action);
};

export default getStateMiddleware;