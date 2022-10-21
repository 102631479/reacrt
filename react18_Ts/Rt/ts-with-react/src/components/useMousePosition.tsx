import React, { useState, useEffect } from 'react';
const useMousePosition = () => {
    const [positions, setPositions] = useState({ x: 0, y: 0 })
    useEffect(() => {
        console.log('begin useMousePosition');
        // 如果没有 清除事件每次dom渲染的时候都会清除这个例子
        // 清除以后每次线性增加数据，否则就会陷入死循环
        const updateMouse = (e: MouseEvent) => {
            console.log('inner useMousePosition');
            setPositions({ x: e.clientX, y: e.clientY })
        }
        document.addEventListener('click', updateMouse)
        return () => {
            console.log('over useMousePosition');
            document.removeEventListener('click', updateMouse)
        }
    }, [positions])
    return positions
}