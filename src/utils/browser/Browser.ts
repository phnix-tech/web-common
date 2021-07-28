type BrowserName =
| "edge" | "chrome" | "webkit" | "safari" | "opera" | "mozilla"
| "msie" | "trident" | "ie5" | "ie6" | "ie7" | "ie8" | "ie9"
| "ie10" | "ie11";

/**
 * browser & version object, see `jquery.browser`  
 * we may extend our customize property, e.g. ie8, ie9
 */
type Browser = {
  [key in BrowserName]?: boolean;
} & {
  version?: string;

  isMobile: (ua?: string) => boolean;
  isiOS: (ua?: string) => boolean;
  isAndroid: (ua?: string) => boolean;
  isWechat: (ua?: string) => boolean;
  isWeibo: (ua?: string) => boolean;
  isGsmIos: (ua?: string) => boolean;
  isGsmAndroid: (ua?: string) => boolean;
  isGSM: (ua?: string) => boolean;
};

export default Browser;

export type {BrowserName};