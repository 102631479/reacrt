# react 原理   
**解决以下问题**

1. 能够知道setState() 更新数据是异步
2. 能够知道JSX语法的转化过程
3. 能够说出 React 组件的更新机制
4. 能够对罪案进行性能优化
5. 能够说出虚拟Dom和Diff算法 


## setState()说明


 ### 更新数据
 + setState()是异步更新数据的
 + 注意：使用后面的 setState（），不要依赖于前面的setState（）
 + 可以多次调用 setState（）只会触发一次

```js
this.state={count : 1}
this.setState({
    count : this.state.cont + 1
})
console.log(this.state.count) // 1 
```

+ 推荐：使用  setState((state,props)=>{})  语法
+ 参数state :表示最新的state
+ 参数props: 表示最新的porps

```js
this.setState((state,props)=>{
    return{
       count : this.state.cont + 1
    }
})
```

### 第二个参数
+ 场景：在状态更新（页面渲染以后完成的操作）后立即执行某个操作
+ 语法： setState (updater,[callback])

```js
this.setState(
    (state,props)=>{},
    ()=>{
        console.log('这个回调函数会在状态更新后立即执行')
    }
    // 如果想拿到更新后的值就可以在后面的函数中拿，因为this.setState 是一个异步函数
})

```


## JSX语法的转化过程
+ jsx仅仅是creatElement()方法的语法糖（简化语法）
+ JSX语法被@bable/preset插件编译为creatElement（）方法
+ React元素：是一个对象，用来描述你希望在屏幕上看到的内容
+ jsx ---->  creatElement() ---->  React元素  转化过程
```js
// jsx语法
const element = {
    <h1 className='gretting'> "Hello jsx"</h1>
}
// creatElement()
const element = React.creatElement('h1',{className:"gretting"},'Hello JSX')

// React元素
const element = {
    type:"h1",
    props:{
        className:"gretting",
        children:"Hello JSX"
    }
}
```

## 组件更新机制
+ setState（） 的两个作用：1.修改state 2.更新组件（ui） 
+ 过程 ：父组件重新渲染的时候，也会渲染子组件 。但是渲染当前组件树（当前组件以及所有子组件）





## 组件性能优化
### 减轻state
+ 减轻state : 只存储跟组件渲染相关的数据（比如：count/列表渲染/loading等）
+ 注意：不用做渲染的数据不要放在state中，比如定时器id等
+ 对于这种需要在多个方法中用到的数据，应该放在this中

```js
class Hello extends Component {
    componentDidMount(){
    //   timerID 存储到this中，而不是 state 中
    this.timeID=setInterval(()=>{},2000)

    }

    componentWillUnmount(){
        clearInterval(this.timeID)

    }
    ∂
    render(){...}
}
```

### 避免不必要的重新渲染
+ 组件更新机制：父组件更新会引起子组件也被更新  
+ 问题：子组件没有任何变化，子组件也会被更新 
+ 如何避免不必要的重新渲染？
+ 解决方法：使用钩子函数 shouldComponentUpdate(nextProps,nextState)   
+ 作用： 通过钩子函数的返回值决定是否重新渲染组件，返回 true表示重新渲染，false表示不重新渲染
+ 触发时机：更新阶段的钩子函数，组件重新渲染钱执行（shouldComponentUpdate -> render）

```js
class Hello extends Component {
    // 参数说明   nextState  更新前的状态   nextProps 是 更新后的状态
    shouldComponentUpdate(nextProps,nextState){
        // 根据条件 决定是否重新渲染组件  
     
        //  当父组件变化时或者本身变化的时候 返回false 会阻止组件重新渲染    返回true 可以使组价重新渲染
        return false
    }
    render(){...}
}
```

+ 案例1 通过 nextState
  
