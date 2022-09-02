import './App.css';
import Hello from '../src/components/Hello'
import LikeButton from '../src/components/LikeButton'
import MouseTracker from '../src/components/MouseTracker'
import useMousePosition from '../src/hooks/useMousePosition'
import React, { useState, useEffect } from 'react';

const App: React.FC = () => {
  const positions = useMousePosition()
  return (
    <div className="App">
      <header className="App-header">
        <Hello message='你好'></Hello>
        <LikeButton />
        <MouseTracker />
        我是坐标hooks：{positions.x}
      </header>
    </div>
  );
}

export default App;
