const path = require("path");
const webpack = require("webpack");
const {
  readdirSync,
  existsSync,
  createFileSync,
  writeFileSync
} = require("fs-extra");

const HtmlWebpackPlugin = require("html-webpack-plugin");
const ScriptExtHtmlWebpackPlugin = require("script-ext-html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const TARGET_PROJECT_PATH = process.cwd();
const packageInfo = require(path.resolve(
  TARGET_PROJECT_PATH,
  "./package.json"
));
const customInclude = packageInfo.include || [];
const pageTitlesMap = packageInfo.pages || {};

const customBrowsers = packageInfo.browsers || [];
const commonChunks = (packageInfo.commonChunks || []).concat([
  "preact",
  "style-loader",
  "css-loader",
  "axios",
  "process",
  "regenerator-runtime",
  "core-js"
]);
const commonChunksReg = new RegExp(`[\\/](${commonChunks.join("|")})[\\/]`);
const serviceWorker = packageInfo.ServiceWorker ? `
if ('serviceWorker' in navigator) {
  if (new RegExp(${packageInfo.ServiceWorker}).test(navigator.userAgent)) {
    window.addEventListener('load', function() {
      navigator.serviceWorker.register('/sw.js').then(function(reg) {
        console.log('service worker 注册完成', reg);
        setInterval(reg.update, 300000)
      }, function(err) {
        console.log('注册失败', err);
      });
    });
  }
}
` : ``
const genEntry = (appJsPath, pageName) => {
  let entryContent = "";
  if (process.env.BUILD_CONTAINER === "h5plus") {
    entryContent = `
      const isH5Plus = navigator.userAgent.indexOf('Html5Plus') > -1;
      const isH5PlusLocalPath = window.location.href.indexOf('http') < 0;
      if (isH5Plus && isH5PlusLocalPath) {
        const plusReady = () => {
          let quitWarning = false;
          window.plus.key.addEventListener('backbutton', () => {
            if (window.location.href.indexOf('index.html') > -1) {
              if (quitWarning) {
                window.plus.runtime.quit();
              } else {
                quitWarning = true;
                setTimeout(() => {
                  quitWarning = false;
                }, 2000);
                window.plus.nativeUI.toast('再按一次退出应用');
                return false;
              };
            } else {
              window.plus.webview.currentWebview().close('auto');
              return false;
            };
          }, false);
        };
        if (window.plus) {
          plusReady();
        } else {
          document.addEventListener('plusready', plusReady, false)
        };
      };
    `;
  }
  if (process.env.BUILD_TARGET !== "local") {
    entryContent += `
    const title = (window.location.search.substr(1).match(/(^|&)_t=([^&]*)(&|$)/) || [])[2]
    document.title = title ? decodeURIComponent(title) : '${pageTitlesMap[pageName]}'
    ${serviceWorker}
    const { h, render } = require('preact');
    let App = require('${appJsPath}')
      .default;
    let root = document.getElementById('app');
    if (typeof App === 'function') {
      render(h(App), root || document.body);
    };
      `;
  } else {
    entryContent += `
    const title = (window.location.search.substr(1).match(/(^|&)_t=([^&]*)(&|$)/) || [])[2]
    document.title = title ? decodeURIComponent(title) : '${pageTitlesMap[pageName]}'
    ${serviceWorker}
    const { h, render } = require('preact');
    require('preact/debug');
    let App = require('${appJsPath}')
      .default;
    if (typeof App === 'function') {
      let init = () => {
        let _app = require('${appJsPath}')
          .default;
        let root = document.getElementById('app');
        render(h(_app), root || document.body);
      };
      if (module.hot)
        module.hot.accept(
          '${appJsPath}',
          init
        );
      init();
    };
      `;
  }
  const pageOnEntryHandlerPath = path.resolve(appJsPath, "../entry.js");
  if (existsSync(pageOnEntryHandlerPath)) {
    // 提供了页面级的OnEntryHandler
    entryContent += `const onEntryHandler = require('${pageOnEntryHandlerPath}').default;onEntryHandler();`;
  } else {
    const commonOnEntryHandlerPath = path.resolve(
      TARGET_PROJECT_PATH,
      "./src/entry.js"
    );
    if (existsSync(commonOnEntryHandlerPath)) {
      entryContent += `const onEntryHandler = require('${commonOnEntryHandlerPath}').default;onEntryHandler();`;
    }
  }

  const entryFilePath = path.resolve(__dirname, `./entries/${pageName}.js`);
  createFileSync(entryFilePath);
  writeFileSync(entryFilePath, entryContent);
  return entryFilePath;
};
const getEntries = dir => {
  const pagesDir = path.resolve(process.cwd(), dir);
  let entry = {};
  readdirSync(pagesDir).forEach(file => {
    entry[file] = genEntry(path.join(pagesDir, file, "app.js"), file);
  });
  return entry;
};
const entries = getEntries("./src/pages");
const customTemplate = path.resolve(TARGET_PROJECT_PATH, "./template.html");
const HtmlWebpackPlugins = Object.keys(entries).map(
  k =>
    new HtmlWebpackPlugin({
      multihtmlCache: true,
      title: pageTitlesMap[k] || k,
      filename: `${k}.html`,
      inject: 'head',
      templateParameters: (compilation, assets, assetTags, options) => {
        return {
          compilation,
          webpackConfig: compilation.options,
          htmlWebpackPlugin: {
            tags: assetTags,
            files: assets,
            options
          },
          'DEBUG': packageInfo.debug || process.env.DEBUG
        };
      },
      template: existsSync(customTemplate)
        ? customTemplate
        : path.resolve(__dirname, "./template.html"),
      chunks: ["common", k]
    })
);
module.exports = {
  entry: entries,
  output: {
    path: path.resolve(process.cwd(), "dist"),
    filename: "[name].[chunkhash].bundle.js" // string
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              modules: {
                localIdentName: "[local]__[hash:base64:5]"
              },
              importLoaders: 1
            }
          },
          {
            loader: "postcss-loader",
            options: {
              plugins: [
                require("postcss-preset-env")({
                  browsers: ["last 2 versions"].concat(customBrowsers)
                }),
                require("cssnano")({
                  preset: "default"
                })
              ]
            }
          }
        ]
      },
      {
        test: /\.(svg|woff2?|ttf|eot|jpe?g|png|webp|gif|mp4|mov|ogg|webm)(\?.*)?$/i,
        loader: "file-loader"
      },
      {
        test: /\.jsx?$/,
        include: [path.resolve(TARGET_PROJECT_PATH, "./src")].concat(
          customInclude.map(packageName =>
            path.resolve(TARGET_PROJECT_PATH, `./node_modules/${packageName}`)
          )
        ),
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              [
                "@babel/preset-env",
                {
                  useBuiltIns: "usage",
                  corejs: 3,
                  modules: false,
                  targets: {
                    browsers: ["last 2 versions"].concat(customBrowsers)
                  }
                }
              ]
            ],
            plugins: [
              "@babel/plugin-syntax-dynamic-import",
              [
                "@babel/plugin-proposal-decorators",
                {
                  legacy: true
                }
              ],
              [
                "@babel/plugin-proposal-class-properties",
                {
                  loose: true
                }
              ],
              [
                "@babel/plugin-proposal-object-rest-spread",
                {
                  useBuiltIns: true
                }
              ],
              "babel-plugin-transform-export-extensions",
              "@babel/plugin-transform-react-constant-elements",
              [
                "@babel/plugin-transform-react-jsx",
                {
                  pragma: "h"
                }
              ]
            ]
          }
        }
      }
    ]
  },
  plugins: [
    ...HtmlWebpackPlugins,
    new ScriptExtHtmlWebpackPlugin({
      defaultAttribute: "defer"
    }),
    new webpack.DefinePlugin({
      $BUILD_TARGET$: JSON.stringify(process.env.BUILD_TARGET),
      $P_2_R_BASE$: JSON.stringify(packageInfo.p2rBase || 750)
    }),
    new CleanWebpackPlugin()
  ],
  optimization: {
    splitChunks: {
      cacheGroups: {
        common: {
          chunks: "all",
          test: commonChunksReg,
          name: "common"
        }
      }
    }
  },
  resolve: {
    modules: [
      "node_modules",
      path.resolve(TARGET_PROJECT_PATH, "./node_modules"),
      path.resolve(
        TARGET_PROJECT_PATH,
        "./node_modules/@ruiyun/h666-cli/node_modules"
      )
    ],
    alias: {
      react: "preact/compat",
      "react-dom": "preact/compat",
      "react-addons-css-transition-group": "preact-css-transition-group"
    }
  },
  resolveLoader: {
    modules: [
      path.resolve(TARGET_PROJECT_PATH, "./node_modules"),
      path.resolve(
        TARGET_PROJECT_PATH,
        "./node_modules/@ruiyun/h666-cli/node_modules"
      )
    ]
  }
};
