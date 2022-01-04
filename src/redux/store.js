import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from './rootReducer';

const composeEnhancers = composeWithDevTools({});

//To prevent cart data to removed after refreshing the page  
const initialStore={
  cartReducer: {
    cartItems:JSON.parse(localStorage.getItem('cartItems')) ?? []
  }
}


export const store = createStore(rootReducer,initialStore,composeEnhancers());