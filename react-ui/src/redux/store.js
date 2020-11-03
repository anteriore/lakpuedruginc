import { createStore, applyMiddleware } from 'redux'
import { createLogger } from 'redux-logger'
import { persistStore, persistReducer } from 'redux-persist'
import thunk from 'redux-thunk'
import storage from 'redux-persist/lib/storage'

import autoMergeLevel1 from 'redux-persist/lib/stateReconciler/autoMergeLevel1'

import rootReducer from './reducers'

const logger = createLogger({
    timestamps: true,
    duration: true,
})

const persistConfig = {
  key: 'root',
  storage: storage,
  whitelist: ['auth'],
  stateReconciler: autoMergeLevel1
}

const pReducer = persistReducer(persistConfig, rootReducer)

export const store = createStore(pReducer, applyMiddleware(thunk, logger));
export const persistor = persistStore(store)