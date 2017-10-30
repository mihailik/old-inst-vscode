#!/usr/bin / env node
var fs = require('fs');
var path = require('path');
var child_process = require('child_process');

module.exports = {
  zip: path.resolve(__dirname, 'VSCode-win32-x64-1.17.2.zip'),
  run: 'Code.exe'
};