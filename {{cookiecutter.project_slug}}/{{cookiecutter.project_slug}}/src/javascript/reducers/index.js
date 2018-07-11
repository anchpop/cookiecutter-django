import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import extra_info from './extra_info';
import nonce from './nonce';
import random_number from './random_number';


const {{cookiecutter.project_slug}} = combineReducers({
  extra_info,
  nonce,
  random_number,
  routing: routerReducer
});

export default {{cookiecutter.project_slug}};