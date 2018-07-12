import React from 'react';
import { Route, Switch, StaticRouter, Router, BrowserRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Loadable from 'react-loadable';
import CssBaseline from '@material-ui/core/CssBaseline';

import LoadingIcon from './components/loadingIcon';

const Homepage = Loadable({
  loader: () =>
    import('./components/homepage' /* webpackChunkName: "collectionView" */),
  loading: LoadingIcon
});

const About = Loadable({
  loader: () =>
    import('./components/about' /* webpackChunkName: "projectsAndCollections" */),
  loading: LoadingIcon
});

class App extends React.Component {
  render() {
    let contents = (
      <React.Fragment>
        <CssBaseline />
        <Switch>
          <Route exact path="/" component={Homepage} />
          <Route exact path="/about" component={About} />
        </Switch>
      </React.Fragment>
    );
    let context = {};
    if (!this.props.on_server) {
      return (
        <BrowserRouter basename={this.props.base_url}>
          {contents}
        </BrowserRouter>
      );
    } else {
      return (
        <StaticRouter
          basename={this.props.base_url}
          location={this.props.loaded_at_url}
          context={context}
        >
          {contents}
        </StaticRouter>
      );
    }
  }
}

const mapStateToProps = state => ({
  loaded_at_url: state.loaded_at_url,
  base_url: state.base_url,
  on_server: state.on_server
});

export default connect(mapStateToProps)(App);
