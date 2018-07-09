import React from 'react';
import ReactDOM from 'react-dom';
import Button from '@material-ui/core/Button';
import { Provider } from 'react-redux';
import Loadable from 'react-loadable';

import { createStore } from 'redux';

import App from './app';
import {{cookiecutter.project_slug}} from './reducers';

class Root extends React.Component {
  componentWillMount() {
    if (!this.props.on_server) {
      const jssStyles = document.getElementById('jss-server-side');
      if (jssStyles && jssStyles.parentNode) {
        jssStyles.parentNode.removeChild(jssStyles);
      }
    }
    //initialState = { collections: this.props.collections, projects: this.props.projects }
    this.store = createStore({{cookiecutter.project_slug}}, this.props);
  }

  render() {
    return (
      <Provider store={this.store}>
        <App />
      </Provider>
    );
  }
}

export default Root;
