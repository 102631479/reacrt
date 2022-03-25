# react
+ react特点  
  1.是声明式  2.组件  
+ react 安装
  ```js
   // 安装命令  npm i react react-dom  
   // cnpm install -g create-react-app    安装react资源 
   // create-react-app my-app  创建react 项目
   // npm start  启动项目
   // reacrt-dom 负责渲染dom
  ```
# jsx 的基本使用

1.React的属性名字是驼峰命名法
2.特殊属性名字：class：-> className   for->：htmlfor , tableindex ->tanlndex
3.没有子节点的React元素可以直接用</> 结束

4.推荐使用小括号包括jsx ，从而避免js的自动插入分号陷阱
```js
// 首先引入 

import React from 'react';

import ReactDOM from 'react-don';

const dv=(
    <div>Hello JSX</div>
)
// 可以避免插入分号 出现错误
```

## 在jsx中嵌入javaScript 表达式

+ 数据嵌入表达式子   单括号  
```js
  import React from 'react';
  import ReactDOM from 'react-don';

  const name = "dn"
  const dv=(
          <div>Hello{name}</div>
  )
```

## 条件渲染 React

```js
  
  import React from 'react';
  import ReactDOM from 'react-don';

  const isLoading= true
  const loadData= ()=>{
        if(isLoading){
        return  <div>loading</div>
        }else{
        return  <div>需要展示的渲染内容</div>
        }
    }
  const title =(
      <h1>条件渲染</h1>
      {loadData()}
  )
  // 三元表达式
  const loadData=()=>{
      return isLoading ? （<div>loading...</div>）:（<div>渲染加载后的额数据</div>）
  }
  ReactDOM.render(title,document.getElementID('root'))
  //   需要渲染的目标

```

## 列表渲染 React
+ 如果要渲染一组数据，应该使用数组的map()方法
+ 注意：渲染列表的时候应该添加key属性
+ 原则上 map()便利谁就给谁渲染一个key属性
+ 注意 尽量避免索引号使用key属性
```js
import React from 'react';
import ReactDOM from 'react-don';

  const list= {
       {id:1,text:"我是第1"},    
       {id:2,text:"我是第2"},
       {id:3,text:"我是第3"},
    }
  const title =(
      <h1>{list.map(item=>{<li key={item.id}>{item.name}</li>})}</h1>
  )

  ReactDOM.render(title,document.getElementID('root'))
  //   需要渲染的目标
```


## jsx的样式处理 
+ 行内样式 
```js
<div style={{color:'red',backgroundColor:'yellow'}}>css处理<div> 
```
+ 使用类名方式 --- className
```js
// 引入样式
import './css/style.css';
<div className="title">css处理<div> 
```
## JSX总结   特色：能用js的地方就添加解析语法
+ jsx是React的核心内容
+ jsx表示在js代码中书写html结构，是声明式的体现
+ 使用jsx配合嵌入式的js表达式，条件渲染，列表渲染，可以描述任意ui的结构
+ 使用className的方式给jsx的添加样式
+ React完全利用js语言的自身的能力来编写ui,而不是造轮子增强html的功能 

# React组件介绍
+ 组件是React的一等公民，使用React就是在用组件
+ 特点 可复用，独立，可组合

## 组件的创建方式
### react的约定、


#### 函数创建组件的方法
+ 使用函数创建组件
+ 函数名称必须为大写字母开头   
+ 函数组件必须有返回值，表示该组件的结构
+ 约定必须执行 不执行就报错 如果什么都不想渲染 直接 return null 就行了
+ 函数名称直接作为标签名字

```js
const Hello=()=>{
  return（ <div>我创建了一个组件</div> ） 
  // 返回空的话 就  return null
}
ReactDOM.render(<Hello/>,root)
```

#### 使用类创建组件的方法
+ 使用Es6的class创建组件
+ 类名字必须为大写字母开头
+ 类名字应该继承 React.Compontent父类，从而可以使用父类中提供的方法或属性
+ 类的名字必须提供Render() 方法
+ render()方法必须有返回值  ，表示该组件的结构 
```js
class Hello extents React.Compontent{
   render(){
     return <div>我是类组件</div>
   }
}
ReactDom.render(<Hello/>,root)
// 类组件的 root后面是渲染组件的名字 document.get....ID('id')
```

#### 抽离独立的js文件
+ + + 建议一个组件只负责一个模块
- 创建 Hello.js
- 创建组件（类或者函数）
- 在Hello.js中导出该组件
- 在index.js中导入Hello组件
- 渲染组件  
```js
// index.js
import Hello from './Hello';
ReactDom.render(<Hello/>,root)

```
```js
import React from 'react';
class Hello extents React.Compontent{
   render(){
     return <div>我是类组件</div>
   }
}
export default Hello
```

#### 事件绑定
+ React事件绑定语法与DOM语法相似
+ 语法 on+事件名称={事件处理程序}， onClick={()=>{}}
+ 注意 React事件采用驼峰命名法 
```js
// 形式一
class App extends React.Compoent{
  handleClick(){
    console.log('这是一个点击事件')
  }
  render(){
    return (
      <button onClick={this.handleClick}>我是按钮</button>
    )
  }
}
// 形式二
// 函数组件形式没有this
  let App=()=>{
  handClick(){
   console.log('这是一个点击事件')
   }
  return(
        <button onClick={handleClick}>我是按钮</button>
    )  
}
```

