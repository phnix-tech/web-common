const
  env = require("../env"),
  resolve = require("../resolve"),
  proxycfg = require("../proxycfg"),
  logFn = require("../logFn");

const config = require(resolve("./build/config"));

/**
 * @param {string} aliasPath
 * @param {string|undefined} apiPrefix - api请求前缀，默认`^/api/`
 * vue cli proxy path为正则表达式格式字符串
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
    logFn({proxyTable});

    devServer = {
      proxy: {
        ...proxyTable
      }
    };
  }

  logFn({aliasPath});

  // https://webpack.js.org/configuration/output/#outputpublicpath
  const publicPath = config.publicPath;
  logFn({publicPath});

  const outputDir = resolve(`./dist/${config.outputName}`);
  logFn({outputDir});

  return {
    publicPath,
    outputDir,
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
