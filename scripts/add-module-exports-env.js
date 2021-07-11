const path = require("path");
const fs = require("fs");
// https://babeljs.io/docs/en/babel-core
const babel = require("@babel/core");
const cfg = require("../babel.config");

const projectRoot = path.join(__dirname, "..");
const src = path.join(projectRoot, "es/env.js");
const dest = path.join(projectRoot, "lib/env.js");
const envDeclaration = path.join(projectRoot, "lib/env.d.ts");

function addModuleExportsEnv () {
  const {code} = babel.transformFileSync(src, cfg);
  fs.writeFileSync(dest, code, {encoding: "utf-8"});

  // commonjs export = env类型申明支持
  let envDeclarationContent = fs.readFileSync(envDeclaration, {encoding: "utf-8"});
  envDeclarationContent += "export = env;";
  fs.writeFileSync(envDeclaration, envDeclarationContent, {encoding: "utf-8"});
}

addModuleExportsEnv();