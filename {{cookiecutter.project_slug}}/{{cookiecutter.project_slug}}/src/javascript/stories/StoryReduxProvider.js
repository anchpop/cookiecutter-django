import React from 'react';
import { Provider } from 'react-redux';
import { browserHistory } from 'react-router';
import configureStore from '../store/configureStore';
​
const store = configureStore(browserHistory, {});
​
export default function StoryReduxProvider({ story }) {
  return (
    <Provider store={store}>
      {story}
    </Provider>
  );
};