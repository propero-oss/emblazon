const conf = require("./karma.conf");

module.exports = function(config) {
  conf(config);
  config.set({
    singleRun: true,
    concurrency: 1
  });
};
