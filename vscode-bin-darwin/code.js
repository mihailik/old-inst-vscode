#!/usr/bin/env node
var fs = require('fs');
var path = require('path');
var child_process = require('child_process');

module.exports = {
  zip: path.resolve(__dirname, 'VSCode-darwin-stable.zip'),
  // run: 'Visual Studio Code.app'
  run: 'Visual Studio Code.app/Contents/MacOS/Electron'
};