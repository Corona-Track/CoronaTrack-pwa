import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import Reducers from '../reducers/index';

const store = createStore(Reducers, applyMiddleware(ReduxThunk));
export { store };
