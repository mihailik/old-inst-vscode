Visual Studio Code binaries - as NPM package
============================================

Need a self-contained `VSCode` copy, but don't want to/cannot/suspicious to system-wide installation? Simply run:

`npm install @inst/vscode`

And it will be available by the magic of NPM. Or install with `-g` switch to add `code` to systemwide PATH.

This package will be tracking versions as they are released by `VSCode` team, and will have exact version support soon.
Insider builds (nightlies) will be added shortly too.

Disclaimer:
* This package DOES contain original binaries from the official `VSCode` website
* This package is published by Oleg Mihailik, with no official recognition by `VSCode` team, nor by Microsoft.

For the idea (and initial implementation) look at https://github.com/Microsoft/vscode/issues/35896

How it works
------------

Any NPM package can install command-line utilties (such as `gulp` or `tsc` or angular cli) as part of [package.json format](https://docs.npmjs.com/files/package.json#bin). That makes it simple to embed an app like VSCode inside an NPM package, with package.json exposing respective binary for command line.

That makes VSCode (indeed any other app deployed this way) available system-wide if you `npm install @inst/vscode -g`. That `-g`lobal flag makes it go to the system PATH.

Additionally VSCode can be made run with `npm start`.

There are certain complications though, keep reading if you want to contribute and/or replicate this approach to other apps.

Complications
-------------

**Platform-dependent packages**

Binaries for VSCode are available in several flavours: macOS, Windows, Linux. To allow simple `npm install @inst/vscode` on any platform, two-tier package strucure is used:

```
@inst/vscode      platform-indepent root package
  @inst/vscode-bin-darwin   macOS binaries
  @inst/vscode-bin-win32    Windows binaries
```


The root `@inst/vscode` package comes with optional dependencies including all platforms, but NPM will only install dependencies matching the actual platform.

Note that `package.json{bin}` flag is defined at platform level, not root level. The root level is just a redirector for installation for now.

**node_modules inside binary deployments**

Binaries for VSCode happen to include a directory named `node_modules` nested somewhere in app/resources subdirectories, as well as `package.json`. That causes trouble when packaging -- standard `npm publish` command ignores `node_modules` and `package.json` [anywhere within](https://docs.npmjs.com/misc/developers#keeping-files-out-of-your-package) the package directory tree.

That means doing straight `npm publish` will create a package that's almost good. Except it silently excluded a bunch of important stuff. Judging from the package size it's just a few Mb smaller, but it's not runnable.

The fix is to rename that nested special-named files/directories to something like `x-node_modules` and rename it back in a post-install script.

