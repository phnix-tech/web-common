import {isUrl} from "./index";

describe("validate url", () => {
  it("should be true when pass valid urls", () => {
    expect(isUrl("https://localhost:8081")).toBeTruthy();
    expect(isUrl("file:///Users/admin/docs/whale/%E7%A6%8F%E8%8C%B6%E9%A1%B9%E7%9B%AE/b2b/%E7%A6%8F%E8%8C%B6WebB2B%207.20/index.html#artboard18")).toBeTruthy();
    expect(isUrl("http://typedoc.org/")).toBeTruthy();
    // with query search
    expect(isUrl("https://mbd.baidu.com/newspage/data/landingsuper?context=%7B%22nid%22%3A%22news_10286082276125762841%22%7D&n_type=0&p_from=1")).toBeTruthy();
    // with hash
    expect(isUrl("http://typedoc.org/api/interfaces/TypeDocOptionMap.html#gitRevision")).toBeTruthy();
  });

  it("should be false when pass invalid urls", () => {
    // 错误的协议
    expect(isUrl("htt://sports.garmin.cn:8081")).toBeFalsy();
    // 无协议
    expect(isUrl("gitee.com")).toBeFalsy();
  });
});