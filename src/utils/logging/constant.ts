import type {LevelMap, Level} from "./types";

// 是否浏览器环境
const isBrowserEnv = !!(typeof window !== "undefined" && window);

const CONSOLE_METHOD_NAME: {
  readonly [key in Level]: Lowercase<LevelMap[key]>;
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
 * logging level
 */
const LEVEL: LevelMap = {
  DEBUG: "DEBUG",
  INFO: "INFO",
  WARN: "WARN",
  ERROR: "ERROR",
  ASSERT: "ASSERT",
  TRACE: "TRACE",
  LOG: "LOG"
};

export {isBrowserEnv, CONSOLE_METHOD_NAME, LEVEL};