import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';


import App from './app';
import {{cookiecutter.project_slug}} from './reducers';

class Root extends React.Component {
  componentWillMount() {
    // https://material-ui.com/guides/server-rendering/ 
    // Server-side rendering adds some CSS to the page, which will mess things up if we leave it
    // So if we're on the client, remove it
    if (!this.props.extra_info.on_server) {
      const jssStyles = document.getElementById('jss-server-side');
      if (jssStyles && jssStyles.parentNode) {
        jssStyles.parentNode.removeChild(jssStyles);
      }
    }

    // https://redux.js.org/
    // Create a Redux store. This holds the component state, which is set to the props you passed in from Django  
    this.store = createStore({{cookiecutter.project_slug}}, this.props);
    
  }

  render() {
    return (
      // Create a Redux provider - this will allow any children of the app to grab the state
      <Provider store={this.store}>
        <App />
      </Provider>
    );
  }
}

export default Root;
