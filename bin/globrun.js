#!/usr/bin/env node
'use strict';

/**
 * globrun "./src/*.js" "echo $f"
 * 
 * Variables can be used in the command:
 * 
 * $root            The root directory
 * $dir             The directory to where the file is, excluding the ending slash
 *                      e.g.    ./src
 * $base            The base file name, including the extension
 *                      e.g.    a.js
 * $ext             The extension of the file
 *                      e.g.    .js
 * $name            The name of the file, without the extension
 *                      e.g.    a
 * 
 */

const fg = require('fast-glob');
const path = require('path');
const _eval = require('eval');

let glob = process.argv.slice(2);
let cmd = process.argv.slice(3);

console.log(process.argv);

console.log("glob is " + glob);
console.log("cmd is " + cmd);

let files = fg.sync([glob]);

for (file in files) {
    let info = path.parse(file);
    for (f in info) cmd.replace(`$${f}`, info[f]);
    _eval(cmd);
}