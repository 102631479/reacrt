const defaultState = {
    name: '李白',
    age: 30
}


const userReducer = (state = defaultState, action) => {
    // 获得类型
    let type = action.type
    const newState = JSON.parse(JSON.stringify(state))
    switch (type) {
        case "change_name":
            newState.name = action.name
            return newState
        case "change_age":
            newState.age = action.age
            return newState
        default:
            return state
    }

}
export default userReducer