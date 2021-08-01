import path from "path";
import fs from "fs";

const projectRoot = path.join(__dirname, "..");
// 需要转换exports.default为module.exports的文件
const srcList = ["env", "resolve", "utils/logging/index"];

/**
 * 添加`module.exports`支持.
 * 注：`module.exports`只能包含默认导出语句，不能包含其它导出，不然添加`module.exports`后其它导出会失效.
 * 
 * @param src 
 * @see https://www.npmjs.com/package/babel-plugin-add-module-exports
 */
function addModuleExportsEnv (src: string) {
  const srcFilePath = path.join(projectRoot, "lib", `${src}.js`);
  let sourceCode = fs.readFileSync(srcFilePath, {encoding: "utf-8"});

  // 必须包含exports.default
  if (!/exports(\.default|\[["'`]default["'`]\])\s*=\s*\w+/.test(sourceCode)) {
    throw new Error(`add module exports MUST contain exports.default, ${srcFilePath}`);
  }

  // 不能包含其它导出语句
  const exportMatch = sourceCode.replace(/exports\.default\s*=\s*\w+\s*;/, "").match(/exports\.(\w+)\s*=\s*\w+/);
  if (exportMatch) {
    throw new Error(
      `add module exports MUST NOT contain other export: exports.${exportMatch[1]}` +
      `, except exports.default, ${srcFilePath}`
    );
  }

  const exportsDefault = "module.exports = exports.default;";
  if (sourceCode.indexOf(exportsDefault) === -1) {
    // module.exports = exports.default;
    sourceCode += "\n";
    sourceCode += exportsDefault;
    fs.writeFileSync(srcFilePath, sourceCode, {encoding: "utf-8"});
  }

  const declarationFilePath = path.join(projectRoot, "lib", `${src}.d.ts`);
  // es module export default to commonjs export = 类型申明支持
  let declarationCode = fs.readFileSync(declarationFilePath, {encoding: "utf-8"});
  if (!/export\s*=\s*\w+/.test(declarationCode)) {
    declarationCode = declarationCode.replace(/export default (\w+)/, "export = $1");
    fs.writeFileSync(declarationFilePath, declarationCode, {encoding: "utf-8"});
  }
}

srcList.forEach(src => addModuleExportsEnv(src));