import { createStore } from 'redux';
import rootReducer from './authSlice';

const store = createStore(rootReducer);

export default store;
