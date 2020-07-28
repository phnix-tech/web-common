# CSS Modules

_当项目规模变得越来越庞大时，当团队开发成员数越来越多时，前端样式处理也会面临**命名、样式冲突、修改困难**等一些列问题。那有什么样的解决方案吗？CSS Module是一个尝试。_

# 什么是CSS Modules？
_A **[CSS Module](https://github.com/css-modules/css-modules)** is a CSS file in which all class names and animation names are scoped locally by default._  
CSS模块是在CSS基础上扩展了作用域和模块功能，默认下CSS文件中的类名都是局部作用域，在JS import/require语法上导出一个JS对象，通过JS对象来访问CSS class。

# 配置
CSS Modules提供各种[插件](https://github.com/css-modules/css-modules/blob/master/docs/get-started.md)，本文使用webpack提供的[css-loader](https://github.com/webpack-contrib/css-loader#modules)讲解。  
webpack.config.js
```javascript
module.exports = {
  module: {
    rules: [
      {
        test: /\.module\.css$/i,
        loader: "css-loader",
        options: {
          modules: true
        }
      }
    ]
  }
};
```
modules选项可以为Boolean|String|Object，默认下模块选项值为false是关闭的，将其设置为true即可开启CSS Module。

**Modules String**  
开启CSS Module，同时设置它的mode，local|global, `module: "local"`等同于`module: true`  

**Modules Object**
开启CSS Module，同时设置更多选项。

| option | type | default | desc |
| ----   | ---- | ----    | ---- |
| mode   | string | local | 作用域模式 |
| localIdentName | string | [hash:base64] | class name输出格式 |
| context | string | undefined | |
| sourceMap | boolean | false | 输出或者不输出css source map |
| localsConvention | string | undefined | class name输出名字命名风格 |

**localIdentName**一般按照开发环境和正式环境配置两套，比如  
* 开发环境：`[path][name]__[local]`，`[local]`表示原始类名。 
* 正式环境：`[hash:base64]`  

**localsConvention**默认导出的类名格式按照样式文件中写的名字直接导出，比如  
```css
.app-logo {
    height: 50px;
}
.appHeader {
    height: 80px;
    display: flex;
    align-items: center;
    justify-content: center;
}
.SiderLeft {
    position: absolute;
    top: 0;
    bottom: 0;
    width: 300px;
    padding: 80px 10px 50px;
    overflow-y: auto;
}
```
```javascript
import Styles from "./App.module.css";
// Styles object contains three keys: app-logo, appHeader, SiderLeft
```

其它可选值：camelCase, camelCaseOnly, dashes, dashesOnly.

# 用法

## 命名
官方推荐**camelCase驼峰**命名，而不要用css原生的kebab-casing(中线连接多个单词)命名，因为导出的CSS Module对象不能通过点语法访问带中线的key，除非通过对象方括号语法，但是点语法更清晰，比如`Styles["app-logo"]` v.s `Styles.AppHeader`

## Scope
**:local，:local(...)**，默认下样式文件中的所有class都是局部作用域。  
**:global，:global(...)**，也可以定义全局作用域class，也就是按照普通css处理。  
这两种语法有什么区别吗？为什么会有这两种语法？

## Composition
class name组合，类似html class属性书写多个class，在CSS Module中通过**composes**来实现。composes可以单行多个class或者多行。
```scss
.AppLogo {
    height: 50px;
}

.AppHeader {
    height: 80px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: calc(10px + 2vmin);

    composes: AppLogo;
}
```

## Dependencies
通过**composes** import导入其它模块的class name，导入global class name。
```scss
# Common.module.scss
.pr {
    position: relative;
}

.ib {
    display: inline-block;
}

:global {
    .x-ohn {
        overflow: hidden;
    }
}
# Test.module.scss
.container {
    background-color: #fc9b00;
    padding: 10px;

    composes: pr from "./Common.module.scss";
    composes: x-ohn from global;
}
```

## Values
通过 **@value** 定义变量
```scss
@value v-fontSize: 20px;
@value s-black: BlackSelector;
@value m-large: (max-width: 960px);

.Header {
    font-size: v-fontSize;
}

.s-black {
    color: #000;
}

@media m-large {
    .Header {
        font-size: 16px;
    }
}
```
变量引用
```scss
// 单个变量引用
@value v-fontSize from "./Common.module.scss";
// 整体引用
@value Common: "./Common.module.scss";
// @value v-FontSize from Common;
// 变量解构，变量名字需要保持一致
@value v-color, v-borderRadius from Common;

.itemBox {
    line-height: 30px;

    // 嵌套class会被flat拉平，但是在输出的style中是嵌套的
    .item {
        padding: 0 5px;
        border: 1px solid #0f0f0f;
        border-top-width: 0;
        // 使用变量
        font-size: v-fontSize;
        color: v-color;
        border-radius: v-borderRadius;

        &:first-child {
            border-top-width: 1px;
        }
    }
}
```


# 参考连接
* [css模块化及CSS Modules使用详解 - https://blog.csdn.net/xiangzhihong8/article/details/53195926](https://blog.csdn.net/xiangzhihong8/article/details/53195926)
* [CSS Modules入门Ⅰ：它是什么？为什么要使用它？ - https://zhuanlan.zhihu.com/p/23571898](https://zhuanlan.zhihu.com/p/23571898)
* [CSS Modules 用法教程 - http://www.ruanyifeng.com/blog/2016/06/css_modules.html](http://www.ruanyifeng.com/blog/2016/06/css_modules.html)
* [css-modules - https://github.com/css-modules/css-modules](https://github.com/css-modules/css-modules)
* [What are CSS Modules and why do we need them? - https://css-tricks.com/css-modules-part-1-need/](https://css-tricks.com/css-modules-part-1-need/)