import uuid from "./uuid";

describe("uuid tests", () => {
  it("should match", () => {
    // 8位数字小写字母-4位数字小写字母-3位数字小写字母-4位数字小写字母-12位数字小写字母
    const pattern = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[0-9a-f]{4}-[0-9a-f]{12}$/;
    // 3d94e4dd-9576-45de-8b29-1c9a10d38e4b
    expect(uuid()).toMatch(pattern);
    // CA-9c28505a-c614-4336-9e90-1825d4f87685
    expect(uuid("CA-")).toMatch(/^CA-[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[0-9a-f]{4}-[0-9a-f]{12}$/);
  });
});