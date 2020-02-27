const webpack = require("webpack");
const path = require("path");
const {
  readdirSync,
  writeFileSync,
  readFileSync,
  existsSync
} = require("fs-extra");

module.exports = function(buildTarget, container, profile) {
  if (typeof buildTarget !== "string") {
    buildTarget = "production";
  }
  if (container === "h5plus") {
    process.env.BUILD_CONTAINER = container;
  }
  process.env.BUILD_TARGET = buildTarget;
  let webpackConfig = require("../webpack/config");
  webpackConfig.mode = "production";
  webpack(webpackConfig, (err, stats) => {
    if (err || stats.hasErrors()) {
      console.log(err || stats);
    } else {
      if (profile) {
        writeFileSync(
          path.resolve(process.cwd(), profile),
          JSON.stringify(stats.toJson())
        );
      } else {
        console.log(
          stats.toString({
            chunks: true, // Makes the build much quieter
            colors: true // Shows colors in the console
          })
        );
        const swPathCustom = path.resolve(process.cwd(), "./sw.js");
        const swPathDefault = path.resolve(__dirname, "../webpack/sw.js");
        const swPath = existsSync(swPathCustom) ? swPathCustom : swPathDefault
        const packageInfo = require(path.resolve(
          process.cwd(),
          "./package.json"
        ));
        // 开启了servcie worker
        if (packageInfo.ServiceWorker) {
          const distDir = path.resolve(process.cwd(), "./dist");
          const hashMap = {};
          readdirSync(distDir).forEach(file => {
            const matched = file.match(/(.+)\.(.+)\.bundle\.js/);
            if (matched) {
              hashMap[matched[1]] = matched[2];
            }
          });
          const swTemplate = readFileSync(swPath, { encoding: "utf-8" });
          writeFileSync(
            path.resolve(process.cwd(), "./dist/sw.js"),
            swTemplate.replace(
              `"__APP_PAGES_HASH_MAP_PLACEHOLDER__"`,
              JSON.stringify(hashMap)
            )
          );
        }
      }
      console.log("build success");
    }
  });
};