```js
class App extends React.Component{
    state = {
        numner:0
    }

    handClick=()=>{
        this.setState(()=>{
          return{
              number:Math.floor(Math.random() * 3 )
          }
        })
    }
    // 问题一  当我连续点击的时候  有时候可能前后生成的数字可能是相同的   怎避免dom重新渲染

    // 解决方法
    shouldComponentUpdate(nextProps,nextState){  
        // if(nextState.number === this.state.number){
        //     return false
        // }
        // return true

    //    最简写法
        return nextState.number !== this.state.number
    }


    render(){
        return (
            <div> 
              <h1>随机数：{this.state.number}</h1>
              <button onClick={this.handClick}>重新生成</button>
            </div>
        )
    }
}

```


+ 案例2 通过 nextProps

  
```js
class App extends React.Component{
    state = {
        numner:0
    }

    handClick=()=>{
        this.setState(()=>{
          return{
              number:Math.floor(Math.random() * 3 )
          }
        })
    }

   


    render(){
        return (
            <div> 
              <NumberBox number={this.state.number}></NumberBox>
              <button onClick={this.handClick}>重新生成</button>
            </div>
        )
    }
}
class NumberBox extends React.Component{

     // 解决方法
    shouldComponentUpdate(nextProps){  
        if(nextProps.number === this.props.number){
           return false 
        }
        return true
    }

    render(){
        return <h1>随机数：{this.props.number}</h1>
    }
}
```


## Render-props 和高阶组件
+ 思考：如果两个组件中的部分功能相或者相同，该如何处理？
+ 处理方式：复用相似的功能（联想函数封装）
+ 复用什么？ 1 state 2 操作state的方法（组件状态逻辑）
+ 两种模式： 1 render props模式  2 高阶组件（hoc）
+ 注意：这两种模式 不是新的api 而是利用react 自身的特点的编程技巧，演化而成的固定模式（写法）


## 纯组件 
+ 说明： 纯组件的内部的对比是 shallow  compare
+ 对于值类型的来说，比较两个值是否相同（直接赋值即，没有坑 ） 

```js
let Numberdata = 0
let newNumber = numberdata 
newNumber = 2 
console.log(newNumber=== Numberdata ) //false
```
```js
state=({
    number:0
})
setState({
    number:Math.floor(Math.random() * 3 )

})

/* 最新的 */ state.Numberdata === /* 上一次的 */ state.Numberdata  // false 重新渲染组件
```

+ 对于引用类型来说：只比较对象的引用地址是否相同  
+ 因为他们指向的是同一个地址 
+ 注意：state 或 props 中属性值为引用值，应该创建新的额数据，而不是直接修改原数据     

<!-- 错误写法 -->
```js
const obj = {number:0}
const newObj = obj
newObj.number = 2
console.log(obj=== newObj )  //true
```
```js
state obj = { number : 0 }

// 错误做法  
state.obj.number = 2 

setState({ obj : state.obj })

/* 最新的 */ state.obj === /* 上一次的 */ state.obj  // true  不重新渲染组件
```

<!-- 正确写法 -->
```js
// 正确创建数据
const newObj= {
    ...this.state.obj ,number :Math.floor (Math.random() * 3)
}

// 不要用数组的push 或  unshift 等直接修改当前数组的方法 
//  而应用 concat 或者 slice 的这些方法返回的新数组的方法  
// 等于深拷贝 
this.setState(()=>{
    return{
        obj:new Obj
    }
})
```

## 虚拟Dom 和diff 算法
+ React 更新视图的思想是：只要state变化就会重新渲染视图
+ 特点：思路很清晰
+ 问题：当只有一个dom元素需要更新的时候，也非要把整个组件的内容重新渲染到页面中？ 答：不是
+ 理想状态：React是如何做到部分更新的？   虚拟Dom 和diff 算法
  
+ 虚拟dom:本质上就是一个js对象，用来描述你希望在屏幕上看到的内容

```js
// 虚拟dom对象
const element = {
    type:"h1",
    props:{
        className:"greenting",
        children:"Hello jsx"
    }
}
  
```
执行过程
1. 初次渲染时候，React会根据初始State(Modle),创建一个虚拟Dom对象（树）。
2. 根据虚拟dom 生成真正的dom,渲染到页面中。
3. 当数据变化后（setState()）,重新根据新的数据，创建新的虚拟don对象树
4. 与上一次得到的虚拟Dom对象，使用Diff 算法对比（找不同）， 得到更新的内容
5. 最终， React 只将变化的内容更新（Patch） 到Dom ，重新渲染到页面


