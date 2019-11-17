import { createStore, applyMiddleware, compose } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from "redux-thunk";
import promise from "redux-promise";
import { createLogger } from 'redux-logger';
import rootReducer from "../reducers/index";

const logger = createLogger();
/*export default createStore(rootReducer, composeWithDevTools(
  applyMiddleware(thunk, promise, logger),
));*/

export default createStore(rootReducer, {}, compose(applyMiddleware(thunk)));