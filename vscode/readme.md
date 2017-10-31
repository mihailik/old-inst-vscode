Visual Studio Code binaries - packages as NPM package
=====================================================

Need a self-contained `VSCode` copy, but don't want to/cannot/suspicious to system-wide installation? Simply run:

`npm install @inst/vscode`

And it will be available by the magic of NPM. Or install with `-g` switch to add `code` to systemwide PATH.

This package will be tracking versions as they are released by `VSCode` team, and will have exact version support soon.
Insider builds (nightlies) will be added shortly too.

Disclaimer:
*This package is not published by `VSCode` team, it has no official status by Microsoft either.
*This package DOES contain binaries as distributed by official `VSCode` website

For the idea (and initial implementation) look at https://github.com/Microsoft/vscode/issues/35896