Model  ---->  virtual Dom  ----> Render


> 代码演示
+ 组件 Render()调用后，根据状态和JSX结构商城Dom对象
+ Render（）方法的调用 并不意味着浏览器中重新渲染 
+ Render（）方法调用会 使用 diff 算法 更新需要更新的内容

```js
{
    type : "div",
    props:{
       children : [
          {type: 'h1'  , props : {children : "随机数"}} 
          {type: 'p'  , props : {children : "0"}} 
       ]
    }
}
```

> React 原理揭秘
1. 应用第一  原理第二  
2. 清楚原理有助于更好的理解 React 的自身运行机制
3. setState()异步更新数据
4. 父组件更新会导致子组件更新，纯组件提升性能
5. 思路清晰简单为前提 虚拟Dom 和Diff 保效率
6. 虚拟dom -> state + JSX
7. 虚拟Dom 的真正的价值从来不是性能     而是脱离浏览器跨平台去运行





# Fragment 
+ 通过减少节点来达到优化前端目的  
```js
import React, { Component , Fragment } from 'react';
// 使用Fragment来减少react打包以后不必要的节点保留   减少dom
// 完整语法
class FragmentView extends Component{
    render(){
        return (
             <Fragment>
                 <li>基础</li>
                 <li>语法</li>
             </Fragment>
        )
    }
}
export default FragmentView;
// 短语法
class FragmentView extends Component{
    render(){
        return (
             <>
                 <li>基础</li>
                 <li>语法</li>
             </>
        )
    }
}
export default FragmentView;

```
## 带key的Fragment
+ 显示 <React.Fragment>语法声明片段需要key
```js
import React, { Component } from 'react';
const list =[
    {id:1,title:"第一"},
    {id:2,title:"第二"},
    {id:3,title:"第三"},
]
class FragmentView extends Component{
    render(){
        return return list.map(item=>{
            return (<React.Fragment key={item.id}><li>{item.title}</li></React.Fragment>)
        })
    }
}
export default FragmentView;
```

# dangerouslySetlnnerHTML  
+ dangerouslySetlnnerHTML是React为浏览器Dom提供innerHTML 的替换方案。通过富文本编辑器进行操作后的内容，会保留标签形式，并不能正确显示
```js
// 直接显示
class dsHTML extends Component{
    render(){
        return 
        <div>
           <div
            dangerouslySetlnnerHTML={{
               _html:`<li>innerHTML</li>`
              }}
             ></div>
       </div>
        )
    }
}
export default dsHTML;
```

# context 
+ context提供了一个无需为每层组件手动添加props,就能在组件树之间进行数据传递的方法 

```js
// 提供者
import React, { Component,createContext } from 'react';
const {Consumer,Provider}=createContext()
class ProviderView extends Component{
     state={
         number:100
     }
    add(){
      this.setState(()=>{
          return{
              number:state.number + 1
          }
      })
    }
    render(){
        return (
             < Provider value={{
                 number:this.state.number
                 add:this.state.bind(this)
             }}>
             {this.props.Children}
             </ Provider>
        )
           
        
    }
}
export {ProviderView,Consumer} 

```
```js
// 消费者
import React, { Component } from 'react';
import{ProviderView,Consumer}from './ProviderView'  //上面上个页面函数

class ContextView extends Component {
    render(){
        return( 
            <ProviderView>
               <Consumer
               {
                 (args)=>{
                      return <div>{args.number}
                      <button onClick={arg.add}></button>
                      </div>
                  }
                }
                 >
               </Consumer>
            </ProviderView>
        )
    }
}
export default ContextView;



// 引入页面显示
import React, { Component } from 'react';
import myView from './views/context/ContextView'  //上面上个页面函数
class ContextView extends Component {
    render(){
        return( 
          <div>
             <h1>代码练习</h1>
             <ul>
                <myView></myView>
             </ul>
          </div>
        )
    }
}

```



