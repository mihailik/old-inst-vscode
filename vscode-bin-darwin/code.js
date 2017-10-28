var fs = require('fs');
var path = require('path');
var child_process = require('child_process');

var runPath = path.resolve(__dirname, 'Visual Studio Code.app/Contents/MacOS/Electron');
var zipPath = path.resolve(__dirname, 'VSCode-darwin-stable.zip');

var debug = true;
if (debug) console.log('checkCodeExists...');
checkCodeExists(function (exists) {
  if (exists) {
    if (debug) console.log('tryRunCode...');
    tryRunCode(function (runError) {
      if (runError) {
        if (debug) console.log('extractCode...');
        extractCode(function (extractError) {
          if (extractError) {
            if (debug) console.log('Cannot extract VSCode: ' + extractError.message + ' fail.');
            fail('Cannot extract VSCode ' + extractError.message);
          }
          else {
            if (debug) console.log('tryRunCode...');
            tryRunCode(function (runErrorAgain) {
              if (runError) {
                if (debug) console.log('VSCode failed to run: ' + runErrorAgain.message + ' fail.');
                fail('VSCode failed to run (' + runError.message + '), then after re-extracting from ZIP failed again ' + runError.message);
              }
              else {
                if (debug) console.log('SUCCESS.');
              }
            });
          }
        });
      }
      else {
        if (debug) console.log('SUCCESS.');
      }
    });
  }
  else { // VSCode is not detected - extract and run
    if (debug) console.log('extractCode...');
    extractCode(function (extractError) {
      if (extractError) {
        if (debug) console.log('Cannot extract VSCode: ' + extractError.message + ' fail.');
        fail('Cannot extract VSCode ' + extractError.message);
      }
      else {
        if (debug) console.log('tryRunCode...');
        tryRunCode(function (runError) {
          if (runError) {
            if (debug) console.log('Cannot run VSCode: ' + runError.message + ' fail.');
            fail('Cannot run VSCode after extracting from ZIP ' + runError.message);
          }
          else {
            if (debug) console.log('SUCCESS.');
          }
        });
      }
    });
  }
})

function fail(message) {
  process.exit(message.charCodeAt(0));

}

function checkCodeExists(callback) {
  fs.exists(runPath, callback);
}

function tryRunCode(callback) {
  var passArgs = process.argv.slice(2);
  var passCwd = path.dirname(runPath);
  if (debug) console.log(passCwd + '$ ' + runPath + ' ' + passArgs.join(' '));
  var codeProcess = child_process.spawn(runPath, passArgs, {
    cwd: passCwd
  });

  var done = false;
  codeProcess.on('error', function (error) {
    if (done) return;
    done = true;
    callback(error);
  });

  codeProcess.on('exit', function () {
    if (done) return;
    done = true;
    callback();
  });
}

function extractCode(callback) {
  //use unzip command (standard on macOS)
  var unzipProcess = child_process.spawn('unzip', [zipPath], { cwd: __dirname, stdio: 'inherit' });
  unzipProcess.on('exit', function (code) {
    if (code) {
      callback(new Error('Unzip failed.'));
    }
    else {
      callback();
    }
  });
}
