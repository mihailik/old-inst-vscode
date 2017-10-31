#!/usr/bin/env node
if (process.mainModule === module) {
  console.log('THIS IS NOT A SCRIPT, CANNOT RUN');
}

module.exports = {
  zip: 'VSCode-darwin-stable.zip',
  run: 'Visual Studio Code.app/Contents/MacOS/Electron'
};