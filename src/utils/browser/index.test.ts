import browser from "./index";

describe("browser detection", () => {
  // eslint-disable-next-line max-len
  const iosSafari = "Mozilla/5.0 (iPhone; CPU iPhone OS 9_1 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13B137 Safari/601.1";
  // eslint-disable-next-line max-len
  const androidNexus = "Mozilla/5.0 (Linux; U; Android 4.0.2; en-us; Galaxy Nexus Build/ICL53F) AppleWebKit/534.30 (KHTML, like Gecko) Version/4.0 Mobile Safari/534.30";

  // eslint-disable-next-line max-len
  const iosGSM = "com.garmin.gccm/2.5.0.3 (iOS 11.1.2; iPhone 7 Plus; 32BDF1DC-5010-4215-AB16-74D3E9F5F9E1) Alamofire/4.2";
  // eslint-disable-next-line max-len
  const androidGSM = "Dalvik/2.1.0 (Linux; U; Android 7.0; MI 5s MIUI/V9.6.1.0.NAGCNFD);com.garmin.android.apps.gccm 2.6.1;device-id : 82216455-5cff-4a5a-a9a4-f9f171ea6cc6R ;User-id : 6023";

  // eslint-disable-next-line max-len
  const iosWechat = "Mozilla/5.0 (iPhone; CPU iPhone OS 12_3_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 MicroMessenger/7.0.3(0x17000321) NetType/WIFI Language/zh_CN";

  // eslint-disable-next-line max-len
  const androidWechat = "Mozilla/5.0 (Linux; Android 7.0; FRD-AL00 Build/HUAWEIFRD-AL00; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/66.0.3359.126 MQQBrowser/6.2 TBS/044705 Mobile Safari/537.36 MMWEBID/1613 MicroMessenger/7.0.4.1420(0x2700043C) Process/tools NetType/WIFI Language/zh_CN";

  // eslint-disable-next-line max-len
  const chromeWindows = "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3770.100 Safari/537.36";
  const firefoxWindows = "Mozilla/5.0 (Windows NT 10.0; WOW64; rv:46.0) Gecko/20100101 Firefox/46.0";

  describe("#isMobile", () => {
    it("should true when pass mobile user agent", () => {
      // ios safari
      expect(browser.isMobile(iosSafari)).toBeTruthy();
      // android
      expect(browser.isMobile(androidNexus)).toBeTruthy();
      expect(browser.isMobile(iosGSM)).toBeTruthy();
      expect(browser.isMobile(androidGSM)).toBeTruthy();
      expect(browser.isMobile(iosWechat)).toBeTruthy();
      expect(browser.isMobile(androidWechat)).toBeTruthy();
    });

    it("should false when pass pc user agent", () => {
      expect(browser.isMobile(chromeWindows)).toBeFalsy();
      expect(browser.isMobile(firefoxWindows)).toBeFalsy();
    });
  });

  describe("#isiOS", () => {
    it("should be true when pass ios user agent", () => {
      expect(browser.isiOS(iosSafari)).toBeTruthy();
      expect(browser.isiOS(iosWechat)).toBeTruthy();
      expect(browser.isiOS(iosGSM)).toBeTruthy();
    });

    it("should be false when pass android user agent", () => {
      expect(browser.isiOS(androidNexus)).toBeFalsy();
      expect(browser.isiOS(androidWechat)).toBeFalsy();
      expect(browser.isiOS(androidGSM)).toBeFalsy();
    });
  });

  describe("#isAndroid", () => {
    it("should be true when pass android user agent", () => {
      expect(browser.isAndroid(androidNexus)).toBeTruthy();
      expect(browser.isAndroid(androidWechat)).toBeTruthy();
      expect(browser.isAndroid(androidGSM)).toBeTruthy();
    });

    it("should be false when pass ios user agent", () => {
      expect(browser.isAndroid(iosSafari)).toBeFalsy();
      expect(browser.isAndroid(iosWechat)).toBeFalsy();
      expect(browser.isAndroid(iosGSM)).toBeFalsy();
    });
  });

  describe("#isGsmIos", () => {
    it("should be true when pass ios gsm user agent", () => {
      expect(browser.isGsmIos(iosGSM)).toBeTruthy();
    });

    it("should be false when pass others user agent", () => {
      expect(browser.isGsmIos(iosSafari)).toBeFalsy();
      expect(browser.isGsmIos(androidNexus)).toBeFalsy();
      expect(browser.isGsmIos(androidGSM)).toBeFalsy();
    });
  });

  describe("#isGsmAndroid", () => {
    it("should be true when pass android gsm user agent", () => {
      expect(browser.isGsmAndroid(androidGSM)).toBeTruthy();
    });

    it("should be false when pass others user agent", () => {
      expect(browser.isGsmAndroid(iosSafari)).toBeFalsy();
      expect(browser.isGsmAndroid(androidNexus)).toBeFalsy();
      expect(browser.isGsmAndroid(iosGSM)).toBeFalsy();
    });
  });

  describe("#isGSM", () => {
    it("should be true when pass ios or android gsm user agent", () => {
      expect(browser.isGSM(iosGSM)).toBeTruthy();
      expect(browser.isGSM(androidGSM)).toBeTruthy();
    });

    it("should be false when pass others user agent", () => {
      expect(browser.isGSM(iosSafari)).toBeFalsy();
      expect(browser.isGSM(androidNexus)).toBeFalsy();
    });
  });

  describe("#isWechat", () => {
    it("should be true when pass wechat user agent", () => {
      expect(browser.isWechat(iosWechat)).toBeTruthy();
      expect(browser.isWechat(androidWechat)).toBeTruthy();
    });

    it("should be false when pass others user agent", () => {
      expect(browser.isWechat(iosSafari)).toBeFalsy();
      expect(browser.isWechat(androidNexus)).toBeFalsy();
      expect(browser.isWechat(iosGSM)).toBeFalsy();
      expect(browser.isWechat(androidGSM)).toBeFalsy();
    });
  });
});