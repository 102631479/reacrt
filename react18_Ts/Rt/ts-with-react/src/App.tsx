import Hello from '../src/components/Hello'
import LikeButton from '../src/components/LikeButton'
import MouseTracker from '../src/components/MouseTracker'
import useMousePosition from '../src/hooks/useMousePosition'
import useLoderURL from '../src/hooks/useLoderURL';
import { useState } from 'react';

import React from 'react';
import './App.css';
interface ISshowResult {
  message: string,
  status: string,
}
const App: React.FC = () => {
  const  [show,setShow]=useState(true)
  const positions = useMousePosition()
  const [data, loading] = useLoderURL('https://dog.ceo/api/breeds/image/random',[show])
  const dog = data as ISshowResult
  return (
    <div className="App">
      <header className="App-header">
        <Hello message='你好'></Hello>
        <LikeButton />
        <MouseTracker />
        <p onClick={()=>{setShow(!show)}}>刷新图片地址</p>
        {
          loading ? <p>读取中...</p> : <img style={{ "width": "200px" }} src={dog && dog.message} />
        }
        我是坐标hooks：{positions.x},{positions.y}
      </header>
    </div>
  );
}
/*
高阶组件
+ 高阶组件就是一个函数，接受一个组件作为参数，返回一个新组件
*/
export default App;
