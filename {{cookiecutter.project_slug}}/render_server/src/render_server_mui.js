var argv = require ('yargs')
  .option ('p', {
    alias: 'port',
    description: "Specify the server's port",
    default: 9009,
  })
  .option ('a', {
    alias: 'address',
    description: "Specify the server's address",
    default: '127.0.0.1',
  })
  .help ('h')
  .alias ('h', 'help')
  .strict ().argv;

var http = require ('http');
var express = require ('express');
var bodyParser = require ('body-parser');
var reactRender = require ('react-render');
var path = require ('path');

// Ensure support for loading files that contain ES6+7 & JSX
require ('babel-core/register');

import React from 'react';
import {renderToString} from 'react-dom/server';
import {SheetsRegistry} from 'react-jss/lib/jss';
import JssProvider from 'react-jss/lib/JssProvider';
import {
  MuiThemeProvider,
  createMuiTheme,
  createGenerateClassName,
} from '@material-ui/core/styles';
import Loadable from 'react-loadable';
import ReactDOMServer from 'react-dom/server';
import {getBundles} from 'react-loadable/webpack';

Promise.all ([import ('./test')])
  .then (([CollectionView]) => {
    /* Sanity check complete - this won't work if whatever enviroment you're using doesn't support dynamic import */
  })
  .catch (err => {
    console.log (
      "There was an error with dynamic imports! Make sure you're on the latest version of node and passing ` --experimental-modules` when you run node.\n",
      err
    );
  });

var ADDRESS = argv.address;
var PORT = argv.port;

var app = express ();
var server = http.Server (app);

function handleRender (toRenderFilename, props, pathToReactLoadable, res) {
  // Create a sheetsRegistry instance.
  const sheetsRegistry = new SheetsRegistry ();

  // Create a theme instance.
  const theme = createMuiTheme (
    {
      // you can replace this with a `require()` to use a theme from somewhere else
    }
  );

  const generateClassName = createGenerateClassName ();
  let App = require (toRenderFilename).default;
  console.log ('App:', App);

  if (pathToReactLoadable) {
    Loadable.preloadAll ().then (() => {
      // load react-loadable info
      const stats = require (pathToReactLoadable);

      let modules = [];
      const toRender = (
        <JssProvider
          registry={sheetsRegistry}
          generateClassName={generateClassName}
        >
          <MuiThemeProvider theme={theme} sheetsManager={new Map ()}>
            <Loadable.Capture report={moduleName => modules.push (moduleName)}>
              {React.createElement (App, props)}
            </Loadable.Capture>
          </MuiThemeProvider>
        </JssProvider>
      );

      // Render the component to a string.
      const html = renderToString (toRender);
      let bundles = getBundles (stats, modules);
      console.log ('bundles:', bundles);

      //let styles = bundles.filter(bundle => bundle.file.endsWith('.css'));
      //let scripts = bundles.filter(bundle => bundle.file.endsWith('.js'));

      // Grab the CSS from our sheetsRegistry.
      const css = sheetsRegistry.toString ();

      const data = {
        error: null,
        markup: html,
        css: css,
        extra_data: {bundles: bundles},
      };
      res.json (data);
    });
  } else {
    let modules = [];
    const toRender = (
      <JssProvider
        registry={sheetsRegistry}
        generateClassName={generateClassName}
      >
        <MuiThemeProvider theme={theme} sheetsManager={new Map ()}>
          {React.createElement (App, props)}
        </MuiThemeProvider>
      </JssProvider>
    );

    // Render the component to a string.
    const html = renderToString (toRender);

    // Grab the CSS from our sheetsRegistry.
    const css = sheetsRegistry.toString ();

    const data = {
      error: null,
      markup: html,
      css: css,
    };
    res.json (data);
  }
}

app.use (bodyParser.json ());

app.get ('/', function (req, res) {
  res.end ('React render server');
});

app.post ('/render', function (req, res) {
  handleRender (
    req.body.path,
    JSON.parse (req.body.serializedProps),
    req.body.extraData.path_to_react_loadable,
    res
  );

  /*reactRender(req.body, function(err, markup) {
        if (err) {
            res.json({
                error: {
                    type: err.constructor.name,
                    message: err.message,
                    stack: err.stack
                },
                markup: null
            });
        } else {
            res.json({
                error: null,
                markup: markup
            });
        }
    });*/
});

server.listen (PORT, ADDRESS, function () {
  console.log (
    'React render server listening at http://' + ADDRESS + ':' + PORT
  );
});
