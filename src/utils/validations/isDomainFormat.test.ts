import {isDomain} from "./index";

describe("validate domail", () => {
  it("should be true when pass valid domains", () => {
    expect(isDomain("localhost.com")).toBeTruthy();
    expect(isDomain("test.localhost.com")).toBeTruthy();
    expect(isDomain("test-1.localhost.com")).toBeTruthy();
  });

  it("should be false when pass invalid domains", () => {
    expect(isDomain("https://localhost:8081")).toBeFalsy();
    expect(isDomain("//localhost:8081")).toBeFalsy();
    // 不能包含除了字母数字中线之外的其它符号
    expect(isDomain("test-1!.localhost.com")).toBeFalsy();
  });
});