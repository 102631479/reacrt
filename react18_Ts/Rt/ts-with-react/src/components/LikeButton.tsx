import React, { useState } from 'react';
const LikeButton: React.FC = () => {
    const [like, setLike] = useState(0)
    const [obj, setObj] = useState({ like: 0, on: true })
    return (
        <>
            <button onClick={() => {
                setLike(like + 1)
            }}>{like}👍</button>
            <button onClick={() => {
                setObj({ like: obj.like, on: !obj.on })
            }}>{obj.on?'on':obj.like}👍</button>
        </>
    )
}
export default LikeButton
