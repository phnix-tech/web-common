/**
 * @see http://typedoc.org/guides/options/#configuration-options
 */
module.exports = {
  includeVersion: true,
  entryPoints: ["./src"],
  // 排除测试文件
  exclude: [
    "**/*+(.test|.spec).ts",
    "**/*+(.test|.spec).tsx"
  ],
  out: "docs"
};