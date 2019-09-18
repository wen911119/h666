const path = require('path')
const webpack = require('webpack')
const {
  readdirSync,
  existsSync,
  createFileSync,
  writeFileSync
} = require('fs-extra')

const ip = require('ip')
const HtmlWebpackPlugin = require('html-webpack-plugin-for-multihtml')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const TARGET_PROJECT_PATH = process.cwd()
const packageInfo = require(path.resolve(TARGET_PROJECT_PATH, './package.json'))
const customInclude = packageInfo.include || []
const customBrowsers = packageInfo.browsers || []
const commonChunks = (packageInfo.commonChunks || []).concat([
  'preact',
  'style-loader'
])
const commonChunksReg = new RegExp(`[\\/](${commonChunks.join('|')})[\\/]`)
const genEntry = (appJsPath, pageName) => {
  let entryContent
  if (process.env.BUILD_TARGET !== 'local') {
    entryContent = `
    const { h, render } = require('preact');
    let App = require('${appJsPath}')
      .default;
    let root = document.getElementById('app');
    if (typeof App === 'function') {
      render(h(App), root || document.body);
    };
      `
  }
  else {
    entryContent = `
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
      `
  }
  const pageOnEntryHandlerPath = path.resolve(appJsPath, '../entry.js')
  if (existsSync(pageOnEntryHandlerPath)) {
    // 提供了页面级的OnEntryHandler
    entryContent += `const onEntryHandler = require('${pageOnEntryHandlerPath}').default;onEntryHandler();`
  }
  else {
    const commonOnEntryHandlerPath = path.resolve(
      TARGET_PROJECT_PATH,
      './src/entry.js'
    )
    if (existsSync(commonOnEntryHandlerPath)) {
      entryContent += `const onEntryHandler = require('${commonOnEntryHandlerPath}').default;onEntryHandler();`
    }
  }

  const entryFilePath = path.resolve(__dirname, `./entries/${pageName}.js`)
  createFileSync(entryFilePath)
  writeFileSync(entryFilePath, entryContent)
  return entryFilePath
}
const getEntries = dir => {
  const pagesDir = path.resolve(process.cwd(), dir)
  let entry = {}
  readdirSync(pagesDir).forEach(file => {
    entry[file] = genEntry(path.join(pagesDir, file, 'app.js'), file)
  })
  return entry
}
const entries = getEntries('./src/pages')
const pageTitlesMap = packageInfo.pages || {}
const customTemplate = path.resolve(TARGET_PROJECT_PATH, './template.html')
const HtmlWebpackPlugins = Object.keys(entries).map(
  k =>
    new HtmlWebpackPlugin({
      multihtmlCache: true,
      title: pageTitlesMap[k] || k,
      filename: `${k}.html`,
      template: existsSync(customTemplate)
        ? customTemplate
        : path.resolve(__dirname, './template.html'),
      chunks: ['common', k]
    })
)
module.exports = {
  entry: entries,
  output: {
    path: path.resolve(process.cwd(), 'dist'),
    filename: '[chunkhash].bundle.js' // string
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: {
                localIdentName: '[local]__[hash:base64:5]'
              },
              importLoaders: 1
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              plugins: [
                require('postcss-preset-env')({
                  browsers: ['last 2 versions'].concat(customBrowsers)
                }),
                require('cssnano')({
                  preset: 'default'
                })
              ]
            }
          }
        ]
      },
      {
        test: /\.(svg|woff2?|ttf|eot|jpe?g|png|webp|gif|mp4|mov|ogg|webm)(\?.*)?$/i,
        loader: 'file-loader'
      },
      {
        test: /\.jsx?$/,
        include: [
          path.resolve(TARGET_PROJECT_PATH, './src'),
        ].concat(
          customInclude.map(packageName =>
            path.resolve(TARGET_PROJECT_PATH, `./node_modules/${packageName}`)
          )
        ),
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              [
                '@babel/preset-env',
                {
                  useBuiltIns: 'usage',
                  corejs: 3,
                  modules: false,
                  targets: {
                    browsers: ['last 2 versions'].concat(customBrowsers)
                  }
                }
              ]
            ],
            plugins: [
              '@babel/plugin-syntax-dynamic-import',
              [
                '@babel/plugin-proposal-decorators',
                {
                  legacy: true
                }
              ],
              [
                '@babel/plugin-proposal-class-properties',
                {
                  loose: true
                }
              ],
              [
                '@babel/plugin-proposal-object-rest-spread',
                {
                  useBuiltIns: true
                }
              ],
              'babel-plugin-transform-export-extensions',
              '@babel/plugin-transform-react-constant-elements',
              [
                '@babel/plugin-transform-react-jsx',
                {
                  pragma: 'h'
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
          chunks: 'all',
          test: commonChunksReg,
          name: 'common'
        }
      }
    }
  },
  resolve: {
    modules: [
      'node_modules',
      path.resolve(TARGET_PROJECT_PATH, './node_modules'),
      path.resolve(
        TARGET_PROJECT_PATH,
        './node_modules/@ruiyun/h666-cli/node_modules'
      )
    ],
    alias: {
      react: 'preact/compat',
      'react-dom': 'preact/compat',
      'react-addons-css-transition-group': 'preact-css-transition-group'
    }
  },
  resolveLoader: {
    modules: [
      path.resolve(TARGET_PROJECT_PATH, './node_modules'),
      path.resolve(
        TARGET_PROJECT_PATH,
        './node_modules/@ruiyun/h666-cli/node_modules'
      )
    ]
  }
}
