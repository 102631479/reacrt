import React, { useState, useEffect } from 'react';

const useMousePosition =()=>{
    const [positions, setPositions] = useState({ x: 0, y: 0 })
    useEffect(() => {
        console.log('执行的次数');
        // 如果没有 清除事件每次dom渲染的时候都会清除这个例子
        // 清除以后每次线性增加数据，否则就会陷入死循环
        const updateMouse = (e: MouseEvent) => {
            setPositions({ x: e.clientX, y: e.clientY })
        }
        document.addEventListener('mousemove', updateMouse)
        return () => {
            document.removeEventListener('mousemove', updateMouse)
        }
    }, [])
    return positions

}
export default useMousePosition