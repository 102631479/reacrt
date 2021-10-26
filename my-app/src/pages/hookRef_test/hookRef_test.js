import React, { useRef } from 'react'

const HookReftest = () => {
    const inputRef = useRef()
    const handClick = (e) => {
        console.log(inputRef.current.value, "输入框里面的数据");
        alert("输入框里面的数据" + inputRef.current.value)
    }

    return (
        <div>
            <h1>我是hookRef测试</h1>
            <input type="text" name="" id="" ref={inputRef} />
            <button onClick={handClick}>获得数据inputRef</button>
        </div>
    )
}
export default HookReftest