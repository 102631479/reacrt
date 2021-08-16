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
````