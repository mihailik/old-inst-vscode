#!/usr/bin/env node
var fs = require('fs');
var path = require('path');


console.log('UPDATING VSCODE binaries from official website')

var darwinPromise = upgradeBinary('darwin');

// darwinPromise.then()


function upgradeBinary(platform) {
  return new Promise(function (resolve, reject) {
    var
  });
}