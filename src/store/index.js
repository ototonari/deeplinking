import {
  createStore,
  applyMiddleware,
  combineReducers,
  compose
} from "redux";

import reducers from "../reducers";
import { createLogger } from "redux-logger";

const loggerMiddleware = createLogger({
  predicate: (getState, action) => __DEV__
})

const configureStore = initialState => {
  const enhancer = compose(
    applyMiddleware(
      loggerMiddleware,
    )
  )
  return createStore(reducers, initialState, enhancer)
}

// initialState は {} です
const store = configureStore({})

export default store