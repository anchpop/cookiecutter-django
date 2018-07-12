import React from 'react';
import { Provider } from 'react-redux';
import { browserHistory } from 'react-router';
import { createStore } from 'redux';
import {{cookiecutter.project_slug}} from '../reducers';

const store = createStore({{cookiecutter.project_slug}}, {random_number: 4, nonce: "testNonce"});

export default function StoryReduxProvider({ story }) {
  return (
    <Provider store={store}>
      {story}
    </Provider>
  );
};