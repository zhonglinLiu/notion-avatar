const { i18n } = require('./next-i18next.config');
const withPWA = require('next-pwa')
const runtimeCaching = require('next-pwa/cache')

const isProd = process.env.NODE_ENV === "production";

function getBasePath() {
  var basePath = "";

  if (isProd && process.env.BASE_PATH) {
    if (process.env.BASE_PATH.startsWith("/")) {
      basePath = process.env.BASE_PATH;
    } else {
      basePath = "/" + process.env.BASE_PATH;
    }
  }

  return basePath;
}
module.exports = withPWA(
  {
    i18n,
    reactStrictMode: true,
    pwa: {
      dest: 'public',
      runtimeCaching,
    },
    webpack: config => {
      config.module.rules.push({
        test: /\.svg$/,
        use: 'raw-loader',
      });
      return config;
    },
    // assetPrefix: getBasePath(), //加前缀
    basePath: getBasePath(), //node 
  }
);
