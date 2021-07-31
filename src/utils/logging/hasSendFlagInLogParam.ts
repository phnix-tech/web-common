import {isBrowserEnv} from "./constant";

/**
 * last param as send to server flag,
 * browser env ONLY.
 * 
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
 * @ignore
 */
export default hasSendFlagInLogParam;