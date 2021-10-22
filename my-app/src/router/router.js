// import Reacr from 'react'
// import ReactDOM from 'react-dom'
// 导入组件 
import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import First from '../pages/first/index';
import Second from '../pages/second/index';
// const Second = lazy(() => import('../pages/second/index'));

// const First = () => {
//   return (
//     <p>我是页面一</p>
//   )

// }

// const Second = () => {
//   return (
//     <p>我是页面二</p>
//   )

// }
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


    <h1>路由基础</h1>
    {/* {指定路由入口基础} */}

  </Router>

)
export default App;
