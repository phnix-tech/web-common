import {isEmail} from "./index";

describe("validate email", () => {
  it("should be true when pass valid emails", () => {
    expect(isEmail("jefy.lee@garmin.com")).toBeTruthy();
    expect(isEmail("jefy.lee@126.co")).toBeTruthy();
    expect(isEmail("lizhihui@owinfo.net")).toBeTruthy();
    expect(isEmail("li.zhihui35@iwhalecloud.com")).toBeTruthy();
  });

  it("should be false when pass invalid emials", () => {
    expect(isEmail("jefy.lee")).toBeFalsy();
    expect(isEmail("jefy.lee@")).toBeFalsy();
    expect(isEmail("jefy.lee@126")).toBeFalsy();
  });
});