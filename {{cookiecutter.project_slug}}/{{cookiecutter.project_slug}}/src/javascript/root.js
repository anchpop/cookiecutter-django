import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { syncHistoryWithStore } from 'react-router-redux'
import { createBrowserHistory } from 'history';


import App from './app';
import {{cookiecutter.project_slug}} from './reducers';

class Root extends React.Component {
  componentWillMount() {
    // https://material-ui.com/guides/server-rendering/ 
    // Server-side rendering adds some CSS to the page, which will mess things up if we leave it
    // So if we're on the client, remove it
    if (!this.props.on_server) {
      const jssStyles = document.getElementById('jss-server-side');
      if (jssStyles && jssStyles.parentNode) {
        jssStyles.parentNode.removeChild(jssStyles);
      }
    }
    
    // https://redux.js.org/
    // Create a Redux store. This holds the component state, which is set to the props you passed in from Django  
    this.store = createStore({{cookiecutter.project_slug}}, this.props);
    
    // https://www.npmjs.com/package/react-router-redux
    // This will be used to add React-Router's information in Redux, as it's an important part of state.
    if (!this.props.on_server) {
      this.history = syncHistoryWithStore(createBrowserHistory(), this.store); 
      this.history.listen(location => {
        // Put analytics (or related) code here.
      });
    }
    else {
      // Unsure what the correct thing to do here is
      this.history = undefined
    }
    
  }

  render() {
    return (
      // Create a Redux provider - this will allow any children of the app to grab the state
      <Provider store={this.store}>
        <App history={this.history} />
      </Provider>
    );
  }
}

export default Root;
