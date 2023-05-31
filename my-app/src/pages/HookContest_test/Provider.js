import { createContext, useState } from 'react'
import Cusetomer from './Cusetomer'

// 作为容器出现  主要是传递数据
export const Text = createContext()
const Provider = () => {
    const [number, setNumber] = useState(0)
    return (
        <div>
            <h1>当前父组件的Number{number}</h1>
            <button onClick={

                () => {
                    setNumber(number + 1)
                }

            }>改变number</button>

            <Text.Provider value={{ number, setNumber }}>
                <Cusetomer />
            </Text.Provider>
        </div>
    )
}


export default Provider