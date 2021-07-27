interface LEVEL_MAP {
  readonly DEBUG: "DEBUG";
  readonly INFO: "INFO";
  readonly WARN: "WARN";
  readonly ERROR: "ERROR";
  readonly ASSERT: "ASSERT";
  readonly TRACE: "TRACE";
  /**
   * `LOG` level nodejs use only
   */
  readonly LOG: "LOG";
}

type LEVEL = keyof LEVEL_MAP;

type CONSOLE_METHOD_NAME = Lowercase<LEVEL>;

// 是否浏览器环境
const isBrowserEnv = !!(typeof window !== "undefined" && window);
const CONSOLE_METHOD_NAME: {
  [key in LEVEL]: Lowercase<LEVEL_MAP[key]>;
} = {
  DEBUG: "debug",
  INFO: "info",
  WARN: "warn",
  ERROR: "error",
  ASSERT: "assert",
  TRACE: "trace",
  LOG: "log"
};

/**
 * @param methodName console method name
 * @param level
 * @param msgs Array of messages
 * @ignore
 */
function logFn (
  methodName: CONSOLE_METHOD_NAME,
  level: LEVEL,
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
    msgs.pop() as boolean : level === Logging.LEVEL.ERROR;

  msgs = fmtLogMessage(level, msgs);
  // send logging firstly
  sendLogToServer(level, msgs, isSend);

  if (isNotLogging) {
    return;
  }

  /* eslint-disable no-console */
  methodName = methodName.toLowerCase() as CONSOLE_METHOD_NAME;

  // assert方法第一个参数为boolean处理
  if (methodName === "assert") {
    const [condition, ...assertMsgs] = msgs;
    switch (typeof console.assert) {
      case "function":
        try {
          console.assert.apply(console, [condition as boolean, ...assertMsgs]);
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
 * Logging class
 * 
 * @see https://developer.chrome.com/devtools/docs/console-api
 * @see https://developer.mozilla.org/en-US/docs/Web/API/Console
 */
class Logging {
  static LEVEL: LEVEL_MAP = {
    DEBUG: "DEBUG",
    INFO: "INFO",
    WARN: "WARN",
    ERROR: "ERROR",
    ASSERT: "ASSERT",
    TRACE: "TRACE",
    LOG: "LOG"
  };

  /**
   * control logging message or not flag  
   * default false, browser env: false, nodejs env: true
   */
  static ENABLED = !isBrowserEnv;

  /**
   * true prevents the firing of the default event handler  
   * default true
   * @see https://goo.gl/GPwvqj
   */
  static DDEH = true;

  /**
   * send logging to server flag  
   * logging will be send to server by default in browser environment  
   * nodejs env no need send logging  
   * useful for disable it if debug error  
   */
  static SEND = isBrowserEnv;

  /**
   * logging message using Console.trace api if supported
   * @memberOf fe/Logging
   * @method log
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
   * @memberOf fe/Logging
   * @method debug
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
   * @memberOf fe/Logging
   * @method debug
   * @param msgs
   */
  info (...msgs: unknown[]) {
    logFn.call(null, CONSOLE_METHOD_NAME.INFO, Logging.LEVEL.INFO, msgs);
    return this;
  }

  /**
   * @memberOf fe/Logging
   * @method warn
   * @param msgs
   */
  warn (...msgs: unknown[]) {
    logFn.call(null, CONSOLE_METHOD_NAME.WARN, Logging.LEVEL.WARN, msgs);
    return this;
  }

  /**
   * @memberOf fe/Logging
   * @method error
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
   * @memberOf fe/Logging
   * @method assert
   */
  assert (condition?: boolean, ...msgs: unknown[]) {
    logFn.call(null, CONSOLE_METHOD_NAME.ASSERT, Logging.LEVEL.ASSERT, [condition, ...msgs]);
    return this;
  }

  /**
   * @memberOf fe/Logging
   * @method trace
   */
  trace (...msgs: unknown[]) {
    logFn.call(null, CONSOLE_METHOD_NAME.TRACE, Logging.LEVEL.TRACE, msgs);
    return this;
  }

  /**
   * public method control logging message or not
   * @memberOf fe/Logging
   * @method enabled
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
   * @memberOf fe/Logging
   * @method ddeh
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
   * @memberOf fe/Logging
   * @method send
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
   * @memberOf fe/Logging
   * @method ensureErrorHandler
   */
  ensureErrorHandler () {
    // window.addEventListener("error", errorHandler);
    // register event handler
    if (window.onerror !== errorHandler) {
      window.onerror = errorHandler;
    }
    return this;
  }
}

/**
 * append time & level tag in the beginning of log message  
 * e.g. [2017/06/30 18:00:46.423 +0800] INFO log message
 * 
 * @ignore
 * @param level
 * @param msgs Array of messages
 * @returns Array of messages
 */
function fmtLogMessage (level: LEVEL, msgs: unknown[]) {
  if (msgs.length <= 0) {
    return msgs;
  }

  const date = new Date();
  const timezoneOffset = date.getTimezoneOffset();
  const timeZone = (timezoneOffset < 0 ? "+" : "-") +
    ("00" + Math.floor(Math.abs(timezoneOffset) / 60)).slice(-2) +
    ("00" + (Math.abs(timezoneOffset) % 60)).slice(-2);

  const fmt = (el: number) => el < 10 ? "0" + el.toString() : el;
  const hasPadMethod = !!level.padEnd;
  // time format for splunk extract event
  // e.g. [2017/06/30 18:00:46.423 +0800]
  let formattedTime = [
    date.getFullYear(),
    date.getMonth() + 1,
    date.getDate()
  ].map(fmt).join("/") + " " +
  [
    date.getHours(),
    date.getMinutes(),
    date.getSeconds()
  ].map(fmt).join(":") + "." +
  (hasPadMethod ?
    date.getMilliseconds().toString().padStart(3, "0") :
    date.getMilliseconds()
  ) + " " + timeZone;

  formattedTime = "[" + formattedTime + "]";

  msgs = msgs.map(e => e instanceof Error ? e.toString() + "\n" + "TRACE: " + e.stack + "\n" : e);
  msgs = ([formattedTime, hasPadMethod ? level.padEnd(5, " ") : level] as typeof msgs).concat(msgs);

  // ONLY in browser env
  if (
    isBrowserEnv &&
    level === Logging.LEVEL.ERROR
  ) {
    msgs = msgs.concat([
      // separator line
      "",
      "UA: " + navigator.userAgent,
      "URL: " + location.href
    ].join("\n"));
  }

  return msgs;
}

/**
 * last param as send to server flag
 * browser env ONLY
 * @ignore
 * @param msgs
 * @returns
 */
function hasSendFlagInLogParam (msgs: unknown[]) {
  let hasFlag = false;
  if (!isBrowserEnv) {
    return hasFlag;
  }

  // two params at least
  if (msgs.length > 1 &&
    typeof (msgs[msgs.length - 1]) === "boolean") {
    hasFlag = true;
  }

  return hasFlag;
}

/**
 * send logs to server
 * ONLY in browser env
 * @ignore
 * @param level
 * @param msgs
 * @param isSend {boolean} - optional flag for control send log to server
 */
function sendLogToServer (level: LEVEL, msgs: unknown[], isSend: boolean) {
  if (!isBrowserEnv) {
    return;
  }

  // Logging.SEND high priority
  if (Logging.SEND && isSend) {
    const xhr = new XMLHttpRequest();
    xhr.open("POST", "/p/log?_=" + new Date().getTime(), true);
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhr.send(JSON.stringify({
      level,
      // remove time & level tag
      msg: msgs.slice(2).join(" ")
    }));
  }
}

/**
 * global error handler
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
  // script error url is N/A, enable default event handler for debug
  return logging.ddeh() !== null ? logging.ddeh() : (url !== "N/A");
}

const logging = new Logging();
export default logging;

export {Logging};