// import Reacr from 'react'
// import ReactDOM from 'react-dom'
// 导入组件 
import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import First from '../pages/first/index';
import Second from '../pages/second/index';
import HookTest from '../pages/hookTest_test/index';
import EffectHook from '../pages/EffectHook_test/EffectHook_test';
import HookRef from '../pages/hookRef_test/hookRef_test';
import HookContest from '../pages/HookContest_test/Provider'



//  使用Router组件包裹整个应用 
const App = () => (
  <Router>

    <Link to='/First'>页面一</Link>
    <Link to='/Second'>页面二</Link>
    <Route path='/First' component={First}></Route>
    <Route path='/Second' component={Second}></Route>


    {/* <Suspense fallback={<div></div>}>
      <Switch>
        <Route exact path="/first" component={First} />
        <Route exact path="/Second" component={Second} />
      </Switch>
    </Suspense> */}
    <HookTest />
    <EffectHook />
    <HookRef />
    <HookContest />
    <h1>路由基础</h1>
    {/* {指定路由入口基础} */}
  </Router>

)
export default App;
