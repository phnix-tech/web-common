import type {Level} from "./types";
import {isBrowserEnv, LEVEL} from "./constant";

/**
 * append time & level tag in the beginning of log message,
 * e.g. `[2017/06/30 18:00:46.423 +0800] INFO log message`.
 * 
 * @param level logging level.
 * @param msgs Array of messages.
 * @returns Array of messages.
 */
function fmtLogMessage (level: Level, msgs: unknown[]) {
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
    level === LEVEL.ERROR
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

export default fmtLogMessage;