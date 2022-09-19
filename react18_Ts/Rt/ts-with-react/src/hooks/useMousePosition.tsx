import  { useState, useEffect } from 'react';

const useMousePosition =()=>{
    const [positions, setPositions] = useState({ x: 0, y: 0 })
    useEffect(() => {
        console.log('begin');
        // 如果没有 清除事件每次dom渲染的时候都会清除这个例子


        // 清除以后每次线性增加数据，否则就会陷入死循环
        const updateMouse = (e: MouseEvent) => {
            setPositions({ x: e.clientX, y: e.clientY })
        }
        document.addEventListener('mousemove', updateMouse)
        return () => {
            console.log('over');
            document.removeEventListener('mousemove', updateMouse)
        }
    }, [])
    // [] 表示 react 不依赖一 props state 中 的任意值 永远不会重复执行
    return positions

}
export default useMousePosition