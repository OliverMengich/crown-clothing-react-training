import { createStore, applyMiddleware } from "redux";
//apply middleware, receives action, do something to the action, console.log
import logger from "redux-logger";
import rootReducer from "./root-reducer";

const middlewares = [logger];

const store = createStore(rootReducer, applyMiddleware(...middlewares));

export default store;