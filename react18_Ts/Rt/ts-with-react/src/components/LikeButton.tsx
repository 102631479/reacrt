import React, { useState, useEffect, useRef, useContext } from 'react';
import { ThemContsxt } from '../App';
// 防抖
const debounced = (fn: any, delay: any): void => {
    let timer: any = null

    if (timer) {
        console.log(timer, '我是定时器');
        clearTimeout(timer)
    }
    timer = setTimeout(() => {
        console.log('dinsghi');
        fn()
    }, delay)

}

// useContext  为了解决 组件传递的问题 共享组件树
// 节流
var temp = false;
const debouncedLiu = (fn: any, time: any): void => {
    // let temp = false;
    if (temp) {
        return;
    } else {
        temp = true;
        setTimeout(() => {
            fn()
            temp = false;
        }, time);
    }

}


const LikeButton: React.FC = () => {
    const [like, setLike] = useState(0)
    const [obj, setObj] = useState({ like: 0, on: true })
    const likeRef = useRef(0)
    const didMountRef = useRef(false)
    const theme = useContext(ThemContsxt)
    debouncedLiu(() => {
        console.log('开启防抖');
        console.log(theme);
    }, 10000)
    const style = {
        color: theme.color,
        background: theme.backgorund
    }
    // 利用 useRef 获得dom节点
    const domRef = useRef<HTMLInputElement>(null)

    useEffect(() => {
        document.title = `点击了${like}次标题`
    }, [like])

    useEffect(() => {
        if (didMountRef.current) {
            // 防抖节流
            debounce(() => {
                console.log('开启防抖');
                console.log('正确didMountRef');
            }, 500)

        } else {
            didMountRef.current = true
        }
    }, [])
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
    }
    // 执行 依赖于 某个数据
    // 只有 like 改变的时候 effect  才会执行  否则都会执行

    const debounce = (fn: any, delay: any) => {
        let timer: any = null
        return () => {
            if (timer) {
                // console.log(timer, '我是定时器');
                clearTimeout(timer)
            }
            timer = setTimeout(() => {
                fn()
            }, delay)
        }
    }
    return (
        <>
            <input type="text" ref={domRef} />
            <button onClick={() => {
                setLike(like + 1)
                likeRef.current++
            }}>{like}👍</button>


            <button style={style} onClick={() => {
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
