const fs = require("fs");
const {spawnSync} = require("child_process");
const logging = require("@web-io/build/fe/Logging");

/**
 * build `./src/ts/env.ts` to es and cjs module
 * es module用于前端webpack打包
 * cjs module用于后端nodejs构建
 * 由于nodejs还未正式支持es module所以单独构建env的cjs模块
 */
function main () {
  compileEnv();
  compileEnv("cjs");
}

/**
 *
 * @param {"esm"|"cjs"} type
 */
function compileEnv (type = "esm") {
  clean();
  const module = type === "cjs" ? "commonjs" : "esnext";
  const ext = type === "cjs" ? ".cjs.js" : ".js";
  logging.info(`tsc --target esnext --module ${module} --skipLibCheck ./src/ts/env.ts`);
  // https://nodejs.org/api/child_process.html#child_process_child_process_spawnsync_command_args_options
  const spawnSyncReturns = spawnSync("tsc", [
    // tsc options
    // https://www.typescriptlang.org/docs/handbook/compiler-options.html
    "--target", "esnext",
    "--module", module,
    "--skipLibCheck",
    "./src/ts/env.ts"
  ]);
  handleError(spawnSyncReturns);
  const dest = `./src/env${ext}`;
  fs.copyFileSync("./src/ts/env.js", dest);
  handleOutputFile(dest);
  clean();
}

function handleOutputFile (src) {
  fs.writeFileSync(
    src,
    [
      "/* eslint-disable */",
      "// 这是自动构建生成的文件，请勿单独修改",
      "\n"
    ].join("\n") + fs.readFileSync(src, "utf-8")
  );
}

function handleError (spawnSyncReturns) {
  const {error} = spawnSyncReturns;
  if (error) {
    throw error;
  }
  const {stdout} = spawnSyncReturns;
  if (stdout && stdout.toString()) {
    throw new Error(stdout.toString());
  }
}

function clean () {
  const src = "./src/ts/env.js";
  if (fs.existsSync(src)) {
    fs.unlinkSync(src);
  }
}

main();