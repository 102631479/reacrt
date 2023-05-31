//  基本所有项目都是这样 不用改变

import { createStore, applyMiddleware } from "redux";

import reducer from './reducer'

import thunk from "redux-thunk"

const state = createStore(reducer, applyMiddleware(thunk))

export default state


// ./src/store/store.js
// Module not found: Can't resolve 'redux-thunk' in 'D:\GitHub\reacrt\my-app\src\store'

// Failed to compile.

// ./src/store/store.js
// Module not found: Can't resolve 'redux-thunk' in 'D:\GitHub\reacrt\my-app\src\store'


