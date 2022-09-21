import React, { useState, useEffect, useRef } from 'react';
const LikeButton: React.FC = () => {
    const [like, setLike] = useState(0)
    const [obj, setObj] = useState({ like: 0, on: true })
    const likeRef = useRef(0)
    const didMountRef = useRef(false)
    // 利用 useRef 获得dom节点
    const domRef = useRef<HTMLInputElement>(null)
    useEffect(() => {
        document.title = `点击了${like}次标题`
    }, [like])
    useEffect(() => {
        if (didMountRef.current) {
            console.log('正确didMountRef');

        } else {
            didMountRef.current = true
        }
    })
    useEffect(() => {
        if (domRef && domRef.current) {
            // 获得 输入框的焦点
            domRef.current.focus()
        }
    })
    function handAlertClick() {
        setTimeout(() => {
            alert('you clicked on ' + like + ' useRef ' + likeRef.current)
        }, 3000)
        // 这个时候 只能输出  点击时候的值  不是  最终的值
        // useRef 在取值 和输出值   都是最终的值  不存在隔离    并且不会触发  render 更新
        // 
    }
    // 执行 依赖于 某个数据
    // 只有 like 改变的时候 effect  才会执行  否则都会执行
    return (
        <>
            <input type="text" ref={domRef} />
            <button onClick={() => {
                setLike(like + 1)
                likeRef.current++
            }}>{like}👍</button>

            <button onClick={() => {
                setObj({ like: obj.like, on: !obj.on })
            }}>{obj.on ? 'on' : 'off'}👍</button>

            <button onClick={handAlertClick} >alert</button>

            {/* 
             在任意 渲染中 props  和  state 的值是不变的
             如果 props 和 state 使用他们的任何值是独立的话  那么他们的任何值都是独立的
             


            */}
        </>
    )
}
export default LikeButton
