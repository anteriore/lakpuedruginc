import { createStore, applyMiddleware, compose } from 'redux';
import { createLogger } from 'redux-logger';
import { persistStore, persistReducer } from 'redux-persist';
import thunk from 'redux-thunk';
import storage from 'redux-persist/lib/storage';

import autoMergeLevel1 from 'redux-persist/lib/stateReconciler/autoMergeLevel1';

import rootReducer from './reducers';

const logger = createLogger({
  timestamps: true,
  duration: true,
});

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth', 'company'],
  stateReconciler: autoMergeLevel1,
};

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

let middleware = [];
if (process.env.NODE_ENV === 'production') {
  middleware = [...middleware, thunk];
} else {
  middleware = [...middleware, thunk, logger];
}

const pReducer = persistReducer(persistConfig, rootReducer);
export const store = createStore(pReducer, composeEnhancers(applyMiddleware(...middleware)));
export const persistor = persistStore(store);
