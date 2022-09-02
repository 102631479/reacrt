import React, { useState, useEffect } from 'react';
const MouseTracker: React.FC = () => {
    const [positions, setPositions] = useState({ x: 0, y: 0 })
    useEffect(() => {
        console.log('执行的次数');
        // 如果没有 清除事件每次dom渲染的时候都会清除这个例子
        // 清除以后每次线性增加数据，否则就会陷入死循环
        const updateMouse = (e: MouseEvent) => {
            setPositions({ x: e.clientX, y: e.clientY })
        }
        document.addEventListener('click', updateMouse)
        return () => {
            document.removeEventListener('click', updateMouse)
        }
    }, [positions])
//  []  第二个空数组参数  ，抑制react 每次数据重新渲染就执行
//  [] 数组里面的参数的意思是  , 只有当 数组里面的 参数值发生变化的时候 才会渲染dom
    return (
        <p>x:{positions.x},y:{positions.y}</p>
    )
}
export default MouseTracker
