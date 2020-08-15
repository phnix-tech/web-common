const
  paths = require("react-scripts/config/paths"),
  logging = require("gs-common/fe/Logging"),
  resolve = require("../resolve"),
  proxycfg = require("../proxycfg");

const bldCfg = require(resolve("./build/config"));
const {publicPath} = bldCfg;

// 修改CRA build输出目录
// https://segmentfault.com/q/1010000019904178/
paths.appBuild = resolve(`dist/${bldCfg.outputName}`);

function webpack (config) {
  // 解决tsconfig paths别名丢失问题
  // 添加IDE对于模块别名智能识别支持
  // https://blog.csdn.net/chrislincp/article/details/97312235
  // https://www.typescriptlang.org/v2/en/tsconfig#paths
  config.resolve.alias = {
    "@": resolve("./src")
  };

  // 开启babelrc
  // https://blog.csdn.net/weixin_39836173/article/details/86110011
  // https://github.com/ant-design/babel-plugin-import
  if (config.module && config.module.rules) {
    let rule = config.module.rules[2];
    rule = rule.oneOf && rule.oneOf[1];

    if (rule && rule.options) {
      rule.options.babelrc = true;
    }
  }

  // 使用相对路径引用资源文件, 默认为`/`
  if (publicPath) {
    config.output.publicPath = publicPath;
  }

  return config;
}

// react-scripts默认打开根地址`/`
const WebpackDevServerUtils = require("react-dev-utils/WebpackDevServerUtils");
const {prepareUrls} = WebpackDevServerUtils;
WebpackDevServerUtils.prepareUrls = function (protocol, host, port) {
  const urls = prepareUrls.apply(prepareUrls, arguments);
  if (
    publicPath &&
    publicPath !== "/" &&
    /^\//.test(publicPath)
  ) {
    const url = publicPath.replace(/^\//, "");
    // 支持浏览器打开publicPath url
    urls.lanUrlForTerminal = urls.lanUrlForTerminal + url;
    urls.localUrlForTerminal = urls.localUrlForTerminal + url;
    urls.localUrlForBrowser = urls.localUrlForBrowser + url;
  }

  if (
    urls.lanUrlForConfig &&
    !/^[a-zA-Z]+:\/\//.test(urls.lanUrlForConfig)
  ) {
    // lanUrlForConfig为IP地址，转换为location.origin格式
    urls.lanUrlForConfig = `${protocol}://${urls.lanUrlForConfig}:${port}`;
  }
  return urls;
};

/**
 * create-react-app配置重写
 * @param {string|undefined} apiPrefix api请求前缀，默认`/api`
 * @see https://github.com/timarney/react-app-rewired
 */
module.exports = function ({
  apiPrefix = undefined
} = {}) {
  return {
    // The Webpack config to use when compiling your react app for development or production.
    webpack,

    devServer (configFunction) {
      // 统一vue config proxy格式
      if (apiPrefix && !/^\^/.test(apiPrefix)) {
        apiPrefix = "^" + apiPrefix;
      }
      const proxyTable = proxycfg.proxyTable({}, {
        dftApiPrefix: apiPrefix
      });
      logging.info("proxy config");
      logging.info(proxyTable);

      // Return the replacement function for create-react-app to use to generate the Webpack
      // Development Server config. "configFunction" is the function that would normally have
      // been used to generate the Webpack Development server config - you can use it to create
      // a starting configuration to then modify instead of having to create a config from scratch.
      return function (proxy, allowedHost) {
        // https://webpack.js.org/configuration/dev-server/#devserverproxy
        proxy = {};
        // webpack-dev-server proxy不支持正则表达式
        Object.keys(proxyTable).forEach(key => {
          proxy[key.replace(/^\^/, "")] = proxyTable[key];
        });
        // Create the default config by calling configFunction with the proxy/allowedHost parameters
        const config = configFunction(proxy, allowedHost);
        // react-scripts开发服务器默认强制serve在根地址`/`
        if (publicPath) {
          // webpack dev server publicPath必须为绝对路径
          // https://webpack.js.org/configuration/dev-server/#devserverpublicpath-
          config.publicPath = publicPath.replace(/^\.\/?/, "/");
        }
        logging.info("webpack dev server config", config);

        // Return your customised Webpack Development Server config.
        return config;
      };
    }
  };
};
