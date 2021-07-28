import {getURLParameter, removeURLParameter, replaceURLParameter} from "./index";

describe("url functions ", () => {
  const url = "/foo?t&t1=&t2&f=1&foo=&foo1";

  describe("#getURLParameter", () => {
    it("should get prospective parameter value", () => {
      expect(getURLParameter("f", url)).toBe("1");
      expect(getURLParameter("foo", url)).toBe("");
      expect(getURLParameter("foo1", url)).toBe("");
      expect(getURLParameter("foo2", url)).toBe(null);
    });
  });

  describe("#replaceURLParameter", () => {
    it("should be equal after replace url parameter", () => {
      expect(replaceURLParameter("foo", "test", url)).toBe("/foo?t&t1=&t2&f=1&foo=test&foo1");
      expect(replaceURLParameter("foo2", "haha", url)).toBe("/foo?t&t1=&t2&f=1&foo=&foo1&foo2=haha");
      expect(replaceURLParameter("key", "plan", "/foo")).toBe("/foo?key=plan");
    });
  });

  describe("#removeURLParameter", () => {
    it("should be equal after remove url parameter", () => {
      expect(removeURLParameter("foo", url)).toBe("/foo?t&t1=&t2&f=1&foo1");
      expect(removeURLParameter("f", url)).toBe("/foo?t&t1=&t2&foo=&foo1");
      expect(removeURLParameter("foo1", url)).toBe("/foo?t&t1=&t2&f=1&foo=");

      expect(removeURLParameter("f", "/foo?f=1")).toBe("/foo");
      expect(removeURLParameter("f", "/foo?f=1&k=test")).toBe("/foo?k=test");

      expect(removeURLParameter("t", url)).toBe("/foo?t1=&t2&f=1&foo=&foo1");
      expect(removeURLParameter("t1", url)).toBe("/foo?t&t2&f=1&foo=&foo1");
      expect(removeURLParameter("t2", url)).toBe("/foo?t&t1=&f=1&foo=&foo1");

      // onlyOneParam
      expect(removeURLParameter("onlyOneParam", "/foo?onlyOneParam")).toBe("/foo");
    });
  });
});