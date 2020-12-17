import { combineReducers } from 'redux';

import recipes from '../Recipes/redux';

const rnd = combineReducers({
  recipes,
});

export default rnd;
