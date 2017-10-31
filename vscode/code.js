#!/usr/bin/env node
var platformModule = '@inst/vscode-bin-' + process.platform;
var platformData = require(platformModule);

if (process.mainModule === module) {
  var fs = require('fs');
  var path = require('path');
  var child_process = require('child_process');

  var run = require.resolve(platformModule + '/' + platformData.run);

  child_process.spawnSync(run, process.argv.slice(2));
}
else {
  module.exports = platformData;
}