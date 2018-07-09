import React from 'react';
import ReactDOM from 'react-dom';
import Root from './javascript/root';
import registerServiceWorker from './registerServiceWorker';
import Loadable from 'react-loadable';

Loadable.preloadReady().then(() => {
  ReactDOM.hydrate(
    React.createElement(Root, { ...window.props }),
    document.getElementById('root')
  );
});
registerServiceWorker(); // enables PWA
