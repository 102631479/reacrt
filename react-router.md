# 路由基础
1. 能够说出路由的作用
2. 能够掌握React-router-dom的基本使用
3. 能够使用编程式导航路由跳转
4. 能够知道React路由的匹配模式


+ 路由介绍
+ 基本使用
+ 执行过程
+ 编程式导航
+ 默认路由
+ 匹配模式


## 路由介绍
+ 现在前端应用大多都是SPA（单页应用程序），也就是只有一个HTML页面的应用程序。因为他的用户体验更好。
+ 前端路由功能；让用户从一个视图，导航到另一个视图
+ 前端路由是一套映射规则，在React中，URL路径与组件的关系 


+ 第一步  安装

```js
npm install react-router-dom --save-dev
```

+ 第二步  导入路由三个核心组件 Router / Route / Link  
+ 第三步  使用Link 组件作为导航菜单 （路由入口）

```js
import Reacr from 'react'
import ReactDOM from 'react-dom'
// 导入组件 第二步  导入路由三个核心组件 Router / Route / Link  

import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
const First = () =>{
  return(
      <p>我是页面一</p>
  )

}
//  使用Router组件包裹整个应用 
const App = () => (
// 使用Router包裹组价
    <Router>
     <h1>路由基础</h1>
     {/* {指定路由入口基础} */}
     <Link to='/first'>页面一</Link>
     <Route path='/first' component={First}></Route>
    </Router>

)
export default App;

```


### 常用组件说明
+ Router 组件:包裹整个应用，一个React应用只需要使用一次
+ 两种常用的Router:HashRouter和BrowserRouter  
+ HashRouter : 使用URL的哈希值实现（http://localhost:3000/#/first）

```js
// 不带 # 号的路由   推荐使用
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';

// 带 # 号的路由
import { HashRouter as Router, Route, Switch, Link } from 'react-router-dom';


```

+ Link 组件 最终会被编译成一个 a 标签   

```js
// to 属性 ：浏览器地址中的 pathName(localhost:pathName)
     <Link to='/first'>页面一</Link>

```

+ Router 组件：指定路由展示组件的相关信息

```js
// path属性 路由规则
// component属性：展示的组件
//    Router组件写在哪，渲染出来的组件就展示在哪里
     <Route path='/first' component={First}></Route>

```

## 执行过程
1. 点击Link组件的时候，首先修改url地址栏中的url地址
2. React路由监听地址栏URL的变化
3. React路由内部遍历所有Route组件，使用路由规则（path）与 pathname 进行匹配
4. 当路由规则(path)能够匹配地址栏中的pathName的时候，就展示该Rputer组件的内容

```js
import Reacr from 'react'
import ReactDOM from 'react-dom'
// 导入组件 第二步  导入路由三个核心组件 Router / Route / Link  

import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
const First = () =>{
  return(
      <p>我是页面一</p>
  )

}
const Home= () =>{
  return(
      <p>我是home</p>
  )

}
//  使用Router组件包裹整个应用 
const App = () => (
// 使用Router包裹组价
    <Router>
     <h1>路由基础</h1>
     {/* {指定路由入口基础} */}
     <Link to='/first'>页面一</Link>
     <Link to='/home'>页面一</Link>

     <Route path='/first' component={First}></Route>
     <Route path='/home'  component={Home} ></Route>

    </Router>

)
export default App;

```

### 编程式导航 
+ 使用场景：点击登录按钮，登录成功以后，通过代码跳转到后台首页  如何实现 ？
+ 编程式导航：通过js代码来实现页面跳转
+ history 是React路由提供的，用于获取浏览器的历史记录的相关信息 
+ push(path):跳转到某个页面，参数path表示跳转的路径
```js
class Login extends Component {
    handleLogin = () =>{
        this.props.history.push("/home")
    }
    render(){...}
}
```