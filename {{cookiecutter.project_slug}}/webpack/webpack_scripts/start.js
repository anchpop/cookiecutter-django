'use strict';

// Uncomment this to make `yarn start` automatically run `django runserver`. May be buggy
/*
var spawn = require('child_process').spawn
// run Django's runserver
var cmd = spawn('python', ['manage.py', 'runserver'], {stdio: 'inherit'});
cmd.on('close', function(code) {
  console.log('runServer exited with code ' + code);
  cb(code);
});*/

// Do this as the first thing so that any code reading it knows the right env.
process.env.BABEL_ENV = 'development';
process.env.NODE_ENV = 'development';

// Makes the script crash on unhandled rejections instead of silently
// ignoring them. In the future, promise rejections that are not handled will
// terminate the Node.js process with a non-zero exit code.
process.on ('unhandledRejection', err => {
  throw err;
});

// Ensure environment variables are read.
require ('../webpack_config/env');

//const fs = require('fs');
var argv = require ('minimist') (process.argv.slice (2));
const fs = require ('fs-extra');
const chalk = require ('chalk');
const webpack = require ('webpack');
var browserSync = require ('browser-sync').create ();
const checkRequiredFiles = require ('react-dev-utils/checkRequiredFiles');
const {
  choosePort,
} = require ('react-dev-utils/WebpackDevServerUtils');
const paths = require ('../webpack_config/paths') (argv['_'][0]);
const config = require ('../webpack_config/webpack.config.dev') (paths);


// Warn and crash if required files are missing
if (!checkRequiredFiles ([paths.appHtml, paths.appIndexJs])) {
  process.exit (1);
}

// Tools like Cloud9 rely on this.
const DEFAULT_PORT = parseInt (process.env.PORT, 10) || 3000;
const HOST = process.env.HOST || '0.0.0.0';

if (process.env.HOST) {
  console.log (
    chalk.cyan (
      `Attempting to bind to HOST environment variable: ${chalk.yellow (chalk.bold (process.env.HOST))}`
    )
  );
  console.log (
    `If this was unintentional, check that you haven't mistakenly set it in your shell.`
  );
  console.log (`Learn more here: ${chalk.yellow ('http://bit.ly/2mwWSwH')}`);
  console.log ();
}
// We attempt to use the default port but if it is busy, we offer the user to
// run on a different port. `choosePort()` Promise resolves to the next free port.
choosePort (HOST, DEFAULT_PORT).then (port => {
    if (port == null) {
        // We have not found a port.
        return;
    }
    copyPublicFolder ();
    let compiler = webpack(config);
    compiler.watch({}, (err, stats) => {
        if (err) {
            console.log("Error while watching:", err)
        }
    });
    console.log ('Build folder: ' + paths.appBuild);

    // watching `paths.appBuild + "\\**\\*"` will cause us to react to any changes in the build directory
    let watchPath = paths.appBuild + '\\**\\*';
    browserSync.init ({
        watch: true,
        files: [
        watchPath,
        paths.appBuild + '/*.css',
        paths.appTemplates + '*.html',
        ],
        proxy: 'localhost:8000',
    });
});

function copyPublicFolder () {
  fs.copySync (paths.appPublic, paths.appBuild, {
    dereference: true,
    filter: file => file !== paths.appHtml,
  });
}
