import { combineReducers } from "redux"

import goods from './goods/goodsReducer'
import user from './user/userReducer'

export default combineReducers({
    user: user,
    goods: goods
})

