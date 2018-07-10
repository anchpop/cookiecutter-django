'use strict';

const pack = require('../../package');
const path = require('path');
const fs = require('fs');
const url = require('url');

// Make sure any symlinks in the project folder are resolved:
// https://github.com/facebookincubator/create-react-app/issues/637

const envPublicUrl = process.env.PUBLIC_URL;

function ensureSlash(path, needsSlash) {
  const hasSlash = path.endsWith('/');
  if (hasSlash && !needsSlash) {
    return path.substr(path, path.length - 1);
  } else if (!hasSlash && needsSlash) {
    return `${path}/`;
  } else {
    return path;
  }
}

const getPublicUrl = appPackageJson =>
  envPublicUrl || require(appPackageJson).homepage;

// We use `PUBLIC_URL` environment variable or "homepage" field to infer
// "public path" at which the app is served.
// Webpack needs to know it to put the right <script> hrefs into HTML even in
// single-page apps that may serve index.html for nested URLs like /todos/42.
// We can't use a relative path in HTML because we don't want to load something
// like /todos/42/static/js/bundle.7289d.js. We have to know the root.
function getServedPath(appPackageJson) {
  const publicUrl = getPublicUrl(appPackageJson);
  const servedUrl =
    envPublicUrl || (publicUrl ? url.parse(publicUrl).pathname : '/');
  return ensureSlash(servedUrl, true);
}


// config after eject: we're in ./config/
module.exports = (current_app) => {
  if (current_app === undefined || current_app === '') {
    current_app = pack.name
  }
  if (current_app[0] != "/") {
    current_app = "/" + current_app
  }

  const appDirectory = fs.realpathSync(process.cwd());
  const resolveProjectBase = relativePath => path.resolve(appDirectory, relativePath);
  const resolveProjectApp = relativePath => path.resolve(appDirectory + current_app, relativePath);
  return {
    appRoot: resolveProjectApp(''), 
    dotenv: resolveProjectBase('.env'),
    appBuild: resolveProjectApp('static/bundle'),
    filePublicAccessPath: '/static/bundle/',
    appPublic: resolveProjectApp('public'),
    appTemplates: resolveProjectApp('templates/' + current_app),
    appHtml: resolveProjectApp('public/index_demonstration.html'),
    appIndexJs: resolveProjectApp('src/index.js'),
    appPackageJson: resolveProjectBase('package.json'),
    appSrc: resolveProjectApp('src'),
    yarnLockFile: resolveProjectBase('yarn.lock'),
    testsSetup: resolveProjectApp('src/setupTests.js'),
    appNodeModules: resolveProjectBase('node_modules'),
    publicUrl: getPublicUrl(resolveProjectBase('package.json')),
    servedPath: getServedPath(resolveProjectBase('package.json')),
  }
};
