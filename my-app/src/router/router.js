import Reacr from 'react'
import ReactDOM from 'react-dom'
// 导入组件 
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
const First = () => {
  return (
    <p>我是页面一</p>
  )

}

const Second = () => {
  return (
    <p>我是页面二</p>
  )

}
//  使用Router组件包裹整个应用 
const App = () => (
  <Router>
    <h1>路由基础</h1>
    {/* {指定路由入口基础} */}
    <Link to='/first'>页面一</Link>
    <Link to='/Second'>页面二</Link>
    <Route path='/first' component={First}></Route>
    <Route path='/Second' component={Second}></Route>
  </Router>

)
export default App;
