const defaultState = {
    title: '我是标题',
    list: [
        { name: "张三", age: 19 },
        { name: "张思", age: 20 },

    ]
}

const goodsReducer = (state = defaultState, action) => {
    // 获得类型
    let type = action.type
    const newState = JSON.parse(JSON.stringify(state))
    switch (type) {
        case "change_title":
            newState.title = action.title
            return newState
        default:
            return state
    }

}
export default goodsReducer