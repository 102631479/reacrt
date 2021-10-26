import React, { useContext } from 'react'
import { Text } from './Provider'

//子组件
const Cusetomer = () => {
    const { number, setNumber } = useContext(Text)

    return (
        <div>
            <h1>子组件的number={number}</h1>
            <button onClick={
                () => {
                    setNumber(number + 1)
                }
            }>子组件改变</button>
        </div>
    )
}
export default Cusetomer