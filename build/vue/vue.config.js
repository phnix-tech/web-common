const
  logging = require("gs-common/fe/Logging"),
  env = require("../env"),
  resolve = require("../resolve"),
  proxycfg = require("../proxycfg");

const config = require(resolve("./build/config"));

/**
 * @param {string} aliasPath
 * @param {string|undefined} apiPrefix - api请求前缀，默认`^/api/`
 * @see https://cli.vuejs.org/zh/config/
 */
module.exports = function ({
  aliasPath = resolve("./src"),
  apiPrefix = undefined
} = {}) {

  let devServer;
  if (env.isDev()) {
    const proxyTable = proxycfg.proxyTable({}, {
      dftApiPrefix: apiPrefix
    });
    logging.info("proxy config");
    logging.info(proxyTable);

    devServer = {
      proxy: {
        ...proxyTable
      }
    };
  }

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
            env.isProd() ? {
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
    devServer
  };
};
