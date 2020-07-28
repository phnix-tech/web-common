const
  fn = require("gs-common/functions"),
  logging = require("gs-common/fe/Logging"),
  resolve = require("./resolve"),
  config = require(resolve("./build/config")),
  file = resolve(`./dist/${config.outputName}.tgz`);

fn.createMeta(`./dist/${config.outputName}/meta.json`);

fn.tar.create({
  file,
  gzip: true,
  cwd: resolve("./dist")
}, [config.outputName]);

logging.info(file);