# redux
+ react 是redux的官方绑定的库，具有高效灵活的特性，他能够使你的react 组件从Reduxstore中读取数据，并且向store 分发actions以更新数据 
+ action 数把数据从应用传到stroe的有效载荷，他是store数据的唯一来源
+ stroe

+ 第一步安装 npm install -- save react-redux
+ reducers 指定了应用状态的变化如何响应actions并发送store的
+ 创建文件夹，在文件夹里面创建 reducer.js文件
+ 创建defaultStore储存共有数据

```js
const defaultStore={
    age:18,
    name:'小刘'
}
```
+ 处理数据
+ state:只读的，使用纯函数来执行修改。
+ action ：接受组件派发过来的方法

+ Provider
   + Providerstore 使用层级中的 connect() 方法都能获得 Reduxstore 正常情况下，你的组件应该是嵌套在Provider才可以使用connect()方法。store(Reduxstore):应用程序中唯一Reduxstore对象
```js
// 引入redux
import { Provider } from 'react-redux';

// 嵌套组件
ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <h1>我是React</h1>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
```
+ connect
   +  React-redux提供一个connect方法能够让你吧组件和store连接起来
   +  语法  connect(mapStateToProps, mapDispatchToProps)

```js
/* mapStateToProps如果定义该函数，组件将会监听Reduxstore的变化。任何时候Reduxstore发生变化 mapStateToProps函数将会被调用。该回调函数必须返回一个纯对象。这个对象会与组件props合并。如果你省略了这个函数，你的组件将不会监听Reduxstore
*/
const mapStateToProps = (state) => (
  {
    name: state.name,
    age: state.age
  }
)


/*
mapDispatchToProps 是connect的第二个参数，用来建立ui组件的参数到store.dispach方法的映射。它定义了哪些用户的操作应该当做Action 传给Store
*/
const mapDispatchToProps = (dispatch) => ({
  changeAge() {
    const action = {
      type: 'change',
      age: 100
    }
    dispatch(action)
  }
})
```
# redux优化

+ combineReducers介绍
   + 多个redux的文件联合到一起使用

+ 第一个 redux

```js
const defaultState = {
    title: '我是标题',
    list: [
        { name: "张三", age: 19 },
        { name: "张思", age: 20 },

    ]
}

const goodsReducer = (state = defaultState, action) => {
    // 获得类型
    let type = action.type
    const newState = JSON.parse(JSON.stringify(state))
    switch (type) {
        case "change_title":
            newState.title = action.title
            return newState
        default:
            return state
    }

}
export default goodsReducer
```
+ 第二个 redux

```js
const defaultState = {
    name: '李白',
    age: 30
}


const userReducer = (state = defaultState, action) => {
    // 获得类型
    let type = action.type
    const newState = JSON.parse(JSON.stringify(state))
    switch (type) {
        case "change_name":
            newState.name = action.name
            return newState
        case "change_age":
            newState.age = action.age
            return newState
        default:
            return state
    }

}
export default userReducer
```


```js
// reducer.js
import { combineReducers } from "redux"

import goods from './goods/goodsReducer'
import user from './user/userReducer'

export default combineReducers({
    user: user,
    goods: goods
})


```

```js
// store.js
//  基本所有项目都是这样 不用改变

import { createStore, applyMiddleware } from "redux";

import reducer from './reducer'

import thunk from "redux-thunk"

const state = createStore(reducer, applyMiddleware(thunk))

export default state

```



# hook
+ 组件复用状态逻辑很难 
   + React没有提供可复用性行为的附加到组件的途径，React需要为共享状态逻辑提供更好的途径
   + 你可以使用Hook从组件中提取逻辑状态，使得在组件间或者社区内共享Hook变得简洁