#### 事件对象
+ 可以通过处理函数的参数获取事件对象
+ React中的事件对象叫做：合成事件
+ 合成事件:兼容所有浏览器，无需担心夸浏览器兼容问题
```js

  let handleClick =（e）=>{
    // e.preventDefault 可以阻止浏览器的默认行为
       e.preventDefault()
       console.log('事件对象',e)
  }
 <a onClick={handleClick}>点我，不会跳转页面</a>

```

###  有状态组件  和   无状态组件
+ 函数组件又叫做无状态组件，类组件又叫做有状态组件
+ 状态（state）即数据
+ 函数组件没有自己的状态，只负责数据显示（静）
+ 类组件有自己的状态，负责更新ui让页面动起来

* 比如计数器的案例中 点击让数值从0到1 0和1就是不同的状态，而从0到1 就表示状态发生了改变
* 状态变化后 ui也随之更新React 想要完成这个操作就要有状态组件来完成这个

### state 和 setState的使用

#### state的基本使用

+ 状态是私有的 只能从内部获取
+ 状态就是数组
```js
//  语法形式一
class App extends React.Component{
  // 函数构造器
  constructor()
    // super 是必须有的
    super()
    // 初始化start
    this.state={
      count:0
    }
  }
  render(){
    return(
      <div>计数器:{this.state.count}</div>
    )
  }
}
//  简化语法
  class App extends React.Component{
    state={
      count:0
    }
  render(){
    return(
      <div>计数器:{this.state.count}</div>
    )
  }
}
```

#### setState() 的基本使用
+ 状态是可变的
+ 语法 this.setState({要修改的数据})
+ 注意哦不要直接修改state的值 这是错误的！！！
+ setState() 作用  1.修改state 2 更新UI
+ 思想 ：数据修改视图

```js
  class App extends React.Component{
    state={
      count:0
    } 
  render(){
    return(
      <div>计数器:{this.state.count}</div>
      <button 
      onClick={()=>{
        this.setState({
          count:this.state.count+1
        })
      }}
      >+1</button>
    )
  }
}
```
#### 从jsx中抽离事件处理程序
+ jsx中掺杂过多的js代码会特别混乱
+ 推荐：将逻辑代码抽离到单独的方法中去 ，保证jsx清晰
```js
  class App extends React.Component{
    state={
      count:0
    } 
    onIncrenement(){
        this.setState({
          count:this.state.count+1
        })
    }
  render(){
    return(
      <div>计数器:{this.state.count}</div>
      <button 
      onClick={this.onIncrenement}
      >+1</button>
    )
  }
}
```
+ 错误： setState of undefined
+ this指向组件实例（render方法中的this是一个组件实例）

### 事件绑定this的指向
#### 1.箭头函数
+ 利用箭头函数自身不绑定this的特点
+ render()方法中的this为组件实例,可以获取到setState()

```js
  class App extends React.Component{
    state={
      count:0
    } 
    onIncrenement(){
        this.setState({
          count:this.state.count+1
        })
    }
  render(){
    return(
      <div>计数器:{this.state.count}</div>
      <button 
      onClick={
        （）=>this.onIncrenement()
      }
      >+1</button>
    )
  }
}
```

#### 2 Function.prototype.bind()
+ 这是一个利用bind的方法解决this的指向
+ 利用es5中的bind的方法，将事件处理程序中的this与组件实例绑定到一起
```js

class App extends React.Component{
   constructor()
     super()
       this.state={
      count:0
      }
       this.onIncrenement = this.onIncrenement.bind(this)
   }
   onIncrenement(){
        this.setState({
          count:this.state.count+1
        })
    }
   render(){
    return(
      <div>计数器:{this.state.count}</div>
      <button 
      onClick={
       this.constructor
      }
      >+1</button>
    )
   }
}
```

#### class的实例方法
+ 利用箭头函数形式的class实例方法
+ 注意该语法是实验性语法，但是由于babel的存在可以直接使用
```js
class App extends React.Component{
    state={
      count:0
    } 
   onIncrenement=()=>{
        this.setState({
          count:this.state.count+1
        })
    }
   render(){
    return(
      <div>计数器:{this.state.count}</div>
      <button 
      onClick={
       this.constructor
      }
      >+1</button>
    )
   }
}
```
### 表单处理

#### 受控组件
+ htlm中的表单元素是可以输入的，也就是改变了自己的状态
+ 而 React中可变状态是保存在state中，并且只希望用setState() 方法来改变 ？
  + React将state的表单元素值绑定在一起，由state的值来控制表单元素的值
  + 受控组件：其值受到了React的控制表单元素
```html
<input type="text" value={this.state.txt}/>
```
- 步骤：
 - 在state 中添加一个状态，作为表单元素state的值（控制表单元素的来源）
 - 在表单元素中绑定change事件，将单元素的值设置为state的值（控制表单元素的值的变化）
```js
// 输入框实例
state={
  txt:""
}
<input type='text' value={this.state.txt}
    onChange={e=>this.setState({txt:e.target.value})}
>
```
```js

class App extends React.Component{
    state={
      text:"输入框"
      content:"富文本框"
      city:"sh"
      isCheck:false
    } 
   handleChange= e => {
        this.setState({
          txt:e.target.value
        })
    },
   handleChange= e => {
        this.setState({
          content:e.target.value
        })
    },
   handlecity(){
       this.setState({
          city:e.target.value
        })
    },
  handleisCheck(){
       this.setState({
          isCheck:e.target.value
        })
    }
   render(){
    return(
      // 输入框
         <input type='text' value={this.state.txt}
          onChange={e =>this.handleChange}
        />
       
      // 富文本框
         <textarea value={this.state.content} 
          onChange={e =>this.handlecontent}
        />
      // 下拉框
      <select value={this.state.city}>
          <option value='sh'>上海</option>
          <option value='gz'>广州</option>
          <option value='sz'>深圳</option>
      </select>


      // 复选框
      <input type='checkbox' checked={this.state.isCheck}
          onChange={e =>this.handleisCheck}
        />
    )
   }
}

```



