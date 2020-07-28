const
  logging = require("gs-common/fe/Logging"),
  resolve = require("./resolve"),
  proxyTable = require("./proxycfg").proxyTable({});

logging.info("proxy config");
logging.info(proxyTable);

const config = require(resolve("./build/config"));

/**
 * @see https://cli.vuejs.org/zh/config/
 */
module.exports = function ({
  aliasPath = resolve("src/")
} = {}) {

  logging.info(`@/- alias path ${aliasPath}`);

  const outputDir = resolve(`./dist/${config.outputName}`);
  logging.info("outputDir", outputDir);

  return {
    outputDir,
    // https://webpack.js.org/configuration/output/#outputpublicpath
    publicPath: config.publicPath,
    lintOnSave: false,
    configureWebpack: {
      resolve: {
        extensions: [".js", ".json", ".vue"],
        alias: {
          "@": aliasPath,
          "-": aliasPath
        }
      }
    },
    // https://cli.vuejs.org/zh/guide/css.html#css-modules
    css: {
      requireModuleExtension: true,
      loaderOptions: {
        css: {
          ...(
            process.env.NODE_ENV === "production" ? {
              modules: {
                // https://github.com/webpack-contrib/css-loader#localidentname
                // 自定义生产环境样式名称格式
                localIdentName: "[hash:base64]"
              }
            } : {}
          )
        }
      }
    },
    devServer: {
      proxy: {
        ...proxyTable
      }
    }
  };
};
