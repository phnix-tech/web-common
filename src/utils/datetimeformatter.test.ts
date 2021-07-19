import datetimeformatter from "./datetimeformatter";

describe("utils.datetimeformatter", () => {
  describe("timestamp2String", () => {
    // 2021-07-19 21:50:01
    const timestamp = 1626702601888;
    const fmt = "yyyy-MM-dd hh:mm:ss";
    test(
      `传入时间戳${timestamp}，格式化参数${fmt}，输出2021-07-19 21:50:01`,
      () => {
        expect(datetimeformatter.timestamp2String(timestamp, fmt)).toBe("2021-07-19 21:50:01");
      }
    );

    const errFmt = "yyyy-nn-DD hh:mm:ss";
    test(
      `传入时间戳${timestamp}，错误的格式化参数${errFmt}，输出2021-nn-DD 21:50:01`,
      () => {
        expect(datetimeformatter.timestamp2String(timestamp, errFmt)).toBe("2021-nn-DD 21:50:01");
      }
    );

    // 2021-07-08 20:09:08
    const timestamp1 = new Date(2021, 6, 8, 20, 9, 8).getTime();
    const fmt1 = "yyyy-M-d hh:mm:ss";
    test(
      `传入时间戳${timestamp1}，格式化参数${fmt1}，输出2021-7-8 20:09:08`,
      () => {
        expect(datetimeformatter.timestamp2String(timestamp1, fmt1)).toBe("2021-7-8 20:09:08");
      }
    );
  });

  describe("date2String", () => {
    // 2021-07-10 10:36:45
    const date = new Date(2021, 6, 10, 10, 36, 45);
    const fmt = "yyyy-MM-dd hh:mm:ss";
    test(
      `传入日期${date}，格式化参数${fmt}，输出2021-07-10 10:36:45`,
      () => {
        expect(datetimeformatter.date2String(date, fmt)).toBe("2021-07-10 10:36:45");
      }
    );

    test(
      `传入日期${date}，格式化参数yyyy-MM-dd，输出2021-07-10`,
      () => {
        expect(datetimeformatter.date2String(date, "yyyy-MM-dd")).toBe("2021-07-10");
      }
    );

    // 2021-04-20 18:20:46
    const timestamp = 1618914046000;
    const fmt1 = "yyyy-MM-dd hh:mm:ss";
    test(
      `传入时间戳${timestamp}，格式化参数${fmt1}，输出2021-04-20 18:20:46`,
      () => {
        expect(datetimeformatter.date2String(timestamp, fmt)).toBe("2021-04-20 18:20:46");
      }
    );
  });
});