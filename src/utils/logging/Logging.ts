import type {Level, ConsoleMethodName} from "./types";
import {isBrowserEnv, CONSOLE_METHOD_NAME, LEVEL} from "./constant";
import fmtLogMessage from "./fmtLogMessage";
import hasSendFlagInLogParam from "./hasSendFlagInLogParam";

// @ts-ignore: require tsconfig lib dom.
let singleGlobalErrorHandler: typeof window.onerror;

/**
 * @param methodName console method name.
 * @param level logging level.
 * @param msgs Array of messages.
 */
function logFn (
  methodName: ConsoleMethodName,
  level: Level,
  msgs: unknown[]
) {
  // convert array like arguments to Array for use array methods
  msgs = Array.prototype.slice.call(msgs);

  const isNotLogging = (
    !Logging.ENABLED ||
    msgs.length <= 0 ||
    typeof console !== "object"
  );

  // error log send to server in default
  // otherwise false
  const isSend = hasSendFlagInLogParam(msgs) ?
    msgs.pop() as boolean : level === LEVEL.ERROR;

  msgs = fmtLogMessage(level, msgs);
  // send logging firstly
  sendLogToServer(level, msgs, isSend, Logging.SEND_TO_SERVER);

  if (isNotLogging) {
    return;
  }

  /* eslint-disable no-console */
  methodName = methodName.toLowerCase() as ConsoleMethodName;

  // assert方法第一个参数为boolean处理
  if (methodName === "assert") {
    const [condition, msg, ...assertMsgs] = msgs;
    switch (typeof console.assert) {
      case "function":
        try {
          // lib.dom.d.ts和@types/node console.d.ts类型定义不同
          console.assert.apply(console, [condition as boolean, msg as string, ...assertMsgs]);
        } catch (e) {
          console.warn(e);
        }
        break;
      // old ie
      case "object":
        try {
          // join varargs message in space separated
          console.assert(condition as boolean, Array.prototype.join.call(assertMsgs, " "));
        } catch (e) {
          console.warn(e);
        }
        break;
    }
    return;
  }

  const method = console[methodName];
  const type = typeof method;

  switch (type) {
    case "function":
      try {
        method.apply(console, msgs);
      } catch (e) {
        console.warn(e);
      }
      break;
    // old ie
    case "object":
      try {
        // join varargs message in space separated
        method(Array.prototype.join.call(msgs, " "));
      } catch (e) {
        console.warn(e);
      }
      break;
  }
  /* eslint-enable no-console */
}

/**
 * send logs to server,
 * ONLY in browser env.
 * 
 * @param level logging level.
 * @param msgs Array of messages.
 * @param isSend Optional flag for control send log to server.
 * @param sendToServer Send logging to server handler.
 */
function sendLogToServer (
  level: Level,
  msgs: unknown[],
  isSend: boolean,
  sendToServer: typeof Logging.SEND_TO_SERVER
) {
  if (!isBrowserEnv) {
    return;
  }

  // Logging.SEND high priority
  if (Logging.SEND && isSend) {
    sendToServer(level, msgs);
  }
}

/**
 * global error handler.
 * 
 * @param msg 
 * @param url 
 * @param line 
 * @param col 
 * @param error 
 * @returns 
 * @see https://goo.gl/3L5oKg
 */
function errorHandler (
  logging: Logging,
  msg: unknown,
  url?: string,
  line?: number,
  col?: number,
  error?: Error
) {
  // template script error may cause unexpected messages
  // e.g. Script error.
  msg = msg || "N/A";
  url = url || "N/A";

  const text = [
    "MSG: " + msg,
    "SCRIPT: " + url,
    "LINE: " + line,
    "COLUMN: " + col,
    "TRACE: " + error?.stack || "N/A"
  ];

  logging.error(text.join("\n"));
  // return true prevents the firing of the default event handler.
  // script error url is N/A, enable default event handler for debug.
  return logging.ddeh() !== null ? logging.ddeh() : (url !== "N/A");
}

/**
 * Logging class.
 * 
 * @see https://developer.chrome.com/devtools/docs/console-api
 * @see https://developer.mozilla.org/en-US/docs/Web/API/Console
 */
class Logging {
  static LEVEL = LEVEL;

  /**
   * control logging message or not flag.  
   * default false, browser env: false, nodejs env: true.
   */
  static ENABLED = !isBrowserEnv;

  /**
   * true prevents the firing of the default event handler,
   * default true.
   * @see https://goo.gl/GPwvqj
   */
  static DDEH = true;

  /**
   * send logging to server flag, default not send log to server,
   * note: if set `true`, only send `ERROR` level log to server.  
   * you can use last param as boolean flag control send log to server,  
   * nodejs env no need send logging,  
   * useful for disable it if debug error.
   */
  static SEND = false;