+ 多表单元素优化步骤
  + 给表单元素添加name的属性，名称与state相同
  + 根据单元素类型获取对应值
  + 在change事件中通过处理程序中的[name]来修改对应的state
```js
 <input type='text'     
        value={this.state.txt}
        name="txt"
        onChange={this.handleForm}
        />

    // 因为复选框是 checkbox 其他的都是 value
  const value = target.type === 'checkbox'
        ? target.checked  :   target.value

   this.setState(
     { [name]:value   }
   )

```
```js
// 改造后
class App extends React.Component{
    state={
      text:"输入框"
      content:"富文本框"
      city:"sh"
      isCheck:false
    } 
   handleChange= e => {
    // 获取当前的dom对象
    const target = e.target
    // 根据类型获取值
    const value = target.type === 'checkbox'
        ? target.checked  :   target.value
    // 获取name
    const name = e.name
    this.setState({
     [name]:value
    })
    },
 
   render(){
    return(
      // 输入框
         <input     name='txt' type='text' value={this.state.txt}
          onChange={e =>this.handleChange}
        />
       
      // 富文本框
         <textarea  name='content' value={this.state.content} 
          onChange={e =>this.handlecontent}
        />
      // 下拉框
         <select name='city' value={this.state.city}>
          <option value='sh'>上海</option>
          <option value='gz'>广州</option>
          <option value='sz'>深圳</option>
      </select>


      // 复选框
         <input  name='isCheck' type='checkbox' checked={this.state.isCheck}
          onChange={e =>this.handleisCheck}
        />
    )
   }
}

```
#### 非受控组价
+ 调用React.createRef()方法创建一个ref对象
```js
constructor(){
   super()
   this.txtRef=React.createRef()
}
```

+ 将创建好的Ref 添加到文本框里面
```html
<input type='text' ref={this.txtRef} />
```

+ 通过ref对象获取文本框的值  
```js
console.log(this.txtRef.current.value)
```


```js
// 不建议使用
 class App extends React.Component{
   constructor(){
     super()
    //  创建一个ref 对象
     this.txtRef=React.createRef()
  },
   getText=()=>{
     console.log('文本框的值:',this.txtRef.current.value)

  },
  render(){
    return(
      <div>
       <input   type='text'  ref={this.txtRef}/>
       <button onClick={this.txtRef}>获取文本框的值</button>
      </div>

    )
  }
}
```
# React组件基础
+ 组件的创建方式：函数组件和类组件
+ 无状态（函数组价），负责静态结构展示
+ 有状态(类组件)，负责更新Ui，让页面动起来
+ 绑定事件注意this的指向问题
+ 推荐使用受控组件来处理表单
+ 完全利用js语言的能力创建组件，这是React的思想



## 案例一   评论列表
+ 思路介绍
   + 在state中初始化列表数据
   + 在使用的map方法便利state中的列表数据
   + 给每个遍历的li元素添加key属性
   + 给按钮添加点击事件
   + 在事件处理程序中通过state获取评论
   + 将评论添加到state中，并调用setState()方法更新视图
   + 边界情况：清空文本框
   + 边界情况：非空判断


```js
 class App extends React.Component{
  state={
    comments: [{
       {id:1,text:"我是第1"},    
       {id:2,text:"我是第2"},
       {id:3,text:"我是第3"},
    }]
  },
```
  ```js
  renderList = () =>{
      // 条件渲染语句
   return  this.state.comments.length === 0 ? (<div className='no-comment'>暂无评论</div>):
       <ul>
               {this.state.coments.map(item=>(
                 <li key={item.id}>
                  <h3>评论人:{item.name}</h3>
                  <p>评论内容：{item.usercoment}</p>
                 </li>
               ))}
               <li>

      </ul>

  }
  ```
  ```js
  handleForm= e =>{
    const {name,value}=e.target
    this.setState({
      [name]:value
    })
  },
  addCommit=()=>{
    const {comments,username,usercoment} = this.state
  
  //  输入空的字符串的时候判断
    if(username.trim()===''|| usercoment.trim()===''){
      alert("请输入评论内容")
      return
    }
     
    const newComments = [{
      id:Math.random(),  //渲染的时候 添加一个随机数当做唯一key
      name:username, 
      usercoment:usercoment
    },...comments]
    // 渲染页面显示数据
    this.setState（{
         comments:newComments   ,
        //  下面是输入完毕以后 进行置空输入框
         username:"",
         usercoment:"",

    }）
  },
  render(){
    const {username,usercoment} = this.state
    return(
      // 评论发表
    <div className='app'>
      <div>
        <input 
        className='user' 
        type='text'
        palceholder="请输入评论人"
        value={username}
        // 原本是 this.state.username   上面已经定义了所以就不用了
        name='username'
        onChange={this.handleForm}/>
        <br/>
        <textarea
          className='content'
          cols='30'
          row="10"
          value={usercoment}
          name='usercoment'
          palceholder="请输入评论内容"
          onChange={this.handleForm}/>
        />
        <br/>
        <button onClic={this.addCommit}>发表评论</button>
      </div>
      {
        this.renderList()
      }
    </div>
    )
  }
 }

  ```


# React组件进阶
 + 能够使用prop 组件接受数据   
 + 父子通讯
 + 兄弟通讯
 + 添加prop校验
 + 生命周期函数
 + 高阶组件的应用
 + 组件介绍
 + 组件prop
 + Context
 + prop深入
 + render-prop和高阶组件


