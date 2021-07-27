import type {BrowserName} from "./Browser";
import type BrowserMap from "./Browser";

type Browser = Pick<BrowserMap, BrowserName | "version">;

/**
 * browser detection, borrowed from jquery - http://api.jquery.com/jquery.browser/
 * @memberOf fe/Functions
 * @param ua user agent
 * @returns browser object with name and version
 */
function browserDetect (ua?: string) {
  ua = ua || "";
  ua = ua.toLowerCase();
  const match =
    // MS Edge UA e.g.
    // eslint-disable-next-line max-len
    // Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.79 Safari/537.36 Edge/14.14393
    // NOTE EDGE UA has Chrome word
    /(edge)[ /]([\w.]+)/.exec(ua) ||
    /(chrome)[ /]([\w.]+)/.exec(ua) ||
    /(webkit)[ /]([\w.]+)/.exec(ua) ||
    /(opera)(?:.*version|)[ /]([\w.]+)/.exec(ua) ||
    /(msie) ([\w.]+)/.exec(ua) ||
    /(trident)[ /]([\w.]+)/.exec(ua) ||
    ua.indexOf("compatible") < 0 && /(mozilla)(?:.*? rv:([\w.]+)|)/.exec(ua) ||
    [];

  const matched = {
    browser: match[1] || "",
    version: match[2] || "0"
  };

  /* new trident is for ie 11*/
  const browser: Browser = {};
  if (matched.browser) {
    browser[matched.browser as BrowserName] = true;
    browser.version = matched.version;
    // ie11: Trident/7.0
    if (browser.trident) {
      // treat ie 11 as msie
      browser["msie"] = true;
      browser.version = (parseFloat(browser.version) + 4).toString();
      browser.version += ".0";
    }
  }
  // EDGE is webkit?
  // Chrome is Webkit, but Webkit is also Safari.
  if (browser.edge || browser.chrome) {
    browser.webkit = true;
  } else if (browser.webkit) {
    browser.safari = true;
  }

  // extend customize property
  // ie5, ie6, ie7, ie8, ie9, ie10, ie11
  if ((browser.msie || browser.trident) && browser.version) {
    const start = 0;
    let limit = 1;
    if (browser.version.length > 3) {
      limit = 2;
    }
    browser[("ie" + String(browser.version).substring(start, limit) as BrowserName)] = true;
  }

  return browser;
}

export default browserDetect;