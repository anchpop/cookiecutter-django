import { combineReducers } from 'redux';
import collections from './collections';


const labelSquadApp = combineReducers({
  collections,
});

export default labelSquadApp;