### 组件通讯介绍
+ 组件是独立封闭的  默认情况下只能使用自己的本身的数据在组件进化过程中，我们将一个完整的功能拆分成多个组件。
#### 组件的通讯props 
- props的作用，接收传递组件的数据
- 传递数据：传递标签添加的数据的数据
- 传递数据：给组件标签添加属性
- 接收数据：函数组件通过参数prop接收数据 .类组件通过this.props接收数据
```js
// 组件
    <Hello name="jack" age={19} />
// 函数


    let Hello=()=>{
      console.log(props)
      return (
        <div>接收的数据：{prop.name}<div/>
      )
    }
```
```js
// 页面实例
import React from 'react'
import React from 'react - dom'
    function Hello=(props)=>{
      console.log(props)
      return (
        <div> 接收的数据：{prop.name} <div/>
      )
    }
// 1 ,传递数据 
    RenderDOM.render(<Hello name="jack"  />,document.getElement('root'))
```
```js
// 类组件的传递方式
import React from 'react'
import React from 'react - dom'
class Hello extents React.Component{
   render(){
     console.log(this.props)//接收组件
      return(
        <div>
          <h1> props:{this.props}</h1>
        <div/>
      )
   }
}
// 1 ,传递数据 
    RenderDOM.render(<Hello name="jack"  />,document.getElement('root'))
```
#### props特点
- 可以给组件任意类型的数据
- props.是一个  只读  的对象  是不支持修改的
- 注意：使用类组件时，如果写了构造函数，应该将props 传递给super(), 否则在构造函数中无法获取props

```js
//  name 默认是String  
//  可以是数组
// 也可以是一个函数
// 函数组件中  可以直接  props.fn()  进行调用
// 甚至可以用 jsx 传递   直接渲染   {props.tag}
 

    RenderDOM.render(<Hello name="jack" age={19} colors={['red','green','blue']} 
    fn={()=>console.log('这是一个函数')}
    tag= {<p>我是一个jsx<p/>}
    />
    ,document.getElement('root'))

```

```js
// 类组件的传递方式
import React from 'react'
import React from 'react - dom'
class Hello extents React.Component{
  constructor(){
    super()
    // 这是拿不到的
    console.log(this.props)
  }

// 正确的写法  把props 传递给构造函数
   constructor(props){
    super(props)
    // 这是拿不到的
    console.log(props)   //不用写this因为props 已经作为一个形参了
  }


   render(){
    //  这里可以拿到props的
     console.log(this.props)//接收组件
      return(
        <div>
          <h1> props:{this.props}</h1>
        <div/>
      )
   }
}


// 1 ,传递数据 
   RenderDOM.render(<Hello name="jack" age={19} colors={['red','green','blue']} 
    fn={()=>console.log('这是一个函数')}
    tag= {<p>我是一个jsx<p/>}
    />
    ,document.getElement('root'))
```


#### 组件通讯的三种方式

##### 父组件传递给子组件  父传子
+ 父组件提供要传递的state 的数据
+ 给子组件标签添加属性，值为state中的数据
+ 子组件中通过props 接收父组件传递的值
```js
class Prent extends React.Component {
   state={
     lastName:"王小二"
   }
   render(){
    return <div> 传递数据给子组件：<Child name={this.state.lastName}/></div>
  }
}

const Child = props =>{
  // props 就是父组件传递的对象
    console.log(props)
   return (
     <div className="chlid">
          <p>子组件：接收父组件的数据</p>
     </div>
   )
}
RenderDOM.render(<Prent/>,document.get.......)
```
#####   子传父

  > 思路：利用回调函数 父组件提供回调函数，子组件调用，将要传递的数据作为回调函数的参数

  1. 父组件提供一个回调函数（用于接收数据）
  2. 子组件通过props调用回调函数
  3. 将子组件的数据通过数据传递给回调函数

```js
class Prent extends React.Component {
  getChildMsg=(msg)=>{
       console.log("接收到子组件的数据",msg)
  }
  render(){
    return (
      <div>子组件：<Child getMsg={this.getChildMsg}></div>
    )
  }
}
```
```js
// 传递实例 


// 父组件
class Prent extends React.Component {
  getChildMsg= data =>{
       console.log("接收到子组件的数据", data )
  } 
  render(){
    return (
      <div>父组件 <Child getMsg={this.getChildMsg}>
      </div>
    )
  }
}
```

```js
// 子组件   
class Child extends React.Component {
  state={name:"王小二"}
  handleClick=()=>{
    // 子组件调用 父组件传递的回调函数
    this.props.getMsg(this.state.name)
  }
  render(){
    return (
      <div>子组件<button onClick={this.handleClick}>点击传递数据</button>
      </div>
    )
  }
}
```
+ 注意this指向的问题

#### 兄弟组件之间的通讯

> 将共享的数据提升到公共组件中，由公共父组件管理这个状态 
> 思想：状态提升
> 公共父组件职责：1:提升共享状态  2:提升共享组件的状态管理方法  
> 要通讯的子组件 只用通过props接收状态或者操作状态方法即可

