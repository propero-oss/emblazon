const path = require("path");
const webpackConfig = require("./webpack.config");

process.env.CHROME_BIN = require("puppeteer").executablePath();

delete webpackConfig.entry;
webpackConfig.target = 'web';

webpackConfig.module.rules.push({
  test: /\.tsx?$/,
  loader: 'istanbul-instrumenter-loader',
  include: path.join(__dirname, 'src'),
  options: {
    esModules: true,
    produceSourceMap: true
  },
  enforce: 'post',
  exclude: /(node_modules|\.test\.tsx?$)/
});

webpackConfig.externals = [];

module.exports = function(config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine'],
    files: [
      { pattern: 'test/index.ts', watch: false },
    ],
    exclude: [
      '**.d.ts'
    ],
    webpack: {
      ...webpackConfig,
      stats: {
        warnings: false
      }
    },
    webpackMiddleware: {
      noInfo: true
    },
    preprocessors: {
      'test/index.ts': ['webpack', 'sourcemap']
    },
    mime: {
      "text/x-typescript": ["ts", "tsx"],
    },
    coverageIstanbulReporter: {
      reports: ['text-summary', 'lcov'],
      options: { esModules: true },
      fixWebpackSourcePaths: true,
    },
    reporters: ['progress', 'coverage-istanbul'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['ChromeHeadless'],
    singleRun: false,
    concurrency: Infinity
  })
};
