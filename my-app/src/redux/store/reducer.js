const defaultState = {
    age: 18,
    name: "小刘"

}

export default (state = defaultState, action) => {
    let type = action.type
    switch (type) {
        case "change":
            let age = action.age
            //  因为state 是只读的 ，所以先深拷贝
            const newState = JSON.parse(JSON.stringify(state))
            newState.age = age
            return newState;
        default:
            return state;

    }
}