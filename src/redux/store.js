import {
  legacy_createStore as createStore,
  combineReducers,
  applyMiddleware,
} from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import blogReducer from './reducers/blogReducer';
import notificationReducer from './reducers/notificationReducer';

const reducers = combineReducers({
  blogs: blogReducer,
  notifications: notificationReducer,
});

const store = createStore(
  reducers,
  composeWithDevTools(applyMiddleware(thunk))
);

export default store;
