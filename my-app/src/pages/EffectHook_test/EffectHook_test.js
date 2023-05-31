import React, { useState, useEffect } from "react";

const EffectHook = () => {
  const [number, setNumber] = useState(0);
  useEffect(() => {
    const timer = setInterval(() => {
      setNumber(number + 1);
    }, 500);
    // 退出的时候 清除定时器
    return () => {
      // 相当于componentWillUnmount 页面卸载
      clearInterval(timer);
    };
  }, [number]);
  // [number]表示 当number发生改变的时候才会调用定时器
  return (
    <div>
      <h1>我是EffectHook测试({number})</h1>
    </div>
  );
  /*
    
         useEffect做了什么：通过使用Hook，你可以告诉React 组件需要在渲染的时候执行某些操作。React会保存你传递的数据
    （我们称之为 Effect），并且在执行Dom 更新之后调用它。在Effect中，我们设置了document的title属性，不过我们也
    可以执行数据获取来调用其他命令形式的API

         为什么在组件内部调用useEffect将useEffect放在组件内部让我们在effECT 中直接访问 counstate变量(或者其他props).
    我们不需要特殊的api来读取他  hook使用的是js 的闭包机制，而不在js已经解决方案的情况下 还要引入特殊的api
        
         useEffect会在每次渲染后都执行  是的默认情况下载第一次渲染
    */
};
export default EffectHook;