```js
// 父组件  

class Prent extends React.Component {
  state={
    num:"0"
  }
  handleClick=()=>{
   this.setState({
     num:this.state.num + 1
   })
  }
  render(){
    return (
      <div>
      <Child1 num={this.state.num}>
      <Child2 handleClick={this.handleClick}>
      </div>
    )
  }
}

```
```js
// 两个子组件
 const Child1=props=>{
   return <h1>计数器：{props.num}</h1>
 }

 const Child2=props=>{
   return <button onClick={（）=>props.handleClick()}>组件通讯数据加1</button>
 }
```
## Context
>思考:App组件要传递数据给Child组件，应该如何处理
+ 更好的姿势使用：Context
+ 作用：跨组件传递数据（比如：主题 ，语言等）
- 使用步骤 
1. 调用React.createContext()创建 Provider（提供数据）和 Consumer(消费数据) 两个组件
```js
// 一个是数据的提供 一个负责数据消费
  const {Provider , Consumer}=React.createContext()
```
2. 使用 Provider 组件作为节点

```js
 <Provider>
    <div>
       <Child1/>
    </div>
 <Provider>
```
3. 设置 value 属性  表示要传递的数据

```js
 <Provider value='pink' >
 <Provider>


```
4. 调用  Consumer 组件的数据

```js
 <Consumer> 
      {data=><span>data参数接收到的数据 -- {data}</span>}
 </Consumer>

```
总结：
1. 如果两个组件是多层嵌套的 可以使用 Context 传递实现组件通讯
2. Context提供2个组件：Provider  负责提供数据  Consumer  负责消费数据


## props 深入
+ children 属性： 表示组件标签的子节点。当组件标签有子节点的时候，props就会有属性  
+ children 属性与普通的props一样，值可以是任意值（文本，React元素，组件，甚至是函数）
  
   
```js
// 类似于 vue 插槽
const App =props=>{
  console.log(props)
  return (
    <div>
        <h1>组件标签的子节点：</h1>
        {props.children}
    </div>
  )
}
ReactDOM.render(<APP>我是子节点</APP>,.....)
```
```js
// 可以是函数
const App =props=>{
  console.log(props)
  props。children()
  return (
    <div>
        <h1>组件标签的子节点：</h1>
        {props.children}
    </div>
  )
}
ReactDOM.render(<APP>{()=>console.log('这是一个函数的子节点')}</APP>,.....)
```

### props 校验 
+ 对于组件来说.props是外来的 需要校验数据的格式
+ 如果传入数据格式不对，可能导致组件内部错误
+ 关键问题：组价的使用者不知道错误的原因
+ props校验：允许在创建的时候，就指定，props的类型还有格式
+ 作用：捕获使用组件的时候因为props导致错误，给出明确的错误提示，增加组建的安全性


**使用**：


 + 第一步： 安装prop-types 
```js
  npm i porps-type
```

+ 第二步： 导入
```js
  import PropTypes form ‘prop-types’
```

+ 第三步： 使用组件名字 propTypes={}来给组件添加校验规则
```js
import PropTypes form "prop-types"

function App(props){
  return(
    <h1>你好，{props.color}</h1>
  )
}
App.propTypes={
  // 约定color属性为 array类型
  // 如果类型不对，就会报错，便于分析错误原因
  color:PropTypes.array
}
```
4. 校验规则通过propTypes对象来指定



**约束规则** 
1. 常见类型 array  bool   function  number  object   string
2. React元素类型 element
3. 必填项：isRequired
4. 特定结构的对象：shape({})

```js
//  常见类型
  optionalFunc:PropTypes.func
// 必选
  optionalFunc:PropTypes.func.isRequired
// 特定结构的对象
  optionalObjectWithShape:PropTypes.shape({
    color:PropTypes.array,
    findSize:PropTypes.number
  })
```

#### porp的默认值
+ 场景：分页组件->每页组件的默认值
 + 没有传入值的时候生效
```js
function App(props){
  return(
    <h1>你好，{props.color}</h1>
  )
}
App.defaultProps={
  color:"red"
}
```

### 组件的生命周期
+ 意义：组建的生命周期有助于理解组件的运行方式，完成更复杂的组件功能，分析组件错误的原因
+ 生命周期：组件冲创建到消亡的过程
+ 声明周期的每个阶段伴随着调用的一些方法，这些方法就是声明周期的钩子函数
+ 为开发人员在不同的阶段操作提供了时机
+ 只有类组件才有生命周期

#### 生命周期的三个阶段  
学习思路：
1. 每个阶段执行的时机
2. 每个阶段执行的顺序
3. 每个阶段函数执行的作用
   ##### 创建的时候
   + 执行时机：组件创建的时候（页面加载时）
   + 执行顺序：  constuctor ->  render() ->   react更新DOM和refs componentDidMount
```js
class App extends React.Component {
  costructor(prop){
    super(props)
    // 下面打印出来的是一个感叹号 的提示在控制塔中
    console.warn('生命周期的钩子函数：costructor')
  }
  componentDidMount(){
    // 下面打印出来的是一个感叹号 的提示在控制塔中
     console.warn('生命周期的钩子函数：componentDidMount')
  }
  render(){
    // 下面打印出来的是一个感叹号 的提示在控制塔中
    console.warn('生命周期的钩子函数：render')
    return (
      <div>
      我是盒子
      </div>
    )
  }
}
```
**总结** 
|  钩子函数  | 触发时机  | 作用 |
|  ----  | ----  | ---- |
|  costructor | 最先执行 | 1. 初始化state  2.为事件处理程序绑定this
| render  | 每次组件渲染都会触发 | 渲染ui（注意：不能调用setState()）
| componentDidMount | 组件挂载（完成dom渲染）后 | 1.发送网络请求  2.Dom操作 |



   ##### 更新阶段
   +    New props   setState()    forceUpdate()   触发的时候都会导致组件进行更新  Render（） 
   + 周期组成    render ->  React的DOM和refs  -> compoentDidUpdate
   + forceUpdate()  强制渲染
   +  componentDidMount DOM重新渲染完成后进行触发  要使用 setState() 必须放在一个if条件中

