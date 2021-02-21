/**
 * 异步执行action中间件
 * @param dispatch
 * @param getState
 * @see https://cloud.tencent.com/developer/article/1467032
 * @see https://www.cnblogs.com/cherryvenus/p/9685082.html
 * @see https://www.jianshu.com/p/ae7b5a2f78ae
 */
var getStateMiddleware = function (_a) {
    var dispatch = _a.dispatch, getState = _a.getState;
    return function (next) { return function (action) {
        if (typeof action === "function") {
            return action({ dispatch: dispatch, getState: getState });
        }
        return next(action);
    }; };
};
export default getStateMiddleware;
