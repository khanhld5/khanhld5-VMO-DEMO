import admin from './adminReducer';

import { combineReducers } from 'redux';

const allReducer = combineReducers({
  admin,
});
export default allReducer;
