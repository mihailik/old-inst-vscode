#!/usr/bin / env node
if (process.mainModule === module) {
  console.log('THIS IS NOT A SCRIPT, CANNOT RUN');
}

module.exports = {
  zip: 'VSCode-win32-x64-1.17.2.zip',
  run: 'bin/Code.exe'
};