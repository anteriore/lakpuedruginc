import { combineReducers } from 'redux';
import finishedGoods from '../FinishedGoods/redux'; 

const maintenance = combineReducers({
  finishedGoods,
})

export default maintenance