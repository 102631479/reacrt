import React, { useState } from 'react'

const HookTest = () => {
    const [number, setNumber] = useState(0)
    return (
        <div>
            <h1>我是Hook测试({number})</h1>
            <button onClick={() => {
                setNumber(number + 1)
            }}>hookTest数据加一 </button>
        </div>
    )

}
export default HookTest