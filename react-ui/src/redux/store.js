import { createStore, applyMiddleware } from 'redux'
import { createLogger } from 'redux-logger'
import thunk from 'redux-thunk'

import rootReducer from './reducers'

const logger = createLogger({
    timestamps: true,
    duration: true,
  })

export const store = createStore(rootReducer, applyMiddleware(thunk, logger));