```js
class App extends React.Component {
  costructor(prop){
    super(props)
    console.warn('生命周期的钩子函数：costructor')
  }
  // 如果要在 setState（）中更新状态 必须放在一个if条件语句中
  // 如果直接调用setState()状态  会导致dom递归更新
  state={
    count:0
  }
  componentDidMount(prevProps){
    // 错误写法
    this.setState({})

    // 正确写法
    // 做法比较更新前后的props是否相同，来决定是否更新或者渲染组件
    consloe.log("上一次的porps",prevProps,'当前的props',this.props)
    if(prevProps."参数" ！== this.porps."参数"){
     this.setState({})
    //  一般这里获取接口数据
    }

  }
  handleClick=()=>{
   this.setState({
     count:this.state.count+1
   })
  }
  render(){
    console.warn('生命周期的钩子函数：render')
    return (
          <Counter count={this.state.count}></Counter>
    
           <button onClick={this.handleClick}>点击加1</button>
    )
  }
}
class Counter extends React.Conponent{
  render(){
    return <h1>统计打豆豆的打击次数：{this.props.count}</h1>
  }
}
```


  ##### 卸载函数
  + 执行时机： 组件从页面消失  
   +   生命周期函数钩子函数：componentWillUnmout
```js


class Counter extends React.Conponent{
  componentDidMount(){
    this.timerID=setInterval(()=>{
      console.log("定时器在执行")
    })
  }

  render(){
    return <h1>统计打豆豆的打击次数：</h1>
  }
 componentWillUnmout(){
   console.log("生命周期函数钩子函数：componentWillUnmout")
  //  清理定时器  
   clearInterval(this.timerID)
 }
}
```


#### React组件复用的概述

+ 思考：如果两个组件中的部分功能相同，该如何处理。
+ 处理方式：复用相似的功能（联想函数的封装）
+ 复用什么？1. state 2. 操作state的方法（组件状态逻辑）
+ 两种方式：1. render  props 模式 2.高阶组件（HOC）
+ 注意：这两种方式不是新的API，而是利用React自身特点的编码技巧，演化而成的固定模式（写法） 

##### Render props 模式
+ 思路:将复用的state和操作state的方法封装到一个组件中
+ 问题1 如何拿到该组件的服用的state？
+ 在使用组件的时候，添加一个值为函数的porp通过函数参数来获取（需要组件内部的实现）  
```js
// 参数使用
<Mouse render={（mouse）=>{}}>
```

```js
// 拿到鼠标的返回值
<Mouse render={（mouse）=>（
<p>鼠标当前的位置{mouse.x},{mouse.y}</p>
)}>
```


> 使用步骤

1. 创建Mouse组件，在组件中提供复用的状态逻辑代码（1.状态 2.操作状态的方法）
2. 将要复用的状态作为 props.rener（state）方法的参数，暴露到组件外部
3. 使用props.render() 的返回值作为要渲染的内容

```js
class Mouse extends React.Conponent{

}

```
```js
// 组件实例
class Mouse extends React.Conponent{
  state={
    // 鼠标位置的状态
    x:0,
    y:0,
  }
  handleMouseMove = e =>{
    this.setState({
      //  拿到鼠标位置
      x : e.clientX,
      Y : e.clientY,
    })
  }
  // 监听鼠标移动的代码   生命周期钩子函数
  componentDidMount(){
    window.addEvebtListener('mousermove',this.handleMouseMove)
  }

  Render(){
    // 没有渲染组件代码 想要数据自己渲染就行了
    return this.props.render(this.state)
  }
}

class App extends React.Conponent{
  render(){
    return(
      <div></div>
      <Mouse render={(mouse)=>{
        return(
          <p>鼠标位置：{mouse.x},{mouse.y}</p>
        )
      }}/>
    )
  }
}
```


+ 演示 Mouse 组件的复用  
+ 状态：鼠标坐标（x,y）
+ 操作状态方法：鼠标移动的事件
+ 传入render prop ：使用复用的状态来渲染ui的结构


```js
class App extends React.Conponent{
  render(){
    return(
      <div>
      <h1>render porps 模式</h1>
      <Mouse render={(mouse)=>{
        return(
          <p>鼠标位置：{mouse.x},{mouse.y}</p>
        )
      }}/>

      {
        // 如果图片位置是变量的话  import 引入  下面  src 为  {变量}
        // 猫捉老鼠鼠标控件
        <Mouse render={(mouse)=>{
        return(
          <img 
          src="图标位置"
          alt="猫"
          seyle={{
            postition:'absolute',
            top:mouse.y,
            left:mouse.x,
          }}
          ></img>
        )
      }}/>
      }
    
      </div>
      
    )
  }
}
```
###### 使用children 代替 render 属性
+ 注意：并不是这个模式叫做render props 就必须使用名为 render 的props 实际上可以使用 任意名称的prop
+ 吧prop 是一个函数并且告诉组件 要渲染什么内容的技术叫做 render props模式
+ 推荐使用  children 代替 render 属性



```js
// 方法简述
<Mouse>
   {({x,y})=><p>鼠标的位置是{x},{y}</p>}
</Mouse>
// 组件内部 
this.props.children(this.state)


// Context 中的用法：
<Consumer>
  {data=><span>data参数表示接收的数据 -- {data} </span>}
</Consumer>

```


