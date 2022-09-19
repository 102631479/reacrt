import React, { useState,useEffect } from 'react';
const LikeButton: React.FC = () => {
    const [like, setLike] = useState(0)
    const [obj, setObj] = useState({ like: 0, on: true })
    useEffect(()=>{
        document.title=`点击了${like}次标题`
    },[like])
    // 执行 依赖于 某个数据
    // 只有 like 改变的时候 effect  才会执行  否则都会执行
    return (
        <>
            <button onClick={() => {
                setLike(like + 1)
            }}>{like}👍</button>
             
            <button onClick={() => {
                setObj({ like: obj.like, on: !obj.on })
            }}>{obj.on ? 'on' : 'off'}👍</button>
        </>
    )
}
export default LikeButton
