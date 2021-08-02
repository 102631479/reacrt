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
 class App extends React.Component{
   constructor(){
     super()
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
    const newComments = [{
      id:Math.random(),
      name:username, 
      usercoment:usercoment
    },...comments]
    this.setState = newComments
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