```js
// 组件实例
class Mouse extends React.Conponent{
  state={
    // 鼠标位置的状态
    x:0,
    y:0,
  }
  handleMouseMove = e =>{
    this.setState({
      //  拿到鼠标位置
      x : e.clientX,
      Y : e.clientY,
    })
  }
  // 监听鼠标移动的代码   生命周期钩子函数
  componentDidMount(){
    window.addEvebtListener('mousermove',this.handleMouseMove)
  }

  Render(){
    // 没有渲染组件代码 想要数据自己渲染就行了

    // 改造children
    // return this.props.render(this.state)
    // 改造后
    return this.props.children(this.state)


  }
}
// 把render 改造成 children
class App extends React.Conponent{
  render(){
    return(
      <div>
      <h1>render porps 模式</h1>

      
      {
      // 改造第一个 render
      // <Mouse render={(mouse)=>{
      //   return(
      //     <p>鼠标位置：{mouse.x},{mouse.y}</p>
      //   )
      // }}/>
      }
     

      <Mouse>
      {
        // 改造后的  使用children
        mouse =>{
          return(
           <p>鼠标位置：{mouse.x},{mouse.y}</p>
          )
        }
      } 
       </Mouse> 






      {
        // 改造children 前
        // 如果图片位置是变量的话  import 引入  下面  src 为  {变量}
        // 猫捉老鼠鼠标控件
        /*
        <Mouse render={(mouse)=>{
        return(
          <img 
          src="图标位置"
          alt="猫"
          seyle={{
            postition:'absolute',
            top:mouse.y,
            left:mouse.x,
          }}
          ></img>
        )
      }}//>
      */
      }
    
      {     
        // 改造children 后
        // 如果图片位置是变量的话  import 引入  下面  src 为  {变量}
        // 猫捉老鼠鼠标控件
        <Mouse> {
              mouse=>( 
                    <img
                     src="图标位置"
                     alt="猫"
                     style={{
                       postition:'absolute',
                       top:mouse.y,
                       left:mouse.x,}}
                    />)         
        }
        </Mouse> 
      }
      </div>
      
    )
  }
}
```



+ 代码优化
   + 推荐：给render props 模式添加props校验
```js
   // 导入校验  prop 
   Mouse.propType={
     children:PropTypes.func.isRequired 
   }
```

   + 应该在组件卸载的时候解除 mousemove 事件绑定
```js
   // 解除事件绑定  组件卸载的时候解除
    window.removeEventListener('mousermove',this.handleMouseMove)
```

```js


// 组件实例
class Mouse extends React.Conponent{
  state={
    // 鼠标位置的状态
    x:0,
    y:0,
  }
  handleMouseMove = e =>{
    this.setState({
      //  拿到鼠标位置
      x : e.clientX,
      Y : e.clientY,
    })
  }
  // 监听鼠标移动的代码   生命周期钩子函数
  componentDidMount(){
    window.addEvebtListener('mousermove',this.handleMouseMove)
  }
  // 模块卸载的时候的钩子函数  生命周期钩子函数
  componentWillUmount(){
    // 解除事件绑定  组件卸载的时候解除
    window.removeEventListener('mousermove',this.handleMouseMove)
  }
  Render(){
    return this.props.children(this.state)
  }
}
// 导入校验  prop 
Mouse.propType={
  children:PropTypes.func.isRequired
}
// 把render 改造成 children
class App extends React.Conponent{
  render(){
    return(
      <div>
      <h1>render porps 模式</h1>
      <Mouse>
      {
        // 改造后的  使用children
        mouse =>{
          return(
           <p>鼠标位置：{mouse.x},{mouse.y}</p>
          )
        }
      } 
       </Mouse> 
      {     
 
        <Mouse> {
              mouse=>( 
                    <img
                     src="图标位置"
                     alt="猫"
                     style={{
                       postition:'absolute',
                       top:mouse.y,
                       left:mouse.x,}}
                    />)         
        }
        </Mouse> 
      }
      </div>
    )
  }
}
```

#### 高阶组件
+ 目的：实现逻辑状态复用
+ 采用包装（装饰）模式，比如说手机壳
##### 思路分析
+ 高阶组件（HOC，Higher-OrderComputer）是一个函数，接收要包装的组件，返回增强后的组件
```js
const EnhancedComponent = withHoc（WrappedComponent）
```
+ 在高阶组件内部创建一个类组件，在这个类组件中提供了复用的逻辑代码，通过props将复用的状态传递给被包装的组件WrappedComponent

```js
class Mouse extends React.Component{
  render(){
    return <WrappenCompoment {...this.state}>
  }
}
```

**使用步骤**

1. 创建一个函数，名称预定以With 开头
2. 指定函数参数，参数应该以大写字母开头（作为渲染的组件）
3. 在函数内部创建一个类组件，提供复用的状态逻辑代码，并返回
4. 再该组件中，渲染参数的组件，同时将状态通过prop传递给参数组件
5. 调用该高阶组件，传入要增强的组件的，通过返回值拿到增强的组件，并将其渲染到页面中