+ 复杂的组件难以理解
   + 我们经常维护一些组件，组件期初很简单，但是逐渐被状态逻辑和副作用充斥，每个声明周期包含一些不相关的逻辑，相互关联且需要对照修改的代码被进行拆分，而完全不相关的的代码却在同一个方法组合在一起  容易产生bug 并且逻辑不一致
   +  在多数情况下，不可能将组建拆分成更小的粒度，因为状态逻辑无处不在，这也给测试带来了一定的跨越，同时这也是很多人将React与状态管理库结合在一起是使用的原因。但是，这往往会引入更多抽象的概念，需要在不同的文件之间来回切换，是的复用变得更加困难。
   +  为了解决这个问题，hook 将组建中先相关的部分拆分成很小的函数（比如设置订阅 或者请求数据），而且强制按照生命周期进行划分 你可以使用reducer 来管理组件内部的状态，使得更加可预测

+ 用更少的代码实现同样的效果
   + es6.class => hook
   + state，setSstate  => useState
   + componentDidMount ,componentDidUpdate, componentWillUnmount  => useEffect

## state Hook

```js
import React, { useState } from 'react'

const HookTest = () => {
    const [number, setNumber] = useState(0)
    return (
        <div>
            <h1>我是Hook测试({number})</h1>
            <button onClick={() => {
                setNumber(number + 1)
            }}>hookTest数据加一 </button>
        </div>
    )

}
export default HookTest
```

## Effect Hook
+ Effect Hook可以让你在函数中执行副作用的操作
+ React 组件中执行过数据获取，订阅或者手动修改过DOM。我们统一把这些操作称之为副作用，或者简称为作用 
```JS
import React, { useRef } from 'react'

const HookReftest = () => {
    const inputRef = useRef()
    //  返回一个可变的ref对象，其 current 属性被初始化为传入的参数(initialValue) .返回ref 对象在组件生命周期内部爆出不变
    const handClick = (e) => {
        console.log(inputRef.current.value, "输入框里面的数据");
        alert("输入框里面的数据" + inputRef.current.value)
    }

    return (
        <div>
            <h1>我是hookRef测试</h1>
            <input type="text" name="" id="" ref={inputRef} />
            <button onClick={handClick}>获得数据inputRef</button>
        </div>
    )
}
export default HookReftest
```


+ Hook contest

```js
import React, { useContext } from 'react'
import { Text } from './Provider'

//子组件
const Cusetomer = () => {
    const { number, setNumber } = useContext(Text)

    return (
        <div>
            <h1>子组件的number={number}</h1>
            <button onClick={
                () => {
                    setNumber(number + 1)
                }
            }>子组件改变</button>
        </div>
    )
}
export default Cusetomer
```

```js


import { createContext, useState } from 'react'
import Cusetomer from './Cusetomer'

// 作为容器出现  主要是传递数据
export const Text = createContext()
const Provider = () => {
    const [number, setNumber] = useState(0)
    return (
        <div>
            <h1>当前父组件的Number{number}</h1>
            <button onClick={

                () => {
                    setNumber(number + 1)
                }

            }>改变number</button>

            <Text.Provider value={{ number, setNumber }}>
                <Cusetomer />
            </Text.Provider>
        </div>
    )
}


export default Provider
```



# 高阶组件
+ 高价函数回顾 
  + js函数其实指向某个变量，既然变量可以指向函数，函数的的参数能接受变量，那么就是一个函数可以接收另外一个函数作为变量，这种函数称之为高阶函数

```js
let call= ()=>{
    console.log('11')
}
setInterval (call.500)
```

# 高阶组件
+ 高阶组件(hoc) 是react中 用于重用组件逻辑的高级技术。Hoc本身不是React的一部分。他们是从React 构思本质中浮现出来的一种模式  

+ 具体来说，高阶函数是一个函数，能够接受一个组件并返回一个新的组件，简单来说一个高阶组件只是一个包装另外一个React 组件的React组件

```js
//  高阶函数
let Hello = () => {
    console.log('你好');
}
let hoc = (fn) => {
    return () => {
        console.log(111);
        fn()
        console.log(222);
    }
}
let call = hoc(Hello)

call()
```

+ 高阶组件属性代理
  + style-component
    + 他是通过css