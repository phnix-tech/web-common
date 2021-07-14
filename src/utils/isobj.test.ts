import isobj from "./isobj";

test("{} is object type", () => {
  expect(isobj({})).toBe(true);
});

test("string \"jest\" is not object type", () => {
  expect(isobj("jest")).toBe(false);
});

test("number 1 is not object type", () => {
  expect(isobj(1)).toBe(false);
});

test("boolean false is not object type", () => {
  expect(isobj(false)).toBe(false);
});