```js
function withMouse(WrappedComponent){
    class Mouse extends React.Component{}
    return Mouse
}

// Mouse组件的render方法中：
    return <WrappenCompoment {...this.state}>

```
```js
// 实际例子

// 创建高阶组件
 function withMouse(WrappedComponent){
  //  该组件提供复用的状态逻辑
    class Mouse extends React.Component{
      // 鼠标状态
      state={
        x:0,
        y:0
      }
      handleMouseMove = e =>{

        this.setState({
          x:e.clientX,
          y:e.clientY
        })
      }
      // 钩子函数
      componentDidMount(){
        window.addEvenListener("mousemove",this.handleMouseMove)
      }

      componentWillUnmount(){
        window.removeEventListener("mousemove",this.handleMouseMove)
      }
 
      render(){
        return <WrappedComponent {...this.state}></WrappedComponent>
      }
      
    }
    return Mouse
}


const Position =props =>(
    <p> 鼠标当前位置：（x:{props.x},y:{props.y}）</p>
)

const MousePosition =WithMouse(Posriton)

// 猫捉老鼠组件
const Cat = props =>(
  <img src={img} alt="" style={{
     position:"absolute",
     top:props.y,
     left:props.x,
  }}/>
)

// 调用自己的高阶组件来增猫捉老鼠的组件
const MouseCat =WithMouse(Cat)

class App extends React.Component{
  render(){
    return(
      <div>
        <h1>高阶组件</h1>
         {/* 渲染后的增强组件 */}
         <MousePosition />
         <MouseCat/>
      </div>
    )
  }
}

```

##### 设置 displayName 
1. ***使用高阶组件存在的问题：得到的两个组件名称相同 ****
2. 原因：默认情况下.React 使用组价名称作为 displayName
3. 解决方法：为高阶组件设置 displayName 便于协调时区不同的组件
4. displayName 的作用：用于设置调试信息（React Developer Tools信息）
5. 设置方式



```js


Mouse.displayName = `WithMouse${getDisplayName(WrappedComponent)}`

function getDisplayName(WrappedComponent){
  return WrappedComponent.displayName || WrappedComponent.name || 'Component'
}
```
```js
// 实际例子

// 创建高阶组件
 function withMouse(WrappedComponent){
  //  该组件提供复用的状态逻辑
    class Mouse extends React.Component{
      // 鼠标状态
      state={
        x:0,
        y:0
      }
      handleMouseMove = e =>{

        this.setState({
          x:e.clientX,
          y:e.clientY
        })
      }
      // 钩子函数
      componentDidMount(){
        window.addEvenListener("mousemove",this.handleMouseMove)
      }

      componentWillUnmount(){
        window.removeEventListener("mousemove",this.handleMouseMove)
      }
 
      render(){
        return <WrappedComponent {...this.state}></WrappedComponent>
      }
      
    }
    // 设置 displayName
    Mouse.displayName = `WithMouse${getDisplayName(WrappedComponent)}`

    return Mouse
}

function getDisplayName(WrappedComponent){
  return WrappedComponent.displayName || WrappedComponent.name || 'Component'
}

const Position =props =>(
    <p> 鼠标当前位置：（x:{props.x},y:{props.y}）</p>
)

const MousePosition =WithMouse(Posriton)

// 猫捉老鼠组件
const Cat = props =>(
  <img src={img} alt="" style={{
     position:"absolute",
     top:props.y,
     left:props.x,
  }}/>
)

// 调用自己的高阶组件来增猫捉老鼠的组件
const MouseCat =WithMouse(Cat)

class App extends React.Component{
  render(){
    return(
      <div>
        <h1>高阶组件</h1>
         {/* 渲染后的增强组件 */}
         <MousePosition />
         <MouseCat/>
      </div>
    )
  }
}

```

##### 传递props

1. 问题： props丢失  
2. 原因： 高阶组件没有往下传递props
3. 解决方式: 渲染 WrappedComponent 时， 将state 和 this.porps 一起传递个组件 
4. 传递方式

```js
<WrappedComponent {...this.state} {...this.props} />
```
```js
//  最终例子
// 实际例子

// 创建高阶组件
 function withMouse(WrappedComponent){
  //  该组件提供复用的状态逻辑
    class Mouse extends React.Component{
      // 鼠标状态
      state={
        x:0,
        y:0
      }
      handleMouseMove = e =>{

        this.setState({
          x:e.clientX,
          y:e.clientY
        })
      }
      // 钩子函数
      componentDidMount(){
        window.addEvenListener("mousemove",this.handleMouseMove)
      }

      componentWillUnmount(){
        window.removeEventListener("mousemove",this.handleMouseMove)
      }
 
      render(){
        //         <WrappedComponent {...this.state} {...this.props} /> 传递 porps  解决没有传递props问题
                                
        return  <WrappedComponent {...this.state} {...this.props} />
      }
      
    }
    // 设置 displayName
    Mouse.displayName = `WithMouse${getDisplayName(WrappedComponent)}`

    return Mouse
}

function getDisplayName(WrappedComponent){
  return WrappedComponent.displayName || WrappedComponent.name || 'Component'
}

const Position =props =>(
    <p> 鼠标当前位置：（x:{props.x},y:{props.y}）</p>
)

const MousePosition =WithMouse(Posriton)

// 猫捉老鼠组件
const Cat = props =>(
  <img src={img} alt="" style={{
     position:"absolute",
     top:props.y,
     left:props.x,
  }}/>
)

// 调用自己的高阶组件来增猫捉老鼠的组件
const MouseCat =WithMouse(Cat)

class App extends React.Component{
  render(){
    return(
      <div>
        <h1>高阶组件</h1>
         {/* 渲染后的增强组件 */}
         <MousePosition />
         <MouseCat/>
      </div>
    )
  }
}


```
**总结**
### React 组件进阶
1. 组件通讯是构建React 应用必不可少的一环。
2. props 灵活性让组件变得更强大 
3. 兄弟组价解决方式   状态提升React 组件的常用模式
4. 组件的生命周期有助于理解组价运行的过程
5. 钩子函数让开发者在特定的时机执行某些功能
6. render props 模式和高阶组件都可以实现组件状态逻辑复用
7. 组件的极简模型 （state,props）=>UI    