  /**
   * send logging to server handler, you can use it implement your own logging logic.
   * 
   * @param level logging level
   * @param msgs logging messages, note the first two elements are formtted time & level tag,  
   * if you don't want it, you can remove it.
   */
  static SEND_TO_SERVER = function (level: Level, msgs: unknown[]) {
    const xhr = new XMLHttpRequest();
    xhr.open("POST", "/p/log?_=" + new Date().getTime(), true);
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhr.send(JSON.stringify({
      level,
      // remove time & level tag
      msg: msgs.slice(2).join(" ")
    }));
  };

  /**
   * logging message using Console.trace api if supported.
   * 
   * @param msgs
   */
  log (...msgs: unknown[]) {
    const method = isBrowserEnv ?
      // print stack trace in browser env
      CONSOLE_METHOD_NAME.TRACE :
      // only print log message in nodejs env
      CONSOLE_METHOD_NAME.LOG;

    logFn.call(null, method, Logging.LEVEL.LOG, msgs);
    return this;
  }

  /**
   * @param msgs
   */
  debug (...msgs: unknown[]) {
    const method = isBrowserEnv ?
      CONSOLE_METHOD_NAME.DEBUG :
      // nodejs console.debug no output
      // we use console.log method
      CONSOLE_METHOD_NAME.LOG;

    logFn.call(null, method, Logging.LEVEL.DEBUG, msgs);
    return this;
  }

  /**
   * @param msgs
   */
  info (...msgs: unknown[]) {
    logFn.call(null, CONSOLE_METHOD_NAME.INFO, Logging.LEVEL.INFO, msgs);
    return this;
  }

  /**
   * @param msgs
   */
  warn (...msgs: unknown[]) {
    logFn.call(null, CONSOLE_METHOD_NAME.WARN, Logging.LEVEL.WARN, msgs);
    return this;
  }

  /**
   * @param msgs
   */
  error (...msgs: unknown[]) {
    const method = isBrowserEnv ?
      // browser env console.error will also print stack trace
      CONSOLE_METHOD_NAME.ERROR :
      CONSOLE_METHOD_NAME.TRACE;

    logFn.call(null, method, Logging.LEVEL.ERROR, msgs);
    return this;
  }

  /**
   * @param condition
   * @param msgs
   */
  assert (condition?: boolean, ...msgs: unknown[]) {
    logFn.call(null, CONSOLE_METHOD_NAME.ASSERT, Logging.LEVEL.ASSERT, [condition, ...msgs]);
    return this;
  }

  /**
   * @param msgs
   */
  trace (...msgs: unknown[]) {
    logFn.call(null, CONSOLE_METHOD_NAME.TRACE, Logging.LEVEL.TRACE, msgs);
    return this;
  }

  /**
   * public method control logging message or not
   * 
   * @param flag
   */
  enabled (flag?: boolean) {
    if (arguments.length === 0) {
      return Logging.ENABLED;
    }
    if (typeof flag === "boolean") {
      Logging.ENABLED = flag;
    }
    return this;
  }

  /**
   * @param ddeh whether disable default event hanndler or not.
   */
  ddeh (ddeh?: boolean | null) {
    if (arguments.length === 0) {
      return Logging.DDEH;
    }
    if (typeof ddeh === "boolean" ||
      ddeh === null ||
      ddeh === undefined
    ) {
      Logging.DDEH = Boolean(ddeh);
    }
    return this;
  }

  /**
   * @param send whether send loging to server or not.
   */
  send (send?: boolean) {
    if (arguments.length === 0) {
      return Logging.SEND;
    }
    if (typeof send === "boolean") {
      Logging.SEND = send;
    }
    return this;
  }

  /**
   * ensure resgiter window onerror event for capture global error events.
   */
  ensureErrorHandler () {
    // 为什么不用window.addEventListener? 确保全局只注册一次事件？
    // window.addEventListener("error", errorHandler);
    // register event handler
    if (!singleGlobalErrorHandler) {
      singleGlobalErrorHandler = (msg, url, line, col, error) => {
        errorHandler(this, msg, url, line, col, error);
      };
    }

    if (window.onerror !== singleGlobalErrorHandler) {
      window.onerror = singleGlobalErrorHandler;
    }

    return this;
  }

  /**
   * 
   * @param sendToServer send logging to server handler.
   * @returns 
   */
  sendToServer (sendToServer?: typeof Logging.SEND_TO_SERVER) {
    if (sendToServer) {
      Logging.SEND_TO_SERVER = sendToServer;
    }
    return this;
  }
}

export default Logging;