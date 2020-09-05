// https://cloud.tencent.com/developer/article/1467032
// https://www.cnblogs.com/cherryvenus/p/9685082.html
// https://www.jianshu.com/p/ae7b5a2f78ae
// 异步执行action中间件
const getStateMiddleware = ({dispatch, getState}) => next => action => {
  if (typeof action === "function") {
    return action({dispatch, getState});
  }
  return next(action);
};

export default getStateMiddleware;