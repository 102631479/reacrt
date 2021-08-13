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
    
    render(){...}
}
```