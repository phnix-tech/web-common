const
  fs = require("fs"),
  path = require("path"),
  // 相对路径都以项目根路径为基准
  // build output dir
  origResPath = "./dist",
  // common module source path
  commonSrcPath = "../common/src",
  // common module output dir
  commonDestPath = "./src/common";

let
  _fse,
  _logging,
  _functions,
  // project root path
  _dirname;

/**
 * clean up build output files
 */
function clean () {
  _logging.log("==============clean up build output files==============");

  [
    origResPath
  ].forEach(dir => {
    dir = path.join(_dirname, dir);
    if (fs.existsSync(dir)) {
      _logging.info("remove directory", dir);
      _functions.rmdir(dir);
    }
  });

  _logging.log("==============clean up build output files DONE==============");
}

/**
 * cause of babel plugin dependence issue
 * we copy common modules to project src directory
 */
function copyCommonModules () {
  const
    src = path.join(_dirname, commonSrcPath),
    dest = path.join(_dirname, commonDestPath);

  _logging.info("copy", src, "===>", dest);
  _fse.copySync(src, dest);
}

function copyResources () {
  _logging.info("==============copy resource files==============");
  copyCommonModules();
  _logging.info("==============copy resource files DONE==============");
}

function setup ({
  fse,
  logging,
  functions,
  dirname
}) {
  _fse = fse;
  _logging = logging;
  _functions = functions;
  _dirname = dirname;
  _logging.log(`Current working dir: ${process.cwd()}`);
}

module.exports = {
  setup,
  clean,
  copyCommonModules,
  copyResources
};
