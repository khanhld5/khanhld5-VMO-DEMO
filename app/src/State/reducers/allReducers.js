import user from './userReducer';
import cart from './cartReducer';

import { combineReducers } from 'redux';

const allReducer = combineReducers({
  user,
  cart,
});
export default allReducer;
